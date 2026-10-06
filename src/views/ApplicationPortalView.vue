<script setup>
import { computed, reactive, ref, watch } from "vue";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  Download,
  Eye,
  FileText,
  GraduationCap,
  Mail,
  Phone,
} from "lucide-vue-next";
import { headerContacts } from "../data/navigation.js";
import { useI18n } from "../composables/useI18n.js";

const props = defineProps({ kind: { type: String, required: true } });
const { language } = useI18n();
const isAdmission = computed(() => props.kind === "admission");
const form = reactive({
  name: "",
  contact: "",
  interest: "",
  email: "",
  phone: "",
  message: "",
});
const prepared = ref(false);
watch(
  () => props.kind,
  () => {
    Object.keys(form).forEach((key) => (form[key] = ""));
    prepared.value = false;
  },
);
const copy = computed(() => {
  const bn = language.value === "bn";
  return {
    home: bn ? "হোম" : "Home",
    title: isAdmission.value
      ? bn
        ? "অনলাইন ভর্তি"
        : "Online Admission"
      : bn
        ? "নিয়োগ"
        : "Recruitment",
    eyebrow: bn
      ? "পিস ইন্টারন্যাশনাল ইসলামিক স্কুল অ্যান্ড কলেজ"
      : "PEACE INTERNATIONAL ISLAMIC SCHOOL & COLLEGE",
    intro: isAdmission.value
      ? bn
        ? "আপনার সন্তানের শিক্ষাযাত্রা নিয়ে কথা বলুন। নিচের তথ্য দিয়ে ভর্তি বিষয়ে ইমেইল প্রস্তুত করুন।"
        : "Start a conversation about your child’s learning journey. Share a few details to prepare your admission enquiry."
      : bn
        ? "শিক্ষা, মূল্যবোধ ও নতুন প্রজন্মের বিকাশে ভূমিকা রাখতে চান? আপনার আগ্রহ ও অভিজ্ঞতা আমাদের জানান।"
        : "Interested in helping young people learn and grow? Tell us about your experience and the contribution you would like to make.",
    formTitle: isAdmission.value
      ? bn
        ? "ভর্তির আগ্রহ জানান"
        : "Register your interest"
      : bn
        ? "কাজের আগ্রহ জানান"
        : "Introduce yourself",
    note: bn
      ? "এই ফর্ম আপনার ইমেইল অ্যাপে একটি খসড়া খুলবে। তথ্য যাচাই করে সেখান থেকে পাঠান। এখানে কোনো আবেদন জমা হয় না।"
      : "This form opens a draft in your email app. Review and send it from there; completing this form does not submit an application.",
    name: isAdmission.value
      ? bn
        ? "শিক্ষার্থীর নাম"
        : "Student’s name"
      : bn
        ? "আপনার নাম"
        : "Your name",
    contact: isAdmission.value
      ? bn
        ? "অভিভাবকের নাম"
        : "Parent / guardian’s name"
      : bn
        ? "যোগ্যতা ও অভিজ্ঞতা"
        : "Qualifications & experience",
    interest: isAdmission.value
      ? bn
        ? "কাঙ্ক্ষিত শ্রেণি"
        : "Class of interest"
      : bn
        ? "কাঙ্ক্ষিত পদ বা কাজের ক্ষেত্র"
        : "Role or area of interest",
    email: bn ? "ইমেইল ঠিকানা" : "Email address",
    phone: bn ? "ফোন নম্বর" : "Phone number",
    message: bn
      ? "আরও তথ্য বা প্রশ্ন (ঐচ্ছিক)"
      : "Additional details or questions (optional)",
    action: bn ? "ইমেইল খসড়া তৈরি করুন" : "Prepare email enquiry",
    status: bn
      ? "ইমেইল খসড়া খোলার অনুরোধ করা হয়েছে। না খুললে নিচের ঠিকানায় সরাসরি ইমেইল করুন। আপনার আবেদন এখনো জমা হয়নি।"
      : "An email draft has been requested. If it did not open, email the address below directly. Your enquiry has not been submitted yet.",
    next: bn ? "পরবর্তী ধাপ" : "What happens next",
    steps: isAdmission.value
      ? bn
        ? [
            "শিক্ষার্থী ও অভিভাবকের তথ্য লিখুন।",
            "ইমেইল খসড়া যাচাই করে পাঠান।",
            "আসন, প্রয়োজনীয় নথি ও ভর্তি প্রক্রিয়া সম্পর্কে দলের সঙ্গে কথা বলুন।",
          ]
        : [
            "Tell us about the student and their parent or guardian.",
            "Review your email draft and send the enquiry.",
            "Speak with our team about availability, documents and the admission process.",
          ]
      : bn
        ? [
            "আপনার যোগ্যতা ও কাজের আগ্রহ লিখুন।",
            "ইমেইল অ্যাপে জীবনবৃত্তান্ত যুক্ত করে পাঠাতে পারেন।",
            "বর্তমান সুযোগ ও আনুষ্ঠানিক আবেদন প্রক্রিয়া সম্পর্কে দলের সঙ্গে কথা বলুন।",
          ]
        : [
            "Introduce your qualifications and the role you are interested in.",
            "Attach your CV in your email app before sending, if you wish.",
            "Ask our team about current opportunities and the formal application process.",
          ],
    help: bn ? "সহায়তা প্রয়োজন?" : "Need a hand?",
    details: isAdmission.value
      ? bn
        ? "ভর্তির বিস্তারিত দেখুন"
        : "View admission information"
      : bn
        ? "নোটিশ দেখুন"
        : "View school notices",
    recipient: bn ? "প্রাপকের ইমেইল" : "School contact email",
  };
});
function prepareEmail() {
  const c = copy.value;
  const body = [
    `${c.name}: ${form.name.trim()}`,
    `${c.contact}: ${form.contact.trim()}`,
    `${c.interest}: ${form.interest.trim()}`,
    `${c.email}: ${form.email.trim()}`,
    `${c.phone}: ${form.phone.trim()}`,
    "",
    form.message.trim(),
  ].join("\n");
  window.location.href = `mailto:${headerContacts.email}?subject=${encodeURIComponent(`${c.title} — ${form.name.trim()}`)}&body=${encodeURIComponent(body)}`;
  prepared.value = true;
}
</script>

