<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";
import { Eye, Loader2, RefreshCw, Search, X } from "lucide-vue-next";
import { useI18n } from "../composables/useI18n.js";
import ToastNotification from "../components/ToastNotification.vue";
import {
  admissionErrorMessage,
  getAdmissionApplication,
  listAdmissionApplications,
  notifyAdmissionsDataChanged,
  setAdmissionReadState,
  updateAdmissionNotes,
  updateAdmissionStatus,
} from "../services/admissionsApi.js";

const PAGE_SIZE = 20;
const statuses = ["Pending", "Under Review", "Contacted", "Accepted", "Rejected", "Withdrawn"];
const { tr } = useI18n();
const rows = ref([]);
const page = ref(1);
const totalPages = ref(1);
const total = ref(0);
const statusFilter = ref("");
const searchInput = ref("");
const search = ref("");
const loading = ref(false);
const error = ref("");
const active = ref(null);
const detailDialog = ref(null);
const detailLoading = ref(false);
const detailLoadError = ref("");
const detailError = ref("");
const saving = ref(false);
const toast = ref(null);
const originalStatus = ref("");
const originalNotes = ref("");
let controller;
let requestSequence = 0;
let returnFocus;

const pageCount = computed(() => Math.max(1, totalPages.value));
const hasChanges = computed(() => active.value && (
  active.value.status !== originalStatus.value ||
  (active.value.internalNotes || "") !== originalNotes.value
));
function date(value) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "—" : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(parsed);
}
function notify(type, message) {
  toast.value = { type, message };
}

async function load() {
  const sequence = ++requestSequence;
  controller?.abort();
  controller = new AbortController();
  loading.value = true;
  error.value = "";
  try {
    const result = await listAdmissionApplications({ page: page.value, limit: PAGE_SIZE, status: statusFilter.value, search: search.value }, controller.signal);
    if (sequence !== requestSequence) return;
    if (!Array.isArray(result?.applications) || !result?.pagination) throw new Error("Invalid admissions list response");
    rows.value = result.applications;
    totalPages.value = Math.max(1, Number(result.pagination.totalPages) || 1);
    total.value = Number(result.pagination.total) || 0;
    if (page.value > totalPages.value) page.value = totalPages.value;
  } catch (failure) {
    if (sequence === requestSequence && failure?.code !== "ERR_CANCELED") error.value = admissionErrorMessage(failure);
  } finally {
    if (sequence === requestSequence) loading.value = false;
  }
}
watch([page, statusFilter, search], load, { immediate: true });
watch(active, async (value) => {
  if (value) {
    await nextTick();
    if (detailDialog.value && !detailDialog.value.open) detailDialog.value.showModal();
  } else {
    detailDialog.value?.close();
    await nextTick();
    if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    returnFocus = null;
  }
}, { flush: "post" });
function runSearch() { page.value = 1; search.value = searchInput.value.trim(); }

