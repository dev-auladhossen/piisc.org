import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import api, { setUnauthorizedHandler, setPasswordChangeHandler } from '../api.js'

export const useAuthStore = defineStore('auth', () => {
  // Only the token survives a reload. The user is fetched again from /auth/me.
  let savedToken = null
  try {
    savedToken = localStorage.getItem('piisc_token')
  } catch {
    // Storage may be blocked; start without a saved session.
  }
  const token = ref(savedToken)
  const user = ref(null)
  const loading = ref(false)
  const sessionExpired = ref(false)
  const restored = ref(false)

  const isAuthenticated = computed(() => Boolean(token.value && user.value))
  const role = computed(() => user.value?.role ?? null)
  const mustChangePassword = computed(() => Boolean(user.value?.mustChangePassword))

  function clearSession() {
    token.value = null
    user.value = null
    try {
      localStorage.removeItem('piisc_token')
    } catch {
      // Clearing the in-memory session does not depend on storage succeeding.
    }
  }

  // api.js calls these without importing Pinia or this store.
  setUnauthorizedHandler(() => {
    clearSession()
    sessionExpired.value = true
  })
  setPasswordChangeHandler(() => {
    if (user.value) user.value.mustChangePassword = true
  })

  async function login(identifier, password) {
    loading.value = true
    try {
      const { data } = await api.post('/auth/login', { identifier, password })
      // Persist only after a successful login; never persist the password/user.
      try {
        localStorage.setItem('piisc_token', data.token)
      } catch {
        // State still records the login if persistence is unavailable.
      }
      token.value = data.token
      user.value = data.user
      sessionExpired.value = false
      restored.value = true
      return user.value
    } catch (failure) {
      const status = failure.response?.status
      let kind = 'server'
      let message = 'Unable to sign in. Please try again.'
      if (!failure.response) {
        kind = 'network'
        message = 'Cannot connect. Please try again.'
      } else if (status === 400) {
        kind = 'validation'
        message = 'Please check your login details.'
      } else if (status === 401) {
        kind = 'invalid'
        message = 'Invalid credentials.'
      } else if (status === 429) {
        kind = 'rate_limited'
        message = 'Too many attempts. Please try again later.'
      }
      // Future UI translates kind; this store does not depend on translations.
      const error = new Error(message)
      error.kind = kind
      error.status = status
      throw error
    } finally {
      loading.value = false
    }
  }

  async function loadUser() {
    try {
      if (!token.value) return
      loading.value = true
      const { data } = await api.get('/auth/me')
      user.value = data.user
    } catch {
      // A failed restoration must not leave a partially authenticated session.
      clearSession()
    } finally {
      loading.value = false
      restored.value = true
    }
  }

  async function changePassword(currentPassword, newPassword) {
    try {
      const { data } = await api.patch('/auth/change-password', { currentPassword, newPassword })
      // The backend supplies the updated user; the existing token stays in place.
      user.value = data.user
    } catch (failure) {
      const status = failure.response?.status
      const kind = !failure.response ? 'network'
        : status === 400 ? 'rejected'
        : status === 401 ? 'unauthorized'
        : status === 429 ? 'rate_limited' : 'server'
      // Never pass backend messages or passwords to the UI.
      const error = new Error('Unable to change password. Please try again.')
      error.kind = kind
      error.status = status
      throw error
    }
  }

  function logout() {
    clearSession()
    sessionExpired.value = false
  }

  return {
    token, user, loading, sessionExpired, restored,
    isAuthenticated, role, mustChangePassword,
    login, loadUser, logout, changePassword,
  }
})
