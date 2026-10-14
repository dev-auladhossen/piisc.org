<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Eye, EyeOff, X, GraduationCap, Presentation, Users, ShieldCheck, UserRound, LogIn, LockKeyhole, Info } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth.js'
import { useI18n } from '../composables/useI18n.js'
import { useLoginModal } from '../composables/useLoginModal.js'
import { dashboardPathFor } from '../data/roles.js'

const auth = useAuthStore()
const { tr } = useI18n()
const route = useRoute()
const router = useRouter()
const { isOpen, redirectTo, triggerElement, loginRole, openLogin, closeLogin } = useLoginModal()
const loginTypes = {
  student: { title: 'Student Login', description: 'Sign in to access your student dashboard and profile.', icon: GraduationCap },
  teacher: { title: 'Teacher Login', description: 'Sign in to access your teacher dashboard.', icon: Presentation },
  parent: { title: 'Parent Login', description: 'Sign in to access your parent dashboard.', icon: Users },
  admin: { title: 'Admin Login', description: 'Sign in to access your school administration dashboard.', icon: ShieldCheck },
}
const loginInfo = computed(() => loginTypes[loginRole.value] || {
  title: 'Sign In', description: 'Enter your email or Student ID and password to sign in.', icon: UserRound,
})
const dialog = ref(null)
const identifierInput = ref(null)
const passwordInput = ref(null)
const identifier = ref('')
const password = ref('')
const showPassword = ref(false)
const identifierMissing = ref(false)
const passwordMissing = ref(false)
const errorKind = ref('')
const submitting = ref(false)
const closing = ref(false)
const modalScale = ref(1)
const modalTop = ref('50%')
const identifierLabel = computed(() => loginRole.value === 'student' ? 'Student ID' : 'Email or Student ID')
const identifierError = computed(() => loginRole.value === 'student' ? 'Student ID is required.' : 'Email or Student ID is required.')
const loginErrorMessage = computed(() => {
  if (loginRole.value === 'student' && errorKind.value === 'invalid') return 'Incorrect Student ID or password.'
  if (loginRole.value === 'student' && errorKind.value === 'validation') return 'Please enter your Student ID and password.'
  return errorMessages[errorKind.value]
})
let closeAnimation
let resizeObserver
let previousOverflow
let locked = false
let opening = 0

// Translate known messages at render time, including live language switches.
const errorMessages = {
  invalid: 'Incorrect email/ID or password.',
  validation: 'Please enter your email or Student ID and password.',
  rate_limited: 'Too many attempts. Please wait a few minutes and try again.',
  network: 'Cannot reach the server. Check your connection and try again.',
  server: 'Something went wrong. Please try again.',
}

function clearForm() {
  identifier.value = ''
  password.value = ''
  showPassword.value = false
  identifierMissing.value = false
  passwordMissing.value = false
  errorKind.value = ''
}

// The compact form normally fits naturally. On very short screens (including
// the on-screen keyboard), scale it only as needed rather than adding a scroller.
function fitModal() {
  if (!dialog.value?.open || closing.value) return
  const viewport = window.visualViewport
  const height = viewport?.height || window.innerHeight
  modalTop.value = `${(viewport?.offsetTop || 0) + height / 2}px`
  modalScale.value = Math.min(1, Math.max(0.1, (height - 24) / dialog.value.scrollHeight))
}

function restorePage() {
  if (!locked) return
  // Preserve an underlying dialog's scroll lock instead of restoring ''.
  document.body.style.overflow = previousOverflow
  locked = false
  const trigger = triggerElement.value
  if (trigger?.isConnected && typeof trigger.focus === 'function') trigger.focus({ preventScroll: true })
  triggerElement.value = null
}

async function removeLoginQuery() {
  if (!('login' in route.query) && !('redirect' in route.query)) return
  const query = { ...route.query }
  delete query.login
  delete query.redirect
  try {
    await router.replace({ path: route.path, query, hash: route.hash })
  } catch {
    // Navigation failures must not prevent closing or focus restoration.
  }
}

function requestClose() {
  password.value = ''
  showPassword.value = false
  closeLogin()
}

function onDialogClose() {
  // A queued close event from an older opening must not close a reopened dialog.
  if (dialog.value?.open) return
  requestClose()
  restorePage()
}

