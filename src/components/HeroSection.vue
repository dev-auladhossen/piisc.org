<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-vue-next";
import classroom from "../assets/images/creative-4.jpg";
import creativity from "../assets/images/creative-2.jpg";
import achievement from "../assets/images/achievement.jpg";
import sports from "../assets/images/beyond-class.jpg";
import community from "../assets/images/gurdians-2.jpg";
import tiffin from "../assets/images/tiffin-time.jpg";
import orientation from "../assets/images/orientation.jpg";
import groupWork from "../assets/images/group-work.jpg";
import funtime from "../assets/images/funtime.jpg";
const slides = [
  {
    image: classroom,
    title: "A place to learn. A space to grow.",
    label: "Learning at PIISC",
    alt: "Students learning in a bright PIISC classroom",
  },
  {
    image: creativity,
    title: "Small discoveries. Bright possibilities.",
    label: "Creativity & discovery",
    alt: "Students displaying their colourful classroom projects",
  },
  {
    image: achievement,
    title: "Celebrating every step forward.",
    label: "Student achievement",
    alt: "A student receiving an award at school",
  },
  {
    image: sports,
    title: "Growing stronger, together.",
    label: "Beyond the classroom",
    alt: "Students playing cricket in the indoor sports area",
  },
  {
    image: community,
    title: "Rooted in faith. United in learning.",
    label: "Our school community",
    alt: "Students and teachers gathered for a school programme",
  },
  {
    image: orientation,
    title: "Starting your journey with confidence.",
    label: "Orientation",
    alt: "New students participating in an orientation session",
  },
  {
    image: groupWork,
    title: "Collaboration in action.",
    label: "Group work",
    alt: "Students working together on a project",
  },
  {
    image: tiffin,
    title: "A moment to recharge and connect.",
    label: "Tiffin time",
    alt: "Students enjoying their tiffin in the school cafeteria",
  },
  {
    image: funtime,
    title: "Fun and learning go hand in hand.",
    label: "Fun time",
    alt: "Students having fun during a school activity",
  },
];
const current = ref(0);
const paused = ref(false);
const focused = ref(false);
const hidden = ref(false);
const reducedMotion = ref(false);
const running = computed(
  () =>
    !paused.value && !focused.value && !hidden.value && !reducedMotion.value,
);
let timer;
let motionQuery;
function restart() {
  clearInterval(timer);
  if (running.value) timer = setInterval(() => goTo(current.value + 1), 3500);
}
function goTo(index) {
  current.value = (index + slides.length) % slides.length;
  restart();
}
function updateMotion() {
  reducedMotion.value = motionQuery.matches;
}
function updateVisibility() {
  hidden.value = document.hidden;
}
function onFocusOut(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) focused.value = false;
}
watch(running, restart);
onMounted(() => {
  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  updateMotion();
  updateVisibility();
  motionQuery.addEventListener("change", updateMotion);
  document.addEventListener("visibilitychange", updateVisibility);
  restart();
  slides.slice(1).forEach((slide) => {
    const image = new Image();
    image.src = slide.image;
  });
});
onBeforeUnmount(() => {
  clearInterval(timer);
  motionQuery?.removeEventListener("change", updateMotion);
  document.removeEventListener("visibilitychange", updateVisibility);
});
</script>

