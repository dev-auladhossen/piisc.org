<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { Check, KeyRound, X } from 'lucide-vue-next'
import { useDialogLock } from '../../composables/useDialogLock.js'
import { useI18n } from '../../composables/useI18n.js'

const props = defineProps({ open: Boolean, name: String, role: String, identifier: String, temporaryPassword: String, reset: Boolean })
const emit = defineEmits(['done'])
const { tr } = useI18n()
const dialog = ref(null)
const savedButton = ref(null)
const announcement = ref('')
const { lock, unlock } = useDialogLock()
let timer
let unmounting = false

watch(() => props.open, async (open) => {
  if (open && dialog.value && !dialog.value.open) {
    dialog.value.showModal()
    lock()
    await nextTick()
    savedButton.value?.focus()
  } else if (!open && dialog.value?.open) {
    dialog.value.close()
    unlock()
  }
}, { flush: 'post' })

function done() {
  emit('done')
}

function onCancel(event) {
  event.preventDefault()
  done()
}

function closed() {
  unlock()
  if (!unmounting && props.open) done()
}

async function copyText(text) {
  clearTimeout(timer)
  try {
    await navigator.clipboard.writeText(text)
    announcement.value = 'Copied'
  } catch {
    announcement.value = 'Copy failed. Select the password and copy it manually.'
  }
  timer = setTimeout(() => { announcement.value = '' }, 2000)
}

onBeforeUnmount(() => {
  unmounting = true
  clearTimeout(timer)
  if (dialog.value?.open) dialog.value.close()
  unlock()
})
</script>

<template>
  <dialog
    ref="dialog"
    aria-labelledby="temp-title"
    aria-describedby="temp-subtitle temp-warning"
    class="temp-password-dialog fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-24px)] max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 text-slate-800 shadow-[0_24px_80px_rgba(15,23,42,0.24)] sm:w-[calc(100%-40px)]"
    @cancel="onCancel"
    @close="closed"
  >
    <div class="flex max-h-[90dvh] flex-col">
      <header class="flex shrink-0 items-center gap-3 border-b border-slate-200 px-4 py-4 sm:px-6">
        <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-800" aria-hidden="true">
          <KeyRound :size="20" />
        </span>
        <div class="min-w-0 flex-1">
          <h2 id="temp-title" class="text-lg font-bold leading-6 text-slate-900">
            {{ props.reset ? tr('Password reset') : props.name + tr("'s account is ready") }}
          </h2>
          <p id="temp-subtitle" class="mt-1 text-sm text-slate-500">{{ tr('Temporary password') }}</p>
        </div>
        <button
          type="button"
          class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#294e9e] focus-visible:ring-offset-2"
          :aria-label="tr('Close temporary password dialog')"
          @click="done"
        >
          <X :size="19" aria-hidden="true" />
        </button>
      </header>

      <div class="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6">
        <p id="temp-warning" class="flex items-start gap-2.5 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-3.5 text-sm leading-6 text-amber-950">
          <KeyRound class="mt-0.5 shrink-0 text-amber-800" :size="17" aria-hidden="true" />
          <span>{{ tr('This password is shown only once. Copy it now and give it to the user privately. They must change it when they first log in.') }}</span>
        </p>

        <dl class="space-y-4">
          <div>
            <dt class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ tr(props.role === 'student' ? 'Student ID' : 'Email') }}</dt>
            <dd class="mt-1 break-all text-sm font-medium text-slate-800">{{ props.identifier }}</dd>
          </div>
          <div>
            <dt class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ tr('Temporary password') }}</dt>
            <dd class="mt-1 rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-lg text-slate-900 select-all [overflow-wrap:anywhere]"><code>{{ props.temporaryPassword }}</code></dd>
          </div>
        </dl>
        <p class="min-h-5 text-sm font-medium text-emerald-700" aria-live="polite">{{ tr(announcement) }}</p>
      </div>

      <footer class="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-4 py-4 sm:flex-row sm:flex-wrap sm:justify-end sm:px-6">
        <button
          type="button"
          class="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#294e9e] focus-visible:ring-offset-2 sm:w-auto"
          @click="copyText(props.temporaryPassword)"
        >{{ tr('Copy password') }}</button>
        <button
          type="button"
          class="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#294e9e] focus-visible:ring-offset-2 sm:w-auto"
          @click="copyText(props.identifier + '\n' + props.temporaryPassword)"
        >{{ tr('Copy login details') }}</button>
        <button
          ref="savedButton"
          type="button"
          class="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#294e9e] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#173f8e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#294e9e] focus-visible:ring-offset-2 sm:w-auto"
          @click="done"
        >
          <Check :size="16" aria-hidden="true" />{{ tr('I have saved it') }}
        </button>
      </footer>
    </div>
  </dialog>
</template>

<style scoped>
.temp-password-dialog:not([open]) { display: none; }
.temp-password-dialog::backdrop { @apply bg-slate-950/40 backdrop-blur-[3px]; }
@media (prefers-reduced-motion: no-preference) {
  .temp-password-dialog[open] { animation: temp-password-enter 150ms ease-out both; }
}
@keyframes temp-password-enter {
  from { opacity: 0; transform: translateY(6px) scale(0.99); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
