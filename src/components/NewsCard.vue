<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
import { useI18n } from '../composables/useI18n.js'
defineProps({item:Object})
const {language,t}=useI18n()
</script>
<template><article class="news-card [background:#fff] [border:1px_solid_#e4eae5] min-w-[0]"><RouterLink :to="`/news/${item.slug}`" class="news-image h-[260px] block overflow-hidden [background:#e8edec]"><img class="w-[100%] h-[100%] object-cover [transition:transform_.5s]" :src="item.image" :alt="$tr(item.title[language])" loading="lazy"/></RouterLink><div class="news-info p-[24px_25px_30px]"><span class="eyebrow [.news-info_&]:[font-size:10px] [.news-info_&]:tracking-[.1em]">{{$tr(item.category==='event'?t.news.event:t.news.news)}} · {{$tr(t.news.sample)}}</span><h3 class="[font-family:Georgia,'Noto_Sans_Bengali',serif] [font-size:24px] font-[500] [color:#092645] leading-[1.28] m-[12px_0]"><RouterLink :to="`/news/${item.slug}`">{{$tr(item.title[language])}}</RouterLink></h3><p class="[font-size:14px] [color:#65737a] mb-[20px]">{{$tr(item.excerpt[language])}}</p><RouterLink :to="`/news/${item.slug}`" class="text-link">{{$tr(t.common.read)}} <ArrowUpRight :size="16" aria-hidden="true"/></RouterLink></div></article></template>
