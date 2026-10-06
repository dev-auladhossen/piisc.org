<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
defineProps({to:{type:String,default:'/contact'},outline:Boolean,light:Boolean})
</script>
<template><RouterLink :to="to" class="base-button inline-flex justify-between items-center gap-[30px] [background:#0e5b4a] [color:#fff] p-[17px_21px] min-h-[55px] [font-size:13px] font-[750] [transition:transform_.2s,background_.2s] [border:1px_solid_#0e5b4a]" :class="{outline,light}"><span><slot/></span><ArrowUpRight :size="18" aria-hidden="true"/></RouterLink></template>
