<script setup>
import { routes } from '../data/content.js'
import { useI18n } from '../composables/useI18n.js'
import LanguageSwitcher from './LanguageSwitcher.vue'
const props=defineProps({open:Boolean})
const emit=defineEmits(['close'])
const {t}=useI18n()
</script>
<template><div v-if="props.open" class="mobile-menu" id="mobile-navigation"><nav :aria-label="$tr(&quot;Mobile navigation&quot;)"><RouterLink v-for="item in routes" :key="item" :to="item==='home'?'/':`/${item}`" @click="emit('close')">{{$tr(t.nav[item])}}</RouterLink></nav><LanguageSwitcher /></div></template>
