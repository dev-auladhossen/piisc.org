<script setup>
defineProps({eyebrow:String,title:String,lead:String})
</script>
<template><section class="page-hero [background:#092645] [color:#fff] relative overflow-hidden"><div class="container page-hero-inner relative z-[1] p-[85px_0_95px]"><span class="eyebrow">{{$tr(eyebrow)}}</span><h1 class="[font-size:clamp(44px,5vw,72px)] leading-[1.13] max-w-[900px] m-[18px_0_20px]">{{$tr(title)}}</h1><p class="max-w-[700px] [color:#cbdbdf] [font-size:17px]">{{$tr(lead)}}</p></div><div class="hero-rule h-[6px] [background:linear-gradient(90deg,#b9954d_0_28%,#0e5b4a_28%_70%,#fff_70%)]" aria-hidden="true"></div></section></template>
