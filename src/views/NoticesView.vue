<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { Megaphone, Search, Users, GraduationCap, Presentation, House, Pin, List, History, Filter, CalendarDays, BellOff, ChevronRight, ArrowUpRight, X } from 'lucide-vue-next'
import { notices, filterNotices } from '../data/notices.js'
import { useI18n } from '../composables/useI18n.js'
const { language, tr } = useI18n()
import { useRouter } from 'vue-router'
const router = useRouter()
const audiences = [
  { id: 'All', label: 'All', sidebar: 'Everyone', icon: Users },
  { id: 'Students', label: 'Students', sidebar: 'Students', icon: GraduationCap },
  { id: 'Faculty', label: 'Faculty', sidebar: 'Faculty & Staff', icon: Presentation },
  { id: 'Parents', label: 'Parents', sidebar: 'Parents', icon: House },
]
const query = ref('')
const audience = ref('All')
const sorted = [...notices].sort((a, b) => (b.published || '').localeCompare(a.published || ''))
const filtered = computed(() => filterNotices(sorted, query.value, audience.value, tr))
const pinned = computed(() => filtered.value.filter(item => item.pinned))
const regular = computed(() => filtered.value.filter(item => !item.pinned))
const recent = sorted.slice(0, 5)
const isFiltered = computed(() => query.value.trim() || audience.value !== 'All')
const count = (id) => sorted.filter(item => id === 'All' || item.audience === id).length
const formatDate = (value) => value ? new Intl.DateTimeFormat(language.value === 'bn' ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${value}T12:00:00`)) : 'Information update'
const datePart = (value, part) => new Intl.DateTimeFormat(language.value === 'bn' ? 'bn-BD' : 'en-GB', { [part]: part === 'day' ? '2-digit' : 'short' }).format(new Date(`${value}T12:00:00`))
function resetFilters() { query.value = ''; audience.value = 'All' }
const dialog = ref(null)
const selected = ref(null)
const closing = ref(false)
let previousFocus, previousOverflow, closeTimer
let locked = false
async function openNotice(notice, event) {
  if (notice.pdf) { router.push(`/notices/${notice.id}`); return }
  previousFocus = event.currentTarget
  selected.value = notice
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
  if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true })
}
function closeNotice() {
  if (closing.value) return
  closing.value = true
  closeTimer = setTimeout(() => {
    dialog.value?.close()
    selected.value = null
    closing.value = false
    restore()
  }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 180)
}
onBeforeUnmount(() => { clearTimeout(closeTimer); dialog.value?.close(); restore() })
</script>

<template>
  <section class="notice-banner"><div class="container notice-banner-inner">
    <span class="notice-eyebrow"><Megaphone :size="16" aria-hidden="true"/>{{ $tr(" INFORMATION") }}</span>
    <h1>{{ $tr("Notice ") }}<em>{{ $tr("Board") }}</em></h1>
    <nav :aria-label="$tr(&quot;Breadcrumb&quot;)"><RouterLink to="/">{{ $tr("Home") }}</RouterLink><ChevronRight :size="16" aria-hidden="true"/><span aria-current="page">{{ $tr("Notices") }}</span></nav>
  </div></section>
  <section class="notice-section"><div class="container notice-layout">
    <main class="notice-main" :aria-label="$tr(&quot;School notices&quot;)">
      <div class="notice-filterbar">
        <label class="notice-search"><Search :size="19" aria-hidden="true"/><span class="sr-only">{{ $tr("Search notices") }}</span><input v-model="query" type="search" :placeholder="$tr(&quot;Search notices…&quot;)" /></label>
        <div class="notice-tabs" role="group" :aria-label="$tr(&quot;Notice audience&quot;)">
          <button v-for="item in audiences" :key="item.id" type="button" :class="{ active: audience === item.id }" :aria-pressed="audience === item.id" @click="audience = item.id"><component :is="item.icon" :size="16" aria-hidden="true"/>{{ $tr(item.label) }}</button>
        </div>
      </div>
      <p class="sr-only" role="status">{{ $tr(filtered.length) }}{{ $tr(" matching notices, including ") }}{{ $tr(pinned.length) }}{{ $tr(" pinned.") }}</p>
      <section v-if="pinned.length" class="pinned-section" aria-labelledby="pinned-title">
        <h2 id="pinned-title" class="notice-section-title"><Pin :size="18" aria-hidden="true"/>{{ $tr(" Pinned notices") }}</h2>
        <button v-for="notice in pinned" :key="notice.id" type="button" class="notice-card pinned-card" @click="openNotice(notice, $event)">
          <span class="notice-card-icon"><Pin :size="21" aria-hidden="true"/></span>
          <span class="notice-card-copy"><strong>{{ $tr(notice.title) }}</strong><span class="notice-meta"><span><CalendarDays :size="14" aria-hidden="true"/>{{ $tr(formatDate(notice.published)) }}</span><span><Users :size="15" aria-hidden="true"/>{{ $tr(notice.audience) }}</span></span></span>
          <ArrowUpRight class="notice-card-arrow" :size="21" aria-hidden="true"/>
        </button>
      </section>
      <section aria-labelledby="all-notices-title">
        <div class="notice-list-heading"><h2 id="all-notices-title" class="notice-section-title"><List :size="18" aria-hidden="true"/>{{ $tr(" All notices") }}</h2><span class="notice-count">{{ $tr("Showing ") }}{{ $tr(regular.length) }} {{ $tr(regular.length === 1 ? 'notice' : 'notices') }}</span></div>
        <Transition name="notice-results" mode="out-in">
          <div v-if="regular.length" :key="`${audience}-${query}`" class="notice-list">
            <RouterLink v-for="notice in regular" :key="notice.id" :to="`/notices/${notice.id}`" class="pdf-notice-card">
              <span class="pdf-date"><strong>{{ $tr(datePart(notice.published, 'day')) }}</strong><span>{{ $tr(datePart(notice.published, 'month')) }}</span><span>{{ $tr(notice.published.slice(2,4)) }}</span></span>
              <span class="pdf-card-content"><small v-if="notice.demo">{{ $tr("Demo PDF · নমুনা") }}</small><strong lang="bn">{{ $tr(notice.title) }}</strong><span>{{ $tr("Read notice ↗") }}</span></span>
            </RouterLink>
          </div>
          <div v-else :key="isFiltered ? 'no-matches' : 'empty'" class="notice-empty"><BellOff :size="62" :stroke-width="1.4" aria-hidden="true"/><h3>{{ $tr(isFiltered && !pinned.length ? 'No notices found' : 'No new notices yet') }}</h3><p>{{ $tr(isFiltered && !pinned.length ? 'No notices match your search and audience. Try another filter or keyword.' : 'New school announcements will appear here once confirmed. Please check back soon.') }}</p><button v-if="isFiltered" class="reset-filters" type="button" @click="resetFilters">{{ $tr("Clear filters") }}</button></div>
        </Transition>
      </section>
    </main>
    <aside class="notice-sidebar" :aria-label="$tr(&quot;Notice shortcuts&quot;)">
      <section class="sidebar-card"><h2><History :size="21" aria-hidden="true"/>{{ $tr(" Recent notices") }}</h2><div class="sidebar-body"><button v-for="notice in recent" :key="notice.id" class="recent-notice" type="button" @click="openNotice(notice, $event)"><span class="recent-date"><template v-if="notice.published"><strong>{{ $tr(datePart(notice.published, 'day')) }}</strong><small>{{ $tr(datePart(notice.published, 'month')) }}</small></template><Megaphone v-else :size="24" aria-hidden="true"/></span><span>{{ $tr(notice.title) }}</span></button><p v-if="!recent.length" class="sidebar-empty">{{ $tr("No notices published yet.") }}</p></div></section>
      <section class="sidebar-card"><h2><Filter :size="21" aria-hidden="true"/>{{ $tr(" Filter by audience") }}</h2><div class="sidebar-body audience-options"><button v-for="item in audiences" :key="item.id" type="button" :class="{ active: audience === item.id }" :aria-pressed="audience === item.id" @click="audience = item.id"><component :is="item.icon" :size="19" aria-hidden="true"/><span>{{ $tr(item.sidebar) }}</span><span class="audience-count">{{ $tr(count(item.id)) }}</span></button></div></section>
    </aside>
  </div></section>
  <Teleport to="body"><dialog ref="dialog" class="notice-dialog" :class="{ closing }" aria-labelledby="notice-dialog-title" @cancel.prevent="closeNotice" @close="restore" @click="event => { if (event.target === dialog) closeNotice() }">
    <article v-if="selected" class="notice-dialog-panel"><header class="notice-dialog-header"><span class="dialog-audience"><Users :size="15" aria-hidden="true"/>{{ $tr(selected.audience) }}</span><h2 id="notice-dialog-title">{{ $tr(selected.title) }}</h2><button type="button" class="notice-dialog-close" :aria-label="$tr(&quot;Close notice&quot;)" autofocus @click="closeNotice"><X :size="23" aria-hidden="true"/></button></header>
      <div class="dialog-dates"><span><CalendarDays :size="16" aria-hidden="true"/>{{ $tr(selected.published ? `Published: ${formatDate(selected.published)}` : 'Information update · Publication date not announced') }}</span><span v-if="selected.expires">{{ $tr("Expires: ") }}{{ $tr(formatDate(selected.expires)) }}</span></div>
      <div class="notice-dialog-body"><p v-for="(paragraph, index) in selected.body" :key="index">{{ $tr(paragraph) }}</p><RouterLink class="notice-contact" to="/contact" @click="closeNotice">{{ $tr("Contact the school ") }}<ArrowUpRight :size="18" aria-hidden="true"/></RouterLink></div>
    </article>
  </dialog></Teleport>
</template>

<style scoped>
.notice-banner{position:relative;isolation:isolate;overflow:hidden;background:linear-gradient(105deg,#082a47 10%,#193e56 65%,#c1b48e);color:white}.notice-banner::before,.notice-banner::after{content:'';position:absolute;z-index:-1;width:280px;height:280px;border-radius:50%;background:#ffffff07;left:9%;top:70px}.notice-banner::after{width:410px;height:410px;left:auto;right:-90px;top:-160px;background:#e4c68318}.notice-banner-inner{padding-block:42px 58px}.notice-eyebrow{display:inline-flex;align-items:center;gap:10px;border:1px solid #e4c68365;border-radius:30px;background:#e4c68315;color:#e4c683;padding:9px 17px;font-size:12px;font-weight:800;letter-spacing:.2em}.notice-banner h1{font-size:clamp(42px,4.5vw,64px);line-height:1.15;margin:18px 0 22px;color:white;font-weight:700}.notice-banner em{color:#e4c683}.notice-banner nav{display:flex;align-items:center;gap:8px;color:#cbdadb;font-size:15px}.notice-banner nav span{color:#e4c683;font-weight:700}.notice-banner nav a:hover{color:white}
.notice-section{padding:76px 0 90px;background:#fafbf8}.notice-layout{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:32px;align-items:start}.notice-main{min-width:0}.notice-filterbar{display:flex;flex-wrap:wrap;align-items:center;gap:14px;padding:16px;background:white;border:1px solid #e0e5df;border-radius:20px;box-shadow:0 3px 9px #18313e08;margin-bottom:32px}.notice-search{display:flex;align-items:center;gap:10px;flex:1 1 200px;padding:12px 15px;border:1px solid #dfe5df;background:#fafbf8;border-radius:30px;color:#738079;transition:border-color .25s,box-shadow .25s}.notice-search:focus-within{border-color:#0e5b4a;box-shadow:0 0 0 3px #0e5b4a12}.notice-search input{width:100%;min-width:0;background:none;border:0;color:#18313e;font-size:14px;outline:none}.notice-tabs{display:flex;gap:7px;flex-wrap:wrap}.notice-tabs button{display:inline-flex;align-items:center;gap:6px;border-radius:30px;padding:11px 13px;border:1px solid #dfe5df;background:white;color:#596760;font-size:12px;font-weight:700;transition:background .25s,color .25s,transform .25s,box-shadow .25s}.notice-tabs button:hover{transform:translateY(-2px);box-shadow:0 5px 15px #0e5b4a15;color:#0e5b4a}.notice-tabs button.active{background:#0e5b4a;border-color:#0e5b4a;color:white}
.notice-section-title{display:flex;align-items:center;gap:9px;font-family:inherit;font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:.13em;color:#082a47;margin:0}.notice-section-title svg{color:#b89345;flex-shrink:0}.pinned-section{margin-bottom:30px}.pinned-section>h2{margin-bottom:18px}.notice-card{display:flex;align-items:center;gap:16px;width:100%;text-align:left;padding:20px;border:1px solid #e0e5df;background:white;border-radius:13px;margin-bottom:12px;color:#18313e;transition:transform .3s ease-out,box-shadow .3s,border-color .3s}.pinned-card{background:linear-gradient(110deg,#fbf5e9,white 75%);border-color:#e4c68380;border-left:5px solid #b89345}.notice-card:hover{transform:translateY(-4px);box-shadow:0 12px 25px #18313e12;border-color:#b89345}.notice-card-icon{display:grid;place-items:center;width:42px;height:42px;flex-shrink:0;border-radius:10px;background:#0e5b4a;color:white;transition:transform .3s ease-out}.pinned-card .notice-card-icon{background:#b89345;transform:rotate(-15deg)}.pinned-card:hover .notice-card-icon{transform:rotate(0)}.notice-card-copy{min-width:0;flex:1}.notice-card-copy>strong{display:block;font:700 20px/1.3 Georgia,serif;overflow-wrap:anywhere}.notice-meta{display:flex;flex-wrap:wrap;gap:8px 14px;margin-top:8px;color:#738079;font-size:12px}.notice-meta>span{display:inline-flex;align-items:center;gap:4px}.notice-meta svg{color:#b89345}.notice-card-arrow{color:#0e5b4a;flex-shrink:0;transition:transform .3s}.notice-card:hover .notice-card-arrow{transform:translate(2px,-2px)}.notice-list-heading{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px}.notice-count{border:1px solid #e0e5df;background:white;padding:7px 12px;border-radius:25px;font-size:12px;color:#738079;white-space:nowrap}.notice-empty{text-align:center;background:white;border:1px dashed #dfe5df;border-radius:22px;padding:58px 24px;min-height:280px}.notice-empty>svg{color:#d4dcd5;margin:0 auto 18px}.notice-empty h3{font:400 30px/1.2 Georgia,serif;color:#18313e;margin-bottom:14px}.notice-empty p{color:#738079;font-size:16px;max-width:560px;margin:auto}.reset-filters,.notice-contact{display:inline-flex;align-items:center;gap:12px;border:0;border-radius:6px;background:#0e5b4a;color:white;padding:12px 18px;margin-top:22px;font-size:14px;font-weight:700;transition:background .25s,transform .25s}.reset-filters:hover,.notice-contact:hover{background:#084b3c;transform:translateY(-2px)}
.notice-sidebar{display:grid;gap:24px;padding-top:145px}.sidebar-card{background:white;border:1px solid #e0e5df;border-radius:22px;overflow:hidden;box-shadow:0 3px 10px #18313e08}.sidebar-card h2{display:flex;align-items:center;gap:10px;padding:18px 20px;background:#082a47;color:white;font-family:inherit;font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;margin:0}.sidebar-card h2 svg{color:#e4c683;flex-shrink:0}.sidebar-body{padding:20px}.recent-notice{display:flex;align-items:center;gap:14px;text-align:left;width:100%;border:0;background:white;color:#18313e;padding:8px 0;font-size:13px;line-height:1.5;transition:color .25s,transform .25s}.recent-notice:hover{color:#0e5b4a;transform:translateX(3px)}.recent-date{display:grid;place-items:center;flex-shrink:0;width:46px;min-height:52px;padding:7px;border-radius:7px;background:#eef3ef;color:#0e5b4a}.recent-date strong{font-size:22px;line-height:1}.recent-date small{text-transform:uppercase;color:#a77d31;font-size:10px}.audience-options{display:grid;gap:8px}.audience-options button{display:flex;align-items:center;gap:10px;text-align:left;border:1px solid #e0e5df;border-radius:12px;padding:12px;background:#fafbf8;color:#43564d;font-size:13px;transition:background .25s,border-color .25s,transform .25s}.audience-options button>svg{color:#a77d31}.audience-options button:hover{transform:translateX(3px);border-color:#b89345}.audience-options button.active{background:#f9f3e7;color:#866323;border-color:#e4c683}.audience-count{margin-left:auto;display:grid;place-items:center;min-width:25px;height:25px;border:1px solid #e0e5df;border-radius:50%;background:white}.active .audience-count{background:#0e5b4a;color:white;border-color:#0e5b4a}.sidebar-empty{font-size:14px;color:#738079}
.notice-dialog{max-width:none;max-height:none;width:100%;height:100dvh;margin:0;padding:24px;border:0;background:transparent;overflow:hidden}.notice-dialog[open]{display:grid;place-items:center}.notice-dialog::backdrop{background:#061426cc;backdrop-filter:blur(6px)}.notice-dialog-panel{width:min(100%,820px);max-height:calc(100dvh - 48px);overflow:auto;border-radius:28px;background:white;box-shadow:0 25px 80px #0004;animation:notice-open .25s ease-out both}.notice-dialog-header{position:relative;overflow:hidden;isolation:isolate;background:linear-gradient(120deg,#082a47,#164f5b);padding:32px 70px 32px 34px;color:white}.notice-dialog-header::after{content:'';position:absolute;z-index:-1;width:200px;height:200px;right:-45px;top:-70px;border-radius:50%;background:#ffffff0c}.dialog-audience{display:inline-flex;gap:7px;align-items:center;padding:6px 11px;border-radius:30px;background:#eaf2ed;color:#0e5b4a;font-size:12px;text-transform:uppercase;letter-spacing:.07em;font-weight:700}.notice-dialog-header h2{font-size:clamp(28px,3vw,40px);color:white;line-height:1.2;margin:18px 0 0}.notice-dialog-close{position:absolute;right:18px;top:18px;display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:#ffffff15;border:1px solid #ffffff45;color:white;transition:background .25s,transform .25s}.notice-dialog-close:hover{background:#ffffff30;transform:rotate(90deg)}.dialog-dates{display:flex;flex-wrap:wrap;gap:12px;padding:16px 34px;background:#fafbf8;border-bottom:1px solid #e0e5df;color:#62736b;font-size:13px}.dialog-dates span{display:inline-flex;align-items:center;gap:8px}.dialog-dates svg{color:#b89345}.notice-dialog-body{padding:30px 34px 36px;color:#53615b;font-size:17px}.notice-dialog-body p+p{margin-top:16px}.closing .notice-dialog-panel{animation:notice-close .18s ease-in both}.notice-results-enter-active,.notice-results-leave-active{transition:opacity .18s,transform .18s}.notice-results-enter-from,.notice-results-leave-to{opacity:0;transform:translateY(6px)}@keyframes notice-open{from{opacity:0;transform:translateY(18px) scale(.97)}to{opacity:1;transform:none}}@keyframes notice-close{to{opacity:0;transform:translateY(10px) scale(.98)}}
@media(max-width:1000px){.notice-layout{grid-template-columns:minmax(0,1fr) 260px;gap:22px}.notice-sidebar{padding-top:170px}.notice-filterbar{gap:12px}.notice-search{flex-basis:100%}}
@media(max-width:760px){.notice-layout{grid-template-columns:1fr}.notice-sidebar{padding-top:8px;grid-template-columns:1fr 1fr;gap:16px}.notice-section{padding:40px 0 60px}.notice-banner-inner{padding-block:32px 40px}.notice-dialog{padding:12px}.notice-dialog-panel{max-height:calc(100dvh - 24px);border-radius:20px}.notice-dialog-header{padding:26px 65px 26px 24px}.dialog-dates,.notice-dialog-body{padding:22px}.notice-dialog-body{font-size:16px}}
@media(max-width:480px){.notice-sidebar{grid-template-columns:1fr}.notice-card{padding:16px 12px;gap:10px}.notice-card-copy>strong{font-size:18px}.notice-card-arrow{display:none}.notice-tabs{gap:5px}.notice-tabs button{padding:10px;font-size:11px}.notice-section-title{font-size:12px;letter-spacing:.08em}.notice-count{font-size:11px}.notice-empty{padding:40px 18px}.notice-empty h3{font-size:26px}}
@media(prefers-reduced-motion:reduce){.notice-dialog-panel,.closing .notice-dialog-panel{animation:none}.notice-results-enter-active,.notice-results-leave-active{transition:none}}
.notice-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.pdf-notice-card{display:flex;min-height:145px;background:#eaf2ed;color:#0e5b4a;overflow:hidden;border-radius:4px;transition:transform .3s ease-out,box-shadow .3s}.pdf-notice-card:hover{transform:translateY(-5px);box-shadow:0 12px 25px #18313e18}.pdf-date{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:16px 12px;background:#082a47;color:white;min-width:60px;font-size:20px;line-height:1.2}.pdf-date strong{font-size:25px}.pdf-card-content{padding:15px 12px;display:flex;flex-direction:column;gap:10px;min-width:0}.pdf-card-content>strong{font-size:18px;line-height:1.5;font-weight:500}.pdf-card-content small{font-size:10px;color:#836322;font-weight:700}.pdf-card-content>span{font-size:11px;margin-top:auto}
@media(max-width:1150px){.notice-list{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:480px){.notice-list{grid-template-columns:1fr}}
</style>

