<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from "vue";
import { ArrowDown, ArrowUp, BellRing, ExternalLink, Megaphone, Pencil, Plus, Trash2, X } from "lucide-vue-next";
import ConfirmDialog from "../components/users/ConfirmDialog.vue";
import ToastNotification from "../components/ToastNotification.vue";
import { demoAnnouncements } from "../data/announcements.js";

const destinations = [
  { value: "/exam-routine", label: "Exam Routine" },
  { value: "/student-seat-plan", label: "Student Seat Plan" },
];

// Local page state only. It intentionally does not write back to the public ticker data.
const announcements = ref(demoAnnouncements.map((item, index) => ({
  ...item,
  destination: item.to,
  status: index === 0 ? "published" : "draft",
  destinationType: "internal",
  externalUrl: "",
  displayOrder: index + 1,
})));
const formDialog = ref(null);
const formOpen = ref(false);
const formAnnouncementId = ref(null);
const form = ref(emptyForm());
const formErrors = ref({});
const selectedForDelete = ref(null);
const confirmDeleteOpen = ref(false);
const toast = ref(null);
let nextId = 1;

function emptyForm() {
  return {
    text: "",
    destinationType: "internal",
    destination: destinations[0].value,
    externalUrl: "",
    status: "draft",
    displayOrder: 1,
  };
}

const sortedAnnouncements = computed(() => [...announcements.value].sort(
  (a, b) => a.displayOrder - b.displayOrder || a.id.localeCompare(b.id),
));
const editing = computed(() => formAnnouncementId.value !== null);

function notify(message, type = "success") {
  toast.value = { message, type };
}

function destinationLabel(item) {
  if (item.destinationType === "external") return item.externalUrl;
  return destinations.find((destination) => destination.value === item.destination)?.label ?? item.destination;
}

async function openForm(item = null) {
  formAnnouncementId.value = item?.id ?? null;
  form.value = item
    ? {
        text: item.text,
        destinationType: item.destinationType,
        destination: item.destinationType === "internal" ? item.destination : destinations[0].value,
        externalUrl: item.destinationType === "external" ? item.destination : "",
        status: item.status,
        displayOrder: item.displayOrder,
      }
    : { ...emptyForm(), displayOrder: announcements.value.length + 1 };
  formErrors.value = {};
  formOpen.value = true;
  await nextTick();
  if (formDialog.value && !formDialog.value.open) formDialog.value.showModal();
}

function closeForm() {
  if (formDialog.value?.open) formDialog.value.close();
  formOpen.value = false;
  formAnnouncementId.value = null;
  formErrors.value = {};
}

function cancelForm(event) {
  event.preventDefault();
  closeForm();
}

function validateForm() {
  const errors = {};
  if (!form.value.text.trim()) errors.text = "Enter announcement text.";
  else if (form.value.text.trim().length > 180) errors.text = "Announcement text must be 180 characters or fewer.";

  if (form.value.destinationType === "internal") {
    if (!destinations.some((item) => item.value === form.value.destination)) {
      errors.destination = "Choose a valid internal destination.";
    }
  } else {
    try {
      const url = new URL(form.value.externalUrl.trim());
      if (!['http:', 'https:'].includes(url.protocol)) errors.externalUrl = "Enter a valid HTTP or HTTPS URL.";
    } catch {
      errors.externalUrl = "Enter a valid HTTP or HTTPS URL.";
    }
  }

  const order = Number(form.value.displayOrder);
  if (!Number.isInteger(order) || order < 1) errors.displayOrder = "Display order must be a whole number greater than zero.";
  formErrors.value = errors;
  return Object.keys(errors).length === 0;
}

function saveAnnouncement() {
  if (!validateForm()) return;
  const destinationType = form.value.destinationType;
  const destination = destinationType === "internal" ? form.value.destination : form.value.externalUrl.trim();
  const record = {
    id: formAnnouncementId.value ?? `local-announcement-${nextId++}`,
    text: form.value.text.trim(),
    to: destination,
    destination,
    destinationType,
    externalUrl: destinationType === "external" ? destination : "",
    status: form.value.status,
    displayOrder: Number(form.value.displayOrder),
  };

  if (formAnnouncementId.value) {
    announcements.value = announcements.value.map((item) => item.id === record.id ? record : item);
    closeForm();
    notify("Mock announcement updated for this page session.");
  } else {
    announcements.value.push(record);
    closeForm();
    notify("Mock announcement created for this page session.");
  }
}

