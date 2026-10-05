<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { X } from "lucide-vue-next";
import poster from "../assets/images/poster.png";
import { images } from "../data/content.js";
import { useI18n } from "../composables/useI18n.js";

const { language } = useI18n();

const dialog = ref(null);
let previousOverflow;
let previousFocus;
let locked = false;

function restorePage() {
  if (!locked) return;
  document.body.style.overflow = previousOverflow;
  locked = false;
  previousFocus?.isConnected && previousFocus.focus({ preventScroll: true });
}
function close() {
  dialog.value?.close();
  restorePage();
}

onMounted(() => {
  previousFocus = document.activeElement;
  previousOverflow = document.body.style.overflow;
  dialog.value.showModal();
  document.body.style.overflow = "hidden";
  locked = true;
});
onBeforeUnmount(() => {
  dialog.value?.close();
  restorePage();
});
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      class="admission-popup"
      :aria-label="language === 'bn' ? 'ভর্তির বিজ্ঞপ্তি' : 'Admission poster'"
      @keydown.esc.stop.prevent="close"
      @cancel.prevent="close"
      @close="restorePage"
      @click="(event) => event.target === dialog && close()"
    >
      <div class="poster-body">
        <img :src="poster" :alt="language === 'bn' ? 'পিআইআইএসসি ভর্তির পোস্টার' : 'PIISC admission poster'" />
        <button
          type="button"
          class="popup-close"
          :aria-label="language === 'bn' ? 'ভর্তির বিজ্ঞপ্তি বন্ধ করুন' : 'Close admission poster'"
          autofocus
          @click="close"
        >
          <X aria-hidden="true" />
        </button>
      </div>
      <div class="poster-actions" :aria-label="language === 'bn' ? 'ভর্তির বিজ্ঞপ্তির লিংক' : 'Admission poster actions'">
        <RouterLink to="/admissions" @click="close">{{ language === 'bn' ? 'আরও জানুন' : 'Learn More' }}</RouterLink>
        <RouterLink to="/contact" @click="close">{{ language === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us' }}</RouterLink>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.admission-popup {
  width: min(1080px, calc(100vw - 48px), calc((100dvh - 145px) * 1678 / 937));
  max-width: none;
  max-height: calc(100dvh - 24px);
  padding: 0 0 8px;
  margin: auto;
  border: 0;
  background: transparent;
  overflow: visible;
}
.admission-popup::backdrop {
  background: #151b26b8;
  backdrop-filter: blur(5px);
}
.poster-body {
  position: relative;
  aspect-ratio: 1678/937;
  line-height: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 24px 90px #0008;
}
.poster-body img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.popup-close {
  position: absolute;
  top: clamp(10px, 1.5vw, 18px);
  right: clamp(10px, 1.5vw, 18px);
  width: clamp(38px, 4.5vw, 54px);
  height: clamp(38px, 4.5vw, 54px);
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: #fff;
  color: #202020;
  box-shadow: 0 5px 20px #0004;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.2s ease;
}
.popup-close:hover {
  background: #f4cf52;
  transform: scale(1.05);
}
.popup-close:focus-visible {
  outline: 3px solid #f4cf52;
  outline-offset: 3px;
}
.poster-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
  padding-top: 18px;
  line-height: 1.2;
}
.poster-actions a {
  display: grid;
  place-items: center;
  min-width: 150px;
  min-height: 52px;
  padding: 11px 22px;
  border-radius: 999px;
  background: #dcb432;
  color: #171717;
  font:
    700 16px/1.2 Raleway,
    Arial,
    sans-serif;
  box-shadow: 0 8px 20px #0003;
  transition:
    transform 0.22s ease,
    background 0.22s ease,
    box-shadow 0.22s ease;
}
.poster-actions a + a {
  background: #fff;
  color: #202020;
}
.poster-actions a:hover {
  transform: translateY(-2px);
  background: #efca49;
  box-shadow: 0 11px 25px #0004;
}
.poster-actions a + a:hover {
  background: #eef1f4;
}
.poster-actions a:focus-visible {
  outline: 3px solid #f4cf52;
  outline-offset: 3px;
}
@media (max-width: 540px) {
  .admission-popup {
    width: calc(100vw - 20px);
  }
  .poster-actions {
    gap: 10px;
    padding-top: 15px;
  }
  .poster-actions a {
    min-width: 0;
    min-height: 48px;
    flex: 1;
    padding: 10px 15px;
    font-size: 14px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .popup-close,
  .poster-actions a {
    transition: none;
  }
  .poster-actions a:hover {
    transform: none;
  }
}
</style>
