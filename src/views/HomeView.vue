<script setup>
import { images, news, address } from "../data/content.js";
import { useI18n } from "../composables/useI18n.js";
import HeroSection from "../components/HeroSection.vue";
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
  <AdmissionPopup /><HeroSection /><HomeExploreLinks />
  <LeadershipSection />
  <WhatsAppContact />
  <section class="section intro-section">
    <div class="container split-layout">
      <div class="intro-visual image-frame">
        <img
          :src="images.students"
          :alt="$tr(&quot;PIISC school supplied student and building concept artwork&quot;)"
          loading="lazy"
        /><span class="image-caption">{{ $tr(t.common.concept) }}</span>
      </div>
      <div class="split-copy">
        <SectionHeading
          :eyebrow="$tr(t.home.introLabel)"
          :title="$tr(t.home.introTitle)"
          :description="$tr(t.home.intro)"
        /><BaseButton to="/about" outline>{{ $tr(t.common.learn) }}</BaseButton>
      </div>
    </div>
  </section>
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
  <section class="faith-section">
    <div class="container faith-layout">
      <div class="faith-image">
        <img
          :src="images.artwork"
          :alt="$tr(&quot;PIISC English medium promotional artwork supplied by the school&quot;)"
          loading="lazy"
        /><small>{{ $tr(t.common.concept) }}</small>
      </div>
      <div class="faith-copy">
        <SectionHeading
          :eyebrow="$tr(t.home.faithLabel)"
          :title="$tr(t.home.faithTitle)"
          :description="$tr(t.home.faithText)"
          light
        /><BaseButton to="/academics" light>{{ $tr(t.common.explore) }}</BaseButton>
      </div>
    </div>
  </section>
  <section class="section why-section">
    <div class="container">
      <SectionHeading :eyebrow="$tr(t.home.whyLabel)" :title="$tr(t.home.whyTitle)" />
      <div class="feature-grid">
        <FeatureCard
          v-for="item in t.home.features"
          :key="item.title"
          :item="item"
        />
      </div>
    </div>
  </section>
  <section class="section purpose-section">
    <div class="container">
      <SectionHeading
        :eyebrow="$tr(t.home.purposeLabel)"
        :title="$tr(t.home.purposeTitle)"
      />
      <div class="purpose-grid">
        <article v-for="item in t.home.purpose" :key="item.n">
          <span>{{ $tr(item.n) }}</span>
          <h3>{{ $tr(item.title) }}</h3>
          <p>{{ $tr(item.body) }}</p>
        </article>
      </div>
    </div>
  </section>
  <section class="section campus-preview">
    <div class="container campus-preview-layout">
      <div class="campus-copy">
        <SectionHeading
          :eyebrow="$tr(t.home.campusLabel)"
          :title="$tr(t.home.campusTitle)"
          :description="$tr(t.home.campusText)"
        /><BaseButton to="/campus" outline>{{ $tr(t.common.view) }}</BaseButton>
      </div>
      <div class="image-frame campus-preview-image">
        <img
          :src="images.campusView"
          :alt="$tr(&quot;PIISC campus building concept provided by the school&quot;)"
          loading="lazy"
        /><span class="image-caption">{{ $tr(t.common.concept) }}</span>
      </div>
    </div>
  </section>
  <section class="section life-section">
    <div class="container life-layout">
      <span class="life-number">{{ $tr("PIISC / 2026") }}</span>
      <div>
        <SectionHeading
          :eyebrow="$tr(t.home.lifeLabel)"
          :title="$tr(t.home.lifeTitle)"
          :description="$tr(t.home.lifeText)"
        />
      </div>
    </div>
  </section>
  <section class="section news-section">
    <div class="container">
      <div class="section-header-row">
        <SectionHeading
          :eyebrow="$tr(t.home.newsLabel)"
          :title="$tr(t.home.newsTitle)"
        /><BaseButton to="/news" outline>{{ $tr(t.nav.news) }}</BaseButton>
      </div>
      <div class="news-grid">
        <NewsCard
          v-for="item in news.slice(0, 2)"
          :key="item.slug"
          :item="item"
        />
      </div>
    </div>
  </section>
  <section class="section voices-section">
    <div class="container voices-layout">
      <SectionHeading
        :eyebrow="$tr(t.home.voicesLabel)"
        :title="$tr(t.home.voicesTitle)"
      /><TestimonialCard :title="$tr(t.common.coming)" :body="t.home.voicesBody" />
    </div>
  </section>
  <CTASection />
  <section class="section location-section">
    <div class="container location-layout">
      <SectionHeading
        :eyebrow="$tr(t.home.locationLabel)"
        :title="$tr(t.home.locationTitle)"
        :description="$tr(address)"
      /><BaseButton to="/contact" outline>{{ $tr(t.common.contact) }}</BaseButton>
    </div>
  </section>
</template>
