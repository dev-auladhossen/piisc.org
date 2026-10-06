<script setup>
defineProps({eyebrow:String,title:String,description:String,light:Boolean})
</script>
<template><div class="section-heading max-w-[680px]" :class="{light}"><span v-if="eyebrow" class="eyebrow">{{$tr(eyebrow)}}</span><h2 class="[font-size:clamp(37px,3.5vw,56px)] leading-[1.16] [color:#092645] m-[16px_0_20px]">{{$tr(title)}}</h2><p class="[font-size:16px] [color:#5d6b70] max-w-[630px]" v-if="description">{{$tr(description)}}</p></div></template>
