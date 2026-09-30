<script setup>
import { useI18n } from '../composables/useI18n.js'
const {language}=useI18n()
</script>
<template>
  <div class="language-options" role="group" aria-label="Website language">
    <button type="button" lang="en" :aria-pressed="language === 'en'" @click="language = 'en'">English</button>
    <button type="button" lang="bn" :aria-pressed="language === 'bn'" @click="language = 'bn'">বাংলা</button>
  </div>
</template>
<style scoped>
.language-options { display: inline-flex; flex-shrink: 0; padding: 3px; gap: 2px; background: #f0f3f7; border: 1px solid #dbe2ec; border-radius: 30px; }
button { padding: 7px 12px; min-height: 34px; border: 0; border-radius: 24px; background: transparent; color: #263d55; font-size: 12px; font-weight: 700; cursor: pointer; transition: background .2s, color .2s; }
button[aria-pressed="true"] { background: #092645; color: #fff; }
button:not([aria-pressed="true"]):hover { background: #dce5ef; }
button:focus-visible { outline: 2px solid #bb9952; outline-offset: 2px; }
@media(prefers-reduced-motion: reduce) { button { transition: none; } }
</style>
