<script setup>
import { images, news, address } from "../data/content.js";
import { useI18n } from "../composables/useI18n.js";
import HeroSection from "../components/HeroSection.vue";
import HomeAdmissionGateway from "../components/HomeAdmissionGateway.vue";
import HomeExploreLinks from "../components/HomeExploreLinks.vue";
import LeadershipSection from "../components/LeadershipSection.vue";
import WhatsAppContact from "../components/WhatsAppContact.vue";
import SectionHeading from "../components/SectionHeading.vue";
import BaseButton from "../components/BaseButton.vue";
import ProgramCard from "../components/ProgramCard.vue";
import FeatureCard from "../components/FeatureCard.vue";
import NewsCard from "../components/NewsCard.vue";
import TestimonialCard from "../components/TestimonialCard.vue";
import CTASection from "../components/CTASection.vue";
import AdmissionPopup from "../components/AdmissionPopup.vue";
const { t } = useI18n();
</script>
<template>
  <AdmissionPopup /><HeroSection /><HomeAdmissionGateway />
  <LeadershipSection />
  <HomeExploreLinks />
  <WhatsAppContact />

  <section class="section programs-section">
    <div class="container">
      <SectionHeading
        :eyebrow="$tr(t.home.programLabel)"
        :title="$tr(t.home.programTitle)"
        :description="$tr(t.home.programIntro)"
      />
      <div class="program-grid">
        <ProgramCard
          v-for="item in t.home.programs"
          :key="item.range"
          :item="item"
        />
      </div>
    </div>
  </section>
</template>
