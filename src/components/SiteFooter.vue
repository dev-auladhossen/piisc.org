<script setup>
import { Facebook, Youtube } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { images } from '../data/content.js'
import { headerContacts } from '../data/navigation.js'
import { useI18n } from '../composables/useI18n.js'
const { language } = useI18n()
const route = useRoute()
const copy = (en, bn) => language.value === 'bn' ? bn : en
const socials = [{name:'Facebook',icon:Facebook,url:headerContacts.socials.facebook},{name:'YouTube',icon:Youtube,url:headerContacts.socials.youtube}]
</script>
<template>
 <footer class="site-footer" :class="{ 'vision-footer': ['vision-mission', 'chief-advisor-message'].includes(route.name) }">
  <div class="container">
   <section class="footer-admission" aria-labelledby="footer-admission-title">
    <div>
     <p class="footer-eyebrow">{{ copy('ADMISSION OFFICE','ভর্তি অফিস') }}</p>
     <h2 id="footer-admission-title">{{ copy('Let’s plan your child’s next step.','আপনার সন্তানের আগামী দিনের পরিকল্পনা করি।') }}</h2>
     <p>{{ copy('Speak with the PIISC team about admission or arrange a school visit.','ভর্তি সম্পর্কে জানতে বা স্কুল পরিদর্শনের ব্যবস্থা করতে পিআইআইএসসি দলের সঙ্গে কথা বলুন।') }}</p>
    </div>
    <div class="footer-actions"><RouterLink to="/contact" class="footer-inquiry">{{ copy('Send Inquiry','জিজ্ঞাসা করুন') }}</RouterLink><a :href="`tel:${headerContacts.phone.replace(/\s/g, '')}`">{{ copy('Call Office','অফিসে কল করুন') }}</a></div>
   </section>
   <div class="footer-bottom">
    <div class="footer-brand-group">
     <RouterLink to="/" class="footer-brand" :aria-label="copy('PIISC home','পিআইআইএসসি হোম')">
      <img :src="images.logo" :alt="copy('PIISC school logo','পিআইআইএসসি স্কুলের লোগো')" width="64" height="70" loading="lazy" />
      <span><strong>{{ copy('PEACE INTERNATIONAL','পিস ইন্টারন্যাশনাল') }}</strong><small>{{ copy('ISLAMIC SCHOOL & COLLEGE','ইসলামিক স্কুল অ্যান্ড কলেজ') }}</small><em>{{ copy('Modern Education With Islamic Values','ইসলামী মূল্যবোধের সঙ্গে আধুনিক শিক্ষা') }}</em></span>
     </RouterLink>
     <div class="footer-socials" :aria-label="copy('Social media','সামাজিক যোগাযোগমাধ্যম')">
      <template v-for="social in socials" :key="social.name">
       <a v-if="social.url" :href="social.url" :aria-label="`PIISC on ${social.name}`" target="_blank" rel="noopener noreferrer"><component :is="social.icon" :size="18" aria-hidden="true" /></a>
       <span v-else role="img" :aria-label="`${social.name} — ${copy('link coming soon','লিংক শীঘ্রই আসছে')}`" :title="`${social.name} — ${copy('link coming soon','লিংক শীঘ্রই আসছে')}`"><component :is="social.icon" :size="18" aria-hidden="true" /></span>
      </template>
     </div>
    </div>
    <div class="footer-details">
     <p>© {{ new Date().getFullYear() }} {{ copy('Peace International Islamic School & College (PIISC).','পিস ইন্টারন্যাশনাল ইসলামিক স্কুল অ্যান্ড কলেজ (পিআইআইএসসি)।') }}</p>
     <p>{{ copy('All rights reserved.','সর্বস্বত্ব সংরক্ষিত।') }}</p>
     <nav :aria-label="copy('School links','স্কুলের লিংক')"><RouterLink to="/about">{{ copy('About Us','আমাদের সম্পর্কে') }}</RouterLink><RouterLink to="/admission-requirement">{{ copy('Admissions','ভর্তি') }}</RouterLink><RouterLink to="/contact">{{ copy('Contact','যোগাযোগ') }}</RouterLink></nav>
    </div>
   </div>
  </div>
 </footer>
