<script setup>
import { computed, nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { Backpack, BookOpen, IdCard, Loader2, LockKeyhole, Mail, Shield, TriangleAlert, User, UserPen, UserPlus, Users, X } from 'lucide-vue-next'
import { createUser, updateUser, userErrorKind } from '../../services/userApi.js'
import { useDialogLock } from '../../composables/useDialogLock.js'
import { useI18n } from '../../composables/useI18n.js'

const props = defineProps({ open: Boolean, mode: { type: String, default: 'create' }, user: { type: Object, default: null }, currentUserId: String })
const emit = defineEmits(['saved', 'cancel'])
const { tr } = useI18n()
const dialog = ref(null)
const nameInput = ref(null)
const idInput = ref(null)
const errorBanner = ref(null)
const submitting = ref(false)
const error = ref('')
const invalid = reactive({ name: '', identifier: '' })
const form = reactive({ name: '', role: 'teacher', email: '', studentId: '' })
const roleOptions = [
  { value: 'teacher', label: 'Teacher', icon: BookOpen, selected: 'border-[#8ea9d8] bg-[#edf3ff] text-[#173f8e] ring-[#294e9e]/15', iconColor: 'text-[#294e9e]' },
  { value: 'student', label: 'Student', icon: Backpack, selected: 'border-[#8ea9d8] bg-[#edf3ff] text-[#173f8e] ring-[#294e9e]/15', iconColor: 'text-[#294e9e]' },
  { value: 'parent', label: 'Parent', icon: Users, selected: 'border-[#8ea9d8] bg-[#edf3ff] text-[#173f8e] ring-[#294e9e]/15', iconColor: 'text-[#294e9e]' },
  { value: 'admin', label: 'Admin', icon: Shield, selected: 'border-[#8ea9d8] bg-[#edf3ff] text-[#173f8e] ring-[#294e9e]/15', iconColor: 'text-[#294e9e]' },
]
const roleClasses = {
  admin: 'bg-indigo-50 text-indigo-800 ring-indigo-600/20',
  teacher: 'bg-blue-50 text-blue-800 ring-blue-600/20',
  student: 'bg-emerald-50 text-emerald-800 ring-emerald-600/20',
  parent: 'bg-violet-50 text-violet-800 ring-violet-600/20',
}
const identifierValue = computed({
  get: () => (isStudent() ? form.studentId : form.email),
  set: (value) => {
    if (isStudent()) form.studentId = value
    else form.email = value
  },
})
const { lock, unlock } = useDialogLock()
let unmounting = false

function isStudent() {
  return (props.mode === 'edit' ? props.user?.role : form.role) === 'student'
}

function clear() {
  form.name = props.user?.name || ''
  form.role = props.user?.role || 'teacher'
  form.email = props.user?.email || ''
  form.studentId = props.user?.studentId || ''
  error.value = ''
  invalid.name = ''
  invalid.identifier = ''
}

watch(() => props.open, async (open) => {
  if (open && dialog.value && !dialog.value.open) {
    clear()
    dialog.value.showModal()
    lock()
    await nextTick()
    nameInput.value?.focus()
  } else if (!open && dialog.value?.open) {
    dialog.value.close()
    unlock()
  }
}, { flush: 'post' })

function cancel() {
  if (!submitting.value) emit('cancel')
}

function onCancel(event) {
  event.preventDefault()
  cancel()
}

function closed() {
  unlock()
  if (!unmounting && props.open && !submitting.value) emit('cancel')
}

function changeRole() {
  form.email = ''
  form.studentId = ''
  invalid.identifier = ''
}

async function submit() {
  if (submitting.value) return
  error.value = ''
  invalid.name = ''
  invalid.identifier = ''

  const name = form.name.trim()
  if (name.length < 2 || name.length > 80) invalid.name = 'Name must be 2 to 80 characters.'
  const identifier = isStudent() ? form.studentId : form.email
  const identifierValid = isStudent()
    ? /^PIISC-\d{4}-\d{3}$/i.test(identifier)
    : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)
  if (!identifierValid) {
    invalid.identifier = isStudent() ? 'Enter a Student ID in the required format.' : 'Enter a valid email address.'
  }

  if (invalid.name || invalid.identifier) {
    await nextTick()
    ;(invalid.name ? nameInput : idInput).value?.focus()
    return
  }

  submitting.value = true
  try {
    const response = props.mode === 'create'
      ? await createUser({ name, role: form.role, ...(isStudent() ? { studentId: identifier } : { email: identifier }) })
      : await updateUser(props.user._id, { name, ...(isStudent() ? { studentId: identifier } : { email: identifier }) })
    emit('saved', response)
  } catch (failure) {
    const kind = userErrorKind(failure)
    error.value = kind === 'conflict'
      ? (isStudent() ? 'This Student ID is already in use.' : 'This email is already in use.')
      : kind === 'validation' ? 'Please check the details and try again.'
        : kind === 'forbidden' ? 'You do not have permission to do this.'
          : kind === 'notfound' ? 'This user no longer exists.'
            : kind === 'rate_limited' ? 'Too many attempts. Please wait a few minutes and try again.'
              : kind === 'network' ? 'Cannot reach the server. Check your connection and try again.'
                : 'Something went wrong. Please try again.'
    await nextTick()
    errorBanner.value?.focus()
  } finally {
    submitting.value = false
  }
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
    aria-labelledby="user-form-title"
    aria-describedby="user-form-subtitle"
    class="user-form-dialog fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-24px)] max-w-lg overflow-hidden rounded-2xl border border-[#e8edf5] bg-white p-0 text-[#173f8e] shadow-[0_20px_70px_rgba(23,58,106,0.22)] sm:w-[calc(100%-40px)]"
    @cancel="onCancel"
    @close="closed"
  >
    <div class="flex max-h-[90dvh] flex-col">
      <header class="flex shrink-0 items-center gap-3 border-b border-[#e8edf5] bg-[#fbfcfe] px-4 py-4 sm:px-6">
        <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf3ff] text-[#294e9e]" aria-hidden="true">
          <component :is="props.mode === 'create' ? UserPlus : UserPen" :size="21" />
        </span>
        <div class="min-w-0 flex-1">
          <h2 id="user-form-title" class="text-xl font-bold leading-7 text-[#173f8e]">
            {{ tr(props.mode === 'create' ? 'Create user' : 'Edit user') }}
          </h2>
          <p id="user-form-subtitle" class="mt-0.5 text-sm text-[#60718e]">
            {{ tr(props.mode === 'create' ? 'Create a school account.' : 'Edit the user’s details.') }}
          </p>
        </div>
        <button
          type="button"
          :disabled="submitting"
          class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#60718e] transition-colors hover:bg-[#edf3ff] hover:text-[#294e9e] disabled:cursor-not-allowed disabled:opacity-50"
          :aria-label="tr('Close form')"
          @click="cancel"
        >
          <X :size="19" aria-hidden="true" />
        </button>
      </header>

      <form id="user-form" class="min-h-0 flex-1 overflow-y-auto overscroll-contain" novalidate :aria-busy="submitting" @submit.prevent="submit">
        <div class="space-y-5 px-4 py-5 sm:px-6 sm:py-6">
          <div>
            <label for="user-name" class="mb-1.5 block text-sm font-semibold text-[#344b70]">
              {{ tr('Full name') }} <span class="text-red-600" aria-hidden="true">*</span>
            </label>
            <div class="relative">
              <User class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#60718e]" :size="18" aria-hidden="true" />
              <input
                id="user-name"
                ref="nameInput"
                v-model="form.name"
                type="text"
                autocomplete="name"
                maxlength="80"
                required
                :disabled="submitting"
                :aria-invalid="!!invalid.name"
                :aria-describedby="invalid.name ? 'user-name-error' : undefined"
                :class="[
                  'user-field min-h-12 w-full rounded-[14px] border bg-white py-2.5 pl-10 pr-3 text-base text-[#173f8e] outline-none transition placeholder:text-[#60718e] disabled:bg-slate-50',
                  invalid.name ? 'border-red-400 focus:border-red-600 focus:ring-red-500/15' : 'border-[#c7d4e8]',
                ]"
              />
            </div>
            <p v-if="invalid.name" id="user-name-error" role="alert" class="mt-1.5 flex items-start gap-1.5 text-sm text-red-700">
              <TriangleAlert class="mt-0.5 shrink-0" :size="15" aria-hidden="true" />{{ tr(invalid.name) }}
            </p>
          </div>

          <fieldset v-if="props.mode === 'create'" class="min-w-0">
            <legend class="mb-2 text-sm font-semibold text-[#344b70]">
              {{ tr('Choose a role') }} <span class="text-red-600" aria-hidden="true">*</span>
            </legend>
            <div class="grid grid-cols-2 gap-2 sm:gap-3">
              <label
                v-for="option in roleOptions"
                :key="option.value"
                class="group relative flex min-h-14 cursor-pointer items-center gap-2 rounded-[14px] border border-[#c7d4e8] bg-white px-3 py-2.5 text-sm font-medium text-[#344b70] transition hover:border-[#8ea9d8] hover:bg-[#fbfcfe] focus-within:ring-2 focus-within:ring-[#294e9e]/15"
                :class="form.role === option.value ? option.selected + ' ring-1' : ''"
              >
                <input
                  v-model="form.role"
                  class="peer sr-only"
                  type="radio"
                  name="user-role"
                  :value="option.value"
                  :aria-label="tr(option.label)"
                  required
                  :disabled="submitting"
                  @change="changeRole"
                />
                <component :is="option.icon" class="shrink-0" :class="option.iconColor" :size="18" aria-hidden="true" />
                <span class="min-w-0 break-words">{{ tr(option.label) }}</span>
                <span class="sr-only">{{ form.role === option.value ? tr('Selected') : '' }}</span>
              </label>
            </div>
          </fieldset>

          <div v-else class="flex items-start gap-3 rounded-[14px] border border-[#dce6f5] bg-[#fbfcfe] px-4 py-3">
            <span class="mt-0.5 inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset" :class="roleClasses[props.user?.role] || roleClasses.teacher">
              {{ tr(({ admin: 'Admin', teacher: 'Teacher', student: 'Student', parent: 'Parent' })[props.user?.role] || 'Teacher') }}
            </span>
            <div class="flex min-w-0 items-start gap-2 text-sm leading-5 text-[#60718e]">
              <LockKeyhole class="mt-0.5 shrink-0 text-[#60718e]" :size="16" aria-hidden="true" />
              <span>{{ tr('The role cannot be changed after the account is created.') }}</span>
            </div>
          </div>

          <div>
            <label for="user-identifier" class="mb-1.5 block text-sm font-semibold text-[#344b70]">
              {{ tr(isStudent() ? 'Student ID' : 'Email') }} <span class="text-red-600" aria-hidden="true">*</span>
            </label>
            <div class="relative">
              <component
                :is="isStudent() ? IdCard : Mail"
                class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#60718e]"
                :size="18"
                aria-hidden="true"
              />
              <input
                id="user-identifier"
                ref="idInput"
                v-model="identifierValue"
                :type="isStudent() ? 'text' : 'email'"
                :inputmode="isStudent() ? 'text' : 'email'"
                :autocomplete="isStudent() ? 'off' : 'email'"
                :autocapitalize="isStudent() ? 'characters' : 'none'"
                :spellcheck="!isStudent()"
                :maxlength="isStudent() ? 14 : 254"
                :placeholder="tr(isStudent() ? 'e.g. PIISC-2027-001' : 'Email address')"
                required
                :disabled="submitting"
                :aria-invalid="!!invalid.identifier"
                :aria-describedby="[isStudent() ? 'student-id-help' : '', invalid.identifier ? 'user-identifier-error' : ''].filter(Boolean).join(' ') || undefined"
                :class="[
                  'user-field min-h-12 w-full rounded-[14px] border bg-white py-2.5 pl-10 pr-3 text-base text-[#173f8e] outline-none transition placeholder:text-[#60718e] disabled:bg-slate-50',
                  invalid.identifier ? 'border-red-400 focus:border-red-600 focus:ring-red-500/15' : 'border-[#c7d4e8]',
                ]"
              />
            </div>
            <p v-if="isStudent()" id="student-id-help" class="mt-1.5 text-sm text-[#60718e]">
              {{ tr('Format: PIISC-2027-001') }}
            </p>
            <p v-if="invalid.identifier" id="user-identifier-error" role="alert" class="mt-1.5 flex items-start gap-1.5 text-sm text-red-700">
              <TriangleAlert class="mt-0.5 shrink-0" :size="15" aria-hidden="true" />{{ tr(invalid.identifier) }}
            </p>
          </div>

          <p v-if="props.mode === 'create'" class="flex items-start gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3.5 py-3 text-sm leading-5 text-blue-900">
            <Info class="mt-0.5 shrink-0 text-blue-700" :size="17" aria-hidden="true" />
            <span>{{ tr('A temporary password will be generated and shown once after saving.') }}</span>
          </p>

          <p v-if="error" ref="errorBanner" tabindex="-1" role="alert" class="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm leading-5 text-red-800 outline-none focus:ring-2 focus:ring-red-500/30">
            <TriangleAlert class="mt-0.5 shrink-0" :size="17" aria-hidden="true" />{{ tr(error) }}
          </p>
        </div>
      </form>

      <footer class="flex shrink-0 flex-col-reverse gap-2 border-t border-[#e8edf5] bg-[#fbfcfe] px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
        <button
          type="button"
          :disabled="submitting"
          class="inline-flex min-h-11 w-full items-center justify-center rounded-[10px] border border-[#c7d4e8] bg-white px-5 text-sm font-semibold text-[#173f8e] transition-colors hover:bg-[#edf3ff] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          @click="cancel"
        >{{ tr('Cancel') }}</button>
        <button
          type="submit"
          form="user-form"
          :disabled="submitting"
          :aria-busy="submitting"
          class="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-[#294e9e] px-5 text-sm font-semibold text-white shadow-[0_3px_10px_rgba(41,78,158,0.15)] transition-colors hover:bg-[#173f8e] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <Loader2 v-if="submitting" :size="16" class="animate-spin" aria-hidden="true" />
          {{ tr(submitting ? 'Saving…' : props.mode === 'create' ? 'Create user' : 'Save changes') }}
        </button>
      </footer>
    </div>
  </dialog>
</template>

<style scoped>
.user-form-dialog:not([open]) { display: none; }
.user-form-dialog::backdrop { @apply bg-[rgba(21,27,38,0.60)] backdrop-blur-[4px]; }
.user-field { @apply transition-[border-color,box-shadow] duration-150; }
.user-field:focus-visible { @apply border-[#8ea9d8] outline-none ring-2 ring-[#294e9e]/10; }
.user-form-dialog button:focus-visible { @apply outline outline-[3px] outline-[#d9b33d] outline-offset-[3px]; }
@media (prefers-reduced-motion: no-preference) {
  .user-form-dialog[open] { animation: user-form-enter 150ms ease-out both; }
}
@keyframes user-form-enter {
  from { opacity: 0; transform: translateY(6px) scale(0.99); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
