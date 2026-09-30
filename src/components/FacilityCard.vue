<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
defineProps({item:Object,index:Number})
</script>
<template><article class="facility-card"><span>0{{$tr(index+1)}}</span><ArrowUpRight :size="20" aria-hidden="true"/><h3>{{$tr(item.title)}}</h3><p>{{$tr(item.body)}}</p></article></template>
