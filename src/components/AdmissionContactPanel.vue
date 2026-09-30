<script setup>
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from 'lucide-vue-next'
import { address } from '../data/content.js'
import { headerContacts } from '../data/navigation.js'
</script>

<template>
  <aside class="admission-panel" :aria-label="$tr(&quot;Admissions contact information&quot;)">
    <span class="panel-kicker">{{ $tr("WE'RE HERE TO HELP") }}</span>
    <h2>{{ $tr("Admission Contact Info") }}</h2>
    <p>{{ $tr("Get to know PIISC and find the next step for your family.") }}</p>
    <address>
      <div><MapPin :size="20" aria-hidden="true" /><span>{{ $tr(address) }}</span></div>
      <a :href="`tel:${headerContacts.phone.replace(/\s/g, '')}`"><Phone :size="20" aria-hidden="true" /><span>{{ $tr(headerContacts.phone.trim()) }}</span></a>
      <a :href="`mailto:${headerContacts.email}`"><Mail :size="20" aria-hidden="true" /><span>{{ $tr(headerContacts.email) }}</span></a>
      <div><Clock3 :size="20" aria-hidden="true" /><span>{{ $tr("Please call to arrange a visit and confirm office hours.") }}</span></div>
    </address>
    <RouterLink to="/admissions" class="panel-button">{{ $tr("Explore admissions ") }}<ArrowUpRight :size="18" aria-hidden="true" /></RouterLink>
    <RouterLink to="/contact" class="panel-contact">{{ $tr("Send an enquiry ") }}<ArrowUpRight :size="16" aria-hidden="true" /></RouterLink>
  </aside>
</template>

<style scoped>
.admission-panel { background: #092645; color: #d6e3e4; padding: 34px 28px; border-top: 4px solid #bb9952; border-radius: 0 0 6px 6px; }
.panel-kicker { font-size: 10px; letter-spacing: .16em; color: #e3c88d; font-weight: 700; }
.admission-panel h2 { color: white; font-size: 27px; line-height: 1.25; margin: 14px 0 16px; }
.admission-panel p { font-size: 14px; line-height: 1.8; }
address { display: grid; gap: 23px; margin: 30px 0; font-style: normal; font-size: 14px; }
address > * { display: flex; gap: 13px; align-items: flex-start; }
address svg { color: #e3c88d; flex-shrink: 0; margin-top: 3px; }
address span { overflow-wrap: anywhere; min-width: 0; }
a { transition: color .25s ease, background .25s ease; }
address a:hover { color: #e3c88d; }
.panel-button { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 14px 17px; background: #e3c88d; color: #092645; font-size: 14px; font-weight: 700; }
.panel-button:hover { background: #f2dcae; }
.panel-contact { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 19px; font-size: 13px; color: #e3c88d; }
a svg { transition: transform .25s ease; }
.panel-button:hover svg, .panel-contact:hover svg { transform: translate(3px, -3px); }
a:focus-visible { outline: 2px solid #e3c88d; outline-offset: 5px; }
@media (prefers-reduced-motion: reduce) { a, a svg { transition: none; } .panel-button:hover svg, .panel-contact:hover svg { transform: none; } }
</style>
