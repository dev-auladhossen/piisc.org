<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
defineProps({item:Object})
</script>
<template><RouterLink to="/academics" class="program-card"><span class="card-index">{{$tr(item.range)}}</span><div><h3>{{$tr(item.title)}}</h3><strong>{{$tr(item.grades)}}</strong><p>{{$tr(item.body)}}</p></div><ArrowUpRight :size="24" class="card-arrow" aria-hidden="true"/></RouterLink></template>
