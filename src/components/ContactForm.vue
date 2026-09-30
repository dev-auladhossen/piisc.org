<script setup>
import { ref } from 'vue'
import { Send } from 'lucide-vue-next'
import { headerContacts } from '../data/navigation.js'
const name = ref(''), email = ref(''), subject = ref(''), message = ref(''), status = ref('')
function submit() {
  if (![name.value, email.value, subject.value, message.value].every(value => value.trim())) {
    status.value = 'Please complete all required fields.'
    return
  }
  const body = encodeURIComponent(`Name: ${name.value.trim()}\nEmail: ${email.value.trim()}\n\n${message.value.trim()}`)
  window.location.href = `mailto:${headerContacts.email}?subject=${encodeURIComponent(subject.value.trim())}&body=${body}`
  status.value = 'Your email app has been requested. Please send the prepared message there to complete your inquiry. If it does not open, email us directly at ' + headerContacts.email + '.'
}
</script>
<template>
  <form class="inquiry-form" @submit.prevent="submit">
    <span class="eyebrow">{{ $tr("We are here to help") }}</span><h2>{{ $tr("Need help? Contact us.") }}</h2>
    <p class="form-intro">{{ $tr("Ask about admissions, learning or a visit to PIISC. We look forward to hearing from you.") }}</p>
    <div class="inquiry-fields">
      <label for="inquiry-name">{{ $tr("Your name ") }}<span>*</span><input id="inquiry-name" v-model="name" name="name" autocomplete="name" :placeholder="$tr(&quot;Your full name&quot;)" maxlength="150" required /></label>
      <label for="inquiry-email">{{ $tr("Your email ") }}<span>*</span><input id="inquiry-email" v-model="email" name="email" type="email" autocomplete="email" :placeholder="$tr(&quot;you@example.com&quot;)" maxlength="254" required /></label>
      <label for="inquiry-subject" class="full-field">{{ $tr("Subject ") }}<span>*</span><input id="inquiry-subject" v-model="subject" name="subject" :placeholder="$tr(&quot;How can we help?&quot;)" maxlength="200" required /></label>
      <label for="inquiry-message" class="full-field">{{ $tr("Message ") }}<span>*</span><textarea id="inquiry-message" v-model="message" name="message" rows="6" :placeholder="$tr(&quot;Tell us a little more about your inquiry…&quot;)" maxlength="5000" required></textarea></label>
    </div>
    <p class="inquiry-note">{{ $tr("By submitting, you agree to be contacted by PIISC about your inquiry. Submit opens your email app with your message ready to send.") }}</p>
    <button class="inquiry-submit" type="submit">{{ $tr("Submit inquiry ") }}<Send :size="17" aria-hidden="true" /></button>
    <p v-if="status" role="status" class="inquiry-status">{{ $tr(status) }}</p>
  </form>
</template>
<style scoped>
.inquiry-form{padding:clamp(24px,4vw,50px);background:white;border:1px solid #dde6df;box-shadow:0 16px 45px #18313e08;border-top:4px solid #0e5b4a}
h2{font-size:clamp(28px,3vw,38px);color:#0a2948;margin:12px 0 14px}.form-intro{color:#53616a;margin-bottom:30px}
.inquiry-fields{display:grid;grid-template-columns:1fr 1fr;gap:24px}.full-field{grid-column:1/-1}label{font-size:13px;font-weight:700;color:#18313e}label>span{color:#956b24}input,textarea{display:block;width:100%;margin-top:9px;padding:14px 16px;border:1px solid #ccd8d1;border-radius:2px;background:#fbfcfa;color:#18313e;font-weight:400;transition:border-color .25s,box-shadow .25s,background .25s}textarea{resize:vertical;min-height:155px}input:hover,textarea:hover{border-color:#78998a}input:focus,textarea:focus{outline:none;border-color:#0e5b4a;box-shadow:0 0 0 3px #0e5b4a15;background:#fff}.inquiry-note{font-size:12px;color:#64706d;margin:23px 0}.inquiry-submit{display:inline-flex;align-items:center;justify-content:center;gap:28px;padding:16px 25px;background:#0e5b4a;border:1px solid #0e5b4a;color:white;font-weight:700;transition:transform .3s,background .3s,box-shadow .3s}.inquiry-submit:hover{background:#0a4639;transform:translateY(-3px);box-shadow:0 9px 20px #0e5b4a25}.inquiry-status{margin-top:20px;padding:16px;background:#eef5ef;color:#0e5b4a;font-size:14px}
@media(max-width:540px){.inquiry-fields{grid-template-columns:1fr}.inquiry-submit{width:100%}}
</style>
