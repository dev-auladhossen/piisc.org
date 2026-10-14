<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, X, ArrowUpRight } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth.js'
import { menuFor } from '../data/dashboardMenus.js'
import { roleLabels } from '../data/roles.js'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import UserMenu from '../components/UserMenu.vue'

const auth = useAuthStore()
const route = useRoute()
const navigation = computed(() => menuFor(auth.role))
const drawer = ref(null)
const menuButton = ref(null)
const drawerOpen = ref(false)
let previousOverflow
let locked = false
let desktop

function restorePage() {
  drawerOpen.value = false
  if (!locked) return
  document.body.style.overflow = previousOverflow
  locked = false
  if (menuButton.value?.isConnected) menuButton.value.focus({ preventScroll: true })
}
async function openDrawer() {
  if (drawerOpen.value || desktop?.matches) return
  previousOverflow = document.body.style.overflow
  drawer.value.showModal()
  document.body.style.overflow = 'hidden'
  locked = true
  drawerOpen.value = true
  await nextTick()
  drawer.value?.querySelector('.sidebar-link')?.focus()
}
function closeDrawer() {
  drawer.value?.close()
  restorePage()
}
function onBackdrop(event) {
  if (event.target !== drawer.value) return
  const bounds = drawer.value.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
    event.clientY < bounds.top || event.clientY > bounds.bottom) closeDrawer()
}
function onBreakpoint() { if (desktop.matches) closeDrawer() }
watch(() => route.fullPath, closeDrawer)
onMounted(() => {
  desktop = window.matchMedia('(min-width: 1024px)')
  desktop.addEventListener('change', onBreakpoint)
})
onBeforeUnmount(() => {
  desktop?.removeEventListener('change', onBreakpoint)
  closeDrawer()
})
</script>

