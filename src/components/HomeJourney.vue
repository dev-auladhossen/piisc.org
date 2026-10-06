<script setup>
import {
  BookOpen,
  Check,
  ChevronRight,
  GraduationCap,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  School,
  Users,
} from "lucide-vue-next";
import { useI18n } from "../composables/useI18n.js";
import { headerContacts } from "../data/navigation.js";
import studyPhoto from "../assets/images/studytime.jpg";
import groupPhoto from "../assets/images/girls-group.jpg";
import facilityPhoto from "../assets/images/campus-front.png";
import activityPhoto from "../assets/images/creative-3.jpg";
import classroomPhoto from "../assets/images/creative-3.jpg";
import teamworkPhoto from "../assets/images/group-work.jpg";
import campusPhoto from "../assets/images/campus-view.png";
import faithPhoto from "../assets/images/orientation.jpg";

const { language } = useI18n();
const tr = (en, bn) => (language.value === "bn" ? bn : en);
const steps = [
  {
    title: ["Discuss your child’s place", "সন্তানের ভর্তি নিয়ে আলোচনা করুন"],
    body: [
      "Contact the admission office to ask about available places and the right class.",
      "আসন ও উপযুক্ত শ্রেণি সম্পর্কে জানতে ভর্তি অফিসে যোগাযোগ করুন।",
    ],
  },
  {
    title: ["Submit the application", "আবেদন জমা দিন"],
    body: [
      "Complete the form and provide the documents requested for your child’s class.",
      "ফরম পূরণ করে সন্তানের শ্রেণির জন্য প্রয়োজনীয় কাগজপত্র জমা দিন।",
    ],
  },
  {
    title: ["Assessment and conversation", "মূল্যায়ন ও আলোচনা"],
    body: [
      "An age-appropriate assessment and family conversation help us understand each learner.",
      "বয়স অনুযায়ী মূল্যায়ন ও পরিবারের সঙ্গে আলোচনা শিক্ষার্থীকে বুঝতে সাহায্য করে।",
    ],
  },
  {
    title: ["Confirm enrollment", "ভর্তি নিশ্চিত করুন"],
    body: [
      "The office will guide successful applicants through the remaining enrollment steps.",
      "সফল আবেদনকারীদের পরবর্তী ভর্তি ধাপগুলো অফিস জানাবে।",
    ],
  },
];
const programmes = [
  {
    icon: School,
    tag: ["Primary", "প্রাথমিক"],
    title: ["Grades 1–5", "প্রথম–পঞ্চম শ্রেণি"],
    body: [
      "Reading, writing, mathematics, discovery, and habits that build confidence.",
      "পড়া, লেখা, গণিত, অনুসন্ধান ও আত্মবিশ্বাস গড়ার অভ্যাস।",
    ],
    points: [
      ["Strong foundations", "মজবুত ভিত্তি"],
      ["Language and numeracy", "ভাষা ও গণনা"],
      ["Curiosity and character", "কৌতূহল ও চরিত্র"],
    ],
    to: "/primary-school",
  },
  {
    icon: Users,
    tag: ["Middle School", "নিম্ন মাধ্যমিক"],
    title: ["Grades 6–8", "ষষ্ঠ–অষ্টম শ্রেণি"],
    body: [
      "Deeper subject knowledge, independent thinking, and collaborative learning.",
      "বিষয়ভিত্তিক গভীর জ্ঞান, স্বাধীন চিন্তা ও দলগত শেখা।",
    ],
    points: [
      ["Subject exploration", "বিষয় অন্বেষণ"],
      ["Communication", "যোগাযোগ"],
      ["Growing independence", "স্বাধীনতা বৃদ্ধি"],
    ],
    to: "/middle-school",
  },
  {
    icon: GraduationCap,
    tag: ["Secondary & College", "মাধ্যমিক ও কলেজ"],
    title: ["Grades 9–12", "নবম–দ্বাদশ শ্রেণি"],
    body: [
      "Focused study and guidance as students prepare for examinations and future goals.",
      "পরীক্ষা ও ভবিষ্যৎ লক্ষ্যের প্রস্তুতিতে মনোযোগী পাঠ ও দিকনির্দেশনা।",
    ],
    points: [
      ["Academic focus", "পাঠে মনোযোগ"],
      ["Responsible choices", "দায়িত্বশীল সিদ্ধান্ত"],
      ["Future preparation", "ভবিষ্যতের প্রস্তুতি"],
    ],
    to: "/secondary-school",
  },
];
const facilities = [
  {
    icon: School,
    image: campusPhoto,
    text: ["A welcoming campus", "স্বাগতপূর্ণ ক্যাম্পাস"],
    body: ["A familiar school setting where children can learn, meet friends, and feel at home.", "পরিচিত বিদ্যালয় পরিবেশে শিশুরা শেখে, বন্ধুদের সঙ্গে মেশে এবং স্বাচ্ছন্দ্য বোধ করে।"],
  },
  {
    icon: BookOpen,
    image: classroomPhoto,
    text: ["Bright classrooms", "উজ্জ্বল শ্রেণিকক্ষ"],
    body: ["Classroom activities make room for discussion, creativity, and hands-on learning.", "শ্রেণিকক্ষের কার্যক্রমে আলোচনা, সৃজনশীলতা ও হাতে-কলমে শেখার সুযোগ থাকে।"],
  },
  {
    icon: Users,
    image: teamworkPhoto,
    text: ["Spaces to learn together", "একসঙ্গে শেখার জায়গা"],
    body: ["Group activities help students share ideas and practise working with others.", "দলগত কার্যক্রমে শিক্ষার্থীরা ভাবনা ভাগ করে এবং অন্যদের সঙ্গে কাজ করতে শেখে।"],
  },
  {
    icon: Heart,
    image: faithPhoto,
    text: ["Faith and reflection", "বিশ্বাস ও ভাবনার চর্চা"],
    body: ["Quran learning and moments of reflection are part of the school experience.", "কুরআন শিক্ষা ও ভাবনার মুহূর্ত বিদ্যালয় জীবনের অংশ।"],
  },
];
const contacts = [
  {
    icon: MessageCircle,
    title: ["WhatsApp support", "হোয়াটসঅ্যাপ সহায়তা"],
    body: [
      "Ask about admissions and arrange a conversation with the office.",
      "ভর্তি সম্পর্কে জিজ্ঞাসা করুন এবং অফিসের সঙ্গে কথা বলুন।",
    ],
    action: ["Chat now", "এখনই কথা বলুন"],
    href: `https://wa.me/${headerContacts.phone.replace(/\D/g, "")}`,
    external: true,
  },
  {
    icon: Phone,
    title: ["Call the office", "অফিসে ফোন করুন"],
    body: [
      "Speak directly with our team about classes and enrollment.",
      "শ্রেণি ও ভর্তি নিয়ে সরাসরি আমাদের দলের সঙ্গে কথা বলুন।",
    ],
    action: ["Call now", "ফোন করুন"],
    href: `tel:${headerContacts.phone.replace(/\s/g, "")}`,
    external: true,
  },
  {
    icon: MapPin,
    title: ["Plan a visit", "পরিদর্শনের পরিকল্পনা করুন"],
    body: [
      "Get in touch to discuss a visit and see our learning environment.",
      "ক্যাম্পাস পরিদর্শন ও শিক্ষার পরিবেশ দেখতে যোগাযোগ করুন।",
    ],
    action: ["Contact us", "যোগাযোগ করুন"],
    href: "/contact",
    external: false,
  },
];
</script>

