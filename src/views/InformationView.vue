<script setup>
import PageHero from '../components/PageHero.vue'
import BaseButton from '../components/BaseButton.vue'
defineProps({ title: String, description: String })
</script>
<template>
  <PageHero :eyebrow="$tr(&quot;PEACE INTERNATIONAL ISLAMIC SCHOOL &amp; COLLEGE&quot;)" :title="$tr(title)" :lead="$tr(description)" />
  <section class="section"><div class="container"><p style="margin-bottom: 24px">{{ $tr("Information coming soon.") }}</p><BaseButton to="/contact" outline>{{ $tr("Contact PIISC") }}</BaseButton></div></section>
</template>