<template>
  <section
    class="portal-banner [&&]:relative [&&]:overflow-x-hidden [&&]:overflow-y-hidden [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:initial] [&&]:[background-image:linear-gradient(110deg,_rgb(41,_78,_158),_rgb(23,_58,_128))] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[border-bottom-color:rgb(217,_179,_61)] [&&]:[border-bottom-style:solid] [&&]:[border-bottom-width:4px] [&&]:[color:rgb(255,_255,_255)] [&.portal-banner.recruitment]:[border-color:rgb(217,_179,_61)]"
    :class="{ recruitment: !isAdmission }"
  >
    <div
      class="container [&&&]:relative [&&&]:[padding-block-end:58px] [&&&]:[padding-block-start:30px]"
    >
      <nav
        class="[&&]:mb-[35px] [&&]:flex [&&]:items-center [&&]:gap-x-[8px] [&&]:gap-y-[8px] [&&]:[font-size:13px]"
        :aria-label="$tr('Breadcrumb')"
      >
        <RouterLink
          class="[a&:hover]:[text-decoration:underline] [a&:hover]:[text-decoration-color:initial] [a&:hover]:[text-decoration-line:underline] [a&:hover]:[text-decoration-style:initial] [a&:hover]:[text-decoration-thickness:initial] [a&:focus-visible]:[outline-color:rgb(217,_179,_61)] [a&:focus-visible]:[outline-style:solid] [a&:focus-visible]:[outline-width:2px] [a&:focus-visible]:[outline-offset:4px]"
          to="/"
          >{{ $tr(copy.home) }}</RouterLink
        ><ChevronRight :size="15" aria-hidden="true" /><span
          aria-current="page"
          >{{ $tr(copy.title) }}</span
        >
      </nav>
      <span
        class="portal-eyebrow [&&]:tracking-[0.13em] [&&]:[color:rgb(243,_204,_72)] [&&]:[font-size:11px]"
        >{{ $tr(copy.eyebrow) }}</span
      >
      <h1
        class="[&&]:[font-size:clamp(36px,_4.5vw,_62px)] [&&]:leading-[1.2] [&&]:m-[14px_0px_20px_0px]"
      >
        {{ $tr(copy.title) }}
      </h1>
      <p
        class="[&&]:max-w-[680px] [&&]:[color:rgb(237,_242,_250)] [&&]:[font-size:17px] [&&]:relative [&&]:z-[1] [&&]:leading-[1.8]"
      >
        {{ $tr(copy.intro) }}
      </p>
      <component
        :is="isAdmission ? GraduationCap : BriefcaseBusiness"
        class="portal-decoration [&&]:pointer-events-none [&&]:absolute [&&]:right-[15px] [&&]:bottom-[35px] [&&]:opacity-[0.1]"
        :size="210"
        :stroke-width="0.8"
        aria-hidden="true"
      />
    </div>
  </section>
  <section
    v-if="isAdmission"
    class="form-download-section [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(244,_247,_252)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:p-[48px_0px_0px_0px]"
    :aria-label="language === 'bn' ? 'ভর্তি ফরম' : 'Admission form PDF'"
  >
    <div class="container">
      <div
        class="pdf-card [&&]:flex [&&]:items-center [@media(max-width:600px)]:[&&]:gap-x-[15px] [@media(width>600px)]:[&&]:gap-x-[24px] [@media(max-width:600px)]:[&&]:gap-y-[15px] [@media(width>600px)]:[&&]:gap-y-[24px] [&&]:[border-bottom-color:rgb(220,_229,_243)] [&&]:[border-bottom-width:1px] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-left-color:rgb(217,_179,_61)] [&&]:[border-left-width:5px] [&&]:[border-right-color:rgb(220,_229,_243)] [&&]:[border-right-width:1px] [&&]:[border-top-color:rgb(220,_229,_243)] [&&]:[border-top-width:1px] [&&]:[border-bottom-left-radius:12px] [&&]:[border-bottom-right-radius:12px] [&&]:[border-top-left-radius:12px] [&&]:[border-top-right-radius:12px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[box-shadow:rgba(23,_58,_106,_0.05)_0px_16px_36px] [@media(max-width:1100px)]:[&&]:flex-wrap [&&]:p-[clamp(24px,_3vw,_38px)] [&&]:[border-style:solid]"
      >
        <div
          class="pdf-card-icon [&&]:grid [@media(max-width:600px)]:[&&]:h-[52px] [@media(width>600px)]:[&&]:h-[68px] [@media(max-width:600px)]:[&&]:w-[52px] [@media(width>600px)]:[&&]:w-[68px] [&&]:items-center [&&]:[justify-items:center] [&&]:[border-bottom-left-radius:14px] [&&]:[border-bottom-right-radius:14px] [&&]:[border-top-left-radius:14px] [&&]:[border-top-right-radius:14px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_247,_215)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(41,_78,_158)] [&&]:[flex-basis:auto] [&&]:[flex-grow:0] [&&]:[flex-shrink:0]"
        >
          <FileText
            class="[@media(max-width:600px)]:[&&]:h-[26px] [@media(max-width:600px)]:[&&]:w-[26px]"
            :size="34"
            :stroke-width="1.7"
            aria-hidden="true"
          />
        </div>
        <div
          class="pdf-card-copy [&&]:min-w-[0px] [&&]:[flex-basis:0%] [&&]:[flex-grow:1] [&&]:[flex-shrink:1]"
        >
          <span
            class="pdf-eyebrow [&&]:block [&&]:[color:rgb(167,_125,_49)] [&&]:[font-size:11px] [&&]:mb-[8px] [&&]:font-[800] [&&]:tracking-[0.16em]"
            >{{
              language === "bn" ? "ডাউনলোডযোগ্য পিডিএফ" : "PRINTABLE PDF"
            }}</span
          >
          <h2
            class="[&&]:[font-size:clamp(24px,_2.1vw,_32px)] [&&]:leading-[1.3] [&&]:[color:rgb(41,_78,_158)] [&&]:m-[0px_0px_7px_0px]"
          >
            {{
              language === "bn"
                ? "ভর্তি আবেদন ফরম"
                : "Admission application form"
            }}
          </h2>
          <p
            class="[&&]:max-w-[650px] [&&]:[color:rgb(93,_110,_134)] [&&]:[font-size:14px] [&&]:leading-[1.65]"
          >
            {{
              language === "bn"
                ? "ফরমটি দেখুন বা ডাউনলোড করে পূরণ করুন। জমা দেওয়ার নিয়ম জানতে ভর্তি অফিসে যোগাযোগ করুন।"
                : "Preview the form or download a copy to complete. Contact the admission office to confirm how to submit it."
            }}
          </p>
        </div>
        <div
          class="pdf-card-actions [&&]:flex [&&]:items-center [&&]:gap-x-[10px] [&&]:gap-y-[10px] [&&]:[flex-basis:auto] [&&]:[flex-grow:0] [&&]:[flex-shrink:0] [@media(max-width:1100px)]:[&&]:w-[100%] [@media(max-width:1100px)]:[&&]:flex-wrap [@media(max-width:600px)]:[&&]:m-[5px_0px_0px_0px] [@media(width>600px)_and_(max-width:1100px)]:[&&]:ml-[0px]"
        >
          <a
            href="/forms/admission-form.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="pdf-preview [&&]:inline-flex [&&]:min-h-[47px] [&&]:items-center [&&]:justify-center [&&]:gap-x-[9px] [&&]:gap-y-[9px] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:7px] [&&]:[border-bottom-right-radius:7px] [&&]:[border-top-left-radius:7px] [&&]:[border-top-right-radius:7px] [&&]:[color:rgb(41,_78,_158)] [&&]:[font-size:13px] [&&]:[text-wrap-mode:nowrap] [&&]:[white-space-collapse:collapse] [&&]:font-[700] [&&]:[text-decoration:none] [&&]:[text-decoration-color:initial] [&&]:[text-decoration-line:none] [&&]:[text-decoration-style:initial] [&&]:[text-decoration-thickness:initial] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-behavior:normal,_normal,_normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-delay:0s,_0s,_0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.25s,_0.25s,_0.25s,_0.25s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:background,_color,_transform,_box-shadow] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-timing-function:ease,_ease,_ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-timing-function:ease] [@media(max-width:600px)]:[&&]:[flex-basis:180px] [@media(max-width:600px)]:[&&]:[flex-grow:1] [@media(max-width:600px)]:[&&]:[flex-shrink:1] [&&]:p-[11px_15px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(41,_78,_158)] [a&:focus-visible]:[outline-color:rgb(217,_179,_61)] [a&:focus-visible]:[outline-style:solid] [a&:focus-visible]:[outline-width:2px] [a&:focus-visible]:[outline-offset:4px] [.pdf-card-actions_a&:hover]:[color:rgb(255,_255,_255)] [.pdf-card-actions_a&:hover]:[background-attachment:initial] [.pdf-card-actions_a&:hover]:[background-clip:initial] [.pdf-card-actions_a&:hover]:[background-color:rgb(23,_58,_128)] [.pdf-card-actions_a&:hover]:[background-image:initial] [.pdf-card-actions_a&:hover]:[background-origin:initial] [.pdf-card-actions_a&:hover]:[background-position:initial] [.pdf-card-actions_a&:hover]:[background-repeat:initial] [.pdf-card-actions_a&:hover]:[background-size:initial] [.pdf-card-actions_a&:hover]:[box-shadow:rgba(23,_58,_106,_0.12)_0px_9px_20px] [@media(prefers-reduced-motion:no-preference)]:[.pdf-card-actions_a&:hover]:[transform:translateY(-2px)] [@media(prefers-reduced-motion:reduce)]:[.pdf-card-actions_a&:hover]:[transform:none]"
            ><Eye :size="18" aria-hidden="true" />{{
              language === "bn" ? "ফরম দেখুন" : "Preview form"
            }}</a
          >
          <a
            href="/forms/admission-form.pdf"
            download="PIISC-Admission-Form.pdf"
            class="pdf-download [&&&]:inline-flex [&&&]:min-h-[47px] [&&&]:items-center [&&&]:justify-center [&&&]:gap-x-[9px] [&&&]:gap-y-[9px] [&&&]:[border-image-outset:0] [&&&]:[border-image-repeat:stretch] [&&&]:[border-image-slice:100%] [&&&]:[border-image-source:none] [&&&]:[border-image-width:1] [&&&]:[border-bottom-left-radius:7px] [&&&]:[border-bottom-right-radius:7px] [&&&]:[border-top-left-radius:7px] [&&&]:[border-top-right-radius:7px] [&&&]:[color:rgb(255,_255,_255)] [&&&]:[font-size:13px] [&&&]:[text-wrap-mode:nowrap] [&&&]:[white-space-collapse:collapse] [&&&]:font-[700] [&&&]:[text-decoration:none] [&&&]:[text-decoration-color:initial] [&&&]:[text-decoration-line:none] [&&&]:[text-decoration-style:initial] [&&&]:[text-decoration-thickness:initial] [@media(prefers-reduced-motion:no-preference)]:[&&&]:[transition-behavior:normal,_normal,_normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&&]:[transition-delay:0s,_0s,_0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&&]:[transition-duration:0.25s,_0.25s,_0.25s,_0.25s] [@media(prefers-reduced-motion:reduce)]:[&&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&&]:[transition-property:background,_color,_transform,_box-shadow] [@media(prefers-reduced-motion:reduce)]:[&&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&&]:[transition-timing-function:ease,_ease,_ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&&]:[transition-timing-function:ease] [@media(max-width:600px)]:[&&&]:[flex-basis:180px] [@media(max-width:600px)]:[&&&]:[flex-grow:1] [@media(max-width:600px)]:[&&&]:[flex-shrink:1] [&&&]:[background-attachment:initial] [&&&]:[background-clip:initial] [&&&]:[background-color:rgb(41,_78,_158)] [&&&]:[background-image:initial] [&&&]:[background-origin:initial] [&&&]:[background-position:initial] [&&&]:[background-repeat:initial] [&&&]:[background-size:initial] [&&&]:p-[11px_15px] [&&&]:[border-width:1px] [&&&]:[border-style:solid] [&&&]:[border-color:rgb(41,_78,_158)] [a&:focus-visible]:[outline-color:rgb(217,_179,_61)] [a&:focus-visible]:[outline-style:solid] [a&:focus-visible]:[outline-width:2px] [a&:focus-visible]:[outline-offset:4px] [.pdf-card-actions_a&:hover]:[background-color:rgb(23,_58,_128)] [.pdf-card-actions_a&:hover]:[box-shadow:rgba(23,_58,_106,_0.12)_0px_9px_20px] [@media(prefers-reduced-motion:no-preference)]:[.pdf-card-actions_a&:hover]:[transform:translateY(-2px)] [@media(prefers-reduced-motion:reduce)]:[.pdf-card-actions_a&:hover]:[transform:none]"
            ><Download :size="18" aria-hidden="true" />{{
              language === "bn" ? "পিডিএফ ডাউনলোড" : "Download PDF"
            }}</a
          >
        </div>
      </div>
    </div>
  </section>
  <section
    class="section portal-section [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(244,_247,_252)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial]"
  >
    <div
      class="container portal-layout [&&]:grid [@media(max-width:850px)]:[&&]:grid-cols-[1fr] [@media(width>850px)]:[&&]:grid-cols-[minmax(0px,_1.5fr)_minmax(0px,_1fr)] [@media(max-width:850px)]:[&&]:gap-x-[35px] [@media(width>850px)]:[&&]:gap-x-[50px] [@media(max-width:850px)]:[&&]:gap-y-[35px] [@media(width>850px)]:[&&]:gap-y-[50px] [&&]:[align-items:start]"
    >
      <form
        class="portal-form [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:10px] [&&]:[border-bottom-right-radius:10px] [&&]:[border-top-left-radius:10px] [&&]:[border-top-right-radius:10px] [&&]:[box-shadow:rgba(23,_58,_106,_0.05)_0px_14px_35px] [@media(max-width:540px)]:[&&]:p-[25px_20px] [@media(width>540px)]:[&&]:p-[36px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(220,_229,_243)]"
        @submit.prevent="prepareEmail"
      >
        <h2
          class="[&&]:[font-size:29px] [&&]:mb-[15px] [&&]:leading-[1.3] [&&]:[color:rgb(41,_78,_158)]"
        >
          {{ $tr(copy.formTitle) }}
        </h2>
        <p
          class="portal-form-note [&&]:[font-size:14px] [&&]:mb-[25px] [&&]:leading-[1.8] [&&]:[color:rgb(97,_112,_132)]"
        >
          {{ $tr(copy.note) }}
        </p>
        <div
          class="portal-fields [&&]:grid [@media(max-width:540px)]:[&&]:grid-cols-[1fr] [@media(width>540px)]:[&&]:grid-cols-[repeat(2,_minmax(0px,_1fr))] [&&]:gap-x-[20px] [&&]:gap-y-[20px]"
        >
          <label
            class="[&&]:[font-size:13px] [&&]:font-[700] [&&]:[color:rgb(23,_58,_106)]"
            for="application-name"
            >{{ $tr(copy.name)
            }}<input
              class="[&&]:mt-[8px] [&&]:block [&&]:w-[100%] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(23,_58,_106)] [&&]:[font-family:inherit] [&&]:[font-feature-settings:inherit] [&&]:[font-kerning:inherit] [&&]:[font-language-override:inherit] [&&]:[font-optical-sizing:inherit] [&&]:[font-size:inherit] [&&]:[font-size-adjust:inherit] [&&]:[font-stretch:inherit] [&&]:[font-style:inherit] [&&]:[font-variant:inherit] [&&]:[font-variant-alternates:inherit] [&&]:[font-variant-caps:inherit] [&&]:[font-variant-east-asian:inherit] [&&]:[font-variant-emoji:inherit] [&&]:[font-variant-ligatures:inherit] [&&]:[font-variant-numeric:inherit] [&&]:[font-variant-position:inherit] [&&]:[font-variation-settings:inherit] [&&]:font-[400] [&&]:leading-[inherit] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-behavior:normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-delay:0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.2s,_0.2s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:border-color,_box-shadow] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-timing-function:ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-timing-function:ease] [&&]:p-[12px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(220,_229,_243)] [input&:focus]:[outline-color:rgb(217,_179,_61)] [input&:focus]:[outline-style:solid] [input&:focus]:[outline-width:2px] [input&:focus]:[outline-offset:2px] [input&:focus]:[border-color:rgb(217,_179,_61)]"
              id="application-name"
              v-model="form.name"
              required
              maxlength="100"
              autocomplete="name"
          /></label>
          <label
            class="[&&]:[font-size:13px] [&&]:font-[700] [&&]:[color:rgb(23,_58,_106)]"
            for="application-contact"
            >{{ $tr(copy.contact)
            }}<input
              class="[&&]:mt-[8px] [&&]:block [&&]:w-[100%] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(23,_58,_106)] [&&]:[font-family:inherit] [&&]:[font-feature-settings:inherit] [&&]:[font-kerning:inherit] [&&]:[font-language-override:inherit] [&&]:[font-optical-sizing:inherit] [&&]:[font-size:inherit] [&&]:[font-size-adjust:inherit] [&&]:[font-stretch:inherit] [&&]:[font-style:inherit] [&&]:[font-variant:inherit] [&&]:[font-variant-alternates:inherit] [&&]:[font-variant-caps:inherit] [&&]:[font-variant-east-asian:inherit] [&&]:[font-variant-emoji:inherit] [&&]:[font-variant-ligatures:inherit] [&&]:[font-variant-numeric:inherit] [&&]:[font-variant-position:inherit] [&&]:[font-variation-settings:inherit] [&&]:font-[400] [&&]:leading-[inherit] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-behavior:normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-delay:0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.2s,_0.2s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:border-color,_box-shadow] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-timing-function:ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-timing-function:ease] [&&]:p-[12px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(220,_229,_243)] [input&:focus]:[outline-color:rgb(217,_179,_61)] [input&:focus]:[outline-style:solid] [input&:focus]:[outline-width:2px] [input&:focus]:[outline-offset:2px] [input&:focus]:[border-color:rgb(217,_179,_61)]"
              id="application-contact"
              v-model="form.contact"
              required
              maxlength="160"
          /></label>
          <label
            class="[&&]:[font-size:13px] [&&]:font-[700] [&&]:[color:rgb(23,_58,_106)]"
            for="application-email"
            >{{ $tr(copy.email)
            }}<input
              class="[&&]:mt-[8px] [&&]:block [&&]:w-[100%] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(23,_58,_106)] [&&]:[font-family:inherit] [&&]:[font-feature-settings:inherit] [&&]:[font-kerning:inherit] [&&]:[font-language-override:inherit] [&&]:[font-optical-sizing:inherit] [&&]:[font-size:inherit] [&&]:[font-size-adjust:inherit] [&&]:[font-stretch:inherit] [&&]:[font-style:inherit] [&&]:[font-variant:inherit] [&&]:[font-variant-alternates:inherit] [&&]:[font-variant-caps:inherit] [&&]:[font-variant-east-asian:inherit] [&&]:[font-variant-emoji:inherit] [&&]:[font-variant-ligatures:inherit] [&&]:[font-variant-numeric:inherit] [&&]:[font-variant-position:inherit] [&&]:[font-variation-settings:inherit] [&&]:font-[400] [&&]:leading-[inherit] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-behavior:normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-delay:0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.2s,_0.2s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:border-color,_box-shadow] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-timing-function:ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-timing-function:ease] [&&]:p-[12px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(220,_229,_243)] [input&:focus]:[outline-color:rgb(217,_179,_61)] [input&:focus]:[outline-style:solid] [input&:focus]:[outline-width:2px] [input&:focus]:[outline-offset:2px] [input&:focus]:[border-color:rgb(217,_179,_61)]"
              id="application-email"
              v-model="form.email"
              type="email"
              required
              maxlength="150"
              autocomplete="email"
          /></label>
          <label
            class="[&&]:[font-size:13px] [&&]:font-[700] [&&]:[color:rgb(23,_58,_106)]"
            for="application-phone"
            >{{ $tr(copy.phone)
            }}<input
              class="[&&]:mt-[8px] [&&]:block [&&]:w-[100%] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(23,_58,_106)] [&&]:[font-family:inherit] [&&]:[font-feature-settings:inherit] [&&]:[font-kerning:inherit] [&&]:[font-language-override:inherit] [&&]:[font-optical-sizing:inherit] [&&]:[font-size:inherit] [&&]:[font-size-adjust:inherit] [&&]:[font-stretch:inherit] [&&]:[font-style:inherit] [&&]:[font-variant:inherit] [&&]:[font-variant-alternates:inherit] [&&]:[font-variant-caps:inherit] [&&]:[font-variant-east-asian:inherit] [&&]:[font-variant-emoji:inherit] [&&]:[font-variant-ligatures:inherit] [&&]:[font-variant-numeric:inherit] [&&]:[font-variant-position:inherit] [&&]:[font-variation-settings:inherit] [&&]:font-[400] [&&]:leading-[inherit] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-behavior:normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-delay:0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.2s,_0.2s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:border-color,_box-shadow] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-timing-function:ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-timing-function:ease] [&&]:p-[12px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(220,_229,_243)] [input&:focus]:[outline-color:rgb(217,_179,_61)] [input&:focus]:[outline-style:solid] [input&:focus]:[outline-width:2px] [input&:focus]:[outline-offset:2px] [input&:focus]:[border-color:rgb(217,_179,_61)]"
              id="application-phone"
              v-model="form.phone"
              type="tel"
              required
              maxlength="30"
              autocomplete="tel"
          /></label>
          <label
            for="application-interest"
            class="full-field [&&]:[font-size:13px] [&&]:font-[700] [&&]:[color:rgb(23,_58,_106)] [&&]:[grid-column-end:-1] [&&]:[grid-column-start:1]"
            >{{ $tr(copy.interest)
            }}<input
              class="[&&]:mt-[8px] [&&]:block [&&]:w-[100%] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(23,_58,_106)] [&&]:[font-family:inherit] [&&]:[font-feature-settings:inherit] [&&]:[font-kerning:inherit] [&&]:[font-language-override:inherit] [&&]:[font-optical-sizing:inherit] [&&]:[font-size:inherit] [&&]:[font-size-adjust:inherit] [&&]:[font-stretch:inherit] [&&]:[font-style:inherit] [&&]:[font-variant:inherit] [&&]:[font-variant-alternates:inherit] [&&]:[font-variant-caps:inherit] [&&]:[font-variant-east-asian:inherit] [&&]:[font-variant-emoji:inherit] [&&]:[font-variant-ligatures:inherit] [&&]:[font-variant-numeric:inherit] [&&]:[font-variant-position:inherit] [&&]:[font-variation-settings:inherit] [&&]:font-[400] [&&]:leading-[inherit] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-behavior:normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-delay:0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.2s,_0.2s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:border-color,_box-shadow] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-timing-function:ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-timing-function:ease] [&&]:p-[12px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(220,_229,_243)] [input&:focus]:[outline-color:rgb(217,_179,_61)] [input&:focus]:[outline-style:solid] [input&:focus]:[outline-width:2px] [input&:focus]:[outline-offset:2px] [input&:focus]:[border-color:rgb(217,_179,_61)]"
              id="application-interest"
              v-model="form.interest"
              required
              maxlength="100"
          /></label>
          <label
            for="application-message"
            class="full-field [&&]:[font-size:13px] [&&]:font-[700] [&&]:[color:rgb(23,_58,_106)] [&&]:[grid-column-end:-1] [&&]:[grid-column-start:1]"
            >{{ $tr(copy.message)
            }}<textarea
              class="[&&]:mt-[8px] [&&]:block [&&]:w-[100%] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:6px] [&&]:[border-bottom-right-radius:6px] [&&]:[border-top-left-radius:6px] [&&]:[border-top-right-radius:6px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(23,_58,_106)] [&&]:[font-family:inherit] [&&]:[font-feature-settings:inherit] [&&]:[font-kerning:inherit] [&&]:[font-language-override:inherit] [&&]:[font-optical-sizing:inherit] [&&]:[font-size:inherit] [&&]:[font-size-adjust:inherit] [&&]:[font-stretch:inherit] [&&]:[font-style:inherit] [&&]:[font-variant:inherit] [&&]:[font-variant-alternates:inherit] [&&]:[font-variant-caps:inherit] [&&]:[font-variant-east-asian:inherit] [&&]:[font-variant-emoji:inherit] [&&]:[font-variant-ligatures:inherit] [&&]:[font-variant-numeric:inherit] [&&]:[font-variant-position:inherit] [&&]:[font-variation-settings:inherit] [&&]:font-[400] [&&]:leading-[inherit] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-behavior:normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-delay:0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.2s,_0.2s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:border-color,_box-shadow] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-timing-function:ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-timing-function:ease] [&&]:[resize:vertical] [&&]:p-[12px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(220,_229,_243)] [textarea&:focus]:[outline-color:rgb(217,_179,_61)] [textarea&:focus]:[outline-style:solid] [textarea&:focus]:[outline-width:2px] [textarea&:focus]:[outline-offset:2px] [textarea&:focus]:[border-color:rgb(217,_179,_61)]"
              id="application-message"
              v-model="form.message"
              rows="4"
              maxlength="1200"
            ></textarea>
          </label>
        </div>
        <button
          class="portal-submit [&&]:mt-[25px] [&&]:inline-flex [&&]:items-center [&&]:justify-center [&&]:gap-x-[14px] [&&]:gap-y-[14px] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:7px] [&&]:[border-bottom-right-radius:7px] [&&]:[border-top-left-radius:7px] [&&]:[border-top-right-radius:7px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(41,_78,_158)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:white] [&&]:[font-size:13px] [&&]:cursor-pointer [&&]:font-[700] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-behavior:normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-delay:0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.25s,_0.25s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:background,_transform] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-timing-function:ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-timing-function:ease] [@media(max-width:540px)]:[&&]:w-[100%] [&&]:p-[13px_23px] [&&]:[border-width:0px] [&&]:[border-style:none] [&&]:[border-color:currentcolor] [&.portal-submit:hover]:[background-color:rgb(23,_58,_128)] [@media(prefers-reduced-motion:no-preference)]:[&.portal-submit:hover]:[transform:translateY(-2px)] [@media(prefers-reduced-motion:reduce)]:[&.portal-submit:hover]:[transform:none] [button&:focus-visible]:[outline-color:rgb(217,_179,_61)] [button&:focus-visible]:[outline-style:solid] [button&:focus-visible]:[outline-width:2px] [button&:focus-visible]:[outline-offset:4px]"
          type="submit"
        >
          {{ $tr(copy.action) }}<ArrowUpRight :size="19" aria-hidden="true" />
        </button>
        <p
          v-if="prepared"
          class="portal-status [&&]:mt-[20px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_248,_227)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(113,_87,_33)] [&&]:[font-size:13px] [&&]:p-[15px]"
          role="status"
        >
          {{ $tr(copy.status) }}
        </p>
        <p
          class="portal-recipient [&&]:mt-[20px] [&&]:[color:rgb(97,_112,_132)] [&&]:[font-size:12px] [&&]:[overflow-wrap:anywhere]"
        >
          {{ $tr(copy.recipient) }}:
          <a
            class="[&&]:[text-decoration:underline] [&&]:[text-decoration-color:initial] [&&]:[text-decoration-line:underline] [&&]:[text-decoration-style:initial] [&&]:[text-decoration-thickness:initial] [a&:focus-visible]:[outline-color:rgb(217,_179,_61)] [a&:focus-visible]:[outline-style:solid] [a&:focus-visible]:[outline-width:2px] [a&:focus-visible]:[outline-offset:4px]"
            :href="`mailto:${headerContacts.email}`"
            >{{ $tr(headerContacts.email) }}</a
          >
        </p>
      </form>
      <aside class="portal-aside [&&]:pt-[10px]">
        <h2
          class="[&&]:[font-size:29px] [&&]:mb-[15px] [&&]:leading-[1.3] [&&]:[color:rgb(41,_78,_158)]"
        >
          {{ $tr(copy.next) }}
        </h2>
        <ol
          class="[&&]:[list-style-image:initial] [&&]:[list-style-position:initial] [&&]:[list-style-type:none] [&&]:m-[25px_0px] [&&]:p-[0px]"
        >
          <li
            class="[&&]:flex [&&]:gap-x-[17px] [&&]:gap-y-[17px] [&&]:[border-bottom-color:rgb(220,_229,_243)] [&&]:[border-bottom-style:solid] [&&]:[border-bottom-width:1px] [&&]:p-[19px_0px]"
            v-for="(step, index) in copy.steps"
            :key="step"
          >
            <span
              class="[&&]:[color:rgb(152,_114,_52)] [&&]:[font-family:Georgia,_serif] [&&]:[font-feature-settings:normal] [&&]:[font-kerning:auto] [&&]:[font-language-override:normal] [&&]:[font-optical-sizing:auto] [&&]:[font-size:25px] [&&]:[font-size-adjust:none] [&&]:[font-stretch:normal] [&&]:[font-style:normal] [&&]:[font-variant:normal] [&&]:[font-variant-alternates:normal] [&&]:[font-variant-caps:normal] [&&]:[font-variant-east-asian:normal] [&&]:[font-variant-emoji:normal] [&&]:[font-variant-ligatures:normal] [&&]:[font-variant-numeric:normal] [&&]:[font-variant-position:normal] [&&]:[font-variation-settings:normal] [&&]:font-[normal] [&&]:leading-[normal]"
              >0{{ $tr(index + 1) }}</span
            >
            <p
              class="[&&]:[color:rgb(86,_102,_122)] [&&]:[font-size:15px] [&&]:leading-[1.8]"
            >
              {{ $tr(step) }}
            </p>
          </li>
        </ol>
        <RouterLink
          :to="isAdmission ? '/admissions' : '/notices'"
          class="portal-details [&&]:inline-flex [&&]:items-center [&&]:gap-x-[12px] [&&]:gap-y-[12px] [&&]:[color:rgb(41,_78,_158)] [&&]:[font-size:14px] [&&]:pb-[9px] [&&]:font-[700] [&&]:[border-bottom-color:rgb(217,_179,_61)] [&&]:[border-bottom-style:solid] [&&]:[border-bottom-width:1px] [a&:hover]:[text-decoration:underline] [a&:hover]:[text-decoration-color:initial] [a&:hover]:[text-decoration-line:underline] [a&:hover]:[text-decoration-style:initial] [a&:hover]:[text-decoration-thickness:initial] [a&:focus-visible]:[outline-color:rgb(217,_179,_61)] [a&:focus-visible]:[outline-style:solid] [a&:focus-visible]:[outline-width:2px] [a&:focus-visible]:[outline-offset:4px]"
          >{{ $tr(copy.details) }}<ArrowUpRight :size="17" aria-hidden="true"
        /></RouterLink>
        <div
          class="portal-help [&&]:mt-[32px] [&&]:[border-bottom-left-radius:7px] [&&]:[border-bottom-right-radius:7px] [&&]:[border-top-left-radius:7px] [&&]:[border-top-right-radius:7px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(233,_240,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:p-[25px]"
        >
          <h3
            class="[&&]:mb-[18px] [&&]:[color:rgb(41,_78,_158)] [&&]:[font-size:23px]"
          >
            {{ $tr(copy.help) }}
          </h3>
          <a
            class="[&&]:mt-[12px] [&&]:flex [&&]:items-center [&&]:gap-x-[12px] [&&]:gap-y-[12px] [&&]:[color:rgb(38,_61,_85)] [&&]:[font-size:14px] [&&]:[overflow-wrap:anywhere] [a&:hover]:[text-decoration:underline] [a&:hover]:[text-decoration-color:initial] [a&:hover]:[text-decoration-line:underline] [a&:hover]:[text-decoration-style:initial] [a&:hover]:[text-decoration-thickness:initial] [a&:focus-visible]:[outline-color:rgb(217,_179,_61)] [a&:focus-visible]:[outline-style:solid] [a&:focus-visible]:[outline-width:2px] [a&:focus-visible]:[outline-offset:4px]"
            :href="`tel:${headerContacts.phone.replace(/\s/g, '')}`"
            ><Phone
              class="[&&]:[flex-shrink:0]"
              :size="18"
              aria-hidden="true"
            />{{ $tr(headerContacts.phone) }}</a
          ><a
            class="[&&]:mt-[12px] [&&]:flex [&&]:items-center [&&]:gap-x-[12px] [&&]:gap-y-[12px] [&&]:[color:rgb(38,_61,_85)] [&&]:[font-size:14px] [&&]:[overflow-wrap:anywhere] [a&:hover]:[text-decoration:underline] [a&:hover]:[text-decoration-color:initial] [a&:hover]:[text-decoration-line:underline] [a&:hover]:[text-decoration-style:initial] [a&:hover]:[text-decoration-thickness:initial] [a&:focus-visible]:[outline-color:rgb(217,_179,_61)] [a&:focus-visible]:[outline-style:solid] [a&:focus-visible]:[outline-width:2px] [a&:focus-visible]:[outline-offset:4px]"
            :href="`mailto:${headerContacts.email}`"
            ><Mail
              class="[&&]:[flex-shrink:0]"
              :size="18"
              aria-hidden="true"
            />{{ $tr(headerContacts.email) }}</a
          >
        </div>
      </aside>
    </div>
  </section>
</template>
