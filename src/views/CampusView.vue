<script setup>
import { images } from '../data/content.js'
import { useI18n } from '../composables/useI18n.js'
import PageHero from '../components/PageHero.vue'
import SectionHeading from '../components/SectionHeading.vue'
import FacilityCard from '../components/FacilityCard.vue'
import Gallery from '../components/Gallery.vue'
import CTASection from '../components/CTASection.vue'
const {t}=useI18n()
</script>
<template><PageHero :eyebrow="$tr(t.campus.eyebrow)" :title="$tr(t.campus.title)" :lead="$tr(t.campus.lead)"/><section class="campus-banner"><img :src="images.campusFront" :alt="$tr(&quot;School supplied front building concept for PIISC&quot;)"/><span>{{$tr(t.common.concept)}}</span></section><section class="section"><div class="container"><SectionHeading :title="$tr(t.campus.facilitiesTitle)"/><div class="facilities-grid"><FacilityCard v-for="(item,index) in t.campus.facilities" :key="item.title" :item="item" :index="index"/></div></div></section><section class="section soft-section"><div class="container"><SectionHeading :title="$tr(t.campus.galleryTitle)" :description="$tr(t.campus.galleryText)"/><Gallery/></div></section><CTASection/></template>
