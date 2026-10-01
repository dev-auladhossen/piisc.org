<script setup>
import { reactive, ref } from 'vue'
import { Send } from 'lucide-vue-next'
import { headerContacts } from '../data/navigation.js'
import { useI18n } from '../composables/useI18n.js'

const { language } = useI18n()
const copy = (en, bn) => language.value === 'bn' ? bn : en
const fields = reactive({ name: '', phone: '', email: '', grade: '', callback: false, callbackTime: 'Any convenient time', message: '', website: '' })
const sending = ref(false)
const status = ref('')
const statusKind = ref('')
const grades = Array.from({ length: 12 }, (_, index) => index + 1)

async function submit() {
  if (sending.value || fields.website) return
  sending.value = true
  status.value = ''
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(headerContacts.email.trim())}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: fields.name.trim(), email: fields.email.trim(), phone: fields.phone.trim(),
        interested_class: fields.grade, callback_requested: fields.callback ? 'Yes' : 'No',
        preferred_callback_time: fields.callback ? fields.callbackTime : 'Not requested',
        message: fields.message.trim(), _subject: 'New PIISC admission inquiry',
        _template: 'table', _honey: fields.website,
      }),
    })
    const result = await response.json()
    if (!response.ok || ![true, 'true'].includes(result.success)) throw new Error('Submission failed')
    statusKind.value = 'success'
    status.value = copy('Your inquiry has been submitted. Our team will contact you after reviewing it.', 'আপনার অনুসন্ধান জমা হয়েছে। পর্যালোচনার পর আমাদের দল আপনার সঙ্গে যোগাযোগ করবে।')
    Object.assign(fields, { name: '', phone: '', email: '', grade: '', callback: false, callbackTime: 'Any convenient time', message: '', website: '' })
  } catch {
    statusKind.value = 'error'
    status.value = copy('We could not send your inquiry. Please try again, call us, or email the office directly.', 'আপনার অনুসন্ধান পাঠানো যায়নি। আবার চেষ্টা করুন অথবা ফোন বা ইমেইলে যোগাযোগ করুন।')
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <form class="contact-form" @submit.prevent="submit">
    <p class="form-eyebrow">{{ copy('ADMISSION INQUIRY', 'ভর্তি অনুসন্ধান') }}</p>
    <h2>{{ copy('Send details for admission support.', 'ভর্তি সহায়তার জন্য বিস্তারিত পাঠান।') }}</h2>
    <div class="form-fields">
      <label for="guardian-name">{{ copy('Guardian Name', 'অভিভাবকের নাম') }}<input id="guardian-name" v-model="fields.name" name="name" autocomplete="name" :placeholder="copy('Your name', 'আপনার নাম')" maxlength="150" required /></label>
      <label for="guardian-phone">{{ copy('Phone Number', 'ফোন নম্বর') }}<input id="guardian-phone" v-model="fields.phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+880" maxlength="30" required /></label>
      <label for="guardian-email">{{ copy('Email Address', 'ইমেইল ঠিকানা') }}<input id="guardian-email" v-model="fields.email" name="email" type="email" autocomplete="email" placeholder="guardian@example.com" maxlength="254" required /></label>
      <label for="interested-class">{{ copy('Interested Class', 'ভর্তির শ্রেণি') }}<select id="interested-class" v-model="fields.grade" name="interested_class" required><option value="" disabled>{{ copy('Select a class', 'শ্রেণি নির্বাচন করুন') }}</option><option v-for="grade in grades" :key="grade" :value="`Grade ${grade}`">{{ copy(`Grade ${grade}`, `${grade} শ্রেণি`) }}</option></select></label>
      <label class="callback-choice"><input v-model="fields.callback" name="callback_requested" type="checkbox" /><span>{{ copy('Request a parent callback from the admission office', 'ভর্তি বিভাগ থেকে অভিভাবকের কাছে ফোনকল চাই') }}</span></label>
      <label for="callback-time">{{ copy('Preferred Callback Time', 'ফোনের সুবিধাজনক সময়') }}<select id="callback-time" v-model="fields.callbackTime" name="preferred_callback_time"><option value="Any convenient time">{{ copy('Any convenient time', 'যেকোনো সুবিধাজনক সময়') }}</option><option value="Morning">{{ copy('Morning', 'সকাল') }}</option><option value="Afternoon">{{ copy('Afternoon', 'বিকাল') }}</option></select></label>
      <label for="inquiry-message">{{ copy('Message', 'বার্তা') }}<textarea id="inquiry-message" v-model="fields.message" name="message" rows="5" :placeholder="copy('Write your inquiry', 'আপনার অনুসন্ধান লিখুন')" maxlength="5000" required></textarea></label>
    </div>
    <div class="honeypot" aria-hidden="true"><label for="contact-website">Leave blank</label><input id="contact-website" v-model="fields.website" name="_honey" tabindex="-1" autocomplete="off" /></div>
    <button type="submit" :disabled="sending" class="submit-button">{{ sending ? copy('Sending…', 'পাঠানো হচ্ছে…') : copy('Send Inquiry', 'অনুসন্ধান পাঠান') }} <Send :size="18" aria-hidden="true" /></button>
    <p v-if="status" role="status" aria-live="polite" class="form-status" :class="statusKind">{{ status }}</p>
  </form>
</template>

<style scoped>
.contact-form{background:#fff;border:1px solid #dce3f0;border-radius:7px;padding:clamp(24px,3vw,40px);box-shadow:0 18px 48px #173a6a0d}.form-eyebrow{font-size:12px;letter-spacing:.16em;font-weight:800;color:#c39722;margin-bottom:11px}.contact-form h2{font-size:clamp(23px,2vw,29px);line-height:1.32;color:#294e9e;margin:0 0 50px}.form-fields{display:grid;gap:16px}.form-fields>label{display:block;color:#1a2334;font-size:14px;font-weight:800}.form-fields input:not([type=checkbox]),.form-fields select,.form-fields textarea{display:block;width:100%;margin-top:12px;padding:16px;border:1px solid #dce1e9;border-radius:6px;background:#fdfaf4;color:#1a2334;font-size:15px;font-weight:450}.form-fields input:not([type=checkbox]),.form-fields select{height:58px}.form-fields textarea{min-height:135px;resize:vertical}.form-fields :is(input,select,textarea):focus-visible{outline:2px solid #294e9e;outline-offset:2px;background:#fff}.form-fields select:disabled{opacity:.65;cursor:not-allowed}.form-fields .callback-choice{display:flex;align-items:flex-start;gap:11px;padding:15px;border:1px solid #dce1e9;border-radius:6px;background:#fdfaf4;min-height:68px}.callback-choice input{width:16px;height:16px;flex:none;accent-color:#294e9e;margin:1px 0 0}.callback-choice span{line-height:1.5}.honeypot{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}.submit-button{display:flex;justify-content:center;align-items:center;gap:9px;width:100%;min-height:56px;margin-top:18px;background:#294e9e;border:0;border-radius:6px;color:white;font-size:15px;font-weight:800}.submit-button:hover:not(:disabled){background:#173f8e}.submit-button:disabled{opacity:.7;cursor:wait}.form-status{padding:13px 16px;border-radius:6px;margin-top:17px;font-size:14px;line-height:1.6}.form-status.success{background:#eaf1ff;color:#173f8e}.form-status.error{background:#fff2e9;color:#8b3d1d}@media(max-width:600px){.contact-form h2{margin-bottom:30px}}
</style>
