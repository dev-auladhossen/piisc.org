<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from "vue";
import { CalendarDays, ChevronRight, Eye, GraduationCap, MapPin, X } from "lucide-vue-next";
import { seatPlanClasses, seatPlanSessions, studentSeatPlans } from "../data/studentSeatPlans.js";

const selectedSession = ref("");
const selectedClass = ref("");
const selectedExamination = ref("");
const selectedPlan = ref(null);
const detailsDialog = ref(null);

const examinations = computed(() => [...new Set(studentSeatPlans
  .filter((plan) => !selectedSession.value || plan.session === selectedSession.value)
  .filter((plan) => !selectedClass.value || plan.className === selectedClass.value)
  .map((plan) => plan.examination))]);

const filteredPlans = computed(() => studentSeatPlans.filter((plan) =>
  (!selectedSession.value || plan.session === selectedSession.value)
  && (!selectedClass.value || plan.className === selectedClass.value)
  && (!selectedExamination.value || plan.examination === selectedExamination.value),
));

function sessionLabel(value) {
  return seatPlanSessions.find((session) => session.value === value)?.label ?? value;
}

function formatDate(value) {
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

async function viewPlan(plan) {
  selectedPlan.value = plan;
  await nextTick();
  if (detailsDialog.value && !detailsDialog.value.open) detailsDialog.value.showModal();
}

function closeDetails() {
  if (detailsDialog.value?.open) detailsDialog.value.close();
  selectedPlan.value = null;
}

onBeforeUnmount(closeDetails);
</script>

<template>
  <div class="min-h-[70vh] bg-[#f6f8fb] text-[#18283f]">
    <section class="bg-gradient-to-r from-[#092645] via-[#173f8e] to-[#294e9e] px-4 py-10 text-white sm:px-6 sm:py-14">
      <div class="mx-auto max-w-6xl">
        <nav class="mb-5 flex items-center gap-2 text-sm text-blue-100" aria-label="Breadcrumb">
          <RouterLink to="/" class="rounded-sm hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0cf67]">Home</RouterLink>
          <ChevronRight :size="15" aria-hidden="true" />
          <span class="font-semibold text-[#f0cf67]" aria-current="page">Student Seat Plans</span>
        </nav>
        <div class="flex items-start gap-4">
          <span class="hidden h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/20 bg-white/10 text-[#f0cf67] sm:grid"><GraduationCap :size="25" aria-hidden="true" /></span>
          <div>
            <p class="text-xs font-bold uppercase tracking-[.16em] text-[#f0cf67]">Student information</p>
            <h1 class="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">Student Seat Plans</h1>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">Check your examination seating information, including room and seat assignment.</p>
          </div>
        </div>
      </div>
    </section>

    <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div class="mb-6 flex items-start gap-3 rounded-xl border border-[#e8d79c] bg-[#fff9e8] px-4 py-3 text-sm leading-6 text-[#654f20]" role="note">
        <MapPin class="mt-0.5 shrink-0 text-[#a77d31]" :size="19" aria-hidden="true" />
        <p><strong>Fictional demo data:</strong> Names, roll numbers, room details, and seat assignments on this page are examples only. They do not identify real students or represent official seating information.</p>
      </div>

      <section class="mb-6 rounded-2xl border border-[#dce5ef] bg-white p-4 shadow-[0_12px_30px_rgba(23,58,106,.04)] sm:p-5" aria-labelledby="seat-plan-filters-title">
        <div class="mb-4 flex items-center gap-2">
          <CalendarDays class="text-[#a77d31]" :size="19" aria-hidden="true" />
          <h2 id="seat-plan-filters-title" class="font-bold text-[#173f8e]">Find your demo seat plan</h2>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label class="grid gap-2 text-sm font-semibold text-[#344b70]" for="seat-session">
            Academic session
            <select id="seat-session" v-model="selectedSession" @change="selectedExamination = ''" class="min-h-11 rounded-lg border border-[#cbd7e4] bg-white px-3 text-[#18283f] outline-none transition focus:border-[#294e9e] focus:ring-4 focus:ring-[#294e9e]/10">
              <option value="">All demo sessions</option>
              <option v-for="session in seatPlanSessions" :key="session.value" :value="session.value">{{ session.label }}</option>
            </select>
          </label>
          <label class="grid gap-2 text-sm font-semibold text-[#344b70]" for="seat-class">
            Class
            <select id="seat-class" v-model="selectedClass" @change="selectedExamination = ''" class="min-h-11 rounded-lg border border-[#cbd7e4] bg-white px-3 text-[#18283f] outline-none transition focus:border-[#294e9e] focus:ring-4 focus:ring-[#294e9e]/10">
              <option value="">All Classes</option>
              <option v-for="className in seatPlanClasses" :key="className" :value="className">{{ className }}</option>
            </select>
          </label>
          <label class="grid gap-2 text-sm font-semibold text-[#344b70]" for="seat-examination">
            Examination
            <select id="seat-examination" v-model="selectedExamination" class="min-h-11 rounded-lg border border-[#cbd7e4] bg-white px-3 text-[#18283f] outline-none transition focus:border-[#294e9e] focus:ring-4 focus:ring-[#294e9e]/10">
              <option value="">All examinations</option>
              <option v-for="examination in examinations" :key="examination" :value="examination">{{ examination }}</option>
            </select>
          </label>
        </div>
      </section>

      <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 class="text-lg font-bold text-[#173f8e]">Seat plan records</h2>
        <p class="text-sm text-[#68788e]" role="status" aria-live="polite">{{ filteredPlans.length }} demo {{ filteredPlans.length === 1 ? "record" : "records" }}</p>
      </div>

      <div v-if="filteredPlans.length" class="overflow-hidden rounded-2xl border border-[#dce5ef] bg-white shadow-[0_12px_30px_rgba(23,58,106,.04)]">
        <div class="hidden overflow-x-auto md:block">
          <table class="w-full min-w-[850px] border-collapse text-left text-sm">
            <caption class="sr-only">Fictional demo student examination seat assignments</caption>
            <thead class="bg-[#edf3ff] text-xs uppercase tracking-wide text-[#415a82]">
              <tr>
                <th scope="col" class="px-5 py-4 font-bold">Examination</th>
                <th scope="col" class="px-4 py-4 font-bold">Session</th>
                <th scope="col" class="px-4 py-4 font-bold">Class / Demo roll</th>
                <th scope="col" class="px-4 py-4 font-bold">Room</th>
                <th scope="col" class="px-4 py-4 font-bold">Seat</th>
                <th scope="col" class="px-4 py-4 font-bold">Published</th>
                <th scope="col" class="px-5 py-4 text-right font-bold">Details</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#e8edf3]">
              <tr v-for="plan in filteredPlans" :key="plan.id" class="align-middle hover:bg-[#fbfcfe]">
                <td class="px-5 py-4 font-bold text-[#243a5a]">{{ plan.examination }}</td>
                <td class="px-4 py-4 text-[#43566f]">{{ sessionLabel(plan.session) }}</td>
                <td class="px-4 py-4"><span class="block font-semibold text-[#43566f]">{{ plan.className }}</span><span class="text-xs text-[#718198]">{{ plan.rollNumber }}</span></td>
                <td class="px-4 py-4 text-[#43566f]">{{ plan.room }}</td>
                <td class="px-4 py-4"><span class="inline-flex rounded-md bg-[#fff6d9] px-2.5 py-1 font-bold text-[#765b18]">{{ plan.seatNumber }}</span></td>
                <td class="px-4 py-4"><span class="block text-[#43566f]">{{ formatDate(plan.publishedOn) }}</span><span class="text-xs font-semibold text-emerald-800">{{ plan.status }}</span></td>
                <td class="px-5 py-4 text-right"><button type="button" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[#cbd7e4] px-3 text-xs font-bold text-[#294e9e] hover:bg-[#edf3ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9b33d]" @click="viewPlan(plan)"><Eye :size="15" aria-hidden="true" />View details</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        <ul class="divide-y divide-[#e8edf3] md:hidden">
          <li v-for="plan in filteredPlans" :key="plan.id" class="space-y-3 p-4">
            <div class="flex items-start justify-between gap-3">
              <div><h3 class="font-bold leading-snug text-[#243a5a]">{{ plan.examination }}</h3><p class="mt-1 text-sm text-[#68788e]">{{ plan.className }} · {{ sessionLabel(plan.session) }}</p></div>
              <span class="shrink-0 rounded-md bg-[#fff6d9] px-2.5 py-1 text-sm font-bold text-[#765b18]">{{ plan.seatNumber }}</span>
            </div>
            <dl class="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              <div><dt class="text-xs text-[#718198]">Demo roll</dt><dd class="font-semibold text-[#344b70]">{{ plan.rollNumber }}</dd></div>
              <div><dt class="text-xs text-[#718198]">Room</dt><dd class="font-semibold text-[#344b70]">{{ plan.room }}</dd></div>
              <div><dt class="text-xs text-[#718198]">Published</dt><dd class="font-semibold text-[#344b70]">{{ formatDate(plan.publishedOn) }}</dd></div>
              <div><dt class="text-xs text-[#718198]">Status</dt><dd class="font-semibold text-emerald-800">{{ plan.status }}</dd></div>
            </dl>
            <button type="button" class="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#cbd7e4] px-3 text-sm font-bold text-[#294e9e] hover:bg-[#edf3ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9b33d]" @click="viewPlan(plan)"><Eye :size="16" aria-hidden="true" />View details</button>
          </li>
        </ul>
      </div>

      <section v-else class="rounded-2xl border border-dashed border-[#cbd7e4] bg-white px-5 py-14 text-center" aria-live="polite">
        <CalendarDays class="mx-auto mb-4 text-[#a6b5c8]" :size="42" aria-hidden="true" />
        <h3 class="text-lg font-bold text-[#344b70]">No demo seat plans match these filters</h3>
        <p class="mt-2 text-sm text-[#718198]">Choose another session, class, or examination to see sample seat assignments.</p>
      </section>
    </main>

    <Teleport to="body">
      <dialog v-if="selectedPlan" ref="detailsDialog" class="m-auto max-h-[90dvh] w-[calc(100%-24px)] max-w-xl overflow-y-auto rounded-2xl border border-[#dce5ef] bg-white p-0 text-[#18283f] shadow-2xl backdrop:bg-[#0c1828]/70 backdrop:backdrop-blur-sm" :aria-labelledby="`seat-title-${selectedPlan.id}`" @close="selectedPlan = null">
        <header class="flex items-start justify-between gap-4 bg-gradient-to-r from-[#092645] to-[#294e9e] px-5 py-5 text-white sm:px-7">
          <div><p class="text-xs font-bold uppercase tracking-wider text-[#f0cf67]">Fictional demo record</p><h2 :id="`seat-title-${selectedPlan.id}`" class="mt-1 text-xl font-bold">{{ selectedPlan.examination }}</h2><p class="mt-1 text-sm text-blue-100">{{ selectedPlan.className }} · {{ sessionLabel(selectedPlan.session) }}</p></div>
          <button type="button" class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0cf67]" aria-label="Close seat plan details" @click="closeDetails"><X :size="19" aria-hidden="true" /></button>
        </header>
        <div class="p-5 sm:p-7">
          <p class="mb-4 rounded-lg border border-[#e8d79c] bg-[#fff9e8] px-3 py-2 text-sm text-[#654f20]">This assignment is fictional and must not be used as actual student seating information.</p>
          <dl class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-lg bg-[#f6f8fb] p-3"><dt class="text-xs font-semibold uppercase tracking-wide text-[#718198]">Demo roll number</dt><dd class="mt-1 font-bold text-[#173f8e]">{{ selectedPlan.rollNumber }}</dd></div>
            <div class="rounded-lg bg-[#fff9e8] p-3"><dt class="text-xs font-semibold uppercase tracking-wide text-[#8a6b2b]">Seat number</dt><dd class="mt-1 font-bold text-[#765b18]">{{ selectedPlan.seatNumber }}</dd></div>
            <div class="rounded-lg bg-[#f6f8fb] p-3 sm:col-span-2"><dt class="text-xs font-semibold uppercase tracking-wide text-[#718198]">Room / building</dt><dd class="mt-1 font-bold text-[#344b70]">{{ selectedPlan.room }}</dd></div>
            <div class="rounded-lg bg-[#f6f8fb] p-3"><dt class="text-xs font-semibold uppercase tracking-wide text-[#718198]">Published</dt><dd class="mt-1 font-bold text-[#344b70]">{{ formatDate(selectedPlan.publishedOn) }}</dd></div>
            <div class="rounded-lg bg-[#f6f8fb] p-3"><dt class="text-xs font-semibold uppercase tracking-wide text-[#718198]">Status</dt><dd class="mt-1 font-bold text-emerald-800">{{ selectedPlan.status }}</dd></div>
          </dl>
          <div class="mt-5 flex justify-end"><button type="button" class="min-h-10 rounded-lg bg-[#173f8e] px-4 text-sm font-bold text-white hover:bg-[#092645] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9b33d]" @click="closeDetails">Close details</button></div>
        </div>
      </dialog>
    </Teleport>
  </div>
</template>
