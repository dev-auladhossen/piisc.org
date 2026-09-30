<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { Images, Grid2X2, CalendarDays, Trophy, GraduationCap, Building2, ChevronRight, ChevronLeft, X } from 'lucide-vue-next'
import { galleryPhotos } from '../data/gallery.js'
const categories = [ { name: 'All Photos', icon: Grid2X2 }, { name: 'Events', icon: CalendarDays }, { name: 'Sports', icon: Trophy }, { name: 'Academics', icon: GraduationCap }, { name: 'Campus', icon: Building2 } ]
const category = ref('All Photos')
const filtered = computed(() => galleryPhotos.filter(photo => category.value === 'All Photos' || photo.category === category.value))
const selected = ref(null)
const selectedIndex = computed(() => filtered.value.findIndex(photo => photo.id === selected.value?.id))
const dialog = ref(null)
const closing = ref(false)
let previousFocus
let previousOverflow
let closeTimer
let locked = false
async function openPhoto(photo, event) {
  previousFocus = event.currentTarget
  selected.value = photo
  await nextTick()
  previousOverflow = document.body.style.overflow
  dialog.value.showModal()
  document.body.style.overflow = 'hidden'
  locked = true
}
function restore() {
  if (!locked) return
  document.body.style.overflow = previousOverflow
  locked = false
  previousFocus?.focus({ preventScroll: true })
}
function close() {
  if (closing.value) return
  closing.value = true
  const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 200
  closeTimer = setTimeout(() => { dialog.value?.close(); closing.value = false; selected.value = null; restore() }, delay)
}
function move(direction) {
  if (closing.value) return
  selected.value = filtered.value[(selectedIndex.value + direction + filtered.value.length) % filtered.value.length]
}
onBeforeUnmount(() => { clearTimeout(closeTimer); dialog.value?.close(); restore() })
</script>

