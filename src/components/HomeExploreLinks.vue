<script setup>
import { computed } from "vue";
import { ArrowUpRight, BookOpen, School, Trophy } from "lucide-vue-next";
import { useI18n } from "../composables/useI18n.js";
const { language, t } = useI18n();
const links = computed(() => [
  {
    to: "/gallery",
    title: language.value === "bn" ? "স্কুল জীবন" : "School Life",
    icon: School,
  },
  { to: "/academics", title: t.value.nav.academics, icon: BookOpen },
  {
    to: "/extra-curricular-activities",
    title: language.value === "bn" ? "খেলাধুলা" : "Athletics",
    icon: Trophy,
  },
]);
</script>

<template>
  <nav
    class="home-explore"
    :aria-label="$tr(language === 'bn' ? 'PIISC ঘুরে দেখুন' : 'Explore PIISC')"
  >
    <RouterLink
      v-for="item in links"
      :key="item.to"
      :to="item.to"
      class="home-explore-link"
    >
      <component
        :is="item.icon"
        class="explore-icon"
        :size="54"
        :stroke-width="1.3"
        aria-hidden="true"
      />
      <span class="explore-copy"
        ><strong>{{ $tr(item.title) }}</strong
        ><span>{{ $tr(t.common.learn) }}</span></span
      >
      <ArrowUpRight class="explore-arrow" :size="25" aria-hidden="true" />
    </RouterLink>
  </nav>
</template>

<style scoped>
.home-explore {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.home-explore-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: clamp(18px, 2.5vw, 40px);
  padding: 24px clamp(24px, 3.5vw, 64px);
  background: #294e9e;
  color: #fff;
  isolation: isolate;
}
.home-explore-link:nth-child(2) {
  background: #214485;
}
.home-explore-link:nth-child(3) {
  background: #173969;
}
.home-explore-link::before {
  content: "";
  position: absolute;
  inset: 0;
  background: #ffffff08;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}
.home-explore-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: #e3c88d;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s ease;
}
.explore-icon {
  flex-shrink: 0;
  color: #e3c88d;
  transition: transform 0.3s ease;
}
.explore-copy {
  display: grid;
  gap: 6px;
}
.explore-copy strong {
  font-size: clamp(20px, 1.5vw, 24px);
  line-height: 1.3;
}
.explore-copy > span {
  font-size: 16px;
  color: #e0e9e7;
}
.explore-arrow {
  flex-shrink: 0;
  margin-left: auto;
  opacity: 0.65;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.home-explore-link:is(:hover, :focus-visible)::before {
  opacity: 1;
}
.home-explore-link:is(:hover, :focus-visible)::after {
  transform: scaleX(1);
}
.home-explore-link:is(:hover, :focus-visible) .explore-icon {
  transform: translateY(-4px);
}
.home-explore-link:is(:hover, :focus-visible) .explore-arrow {
  transform: translate(4px, -4px);
  opacity: 1;
}
.home-explore-link:focus-visible {
  outline: 2px solid #e3c88d;
  outline-offset: -8px;
}
@media (max-width: 1000px) {
  .home-explore-link {
    padding: 28px 22px;
    gap: 16px;
    min-height: 145px;
  }
  .explore-icon {
    width: 40px;
  }
  .explore-arrow {
    width: 18px;
  }
}
@media (max-width: 640px) {
  .home-explore {
    grid-template-columns: 1fr;
  }
  .home-explore-link {
    min-height: 116px;
    padding: 25px 28px;
    gap: 24px;
  }
  .explore-copy strong {
    font-size: 22px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .home-explore-link::before,
  .home-explore-link::after,
  .explore-icon,
  .explore-arrow {
    transition: none;
  }
  .home-explore-link:is(:hover, :focus-visible)
    :is(.explore-icon, .explore-arrow) {
    transform: none;
  }
}
</style>
