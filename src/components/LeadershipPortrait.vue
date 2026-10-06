<script setup>
import { ref } from "vue";
defineProps({ leader: { type: Object, required: true } });
const failed = ref(false);
</script>

<template>
  <div class="leadership-portrait w-[210px] [aspect-ratio:3_/_3.5] overflow-hidden [border:3px_solid_#bb9952] rounded-[8px] [background:#e8edf3] [box-shadow:0_12px_30px_#09264520]">
    <img class="block w-[100%] h-[100%] object-cover [object-position:center_top]"
      v-if="!failed"
      :src="leader.photo"
      :alt="$tr(leader.name)"
      width="240"
      height="280"
      loading="lazy"
      @error="failed = true"
    />
    <div
      v-else
      class="portrait-placeholder grid place-items-center h-[100%] [background:linear-gradient(145deg,_#edf1f7,_#ccd7e5)] [color:#163c63]"
      :aria-label="$tr(leader.name)"
      role="img"
    >
      <span class="grid place-items-center w-[110px] h-[110px] [border:1px_solid_#163c6330] rounded-[50%] [font:500_40px_Georgia,_serif]">{{ $tr(leader.initials) }}</span>
    </div>
  </div>
</template>
