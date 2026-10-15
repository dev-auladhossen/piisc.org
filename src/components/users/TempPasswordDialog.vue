<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useDialogLock } from '../../composables/useDialogLock.js'
import { useI18n } from '../../composables/useI18n.js'
const props = defineProps({ open:Boolean, name:String, role:String, identifier:String, temporaryPassword:String, reset:Boolean })
const emit = defineEmits(['done'])
const { tr } = useI18n()
const dialog = ref(null), announcement = ref('')
const { lock, unlock } = useDialogLock()
let timer
watch(() => props.open, async open => {
  await nextTick()
  if (open && dialog.value && !dialog.value.open) { dialog.value.showModal(); lock() }
  else if (!open && dialog.value?.open) { dialog.value.close(); unlock() }
}, { flush:'post' })
function closeAttempt(e) { e.preventDefault() }
function closed() { unlock(); if (props.open) nextTick(() => { if (!dialog.value?.open) dialog.value?.showModal() }) }
async function copyText(text) {
  clearTimeout(timer)
  try { await navigator.clipboard.writeText(text); announcement.value = 'Copied' }
  catch { announcement.value = 'Copy failed. Select the password and copy it manually.' }
  timer = setTimeout(() => { announcement.value = '' }, 2000)
}
onBeforeUnmount(() => { clearTimeout(timer); unlock() })
</script>
<template>
  <dialog ref="dialog" aria-labelledby="temp-title" aria-describedby="temp-warning" class="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-xl overflow-y-auto rounded-xl border-0 bg-white p-6 text-[#173f8e] shadow-2xl" @cancel="closeAttempt" @close="closed" @click="e => e.target === dialog && closeAttempt(e)">
    <template v-if="open"><h2 id="temp-title" class="text-xl font-bold">{{ reset ? tr('Password reset') : name + tr("'s account is ready") }}</h2><p id="temp-warning" class="mt-3 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm leading-6">{{ tr('This password is shown only once. Copy it now and give it to the user privately. They must change it when they first log in.') }}</p><dl class="mt-5 space-y-3 text-sm"><div><dt class="font-semibold">{{ tr(role === 'student' ? 'Student ID' : 'Email') }}</dt><dd class="break-all">{{ identifier }}</dd></div><div><dt class="font-semibold">{{ tr('Temporary password') }}</dt><dd class="mt-1 rounded bg-slate-100 p-3 font-mono text-lg select-all [overflow-wrap:anywhere]"><code>{{ temporaryPassword }}</code></dd></div></dl><p class="mt-2 min-h-5 text-sm" aria-live="polite">{{ tr(announcement) }}</p><div class="mt-5 flex flex-wrap justify-end gap-3"><button type="button" class="rounded-full border px-4 py-2 text-sm" @click="copyText(temporaryPassword)">{{ tr('Copy password') }}</button><button type="button" class="rounded-full border px-4 py-2 text-sm" @click="copyText(identifier + '\n' + temporaryPassword)">{{ tr('Copy login details') }}</button><button type="button" class="rounded-full bg-[#294e9e] px-4 py-2 text-sm font-bold text-white" @click="emit('done')">{{ tr('I have saved it') }}</button></div></template>
  </dialog>
</template>
<style scoped>dialog::backdrop{@apply bg-[rgba(21,27,38,0.60)]}</style>