function onBackdropClick(event) {
  if (event.target !== dialog.value) return
  const bounds = dialog.value.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
    event.clientY < bounds.top || event.clientY > bounds.bottom) requestClose()
}

watch([() => route.query.login, () => auth.isAuthenticated], async ([value, authenticated]) => {
  if (value !== '1') return
  if (!authenticated) {
    const role = typeof route.query.redirect === 'string' ? route.query.redirect.match(/^\/dashboard\/(admin|teacher|student|parent)(?:[/?#]|$)/)?.[1] : null
    openLogin({ redirect: route.query.redirect, role }); return
  }
  // An authenticated visitor needs navigation, not another login prompt.
  const redirect = route.query.redirect
  const destination = typeof redirect === 'string' && redirect.startsWith('/') &&
    !redirect.startsWith('//') && !redirect.includes('://') && !redirect.includes('\\')
    ? redirect : dashboardPathFor(auth.role)
  requestClose()
  await removeLoginQuery()
  if (destination) router.push(destination).catch(() => {})
}, { immediate: true })

watch(isOpen, async (open, wasOpen) => {
  const change = ++opening
  closeAnimation?.cancel()
  closing.value = false
  if (open) {
    clearForm()
    await nextTick()
    if (!isOpen.value || !dialog.value) return
    if (!locked) {
      previousOverflow = document.body.style.overflow
      dialog.value.showModal()
      document.body.style.overflow = 'hidden'
      locked = true
    }
    fitModal()
    identifierInput.value?.focus()
  } else {
    if (wasOpen && dialog.value?.open && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      closing.value = true
      const appearance = getComputedStyle(dialog.value)
      closeAnimation = dialog.value.animate([
        { opacity: appearance.opacity, transform: appearance.transform },
        { opacity: 0, transform: `translate(-50%, -48%) scale(${modalScale.value * 0.97})` },
      ], { duration: 160, easing: 'ease-in', fill: 'forwards' })
      await closeAnimation.finished.catch(() => {})
    }
    if (change !== opening || isOpen.value) return
    clearForm()
    dialog.value?.close()
    closeAnimation?.cancel()
    closing.value = false
    restorePage()
    if (wasOpen) await removeLoginQuery()
  }
}, { immediate: true, flush: 'post' })

async function submit() {
  if (submitting.value) return
  identifier.value = identifier.value.trim()
  identifierMissing.value = !identifier.value
  passwordMissing.value = !password.value
  errorKind.value = ''
  if (identifierMissing.value || passwordMissing.value) {
    await nextTick()
    const firstInvalid = identifierMissing.value ? identifierInput.value : passwordInput.value
    firstInvalid?.focus()
    return
  }
  submitting.value = true
  const attempt = opening
  const destination = redirectTo.value
  try {
    const user = await auth.login(identifier.value, password.value)
    // Ignore late UI updates after this modal has been closed or reopened.
    if (!isOpen.value || attempt !== opening) return
    requestClose()
    await nextTick()
    await removeLoginQuery()
    const nextPage = destination || dashboardPathFor(user.role)
    if (nextPage) await router.push(nextPage)
  } catch (error) {
    if (!isOpen.value || attempt !== opening) return
    errorKind.value = Object.hasOwn(errorMessages, error?.kind) ? error.kind : 'server'
    password.value = ''
    showPassword.value = false
  } finally {
    submitting.value = false
    await nextTick()
    if (isOpen.value && attempt === opening && errorKind.value) passwordInput.value?.focus()
  }
}

onMounted(() => {
  resizeObserver = new ResizeObserver(fitModal)
  resizeObserver.observe(dialog.value)
  window.addEventListener('resize', fitModal)
  window.visualViewport?.addEventListener('resize', fitModal)
})

onBeforeUnmount(() => {
  ++opening
  closeAnimation?.cancel()
  resizeObserver?.disconnect()
  window.removeEventListener('resize', fitModal)
  window.visualViewport?.removeEventListener('resize', fitModal)
  clearForm()
  closeLogin()
  dialog.value?.close()
  restorePage()
})
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog" aria-labelledby="login-modal-title" class="login-modal"
      :class="{ 'is-closing': closing }"
      :style="{ '--modal-scale': modalScale, '--modal-top': modalTop }"
      :inert="closing"
      @cancel.prevent.stop="requestClose" @keydown.esc.stop @close="onDialogClose" @click="onBackdropClick"
    >
      <header class="login-heading">
        <button type="button" class="login-close" :aria-label="tr('Close login')" @click="requestClose"><X :size="18" aria-hidden="true" /></button>
        <span class="login-role-icon"><component :is="loginInfo.icon" :size="24" aria-hidden="true" /></span>
        <h2 id="login-modal-title" class="mt-[6px] text-[18px] leading-[1.3] text-[#173f8e]">{{ tr(loginInfo.title) }}</h2>
        <p class="mt-[4px] text-[12px] leading-[1.5] text-[#60718e]">{{ tr(loginInfo.description) }}</p>
      </header>

      <div class="login-content">
        <p v-if="auth.sessionExpired" role="status" class="mb-[12px] rounded-[6px] border border-gold bg-cream p-[8px] text-[12px] leading-[1.5]">{{ tr('Your session has expired. Please log in again.') }}</p>
        <form novalidate :aria-busy="submitting" @submit.prevent="submit">
          <div class="login-field">
            <UserRound class="field-icon" :size="16" aria-hidden="true" />
            <input
              id="login-identifier" ref="identifierInput" v-model="identifier" name="identifier" type="text"
              autocomplete="username" autocapitalize="off" autocorrect="off" :spellcheck="false" maxlength="254" required
              :disabled="submitting" :aria-invalid="identifierMissing" :aria-describedby="identifierMissing ? 'login-identifier-error' : undefined"
              placeholder=" " class="login-input peer"
              @input="identifierMissing = false"
            />
            <label for="login-identifier" class="login-label">{{ tr(identifierLabel) }} <span class="text-[#b45309]" aria-hidden="true">*</span></label>
          </div>
          <p v-if="identifierMissing" id="login-identifier-error" role="alert" class="mt-[4px] text-[12px] leading-[1.5] text-[#9f2424]">{{ tr(identifierError) }}</p>

          <div class="login-field mt-[12px]">
            <LockKeyhole class="field-icon" :size="16" aria-hidden="true" />
            <input
              id="login-password" ref="passwordInput" v-model="password" name="password" :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password" maxlength="128" required
              :disabled="submitting" :aria-invalid="passwordMissing || !!errorKind" :aria-describedby="passwordMissing ? 'login-password-error' : errorKind ? 'login-error' : undefined"
              placeholder=" " class="login-input peer"
              @input="passwordMissing = false"
            />
            <label for="login-password" class="login-label">{{ tr('Password') }} <span class="text-[#b45309]" aria-hidden="true">*</span></label>
            <button type="button" :disabled="submitting" :aria-label="tr(showPassword ? 'Hide password' : 'Show password')" :aria-pressed="showPassword" aria-controls="login-password" class="password-toggle" @click="showPassword = !showPassword"><EyeOff v-if="showPassword" :size="16" aria-hidden="true" /><Eye v-else :size="16" aria-hidden="true" /></button>
          </div>
          <p v-if="passwordMissing" id="login-password-error" role="alert" class="mt-[4px] text-[12px] leading-[1.5] text-[#9f2424]">{{ tr('Password is required.') }}</p>
          <p v-if="errorKind" id="login-error" role="alert" class="mt-[10px] rounded-[6px] bg-[#fff1f1] p-[8px] text-[12px] leading-[1.5] text-[#9f2424]">{{ tr(loginErrorMessage) }}</p>

          <div class="mt-[16px] flex justify-end">
            <button type="submit" :disabled="submitting" class="login-submit"><LogIn :size="16" aria-hidden="true" />{{ tr(submitting ? 'Logging in…' : 'Login') }}</button>
          </div>
        </form>
        <aside class="login-instructions">
          <p class="mb-[6px] flex items-center gap-[6px] text-[13px] font-bold text-[#294e9e]"><Info :size="15" aria-hidden="true" />{{ tr('Instructions') }}</p>
          <ul class="list-disc space-y-[4px] pl-[16px] text-[12px] leading-[1.5] text-[#344b70]">
            <li>{{ tr('Use the credentials provided by the school office.') }}</li>
            <li>{{ tr('Forgot your password? Contact the school office.') }}</li>
          </ul>
        </aside>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.login-modal {
  @apply fixed left-1/2 right-auto bottom-auto m-0 w-[calc(100%_-_32px)] max-w-[28rem] max-h-none overflow-visible rounded-[10px] border-0 bg-white p-0 text-[#173f8e] shadow-[0_20px_70px_rgba(23,58,106,0.22)];
  top: var(--modal-top, 50%);
  transform: translate(-50%, -50%) scale(var(--modal-scale, 1));
  transform-origin: center;
}
.login-modal::backdrop {
  @apply bg-[rgba(21,27,38,0.60)] backdrop-blur-[4px];
}
.login-heading {
  @apply relative rounded-t-[10px] border-b border-[#e8edf5] bg-[#fbfcfe] px-[32px] py-[18px] text-center;
}
.login-role-icon {
  @apply mx-auto flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#edf3ff] text-[#294e9e];
}
.login-close {
  @apply absolute right-[6px] top-[6px] flex h-[32px] w-[32px] items-center justify-center rounded-full text-[#60718e] transition-colors hover:bg-[#edf3ff] hover:text-[#294e9e];
}
.login-content {
  @apply p-[20px] sm:p-[28px];
}
.login-field {
  @apply relative;
}
.field-icon {
  @apply pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-[#60718e];
}
.login-input {
  @apply min-h-[44px] w-full rounded-[7px] border border-[#c5d8fb] bg-white py-[10px] pl-[40px] pr-[12px] text-[16px] text-[#173f8e] disabled:opacity-60;
  @apply transition-[border-color,box-shadow] duration-200 focus:border-[#294e9e];
}
#login-password.login-input {
  @apply pr-[44px];
}
.login-label {
  @apply pointer-events-none absolute left-[36px] top-0 -translate-y-1/2 bg-white px-[4px] text-[11px] leading-[1.2] text-[#173f8e] transition-all duration-150;
}
.login-input:placeholder-shown:not(:focus) + .login-label {
  @apply top-1/2 bg-transparent text-[13px];
}
.password-toggle {
  @apply absolute right-[2px] top-1/2 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-[6px] text-[#60718e] transition-colors hover:bg-[#edf3ff] hover:text-[#294e9e];
}
.login-submit {
  @apply inline-flex min-h-[38px] items-center justify-center gap-[7px] rounded-full bg-[#294e9e] px-[20px] py-[8px] text-[13px] font-bold text-white shadow-[0_3px_10px_rgba(41,78,158,0.15)] disabled:cursor-not-allowed disabled:opacity-60;
  @apply transition-[background,transform,box-shadow] duration-200 hover:bg-[#173f8e] hover:shadow-[0_7px_18px_rgba(41,78,158,0.23)] motion-safe:hover:-translate-y-[2px];
}
.login-instructions {
  @apply mt-[20px] rounded-[4px] border-l-[3px] border-[#d4a72b] bg-[#edf3ff] p-[12px];
}
.login-modal :is(button,input):focus-visible {
  @apply outline outline-[3px] outline-[#d9b33d] outline-offset-[3px];
}
@media (prefers-reduced-motion: no-preference) {
  .login-modal[open]:not(.is-closing) {
    animation: login-enter 200ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
  }
  .login-modal[open]::backdrop {
    animation: login-backdrop-enter 200ms ease-out both;
  }
  .login-modal.is-closing::backdrop {
    animation: login-backdrop-exit 160ms ease-in forwards;
  }
}
@media (prefers-reduced-motion: reduce) {
  .login-modal * {
    @apply transition-none;
  }
}
@media (max-height: 520px) {
  .login-heading {
    @apply py-[12px];
  }
  .login-content {
    @apply p-[16px];
  }
  .login-instructions {
    @apply mt-[12px] p-[10px];
  }
}
@keyframes login-enter {
  from { opacity: 0; transform: translate(-50%, -47%) scale(calc(var(--modal-scale, 1) * 0.97)); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(var(--modal-scale, 1)); }
}
@keyframes login-backdrop-enter {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes login-backdrop-exit {
  from { opacity: 1; }
  to { opacity: 0; }
}
</style>
