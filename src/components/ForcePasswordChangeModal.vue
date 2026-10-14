<script setup>
import { computed, nextTick, onMounted, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { Eye, EyeOff, LockKeyhole } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth.js'
import { useLoginModal } from '../composables/useLoginModal.js'
import { useI18n } from '../composables/useI18n.js'

const auth = useAuthStore()
const loginModal = useLoginModal()
const { tr } = useI18n()
const dialog = ref(null)
const pending = ref(false)
const errorMessage = ref('')
const success = ref(false)
const passwords = reactive({ current: '', new: '', confirm: '' })
const visible = reactive({ current: false, new: false, confirm: false })
const errors = reactive({ current: '', new: '', confirm: '' })
const inputs = {}
const fields = [
  { key: 'current', label: 'Current (temporary) password', autocomplete: 'current-password' },
  { key: 'new', label: 'New password', autocomplete: 'new-password' },
  { key: 'confirm', label: 'Confirm new password', autocomplete: 'new-password' },
]
const shouldOpen = computed(() => auth.isAuthenticated && auth.mustChangePassword && !loginModal.isOpen.value)
let loginDialog
let observer
let previousOverflow
let scrollLocked = false
let successTimer
let disposed = false

function clearForm() {
  for (const field of fields) {
    passwords[field.key] = ''
    visible[field.key] = false
    errors[field.key] = ''
  }
  errorMessage.value = ''
}

function restoreScroll() {
  if (!scrollLocked) return
  document.body.style.overflow = previousOverflow
  scrollLocked = false
}

async function syncDialog() {
  await nextTick()
  if (disposed || !dialog.value) return
  // Login keeps its native dialog open briefly while its exit animation runs.
  const allowed = shouldOpen.value && !loginDialog?.open
  if (allowed) {
    if (dialog.value.open) return
    clearForm()
    previousOverflow = document.body.style.overflow
    dialog.value.showModal()
    scrollLocked = true
    document.body.style.overflow = 'hidden'
    inputs.current?.focus()
  } else {
    if (dialog.value.open) dialog.value.close()
    restoreScroll()
    clearForm()
  }
}

function handleClose() {
  // Ignore an old queued close event if the dialog has already reopened.
  if (disposed || dialog.value?.open) return
  restoreScroll()
  clearForm()
  if (shouldOpen.value) syncDialog()
}

function validate() {
  errors.current = passwords.current ? '' : 'Current password is required.'
  errors.new = !passwords.new ? 'New password is required.'
    : passwords.new.length < 8 || passwords.new.length > 128 ? 'Use 8 to 128 characters.'
    : passwords.new === passwords.current ? 'Choose a password different from your current password.' : ''
  errors.confirm = !passwords.confirm ? 'Please confirm your new password.'
    : passwords.confirm !== passwords.new ? 'Passwords do not match.' : ''
  const invalid = fields.find(field => errors[field.key])
  if (invalid) inputs[invalid.key]?.focus()
  return !invalid
}

async function submit() {
  if (pending.value || !shouldOpen.value) return
  errorMessage.value = ''
  // Passwords are compared exactly, including any spaces; never trim them.
  if (!validate()) return
  pending.value = true
  try {
    await auth.changePassword(passwords.current, passwords.new)
    if (disposed || !auth.isAuthenticated) return
    clearForm()
    await syncDialog()
    const target = document.querySelector('main#main') || document.body
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
    success.value = true
    clearTimeout(successTimer)
    successTimer = setTimeout(() => { success.value = false }, 4000)
  } catch (error) {
    if (disposed || error.kind === 'unauthorized' || !shouldOpen.value) return
    const messages = {
      rejected: "We couldn't change your password. Check that your current password is correct and that the new password is at least 8 characters and different from the current one.",
      rate_limited: 'Too many attempts. Please wait a few minutes and try again.',
      network: 'Cannot reach the server. Check your connection and try again.',
    }
    errorMessage.value = messages[error.kind] || 'Something went wrong. Please try again.'
    passwords.current = ''
    for (const field of fields) visible[field.key] = false
    await nextTick()
    inputs.current?.focus()
  } finally {
    pending.value = false
  }
}

function logout() {
  clearForm()
  auth.logout()
}

watch(shouldOpen, syncDialog, { flush: 'post' })
onMounted(() => {
  loginDialog = document.querySelector('.login-modal')
  // Observe the actual closing animation as well as the shared login state.
  if (loginDialog) {
    observer = new MutationObserver(syncDialog)
    observer.observe(loginDialog, { attributes: true, attributeFilter: ['open'] })
  }
  syncDialog()
})
onBeforeUnmount(() => {
  disposed = true
  observer?.disconnect()
  clearTimeout(successTimer)
  clearForm()
  if (dialog.value?.open) dialog.value.close()
  restoreScroll()
})
</script>

<template>
  <dialog ref="dialog" class="password-modal" aria-labelledby="password-change-title"
    aria-describedby="password-change-description" @cancel.prevent @keydown.esc.stop @close="handleClose">
    <header class="border-b border-[#edf0f5] bg-[#fafbfd] px-5 py-5 text-center sm:px-7">
      <span class="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#edf3ff] text-[#294e9e]">
        <LockKeyhole :size="24" aria-hidden="true" />
      </span>
      <h2 id="password-change-title" class="text-xl font-bold text-[#173f8e]">{{ tr('Change your password') }}</h2>
      <p id="password-change-description" class="mt-2 text-sm leading-6 text-[#60718e]">
        {{ tr('You are using a temporary password. Please choose a new password to continue.') }}
      </p>
    </header>
    <form class="space-y-4 p-5 sm:p-7" novalidate @submit.prevent="submit">
      <div v-for="field in fields" :key="field.key">
        <label :for="`force-password-${field.key}`" class="mb-2 block text-sm font-medium text-[#173f8e]">{{ tr(field.label) }}</label>
        <div class="relative">
          <input :id="`force-password-${field.key}`" :ref="element => inputs[field.key] = element"
            v-model="passwords[field.key]" :type="visible[field.key] ? 'text' : 'password'"
            :autocomplete="field.autocomplete" maxlength="128" required :disabled="pending"
            :aria-invalid="Boolean(errors[field.key])"
            :aria-describedby="[field.key === 'new' ? 'force-password-hint' : '', errors[field.key] ? `force-error-${field.key}` : ''].filter(Boolean).join(' ') || undefined"
            class="password-input" />
          <button type="button" class="password-toggle" :disabled="pending"
            :aria-label="tr(visible[field.key] ? 'Hide password' : 'Show password')"
            :aria-controls="`force-password-${field.key}`" :aria-pressed="visible[field.key]"
            @click="visible[field.key] = !visible[field.key]">
            <component :is="visible[field.key] ? EyeOff : Eye" :size="20" aria-hidden="true" />
          </button>
        </div>
        <p v-if="field.key === 'new'" id="force-password-hint" class="mt-1 text-xs text-[#60718e]">{{ tr('At least 8 characters.') }}</p>
        <p v-if="errors[field.key]" :id="`force-error-${field.key}`" role="alert" class="mt-1 text-sm text-red-700">{{ tr(errors[field.key]) }}</p>
      </div>
      <p v-if="errorMessage" role="alert" class="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{{ tr(errorMessage) }}</p>
      <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button type="button" class="rounded-full border border-[#c7d4e8] px-4 py-2 text-sm font-semibold text-[#294e9e] transition-colors hover:bg-[#edf3ff]" @click="logout">{{ tr('Log out') }}</button>
        <button type="submit" :disabled="pending" :aria-busy="pending" class="password-submit">
          {{ tr(pending ? 'Changing password…' : 'Change password') }}
        </button>
      </div>
    </form>
  </dialog>
  <!-- Outside the dialog so the confirmation survives the dialog closing. -->
  <div role="status" aria-live="polite" aria-atomic="true" class="pointer-events-none fixed inset-x-4 bottom-4 z-[120] mx-auto max-w-md">
    <p v-if="success" class="rounded-xl border border-[#d9b33d] bg-white p-4 text-center font-semibold text-[#173f8e] shadow-lg">{{ tr('Password changed.') }}</p>
  </div>
</template>

<style scoped>
.password-modal {
  @apply fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-md overflow-y-auto overscroll-contain rounded-[16px] border-0 bg-white p-0 text-[#173f8e] shadow-[0_20px_60px_rgba(19,42,80,0.22)];
}
.password-modal::backdrop {
  @apply bg-[rgba(21,27,38,0.60)] backdrop-blur-[4px];
}
.password-input {
  @apply min-h-[52px] w-full rounded-[14px] border border-[#c7d4e8] bg-white py-3 pl-4 pr-12 text-[16px] text-[#173f8e] transition-colors focus:border-[#8ea9d8] disabled:opacity-60;
}
.password-toggle {
  @apply absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-[#60718e] transition-colors hover:bg-[#edf3ff] hover:text-[#294e9e];
}
.password-submit {
  @apply rounded-full bg-[#294e9e] px-5 py-2 text-sm font-bold text-white shadow-md transition-[background,transform,box-shadow] duration-200 hover:bg-[#173f8e] hover:shadow-lg motion-safe:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60;
}
.password-modal :is(button, input):focus-visible {
  @apply outline outline-[3px] outline-[#d9b33d] outline-offset-[3px];
}
@media (prefers-reduced-motion: reduce) {
  .password-modal * { @apply transition-none; }
}
</style>
