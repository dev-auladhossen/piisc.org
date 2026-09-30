<script setup>
import { ref } from "vue";
defineProps({ leader: { type: Object, required: true } });
const failed = ref(false);
</script>

<template>
  <div class="leadership-portrait">
    <img
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
      class="portrait-placeholder"
      :aria-label="$tr(leader.name)"
      role="img"
    >
      <span>{{ $tr(leader.initials) }}</span>
    </div>
  </div>
</template>

<style scoped>
.leadership-portrait {
  width: 210px;
  aspect-ratio: 3 / 3.5;
  overflow: hidden;
  border: 3px solid #bb9952;
  border-radius: 8px;
  background: #e8edf3;
  box-shadow: 0 12px 30px #09264520;
}
img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}
.portrait-placeholder {
  display: grid;
  place-items: center;
  height: 100%;
  background: linear-gradient(145deg, #edf1f7, #ccd7e5);
  color: #163c63;
}
.portrait-placeholder span {
  display: grid;
  place-items: center;
  width: 110px;
  height: 110px;
  border: 1px solid #163c6330;
  border-radius: 50%;
  font:
    500 40px Georgia,
    serif;
}
</style>
