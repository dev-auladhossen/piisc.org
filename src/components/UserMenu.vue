<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronDown, LayoutDashboard, UserRound, LogOut } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth.js'
import { dashboardPathFor, roleLabels } from '../data/roles.js'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const root = ref(null)
const trigger = ref(null)
const menu = ref(null)
const open = ref(false)
const menuId = `user-menu-${useId()}`
const menuPosition = ref({ left: '16px', top: '0px', width: '240px' })
const initials = computed(() => typeof auth.user?.name === 'string'
  ? auth.user.name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map(word => Array.from(word)[0].toUpperCase()).join('') : '')

function close(returnFocus = false) {
  open.value = false
  if (returnFocus && trigger.value?.isConnected) trigger.value.focus()
}

// Fixed positioning keeps the menu inside a narrow viewport, even when the
// trigger is centered in the public contact bar rather than at the right edge.
function placeMenu() {
  if (!open.value || !trigger.value) return
  const bounds = trigger.value.getBoundingClientRect()
  const width = Math.min(240, window.innerWidth - 32)
  const height = menu.value?.offsetHeight || 220
  const top = bounds.bottom + 8 + height <= window.innerHeight - 8
    ? bounds.bottom + 8 : Math.max(8, bounds.top - height - 8)
  menuPosition.value = {
    left: `${Math.max(16, Math.min(bounds.right - width, window.innerWidth - width - 16))}px`,
    top: `${top}px`, width: `${width}px`,
  }
}

function items() { return [...(menu.value?.querySelectorAll('[role="menuitem"]') || [])] }
async function show(last = false) {
  open.value = true
  await nextTick()
  placeMenu()
  const options = items()
  options[last ? options.length - 1 : 0]?.focus()
}
function toggle() { open.value ? close(true) : show() }

async function onKeys(event) {
  if (event.key === 'Escape' && open.value) {
    event.preventDefault()
    event.stopPropagation()
    close(true)
  } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
    event.preventDefault()
    if (!open.value) { await show(event.key === 'ArrowUp' || event.key === 'End'); return }
    const options = items()
    if (!options.length) return
    const current = options.indexOf(document.activeElement)
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1
      : current < 0 ? (event.key === 'ArrowUp' ? options.length - 1 : 0)
        : (current + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length
    options[next]?.focus()
  }
}
function onOutside(event) {
  if (open.value && !root.value?.contains(event.target)) close()
}
function onEscape(event) {
  if (open.value && event.key === 'Escape') { event.preventDefault(); close(true) }
}
function onFocusOut(event) {
  // Tab should continue to the next control, rather than returning to the trigger.
  if (!event.currentTarget.contains(event.relatedTarget)) close()
}
function logout() {
  close()
  auth.logout()
  router.push('/').catch(() => {})
}
watch(() => route.fullPath, () => close())
watch(() => auth.isAuthenticated, authenticated => { if (!authenticated) close() })
onMounted(() => {
  document.addEventListener('pointerdown', onOutside)
  document.addEventListener('keydown', onEscape)
  window.addEventListener('resize', placeMenu)
  window.addEventListener('scroll', placeMenu, true)
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onOutside)
  document.removeEventListener('keydown', onEscape)
  window.removeEventListener('resize', placeMenu)
  window.removeEventListener('scroll', placeMenu, true)
})
</script>

<template>
  <div ref="root" class="user-menu min-w-0" @keydown="onKeys" @focusout="onFocusOut">
    <button ref="trigger" type="button" class="user-menu-trigger" aria-haspopup="menu" :aria-expanded="open" :aria-controls="menuId" :aria-label="$tr('Account menu')" @click="toggle">
      <span class="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#edf3ff] text-[12px] font-bold text-[#294e9e]" aria-hidden="true"><template v-if="initials">{{ initials }}</template><UserRound v-else :size="18" /></span>
      <span class="hidden max-w-[140px] truncate text-[13px] font-semibold sm:inline" :title="auth.user?.name">{{ auth.user?.name || $tr('School account') }}</span>
      <ChevronDown :size="15" aria-hidden="true" />
    </button>
    <div v-if="open" :id="menuId" ref="menu" role="menu" :aria-label="$tr('Account menu')" class="user-menu-panel" :style="menuPosition">
      <div role="none" class="border-b border-[#e8edf5] p-[12px]"><span class="inline-block rounded-full bg-[#edf3ff] px-[10px] py-[4px] text-[12px] font-bold text-[#294e9e]">{{ $tr(roleLabels[auth.role] || 'School account') }}</span></div>
      <RouterLink v-if="dashboardPathFor(auth.role)" :to="dashboardPathFor(auth.role)" role="menuitem" tabindex="-1" class="user-menu-item" @click="close()"><LayoutDashboard :size="18" aria-hidden="true" />{{ $tr('Dashboard') }}</RouterLink>
      <RouterLink to="/dashboard/profile" role="menuitem" tabindex="-1" class="user-menu-item" @click="close()"><UserRound :size="18" aria-hidden="true" />{{ $tr('My profile') }}</RouterLink>
      <button type="button" role="menuitem" tabindex="-1" class="user-menu-item" @click="logout"><LogOut :size="18" aria-hidden="true" />{{ $tr('Logout') }}</button>
    </div>
  </div>
</template>

<style scoped>
.user-menu-trigger {
  @apply inline-flex min-h-[44px] max-w-full items-center gap-[8px] rounded-[8px] border border-[#c5d8fb] bg-white px-[8px] py-[5px] text-[#173f8e] shadow-sm transition-colors hover:bg-[#edf3ff];
}
.user-menu-panel {
  @apply fixed z-[100] max-h-[calc(100dvh_-_16px)] overflow-y-auto rounded-[10px] border border-[#dce5f3] bg-white p-[6px] text-[#173f8e] shadow-[0_12px_32px_rgba(23,58,106,0.16)];
}
.user-menu-item {
  @apply flex min-h-[44px] w-full items-center gap-[10px] rounded-[6px] px-[12px] py-[10px] text-left text-[14px] font-semibold transition-colors hover:bg-[#edf3ff];
}
.user-menu :is(button,a):focus-visible {
  @apply outline outline-[3px] outline-[#d9b33d] outline-offset-[2px];
}
@media (prefers-reduced-motion: reduce) {
  .user-menu * { @apply transition-none; }
}
</style>
