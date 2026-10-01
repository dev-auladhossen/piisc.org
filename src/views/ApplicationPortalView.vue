<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { ArrowUpRight, BriefcaseBusiness, ChevronRight, Download, Eye, FileText, GraduationCap, Mail, Phone } from 'lucide-vue-next'
import { headerContacts } from '../data/navigation.js'
import { useI18n } from '../composables/useI18n.js'

const props = defineProps({ kind: { type: String, required: true } })
const { language } = useI18n()
const isAdmission = computed(() => props.kind === 'admission')
const form = reactive({ name: '', contact: '', interest: '', email: '', phone: '', message: '' })
const prepared = ref(false)
watch(() => props.kind, () => { Object.keys(form).forEach(key => form[key] = ''); prepared.value = false })
const copy = computed(() => {
  const bn = language.value === 'bn'
  return {
    home: bn ? 'হোম' : 'Home',
    title: isAdmission.value ? (bn ? 'অনলাইন ভর্তি' : 'Online Admission') : (bn ? 'নিয়োগ' : 'Recruitment'),
    eyebrow: bn ? 'পিস ইন্টারন্যাশনাল ইসলামিক স্কুল অ্যান্ড কলেজ' : 'PEACE INTERNATIONAL ISLAMIC SCHOOL & COLLEGE',
    intro: isAdmission.value
      ? (bn ? 'আপনার সন্তানের শিক্ষাযাত্রা নিয়ে কথা বলুন। নিচের তথ্য দিয়ে ভর্তি বিষয়ে ইমেইল প্রস্তুত করুন।' : 'Start a conversation about your child’s learning journey. Share a few details to prepare your admission enquiry.')
      : (bn ? 'শিক্ষা, মূল্যবোধ ও নতুন প্রজন্মের বিকাশে ভূমিকা রাখতে চান? আপনার আগ্রহ ও অভিজ্ঞতা আমাদের জানান।' : 'Interested in helping young people learn and grow? Tell us about your experience and the contribution you would like to make.'),
    formTitle: isAdmission.value ? (bn ? 'ভর্তির আগ্রহ জানান' : 'Register your interest') : (bn ? 'কাজের আগ্রহ জানান' : 'Introduce yourself'),
    note: bn ? 'এই ফর্ম আপনার ইমেইল অ্যাপে একটি খসড়া খুলবে। তথ্য যাচাই করে সেখান থেকে পাঠান। এখানে কোনো আবেদন জমা হয় না।' : 'This form opens a draft in your email app. Review and send it from there; completing this form does not submit an application.',
    name: isAdmission.value ? (bn ? 'শিক্ষার্থীর নাম' : 'Student’s name') : (bn ? 'আপনার নাম' : 'Your name'),
    contact: isAdmission.value ? (bn ? 'অভিভাবকের নাম' : 'Parent / guardian’s name') : (bn ? 'যোগ্যতা ও অভিজ্ঞতা' : 'Qualifications & experience'),
    interest: isAdmission.value ? (bn ? 'কাঙ্ক্ষিত শ্রেণি' : 'Class of interest') : (bn ? 'কাঙ্ক্ষিত পদ বা কাজের ক্ষেত্র' : 'Role or area of interest'),
    email: bn ? 'ইমেইল ঠিকানা' : 'Email address', phone: bn ? 'ফোন নম্বর' : 'Phone number',
    message: bn ? 'আরও তথ্য বা প্রশ্ন (ঐচ্ছিক)' : 'Additional details or questions (optional)',
    action: bn ? 'ইমেইল খসড়া তৈরি করুন' : 'Prepare email enquiry',
    status: bn ? 'ইমেইল খসড়া খোলার অনুরোধ করা হয়েছে। না খুললে নিচের ঠিকানায় সরাসরি ইমেইল করুন। আপনার আবেদন এখনো জমা হয়নি।' : 'An email draft has been requested. If it did not open, email the address below directly. Your enquiry has not been submitted yet.',
    next: bn ? 'পরবর্তী ধাপ' : 'What happens next',
    steps: isAdmission.value
      ? (bn ? ['শিক্ষার্থী ও অভিভাবকের তথ্য লিখুন।', 'ইমেইল খসড়া যাচাই করে পাঠান।', 'আসন, প্রয়োজনীয় নথি ও ভর্তি প্রক্রিয়া সম্পর্কে দলের সঙ্গে কথা বলুন।'] : ['Tell us about the student and their parent or guardian.', 'Review your email draft and send the enquiry.', 'Speak with our team about availability, documents and the admission process.'])
      : (bn ? ['আপনার যোগ্যতা ও কাজের আগ্রহ লিখুন।', 'ইমেইল অ্যাপে জীবনবৃত্তান্ত যুক্ত করে পাঠাতে পারেন।', 'বর্তমান সুযোগ ও আনুষ্ঠানিক আবেদন প্রক্রিয়া সম্পর্কে দলের সঙ্গে কথা বলুন।'] : ['Introduce your qualifications and the role you are interested in.', 'Attach your CV in your email app before sending, if you wish.', 'Ask our team about current opportunities and the formal application process.']),
    help: bn ? 'সহায়তা প্রয়োজন?' : 'Need a hand?',
    details: isAdmission.value ? (bn ? 'ভর্তির বিস্তারিত দেখুন' : 'View admission information') : (bn ? 'নোটিশ দেখুন' : 'View school notices'),
    recipient: bn ? 'প্রাপকের ইমেইল' : 'School contact email',
  }
})
function prepareEmail() {
  const c = copy.value
  const body = [`${c.name}: ${form.name.trim()}`, `${c.contact}: ${form.contact.trim()}`, `${c.interest}: ${form.interest.trim()}`, `${c.email}: ${form.email.trim()}`, `${c.phone}: ${form.phone.trim()}`, '', form.message.trim()].join('\n')
  window.location.href = `mailto:${headerContacts.email}?subject=${encodeURIComponent(`${c.title} — ${form.name.trim()}`)}&body=${encodeURIComponent(body)}`
  prepared.value = true
}
</script>

