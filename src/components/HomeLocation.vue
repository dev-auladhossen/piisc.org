<script setup>
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-vue-next'
import { address, schoolDirectionsUrl, schoolMapEmbedUrl, schoolMapUrl } from '../data/content.js'
import { headerContacts } from '../data/navigation.js'
import { useI18n } from '../composables/useI18n.js'

const { language } = useI18n()
const tr = (en, bn) => language.value === 'bn' ? bn : en
const phoneUrl = `tel:${headerContacts.phone.replace(/\s/g, '')}`
</script>

<template>
  <section class="home-location" aria-labelledby="home-location-title">
    <div class="location-width">
      <header class="location-heading">
        <span class="location-label">{{ tr('LOCATION', 'অবস্থান') }}</span>
        <h2 id="home-location-title">{{ tr('Find PIISC', 'পিআইআইএসসি খুঁজে নিন') }}</h2>
        <p>{{ tr('Visit us in Ashulia, Savar, Dhaka.', 'ঢাকার সাভারের আশুলিয়ায় আমাদের ক্যাম্পাসে আসুন।') }}</p>
      </header>
      <div class="location-card">
        <div class="map-wrap">
          <iframe
            :src="schoolMapEmbedUrl"
            :title="tr('Google Map showing the PIISC address in Ashulia', 'আশুলিয়ায় পিআইআইএসসির ঠিকানার গুগল ম্যাপ')"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>
          <a class="map-open" :href="schoolMapUrl" target="_blank" rel="noopener noreferrer" :aria-label="tr('Open the exact school location in Google Maps', 'গুগল ম্যাপে স্কুলের সঠিক অবস্থান খুলুন')">
            <span>{{ tr('Open in Google Maps', 'গুগল ম্যাপে খুলুন') }} <ArrowUpRight :size="18" aria-hidden="true" /></span>
          </a>
        </div>
        <aside class="location-details">
          <div class="location-details-heading"><MapPin :size="24" aria-hidden="true" /><h3>{{ tr('Our location', 'আমাদের অবস্থান') }}</h3></div>
          <div class="location-detail"><MapPin :size="20" aria-hidden="true" /><div><strong>{{ tr('Peace International Islamic School & College', 'পিস ইন্টারন্যাশনাল ইসলামিক স্কুল অ্যান্ড কলেজ') }}</strong><p>{{ tr(address, 'দ্য হোয়াইট প্যালেস ইউনিক, ১৩৪৯ ঢাকা–আশুলিয়া মহাসড়ক, বাইপাইল') }}</p></div></div>
          <div class="location-detail"><Phone :size="20" aria-hidden="true" /><a :href="phoneUrl">{{ headerContacts.phone.trim() }}</a></div>
          <div class="location-detail"><Mail :size="20" aria-hidden="true" /><a :href="`mailto:${headerContacts.email}`">{{ headerContacts.email }}</a></div>
          <a class="map-directions" :href="schoolDirectionsUrl" target="_blank" rel="noopener noreferrer">{{ tr('Get directions on Google Maps', 'গুগল ম্যাপে পথ দেখুন') }} <ArrowUpRight :size="19" aria-hidden="true" /></a>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-location{background:#fff;padding:72px 0 84px}.location-width{width:calc(100% - clamp(32px,6.5vw,128px));max-width:1500px;margin-inline:auto}.location-heading{text-align:center;margin-bottom:36px}.location-label{display:inline-block;padding:8px 18px;border:1px solid #c7d9fa;background:#edf3ff;border-radius:100px;color:#294e9e;font-size:12px;font-weight:800;letter-spacing:.17em}.location-heading h2{font-size:clamp(34px,3.5vw,52px);color:#294e9e;margin:13px 0 8px}.location-heading p{font-size:16px;color:#536989}.location-card{display:grid;grid-template-columns:minmax(0,1.9fr) minmax(300px,.9fr);border:1px solid #dce3f0;border-radius:12px;overflow:hidden;box-shadow:0 20px 48px #294e9e14}.map-wrap{min-height:440px;background:#e9effa}.map-wrap iframe{display:block;width:100%;height:100%;min-height:440px;border:0}.location-details{background:#234b91;color:#fff;padding:34px 30px;display:flex;flex-direction:column}.location-details-heading{display:flex;gap:11px;align-items:center;border-bottom:1px solid #ffffff50;padding-bottom:16px}.location-details-heading svg,.location-detail>svg{color:#e5b532;flex:none}.location-details-heading h3{font-size:24px;margin:0}.location-detail{display:flex;gap:16px;align-items:flex-start;margin-top:24px;font-size:15px;line-height:1.6}.location-detail strong{font-size:15px}.location-detail p{margin-top:5px;color:#e3ecfc}.location-detail a{overflow-wrap:anywhere}.location-detail a:hover{text-decoration:underline}.map-directions{display:flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:10px 16px;margin-top:auto;border-radius:6px;background:#e4b12e;color:#142d56;font-size:14px;font-weight:800;text-align:center;transition:background .2s}.map-directions:hover{background:#f0c54e}.map-directions:focus-visible{outline:3px solid white;outline-offset:3px}@media(max-width:850px){.location-card{grid-template-columns:1fr}.map-wrap,.map-wrap iframe{min-height:350px}.location-details{gap:0}.map-directions{margin-top:28px}}@media(max-width:600px){.home-location{padding:48px 0 60px}.location-heading{margin-bottom:26px}.map-wrap,.map-wrap iframe{min-height:300px}.location-details{padding:27px 23px}}
</style>
<style scoped>
.home-location { background: #fff9ec; }
.map-wrap { position: relative; }
.map-open {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 16px;
  color: #fff;
}
.map-open span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 14px;
  border-radius: 6px;
  background: #234b91;
  font-size: 14px;
  font-weight: 800;
  box-shadow: 0 4px 16px #0003;
}
.map-open:hover span, .map-open:focus-visible span { background: #173969; }
</style>
