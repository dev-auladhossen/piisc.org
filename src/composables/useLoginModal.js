import { ref, shallowRef } from 'vue'
import { ROLES } from '../data/roles.js'

// Shared state, like the module-level language ref in useI18n.js.
const isOpen = ref(false)
const redirectTo = ref(null)
const triggerElement = shallowRef(null)
const loginRole = ref(null)

export function openLogin({ redirect, trigger, role } = {}) {
  // This selects the form's presentation; the backend still determines access.
  loginRole.value = ROLES.includes(role) ? role : null
  // Only local paths are allowed; external URLs must never become redirects.
  redirectTo.value = typeof redirect === 'string' && redirect.startsWith('/') &&
    !redirect.startsWith('//') && !redirect.includes('://') && !redirect.includes('\\')
    ? redirect : null
  triggerElement.value = trigger ?? (typeof document !== 'undefined' ? document.activeElement : null)
  isOpen.value = true
}

export function closeLogin() {
  isOpen.value = false
  redirectTo.value = null
}

export function useLoginModal() {
  return { isOpen, redirectTo, triggerElement, loginRole, openLogin, closeLogin }
}