<template>
  <section class="portal-banner" :class="{ recruitment: !isAdmission }">
    <div class="container">
      <nav :aria-label="$tr(&quot;Breadcrumb&quot;)"><RouterLink to="/">{{ $tr(copy.home) }}</RouterLink><ChevronRight :size="15" aria-hidden="true" /><span aria-current="page">{{ $tr(copy.title) }}</span></nav>
      <span class="portal-eyebrow">{{ $tr(copy.eyebrow) }}</span>
      <h1>{{ $tr(copy.title) }}</h1>
      <p>{{ $tr(copy.intro) }}</p>
      <component :is="isAdmission ? GraduationCap : BriefcaseBusiness" class="portal-decoration" :size="210" :stroke-width=".8" aria-hidden="true" />
    </div>
  </section>
  <section v-if="isAdmission" class="form-download-section" :aria-label="language === 'bn' ? 'ভর্তি ফরম' : 'Admission form PDF'">
    <div class="container">
      <div class="pdf-card">
        <div class="pdf-card-icon"><FileText :size="34" :stroke-width="1.7" aria-hidden="true" /></div>
        <div class="pdf-card-copy">
          <span class="pdf-eyebrow">{{ language === 'bn' ? 'ডাউনলোডযোগ্য পিডিএফ' : 'PRINTABLE PDF' }}</span>
          <h2>{{ language === 'bn' ? 'ভর্তি আবেদন ফরম' : 'Admission application form' }}</h2>
          <p>{{ language === 'bn' ? 'ফরমটি দেখুন বা ডাউনলোড করে পূরণ করুন। জমা দেওয়ার নিয়ম জানতে ভর্তি অফিসে যোগাযোগ করুন।' : 'Preview the form or download a copy to complete. Contact the admission office to confirm how to submit it.' }}</p>
        </div>
        <div class="pdf-card-actions">
          <a href="/forms/admission-form.pdf" target="_blank" rel="noopener noreferrer" class="pdf-preview"><Eye :size="18" aria-hidden="true" />{{ language === 'bn' ? 'ফরম দেখুন' : 'Preview form' }}</a>
          <a href="/forms/admission-form.pdf" download="PIISC-Admission-Form.pdf" class="pdf-download"><Download :size="18" aria-hidden="true" />{{ language === 'bn' ? 'পিডিএফ ডাউনলোড' : 'Download PDF' }}</a>
        </div>
      </div>
    </div>
  </section>
  <section class="section portal-section">
    <div class="container portal-layout">
      <form class="portal-form" @submit.prevent="prepareEmail">
        <h2>{{ $tr(copy.formTitle) }}</h2>
        <p class="portal-form-note">{{ $tr(copy.note) }}</p>
        <div class="portal-fields">
          <label for="application-name">{{ $tr(copy.name) }}<input id="application-name" v-model="form.name" required maxlength="100" autocomplete="name" /></label>
          <label for="application-contact">{{ $tr(copy.contact) }}<input id="application-contact" v-model="form.contact" required maxlength="160" /></label>
          <label for="application-email">{{ $tr(copy.email) }}<input id="application-email" v-model="form.email" type="email" required maxlength="150" autocomplete="email" /></label>
          <label for="application-phone">{{ $tr(copy.phone) }}<input id="application-phone" v-model="form.phone" type="tel" required maxlength="30" autocomplete="tel" /></label>
          <label for="application-interest" class="full-field">{{ $tr(copy.interest) }}<input id="application-interest" v-model="form.interest" required maxlength="100" /></label>
          <label for="application-message" class="full-field">{{ $tr(copy.message) }}<textarea id="application-message" v-model="form.message" rows="4" maxlength="1200"></textarea></label>
        </div>
        <button class="portal-submit" type="submit">{{ $tr(copy.action) }}<ArrowUpRight :size="19" aria-hidden="true" /></button>
        <p v-if="prepared" class="portal-status" role="status">{{ $tr(copy.status) }}</p>
        <p class="portal-recipient">{{ $tr(copy.recipient) }}: <a :href="`mailto:${headerContacts.email}`">{{ $tr(headerContacts.email) }}</a></p>
      </form>
      <aside class="portal-aside">
        <h2>{{ $tr(copy.next) }}</h2>
        <ol><li v-for="(step, index) in copy.steps" :key="step"><span>0{{ $tr(index + 1) }}</span><p>{{ $tr(step) }}</p></li></ol>
        <RouterLink :to="isAdmission ? '/admissions' : '/notices'" class="portal-details">{{ $tr(copy.details) }}<ArrowUpRight :size="17" aria-hidden="true" /></RouterLink>
        <div class="portal-help"><h3>{{ $tr(copy.help) }}</h3><a :href="`tel:${headerContacts.phone.replace(/\s/g, '')}`"><Phone :size="18" aria-hidden="true" />{{ $tr(headerContacts.phone) }}</a><a :href="`mailto:${headerContacts.email}`"><Mail :size="18" aria-hidden="true" />{{ $tr(headerContacts.email) }}</a></div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.portal-banner { position: relative; overflow: hidden; background: linear-gradient(110deg, #294e9e, #173a80); color: #fff; border-bottom: 4px solid #d9b33d; }
.portal-banner.recruitment { border-color: #d9b33d; }
.portal-banner .container { position: relative; padding-block: 30px 58px; }
.portal-banner nav { display: flex; gap: 8px; align-items: center; font-size: 13px; margin-bottom: 35px; }
.portal-eyebrow { font-size: 11px; color: #f3cc48; letter-spacing: .13em; }
.portal-banner h1 { font-size: clamp(36px, 4.5vw, 62px); margin: 14px 0 20px; line-height: 1.2; }
.portal-banner p { max-width: 680px; color: #edf2fa; font-size: 17px; line-height: 1.8; position: relative; z-index: 1; }
.portal-decoration { position: absolute; right: 15px; bottom: 35px; opacity: .1; pointer-events: none; }
.portal-section { background: #f4f7fc; }
.portal-layout { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); gap: 50px; align-items: start; }
.portal-form { padding: 36px; background: #fff; border: 1px solid #dce5f3; border-radius: 10px; box-shadow: 0 14px 35px #173a6a0d; }
h2 { font-size: 29px; line-height: 1.3; color: #294e9e; margin-bottom: 15px; }
.portal-form-note { font-size: 14px; line-height: 1.8; color: #617084; margin-bottom: 25px; }
.portal-fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
label { font-size: 13px; font-weight: 700; color: #173a6a; }
input, textarea { display: block; width: 100%; margin-top: 8px; padding: 12px; border: 1px solid #dce5f3; border-radius: 6px; color: #173a6a; background: #fff; font: inherit; font-weight: 400; transition: border-color .2s, box-shadow .2s; }
textarea { resize: vertical; }
input:focus, textarea:focus { outline: 2px solid #d9b33d; outline-offset: 2px; border-color: #d9b33d; }
.full-field { grid-column: 1 / -1; }
.portal-submit { display: inline-flex; align-items: center; justify-content: center; gap: 14px; margin-top: 25px; padding: 13px 23px; border: 0; border-radius: 7px; background: #294e9e; color: white; font-size: 13px; font-weight: 700; cursor: pointer; transition: background .25s, transform .25s; }
.portal-submit:hover { background: #173a80; transform: translateY(-2px); }
.portal-recipient { font-size: 12px; color: #617084; margin-top: 20px; overflow-wrap: anywhere; }
.portal-recipient a { text-decoration: underline; }
.portal-status { margin-top: 20px; padding: 15px; background: #fff8e3; color: #715721; font-size: 13px; }
.portal-aside { padding-top: 10px; }
.portal-aside ol { list-style: none; padding: 0; margin: 25px 0; }
.portal-aside li { display: flex; gap: 17px; border-bottom: 1px solid #dce5f3; padding: 19px 0; }
.portal-aside li > span { color: #987234; font: 25px Georgia, serif; }
.portal-aside li p { color: #56667a; font-size: 15px; line-height: 1.8; }
.portal-details { display: inline-flex; gap: 12px; align-items: center; font-size: 14px; color: #294e9e; font-weight: 700; border-bottom: 1px solid #d9b33d; padding-bottom: 9px; }
.portal-help { margin-top: 32px; background: #e9f0ff; padding: 25px; border-radius: 7px; }
.portal-help h3 { font-size: 23px; color: #294e9e; margin-bottom: 18px; }
.portal-help a { display: flex; gap: 12px; align-items: center; font-size: 14px; color: #263d55; margin-top: 12px; overflow-wrap: anywhere; }
.portal-help svg { flex-shrink: 0; }
a:hover { text-decoration: underline; }
a:focus-visible, button:focus-visible { outline: 2px solid #d9b33d; outline-offset: 4px; }
.form-download-section { background: #f4f7fc; padding: 48px 0 0; }
.pdf-card { display: flex; align-items: center; gap: 24px; padding: clamp(24px, 3vw, 38px); border: 1px solid #dce5f3; border-left: 5px solid #d9b33d; border-radius: 12px; background: #fff; box-shadow: 0 16px 36px #173a6a0d; }
.pdf-card-icon { display: grid; place-items: center; width: 68px; height: 68px; border-radius: 14px; background: #fff7d7; color: #294e9e; flex: none; }
.pdf-card-copy { min-width: 0; flex: 1; }
.pdf-eyebrow { display: block; color: #a77d31; font-size: 11px; font-weight: 800; letter-spacing: .16em; margin-bottom: 8px; }
.pdf-card h2 { margin: 0 0 7px; font-size: clamp(24px, 2.1vw, 32px); }
.pdf-card p { max-width: 650px; color: #5d6e86; font-size: 14px; line-height: 1.65; }
.pdf-card-actions { display: flex; align-items: center; gap: 10px; flex: none; }
.pdf-card-actions a { display: inline-flex; align-items: center; justify-content: center; gap: 9px; min-height: 47px; padding: 11px 15px; border: 1px solid #294e9e; border-radius: 7px; color: #294e9e; font-size: 13px; font-weight: 700; white-space: nowrap; text-decoration: none; transition: background .25s ease, color .25s ease, transform .25s ease, box-shadow .25s ease; }
.pdf-card-actions .pdf-download { color: #fff; background: #294e9e; }
.pdf-card-actions a:hover { transform: translateY(-2px); color: #fff; background: #173a80; box-shadow: 0 9px 20px #173a6a1f; }
@media (max-width: 1100px) { .pdf-card { flex-wrap: wrap; } .pdf-card-actions { width: 100%; margin-left: 92px; } }
@media (max-width: 600px) { .pdf-card { gap: 15px; } .pdf-card-icon { width: 52px; height: 52px; } .pdf-card-icon svg { width: 26px; height: 26px; } .pdf-card-actions { margin: 5px 0 0; flex-wrap: wrap; } .pdf-card-actions a { flex: 1; } }
@media(max-width: 850px) { .portal-layout { grid-template-columns: 1fr; gap: 35px; } }
@media(max-width: 540px) { .portal-form { padding: 25px 20px; } .portal-fields { grid-template-columns: 1fr; } .portal-submit { width: 100%; } }
@media(prefers-reduced-motion: reduce) { input, textarea, .portal-submit, .pdf-card-actions a { transition: none; } .portal-submit:hover, .pdf-card-actions a:hover { transform: none; } }
</style>
