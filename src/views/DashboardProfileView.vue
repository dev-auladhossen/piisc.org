<script setup>
import { computed } from 'vue'
import { UserRound } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth.js'
import { useI18n } from '../composables/useI18n.js'
import { roleLabels } from '../data/roles.js'
import { formatLastLogin } from '../data/dashboardMenus.js'

const auth = useAuthStore()
const { language } = useI18n()
const studentAccount = computed(() => auth.role === 'student' && !!auth.user?.studentId)
const accountValue = computed(() => studentAccount.value ? auth.user?.studentId : auth.user?.email)
const lastLogin = computed(() => formatLastLogin(auth.user?.lastLogin, language.value))
const status = computed(() => auth.user?.isActive === true ? 'Active' : auth.user?.isActive === false ? 'Inactive' : 'Not available')
</script>

<template>
  <section class="min-w-0 rounded-[12px] border border-[#dce5f3] bg-white p-[20px] shadow-sm sm:p-[28px]" aria-labelledby="profile-heading">
    <div class="mb-[24px] flex items-center gap-[12px]"><UserRound :size="28" class="shrink-0 text-[#294e9e]" aria-hidden="true" /><h1 id="profile-heading" class="text-[28px] text-[#173f8e]">{{ $tr('My profile') }}</h1></div>
    <dl class="grid min-w-0 gap-[24px] sm:grid-cols-2">
      <div class="min-w-0"><dt class="mb-[6px] text-[13px] font-bold text-[#60718e]">{{ $tr('Name') }}</dt><dd class="text-[16px] text-[#173f8e] [overflow-wrap:anywhere]">{{ auth.user?.name || $tr('Not available') }}</dd></div>
      <div><dt class="mb-[6px] text-[13px] font-bold text-[#60718e]">{{ $tr('Role') }}</dt><dd class="text-[16px] text-[#173f8e]">{{ $tr(roleLabels[auth.role] || 'Not available') }}</dd></div>
      <div class="min-w-0"><dt class="mb-[6px] text-[13px] font-bold text-[#60718e]">{{ $tr(studentAccount ? 'Student ID' : 'Email') }}</dt><dd class="text-[16px] text-[#173f8e] [overflow-wrap:anywhere]">{{ accountValue || $tr('Not available') }}</dd></div>
      <div><dt class="mb-[6px] text-[13px] font-bold text-[#60718e]">{{ $tr('Account status') }}</dt><dd class="text-[16px] text-[#173f8e]">{{ $tr(status) }}</dd></div>
      <div class="sm:col-span-2"><dt class="mb-[6px] text-[13px] font-bold text-[#60718e]">{{ $tr('Last login') }}</dt><dd class="text-[16px] text-[#173f8e]">{{ $tr(lastLogin) }}</dd></div>
    </dl>
    <p class="mt-[28px] rounded-[8px] border-l-[3px] border-[#d4a72b] bg-[#edf3ff] p-[14px] text-[14px] leading-[1.7] text-[#344b70]">{{ $tr('To change your name or contact details, please contact the school office.') }}</p>
  </section>
</template>
