<script setup>
defineProps({eyebrow:String,title:String,description:String,light:Boolean})
</script>
<template><div class="section-heading" :class="{light}"><span v-if="eyebrow" class="eyebrow">{{$tr(eyebrow)}}</span><h2>{{$tr(title)}}</h2><p v-if="description">{{$tr(description)}}</p></div></template>
