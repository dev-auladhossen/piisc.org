<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import { useRoute } from "vue-router";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Menu,
  MessageCircle,
  X,
  Youtube,
} from "lucide-vue-next";
import { images } from "../data/content.js";
import { headerContacts, navigation } from "../data/navigation.js";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import { useI18n } from "../composables/useI18n.js";
import { navigationBn } from "../data/navigationBn.js";
const { language, t } = useI18n();
const localizedNavigation = computed(() => {
  const translate = (item) => ({
    ...item,
    label:
      language.value === "bn"
        ? navigationBn[item.label] || item.label
        : item.label,
    ...(item.children ? { children: item.children.map(translate) } : {}),
  });
  return navigation.map(translate);
});
const route = useRoute();
const header = ref(null);
const headerTop = ref(null);
const headerTopHeight = ref(0);
let headerObserver;
const mobileOpen = ref(false);
const expanded = ref(null);
const socialIcons = {
  whatsapp: MessageCircle,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
};
const active = (item) =>
  item.to === "/"
    ? route.path === "/"
    : item.children
      ? item.children.some(active)
      : route.path === item.to;
function closeMenus() {
  expanded.value = null;
  mobileOpen.value = false;
  header.value?.querySelectorAll("details[open]").forEach((menu) => {
    menu.open = false;
  });
}
watch(() => route.fullPath, closeMenus);
function onOutside(event) {
  if (!header.value?.contains(event.target)) closeMenus();
}
function onEscape(event) {
  if (event.key !== "Escape") return;
  if (expanded.value) {
    const trigger = header.value.querySelector(
      `[aria-controls="dropdown-${expanded.value}"]`,
    );
    expanded.value = null;
    trigger?.focus();
  } else if (mobileOpen.value) {
    mobileOpen.value = false;
    header.value.querySelector(".reference-menu-toggle")?.focus();
  }
}
async function focusDropdown(item) {
  expanded.value = item.id;
  await nextTick();
  document.getElementById(`dropdown-${item.id}`)?.querySelector("a")?.focus();
}
function hover(item, event) {
  if (
    event.pointerType === "mouse" &&
    window.matchMedia("(min-width: 1200px)").matches
  )
    expanded.value = item.children ? item.id : null;
}
function leave(item, event) {
  if (
    event.pointerType === "mouse" &&
    window.matchMedia("(min-width: 1200px)").matches &&
    expanded.value === item.id
  )
    expanded.value = null;
}
function focusOut(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) expanded.value = null;
}
onMounted(() => {
  headerObserver = new ResizeObserver(() => {
    headerTopHeight.value =
      headerTop.value?.getBoundingClientRect().height || 0;
  });
  headerObserver.observe(headerTop.value);
  document.addEventListener("pointerdown", onOutside);
  document.addEventListener("keydown", onEscape);
});
onBeforeUnmount(() => {
  headerObserver?.disconnect();
  document.removeEventListener("pointerdown", onOutside);
  document.removeEventListener("keydown", onEscape);
});
</script>

