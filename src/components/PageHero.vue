<script setup>
defineProps({eyebrow:String,title:String,lead:String})
</script>
<template><section class="page-hero"><div class="container page-hero-inner"><span class="eyebrow">{{$tr(eyebrow)}}</span><h1>{{$tr(title)}}</h1><p>{{$tr(lead)}}</p></div><div class="hero-rule" aria-hidden="true"></div></section></template>
