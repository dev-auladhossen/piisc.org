<script setup>
import { BookOpen, HeartHandshake, Globe2, Sprout, ShieldCheck, Sparkles } from 'lucide-vue-next'
defineProps({item:Object})
const icons={BookOpen,HeartHandshake,Globe2,Sprout,ShieldCheck,Sparkles}
</script>
<template><article class="feature-card"><div class="feature-icon"><component :is="icons[item.icon]||BookOpen" :size="24" :stroke-width="1.6" aria-hidden="true"/></div><h3>{{$tr(item.title)}}</h3><p>{{$tr(item.body)}}</p></article></template>
