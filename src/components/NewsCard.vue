<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
import { useI18n } from '../composables/useI18n.js'
defineProps({item:Object})
const {language,t}=useI18n()
</script>
<template><article class="news-card"><RouterLink :to="`/news/${item.slug}`" class="news-image"><img :src="item.image" :alt="$tr(item.title[language])" loading="lazy"/></RouterLink><div class="news-info"><span class="eyebrow">{{$tr(item.category==='event'?t.news.event:t.news.news)}} · {{$tr(t.news.sample)}}</span><h3><RouterLink :to="`/news/${item.slug}`">{{$tr(item.title[language])}}</RouterLink></h3><p>{{$tr(item.excerpt[language])}}</p><RouterLink :to="`/news/${item.slug}`" class="text-link">{{$tr(t.common.read)}} <ArrowUpRight :size="16" aria-hidden="true"/></RouterLink></div></article></template>