<template>
  <section class="gallery-banner">
    <div class="container gallery-banner-inner">
      <span class="media-label"><Images :size="16" aria-hidden="true"/>{{ $tr(" MEDIA") }}</span>
      <h1>{{ $tr("School ") }}<em>{{ $tr("Gallery") }}</em></h1>
      <nav :aria-label="$tr(&quot;Breadcrumb&quot;)"><RouterLink to="/">{{ $tr("Home") }}</RouterLink><ChevronRight :size="16" aria-hidden="true"/><span aria-current="page">{{ $tr("Gallery") }}</span></nav>
    </div>
  </section>
  <section class="gallery-section">
    <div class="container">
      <div class="gallery-filters" role="group" :aria-label="$tr(&quot;Filter photos by category&quot;)">
        <button v-for="item in categories" :key="item.name" type="button" :aria-pressed="category === item.name" :class="{ active: category === item.name }" @click="category = item.name"><component :is="item.icon" :size="17" aria-hidden="true"/>{{ $tr(item.name) }}</button>
      </div>
      <p class="sr-only" role="status">{{ $tr(filtered.length) }}{{ $tr(" photos in ") }}{{ $tr(category) }}</p>
      <TransitionGroup name="gallery-card" tag="div" class="school-gallery-grid">
        <figure v-for="photo in filtered" :key="photo.id" class="gallery-photo-card">
          <button type="button" class="gallery-photo-button" :aria-label="$tr(`Open photo: ${photo.caption}`)" @click="openPhoto(photo, $event)">
            <img :src="photo.image" :alt="$tr(photo.caption)" loading="lazy" width="600" height="480"/>
            <span class="photo-overlay" aria-hidden="true"></span><span class="photo-hover-caption" aria-hidden="true">{{ $tr(photo.caption) }}</span>
          </button>
          <figcaption class="sr-only">{{ $tr(photo.caption) }}</figcaption>
        </figure>
      </TransitionGroup>
    </div>
  </section>
  <Teleport to="body">
    <dialog ref="dialog" class="gallery-lightbox" :class="{ 'is-closing': closing }" :aria-label="$tr(&quot;School photo viewer&quot;)" aria-describedby="gallery-photo-caption" @cancel.prevent="close" @close="restore" @click="event => { if (event.target === dialog) close() }" @keydown.left.prevent="move(-1)" @keydown.right.prevent="move(1)">
      <div v-if="selected" class="lightbox-panel">
        <div class="lightbox-toolbar"><span>{{ $tr(selected.category) }} <span class="lightbox-count">{{ $tr(selectedIndex + 1) }} / {{ $tr(filtered.length) }}</span></span><button type="button" autofocus :aria-label="$tr(&quot;Close photo viewer&quot;)" @click="close"><X :size="24" aria-hidden="true"/></button></div>
        <div class="lightbox-image-area">
          <Transition name="lightbox-photo" mode="out-in"><img :key="selected.id" :src="selected.image" :alt="$tr(selected.caption)" /></Transition>
          <button type="button" class="lightbox-previous" :aria-label="$tr(&quot;Previous photo&quot;)" @click="move(-1)"><ChevronLeft aria-hidden="true"/></button>
          <button type="button" class="lightbox-next" :aria-label="$tr(&quot;Next photo&quot;)" @click="move(1)"><ChevronRight aria-hidden="true"/></button>
        </div>
        <p id="gallery-photo-caption" class="lightbox-caption" aria-live="polite">{{ $tr(selected.caption) }}</p>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.gallery-banner{position:relative;isolation:isolate;overflow:hidden;background:linear-gradient(105deg,#082a47 10%,#193e56 65%,#c1b48e);color:white}.gallery-banner::before,.gallery-banner::after{content:'';position:absolute;z-index:-1;border-radius:50%;background:#ffffff07;width:280px;height:280px;left:9%;top:70px}.gallery-banner::after{width:410px;height:410px;left:auto;right:-90px;top:-160px;background:#e4c68318}.gallery-banner-inner{padding-block:40px 58px}.media-label{display:inline-flex;align-items:center;gap:10px;padding:9px 17px;border:1px solid #e4c68365;border-radius:30px;background:#e4c68315;color:#e4c683;font-size:12px;font-weight:800;letter-spacing:.2em}.gallery-banner h1{font-size:clamp(42px,4.5vw,64px);margin:18px 0 22px;color:white;font-weight:700;line-height:1.15}.gallery-banner h1 em{color:#e4c683}.gallery-banner nav{display:flex;align-items:center;gap:8px;font-size:15px;color:#cbdadb}.gallery-banner nav span{color:#e4c683;font-weight:700}.gallery-banner nav a:hover{color:white}
.gallery-section{padding:74px 0 90px;background:#fafbf8;min-height:550px}.gallery-filters{display:flex;justify-content:center;flex-wrap:wrap;gap:12px;margin-bottom:42px}.gallery-filters button{display:inline-flex;align-items:center;justify-content:center;gap:9px;border:1px solid #dde4de;border-radius:40px;padding:14px 24px;background:white;color:#596760;font-size:15px;font-weight:700;box-shadow:0 2px 5px #18313e06;transition:color .28s,background .28s,border-color .28s,transform .28s,box-shadow .28s}.gallery-filters button:hover{transform:translateY(-3px);color:#0e5b4a;border-color:#8daa9a;box-shadow:0 8px 20px #0e5b4a12}.gallery-filters button.active{background:#0e5b4a;color:white;border-color:#0e5b4a;box-shadow:0 8px 22px #0e5b4a20}
.school-gallery-grid{position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px}.gallery-photo-card{margin:0;min-width:0;background:white;border:1px solid #e0e6df;border-radius:13px;overflow:hidden;box-shadow:0 3px 12px #18313e07;transition:box-shadow .35s}.gallery-photo-card:hover{box-shadow:0 12px 26px #18313e16}.gallery-photo-button{position:relative;display:block;border:0;padding:0;width:100%;aspect-ratio:1.12;overflow:hidden;background:#e8eee8;cursor:zoom-in}.gallery-photo-button img{width:100%;height:100%;object-fit:cover;transform:scale(1.07) translateX(1.5%);transition:transform .7s ease-out}
.gallery-photo-button:hover img,.gallery-photo-button:focus-visible img{transform:scale(1.07) translateX(-1.5%)}
.photo-overlay{position:absolute;inset:0;background:linear-gradient(270deg,#06131cb8,#06131c80);transform:translateX(101%);transition:transform .55s ease-out;pointer-events:none}
.gallery-photo-button:hover .photo-overlay,.gallery-photo-button:focus-visible .photo-overlay{transform:translateX(0)}
.photo-hover-caption{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;color:white;text-align:center;font-family:Georgia,serif;font-size:clamp(18px,1.4vw,24px);font-weight:700;line-height:1.5;text-shadow:0 2px 8px #0005;opacity:0;transform:translateX(18px);transition:opacity .35s ease-out,transform .55s ease-out;pointer-events:none}
.gallery-photo-button:hover .photo-hover-caption,.gallery-photo-button:focus-visible .photo-hover-caption{opacity:1;transform:translateX(0);transition-delay:.12s}.gallery-photo-button:focus-visible{outline-offset:-4px}.gallery-card-enter-active,.gallery-card-leave-active,.gallery-card-move{transition:opacity .3s,transform .3s}.gallery-card-enter-from,.gallery-card-leave-to{opacity:0;transform:translateY(14px) scale(.97)}.gallery-card-leave-active{position:absolute;pointer-events:none}
.gallery-lightbox{max-width:none;max-height:none;width:100%;height:100dvh;margin:0;padding:24px;border:0;background:transparent;color:white;overflow:hidden}.gallery-lightbox[open]{display:grid;place-items:center}.gallery-lightbox::backdrop{background:#041523e8;backdrop-filter:blur(7px)}.lightbox-panel{width:min(100%,1050px);max-height:100%;min-height:0;display:flex;flex-direction:column;background:#082a47;border:1px solid #ffffff25;border-radius:12px;overflow:hidden;box-shadow:0 24px 80px #0006;animation:lightbox-open .25s ease both}.lightbox-toolbar{display:flex;justify-content:space-between;align-items:center;padding:10px 16px;color:#e4c683;font-size:14px;font-weight:700;flex-shrink:0}.lightbox-count{margin-left:15px;color:#cedbdc;font-weight:400}.lightbox-toolbar button,.lightbox-image-area button{display:grid;place-items:center;background:#082a47c9;color:white;border:1px solid #ffffff40;border-radius:50%;width:42px;height:42px;transition:background .2s,transform .2s}.lightbox-toolbar button:hover,.lightbox-image-area button:hover{background:#0e5b4a;transform:scale(1.06)}.lightbox-image-area{position:relative;display:grid;place-items:center;min-height:0;height:min(68dvh,700px);background:#041523}.lightbox-image-area>img{width:100%;height:100%;min-height:0;object-fit:contain}.lightbox-image-area button{position:absolute;top:50%;margin-top:-21px}.lightbox-previous{left:14px}.lightbox-next{right:14px}.lightbox-caption{padding:18px 24px;font-size:16px;line-height:1.5;color:#f4f5ed;flex-shrink:0}.is-closing .lightbox-panel{animation:lightbox-close .2s ease both}.lightbox-photo-enter-active,.lightbox-photo-leave-active{transition:opacity .16s}.lightbox-photo-enter-from,.lightbox-photo-leave-to{opacity:0}@keyframes lightbox-open{from{opacity:0;transform:translateY(18px) scale(.96)}to{opacity:1;transform:none}}@keyframes lightbox-close{to{opacity:0;transform:translateY(10px) scale(.97)}}
@media(max-width:1000px){.school-gallery-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}}
@media(max-width:760px){.school-gallery-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.gallery-section{padding:42px 0 60px}.gallery-filters{gap:8px;margin-bottom:28px}.gallery-filters button{padding:11px 16px;font-size:13px}.gallery-banner-inner{padding-block:32px 40px}.gallery-lightbox{padding:12px}.lightbox-caption{padding:14px 16px;font-size:14px}.photo-overlay{padding:12px}}
@media(max-width:440px){.school-gallery-grid{grid-template-columns:1fr}.gallery-photo-button{aspect-ratio:1.3}.gallery-banner h1{font-size:42px}}
@media(prefers-reduced-motion:reduce){.lightbox-panel,.is-closing .lightbox-panel{animation:none}.gallery-card-enter-active,.gallery-card-leave-active,.gallery-card-move,.lightbox-photo-enter-active,.lightbox-photo-leave-active{transition:none}}
</style>

