import { computed, ref, watch } from 'vue'
import { copy } from '../data/content.js'
import { bnMessages } from '../data/bnMessages.js'
import { navigationBn } from '../data/navigationBn.js'
const language = ref(typeof localStorage !== 'undefined' && localStorage.getItem('piisc-language') === 'bn' ? 'bn' : 'en')
watch(language, value => { localStorage.setItem('piisc-language',value); document.documentElement.lang=value }, { immediate:true })
const normalize = value => value.replace(/\s+/g, ' ').trim().toLowerCase()
const dictionary = new Map()
function addPairs(en, bn) {
  if (typeof en === 'string' && typeof bn === 'string') dictionary.set(normalize(en), bn)
  else if (en && bn && typeof en === 'object') for (const key of Object.keys(en)) addPairs(en[key], bn[key])
}
addPairs(copy.en, copy.bn)
for (const [en, bn] of Object.entries({ ...navigationBn, ...bnMessages })) dictionary.set(normalize(en), bn)
const digits = value => String(value).replace(/\d/g, digit => '০১২৩৪৫৬৭৮৯'[digit])
export function translate(value) {
  if (language.value !== 'bn' || value == null) return value
  if (typeof value === 'number') return digits(value)
  if (typeof value !== 'string') return value
  const key = normalize(value)
  const translated = dictionary.get(key)
  if (translated) return `${value.match(/^\s*/)[0]}${translated}${value.match(/\s*$/)[0]}`
  if (/^[\d\s/–—:.-]+$/.test(value)) return digits(value)
  const patterns = [
    [/^(\d+) of (\d+): (.+)$/i, match => `${digits(match[1])} / ${digits(match[2])}: ${translate(match[3])}`],
    [/^Open photo: (.+)$/i, match => `ছবি খুলুন: ${translate(match[1])}`],
    [/^Show slide (\d+): (.+)$/i, match => `স্লাইড ${digits(match[1])} দেখুন: ${translate(match[2])}`],
    [/^Read message from (.+)$/i, match => `${translate(match[1])}-এর বাণী পড়ুন`],
    [/^Message from the (.+)$/i, match => `${translate(match[1])}-এর বাণী`],
    [/^Draft for review.*approved by the (.+)\.$/i, match => `পর্যালোচনার খসড়া · এই নমুনা বার্তা এখনো ${translate(match[1])} কর্তৃক অনুমোদিত নয়।`],
    [/^(.+) information will be published here once confirmed by PIISC\. Please contact the school for assistance\.$/, match => `${translate(match[1])} সম্পর্কে তথ্য PIISC নিশ্চিত করলে এখানে প্রকাশিত হবে। সহায়তার জন্য স্কুলে যোগাযোগ করুন।`],
    [/^Newsletter — (1st|2nd|3rd|4th) Edition$/, match => `নিউজলেটার — ${translate(`${match[1]} Edition`)}`],
    [/^Your email app has been requested\..*directly at (.+)\.$/, match => `ইমেইল অ্যাপ খোলার অনুরোধ করা হয়েছে। বার্তাটি পাঠাতে সেখানে খসড়াটি পাঠান। অ্যাপ না খুললে সরাসরি ${match[1]} ঠিকানায় ইমেইল করুন।`],
    [/^PIISC on (.+)$/, match => `${match[1]}-এ PIISC`],
    [/^(.+): coming soon$/, match => `${match[1]}: শিগগিরই আসছে`],
  ]
  for (const [pattern, render] of patterns) { const match = value.trim().match(pattern); if (match) return render(match) }
  return value
}
export function useI18n(){ return { language, tr:translate, t:computed(()=>copy[language.value]), toggle:()=> language.value = language.value === 'en' ? 'bn' : 'en' } }