<template>
  <section
    class="school-hero [&&]:relative [&&]:isolate [@media(max-width:640px)]:[&&]:min-h-[600px] [@media(width>640px)_and_(width<641px)_and_(max-height:760px)]:[&&]:min-h-[clamp(520px,_36vw,_650px)] [@media(min-width:641px)_and_(max-height:760px)]:[&&]:min-h-[560px] [@media(width>640px)_and_(height>760px)]:[&&]:min-h-[clamp(520px,_36vw,_650px)] [&&]:w-[100%] [&&]:overflow-x-hidden [&&]:overflow-y-hidden [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(23,_42,_39)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:white]"
    :class="{ 'is-paused': !running }"
    :aria-label="$tr('Life at PIISC')"
    aria-roledescription="carousel"
    @focusin="focused = true"
    @focusout="onFocusOut"
    @keydown.left.prevent="goTo(current - 1)"
    @keydown.right.prevent="goTo(current + 1)"
  >
    <TransitionGroup name="hero-fade" tag="div" class="hero-stage [&&]:absolute [&&]:bottom-[0px] [&&]:left-[0px] [&&]:right-[0px] [&&]:top-[0px] [&&]:z-[-1]">
      <article
        v-for="index in [current]"
        :key="index"
        class="school-slide [&&]:absolute [&&]:bottom-[0px] [&&]:left-[0px] [&&]:right-[0px] [&&]:top-[0px] [&&]:overflow-x-hidden [&&]:overflow-y-hidden [&.hero-fade-enter-active]:[transition-behavior:normal] [&.hero-fade-enter-active]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&.hero-fade-enter-active]:[transition-duration:1.2s] [@media(prefers-reduced-motion:reduce)]:[&.hero-fade-enter-active]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&.hero-fade-enter-active]:[transition-property:opacity] [@media(prefers-reduced-motion:reduce)]:[&.hero-fade-enter-active]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&.hero-fade-enter-active]:[transition-timing-function:ease-in-out] [@media(prefers-reduced-motion:reduce)]:[&.hero-fade-enter-active]:[transition-timing-function:ease] [&.hero-fade-enter-active]:z-[1] [&.hero-fade-leave-active]:[transition-behavior:normal] [&.hero-fade-leave-active]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&.hero-fade-leave-active]:[transition-duration:1.2s] [@media(prefers-reduced-motion:reduce)]:[&.hero-fade-leave-active]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&.hero-fade-leave-active]:[transition-property:opacity] [@media(prefers-reduced-motion:reduce)]:[&.hero-fade-leave-active]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&.hero-fade-leave-active]:[transition-timing-function:ease-in-out] [@media(prefers-reduced-motion:reduce)]:[&.hero-fade-leave-active]:[transition-timing-function:ease] [&.hero-fade-enter-from]:opacity-[0] [&.hero-fade-leave-to]:opacity-[0]"
        role="group"
        aria-roledescription="slide"
        :aria-label="
          $tr(`${index + 1} of ${slides.length}: ${slides[index].label}`)
        "
      >
        <img
          class="school-slide-image [&&]:h-[100%] [&&]:w-[100%] [&&]:object-cover [&&]:[animation-delay:0s] [&&]:[animation-direction:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[animation-duration:8s] [@media(prefers-reduced-motion:reduce)]:[&&]:[animation-duration:auto] [@media(prefers-reduced-motion:no-preference)]:[&&]:[animation-fill-mode:both] [@media(prefers-reduced-motion:reduce)]:[&&]:[animation-fill-mode:none] [&&]:[animation-iteration-count:1] [@media(prefers-reduced-motion:no-preference)]:[&&]:[animation-name:school-zoom] [@media(prefers-reduced-motion:reduce)]:[&&]:[animation-name:none] [&&]:[animation-play-state:running] [&&]:[animation-range-end:normal] [&&]:[animation-range-start:normal] [&&]:[animation-timeline:auto] [@media(prefers-reduced-motion:no-preference)]:[&&]:[animation-timing-function:linear] [@media(prefers-reduced-motion:reduce)]:[&&]:[animation-timing-function:ease] [&&]:[object-position:center_45%] [.is-paused_&.school-slide-image]:[animation-play-state:paused]"
          :src="slides[index].image"
          :alt="$tr(slides[index].alt)"
          :fetchpriority="index === 0 ? 'high' : 'auto'"
        />
        <div class="school-slide-shade [&&]:absolute [&&]:bottom-[0px] [&&]:left-[0px] [&&]:right-[0px] [&&]:top-[0px] [&&]:[background-attachment:initial,_initial] [&&]:[background-clip:initial,_initial] [&&]:[background-color:initial] [&&]:[background-image:linear-gradient(90deg,_rgba(8,_23,_35,_0.88)_0%,_rgba(26,_65,_97,_0.67)_48%,_rgba(8,_23,_35,_0.18)_100%),_linear-gradient(transparent_42%,_rgba(8,_23,_24,_0.58)_100%)] [&&]:[background-origin:initial,_initial] [&&]:[background-repeat:initial,_initial] [&&]:[background-size:initial,_initial]"></div>
      </article>
    </TransitionGroup>
    <div class="hero-content [&&]:relative [&&]:grid [&&]:w-[min(86%,_1320px)] [@media(max-width:640px)]:[&&]:gap-x-[24px] [@media(width>640px)]:[&&]:gap-x-[28px] [@media(max-width:640px)]:[&&]:gap-y-[24px] [@media(width>640px)]:[&&]:gap-y-[28px] [&&]:[margin-inline-end:auto] [&&]:[margin-inline-start:auto] [@media(max-width:640px)]:[&&]:[padding-block-end:140px] [@media(width>640px)]:[&&]:[padding-block-end:170px] [@media(max-width:640px)]:[&&]:[padding-block-start:40px] [@media(width>640px)]:[&&]:[padding-block-start:clamp(34px,_5vw,_74px)]">
    <div class="hero-identity [&&]:z-[2] [@media(max-width:640px)]:[&&]:top-[40px] [@media(min-width:641px)_and_(max-height:760px)]:[&&]:top-[70px] [@media(max-width:640px)]:[&&]:left-[7%] [@media(max-width:640px)]:[&&]:right-[7%]">
      <p class="school-established [&&]:[color:rgb(231,_189,_53)] [@media(max-width:640px)]:[&&]:[font-size:9px] [@media(width>640px)]:[&&]:[font-size:clamp(11px,_1vw,_15px)] [&&]:font-[900] [&&]:uppercase [@media(max-width:640px)]:[&&]:tracking-[0.14em] [@media(width>640px)]:[&&]:tracking-[0.22em] [@media(max-width:640px)]:[&&]:m-[0px_0px_10px_0px] [@media(width>640px)]:[&&]:m-[0px_0px_13px_0px]">
        {{ $tr("ESTABLISHED 2026 IN ASHULIA-SAVAR") }}
      </p>
      <h1 class="school-name [&&]:max-w-[850px] [&&]:[color:rgb(255,_255,_255)] [&&]:[font-family:Newsreader,_'Hind_Siliguri',_Georgia,_serif] [&&]:leading-[0.94] [&&]:tracking-[0px] [&&]:[text-shadow:rgba(0,_0,_0,_0.333)_0px_3px_22px] [&&]:m-[0px]">
        <span class="[&&]:block [@media(max-width:640px)]:[&&]:[font-size:clamp(30px,_8.5vw,_46px)] [@media(width>640px)_and_(width<641px)_and_(max-height:760px)]:[&&]:[font-size:clamp(48px,_5.3vw,_86px)] [@media(min-width:641px)_and_(max-height:760px)]:[&&]:[font-size:40px] [@media(width>640px)_and_(height>760px)]:[&&]:[font-size:clamp(48px,_5.3vw,_86px)] [&&]:font-[800] [&&]:tracking-[0.015em] [@media(min-width:641px)_and_(max-height:760px)]:[&&]:mb-[6px]">{{
          $tr("PEACE ")
        }}</span>
        <span class="[&&]:block [@media(max-width:640px)]:[&&]:[font-size:clamp(30px,_8.5vw,_46px)] [@media(width>640px)_and_(width<641px)_and_(max-height:760px)]:[&&]:[font-size:clamp(48px,_5.3vw,_86px)] [@media(min-width:641px)_and_(max-height:760px)]:[&&]:[font-size:40px] [@media(width>640px)_and_(height>760px)]:[&&]:[font-size:clamp(48px,_5.3vw,_86px)] [&&]:font-[800] [&&]:tracking-[0.015em] [@media(min-width:641px)_and_(max-height:760px)]:[&&]:mb-[6px]">{{
          $tr("INTERNATIONAL")
        }}</span>
        <small class="[@media(max-width:640px)]:[&&]:mt-[9px] [@media(width>640px)]:[&&]:mt-[13px] [&&]:block [@media(max-width:640px)]:[&&]:max-w-[340px] [@media(width>640px)]:[&&]:max-w-[820px] [@media(max-width:640px)]:[&&]:[font-size:22px] [@media(width>640px)_and_(width<641px)_and_(max-height:760px)]:[&&]:[font-size:clamp(20px,_2.5vw,_40px)] [@media(min-width:641px)_and_(max-height:760px)]:[&&]:[font-size:19px] [@media(width>640px)_and_(height>760px)]:[&&]:[font-size:clamp(20px,_2.5vw,_40px)] [&&]:font-[750] [@media(max-width:640px)]:[&&]:leading-[1.12] [@media(width>640px)]:[&&]:leading-[1.08] [&&]:tracking-[0.01em]">{{ $tr(" ISLAMIC SCHOOL AND COLLEGE (PIISC)") }}</small>
      </h1>
    </div>
    <div :key="current" class="school-slide-caption [&&]:min-h-[64px] [@media(prefers-reduced-motion:no-preference)]:[&&]:[animation-delay:0.15s] [@media(prefers-reduced-motion:reduce)]:[&&]:[animation-delay:0s] [&&]:[animation-direction:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[animation-duration:0.85s] [@media(prefers-reduced-motion:reduce)]:[&&]:[animation-duration:auto] [@media(prefers-reduced-motion:no-preference)]:[&&]:[animation-fill-mode:both] [@media(prefers-reduced-motion:reduce)]:[&&]:[animation-fill-mode:none] [&&]:[animation-iteration-count:1] [@media(prefers-reduced-motion:no-preference)]:[&&]:[animation-name:caption-arrive] [@media(prefers-reduced-motion:reduce)]:[&&]:[animation-name:none] [&&]:[animation-play-state:running] [&&]:[animation-range-end:normal] [&&]:[animation-range-start:normal] [&&]:[animation-timeline:auto] [&&]:[animation-timing-function:ease] [@media(max-width:640px)]:[&&]:left-[7%] [@media(max-width:640px)]:[&&]:right-[7%] [@media(max-width:640px)]:[&&]:top-[250px] [@media(min-width:641px)_and_(max-height:760px)]:[&&]:top-[270px]">
      <p class="school-slide-label [@media(max-width:640px)]:[&&]:[font-size:10px] [@media(width>640px)]:[&&]:[font-size:12px] [&&]:flex [&&]:items-center [&&]:gap-x-[14px] [&&]:gap-y-[14px] [&&]:font-[700] [&&]:uppercase [@media(max-width:640px)]:[&&]:tracking-[0.13em] [@media(width>640px)]:[&&]:tracking-[0.2em] [&&]:[color:rgb(255,_255,_255)] [&&]:m-[0px_0px_10px_0px] [&.school-slide-label::before]:h-[2px] [&.school-slide-label::before]:w-[38px] [&.school-slide-label::before]:[background-attachment:initial] [&.school-slide-label::before]:[background-clip:initial] [&.school-slide-label::before]:[background-color:rgb(222,_196,_139)] [&.school-slide-label::before]:[background-image:initial] [&.school-slide-label::before]:[background-origin:initial] [&.school-slide-label::before]:[background-position:initial] [&.school-slide-label::before]:[background-repeat:initial] [&.school-slide-label::before]:[background-size:initial] [&.school-slide-label::before]:[content:'']">{{ $tr(slides[current].label) }}</p>
      <h2 class="[&&]:max-w-[900px] [@media(max-width:640px)]:[&&]:[font-size:20px] [@media(width>640px)]:[&&]:[font-size:clamp(20px,_1vw,_28px)] [&&]:leading-[1.15] [&&]:[color:rgb(255,_255,_255)] [&&]:[text-wrap-mode:initial] [&&]:[text-wrap-style:balance] [&&]:[text-shadow:rgba(0,_0,_0,_0.267)_0px_2px_18px] [&&]:m-[0px]">{{ $tr(slides[current].title) }}</h2>
    </div>
    <div class="hero-actions [&&]:z-[2] [&&]:flex [&&]:flex-wrap [@media(max-width:640px)]:[&&]:gap-x-[10px] [@media(width>640px)]:[&&]:gap-x-[15px] [@media(max-width:640px)]:[&&]:gap-y-[10px] [@media(width>640px)]:[&&]:gap-y-[15px] [@media(max-width:640px)]:[&&]:top-[360px] [@media(min-width:641px)_and_(max-height:760px)]:[&&]:top-[340px] [@media(max-width:640px)]:[&&]:left-[7%]">
      <RouterLink to="/online-admission" class="hero-apply [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(223,_180,_47)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(20,_36,_61)] [&&]:inline-flex [@media(max-width:640px)]:[&&]:min-h-[50px] [@media(width>640px)_and_(width<641px)_and_(max-height:760px)]:[&&]:min-h-[58px] [@media(min-width:641px)_and_(max-height:760px)]:[&&]:min-h-[50px] [@media(width>640px)_and_(height>760px)]:[&&]:min-h-[58px] [&&]:items-center [&&]:justify-center [@media(max-width:640px)]:[&&]:gap-x-[9px] [@media(width>640px)]:[&&]:gap-x-[15px] [@media(max-width:640px)]:[&&]:gap-y-[9px] [@media(width>640px)]:[&&]:gap-y-[15px] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [@media(max-width:640px)]:[&&]:[font-size:14px] [@media(width>640px)]:[&&]:[font-size:17px] [&&]:cursor-pointer [&&]:font-[800] [&&]:[transition-behavior:normal,_normal,_normal,_normal] [&&]:[transition-delay:0s,_0s,_0s,_0s] [&&]:[transition-duration:0.3s,_0.3s,_0.3s,_0.3s] [&&]:[transition-property:transform,_background,_border-color,_box-shadow] [&&]:[transition-timing-function:ease,_ease,_ease,_ease] [@media(max-width:640px)]:[&&]:p-[11px_15px] [@media(width>640px)]:[&&]:p-[13px_25px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:![border-color:rgb(223,_180,_47)] [.hero-actions_a&:hover]:[box-shadow:rgba(0,_0,_0,_0.267)_0px_10px_25px] [.hero-actions_a&:hover]:[transform:translateY(-4px)] [&.hero-apply:hover]:[background-color:rgb(240,_202,_81)] [&.hero-apply:hover]:![border-color:rgb(240,_202,_81)]">
        {{ $tr("Apply Now") }}
        <ArrowRight :size="22" aria-hidden="true" />
      </RouterLink>
      <RouterLink to="/contact" class="hero-visit [&&]:[backdrop-filter:blur(5px)] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgba(255,_255,_255,_0.07)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(255,_255,_255)] [&&]:inline-flex [@media(max-width:640px)]:[&&]:min-h-[50px] [@media(width>640px)_and_(width<641px)_and_(max-height:760px)]:[&&]:min-h-[58px] [@media(min-width:641px)_and_(max-height:760px)]:[&&]:min-h-[50px] [@media(width>640px)_and_(height>760px)]:[&&]:min-h-[58px] [&&]:items-center [&&]:justify-center [@media(max-width:640px)]:[&&]:gap-x-[9px] [@media(width>640px)]:[&&]:gap-x-[15px] [@media(max-width:640px)]:[&&]:gap-y-[9px] [@media(width>640px)]:[&&]:gap-y-[15px] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [@media(max-width:640px)]:[&&]:[font-size:14px] [@media(width>640px)]:[&&]:[font-size:17px] [&&]:cursor-pointer [&&]:font-[800] [&&]:[transition-behavior:normal,_normal,_normal,_normal] [&&]:[transition-delay:0s,_0s,_0s,_0s] [&&]:[transition-duration:0.3s,_0.3s,_0.3s,_0.3s] [&&]:[transition-property:transform,_background,_border-color,_box-shadow] [&&]:[transition-timing-function:ease,_ease,_ease,_ease] [@media(max-width:640px)]:[&&]:p-[11px_15px] [@media(width>640px)]:[&&]:p-[13px_25px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgba(255,_255,_255,_0.5)] [.hero-actions_a&:hover]:[box-shadow:rgba(0,_0,_0,_0.267)_0px_10px_25px] [.hero-actions_a&:hover]:[transform:translateY(-4px)] [&.hero-visit:hover]:[background-color:rgb(255,_255,_255)] [&.hero-visit:hover]:[color:rgb(20,_36,_61)]">
        {{ $tr("Book a Visit") }}
      </RouterLink>
    </div>
    </div>
    <button
      class="hero-arrow hero-arrow-prev [&&]:absolute [@media(max-width:640px)]:[&&]:top-[30%] [@media(width>640px)]:[&&]:top-[45%] [&&]:grid [@media(max-width:640px)]:[&&]:h-[44px] [@media(width>640px)]:[&&]:h-[56px] [@media(max-width:640px)]:[&&]:w-[36px] [@media(width>640px)]:[&&]:w-[46px] [&&]:cursor-pointer [&&]:items-center [&&]:[justify-items:center] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgba(16,_35,_36,_0.19)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[color:white] [&&]:[transition-behavior:normal] [&&]:[transition-delay:0s] [&&]:[transition-duration:0.2s] [&&]:[transition-property:background] [&&]:[transition-timing-function:ease] [@media(max-width:640px)]:[&&]:left-[12px] [@media(width>640px)]:[&&]:left-[20px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgba(255,_255,_255,_0.376)] [&.hero-arrow:hover]:[background-color:rgba(255,_255,_255,_0.19)] [.school-hero_button&:focus-visible]:[outline-color:white] [.school-hero_button&:focus-visible]:[outline-style:solid] [.school-hero_button&:focus-visible]:[outline-width:2px] [.school-hero_button&:focus-visible]:[outline-offset:4px]"
      type="button"
      :aria-label="$tr('Previous slide')"
      @click="goTo(current - 1)"
    >
      <ChevronLeft aria-hidden="true" />
    </button>
    <button
      class="hero-arrow hero-arrow-next [&&]:absolute [@media(max-width:640px)]:[&&]:top-[30%] [@media(width>640px)]:[&&]:top-[45%] [&&]:grid [@media(max-width:640px)]:[&&]:h-[44px] [@media(width>640px)]:[&&]:h-[56px] [@media(max-width:640px)]:[&&]:w-[36px] [@media(width>640px)]:[&&]:w-[46px] [&&]:cursor-pointer [&&]:items-center [&&]:[justify-items:center] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgba(16,_35,_36,_0.19)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[color:white] [&&]:[transition-behavior:normal] [&&]:[transition-delay:0s] [&&]:[transition-duration:0.2s] [&&]:[transition-property:background] [&&]:[transition-timing-function:ease] [@media(max-width:640px)]:[&&]:right-[12px] [@media(width>640px)]:[&&]:right-[20px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgba(255,_255,_255,_0.376)] [&.hero-arrow:hover]:[background-color:rgba(255,_255,_255,_0.19)] [.school-hero_button&:focus-visible]:[outline-color:white] [.school-hero_button&:focus-visible]:[outline-style:solid] [.school-hero_button&:focus-visible]:[outline-width:2px] [.school-hero_button&:focus-visible]:[outline-offset:4px]"
      type="button"
      :aria-label="$tr('Next slide')"
      @click="goTo(current + 1)"
    >
      <ChevronRight aria-hidden="true" />
    </button>
    <div class="hero-controls [&&]:absolute [@media(max-width:640px)]:[&&]:bottom-[42px] [@media(width>640px)]:[&&]:bottom-[80px] [&&]:left-[max(7%,_50%_-_660px)] [&&]:right-[max(7%,_50%_-_660px)] [&&]:flex [&&]:items-center [@media(max-width:640px)]:[&&]:gap-x-[8px] [@media(width>640px)]:[&&]:gap-x-[24px] [@media(max-width:640px)]:[&&]:gap-y-[8px] [@media(width>640px)]:[&&]:gap-y-[24px] [&&]:pt-[16px] [&&]:[border-top-color:rgba(255,_255,_255,_0.208)] [&&]:[border-top-style:solid] [&&]:[border-top-width:1px]">
      <span class="hero-count [&&]:[font-size:14px] [&&]:tracking-[0.1em] [&&]:[font-variant-numeric:tabular-nums]"
        >{{ $tr(String(current + 1).padStart(2, "0")) }}
        <span class="[&&]:ml-[6px] [&&]:[color:rgba(255,_255,_255,_0.584)]">/ {{ $tr(String(slides.length).padStart(2, "0")) }}</span></span
      >
      <div class="hero-dots [&&]:flex [@media(max-width:640px)]:[&&]:gap-x-[0px] [@media(width>640px)]:[&&]:gap-x-[6px] [@media(max-width:640px)]:[&&]:gap-y-[0px] [@media(width>640px)]:[&&]:gap-y-[6px]" :aria-label="$tr('Choose a slide')">
        <button class="[&&]:grid [&&]:h-[32px] [@media(max-width:640px)]:[&&]:w-[20px] [@media(width>640px)]:[&&]:w-[32px] [&&]:cursor-pointer [&&]:items-center [&&]:[justify-items:center] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:transparent] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:p-[0px] [&&]:[border-width:0px] [&&]:[border-style:none] [&&]:[border-color:currentcolor] [.school-hero_button&:focus-visible]:[outline-color:white] [.school-hero_button&:focus-visible]:[outline-style:solid] [.school-hero_button&:focus-visible]:[outline-width:2px] [.school-hero_button&:focus-visible]:[outline-offset:4px]"
          v-for="(slide, index) in slides"
          :key="slide.image"
          type="button"
          :class="{ selected: current === index }"
          :aria-label="$tr(`Show slide ${index + 1}: ${slide.label}`)"
          :aria-current="current === index ? 'true' : undefined"
          @click="goTo(index)"
        >
          <span class="[&&]:h-[8px] [&&]:w-[8px] [&&]:[border-bottom-left-radius:10px] [&&]:[border-bottom-right-radius:10px] [&&]:[border-top-left-radius:10px] [&&]:[border-top-right-radius:10px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgba(255,_255,_255,_0.44)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-behavior:normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-delay:0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.35s,_0.35s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:width,_background] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-timing-function:ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-timing-function:ease] [@media(max-width:640px)]:[.hero-dots_.selected_span&]:w-[18px] [@media(width>640px)]:[.hero-dots_.selected_span&]:w-[28px] [.hero-dots_.selected_span&]:[background-color:rgb(222,_196,_139)]"></span>
        </button>
      </div>
      <button
        class="hero-play [&&]:ml-[auto] [&&]:grid [&&]:h-[36px] [&&]:w-[36px] [&&]:items-center [&&]:[justify-items:center] [&&]:[border-bottom-left-radius:50%] [&&]:[border-bottom-right-radius:50%] [&&]:[border-top-left-radius:50%] [&&]:[border-top-right-radius:50%] [&&]:cursor-pointer [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:transparent] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[color:white] [@media(max-width:640px)]:[&&]:[flex-shrink:0] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgba(255,_255,_255,_0.396)] [&.hero-play:hover]:[background-color:rgba(255,_255,_255,_0.19)] [&.hero-play:disabled]:[cursor:default] [&.hero-play:disabled]:opacity-[0.5] [.school-hero_button&:focus-visible]:[outline-color:white] [.school-hero_button&:focus-visible]:[outline-style:solid] [.school-hero_button&:focus-visible]:[outline-width:2px] [.school-hero_button&:focus-visible]:[outline-offset:4px]"
        type="button"
        :aria-label="
          $tr(
            paused ? 'Resume automatic slideshow' : 'Pause automatic slideshow',
          )
        "
        :aria-pressed="paused"
        :disabled="reducedMotion"
        @click="paused = !paused"
      >
        <Play
          v-if="paused || reducedMotion"
          :size="16"
          aria-hidden="true"
        /><Pause v-else :size="16" aria-hidden="true" />
      </button>
    </div>
  </section>
</template>
