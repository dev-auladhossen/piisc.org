<script setup>
import { onBeforeUnmount, ref, watch } from "vue";
import { AlertCircle, CheckCircle2, X } from "lucide-vue-next";

const props = defineProps({
  type: { type: String, default: "success", validator: (value) => ["success", "error"].includes(value) },
  message: { type: String, required: true },
});
const emit = defineEmits(["close"]);
const timer = ref(null);
const visible = ref(true);

function startDismissTimer() {
  clearTimeout(timer.value);
  visible.value = true;
  timer.value = setTimeout(dismiss, props.type === "success" ? 5000 : 6000);
}

function dismiss() {
  clearTimeout(timer.value);
  visible.value = false;
}

watch(() => [props.type, props.message], startDismissTimer, { immediate: true });
onBeforeUnmount(() => clearTimeout(timer.value));
</script>

<template>
  <Transition name="toast" @after-leave="emit('close')">
    <div
      v-if="visible"
      class="fixed bottom-4 right-4 z-[200] w-[calc(100%-2rem)] max-w-md sm:bottom-6 sm:right-6"
      :role="type === 'success' ? 'status' : 'alert'"
      :aria-live="type === 'success' ? 'polite' : 'assertive'"
      aria-atomic="true"
    >
    <div
      class="flex items-start gap-3 rounded-xl border p-4 shadow-lg"
      :class="type === 'success'
        ? 'border-green-200 bg-green-50 text-green-900'
        : 'border-red-200 bg-red-50 text-red-900'"
    >
      <CheckCircle2 v-if="type === 'success'" :size="21" class="mt-0.5 shrink-0 text-green-700" aria-hidden="true" />
      <AlertCircle v-else :size="21" class="mt-0.5 shrink-0 text-red-700" aria-hidden="true" />
      <p class="min-w-0 flex-1 text-sm font-semibold leading-6">{{ message }}</p>
      <button
        type="button"
        class="-mr-1 -mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-current"
        :aria-label="type === 'success' ? 'Dismiss success notification' : 'Dismiss error notification'"
        @click="dismiss"
      >
        <X :size="18" aria-hidden="true" />
      </button>
    </div>
    </div>
  </Transition>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: opacity 280ms cubic-bezier(0.22, 1, 0.36, 1), transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate3d(0, 18px, 0) scale(0.98);
}
@media (prefers-reduced-motion: reduce) {
  .toast-enter-active,
  .toast-leave-active {
    transition: none;
  }
}
</style>
