<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import {
  BookOpen,
  BookOpenCheck,
  PersonStanding,
  Star,
  Heart,
  Globe,
  GraduationCap,
  Users,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  X,
} from "lucide-vue-next";
import { images, address } from "../data/content.js";
import { headerContacts } from "../data/navigation.js";
import { useI18n } from "../composables/useI18n.js";
import readingPhoto from "../assets/images/807658670_122168336486964101_987858460138339590_n.jpg";
import friendsPhoto from "../assets/images/618814465_122140092008964101_7447186655001681018_n.jpg";
import groupPhoto from "../assets/images/funtime.jpg";
const { language } = useI18n();
const text = (en, bn) => (language.value === "bn" ? bn : en);
const dialog = ref(null);
const values = [
  {
    icon: BookOpen,
    en: "ACADEMIC\nEXCELLENCE",
    bn: "শিক্ষায় উৎকর্ষ",
    detail: "Learning for a brighter future",
    detailBn: "উজ্জ্বল ভবিষ্যতের জন্য শিক্ষা",
  },
  {
    icon: BookOpenCheck,
    en: "ISLAMIC\nVALUES",
    bn: "ইসলামিক মূল্যবোধ",
    detail: "Faith, kindness & character",
    detailBn: "বিশ্বাস, সহমর্মিতা ও চরিত্র",
  },
  {
    icon: PersonStanding,
    en: "CHILD-CENTERED\nLEARNING",
    bn: "শিশুকেন্দ্রিক শিক্ষা",
    detail: "Curiosity in every classroom",
    detailBn: "প্রতি শ্রেণিকক্ষে কৌতূহল",
  },
  {
    icon: Users,
    en: "LEADERSHIP &\nCONFIDENCE",
    bn: "নেতৃত্ব ও আত্মবিশ্বাস",
    detail: "Growing with confidence",
    detailBn: "আত্মবিশ্বাস নিয়ে বেড়ে ওঠা",
  },
  {
    icon: Globe,
    en: "GLOBAL VISION",
    bn: "বিশ্বমুখী ভাবনা",
    detail: "Rooted in values, ready for the world",
    detailBn: "মূল্যবোধের সাথে বিশ্বকে জানা",
  },
];
const highlights = [
  {
    image: readingPhoto,
    en: "LOVE OF LEARNING",
    bn: "শেখার আনন্দ",
    detail: "Discovering a world of knowledge.",
    detailBn: "জ্ঞানের নতুন জগৎ আবিষ্কার।",
  },
  {
    image: friendsPhoto,
    en: "GROWING TOGETHER",
    bn: "একসাথে বেড়ে ওঠা",
    detail: "Friendship, kindness and confidence.",
    detailBn: "বন্ধুত্ব, সহমর্মিতা ও আত্মবিশ্বাস।",
  },
  {
    image: groupPhoto,
    en: "SCHOOL LIFE",
    bn: "স্কুল জীবন",
    detail: "Making memories every day.",
    detailBn: "প্রতিদিন নতুন স্মৃতি।",
  },
];
let previousOverflow,
  previousFocus,
  locked = false;
