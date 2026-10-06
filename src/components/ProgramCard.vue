<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
defineProps({item:Object})
</script>
<template><RouterLink to="/academics" class="program-card min-h-[350px] p-[31px] flex flex-col justify-between [background:#fff] [border-top:3px_solid_#bb9952] [box-shadow:0_14px_38px_#0926450a] [transition:transform_.2s,box-shadow_.2s] relative"><span class="card-index [font-size:12px] font-[800] [color:#95743a] tracking-[.14em]">{{$tr(item.range)}}</span><div><h3 class="[font-family:Georgia,'Noto_Sans_Bengali',serif] font-[500] [font-size:30px] [color:#092645] mb-[14px]">{{$tr(item.title)}}</h3><strong class="[color:#0e5b4a] [font-size:13px] uppercase tracking-[.08em]">{{$tr(item.grades)}}</strong><p class="[color:#627079] [font-size:14px] mt-[11px]">{{$tr(item.body)}}</p></div><ArrowUpRight :size="24" class="card-arrow absolute right-[28px] top-[28px] [color:#0e5b4a]" aria-hidden="true"/></RouterLink></template>
