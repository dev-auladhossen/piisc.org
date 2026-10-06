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
  <section class="academic-cover [&&]:relative [&&]:flex [@media(max-width:640px)]:[&&]:min-h-[450px] [@media(width>640px)]:[&&]:min-h-[480px] [&&]:items-center [&&]:overflow-x-hidden [&&]:overflow-y-hidden [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(10,_41,_72)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:white] [section&[id]]:[scroll-margin-top:160px]">
    <img class="[&&]:absolute [&&]:bottom-[0px] [&&]:left-[0px] [&&]:right-[0px] [&&]:top-[0px] [&&]:h-[100%] [&&]:w-[100%] [&&]:object-cover [&&]:[object-position:center_40%]"
      :src="cover"
      :alt="
        $tr('PIISC students learning together through a classroom activity')
      "
      fetchpriority="high"
    />
    <div class="academic-cover-shade [&&]:absolute [&&]:bottom-[0px] [&&]:left-[0px] [&&]:right-[0px] [&&]:top-[0px] [&&]:h-[100%] [&&]:w-[100%] [&&]:object-cover [&&]:[object-position:center_40%] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [@media(max-width:640px)]:[&&]:[background-color:rgba(41,_78,_158,_0.88)] [@media(width>640px)]:[&&]:[background-color:initial] [@media(max-width:640px)]:[&&]:[background-image:initial] [@media(width>640px)]:[&&]:[background-image:linear-gradient(100deg,_rgba(41,_78,_158,_0.96),_rgba(41,_78,_158,_0.86)_65%,_rgba(10,_41,_72,_0.72))] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial]"></div>
    <div class="container academic-cover-content [&&]:relative [&&]:[padding-block-end:55px] [&&]:[padding-block-start:35px]">
      <nav class="[&&]:mb-[36px] [&&]:flex [&&]:items-center [&&]:gap-x-[8px] [&&]:gap-y-[8px] [&&]:[color:rgb(237,_242,_250)] [&&]:[font-size:13px]" :aria-label="$tr('Breadcrumb')">
        <RouterLink class="[a&:focus-visible]:[outline-color:rgb(217,_179,_61)] [a&:focus-visible]:[outline-style:solid] [a&:focus-visible]:[outline-width:2px] [a&:focus-visible]:[outline-offset:5px]" to="/">{{ $tr("Home") }}</RouterLink
        ><ChevronRight :size="15" aria-hidden="true" /><span
          aria-current="page"
          >{{ $tr("Academics") }}</span
        >
      </nav>
      <span class="academic-kicker [&&]:font-[800] [&&]:tracking-[0.19em] [&&]:[color:rgb(243,_204,_72)] [&&]:[font-size:12px]">{{ $tr("LEARNING AT PIISC") }}</span>
      <h1 class="[&&]:[font-size:clamp(38px,_4.7vw,_66px)] [&&]:leading-[1.12] [&&]:[color:white] [&&]:m-[16px_0px_20px_0px]">
        {{ $tr("Academics") }}<br /><em class="[&&]:[color:rgb(243,_204,_72)]">{{ $tr("Learning with purpose.") }}</em>
      </h1>
      <p class="[&&]:[color:rgb(237,_242,_250)] [&&]:max-w-[520px] [&&]:[font-size:17px]">
        {{
          $tr(
            " Discover an approach to education that connects curiosity, character and a sense of purpose. ",
          )
        }}
      </p>
      <a class="cover-link [&&]:mt-[18px] [&&]:inline-flex [&&]:items-center [&&]:gap-x-[22px] [&&]:gap-y-[22px] [&&]:[border-bottom-color:rgb(243,_204,_72)] [&&]:[border-bottom-style:solid] [&&]:[border-bottom-width:1px] [&&]:[color:rgb(243,_204,_72)] [&&]:[font-size:14px] [&&]:font-[700] [&&]:[transition-behavior:normal] [&&]:[transition-delay:0s] [&&]:[transition-duration:0.3s] [&&]:[transition-property:gap] [&&]:[transition-timing-function:ease] [&&]:p-[13px_0px] [&.cover-link:hover]:gap-x-[30px] [&.cover-link:hover]:gap-y-[30px] [a&:focus-visible]:[outline-color:rgb(217,_179,_61)] [a&:focus-visible]:[outline-style:solid] [a&:focus-visible]:[outline-width:2px] [a&:focus-visible]:[outline-offset:5px]" href="#learning-stages"
        >{{ $tr("Explore our learning journey ")
        }}<ArrowUpRight :size="19" aria-hidden="true"
      /></a>
    </div>
  </section>
  <nav class="academic-links [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[border-bottom-color:rgb(220,_229,_243)] [&&]:[border-bottom-style:solid] [&&]:[border-bottom-width:1px]" :aria-label="$tr('On this page')">
    <div class="container [&&&]:flex [&&&]:flex-wrap [@media(max-width:640px)]:[&&&]:justify-start [@media(width>640px)]:[&&&]:justify-between [@media(max-width:640px)]:[&&&]:gap-x-[24px] [@media(width>640px)]:[&&&]:gap-x-[12px] [@media(max-width:640px)]:[&&&]:gap-y-[0px] [@media(width>640px)]:[&&&]:gap-y-[12px]">
      <a class="[&&]:inline-flex [&&]:items-center [&&]:gap-x-[8px] [&&]:gap-y-[8px] [&&]:[border-bottom-color:transparent] [&&]:[border-bottom-style:solid] [&&]:[border-bottom-width:2px] [@media(max-width:640px)]:[&&]:[font-size:12px] [@media(width>640px)]:[&&]:[font-size:14px] [&&]:font-[700] [&&]:[color:rgb(93,_110,_134)] [&&]:[transition-behavior:normal,_normal] [&&]:[transition-delay:0s,_0s] [&&]:[transition-duration:0.25s,_0.25s] [&&]:[transition-property:color,_border-color] [&&]:[transition-timing-function:ease,_ease] [@media(max-width:640px)]:[&&]:p-[14px_0px] [@media(width>640px)]:[&&]:p-[21px_0px] [.academic-links_a&:hover]:[color:rgb(41,_78,_158)] [.academic-links_a&:hover]:[border-color:rgb(217,_179,_61)] [a&:focus-visible]:[outline-color:rgb(217,_179,_61)] [a&:focus-visible]:[outline-style:solid] [a&:focus-visible]:[outline-width:2px] [a&:focus-visible]:[outline-offset:5px]" href="#curriculum">{{ $tr("Our approach") }}</a
      ><a class="[&&]:inline-flex [&&]:items-center [&&]:gap-x-[8px] [&&]:gap-y-[8px] [&&]:[border-bottom-color:transparent] [&&]:[border-bottom-style:solid] [&&]:[border-bottom-width:2px] [@media(max-width:640px)]:[&&]:[font-size:12px] [@media(width>640px)]:[&&]:[font-size:14px] [&&]:font-[700] [&&]:[color:rgb(93,_110,_134)] [&&]:[transition-behavior:normal,_normal] [&&]:[transition-delay:0s,_0s] [&&]:[transition-duration:0.25s,_0.25s] [&&]:[transition-property:color,_border-color] [&&]:[transition-timing-function:ease,_ease] [@media(max-width:640px)]:[&&]:p-[14px_0px] [@media(width>640px)]:[&&]:p-[21px_0px] [.academic-links_a&:hover]:[color:rgb(41,_78,_158)] [.academic-links_a&:hover]:[border-color:rgb(217,_179,_61)] [a&:focus-visible]:[outline-color:rgb(217,_179,_61)] [a&:focus-visible]:[outline-style:solid] [a&:focus-visible]:[outline-width:2px] [a&:focus-visible]:[outline-offset:5px]" href="#learning-stages">{{ $tr("Learning stages") }}</a
      ><a class="[&&]:inline-flex [&&]:items-center [&&]:gap-x-[8px] [&&]:gap-y-[8px] [&&]:[border-bottom-color:transparent] [&&]:[border-bottom-style:solid] [&&]:[border-bottom-width:2px] [@media(max-width:640px)]:[&&]:[font-size:12px] [@media(width>640px)]:[&&]:[font-size:14px] [&&]:font-[700] [&&]:[color:rgb(93,_110,_134)] [&&]:[transition-behavior:normal,_normal] [&&]:[transition-delay:0s,_0s] [&&]:[transition-duration:0.25s,_0.25s] [&&]:[transition-property:color,_border-color] [&&]:[transition-timing-function:ease,_ease] [@media(max-width:640px)]:[&&]:p-[14px_0px] [@media(width>640px)]:[&&]:p-[21px_0px] [.academic-links_a&:hover]:[color:rgb(41,_78,_158)] [.academic-links_a&:hover]:[border-color:rgb(217,_179,_61)] [a&:focus-visible]:[outline-color:rgb(217,_179,_61)] [a&:focus-visible]:[outline-style:solid] [a&:focus-visible]:[outline-width:2px] [a&:focus-visible]:[outline-offset:5px]" href="#character">{{ $tr("Beyond the classroom") }}</a
      ><RouterLink class="[&&]:inline-flex [&&]:items-center [&&]:gap-x-[8px] [&&]:gap-y-[8px] [&&]:[border-bottom-color:transparent] [&&]:[border-bottom-style:solid] [&&]:[border-bottom-width:2px] [@media(max-width:640px)]:[&&]:[font-size:12px] [@media(width>640px)]:[&&]:[font-size:14px] [&&]:font-[700] [&&]:[color:rgb(93,_110,_134)] [&&]:[transition-behavior:normal,_normal] [&&]:[transition-delay:0s,_0s] [&&]:[transition-duration:0.25s,_0.25s] [&&]:[transition-property:color,_border-color] [&&]:[transition-timing-function:ease,_ease] [@media(max-width:640px)]:[&&]:p-[14px_0px] [@media(width>640px)]:[&&]:p-[21px_0px] [.academic-links_a&:hover]:[color:rgb(41,_78,_158)] [.academic-links_a&:hover]:[border-color:rgb(217,_179,_61)] [a&:focus-visible]:[outline-color:rgb(217,_179,_61)] [a&:focus-visible]:[outline-style:solid] [a&:focus-visible]:[outline-width:2px] [a&:focus-visible]:[outline-offset:5px]" to="/academic-calendar"
        >{{ $tr("Academic calendar ")
        }}<ArrowUpRight :size="15" aria-hidden="true"
      /></RouterLink>
    </div>
  </nav>
  <section id="curriculum" class="section academic-intro [section&[id]]:[scroll-margin-top:160px]">
    <div class="container">
      <div class="intro-heading [&&]:grid [@media(max-width:640px)]:[&&]:grid-cols-[1fr] [@media(width>640px)]:[&&]:grid-cols-[1fr_1fr] [&&]:items-center [@media(max-width:900px)]:[&&]:gap-x-[30px] [@media(width>900px)]:[&&]:gap-x-[75px] [@media(max-width:900px)]:[&&]:gap-y-[30px] [@media(width>900px)]:[&&]:gap-y-[75px]">
        <div>
          <span class="eyebrow">{{ $tr("Academic Affairs") }}</span>
          <h2 class="[&&]:[font-size:clamp(30px,_3.2vw,_45px)] [&&]:leading-[1.2] [&&]:[color:rgb(41,_78,_158)] [&&]:m-[14px_0px_20px_0px]">
            {{ $tr("Learning with depth.") }}<br />{{
              $tr("Growing with purpose.")
            }}
          </h2>
        </div>
        <div>
          <p class="[&&]:[color:rgb(93,_110,_134)] [.intro-heading_p_+_p&]:mt-[14px]">
            {{
              $tr(
                " At PIISC, our educational vision brings academic learning and Islamic values together. We aim to help children develop understanding, confidence and care in the way they approach the world. ",
              )
            }}
          </p>
          <p class="[&&]:[color:rgb(93,_110,_134)] [.intro-heading_p_+_p&]:mt-[14px]">
            {{
              $tr(
                " A strong foundation grows through questions, practice, encouragement and the opportunity to learn alongside others. ",
              )
            }}
          </p>
        </div>
      </div>
      <div class="academic-pillars [&&]:mt-[38px] [&&]:grid [@media(max-width:640px)]:[&&]:grid-cols-[1fr] [@media(width>640px)]:[&&]:grid-cols-[repeat(3,_1fr)] [@media(max-width:900px)]:[&&]:gap-x-[14px] [@media(width>900px)]:[&&]:gap-x-[24px] [@media(max-width:900px)]:[&&]:gap-y-[14px] [@media(width>900px)]:[&&]:gap-y-[24px]">
        <article class="[&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:white] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[transition-behavior:normal,_normal,_normal] [&&]:[transition-delay:0s,_0s,_0s] [&&]:[transition-duration:0.3s,_0.3s,_0.3s] [&&]:[transition-property:transform,_box-shadow,_border-color] [&&]:[transition-timing-function:ease,_ease,_ease] [@media(max-width:900px)]:[&&]:p-[22px] [@media(width>900px)]:[&&]:p-[30px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(221,_229,_241)] [.academic-pillars_article&:hover]:[box-shadow:rgba(23,_58,_106,_0.05)_0px_16px_32px] [.academic-pillars_article&:hover]:[transform:translateY(-6px)] [.academic-pillars_article&:hover]:[border-color:rgb(217,_179,_61)]" v-for="(pillar, index) in pillars" :key="pillar.title">
          <div class="pillar-top [&&]:mb-[28px] [&&]:flex [&&]:items-center [&&]:justify-between [&&]:[color:rgb(41,_78,_158)]">
            <component :is="pillar.icon" :size="28" aria-hidden="true" /><span class="[&&]:[color:rgb(177,_138,_40)] [&&]:[font-size:12px]"
              >0{{ $tr(index + 1) }}</span
            >
          </div>
          <h3 class="[&&]:mb-[12px] [&&]:[font-size:21px]">{{ $tr(pillar.title) }}</h3>
          <p class="[&&]:[color:rgb(93,_110,_134)] [&&]:[font-size:15px]">{{ $tr(pillar.text) }}</p>
        </article>
      </div>
    </div>
  </section>
  <section id="learning-stages" class="section stages-section [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(244,_247,_252)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [section&[id]]:[scroll-margin-top:160px]">
    <div class="container">
      <span class="eyebrow">{{ $tr("The learning journey") }}</span>
      <h2 class="[&&]:[font-size:clamp(30px,_3.2vw,_45px)] [&&]:leading-[1.2] [&&]:[color:rgb(41,_78,_158)] [&&]:m-[14px_0px_20px_0px]">{{ $tr("Room to grow, at every stage.") }}</h2>
      <p class="section-lead [&&]:[color:rgb(93,_110,_134)] [&&]:max-w-[650px]">
        {{
          $tr(
            " Explore the focus of each stage, from the first school experiences to preparation for further study. ",
          )
        }}
      </p>
      <div class="academic-directory [&&]:mt-[35px] [&&]:grid [@media(max-width:760px)]:[&&]:grid-cols-[1fr] [@media(width>760px)_and_(max-width:1000px)]:[&&]:grid-cols-[minmax(0px,_1fr)_300px] [@media(width>1000px)]:[&&]:grid-cols-[minmax(0px,_1fr)_340px] [@media(max-width:1000px)]:[&&]:gap-x-[25px] [@media(width>1000px)]:[&&]:gap-x-[48px] [@media(max-width:1000px)]:[&&]:gap-y-[25px] [@media(width>1000px)]:[&&]:gap-y-[48px] [&&]:[align-items:start]">
        <div class="academic-stage-list [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [@media(max-width:760px)]:[&&]:[padding-inline-end:22px] [@media(max-width:760px)]:[&&]:[padding-inline-start:22px] [&&]:p-[0px_32px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(221,_229,_241)]">
          <article
            v-for="(stage, index) in stages"
            :key="stage.id"
            class="academic-stage-entry [&&]:p-[30px_0px] [.academic-stage-entry_+_&.academic-stage-entry]:[border-top-color:rgb(221,_229,_241)] [.academic-stage-entry_+_&.academic-stage-entry]:[border-top-style:solid] [.academic-stage-entry_+_&.academic-stage-entry]:[border-top-width:1px]"
          >
            <div class="stage-entry-heading [&&]:mb-[18px] [&&]:flex [&&]:items-center [&&]:gap-x-[18px] [&&]:gap-y-[18px]">
              <span class="stage-number [&&]:grid [&&]:h-[48px] [&&]:w-[48px] [&&]:[flex-shrink:0] [&&]:items-center [&&]:[justify-items:center] [&&]:[border-bottom-left-radius:50%] [&&]:[border-bottom-right-radius:50%] [&&]:[border-top-left-radius:50%] [&&]:[border-top-right-radius:50%] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_248,_216)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(41,_78,_158)] [&&]:[font-size:17px]">0{{ $tr(index + 1) }}</span>
              <div>
                <h3 class="[&&]:[color:rgb(41,_78,_158)] [&&]:[font-size:25px] [&&]:mb-[4px] [&&]:leading-[1.3]">{{ $tr(stage.label) }}</h3>
                <span class="stage-range [&&]:[color:rgb(102,_120,_148)] [&&]:[font-size:13px]">{{ $tr(stage.range) }}</span>
              </div>
            </div>
            <p class="[&&]:[color:rgb(93,_110,_134)] [&&]:[font-size:15px] [&&]:leading-[1.8]">{{ $tr(stage.text) }}</p>
            <h4 class="[&&]:[color:rgb(10,_41,_72)] [&&]:[font-size:14px] [&&]:mt-[20px] [&&]:font-[700]">{{ $tr("Learning focus") }}</h4>
            <ul class="[&&]:mt-[12px] [&&]:grid [&&]:gap-x-[9px] [&&]:gap-y-[9px] [&&]:[list-style-image:initial] [&&]:[list-style-position:initial] [&&]:[list-style-type:none] [&&]:p-[0px]">
              <li class="[&&]:flex [&&]:gap-x-[10px] [&&]:gap-y-[10px] [&&]:[color:rgb(93,_110,_134)] [&&]:[font-size:14px]" v-for="point in stage.points" :key="point">
                <Check class="[&&]:mt-[3px] [&&]:[flex-shrink:0] [&&]:[color:rgb(41,_78,_158)]" :size="17" aria-hidden="true" />{{ $tr(point) }}
              </li>
            </ul>
          </article>
        </div>
        <div class="academic-admissions [@media(max-width:760px)]:[&&]:static [@media(width>760px)]:[&&]:sticky [&&]:top-[160px]"><AdmissionContactPanel /></div>
      </div>
      <p class="academic-note [&&]:[color:rgb(93,_110,_134)] [&&]:mt-[20px] [&&]:max-w-[850px] [&&]:[font-size:13px]">
        {{
          $tr(
            " For current class availability, subject choices, curriculum specifications and examination pathways, please contact our academic team. ",
          )
        }}
      </p>
    </div>
  </section>
  <section id="character" class="section character-section [section&[id]]:[scroll-margin-top:160px]">
    <div class="container character-layout [&&]:grid [@media(max-width:640px)]:[&&]:grid-cols-[1fr] [@media(width>640px)]:[&&]:grid-cols-[1fr_1fr] [&&]:items-center [@media(max-width:900px)]:[&&]:gap-x-[30px] [@media(width>900px)]:[&&]:gap-x-[65px] [@media(max-width:900px)]:[&&]:gap-y-[30px] [@media(width>900px)]:[&&]:gap-y-[65px]">
      <div class="character-photo [&&]:relative [&&]:overflow-x-hidden [&&]:overflow-y-hidden [&&]:[border-bottom-left-radius:8px] [&&]:[border-bottom-right-radius:8px] [&&]:[border-top-left-radius:8px] [&&]:[border-top-right-radius:8px]">
        <img class="[@media(max-width:640px)]:[&&]:h-[330px] [@media(width>640px)]:[&&]:h-[490px] [&&]:w-[100%] [&&]:object-cover [&&]:[transition-behavior:normal] [&&]:[transition-delay:0s] [&&]:[transition-duration:0.7s] [&&]:[transition-property:transform] [&&]:[transition-timing-function:ease-out] [.character-photo:hover_img&]:[transform:scale(1.035)]"
          :src="creativePhoto"
          :alt="
            $tr('PIISC students displaying their creative classroom projects')
          "
          loading="lazy"
        /><span class="[&&]:absolute [&&]:bottom-[0px] [&&]:left-[0px] [&&]:right-[0px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:initial] [&&]:[background-image:linear-gradient(transparent,_rgba(10,_41,_72,_0.9))] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(243,_204,_72)] [&&]:[font-family:Georgia,_serif] [&&]:[font-feature-settings:normal] [&&]:[font-kerning:auto] [&&]:[font-language-override:normal] [&&]:[font-optical-sizing:auto] [&&]:[font-size:24px] [&&]:[font-size-adjust:none] [&&]:[font-stretch:normal] [&&]:[font-style:normal] [&&]:[font-variant:normal] [&&]:[font-variant-alternates:normal] [&&]:[font-variant-caps:normal] [&&]:[font-variant-east-asian:normal] [&&]:[font-variant-emoji:normal] [&&]:[font-variant-ligatures:normal] [&&]:[font-variant-numeric:normal] [&&]:[font-variant-position:normal] [&&]:[font-variation-settings:normal] [&&]:font-[normal] [&&]:leading-[normal] [&&]:p-[40px_25px_22px_25px]">{{ $tr("Discover. Create. Grow.") }}</span>
      </div>
      <div>
        <span class="eyebrow">{{ $tr("Beyond the classroom") }}</span>
        <h2 class="[&&]:[font-size:clamp(30px,_3.2vw,_45px)] [&&]:leading-[1.2] [&&]:[color:rgb(41,_78,_158)] [&&]:m-[14px_0px_20px_0px]">{{ $tr("Education shapes more than knowledge.") }}</h2>
        <p class="[&&]:[color:rgb(93,_110,_134)]">
          {{
            $tr(
              " Creativity, kindness and personal responsibility are part of our vision for a well-rounded education. ",
            )
          }}
        </p>
        <div class="enrichment-list [&&]:mt-[26px]">
          <article class="[&&]:flex [&&]:gap-x-[16px] [&&]:gap-y-[16px] [&&]:[border-bottom-color:rgb(220,_229,_243)] [&&]:[border-bottom-style:solid] [&&]:[border-bottom-width:1px] [&&]:[transition-behavior:normal] [&&]:[transition-delay:0s] [&&]:[transition-duration:0.25s] [&&]:[transition-property:transform] [&&]:[transition-timing-function:ease] [&&]:p-[18px_0px] [.enrichment-list_article&:hover]:[transform:translateX(4px)]" v-for="item in enrichment" :key="item.title">
            <component class="[&&]:[flex-shrink:0] [&&]:[color:rgb(41,_78,_158)]" :is="item.icon" :size="24" aria-hidden="true" />
            <div>
              <h3 class="[&&]:mb-[5px] [&&]:[font-size:18px]">{{ $tr(item.title) }}</h3>
              <p class="[&&]:[color:rgb(93,_110,_134)] [&&]:[font-size:14px]">{{ $tr(item.text) }}</p>
            </div>
          </article>
        </div>
        <RouterLink to="/extra-curricular-activities" class="cover-link [&&&]:mt-[18px] [&&&]:inline-flex [&&&]:items-center [&&&]:gap-x-[22px] [&&&]:gap-y-[22px] [&&&]:[border-bottom-color:rgb(243,_204,_72)] [&&&]:[border-bottom-style:solid] [&&&]:[border-bottom-width:1px] [&&&]:[color:rgb(41,_78,_158)] [&&&]:[font-size:14px] [&&&]:font-[700] [&&&]:[transition-behavior:normal] [&&&]:[transition-delay:0s] [&&&]:[transition-duration:0.3s] [&&&]:[transition-property:gap] [&&&]:[transition-timing-function:ease] [&&&]:p-[13px_0px] [&.cover-link:hover]:gap-x-[30px] [&.cover-link:hover]:gap-y-[30px] [a&:focus-visible]:[outline-color:rgb(217,_179,_61)] [a&:focus-visible]:[outline-style:solid] [a&:focus-visible]:[outline-width:2px] [a&:focus-visible]:[outline-offset:5px]"
          >{{ $tr("Explore athletics & activities ")
          }}<ArrowUpRight :size="19" aria-hidden="true"
        /></RouterLink>
      </div>
    </div>
  </section>
</template>
