<script setup>
import Navbar from '../components/Navbar.vue'
import SiteFooter from '../components/SiteFooter.vue'
</script>
<template><a href="#main" class="skip-link">{{ $tr("Skip to content") }}</a><Navbar/><main id="main"><RouterView/></main><SiteFooter/></template>
