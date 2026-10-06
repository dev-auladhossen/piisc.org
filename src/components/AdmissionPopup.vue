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
      class="admission-popup [@media(max-width:540px)]:[&&]:w-[calc(-20px_+_100vw)] [@media(width>540px)]:[&&]:w-[min(1080px,_-48px_+_100vw,_179.082dvh_-_259.669px)] [&&]:max-w-[none] [&&]:max-h-[calc(100dvh_-_24px)] [&&]:overflow-x-visible [&&]:overflow-y-visible [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:transparent] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:m-[auto] [&&]:p-[0px_0px_8px_0px] [&&]:[border-width:0px] [&&]:[border-style:none] [&&]:[border-color:currentcolor] [&.admission-popup::backdrop]:[backdrop-filter:blur(5px)] [&.admission-popup::backdrop]:[background-attachment:initial] [&.admission-popup::backdrop]:[background-clip:initial] [&.admission-popup::backdrop]:[background-color:rgba(21,_27,_38,_0.72)] [&.admission-popup::backdrop]:[background-image:initial] [&.admission-popup::backdrop]:[background-origin:initial] [&.admission-popup::backdrop]:[background-position:initial] [&.admission-popup::backdrop]:[background-repeat:initial] [&.admission-popup::backdrop]:[background-size:initial]"
      :aria-label="language === 'bn' ? 'ভর্তির বিজ্ঞপ্তি' : 'Admission poster'"
      @keydown.esc.stop.prevent="close"
      @cancel.prevent="close"
      @close="restorePage"
      @click="(event) => event.target === dialog && close()"
    >
      <div class="poster-body [&&]:relative [&&]:overflow-x-hidden [&&]:overflow-y-hidden [&&]:[border-bottom-left-radius:12px] [&&]:[border-bottom-right-radius:12px] [&&]:[border-top-left-radius:12px] [&&]:[border-top-right-radius:12px] [&&]:leading-[0] [&&]:[aspect-ratio:1678_/_937] [&&]:[box-shadow:rgba(0,_0,_0,_0.533)_0px_24px_90px]">
        <img class="[&&]:block [&&]:h-[100%] [&&]:w-[100%] [&&]:object-contain" :src="poster" :alt="language === 'bn' ? 'পিআইআইএসসি ভর্তির পোস্টার' : 'PIISC admission poster'" />
        <button
          type="button"
          class="popup-close [&&]:absolute [&&]:top-[clamp(10px,_1.5vw,_18px)] [&&]:right-[clamp(10px,_1.5vw,_18px)] [&&]:grid [&&]:h-[clamp(38px,_4.5vw,_54px)] [&&]:w-[clamp(38px,_4.5vw,_54px)] [&&]:items-center [&&]:[justify-items:center] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:cursor-pointer [&&]:[border-bottom-left-radius:50%] [&&]:[border-bottom-right-radius:50%] [&&]:[border-top-left-radius:50%] [&&]:[border-top-right-radius:50%] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[box-shadow:rgba(0,_0,_0,_0.267)_0px_5px_20px] [&&]:[color:rgb(32,_32,_32)] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-behavior:normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-delay:0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.2s,_0.2s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:transform,_background] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-timing-function:ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-timing-function:ease] [&&]:[border-width:0px] [&&]:[border-style:none] [&&]:[border-color:currentcolor] [&.popup-close:hover]:[background-color:rgb(244,_207,_82)] [&.popup-close:hover]:[transform:scale(1.05)] [&.popup-close:focus-visible]:[outline-color:rgb(244,_207,_82)] [&.popup-close:focus-visible]:[outline-style:solid] [&.popup-close:focus-visible]:[outline-width:3px] [&.popup-close:focus-visible]:[outline-offset:3px]"
          :aria-label="language === 'bn' ? 'ভর্তির বিজ্ঞপ্তি বন্ধ করুন' : 'Close admission poster'"
          autofocus
          @click="close"
        >
          <X aria-hidden="true" />
        </button>
      </div>
      <div class="poster-actions [&&]:flex [&&]:justify-center [@media(max-width:540px)]:[&&]:gap-x-[10px] [@media(width>540px)]:[&&]:gap-x-[14px] [@media(max-width:540px)]:[&&]:gap-y-[10px] [@media(width>540px)]:[&&]:gap-y-[14px] [@media(max-width:540px)]:[&&]:pt-[15px] [@media(width>540px)]:[&&]:pt-[18px] [&&]:leading-[1.2]" :aria-label="language === 'bn' ? 'ভর্তির বিজ্ঞপ্তির লিংক' : 'Admission poster actions'">
        <RouterLink class="[&&]:grid [@media(max-width:540px)]:[&&]:min-w-[0px] [@media(width>540px)]:[&&]:min-w-[150px] [&&]:items-center [&&]:[justify-items:center] [@media(max-width:540px)]:[&&]:min-h-[48px] [@media(width>540px)]:[&&]:min-h-[52px] [&&]:[border-bottom-left-radius:999px] [&&]:[border-bottom-right-radius:999px] [&&]:[border-top-left-radius:999px] [&&]:[border-top-right-radius:999px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(220,_180,_50)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[box-shadow:rgba(0,_0,_0,_0.2)_0px_8px_20px] [&&]:[color:rgb(23,_23,_23)] [&&]:[font-family:Raleway,_Arial,_sans-serif] [&&]:[font-feature-settings:normal] [&&]:[font-kerning:auto] [&&]:[font-language-override:normal] [&&]:[font-optical-sizing:auto] [@media(max-width:540px)]:[&&]:[font-size:14px] [@media(width>540px)]:[&&]:[font-size:16px] [&&]:[font-size-adjust:none] [&&]:[font-stretch:normal] [&&]:[font-style:normal] [&&]:[font-variant:normal] [&&]:[font-variant-alternates:normal] [&&]:[font-variant-caps:normal] [&&]:[font-variant-east-asian:normal] [&&]:[font-variant-emoji:normal] [&&]:[font-variant-ligatures:normal] [&&]:[font-variant-numeric:normal] [&&]:[font-variant-position:normal] [&&]:[font-variation-settings:normal] [&&]:font-[700] [&&]:leading-[1.2] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-behavior:normal,_normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-delay:0s,_0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.22s,_0.22s,_0.22s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:transform,_background,_box-shadow] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-timing-function:ease,_ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-timing-function:ease] [@media(max-width:540px)]:[&&]:[flex-basis:0%] [@media(max-width:540px)]:[&&]:[flex-grow:1] [@media(max-width:540px)]:[&&]:[flex-shrink:1] [@media(max-width:540px)]:[&&]:p-[10px_15px] [@media(width>540px)]:[&&]:p-[11px_22px] [.poster-actions_a_+_a&]:[background-color:rgb(255,_255,_255)] [.poster-actions_a_+_a&]:[color:rgb(32,_32,_32)] [.poster-actions_a&:hover]:[background-color:rgb(239,_202,_73)] [.poster-actions_a&:hover]:[box-shadow:rgba(0,_0,_0,_0.267)_0px_11px_25px] [@media(prefers-reduced-motion:no-preference)]:[.poster-actions_a&:hover]:[transform:translateY(-2px)] [@media(prefers-reduced-motion:reduce)]:[.poster-actions_a&:hover]:[transform:none] [.poster-actions_a_+_a&:hover]:[background-color:rgb(238,_241,_244)] [.poster-actions_a&:focus-visible]:[outline-color:rgb(244,_207,_82)] [.poster-actions_a&:focus-visible]:[outline-style:solid] [.poster-actions_a&:focus-visible]:[outline-width:3px] [.poster-actions_a&:focus-visible]:[outline-offset:3px]" to="/admissions" @click="close">{{ language === 'bn' ? 'আরও জানুন' : 'Learn More' }}</RouterLink>
        <RouterLink class="[&&]:grid [@media(max-width:540px)]:[&&]:min-w-[0px] [@media(width>540px)]:[&&]:min-w-[150px] [&&]:items-center [&&]:[justify-items:center] [@media(max-width:540px)]:[&&]:min-h-[48px] [@media(width>540px)]:[&&]:min-h-[52px] [&&]:[border-bottom-left-radius:999px] [&&]:[border-bottom-right-radius:999px] [&&]:[border-top-left-radius:999px] [&&]:[border-top-right-radius:999px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(220,_180,_50)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[box-shadow:rgba(0,_0,_0,_0.2)_0px_8px_20px] [&&]:[color:rgb(23,_23,_23)] [&&]:[font-family:Raleway,_Arial,_sans-serif] [&&]:[font-feature-settings:normal] [&&]:[font-kerning:auto] [&&]:[font-language-override:normal] [&&]:[font-optical-sizing:auto] [@media(max-width:540px)]:[&&]:[font-size:14px] [@media(width>540px)]:[&&]:[font-size:16px] [&&]:[font-size-adjust:none] [&&]:[font-stretch:normal] [&&]:[font-style:normal] [&&]:[font-variant:normal] [&&]:[font-variant-alternates:normal] [&&]:[font-variant-caps:normal] [&&]:[font-variant-east-asian:normal] [&&]:[font-variant-emoji:normal] [&&]:[font-variant-ligatures:normal] [&&]:[font-variant-numeric:normal] [&&]:[font-variant-position:normal] [&&]:[font-variation-settings:normal] [&&]:font-[700] [&&]:leading-[1.2] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-behavior:normal,_normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-delay:0s,_0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.22s,_0.22s,_0.22s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:transform,_background,_box-shadow] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-timing-function:ease,_ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-timing-function:ease] [@media(max-width:540px)]:[&&]:[flex-basis:0%] [@media(max-width:540px)]:[&&]:[flex-grow:1] [@media(max-width:540px)]:[&&]:[flex-shrink:1] [@media(max-width:540px)]:[&&]:p-[10px_15px] [@media(width>540px)]:[&&]:p-[11px_22px] [.poster-actions_a_+_a&]:[background-color:rgb(255,_255,_255)] [.poster-actions_a_+_a&]:[color:rgb(32,_32,_32)] [.poster-actions_a&:hover]:[background-color:rgb(239,_202,_73)] [.poster-actions_a&:hover]:[box-shadow:rgba(0,_0,_0,_0.267)_0px_11px_25px] [@media(prefers-reduced-motion:no-preference)]:[.poster-actions_a&:hover]:[transform:translateY(-2px)] [@media(prefers-reduced-motion:reduce)]:[.poster-actions_a&:hover]:[transform:none] [.poster-actions_a_+_a&:hover]:[background-color:rgb(238,_241,_244)] [.poster-actions_a&:focus-visible]:[outline-color:rgb(244,_207,_82)] [.poster-actions_a&:focus-visible]:[outline-style:solid] [.poster-actions_a&:focus-visible]:[outline-width:3px] [.poster-actions_a&:focus-visible]:[outline-offset:3px]" to="/contact" @click="close">{{ language === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us' }}</RouterLink>
      </div>
    </dialog>
  </Teleport>
</template>
