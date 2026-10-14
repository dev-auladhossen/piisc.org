<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { roleLabels } from '../data/roles.js'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import { ArrowUpRight, LogOut } from 'lucide-vue-next'

const auth = useAuthStore()
const router = useRouter()
function logout() {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-[#f4f7fc]">
    <a href="#main" class="skip-link">{{ $tr('Skip to content') }}</a>
    <header class="border-b-[3px] border-[#d9b33d] bg-[linear-gradient(100deg,#102442,#294e9e)] text-white shadow-[0_4px_20px_rgba(23,58,106,0.08)]">
      <div class="container flex min-w-0 flex-wrap items-center justify-between gap-[16px] py-[16px]">
        <RouterLink to="/" class="min-w-0 text-[16px] font-bold [overflow-wrap:anywhere]">{{ $tr('Peace International Islamic School & College') }}</RouterLink>
        <div class="flex min-w-0 max-w-full flex-wrap items-center gap-[12px]">
          <LanguageSwitcher />
          <span class="max-w-[160px] truncate text-[14px]" :title="auth.user?.name">{{ auth.user?.name }}</span>
          <span class="rounded-full border border-[#f1c33b] bg-[#f1c33b]/10 px-[12px] py-[5px] text-[12px] font-bold text-[#f6d45e]">{{ $tr(roleLabels[auth.role] || 'Dashboard') }}</span>
          <RouterLink to="/" class="dashboard-button"><ArrowUpRight :size="17" aria-hidden="true" />{{ $tr('View website') }}</RouterLink>
          <button type="button" class="dashboard-button" @click="logout"><LogOut :size="17" aria-hidden="true" />{{ $tr('Logout') }}</button>
        </div>
      </div>
    </header>
    <main id="main" class="container py-[36px] md:py-[52px]"><RouterView /></main>
  </div>
</template>

<style scoped>
.dashboard-button {
  @apply inline-flex min-h-[44px] shrink-0 items-center justify-center gap-[8px] rounded-[8px] border border-[#c5d8fb] bg-white px-[14px] py-[10px] text-[14px] font-bold text-[#294e9e];
  @apply transition-[background,color,transform,box-shadow] duration-200 hover:bg-[#edf3ff] hover:text-[#173f8e] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] motion-safe:hover:-translate-y-[2px] motion-reduce:transition-none;
  @apply focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#f1c33b] focus-visible:outline-offset-[3px];
}
</style>
