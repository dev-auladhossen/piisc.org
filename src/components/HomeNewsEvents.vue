<script setup>
import { ArrowRight } from 'lucide-vue-next'
import { newsEvents } from '../data/newsEvents.js'
import { useI18n } from '../composables/useI18n.js'
import NewsEventCard from './NewsEventCard.vue'
const { language } = useI18n()
const tr = (en, bn) => language.value === 'bn' ? bn : en
</script>
<template>
  <section class="home-news" aria-labelledby="home-news-title"><div class="news-width">
    <div class="news-heading"><div class="heading-center"><span class="news-label">{{ tr('LATEST', 'সর্বশেষ') }}</span><h2 id="home-news-title">{{ tr('News & Events', 'সংবাদ ও অনুষ্ঠান') }}</h2><span class="heading-rule" aria-hidden="true"></span></div><RouterLink to="/news" class="view-all">{{ tr('View all', 'সব দেখুন') }} <ArrowRight :size="18" aria-hidden="true" /></RouterLink></div>
    <div class="home-news-grid"><NewsEventCard v-for="item in newsEvents.slice(0, 3)" :key="item.slug" :item="item" /></div>
  </div></section>
</template>
<style scoped>
.home-news{padding:76px 0 88px;background:#f4f7fc}.news-width{width:calc(100% - clamp(32px,6.5vw,128px));max-width:1500px;margin-inline:auto}.news-heading{position:relative;display:flex;justify-content:center;align-items:center;margin-bottom:44px}.heading-center{text-align:center}.news-label{display:inline-block;border:1px solid #c5d8fb;border-radius:100px;background:#e9f1ff;color:#244b9e;padding:8px 19px;font-size:12px;font-weight:800;letter-spacing:.18em}.news-heading h2{color:#173f8e;font-size:clamp(32px,3.3vw,48px);margin:12px 0 11px}.heading-rule{display:block;width:68px;height:4px;background:#d5a72a;border-radius:100px;margin:auto}.view-all{position:absolute;right:0;top:50%;transform:translateY(-50%);display:inline-flex;align-items:center;justify-content:center;gap:7px;border-radius:100px;background:#244b9e;color:white;padding:12px 24px;font-size:14px;font-weight:800}.view-all:hover{background:#173a80}.home-news-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}@media(max-width:850px){.home-news-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.home-news-grid>:last-child{display:none}}@media(max-width:620px){.home-news{padding:52px 0 64px}.news-heading{display:block;text-align:center;margin-bottom:27px}.view-all{position:static;transform:none;margin-top:22px}.home-news-grid{grid-template-columns:1fr}.home-news-grid>:last-child{display:flex}}
</style>