function restorePage() {
  if (!locked) return;
  document.body.style.overflow = previousOverflow;
  locked = false;
  if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
}
function close() {
  dialog.value?.close();
  restorePage();
}
onMounted(() => {
  previousFocus = document.activeElement;
  previousOverflow = document.body.style.overflow;
  dialog.value.showModal();
  document.body.style.overflow = "hidden";
  locked = true;
});
onBeforeUnmount(() => {
  dialog.value?.close();
  restorePage();
});
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      class="admission-popup"
      aria-labelledby="admission-popup-title"
      @keydown.esc.stop.prevent="close"
      @cancel.prevent="close"
      @close="restorePage"
      @click="
        (event) => {
          if (event.target === dialog) close();
        }
      "
    >
      <article class="admission-poster">
        <button
          class="popup-close"
          type="button"
          :aria-label="text('Close admissions popup', 'ভর্তির পপআপ বন্ধ করুন')"
          autofocus
          @click="close"
        >
          <X aria-hidden="true" />
        </button>
        <div class="poster-main">
          <header class="poster-brand">
            <img
              :src="images.logo"
              :alt="text('PIISC school emblem', 'PIISC স্কুলের লোগো')"
              width="120"
              height="120"
            />
            <div>
              <h2 id="admission-popup-title">
                {{ text("PEACE INTERNATIONAL", "পিস ইন্টারন্যাশনাল")
                }}<span>{{
                  text("ISLAMIC SCHOOL & COLLEGE", "ইসলামিক স্কুল অ্যান্ড কলেজ")
                }}</span>
              </h2>
              <p>
                {{
                  text(
                    "Modern Education With Islamic Values",
                    "ইসলামিক মূল্যবোধের সাথে আধুনিক শিক্ষা",
                  )
                }}
              </p>
            </div>
          </header>
          <div class="poster-values">
            <div v-for="value in values" :key="value.en" class="poster-value">
              <span class="value-icon"
                ><component :is="value.icon" aria-hidden="true" /><Star
                  v-if="value.icon === BookOpen"
                  class="value-star"
                  aria-hidden="true"
              /></span>
              <h3>{{ text(value.en, value.bn) }}</h3>
              <p>{{ text(value.detail, value.detailBn) }}</p>
            </div>
          </div>
          <figure class="poster-students">
            <img
              :src="friendsPhoto"
              :alt="
                text(
                  'PIISC students together at school',
                  'স্কুলে PIISC শিক্ষার্থীরা',
                )
              "
            />
            <figcaption>
              {{
                text(
                  "A place to learn. A place to belong.",
                  "শেখার জায়গা। আপন হয়ে ওঠার জায়গা।",
                )
              }}
            </figcaption>
          </figure>
          <div class="poster-mission">
            <div>
              <h3>
                {{ text("SHAPING MINDS.", "মনন গড়ি।") }}
                <em>{{ text("BUILDING CHARACTER.", "চরিত্র গড়ি।") }}</em
                ><br />{{ text("INSPIRING FUTURES.", "ভবিষ্যৎ গড়ি।") }}
              </h3>
              <p>
                {{
                  text(
                    "Where knowledge meets faith, and every child can grow.",
                    "জ্ঞান ও বিশ্বাসের সমন্বয়ে প্রতিটি শিশুর বেড়ে ওঠা।",
                  )
                }}
              </p>
            </div>
            <div class="mission-icons">
              <ShieldCheck aria-hidden="true" /><Heart
                aria-hidden="true"
              /><GraduationCap aria-hidden="true" /><span>{{
                text(
                  "CARE • VALUES • CONFIDENCE",
                  "যত্ন • মূল্যবোধ • আত্মবিশ্বাস",
                )
              }}</span>
            </div>
          </div>
          <footer class="poster-contacts">
            <a :href="`tel:${headerContacts.phone.replace(/\s/g, '')}`"
              ><Phone aria-hidden="true" /><span>{{
                headerContacts.phone.trim()
              }}</span></a
            ><a :href="`mailto:${headerContacts.email}`"
              ><Mail aria-hidden="true" /><span>{{
                headerContacts.email
              }}</span></a
            ><span :title="address"
              ><MapPin aria-hidden="true" /><span>{{
                text("Ashulia, Savar, Dhaka-1349", "আশুলিয়া, সাভার, ঢাকা-১৩৪৯")
              }}</span></span
            ><span><Globe aria-hidden="true" /><span>PIISC.ORG</span></span>
          </footer>
        </div>
        <aside class="poster-sidebar">
          <div
            v-for="item in highlights"
            :key="item.en"
            class="poster-highlight"
          >
            <img :src="item.image" alt="" />
            <div>
              <h3>{{ text(item.en, item.bn) }}</h3>
              <p>{{ text(item.detail, item.detailBn) }}</p>
            </div>
          </div>
          <div class="admission-badge">
            <span>{{ text("ADMISSIONS", "ভর্তি") }}</span
            ><strong>{{ text("OPEN", "চলছে") }}</strong
            ><b>{{ text("2026–2027", "২০২৬–২০২৭") }}</b
            ><small>{{
              text(
                "Begin your journey with PIISC",
                "PIISC-এর সাথে পথচলা শুরু হোক",
              )
            }}</small>
          </div>
        </aside>
      </article>
      <div class="poster-actions">
        <RouterLink to="/admissions" @click="close">{{
          text("Learn More", "আরও জানুন")
        }}</RouterLink
        ><RouterLink to="/contact" @click="close">{{
          text("Contact Us", "যোগাযোগ করুন")
        }}</RouterLink>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.admission-popup {
  width: min(1080px, calc(100vw - 48px), calc((100dvh - 130px) * 1080 / 567));
  max-width: none;
  max-height: calc(100dvh - 24px);
  padding: 0;
  margin: auto;
  border: 0;
  background: transparent;
  color: #082e70;
  overflow: auto;
}
.admission-popup::backdrop {
  background: #151b26b5;
  backdrop-filter: blur(5px);
}
.admission-poster {
  container-type: inline-size;
  aspect-ratio: 1080/567;
  display: grid;
  grid-template-columns: 78% 22%;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border-radius: 14px;
  background: #fff;
  font-family: Arial, sans-serif;
  box-shadow: 0 18px 60px #0003;
}
.popup-close {
  position: absolute;
  right: 1.6%;
  top: 3%;
  z-index: 5;
  width: clamp(32px, 4.8vw, 54px);
  height: clamp(32px, 4.8vw, 54px);
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: #fff;
  color: #222;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.2s;
}
.popup-close:hover {
  background: #fff2ca;
  transform: rotate(8deg);
}
.poster-main {
  position: relative;
  display: grid;
  grid-template-rows: 36% 27% 24% 13%;
  padding: 2.2% 2.5% 1.4%;
  background:
    radial-gradient(ellipse at 75% 0, #afe1ff, transparent 60%),
    linear-gradient(#eaf7ff, #fff 60%);
  overflow: hidden;
}
.poster-brand {
  display: flex;
  align-items: center;
  gap: 2%;
  align-self: start;
  z-index: 2;
}
.poster-brand img {
  width: 17%;
  height: auto;
  object-fit: contain;
}
.poster-brand h2 {
  margin: 0;
  font:
    900 3.4cqw/1.05 Arial,
    sans-serif;
  letter-spacing: -0.06em;
  color: #062767;
}
.poster-brand h2 span {
  display: block;
  font-size: 2.35cqw;
  letter-spacing: -0.035em;
  margin-top: 0.5cqw;
}
.poster-brand p {
  font-size: 1.35cqw;
  font-weight: 700;
  color: #087ac7;
  margin: 0.8cqw 0 0;
  padding-left: 1cqw;
  border-left: 3px solid #ffc526;
}
.poster-values {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  align-self: start;
  width: 67%;
  z-index: 2;
  padding-top: 0.3cqw;
}
.poster-value {
  position: relative;
  display: grid;
  grid-template-rows: 3.8cqw 3.1cqw auto;
  justify-items: center;
  text-align: center;
  padding: 0 0.5cqw;
}
.poster-value:not(:last-child)::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0.2cqw;
  bottom: 0;
  width: 1px;
  background: #efb728;
}
.value-icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 3.8cqw;
  height: 3.8cqw;
}
.value-icon > svg {
  width: 3.6cqw;
  height: 3.6cqw;
  color: #0645b8;
  stroke-width: 1.65;
}
.value-icon > .value-star {
  position: absolute;
  top: -0.35cqw;
  left: 1.25cqw;
  width: 1.4cqw;
  height: 1.4cqw;
  fill: #ffc526;
  stroke: #ffc526;
}
.poster-value:nth-child(2) .value-icon :deep(path:last-child),
.poster-value:nth-child(3) .value-icon :deep(circle),
.poster-value:nth-child(4) .value-icon :deep(path:last-child) {
  stroke: #efad12;
}
.poster-value h3 {
  align-self: center;
  white-space: pre-line;
  font:
    800 1.05cqw/1.1 "Arial Narrow",
    Arial,
    sans-serif;
  letter-spacing: -0.025em;
  margin: 0.35cqw 0;
  color: #082e70;
}
.poster-value p {
  font-size: 0.88cqw;
  line-height: 1.25;
  margin: 0.2cqw 0 0;
  color: #1d3456;
}
@media (max-width: 600px) {
  .poster-value {
    grid-template-rows: 7cqw 7cqw auto;
    padding: 0 0.7cqw;
  }
  .value-icon {
    width: 7cqw;
    height: 7cqw;
  }
  .value-icon > svg {
    width: 6cqw;
    height: 6cqw;
  }
  .value-icon > .value-star {
    width: 2.7cqw;
    height: 2.7cqw;
    left: 2.2cqw;
    top: -0.5cqw;
  }
}
.poster-students {
  position: absolute;
  width: 32%;
  height: 53%;
  right: 1%;
  top: 24%;
  margin: 0;
  border: 4px solid #ffc526;
  border-radius: 48% 48% 12px 12px;
  overflow: hidden;
  z-index: 2;
  background: #d4e8f5;
}
.poster-students img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 40%;
}
.poster-students figcaption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1cqw;
  background: #062767dd;
  color: white;
  font-size: 1cqw;
  text-align: center;
}
.poster-mission {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 3%;
  color: #fff;
  padding: 1.3cqw 0.8cqw;
}
.poster-mission::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: -1.7cqw -4cqw -8cqw;
  background: linear-gradient(120deg, #05265c, #0754a2);
  border-top: 0.7cqw solid #ffc526;
  border-radius: 45% 65% 0 0 / 18% 20% 0 0;
  transform: rotate(3deg);
}
.poster-mission > div:first-child {
  width: 40%;
}
.poster-mission h3 {
  font:
    800 1.45cqw/1.3 Arial,
    sans-serif;
  margin: 0;
}
.poster-mission em {
  font-style: normal;
  color: #ffcd24;
}
.poster-mission p {
  font-size: 1.05cqw;
  line-height: 1.35;
  margin: 0.5cqw 0 0;
}
.mission-icons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5cqw;
  width: 23%;
}
.mission-icons svg {
  width: 2.7cqw;
  height: 2.7cqw;
  color: #ffcd24;
}
.mission-icons span {
  font-size: 0.75cqw;
  text-align: center;
  color: #fff;
}
.poster-contacts {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 0.5cqw;
  z-index: 3;
  background: #fff;
  border-radius: 1cqw;
  padding: 0.6cqw;
  color: #082e70;
}
.poster-contacts > a,
.poster-contacts > span {
  display: flex;
  align-items: center;
  gap: 0.4cqw;
  font-size: 0.92cqw;
  line-height: 1.25;
  min-width: 0;
  padding-right: 0.5cqw;
  border-right: 1px solid #edc865;
}
.poster-contacts > :last-child {
  border: 0;
}
.poster-contacts svg {
  width: 2.4cqw;
  height: 2.4cqw;
  flex-shrink: 0;
  fill: #082e70;
  stroke: white;
  background: #082e70;
  border-radius: 50%;
  padding: 0.45cqw;
}
.poster-contacts a:hover {
  text-decoration: underline;
}
.poster-sidebar {
  background: linear-gradient(120deg, #042966, #07529a);
  border-left: 0.7cqw solid #ffc526;
  border-radius: 24% 0 0 8% / 40% 0 0 15%;
  padding: 7cqw 1.2cqw 1.5cqw 1.4cqw;
  display: flex;
  flex-direction: column;
  gap: 1.15cqw;
  color: #fff;
}
.poster-highlight {
  display: flex;
  align-items: center;
  gap: 0.7cqw;
}
.poster-highlight img {
  width: 7.7cqw;
  height: 7.7cqw;
  border: 3px solid #ffca28;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.poster-highlight h3 {
  font:
    800 1.1cqw/1.2 Arial,
    sans-serif;
  color: #ffcf22;
  margin: 0 0 0.4cqw;
}
.poster-highlight p {
  font-size: 1cqw;
  line-height: 1.25;
  margin: 0;
}
.admission-badge {
  margin-top: auto;
  text-align: center;
  border-top: 0.35cqw solid #ffc526;
  border-bottom: 0.35cqw solid #ffc526;
  border-radius: 50%;
  padding: 1cqw 0.4cqw;
}
.admission-badge > span {
  display: block;
  font-size: 1.6cqw;
  font-weight: 800;
}
.admission-badge strong {
  display: block;
  font:
    900 3.3cqw/1 Arial,
    sans-serif;
}
.admission-badge b {
  display: block;
  background: #ffcb24;
  color: #082e70;
  font-size: 1.6cqw;
  transform: rotate(-4deg);
  margin: 0.6cqw 0;
  padding: 0.3cqw;
}
.admission-badge small {
  display: block;
  font-size: 0.9cqw;
  line-height: 1.2;
}
.poster-actions {
  display: flex;
  justify-content: center;
  gap: 18px;
  padding-top: 24px;
}
.poster-actions a {
  padding: 18px 36px;
  border-radius: 40px;
  background: #dcb432;
  color: #202020;
  font:
    700 18px/1.2 Arial,
    sans-serif;
  transition:
    background 0.2s,
    transform 0.2s;
}
.poster-actions a + a {
  background: white;
}
.poster-actions a:hover {
  background: #ffe084;
  transform: translateY(-2px);
}
a:focus-visible,
button:focus-visible {
  outline: 3px solid #ffc526;
  outline-offset: 3px;
}
@media (max-width: 600px) {
  .admission-popup {
    width: calc(100vw - 24px);
  }
  .admission-poster {
    aspect-ratio: auto;
    grid-template-columns: 1fr;
  }
  .poster-main {
    grid-template-rows: auto auto auto auto;
    padding: 20px 14px 12px;
    gap: 20px;
  }
  .poster-brand {
    padding-right: 25px;
  }
  .poster-brand img {
    width: 22%;
  }
  .poster-brand h2 {
    font-size: 5.4cqw;
  }
  .poster-brand h2 span {
    font-size: 3.7cqw;
  }
  .poster-brand p {
    font-size: 2.8cqw;
  }
  .poster-values {
    width: 100%;
  }
  .poster-value svg {
    margin-inline: auto;
    width: 6cqw;
    height: 6cqw;
  }
  .poster-value h3 {
    font-size: 2.3cqw;
  }
  .poster-value p {
    font-size: 2cqw;
  }
  .poster-students {
    position: relative;
    top: auto;
    right: auto;
    width: 100%;
    height: 42cqw;
    grid-row: 3;
    border-radius: 10px;
  }
  .poster-students figcaption {
    font-size: 3cqw;
    padding: 2cqw;
  }
  .poster-mission {
    padding: 10px;
    gap: 15px;
  }
  .poster-mission > div:first-child {
    width: 70%;
  }
  .poster-mission h3 {
    font-size: 3.8cqw;
  }
  .poster-mission p {
    font-size: 3cqw;
  }
  .mission-icons svg {
    width: 6cqw;
    height: 6cqw;
  }
  .mission-icons span {
    font-size: 2cqw;
  }
  .poster-contacts {
    flex-wrap: wrap;
    gap: 8px;
    padding: 10px;
    grid-row: 5;
  }
  .poster-contacts > a,
  .poster-contacts > span {
    font-size: 2.7cqw;
    border: 0;
  }
  .poster-contacts svg {
    width: 5cqw;
    height: 5cqw;
    padding: 1cqw;
  }
  .poster-sidebar {
    border: 0;
    border-top: 4px solid #ffc526;
    border-radius: 0;
    padding: 16px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .poster-highlight {
    flex-direction: column;
    text-align: center;
  }
  .poster-highlight img {
    width: 17cqw;
    height: 17cqw;
  }
  .poster-highlight h3 {
    font-size: 2.5cqw;
  }
  .poster-highlight p {
    font-size: 2.4cqw;
  }
  .admission-badge {
    grid-column: 1/-1;
    max-width: 230px;
    justify-self: center;
    padding: 10px 25px;
    margin-top: 8px;
  }
  .admission-badge > span {
    font-size: 4cqw;
  }
  .admission-badge strong {
    font-size: 7cqw;
  }
  .admission-badge b {
    font-size: 4cqw;
  }
  .admission-badge small {
    font-size: 2.8cqw;
  }
  .poster-actions {
    gap: 12px;
    padding: 16px 0 8px;
  }
  .poster-actions a {
    font-size: 14px;
    padding: 14px 24px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .popup-close,
  .poster-actions a {
    transition: none;
  }
  .popup-close:hover,
  .poster-actions a:hover {
    transform: none;
  }
}
</style>
