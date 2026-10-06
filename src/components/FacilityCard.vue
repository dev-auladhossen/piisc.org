<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
defineProps({item:Object,index:Number})
</script>
<template><article class="facility-card [border:1px_solid_#d6e2dc] p-[29px] min-h-[225px] relative"><span class="[font-family:Georgia,serif] [color:#b28a42] [font-size:21px]">0{{$tr(index+1)}}</span><ArrowUpRight class="absolute right-[27px] top-[28px] [color:#0e5b4a]" :size="20" aria-hidden="true"/><h3 class="[font-size:22px] [color:#092645] m-[39px_0_10px]">{{$tr(item.title)}}</h3><p class="[font-size:14px] [color:#607179]">{{$tr(item.body)}}</p></article></template>
