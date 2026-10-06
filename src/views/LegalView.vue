<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const props = defineProps({ kind: { type: String, required: true } })
const { language } = useI18n()
const copy = (en, bn) => language.value === 'bn' ? bn : en
const isPrivacy = computed(() => props.kind === 'privacy')
const sections = computed(() => isPrivacy.value ? [
  {
    title: ['Information you share', 'আপনি যে তথ্য দেন'],
    body: ['If you contact the school by phone, email, WhatsApp or an inquiry form, please share only the details needed for your question. The school uses those details to respond to your inquiry.', 'ফোন, ইমেইল, হোয়াটসঅ্যাপ বা অনুসন্ধান ফরমে বিদ্যালয়ের সঙ্গে যোগাযোগ করলে প্রয়োজনীয় তথ্যই দিন। বিদ্যালয় আপনার প্রশ্নের উত্তর দিতে সেই তথ্য ব্যবহার করে।'],
  },
  {
    title: ['External services', 'বাহ্যিক সেবা'],
    body: ['Email, WhatsApp and social media links open services outside this website. Their own privacy practices apply when you use them.', 'ইমেইল, হোয়াটসঅ্যাপ ও সামাজিক যোগাযোগমাধ্যমের লিংক এই ওয়েবসাইটের বাইরের সেবা খুলে দেয়। সেগুলো ব্যবহারের সময় তাদের নিজস্ব গোপনীয়তা নীতি প্রযোজ্য।'],
  },
  {
    title: ['Questions about your information', 'আপনার তথ্য সম্পর্কে প্রশ্ন'],
    body: ['For questions about information you have shared with PIISC, contact the school office using the contact page.', 'পিআইআইএসসির সঙ্গে শেয়ার করা তথ্য সম্পর্কে প্রশ্ন থাকলে যোগাযোগ পাতার মাধ্যমে বিদ্যালয় অফিসে যোগাযোগ করুন।'],
  },
] : [
  {
    title: ['Website information', 'ওয়েবসাইটের তথ্য'],
    body: ['This website provides general information about PIISC. Programmes, admission arrangements and other details may change; please confirm current information with the school office.', 'এই ওয়েবসাইটে পিআইআইএসসি সম্পর্কে সাধারণ তথ্য দেওয়া হয়। শিক্ষা কার্যক্রম, ভর্তি ও অন্যান্য বিবরণ পরিবর্তিত হতে পারে; বর্তমান তথ্য বিদ্যালয় অফিস থেকে নিশ্চিত করুন।'],
  },
  {
    title: ['Using the website', 'ওয়েবসাইট ব্যবহার'],
    body: ['Please use this website and its contact options respectfully. School names, logos, photographs and written material should not be reused without permission.', 'অনুগ্রহ করে এই ওয়েবসাইট ও যোগাযোগের মাধ্যমগুলো দায়িত্বশীলভাবে ব্যবহার করুন। বিদ্যালয়ের নাম, লোগো, ছবি ও লেখা অনুমতি ছাড়া পুনর্ব্যবহার করবেন না।'],
  },
  {
    title: ['Questions', 'প্রশ্ন'],
    body: ['If you have a question about this website or school information, contact the PIISC office.', 'এই ওয়েবসাইট বা বিদ্যালয়ের তথ্য নিয়ে প্রশ্ন থাকলে পিআইআইএসসি অফিসে যোগাযোগ করুন।'],
  },
])
</script>

<template>
  <main class="legal-page [&&]:min-h-[60vh] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:initial] [&&]:[background-image:linear-gradient(rgb(244,_247,_252),_rgb(255,_255,_255)_60%)] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:p-[clamp(48px,_6vw,_88px)_0px_100px_0px]">
    <div class="legal-width [&&]:w-[calc(100%_-_clamp(32px,_6.5vw,_128px))] [&&]:max-w-[1000px] [&&]:[margin-inline-end:auto] [&&]:[margin-inline-start:auto]">
      <p class="legal-eyebrow [&&]:[color:rgb(177,_138,_40)] [&&]:[font-size:12px] [&&]:font-[800] [&&]:tracking-[0.18em]">{{ copy('PIISC INFORMATION', 'পিআইআইএসসি তথ্য') }}</p>
      <h1 class="[&&]:[color:rgb(41,_78,_158)] [&&]:[font-size:clamp(38px,_4.5vw,_66px)] [&&]:m-[12px_0px_18px_0px]">{{ isPrivacy ? copy('Privacy Policy', 'গোপনীয়তা নীতি') : copy('Terms and Conditions', 'শর্তাবলি') }}</h1>
      <p class="legal-intro [&&]:max-w-[750px] [&&]:[color:rgb(93,_110,_134)] [&&]:[font-size:19px]">{{ isPrivacy ? copy('How the contact options on this website relate to the information you share.', 'এই ওয়েবসাইটের যোগাযোগ মাধ্যম ও আপনার দেওয়া তথ্য সম্পর্কে।') : copy('Guidance for using the PIISC website and its information.', 'পিআইআইএসসি ওয়েবসাইট ও এর তথ্য ব্যবহারের নির্দেশনা।') }}</p>
      <div class="legal-sections [&&]:grid [&&]:gap-x-[18px] [&&]:gap-y-[18px] [&&]:m-[42px_0px_34px_0px]">
        <section class="[&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:9px] [&&]:[border-bottom-right-radius:9px] [&&]:[border-top-left-radius:9px] [&&]:[border-top-right-radius:9px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [@media(max-width:600px)]:[&&]:p-[22px] [@media(width>600px)]:[&&]:p-[26px_30px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(220,_229,_243)]" v-for="section in sections" :key="section.title[0]">
          <h2 class="[&&]:[color:rgb(41,_78,_158)] [&&]:[font-size:25px] [&&]:m-[0px_0px_9px_0px]">{{ copy(...section.title) }}</h2>
          <p class="[&&]:leading-[1.75] [&&]:[color:rgb(93,_110,_134)]">{{ copy(...section.body) }}</p>
        </section>
      </div>
      <RouterLink to="/contact" class="legal-contact [&&]:inline-flex [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [&&]:font-[700] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(41,_78,_158)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:white] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-behavior:normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-delay:0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.25s,_0.25s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:background,_transform] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-timing-function:ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-timing-function:ease] [&&]:p-[13px_20px] [&.legal-contact:hover]:[background-color:rgb(23,_58,_128)] [@media(prefers-reduced-motion:no-preference)]:[&.legal-contact:hover]:[transform:translateY(-2px)] [@media(prefers-reduced-motion:reduce)]:[&.legal-contact:hover]:[transform:none]">{{ copy('Contact the school', 'বিদ্যালয়ে যোগাযোগ করুন') }}</RouterLink>
    </div>
  </main>
</template>