<template>
  <section class="journey-section [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [@media(max-width:700px)]:[&&]:p-[52px_0px] [@media(width>700px)]:[&&]:p-[74px_0px] [&.journey-section:nth-of-type(1)]:[background-color:rgb(242,_246,_252)] [&.journey-section:nth-of-type(3)]:[background-color:rgb(255,_248,_233)]" aria-labelledby="home-admission-title">
    <div class="journey-width [&&]:w-[calc(100%_-_clamp(32px,_6.5vw,_128px))] [&&]:max-w-[1500px] [&&]:[margin-inline-end:auto] [&&]:[margin-inline-start:auto]">
      <p class="journey-eyebrow [&&]:[color:rgb(187,_153,_82)] [&&]:[font-size:12px] [&&]:mb-[12px] [&&]:font-[800] [&&]:tracking-[0.18em]">{{ tr("ADMISSIONS", "ভর্তি") }}</p>
      <h2 id="home-admission-title" class="journey-title [&&]:[color:rgb(41,_78,_158)] [&&]:[font-size:clamp(32px,_3.4vw,_52px)] [&&]:max-w-[750px] [&&]:leading-[1.14] [@media(max-width:700px)]:[&&]:m-[0px_0px_24px_0px] [@media(width>700px)]:[&&]:m-[0px_0px_30px_0px]">
        {{
          tr(
            "Simple steps to begin the next chapter.",
            "নতুন অধ্যায় শুরু করার সহজ ধাপ।",
          )
        }}
      </h2>
      <div class="admission-layout [&&]:grid [@media(max-width:900px)]:[&&]:grid-cols-[1fr] [@media(width>900px)]:[&&]:grid-cols-[minmax(0px,_2.1fr)_minmax(260px,_0.95fr)] [&&]:items-stretch [&&]:gap-x-[20px] [&&]:gap-y-[20px]">
        <ol class="step-list [&&]:grid [&&]:gap-x-[12px] [&&]:gap-y-[12px] [&&]:[list-style-image:initial] [&&]:[list-style-position:initial] [&&]:[list-style-type:none] [&&]:m-[0px] [&&]:p-[0px]">
          <li v-for="(step, index) in steps" :key="index" class="step-card [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[box-shadow:rgba(41,_78,_158,_0.04)_0px_12px_34px] [&&]:flex [&&]:min-h-[100px] [&&]:items-start [@media(max-width:700px)]:[&&]:gap-x-[14px] [@media(width>700px)]:[&&]:gap-x-[18px] [@media(max-width:700px)]:[&&]:gap-y-[14px] [@media(width>700px)]:[&&]:gap-y-[18px] [@media(max-width:700px)]:[&&]:p-[17px] [@media(width>700px)]:[&&]:p-[20px_24px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(220,_227,_240)]">
            <span class="step-number [&&]:grid [@media(max-width:700px)]:[&&]:h-[38px] [@media(width>700px)]:[&&]:h-[44px] [@media(max-width:700px)]:[&&]:w-[38px] [@media(width>700px)]:[&&]:w-[44px] [&&]:items-center [&&]:[justify-items:center] [&&]:[border-bottom-left-radius:50%] [&&]:[border-bottom-right-radius:50%] [&&]:[border-top-left-radius:50%] [&&]:[border-top-right-radius:50%] [&&]:font-[800] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(41,_78,_158)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(255,_255,_255)] [&&]:[flex-basis:auto] [&&]:[flex-grow:0] [&&]:[flex-shrink:0]">{{ index + 1 }}</span>
            <div>
              <h3 class="[&&]:[color:rgb(36,_74,_154)] [&&]:[font-size:18px] [&&]:leading-[1.35] [&&]:m-[0px_0px_8px_0px]">{{ tr(...step.title) }}</h3>
              <p class="[&&]:[font-size:15px] [&&]:leading-[1.7] [&&]:[color:rgb(83,_105,_137)]">{{ tr(...step.body) }}</p>
            </div>
          </li>
        </ol>
        <aside class="admission-desk [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[box-shadow:rgba(41,_78,_158,_0.04)_0px_12px_34px] [&&]:flex [&&]:flex-col [@media(max-width:900px)]:[&&]:max-w-[none] [&&]:p-[22px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(220,_227,_240)]">
          <img class="[&&]:mb-[18px] [&&]:h-[154px] [&&]:w-[100%] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [&&]:object-cover"
            :src="studyPhoto"
            :alt="
              tr(
                'PIISC students learning together',
                'পিআইআইএসসির শিক্ষার্থীরা একসঙ্গে শিখছে',
              )
            "
            loading="lazy"
          />
          <BookOpen :size="26" class="desk-icon [&&]:mb-[15px] [&&]:[color:rgb(212,_169,_38)]" aria-hidden="true" />
          <h3 class="[&&]:[color:rgb(36,_74,_154)] [&&]:[font-size:18px] [&&]:leading-[1.35] [&&]:m-[0px_0px_8px_0px]">{{ tr("Admission desk", "ভর্তি বিভাগ") }}</h3>
          <p class="[&&]:[font-size:15px] [&&]:leading-[1.7] [&&]:[color:rgb(83,_105,_137)] [&&]:mb-[16px]">
            {{
              tr(
                "Ask about current availability and the right pathway for your child.",
                "বর্তমান আসন ও সন্তানের জন্য উপযুক্ত শিক্ষাপথ সম্পর্কে জানুন।",
              )
            }}
          </p>
          <div class="desk-fact [&&]:[border-bottom-color:rgb(220,_227,_240)] [&&]:[border-bottom-style:solid] [&&]:[border-bottom-width:1px] [&&]:[color:rgb(83,_105,_137)] [&&]:[font-size:14px] [&&]:p-[10px_0px]">
            {{ tr("Classes: Grades 1–12", "শ্রেণি: প্রথম–দ্বাদশ") }}
          </div>
          <div class="desk-fact [&&]:[border-bottom-color:rgb(220,_227,_240)] [&&]:[border-bottom-style:solid] [&&]:[border-bottom-width:1px] [&&]:[color:rgb(83,_105,_137)] [&&]:[font-size:14px] [&&]:p-[10px_0px]">
            {{ tr("Medium: English", "মাধ্যম: ইংরেজি") }}
          </div>
          <RouterLink to="/contact" class="journey-button desk-button [&&]:inline-flex [&&]:items-center [&&]:justify-center [&&]:gap-x-[10px] [&&]:gap-y-[10px] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(41,_78,_158)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(255,_255,_255)] [&&]:[font-size:14px] [&&]:min-h-[44px] [&&]:font-[700] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-behavior:normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-delay:0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.2s,_0.2s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:background,_transform] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-timing-function:ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-timing-function:ease] [@media(max-width:900px)]:[&&]:mt-[24px] [@media(width>900px)]:[&&]:mt-[auto] [&&]:w-[100%] [&&]:p-[13px_19px] [&.journey-button:hover]:[background-color:rgb(25,_60,_136)] [@media(prefers-reduced-motion:no-preference)]:[&.journey-button:hover]:[transform:translateY(-2px)] [@media(prefers-reduced-motion:reduce)]:[&.journey-button:hover]:[transform:none]">{{
            tr("Ask a question", "প্রশ্ন করুন")
          }}</RouterLink>
        </aside>
      </div>
    </div>
  </section>

  <section class="journey-section [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [@media(max-width:700px)]:[&&]:p-[52px_0px] [@media(width>700px)]:[&&]:p-[74px_0px] [&.journey-section:nth-of-type(1)]:[background-color:rgb(242,_246,_252)] [&.journey-section:nth-of-type(3)]:[background-color:rgb(255,_248,_233)]" aria-labelledby="home-programmes-title">
    <div class="journey-width [&&]:w-[calc(100%_-_clamp(32px,_6.5vw,_128px))] [&&]:max-w-[1500px] [&&]:[margin-inline-end:auto] [&&]:[margin-inline-start:auto]">
      <div class="programme-heading [@media(max-width:700px)]:[&&]:block [@media(width>700px)]:[&&]:flex [&&]:justify-between [&&]:gap-x-[30px] [&&]:gap-y-[30px] [&&]:[align-items:end]">
        <div>
          <p class="journey-eyebrow [&&]:[color:rgb(187,_153,_82)] [&&]:[font-size:12px] [&&]:mb-[12px] [&&]:font-[800] [&&]:tracking-[0.18em]">
            {{ tr("PROGRAMMES AND CURRICULUM", "শিক্ষাক্রম ও পাঠ্যক্রম") }}
          </p>
          <h2 id="home-programmes-title" class="journey-title [&&]:[color:rgb(41,_78,_158)] [&&]:[font-size:clamp(32px,_3.4vw,_52px)] [&&]:max-w-[750px] [&&]:leading-[1.14] [@media(max-width:700px)]:[&&]:m-[0px_0px_24px_0px] [@media(width>700px)]:[&&]:m-[0px_0px_30px_0px]">
            {{
              tr(
                "A strong foundation with room to grow.",
                "বিকাশের সুযোগসহ মজবুত ভিত্তি।",
              )
            }}
          </h2>
        </div>
        <img class="[@media(max-width:700px)]:[&&]:h-[180px] [@media(width>700px)]:[&&]:h-[175px] [@media(max-width:700px)]:[&&]:w-[100%] [@media(width>700px)]:[&&]:w-[35%] [@media(max-width:700px)]:[&&]:max-w-[none] [@media(width>700px)]:[&&]:max-w-[470px] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [&&]:object-cover [@media(max-width:700px)]:[&&]:m-[0px_0px_22px_0px] [@media(width>700px)]:[&&]:mb-[22px]"
          :src="groupPhoto"
          :alt="
            tr(
              'PIISC students together at school',
              'পিআইআইএসসির শিক্ষার্থীরা বিদ্যালয়ে একসঙ্গে',
            )
          "
          loading="lazy"
        />
      </div>
      <div class="programme-grid [&&]:mb-[26px] [&&]:grid [@media(max-width:700px)]:[&&]:grid-cols-[1fr] [@media(width>700px)]:[&&]:grid-cols-[repeat(3,_minmax(0px,_1fr))] [&&]:gap-x-[18px] [&&]:gap-y-[18px]">
        <article
          v-for="programme in programmes"
          :key="programme.to"
          class="programme-card [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[box-shadow:rgba(41,_78,_158,_0.04)_0px_12px_34px] [&&]:flex [&&]:flex-col [&&]:items-start [&&]:p-[26px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(220,_227,_240)]"
        >
          <span class="journey-icon [&&]:mb-[17px] [&&]:grid [&&]:h-[46px] [&&]:w-[46px] [&&]:items-center [&&]:[justify-items:center] [&&]:[border-bottom-left-radius:50%] [&&]:[border-bottom-right-radius:50%] [&&]:[border-top-left-radius:50%] [&&]:[border-top-right-radius:50%] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_248,_206)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(41,_78,_158)] [&&]:[flex-basis:auto] [&&]:[flex-grow:0] [&&]:[flex-shrink:0]"
            ><component :is="programme.icon" :size="21" aria-hidden="true"
          /></span>
          <span class="programme-tag [&&]:[font-size:12px] [&&]:mb-[15px] [&&]:[border-bottom-left-radius:100px] [&&]:[border-bottom-right-radius:100px] [&&]:[border-top-left-radius:100px] [&&]:[border-top-right-radius:100px] [&&]:font-[700] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_248,_206)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(41,_78,_158)] [&&]:p-[5px_9px]">{{ tr(...programme.tag) }}</span>
          <h3 class="[&&]:[color:rgb(36,_74,_154)] [&&]:[font-size:18px] [&&]:leading-[1.35] [&&]:m-[0px_0px_8px_0px]">{{ tr(...programme.title) }}</h3>
          <p class="[&&]:[font-size:15px] [&&]:leading-[1.7] [&&]:[color:rgb(83,_105,_137)] [&&]:mb-[18px]">{{ tr(...programme.body) }}</p>
          <ul class="[&&]:grid [&&]:gap-x-[8px] [&&]:gap-y-[8px] [&&]:[list-style-image:initial] [&&]:[list-style-position:initial] [&&]:[list-style-type:none] [&&]:m-[0px_0px_20px_0px] [&&]:p-[0px]">
            <li class="[&&]:flex [&&]:items-center [&&]:gap-x-[8px] [&&]:gap-y-[8px] [&&]:[color:rgb(41,_78,_158)] [&&]:[font-size:13px] [&&]:font-[650]" v-for="point in programme.points" :key="point[0]">
              <Check class="[&&]:[color:rgb(208,_165,_40)]" :size="15" aria-hidden="true" />{{ tr(...point) }}
            </li>
          </ul>
          <RouterLink :to="programme.to" class="card-link [&&]:inline-flex [&&]:items-center [&&]:gap-x-[4px] [&&]:gap-y-[4px] [&&]:[color:rgb(41,_78,_158)] [&&]:[font-size:14px] [&&]:mt-[auto] [&&]:font-[700] [&.card-link:hover]:[text-decoration:underline] [&.card-link:hover]:[text-decoration-color:initial] [&.card-link:hover]:[text-decoration-line:underline] [&.card-link:hover]:[text-decoration-style:initial] [&.card-link:hover]:[text-decoration-thickness:initial]"
            >{{ tr("Explore stage", "পর্যায়টি দেখুন") }}
            <ChevronRight :size="16" aria-hidden="true"
          /></RouterLink>
        </article>
      </div>
      <RouterLink to="/academics" class="journey-button [&&]:inline-flex [&&]:items-center [&&]:justify-center [&&]:gap-x-[10px] [&&]:gap-y-[10px] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(41,_78,_158)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(255,_255,_255)] [&&]:[font-size:14px] [&&]:min-h-[44px] [&&]:font-[700] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-behavior:normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-delay:0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.2s,_0.2s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:background,_transform] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-timing-function:ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-timing-function:ease] [&&]:p-[13px_19px] [&.journey-button:hover]:[background-color:rgb(25,_60,_136)] [@media(prefers-reduced-motion:no-preference)]:[&.journey-button:hover]:[transform:translateY(-2px)] [@media(prefers-reduced-motion:reduce)]:[&.journey-button:hover]:[transform:none]"
        >{{ tr("Explore all programmes", "সব শিক্ষাক্রম দেখুন") }}
        <ChevronRight :size="18" aria-hidden="true"
      /></RouterLink>
    </div>
  </section>

  <section class="journey-section [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [@media(max-width:700px)]:[&&]:p-[52px_0px] [@media(width>700px)]:[&&]:p-[74px_0px] [&.journey-section:nth-of-type(1)]:[background-color:rgb(242,_246,_252)] [&.journey-section:nth-of-type(3)]:[background-color:rgb(255,_248,_233)]" aria-labelledby="home-facilities-title">
    <div class="journey-width facilities-layout [&&]:w-[calc(100%_-_clamp(32px,_6.5vw,_128px))] [&&]:max-w-[1500px] [&&]:[margin-inline-end:auto] [&&]:[margin-inline-start:auto] [&&]:grid [@media(max-width:900px)]:[&&]:grid-cols-[1fr] [@media(width>900px)]:[&&]:grid-cols-[0.9fr_1.1fr] [&&]:gap-x-[40px] [&&]:gap-y-[40px] [&&]:[align-items:start]">
      <div class="facilities-copy">
        <p class="journey-eyebrow [&&]:[color:rgb(187,_153,_82)] [&&]:[font-size:12px] [&&]:mb-[12px] [&&]:font-[800] [&&]:tracking-[0.18em] [.facilities-copy_>_p&:not(.journey-eyebrow)]:[color:rgb(83,_105,_137)] [.facilities-copy_>_p&:not(.journey-eyebrow)]:[font-size:15px] [.facilities-copy_>_p&:not(.journey-eyebrow)]:mb-[18px] [.facilities-copy_>_p&:not(.journey-eyebrow)]:leading-[1.7] [.facilities-copy_>_p&:not(.journey-eyebrow)]:max-w-[530px]">{{ tr("FACILITIES", "সুযোগ-সুবিধা") }}</p>
        <h2 id="home-facilities-title" class="journey-title [&&&]:[color:rgb(41,_78,_158)] [&&&]:[font-size:clamp(32px,_3.4vw,_52px)] [&&&]:max-w-[600px] [&&&]:leading-[1.14] [@media(max-width:700px)]:[&&&]:m-[0px_0px_24px_0px] [@media(width>700px)]:[&&&]:m-[0px_0px_30px_0px]">
          {{
            tr(
              "Space to learn, create, and belong.",
              "শেখা, সৃষ্টি ও বেড়ে ওঠার পরিসর।",
            )
          }}
        </h2>
        <p class="[.facilities-copy_>_p&:not(.journey-eyebrow)]:[font-size:15px] [.facilities-copy_>_p&:not(.journey-eyebrow)]:leading-[1.7] [.facilities-copy_>_p&:not(.journey-eyebrow)]:[color:rgb(83,_105,_137)] [.facilities-copy_>_p&:not(.journey-eyebrow)]:mb-[18px] [.facilities-copy_>_p&:not(.journey-eyebrow)]:max-w-[530px]">
          {{
            tr(
              "Our school environment supports focused study, creative activity, and a sense of community throughout the learning journey.",
              "আমাদের বিদ্যালয় পরিবেশে মনোযোগ দিয়ে পড়া, সৃজনশীল কাজে অংশ নেওয়া এবং পারস্পরিক সম্পর্ক গড়ে তোলার সুযোগ আছে।",
            )
          }}
        </p>
        <RouterLink to="/facilities" class="journey-button [&&]:inline-flex [&&]:items-center [&&]:justify-center [&&]:gap-x-[10px] [&&]:gap-y-[10px] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(41,_78,_158)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(255,_255,_255)] [&&]:[font-size:14px] [&&]:min-h-[44px] [&&]:font-[700] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-behavior:normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-delay:0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.2s,_0.2s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:background,_transform] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-timing-function:ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-timing-function:ease] [&&]:p-[13px_19px] [&.journey-button:hover]:[background-color:rgb(25,_60,_136)] [@media(prefers-reduced-motion:no-preference)]:[&.journey-button:hover]:[transform:translateY(-2px)] [@media(prefers-reduced-motion:reduce)]:[&.journey-button:hover]:[transform:none]"
          >{{ tr("View facilities", "সুবিধাগুলো দেখুন") }}
          <ChevronRight :size="18" aria-hidden="true"
        /></RouterLink>
        <img class="[&&]:mt-[24px] [&&]:h-[250px] [&&]:w-[100%] [&&]:max-w-[560px] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [&&]:object-cover"
          :src="facilityPhoto"
          :alt="
            tr(
              'PIISC school building and learning environment',
              'পিআইআইএসসির বিদ্যালয় ভবন ও শিক্ষার পরিবেশ',
            )
          "
          loading="lazy"
        />
      </div>
      <div class="facilities-grid [&&]:grid [@media(max-width:440px)]:[&&]:grid-cols-[1fr] [@media(width>440px)]:[&&]:grid-cols-[repeat(2,_minmax(0px,_1fr))] [&&]:gap-x-[16px] [&&]:gap-y-[16px] [&&]:[align-self:stretch]">
        <article class="[&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:9px] [&&]:[border-bottom-right-radius:9px] [&&]:[border-top-left-radius:9px] [&&]:[border-top-right-radius:9px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[box-shadow:rgba(41,_78,_158,_0.04)_0px_12px_34px] [&&]:min-h-[0px] [&&]:flex [&&]:flex-col [&&]:overflow-x-hidden [&&]:overflow-y-hidden [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-behavior:normal,_normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-delay:0s,_0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.25s,_0.25s,_0.25s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:transform,_box-shadow,_border-color] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-timing-function:ease,_ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-timing-function:ease] [&&]:p-[0px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(220,_227,_240)] [.facilities-grid_article&:hover]:[box-shadow:rgba(23,_58,_106,_0.094)_0px_18px_35px] [@media(prefers-reduced-motion:no-preference)]:[.facilities-grid_article&:hover]:[transform:translateY(-4px)] [@media(prefers-reduced-motion:reduce)]:[.facilities-grid_article&:hover]:[transform:none] [.facilities-grid_article&:hover]:[border-color:rgb(217,_179,_61)]" v-for="facility in facilities" :key="facility.text[0]">
          <img class="facility-card-image [@media(max-width:440px)]:[&&]:h-[185px] [@media(width>440px)]:[&&]:h-[150px] [&&]:w-[100%] [&&]:object-cover" :src="facility.image" :alt="tr(...facility.text)" loading="lazy" width="600" height="360" />
          <div class="facility-card-content [&&]:p-[19px_21px_22px_21px]">
            <span class="journey-icon [&&&]:mb-[13px] [&&&]:grid [&&&]:h-[42px] [&&&]:w-[42px] [&&&]:items-center [&&&]:[justify-items:center] [&&&]:[border-bottom-left-radius:50%] [&&&]:[border-bottom-right-radius:50%] [&&&]:[border-top-left-radius:50%] [&&&]:[border-top-right-radius:50%] [&&&]:[background-attachment:initial] [&&&]:[background-clip:initial] [&&&]:[background-color:rgb(255,_248,_206)] [&&&]:[background-image:initial] [&&&]:[background-origin:initial] [&&&]:[background-position:initial] [&&&]:[background-repeat:initial] [&&&]:[background-size:initial] [&&&]:[color:rgb(41,_78,_158)] [&&&]:[flex-basis:auto] [&&&]:[flex-grow:0] [&&&]:[flex-shrink:0]"><component :is="facility.icon" :size="21" aria-hidden="true" /></span>
            <h3 class="[&&]:[color:rgb(41,_78,_158)] [@media(max-width:700px)]:[&&]:[font-size:15px] [@media(width>700px)]:[&&]:[font-size:17px] [&&]:leading-[1.5] [&&]:mb-[7px]">{{ tr(...facility.text) }}</h3>
            <p class="[&&]:[color:rgb(93,_110,_134)] [&&]:[font-size:13px] [&&]:leading-[1.55]">{{ tr(...facility.body) }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section
    class="journey-section communication-section [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [@media(max-width:700px)]:[&&]:p-[52px_0px] [@media(width>700px)]:[&&]:p-[74px_0px] [&.journey-section:nth-of-type(1)]:[background-color:rgb(242,_246,_252)] [&.journey-section:nth-of-type(3)]:[background-color:rgb(255,_248,_233)]"
    aria-labelledby="home-communication-title"
  >
    <div class="journey-width [&&]:w-[calc(100%_-_clamp(32px,_6.5vw,_128px))] [&&]:max-w-[1500px] [&&]:[margin-inline-end:auto] [&&]:[margin-inline-start:auto]">
      <div class="communication-heading [@media(max-width:700px)]:[&&]:block [@media(width>700px)]:[&&]:flex [&&]:justify-between [&&]:gap-x-[30px] [&&]:gap-y-[30px] [&&]:[align-items:end]">
        <div>
          <p class="journey-eyebrow [&&]:[color:rgb(187,_153,_82)] [&&]:[font-size:12px] [&&]:mb-[12px] [&&]:font-[800] [&&]:tracking-[0.18em]">
            {{ tr("PARENT COMMUNICATION", "অভিভাবকদের সঙ্গে যোগাযোগ") }}
          </p>
          <h2 id="home-communication-title" class="journey-title [&&]:[color:rgb(41,_78,_158)] [&&]:[font-size:clamp(32px,_3.4vw,_52px)] [&&]:max-w-[750px] [&&]:leading-[1.14] [@media(max-width:700px)]:[&&]:m-[0px_0px_24px_0px] [@media(width>700px)]:[&&]:m-[0px_0px_30px_0px]">
            {{
              tr(
                "Answers for families planning the next step.",
                "পরবর্তী ধাপের পরিকল্পনায় পরিবারের পাশে।",
              )
            }}
          </h2>
        </div>
        <img class="[@media(max-width:700px)]:[&&]:h-[180px] [@media(width>700px)]:[&&]:h-[175px] [@media(max-width:700px)]:[&&]:w-[100%] [@media(width>700px)]:[&&]:w-[36%] [@media(max-width:700px)]:[&&]:max-w-[none] [@media(width>700px)]:[&&]:max-w-[470px] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [&&]:object-cover [@media(max-width:700px)]:[&&]:m-[0px_0px_22px_0px] [@media(width>700px)]:[&&]:mb-[22px]"
          :src="activityPhoto"
          :alt="
            tr(
              'Learning activity at PIISC',
              'পিআইআইএসসিতে শিক্ষামূলক কার্যক্রম',
            )
          "
          loading="lazy"
        />
      </div>
      <div class="communication-grid [&&]:mb-[26px] [&&]:grid [@media(max-width:700px)]:[&&]:grid-cols-[1fr] [@media(width>700px)]:[&&]:grid-cols-[repeat(3,_minmax(0px,_1fr))] [&&]:gap-x-[18px] [&&]:gap-y-[18px]">
        <article class="[&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[box-shadow:rgba(41,_78,_158,_0.04)_0px_12px_34px] [&&]:flex [&&]:min-h-[205px] [&&]:flex-col [&&]:items-start [&&]:p-[25px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(220,_227,_240)]" v-for="contact in contacts" :key="contact.href">
          <span class="journey-icon contact-icon [&&]:mb-[17px] [&&]:grid [&&]:h-[46px] [&&]:w-[46px] [&&]:items-center [&&]:[justify-items:center] [&&]:[border-bottom-left-radius:50%] [&&]:[border-bottom-right-radius:50%] [&&]:[border-top-left-radius:50%] [&&]:[border-top-right-radius:50%] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(232,_241,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(41,_78,_158)] [&&]:[flex-basis:auto] [&&]:[flex-grow:0] [&&]:[flex-shrink:0]"
            ><component :is="contact.icon" :size="21" aria-hidden="true"
          /></span>
          <h3 class="[&&]:[color:rgb(36,_74,_154)] [&&]:[font-size:17px] [&&]:leading-[1.35] [&&]:m-[0px_0px_8px_0px]">{{ tr(...contact.title) }}</h3>
          <p class="[&&]:[font-size:15px] [&&]:leading-[1.7] [&&]:[color:rgb(83,_105,_137)] [&&]:mb-[20px]">{{ tr(...contact.body) }}</p>
          <a
            v-if="contact.external"
            :href="contact.href"
            :target="contact.href.startsWith('https:') ? '_blank' : undefined"
            :rel="
              contact.href.startsWith('https:')
                ? 'noopener noreferrer'
                : undefined
            "
            class="card-link [&&]:inline-flex [&&]:items-center [&&]:gap-x-[4px] [&&]:gap-y-[4px] [&&]:[color:rgb(41,_78,_158)] [&&]:[font-size:14px] [&&]:mt-[auto] [&&]:font-[700] [&.card-link:hover]:[text-decoration:underline] [&.card-link:hover]:[text-decoration-color:initial] [&.card-link:hover]:[text-decoration-line:underline] [&.card-link:hover]:[text-decoration-style:initial] [&.card-link:hover]:[text-decoration-thickness:initial]"
            >{{ tr(...contact.action) }}
            <ChevronRight :size="16" aria-hidden="true" /></a
          ><RouterLink v-else :to="contact.href" class="card-link [&&]:inline-flex [&&]:items-center [&&]:gap-x-[4px] [&&]:gap-y-[4px] [&&]:[color:rgb(41,_78,_158)] [&&]:[font-size:14px] [&&]:mt-[auto] [&&]:font-[700] [&.card-link:hover]:[text-decoration:underline] [&.card-link:hover]:[text-decoration-color:initial] [&.card-link:hover]:[text-decoration-line:underline] [&.card-link:hover]:[text-decoration-style:initial] [&.card-link:hover]:[text-decoration-thickness:initial]"
            >{{ tr(...contact.action) }}
            <ChevronRight :size="16" aria-hidden="true"
          /></RouterLink>
        </article>
      </div>
    </div>
  </section>
</template>