</template>
<style scoped>
.vision-footer>.container{width:calc(100% - clamp(32px,6.5vw,128px));max-width:1800px}
.site-footer{background:linear-gradient(180deg,#f7f8fc,#fff);padding-top:28px;color:#294e9e}.footer-admission{display:flex;align-items:center;justify-content:space-between;gap:40px;background:linear-gradient(110deg,#0a2948,#294e9e);padding:clamp(28px,4vw,48px);border-radius:6px;color:white}.footer-admission>div:first-child{max-width:760px}.footer-eyebrow{color:#f0cf66;font-size:11px;font-weight:800;letter-spacing:.2em;margin-bottom:15px}.footer-admission h2{color:white;font-size:clamp(28px,3.2vw,42px);line-height:1.2;margin:0 0 18px;max-width:650px}.footer-admission p:last-child{color:#e7edf7;font-size:15px;line-height:1.7}.footer-actions{display:flex;gap:12px;flex-shrink:0}.footer-actions a{display:inline-flex;justify-content:center;align-items:center;min-height:48px;padding:12px 19px;border:1px solid #ffffff66;border-radius:6px;color:white;font-size:14px;font-weight:700;cursor:pointer;transition:background .25s,color .25s,transform .25s,box-shadow .25s}.footer-actions .footer-inquiry{background:#d9b33d;border-color:#d9b33d;color:#102947}.footer-actions a:hover{transform:translateY(-3px);background:white;color:#0a2948;box-shadow:0 8px 20px #0002}.footer-bottom{display:flex;justify-content:space-between;align-items:center;gap:30px;border-top:1px solid #dbe2ed;margin-top:44px;padding-block:30px 36px}.footer-brand-group{display:flex;align-items:center;gap:24px}.footer-brand{display:flex;align-items:center;gap:12px}.footer-brand img{width:64px;height:70px;object-fit:contain;flex-shrink:0}.footer-brand strong{display:block;font-size:16px;line-height:1.35;color:#0a2948}.footer-brand small{display:block;font-size:11px;font-weight:700;line-height:1.5;margin-top:3px}.footer-brand em{display:block;margin-top:6px;font-size:9px;line-height:1.5;font-style:normal;color:#977323}.footer-socials{display:flex;gap:8px}.footer-socials>a,.footer-socials>span{display:grid;place-items:center;width:36px;height:36px;border:1px solid #dbe2ed;border-radius:6px;background:#fff;color:#294e9e}.footer-socials>a{transition:background .25s,color .25s,transform .25s;cursor:pointer}.footer-socials>a:hover{background:#294e9e;color:white;transform:translateY(-3px)}.footer-details{text-align:right;font-size:11px;line-height:1.8;max-width:490px}.footer-details nav{display:flex;justify-content:flex-end;gap:20px;margin-top:5px}.footer-details a{transition:color .25s}.footer-details a:hover{color:#977323;text-decoration:underline;text-underline-offset:4px}@media(max-width:1000px){.footer-admission{align-items:flex-start;flex-direction:column;gap:24px}.footer-bottom{align-items:flex-start;flex-direction:column}.footer-details{text-align:left}.footer-details nav{justify-content:flex-start}}@media(max-width:480px){.footer-brand-group{align-items:flex-start;flex-direction:column;gap:18px}.footer-actions{width:100%;flex-wrap:wrap}.footer-actions a{flex:1}.footer-brand strong{font-size:14px}.footer-brand img{width:56px;height:62px}.footer-bottom{margin-top:30px}}@media(prefers-reduced-motion:reduce){.site-footer a{transition:none}.site-footer a:hover{transform:none}}
</style>
