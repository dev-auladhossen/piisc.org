<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '../api.js'
import { useI18n } from '../composables/useI18n.js'

const route = useRoute()
const { language } = useI18n()
const copy = (en, bn) => language.value === 'bn' ? bn : en
const notice = ref(null)
const loading = ref(true)
// A missing notice, an invalid ID, and a network/server error have different messages.
const error = ref('')
let controller

const categories = {
  general: ['General', 'সাধারণ'],
  admission: ['Admission', 'ভর্তি'],
  event: ['Event', 'অনুষ্ঠান'],
  holiday: ['Holiday', 'ছুটি'],
  exam: ['Exam', 'পরীক্ষা'],
  meeting: ['Meeting', 'সভা'],
}
const categoryLabel = computed(() => {
  const labels = categories[notice.value?.category]
  return labels ? copy(...labels) : copy('Notice', 'নোটিশ')
})

// Match the card's date handling: date-only values retain their calendar day;
// timestamps use the viewer's local timezone. Invalid dates do not crash the page.
const publishedDate = computed(() => {
  const value = notice.value?.publishDate
  if (typeof value !== 'string' || !value.trim()) return null
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00` : value)
  if (Number.isNaN(date.getTime())) return null
  return {
    value,
    label: new Intl.DateTimeFormat(language.value === 'bn' ? 'bn-BD' : 'en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
    }).format(date),
  }
})

async function loadNotice() {
  // Cancel previous work when another ID is opened before its request finishes.
  controller?.abort()
  const request = new AbortController()
  controller = request
  loading.value = true
  error.value = ''
  notice.value = null

  try {
    // Encode the ID as a single path segment. api.js supplies the base URL.
    const response = await api.get(`/notices/${encodeURIComponent(route.params.id)}`, {
      signal: request.signal,
      timeout: 15000,
    })
    if (request.signal.aborted) return
    const data = response.data
    // A successful detail response must be one notice, not a list or null.
    if (!data || typeof data !== 'object' || Array.isArray(data) ||
      typeof data._id !== 'string' || typeof data.title !== 'string' || typeof data.content !== 'string') {
      throw new Error('Expected a notice object')
    }
    notice.value = data
  } catch (failure) {
    if (request.signal.aborted) return
    const status = failure.response?.status
    error.value = status === 404 ? 'not-found' : status === 400 ? 'invalid-id' : 'request'
  } finally {
    if (!request.signal.aborted) loading.value = false
  }
}

// Vue can reuse this page when only :id changes, so watch the ID rather than
// fetching only on mount. immediate also loads the first notice on entry.
watch(() => route.params.id, loadNotice, { immediate: true, flush: 'sync' })
onBeforeUnmount(() => controller?.abort())
</script>

<template>
  <section class="document-page container [&&]:[padding-block-end:80px] [&&]:[padding-block-start:54px]">
    <div class="min-w-[0]">
      <RouterLink to="/notices" class="back-link [&&]:mb-[28px] [&&]:inline-block [&&]:[color:rgb(41,_78,_158)] [&&]:[font-size:14px] [&&]:font-[750] [&.back-link:hover]:[text-decoration:underline] [&.back-link:hover]:[text-decoration-color:initial] [&.back-link:hover]:[text-decoration-line:underline] [&.back-link:hover]:[text-decoration-style:initial] [&.back-link:hover]:[text-decoration-thickness:initial]">
        {{ copy('← All notices', '← সব নোটিশ') }}
      </RouterLink>

      <div role="status" aria-live="polite" aria-atomic="true">
        <p v-if="loading" class="text-[#65737a]">{{ copy('Loading notice…', 'নোটিশ লোড হচ্ছে…') }}</p>
        <template v-else-if="error">
          <h1 class="mb-[16px] text-[32px] leading-[1.2] text-[#173f8e]">
            {{ error === 'not-found' ? copy('Notice not found', 'নোটিশ পাওয়া যায়নি') : error === 'invalid-id' ? copy('Invalid notice link', 'নোটিশের লিংকটি সঠিক নয়') : copy('Unable to load notice', 'নোটিশ লোড করা যায়নি') }}
          </h1>
          <p class="text-[#65737a]">
            {{ error === 'not-found' ? copy('This notice may have been removed. Return to all notices using the link above.', 'এই নোটিশটি সরিয়ে ফেলা হয়ে থাকতে পারে। উপরের লিংক থেকে সব নোটিশ দেখুন।') : error === 'invalid-id' ? copy('Please return to all notices and choose a notice.', 'সব নোটিশের পাতায় ফিরে একটি নোটিশ বেছে নিন।') : copy('Please try again.', 'আবার চেষ্টা করুন।') }}
          </p>
        </template>
        <p v-else-if="notice" class="sr-only">{{ copy('Notice loaded:', 'নোটিশ লোড হয়েছে:') }} {{ notice.title }}</p>
      </div>
      <button
        v-if="!loading && error === 'request'"
        type="button"
        class="mt-[16px] rounded-[6px] bg-[#294e9e] px-[20px] py-[12px] font-bold text-white hover:bg-[#173f8e]"
        @click="loadNotice"
      >
        {{ copy('Retry', 'আবার চেষ্টা করুন') }}
      </button>

      <div v-if="!loading && !error && notice" class="document-layout [&&]:grid [@media(max-width:800px)]:[&&]:grid-cols-[1fr] [@media(width>800px)]:[&&]:grid-cols-[260px_minmax(0px,_1fr)] [&&]:gap-x-[28px] [&&]:gap-y-[28px] [&&]:[align-items:start]">
        <nav class="document-sidebar [&&]:grid [&&]:gap-x-[4px] [&&]:gap-y-[4px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:white] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [@media(max-width:430px)]:[&&]:grid-cols-[1fr] [@media(width>430px)_and_(max-width:800px)]:[&&]:grid-cols-[repeat(3,_minmax(0px,_1fr))] [&&]:[border-bottom-left-radius:9px] [&&]:[border-bottom-right-radius:9px] [&&]:[border-top-left-radius:9px] [&&]:[border-top-right-radius:9px] [&&]:[box-shadow:rgba(23,_58,_106,_0.043)_0px_12px_30px] [&&]:p-[10px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(220,_229,_243)]" :aria-label="copy('Notice navigation', 'নোটিশের নেভিগেশন')">
          <RouterLink to="/notices" class="block rounded-[6px] bg-[#edf3ff] p-[14px] font-bold text-[#173f8e]">{{ copy('All notices', 'সব নোটিশ') }}</RouterLink>
          <div class="p-[14px] text-[14px] text-[#60718e]">{{ categoryLabel }}<br />{{ publishedDate?.label || copy('Date unavailable', 'তারিখ পাওয়া যায়নি') }}</div>
        </nav>
        <article aria-labelledby="notice-title" class="document-content min-w-[0] [overflow-wrap:anywhere]">
        <div class="document-toolbar [&&]:flex [&&]:flex-wrap [&&]:items-center [&&]:justify-between [&&]:gap-x-[12px] [&&]:gap-y-[12px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(245,_248,_253)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[font-size:13px] [&&]:[border-bottom-left-radius:0px] [&&]:[border-bottom-right-radius:0px] [&&]:[border-top-left-radius:8px] [&&]:[border-top-right-radius:8px] [&&]:[color:rgb(64,_87,_117)] [&&]:p-[12px_16px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(220,_229,_243)]">
          <span class="rounded-full bg-[#edf3ff] px-[12px] py-[5px] text-[12px] font-bold text-[#173f8e]">{{ categoryLabel }}</span>
          <span v-if="notice.isImportant === true" class="rounded-full bg-[#d4a72b] px-[12px] py-[5px] text-[12px] font-bold text-[#173f8e]">{{ copy('Important', 'গুরুত্বপূর্ণ') }}</span>
          <time v-if="publishedDate" :datetime="publishedDate.value" class="text-[14px] text-[#65737a]">{{ publishedDate.label }}</time>
          <span v-else class="text-[14px] text-[#65737a]">{{ copy('Date unavailable', 'তারিখ পাওয়া যায়নি') }}</span>
        </div>
        <h1 id="notice-title" class="[&&]:[font-family:'Nirmala_UI',_sans-serif] [&&]:[font-size:clamp(28px,_3vw,_42px)] [&&]:leading-[1.4] [&&]:[color:rgb(23,_63,_142)] [&&]:m-[0px_0px_18px_0px]">{{ notice.title }}</h1>
        <!-- Interpolation safely renders plain text. whitespace-pre-line maps to
             white-space: pre-line, preserving line breaks while wrapping long lines. -->
        <div class="whitespace-pre-line rounded-b-[9px] border border-[#dce5f3] bg-white p-[24px] text-[16px] leading-[1.75] text-[#344b70] md:p-[32px]">{{ notice.content }}</div>
      </article>
      </div>
    </div>
  </section>
</template>
