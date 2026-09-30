<script setup>
import { images } from '../data/content.js'
import { useI18n } from '../composables/useI18n.js'
const {t}=useI18n()
</script>
<template><div class="gallery"><figure><img :src="images.campusFront" :alt="$tr(&quot;Front elevation concept of PIISC campus&quot;)" loading="lazy"/><figcaption>{{$tr(t.common.concept)}}</figcaption></figure><figure><img :src="images.campusView" :alt="$tr(&quot;Additional PIISC campus concept provided by the school&quot;)" loading="lazy"/><figcaption>{{$tr(t.common.concept)}}</figcaption></figure><figure><img :src="images.students" :alt="$tr(&quot;School supplied student and campus promotional concept&quot;)" loading="lazy"/><figcaption>{{$tr(t.common.concept)}}</figcaption></figure></div></template>
