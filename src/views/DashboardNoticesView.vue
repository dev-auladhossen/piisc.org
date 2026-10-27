<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import {
  Megaphone,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  Eye,
  Send,
  CheckCircle2,
  CircleAlert,
  TriangleAlert,
  Info,
  X,
} from "lucide-vue-next";
import ConfirmDialog from "../components/users/ConfirmDialog.vue";
import NoticeFormDialog from "../components/notices/NoticeFormDialog.vue";
import { noticeCategories, categoryLabel } from "../data/noticeCategories.js";
import {
  deleteNotice,
  listManageNotices,
  noticeErrorKind,
  updateNotice,
} from "../services/noticeAdminApi.js";
import { useI18n } from "../composables/useI18n.js";

const PAGE_SIZE = 20;
const { tr, language } = useI18n();
const heading = ref(null);
const category = ref("");
const visibility = ref("");
const page = ref(1);
const totalPages = ref(1);
const notices = ref([]);
const loading = ref(false);
const errorKind = ref("");
const toast = ref(null);
const activeDialog = ref("");
const selected = ref(null);
const dialogError = ref("");
const actionLoading = ref(false);
let requestCounter = 0;
let controller = null;
let toastTimer;
let focusReturn = null;

const pages = computed(() => Math.max(1, totalPages.value || 1));
const queryForPage = (value) => ({
  category: category.value,
  isPublished: visibility.value === "" ? "" : visibility.value === "true",
  page: value,
  limit: PAGE_SIZE,
});
function errorMessage(kind) {
  return kind === "forbidden"
    ? "You do not have permission to do this."
    : kind === "notfound"
      ? "This notice no longer exists."
      : kind === "validation"
        ? "Please check the details and try again."
        : kind === "too_large"
          ? "This notice is too large. Please shorten the content."
          : kind === "rate_limited"
            ? "Too many attempts. Please wait a few minutes and try again."
            : kind === "network"
              ? "Cannot reach the server. Check your connection and try again."
              : "Something went wrong. Please try again.";
}
async function fetchNotices() {
  const request = ++requestCounter;
  controller?.abort();
  const current = new AbortController();
  controller = current;
  loading.value = true;
  errorKind.value = "";
  try {
    const responseData = await listManageNotices(
      queryForPage(page.value),
      current.signal,
    );
    if (request !== requestCounter) return;
    // Accept the common API envelope as well as the public-list response
    // shape. Some endpoints return pagination beside `notices` instead of
    // inside a `pagination` object.
    const data =
      responseData?.data && !Array.isArray(responseData.notices)
        ? responseData.data
        : responseData;
    const rows = Array.isArray(data) ? data : data?.notices;
    if (!Array.isArray(rows)) throw new Error("Invalid notice list response");
    const reportedPages = Number(
      data?.pagination?.totalPages ?? data?.totalPages,
    );
    const reportedTotal = Number(data?.pagination?.total ?? data?.total);
    const lastPage =
      Number.isInteger(reportedPages) && reportedPages >= 0
        ? Math.max(1, reportedPages)
        : Number.isFinite(reportedTotal) && reportedTotal >= 0
          ? Math.max(1, Math.ceil(reportedTotal / PAGE_SIZE))
          : 1;
    if (page.value > lastPage) {
      page.value = lastPage;
      return;
    }
    notices.value = rows;
    totalPages.value = lastPage;
  } catch (failure) {
    if (request !== requestCounter) return;
    const kind = noticeErrorKind(failure);
    if (kind !== "aborted") errorKind.value = kind;
  } finally {
    if (request === requestCounter) loading.value = false;
  }
}
watch(
  [category, visibility],
  () => {
    page.value = 1;
  },
  { flush: "sync" },
);
watch([category, visibility, page], fetchNotices, { immediate: true });
function notify(message, type = "success") {
  clearTimeout(toastTimer);
  toast.value = { message, type, id: Date.now() };
  toastTimer = setTimeout(() => dismissToast(), 4200);
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
function openDialog(kind, notice = null, trigger = null) {
  focusReturn = trigger || document.activeElement;
  selected.value = notice;
  dialogError.value = "";
  actionLoading.value = false;
  activeDialog.value = kind;
}
function closeDialog() {
  activeDialog.value = "";
  selected.value = null;
  dialogError.value = "";
  actionLoading.value = false;
  requestAnimationFrame(() => {
    if (focusReturn?.isConnected) focusReturn.focus({ preventScroll: true });
    else heading.value?.focus({ preventScroll: true });
    focusReturn = null;
  });
}
function startCreate(event) {
  openDialog("form-create", null, event.currentTarget);
}
function startEdit(item, event) {
  openDialog("form-edit", item, event.currentTarget);
}
function startDelete(item, event) {
  openDialog("delete", item, event.currentTarget);
}
function noticeFrom(response) {
  return response?.notice || response;
}
function onFormSaved(payload) {
  const creating = activeDialog.value === "form-create";
  const saved = noticeFrom(payload);
  closeDialog();
  if (creating) {
    page.value = 1;
    fetchNotices();
    notify("Notice created successfully.");
  } else if (saved?._id) {
    notices.value = notices.value.map((item) =>
      item._id === saved._id
        ? { ...item, ...saved, createdBy: saved.createdBy ?? item.createdBy }
        : item,
    );
    notify("Notice updated successfully.");
  }
}
function onNotFound() {
  notify("This notice no longer exists.", "warning");
  fetchNotices();
}
function validDate(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  const date = new Date(
    /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00` : value,
  );
  return Number.isNaN(date.getTime()) ? null : date;
}
function statusOf(item) {
  if (item.isPublished === false) return "Draft";
  const now = Date.now();
  const expiry = validDate(item.expiryDate);
  if (expiry && expiry.getTime() <= now) return "Expired";
  const publish = validDate(item.publishDate);
  if (publish && publish.getTime() > now) return "Scheduled";
  return "Live";
}
function formatDate(value) {
  const date = validDate(value);
  if (!date) return value ? tr("Date unavailable") : "—";
  return new Intl.DateTimeFormat(language.value === "bn" ? "bn-BD" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
function statusClass(status) {
  return status === "Live"
    ? "bg-emerald-50 text-emerald-800 ring-emerald-700/20"
    : status === "Draft"
      ? "bg-slate-100 text-slate-700 ring-slate-600/20"
      : status === "Expired"
        ? "bg-rose-50 text-rose-800 ring-rose-700/20"
        : "bg-amber-50 text-amber-900 ring-amber-700/20";
}
function titleShort(title) {
  return typeof title === "string" ? title : "";
}
async function togglePublish(item) {
  try {
    const response = await updateNotice(item._id, {
      isPublished: item.isPublished === false,
    });
    const saved = noticeFrom(response);
    notices.value = notices.value.map((row) =>
      row._id === item._id
        ? { ...row, ...saved, createdBy: saved?.createdBy ?? row.createdBy }
        : row,
    );
    notify(
      item.isPublished === false
        ? "Notice published successfully."
        : "Notice unpublished successfully.",
      item.isPublished === false ? "success" : "info",
    );
  } catch (failure) {
    const kind = noticeErrorKind(failure);
    notify(errorMessage(kind), "error");
    if (kind === "notfound") fetchNotices();
  }
}
async function confirmDelete() {
  if (actionLoading.value || !selected.value) return;
  actionLoading.value = true;
  dialogError.value = "";
  try {
    await deleteNotice(selected.value._id);
    const wasOnlyRow = notices.value.length === 1;
    const oldPage = page.value;
    closeDialog();
    notify("Notice deleted successfully.", "delete");
    if (wasOnlyRow && oldPage > 1) page.value = oldPage - 1;
    else fetchNotices();
  } catch (failure) {
    const kind = noticeErrorKind(failure);
    dialogError.value = errorMessage(kind);
    notify(errorMessage(kind), "error");
    if (kind === "notfound") {
      notify("This notice no longer exists.", "warning");
      fetchNotices();
    }
  } finally {
    actionLoading.value = false;
  }
}
const confirmMessage = computed(
  () => `${tr("Delete this notice?")} ${selected.value?.title || ""}`,
);
const resultStart = computed(() =>
  notices.value.length ? (page.value - 1) * PAGE_SIZE + 1 : 0,
);
const resultEnd = computed(
  () => (page.value - 1) * PAGE_SIZE + notices.value.length,
);
const resultSummary = computed(() =>
  tr("Showing X–Y on page P of T")
    .replace("X", tr(resultStart.value))
    .replace("Y", tr(resultEnd.value))
    .replace("P", tr(page.value))
    .replace("T", tr(totalPages.value)),
);
function ariaAction(action, item) {
  return `${tr(action)}: ${item.title}`;
}
onBeforeUnmount(() => {
  requestCounter++;
  controller?.abort();
  clearTimeout(toastTimer);
  focusReturn = null;
});
</script>

<template>
  <section class="min-w-0" aria-labelledby="notices-heading">
    <header class="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1
        id="notices-heading"
        ref="heading"
        tabindex="-1"
        class="text-2xl font-bold text-[#173f8e] sm:text-[28px]"
      >
        {{ tr("Notices") }}
      </h1>
      <button
        type="button"
        class="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#294e9e] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#173f8e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#294e9e] focus-visible:ring-offset-2"
        @click="startCreate"
      >
        <Plus :size="17" aria-hidden="true" />{{ tr("Create notice") }}
      </button>
    </header>
    <div class="mb-5 grid min-w-0 gap-4 sm:grid-cols-2">
      <div>
        <label
          for="notice-category-filter"
          class="mb-1.5 block text-sm font-medium text-slate-700"
          >{{ tr("Filter by category") }}</label
        ><select
          id="notice-category-filter"
          v-model="category"
          class="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm"
        >
          <option value="">{{ tr("All categories") }}</option>
          <option
            v-for="item in noticeCategories"
            :key="item.value"
            :value="item.value"
          >
            {{ language === "bn" ? item.bn : item.en }}
          </option>
        </select>
      </div>
      <div>
        <label
          for="notice-visibility-filter"
          class="mb-1.5 block text-sm font-medium text-slate-700"
          >{{ tr("Filter by visibility") }}</label
        ><select
          id="notice-visibility-filter"
          v-model="visibility"
          class="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm"
        >
          <option value="">{{ tr("All") }}</option>
          <option value="true">{{ tr("Published") }}</option>
          <option value="false">{{ tr("Drafts") }}</option>
        </select>
      </div>
    </div>
    <p class="sr-only" aria-live="polite" aria-atomic="true">
      {{ resultSummary }}
    </p>
    <div
      v-if="errorKind"
      role="alert"
      class="rounded-xl border border-red-200 bg-white p-6 text-center text-sm text-red-800"
    >
      <p>{{ tr(errorMessage(errorKind)) }}</p>
      <button
        type="button"
        class="mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#294e9e] px-4 font-semibold text-white hover:bg-[#173f8e]"
        @click="fetchNotices"
      >
        <RefreshCw :size="16" aria-hidden="true" />{{ tr("Retry") }}
      </button>
    </div>
    <div v-else>
      <p
        v-if="loading && !notices.length"
        role="status"
        class="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600"
      >
        {{ tr("Loading notices…") }}
      </p>

      <p
        v-else-if="!loading && !notices.length"
        class="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600"
      >
        {{ tr("No notices found.") }}
      </p>
      <div
        v-if="notices.length"
        class="hidden overflow-hidden rounded-xl border border-slate-200 bg-white md:block"
        :aria-busy="loading"
      >
        <div class="overflow-x-auto">
          <table class="w-full table-fixed text-left text-sm">
            <caption class="sr-only">
              {{
                tr("Admin notices")
              }}
            </caption>
            <thead
              class="bg-slate-50 text-xs uppercase tracking-wide text-slate-600"
            >
              <tr>
                <th scope="col" class="w-[23%] px-4 py-3">
                  {{ tr("Title") }}
                </th>
                <th scope="col" class="px-3 py-3">{{ tr("Category") }}</th>
                <th scope="col" class="px-3 py-3">{{ tr("Status") }}</th>
                <th scope="col" class="px-3 py-3">
                  {{ tr("Publish date") }}
                </th>
                <th scope="col" class="px-3 py-3">{{ tr("Expiry") }}</th>
                <th scope="col" class="px-3 py-3">{{ tr("Created by") }}</th>
                <th scope="col" class="px-4 py-3">{{ tr("Actions") }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="item in notices" :key="item._id" class="align-top">
                <td class="px-4 py-4">
                  <p
                    class="truncate font-semibold text-slate-900"
                    :title="titleShort(item.title)"
                  >
                    {{ item.title }}
                  </p>
                  <span
                    v-if="item.isImportant"
                    class="mt-1 inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-900"
                    >{{ tr("Important") }}</span
                  >
                </td>
                <td class="px-3 py-4">
                  {{ categoryLabel(item.category, language) }}
                </td>
                <td class="px-3 py-4">
                  <span
                    class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset"
                    :class="statusClass(statusOf(item))"
                    >{{ tr(statusOf(item)) }}</span
                  >
                </td>
                <td class="px-3 py-4 text-slate-600">
                  {{ formatDate(item.publishDate) }}
                </td>
                <td class="px-3 py-4 text-slate-600">
                  {{ formatDate(item.expiryDate) }}
                </td>
                <td class="px-3 py-4 text-slate-600">
                  {{ item.createdBy?.name || "—" }}
                </td>
                <td class="px-4 py-3">
                  <div class="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      class="rounded-md p-2 text-slate-700 hover:bg-slate-100"
                      :aria-label="ariaAction('Edit', item)"
                      @click="startEdit(item, $event)"
                    >
                      <Pencil :size="16" aria-hidden="true" /></button
                    ><button
                      type="button"
                      class="rounded-md p-2 text-slate-700 hover:bg-slate-100"
                      :aria-label="
                        ariaAction(
                          item.isPublished === false ? 'Publish' : 'Unpublish',
                          item,
                        )
                      "
                      @click="togglePublish(item)"
                    >
                      <Send :size="16" aria-hidden="true" /></button
                    ><RouterLink
                      v-if="statusOf(item) === 'Live'"
                      :to="`/notices/${item._id}`"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="rounded-md p-2 text-slate-700 hover:bg-slate-100"
                      :aria-label="ariaAction('View', item)"
                      ><Eye :size="16" aria-hidden="true" /></RouterLink
                    ><button
                      type="button"
                      class="rounded-md p-2 text-red-700 hover:bg-red-50"
                      :aria-label="ariaAction('Delete', item)"
                      @click="startDelete(item, $event)"
                    >
                      <Trash2 :size="16" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        v-if="notices.length"
        class="space-y-3 md:hidden"
        :aria-busy="loading"
      >
        <article
          v-for="item in notices"
          :key="item._id"
          class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div class="flex items-start justify-between gap-3">
            <h2
              class="min-w-0 truncate font-semibold text-slate-900"
              :title="titleShort(item.title)"
            >
              {{ item.title }}
            </h2>
            <span
              class="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset"
              :class="statusClass(statusOf(item))"
              >{{ tr(statusOf(item)) }}</span
            >
          </div>
          <span
            v-if="item.isImportant"
            class="mt-2 inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-900"
            >{{ tr("Important") }}</span
          >
          <dl class="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
            <div>
              <dt class="font-semibold text-slate-500">
                {{ tr("Category") }}
              </dt>
              <dd class="mt-0.5 text-slate-800">
                {{ categoryLabel(item.category, language) }}
              </dd>
            </div>
            <div>
              <dt class="font-semibold text-slate-500">
                {{ tr("Publish date") }}
              </dt>
              <dd class="mt-0.5 text-slate-800">
                {{ formatDate(item.publishDate) }}
              </dd>
            </div>
            <div>
              <dt class="font-semibold text-slate-500">{{ tr("Expiry") }}</dt>
              <dd class="mt-0.5 text-slate-800">
                {{ formatDate(item.expiryDate) }}
              </dd>
            </div>
            <div>
              <dt class="font-semibold text-slate-500">
                {{ tr("Created by") }}
              </dt>
              <dd class="mt-0.5 text-slate-800">
                {{ item.createdBy?.name || "—" }}
              </dd>
            </div>
          </dl>
          <div class="mt-3 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
            <button
              type="button"
              class="inline-flex min-h-9 items-center gap-1 rounded-md bg-slate-100 px-2.5 text-xs font-semibold"
              :aria-label="ariaAction('Edit', item)"
              @click="startEdit(item, $event)"
            >
              <Pencil :size="14" aria-hidden="true" />{{ tr("Edit") }}</button
            ><button
              type="button"
              class="inline-flex min-h-9 items-center gap-1 rounded-md bg-slate-100 px-2.5 text-xs font-semibold"
              :aria-label="
                ariaAction(
                  item.isPublished === false ? 'Publish' : 'Unpublish',
                  item,
                )
              "
              @click="togglePublish(item)"
            >
              <Send :size="14" aria-hidden="true" />{{
                tr(item.isPublished === false ? "Publish" : "Unpublish")
              }}</button
            ><RouterLink
              v-if="statusOf(item) === 'Live'"
              :to="`/notices/${item._id}`"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-9 items-center gap-1 rounded-md bg-slate-100 px-2.5 text-xs font-semibold"
              :aria-label="ariaAction('View', item)"
              ><Eye :size="14" aria-hidden="true" />{{ tr("View") }}</RouterLink
            ><button
              type="button"
              class="inline-flex min-h-9 items-center gap-1 rounded-md bg-red-50 px-2.5 text-xs font-semibold text-red-800"
              :aria-label="ariaAction('Delete', item)"
              @click="startDelete(item, $event)"
            >
              <Trash2 :size="14" aria-hidden="true" />{{ tr("Delete") }}
            </button>
          </div>
        </article>
      </div>

      <nav
        v-if="!errorKind && totalPages > 1"
        class="mt-5 flex flex-wrap items-center justify-center gap-3"
        :aria-label="tr('Notice pages')"
      >
        <button
          type="button"
          :disabled="loading || page <= 1"
          class="min-h-10 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold disabled:opacity-50"
          @click="page--"
        >
          {{ tr("Previous") }}</button
        ><span class="text-sm text-slate-600"
          >{{ tr("Page") }} {{ tr(page) }} / {{ tr(totalPages) }}</span
        ><button
          type="button"
          :disabled="loading || page >= totalPages"
          class="min-h-10 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold disabled:opacity-50"
          @click="page++"
        >
          {{ tr("Next") }}
        </button>
      </nav>
    </div>
    <NoticeFormDialog
      :open="activeDialog === 'form-create' || activeDialog === 'form-edit'"
      :mode="activeDialog === 'form-create' ? 'create' : 'edit'"
      :notice="selected"
      @saved="onFormSaved"
      @failed="notify($event, 'error')"
      @cancel="closeDialog"
      @notfound="onNotFound"
    />
    <ConfirmDialog
      :open="activeDialog === 'delete'"
      :title="'Delete notice'"
      :message="confirmMessage"
      :confirm-label="'Delete'"
      danger
      :loading="actionLoading"
      :error="dialogError"
      @confirm="confirmDelete"
      @cancel="closeDialog"
    />
    <Teleport to="body">
      <Transition name="notice-toast">
        <div
          v-if="toast"
          :key="toast.id"
          class="notice-toast fixed inset-x-4 bottom-4 z-[120] flex w-auto max-w-[390px] items-center gap-3 rounded-2xl border p-4 shadow-[0_16px_44px_rgba(23,58,106,0.2)] sm:inset-x-auto sm:bottom-7 sm:right-7 sm:w-[calc(100%-56px)]"
          :style="{ backgroundColor: toastColors(toast.type).surface, borderColor: toastColors(toast.type).border }"
          :role="toast.type === 'error' || toast.type === 'warning' ? 'alert' : 'status'"
          aria-live="polite"
          aria-atomic="true"
        >
          <span
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            :style="{ backgroundColor: toastColors(toast.type).iconBg, color: toastColors(toast.type).foreground }"
            aria-hidden="true"
          >
            <Trash2 v-if="toast.type === 'delete'" :size="18" />
            <CircleAlert v-else-if="toast.type === 'error'" :size="19" />
            <TriangleAlert v-else-if="toast.type === 'warning'" :size="19" />
            <Info v-else-if="toast.type === 'info'" :size="19" />
            <CheckCircle2 v-else :size="19" />
          </span>
          <p
            class="min-w-0 flex-1 text-sm font-medium leading-5"
            :style="{ color: toastColors(toast.type).foreground }"
          >
            {{ tr(toast.message) }}
          </p>
          <button
            type="button"
            class="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#60718e] transition-colors hover:bg-[#edf3ff] hover:text-[#294e9e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#294e9e]"
            :aria-label="tr('Dismiss notification')"
            @click="dismissToast"
          >
            <X :size="17" aria-hidden="true" />
          </button>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.notice-toast-enter-active,
.notice-toast-leave-active {
  transition: opacity 220ms ease, transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.notice-toast-enter-from,
.notice-toast-leave-to {
  opacity: 0;
  transform: translate3d(0, 28px, 0) scale(0.98);
}
@media (prefers-reduced-motion: reduce) {
  .notice-toast-enter-active,
  .notice-toast-leave-active {
    transition: none;
  }
}
</style>
