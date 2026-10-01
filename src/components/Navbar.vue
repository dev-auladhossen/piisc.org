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
  Send,
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
  document.addEventListener("pointerdown", onOutside);
  document.addEventListener("keydown", onEscape);
});
onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onOutside);
  document.removeEventListener("keydown", onEscape);
});
</script>

<template>
  <div class="reference-contact-bar">
    <div class="reference-top-layout">
      <div class="reference-verse">
        <p lang="ar" dir="rtl">اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ</p>
        <p lang="bn">অর্থ: “পড়ো তোমার প্রভুর নামে, যিনি সৃষ্টি করেছেন।”</p>
      </div>
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
        <span> <LanguageSwitcher /></span>
      </div>
    </div>
  </div>
  <header ref="header" class="reference-header">
    <div class="reference-header-inner">
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
            ><span>{{ $tr(" ISLAMIC SCHOOL & COLLEGE (PIISC) ") }}</span>
          </span>
        </div>
      </RouterLink>
      <div class="reference-nav-shell">
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
                {{ $tr(item.label)
                }}<ChevronDown :size="16" aria-hidden="true" />
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
                  <li
                    v-for="child in item.children"
                    :key="child.id || child.to"
                  >
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
          <span>{{ language === "bn" ? "মেনু" : "Menu" }}</span>
          <X v-if="mobileOpen" :size="28" /><Menu v-else :size="28" />
        </button>
      </div>

      <div class="header-actions">
        <RouterLink
          to="/online-admission"
          class="header-capsule apply-capsule"
          @click="closeMenus"
          ><Send :size="25" :stroke-width="1.8" aria-hidden="true" />{{
            $tr(language === "bn" ? "আবেদন" : "Apply Now")
          }}</RouterLink
        >
      </div>
    </div>
  </header>
</template>

