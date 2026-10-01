<script setup>
import { ArrowRight } from 'lucide-vue-next'
import cover from '../assets/images/creative-4.jpg'
import { useI18n } from '../composables/useI18n.js'
const { language } = useI18n()
const copy = (en, bn) => language.value === 'bn' ? bn : en
const steps = [
  { title: ['Initial Consultation', 'প্রাথমিক আলোচনা'], body: ['Contact the PIISC admission office or arrange a campus visit. Discuss the appropriate grade, available seats, learning pathway, and current admission requirements for Grades 1–12.', 'পিআইআইএসসির ভর্তি অফিসে যোগাযোগ করুন অথবা ক্যাম্পাস পরিদর্শনের ব্যবস্থা করুন। প্রথম থেকে দ্বাদশ শ্রেণির উপযুক্ত শ্রেণি, আসনপ্রাপ্যতা, শিক্ষাক্রম ও বর্তমান ভর্তির শর্ত সম্পর্কে জানুন।'] },
  { title: ['Application Submission', 'আবেদন জমা'], body: ['Complete the admission application and prepare the supporting documents. Share accurate student and guardian details, previous school records, and the grade you wish to apply for.', 'ভর্তি আবেদন পূরণ করে প্রয়োজনীয় কাগজপত্র প্রস্তুত করুন। শিক্ষার্থী ও অভিভাবকের সঠিক তথ্য, পূর্ববর্তী শিক্ষাপ্রতিষ্ঠানের ফলাফল এবং কাঙ্ক্ষিত শ্রেণি উল্লেখ করুন।'] },
  { title: ['Student Readiness & Academic Review', 'শিক্ষার্থীর প্রস্তুতি ও শিক্ষাগত পর্যালোচনা'], body: ['The admission team will explain any assessment or interaction required for the chosen grade. Previous learning, academic records, and individual learning needs help guide placement.', 'নির্বাচিত শ্রেণির জন্য প্রয়োজনীয় মূল্যায়ন বা সাক্ষাৎকার সম্পর্কে ভর্তি অফিস জানাবে। পূর্ববর্তী শিক্ষা, ফলাফল ও ব্যক্তিগত শিক্ষার প্রয়োজন বিবেচনা করে শ্রেণি নির্ধারণ করা হবে।'] },
  { title: ['Parent Partnership Meeting', 'অভিভাবকের সঙ্গে আলোচনা'], body: ['Meet with the school to discuss your child’s interests, educational background, and support needs. This is also an opportunity to ask questions about school life and expectations.', 'আপনার সন্তানের আগ্রহ, শিক্ষাগত পটভূমি ও সহায়তার প্রয়োজন নিয়ে স্কুলের সঙ্গে আলোচনা করুন। স্কুলের দৈনন্দিন কার্যক্রম ও প্রত্যাশা সম্পর্কে প্রশ্ন করারও এটি একটি সুযোগ।'] },
  { title: ['Admission Decision', 'ভর্তির সিদ্ধান্ত'], body: ['The admission office will communicate the outcome after reviewing the application and available seats. If a place is offered, confirm the applicable fees, deadlines, and any remaining documents directly with the office.', 'আবেদন ও আসনপ্রাপ্যতা পর্যালোচনার পর ভর্তি অফিস সিদ্ধান্ত জানাবে। ভর্তির সুযোগ পেলে প্রযোজ্য ফি, সময়সীমা ও বাকি কাগজপত্র অফিস থেকে নিশ্চিত করুন।'] },
  { title: ['Enrollment & Orientation', 'ভর্তি সম্পন্ন ও পরিচিতি'], body: ['Complete the enrollment formalities and school-confirmed payments through the official channels. Ask the admission team about the class start date, learning materials, and orientation arrangements before your child joins.', 'নির্ধারিত মাধ্যমে ভর্তি প্রক্রিয়া ও স্কুল কর্তৃক নিশ্চিতকৃত অর্থ পরিশোধ সম্পন্ন করুন। ক্লাস শুরুর তারিখ, শিক্ষা উপকরণ ও পরিচিতি অনুষ্ঠানের ব্যবস্থা সম্পর্কে ভর্তি অফিস থেকে জেনে নিন।'] },
]
const stages = [
 { title: ['Primary · Grades 1–5', 'প্রাথমিক · প্রথম–পঞ্চম শ্রেণি'], body: ['Discuss foundational literacy, numeracy, communication, and readiness for the requested class.', 'মৌলিক ভাষা, গণনা, যোগাযোগ ও কাঙ্ক্ষিত শ্রেণির প্রস্তুতি নিয়ে আলোচনা করুন।'] },
 { title: ['Middle School · Grades 6–8', 'নিম্ন মাধ্যমিক · ষষ্ঠ–অষ্টম শ্রেণি'], body: ['Review previous progress and any grade-appropriate assessment advised by the school.', 'পূর্ববর্তী অগ্রগতি ও স্কুলের নির্দেশিত শ্রেণিভিত্তিক মূল্যায়ন সম্পর্কে জানুন।'] },
 { title: ['Secondary · Grades 9–10', 'মাধ্যমিক · নবম–দশম শ্রেণি'], body: ['Confirm subject choices, prior coursework, and any examination or transfer requirements.', 'বিষয় নির্বাচন, পূর্ববর্তী পাঠক্রম এবং পরীক্ষা বা স্থানান্তরের শর্ত নিশ্চিত করুন।'] },
 { title: ['College · Grades 11–12', 'কলেজ · একাদশ–দ্বাদশ শ্রেণি'], body: ['Discuss previous examination results, subject eligibility, registration, and entry or transfer conditions with the admission office.', 'পূর্ববর্তী পরীক্ষার ফলাফল, বিষয়ের যোগ্যতা, নিবন্ধন এবং ভর্তি বা স্থানান্তরের শর্ত নিয়ে ভর্তি অফিসে আলোচনা করুন।'] },
]
</script>
<template>
 <div class="procedures-page">
  <section class="procedures-hero" aria-labelledby="procedures-title">
   <img :src="cover" :alt="copy('Learning activities at PIISC', 'পিআইআইএসসির শিক্ষামূলক কার্যক্রম')" fetchpriority="high" />
   <div class="procedures-width hero-copy">
    <p class="eyebrow">{{ copy('ADMISSION', 'ভর্তি') }}</p>
    <h1 id="procedures-title">{{ copy('Admission Procedures', 'ভর্তি প্রক্রিয়া') }}</h1>
    <p>{{ copy('Your six-step guide to joining PIISC, from the first conversation to enrollment in Grades 1–12.', 'প্রথম আলোচনা থেকে প্রথম–দ্বাদশ শ্রেণিতে ভর্তি পর্যন্ত পিআইআইএসসিতে যোগ দেওয়ার ছয় ধাপের নির্দেশনা।') }}</p>
   </div>
  </section>
  <div class="procedures-width procedures-content">
   <ol class="procedure-list">
    <li v-for="(step, index) in steps" :key="step.title[0]" class="procedure-card">
     <span class="step-number" aria-hidden="true">{{ new Intl.NumberFormat(language === 'bn' ? 'bn-BD' : 'en').format(index + 1) }}</span>
     <div class="step-copy">
      <h2>{{ copy(...step.title) }}</h2>
      <p>{{ copy(...step.body) }}</p>
      <div v-if="index === 2" class="assessment-grid">
       <section v-for="stage in stages" :key="stage.title[0]"><h3>{{ copy(...stage.title) }}</h3><p>{{ copy(...stage.body) }}</p></section>
      </div>
     </div>
    </li>
   </ol>
   <RouterLink to="/online-admission" class="application-button">{{ copy('Start Your Application', 'আপনার আবেদন শুরু করুন') }}<ArrowRight :size="20" aria-hidden="true" /></RouterLink>
  </div>
 </div>