<template>
  <div class="min-h-screen bg-[#f4f7fc]">
    <a href="#main" class="skip-link">{{ $tr('Skip to content') }}</a>
    <header class="border-b-[3px] border-[#d9b33d] bg-[linear-gradient(100deg,#102442,#294e9e)] text-white shadow-[0_4px_20px_rgba(23,58,106,0.08)]">
      <div class="mx-auto flex max-w-[1600px] min-w-0 flex-wrap items-center justify-between gap-[12px] px-[16px] py-[14px] sm:px-[24px]">
        <RouterLink to="/" class="min-w-0 text-[15px] font-bold leading-[1.5] [overflow-wrap:anywhere] sm:text-[16px]">{{ $tr('Peace International Islamic School & College') }}</RouterLink>
        <div class="flex min-w-0 max-w-full items-center gap-[10px]">
          <button ref="menuButton" type="button" class="drawer-toggle" :aria-label="$tr('Open dashboard menu')" :aria-expanded="drawerOpen" aria-controls="dashboard-drawer" @click="openDrawer"><Menu :size="22" aria-hidden="true" /></button>
          <LanguageSwitcher />
          <UserMenu />
        </div>
      </div>
    </header>

    <div class="mx-auto grid max-w-[1600px] min-w-0 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside class="hidden min-h-[calc(100dvh_-_100px)] flex-col border-r border-[#dce5f3] bg-white p-[16px] lg:flex" :aria-label="$tr('Dashboard menu')">
        <p class="mb-[16px] px-[12px] text-[12px] font-bold uppercase tracking-[0.08em] text-[#60718e]">{{ $tr(roleLabels[auth.role] || 'Dashboard') }}</p>
        <nav :aria-label="$tr('Dashboard menu')" class="space-y-[6px]">
          <template v-for="item in navigation" :key="item.key">
            <span v-if="item.soon" class="sidebar-soon" aria-disabled="true"><component :is="item.icon" :size="18" class="shrink-0" aria-hidden="true" /><span class="min-w-0 flex-1">{{ $tr(item.label) }}</span><span class="soon-badge">{{ $tr('Soon') }}</span></span>
            <RouterLink v-else :to="item.to" class="sidebar-link" active-class="" exact-active-class="is-active" aria-current-value="page"><component :is="item.icon" :size="18" class="shrink-0" aria-hidden="true" />{{ $tr(item.label) }}</RouterLink>
          </template>
        </nav>
        <RouterLink to="/" class="sidebar-link mt-auto border-t border-[#e8edf5] pt-[16px]"><ArrowUpRight :size="18" aria-hidden="true" />{{ $tr('View website') }}</RouterLink>
      </aside>
      <main id="main" class="min-w-0 p-[16px] sm:p-[24px] lg:p-[32px]"><RouterView /></main>
    </div>

    <!-- A native dialog traps focus and makes the background inert on mobile. -->
    <dialog id="dashboard-drawer" ref="drawer" class="dashboard-drawer" aria-labelledby="drawer-heading" @cancel.prevent.stop="closeDrawer" @keydown.esc.stop @close="restorePage" @click="onBackdrop">
      <div class="flex min-h-full flex-col p-[16px]">
        <div class="mb-[20px] flex items-center justify-between gap-[12px]">
          <h2 id="drawer-heading" class="text-[20px] text-[#173f8e]">{{ $tr('Dashboard') }}</h2>
          <button type="button" class="flex h-[44px] w-[44px] items-center justify-center rounded-[6px] text-[#294e9e] hover:bg-[#edf3ff]" :aria-label="$tr('Close dashboard menu')" @click="closeDrawer"><X :size="22" aria-hidden="true" /></button>
        </div>
        <nav :aria-label="$tr('Dashboard menu')" class="space-y-[6px]">
          <template v-for="item in navigation" :key="item.key">
            <span v-if="item.soon" class="sidebar-soon" aria-disabled="true"><component :is="item.icon" :size="18" class="shrink-0" aria-hidden="true" /><span class="min-w-0 flex-1">{{ $tr(item.label) }}</span><span class="soon-badge">{{ $tr('Soon') }}</span></span>
            <RouterLink v-else :to="item.to" class="sidebar-link" active-class="" exact-active-class="is-active" aria-current-value="page" @click="closeDrawer"><component :is="item.icon" :size="18" class="shrink-0" aria-hidden="true" />{{ $tr(item.label) }}</RouterLink>
          </template>
        </nav>
        <RouterLink to="/" class="sidebar-link mt-auto border-t border-[#e8edf5] pt-[16px]" @click="closeDrawer"><ArrowUpRight :size="18" aria-hidden="true" />{{ $tr('View website') }}</RouterLink>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
.drawer-toggle {
  @apply flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[8px] border border-white/30 text-white transition-colors hover:bg-white/10 lg:hidden;
}
.sidebar-link {
  @apply flex min-h-[44px] min-w-0 items-center gap-[10px] rounded-[8px] px-[12px] py-[11px] text-[14px] font-semibold text-[#294e9e] transition-colors hover:bg-[#edf3ff];
}
.sidebar-link.is-active {
  @apply bg-[#294e9e] text-white shadow-sm;
}
.sidebar-soon {
  @apply flex min-h-[44px] min-w-0 items-center gap-[10px] rounded-[8px] px-[12px] py-[11px] text-[14px] text-[#718198];
}
.soon-badge {
  @apply shrink-0 rounded-full bg-[#f7f3e8] px-[7px] py-[3px] text-[10px] font-bold text-[#8a6618];
}
.dashboard-drawer {
  @apply fixed inset-y-0 left-0 right-auto m-0 h-[100dvh] max-h-none w-[min(280px,calc(100%_-_32px))] max-w-none overflow-y-auto border-0 bg-white p-0 shadow-[0_12px_40px_rgba(23,58,106,0.22)];
}
.dashboard-drawer::backdrop {
  @apply bg-[rgba(21,27,38,0.60)] backdrop-blur-[2px];
}
:is(button,a):focus-visible {
  @apply outline outline-[3px] outline-[#d9b33d] outline-offset-[3px];
}
@media (prefers-reduced-motion: no-preference) {
  .dashboard-drawer[open] { animation: drawer-enter 180ms ease-out; }
}
@media (prefers-reduced-motion: reduce) {
  :is(button,a) { @apply transition-none; }
}
@keyframes drawer-enter {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
</style>