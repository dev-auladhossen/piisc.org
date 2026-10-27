<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  ImagePlus,
  Images,
  Pencil,
  RefreshCw,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-vue-next";
import ConfirmDialog from "../components/users/ConfirmDialog.vue";
import GalleryFormDialog from "../components/gallery/GalleryFormDialog.vue";
import { useI18n } from "../composables/useI18n.js";
import {
  deleteGalleryItem,
  galleryErrorMessage,
  listGallery,
} from "../services/galleryAdminApi.js";

const PAGE_SIZE = 20;
const { tr, language } = useI18n();
const heading = ref(null);
const items = ref([]);
const page = ref(1);
const total = ref(0);
const totalPages = ref(1);
const loading = ref(false);
const error = ref("");
const formOpen = ref(false);
const formMode = ref("create");
const selected = ref(null);
const confirmOpen = ref(false);
const deleting = ref(false);
const deleteError = ref("");
const toast = ref(null);
let requestCounter = 0;
let controller = null;
let toastTimer;
let focusReturn = null;

const start = computed(() => (items.value.length ? (page.value - 1) * PAGE_SIZE + 1 : 0));
const end = computed(() => (page.value - 1) * PAGE_SIZE + items.value.length);
const confirmMessage = computed(() =>
  `${tr("Delete this gallery image?")} ${selected.value?.caption ? `“${selected.value.caption}”` : ""}`,
);

