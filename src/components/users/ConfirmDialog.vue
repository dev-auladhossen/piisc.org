<script setup>
import { nextTick, ref, watch } from 'vue'
import { useDialogLock } from '../../composables/useDialogLock.js'
import { useI18n } from '../../composables/useI18n.js'
const props = defineProps({ open:Boolean, title:String, message:String, confirmLabel:String, danger:Boolean, loading:Boolean, error:String })
const emit = defineEmits(['confirm','cancel'])
const { tr } = useI18n()
const dialog = ref(null), cancelButton = ref(null)
const { lock, unlock } = useDialogLock()
let returnFocus
watch(() => props.open, async open => {
  await nextTick()
  if (open && dialog.value && !dialog.value.open) {
    returnFocus = document.activeElement
    dialog.value.showModal(); lock(); cancelButton.value?.focus()
  } else if (!open && dialog.value?.open) { dialog.value.close(); unlock(); restoreFocus() }
}, { flush:'post' })
function restoreFocus() { if (returnFocus?.isConnected) returnFocus.focus({ preventScroll:true }); returnFocus = null }
function closed() { unlock(); if (props.open) return; restoreFocus() }
function backdrop(e) { if (e.target !== dialog.value || props.loading) return; const rect=dialog.value.getBoundingClientRect(); if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)emit('cancel') }
</script>
<template>
  <dialog ref="dialog" role="alertdialog" aria-labelledby="confirm-title" aria-describedby="confirm-message" class="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-lg overflow-y-auto rounded-xl border-0 bg-white p-6 text-[#173f8e] shadow-2xl" @cancel.prevent="!loading && emit('cancel')" @close="closed" @click="backdrop">
    <h2 id="confirm-title" class="text-xl font-bold">{{ tr(title) }}</h2><p id="confirm-message" class="mt-3 text-sm leading-6">{{ tr(message) }}</p>
    <p v-if="error" role="alert" class="mt-3 text-sm text-red-700">{{ tr(error) }}</p>
    <div class="mt-6 flex justify-end gap-3"><button ref="cancelButton" type="button" :disabled="loading" class="rounded-full border border-[#c7d4e8] px-4 py-2 text-sm disabled:opacity-60" @click="emit('cancel')">{{ tr('Cancel') }}</button><button type="button" :disabled="loading" class="rounded-full px-4 py-2 text-sm font-bold text-white disabled:opacity-60" :class="danger ? 'bg-red-700' : 'bg-[#294e9e]'" @click="emit('confirm')">{{ tr(loading ? 'Working…' : confirmLabel) }}</button></div>
  </dialog>
</template>
<style scoped>dialog::backdrop{@apply bg-[rgba(21,27,38,0.60)]}dialog :is(button):focus-visible{@apply outline outline-[3px] outline-[#d9b33d] outline-offset-[3px]}</style>
