<script setup>
import { useI18n } from '../composables/useI18n.js'
const {t}=useI18n()
</script>
<template><section class="stats-band" :aria-label="$tr(t.home.statsTitle)"><div class="container stats-grid"><div><strong>2026</strong><span>{{$tr(t.common.since)}}</span></div><div><strong>1—12</strong><span>{{$tr(t.common.classes)}}</span></div><div><strong>{{ $tr("EN") }}</strong><span>{{$tr(t.common.medium)}}</span></div><div><strong>{{ $tr("PIISC") }}</strong><span>{{$tr(t.common.values)}}</span></div></div></section></template>
