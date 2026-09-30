<script setup>
defineProps({title:String,body:String})
</script>
<template><article class="testimonial-card"><span class="quote-mark" aria-hidden="true">“</span><h3>{{$tr(title)}}</h3><p>{{$tr(body)}}</p></article></template>