<template>
  <div class="reference-contact-bar">
    <div class="reference-contact-inner">
      <span
        ><strong>{{ $tr(t.contact.phone) }}:</strong>
        <a
          v-if="headerContacts.phone"
          :href="`tel:${headerContacts.phone.replace(/\s/g, '')}`"
          >{{ $tr(headerContacts.phone) }}</a
        ><span v-else>{{ $tr("Coming soon") }}</span></span
      >
      <span
        ><strong>{{ $tr(t.contact.email) }}:</strong>
        <a
          v-if="headerContacts.email"
          :href="`mailto:${headerContacts.email}`"
          >{{ $tr(headerContacts.email) }}</a
        ><span v-else>{{ $tr("Coming soon") }}</span></span
      >
      <span
        ><strong>{{ $tr("EIIN:") }}</strong>
        {{ $tr(headerContacts.eiin || "Coming soon") }}</span
      >
      <div class="reference-socials" :aria-label="$tr('Social media')">
        <template v-for="(icon, name) in socialIcons" :key="name">
          <a
            v-if="headerContacts.socials[name]"
            :href="headerContacts.socials[name]"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="$tr(`PIISC on ${name}`)"
            ><component :is="icon" :size="16" aria-hidden="true"
          /></a>
          <span
            v-else
            class="social-unavailable cursor-pointer"
            :aria-label="$tr(`${name}: coming soon`)"
            :title="$tr(`${name}: coming soon`)"
            ><component :is="icon" :size="16" aria-hidden="true"
          /></span>
        </template>
      </div>
    </div>
  </div>
  <header
    ref="header"
    class="reference-header"
    :style="{ top: `-${headerTopHeight}px` }"
  >
    <div ref="headerTop" class="reference-header-inner">
      <RouterLink
        to="/"
        class="reference-brand"
        :aria-label="$tr('Peace International Islamic School and College home')"
        @click="closeMenus"
      >
        <div class="reference-brand-main">
          <img
            :src="images.logo"
            :alt="$tr('PIISC school emblem')"
            width="86"
            height="86"
          />
          <span class="reference-brand-name"
            ><strong>{{ $tr("PEACE INTERNATIONAL") }} </strong
            ><span
              >{{ $tr(" ISLAMIC SCHOOL & COLLEGE (PIISC) ")
              }}</span
            >
            <small>{{
              $tr("EST.2026 | Ashulia, Savar, Dhaka-1349 ")
            }}</small></span
          >
        </div>
      </RouterLink>
      <div class="header-actions">
        <RouterLink
          to="/online-admission"
          class="header-capsule admission-capsule"
          @click="closeMenus"
          >{{
            $tr(language === "bn" ? "অনলাইন ভর্তি" : "Online Admission")
          }}</RouterLink
        >
        <RouterLink
          to="/recruitment"
          class="header-capsule recruitment-capsule"
          @click="closeMenus"
          >{{ $tr(language === "bn" ? "নিয়োগ" : "Recruitment") }}</RouterLink
        >
        <LanguageSwitcher />
      </div>
    </div>
    <div class="reference-nav-shell">
      <button
        class="reference-menu-toggle"
        type="button"
        :aria-expanded="mobileOpen"
        aria-controls="primary-navigation"
        :aria-label="$tr(mobileOpen ? 'Close navigation' : 'Open navigation')"
        @click="
          mobileOpen = !mobileOpen;
          expanded = null;
        "
      >
        <span>{{ language === 'bn' ? 'মেনু' : 'Menu' }}</span>
        <X v-if="mobileOpen" :size="28" /><Menu v-else :size="28" />
      </button>
      <nav
        id="primary-navigation"
        class="reference-navigation"
        :class="{ 'is-mobile-open': mobileOpen }"
        :aria-label="$tr('Main navigation')"
      >
        <ul class="reference-nav-list">
          <li
            v-for="item in localizedNavigation"
            :key="item.id"
            class="reference-nav-item"
            @pointerenter="hover(item, $event)"
            @pointerleave="leave(item, $event)"
            @focusout="focusOut"
          >
            <button
              v-if="item.children"
              type="button"
              class="reference-nav-link"
              :class="{
                'is-active': active(item),
                'is-expanded': expanded === item.id,
              }"
              :aria-expanded="expanded === item.id"
              :aria-controls="`dropdown-${item.id}`"
              @click="expanded = expanded === item.id ? null : item.id"
              @keydown.down.prevent="focusDropdown(item)"
            >
              {{ $tr(item.label) }}<ChevronDown :size="16" aria-hidden="true" />
            </button>
            <RouterLink
              v-else
              :to="item.to"
              class="reference-nav-link"
              :class="{ 'is-active': active(item) }"
              @click="closeMenus"
              >{{ $tr(item.label) }}</RouterLink
            >
            <Transition name="reference-dropdown">
              <ul
                v-if="item.children"
                v-show="expanded === item.id"
                :id="`dropdown-${item.id}`"
                class="reference-dropdown-panel"
              >
                <li v-for="child in item.children" :key="child.id || child.to">
                  <details v-if="child.children" class="reference-submenu">
                    <summary :class="{ 'is-active': active(child) }">
                      {{ $tr(child.label)
                      }}<ChevronDown :size="16" aria-hidden="true" />
                    </summary>
                    <ul>
                      <li v-for="edition in child.children" :key="edition.to">
                        <RouterLink :to="edition.to" @click="closeMenus">{{
                          $tr(edition.label)
                        }}</RouterLink>
                      </li>
                    </ul>
                  </details>
                  <RouterLink v-else :to="child.to" @click="closeMenus">{{
                    $tr(child.label)
                  }}</RouterLink>
                </li>
              </ul>
            </Transition>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.reference-contact-bar {
  background: #303657;
  color: white;
  font-family: Raleway, Arial, sans-serif;
}
.reference-contact-inner {
  min-height: 46px;
  padding: 8px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 38px;
  row-gap: 6px;
  font-size: clamp(13px, 1.15vw, 21px);
  line-height: 1.4;
}
.reference-contact-inner strong {
  font-weight: 700;
  margin-right: 4px;
}
.reference-contact-inner a:hover {
  text-decoration: underline;
}
.reference-socials {
  display: flex;
  align-items: center;
  gap: 12px;
}
.reference-socials a,
.social-unavailable {
  display: inline-flex;
  gap: 10px;
}
.reference-header {
  position: sticky;
  top: 0;
  z-index: 60;
  background: #fff;
  border-bottom: 1px solid #ececec;
  font-family: Raleway, Arial, sans-serif;
  color: #141414;
}
.reference-header-inner {
  width: 100%;
  min-height: 112px;
  padding: 20px clamp(24px, 2.6vw, 50px);
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  justify-content: space-between;
  gap: 10px clamp(24px, 4.5vw, 86px);
}
.reference-brand {
  grid-column: 1;
  grid-row: 1;
}
.header-actions {
  grid-column: 2;
  grid-row: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  flex-wrap: wrap;
}
.reference-nav-shell {
  border-top: 1px solid #e6eaf0;
  padding: 10px clamp(24px, 2.6vw, 50px);
}
.header-capsule {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 9px 21px;
  border-radius: 10px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
  transition:
    transform 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
}
.admission-capsule {
  background: #bd253e;
}
.recruitment-capsule {
  background: #0e5b4a;
}
.admission-capsule:hover {
  background: #a51c33;
  box-shadow: 0 5px 15px #bd253e30;
}
.recruitment-capsule:hover {
  background: #094637;
  box-shadow: 0 5px 15px #0e5b4a30;
}
.header-capsule:is(:hover, :focus-visible) {
  transform: translateY(-2px);
}
.header-capsule:focus-visible {
  outline: 2px solid #bb9952;
  outline-offset: 3px;
}
.header-capsule.router-link-exact-active {
  box-shadow: 0 0 0 3px #bb99524a;
}
.reference-brand {
  flex: 0 0 250px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.reference-brand-main {
  display: flex;
  align-items: center;
  gap: 12px;
}
.reference-brand img {
  width: 86px;
  height: 86px;
  object-fit: contain;
}
.reference-brand-name {
  display: block;
}
.reference-brand-name strong {
  display: block;
  font-family: Georgia, serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.1;
  color: #303657;
  letter-spacing: 0.025em;
}
.reference-brand-name > span {
  display: block;
  white-space: nowrap;
  margin-top: 4px;
  font-size: 14px;
  letter-spacing: 0.18em;
  line-height: 1.5;
  color: #a77d31;
  font-weight: 600;
}
.reference-brand-name small {
  display: block;
  color: #303657;
  font-size: 10px;
  letter-spacing: 0.23em;
}

.reference-navigation {
  flex: 1;
  min-width: 0;
}
.reference-nav-list {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(24px, 3vw, 50px);
  margin: 0;
  padding: 0;
  list-style: none;
}
.reference-nav-item {
  position: relative;
}
.reference-nav-link,
.reference-dropdown-panel a,
.reference-submenu summary {
  margin: 0;
  font-size: clamp(13px, 1.08vw, 20px);
  font-weight: 600;
  line-height: 1.5;
}
.reference-nav-link {
  min-height: 50px;
  padding: 10px 0;
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 0;
  background: transparent;
  color: #202020;
  white-space: nowrap;
  transition: color 0.2s;
}
.reference-nav-link:hover,
.reference-nav-link.is-active,
.reference-nav-link.is-expanded {
  color: #007bff;
}
.reference-nav-link svg {
  transition: transform 0.24s ease;
}
.reference-nav-link.is-expanded svg {
  transform: rotate(180deg);
}
.reference-nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: -8px;
  right: -8px;
  height: 3px;
  background: #007bff;
  transform: scaleX(0);
  transition: transform 0.24s ease;
  z-index: 2;
}
.reference-nav-link:hover::after,
.reference-nav-link:focus-visible::after,
.reference-nav-link.is-expanded::after {
  transform: scaleX(1);
}
.reference-dropdown-panel {
  position: absolute;
  left: 0;
  top: 100%;
  z-index: 3;
  width: 280px;
  max-width: calc(100vw - 32px);
  margin: 0;
  padding: 5px;
  list-style: none;
  background: white;
  border: 1px solid #007bff;
  max-height: calc(100dvh - 220px);
  overflow-y: auto;
  box-shadow: 0 8px 18px #00000012;
  transform-origin: top center;
}
.reference-dropdown-panel a,
.reference-submenu summary {
  display: block;
  min-height: 0;
  padding: 9px 12px;
  white-space: normal;
  overflow-wrap: anywhere;
  border-radius: 3px;
  color: #151515;
  transition:
    color 0.18s,
    background 0.18s;
}
.reference-dropdown-panel a:hover,
.reference-dropdown-panel a:focus-visible,
.reference-dropdown-panel a.router-link-exact-active {
  color: #007bff;
  background: #fafbfc;
}
.reference-dropdown-panel > li + li {
  border-top: 1px solid #e5e5e5;
}
.reference-nav-item:last-child .reference-dropdown-panel {
  left: auto;
  right: 0;
}
.reference-submenu summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  list-style: none;
}
.reference-submenu summary::-webkit-details-marker {
  display: none;
}
.reference-submenu summary:hover,
.reference-submenu summary.is-active {
  color: #007bff;
  background: #fafbfc;
}
.reference-submenu summary svg {
  flex-shrink: 0;
  transition: transform 0.24s ease;
}
.reference-submenu[open] summary svg {
  transform: rotate(180deg);
}
.reference-submenu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  background: #f5f8fc;
}
.reference-submenu ul a {
  padding-left: 24px;
}
.reference-dropdown-enter-active,
.reference-dropdown-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}
.reference-dropdown-enter-from,
.reference-dropdown-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.reference-menu-toggle,
.reference-mobile-language {
  display: none;
}
@media (min-width: 1200px) and (max-width: 1450px) {
  .reference-header-inner {
    gap: 22px;
    padding-inline: 24px;
  }
  .reference-brand {
    flex-basis: 270px;
  }
  .reference-brand img {
    width: 72px;
    height: 72px;
  }
  .reference-nav-list {
    gap: 2rem;
  }
  .reference-nav-link {
    gap: 6px;
  }
}
@media (max-width: 1199px) {
  .reference-nav-shell {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    padding: 8px 24px;
  }
  .reference-contact-inner {
    column-gap: 20px;
    font-size: 13px;
    padding: 9px 20px;
  }
  .reference-header-inner {
    min-height: 112px;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    padding: 14px 24px;
    gap: 14px;
  }
  .reference-brand {
    grid-column: 1;
    grid-row: 1;
    order: 1;
  }
  .reference-menu-toggle {
    order: 2;
  }
  .header-actions {
    grid-column: 1;
    grid-row: 2;
    order: 3;
    flex: 0 0 100%;
    justify-content: flex-end;
    margin-top: 0;
    gap: 8px;
  }
  .reference-navigation {
    order: 4;
  }
  .reference-brand {
    flex: 1 1 100%;
    min-width: 0;
  }
  .reference-brand-name {
    min-width: 0;
  }
  .reference-brand-name > span {
    white-space: normal;
  }
  .reference-brand-name small {
    letter-spacing: .06em;
    line-height: 1.6;
  }
  .reference-brand img {
    width: 65px;
    height: 65px;
  }
  .reference-menu-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 44px;
    padding: 0 8px;
    border: 0;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    color: #303657;
    background: white;
  }
  .reference-navigation {
    display: none;
    flex: 0 0 100%;
    max-height: calc(100dvh - 80px);
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  .reference-navigation.is-mobile-open {
    display: block;
    padding-top: 18px;
  }
  .reference-nav-list {
    display: block;
  }
  .reference-nav-item {
    border-top: 1px solid #eee;
  }
  .reference-nav-link {
    width: 100%;
    justify-content: space-between;
    padding: 13px 8px;
  }
  .reference-nav-link,
  .reference-dropdown-panel a,
  .reference-submenu summary {
    font-size: 16px;
  }
  .reference-dropdown-panel {
    position: static;
    max-height: none;
    width: 100%;
    box-shadow: none;
    border-top-width: 2px;
    background: #fafafa;
  }
  .reference-mobile-language {
    display: block;
    padding-block: 10px;
  }
}
@media (max-width: 540px) {
  .header-actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
    gap: 10px;
  }
  .header-actions :deep(.language-options) {
    grid-column: 1 / -1;
    justify-self: center;
  }
  .header-actions :deep(.language-options button) {
    min-height: 40px;
    min-width: 76px;
  }
  .header-capsule {
    font-size: 12px;
    min-height: 44px;
    padding: 9px 8px;
  }
  .reference-contact-inner {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 6px 14px;
    font-size: 11px;
    padding: 9px 12px;
  }
  .reference-contact-inner > span:nth-child(-n + 2) {
    grid-column: 1 / -1;
    text-align: center;
    overflow-wrap: anywhere;
  }
  .reference-socials {
    gap: 12px;
  }
  .reference-socials svg {
    width: 17px;
    height: 17px;
  }
  .reference-header-inner {
    padding: 16px 12px;
  }
  .reference-nav-shell {
    padding: 6px 12px;
  }
  .reference-brand {
    width: 100%;
    min-width: 0;
  }
  .reference-brand-main {
    display: grid;
    grid-template-columns: 56px minmax(0, 1fr);
    gap: 10px;
  }
  .reference-brand img {
    width: 56px;
    height: 56px;
    flex-shrink: 0;
  }
  .reference-brand-name > span {
    font-size: clamp(9px, 2.3vw, 12px);
    letter-spacing: 0.025em;
  }
  .reference-brand-name small {
    font-size: 9px;
    margin-top: 3px;
  }
  .reference-brand-name strong {
    font-size: clamp(16px, 4.2vw, 22px);
    line-height: 1.2;
    letter-spacing: 0;
  }
  .reference-brand-motto {
    font-size: 6.5px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .header-capsule {
    transition: none;
  }
  .header-capsule:is(:hover, :focus-visible) {
    transform: none;
  }
  .reference-dropdown-enter-active,
  .reference-dropdown-leave-active,
  .reference-nav-link,
  .reference-nav-link svg,
  .reference-nav-link::after {
    transition: none;
  }
}
</style>
