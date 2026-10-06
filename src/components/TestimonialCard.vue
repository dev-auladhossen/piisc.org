<script setup>
defineProps({title:String,body:String})
</script>
<template><article class="testimonial-card p-[45px] [background:white] [border-left:3px_solid_#ba9955]"><span class="quote-mark [font-family:Georgia,serif] [font-size:76px] [color:#ba9955] leading-[.7]" aria-hidden="true">“</span><h3 class="[color:#092645] [font-family:Georgia,'Noto_Sans_Bengali',serif] [font-size:25px] font-[500] m-[20px_0_10px]">{{$tr(title)}}</h3><p class="[font-size:15px] [color:#637177]">{{$tr(body)}}</p></article></template>
