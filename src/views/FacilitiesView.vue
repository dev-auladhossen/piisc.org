<script setup>
import { Presentation, BookOpen, FlaskConical, Monitor, Heart, Trophy, ShieldCheck, Palette, Users } from 'lucide-vue-next'
import cover from '../assets/images/studytime.jpg'
import { useI18n } from '../composables/useI18n.js'
const { language } = useI18n()
const text = pair => pair[language.value === 'bn' ? 1 : 0]
const facilities = [
 {icon:Presentation,title:['Classrooms & learning spaces','শ্রেণিকক্ষ ও শিক্ষার পরিবেশ'],detail:['Spaces for lessons, discussion, and learning together.','পাঠদান, আলোচনা ও একসঙ্গে শেখার পরিবেশ।']},
 {icon:BookOpen,title:['Library & reading resources','লাইব্রেরি ও পাঠ উপকরণ'],detail:['Ask the school about its current collection and reading resources.','বর্তমান বইয়ের সংগ্রহ ও পাঠ উপকরণ সম্পর্কে স্কুলে জানুন।']},
 {icon:FlaskConical,title:['Science learning','বিজ্ঞান শিক্ষা'],detail:['Contact us for details of practical learning and laboratory arrangements.','ব্যবহারিক শিক্ষা ও ল্যাবের ব্যবস্থা সম্পর্কে জানতে যোগাযোগ করুন।']},
 {icon:Monitor,title:['Computer & digital learning','কম্পিউটার ও ডিজিটাল শিক্ষা'],detail:['Confirm available equipment and access for your child’s grade.','আপনার সন্তানের শ্রেণির জন্য সরঞ্জাম ও ব্যবহারের সুযোগ নিশ্চিত করুন।']},
 {icon:Heart,title:['Faith & Islamic learning','বিশ্বাস ও ইসলামী শিক্ষা'],detail:['Learn about arrangements for prayer and Islamic learning at PIISC.','পিআইআইএসসিতে নামাজ ও ইসলামী শিক্ষার ব্যবস্থা সম্পর্কে জানুন।']},
 {icon:Trophy,title:['Sports & active play','খেলাধুলা ও শরীরচর্চা'],detail:['Explore school activities and ask about current play-space access.','স্কুলের কার্যক্রম দেখুন এবং খেলার স্থান ব্যবহারের সুযোগ সম্পর্কে জানুন।']},
 {icon:Palette,title:['Creative classroom activities','সৃজনশীল শ্রেণিকক্ষ কার্যক্রম'],detail:['Making, drawing, and shared projects encourage expression and discovery.','তৈরি করা, আঁকা ও যৌথ প্রকল্প আত্মপ্রকাশ ও অনুসন্ধানকে উৎসাহিত করে।']},
 {icon:Users,title:['Family & school partnership','পরিবার ও স্কুলের অংশীদারিত্ব'],detail:['Connect with the school team about learning needs and student progress.','শিক্ষার প্রয়োজন ও শিক্ষার্থীর অগ্রগতি নিয়ে স্কুলের সঙ্গে কথা বলুন।']},
 {icon:ShieldCheck,title:['Campus safety arrangements','ক্যাম্পাসের নিরাপত্তা ব্যবস্থা'],detail:['Discuss supervision, access, and current safety procedures during your visit.','পরিদর্শনের সময় তত্ত্বাবধান, প্রবেশাধিকার ও নিরাপত্তার নিয়ম সম্পর্কে জানুন।']},
]
</script>
<template>
 <div class="facilities-page">
  <section class="facilities-hero" aria-labelledby="facilities-title">
   <img :src="cover" :alt="text(['Students learning at PIISC','পিআইআইএসসিতে শিক্ষার্থীদের পাঠদান'])" fetchpriority="high"/>
   <div class="facilities-width facilities-hero-copy">
    <p class="facilities-eyebrow">{{ text(['FACILITIES','সুযোগ-সুবিধা']) }}</p>
    <h1 id="facilities-title">{{ text(['Facilities at a Glance','এক নজরে সুযোগ-সুবিধা']) }}</h1>
    <p>{{ text(['Explore the spaces and support behind learning at Peace International Islamic School & College, from classroom discovery to creativity, faith, and active school life.','পিস ইন্টারন্যাশনাল ইসলামিক স্কুল অ্যান্ড কলেজের শ্রেণিকক্ষের শিক্ষা, সৃজনশীলতা, বিশ্বাস ও সক্রিয় স্কুলজীবনের পরিবেশ এবং সহায়তা সম্পর্কে জানুন।']) }}</p>
   </div>
  </section>
  <section class="facilities-width facilities-content" :aria-label="text(['PIISC facilities and learning support','পিআইআইএসসির সুযোগ-সুবিধা ও শিক্ষায় সহায়তা'])">
   <ul class="facilities-cards">
    <li v-for="facility in facilities" :key="facility.title[0]">
     <span class="facility-symbol"><component :is="facility.icon" :size="23" :stroke-width="1.7" aria-hidden="true"/></span>
     <div><h2>{{ text(facility.title) }}</h2><p>{{ text(facility.detail) }}</p></div>
    </li>
   </ul>
   <p class="facility-note">{{ text(['Facilities and access may vary by grade. Library, laboratory, prayer-space, and safety arrangements are awaiting confirmation; please contact PIISC for current details or arrange a visit.','শ্রেণিভেদে সুবিধা ও ব্যবহারের সুযোগ আলাদা হতে পারে। লাইব্রেরি, ল্যাব, নামাজের স্থান ও নিরাপত্তার ব্যবস্থা নিশ্চিতকরণের অপেক্ষায় রয়েছে; বর্তমান তথ্য বা পরিদর্শনের জন্য পিআইআইএসসিতে যোগাযোগ করুন।']) }}</p>
  </section>
 </div>