function notify(message, type = "success") {
  clearTimeout(toastTimer);
  toast.value = { message, type, id: Date.now() };
  toastTimer = setTimeout(dismissToast, 4500);
}
function dismissToast() {
  clearTimeout(toastTimer);
  toast.value = null;
}
function toastColors(type) {
  return type === "success"
    ? { surface: "#ecfdf3", border: "#a7f3d0", iconBg: "#d1fae5", foreground: "#166534" }
    : type === "delete" || type === "error"
      ? { surface: "#fff1f2", border: "#fecdd3", iconBg: "#ffe4e6", foreground: "#9f1239" }
      : type === "warning"
        ? { surface: "#fffbeb", border: "#fde68a", iconBg: "#fef3c7", foreground: "#92400e" }
        : { surface: "#eff6ff", border: "#bfdbfe", iconBg: "#dbeafe", foreground: "#1e40af" };
}
async function fetchGallery() {
  const request = ++requestCounter;
  controller?.abort();
  const current = new AbortController();
  controller = current;
  loading.value = true;
  error.value = "";
  try {
    const data = await listGallery({ page: page.value, limit: PAGE_SIZE }, current.signal);
    if (request !== requestCounter) return;
    if (!Array.isArray(data?.items) || !data?.pagination) {
      throw new Error("Invalid gallery list response");
    }
    const lastPage = Math.max(1, Number(data.pagination.totalPages) || 1);
    if (page.value > lastPage) {
      page.value = lastPage;
      return;
    }
    items.value = data.items;
    total.value = Number(data.pagination.total) || 0;
    totalPages.value = lastPage;
  } catch (failure) {
    if (request !== requestCounter) return;
    if (failure?.code !== "ERR_CANCELED") error.value = galleryErrorMessage(failure);
  } finally {
    if (request === requestCounter) loading.value = false;
  }
}
watch(page, fetchGallery);
onMounted(fetchGallery);
function openForm(mode = "create", item = null, event = null) {
  focusReturn = event?.currentTarget || document.activeElement;
  selected.value = item;
  formMode.value = mode;
  formOpen.value = true;
}
function closeForm() {
  formOpen.value = false;
  selected.value = null;
  restoreFocus();
}
function openDelete(item, event) {
  focusReturn = event.currentTarget;
  selected.value = item;
  deleteError.value = "";
  confirmOpen.value = true;
}
function closeDelete() {
  confirmOpen.value = false;
  selected.value = null;
  deleteError.value = "";
  deleting.value = false;
  restoreFocus();
}
function restoreFocus() {
  requestAnimationFrame(() => {
    if (focusReturn?.isConnected) focusReturn.focus({ preventScroll: true });
    else heading.value?.focus({ preventScroll: true });
    focusReturn = null;
  });
}
async function onSaved(response) {
  const mode = formMode.value;
  closeForm();
  if (mode === "create" && page.value !== 1) page.value = 1;
  else await fetchGallery();
  notify(
    mode === "create"
      ? "Gallery image added successfully."
      : mode === "replace"
        ? "Gallery image replaced successfully."
        : "Gallery details updated successfully.",
  );
}
async function onPartial(data) {
  closeForm();
  await fetchGallery();
  const asset = data.cleanupPublicId ? ` Asset for manual cleanup: ${data.cleanupPublicId}` : "";
  notify(`The new image was saved, but the previous image needs manual cleanup.${asset}`, "warning");
}
async function confirmDelete() {
  if (deleting.value || !selected.value) return;
  deleting.value = true;
  deleteError.value = "";
  const id = selected.value._id;
  try {
    await deleteGalleryItem(id);
    closeDelete();
    if (page.value > 1 && items.value.length === 1) page.value--;
    else await fetchGallery();
    notify("Gallery image deleted successfully.", "delete");
  } catch (failure) {
    if (failure?.response?.data?.code === "IMAGE_CLEANUP_FAILED") {
      closeDelete();
      if (page.value > 1 && items.value.length === 1) page.value--;
      else await fetchGallery();
      const cleanup = failure.response.data.cleanupPublicId;
      const asset = cleanup ? ` Asset for manual cleanup: ${cleanup}` : "";
      notify(`The gallery item was deleted, but its image needs manual cleanup.${asset}`, "warning");
      return;
    }
    deleteError.value = galleryErrorMessage(failure);
    notify(deleteError.value, "error");
  } finally {
    deleting.value = false;
  }
}
function dateLabel(value) {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(language.value === "bn" ? "bn-BD" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
function actionLabel(action, item) {
  return `${tr(action)}: ${item.caption}`;
}
onBeforeUnmount(() => {
  requestCounter++;
  controller?.abort();
  clearTimeout(toastTimer);
  focusReturn = null;
});
</script>

<template>
  <section class="min-w-0" aria-labelledby="gallery-admin-heading">
    <header class="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 id="gallery-admin-heading" ref="heading" tabindex="-1" class="text-2xl font-bold text-[#173f8e] sm:text-[28px]">
          {{ tr("Manage gallery") }}
        </h1>
        <p class="mt-1 text-sm text-[#60718e]">{{ tr("Upload and organize the images shown in the school gallery.") }}</p>
      </div>
      <button type="button" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#294e9e] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#173f8e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#294e9e] focus-visible:ring-offset-2" @click="openForm()">
        <ImagePlus :size="17" aria-hidden="true" />{{ tr("Add image") }}
      </button>
    </header>

    <div class="mb-4 flex min-h-7 flex-wrap items-center justify-between gap-3">
      <p class="text-sm text-[#60718e]" aria-live="polite">
        <template v-if="total">{{ tr("Showing") }} {{ tr(start) }}–{{ tr(end) }} {{ tr("of") }} {{ tr(total) }}</template>
      </p>
      <button type="button" :disabled="loading" class="inline-flex min-h-9 items-center gap-2 rounded-lg border border-[#c7d4e8] bg-white px-3 text-sm font-semibold text-[#294e9e] hover:bg-[#edf3ff] disabled:opacity-50" @click="fetchGallery">
        <RefreshCw :size="15" :class="loading ? 'animate-spin' : ''" aria-hidden="true" />{{ tr("Refresh") }}
      </button>
    </div>

    <div v-if="error" role="alert" class="rounded-xl border border-rose-200 bg-white p-6 text-center text-sm text-rose-800">
      <AlertCircle class="mx-auto mb-2" :size="22" aria-hidden="true" />
      <p>{{ tr(error) }}</p>
      <button type="button" class="mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#294e9e] px-4 font-semibold text-white hover:bg-[#173f8e]" @click="fetchGallery">
        <RefreshCw :size="15" aria-hidden="true" />{{ tr("Retry") }}
      </button>
    </div>
    <div v-else-if="loading && !items.length" role="status" class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      <div v-for="skeleton in 8" :key="skeleton" class="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div class="aspect-[4/3] animate-pulse bg-slate-100"></div>
        <div class="space-y-2 p-4"><div class="h-4 w-3/4 animate-pulse rounded bg-slate-100"></div><div class="h-3 w-1/2 animate-pulse rounded bg-slate-100"></div></div>
      </div>
      <span class="sr-only">{{ tr("Loading gallery") }}</span>
    </div>
    <div v-else-if="!items.length" class="rounded-xl border border-dashed border-[#c7d4e8] bg-white px-6 py-14 text-center">
      <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#edf3ff] text-[#294e9e]" aria-hidden="true"><Images :size="25" /></span>
      <h2 class="mt-4 text-lg font-semibold text-[#173f8e]">{{ tr("Your gallery is empty") }}</h2>
      <p class="mx-auto mt-1 max-w-md text-sm text-[#60718e]">{{ tr("Upload the first school image to start building the gallery.") }}</p>
      <button type="button" class="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#294e9e] px-4 text-sm font-semibold text-white hover:bg-[#173f8e]" @click="openForm()">
        <ImagePlus :size="16" aria-hidden="true" />{{ tr("Add first image") }}
      </button>
    </div>
    <div v-else :aria-busy="loading" class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      <article v-for="item in items" :key="item._id" class="group min-w-0 overflow-hidden rounded-xl border border-[#dce5f3] bg-white shadow-sm transition-shadow hover:shadow-md motion-reduce:transition-none">
        <div class="relative aspect-[4/3] overflow-hidden bg-[#f4f7fc]">
          <img :src="item.imageUrl" :alt="item.altText || item.caption || tr('Gallery image')" loading="lazy" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transition-none" />
          <span class="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-[#344b70] shadow-sm">{{ tr("Order") }} {{ tr(item.displayOrder) }}</span>
        </div>
        <div class="p-4">
          <h2 class="line-clamp-2 min-h-10 break-words text-sm font-semibold leading-5 text-[#173f8e]">{{ item.caption }}</h2>
          <p class="mt-1">
            <span class="inline-flex rounded-full bg-[#edf3ff] px-2 py-0.5 text-xs font-semibold text-[#294e9e]">
              {{ tr(item.category || "Uncategorized") }}
            </span>
          </p>
          <p class="mt-2 line-clamp-2 min-h-9 break-words text-xs leading-4 text-[#60718e]">
            <span class="font-semibold">{{ tr("Alt text") }}:</span>
            {{ item.altText || tr("Not provided") }}
          </p>
          <p class="mt-3 text-xs leading-5 text-slate-500">{{ tr("Added") }} {{ dateLabel(item.createdAt) }}<template v-if="item.updatedAt && item.updatedAt !== item.createdAt"><br />{{ tr("Updated") }} {{ dateLabel(item.updatedAt) }}</template></p>
          <div class="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3">
            <button type="button" class="inline-flex min-h-10 items-center justify-center gap-1 rounded-lg bg-[#edf3ff] px-2 text-xs font-semibold text-[#294e9e] hover:bg-[#dce8fc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#294e9e]" :aria-label="actionLabel('Edit details', item)" @click="openForm('edit', item, $event)">
              <Pencil :size="14" aria-hidden="true" />{{ tr("Edit") }}
            </button>
            <button type="button" class="inline-flex min-h-10 items-center justify-center gap-1 rounded-lg bg-[#edf3ff] px-2 text-xs font-semibold text-[#294e9e] hover:bg-[#dce8fc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#294e9e]" :aria-label="actionLabel('Replace image', item)" @click="openForm('replace', item, $event)">
              <RefreshCw :size="14" aria-hidden="true" />{{ tr("Replace") }}
            </button>
            <button type="button" class="inline-flex min-h-10 items-center justify-center gap-1 rounded-lg bg-rose-50 px-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500" :aria-label="actionLabel('Delete image', item)" @click="openDelete(item, $event)">
              <Trash2 :size="14" aria-hidden="true" />{{ tr("Delete") }}
            </button>
          </div>
        </div>
      </article>
    </div>

    <nav v-if="!error && totalPages > 1" class="mt-6 flex flex-wrap items-center justify-center gap-3" :aria-label="tr('Gallery pages')">
      <button type="button" :disabled="loading || page <= 1" class="inline-flex min-h-10 items-center gap-1 rounded-lg border border-[#c7d4e8] bg-white px-3 text-sm font-semibold text-[#294e9e] hover:bg-[#edf3ff] disabled:opacity-50" @click="page--"><ChevronLeft :size="16" aria-hidden="true" />{{ tr("Previous") }}</button>
      <span class="text-sm text-[#60718e]">{{ tr("Page") }} {{ tr(page) }} / {{ tr(totalPages) }}</span>
      <button type="button" :disabled="loading || page >= totalPages" class="inline-flex min-h-10 items-center gap-1 rounded-lg border border-[#c7d4e8] bg-white px-3 text-sm font-semibold text-[#294e9e] hover:bg-[#edf3ff] disabled:opacity-50" @click="page++">{{ tr("Next") }}<ChevronRight :size="16" aria-hidden="true" /></button>
    </nav>

    <GalleryFormDialog :open="formOpen" :mode="formMode" :item="selected" @saved="onSaved" @partial="onPartial" @cancel="closeForm" />
    <ConfirmDialog :open="confirmOpen" title="Delete gallery image" :message="confirmMessage" confirm-label="Delete" danger :loading="deleting" :error="deleteError" @confirm="confirmDelete" @cancel="closeDelete" />

    <Teleport to="body">
      <Transition name="gallery-toast">
        <div v-if="toast" :key="toast.id" class="gallery-toast fixed inset-x-4 bottom-4 z-[120] flex w-auto max-w-[430px] items-center gap-3 rounded-2xl border p-4 shadow-[0_16px_44px_rgba(23,58,106,0.2)] sm:inset-x-auto sm:bottom-7 sm:right-7 sm:w-[calc(100%-56px)]" :style="{ backgroundColor: toastColors(toast.type).surface, borderColor: toastColors(toast.type).border }" :role="toast.type === 'error' ? 'alert' : 'status'" aria-live="polite" aria-atomic="true">
          <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" :style="{ backgroundColor: toastColors(toast.type).iconBg, color: toastColors(toast.type).foreground }" aria-hidden="true">
            <Trash2 v-if="toast.type === 'delete'" :size="18" />
            <CircleAlert v-else-if="toast.type === 'error'" :size="19" />
            <TriangleAlert v-else-if="toast.type === 'warning'" :size="19" />
            <CheckCircle2 v-else :size="19" />
          </span>
          <p class="min-w-0 flex-1 break-words text-sm font-medium leading-5" :style="{ color: toastColors(toast.type).foreground }">{{ tr(toast.message) }}</p>
          <button type="button" class="-mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#60718e] hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#294e9e]" :aria-label="tr('Dismiss notification')" @click="dismissToast"><X :size="17" aria-hidden="true" /></button>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.gallery-toast-enter-active,
.gallery-toast-leave-active { transition: opacity 220ms ease, transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1); }
.gallery-toast-enter-from,
.gallery-toast-leave-to { opacity: 0; transform: translate3d(0, 28px, 0) scale(0.98); }
@media (prefers-reduced-motion: reduce) {
  .gallery-toast-enter-active,
  .gallery-toast-leave-active { transition: none; }
}
</style>
