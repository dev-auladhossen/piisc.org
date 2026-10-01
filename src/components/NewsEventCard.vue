<script setup>
import { ArrowRight } from 'lucide-vue-next'
import { useI18n } from '../composables/useI18n.js'
defineProps({ item: { type: Object, required: true } })
const { language } = useI18n()
const tr = (en, bn) => language.value === 'bn' ? bn : en
</script>
<template>
  <article class="event-card">
    <RouterLink :to="`/news/${item.slug}`" class="event-image" :aria-label="item.title[language]"><img :src="item.image" :alt="item.title[language]" loading="lazy" width="600" height="360" /><span>{{ item.category === 'news' ? tr('NEWS', 'সংবাদ') : tr('EVENT', 'অনুষ্ঠান') }}</span></RouterLink>
    <div class="event-content"><p class="event-meta">{{ tr('PIISC · Orientation', 'পিআইআইএসসি · ওরিয়েন্টেশন') }} {{ item.year }}</p><h3><RouterLink :to="`/news/${item.slug}`">{{ item.title[language] }}</RouterLink></h3><p class="event-excerpt">{{ item.excerpt[language] }}</p><RouterLink :to="`/news/${item.slug}`" class="event-read">{{ tr('Read story', 'বিস্তারিত পড়ুন') }} <ArrowRight :size="17" aria-hidden="true" /></RouterLink></div>
  </article>
</template>
<style scoped>
.event-card{min-width:0;background:#fff;border:1px solid #e0e7f3;border-radius:12px;overflow:hidden;box-shadow:0 12px 32px #173a6a0c;display:flex;flex-direction:column;transition:transform .25s,box-shadow .25s}.event-card:hover{transform:translateY(-4px);box-shadow:0 18px 36px #173a6a1c}.event-image{display:block;position:relative;overflow:hidden;aspect-ratio:1.72;background:#e8eef8}.event-image img{width:100%;height:100%;object-fit:cover;transition:transform .4s}.event-card:hover .event-image img{transform:scale(1.04)}.event-image span{position:absolute;top:14px;left:14px;background:#dfac28;color:#14366e;padding:7px 13px;border-radius:100px;font-size:11px;letter-spacing:.08em;font-weight:800}.event-content{display:flex;align-items:flex-start;flex-direction:column;flex:1;padding:22px}.event-meta{font-size:12px;color:#60718e;margin-bottom:10px}.event-content h3{font-size:21px;line-height:1.35;color:#173f8e;margin:0 0 10px}.event-content h3 a:hover{color:#0c2d6d}.event-excerpt{font-size:15px;line-height:1.65;color:#536989;margin-bottom:19px}.event-read{display:inline-flex;align-items:center;gap:6px;margin-top:auto;color:#244b9e;font-size:14px;font-weight:800}.event-read:hover{text-decoration:underline}@media(prefers-reduced-motion:reduce){.event-card,.event-image img{transition:none}.event-card:hover,.event-card:hover .event-image img{transform:none}}
</style>
