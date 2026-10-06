<script setup>
import { BookOpen, HeartHandshake, Globe2, Sprout, ShieldCheck, Sparkles } from 'lucide-vue-next'
defineProps({item:Object})
const icons={BookOpen,HeartHandshake,Globe2,Sprout,ShieldCheck,Sparkles}
</script>
<template><article class="feature-card p-[30px_25px] [border:1px_solid_#dce4de] min-h-[260px] [background:#fff]"><div class="feature-icon [color:#0e5b4a] w-[47px] h-[47px] [background:#eaf1ed] grid place-items-center mb-[32px]"><component :is="icons[item.icon]||BookOpen" :size="24" :stroke-width="1.6" aria-hidden="true"/></div><h3 class="[font-family:Georgia,'Noto_Sans_Bengali',serif] [font-size:23px] font-[500] [color:#102f45] mb-[11px]">{{$tr(item.title)}}</h3><p class="[color:#647179] [font-size:14px]">{{$tr(item.body)}}</p></article></template>
