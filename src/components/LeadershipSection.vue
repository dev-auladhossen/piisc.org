<script setup>
import { nextTick, onBeforeUnmount, ref } from 'vue'
import { ArrowRight, ArrowUpRight, Quote, X } from 'lucide-vue-next'
import { leaders } from '../data/leadership.js'
import LeadershipPortrait from './LeadershipPortrait.vue'

const selected = ref(null)
const dialog = ref(null)
const closing = ref(false)
let trigger
let previousOverflow
let locked = false
let animation

function restorePage() {
  if (!locked) return
  document.body.style.overflow = previousOverflow
  locked = false
  if (trigger?.isConnected) trigger.focus({ preventScroll: true })
  closing.value = false
}

async function openMessage(leader, event) {
  if (dialog.value?.open || closing.value) return
  trigger = event.currentTarget
  selected.value = leader
  await nextTick()
  if (!dialog.value) return
  previousOverflow = document.body.style.overflow
  dialog.value.showModal()
  dialog.value.scrollTop = 0
  document.body.style.overflow = 'hidden'
  locked = true
}

async function closeMessage() {
  if (!dialog.value?.open || closing.value) return
  closing.value = true
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animation = dialog.value.animate(
      [{ opacity: 1, transform: 'translateY(0) scale(1)' }, { opacity: 0, transform: 'translateY(12px) scale(.98)' }],
      { duration: 180, easing: 'ease-in', fill: 'forwards' },
    )
    try { await animation.finished } catch { return }
  }
  dialog.value?.close()
  animation?.cancel()
  animation = null
  restorePage()
}

onBeforeUnmount(() => {
  animation?.cancel()
  dialog.value?.close()
  restorePage()
})
</script>

<template>
  <section class="leadership-section" aria-labelledby="leadership-title">
    <div class="container">
      <div class="leadership-heading">
        <span class="leadership-eyebrow">{{ $tr("ADMINISTRATION") }}</span>
        <h2 id="leadership-title">{{ $tr("Our Leadership") }}</h2>
        <span class="leadership-rule" aria-hidden="true"></span>
      </div>
      <div class="leadership-grid">
        <article v-for="leader in leaders" :key="leader.id" class="leader-card">
          <h3>{{ $tr(`Message from the ${leader.role}`) }}</h3>
          <div class="leader-card-body">
            <LeadershipPortrait :leader="leader" />
            <h4>{{ $tr(leader.name) }}</h4>
            <p>{{ $tr(leader.role) }}</p>
            <button type="button" :aria-label="$tr(`Read message from ${leader.name}`)" aria-haspopup="dialog" @click="openMessage(leader, $event)">{{ $tr(" Read More ") }}<ArrowRight :size="17" aria-hidden="true" />
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>

  <Teleport to="body">
    <dialog ref="dialog" class="leadership-dialog" :class="{ closing }" aria-labelledby="leadership-message-title" @cancel.prevent="closeMessage" @close="restorePage" @click="event => { if (event.target === dialog) closeMessage() }">
      <template v-if="selected">
        <header class="message-header">
          <h2 id="leadership-message-title"><Quote :size="21" aria-hidden="true" />{{ $tr(`Message from the ${selected.role}`) }}</h2>
          <button type="button" class="message-close" :aria-label="$tr(&quot;Close message&quot;)" autofocus @click="closeMessage"><X :size="22" aria-hidden="true" /></button>
        </header>
        <div class="message-layout">
          <div class="message-profile">
            <LeadershipPortrait :key="selected.id" :leader="selected" />
            <h3>{{ $tr(selected.name) }}</h3>
            <p>{{ $tr(selected.role) }}</p>
            <span>{{ $tr("Peace International Islamic") }}<br />{{ $tr("School & College") }}</span>
            <a v-if="selected.profile" :href="selected.profile" target="_blank" rel="noopener noreferrer">{{ $tr("Facebook profile ") }}<ArrowUpRight :size="15" aria-hidden="true" /></a>
          </div>
          <div class="message-copy">
            <p v-if="selected.draft" class="message-draft">{{ $tr(`Draft for review · This sample message has not yet been approved by the ${selected.role.toLowerCase()}.`) }}</p>
            <p v-for="(paragraph, index) in selected.paragraphs" :key="index">{{ $tr(paragraph) }}</p>
            <footer class="message-signature"><strong>{{ $tr(selected.name) }}</strong><span>{{ $tr(selected.role) }}</span></footer>
          </div>
        </div>
      </template>
    </dialog>
  </Teleport>
</template>

