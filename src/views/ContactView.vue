<script setup>
import { Clock3, Facebook, Mail, MapPin, MessageCircle, Phone } from 'lucide-vue-next'
import { address, schoolMapUrl } from '../data/content.js'
import { headerContacts } from '../data/navigation.js'
import { useI18n } from '../composables/useI18n.js'
import ContactForm from '../components/ContactForm.vue'
import coverPhoto from '../assets/images/studytime.jpg'

const { language } = useI18n()
const copy = (en, bn) => language.value === 'bn' ? bn : en
const phone = headerContacts.phone.trim()
const phoneUrl = `tel:${phone.replace(/\s/g, '')}`
const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}`
const mapUrl = schoolMapUrl
</script>

<template>
  <main>
    <section class="contact-hero" :style="{ '--cover-photo': `url(${coverPhoto})` }" aria-labelledby="contact-title"><div class="contact-width"><p class="hero-label">{{ copy('CONTACT', 'যোগাযোগ') }}</p><h1 id="contact-title">{{ copy('Connect with the PIISC admission office.', 'পিআইআইএসসির ভর্তি বিভাগে যোগাযোগ করুন।') }}</h1><p>{{ copy('Send an inquiry, request a callback, call the office, or reach the school through WhatsApp and email.', 'অনুসন্ধান পাঠান, ফোনকলের অনুরোধ করুন, অথবা ফোন, হোয়াটসঅ্যাপ ও ইমেইলে যোগাযোগ করুন।') }}</p></div></section>
    <section class="contact-section"><div class="contact-width contact-layout">
      <div class="contact-copy"><p class="section-label">{{ copy('CONTACT', 'যোগাযোগ') }}</p><h2>{{ copy('Reach the school office.', 'বিদ্যালয় অফিসে যোগাযোগ করুন।') }}</h2><p class="intro">{{ copy('Contact the admissions desk for details about class placement, admission, and visiting hours.', 'শ্রেণি নির্বাচন, ভর্তি ও পরিদর্শনের সময় সম্পর্কে জানতে ভর্তি বিভাগে যোগাযোগ করুন।') }}</p>
        <div class="contact-methods">
          <a :href="phoneUrl"><span class="method-icon"><Phone aria-hidden="true" /></span><strong>{{ phone }}</strong></a>
          <a :href="`mailto:${headerContacts.email}`"><span class="method-icon"><Mail aria-hidden="true" /></span><strong>{{ headerContacts.email }}</strong></a>
          <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer"><span class="method-icon"><MessageCircle aria-hidden="true" /></span><strong>{{ copy('WhatsApp admission support', 'হোয়াটসঅ্যাপে ভর্তি সহায়তা') }}</strong></a>
          <a :href="mapUrl" target="_blank" rel="noopener noreferrer"><span class="method-icon"><MapPin aria-hidden="true" /></span><strong>{{ copy(address, 'দ্য হোয়াইট প্যালেস ইউনিক, ১৩৪৯ ঢাকা–আশুলিয়া মহাসড়ক, বাইপাইল') }}</strong></a>
          <div class="office-hours"><span class="method-icon"><Clock3 aria-hidden="true" /></span><strong>{{ copy('Call to confirm office hours before visiting.', 'পরিদর্শনের আগে ফোন করে অফিসের সময় নিশ্চিত করুন।') }}</strong></div>
        </div>
        <a v-if="headerContacts.socials.facebook" class="facebook-link" :href="headerContacts.socials.facebook" target="_blank" rel="noopener noreferrer" :aria-label="copy('PIISC on Facebook', 'ফেসবুকে পিআইআইএসসি')"><Facebook :size="18" aria-hidden="true" /></a>
      </div>
      <ContactForm />
    </div></section>
  </main>
</template>

<style scoped>
.contact-width{width:calc(100% - clamp(36px,6.5vw,130px));max-width:1350px;margin-inline:auto}.contact-hero{min-height:390px;display:flex;align-items:center;color:white;background-image:linear-gradient(90deg,#294e9ef2 0%,#294e9ee8 52%,#294e9eb8 100%),var(--cover-photo);background-size:cover;background-position:center}.contact-hero .contact-width{padding-block:58px}.hero-label,.section-label{font-size:12px;letter-spacing:.18em;font-weight:800;color:#f5cd46;margin-bottom:16px}.contact-hero h1{font-size:clamp(44px,5.6vw,78px);line-height:1.04;max-width:930px;color:white;margin:0 0 22px}.contact-hero p:last-child{font-size:18px;line-height:1.7;max-width:660px;color:#f3f6ff}.contact-section{background:#fff;padding:70px 0 90px}.contact-layout{display:grid;grid-template-columns:minmax(0,.87fr) minmax(0,1.13fr);gap:clamp(38px,5vw,75px);align-items:start}.section-label{color:#be9228}.contact-copy h2{font-size:clamp(38px,4.1vw,58px);line-height:1.08;color:#294e9e;max-width:530px;margin:0 0 18px}.intro{font-size:17px;line-height:1.75;color:#526684;max-width:515px;margin-bottom:28px}.contact-methods{display:grid;gap:14px}.contact-methods>a,.office-hours{display:flex;gap:16px;align-items:center;min-height:88px;padding:15px;border:1px solid #dcb13b;border-radius:6px;background:#fff;color:#172238}.contact-methods>a:hover{border-color:#294e9e;background:#fffdf5}.method-icon{width:64px;height:64px;display:grid;place-items:center;flex:none;border-radius:6px;background:#3285e7;color:#ffe041}.method-icon svg{width:27px;height:27px}.contact-methods strong,.office-hours strong{font-size:18px;line-height:1.4;overflow-wrap:anywhere}.logo-panel{display:flex;align-items:center;justify-content:center;gap:18px;min-height:165px;margin-top:18px;padding:18px;border:1px solid #e1dfa1;border-radius:6px;background-color:#fffbd6;background-image:linear-gradient(#e4e4b560 1px,transparent 1px),linear-gradient(90deg,#e4e4b560 1px,transparent 1px);background-size:24px 24px;color:#294e9e;text-align:center}.logo-panel img{width:100px;height:100px;object-fit:contain}.logo-panel span{max-width:240px;font-size:16px;font-weight:800;line-height:1.45}.map-panel{margin-top:14px;border:1px solid #dce3f0;border-radius:6px;overflow:hidden}.map-panel iframe{display:block;width:100%;height:260px;border:0}.map-panel a{display:inline-flex;align-items:center;gap:6px;padding:10px 13px;color:#294e9e;font-size:13px;font-weight:800}.map-panel a:hover{text-decoration:underline}@media(max-width:1000px){.contact-layout{grid-template-columns:1fr;gap:40px}.contact-copy{max-width:750px}}@media(max-width:600px){.contact-hero{min-height:320px}.contact-hero .contact-width{padding-block:46px}.contact-hero p:last-child{font-size:16px}.contact-section{padding:48px 0 65px}.contact-methods strong,.office-hours strong{font-size:15px}.method-icon{width:52px;height:52px}.contact-methods>a,.office-hours{min-height:75px}.logo-panel{justify-content:flex-start}}
</style>

<style scoped>
.contact-copy h2{font-size:clamp(38px,3.7vw,50px);line-height:1.08;max-width:440px;margin-bottom:14px}.contact-copy .section-label{font-size:11px;margin-bottom:10px}.contact-copy .intro{font-size:15px;line-height:1.75;max-width:420px;margin-bottom:22px}.contact-copy .contact-methods{gap:12px;max-width:500px}.contact-copy .contact-methods>a,.contact-copy .office-hours{min-height:74px;padding:12px;gap:13px}.contact-copy .method-icon{width:48px;height:48px}.contact-copy .method-icon svg{width:24px;height:24px}.contact-copy .contact-methods strong,.contact-copy .office-hours strong{font-size:16px;line-height:1.35;font-weight:800}.facebook-link{display:inline-grid;place-items:center;width:34px;height:34px;margin-top:16px;border:1px solid #dcb13b;border-radius:6px;color:#294e9e}.facebook-link:hover{background:#eaf1ff}@media(max-width:600px){.contact-copy .contact-methods>a,.contact-copy .office-hours{min-height:70px}.contact-copy .contact-methods strong,.contact-copy .office-hours strong{font-size:15px}}
</style>
