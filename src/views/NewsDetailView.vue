<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { news } from '../data/content.js'
import { useI18n } from '../composables/useI18n.js'
const route=useRoute(), {t,language}=useI18n(), article=computed(()=>news.find(item=>item.slug===route.params.slug))
</script>
<template><article v-if="article" class="section article-page"><div class="container narrow-content"><RouterLink to="/news" class="text-link">← {{$tr(t.common.back)}}</RouterLink><span class="eyebrow article-tag">{{$tr(t.news.sample)}}</span><h1>{{$tr(article.title[language])}}</h1><p class="article-lead">{{$tr(article.excerpt[language])}}</p><figure><img :src="article.image" :alt="$tr(article.title[language])"/><figcaption>{{$tr(t.common.concept)}}</figcaption></figure><p>{{$tr(article.body[language])}}</p></div></article><section v-else class="section"><div class="container"><h1>{{$tr(t.common.coming)}}</h1><RouterLink to="/news">{{$tr(t.common.back)}}</RouterLink></div></section></template>