function toggleStatus(item) {
  item.status = item.status === "published" ? "draft" : "published";
  notify(item.status === "published" ? "Mock announcement published." : "Mock announcement changed to draft.");
}

function askDelete(item) {
  selectedForDelete.value = item;
  confirmDeleteOpen.value = true;
}

function deleteAnnouncement() {
  if (!selectedForDelete.value) return;
  const deletedId = selectedForDelete.value.id;
  announcements.value = announcements.value.filter((item) => item.id !== deletedId);
  selectedForDelete.value = null;
  confirmDeleteOpen.value = false;
  notify("Mock announcement deleted for this page session.");
}

function moveAnnouncement(item, direction) {
  const rows = sortedAnnouncements.value;
  const index = rows.findIndex((row) => row.id === item.id);
  const neighbor = rows[index + direction];
  if (!neighbor) return;
  const order = item.displayOrder;
  item.displayOrder = neighbor.displayOrder;
  neighbor.displayOrder = order;
  notify("Mock display order updated.");
}

onBeforeUnmount(() => {
  if (formDialog.value?.open) formDialog.value.close();
});
</script>

<template>
  <section class="space-y-6" aria-labelledby="announcements-heading">
    <header class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p class="text-xs font-bold uppercase tracking-[.14em] text-[#ad8126]">Admin dashboard</p>
        <h1 id="announcements-heading" class="mt-1 text-2xl font-bold text-[#173f8e] sm:text-3xl">Announcement Management</h1>
        <p class="mt-2 max-w-3xl text-sm leading-6 text-[#60718e]">Manage the sample messages shown in the homepage announcement ticker.</p>
      </div>
      <button type="button" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#294e9e] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#173f8e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9b33d]" @click="openForm()"><Plus :size="18" aria-hidden="true" />Create announcement</button>
    </header>

    <div class="flex items-start gap-3 rounded-xl border border-[#e8d79c] bg-[#fff9e8] px-4 py-3 text-sm leading-6 text-[#654f20]" role="note">
      <BellRing class="mt-0.5 shrink-0 text-[#a77d31]" :size="19" aria-hidden="true" />
      <p><strong>Mock data only.</strong> Changes are kept in this page's current session. They are not saved to the server and do not update the public ticker or appear to other users.</p>
    </div>

    <section class="overflow-hidden rounded-xl border border-[#dce5ef] bg-white shadow-[0_12px_30px_rgba(23,58,106,.04)]" aria-labelledby="announcement-list-title">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5eaf0] px-4 py-4 sm:px-5">
        <div class="flex items-center gap-2"><Megaphone class="text-[#a77d31]" :size="19" aria-hidden="true" /><h2 id="announcement-list-title" class="font-bold text-[#173f8e]">Announcements</h2></div>
        <span class="rounded-full bg-[#edf3ff] px-3 py-1 text-xs font-semibold text-[#294e9e]" role="status">{{ announcements.length }} records</span>
      </div>

      <div v-if="sortedAnnouncements.length" class="divide-y divide-[#e8edf3]">
        <div class="hidden overflow-x-auto md:block">
          <table class="w-full min-w-[940px] border-collapse text-left text-sm">
            <caption class="sr-only">Mock announcement records</caption>
            <thead class="bg-[#f7f9fc] text-xs uppercase tracking-wide text-[#60718e]"><tr>
              <th scope="col" class="px-5 py-3 font-bold">Announcement</th><th scope="col" class="px-4 py-3 font-bold">Destination</th><th scope="col" class="px-4 py-3 font-bold">Status</th><th scope="col" class="px-4 py-3 font-bold">Order</th><th scope="col" class="px-5 py-3 text-right font-bold">Actions</th>
            </tr></thead>
            <tbody class="divide-y divide-[#e8edf3]">
              <tr v-for="(item, index) in sortedAnnouncements" :key="item.id" class="hover:bg-[#fbfcfe]">
                <td class="max-w-[340px] px-5 py-4 font-semibold leading-6 text-[#344b70]">{{ item.text }}</td>
                <td class="max-w-[230px] px-4 py-4"><span class="inline-flex items-center gap-1.5 break-all text-[#43566f]"><ExternalLink v-if="item.destinationType === 'external'" :size="14" aria-hidden="true" /><span>{{ destinationLabel(item) }}</span></span></td>
                <td class="px-4 py-4"><span class="rounded-full px-2.5 py-1 text-xs font-bold" :class="item.status === 'published' ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-700'">{{ item.status === 'published' ? 'Published' : 'Draft' }}</span></td>
                <td class="px-4 py-4 font-semibold text-[#43566f]">{{ item.displayOrder }}</td>
                <td class="px-5 py-4"><div class="flex items-center justify-end gap-1.5">
                  <button type="button" :disabled="index === 0" class="grid h-9 w-9 place-items-center rounded-lg border border-[#dce5ef] text-[#43566f] hover:bg-[#edf3ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#294e9e] disabled:cursor-not-allowed disabled:opacity-40" :aria-label="`Move ${item.text} earlier`" @click="moveAnnouncement(item, -1)"><ArrowUp :size="16" aria-hidden="true" /></button>
                  <button type="button" :disabled="index === sortedAnnouncements.length - 1" class="grid h-9 w-9 place-items-center rounded-lg border border-[#dce5ef] text-[#43566f] hover:bg-[#edf3ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#294e9e] disabled:cursor-not-allowed disabled:opacity-40" :aria-label="`Move ${item.text} later`" @click="moveAnnouncement(item, 1)"><ArrowDown :size="16" aria-hidden="true" /></button>
                  <button type="button" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[#cbd7e4] px-2.5 text-xs font-bold text-[#294e9e] hover:bg-[#edf3ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#294e9e]" @click="openForm(item)"><Pencil :size="14" aria-hidden="true" />Edit</button>
                  <button type="button" class="inline-flex min-h-9 items-center rounded-lg bg-[#edf3ff] px-2.5 text-xs font-bold text-[#294e9e] hover:bg-[#dce8fa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#294e9e]" @click="toggleStatus(item)">{{ item.status === 'published' ? 'Unpublish' : 'Publish' }}</button>
                  <button type="button" class="grid h-9 w-9 place-items-center rounded-lg border border-red-200 text-red-700 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600" :aria-label="`Delete ${item.text}`" @click="askDelete(item)"><Trash2 :size="15" aria-hidden="true" /></button>
                </div></td>
              </tr>
            </tbody>
          </table>
        </div>

        <ul class="divide-y divide-[#e8edf3] md:hidden">
          <li v-for="(item, index) in sortedAnnouncements" :key="item.id" class="space-y-3 p-4">
            <div class="flex flex-wrap items-start justify-between gap-2"><p class="min-w-0 flex-1 font-semibold leading-6 text-[#344b70]">{{ item.text }}</p><span class="rounded-full px-2.5 py-1 text-xs font-bold" :class="item.status === 'published' ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-700'">{{ item.status === 'published' ? 'Published' : 'Draft' }}</span></div>
            <dl class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm"><dt class="text-[#718198]">Destination</dt><dd class="break-all font-medium text-[#43566f]">{{ destinationLabel(item) }}</dd><dt class="text-[#718198]">Display order</dt><dd class="font-medium text-[#43566f]">{{ item.displayOrder }}</dd></dl>
            <div class="flex flex-wrap gap-2">
              <button type="button" :disabled="index === 0" class="inline-flex min-h-9 items-center gap-1 rounded-lg border border-[#dce5ef] px-2.5 text-xs font-bold text-[#43566f] hover:bg-[#edf3ff] disabled:opacity-40" @click="moveAnnouncement(item, -1)"><ArrowUp :size="14" aria-hidden="true" />Move up</button>
              <button type="button" :disabled="index === sortedAnnouncements.length - 1" class="inline-flex min-h-9 items-center gap-1 rounded-lg border border-[#dce5ef] px-2.5 text-xs font-bold text-[#43566f] hover:bg-[#edf3ff] disabled:opacity-40" @click="moveAnnouncement(item, 1)"><ArrowDown :size="14" aria-hidden="true" />Move down</button>
              <button type="button" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[#cbd7e4] px-2.5 text-xs font-bold text-[#294e9e] hover:bg-[#edf3ff]" @click="openForm(item)"><Pencil :size="14" aria-hidden="true" />Edit</button>
              <button type="button" class="inline-flex min-h-9 items-center rounded-lg bg-[#edf3ff] px-2.5 text-xs font-bold text-[#294e9e] hover:bg-[#dce8fa]" @click="toggleStatus(item)">{{ item.status === 'published' ? 'Unpublish' : 'Publish' }}</button>
              <button type="button" class="inline-flex min-h-9 items-center gap-1 rounded-lg border border-red-200 px-2.5 text-xs font-bold text-red-700 hover:bg-red-50" @click="askDelete(item)"><Trash2 :size="14" aria-hidden="true" />Delete</button>
            </div>
          </li>
        </ul>
      </div>

      <div v-else class="px-5 py-14 text-center">
        <Megaphone class="mx-auto mb-4 text-[#a6b5c8]" :size="42" aria-hidden="true" />
        <h3 class="text-lg font-bold text-[#344b70]">No announcements yet</h3>
        <p class="mt-2 text-sm text-[#718198]">Create a mock announcement to add it to this list.</p>
        <button type="button" class="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#294e9e] px-4 text-sm font-bold text-white hover:bg-[#173f8e]" @click="openForm()"><Plus :size="16" aria-hidden="true" />Create announcement</button>
      </div>
    </section>

    <dialog v-if="formOpen" ref="formDialog" class="m-auto max-h-[92dvh] w-[calc(100%-24px)] max-w-2xl overflow-y-auto rounded-2xl border border-[#dce5ef] bg-white p-0 text-[#18283f] shadow-2xl backdrop:bg-[#0c1828]/60 backdrop:backdrop-blur-sm" aria-labelledby="announcement-form-title" @cancel="cancelForm">
      <form class="space-y-5 p-5 sm:p-7" @submit.prevent="saveAnnouncement">
        <header class="flex items-start justify-between gap-4">
          <div><p class="text-xs font-bold uppercase tracking-wider text-[#a77d31]">Mock data editor</p><h2 id="announcement-form-title" class="mt-1 text-xl font-bold text-[#173f8e]">{{ editing ? "Edit announcement" : "Create announcement" }}</h2></div>
          <button type="button" class="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[#60718e] hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#294e9e]" aria-label="Close announcement form" @click="closeForm"><X :size="19" aria-hidden="true" /></button>
        </header>

        <label for="announcement-text" class="grid gap-2 text-sm font-semibold text-[#344b70]">Announcement text
          <textarea id="announcement-text" v-model="form.text" rows="3" maxlength="180" required class="w-full resize-y rounded-lg border border-[#cbd7e4] px-3 py-2.5 text-sm font-normal text-[#18283f] outline-none focus:border-[#294e9e] focus:ring-4 focus:ring-[#294e9e]/10" :aria-invalid="Boolean(formErrors.text)" aria-describedby="announcement-text-hint announcement-text-error"></textarea>
          <span id="announcement-text-hint" class="text-xs font-normal text-[#718198]">Up to 180 characters. {{ form.text.length }}/180</span>
          <span v-if="formErrors.text" id="announcement-text-error" class="text-xs font-semibold text-red-700" role="alert">{{ formErrors.text }}</span>
        </label>

        <div class="grid gap-4 sm:grid-cols-2">
          <label for="destination-type" class="grid content-start gap-2 text-sm font-semibold text-[#344b70]">Destination type
            <select id="destination-type" v-model="form.destinationType" class="min-h-11 rounded-lg border border-[#cbd7e4] bg-white px-3 text-sm font-normal text-[#18283f] outline-none focus:border-[#294e9e] focus:ring-4 focus:ring-[#294e9e]/10">
              <option value="internal">Internal page</option><option value="external">External URL</option>
            </select>
          </label>
          <label v-if="form.destinationType === 'internal'" for="announcement-destination" class="grid content-start gap-2 text-sm font-semibold text-[#344b70]">Internal destination
            <select id="announcement-destination" v-model="form.destination" class="min-h-11 rounded-lg border border-[#cbd7e4] bg-white px-3 text-sm font-normal text-[#18283f] outline-none focus:border-[#294e9e] focus:ring-4 focus:ring-[#294e9e]/10"><option v-for="item in destinations" :key="item.value" :value="item.value">{{ item.label }} · {{ item.value }}</option></select>
            <span v-if="formErrors.destination" class="text-xs font-semibold text-red-700" role="alert">{{ formErrors.destination }}</span>
          </label>
          <label v-else for="announcement-external-url" class="grid content-start gap-2 text-sm font-semibold text-[#344b70]">External URL
            <input id="announcement-external-url" v-model="form.externalUrl" type="url" placeholder="https://example.com/page" class="min-h-11 rounded-lg border border-[#cbd7e4] px-3 text-sm font-normal text-[#18283f] outline-none placeholder:text-[#9aa8bb] focus:border-[#294e9e] focus:ring-4 focus:ring-[#294e9e]/10" :aria-invalid="Boolean(formErrors.externalUrl)" aria-describedby="announcement-url-error" />
            <span v-if="formErrors.externalUrl" id="announcement-url-error" class="text-xs font-semibold text-red-700" role="alert">{{ formErrors.externalUrl }}</span>
          </label>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <label for="announcement-status" class="grid content-start gap-2 text-sm font-semibold text-[#344b70]">Publication status
            <select id="announcement-status" v-model="form.status" class="min-h-11 rounded-lg border border-[#cbd7e4] bg-white px-3 text-sm font-normal text-[#18283f] outline-none focus:border-[#294e9e] focus:ring-4 focus:ring-[#294e9e]/10"><option value="draft">Draft</option><option value="published">Published</option></select>
          </label>
          <label for="announcement-order" class="grid content-start gap-2 text-sm font-semibold text-[#344b70]">Display order
            <input id="announcement-order" v-model="form.displayOrder" type="number" min="1" step="1" required class="min-h-11 rounded-lg border border-[#cbd7e4] px-3 text-sm font-normal text-[#18283f] outline-none focus:border-[#294e9e] focus:ring-4 focus:ring-[#294e9e]/10" :aria-invalid="Boolean(formErrors.displayOrder)" aria-describedby="announcement-order-error" />
            <span v-if="formErrors.displayOrder" id="announcement-order-error" class="text-xs font-semibold text-red-700" role="alert">{{ formErrors.displayOrder }}</span>
          </label>
        </div>

        <footer class="flex flex-col-reverse gap-2 border-t border-[#e5eaf0] pt-4 sm:flex-row sm:justify-end">
          <button type="button" class="min-h-11 rounded-lg border border-[#cbd7e4] px-4 text-sm font-bold text-[#43566f] hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#294e9e]" @click="closeForm">Cancel</button>
          <button type="submit" class="min-h-11 rounded-lg bg-[#294e9e] px-4 text-sm font-bold text-white hover:bg-[#173f8e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9b33d]">{{ editing ? "Save changes" : "Create announcement" }}</button>
        </footer>
      </form>
    </dialog>

    <ConfirmDialog :open="confirmDeleteOpen" title="Delete announcement" :message="`Delete this mock announcement? ${selectedForDelete?.text || ''}`" confirm-label="Delete announcement" danger @confirm="deleteAnnouncement" @cancel="confirmDeleteOpen = false; selectedForDelete = null" />
    <ToastNotification v-if="toast" type="success" :message="toast.message" @close="toast = null" />
  </section>
</template>
