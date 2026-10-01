<script setup>
import {
  BookOpen,
  HeartHandshake,
  Compass,
  Palette,
  Trophy,
  Lightbulb,
  ArrowUpRight,
  ChevronRight,
  Check,
} from "lucide-vue-next";
import BaseButton from "../components/BaseButton.vue";
import AdmissionContactPanel from "../components/AdmissionContactPanel.vue";
import cover from "../assets/images/studytime.jpg";
import creativePhoto from "../assets/images/creative-2.jpg";
const stages = [
  {
    id: "early",
    label: "Early Years",
    range: "Playgroup & Kindergarten",
    title: "Big discoveries begin with small steps.",
    text: "A gentle introduction to school life, with room to explore, communicate and grow in confidence.",
    points: [
      "Language, listening and early reading",
      "Numbers, patterns and playful discovery",
      "Friendship, routines and independence",
    ],
  },
  {
    id: "primary",
    label: "Primary",
    range: "Grades 1–5",
    title: "Strong foundations. Growing curiosity.",
    text: "The primary years build confidence in reading, writing and mathematics while encouraging children to ask questions about the world.",
    points: [
      "Literacy and mathematical understanding",
      "Observation, creativity and problem-solving",
      "Working together and taking responsibility",
    ],
  },
  {
    id: "middle",
    label: "Middle Years",
    range: "Grades 6–8",
    title: "Connecting ideas with the wider world.",
    text: "As learners become more independent, the focus broadens to deeper understanding, thoughtful discussion and effective study habits.",
    points: [
      "Connecting learning across subjects",
      "Research, communication and collaboration",
      "Reflection, organisation and self-confidence",
    ],
  },
  {
    id: "secondary",
    label: "Secondary",
    range: "Grades 9–10",
    title: "Purposeful learning for the next step.",
    text: "The secondary stage places greater emphasis on subject understanding, applying knowledge and preparing thoughtfully for future choices.",
    points: [
      "Subject knowledge and analytical thinking",
      "Independent study and revision skills",
      "Guidance on learning goals and progression",
    ],
  },
  {
    id: "senior",
    label: "Senior Years",
    range: "Grades 11–12",
    title: "Looking ahead with clarity and purpose.",
    text: "Senior learning focuses on greater independence, academic responsibility and informed decisions about education beyond school.",
    points: [
      "Focused study and academic enquiry",
      "Planning for further education",
      "Leadership and personal responsibility",
    ],
  },
];
const pillars = [
  {
    icon: BookOpen,
    title: "Knowledge & understanding",
    text: "Encouraging curiosity, careful thinking and a lasting interest in learning.",
  },
  {
    icon: Compass,
    title: "Faith & character",
    text: "Connecting learning with Islamic values, honesty and thoughtful choices.",
  },
  {
    icon: HeartHandshake,
    title: "Care for our community",
    text: "Building respect, empathy and a sense of responsibility towards others.",
  },
];
const enrichment = [
  {
    icon: Palette,
    title: "Creative expression",
    text: "Space for imagination, making and sharing ideas.",
  },
  {
    icon: Trophy,
    title: "Movement & teamwork",
    text: "Learning cooperation, perseverance and healthy habits.",
  },
  {
    icon: Lightbulb,
    title: "Confidence & initiative",
    text: "Encouragement to ask questions and take the next step.",
  },
];
</script>
<template>
  <section class="academic-cover">
    <img
      :src="cover"
      :alt="
        $tr('PIISC students learning together through a classroom activity')
      "
      fetchpriority="high"
    />
    <div class="academic-cover-shade"></div>
    <div class="container academic-cover-content">
      <nav :aria-label="$tr('Breadcrumb')">
        <RouterLink to="/">{{ $tr("Home") }}</RouterLink
        ><ChevronRight :size="15" aria-hidden="true" /><span
          aria-current="page"
          >{{ $tr("Academics") }}</span
        >
      </nav>
      <span class="academic-kicker">{{ $tr("LEARNING AT PIISC") }}</span>
      <h1>
        {{ $tr("Academics") }}<br /><em>{{ $tr("Learning with purpose.") }}</em>
      </h1>
      <p>
        {{
          $tr(
            " Discover an approach to education that connects curiosity, character and a sense of purpose. ",
          )
        }}
      </p>
      <a class="cover-link" href="#learning-stages"
        >{{ $tr("Explore our learning journey ")
        }}<ArrowUpRight :size="19" aria-hidden="true"
      /></a>
    </div>
  </section>
  <nav class="academic-links" :aria-label="$tr('On this page')">
    <div class="container">
      <a href="#curriculum">{{ $tr("Our approach") }}</a
      ><a href="#learning-stages">{{ $tr("Learning stages") }}</a
      ><a href="#character">{{ $tr("Beyond the classroom") }}</a
      ><RouterLink to="/academic-calendar"
        >{{ $tr("Academic calendar ")
        }}<ArrowUpRight :size="15" aria-hidden="true"
      /></RouterLink>
    </div>
  </nav>
  <section id="curriculum" class="section academic-intro">
    <div class="container">
      <div class="intro-heading">
        <div>
          <span class="eyebrow">{{ $tr("Academic Affairs") }}</span>
          <h2>
            {{ $tr("Learning with depth.") }}<br />{{
              $tr("Growing with purpose.")
            }}
          </h2>
        </div>
        <div>
          <p>
            {{
              $tr(
                " At PIISC, our educational vision brings academic learning and Islamic values together. We aim to help children develop understanding, confidence and care in the way they approach the world. ",
              )
            }}
          </p>
          <p>
            {{
              $tr(
                " A strong foundation grows through questions, practice, encouragement and the opportunity to learn alongside others. ",
              )
            }}
          </p>
        </div>
      </div>
      <div class="academic-pillars">
        <article v-for="(pillar, index) in pillars" :key="pillar.title">
          <div class="pillar-top">
            <component :is="pillar.icon" :size="28" aria-hidden="true" /><span
              >0{{ $tr(index + 1) }}</span
            >
          </div>
          <h3>{{ $tr(pillar.title) }}</h3>
          <p>{{ $tr(pillar.text) }}</p>
        </article>
      </div>
    </div>
  </section>
  <section id="learning-stages" class="section stages-section">
    <div class="container">
      <span class="eyebrow">{{ $tr("The learning journey") }}</span>
      <h2>{{ $tr("Room to grow, at every stage.") }}</h2>
      <p class="section-lead">
        {{
          $tr(
            " Explore the focus of each stage, from the first school experiences to preparation for further study. ",
          )
        }}
      </p>
      <div class="academic-directory">
        <div class="academic-stage-list">
          <article
            v-for="(stage, index) in stages"
            :key="stage.id"
            class="academic-stage-entry"
          >
            <div class="stage-entry-heading">
              <span class="stage-number">0{{ $tr(index + 1) }}</span>
              <div>
                <h3>{{ $tr(stage.label) }}</h3>
                <span class="stage-range">{{ $tr(stage.range) }}</span>
              </div>
            </div>
            <p>{{ $tr(stage.text) }}</p>
            <h4>{{ $tr("Learning focus") }}</h4>
            <ul>
              <li v-for="point in stage.points" :key="point">
                <Check :size="17" aria-hidden="true" />{{ $tr(point) }}
              </li>
            </ul>
          </article>
        </div>
        <div class="academic-admissions"><AdmissionContactPanel /></div>
      </div>
      <p class="academic-note">
        {{
          $tr(
            " For current class availability, subject choices, curriculum specifications and examination pathways, please contact our academic team. ",
          )
        }}
      </p>
    </div>
  </section>
  <section id="character" class="section character-section">
    <div class="container character-layout">
      <div class="character-photo">
        <img
          :src="creativePhoto"
          :alt="
            $tr('PIISC students displaying their creative classroom projects')
          "
          loading="lazy"
        /><span>{{ $tr("Discover. Create. Grow.") }}</span>
      </div>
      <div>
        <span class="eyebrow">{{ $tr("Beyond the classroom") }}</span>
        <h2>{{ $tr("Education shapes more than knowledge.") }}</h2>
        <p>
          {{
            $tr(
              " Creativity, kindness and personal responsibility are part of our vision for a well-rounded education. ",
            )
          }}
        </p>
        <div class="enrichment-list">
          <article v-for="item in enrichment" :key="item.title">
            <component :is="item.icon" :size="24" aria-hidden="true" />
            <div>
              <h3>{{ $tr(item.title) }}</h3>
              <p>{{ $tr(item.text) }}</p>
            </div>
          </article>
        </div>
        <RouterLink to="/extra-curricular-activities" class="cover-link"
          >{{ $tr("Explore athletics & activities ")
          }}<ArrowUpRight :size="19" aria-hidden="true"
        /></RouterLink>
      </div>
    </div>
  </section>
