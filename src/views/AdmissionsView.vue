<script setup>
import { computed, ref } from "vue";
import {
  Archive,
  ArrowRight,
  BellRing,
  BookOpenCheck,
  CalendarDays,
  FileText,
  FolderOpen,
  GraduationCap,
  Hourglass,
} from "lucide-vue-next";
import { useI18n } from "../composables/useI18n.js";
import AdmissionSessionModal from "../components/admission/AdmissionSessionModal.vue";

const { language } = useI18n();
const showArchived = ref(false);
const showApply = ref(false);
const isBangla = computed(() => language.value === "bn");
const tr = (en, bn) => isBangla.value ? bn : en;

const session = computed(() => ({
  title: tr("Online Admission — Session details to be announced", "অনলাইন ভর্তি — সেশনের তথ্য শিগগিরই জানানো হবে"),
  name: tr("Admission information", "ভর্তির তথ্য"),
  slug: "admission-information",
}));
</script>

<template>
  <main class="min-h-[70vh] bg-[#f6f8fb] px-4 py-8 text-[#18283f] sm:px-6 sm:py-12">
    <div class="mx-auto max-w-[1128px]">
      <div class="mb-10 flex flex-col gap-4 rounded-[18px] border border-[#dce5ef] bg-white px-5 py-4 shadow-[0_4px_18px_rgba(24,40,63,.035)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div class="flex flex-wrap items-center gap-3">
          <span class="mr-1 text-sm font-extrabold">{{ tr("Notice Status:", "বিজ্ঞপ্তির অবস্থা:") }}</span>
          <button
            type="button"
            class="inline-flex min-h-10 items-center gap-2 rounded-xl px-4 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087cae]"
            :class="!showArchived ? 'bg-[#edf7fb] text-[#17627e]' : 'text-[#718096] hover:bg-slate-50'"
            :aria-pressed="!showArchived"
            @click="showArchived = false"
          >
            <span class="h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
            {{ tr("Active & Ongoing (0)", "চলমান (০)") }}
          </button>
          <button
            type="button"
            class="inline-flex min-h-10 items-center gap-2 rounded-xl px-4 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087cae]"
            :class="showArchived ? 'bg-white text-[#18314a] shadow-[0_2px_9px_rgba(24,40,63,.12)] ring-1 ring-[#e2e8f0]' : 'text-[#718096] hover:bg-slate-50'"
            :aria-pressed="showArchived"
            @click="showArchived = true"
          >
            <Archive :size="17" class="text-[#087cae]" aria-hidden="true" />
            {{ tr("Archived & Past (0)", "সংরক্ষিত ও পূর্ববর্তী (০)") }}
          </button>
        </div>
        <p class="flex items-center gap-2 text-sm text-[#63758b]">
          <FolderOpen :size="17" class="text-amber-600" aria-hidden="true" />
          {{ showArchived ? tr("Showing archived and past notices", "সংরক্ষিত ও পূর্ববর্তী বিজ্ঞপ্তি দেখানো হচ্ছে") : tr("Showing current admission information", "বর্তমান ভর্তির তথ্য দেখানো হচ্ছে") }}
        </p>
      </div>

      <section aria-labelledby="admissions-sessions-title">
        <div class="mb-6 flex items-end justify-between gap-4">
          <div>
            <p class="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.16em] text-[#1479a3]">
              <BookOpenCheck :size="16" aria-hidden="true" />
              {{ tr("PEACE INTERNATIONAL ISLAMIC SCHOOL & COLLEGE", "পিস ইন্টারন্যাশনাল ইসলামিক স্কুল অ্যান্ড কলেজ") }}
            </p>
            <h1 id="admissions-sessions-title" class="text-[28px] font-extrabold tracking-[-.025em] text-[#13263d] sm:text-[34px]">
              {{ tr("Online Admission & Sessions", "অনলাইন ভর্তি ও সেশন") }}
            </h1>
          </div>
        </div>

        <article v-if="!showArchived" class="rounded-[22px] border border-[#dce5ef] bg-white p-5 shadow-[0_9px_30px_rgba(20,40,60,.045)] sm:p-7">
          <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
            <span class="inline-flex items-center gap-2 rounded-lg bg-[#e8f5fb] px-3 py-1.5 text-xs font-extrabold text-[#0877a8]">
              <GraduationCap :size="16" aria-hidden="true" />
              {{ tr("ADMISSION INFORMATION", "ভর্তির তথ্য") }}
            </span>
            <span class="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">
              <BellRing :size="14" aria-hidden="true" />
              {{ tr("Details to be confirmed", "তথ্য নিশ্চিত করা হবে") }}
            </span>
          </div>

          <h2 class="mb-4 text-xl font-extrabold leading-snug text-[#172b43] sm:text-[23px]">
            {{ session.title }}
          </h2>

          <div class="grid gap-x-8 gap-y-5 rounded-[16px] border border-[#e9eef4] bg-[#f7f9fc] p-4 sm:grid-cols-2 sm:p-5">
            <div>
              <p class="mb-1 text-sm text-[#74849a]">{{ tr("Classes", "শ্রেণি") }}</p>
              <p class="font-bold text-[#26374d]">{{ tr("Class availability will be confirmed by the school", "শ্রেণির আসন স্কুল থেকে নিশ্চিত করা হবে") }}</p>
            </div>
            <div>
              <p class="mb-1 text-sm text-[#74849a]">{{ tr("Application fee", "আবেদন ফি") }}</p>
              <p class="font-bold text-[#26374d]">{{ tr("To be confirmed", "নিশ্চিত করা হবে") }}</p>
            </div>
            <div>
              <p class="mb-1 text-sm text-[#74849a]">{{ tr("Session", "সেশন") }}</p>
              <p class="font-bold text-[#26374d]">{{ tr("Dates will be announced", "তারিখ জানানো হবে") }}</p>
            </div>
            <div>
              <p class="mb-1 text-sm text-[#74849a]">{{ tr("Deadline", "শেষ তারিখ") }}</p>
              <p class="font-bold text-[#26374d]">{{ tr("To be announced", "জানানো হবে") }}</p>
            </div>
          </div>

          <div class="mt-5 border-t border-[#e9eef4] pt-4">
            <p class="mb-4 rounded-lg bg-blue-50 px-3 py-2.5 text-sm leading-relaxed text-[#48627a]">
              {{ tr("Official class availability, fees and dates have not been published yet. Please contact the admissions office for confirmed information.", "আনুষ্ঠানিক শ্রেণির আসন, ফি ও তারিখ এখনো প্রকাশিত হয়নি। নিশ্চিত তথ্যের জন্য ভর্তি অফিসে যোগাযোগ করুন।") }}
            </p>
            <div class="grid gap-2 sm:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)]">
              <a
                href="/notices"
                class="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] border border-[#cbd7e4] bg-[#f0f4f8] px-4 text-sm font-extrabold text-[#34465d] transition hover:bg-[#e7edf3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087cae]"
              >
                <FileText :size="17" aria-hidden="true" />
                {{ tr("View School Notices", "স্কুলের বিজ্ঞপ্তি দেখুন") }}
              </a>
              <button
                type="button"
                class="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] bg-gradient-to-r from-[#0878aa] to-[#078ac0] px-4 text-sm font-extrabold text-white shadow-[0_5px_14px_rgba(8,124,174,.2)] transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087cae]"
                @click="showApply = true"
              >
                {{ tr("Apply Now", "এখনই আবেদন করুন") }}
                <ArrowRight :size="17" aria-hidden="true" />
              </button>
            </div>
          </div>
        </article>

        <div v-if="showArchived" class="mt-5 rounded-[16px] border border-dashed border-[#ccd7e4] bg-white px-5 py-8 text-center">
          <Archive class="mx-auto mb-3 text-[#8a9aae]" :size="24" aria-hidden="true" />
          <p class="font-bold text-[#3c4d63]">{{ tr("There are no archived admission notices yet.", "এখনো কোনো সংরক্ষিত ভর্তি বিজ্ঞপ্তি নেই।") }}</p>
        </div>

        <p class="mt-5 flex items-center justify-center gap-2 text-xs text-[#718096]">
          <CalendarDays :size="14" aria-hidden="true" />
          {{ tr("Admission dates and requirements are published only after confirmation by the school.", "স্কুল নিশ্চিত করার পরই ভর্তির তারিখ ও শর্তাবলি প্রকাশ করা হবে।") }}
          <Hourglass :size="14" aria-hidden="true" />
        </p>
      </section>
    </div>

    <AdmissionSessionModal v-if="showApply" :session="session" @close="showApply = false" />
  </main>
</template>
