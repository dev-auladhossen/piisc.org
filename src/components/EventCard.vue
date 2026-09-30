<script setup>
import NewsCard from './NewsCard.vue'
defineProps({item:Object})
</script>
<template><NewsCard :item="item"/></template>
