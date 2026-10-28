<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from "vue";
import { BookOpen, CalendarDays, ChevronRight, Download, Eye, FileText, GraduationCap, X } from "lucide-vue-next";
import { examClasses, examRoutines, examSessions } from "../data/examRoutines.js";

const selectedSession = ref("");
const selectedClass = ref("");
const selectedRoutine = ref(null);
const previewDialog = ref(null);

const filteredRoutines = computed(() => examRoutines.filter((routine) =>
  (!selectedSession.value || routine.session === selectedSession.value)
  && (!selectedClass.value || routine.className === selectedClass.value),
));

function sessionLabel(value) {
  return examSessions.find((session) => session.value === value)?.label ?? value;
}

function formatDate(value) {
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function hasPdfDocument(routine) {
  // Only files placed in the dedicated demo document folder can be linked.
  return typeof routine.pdfUrl === "string" && routine.pdfUrl.startsWith("/demo-documents/");
}

async function viewRoutine(routine) {
  selectedRoutine.value = routine;
  await nextTick();
  if (previewDialog.value && !previewDialog.value.open) previewDialog.value.showModal();
}

function closePreview() {
  if (previewDialog.value?.open) previewDialog.value.close();
  selectedRoutine.value = null;
}

onBeforeUnmount(closePreview);
</script>

<template>
  <div class="min-h-[70vh] bg-[#f6f8fb] text-[#18283f]">
    <section class="bg-gradient-to-r from-[#092645] via-[#173f8e] to-[#294e9e] px-4 py-10 text-white sm:px-6 sm:py-14">
      <div class="mx-auto max-w-6xl">
        <nav class="mb-5 flex items-center gap-2 text-sm text-blue-100" aria-label="Breadcrumb">
          <RouterLink to="/" class="rounded-sm hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0cf67]">Home</RouterLink>
          <ChevronRight :size="15" aria-hidden="true" />
          <span class="font-semibold text-[#f0cf67]" aria-current="page">Exam Routine</span>
        </nav>
        <div class="flex items-start gap-4">
          <span class="hidden h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/20 bg-white/10 text-[#f0cf67] sm:grid"><GraduationCap :size="25" aria-hidden="true" /></span>
          <div>
            <p class="text-xs font-bold uppercase tracking-[.16em] text-[#f0cf67]">Academic information</p>
            <h1 class="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">Examination Routines</h1>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">Find examination schedules and important academic updates.</p>
          </div>
        </div>
      </div>
    </section>

    <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div class="mb-6 flex items-start gap-3 rounded-xl border border-[#e8d79c] bg-[#fff9e8] px-4 py-3 text-sm leading-6 text-[#654f20]" role="note">
        <FileText class="mt-0.5 shrink-0 text-[#a77d31]" :size="19" aria-hidden="true" />
        <p><strong>Demo content:</strong> These fictional examples are for interface preview only. They are not official or published PIISC examination routines.</p>
      </div>

      <section class="mb-6 rounded-2xl border border-[#dce5ef] bg-white p-4 shadow-[0_12px_30px_rgba(23,58,106,.04)] sm:p-5" aria-labelledby="routine-filters-title">
        <div class="mb-4 flex items-center gap-2">
          <BookOpen class="text-[#a77d31]" :size="19" aria-hidden="true" />
          <h2 id="routine-filters-title" class="font-bold text-[#173f8e]">Find a routine</h2>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="grid gap-2 text-sm font-semibold text-[#344b70]" for="exam-session">
            Academic session
            <select id="exam-session" v-model="selectedSession" class="min-h-11 rounded-lg border border-[#cbd7e4] bg-white px-3 text-[#18283f] outline-none transition focus:border-[#294e9e] focus:ring-4 focus:ring-[#294e9e]/10">
              <option value="">All demo sessions</option>
              <option v-for="session in examSessions" :key="session.value" :value="session.value">{{ session.label }}</option>
            </select>
          </label>
          <label class="grid gap-2 text-sm font-semibold text-[#344b70]" for="exam-class">
            Class
            <select id="exam-class" v-model="selectedClass" class="min-h-11 rounded-lg border border-[#cbd7e4] bg-white px-3 text-[#18283f] outline-none transition focus:border-[#294e9e] focus:ring-4 focus:ring-[#294e9e]/10">
              <option value="">All Classes</option>
              <option v-for="className in examClasses" :key="className" :value="className">{{ className }}</option>
            </select>
          </label>
        </div>
      </section>

      <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 class="text-lg font-bold text-[#173f8e]">Routine list</h2>
        <p class="text-sm text-[#68788e]" role="status" aria-live="polite">{{ filteredRoutines.length }} demo {{ filteredRoutines.length === 1 ? "routine" : "routines" }}</p>
      </div>

      <div v-if="filteredRoutines.length" class="overflow-hidden rounded-2xl border border-[#dce5ef] bg-white shadow-[0_12px_30px_rgba(23,58,106,.04)]">
        <div class="hidden overflow-x-auto md:block">
          <table class="w-full min-w-[760px] border-collapse text-left text-sm">
            <caption class="sr-only">Fictional demo examination routines</caption>
            <thead class="bg-[#edf3ff] text-xs uppercase tracking-wide text-[#415a82]">
              <tr>
                <th scope="col" class="px-5 py-4 font-bold">Examination</th>
                <th scope="col" class="px-4 py-4 font-bold">Class</th>
                <th scope="col" class="px-4 py-4 font-bold">Academic session</th>
                <th scope="col" class="px-4 py-4 font-bold">Published</th>
                <th scope="col" class="px-4 py-4 font-bold">Document</th>
                <th scope="col" class="px-5 py-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#e8edf3]">
              <tr v-for="routine in filteredRoutines" :key="routine.id" class="align-middle hover:bg-[#fbfcfe]">
                <td class="px-5 py-4 font-bold text-[#243a5a]">{{ routine.examination }}</td>
                <td class="px-4 py-4 text-[#43566f]">{{ routine.className }}</td>
                <td class="px-4 py-4 text-[#43566f]">{{ sessionLabel(routine.session) }}</td>
                <td class="px-4 py-4 text-[#43566f]">{{ formatDate(routine.publishedOn) }}</td>
                <td class="px-4 py-4"><span class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800"><FileText :size="15" aria-hidden="true" />Demo preview available</span><span class="mt-1 block text-xs text-[#718198]">PDF not configured</span></td>
                <td class="px-5 py-4"><div class="flex justify-end gap-2">
                  <button type="button" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[#cbd7e4] px-3 text-xs font-bold text-[#294e9e] hover:bg-[#edf3ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9b33d]" @click="viewRoutine(routine)"><Eye :size="15" aria-hidden="true" />View Routine</button>
                  <a v-if="hasPdfDocument(routine)" :href="routine.pdfUrl" download class="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-[#173f8e] px-3 text-xs font-bold text-white hover:bg-[#092645] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9b33d]"><Download :size="15" aria-hidden="true" />Download PDF</a>
                  <span v-else class="inline-flex min-h-9 items-center rounded-lg bg-slate-100 px-3 text-xs font-semibold text-slate-500">PDF unavailable</span>
                </div></td>
              </tr>
            </tbody>
          </table>
        </div>

        <ul class="divide-y divide-[#e8edf3] md:hidden">
          <li v-for="routine in filteredRoutines" :key="routine.id" class="space-y-3 p-4">
            <div class="flex items-start justify-between gap-3">
              <div><h3 class="font-bold leading-snug text-[#243a5a]">{{ routine.examination }}</h3><p class="mt-1 text-sm text-[#68788e]">{{ routine.className }} · {{ sessionLabel(routine.session) }}</p></div>
              <CalendarDays class="mt-0.5 shrink-0 text-[#a77d31]" :size="19" aria-hidden="true" />
            </div>
            <p class="text-xs text-[#68788e]">Published {{ formatDate(routine.publishedOn) }}</p>
            <p class="flex flex-wrap items-center gap-x-2 text-xs font-semibold text-emerald-800"><FileText :size="15" aria-hidden="true" />Demo preview available <span class="font-normal text-[#718198]">· PDF not configured</span></p>
            <div class="flex flex-wrap gap-2 pt-1">
              <button type="button" class="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#cbd7e4] px-3 text-sm font-bold text-[#294e9e] hover:bg-[#edf3ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9b33d]" @click="viewRoutine(routine)"><Eye :size="16" aria-hidden="true" />View Routine</button>
              <a v-if="hasPdfDocument(routine)" :href="routine.pdfUrl" download class="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-[#173f8e] px-3 text-sm font-bold text-white hover:bg-[#092645] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9b33d]"><Download :size="16" aria-hidden="true" />Download PDF</a>
            </div>
          </li>
        </ul>
      </div>

      <section v-else class="rounded-2xl border border-dashed border-[#cbd7e4] bg-white px-5 py-14 text-center" aria-live="polite">
        <CalendarDays class="mx-auto mb-4 text-[#a6b5c8]" :size="42" aria-hidden="true" />
        <h3 class="text-lg font-bold text-[#344b70]">No demo routines match these filters</h3>
        <p class="mt-2 text-sm text-[#718198]">Choose another academic session or class to see sample schedules.</p>
      </section>
    </main>

    <Teleport to="body">
      <dialog v-if="selectedRoutine" ref="previewDialog" class="m-auto max-h-[90dvh] w-[calc(100%-24px)] max-w-3xl overflow-y-auto rounded-2xl border border-[#dce5ef] bg-white p-0 text-[#18283f] shadow-2xl backdrop:bg-[#0c1828]/70 backdrop:backdrop-blur-sm" :aria-labelledby="`preview-title-${selectedRoutine.id}`" @close="selectedRoutine = null">
        <header class="flex items-start justify-between gap-4 border-b border-[#e5eaf0] bg-gradient-to-r from-[#092645] to-[#294e9e] px-5 py-5 text-white sm:px-7">
          <div><p class="text-xs font-bold uppercase tracking-wider text-[#f0cf67]">Demo schedule preview</p><h2 :id="`preview-title-${selectedRoutine.id}`" class="mt-1 text-xl font-bold">{{ selectedRoutine.examination }}</h2><p class="mt-1 text-sm text-blue-100">{{ selectedRoutine.className }} · {{ sessionLabel(selectedRoutine.session) }}</p></div>
          <button type="button" class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0cf67]" aria-label="Close routine preview" @click="closePreview"><X :size="19" aria-hidden="true" /></button>
        </header>
        <div class="p-5 sm:p-7">
          <p class="mb-4 rounded-lg border border-[#e8d79c] bg-[#fff9e8] px-3 py-2 text-sm text-[#654f20]">This schedule is fictional demo content and is not an official examination routine.</p>
          <div class="overflow-x-auto rounded-lg border border-[#dce5ef]">
            <table class="w-full min-w-[520px] text-left text-sm">
              <caption class="sr-only">Demo dates, times and subjects for {{ selectedRoutine.examination }}</caption>
              <thead class="bg-[#edf3ff] text-xs uppercase tracking-wide text-[#415a82]"><tr><th scope="col" class="px-4 py-3">Date</th><th scope="col" class="px-4 py-3">Day</th><th scope="col" class="px-4 py-3">Time</th><th scope="col" class="px-4 py-3">Subject</th></tr></thead>
              <tbody class="divide-y divide-[#e8edf3]"><tr v-for="item in selectedRoutine.schedule" :key="`${item.date}-${item.subject}`"><td class="px-4 py-3">{{ formatDate(item.date) }}</td><td class="px-4 py-3">{{ item.day }}</td><td class="px-4 py-3">{{ item.time }}</td><td class="px-4 py-3 font-semibold">{{ item.subject }}</td></tr></tbody>
            </table>
          </div>
          <div class="mt-5 flex justify-end"><button type="button" class="min-h-10 rounded-lg bg-[#173f8e] px-4 text-sm font-bold text-white hover:bg-[#092645] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9b33d]" @click="closePreview">Close preview</button></div>
        </div>
      </dialog>
    </Teleport>
  </div>
</template>