<style scoped>
.reference-contact-bar {
  background: linear-gradient(100deg, #102442, #294e9e);
  border-bottom: 2px solid #d9b33d;
  color: white;
  font-family: Inter, Arial, sans-serif;
}
.reference-top-layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 2px 32px;
}
.reference-verse {
  flex-shrink: 0;
}
.reference-verse p {
  margin: 0;
}
.reference-verse p[lang="ar"] {
  width: fit-content;
  font-family:
    "Traditional Arabic", "Noto Naskh Arabic", "Times New Roman", serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
}
.reference-verse p[lang="bn"] {
  color: #f0c54d;
  font-size: 12px;
  line-height: 1.6;
}
.reference-contact-inner {
  min-height: 46px;
  padding: 0;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  column-gap: 24px;
  row-gap: 6px;
  font-size: clamp(13px, 1.05vw, 21px);
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
  font-family: Inter, Arial, sans-serif;
  color: #141414;
}
.reference-header-inner {
  width: 100%;
  min-height: 82px;
  display: flex;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  justify-content: space-between;
  gap: 10px clamp(12px, 1.5vw, 24px);
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
  flex-wrap: nowrap;
  flex-shrink: 0;
  margin-right: clamp(12px, 2vw, 28px);
}
.reference-nav-shell {
  flex: 1 1 0;
  min-width: 0;
  padding: 10px clamp(12px, 1.5vw, 24px);
}
.header-capsule {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 9px 21px;
  border-radius: 10px;
  color: #3b3b3b;
  font-size: 14px;
  font-weight: 800;
  line-height: 1.5;
  white-space: nowrap;
  transition:
    transform 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
}
.admission-capsule {
  background: #bd253e;
}
.apply-capsule {
  gap: 12px;
  min-height: 58px;
  padding: 12px 24px;
  border-radius: 12px;
  background: #dcb532;
  color: #11223b;
  font-size: 20px;
  font-weight: 700;
}
.admission-capsule:hover {
  background: #a51c33;
  box-shadow: 0 5px 15px #bd253e30;
}
.apply-capsule:hover {
  background: #eccd4e;
  box-shadow: 0 5px 15px #294e9e30;
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
  font-family: Newsreader, Georgia, serif;
  font-size: 20px;
  font-weight: 800;
  line-height: 1.1;
  color: #294e9e;
  letter-spacing: 0.025em;
}
.reference-brand-name > span {
  display: block;
  white-space: nowrap;
  margin-top: 4px;
  font-size: 12px;
  letter-spacing: 0.18em;
  line-height: 1.5;
  color: #a77d31;
  font-weight: 700;
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
    gap: 36px;
    padding-inline: 24px;
  }
  .reference-brand {
    flex-basis: 270px;
  }
  .reference-brand img {
    width: 64px;
    height: 64px;
  }
  .reference-nav-list {
    gap: clamp(12px, 1.5vw, 20px);
  }
  .reference-nav-link {
    gap: 6px;
  }
}
@media (max-width: 1199px) {
  .reference-top-layout {
    padding: 6px 16px;
    gap: 16px;
  }
  .reference-top-layout .reference-contact-inner {
    padding: 0;
  }
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
    gap: 34px;
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
    letter-spacing: 0.06em;
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
    grid-template-columns: minmax(0, 1fr);
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
  .reference-top-layout {
    flex-direction: column;
    align-items: stretch;
    padding: 6px 12px;
    gap: 12px;
  }
  .reference-verse {
    text-align: center;
  }
  .reference-verse p[lang="ar"] {
    margin-inline: auto;
  }
  .reference-verse p[lang="bn"] {
    font-size: 13px;
  }
  .reference-top-layout .reference-contact-inner {
    width: 100%;
    margin: 0;
    padding-top: 6px;
    border-top: 1px solid #ffffff25;
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
@media (max-width: 540px) {
  .apply-capsule {
    min-height: 46px;
    padding: 9px 13px;
    gap: 8px;
    font-size: 15px;
  }
  .apply-capsule svg {
    width: 20px;
    height: 20px;
  }
}

@media (min-width: 1200px) {
  .reference-brand {
    flex: 0 0 auto;
    margin-right: clamp(28px, 3vw, 52px);
  }
  .reference-brand-name {
    min-width: max-content;
  }
}
/* Keep the brand, navigation and action in separate spaces at desktop widths. */
@media (min-width: 1400px) {
  .reference-header-inner {
    display: grid;
    grid-template-columns: max-content minmax(0, 1fr) auto;
    gap: clamp(20px, 2vw, 36px);
    padding: 10px clamp(20px, 2vw, 40px);
  }
  .reference-brand {
    grid-column: 1;
    margin-right: 0;
  }
  .reference-nav-shell {
    grid-column: 2;
    padding: 0;
  }
  .reference-nav-list {
    justify-content: space-between;
    gap: clamp(12px, 1.25vw, 24px);
  }
  .reference-nav-link {
    font-size: clamp(13px, 0.83vw, 16px);
    gap: 5px;
  }
  .header-actions {
    grid-column: 3;
    margin-right: 0;
  }
  .apply-capsule {
    min-height: 54px;
    padding: 10px 17px;
    font-size: clamp(16px, 1vw, 19px);
    gap: 9px;
  }
  .apply-capsule svg {
    width: 22px;
    height: 22px;
    flex: none;
  }
}
@media (min-width: 1400px) and (max-width: 1650px) {
  .reference-brand img {
    width: 68px;
    height: 68px;
  }
  .reference-brand-name strong {
    font-size: 17px;
  }
  .reference-brand-name > span {
    font-size: 10px;
    letter-spacing: 0.11em;
  }
}
@media (min-width: 1200px) and (max-width: 1399px) {
  .reference-header-inner {
    display: grid;
    grid-template-columns: max-content minmax(0, 1fr) auto;
    gap: 34px;
    padding: 9px 18px;
  }
  .reference-brand {
    grid-column: 1;
    grid-row: 1;
    margin-right: 0;
  }
  .reference-brand img {
    width: 56px;
    height: 56px;
  }
  .reference-brand-name strong {
    font-size: 20px;
  }
  .reference-brand-name > span {
    font-size: 12.5px;
    letter-spacing: 0.08em;
  }
  .reference-nav-shell {
    grid-column: 2;
    grid-row: 1;
    padding: 0;
  }
  .reference-nav-list {
    justify-content: space-around;
    gap: 7px;
  }
  .reference-nav-link {
    font-size: 14px;
    gap: 6px;
  }
  .reference-nav-link svg {
    width: 16px;
    height: 16px;
  }
  .header-actions {
    grid-column: 3;
    grid-row: 1;
    margin-right: 0;
  }
  .apply-capsule {
    min-height: 45px;
    padding: 8px 11px;
    font-size: 14px;
    gap: 6px;
  }
  .apply-capsule svg {
    width: 18px;
    height: 18px;
    flex: none;
  }
}
@media (max-width: 1199px) {
  .reference-header-inner {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 8px 14px;
  }
  .reference-brand {
    grid-column: 1 / -1;
    grid-row: 1;
  }
  .reference-nav-shell {
    grid-column: 1;
    grid-row: 2;
    justify-content: flex-start;
    padding: 0;
  }
  .reference-menu-toggle {
    width: auto;
    min-width: 96px;
    gap: 10px;
  }
  .header-actions {
    grid-column: 2;
    grid-row: 2;
    width: auto;
    flex: none;
    margin: 0;
  }
  .apply-capsule {
    min-height: 44px;
    padding: 9px 14px;
    gap: 7px;
    font-size: 15px;
  }
  .apply-capsule svg {
    width: 20px;
    height: 20px;
    flex: none;
  }
  .reference-navigation.is-mobile-open {
    flex: 0 0 100%;
  }
}
</style>
