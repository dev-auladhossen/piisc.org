<script setup>
import { ArrowRight, CircleCheck } from 'lucide-vue-next'
import cover from '../assets/images/orientation.jpg'
import { useI18n } from '../composables/useI18n.js'
const { language } = useI18n()
const copy = (en, bn) => language.value === 'bn' ? bn : en
const grades = Array.from({length:12},(_,index)=>({grade:index+1,age:index+6}))
const number = value => new Intl.NumberFormat(language.value === 'bn' ? 'bn-BD' : 'en').format(value)
const documents = [
 ['Completed admission application form','পূরণকৃত ভর্তি আবেদন ফরম'],
 ['Copy of the student’s birth certificate or passport','শিক্ষার্থীর জন্মনিবন্ধন বা পাসপোর্টের কপি'],
 ['Recent passport-size photographs of the student','শিক্ষার্থীর সাম্প্রতিক পাসপোর্ট আকারের ছবি'],
 ['Passport-size photograph of the parent or guardian','অভিভাবকের পাসপোর্ট আকারের ছবি'],
 ['Copy of the parent or guardian’s National ID','অভিভাবকের জাতীয় পরিচয়পত্রের কপি'],
 ['Previous academic report or transcript, where applicable','প্রযোজ্য ক্ষেত্রে পূর্ববর্তী শিক্ষাপ্রতিষ্ঠানের ফলাফল বা নম্বরপত্র'],
 ['School leaving or transfer certificate, for transfer students','স্থানান্তরিত শিক্ষার্থীদের জন্য ছাড়পত্র'],
 ['For college entry: previous examination results and registration documents, as applicable','কলেজে ভর্তির জন্য প্রযোজ্য পূর্ববর্তী পরীক্ষার ফলাফল ও নিবন্ধনের কাগজপত্র'],
]
</script>
<template>
 <div class="requirements-page">
  <section class="requirements-hero" aria-labelledby="eligibility-title">
   <img :src="cover" :alt="copy('PIISC school orientation programme','পিআইআইএসসির পরিচিতি অনুষ্ঠান')" fetchpriority="high" />
   <div class="requirements-width hero-copy">
    <p class="requirements-eyebrow">{{ copy('ADMISSION','ভর্তি') }}</p>
    <h1 id="eligibility-title">{{ copy('Eligibility for Admission','ভর্তির যোগ্যতা') }}</h1>
    <p>{{ copy('Explore admission to PIISC from Grade 1 through Grade 12. Placement is subject to seat availability, previous academic records, and completion of the admission process.','প্রথম থেকে দ্বাদশ শ্রেণি পর্যন্ত পিআইআইএসসিতে ভর্তির তথ্য জানুন। আসনপ্রাপ্যতা, পূর্ববর্তী শিক্ষাগত ফলাফল ও ভর্তি প্রক্রিয়া সম্পন্ন করার ভিত্তিতে শ্রেণি নির্ধারিত হয়।') }}</p>
   </div>
  </section>
  <section class="requirements-width age-section" aria-labelledby="class-title">
   <p class="requirements-eyebrow">{{ copy('CLASS & AGE GUIDANCE','শ্রেণি ও বয়সের নির্দেশনা') }}</p>
   <h2 id="class-title">{{ copy('Find the right class for your child.','আপনার সন্তানের জন্য উপযুক্ত শ্রেণি বেছে নিন।') }}</h2>
   <div class="table-frame" role="region" :aria-label="copy('Class and age guidance table','শ্রেণি ও বয়সের নির্দেশনা সারণি')" tabindex="0">
    <table aria-describedby="age-note">
     <thead><tr><th scope="col">{{ copy('Grade','শ্রেণি') }}</th><th scope="col">{{ copy('Learning stage','শিক্ষার পর্যায়') }}</th><th scope="col">{{ copy('Typical age range','সাধারণ বয়সসীমা') }}</th></tr></thead>
     <tbody><tr v-for="item in grades" :key="item.grade"><th scope="row">{{ copy('Grade','শ্রেণি') }} {{ number(item.grade) }}</th><td>{{ item.grade <= 5 ? copy('Primary school','প্রাথমিক') : item.grade <= 8 ? copy('Middle school','নিম্ন মাধ্যমিক') : item.grade <= 10 ? copy('Secondary school','মাধ্যমিক') : copy('Higher secondary / College','উচ্চ মাধ্যমিক / কলেজ') }}</td><td>{{ number(item.age) }}–{{ number(item.age + 1) }} {{ copy('years','বছর') }}</td></tr></tbody>
    </table>
   </div>
   <p id="age-note" class="age-note">{{ copy('These ages are general guidance, not fixed PIISC eligibility rules. Please confirm the age cut-off, class placement, subject choices, and Grade 11–12 entry or transfer requirements with the admission office.','এই বয়সসীমা সাধারণ নির্দেশনা, পিআইআইএসসির নির্দিষ্ট ভর্তির নিয়ম নয়। বয়স নির্ধারণের তারিখ, শ্রেণি নির্বাচন, বিষয় এবং একাদশ–দ্বাদশ শ্রেণিতে ভর্তি বা স্থানান্তরের শর্ত ভর্তি অফিস থেকে নিশ্চিত করুন।') }}</p>
  </section>
  <section class="requirements-width documents-section" aria-labelledby="documents-title">
   <div class="documents-copy">
    <p class="requirements-eyebrow">{{ copy('REQUIRED DOCUMENTS','প্রয়োজনীয় কাগজপত্র') }}</p>
    <h2 id="documents-title">{{ copy('Ready your paperwork in advance.','আগেই প্রস্তুত রাখুন প্রয়োজনীয় কাগজপত্র।') }}</h2>
    <p>{{ copy('Prepare the following documents for your application. The admission team will confirm the final requirements and number of copies for your child’s grade.','আবেদনের জন্য নিচের কাগজপত্র প্রস্তুত রাখুন। আপনার সন্তানের শ্রেণি অনুযায়ী চূড়ান্ত তালিকা ও কপির সংখ্যা ভর্তি অফিস নিশ্চিত করবে।') }}</p>
   </div>
   <ul class="document-grid"><li v-for="item in documents" :key="item[0]"><CircleCheck :size="22" aria-hidden="true"/><span>{{ copy(...item) }}</span></li></ul>
   <RouterLink to="/application-process" class="procedure-button">{{ copy('View Admission Procedures','ভর্তি প্রক্রিয়া দেখুন') }}<ArrowRight :size="21" aria-hidden="true"/></RouterLink>
  </section>
 </div>
