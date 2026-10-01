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
    class="school-hero"
    :class="{ 'is-paused': !running }"
    :aria-label="$tr('Life at PIISC')"
    aria-roledescription="carousel"
    @focusin="focused = true"
    @focusout="onFocusOut"
    @keydown.left.prevent="goTo(current - 1)"
    @keydown.right.prevent="goTo(current + 1)"
  >
    <TransitionGroup name="hero-fade" tag="div" class="hero-stage">
      <article
        v-for="index in [current]"
        :key="index"
        class="school-slide"
        role="group"
        aria-roledescription="slide"
        :aria-label="
          $tr(`${index + 1} of ${slides.length}: ${slides[index].label}`)
        "
      >
        <img
          class="school-slide-image"
          :src="slides[index].image"
          :alt="$tr(slides[index].alt)"
          :fetchpriority="index === 0 ? 'high' : 'auto'"
        />
        <div class="school-slide-shade"></div>
        <div class="school-slide-caption">
          <p class="school-slide-label">{{ $tr(slides[index].label) }}</p>
          <h2>{{ $tr(slides[index].title) }}</h2>
        </div>
      </article>
    </TransitionGroup>
    <div class="hero-identity">
      <p class="school-established">
        {{ $tr("ESTABLISHED 2026 IN ASHULIA-SAVAR") }}
      </p>
      <h1 class="school-name">
        <span>{{
          $tr("PEACE ")
        }}</span>
        <span>{{
          $tr("INTERNATIONAL")
        }}</span>
        <small>{{ $tr(" ISLAMIC SCHOOL AND COLLEGE (PIISC)") }}</small>
      </h1>
    </div>
    <div class="hero-actions">
      <RouterLink to="/online-admission" class="hero-apply">
        {{ $tr("Apply Now") }}
        <ArrowRight :size="22" aria-hidden="true" />
      </RouterLink>
      <RouterLink to="/contact" class="hero-visit">
        {{ $tr("Book a Visit") }}
      </RouterLink>
    </div>
    <button
      class="hero-arrow hero-arrow-prev"
      type="button"
      :aria-label="$tr('Previous slide')"
      @click="goTo(current - 1)"
    >
      <ChevronLeft aria-hidden="true" />
    </button>
    <button
      class="hero-arrow hero-arrow-next"
      type="button"
      :aria-label="$tr('Next slide')"
      @click="goTo(current + 1)"
    >
      <ChevronRight aria-hidden="true" />
    </button>
    <div class="hero-controls">
      <span class="hero-count"
        >{{ $tr(String(current + 1).padStart(2, "0")) }}
        <span>/ {{ $tr(String(slides.length).padStart(2, "0")) }}</span></span
      >
      <div class="hero-dots" :aria-label="$tr('Choose a slide')">
        <button
          v-for="(slide, index) in slides"
          :key="slide.image"
          type="button"
          :class="{ selected: current === index }"
          :aria-label="$tr(`Show slide ${index + 1}: ${slide.label}`)"
          :aria-current="current === index ? 'true' : undefined"
          @click="goTo(index)"
        >
          <span></span>
        </button>
      </div>
      <button
        class="hero-play"
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

<style scoped>
.school-hero {
  position: relative;
  isolation: isolate;
  width: 100%;
  height: clamp(520px, 36vw, 650px);
  overflow: hidden;
  background: #172a27;
  color: white;
}
.hero-stage,
.school-slide,
.school-slide-shade {
  position: absolute;
  inset: 0;
}
.hero-stage {
  z-index: -1;
}
.school-slide {
  overflow: hidden;
}
.school-slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 45%;
  animation: school-zoom 8s linear both;
}
.school-slide-shade {
  background:
    linear-gradient(
      90deg,
      rgba(8, 23, 35, 0.88) 0%,
      rgba(26, 65, 97, 0.67) 48%,
      rgba(8, 23, 35, 0.18) 100%
    ),
    linear-gradient(180deg, transparent 42%, rgba(8, 23, 24, 0.58) 100%);
}
.school-slide-caption {
  position: absolute;
  top: clamp(270px, 19vw, 315px);
  left: max(7%, calc((100vw - 1320px) / 2));
  right: 10%;
  animation: caption-arrive 0.85s 0.15s both;
}
.hero-identity {
  position: absolute;
  z-index: 2;
  top: clamp(34px, 5vw, 74px);
  left: max(7%, calc((100vw - 1320px) / 2));
  right: 10%;
}
.school-established {
  margin: 0 0 13px;
  color: #e7bd35;
  font-size: clamp(11px, 1vw, 15px);
  font-weight: 900;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}
