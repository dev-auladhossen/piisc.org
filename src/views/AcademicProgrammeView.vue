<script setup>
import { computed } from 'vue'
import { academicProgrammes } from '../data/academicProgrammes.js'
import { useI18n } from '../composables/useI18n.js'
defineOptions({ name: 'AcademicProgrammeView' })
const props = defineProps({ programme: { type: String, required: true } })
const { language } = useI18n()
const text = pair => pair[language.value === 'bn' ? 1 : 0]
const page = computed(() => academicProgrammes.find(item => item.id === props.programme))
</script>
<template>
 <div class="academic-page">
  <section class="academic-hero"><img :src="page.image" :alt="text(['Learning at PIISC','পিআইআইএসসিতে শিক্ষা কার্যক্রম'])" fetchpriority="high"/><div class="academic-width hero-copy"><p class="academic-eyebrow">{{ text(page.range) }}</p><h1>{{ text(page.title) }}</h1><p>{{ text(page.lead) }}</p></div></section>
  <section class="academic-width programme-content" :aria-label="text(['Learning priorities','শিক্ষার অগ্রাধিকার'])"><div class="priority-grid"><article v-for="card in page.cards" :key="card[0][0]"><h2>{{ text(card[0]) }}</h2><p>{{ text(card[1]) }}</p></article></div><RouterLink class="academic-button" to="/admission-requirement">{{ text(['Ask About Admission','ভর্তি সম্পর্কে জানুন']) }}</RouterLink></section>
 </div>
</template>
<style scoped>
.academic-page{background:white}.academic-width{width:calc(100% - clamp(32px,6.5vw,128px));max-width:1800px;margin-inline:auto}.academic-hero{position:relative;isolation:isolate;background:#0a2948;overflow:hidden}.academic-hero>img{position:absolute;inset:0;z-index:-2;width:100%;height:100%;object-fit:cover}.academic-hero::after{content:'';position:absolute;inset:0;z-index:-1;background:linear-gradient(100deg,#294e9ef5,#294e9edb 65%,#0a2948b8)}.hero-copy{padding-block:clamp(64px,7vw,112px)}.academic-eyebrow{color:#f3cc48;font-size:13px;letter-spacing:.18em;font-weight:700;margin-bottom:24px}.hero-copy h1{color:white;font-size:clamp(36px,5vw,74px);line-height:1.12;margin-bottom:24px}.hero-copy>p:last-child{max-width:950px;color:#edf2fa;font-size:clamp(17px,1.4vw,22px);line-height:1.8}.programme-content{padding-block:64px}.priority-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}.priority-grid article{border:1px solid #dde5f1;border-radius:6px;padding:30px;background:#fff;box-shadow:0 12px 32px #173a6a08;transition:transform .3s,box-shadow .3s,border-color .3s}.priority-grid article:hover{transform:translateY(-4px);border-color:#d9b33d;box-shadow:0 18px 38px #173a6a12}.priority-grid h2{color:#294e9e;font-size:23px;margin-bottom:14px}.priority-grid p{color:#5d6e86;font-size:17px;line-height:1.8}.academic-button{display:inline-flex;margin-top:28px;padding:15px 22px;border-radius:6px;background:#294e9e;color:#fff;font-weight:700;cursor:pointer;transition:background .25s,transform .25s}.academic-button:hover{background:#0a2948;transform:translateY(-3px)}@media(max-width:760px){.priority-grid{grid-template-columns:1fr;gap:16px}.programme-content{padding-block:40px}}@media(prefers-reduced-motion:reduce){.priority-grid article,.academic-button{transition:none}.priority-grid article:hover,.academic-button:hover{transform:none}}
</style>
