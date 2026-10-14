<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import api from '../api.js'
import NoticeCard from './NoticeCard.vue'
import { useI18n } from '../composables/useI18n.js'

const { language } = useI18n()
const copy = (en, bn) => language.value === 'bn' ? bn : en

// These values drive the four display states: loading, error, empty, and cards.
const notices = ref([])
const loading = ref(true)
const error = ref(false)
let controller

async function loadNotices() {
  // Cancel any older request so its response cannot replace newer results.
  controller?.abort()
  const request = new AbortController()
  controller = request
  loading.value = true
  error.value = false

  try {
    // api.js supplies the API base URL from .env. Axios adds ?limit=5 for us.
    const response = await api.get('/notices', {
      params: { limit: 5 },
      signal: request.signal,
      timeout: 15000,
    })
    if (request.signal.aborted) return
    // The backend wraps the array in { notices, pagination }.
    if (!Array.isArray(response.data?.notices)) throw new Error('Expected a notices array')
    notices.value = response.data.notices
  } catch {
    // Leaving the page cancels the request; that is not a user-facing error.
    if (!request.signal.aborted) error.value = true
  } finally {
    if (!request.signal.aborted) loading.value = false
  }
}

// Fetch when this section appears and stop its request when the user leaves.
onMounted(loadNotices)
onBeforeUnmount(() => controller?.abort())
</script>

<template>
  <section class="bg-cream py-[52px] md:py-[76px]" aria-labelledby="home-notices-title">
    <div class="container">
      <div class="mb-[28px] flex flex-wrap items-center justify-between gap-[16px]">
        <h2 id="home-notices-title" class="text-[32px] leading-[1.2] text-navy md:text-[44px]">
          {{ copy('Latest Notices', 'সর্বশেষ নোটিশ') }}
        </h2>
        <RouterLink to="/notices" class="text-[14px] font-bold text-blue hover:underline">
          {{ copy('View all notices', 'সব নোটিশ দেখুন') }}
        </RouterLink>
      </div>

      <!-- Keep this live region mounted so assistive technology hears updates. -->
      <div role="status" aria-live="polite" aria-atomic="true" class="text-[#65737a]">
        <p v-if="loading">{{ copy('Loading notices…', 'নোটিশ লোড হচ্ছে…') }}</p>
        <p v-else-if="error">{{ copy('We could not load notices. Please try again.', 'নোটিশ লোড করা যায়নি। আবার চেষ্টা করুন।') }}</p>
        <p v-else-if="!notices.length">{{ copy('No notices yet. Please check back soon.', 'এখনো কোনো নোটিশ নেই। শিগগিরই আবার দেখুন।') }}</p>
      </div>
      <button
        v-if="error && !loading"
        type="button"
        class="mt-[16px] rounded-[6px] bg-blue px-[20px] py-[12px] font-bold text-white hover:bg-navy"
        @click="loadNotices"
      >
        {{ copy('Retry', 'আবার চেষ্টা করুন') }}
      </button>
      <div v-if="!loading && !error && notices.length" class="grid grid-cols-1 gap-[22px] md:grid-cols-2 lg:grid-cols-3">
        <NoticeCard v-for="notice in notices" :key="notice._id" :notice="notice" />
      </div>
    </div>
  </section>
</template>
