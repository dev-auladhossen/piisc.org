<script setup>
import { Languages } from "lucide-vue-next";
import { useI18n } from "../composables/useI18n.js";
const { language, toggle } = useI18n();
</script>
<template>
  <button
    type="button"
    class="language-toggle"
    :lang="language === 'en' ? 'bn' : 'en'"
    :aria-label="language === 'en' ? 'বাংলায় দেখুন' : 'View in English'"
    @click="toggle"
  >
    <Languages :size="19" aria-hidden="true" />
    <span>{{ language === "en" ? "BN" : "EN" }}</span>
  </button>
</template>
<style scoped>
.language-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 4px 4px;
  border-radius: 4px;
  background: #ddebff;
  color: #303657;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
}
.language-toggle svg {
  color: #007bff;
}
.language-toggle:hover {
  background: #eef3fa;
  color: #007bff;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px #30365718;
}
.language-toggle:focus-visible {
  outline: 2px solid #bb9952;
  outline-offset: 3px;
}
@media (prefers-reduced-motion: reduce) {
  .language-toggle {
    transition: none;
  }
  .language-toggle:hover {
    transform: none;
  }
}
</style>
