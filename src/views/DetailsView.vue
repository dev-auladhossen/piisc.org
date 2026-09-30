<script setup>
import { BookOpen, HeartHandshake, Compass, Sparkles, ShieldCheck, Users } from 'lucide-vue-next'
import PageHero from '../components/PageHero.vue'
import BaseButton from '../components/BaseButton.vue'
import learning from '../assets/images/group-work.jpg'
const values = [
  { icon: ShieldCheck, title: 'Faith & integrity', text: 'Let Islamic values guide everyday choices, with honesty, sincerity and respect.' },
  { icon: BookOpen, title: 'A love of knowledge', text: 'Ask thoughtful questions, explore new ideas and develop the confidence to keep learning.' },
  { icon: HeartHandshake, title: 'Kindness & service', text: 'Care for others, appreciate our differences and contribute to the community.' },
  { icon: Sparkles, title: 'Excellence through effort', text: 'Take pride in progress, learn from challenges and bring care to every task.' },
]
</script>
<template>
  <PageHero :eyebrow="$tr(&quot;Discover PIISC&quot;)" :title="$tr(&quot;Education with purpose. A future with possibility.&quot;)" :lead="$tr(&quot;Our approach brings learning, Islamic values and personal growth together — helping children build knowledge and character, side by side.&quot;)" />
  <section class="section"><div class="container details-intro">
    <div class="details-photo"><img :src="learning" :alt="$tr(&quot;PIISC students learning together through group work&quot;)" /><span>{{ $tr("Growing together, every day.") }}</span></div>
    <div><span class="eyebrow">{{ $tr("Our purpose") }}</span><h2>{{ $tr("A strong foundation for learning and life.") }}</h2><p>{{ $tr("At Peace International Islamic School & College, our educational vision connects academic learning with faith, thoughtful choices and care for others.") }}</p><p>{{ $tr("We want each child to grow in curiosity and confidence, with a sense of responsibility that extends beyond the classroom.") }}</p><BaseButton to="/contact">{{ $tr("Talk to our team") }}</BaseButton></div>
  </div></section>
  <section class="details-purpose"><div class="container purpose-cards">
    <article><Compass :size="32" aria-hidden="true"/><span class="eyebrow">{{ $tr("Our mission") }}</span><h2>{{ $tr("Learning that shapes character.") }}</h2><p>{{ $tr("To create a caring learning community where children develop knowledge, practise Islamic values and discover how they can make a positive contribution.") }}</p></article>
    <article><Sparkles :size="32" aria-hidden="true"/><span class="eyebrow">{{ $tr("Our vision") }}</span><h2>{{ $tr("Confident learners. Considerate people.") }}</h2><p>{{ $tr("To inspire young people to approach their future with understanding, integrity and the willingness to keep growing.") }}</p></article>
  </div></section>
  <section id="value" class="section values-section"><div class="container"><span class="eyebrow">{{ $tr("What guides us") }}</span><h2>{{ $tr("Our values, in everyday life.") }}</h2><p class="values-lead">{{ $tr("The habits we encourage today help shape the people our children become tomorrow.") }}</p><div class="values-grid"><article v-for="(value, index) in values" :key="value.title"><div class="value-top"><component :is="value.icon" :size="28" aria-hidden="true"/><span>0{{ $tr(index + 1) }}</span></div><h3>{{ $tr(value.title) }}</h3><p>{{ $tr(value.text) }}</p></article></div></div></section>
  <section class="section family-section"><div class="container family-layout"><div><Users :size="34" aria-hidden="true"/><span class="eyebrow">{{ $tr("A partnership with families") }}</span><h2>{{ $tr("Every child's journey matters.") }}</h2></div><div><p>{{ $tr("Choosing a school is an important family decision. We welcome your questions about learning, school life and the values that guide PIISC.") }}</p><ul><li>{{ $tr("Open conversations between school and home.") }}</li><li>{{ $tr("Encouragement for curiosity, effort and personal growth.") }}</li><li>{{ $tr("Respect, kindness and responsibility in our community.") }}</li></ul><BaseButton to="/contact">{{ $tr("Make an inquiry") }}</BaseButton></div></div></section>
</template>
<style scoped>
.details-intro { display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center; }
h2 { font-size:clamp(30px,3.1vw,46px); line-height:1.18; margin:15px 0 22px; color:#0a2948; }
p { color:#53616a; }
.details-intro p + p { margin-top:16px; }
.details-intro .base-button, .family-layout .base-button { margin-top:28px; }
.details-photo { position:relative; overflow:hidden; border-radius:4px; }
.details-photo img { width:100%; height:460px; object-fit:cover; transition:transform .7s ease; }
.details-photo:hover img { transform:scale(1.04); }
.details-photo span { position:absolute; bottom:0; left:0; right:0; padding:26px; background:linear-gradient(transparent,#08213de6); color:white; }
.details-purpose { background:#f3f6f2; padding:65px 0; }
.purpose-cards { display:grid; grid-template-columns:1fr 1fr; gap:28px; }
.purpose-cards article { background:white; padding:40px; border-top:3px solid #b89345; }
.purpose-cards svg { color:#0e5b4a; margin-bottom:22px; }
.purpose-cards h2 { font-size:32px; }
.values-lead { max-width:620px; }
.values-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; margin-top:38px; }
.values-grid article { padding:30px 25px; border:1px solid #dce5de; background:#fff; }
.value-top { display:flex; align-items:center; justify-content:space-between; color:#0e5b4a; margin-bottom:32px; }
.value-top span { color:#a77d31; font-size:13px; }
.values-grid h3 { font-size:21px; margin-bottom:14px; }
.purpose-cards article, .values-grid article { transition:transform .35s ease,box-shadow .35s ease,border-color .35s ease; }
.purpose-cards article:hover, .values-grid article:hover { transform:translateY(-7px); box-shadow:0 18px 40px #18313e12; border-color:#b89345; }
.family-section { background:#0a2948; }
.family-layout { display:grid; grid-template-columns:1fr 1fr; gap:70px; }
.family-layout h2 { color:white; }
.family-layout svg { color:#e4c683; margin-bottom:24px; }
.family-layout p,.family-layout li { color:#dce6e7; }
.family-layout ul { padding-left:20px; line-height:2; margin-top:22px; }
@media(max-width:900px){.values-grid{grid-template-columns:1fr 1fr}.details-intro,.family-layout{gap:35px}}
@media(max-width:640px){.details-intro,.family-layout,.purpose-cards,.values-grid{grid-template-columns:1fr}.details-photo img{height:320px}.purpose-cards article{padding:28px}}
</style>