</template>
<style scoped>
/* Compact rows keep the full grade range easier to scan. */
.requirements-page table{font-size:clamp(13px,1vw,16px)}
.requirements-page th,.requirements-page td{padding:12px 20px;line-height:1.45}
@media(max-width:540px){.requirements-page th,.requirements-page td{padding:10px 12px}}
.requirements-page{background:#fff;color:#0a2948}.requirements-width{width:calc(100% - clamp(32px,6.5vw,128px));max-width:1800px;margin-inline:auto}.requirements-hero{position:relative;isolation:isolate;overflow:hidden;background:#0a2948}.requirements-hero>img{position:absolute;inset:0;z-index:-2;width:100%;height:100%;object-fit:cover;object-position:center 40%}.requirements-hero::after{content:'';position:absolute;inset:0;z-index:-1;background:linear-gradient(100deg,#294e9ef5,#294e9edb 65%,#0a2948bc)}.hero-copy{padding-block:clamp(64px,7vw,112px)}.requirements-eyebrow{color:#b28a29;font-size:13px;font-weight:700;letter-spacing:.18em;margin:0 0 20px}.hero-copy .requirements-eyebrow{color:#f3cc48}.hero-copy h1{color:#fff;font-size:clamp(36px,5vw,76px);line-height:1.12;margin:0 0 26px}.hero-copy>p:last-child{color:#edf2fa;font-size:clamp(17px,1.4vw,22px);line-height:1.8;max-width:920px}.age-section{padding-block:60px}.requirements-page h2{font-size:clamp(30px,3.4vw,52px);line-height:1.15;color:#294e9e;margin:0 0 34px}.table-frame{border:1px solid #dce4f1;border-radius:6px;overflow:auto;box-shadow:0 16px 40px #173a6a08}table{width:100%;border-collapse:collapse;text-align:left;font-size:clamp(14px,1.2vw,18px)}th,td{padding:20px 24px;line-height:1.6}thead{background:#082650;color:#fff}thead th{font-weight:700;width:33.333%}tbody th{font-weight:400}tbody tr{color:#5d6e86;border-top:1px solid #dce4f1}tbody tr:nth-child(even){background:#fcf8f0}tbody tr{transition:background .2s}tbody tr:hover{background:#edf2fb}.age-note{color:#67768b;font-size:14px;line-height:1.8;margin-top:20px;max-width:1100px}.documents-section{display:grid;grid-template-columns:.85fr 1.15fr;gap:36px 60px;padding-block:10px 70px}.documents-copy{max-width:510px}.documents-copy>p:last-child{color:#5d6e86;font-size:18px;line-height:1.8}.document-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;padding:0;margin:0;list-style:none}.document-grid li{display:flex;align-items:flex-start;gap:16px;padding:24px;border:1px solid #dde5f1;border-radius:6px;box-shadow:0 12px 30px #173a6a06;color:#5d6e86;font-size:16px;line-height:1.8;transition:box-shadow .25s,border-color .25s}.document-grid svg{flex-shrink:0;margin-top:3px;color:#294e9e}.document-grid li:hover{border-color:#d9b33d;box-shadow:0 15px 32px #173a6a12}.procedure-button{grid-column:1/-1;justify-self:start;display:inline-flex;align-items:center;gap:14px;border-radius:6px;background:#294e9e;color:white;padding:16px 22px;font-weight:700;cursor:pointer;transition:transform .25s,background .25s,box-shadow .25s}.procedure-button:hover{background:#0a2948;transform:translateY(-3px);box-shadow:0 12px 24px #173a6a24}@media(max-width:900px){.documents-section{grid-template-columns:1fr;gap:28px}.documents-copy{max-width:700px}}@media(max-width:540px){.document-grid{grid-template-columns:1fr}.age-section{padding-block:40px}th,td{padding:14px 12px}table{min-width:440px}.procedure-button{width:100%;justify-content:center}.documents-section{padding-bottom:44px}}@media(prefers-reduced-motion:reduce){.document-grid li,.procedure-button,tbody tr{transition:none}.procedure-button:hover{transform:none}}
</style>
