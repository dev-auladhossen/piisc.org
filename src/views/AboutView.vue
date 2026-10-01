<script setup>
import { MessagesSquare, Sparkles, Lightbulb, HeartHandshake, ShieldCheck } from 'lucide-vue-next'
import classroom from '../assets/images/group-work.jpg'
import { useI18n } from '../composables/useI18n.js'
const { language } = useI18n()
const copy = (en, bn) => language.value === 'bn' ? bn : en
const values = [
 {icon:MessagesSquare,en:'Confident communicators',bn:'আত্মবিশ্বাসী বক্তা'},
 {icon:Sparkles,en:'Thoughtful problem solvers',bn:'চিন্তাশীল সমস্যা সমাধানকারী'},
 {icon:Lightbulb,en:'Curious, creative learners',bn:'কৌতূহলী ও সৃজনশীল শিক্ষার্থী'},
 {icon:HeartHandshake,en:'Caring future leaders',bn:'সহমর্মী ভবিষ্যৎ নেতা'},
 {icon:ShieldCheck,en:'Responsible young Muslims',bn:'দায়িত্বশীল তরুণ মুসলিম'},
]
</script>
<template>
 <div class="about-page">
  <section class="about-hero" aria-labelledby="about-title">
   <img :src="classroom" :alt="copy('PIISC students learning together','একসঙ্গে শিখছে পিআইআইএসসির শিক্ষার্থীরা')" fetchpriority="high" />
   <div class="container about-hero-copy">
    <p class="about-eyebrow">{{ copy('ABOUT PIISC','পিআইআইএসসি সম্পর্কে') }}</p>
    <h1 id="about-title">{{ copy('Growing in knowledge. Leading with faith and character.','জ্ঞানে সমৃদ্ধি। বিশ্বাস ও চরিত্রে নেতৃত্ব।') }}</h1>
    <p>{{ copy('Modern education with Islamic values, in the heart of Ashulia.','আশুলিয়ায় ইসলামী মূল্যবোধের সঙ্গে আধুনিক শিক্ষা।') }}</p>
   </div>
  </section>
  <section class="container about-introduction" aria-labelledby="about-story-title">
   <div class="about-story">
    <p class="about-eyebrow">{{ copy('ABOUT US','আমাদের সম্পর্কে') }}</p>
    <h2 id="about-story-title">{{ copy('Learning with purpose. Growing with confidence.','উদ্দেশ্যপূর্ণ শিক্ষা। আত্মবিশ্বাসের সঙ্গে বেড়ে ওঠা।') }}</h2>
    <p>{{ copy('At Peace International Islamic School & College, our vision brings academic learning and Islamic values together. We want every child to ask questions, explore ideas, and develop the confidence to put their learning into practice.','পিস ইন্টারন্যাশনাল ইসলামিক স্কুল অ্যান্ড কলেজে আমাদের লক্ষ্য প্রাতিষ্ঠানিক শিক্ষা ও ইসলামী মূল্যবোধকে একত্র করা। আমরা চাই প্রতিটি শিশু প্রশ্ন করুক, নতুন ধারণা অন্বেষণ করুক এবং অর্জিত জ্ঞান কাজে লাগানোর আত্মবিশ্বাস গড়ে তুলুক।') }}</p>
    <p>{{ copy('Our learning community in Ashulia encourages respect, kindness, honesty, and a love of knowledge—helping children grow as learners and as responsible members of society.','আশুলিয়ায় আমাদের শিক্ষাঙ্গন শ্রদ্ধা, সহমর্মিতা, সততা ও জ্ঞানের প্রতি ভালোবাসাকে উৎসাহিত করে—যাতে শিশুরা সমাজের দায়িত্বশীল সদস্য হিসেবে বেড়ে ওঠে।') }}</p>
   </div>
   <div class="about-values">
    <h3>{{ copy('The qualities we aim to inspire in every learner','প্রতিটি শিক্ষার্থীর মধ্যে যে গুণগুলো গড়ে তুলতে চাই') }}</h3>
    <div class="values-grid"><article v-for="value in values" :key="value.en" class="value-card"><span><component :is="value.icon" :size="22" aria-hidden="true" /></span><h4>{{ copy(value.en,value.bn) }}</h4></article></div>
   </div>
  </section>
  <section class="container about-commitment" aria-labelledby="commitment-title">
   <p class="about-eyebrow">{{ copy('OUR EDUCATIONAL COMMITMENT','শিক্ষায় আমাদের অঙ্গীকার') }}</p>
   <h2 id="commitment-title">{{ copy('A shared vision for every child','প্রতিটি শিশুর জন্য একটি অভিন্ন লক্ষ্য') }}</h2>
   <div class="commitment-panel">
    <p class="commitment-lead">{{ copy('Strong learning begins with good character, encouragement, and a sense of belonging.','সুন্দর চরিত্র, উৎসাহ ও আপনত্ববোধ থেকেই অর্থবহ শিক্ষার শুরু।') }}</p>
    <p>{{ copy('PIISC aims to create a school community where children feel supported to learn, families feel welcome to participate, and education has a purpose beyond the classroom. Through thoughtful learning experiences and Islamic values, we seek to help students develop sound judgement, compassion, and the courage to contribute positively to the world around them.','পিআইআইএসসি এমন একটি শিক্ষাঙ্গন গড়তে চায় যেখানে শিশুরা শেখার সহায়তা পায়, পরিবার অংশগ্রহণের সুযোগ পায় এবং শিক্ষার উদ্দেশ্য শ্রেণিকক্ষের বাইরেও বিস্তৃত হয়। অর্থবহ শিক্ষার অভিজ্ঞতা ও ইসলামী মূল্যবোধের মাধ্যমে আমরা শিক্ষার্থীদের বিবেচনাবোধ, সহমর্মিতা এবং সমাজে ইতিবাচক অবদান রাখার সাহস গড়ে তুলতে চাই।') }}</p>
   </div>
  </section>
 </div>