</template>
<style scoped>
.academic-cover {
  position: relative;
  min-height: 480px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #0a2948;
  color: white;
}
.academic-cover > img,
.academic-cover-shade {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
}
.academic-cover-shade {
  background: linear-gradient(100deg, #294e9ef5, #294e9edb 65%, #0a2948b8);
}
.academic-cover-content {
  position: relative;
  padding-block: 35px 55px;
}
.academic-cover nav {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #edf2fa;
  font-size: 13px;
  margin-bottom: 36px;
}
.academic-kicker {
  color: #f3cc48;
  font-weight: 800;
  letter-spacing: 0.19em;
  font-size: 12px;
}
.academic-cover h1 {
  font-size: clamp(38px, 4.7vw, 66px);
  line-height: 1.12;
  margin: 16px 0 20px;
  color: white;
}
.academic-cover h1 em {
  color: #f3cc48;
}
.academic-cover p {
  max-width: 520px;
  font-size: 17px;
  color: #edf2fa;
}
.cover-link {
  display: inline-flex;
  align-items: center;
  gap: 22px;
  padding: 13px 0;
  margin-top: 18px;
  border-bottom: 1px solid #f3cc48;
  color: #f3cc48;
  font-size: 14px;
  font-weight: 700;
  transition: gap 0.3s;
}
.cover-link:hover {
  gap: 30px;
}
.academic-links {
  background: #fff;
  border-bottom: 1px solid #dce5f3;
}
.academic-links > .container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.academic-links a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 21px 0;
  border-bottom: 2px solid transparent;
  font-size: 14px;
  font-weight: 700;
  color: #5d6e86;
  transition:
    color 0.25s,
    border-color 0.25s;
}
.academic-links a:hover {
  color: #294e9e;
  border-color: #d9b33d;
}
section[id] {
  scroll-margin-top: 160px;
}
h2 {
  font-size: clamp(30px, 3.2vw, 45px);
  line-height: 1.2;
  color: #294e9e;
  margin: 14px 0 20px;
}
p {
  color: #5d6e86;
}
.intro-heading {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 75px;
  align-items: center;
}
.intro-heading p + p {
  margin-top: 14px;
}
.academic-pillars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 38px;
}
.academic-pillars article {
  padding: 30px;
  border: 1px solid #dde5f1;
  border-radius: 6px;
  background: white;
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    border-color 0.3s;
}
.academic-pillars article:hover {
  transform: translateY(-6px);
  border-color: #d9b33d;
  box-shadow: 0 16px 32px #173a6a0d;
}
.pillar-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  color: #294e9e;
}
.pillar-top span {
  font-size: 12px;
  color: #b18a28;
}
.academic-pillars h3 {
  font-size: 21px;
  margin-bottom: 12px;
}
.academic-pillars p {
  font-size: 15px;
}
.stages-section {
  background: #f4f7fc;
}
.section-lead {
  max-width: 650px;
}
.academic-directory {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 48px;
  align-items: start;
  margin-top: 35px;
}
.academic-stage-list {
  background: #fff;
  border: 1px solid #dde5f1;
  border-radius: 6px;
  padding: 0 32px;
}
.academic-stage-entry {
  padding: 30px 0;
}
.academic-stage-entry + .academic-stage-entry {
  border-top: 1px solid #dde5f1;
}
.stage-entry-heading {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 18px;
}
.stage-number {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #fff8d8;
  color: #294e9e;
  font-size: 17px;
}
.stage-entry-heading h3 {
  font-size: 25px;
  color: #294e9e;
  line-height: 1.3;
  margin-bottom: 4px;
}
.stage-range {
  font-size: 13px;
  color: #667894;
}
.academic-stage-entry p {
  font-size: 15px;
  line-height: 1.8;
}
.academic-stage-entry h4 {
  font-size: 14px;
  color: #0a2948;
  font-weight: 700;
  margin-top: 20px;
}
.academic-stage-entry ul {
  list-style: none;
  display: grid;
  gap: 9px;
  margin-top: 12px;
  padding: 0;
}
.academic-stage-entry li {
  display: flex;
  gap: 10px;
  font-size: 14px;
  color: #5d6e86;
}
.academic-stage-entry li svg {
  flex-shrink: 0;
  color: #294e9e;
  margin-top: 3px;
}
.academic-admissions {
  position: sticky;
  top: 160px;
}
.character-section .cover-link {
  color: #294e9e;
}
a:focus-visible {
  outline: 2px solid #d9b33d;
  outline-offset: 5px;
}
@media (max-width: 1000px) {
  .academic-directory {
    grid-template-columns: minmax(0, 1fr) 300px;
    gap: 25px;
  }
}
@media (max-width: 760px) {
  .academic-directory {
    grid-template-columns: 1fr;
  }
  .academic-admissions {
    position: static;
  }
  .academic-stage-list {
    padding-inline: 22px;
  }
}
.stage-selectors {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin: 32px 0 20px;
}
.stage-selectors button {
  text-align: left;
  padding: 17px;
  border: 1px solid #dde5f1;
  border-radius: 6px;
  background: white;
  color: #173a6a;
  font-weight: 700;
  font-size: 15px;
  transition:
    background 0.25s,
    color 0.25s,
    transform 0.25s,
    box-shadow 0.25s;
}
.stage-selectors button span {
  display: block;
  font-size: 11px;
  font-weight: 400;
  margin-top: 6px;
}
.stage-selectors button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px #294e9e12;
}
.stage-selectors button.active {
  color: white;
  background: #294e9e;
  border-color: #294e9e;
}
.stage-panel {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  background: white;
  border: 1px solid #dde5f1;
  border-radius: 8px;
  overflow: hidden;
  min-height: 410px;
}
.stage-image {
  min-height: 360px;
  position: relative;
}
.stage-image img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 45%;
}
.stage-copy {
  padding: 36px;
}
.stage-copy h3 {
  font:
    500 32px/1.2 Georgia,
    serif;
  color: #294e9e;
  margin: 12px 0 16px;
}
.stage-copy p {
  font-size: 15px;
}
.stage-copy ul {
  list-style: none;
  padding: 0;
  margin: 22px 0;
}
.stage-copy li {
  display: flex;
  gap: 10px;
  align-items: baseline;
  margin-top: 10px;
  color: #536989;
  font-size: 14px;
}
.stage-copy li svg {
  flex-shrink: 0;
  color: #294e9e;
}
.stage-copy > a {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  color: #294e9e;
  font-size: 14px;
  font-weight: 700;
}
.stage-copy > a:hover {
  text-decoration: underline;
}
.stage-symbol {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  color: #f3cc48;
  background: radial-gradient(circle at top right, #315caf, #0a2948);
  min-height: 280px;
}
.stage-symbol span {
  font-size: 26px;
  font-family: Georgia, serif;
}
.academic-note {
  margin-top: 20px;
  font-size: 13px;
  max-width: 850px;
}
.character-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 65px;
  align-items: center;
}
.character-photo {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}
.character-photo img {
  width: 100%;
  height: 490px;
  object-fit: cover;
  transition: transform 0.7s ease-out;
}
.character-photo:hover img {
  transform: scale(1.035);
}
.character-photo > span {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px 25px 22px;
  background: linear-gradient(transparent, #0a2948e6);
  color: #f3cc48;
  font:
    24px Georgia,
    serif;
}
.enrichment-list {
  margin-top: 26px;
}
.enrichment-list article {
  display: flex;
  gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid #dce5f3;
  transition: transform 0.25s;
}
.enrichment-list article:hover {
  transform: translateX(4px);
}
.enrichment-list svg {
  flex-shrink: 0;
  color: #294e9e;
}
.enrichment-list h3 {
  font-size: 18px;
  margin-bottom: 5px;
}
.enrichment-list p {
  font-size: 14px;
}
.academic-next {
  padding: 60px 0;
  background: #0a2948;
  color: white;
}
.academic-next > .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 55px;
}
.academic-next h2 {
  color: white;
  max-width: 700px;
  font-size: 36px;
}
.academic-next p {
  color: #dce6f8;
}
.academic-actions {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.academic-actions > a:last-child {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #f3cc48;
  font-size: 13px;
}
.stage-reveal-enter-active,
.stage-reveal-leave-active {
  transition:
    opacity 0.18s,
    transform 0.18s;
}
.stage-reveal-enter-from,
.stage-reveal-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
@media (max-width: 900px) {
  .intro-heading,
  .character-layout {
    gap: 30px;
  }
  .academic-pillars {
    gap: 14px;
  }
  .academic-pillars article {
    padding: 22px;
  }
  .stage-selectors {
    grid-template-columns: repeat(3, 1fr);
  }
  .stage-copy {
    padding: 26px;
  }
  .academic-next > .container {
    gap: 30px;
  }
}
@media (max-width: 640px) {
  .academic-cover {
    min-height: 450px;
  }
  .academic-cover-shade {
    background: #294e9ee0;
  }
  .academic-links > .container {
    justify-content: flex-start;
    gap: 0 24px;
  }
  .academic-links a {
    padding: 14px 0;
    font-size: 12px;
  }
  .intro-heading,
  .academic-pillars,
  .stage-panel,
  .character-layout {
    grid-template-columns: 1fr;
  }
  .stage-selectors {
    grid-template-columns: repeat(2, 1fr);
  }
  .stage-image {
    min-height: 260px;
  }
  .stage-symbol {
    min-height: 180px;
  }
  .stage-symbol svg {
    width: 65px;
    height: 65px;
  }
  .stage-copy h3 {
    font-size: 28px;
  }
  .character-photo img {
    height: 330px;
  }
  .academic-next > .container {
    align-items: flex-start;
    flex-direction: column;
  }
  .academic-next h2 {
    font-size: 30px;
  }
  .academic-actions {
    width: 100%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .stage-reveal-enter-active,
  .stage-reveal-leave-active {
    transition: none;
  }
}
</style>
