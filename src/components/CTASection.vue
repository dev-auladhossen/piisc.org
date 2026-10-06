<script setup>
import { useI18n } from '../composables/useI18n.js'
import BaseButton from './BaseButton.vue'
const {t}=useI18n()
</script>
<template><section class="cta-section [background:#092645] [color:white] p-[88px_0] relative overflow-hidden"><div class="container cta-layout flex items-center justify-between gap-[55px] relative z-[1]"><div class="max-w-[700px]"><span class="eyebrow [.cta-layout_&]:[color:#dcbf7d]">{{$tr(t.nav.admissions)}}</span><h2 class="[font-size:clamp(36px,4vw,58px)] leading-[1.15] m-[16px_0]">{{$tr(t.home.ctaTitle)}}</h2><p class="[color:#d4e0e3] max-w-[610px]">{{$tr(t.home.ctaText)}}</p></div><BaseButton to="/contact" light>{{$tr(t.common.contact)}}</BaseButton></div></section></template>