async function openDetails(row) {
  if (detailLoading.value) return;
  toast.value = null;
  returnFocus = document.activeElement;
  active.value = { ...row };
  detailLoadError.value = "";
  detailError.value = "";
  if (!row?._id) {
    detailLoadError.value = "The application list did not include its record ID. Refresh the list and try again.";
    return;
  }
  detailLoading.value = true;
  try {
    const result = await getAdmissionApplication(row._id);
    if (!result?.application) throw new Error("Invalid application details response");
    const serverReadState = typeof result.application.isRead === "boolean"
      ? result.application.isRead
      : Boolean(row.isRead);
    active.value = { ...result.application, isRead: serverReadState };
    originalStatus.value = result.application.status;
    originalNotes.value = result.application.internalNotes || "";
    const listReadState = typeof row.isRead === "boolean" ? row.isRead : null;
    rows.value = rows.value.map((item) => item._id === row._id
      ? { ...item, isRead: serverReadState }
      : item);
    if (listReadState !== null && listReadState !== serverReadState) notifyAdmissionsDataChanged();
    if (!serverReadState) await markActiveAsRead();
  } catch (failure) {
    detailLoadError.value = admissionErrorMessage(failure);
  } finally {
    detailLoading.value = false;
  }
}
async function markActiveAsRead() {
  if (!active.value?._id || active.value.isRead || saving.value) return;
  saving.value = true;
  try {
    const result = await setAdmissionReadState(active.value._id);
    if (result?.application?.isRead !== true) throw new Error("Invalid read-state response");
    active.value = {
      ...active.value,
      ...result.application,
      status: active.value.status,
      internalNotes: active.value.internalNotes,
    };
    rows.value = rows.value.map((row) => row._id === active.value._id
      ? { ...row, isRead: true }
      : row);
    detailError.value = "";
  } catch (failure) {
    detailError.value = `Unable to mark this application as read. ${admissionErrorMessage(failure)}`;
    notify("error", detailError.value);
  } finally {
    saving.value = false;
  }
}
function retryDetails() {
  if (active.value) openDetails(active.value);
}
function closeDetails() {
  if (saving.value || detailLoading.value) return;
  active.value = null;
  detailLoadError.value = "";
  detailError.value = "";
  originalStatus.value = "";
  originalNotes.value = "";
}
async function saveChanges() {
  if (!active.value?._id || saving.value || !hasChanges.value) return;
  saving.value = true;
  detailError.value = "";
  let saved = false;
  let statusSaved = false;
  let notesSaved = false;
  let failedAction = "status";
  try {
    if (active.value.status !== originalStatus.value) {
      failedAction = "status";
      const result = await updateAdmissionStatus(active.value._id, active.value.status);
      if (!result?.application) throw new Error("Invalid status update response");
      originalStatus.value = result.application.status;
      active.value.status = result.application.status;
      statusSaved = true;
      rows.value = rows.value.map((row) => row._id === active.value._id
        ? { ...row, status: result.application.status }
        : row);
    }
    if ((active.value.internalNotes || "") !== originalNotes.value) {
      failedAction = "notes";
      const result = await updateAdmissionNotes(active.value._id, active.value.internalNotes || "");
      if (!result?.application) throw new Error("Invalid notes update response");
      active.value = { ...active.value, ...result.application };
      originalNotes.value = result.application.internalNotes || "";
      notesSaved = true;
    }
    saved = true;
    const successMessages = [
      ...(statusSaved ? ["Application status updated successfully."] : []),
      ...(notesSaved ? ["Internal notes saved successfully."] : []),
    ];
    notify("success", successMessages.join(" "));
    await load();
  } catch (failure) {
    const safeMessage = admissionErrorMessage(failure);
    detailError.value = failedAction === "notes"
      ? statusSaved
        ? `Application status was updated, but internal notes could not be saved. ${safeMessage}`
        : `Unable to save internal notes. ${safeMessage}`
      : `Unable to update application status. ${safeMessage}`;
    notify("error", detailError.value);
  } finally {
    saving.value = false;
    if (saved) closeDetails();
  }
}
async function toggleRead() {
  await markActiveAsRead();
}
onBeforeUnmount(() => {
  requestSequence++;
  controller?.abort();
  detailDialog.value?.close();
});
</script>

