<script setup>
import { computed, ref } from 'vue'
import { newsEvents } from '../data/newsEvents.js'
import { useI18n } from '../composables/useI18n.js'
import NewsEventCard from '../components/NewsEventCard.vue'
import orientationPhoto from '../assets/images/orientation-program-chairman-speech.jpg'

const { language } = useI18n()
const tr = (en, bn) => language.value === 'bn' ? bn : en
const selected = ref('all')
const filters = [{ key: 'all', en: 'All stories', bn: 'সব খবর' }, { key: 'news', en: 'News', bn: 'সংবাদ' }, { key: 'event', en: 'Events', bn: 'অনুষ্ঠান' }]
const filtered = computed(() => selected.value === 'all' ? newsEvents : newsEvents.filter(item => item.category === selected.value))
</script>

<template>
  <main>
    <section class="news-hero" :style="{ '--hero-image': `url(${orientationPhoto})` }" aria-labelledby="news-page-title"><div class="news-container"><p>{{ tr('PIISC NEWS & EVENTS', 'পিআইআইএসসির সংবাদ ও অনুষ্ঠান') }}</p><h1 id="news-page-title">{{ tr('Stories from our school community.', 'আমাদের বিদ্যালয় পরিবারের গল্প।') }}</h1><span>{{ tr('Explore moments from our 2026 orientation programme and life at PIISC.', '২০২৬ সালের ওরিয়েন্টেশন অনুষ্ঠান এবং পিআইআইএসসির নানা মুহূর্ত দেখুন।') }}</span></div></section>
    <section class="news-listing"><div class="news-container"><div class="listing-heading"><div><p class="listing-eyebrow">{{ tr('LATEST STORIES', 'সাম্প্রতিক গল্প') }}</p><h2>{{ tr('News & Events', 'সংবাদ ও অনুষ্ঠান') }}</h2></div><div class="news-filters" role="group" :aria-label="tr('Filter stories', 'খবর বাছাই করুন')"><button v-for="filter in filters" :key="filter.key" type="button" :class="{ active: selected === filter.key }" :aria-pressed="selected === filter.key" @click="selected = filter.key">{{ tr(filter.en, filter.bn) }}</button></div></div><div class="listing-grid"><NewsEventCard v-for="item in filtered" :key="item.slug" :item="item" /></div></div></section>
  </main>
</template>

<style scoped>
.news-container{width:calc(100% - clamp(32px,6.5vw,128px));max-width:1500px;margin-inline:auto}.news-hero{min-height:380px;display:flex;align-items:center;background-image:linear-gradient(90deg,#173f8eee,#244b9ecb),var(--hero-image);background-size:cover;background-position:center 46%;color:white}.news-hero .news-container{padding-block:75px}.news-hero p,.listing-eyebrow{font-size:12px;font-weight:800;letter-spacing:.17em;color:#f4c537;margin-bottom:15px}.news-hero h1{font-size:clamp(40px,5vw,72px);line-height:1.1;max-width:920px;margin:0 0 22px}.news-hero span{font-size:18px;line-height:1.65;display:block;max-width:680px}.news-listing{padding:75px 0 95px;background:#f4f7fc}.listing-heading{display:flex;justify-content:space-between;align-items:end;gap:25px;margin-bottom:30px}.listing-heading h2{color:#244b9e;font-size:clamp(30px,3.2vw,48px);margin:0}.news-filters{display:flex;gap:8px;flex-wrap:wrap}.news-filters button{padding:10px 17px;background:white;border:1px solid #cbd8ef;border-radius:100px;color:#244b9e;font-size:14px;font-weight:750}.news-filters button.active{background:#244b9e;border-color:#244b9e;color:white}.news-filters button:hover:not(.active){background:#eaf1fe}.listing-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}@media(max-width:900px){.listing-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.listing-heading{align-items:start;flex-direction:column}}@media(max-width:600px){.news-hero{min-height:320px}.news-hero .news-container{padding-block:52px}.news-hero span{font-size:16px}.news-listing{padding:52px 0 65px}.listing-grid{grid-template-columns:1fr}}
</style>
