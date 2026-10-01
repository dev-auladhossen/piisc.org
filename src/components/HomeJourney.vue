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
  <section class="journey-section" aria-labelledby="home-admission-title">
    <div class="journey-width">
      <p class="journey-eyebrow">{{ tr("ADMISSIONS", "ভর্তি") }}</p>
      <h2 id="home-admission-title" class="journey-title">
        {{
          tr(
            "Simple steps to begin the next chapter.",
            "নতুন অধ্যায় শুরু করার সহজ ধাপ।",
          )
        }}
      </h2>
      <div class="admission-layout">
        <ol class="step-list">
          <li v-for="(step, index) in steps" :key="index" class="step-card">
            <span class="step-number">{{ index + 1 }}</span>
            <div>
              <h3>{{ tr(...step.title) }}</h3>
              <p>{{ tr(...step.body) }}</p>
            </div>
          </li>
        </ol>
        <aside class="admission-desk">
          <img
            :src="studyPhoto"
            :alt="
              tr(
                'PIISC students learning together',
                'পিআইআইএসসির শিক্ষার্থীরা একসঙ্গে শিখছে',
              )
            "
            loading="lazy"
          />
          <BookOpen :size="26" class="desk-icon" aria-hidden="true" />
          <h3>{{ tr("Admission desk", "ভর্তি বিভাগ") }}</h3>
          <p>
            {{
              tr(
                "Ask about current availability and the right pathway for your child.",
                "বর্তমান আসন ও সন্তানের জন্য উপযুক্ত শিক্ষাপথ সম্পর্কে জানুন।",
              )
            }}
          </p>
          <div class="desk-fact">
            {{ tr("Classes: Grades 1–12", "শ্রেণি: প্রথম–দ্বাদশ") }}
          </div>
          <div class="desk-fact">
            {{ tr("Medium: English", "মাধ্যম: ইংরেজি") }}
          </div>
          <RouterLink to="/contact" class="journey-button desk-button">{{
            tr("Ask a question", "প্রশ্ন করুন")
          }}</RouterLink>
        </aside>
      </div>
    </div>
  </section>

  <section class="journey-section" aria-labelledby="home-programmes-title">
    <div class="journey-width">
      <div class="programme-heading">
        <div>
          <p class="journey-eyebrow">
            {{ tr("PROGRAMMES AND CURRICULUM", "শিক্ষাক্রম ও পাঠ্যক্রম") }}
          </p>
          <h2 id="home-programmes-title" class="journey-title">
            {{
              tr(
                "A strong foundation with room to grow.",
                "বিকাশের সুযোগসহ মজবুত ভিত্তি।",
              )
            }}
          </h2>
        </div>
        <img
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
      <div class="programme-grid">
        <article
          v-for="programme in programmes"
          :key="programme.to"
          class="programme-card"
        >
          <span class="journey-icon"
            ><component :is="programme.icon" :size="21" aria-hidden="true"
          /></span>
          <span class="programme-tag">{{ tr(...programme.tag) }}</span>
          <h3>{{ tr(...programme.title) }}</h3>
          <p>{{ tr(...programme.body) }}</p>
          <ul>
            <li v-for="point in programme.points" :key="point[0]">
              <Check :size="15" aria-hidden="true" />{{ tr(...point) }}
            </li>
          </ul>
          <RouterLink :to="programme.to" class="card-link"
            >{{ tr("Explore stage", "পর্যায়টি দেখুন") }}
            <ChevronRight :size="16" aria-hidden="true"
          /></RouterLink>
        </article>
      </div>
      <RouterLink to="/academics" class="journey-button"
        >{{ tr("Explore all programmes", "সব শিক্ষাক্রম দেখুন") }}
        <ChevronRight :size="18" aria-hidden="true"
      /></RouterLink>
    </div>
  </section>

  <section class="journey-section" aria-labelledby="home-facilities-title">
    <div class="journey-width facilities-layout">
      <div class="facilities-copy">
        <p class="journey-eyebrow">{{ tr("FACILITIES", "সুযোগ-সুবিধা") }}</p>
        <h2 id="home-facilities-title" class="journey-title">
          {{
            tr(
              "Space to learn, create, and belong.",
              "শেখা, সৃষ্টি ও বেড়ে ওঠার পরিসর।",
            )
          }}
        </h2>
        <p>
          {{
            tr(
              "Our school environment supports focused study, creative activity, and a sense of community throughout the learning journey.",
              "আমাদের বিদ্যালয় পরিবেশে মনোযোগ দিয়ে পড়া, সৃজনশীল কাজে অংশ নেওয়া এবং পারস্পরিক সম্পর্ক গড়ে তোলার সুযোগ আছে।",
            )
          }}
        </p>
        <RouterLink to="/facilities" class="journey-button"
          >{{ tr("View facilities", "সুবিধাগুলো দেখুন") }}
          <ChevronRight :size="18" aria-hidden="true"
        /></RouterLink>
        <img
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
      <div class="facilities-grid">
        <article v-for="facility in facilities" :key="facility.text[0]">
          <img class="facility-card-image" :src="facility.image" :alt="tr(...facility.text)" loading="lazy" width="600" height="360" />
          <div class="facility-card-content">
            <span class="journey-icon"><component :is="facility.icon" :size="21" aria-hidden="true" /></span>
            <h3>{{ tr(...facility.text) }}</h3>
            <p>{{ tr(...facility.body) }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section
    class="journey-section communication-section"
    aria-labelledby="home-communication-title"
  >
    <div class="journey-width">
      <div class="communication-heading">
        <div>
          <p class="journey-eyebrow">
            {{ tr("PARENT COMMUNICATION", "অভিভাবকদের সঙ্গে যোগাযোগ") }}
          </p>
          <h2 id="home-communication-title" class="journey-title">
            {{
              tr(
                "Answers for families planning the next step.",
                "পরবর্তী ধাপের পরিকল্পনায় পরিবারের পাশে।",
              )
            }}
          </h2>
        </div>
        <img
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
      <div class="communication-grid">
        <article v-for="contact in contacts" :key="contact.href">
          <span class="journey-icon contact-icon"
            ><component :is="contact.icon" :size="21" aria-hidden="true"
          /></span>
          <h3>{{ tr(...contact.title) }}</h3>
          <p>{{ tr(...contact.body) }}</p>
          <a
            v-if="contact.external"
            :href="contact.href"
            :target="contact.href.startsWith('https:') ? '_blank' : undefined"
            :rel="
              contact.href.startsWith('https:')
                ? 'noopener noreferrer'
                : undefined
            "
            class="card-link"
            >{{ tr(...contact.action) }}
            <ChevronRight :size="16" aria-hidden="true" /></a
          ><RouterLink v-else :to="contact.href" class="card-link"
            >{{ tr(...contact.action) }}
            <ChevronRight :size="16" aria-hidden="true"
          /></RouterLink>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.journey-section {
  padding: 74px 0;
  background: #fff;
}
.journey-section + .journey-section {
  padding-top: 36px;
}
.journey-width {
  width: calc(100% - clamp(32px, 6.5vw, 128px));
  max-width: 1500px;
  margin-inline: auto;
}
.journey-eyebrow {
  color: #bb9952;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;
  margin-bottom: 12px;
}
.journey-title {
  color: #294e9e;
  font-size: clamp(32px, 3.4vw, 52px);
  line-height: 1.14;
  max-width: 750px;
  margin: 0 0 30px;
}
.admission-layout {
  display: grid;
  grid-template-columns: minmax(0, 2.1fr) minmax(260px, 0.95fr);
  gap: 20px;
  align-items: stretch;
}
.step-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}
.step-card,
.admission-desk,
.programme-card,
.facilities-grid article,
.communication-grid article {
  border: 1px solid #dce3f0;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 12px 34px #294e9e0a;
}
.step-card {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 20px 24px;
  min-height: 100px;
}
.step-number {
  flex: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #294e9e;
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 800;
}
.step-card h3,
.admission-desk h3,
.programme-card h3,
.communication-grid h3 {
  color: #244a9a;
  font-size: 18px;
  line-height: 1.35;
  margin: 0 0 8px;
}
.step-card p,
.admission-desk p,
.programme-card p,
.communication-grid p,
.facilities-copy > p:not(.journey-eyebrow) {
  font-size: 15px;
  line-height: 1.7;
  color: #536989;
}
.admission-desk {
  padding: 22px;
  display: flex;
  flex-direction: column;
}
.admission-desk img {
  width: 100%;
  height: 154px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 18px;
}
.desk-icon {
  color: #d4a926;
  margin-bottom: 15px;
}
.admission-desk p {
  margin-bottom: 16px;
}
.desk-fact {
  padding: 10px 0;
  border-bottom: 1px solid #dce3f0;
  font-size: 14px;
  color: #536989;
}
.journey-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #294e9e;
  color: #fff;
  border-radius: 6px;
  padding: 13px 19px;
  font-size: 14px;
  font-weight: 700;
  min-height: 44px;
  transition:
    background 0.2s,
    transform 0.2s;
}
.journey-button:hover {
  background: #193c88;
  transform: translateY(-2px);
}
.desk-button {
  width: 100%;
  margin-top: auto;
}
.programme-heading,
.communication-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 30px;
}
.programme-heading img,
.communication-heading img {
  width: 35%;
  max-width: 470px;
  height: 175px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 22px;
}
.programme-grid,
.communication-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 26px;
}
.programme-card {
  padding: 26px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.journey-icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #fff8ce;
  color: #294e9e;
  flex: none;
  margin-bottom: 17px;
}
.programme-tag {
  font-size: 12px;
  font-weight: 700;
  background: #fff8ce;
  color: #294e9e;
  border-radius: 100px;
  padding: 5px 9px;
  margin-bottom: 15px;
}
.programme-card p {
  margin-bottom: 18px;
}
.programme-card ul {
  list-style: none;
  margin: 0 0 20px;
  padding: 0;
  display: grid;
  gap: 8px;
}
.programme-card li {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 13px;
  color: #294e9e;
  font-weight: 650;
}
.programme-card li svg {
  color: #d0a528;
}
.card-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #294e9e;
  font-size: 14px;
  font-weight: 700;
  margin-top: auto;
}
.card-link:hover {
  text-decoration: underline;
}
.facilities-layout {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 40px;
  align-items: start;
}
.facilities-copy .journey-title {
  max-width: 600px;
}
.facilities-copy > p:not(.journey-eyebrow) {
  max-width: 530px;
  margin-bottom: 18px;
}
.facilities-copy img {
  width: 100%;
  max-width: 560px;
  height: 250px;
  object-fit: cover;
  border-radius: 6px;
  margin-top: 24px;
}
.facilities-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  align-self: stretch;
}
.facilities-grid article {
  padding: 24px;
  min-height: 205px;
}
.facilities-grid h3 {
  color: #1e2940;
  font-size: 17px;
  line-height: 1.5;
}
.communication-heading img {
  width: 36%;
}
.communication-grid article {
  padding: 25px;
  min-height: 205px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.contact-icon {
  background: #e8f1ff;
}
.communication-grid h3 {
  font-size: 17px;
}
.communication-grid p {
  margin-bottom: 20px;
}
@media (max-width: 900px) {
  .admission-layout,
  .facilities-layout {
    grid-template-columns: 1fr;
  }
  .admission-desk {
    max-width: none;
  }
  .desk-button {
    margin-top: 24px;
  }
  .facilities-grid article {
    min-height: 150px;
  }
}
@media (max-width: 700px) {
  .journey-section {
    padding: 52px 0;
  }
  .journey-section + .journey-section {
    padding-top: 32px;
  }
  .journey-title {
    margin-bottom: 24px;
  }
  .programme-heading,
  .communication-heading {
    display: block;
  }
  .programme-heading img,
  .communication-heading img {
    width: 100%;
    max-width: none;
    height: 180px;
    margin: 0 0 22px;
  }
  .programme-grid,
  .communication-grid {
    grid-template-columns: 1fr;
  }
  .step-card {
    padding: 17px;
    gap: 14px;
  }
  .step-number {
    width: 38px;
    height: 38px;
  }
  .facilities-grid article {
    min-height: 130px;
    padding: 17px;
  }
  .facilities-grid h3 {
    font-size: 15px;
  }
}
@media (max-width: 440px) {
  .facilities-grid {
    grid-template-columns: 1fr;
  }
  .facilities-grid article {
    min-height: 96px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .journey-button {
    transition: none;
  }
  .journey-button:hover {
    transform: none;
  }
}
</style>
<style scoped>
.facilities-grid article {
  display: flex;
  flex-direction: column;
  padding: 0;
  min-height: 0;
  overflow: hidden;
  border-radius: 9px;
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
}
.facilities-grid article:hover {
  transform: translateY(-4px);
  border-color: #d9b33d;
  box-shadow: 0 18px 35px #173a6a18;
}
.facility-card-image { width: 100%; height: 150px; object-fit: cover; }
.facility-card-content { padding: 19px 21px 22px; }
.facility-card-content .journey-icon { width: 42px; height: 42px; margin-bottom: 13px; }
.facilities-grid h3 { margin-bottom: 7px; color: #294e9e; }
.facilities-grid p { color: #5d6e86; font-size: 13px; line-height: 1.55; }
@media (max-width: 700px) {
  .facilities-grid article { padding: 0; }
}
@media (max-width: 440px) {
  .facilities-grid article { min-height: 0; }
  .facility-card-image { height: 185px; }
}
@media (prefers-reduced-motion: reduce) {
  .facilities-grid article { transition: none; }
  .facilities-grid article:hover { transform: none; }
}
</style>
<style scoped>
.journey-section:nth-of-type(1) {
  background: #f2f6fc;
}
.journey-section:nth-of-type(2) {
  background: #fff;
}
.journey-section:nth-of-type(3) {
  background: #fff8e9;
}
.journey-section:nth-of-type(4) {
  background: #fff;
}
.journey-section + .journey-section {
  padding-top: 74px;
}
@media (max-width: 700px) {
  .journey-section + .journey-section {
    padding-top: 52px;
  }
}
</style>
