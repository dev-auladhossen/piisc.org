<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
defineProps({to:{type:String,default:'/contact'},outline:Boolean,light:Boolean})
</script>
<template><RouterLink :to="to" class="base-button" :class="{outline,light}"><span><slot/></span><ArrowUpRight :size="18" aria-hidden="true"/></RouterLink></template>