.school-name {
  margin: 0;
  max-width: 850px;
  color: #fff;
  font-family: Newsreader, 'Hind Siliguri', Georgia, serif;
  line-height: 0.94;
  letter-spacing: 0;
  text-shadow: 0 3px 22px #0005;
}
.school-name > span {
  display: block;
  font-size: clamp(48px, 5.3vw, 86px);
  font-weight: 800;
  letter-spacing: 0.015em;
}
.school-name > small {
  display: block;
  max-width: 820px;
  margin-top: 13px;
  font-size: clamp(20px, 2.5vw, 40px);
  font-weight: 750;
  line-height: 1.08;
  letter-spacing: 0.01em;
}
.school-slide-label {
  margin: 0 0 10px;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 14px;
}
.school-slide-label::before {
  content: "";
  width: 38px;
  height: 2px;
  background: #dec48b;
}
.school-slide-caption h2 {
  margin: 0;
  max-width: 900px;
  font-size: clamp(20px, 1vw, 28px);
  line-height: 1.15;
  color: #fff;
  text-wrap: balance;
  text-shadow: 0 2px 18px #0004;
}
.hero-actions {
  position: absolute;
  z-index: 2;
  top: clamp(385px, 20vw, 440px);
  left: max(7%, calc((100vw - 1320px) / 2));
  display: flex;
  gap: 15px;
}
.hero-actions a {
  min-height: 58px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 13px 25px;
  border: 1px solid #ffffff80;
  border-radius: 6px;
  font-size: 17px;
  font-weight: 800;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    background 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}
.hero-actions a:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px #0004;
}
.hero-apply {
  background: #dfb42f;
  border-color: #dfb42f !important;
  color: #14243d;
}
.hero-apply:hover {
  background: #f0ca51;
  border-color: #f0ca51 !important;
}
.hero-visit {
  background: #ffffff12;
  color: #fff;
  backdrop-filter: blur(5px);
}
.hero-visit:hover {
  background: #fff;
  color: #14243d;
}
.hero-arrow {
  position: absolute;
  top: 45%;
  display: grid;
  place-items: center;
  width: 46px;
  height: 56px;
  border: 1px solid #ffffff60;
  background: #10232430;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}
.hero-arrow:hover,
.hero-play:hover {
  background: #ffffff30;
}
.hero-arrow-prev {
  left: 20px;
}
.hero-arrow-next {
  right: 20px;
}
.hero-controls {
  position: absolute;
  bottom: 80px;
  left: 7%;
  right: 7%;
  display: flex;
  align-items: center;
  gap: 24px;
  padding-top: 16px;
  border-top: 1px solid #ffffff35;
}
.hero-count {
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.1em;
}
.hero-count span {
  color: #ffffff95;
  margin-left: 6px;
}
.hero-dots {
  display: flex;
  gap: 6px;
}
.hero-dots button {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}
.hero-dots span {
  width: 8px;
  height: 8px;
  border-radius: 10px;
  background: #ffffff70;
  transition:
    width 0.35s,
    background 0.35s;
}
.hero-dots .selected span {
  width: 28px;
  background: #dec48b;
}
.hero-play {
  margin-left: auto;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #ffffff65;
  color: white;
  background: transparent;
  cursor: pointer;
}
.hero-play:disabled {
  opacity: 0.5;
  cursor: default;
}
.school-hero button:focus-visible {
  outline: 2px solid white;
  outline-offset: 4px;
}
.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 1.2s ease-in-out;
}
.hero-fade-enter-active {
  z-index: 1;
}
.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
}
.is-paused .school-slide-image {
  animation-play-state: paused;
}
@keyframes school-zoom {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.085);
  }
}
@keyframes caption-arrive {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 640px) {
  .school-hero {
    height: 600px;
  }
  .school-slide-caption {
    left: 7%;
    right: 7%;
    top: 250px;
  }
  .hero-identity {
    top: 40px;
    left: 7%;
    right: 7%;
  }
  .school-established {
    font-size: 9px;
    letter-spacing: 0.14em;
    margin-bottom: 10px;
  }
  .school-name {
    margin-bottom: 0;
  }
  .school-name > span {
    font-size: 46px;
  }
  .school-name > small {
    max-width: 340px;
    margin-top: 9px;
    font-size: 22px;
    line-height: 1.12;
  }
  .school-slide-label {
    font-size: 10px;
    letter-spacing: 0.13em;
  }
  .school-slide-caption h2 {
    font-size: 20px;
  }
  .hero-actions {
    top: 360px;
    left: 7%;
    gap: 10px;
  }
  .hero-actions a {
    min-height: 50px;
    padding: 11px 15px;
    font-size: 14px;
    gap: 9px;
  }
  .hero-arrow {
    top: 30%;
    width: 36px;
    height: 44px;
  }
  .hero-arrow-prev {
    left: 12px;
  }
  .hero-arrow-next {
    right: 12px;
  }
  .hero-controls {
    gap: 12px;
    bottom: 42px;
  }
  .hero-dots {
    gap: 0;
  }
  .hero-dots button {
    width: 20px;
  }
  .hero-dots .selected span {
    width: 18px;
  }
  .hero-controls {
    gap: 8px;
  }
  .hero-play {
    flex-shrink: 0;
  }
}
@media (min-width: 641px) and (max-height: 760px) {
  .school-hero {
    height: 560px;
  }
  .school-slide-caption {
    top: 270px;
  }
  .hero-identity {
    top: 70px;
  }
  .school-name > span {
    font-size: 40px;
    margin-bottom: 6px;
  }
  .school-name > small {
    font-size: 19px;
  }
  .hero-actions {
    top: 340px;
  }
  .hero-actions a {
    min-height: 50px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .school-slide-image,
  .school-slide-caption {
    animation: none;
  }
  .hero-fade-enter-active,
  .hero-fade-leave-active,
  .hero-dots span {
    transition: none;
  }
}
</style>