</template>
<style scoped>
.facilities-page{background:linear-gradient(180deg,#fff,#f9faff);color:#0a2948}.facilities-width{width:calc(100% - clamp(32px,6.5vw,128px));max-width:1800px;margin-inline:auto}.facilities-hero{position:relative;isolation:isolate;overflow:hidden;background:#0a2948}.facilities-hero>img{position:absolute;inset:0;z-index:-2;width:100%;height:100%;object-fit:cover;object-position:center 45%}.facilities-hero::after{content:'';position:absolute;inset:0;z-index:-1;background:linear-gradient(100deg,#294e9ef5,#294e9edb 65%,#0a2948b8)}.facilities-hero-copy{padding-block:clamp(64px,7vw,112px)}.facilities-eyebrow{color:#f3cc48;font-size:13px;font-weight:700;letter-spacing:.18em;margin-bottom:24px}.facilities-hero h1{color:#fff;font-size:clamp(36px,5vw,74px);line-height:1.12;margin-bottom:26px}.facilities-hero-copy>p:last-child{max-width:930px;font-size:clamp(17px,1.4vw,22px);line-height:1.8;color:#edf2fa}.facilities-content{padding-block:64px 44px}.facilities-cards{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.facilities-cards li{display:flex;align-items:flex-start;gap:18px;padding:26px;border:1px solid #dde5f1;border-radius:6px;background:white;box-shadow:0 12px 32px #173a6a07;transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease}.facility-symbol{display:grid;place-items:center;flex:0 0 48px;height:48px;border-radius:50%;background:#fff8d8;color:#294e9e;transition:background .3s,color .3s}.facilities-cards h2{font-size:17px;line-height:1.5;color:#0a2948;margin:0 0 9px}.facilities-cards p{color:#5d6e86;font-size:14px;line-height:1.75}.facilities-cards li:hover{transform:translateY(-4px);border-color:#d9b33d;box-shadow:0 18px 38px #173a6a13}.facilities-cards li:hover .facility-symbol{background:#294e9e;color:#f3cc48}.facility-note{font-size:14px;color:#67768b;line-height:1.8;max-width:1100px;margin-top:28px}@media(max-width:1050px){.facilities-cards{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:640px){.facilities-cards{grid-template-columns:1fr;gap:14px}.facilities-cards li{padding:22px}.facilities-content{padding-block:40px 30px}.facilities-hero-copy{padding-block:56px 64px}}@media(prefers-reduced-motion:reduce){.facilities-cards li,.facility-symbol{transition:none}.facilities-cards li:hover{transform:none}}
</style>
