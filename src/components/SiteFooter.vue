<script setup>
import { computed } from 'vue'
import { ChevronRight, Clock3, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Youtube } from 'lucide-vue-next'
import { images, address } from '../data/content.js'
import { headerContacts } from '../data/navigation.js'
import { useI18n } from '../composables/useI18n.js'
const { t, language } = useI18n()
const quickLinks = computed(() => [
  { to: '/', label: t.value.nav.home },
  { to: '/about', label: t.value.nav.about },
  { to: '/admissions', label: t.value.nav.admissions },
  { to: '/notices', label: language.value === 'bn' ? 'নোটিশ' : 'Notices' },
  { to: '/academics', label: t.value.nav.academics },
  { to: '/academic-calendar', label: language.value === 'bn' ? 'শিক্ষাবর্ষের ক্যালেন্ডার' : 'Academic Calendar' },
  { to: '/campus', label: t.value.nav.campus },
  { to: '/gallery', label: language.value === 'bn' ? 'গ্যালারি' : 'Gallery' },
  { to: '/news', label: t.value.nav.news },
  { to: '/contact', label: t.value.nav.contact },
])
const socialIcons = { facebook: Facebook, instagram: Instagram, whatsapp: MessageCircle, youtube: Youtube }
const socialLinks = Object.entries(headerContacts.socials)
  .filter(([, url]) => url)
  .map(([name, url]) => ({ name, url, icon: socialIcons[name] }))
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
</script>
<template>
  <footer class="site-footer">
    <div class="container site-footer-grid">
      <div class="site-footer-brand">
        <RouterLink to="/" class="site-footer-mark" :aria-label="$tr(t.brand)">
          <img :src="images.logo" :alt="$tr(&quot;PIISC emblem&quot;)" width="80" height="80" />
          <span class="site-footer-name">{{ $tr("Peace") }}<br />{{ $tr("International") }}<small>{{ $tr("Islamic School & College") }}</small></span>
        </RouterLink>
        <p class="site-footer-description">{{ $tr(t.footer.note) }}</p>
        <div v-if="socialLinks.length" class="site-footer-socials">
          <a v-for="social in socialLinks" :key="social.name" :href="social.url" :aria-label="$tr(`PIISC on ${social.name}`)" target="_blank" rel="noopener noreferrer">
            <component :is="social.icon" :size="19" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div class="site-footer-navigation">
        <h2 id="footer-links-heading">{{ $tr(language === 'bn' ? 'প্রয়োজনীয় লিংক' : 'Quick Links') }}</h2>
        <nav class="site-footer-links" aria-labelledby="footer-links-heading">
          <RouterLink v-for="item in quickLinks" :key="item.to" :to="item.to">
            <ChevronRight :size="16" aria-hidden="true" />
            <span>{{ $tr(item.label) }}</span>
          </RouterLink>
        </nav>
      </div>

      <div class="site-footer-contact">
        <h2>{{ $tr(language === 'bn' ? 'যোগাযোগ করুন' : 'Get In Touch') }}</h2>
        <address class="site-footer-contact-list">
          <a :href="mapUrl" target="_blank" rel="noopener noreferrer" class="site-footer-contact-row">
            <span class="site-footer-icon"><MapPin :size="20" aria-hidden="true" /></span>
            <span>{{ $tr(address) }}</span>
          </a>
          <a :href="`tel:${headerContacts.phone.replace(/\s/g, '')}`" class="site-footer-contact-row">
            <span class="site-footer-icon"><Phone :size="20" aria-hidden="true" /></span>
            <span>{{ $tr(headerContacts.phone.trim()) }}</span>
          </a>
          <a :href="`mailto:${headerContacts.email}`" class="site-footer-contact-row">
            <span class="site-footer-icon"><Mail :size="20" aria-hidden="true" /></span>
            <span>{{ $tr(headerContacts.email) }}</span>
          </a>
          <div class="site-footer-contact-row">
            <span class="site-footer-icon"><Clock3 :size="20" aria-hidden="true" /></span>
            <span><small>{{ $tr(t.contact.office) }}</small>{{ $tr(t.contact.officeValue) }}</span>
          </div>
        </address>
      </div>
    </div>
    <div class="container site-footer-bottom">
      <span>&copy; {{ $tr(new Date().getFullYear()) }}{{ $tr(" PIISC. ") }}{{ $tr(t.footer.copyright) }}</span>
      <span>{{ $tr(t.footer.visualNote) }}</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer { background: #061e36; color: #b9cacc; border-top: 3px solid #bb9952; }
.site-footer-grid {
  display: grid;
  grid-template-columns: 1.05fr 1.1fr 1fr;
  gap: clamp(28px, 4vw, 64px);
  padding-block: 76px 66px;
}
.site-footer-grid > div { min-width: 0; }
.site-footer-mark { display: inline-flex; align-items: center; gap: 15px; color: #fff; }
.site-footer-mark img { width: 80px; height: 80px; flex-shrink: 0; object-fit: contain; background: #fff; padding: 5px; }
.site-footer-name { font-size: clamp(21px, 2vw, 28px); font-weight: 800; line-height: 1.12; letter-spacing: -.025em; }
.site-footer-name small {
  display: block;
  margin-top: 9px;
  color: #e3c88d;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.site-footer-description { max-width: 350px; margin-top: 25px; font-size: 15px; line-height: 1.85; }
.site-footer h2 { margin: 0 0 25px; color: #fff; font-family: inherit; font-size: 20px; font-weight: 700; line-height: 1.4; }
.site-footer h2::after { content: ''; display: block; width: 38px; height: 3px; margin-top: 12px; border-radius: 2px; background: #bb9952; }
.site-footer-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(5, auto);
  grid-auto-flow: column;
  gap: 5px 20px;
}
.site-footer-links a {
  display: flex;
  align-items: baseline;
  gap: 5px;
  width: fit-content;
  max-width: calc(100% - 8px);
  padding-block: 7px;
  font-size: 14px;
  line-height: 1.6;
  transition: transform 260ms ease, color 260ms ease;
}
.site-footer-links svg { flex-shrink: 0; align-self: flex-start; margin-top: 3px; color: #e3c88d; }
.site-footer-links a:hover,
.site-footer-links a:focus-visible { color: #e3c88d; transform: translateX(8px); }
.site-footer-contact-list { display: grid; gap: 17px; font-style: normal; }
.site-footer-contact-row { display: flex; align-items: center; gap: 15px; font-size: 14px; line-height: 1.75; }
.site-footer-contact-row > span:last-child { min-width: 0; overflow-wrap: anywhere; }
.site-footer-contact-row small { display: block; color: #e1e8e9; font-size: 12px; }
.site-footer-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #ffffff0d;
  color: #e3c88d;
  transition: background 260ms ease, color 260ms ease;
}
.site-footer-contact-list a { transition: color 260ms ease; }
.site-footer-contact-list a:hover,
.site-footer-contact-list a:focus-visible { color: #e3c88d; }
.site-footer-contact-list a:hover .site-footer-icon,
.site-footer-contact-list a:focus-visible .site-footer-icon { background: #0e5b4a; color: #fff; }
.site-footer-socials { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 26px; }
.site-footer-socials a {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid #ffffff30;
  border-radius: 50%;
  transition: transform 260ms ease, background 260ms ease, color 260ms ease;
}
.site-footer-socials a:hover,
.site-footer-socials a:focus-visible { transform: translateY(-3px); background: #0e5b4a; color: #fff; }
.site-footer a:focus-visible { outline: 2px solid #e3c88d; outline-offset: 5px; border-radius: 3px; }
.site-footer-bottom { display: flex; justify-content: space-between; gap: 20px 40px; padding-block: 22px; border-top: 1px solid #ffffff1c; color: #a8bec3; font-size: 12px; line-height: 1.7; }
.site-footer-bottom > span:last-child { max-width: 510px; text-align: right; }
@media (max-width: 1000px) {
  .site-footer-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 42px; }
  .site-footer-brand { grid-column: 1 / -1; }
  .site-footer-description { max-width: 460px; }
}
@media (max-width: 600px) {
  .site-footer-grid { grid-template-columns: minmax(0, 1fr); padding-block: 50px 40px; gap: 36px; }
  .site-footer-name { font-size: 25px; }
  .site-footer-mark img { width: 72px; height: 72px; }
  .site-footer-links { gap: 6px 18px; }
  .site-footer-bottom { flex-direction: column; gap: 8px; }
  .site-footer-bottom > span:last-child { text-align: left; }
}
@media (prefers-reduced-motion: reduce) {
  .site-footer a, .site-footer-icon { transition: none; }
  .site-footer-links a:hover, .site-footer-links a:focus-visible,
  .site-footer-socials a:hover, .site-footer-socials a:focus-visible { transform: none; }
}
</style>
