<script setup>
import { useAuthStore } from '../stores/auth.js'
import { roleLabels } from '../data/roles.js'
import { LayoutDashboard } from 'lucide-vue-next'
import campusPhoto from '../assets/images/group-work.jpg'

defineProps({ role: { type: String, default: '' } })
const auth = useAuthStore()
</script>

<template>
  <section class="min-w-0 overflow-hidden rounded-[12px] border border-[#dce5f3] bg-white shadow-[0_12px_32px_rgba(23,58,106,0.06)] [overflow-wrap:anywhere]" aria-labelledby="dashboard-welcome">
    <div class="bg-[linear-gradient(100deg,rgba(23,63,142,0.95),rgba(41,78,158,0.80)),var(--dashboard-photo)] bg-cover bg-center p-[24px] text-white md:p-[40px]" :style="{ '--dashboard-photo': `url(${campusPhoto})` }">
      <p class="mb-[18px] inline-flex items-center gap-[8px] rounded-full border border-[#f1c33b]/60 bg-[#f1c33b]/10 px-[14px] py-[7px] text-[12px] font-bold tracking-[0.08em] text-[#f6d45e]"><LayoutDashboard :size="16" aria-hidden="true" />{{ $tr(roleLabels[role] || 'Dashboard') }}</p>
      <h1 id="dashboard-welcome" class="text-[30px] leading-[1.3] text-white md:text-[44px]">{{ $tr('Welcome,') }} <span class="text-[#f5ca48]">{{ auth.user?.name }}</span></h1>
    </div>
    <div class="p-[24px] md:p-[40px]">
      <span class="mb-[18px] block h-[4px] w-[64px] rounded-full bg-[#d4a72b]" aria-hidden="true"></span>
      <p class="text-[16px] leading-[1.75] text-[#60718e]">{{ $tr('Your dashboard is being built.') }}</p>
    </div>
  </section>
</template>
