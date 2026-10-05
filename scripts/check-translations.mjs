import assert from 'node:assert/strict'
import { nextTick } from 'vue'
import { registerHooks } from 'node:module'
import { galleryPhotos } from '../src/data/gallery.js'
import { filterNotices, notices } from '../src/data/notices.js'

const storage = new Map()
globalThis.localStorage = { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) }
globalThis.document = { documentElement: { lang: '' } }
// Node does not import Vite's image modules; preserve their URLs in this logic test.
registerHooks({ load(url, context, nextLoad) {
  if (/\.(png|jpe?g)$/.test(url)) return { format: 'module', source: `export default ${JSON.stringify(url)}`, shortCircuit: true }
  return nextLoad(url, context)
} })
const { useI18n } = await import('../src/composables/useI18n.js')
const { language, tr } = useI18n()

assert.equal(tr('All Photos'), 'All Photos')
language.value = 'bn'
await nextTick()
assert.equal(document.documentElement.lang, 'bn')
assert.equal(storage.get('piisc-language'), 'bn')
assert.equal(tr('All Photos'), 'সব ছবি')
assert.equal(tr('Apply Now'), 'এখনই আবেদন করুন')
assert.equal(tr('Book a Visit'), 'পরিদর্শনের সময় ঠিক করুন')
assert.match(tr('Admission procedure and requirements'), /ভর্তির পদ্ধতি/)
assert.match(tr('1 of 9: Learning at PIISC'), /^১ \/ ৯: /)
for (const photo of galleryPhotos) {
  assert.match(tr(photo.caption), /[\u0980-\u09ff]/, `Caption: ${photo.id}`)
  assert.match(tr(photo.category), /[\u0980-\u09ff]/, `Category: ${photo.id}`)
}
assert.equal(tr('Message from the Chairman'), 'চেয়ারম্যান-এর বাণী')
assert.match(tr('Show slide 3: Student achievement'), /৩.*শিক্ষার্থীদের অর্জন/)
assert.equal(tr('admissions@piisc.org'), 'admissions@piisc.org')
assert.equal(tr('/gallery'), '/gallery')
assert.equal(tr('ইতিমধ্যে অনূদিত'), 'ইতিমধ্যে অনূদিত')
assert.equal(tr(12), '১২')
assert.equal(filterNotices(notices, 'সর্বশেষ', 'All', tr).length, 1)
assert.equal(filterNotices(notices, 'সর্বশেষ', 'Students', tr).length, 0)
assert.match(tr('Academic Calendar information will be published here once confirmed by PIISC. Please contact the school for assistance.'), /শিক্ষাবর্ষের ক্যালেন্ডার/)
language.value = 'en'
await nextTick()
assert.equal(tr(galleryPhotos[0].caption), galleryPhotos[0].caption)
assert.equal(document.documentElement.lang, 'en')
assert.equal(storage.get('piisc-language'), 'en')
console.log('PASS: translated captions/categories, dynamic messages, Bangla notice search, unchanged URLs/email, numbers, and persistent EN/BN switching.')
