<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { KeyRound, Loader2, TriangleAlert, X } from 'lucide-vue-next'
import { useDialogLock } from '../../composables/useDialogLock.js'
import { useI18n } from '../../composables/useI18n.js'

const props = defineProps({ open: Boolean, title: String, message: String, confirmLabel: String, danger: Boolean, loading: Boolean, error: String })
const emit = defineEmits(['confirm', 'cancel'])
const { tr } = useI18n()
const dialog = ref(null)
const cancelButton = ref(null)
const { lock, unlock } = useDialogLock()
let returnFocus = null
let unmounting = false

watch(() => props.open, (open) => {
  if (open && dialog.value && !dialog.value.open) {
    returnFocus = document.activeElement
    dialog.value.showModal()
    lock()
    cancelButton.value?.focus()
  } else if (!open && dialog.value?.open) {
    dialog.value.close()
    unlock()
    restoreFocus()
  }
}, { flush: 'post' })

function restoreFocus() {
  if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true })
  returnFocus = null
}

function cancel() {
  if (!props.loading) emit('cancel')
}

function onCancel(event) {
  event.preventDefault()
  cancel()
}

function closed() {
  unlock()
  if (unmounting) return
  if (props.open && !props.loading) emit('cancel')
  restoreFocus()
}

function backdrop(event) {
  if (event.target !== dialog.value || props.loading) return
  const rect = dialog.value.getBoundingClientRect()
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) emit('cancel')
}

onBeforeUnmount(() => {
  unmounting = true
  if (dialog.value?.open) dialog.value.close()
  unlock()
})
</script>

<template>
  <dialog
    ref="dialog"
    role="alertdialog"
    aria-labelledby="confirm-title"
    aria-describedby="confirm-subtitle confirm-message"
    class="confirm-dialog fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-24px)] max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 text-slate-800 shadow-[0_24px_80px_rgba(15,23,42,0.24)] sm:w-[calc(100%-40px)]"
    @cancel="onCancel"
    @close="closed"
    @click="backdrop"
  >
    <div class="flex max-h-[90dvh] flex-col">
      <header class="flex shrink-0 items-center gap-3 border-b border-slate-200 px-4 py-4 sm:px-6">
        <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" :class="props.danger ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-800'" aria-hidden="true">
          <component :is="props.danger ? TriangleAlert : KeyRound" :size="20" />
        </span>
        <div class="min-w-0 flex-1">
          <h2 id="confirm-title" class="text-lg font-bold leading-6 text-slate-900">{{ tr(props.title) }}</h2>
          <p id="confirm-subtitle" class="mt-1 text-sm text-slate-500">{{ tr('Please confirm the action described below.') }}</p>
        </div>
        <button
          type="button"
          :disabled="props.loading"
          class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#294e9e] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          :aria-label="tr('Close confirmation dialog')"
          @click="cancel"
        >
          <X :size="19" aria-hidden="true" />
        </button>
      </header>

      <div class="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6">
        <p id="confirm-message" class="text-sm leading-6 text-slate-700">{{ tr(props.message) }}</p>
        <p v-if="props.error" role="alert" class="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-800">{{ tr(props.error) }}</p>
      </div>

      <footer class="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
        <button
          ref="cancelButton"
          type="button"
          :disabled="props.loading"
          class="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#294e9e] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          @click="cancel"
        >{{ tr('Cancel') }}</button>
        <button
          type="button"
          :disabled="props.loading"
          :aria-busy="props.loading"
          class="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          :class="props.danger ? 'bg-red-700 hover:bg-red-800 focus-visible:ring-red-700' : 'bg-[#294e9e] hover:bg-[#173f8e] focus-visible:ring-[#294e9e]'"
          @click="emit('confirm')"
        >
          <Loader2 v-if="props.loading" :size="16" class="animate-spin" aria-hidden="true" />
          {{ tr(props.loading ? 'Working…' : props.confirmLabel) }}
        </button>
      </footer>
    </div>
  </dialog>
</template>

<style scoped>
.confirm-dialog:not([open]) { display: none; }
.confirm-dialog::backdrop { @apply bg-slate-950/40 backdrop-blur-[3px]; }
@media (prefers-reduced-motion: no-preference) {
  .confirm-dialog[open] { animation: confirm-enter 150ms ease-out both; }
}
@keyframes confirm-enter {
  from { opacity: 0; transform: translateY(6px) scale(0.99); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
