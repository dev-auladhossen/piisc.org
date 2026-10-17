<script setup>
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { Loader2, Megaphone, X } from 'lucide-vue-next'
import { createNotice, noticeErrorKind, updateNotice } from '../../services/noticeAdminApi.js'
import { noticeCategories } from '../../data/noticeCategories.js'
import { useDialogLock } from '../../composables/useDialogLock.js'
import { useI18n } from '../../composables/useI18n.js'

const props = defineProps({ open: Boolean, mode: { type: String, default: 'create' }, notice: { type: Object, default: null } })
const emit = defineEmits(['saved', 'cancel', 'notfound'])
const { tr, language } = useI18n()
const dialog = ref(null)
const titleInput = ref(null)
const errorBanner = ref(null)
const submitting = ref(false)
const error = ref('')
const invalid = reactive({ title: '', content: '', dates: '' })
const form = reactive({ title: '', content: '', category: 'general', isImportant: false, isPublished: true, publishDate: '', expiryDate: '' })
const { lock, unlock } = useDialogLock()
let unmounting = false

function inputDate(value) {
  if (typeof value !== 'string' || !value.trim()) return ''
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
function today() {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
function clear() {
  const n = props.mode === 'edit' ? props.notice : null
  form.title = n?.title || ''
  form.content = n?.content || ''
  form.category = n?.category || 'general'
  form.isImportant = n?.isImportant === true
  form.isPublished = n?.isPublished !== false
  form.publishDate = inputDate(n?.publishDate)
  form.expiryDate = inputDate(n?.expiryDate)
  error.value = ''
  invalid.title = ''
  invalid.content = ''
  invalid.dates = ''
}
watch(() => props.open, async open => {
  if (open && dialog.value && !dialog.value.open) {
    clear()
    dialog.value.showModal()
    lock()
    await nextTick()
    titleInput.value?.focus()
  } else if (!open && dialog.value?.open) {
    dialog.value.close()
    unlock()
  }
}, { flush: 'post' })
onMounted(async () => {
  if (props.open && dialog.value && !dialog.value.open) {
    clear()
    dialog.value.showModal()
    lock()
    await nextTick()
    titleInput.value?.focus()
  }
})
function cancel() { if (!submitting.value) emit('cancel') }
function onCancel(event) { event.preventDefault(); cancel() }
function closed() {
  unlock()
  if (!unmounting && props.open && !submitting.value) emit('cancel')
}
function errorMessage(kind) {
  return kind === 'validation' ? 'Please check the details and try again.'
    : kind === 'too_large' ? 'This notice is too large. Please shorten the content.'
      : kind === 'forbidden' ? 'You do not have permission to do this.'
        : kind === 'notfound' ? 'This notice no longer exists.'
          : kind === 'rate_limited' ? 'Too many attempts. Please wait a few minutes and try again.'
            : kind === 'network' ? 'Cannot reach the server. Check your connection and try again.'
              : 'Something went wrong. Please try again.'
}
async function submit() {
  if (submitting.value) return
  error.value = ''
  invalid.title = ''
  invalid.content = ''
  invalid.dates = ''
  const title = form.title.trim()
  const content = form.content.trim()
  if (title.length < 3 || title.length > 150) invalid.title = 'Title must be 3 to 150 characters.'
  if (content.length < 10) invalid.content = 'Content must be at least 10 characters.'
  const currentDay = today()
  if ((form.publishDate && form.expiryDate && form.expiryDate <= form.publishDate) || (!form.publishDate && form.expiryDate && form.expiryDate <= currentDay)) {
    invalid.dates = 'Expiry date must be later than the publish date and today.'
  }
  if (invalid.title || invalid.content || invalid.dates) {
    await nextTick()
    if (invalid.title) titleInput.value?.focus()
    else if (invalid.content) document.getElementById('notice-content')?.focus()
    else document.getElementById('notice-expiry')?.focus()
    return
  }
  const values = { title, content, category: form.category, isImportant: form.isImportant, isPublished: form.isPublished }
  let body
  if (props.mode === 'create') {
    body = { ...values, ...(form.publishDate ? { publishDate: form.publishDate } : {}), ...(form.expiryDate ? { expiryDate: form.expiryDate } : {}) }
  } else {
    const original = props.notice || {}
    body = {}
    for (const key of ['title', 'content', 'category', 'isImportant', 'isPublished']) {
      if (values[key] !== original[key]) body[key] = values[key]
    }
    const originalPublish = inputDate(original.publishDate)
    const originalExpiry = inputDate(original.expiryDate)
    if (form.publishDate !== originalPublish) body.publishDate = form.publishDate || null
    if (form.expiryDate !== originalExpiry) body.expiryDate = form.expiryDate || null
    if (!Object.keys(body).length) { emit('cancel'); return }
  }
  submitting.value = true
  try {
    const response = props.mode === 'create' ? await createNotice(body) : await updateNotice(props.notice._id, body)
    emit('saved', response?.notice || response)
  } catch (failure) {
    const kind = noticeErrorKind(failure)
    error.value = errorMessage(kind)
    if (kind === 'notfound') emit('notfound')
    await nextTick()
    errorBanner.value?.focus()
  } finally {
    submitting.value = false
  }
}
onBeforeUnmount(() => {
  unmounting = true
  if (dialog.value?.open) dialog.value.close()
  unlock()
})
</script>

<template>
  <dialog ref="dialog" aria-labelledby="notice-form-title" aria-describedby="notice-form-subtitle" class="notice-form-dialog fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-24px)] max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 text-slate-800 shadow-[0_24px_80px_rgba(15,23,42,0.24)] sm:w-[calc(100%-40px)]" @cancel="onCancel" @close="closed">
    <form class="flex max-h-[90dvh] flex-col" @submit.prevent="submit">
      <header class="flex shrink-0 items-start gap-3 border-b border-slate-200 px-4 py-4 sm:px-6">
        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#294e9e]" aria-hidden="true"><Megaphone :size="19" /></span>
        <div class="min-w-0 flex-1"><h2 id="notice-form-title" class="text-lg font-bold text-slate-900">{{ tr(props.mode === 'create' ? 'Create notice' : 'Edit notice') }}</h2><p id="notice-form-subtitle" class="mt-1 text-sm text-slate-500">{{ tr('Add or update a school notice.') }}</p></div>
        <button type="button" :disabled="submitting" class="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50" :aria-label="tr('Close notice form')" @click="cancel"><X :size="19" aria-hidden="true" /></button>
      </header>
      <div class="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6">
        <div><label for="notice-title-input" class="mb-1.5 block text-sm font-semibold text-slate-700">{{ tr('Title') }}</label><input id="notice-title-input" ref="titleInput" v-model="form.title" maxlength="150" required :aria-invalid="Boolean(invalid.title)" :aria-describedby="invalid.title ? 'notice-title-error' : undefined" class="min-h-11 w-full rounded-lg border border-slate-300 px-3 text-base outline-none focus:border-[#294e9e] focus:ring-2 focus:ring-[#294e9e]/15" /><p v-if="invalid.title" id="notice-title-error" class="mt-1 text-sm text-red-700">{{ tr(invalid.title) }}</p></div>
        <div><label for="notice-content" class="mb-1.5 block text-sm font-semibold text-slate-700">{{ tr('Content') }}</label><textarea id="notice-content" v-model="form.content" rows="8" maxlength="5000" required :aria-invalid="Boolean(invalid.content)" :aria-describedby="invalid.content ? 'notice-content-error notice-content-count' : 'notice-content-count'" class="w-full resize-y rounded-lg border border-slate-300 p-3 text-base outline-none focus:border-[#294e9e] focus:ring-2 focus:ring-[#294e9e]/15"></textarea><div class="flex justify-between gap-3 text-xs text-slate-500"><p v-if="invalid.content" id="notice-content-error" class="text-sm text-red-700">{{ tr(invalid.content) }}</p><span v-else></span><span id="notice-content-count" aria-live="polite">{{ tr('X of Y characters').replace('X', tr(form.content.length)).replace('Y', tr(5000)) }}</span></div></div>
        <div class="grid gap-4 sm:grid-cols-2"><div><label for="notice-category" class="mb-1.5 block text-sm font-semibold text-slate-700">{{ tr('Category') }}</label><select id="notice-category" v-model="form.category" class="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-base"><option v-for="item in noticeCategories" :key="item.value" :value="item.value">{{ language === 'bn' ? item.bn : item.en }}</option></select></div><div class="flex items-end pb-2"><label class="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium text-slate-700"><input v-model="form.isImportant" type="checkbox" class="h-4 w-4 accent-[#294e9e]" />{{ tr('Mark as important') }}</label></div></div>
        <label class="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium text-slate-700"><input v-model="form.isPublished" type="checkbox" class="h-4 w-4 accent-[#294e9e]" />{{ tr('Published') }}</label>
        <div class="grid gap-4 sm:grid-cols-2"><div><label for="notice-publish" class="mb-1.5 block text-sm font-semibold text-slate-700">{{ tr('Publish date') }}</label><input id="notice-publish" v-model="form.publishDate" type="date" class="min-h-11 w-full rounded-lg border border-slate-300 px-3 text-base" /><p class="mt-1 text-xs text-slate-500">{{ tr('Leave empty to use today.') }}</p></div><div><label for="notice-expiry" class="mb-1.5 block text-sm font-semibold text-slate-700">{{ tr('Expiry date') }}</label><input id="notice-expiry" v-model="form.expiryDate" type="date" :aria-invalid="Boolean(invalid.dates)" :aria-describedby="invalid.dates ? 'notice-dates-error notice-expiry-hint' : 'notice-expiry-hint'" class="min-h-11 w-full rounded-lg border border-slate-300 px-3 text-base" /><p id="notice-expiry-hint" class="mt-1 text-xs text-slate-500">{{ tr('The notice is hidden from the public after this date.') }}</p><p v-if="invalid.dates" id="notice-dates-error" class="mt-1 text-sm text-red-700">{{ tr(invalid.dates) }}</p></div></div>
        <p v-if="error" ref="errorBanner" tabindex="-1" role="alert" class="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800 outline-none focus:ring-2 focus:ring-red-500/30">{{ tr(error) }}</p>
      </div>
      <footer class="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-4 py-4 sm:flex-row sm:justify-end sm:px-6"><button type="button" :disabled="submitting" class="min-h-11 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50" @click="cancel">{{ tr('Cancel') }}</button><button type="submit" :disabled="submitting" :aria-busy="submitting" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#294e9e] px-5 text-sm font-semibold text-white hover:bg-[#173f8e] disabled:cursor-not-allowed disabled:opacity-60"><Loader2 v-if="submitting" :size="16" class="animate-spin" aria-hidden="true" />{{ tr(submitting ? 'Saving notice…' : 'Save notice') }}</button></footer>
    </form>
  </dialog>
</template>

<style scoped>
.notice-form-dialog:not([open]) { display: none; }
.notice-form-dialog::backdrop { @apply bg-slate-950/40 backdrop-blur-[3px]; }
</style>
