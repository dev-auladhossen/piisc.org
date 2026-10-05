<script setup>
import { Languages } from "lucide-vue-next";
import { useI18n } from "../composables/useI18n.js";
const { language, toggle } = useI18n();
</script>
<template>
  <button
    type="button"
    class="language-toggle inline-flex items-center justify-center gap-0.5 rounded bg-[#ddebff] p-1 text-xs font-semibold text-[#303657] cursor-pointer transition-[background,color,transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:bg-[#eef3fa] hover:text-[#007bff] hover:shadow-[0_6px_16px_#30365718] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#bb9952] motion-reduce:transition-none motion-reduce:hover:transform-none"
    :lang="language === 'en' ? 'bn' : 'en'"
    :aria-label="language === 'en' ? 'বাংলায় দেখুন' : 'ইংরেজিতে দেখুন'"
    @click="toggle"
  >
    <Languages class="text-[#007bff]" :size="19" aria-hidden="true" />
    <span>{{ language === "en" ? "BN" : "EN" }}</span>
  </button>
</template>
