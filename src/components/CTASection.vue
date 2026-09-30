<script setup>
import { useI18n } from '../composables/useI18n.js'
import BaseButton from './BaseButton.vue'
const {t}=useI18n()
</script>
<template><section class="cta-section"><div class="container cta-layout"><div><span class="eyebrow">{{$tr(t.nav.admissions)}}</span><h2>{{$tr(t.home.ctaTitle)}}</h2><p>{{$tr(t.home.ctaText)}}</p></div><BaseButton to="/contact" light>{{$tr(t.common.contact)}}</BaseButton></div></section></template>
