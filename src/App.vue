<script setup>
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth.js'
import SiteLayout from './layouts/SiteLayout.vue'
import DashboardLayout from './layouts/DashboardLayout.vue'
import LoginModal from './components/LoginModal.vue'
import ForcePasswordChangeModal from './components/ForcePasswordChangeModal.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
// Session loss on a protected page must also leave its dashboard layout.
watch(() => auth.isAuthenticated, (authenticated, wasAuthenticated) => {
  if (!wasAuthenticated || authenticated || !route.meta.requiresAuth) return
  const destination = auth.sessionExpired
    ? { name: 'home', query: { login: '1', redirect: route.fullPath } }
    : { name: 'home' }
  router.replace(destination).catch(() => {})
})
</script>
<template><DashboardLayout v-if="route.meta.layout === 'dashboard'" /><SiteLayout v-else /><LoginModal /><ForcePasswordChangeModal /></template>
