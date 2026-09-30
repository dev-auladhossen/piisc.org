<script setup>
import { ArrowUpRight, ChevronRight, HeartHandshake, Palette, Trophy, Users } from 'lucide-vue-next'
import AdmissionContactPanel from '../components/AdmissionContactPanel.vue'
import sports from '../assets/images/beyond-class.jpg'
import creative from '../assets/images/creative-2.jpg'
import teamwork from '../assets/images/group-work.jpg'
import achievement from '../assets/images/achievement.jpg'
import community from '../assets/images/gurdians-2.jpg'
import play from '../assets/images/funtime.jpg'

const activities = [
  { icon: Trophy, title: 'Sport & active play', text: 'Movement gives children a chance to build coordination, practise new skills and enjoy working towards a shared goal. Fair play and effort matter as much as the result.' },
  { icon: Palette, title: 'Creativity & expression', text: 'Art, hands-on projects and opportunities to share ideas help learners develop imagination and discover their own voice.' },
  { icon: Users, title: 'Teamwork & confidence', text: 'Group activities encourage students to listen, contribute and support one another. Each experience is a chance to become a more confident participant.' },
  { icon: HeartHandshake, title: 'Character & community', text: 'Care, respect and responsibility connect school life with Islamic values. Learning to help others is part of growing as a person.' },
]
const photos = [
  { src: sports, title: 'Movement & teamwork', alt: 'Students playing cricket in the PIISC indoor sports area' },
  { src: creative, title: 'Creative discoveries', alt: 'PIISC students sharing their colourful classroom projects' },
  { src: teamwork, title: 'Learning together', alt: 'Students collaborating on a classroom project' },
  { src: achievement, title: 'Celebrating effort', alt: 'A PIISC student receiving an award' },
  { src: community, title: 'Our school community', alt: 'Students and teachers gathered for a school programme' },
  { src: play, title: 'Time to explore', alt: 'PIISC students taking part in a school activity' },
]
</script>

