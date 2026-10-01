<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import { newsEvents } from '../data/newsEvents.js'
import { useI18n } from '../composables/useI18n.js'
import NewsEventCard from '../components/NewsEventCard.vue'
const route = useRoute()
const { language } = useI18n()
const tr = (en, bn) => language.value === 'bn' ? bn : en
const article = computed(() => newsEvents.find(item => item.slug === route.params.slug))
const related = computed(() => newsEvents.filter(item => item.slug !== route.params.slug).slice(0, 3))
</script>
<template>
  <main v-if="article" class="story-page"><article class="story"><div class="story-width"><RouterLink to="/news" class="back-link"><ArrowLeft :size="18" aria-hidden="true" />{{ tr('Back to News & Events', 'সংবাদ ও অনুষ্ঠানে ফিরুন') }}</RouterLink><p class="story-meta">{{ article.category === 'news' ? tr('NEWS', 'সংবাদ') : tr('EVENT', 'অনুষ্ঠান') }} · {{ article.year }}</p><h1>{{ article.title[language] }}</h1><p class="story-lead">{{ article.excerpt[language] }}</p><img class="story-cover" :src="article.image" :alt="article.title[language]" /><p class="story-body">{{ article.body[language] }}</p><div v-if="article.gallery.length > 1" class="story-gallery"><h2>{{ tr('Moments from the programme', 'অনুষ্ঠানের কিছু মুহূর্ত') }}</h2><div><img v-for="(photo, index) in article.gallery" :key="photo" :src="photo" :alt="`${article.title[language]} — ${index + 1}`" loading="lazy" /></div></div></div></article><section class="related-stories"><div class="story-width"><h2>{{ tr('More from PIISC', 'পিআইআইএসসি থেকে আরও খবর') }}</h2><div class="related-grid"><NewsEventCard v-for="item in related" :key="item.slug" :item="item" /></div></div></section></main>
  <main v-else class="story-missing"><h1>{{ tr('Story not found', 'খবরটি পাওয়া যায়নি') }}</h1><RouterLink to="/news">{{ tr('Browse News & Events', 'সংবাদ ও অনুষ্ঠান দেখুন') }}</RouterLink></main>
</template>
<style scoped>
.story{background:#fff;padding:70px 0 85px}.story-width{width:calc(100% - clamp(32px,6.5vw,128px));max-width:1200px;margin-inline:auto}.back-link{display:inline-flex;gap:8px;align-items:center;color:#244b9e;font-weight:750;font-size:14px;margin-bottom:42px}.back-link:hover{text-decoration:underline}.story-meta{color:#bc9223;letter-spacing:.16em;font-weight:800;font-size:12px;margin-bottom:14px}.story h1{font-size:clamp(38px,4.4vw,66px);line-height:1.12;color:#244b9e;max-width:1000px;margin:0 0 19px}.story-lead{font-size:clamp(17px,1.6vw,21px);line-height:1.7;color:#536989;max-width:850px;margin-bottom:34px}.story-cover{display:block;width:100%;max-height:630px;aspect-ratio:1.7;object-fit:cover;border-radius:8px}.story-body{font-size:18px;line-height:1.85;color:#405775;max-width:900px;margin:35px 0}.story-gallery{border-top:1px solid #dce3f0;padding-top:28px}.story-gallery h2,.related-stories h2{font-size:clamp(26px,2.7vw,38px);color:#244b9e;margin:0 0 22px}.story-gallery>div{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px}.story-gallery img{width:100%;aspect-ratio:1.4;object-fit:cover;border-radius:6px}.related-stories{padding:65px 0 80px;background:#f4f7fc}.related-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.story-missing{text-align:center;padding:100px 20px}.story-missing h1{color:#244b9e;margin-bottom:20px}.story-missing a{color:#244b9e;text-decoration:underline}@media(max-width:850px){.related-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.related-grid>:last-child{display:none}}@media(max-width:600px){.story{padding:50px 0 60px}.back-link{margin-bottom:28px}.story-gallery>div{grid-template-columns:1fr 1fr}.related-grid{grid-template-columns:1fr}.related-grid>:last-child{display:flex}.story-body{font-size:16px}}
</style>