<template>
  <section class="space-y-5" aria-labelledby="admissions-title">
    <header class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p class="text-xs font-bold uppercase tracking-[.14em] text-[#ad8126]">{{ tr("Admin dashboard") }}</p>
        <h1 id="admissions-title" class="mt-1 text-2xl font-bold text-[#173f8e] sm:text-3xl">{{ tr("Admissions") }}</h1>
        <p class="mt-2 text-sm text-[#60718e]">{{ tr("Review applications and update their status.") }}</p>
      </div>
      <button type="button" class="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#c7d4e8] bg-white px-3 text-sm font-semibold text-[#294e9e] hover:bg-[#edf3ff]" :disabled="loading" @click="load"><RefreshCw :size="16" :class="loading && 'animate-spin'" aria-hidden="true" />{{ tr("Refresh") }}</button>
    </header>

    <div class="flex flex-col gap-3 rounded-xl border border-[#dce5ef] bg-white p-4 sm:flex-row sm:items-end">
      <form class="flex min-w-0 flex-1 gap-2" role="search" @submit.prevent="runSearch">
        <label class="sr-only" for="admission-search">{{ tr("Search applications") }}</label>
        <input id="admission-search" v-model="searchInput" class="min-h-11 min-w-0 flex-1 rounded-lg border border-[#c7d4e8] px-3 text-sm outline-none focus:border-[#8ea9d8] focus:ring-2 focus:ring-[#294e9e]/10" :placeholder="tr('Search number, student, or guardian…')" />
        <button class="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#294e9e] px-4 text-sm font-semibold text-white hover:bg-[#173f8e]" type="submit"><Search :size="16" aria-hidden="true" />{{ tr("Search") }}</button>
      </form>
      <label class="text-sm font-semibold text-[#344b70]">{{ tr("Status") }}
        <select v-model="statusFilter" class="mt-1 block min-h-11 w-full rounded-lg border border-[#c7d4e8] bg-white px-3 sm:min-w-44">
          <option value="">{{ tr("All statuses") }}</option>
          <option v-for="item in statuses" :key="item" :value="item">{{ tr(item) }}</option>
        </select>
      </label>
    </div>

    <div v-if="error" role="alert" class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <span>{{ tr(error) }}</span><button type="button" class="font-semibold underline" @click="load">{{ tr("Retry") }}</button>
    </div>
    <div class="overflow-hidden rounded-xl border border-[#dce5ef] bg-white">
      <div v-if="loading && !rows.length" class="flex min-h-48 items-center justify-center gap-2 text-sm text-[#60718e]" role="status"><Loader2 :size="18" class="animate-spin" aria-hidden="true" />{{ tr("Loading applications…") }}</div>
      <div v-else-if="!loading && !rows.length && !error" class="p-10 text-center text-sm text-[#60718e]">{{ tr("No applications found.") }}</div>
      <template v-else>
        <div class="divide-y divide-[#e8edf5] md:hidden">
          <article v-for="row in rows" :key="row._id || row.applicationNumber" class="space-y-2 p-4">
            <div class="flex items-start justify-between gap-3"><div><p class="font-bold text-[#173f8e]">{{ row.studentFullName }}</p><p class="text-xs text-[#60718e]">{{ row.applicationNumber }} · {{ row.applyingClass }}</p></div><span class="rounded-full px-2.5 py-1 text-xs font-semibold" :class="row.isRead ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-800'">{{ tr(row.isRead ? "Read" : "New") }}</span></div>
            <p class="text-sm text-[#475569]">{{ row.guardianFullName }} · {{ row.guardianPhone }} · {{ row.guardianEmail }}</p>
            <div class="flex items-center justify-between gap-3 text-xs text-[#60718e]"><span>{{ date(row.createdAt) }} · {{ row.status }}</span><button type="button" class="font-semibold text-[#294e9e]" @click="openDetails(row)">{{ tr("View details") }}</button></div>
          </article>
        </div>
        <div class="hidden overflow-x-auto md:block">
          <table class="w-full min-w-[850px] text-left text-sm">
            <thead class="bg-[#f7f9fc] text-xs uppercase tracking-wide text-[#60718e]"><tr><th class="px-4 py-3">{{ tr("Application") }}</th><th class="px-4 py-3">{{ tr("Student") }}</th><th class="px-4 py-3">{{ tr("Guardian contact") }}</th><th class="px-4 py-3">{{ tr("Submitted") }}</th><th class="px-4 py-3">{{ tr("Status") }}</th><th class="px-4 py-3">{{ tr("Read state") }}</th><th class="px-4 py-3"><span class="sr-only">{{ tr("Actions") }}</span></th></tr></thead>
            <tbody class="divide-y divide-[#e8edf5]"><tr v-for="row in rows" :key="row._id || row.applicationNumber" class="text-[#344b70]"><td class="px-4 py-3"><span class="font-semibold text-[#173f8e]">{{ row.applicationNumber }}</span><span class="mt-1 block text-xs text-[#718198]">{{ row.applyingClass }}</span></td><td class="px-4 py-3">{{ row.studentFullName }}</td><td class="max-w-[240px] px-4 py-3"><span class="block truncate">{{ row.guardianFullName }} · {{ row.guardianPhone }}</span><span class="block truncate text-xs text-[#718198]">{{ row.guardianEmail }}</span></td><td class="whitespace-nowrap px-4 py-3">{{ date(row.createdAt) }}</td><td class="px-4 py-3">{{ row.status }}</td><td class="px-4 py-3"><span class="rounded-full px-2.5 py-1 text-xs font-semibold" :class="row.isRead ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-800'">{{ tr(row.isRead ? "Read" : "New") }}</span></td><td class="px-4 py-3"><button type="button" class="inline-flex min-h-9 items-center gap-1 rounded-md px-2 font-semibold text-[#294e9e] hover:bg-[#edf3ff]" @click="openDetails(row)"><Eye :size="16" aria-hidden="true" />{{ tr("View") }}</button></td></tr></tbody>
          </table>
        </div>
        <footer class="flex flex-wrap items-center justify-between gap-3 border-t border-[#e8edf5] bg-[#fbfcfe] px-4 py-3 text-sm text-[#60718e]"><span>{{ tr("Total") }}: {{ total }}</span><div class="flex items-center gap-2"><button type="button" class="min-h-9 rounded-md border border-[#c7d4e8] bg-white px-3 disabled:opacity-50" :disabled="page<=1 || loading" @click="page--">{{ tr("Previous") }}</button><span>{{ page }} / {{ pageCount }}</span><button type="button" class="min-h-9 rounded-md border border-[#c7d4e8] bg-white px-3 disabled:opacity-50" :disabled="page>=pageCount || loading" @click="page++">{{ tr("Next") }}</button></div></footer>
      </template>
    </div>

    <Teleport to="body">
      <dialog v-if="active" ref="detailDialog" class="admission-detail-dialog fixed inset-0 z-[100] m-0 h-[100dvh] max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-black/40 sm:h-auto sm:min-h-0 sm:p-4" aria-labelledby="admission-detail-title" @cancel.prevent="closeDetails" @click="event => { if (event.target === detailDialog) closeDetails() }">
        <section class="max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl sm:rounded-2xl sm:p-7">
          <header class="mb-5 flex items-start justify-between gap-3"><div><p class="text-xs font-bold uppercase tracking-wide text-[#ad8126]">{{ active.applicationNumber }}</p><h2 id="admission-detail-title" class="mt-1 text-xl font-bold text-[#173f8e]">{{ tr("Application details") }}</h2></div><button type="button" class="rounded-lg p-2 text-[#60718e] hover:bg-slate-100" :aria-label="tr('Close details')" @click="closeDetails"><X :size="20" /></button></header>
          <div v-if="detailLoading" role="status" class="flex min-h-32 items-center justify-center gap-2 text-[#60718e]"><Loader2 class="animate-spin" :size="18" />{{ tr("Loading details…") }}</div>
          <div v-else-if="detailLoadError" role="alert" class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"><span>{{ tr(detailLoadError) }}</span><button type="button" class="font-semibold underline" @click="retryDetails">{{ tr("Retry") }}</button></div>
          <template v-else>
            <dl class="grid gap-x-6 gap-y-4 text-sm sm:grid-cols-2">
              <div class="sm:col-span-2 border-b border-[#e8edf5] pb-2 text-xs font-bold uppercase tracking-wide text-[#ad8126]">{{ tr("Student information") }}</div>
              <div v-for="[label, value] in [[tr('Student'),active.studentFullName],[tr('Date of birth'),active.dateOfBirth ? date(active.dateOfBirth) : '—'],[tr('Applying class'),active.applyingClass],[tr('Academic session'),active.academicSession],[tr('Parent/guardian'),active.guardianFullName],[tr('Relationship'),active.guardianRelationship],[tr('Phone'),active.guardianPhone],[tr('Email'),active.guardianEmail],[tr('Address'),active.address || '—'],[tr('Previous school'),active.previousSchool || '—'],[tr('Submitted'),date(active.createdAt)],[tr('Consent confirmed'),active.consentConfirmed ? tr('Yes') : tr('No')]]" :key="label"><dt class="font-semibold text-[#60718e]">{{ label }}</dt><dd class="mt-1 break-words text-[#24364f]">{{ value }}</dd></div>
            </dl>
            <div class="mt-6 grid gap-4 border-t border-[#e8edf5] pt-5 sm:grid-cols-2">
              <label class="text-sm font-semibold text-[#344b70]">{{ tr("Status") }}<select v-model="active.status" :disabled="saving" class="mt-1 min-h-11 w-full rounded-lg border border-[#c7d4e8] bg-white px-3 disabled:opacity-60"><option v-for="item in statuses" :key="item" :value="item">{{ tr(item) }}</option></select></label>
              <label class="text-sm font-semibold text-[#344b70] sm:col-span-2">{{ tr("Internal notes") }}<textarea v-model="active.internalNotes" :disabled="saving" rows="3" maxlength="5000" class="mt-1 w-full rounded-lg border border-[#c7d4e8] p-3 font-normal disabled:opacity-60" /></label>
            </div>
            <div v-if="detailError" role="alert" class="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{{ tr(detailError) }}</div>
            <footer class="mt-5 flex flex-col-reverse gap-2 border-t border-[#e8edf5] pt-4 sm:flex-row sm:justify-between">
              <button type="button" :disabled="saving || active.isRead" class="min-h-11 rounded-lg border border-[#c7d4e8] px-4 text-sm font-semibold text-[#294e9e] disabled:opacity-50" @click="toggleRead">{{ tr(active.isRead ? "Already read" : "Mark read") }}</button>
              <div class="flex flex-col-reverse gap-2 sm:flex-row"><button type="button" :disabled="saving" class="min-h-11 rounded-lg border border-[#c7d4e8] px-4 text-sm font-semibold text-[#344b70]" @click="closeDetails">{{ tr("Close") }}</button><button type="button" :disabled="saving || !hasChanges" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#294e9e] px-4 text-sm font-semibold text-white disabled:opacity-50" @click="saveChanges"><Loader2 v-if="saving" :size="16" class="animate-spin" />{{ tr("Save changes") }}</button></div>
            </footer>
          </template>
        </section>
      </dialog>
    </Teleport>
    <ToastNotification v-if="toast" :type="toast.type" :message="tr(toast.message)" @close="toast = null" />
  </section>
</template>

<style scoped>
.admission-detail-dialog:not([open]){display:none}
.admission-detail-dialog[open]{display:flex;align-items:flex-end;justify-content:center}
.admission-detail-dialog::backdrop{@apply bg-black/40 backdrop-blur-[2px]}
@media(min-width:640px){.admission-detail-dialog[open]{align-items:center}}
</style>