<template>
  <section class="athletics-banner">
    <img :src="sports" :alt="$tr(&quot;Students playing cricket at PIISC&quot;)" fetchpriority="high" />
    <div class="container athletics-banner-copy">
      <nav :aria-label="$tr(&quot;Breadcrumb&quot;)"><RouterLink to="/">{{ $tr("Home") }}</RouterLink><ChevronRight :size="15" aria-hidden="true" /><span aria-current="page">{{ $tr("Athletics") }}</span></nav>
      <span class="eyebrow">{{ $tr("BEYOND THE CLASSROOM") }}</span>
      <h1>{{ $tr("Athletics &") }}<br /><em>{{ $tr("Extra-curricular Activities") }}</em></h1>
      <p>{{ $tr("Space to play, create and connect. Experiences that help young people grow in confidence and character.") }}</p>
    </div>
  </section>

  <section class="section athletics-main">
    <div class="container athletics-layout">
      <div>
        <div class="athletics-lead-image"><img :src="creative" :alt="$tr(&quot;PIISC students displaying their creative work&quot;)" loading="lazy" /></div>
        <span class="eyebrow">{{ $tr("A WELL-ROUNDED EDUCATION") }}</span>
        <h2>{{ $tr("Learning goes beyond the lesson.") }}</h2>
        <p class="athletics-intro">{{ $tr("At PIISC, our vision for education includes the friendships, discoveries and shared experiences that make school life meaningful. Physical activity, creative expression and working together all have a place in that journey.") }}</p>
        <div class="activity-list">
          <article v-for="item in activities" :key="item.title">
            <span class="activity-icon"><component :is="item.icon" :size="25" aria-hidden="true" /></span>
            <div><h3>{{ $tr(item.title) }}</h3><p>{{ $tr(item.text) }}</p></div>
          </article>
        </div>
        <p class="activities-note">{{ $tr("Contact our team for current activities, age groups and participation schedules.") }}</p>
      </div>
      <div class="athletics-sidebar"><AdmissionContactPanel /></div>
    </div>
  </section>

  <section class="section activities-gallery">
    <div class="container">
      <div class="activities-gallery-heading">
        <div><span class="eyebrow">{{ $tr("MOMENTS AT PIISC") }}</span><h2>{{ $tr("School life, in pictures.") }}</h2></div>
        <RouterLink to="/gallery" class="gallery-link">{{ $tr("Explore the gallery ") }}<ArrowUpRight :size="19" aria-hidden="true" /></RouterLink>
      </div>
      <div class="activity-photo-grid">
        <RouterLink v-for="photo in photos" :key="photo.title" to="/gallery" class="activity-photo">
          <img :src="photo.src" :alt="$tr(photo.alt)" loading="lazy" />
          <span>{{ $tr(photo.title) }}<ArrowUpRight :size="20" aria-hidden="true" /></span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.athletics-banner { position: relative; isolation: isolate; display: flex; align-items: center; min-height: 410px; background: #092645; color: #fff; overflow: hidden; }
.athletics-banner > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 45%; z-index: -2; }
.athletics-banner::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, #061e36ed, #061e36b0 65%, #061e3660); z-index: -1; }
.athletics-banner-copy { padding-block: 32px 56px; }
.athletics-banner nav { display: flex; align-items: center; gap: 8px; font-size: 13px; margin-bottom: 38px; color: #d6e3e4; }
.athletics-banner .eyebrow { color: #e3c88d; }
.athletics-banner h1 { font-size: clamp(36px, 4.5vw, 62px); line-height: 1.15; max-width: 850px; margin: 16px 0 20px; }
.athletics-banner h1 em { color: #e3c88d; }
.athletics-banner p { max-width: 610px; color: #e0e9e7; font-size: 17px; }
.athletics-layout { display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 60px; align-items: start; }
.athletics-sidebar { position: sticky; top: 160px; }
.athletics-lead-image { border-radius: 6px; overflow: hidden; margin-bottom: 35px; }
.athletics-lead-image img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }
h2 { font-size: clamp(30px, 3vw, 43px); line-height: 1.2; color: #092645; margin: 13px 0 21px; }
.athletics-intro { color: #5d6c72; line-height: 1.85; }
.activity-list { margin-top: 28px; }
.activity-list article { display: flex; gap: 21px; border-top: 1px solid #dce5de; padding: 26px 0; }
.activity-icon { display: grid; place-items: center; width: 50px; height: 50px; flex-shrink: 0; background: #edf3ef; color: #0e5b4a; border-radius: 50%; }
.activity-list h3 { font-size: 23px; color: #092645; margin-bottom: 9px; }
.activity-list p { color: #5d6c72; line-height: 1.8; font-size: 15px; }
.activities-note { border-left: 3px solid #bb9952; padding: 15px 20px; background: #f7f5ef; font-size: 14px; color: #59665e; }
.activities-gallery { background: #f3f6f2; }
.activities-gallery-heading { display: flex; align-items: end; justify-content: space-between; gap: 25px; margin-bottom: 30px; }
.activities-gallery-heading h2 { margin-bottom: 0; }
.gallery-link { display: inline-flex; gap: 12px; align-items: center; color: #0e5b4a; font-size: 14px; font-weight: 700; padding-block: 10px; border-bottom: 1px solid #bb9952; }
.activity-photo-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; }
.activity-photo { position: relative; display: block; overflow: hidden; border-radius: 5px; background: #092645; }
.activity-photo img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; transition: transform .6s ease; }
.activity-photo::after { content: ''; position: absolute; inset: 30% 0 0; background: linear-gradient(transparent, #061e36ed); }
.activity-photo > span { position: absolute; bottom: 22px; left: 22px; right: 22px; display: flex; justify-content: space-between; align-items: center; gap: 12px; color: #fff; font-size: 15px; font-weight: 700; z-index: 1; }
.activity-photo svg, .gallery-link svg { transition: transform .3s ease; color: #e3c88d; flex-shrink: 0; }
.gallery-link svg { color: #0e5b4a; }
.activity-photo:is(:hover, :focus-visible) img { transform: scale(1.045); }
.activity-photo:is(:hover, :focus-visible) svg, .gallery-link:is(:hover, :focus-visible) svg { transform: translate(3px, -3px); }
a:focus-visible { outline: 3px solid #bb9952; outline-offset: 5px; }
@media (max-width: 1000px) { .athletics-layout { grid-template-columns: minmax(0, 1fr) 300px; gap: 30px; } .activity-photo-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 760px) { .athletics-layout { grid-template-columns: 1fr; gap: 40px; } .athletics-sidebar { position: static; } .activities-gallery-heading { flex-direction: column; align-items: flex-start; } .athletics-banner { min-height: 390px; } }
@media (max-width: 480px) { .activity-photo-grid { grid-template-columns: 1fr; } .activity-list article { gap: 14px; } .activity-icon { width: 40px; height: 40px; } }
@media (prefers-reduced-motion: reduce) { .activity-photo img, .activity-photo svg, .gallery-link svg { transition: none; } .activity-photo:is(:hover, :focus-visible) img, .activity-photo:is(:hover, :focus-visible) svg, .gallery-link:is(:hover, :focus-visible) svg { transform: none; } }
</style>
