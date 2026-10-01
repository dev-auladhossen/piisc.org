<script setup>
import HeroSection from "../components/HeroSection.vue";
import HomeAdmissionGateway from "../components/HomeAdmissionGateway.vue";
import HomeExploreLinks from "../components/HomeExploreLinks.vue";
import HomePillars from "../components/HomePillars.vue";
import HomeJourney from "../components/HomeJourney.vue";
import HomeLocation from "../components/HomeLocation.vue";
import HomeNewsEvents from "../components/HomeNewsEvents.vue";
import WhatsAppContact from "../components/WhatsAppContact.vue";
import AdmissionPopup from "../components/AdmissionPopup.vue";
</script>
<template>
  <AdmissionPopup /><HeroSection /><HomeAdmissionGateway />
  <HomePillars />
  <HomeJourney />
  <HomeNewsEvents />
  <HomeExploreLinks />
  <HomeLocation />
  <WhatsAppContact />
</template>
