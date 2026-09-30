<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { notices } from '../data/notices.js'
import { useI18n } from '../composables/useI18n.js'
const { language } = useI18n()
const route = useRoute()
const documents = notices.filter(notice => notice.pdf)
const selected = computed(() => documents.find(notice => notice.id === route.params.id))
const date = value => new Intl.DateTimeFormat(language.value === 'bn' ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${value}T12:00:00`))
</script>
<template>
  <section class="document-page container">
    <RouterLink class="back-link" to="/notices">{{ $tr("← All notices") }}</RouterLink>
    <div v-if="selected" class="document-layout">
      <nav class="document-sidebar" :aria-label="$tr(&quot;Choose a notice&quot;)"><RouterLink v-for="notice in documents" :key="notice.id" :to="`/notices/${notice.id}`" :class="{ selected: selected.id === notice.id }" :aria-current="selected.id === notice.id ? 'page' : undefined"><strong lang="bn">{{ $tr(notice.title) }}</strong><span>{{ $tr(date(notice.published)) }}</span><small v-if="notice.demo">{{ $tr("Demo PDF · নমুনা") }}</small></RouterLink></nav>
      <article class="document-content"><h1 lang="bn">{{ $tr(selected.title) }}</h1><div class="document-toolbar"><p v-if="selected.demo">নমুনা বিজ্ঞপ্তি — আনুষ্ঠানিক ঘোষণা নয়।</p><div><a :href="selected.pdf" target="_blank" rel="noopener">{{ $tr("Open PDF ↗") }}</a><a :href="selected.pdf" download>{{ $tr("Download ↓") }}</a></div></div>
        <object :key="selected.id" :data="`${selected.pdf}#toolbar=1&navpanes=1&view=FitH`" type="application/pdf" class="pdf-reader" :aria-label="$tr(selected.title)"><div class="pdf-fallback"><p>{{ $tr("Your browser cannot display this PDF inline.") }}</p><a :href="selected.pdf" target="_blank" rel="noopener">{{ $tr("Open the PDF to read it") }}</a></div></object>
      </article>
    </div>
    <div v-else class="missing-notice"><h1>{{ $tr("Notice not found") }}</h1><p>{{ $tr("Select a document from the notice board.") }}</p></div>
  </section>
</template>
<style scoped>
.document-page{padding-block:38px 70px}.back-link{display:inline-block;color:#0e5b4a;font-size:14px;margin-bottom:28px}.back-link:hover{text-decoration:underline}.document-layout{display:grid;grid-template-columns:260px minmax(0,1fr);gap:30px;align-items:start}.document-sidebar{padding:14px;border:1px solid #c6d8cf;background:white;display:grid;gap:4px}.document-sidebar a{padding:20px 16px;border-bottom:1px solid #e0e7e1;transition:background .25s,color .25s}.document-sidebar a:last-child{border-bottom:0}.document-sidebar a:hover{background:#eaf2ed}.document-sidebar a.selected{background:#0e5b4a;color:white}.document-sidebar strong{display:block;font-size:20px;font-weight:500;line-height:1.5}.document-sidebar span{display:block;font-size:13px;margin-top:16px}.document-sidebar small{display:block;margin-top:8px;font-size:11px}.document-content{min-width:0}.document-content h1{font-family:'Nirmala UI',sans-serif;font-size:clamp(28px,3vw,42px);line-height:1.4;color:#082a47;margin:0 0 18px}.document-toolbar{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding:12px 16px;background:#f6f1e6;border:1px solid #e4d7b9;font-size:13px}.document-toolbar>div{display:flex;gap:12px}.document-toolbar a{color:#0e5b4a;font-weight:700;transition:color .2s}.document-toolbar a:hover{color:#906b25}.pdf-reader{display:block;width:100%;height:75dvh;min-height:450px;background:#303030;border:0}.pdf-fallback{padding:35px;color:white}.pdf-fallback a{display:inline-block;margin-top:15px;text-decoration:underline}.missing-notice{padding:50px 0}
@media(max-width:800px){.document-layout{grid-template-columns:1fr;gap:24px}.document-sidebar{grid-template-columns:repeat(3,minmax(0,1fr));padding:7px}.document-sidebar a{padding:12px 8px;border-bottom:0}.document-sidebar strong{font-size:16px}.document-sidebar span{font-size:11px;margin-top:8px}.pdf-reader{height:70dvh;min-height:360px}}
@media(max-width:430px){.document-sidebar{grid-template-columns:1fr}.document-sidebar a{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.document-sidebar span,.document-sidebar small{margin:0}.document-toolbar>div{flex-wrap:wrap}}
</style>
