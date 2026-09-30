<script setup>
import { computed,ref } from 'vue'
import { news } from '../data/content.js'
import { useI18n } from '../composables/useI18n.js'
import PageHero from '../components/PageHero.vue'
import NewsCard from '../components/NewsCard.vue'
const {t}=useI18n(), selected=ref('all'), filtered=computed(()=>selected.value==='all'?news:news.filter(item=>item.category===selected.value))
</script>
<template><PageHero :eyebrow="$tr(t.news.eyebrow)" :title="$tr(t.news.title)" :lead="$tr(t.news.lead)"/><section class="section"><div class="container"><div class="filter-row" :aria-label="$tr(&quot;News filters&quot;)"><button v-for="key in ['all','news','event']" :key="key" type="button" :class="{active:selected===key}" :aria-pressed="selected===key" @click="selected=key">{{$tr(t.news[key])}}</button></div><div class="news-grid three"><NewsCard v-for="item in filtered" :key="item.slug" :item="item"/></div><p v-if="!filtered.length">{{$tr(t.news.empty)}}</p></div></section></template>
