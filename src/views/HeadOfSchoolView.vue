<script setup>
import { leaders } from '../data/leadership.js'
import classroom from '../assets/images/studytime.jpg'
import { useI18n } from '../composables/useI18n.js'
const { language } = useI18n()
const messageLeaders = ['principal', 'chairman'].map(id => leaders.find(leader => leader.id === id)).filter(Boolean)
const copy = (en, bn) => language.value === 'bn' ? bn : en
</script>

<template>
  <div class="hos-page">
    <section class="hos-hero" aria-labelledby="hos-title">
      <img :src="classroom" :alt="$tr('Students learning at PIISC')" fetchpriority="high" />
      <div class="hos-width hos-hero-content">
        <p class="hos-eyebrow">{{ copy('LEADERSHIP MESSAGE', 'প্রতিষ্ঠান প্রধানের বার্তা') }}</p>
        <h1 id="hos-title">{{ copy('Message from the Head of School', 'প্রতিষ্ঠান প্রধানের বার্তা') }}</h1>
        <p>{{ copy('Encouraging curiosity, strengthening character, and growing together in faith.', 'কৌতূহলকে উৎসাহিত করে, চরিত্র গঠনে ও বিশ্বাসে একসঙ্গে এগিয়ে চলা।') }}</p>
      </div>
    </section>

    <section v-for="principal in messageLeaders" :key="principal.id" class="hos-width hos-message-section" :aria-labelledby="`message-${principal.id}`">
      <div class="hos-message-card">
        <aside class="hos-profile">
          <img :src="principal.photo" :alt="$tr(principal.name)" width="360" height="400" />
          <h2>{{ $tr(principal.name) }}</h2>
          <p>{{ principal.id === 'chairman' ? copy('Chairman', 'চেয়ারম্যান') : copy('Principal · Head of School', 'অধ্যক্ষ · প্রতিষ্ঠান প্রধান') }}</p>
          <p>{{ copy('Peace International Islamic School & College', 'পিস ইন্টারন্যাশনাল ইসলামিক স্কুল অ্যান্ড কলেজ') }}</p>
        </aside>
        <article class="hos-letter">
          <h2 :id="`message-${principal.id}`" class="hos-message-heading">{{ principal.id === 'chairman' ? copy('Message from the Chairman', 'চেয়ারম্যানের বার্তা') : copy('Message from the Principal', 'অধ্যক্ষের বার্তা') }}</h2>
          <p class="hos-greeting" lang="ar" dir="rtl">السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ</p>
          <p v-if="principal.draft" class="hos-draft">{{ copy('Welcome message · Draft pending approval', 'স্বাগত বার্তা · অনুমোদনের অপেক্ষায় খসড়া') }}</p>
          <p v-for="paragraph in principal.paragraphs.slice(1)" :key="paragraph">{{ $tr(paragraph) }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hos-message-heading{margin:0 0 24px;color:#294e9e;font-size:clamp(23px,2vw,30px);line-height:1.3}
.hos-message-section + .hos-message-section{padding-top:0}
.hos-page{background:linear-gradient(180deg,#fff,#f8f9fc);color:#0a2948}.hos-width{width:calc(100% - clamp(32px,6.5vw,128px));max-width:1800px;margin-inline:auto}.hos-hero{position:relative;isolation:isolate;overflow:hidden;background:#0a2948}.hos-hero>img{position:absolute;inset:0;width:100%;height:100%;z-index:-2;object-fit:cover;object-position:center 45%}.hos-hero::after{content:'';position:absolute;inset:0;z-index:-1;background:linear-gradient(100deg,#294e9ef5,#294e9ed9 65%,#0a2948c9)}.hos-hero-content{padding-block:clamp(64px,7vw,112px)}.hos-eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;color:#f3cc48;margin-bottom:24px}.hos-hero h1{max-width:1100px;color:#fff;font-size:clamp(36px,5vw,78px);line-height:1.1;margin:0 0 28px;text-wrap:balance}.hos-hero-content>p:last-child{font-size:clamp(17px,1.5vw,23px);line-height:1.75;color:#edf2fa;max-width:1000px}.hos-message-section{padding-block:clamp(40px,4vw,70px) 48px}.hos-message-card{display:grid;grid-template-columns:minmax(220px,.8fr) minmax(0,2fr);align-items:start;gap:clamp(30px,5vw,80px);padding:clamp(24px,3vw,48px);border:1px solid #dde5f1;border-radius:6px;background:#fff;box-shadow:0 18px 50px #173a6a08}.hos-profile>img{width:100%;max-height:440px;object-fit:cover;object-position:center top;border-radius:6px;border:1px solid #e0e6ef;background:#f3f5f9}.hos-profile h2{color:#294e9e;font-size:21px;line-height:1.4;margin:22px 0 8px}.hos-profile p{font-size:16px;color:#5d6e86;line-height:1.7}.hos-letter>p{color:#5d6e86;font-size:clamp(17px,1.35vw,21px);line-height:1.85;margin:0 0 26px}.hos-letter>p:last-child{margin-bottom:0}.hos-letter .hos-greeting{width:fit-content;font-family:'Traditional Arabic','Noto Naskh Arabic','Times New Roman',serif;font-size:26px;line-height:1.7;color:#294e9e}.hos-letter .hos-draft{font-size:12px;color:#8c691e;border-left:2px solid #d9b33d;padding-left:12px;margin-bottom:24px}@media(max-width:760px){.hos-message-card{grid-template-columns:1fr;gap:30px}.hos-profile{max-width:360px}.hos-profile>img{max-height:340px;height:auto}.hos-hero-content{padding-block:56px 64px}.hos-message-section{padding-bottom:30px}}
</style>
