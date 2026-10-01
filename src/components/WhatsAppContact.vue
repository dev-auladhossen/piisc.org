<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowUp, X } from 'lucide-vue-next'
import WhatsAppIcon from './WhatsAppIcon.vue'
import { headerContacts } from '../data/navigation.js'
import { useI18n } from '../composables/useI18n.js'

const { language } = useI18n()
const open = ref(false)
const contactVisible = ref(false)
const showBackToTop = ref(false)
let contactTimer
const widget = ref(null)
const trigger = ref(null)
const contact = ref(null)
const phone = headerContacts.phone.trim()
const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}`
const copy = computed(() => language.value === 'bn' ? {
  help: 'সহায়তা প্রয়োজন?', chat: 'আমাদের সঙ্গে কথা বলুন', title: 'কথা শুরু করুন',
  intro: 'হ্যালো! নিচের নম্বরে ক্লিক করে কথা বলুন',
  note: 'আমাদের দল সাধারণত কয়েক মিনিটের মধ্যে উত্তর দেয়।',
  admissions: 'ভর্তি বিভাগ', school: 'PIISC ভর্তি বিভাগ', close: 'যোগাযোগ প্যানেল বন্ধ করুন',
  label: 'হোয়াটসঅ্যাপে ভর্তি বিভাগের সঙ্গে কথা বলুন',
} : {
  help: 'Need help?', chat: 'Chat with us', title: 'Start a Conversation',
  intro: 'Hi! Click on a below Number to chat on',
  note: 'The team typically replies in a few minutes.',
  admissions: 'Admissions', school: 'PIISC ADMISSIONS', close: 'Close contact panel',
  label: 'Chat with admissions on WhatsApp',
})
async function toggle() {
  if (open.value) { close(true); return }
  open.value = true
  contactTimer = window.setTimeout(async () => {
    contactVisible.value = true
    await nextTick()
    if (open.value && widget.value?.contains(document.activeElement)) {
      contact.value?.focus({ preventScroll: true })
    }
  }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 250)
}
function close(restoreFocus = false) {
  window.clearTimeout(contactTimer)
  contactVisible.value = false
  open.value = false
  if (restoreFocus) trigger.value?.focus({ preventScroll: true })
}
function onOutside(event) { if (open.value && !widget.value?.contains(event.target)) close() }
function onEscape(event) { if (open.value && event.key === 'Escape') { event.stopPropagation(); close(true) } }
function onScroll() { showBackToTop.value = window.scrollY > 400 }
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}
onMounted(() => {
  document.addEventListener('pointerdown', onOutside)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => {
  window.clearTimeout(contactTimer)
  document.removeEventListener('pointerdown', onOutside)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <Teleport to="body">
  <div ref="widget" class="whatsapp-widget" @keydown.esc="onEscape">
    <Transition name="whatsapp-panel">
      <section v-if="open" id="whatsapp-contact-panel" class="whatsapp-panel" role="region" aria-labelledby="whatsapp-title">
        <header class="whatsapp-heading">
          <WhatsAppIcon class="heading-icon" />
          <div><h2 id="whatsapp-title">{{ copy.title }}</h2><p>{{ copy.intro }}<br /><strong>WhatsApp</strong></p></div>
        </header>
        <div class="whatsapp-body">
          <p>{{ copy.note }}</p>
          <div class="admissions-slot">
          
          <a :class="{ 'is-visible': contactVisible }" :tabindex="contactVisible ? 0 : -1" :aria-hidden="!contactVisible" ref="contact" :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="whatsapp-admissions" :aria-label="`${copy.label}: ${phone}`">
            <span class="admissions-icon"><WhatsAppIcon /></span>
            <span class="admissions-copy"><strong>{{ copy.admissions }}</strong><small>{{ copy.school }}</small></span>
            <WhatsAppIcon class="contact-arrow" />
          </a>
          </div>
        </div>
      </section>
    </Transition>
    <div class="whatsapp-controls">
      <div class="help-label-window">
        <Transition name="whatsapp-hint"><button v-if="!open && !showBackToTop" type="button" class="whatsapp-hint" aria-controls="whatsapp-contact-panel" :aria-expanded="open" @click="toggle">{{ copy.help }} <strong>{{ copy.chat }}</strong></button></Transition>
      </div>
      <Transition name="back-to-top">
        <button v-if="showBackToTop" type="button" class="back-to-top-trigger" :aria-label="language === 'bn' ? 'উপরে যান' : 'Back to top'" @click="scrollToTop">
          <ArrowUp :size="25" :stroke-width="2.2" aria-hidden="true" />
        </button>
      </Transition>
      <button ref="trigger" type="button" class="whatsapp-trigger" :class="{ active: open }" :aria-label="open ? copy.close : copy.label" :aria-expanded="open" aria-controls="whatsapp-contact-panel" @click="toggle">
        <Transition name="whatsapp-icon" mode="out-in">
          <X v-if="open" :size="30" aria-hidden="true" />
          <WhatsAppIcon v-else />
        </Transition>
      </button>
    </div>
  </div>
  </Teleport>
</template>

<style scoped>
.whatsapp-widget { position: fixed; right: max(24px, env(safe-area-inset-right)); bottom: max(24px, env(safe-area-inset-bottom)); z-index: 100; font-family: Inter, Arial, sans-serif; width: min(350px, calc(100vw - 32px)); pointer-events: none; }
.admissions-slot { min-height: 76px; }
.admissions-slot > a { visibility: hidden; opacity: 0; transform: translateY(10px); transition: opacity .3s ease, transform .3s ease, background .25s ease, box-shadow .25s ease; }
.admissions-slot > a.is-visible { visibility: visible; opacity: 1; transform: translateY(0); }
.admissions-reveal-enter-active { transition: opacity .3s ease, transform .4s cubic-bezier(.22,1,.36,1); }
.admissions-reveal-enter-from { opacity: 0; transform: translateY(14px); }
.whatsapp-panel { position: absolute; bottom: calc(100% + 14px); right: 0; width: 100%; pointer-events: auto; background: #fff; border: 0; border-radius: 10px; box-shadow: 0 16px 60px #09264526; overflow: auto; max-height: calc(100dvh - 120px); transform-origin: bottom right; }
.whatsapp-heading { display: flex; align-items: flex-start; gap: 14px; padding: 18px; background: #2ab640; color: #fff; position: relative; }
.heading-icon { width: 40px; height: 40px; }
.admissions-icon > svg { width: 36px; height: 36px; }
.admissions-icon { border: 4px solid #e9ece9; }
.contact-arrow { width: 24px; height: 24px; }
.whatsapp-heading > svg { flex-shrink: 0; margin-top: 3px; }
.whatsapp-heading h2 { font-family: inherit; font-size: 19px; font-weight: 400; line-height: 1.4; margin: 0 0 7px; }
.whatsapp-heading p { font-size: 14px; line-height: 1.65; color: #d5f0d8; margin: 0; }
.panel-close { position: absolute; top: 9px; right: 9px; display: grid; place-items: center; width: 28px; height: 28px; border: 0; border-radius: 50%; background: #ffffff15; color: #fff; cursor: pointer; }
.panel-close:hover { background: #ffffff30; }
.whatsapp-body { padding: 18px; }
.whatsapp-body > p { color: #9ca5b5; font-size: 13px; line-height: 1.5; margin: 0 0 18px; }
.whatsapp-admissions { display: flex; align-items: center; gap: 12px; min-height: 76px; padding: 10px; border-left: 2px solid #2ab640; border-radius: 5px; background: #f5f6f8; color: #4b515b; transition: background .25s ease, box-shadow .25s ease, transform .25s ease; }
.whatsapp-admissions:hover { background: #e8f5ed; box-shadow: 0 6px 20px #128c5512; transform: translateY(-2px); }
.admissions-icon { display: grid; place-items: center; width: 48px; height: 48px; flex-shrink: 0; border-radius: 50%; color: #fff; background: #51ca65; }
.admissions-copy { display: grid; gap: 4px; min-width: 0; }
.admissions-copy strong { font-size: 16px; font-weight: 400; }.admissions-copy small { font-size: 13px; color: #999da3; }.admissions-copy > span { font-size: 13px; font-weight: 600; }
.contact-arrow { flex-shrink: 0; margin-left: auto; color: #2ab640; transition: transform .25s; }.whatsapp-admissions:hover .contact-arrow { transform: translate(2px,-2px); }
.whatsapp-controls { height: 54px; display: flex; justify-content: flex-end; align-items: center; gap: 12px; }
.back-to-top-trigger { pointer-events: auto; flex-shrink: 0; width: 54px; height: 54px; display: grid; place-items: center; border: 2px solid #dcb532; border-radius: 50%; background: #294e9e; color: #fff; box-shadow: 0 7px 22px #09264526; cursor: pointer; transition: transform .3s ease, background .3s ease, box-shadow .3s ease; }
.back-to-top-trigger:hover { transform: translateY(-4px); background: #1d3f86; box-shadow: 0 10px 28px #09264535; }
.back-to-top-trigger:focus-visible { outline: 3px solid #dcb532; outline-offset: 3px; }
.back-to-top-enter-active, .back-to-top-leave-active { transition: opacity .3s ease, transform .3s ease; }
.back-to-top-enter-from, .back-to-top-leave-to { opacity: 0; transform: translateY(14px) scale(.85); }
.help-label-window { overflow: hidden; padding: 7px 0; }
.whatsapp-hint { pointer-events: auto; padding: 13px 16px; border: 1px solid #e9edf1; border-radius: 7px; background: #f5f7fa; color: #33465c; font-size: 12px; cursor: pointer; white-space: nowrap; }
.whatsapp-hint strong { margin-left: 3px; }.whatsapp-hint:hover { background: #eaf1ed; }
.whatsapp-trigger { pointer-events: auto; flex-shrink: 0; width: 54px; height: 54px; display: grid; place-items: center; border: 0; border-radius: 50%; color: #fff; background: #2ab640; box-shadow: 0 7px 22px #09264526; cursor: pointer; transition: transform .3s ease, background .3s ease, box-shadow .3s ease; }
.whatsapp-trigger > svg { grid-area: 1 / 1; width: 28px; height: 28px; }
.whatsapp-trigger:hover { background: #169c40; box-shadow: 0 10px 28px #128c5540; }.whatsapp-trigger.active { background: #2ab640; }
button:focus-visible, a:focus-visible { outline: 3px solid #bb9952; outline-offset: 3px; }
.whatsapp-panel-enter-active { transition: opacity .35s ease, transform .45s cubic-bezier(.22,1,.36,1); }.whatsapp-panel-leave-active { transition: opacity .22s ease, transform .28s ease; }
.whatsapp-panel-enter-from, .whatsapp-panel-leave-to { opacity: 0; transform: translateY(18px); }
.whatsapp-hint-enter-active, .whatsapp-hint-leave-active { transition: opacity .25s ease, transform .3s ease; }.whatsapp-hint-enter-from, .whatsapp-hint-leave-to { opacity: 0; transform: translateY(110%); }
.whatsapp-icon-enter-active, .whatsapp-icon-leave-active { transition: opacity .14s ease, transform .18s ease; }.whatsapp-icon-enter-from, .whatsapp-icon-leave-to { opacity: 0; transform: rotate(-35deg) scale(.75); }
@media(max-width:540px) { .whatsapp-heading { padding: 20px; gap: 14px; }.whatsapp-heading h2 { font-size: 20px; }.whatsapp-body { padding: 20px; }.admissions-copy small { font-size: 11px; } .whatsapp-widget { right: max(16px,env(safe-area-inset-right)); bottom: max(16px,env(safe-area-inset-bottom)); }.whatsapp-trigger { width: 50px; height: 50px; }.whatsapp-hint { font-size: 11px; padding: 11px 12px; } }
@media(prefers-reduced-motion:reduce) { *, *::before, *::after { transition: none !important; }.whatsapp-trigger:hover, .whatsapp-admissions:hover, .whatsapp-admissions:hover .contact-arrow { transform: none; } }
</style>
<style scoped>
@media (max-width: 540px) {
  .back-to-top-trigger { width: 50px; height: 50px; }
}
@media (prefers-reduced-motion: reduce) {
  .back-to-top-trigger, .back-to-top-enter-active, .back-to-top-leave-active { transition: none; }
  .back-to-top-trigger:hover { transform: none; }
}
</style>
