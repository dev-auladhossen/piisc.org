<script setup>
import { useId } from "vue";

const inputId = useId();
defineProps({
  modelValue: { type: String, default: "" },
  label: { type: String, required: true },
  type: { type: String, default: "text" },
  required: Boolean,
  error: { type: String, default: "" },
  autocomplete: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  maxlength: { type: Number, default: undefined },
});
defineEmits(["update:modelValue"]);
</script>

<template>
  <label class="block">
    <span class="mb-1.5 block text-sm font-semibold text-[#344b70]">{{ label }} <span v-if="required" class="text-red-600" aria-hidden="true">*</span></span>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :required="required"
      :maxlength="maxlength"
      :autocomplete="autocomplete || undefined"
      :placeholder="placeholder || undefined"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="error ? `${inputId}-error` : undefined"
      class="admission-field"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span v-if="error" :id="`${inputId}-error`" role="alert" class="mt-1 block text-sm text-red-700">{{ error }}</span>
  </label>
</template>

<style scoped>
.admission-field { @apply min-h-12 w-full rounded-[10px] border border-[#c7d4e8] bg-white px-3.5 text-base text-[#173f8e] outline-none transition-[border-color,box-shadow] focus:border-[#8ea9d8] focus:ring-2 focus:ring-[#294e9e]/10; }
.admission-field[aria-invalid="true"] { @apply border-red-400; }
</style>
