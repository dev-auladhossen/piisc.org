<script setup>
import community from '../assets/images/girls-group.jpg'
import { useI18n } from '../composables/useI18n.js'
const { language } = useI18n()
const copy = (en, bn) => language.value === 'bn' ? bn : en
</script>

<template>
  <div class="vision-page">
    <section class="vision-hero" aria-labelledby="vision-page-title">
      <img :src="community" :alt="copy('Students in the PIISC school community', 'পিআইআইএসসির শিক্ষার্থীরা')" fetchpriority="high" />
      <div class="vision-width vision-hero-content">
        <p class="vision-eyebrow">{{ copy('VISION & MISSION', 'ভিশন ও মিশন') }}</p>
        <h1 id="vision-page-title">{{ copy('Knowledge with purpose. Faith in action. Leadership with compassion.', 'উদ্দেশ্যপূর্ণ জ্ঞান। কর্মে বিশ্বাস। সহমর্মিতায় নেতৃত্ব।') }}</h1>
        <p class="vision-lead">{{ copy('Our aspirations for learning, character, and the partnership between school and family at Peace International Islamic School & College.', 'পিস ইন্টারন্যাশনাল ইসলামিক স্কুল অ্যান্ড কলেজে শিক্ষা, চরিত্র গঠন এবং স্কুল ও পরিবারের অংশীদারিত্ব নিয়ে আমাদের প্রত্যাশা।') }}</p>
      </div>
    </section>
    <section class="vision-width vision-statements" :aria-label="copy('Our vision and mission', 'আমাদের ভিশন ও মিশন')">
      <article class="statement-card" aria-labelledby="vision-heading">
        <h2 id="vision-heading" class="vision-eyebrow">{{ copy('VISION', 'আমাদের ভিশন') }}</h2>
        <p>{{ copy('We envision a generation of confident learners whose knowledge is guided by faith, good character, and care for others. PIISC aspires to help young people grow into thoughtful, capable individuals who continue learning throughout life and make a positive contribution to their families, communities, and the wider world.', 'আমরা এমন এক আত্মবিশ্বাসী প্রজন্মের স্বপ্ন দেখি, যাদের জ্ঞান পরিচালিত হবে বিশ্বাস, সুন্দর চরিত্র ও মানুষের প্রতি যত্নের মাধ্যমে। পিআইআইএসসি তরুণদের চিন্তাশীল ও দক্ষ মানুষ হিসেবে গড়ে তুলতে চায়, যারা সারা জীবন শিখবে এবং পরিবার, সমাজ ও বৃহত্তর বিশ্বে ইতিবাচক অবদান রাখবে।') }}</p>
      </article>
      <article class="statement-card mission-card" aria-labelledby="mission-heading">
        <h2 id="mission-heading" class="vision-eyebrow">{{ copy('MISSION', 'আমাদের মিশন') }}</h2>
        <p>{{ copy('Our mission is to bring modern education and Islamic values together in a supportive learning community. We aim to encourage curiosity, clear communication, creativity, and independent thinking while building habits of honesty, respect, and responsibility. Through meaningful learning experiences and collaboration with families, we seek to prepare students for both academic progress and a purposeful life.', 'আমাদের মিশন হলো একটি সহায়ক শিক্ষাঙ্গনে আধুনিক শিক্ষা ও ইসলামী মূল্যবোধকে একত্র করা। সততা, শ্রদ্ধা ও দায়িত্ববোধ গড়ে তোলার পাশাপাশি আমরা কৌতূহল, স্পষ্ট যোগাযোগ, সৃজনশীলতা ও স্বাধীন চিন্তাকে উৎসাহিত করতে চাই। অর্থবহ শিক্ষার অভিজ্ঞতা এবং পরিবারের সহযোগিতার মাধ্যমে আমরা শিক্ষার্থীদের প্রাতিষ্ঠানিক অগ্রগতি ও উদ্দেশ্যপূর্ণ জীবনের জন্য প্রস্তুত করতে চাই।') }}</p>
      </article>
    </section>
  </div>
</template>

<style scoped>
.vision-page{background:linear-gradient(180deg,#fff,#f8f9fc);color:#0a2948}
.vision-width{width:calc(100% - clamp(32px,6.5vw,128px));max-width:1800px;margin-inline:auto}
.vision-hero{position:relative;isolation:isolate;overflow:hidden;background:#0a2948}
.vision-hero>img{position:absolute;inset:0;z-index:-2;width:100%;height:100%;object-fit:cover;object-position:center 38%}
.vision-hero::after{content:'';position:absolute;inset:0;z-index:-1;background:linear-gradient(100deg,#294e9ef5 5%,#294e9edb 60%,#0a2948bc)}
.vision-hero-content{padding-block:clamp(64px,7.5vw,132px)}
.vision-eyebrow{margin:0 0 24px;color:#b38b2c;font-size:clamp(12px,1vw,17px);font-weight:700;letter-spacing:.18em;text-transform:uppercase}
.vision-hero .vision-eyebrow{color:#f3cc48}
.vision-hero h1{max-width:1230px;margin:0 0 28px;color:white;font-size:clamp(36px,5.2vw,88px);line-height:1.1;text-wrap:balance}
.vision-lead{max-width:1020px;color:#edf1f8;font-size:clamp(17px,1.55vw,26px);line-height:1.75}
.vision-statements{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(20px,2vw,32px);padding-block:clamp(40px,4.5vw,80px) 48px}
.statement-card{padding:clamp(26px,2.5vw,44px);border:1px solid #dce3ee;border-radius:6px;background:#fff;box-shadow:0 14px 40px #173a6a06;transition:box-shadow .3s ease,border-color .3s ease}
.statement-card h2{font-size:clamp(13px,1vw,17px);letter-spacing:.18em!important;line-height:1.5;margin-bottom:20px}
.statement-card p{font-size:clamp(17px,1.5vw,25px);line-height:1.85;color:#5d6e86}
.mission-card{background:#fcf5e6;border-color:#e5dfd3}
.statement-card:hover{border-color:#cfb466;box-shadow:0 18px 44px #173a6a10}
@media(max-width:760px){.vision-statements{grid-template-columns:1fr;padding-bottom:30px}.vision-hero h1{font-size:clamp(34px,6vw,46px)}.vision-hero-content{padding-block:56px 64px}.vision-hero>img{object-position:65% center}}
@media(prefers-reduced-motion:reduce){.statement-card{transition:none}}
</style>