</template>
<style scoped>
.procedures-page{background:linear-gradient(180deg,#fff,#f9faff);color:#0a2948}.procedures-width{width:calc(100% - clamp(32px,6.5vw,128px));max-width:1800px;margin-inline:auto}.procedures-hero{position:relative;isolation:isolate;overflow:hidden;background:#0a2948}.procedures-hero>img{position:absolute;inset:0;z-index:-2;width:100%;height:100%;object-fit:cover;object-position:center 40%}.procedures-hero::after{content:'';position:absolute;inset:0;z-index:-1;background:linear-gradient(100deg,#294e9ef5,#294e9edb 65%,#0a2948bc)}.hero-copy{padding-block:clamp(64px,7vw,112px)}.hero-copy .eyebrow{color:#f3cc48;margin-bottom:24px}.hero-copy h1{font-size:clamp(36px,5vw,78px);line-height:1.12;color:#fff;margin:0 0 28px}.hero-copy>p:last-child{font-size:clamp(17px,1.5vw,23px);line-height:1.75;color:#edf2fa;max-width:1100px}.procedures-content{padding-block:48px 64px}.procedure-list{list-style:none;margin:0;padding:0;display:grid;gap:20px}.procedure-card{display:grid;grid-template-columns:auto minmax(0,1fr);gap:22px;padding:clamp(22px,2.2vw,36px);border:1px solid #dce4f1;border-radius:6px;background:#fff;box-shadow:0 12px 32px #173a6a05;transition:border-color .3s,box-shadow .3s}.procedure-card:hover{border-color:#c9ad62;box-shadow:0 16px 38px #173a6a10}.step-number{display:grid;place-items:center;width:64px;height:64px;border-radius:50%;background:#294e9e;color:#fff;font-size:22px;font-weight:700}.step-copy h2{font-size:clamp(22px,1.9vw,29px);line-height:1.35;color:#294e9e;margin:0 0 14px}.step-copy p{color:#5d6e86;font-size:clamp(16px,1.25vw,20px);line-height:1.8;margin:0}.assessment-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:24px}.assessment-grid section{border:1px solid #e4dfd3;border-radius:6px;background:#fcf5e6;padding:22px}.assessment-grid h3{font-size:18px;line-height:1.45;color:#294e9e;margin:0 0 12px}.assessment-grid p{font-size:16px}.application-button{display:inline-flex;align-items:center;gap:12px;margin-top:36px;padding:16px 22px;border-radius:6px;background:#294e9e;color:#fff;font-weight:700;cursor:pointer;transition:transform .25s,background .25s,box-shadow .25s}.application-button:hover{transform:translateY(-3px);background:#0a2948;box-shadow:0 12px 26px #173a6a20}@media(max-width:700px){.assessment-grid{grid-template-columns:1fr}.step-number{width:42px;height:42px;font-size:18px}.procedure-card{gap:14px;padding:20px 16px}.step-copy h2{font-size:21px}.hero-copy{padding-block:56px 64px}.procedures-content{padding-block:32px 44px}}@media(max-width:420px){.procedure-card{grid-template-columns:1fr}.application-button{width:100%;justify-content:center}}@media(prefers-reduced-motion:reduce){.procedure-card,.application-button{transition:none}.application-button:hover{transform:none}}
</style>