</template>
<style scoped>
.about-page{background:#fff;color:#0a2948}.about-hero{position:relative;isolation:isolate;overflow:hidden;background:#0a2948}.about-hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 42%;z-index:-2}.about-hero::after{content:'';position:absolute;inset:0;z-index:-1;background:linear-gradient(100deg,#092645ed,#294e9edb)}.about-hero-copy{padding-block:76px 84px}.about-eyebrow{color:#a77d22;font-size:11px;font-weight:800;letter-spacing:.2em;margin:0 0 18px}.about-hero .about-eyebrow{color:#f0cf66}.about-hero h1{max-width:860px;font-size:clamp(36px,4.7vw,66px);line-height:1.08;color:#fff;margin:0 0 24px;text-wrap:balance}.about-hero-copy>p:last-child{color:#edf2fa;font-size:17px}.about-introduction{display:grid;grid-template-columns:.85fr 1.15fr;gap:clamp(36px,6vw,90px);padding-block:88px 64px}.about-story h2{font-size:clamp(30px,3.4vw,46px);line-height:1.13;margin:0 0 22px;color:#294e9e}.about-story>p:not(.about-eyebrow),.commitment-panel p{font-size:16px;line-height:1.85;color:#5c6c82}.about-story>p+p{margin-top:14px}.about-values>h3{font-size:17px;line-height:1.5;margin:0 0 28px;color:#294e9e}.values-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.value-card{display:flex;align-items:center;gap:16px;padding:26px 22px;min-height:132px;border:1px solid #dde5f1;border-radius:6px;background:#fff;box-shadow:0 12px 32px #173a6a08;transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease}.value-card>span{display:grid;place-items:center;flex:0 0 44px;height:44px;border-radius:50%;background:#fff8d8;color:#294e9e}.value-card h4{font-size:16px;line-height:1.5;color:#294e9e;margin:0}.value-card:hover{transform:translateY(-4px);border-color:#d9b33d;box-shadow:0 18px 34px #173a6a12}.about-commitment{padding-bottom:80px}.about-commitment h2{font-size:clamp(27px,3vw,36px);color:#294e9e;margin:0 0 25px}.commitment-panel{border:1px solid #dde5f1;border-left:3px solid #d9b33d;border-radius:6px;padding:clamp(24px,4vw,42px);box-shadow:0 16px 40px #173a6a08}.commitment-panel .commitment-lead{font-weight:700;color:#294e9e;margin-bottom:18px}@media(max-width:800px){.about-introduction{grid-template-columns:1fr;padding-block:54px;gap:36px}.about-hero-copy{padding-block:54px 60px}.about-commitment{padding-bottom:50px}}@media(max-width:480px){.values-grid{grid-template-columns:1fr;gap:12px}.value-card{min-height:92px;padding:20px}.about-hero h1{font-size:36px}}@media(prefers-reduced-motion:reduce){.value-card{transition:none}.value-card:hover{transform:none}}
</style>
