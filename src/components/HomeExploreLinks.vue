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
    class="home-explore [&&]:grid [@media(max-width:640px)]:[&&]:grid-cols-[1fr] [@media(width>640px)]:[&&]:grid-cols-[repeat(3,_minmax(0px,_1fr))]"
    :aria-label="$tr(language === 'bn' ? 'PIISC ঘুরে দেখুন' : 'Explore PIISC')"
  >
    <RouterLink
      v-for="item in links"
      :key="item.to"
      :to="item.to"
      class="home-explore-link [&&]:relative [&&]:isolate [&&]:flex [&&]:items-center [@media(max-width:640px)]:[&&]:gap-x-[24px] [@media(width>640px)_and_(max-width:1000px)]:[&&]:gap-x-[16px] [@media(width>1000px)]:[&&]:gap-x-[clamp(18px,_2.5vw,_40px)] [@media(max-width:640px)]:[&&]:gap-y-[24px] [@media(width>640px)_and_(max-width:1000px)]:[&&]:gap-y-[16px] [@media(width>1000px)]:[&&]:gap-y-[clamp(18px,_2.5vw,_40px)] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(41,_78,_158)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(255,_255,_255)] [@media(max-width:640px)]:[&&]:min-h-[116px] [@media(width>640px)_and_(max-width:1000px)]:[&&]:min-h-[145px] [@media(max-width:640px)]:[&&]:p-[25px_28px] [@media(width>640px)_and_(max-width:1000px)]:[&&]:p-[28px_22px] [@media(width>1000px)]:[&&]:p-[24px_clamp(24px,_3.5vw,_64px)] [&.home-explore-link:nth-child(2)]:[background-color:rgb(33,_68,_133)] [&.home-explore-link:nth-child(3)]:[background-color:rgb(23,_57,_105)] [&.home-explore-link::before]:absolute [&.home-explore-link::before]:bottom-[0px] [&.home-explore-link::before]:left-[0px] [&.home-explore-link::before]:right-[0px] [&.home-explore-link::before]:top-[0px] [&.home-explore-link::before]:z-[-1] [&.home-explore-link::before]:opacity-[0] [&.home-explore-link::before]:[background-attachment:initial] [&.home-explore-link::before]:[background-clip:initial] [&.home-explore-link::before]:[background-color:rgba(255,_255,_255,_0.03)] [&.home-explore-link::before]:[background-image:initial] [&.home-explore-link::before]:[background-origin:initial] [&.home-explore-link::before]:[background-position:initial] [&.home-explore-link::before]:[background-repeat:initial] [&.home-explore-link::before]:[background-size:initial] [&.home-explore-link::before]:[content:''] [&.home-explore-link::before]:[transition-behavior:normal] [&.home-explore-link::before]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&.home-explore-link::before]:[transition-duration:0.3s] [@media(prefers-reduced-motion:reduce)]:[&.home-explore-link::before]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&.home-explore-link::before]:[transition-property:opacity] [@media(prefers-reduced-motion:reduce)]:[&.home-explore-link::before]:[transition-property:none] [&.home-explore-link::before]:[transition-timing-function:ease] [&.home-explore-link::after]:absolute [&.home-explore-link::after]:bottom-[0px] [&.home-explore-link::after]:left-[0px] [&.home-explore-link::after]:h-[4px] [&.home-explore-link::after]:w-[100%] [&.home-explore-link::after]:[background-attachment:initial] [&.home-explore-link::after]:[background-clip:initial] [&.home-explore-link::after]:[background-color:rgb(227,_200,_141)] [&.home-explore-link::after]:[background-image:initial] [&.home-explore-link::after]:[background-origin:initial] [&.home-explore-link::after]:[background-position:initial] [&.home-explore-link::after]:[background-repeat:initial] [&.home-explore-link::after]:[background-size:initial] [&.home-explore-link::after]:[content:''] [&.home-explore-link::after]:[transform:scaleX(0)] [&.home-explore-link::after]:[transform-origin:left_center] [&.home-explore-link::after]:[transition-behavior:normal] [&.home-explore-link::after]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&.home-explore-link::after]:[transition-duration:0.35s] [@media(prefers-reduced-motion:reduce)]:[&.home-explore-link::after]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&.home-explore-link::after]:[transition-property:transform] [@media(prefers-reduced-motion:reduce)]:[&.home-explore-link::after]:[transition-property:none] [&.home-explore-link::after]:[transition-timing-function:ease] [&.home-explore-link:is(:hover,_:focus-visible)::before]:opacity-[1] [&.home-explore-link:is(:hover,_:focus-visible)::after]:[transform:scaleX(1)] [&.home-explore-link:focus-visible]:[outline-color:rgb(227,_200,_141)] [&.home-explore-link:focus-visible]:[outline-style:solid] [&.home-explore-link:focus-visible]:[outline-width:2px] [&.home-explore-link:focus-visible]:[outline-offset:-8px]"
    >
      <component
        :is="item.icon"
        class="explore-icon [&&]:[flex-shrink:0] [&&]:[color:rgb(227,_200,_141)] [&&]:[transition-behavior:normal] [&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.3s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:transform] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [&&]:[transition-timing-function:ease] [@media(max-width:1000px)]:[&&]:w-[40px] [.home-explore-link:is(:hover,_:focus-visible)_&.explore-icon]:[transform:translateY(-4px)] [@media(prefers-reduced-motion:reduce)]:[.home-explore-link:is(:hover,_:focus-visible)_&:is(.explore-icon,_.explore-arrow)]:[transform:none]"
        :size="54"
        :stroke-width="1.3"
        aria-hidden="true"
      />
      <span class="explore-copy [&&]:grid [&&]:gap-x-[6px] [&&]:gap-y-[6px]"
        ><strong class="[@media(max-width:640px)]:[&&]:[font-size:22px] [@media(width>640px)]:[&&]:[font-size:clamp(20px,_1.5vw,_24px)] [&&]:leading-[1.3]">{{ $tr(item.title) }}</strong
        ><span class="[&&]:[color:rgb(224,_233,_231)] [&&]:[font-size:16px]">{{ $tr(t.common.learn) }}</span></span
      >
      <ArrowUpRight class="explore-arrow [&&]:ml-[auto] [&&]:[flex-shrink:0] [&&]:opacity-[0.65] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-behavior:normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-delay:0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.3s,_0.3s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:transform,_opacity] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-timing-function:ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-timing-function:ease] [@media(max-width:1000px)]:[&&]:w-[18px] [.home-explore-link:is(:hover,_:focus-visible)_&.explore-arrow]:opacity-[1] [.home-explore-link:is(:hover,_:focus-visible)_&.explore-arrow]:[transform:translate(4px,_-4px)] [@media(prefers-reduced-motion:reduce)]:[.home-explore-link:is(:hover,_:focus-visible)_&:is(.explore-icon,_.explore-arrow)]:[transform:none]" :size="25" aria-hidden="true" />
    </RouterLink>
  </nav>
</template>
