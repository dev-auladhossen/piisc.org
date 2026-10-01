<script setup>
import { address } from '../data/content.js'
import { headerContacts } from '../data/navigation.js'
import { MapPin, Phone, Mail, Clock3, ArrowUpRight } from 'lucide-vue-next'
import PageHero from '../components/PageHero.vue'
import ContactForm from '../components/ContactForm.vue'
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
</script>
<template>
  <PageHero :eyebrow="$tr(&quot;Get in touch&quot;)" :title="$tr(&quot;A conversation is the first step.&quot;)" :lead="$tr(&quot;Questions about admissions, school life or visiting PIISC? We would be happy to help you find your next step.&quot;)" />
  <section class="section contact-page"><div class="container">
    <div class="contact-quick-links">
      <a :href="`tel:${headerContacts.phone.replace(/\s/g, '')}`"><Phone aria-hidden="true"/><div><span>{{ $tr("Let's talk") }}</span><strong>{{ $tr(headerContacts.phone) }}</strong></div><ArrowUpRight :size="19" aria-hidden="true"/></a>
      <a :href="`mailto:${headerContacts.email}`"><Mail aria-hidden="true"/><div><span>{{ $tr("Send us an email") }}</span><strong>{{ $tr(headerContacts.email) }}</strong></div><ArrowUpRight :size="19" aria-hidden="true"/></a>
      <a :href="mapsUrl" target="_blank" rel="noopener noreferrer"><MapPin aria-hidden="true"/><div><span>{{ $tr("Come say hello") }}</span><strong>{{ $tr("Ashulia, Savar, Dhaka") }}</strong></div><ArrowUpRight :size="19" aria-hidden="true"/></a>
    </div>
    <div class="contact-panel"><ContactForm/><aside class="campus-contact"><span class="eyebrow">{{ $tr("Our school") }}</span><h2>{{ $tr("PIISC, Ashulia") }}</h2><p class="campus-subtitle">{{ $tr("Peace International Islamic School & College") }}</p>
      <div class="campus-info"><MapPin aria-hidden="true"/><div><h3>{{ $tr("Address") }}</h3><p>{{ $tr(address) }}</p><a :href="mapsUrl" target="_blank" rel="noopener noreferrer" class="directions">{{ $tr("Get directions ") }}<ArrowUpRight :size="16" aria-hidden="true"/></a></div></div>
      <div class="campus-info"><Phone aria-hidden="true"/><div><h3>{{ $tr("Call us") }}</h3><a :href="`tel:${headerContacts.phone.replace(/\s/g, '')}`">{{ $tr(headerContacts.phone) }}</a></div></div>
      <div class="campus-info"><Mail aria-hidden="true"/><div><h3>{{ $tr("Email us") }}</h3><a :href="`mailto:${headerContacts.email}`">{{ $tr(headerContacts.email) }}</a></div></div>
      <div class="campus-info"><Clock3 aria-hidden="true"/><div><h3>{{ $tr("Opening hours") }}</h3><p>{{ $tr("Please call to confirm office hours and arrange your visit.") }}</p></div></div>
      <div class="visit-note">{{ $tr("We look forward to meeting your family. Contact our team before visiting so we can help you plan your visit.") }}</div>
    </aside></div>
  </div></section>
</template>
<style scoped>
.contact-page{background:linear-gradient(135deg,#f5f7f2,#fff)}.contact-quick-links{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:40px}.contact-quick-links>a{display:flex;align-items:center;gap:18px;padding:26px 22px;background:#fff;border:1px solid #dce5de;border-radius:6px;cursor:pointer;transition:transform .3s,box-shadow .3s,border-color .3s}.contact-quick-links>a:hover{transform:translateY(-5px);border-color:#b89345;box-shadow:0 12px 30px #18313e10}.contact-quick-links svg{color:#0e5b4a;flex-shrink:0}.contact-quick-links svg:last-child{margin-left:auto}.contact-quick-links span{display:block;font-size:12px;color:#62736b;margin-bottom:7px}.contact-quick-links strong{display:block;font-size:14px;overflow-wrap:anywhere}.contact-panel{display:grid;grid-template-columns:1.55fr 1fr;align-items:start;gap:0;border-radius:6px;overflow:hidden}.campus-contact{padding:45px 38px;background:#0a2948;color:#e0e9e7;min-height:100%}.campus-contact h2{font-size:34px;color:white;margin:12px 0}.campus-subtitle{font-size:14px;color:#c7d8d7;margin-bottom:32px}.campus-info{display:flex;gap:18px;margin-top:26px;padding-bottom:24px;border-bottom:1px solid #ffffff20}.campus-info>svg{flex-shrink:0;color:#e4c683;width:21px;margin-top:4px}.campus-info h3{font-size:18px;color:white;margin-bottom:9px}.campus-info p,.campus-info a{font-size:14px;overflow-wrap:anywhere}.campus-info a{transition:color .25s}.campus-info a:hover{color:#e4c683}.directions{display:inline-flex;align-items:center;gap:8px;margin-top:12px;color:#e4c683;cursor:pointer}.visit-note{margin-top:28px;padding-left:18px;border-left:2px solid #b89345;font-size:13px;line-height:1.8;color:#c7d8d7}
@media(max-width:1050px){.contact-quick-links{grid-template-columns:1fr}.contact-panel{grid-template-columns:1.2fr 1fr}.campus-contact{padding:32px 24px}}
@media(max-width:760px){.contact-panel{grid-template-columns:1fr}.contact-quick-links{gap:12px}.campus-contact{padding:34px 26px}}
</style>
