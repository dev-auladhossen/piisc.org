<script setup>
import { computed } from 'vue'
import { LayoutDashboard, Mail, Clock3 } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth.js'
import { useI18n } from '../composables/useI18n.js'
import { roleLabels } from '../data/roles.js'
import { overviewTilesFor, formatLastLogin } from '../data/dashboardMenus.js'
import campusPhoto from '../assets/images/group-work.jpg'

const props = defineProps({ role: { type: String, default: '' } })
const auth = useAuthStore()
const { language } = useI18n()
const tiles = computed(() => overviewTilesFor(props.role))
const studentAccount = computed(() => auth.role === 'student' && !!auth.user?.studentId)
const accountValue = computed(() => studentAccount.value ? auth.user?.studentId : auth.user?.email)
const lastLogin = computed(() => formatLastLogin(auth.user?.lastLogin, language.value))
</script>

<template>
  <div class="min-w-0 space-y-[24px]">
    <section class="overflow-hidden rounded-[12px] border border-[#dce5f3] bg-white shadow-sm [overflow-wrap:anywhere]" aria-labelledby="dashboard-welcome">
      <div class="bg-[linear-gradient(100deg,rgba(23,63,142,0.95),rgba(41,78,158,0.80)),var(--dashboard-photo)] bg-cover bg-center p-[24px] text-white md:p-[32px]" :style="{ '--dashboard-photo': `url(${campusPhoto})` }">
        <p class="mb-[14px] inline-flex items-center gap-[8px] rounded-full border border-[#f1c33b]/60 bg-[#f1c33b]/10 px-[12px] py-[6px] text-[12px] font-bold text-[#f6d45e]"><LayoutDashboard :size="16" aria-hidden="true" />{{ $tr(roleLabels[role] || 'Dashboard') }}</p>
        <h1 id="dashboard-welcome" class="text-[28px] leading-[1.3] text-white md:text-[38px]">{{ $tr('Welcome,') }} <span class="text-[#f5ca48]">{{ auth.user?.name || $tr('School account') }}</span></h1>
      </div>
    </section>
    <section class="rounded-[12px] border border-[#dce5f3] bg-white p-[20px] shadow-sm sm:p-[24px]" aria-labelledby="account-heading">
      <h2 id="account-heading" class="mb-[18px] text-[22px] text-[#173f8e]">{{ $tr('Account') }}</h2>
      <dl class="grid min-w-0 gap-[20px] sm:grid-cols-2">
        <div class="min-w-0"><dt class="mb-[6px] flex items-center gap-[8px] text-[13px] font-bold text-[#60718e]"><Mail :size="16" aria-hidden="true" />{{ $tr(studentAccount ? 'Student ID' : 'Email') }}</dt><dd class="text-[15px] text-[#173f8e] [overflow-wrap:anywhere]">{{ accountValue || $tr('Not available') }}</dd></div>
        <div><dt class="mb-[6px] flex items-center gap-[8px] text-[13px] font-bold text-[#60718e]"><Clock3 :size="16" aria-hidden="true" />{{ $tr('Last login') }}</dt><dd class="text-[15px] text-[#173f8e]">{{ $tr(lastLogin) }}</dd></div>
      </dl>
    </section>
    <section aria-labelledby="soon-heading">
      <h2 id="soon-heading" class="mb-[16px] text-[24px] text-[#173f8e]">{{ $tr('Coming soon') }}</h2>
      <div class="grid min-w-0 gap-[16px] sm:grid-cols-2 xl:grid-cols-3">
        <article v-for="tile in tiles" :key="tile.key" aria-disabled="true" class="min-w-0 rounded-[10px] border border-[#dce5f3] bg-white p-[20px] shadow-sm">
          <div class="mb-[16px] flex items-center justify-between gap-[12px]"><component :is="tile.icon" :size="24" class="text-[#294e9e]" aria-hidden="true" /><span class="rounded-full bg-[#f7f3e8] px-[10px] py-[4px] text-[11px] font-bold text-[#8a6618]">{{ $tr('Soon') }}</span></div>
          <h3 class="text-[18px] text-[#60718e]">{{ $tr(tile.label) }}</h3>
        </article>
      </div>
    </section>
  </div>
</template>
