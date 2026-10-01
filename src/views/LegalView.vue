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
  <main class="legal-page">
    <div class="legal-width">
      <p class="legal-eyebrow">{{ copy('PIISC INFORMATION', 'পিআইআইএসসি তথ্য') }}</p>
      <h1>{{ isPrivacy ? copy('Privacy Policy', 'গোপনীয়তা নীতি') : copy('Terms and Conditions', 'শর্তাবলি') }}</h1>
      <p class="legal-intro">{{ isPrivacy ? copy('How the contact options on this website relate to the information you share.', 'এই ওয়েবসাইটের যোগাযোগ মাধ্যম ও আপনার দেওয়া তথ্য সম্পর্কে।') : copy('Guidance for using the PIISC website and its information.', 'পিআইআইএসসি ওয়েবসাইট ও এর তথ্য ব্যবহারের নির্দেশনা।') }}</p>
      <div class="legal-sections">
        <section v-for="section in sections" :key="section.title[0]">
          <h2>{{ copy(...section.title) }}</h2>
          <p>{{ copy(...section.body) }}</p>
        </section>
      </div>
      <RouterLink to="/contact" class="legal-contact">{{ copy('Contact the school', 'বিদ্যালয়ে যোগাযোগ করুন') }}</RouterLink>
    </div>
  </main>
</template>

<style scoped>
.legal-page { min-height: 60vh; padding: clamp(48px, 6vw, 88px) 0 100px; background: linear-gradient(180deg, #f4f7fc, #fff 60%); }
.legal-width { width: calc(100% - clamp(32px, 6.5vw, 128px)); max-width: 1000px; margin-inline: auto; }
.legal-eyebrow { color: #b18a28; font-size: 12px; font-weight: 800; letter-spacing: .18em; }
h1 { color: #294e9e; font-size: clamp(38px, 4.5vw, 66px); margin: 12px 0 18px; }
.legal-intro { max-width: 750px; color: #5d6e86; font-size: 19px; }
.legal-sections { display: grid; gap: 18px; margin: 42px 0 34px; }
.legal-sections section { border: 1px solid #dce5f3; border-radius: 9px; background: #fff; padding: 26px 30px; }
h2 { color: #294e9e; font-size: 25px; margin: 0 0 9px; }
.legal-sections p { color: #5d6e86; line-height: 1.75; }
.legal-contact { display: inline-flex; padding: 13px 20px; background: #294e9e; color: white; border-radius: 6px; font-weight: 700; transition: background .25s ease, transform .25s ease; }
.legal-contact:hover { background: #173a80; transform: translateY(-2px); }
@media (max-width: 600px) { .legal-sections section { padding: 22px; } }
@media (prefers-reduced-motion: reduce) { .legal-contact { transition: none; } .legal-contact:hover { transform: none; } }
</style>