<style scoped>
.leadership-section { padding: 76px 0 84px; background: #f4f6f9; }
.leadership-heading { text-align: center; margin-bottom: 38px; }
.leadership-eyebrow { display: inline-block; padding: 7px 17px; border: 1px solid #163c6325; border-radius: 30px; background: #edf1f7; color: #163c63; font-size: 10px; letter-spacing: .2em; font-weight: 700; }
.leadership-heading h2 { font-size: clamp(30px, 3vw, 42px); color: #092645; margin: 12px 0 15px; line-height: 1.2; }
.leadership-rule { display: block; width: 54px; height: 3px; background: #bb9952; border-radius: 4px; margin: auto; }
.leadership-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 26px; max-width: 890px; margin-inline: auto; }
.leader-card { overflow: hidden; background: #fff; border: 1px solid #dce2ea; border-radius: 9px; box-shadow: 0 16px 40px #0926450d; transition: transform .3s ease, box-shadow .3s ease; }
.leader-card:hover { transform: translateY(-5px); box-shadow: 0 22px 45px #09264518; }
.leader-card > h3 { margin: 0; padding: 14px 18px; text-align: center; background: #092645; color: #fff; font-family: inherit; font-size: 16px; font-weight: 700; }
.leader-card:nth-child(2) > h3 { background: #163c63; }
.leader-card-body { position: relative; isolation: isolate; display: flex; flex-direction: column; align-items: center; padding: 29px 24px 32px; min-height: 421px; text-align: center; background: radial-gradient(ellipse at top, #edf1f780, transparent 70%); }
.leader-card-body::before, .leader-card-body::after { content: ''; position: absolute; z-index: -1; pointer-events: none; width: 140%; height: 135px; bottom: -92px; left: -15%; border-radius: 50%; transform: rotate(-9deg); background: #163c6312; }
.leader-card-body::after { bottom: -113px; left: -10%; transform: rotate(9deg); background: #bb99522b; }
.leader-card h4 { display: flex; align-items: center; justify-content: center; min-height: 50px; max-width: 340px; margin: 20px 0 3px; color: #092645; font-size: 19px; line-height: 1.35; font-weight: 700; }
.leader-card p { font-size: 13px; color: #607086; }
.leader-card button { display: inline-flex; align-items: center; gap: 12px; margin-top: 20px; padding: 11px 24px; border: 0; border-radius: 30px; background: #163c63; color: white; font-size: 13px; font-weight: 700; cursor: pointer; transition: background .25s ease, box-shadow .25s ease; }
.leader-card button svg { transition: transform .25s ease; }
.leader-card button:is(:hover, :focus-visible) { background: #092645; box-shadow: 0 6px 18px #09264520; }
.leader-card button:is(:hover, :focus-visible) svg { transform: translateX(4px); }
button:focus-visible, a:focus-visible { outline: 3px solid #bb9952; outline-offset: 4px; }
.leadership-dialog { padding: 0; border: 0; border-radius: 10px; width: min(980px, calc(100% - 32px)); max-height: calc(100dvh - 48px); margin: auto; background: #fff; color: #263e48; box-shadow: 0 30px 100px #061e3650; overscroll-behavior: contain; }
.leadership-dialog[open] { animation: message-enter .28s ease-out; }
.leadership-dialog::backdrop { background: #061e36b3; backdrop-filter: blur(5px); animation: backdrop-enter .28s ease-out; }
.leadership-dialog.closing::backdrop { opacity: 0; transition: opacity .18s ease-in; }
.message-header { position: sticky; top: 0; z-index: 2; display: flex; justify-content: space-between; align-items: center; gap: 15px; background: #092645; padding: 16px 24px; color: #fff; }
.message-header h2 { display: flex; align-items: center; gap: 12px; font: 700 17px/1.4 Raleway, sans-serif; margin: 0; }
.message-header h2 svg { color: #e3c88d; flex-shrink: 0; }
.message-close { display: grid; place-items: center; flex-shrink: 0; width: 40px; height: 40px; border: 1px solid #ffffff30; background: #ffffff0d; border-radius: 50%; color: white; cursor: pointer; transition: background .25s; }
.message-close:hover { background: #ffffff26; }
.message-layout { display: grid; grid-template-columns: 245px minmax(0, 1fr); gap: 40px; padding: 38px; }
.message-profile { text-align: center; }
.message-profile .leadership-portrait { margin-inline: auto; }
.message-profile h3 { color: #092645; font: 700 19px/1.4 Raleway, sans-serif; margin: 22px 0 8px; }
.message-profile p { color: #163c63; font-size: 14px; }
.message-profile > span { display: block; font-size: 12px; color: #6b7789; margin-top: 12px; line-height: 1.8; }
.message-profile a { display: inline-flex; gap: 5px; align-items: center; color: #163c63; margin-top: 18px; font-size: 12px; }
.message-profile a:hover { text-decoration: underline; }
.message-copy > p { font-size: 14px; line-height: 1.95; margin-bottom: 20px; }
.message-copy > .message-draft { padding: 12px 15px; border-left: 3px solid #bb9952; background: #f8f4e9; color: #715721; font-size: 12px; line-height: 1.7; }
.message-signature { display: grid; gap: 4px; border-top: 1px solid #dce2ea; padding-top: 23px; margin-top: 30px; font-size: 13px; color: #092645; }
.message-signature span { color: #67758a; font-size: 12px; }
@keyframes message-enter { from { opacity: 0; transform: translateY(18px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes backdrop-enter { from { opacity: 0; } to { opacity: 1; } }
@media (max-width: 700px) { .leadership-grid { grid-template-columns: 1fr; max-width: 420px; } .leadership-section { padding: 54px 0 60px; } .message-layout { grid-template-columns: 1fr; padding: 26px 22px; gap: 28px; } .message-profile .leadership-portrait { width: 160px; } .message-header { padding: 12px 16px; } .message-header h2 { font-size: 15px; } .leadership-dialog { max-height: calc(100dvh - 24px); } }
@media (prefers-reduced-motion: reduce) { .leader-card, .leader-card button, .leader-card button svg, .message-close { transition: none; } .leader-card:hover, .leader-card button:is(:hover, :focus-visible) svg { transform: none; } .leadership-dialog[open], .leadership-dialog::backdrop { animation: none; } .leadership-dialog.closing::backdrop { transition: none; } }
</style>
