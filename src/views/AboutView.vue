<script setup>
import { images } from '../data/content.js'
import { useI18n } from '../composables/useI18n.js'
import PageHero from '../components/PageHero.vue'
import SectionHeading from '../components/SectionHeading.vue'
import CTASection from '../components/CTASection.vue'
const {t}=useI18n()
</script>
<template><PageHero :eyebrow="$tr(t.about.eyebrow)" :title="$tr(t.about.title)" :lead="$tr(t.about.lead)"/><section class="section"><div class="container split-layout"><div class="image-frame intro-visual"><img :src="images.campusFront" :alt="$tr(&quot;School supplied PIISC building concept&quot;)"/><span class="image-caption">{{$tr(t.common.concept)}}</span></div><SectionHeading :title="$tr(t.about.storyTitle)" :description="$tr(t.about.story)"/></div></section><section class="section purpose-section"><div class="container"><SectionHeading :eyebrow="$tr(t.home.purposeLabel)" :title="$tr(t.home.purposeTitle)"/><div class="purpose-grid"><article v-for="item in t.home.purpose" :key="item.n"><span>{{$tr(item.n)}}</span><h3>{{$tr(item.title)}}</h3><p>{{$tr(item.body)}}</p></article></div></div></section><section class="section"><div class="container two-column-text"><SectionHeading :title="$tr(t.about.philosophyTitle)" :description="$tr(t.about.philosophy)"/><SectionHeading :title="$tr(t.about.worldTitle)" :description="$tr(t.about.world)"/></div></section><section class="section soft-section"><div class="container"><SectionHeading :title="$tr(t.about.leadershipTitle)" :description="$tr(t.about.leadershipText)"/><div class="placeholder-panel">{{$tr(t.common.coming)}}</div></div></section><CTASection/></template>
