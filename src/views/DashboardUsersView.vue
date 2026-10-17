<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth.js";
import { useI18n } from "../composables/useI18n.js";
import {
  listUsers,
  setUserStatus,
  resetUserPassword,
  userErrorKind,
} from "../services/userApi.js";
import { roleLabels } from "../data/roles.js";
import {
  KeyRound,
  Pencil,
  Plus,
  Search,
  UserCheck,
  UserX,
} from "lucide-vue-next";
import UserFormDialog from "../components/users/UserFormDialog.vue";
import ConfirmDialog from "../components/users/ConfirmDialog.vue";
import TempPasswordDialog from "../components/users/TempPasswordDialog.vue";

const PAGE_SIZE = 20;
const roleBadgeClasses = {
  admin: "bg-violet-50 text-violet-700 ring-violet-600/15",
  teacher: "bg-blue-50 text-blue-700 ring-blue-600/15",
  student: "bg-slate-100 text-slate-700 ring-slate-600/15",
  parent: "bg-amber-50 text-amber-800 ring-amber-600/20",
};
const actionBase =
  "inline-flex min-h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-2.5 text-xs font-semibold transition-colors duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#294e9e] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none motion-reduce:active:scale-100";
const auth = useAuthStore(),
  { tr, language } = useI18n();
const route = useRoute();
const heading = ref(null),
  search = ref(""),
  role = ref(""),
  status = ref(""),
  page = ref(1),
  users = ref([]),
  total = ref(0),
  totalPages = ref(0),
  loading = ref(false),
  errorKind = ref(""),
  activateError = ref(""),
  dialog = ref(""),
  selected = ref(null),
  dialogError = ref(""),
  actionLoading = ref(false),
  password = ref(""),
  passwordUser = ref(null),
  passwordReset = ref(false),
  announcement = ref("");
let debounceTimer,
  announcementTimer,
  requestCounter = 0,
  controller = null,
  focusReturn = null;
const visibleIdentifier = (u) => (u.role === "student" ? u.studentId : u.email);
const lastLogin = (u) => {
  if (!u.lastLogin) return "Never";
  const d = new Date(u.lastLogin);
  if (Number.isNaN(d.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat(language.value === "bn" ? "bn-BD" : "en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
};
const pages = computed(() => Math.max(1, totalPages.value || 1));
const actionError = (kind) =>
  kind === "forbidden"
    ? "You do not have permission to do this."
    : kind === "notfound"
      ? "This user no longer exists."
      : kind === "validation"
        ? "Please check the details and try again."
        : kind === "rate_limited"
          ? "Too many attempts. Please wait a few minutes and try again."
          : kind === "network"
            ? "Cannot reach the server. Check your connection and try again."
            : "Something went wrong. Please try again.";
async function fetchUsers() {
  const request = ++requestCounter;
  controller?.abort();
  controller = new AbortController();
  loading.value = true;
  errorKind.value = "";
  try {
    const data = await listUsers(
      {
        role: role.value,
        search: search.value.trim(),
        isActive: status.value === "" ? "" : status.value === "active",
        page: page.value,
        limit: PAGE_SIZE,
      },
      controller.signal,
    );
    if (request !== requestCounter) return;
    if (page.value > data.totalPages && data.totalPages > 0) {
      page.value = data.totalPages;
      return;
    }
    users.value = data.users || [];
    total.value = data.total || 0;
    totalPages.value = data.totalPages || 0;
    errorKind.value = "";
  } catch (e) {
    if (request !== requestCounter) return;
    const kind = userErrorKind(e);
    if (kind === "aborted") return;
    errorKind.value = kind;
  } finally {
    if (request === requestCounter) loading.value = false;
  }
}
function filtersChanged() {
  page.value = 1;
  fetchUsers();
}
watch(search, () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(filtersChanged, 400);
});
watch([role, status], filtersChanged);
watch(page, () => fetchUsers());
watch(
  () => route.fullPath,
  () => {
    if (dialog.value) closeDialog(false);
    else clearTemporaryPassword();
    focusReturn = null;
  },
);
onMounted(fetchUsers);
onBeforeUnmount(() => {
  requestCounter++;
  controller?.abort();
  clearTimeout(debounceTimer);
  clearTimeout(announcementTimer);
  clearTemporaryPassword();
  focusReturn = null;
});
function openDialog(kind, user = null, trigger = null) {
  dialog.value = kind;
  selected.value = user;
  dialogError.value = "";
  focusReturn = trigger || document.activeElement;
}
function clearTemporaryPassword() {
  password.value = "";
  passwordUser.value = null;
  passwordReset.value = false;
}
function closeDialog(restoreFocus = true) {
  dialog.value = "";
  actionLoading.value = false;
  selected.value = null;
  dialogError.value = "";
  clearTemporaryPassword();
  if (!restoreFocus) return;
  requestAnimationFrame(() => {
    if (focusReturn?.isConnected) focusReturn.focus({ preventScroll: true });
    else heading.value?.focus({ preventScroll: true });
    focusReturn = null;
  });
}
function announce(text) {
  announcement.value = text;
  clearTimeout(announcementTimer);
  announcementTimer = setTimeout(() => (announcement.value = ""), 4000);
}
function identifierFor(u) {
  return visibleIdentifier(u) || "";
}
async function onSaved(payload) {
  const created = dialog.value === "create";
  const edited = dialog.value === "edit";
  if (created) {
    closeDialog(false);
    await nextTick();
    password.value = payload.temporaryPassword || "";
    passwordUser.value = payload.user;
    passwordReset.value = false;
    dialog.value = "password";
    return;
  }
  closeDialog();
  if (edited) {
    const saved = payload.user;
    users.value = users.value.map((u) => (u._id === saved._id ? saved : u));
    announce("User updated.");
  }
}
async function passwordDone() {
  const reset = passwordReset.value;
  closeDialog();
  await nextTick();
  if (page.value === 1) fetchUsers();
  else page.value = 1;
  announce(reset ? "Password reset." : "User created.");
}
async function confirmAction() {
  if (actionLoading.value) return;
  actionLoading.value = true;
  dialogError.value = "";
  try {
    if (dialog.value === "deactivate") {
      const { user } = await setUserStatus(selected.value._id, false);
      users.value = users.value.map((u) => (u._id === user._id ? user : u));
      closeDialog();
      fetchUsers();
      announce("User deactivated.");
    } else if (dialog.value === "reset") {
      const result = await resetUserPassword(selected.value._id);
      const who = selected.value;
      closeDialog(false);
      await nextTick();
      password.value = result.temporaryPassword || "";
      passwordUser.value = { ...result.user, ...who };
      passwordReset.value = true;
      dialog.value = "password";
    }
  } catch (e) {
    const kind = userErrorKind(e);
    dialogError.value = actionError(kind);
  } finally {
    actionLoading.value = false;
  }
}
async function activate(user) {
  activateError.value = "";
  try {
    const { user: updated } = await setUserStatus(user._id, true);
    users.value = users.value.map((u) => (u._id === updated._id ? updated : u));
    announce("User activated.");
  } catch (e) {
    activateError.value = actionError(userErrorKind(e));
  }
}
function startCreate(e) {
  openDialog("create", null, e.currentTarget);
}
function startEdit(user, e) {
  openDialog("edit", user, e.currentTarget);
}
function confirmStatus(user, e) {
  openDialog("deactivate", user, e.currentTarget);
}
function confirmReset(user, e) {
  openDialog("reset", user, e.currentTarget);
}
function goPage(value) {
  if (value >= 1 && value <= pages.value) page.value = value;
}
const resultStart = computed(() =>
  total.value === 0 ? 0 : (page.value - 1) * PAGE_SIZE + 1,
);
const resultEnd = computed(() => Math.min(page.value * PAGE_SIZE, total.value));
const summaryText = computed(() =>
  tr("Showing X of Y users")
    .replace("X", String(tr(resultEnd.value - resultStart.value + 1)))
    .replace("Y", String(tr(total.value))),
);
</script>

<template>
  <section class="min-w-0" aria-labelledby="users-heading">
    <header class="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1
        id="users-heading"
        ref="heading"
        tabindex="-1"
        class="text-2xl font-bold text-[#173f8e] sm:text-[28px]"
      >
        {{ tr("Users") }}
      </h1>
      <button
        type="button"
        class="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#294e9e] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#173f8e] active:bg-[#102c65] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#294e9e] focus-visible:ring-offset-2 motion-reduce:transition-none"
        @click="startCreate"
      >
        <Plus :size="17" aria-hidden="true" />{{ tr("Create user") }}
      </button>
    </header>
    <div class="mb-5 grid min-w-0 gap-4 sm:grid-cols-3">
      <div class="min-w-0">
        <label
          for="users-search"
          class="mb-1.5 block text-sm font-medium text-slate-700"
          >{{ tr("Search users") }}</label
        >
        <div class="relative">
          <Search
            class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            :size="17"
            aria-hidden="true"
          /><input
            id="users-search"
            v-model="search"
            type="search"
            maxlength="50"
            class="min-h-11 w-full min-w-0 rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-3 text-base text-slate-800 shadow-sm transition-colors placeholder:text-slate-400 hover:border-slate-400 focus:border-[#294e9e] focus:outline-none focus:ring-2 focus:ring-[#294e9e]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#294e9e] focus-visible:ring-offset-1 motion-reduce:transition-none"
          />
        </div>
      </div>
      <div>
        <label
          for="users-role"
          class="mb-1.5 block text-sm font-medium text-slate-700"
          >{{ tr("Filter by role") }}</label
        ><select
          id="users-role"
          v-model="role"
          class="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-base text-slate-800 shadow-sm transition-colors hover:border-slate-400 focus:border-[#294e9e] focus:outline-none focus:ring-2 focus:ring-[#294e9e]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#294e9e] focus-visible:ring-offset-1 motion-reduce:transition-none"
        >
          <option value="">{{ tr("All") }}</option>
          <option
            v-for="r in ['admin', 'teacher', 'student', 'parent']"
            :key="r"
            :value="r"
          >
            {{ tr(roleLabels[r]) }}
          </option>
        </select>
      </div>
      <div>
        <label
          for="users-status"
          class="mb-1.5 block text-sm font-medium text-slate-700"
          >{{ tr("Filter by status") }}</label
        ><select
          id="users-status"
          v-model="status"
          class="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-base text-slate-800 shadow-sm transition-colors hover:border-slate-400 focus:border-[#294e9e] focus:outline-none focus:ring-2 focus:ring-[#294e9e]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#294e9e] focus-visible:ring-offset-1 motion-reduce:transition-none"
        >
          <option value="">{{ tr("All") }}</option>
          <option value="active">{{ tr("Active") }}</option>
          <option value="inactive">{{ tr("Inactive") }}</option>
        </select>
      </div>
    </div>
    <p class="sr-only" aria-live="polite">{{ summaryText }}</p>
    <p
      v-if="announcement"
      role="status"
      aria-live="polite"
      class="mb-4 rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-sm"
    >
      {{ tr(announcement) }}
    </p>
    <p
      v-if="activateError"
      role="alert"
      class="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800"
    >
      {{ tr(activateError) }}
    </p>
    <p v-if="loading" role="status" class="mb-3 text-sm text-slate-600">
      {{ tr("Loading users…") }}
    </p>
    <div
      v-if="errorKind"
      role="alert"
      class="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800"
    >
      <p>
        {{
          tr(
            errorKind === "forbidden"
              ? "You do not have permission to view users."
              : actionError(errorKind),
          )
        }}
      </p>
      <button
        type="button"
        class="mt-3 rounded-full border px-4 py-2 font-semibold"
        @click="fetchUsers"
      >
        {{ tr("Retry") }}
      </button>
    </div>
    <p
      v-else-if="!loading && !users.length"
      class="rounded-lg border border-slate-200 bg-white p-6 text-center"
    >
      {{ tr("No users found.") }}
    </p>
    <template v-else>
      <div
        class="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm md:block"
      >
        <table class="w-full min-w-[1180px] table-fixed text-left text-sm">
          <caption class="sr-only">
            {{
              tr("Users")
            }}
          </caption>
          <colgroup>
            <col class="w-[230px]" />
            <col class="w-[125px]" />
            <col class="w-[250px]" />
            <col class="w-[125px]" />
            <col class="w-[170px]" />
            <col class="w-[360px]" />
          </colgroup>
          <thead
            class="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600"
          >
            <tr>
              <th scope="col" class="px-4 py-3.5">{{ tr("Name") }}</th>
              <th scope="col" class="px-4 py-3.5">{{ tr("Role") }}</th>
              <th scope="col" class="px-4 py-3.5">{{ tr("Login ID") }}</th>
              <th scope="col" class="px-4 py-3.5">{{ tr("Status") }}</th>
              <th scope="col" class="px-4 py-3.5">{{ tr("Last login") }}</th>
              <th scope="col" class="px-4 py-3.5">{{ tr("Actions") }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="u in users"
              :key="u._id"
              class="align-middle transition-colors duration-150 hover:bg-slate-50/80 motion-reduce:transition-none"
            >
              <td class="px-4 py-4">
                <div
                  class="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1"
                >
                  <span class="break-words font-semibold text-slate-900">{{
                    u.name
                  }}</span
                  ><span
                    v-if="u._id === auth.user?._id"
                    class="inline-flex items-center rounded-full bg-[#294e9e]/10 px-2 py-0.5 text-[11px] font-medium text-[#294e9e] ring-1 ring-inset ring-[#294e9e]/15"
                    >{{ tr("You") }}</span
                  ><span
                    v-if="u.mustChangePassword"
                    class="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-800 ring-1 ring-inset ring-amber-600/20"
                    >{{ tr("Temporary password") }}</span
                  >
                </div>
              </td>
              <td class="px-4 py-4">
                <span
                  class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset"
                  :class="
                    roleBadgeClasses[u.role] ||
                    'bg-slate-100 text-slate-700 ring-slate-600/15'
                  "
                  >{{ tr(roleLabels[u.role] || u.role) }}</span
                >
              </td>
              <td class="px-4 py-4">
                <span
                  class="block max-w-[210px] truncate whitespace-nowrap text-slate-700"
                  :title="identifierFor(u)"
                  aria-hidden="true"
                  >{{ identifierFor(u) }}</span
                ><span class="sr-only">{{ identifierFor(u) }}</span>
              </td>
              <td class="px-4 py-4">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset"
                  :class="
                    u.isActive
                      ? 'bg-emerald-500/10 text-emerald-700 ring-emerald-600/20'
                      : 'bg-red-500/10 text-red-700 ring-red-600/20'
                  "
                  ><span
                    aria-hidden="true"
                    class="h-1.5 w-1.5 rounded-full"
                    :class="u.isActive ? 'bg-emerald-600' : 'bg-red-600'"
                  ></span
                  >{{ tr(u.isActive ? "Active" : "Inactive") }}</span
                >
              </td>
              <td class="px-4 py-4 text-slate-600">
                <span
                  :class="lastLogin(u) === 'Never' ? 'text-slate-400' : ''"
                  >{{
                    lastLogin(u) === "Never" ? tr("Never") : lastLogin(u)
                  }}</span
                >
              </td>
              <td class="px-4 py-4">
                <div class="flex flex-nowrap items-center gap-2">
                  <button
                    type="button"
                    :class="[
                      actionBase,
                      'bg-[#294e9e]/10 text-[#294e9e] hover:bg-[#294e9e]/15 active:bg-[#294e9e]/20',
                    ]"
                    :aria-label="tr('Edit') + ' ' + u.name"
                    @click="startEdit(u, $event)"
                  >
                    <Pencil :size="14" aria-hidden="true" />{{
                      tr("Edit")
                    }}</button
                  ><template v-if="u._id !== auth.user?._id"
                    ><button
                      v-if="u.isActive"
                      type="button"
                      :class="[
                        actionBase,
                        'bg-red-500/10 text-red-700 hover:bg-red-500/15 active:bg-red-500/20',
                      ]"
                      :aria-label="tr('Deactivate') + ' ' + u.name"
                      @click="confirmStatus(u, $event)"
                    >
                      <UserX :size="14" aria-hidden="true" />{{
                        tr("Deactivate")
                      }}</button
                    ><button
                      v-else
                      type="button"
                      :class="[
                        actionBase,
                        'bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/15 active:bg-emerald-500/20',
                      ]"
                      :aria-label="tr('Activate') + ' ' + u.name"
                      @click="activate(u)"
                    >
                      <UserCheck :size="14" aria-hidden="true" />{{
                        tr("Activate")
                      }}</button
                    ><button
                      type="button"
                      :class="[
                        actionBase,
                        'bg-amber-500/10 text-amber-800 hover:bg-amber-500/15 active:bg-amber-500/20',
                      ]"
                      :aria-label="tr('Reset password') + ' ' + u.name"
                      @click="confirmReset(u, $event)"
                    >
                      <KeyRound :size="14" aria-hidden="true" />{{
                        tr("Reset password")
                      }}
                    </button></template
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul class="grid min-w-0 gap-3 md:hidden">
        <li
          v-for="u in users"
          :key="u._id"
          class="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-slate-300 hover:shadow-md motion-reduce:transition-none"
        >
          <div class="flex min-w-0 flex-wrap items-start justify-between gap-2">
            <div class="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
              <h2 class="break-words font-semibold text-slate-900">
                {{ u.name }}
              </h2>
              <span
                v-if="u._id === auth.user?._id"
                class="inline-flex items-center rounded-full bg-[#294e9e]/10 px-2 py-0.5 text-[11px] font-medium text-[#294e9e] ring-1 ring-inset ring-[#294e9e]/15"
                >{{ tr("You") }}</span
              ><span
                v-if="u.mustChangePassword"
                class="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-800 ring-1 ring-inset ring-amber-600/20"
                >{{ tr("Temporary password") }}</span
              >
            </div>
            <span
              class="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset"
              :class="
                u.isActive
                  ? 'bg-emerald-500/10 text-emerald-700 ring-emerald-600/20'
                  : 'bg-red-500/10 text-red-700 ring-red-600/20'
              "
              ><span
                aria-hidden="true"
                class="h-1.5 w-1.5 rounded-full"
                :class="u.isActive ? 'bg-emerald-600' : 'bg-red-600'"
              ></span
              >{{ tr(u.isActive ? "Active" : "Inactive") }}</span
            >
          </div>
          <dl class="mt-4 grid min-w-0 grid-cols-2 gap-x-3 gap-y-3 text-sm">
            <div>
              <dt class="text-xs font-medium text-slate-500">
                {{ tr("Role") }}
              </dt>
              <dd class="mt-1">
                <span
                  class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset"
                  :class="
                    roleBadgeClasses[u.role] ||
                    'bg-slate-100 text-slate-700 ring-slate-600/15'
                  "
                  >{{ tr(roleLabels[u.role] || u.role) }}</span
                >
              </dd>
            </div>
            <div class="min-w-0">
              <dt class="text-xs font-medium text-slate-500">
                {{ tr("Login ID") }}
              </dt>
              <dd
                class="mt-1 overflow-x-auto whitespace-nowrap text-slate-700"
                :title="identifierFor(u)"
              >
                {{ identifierFor(u) }}
              </dd>
            </div>
            <div class="col-span-2">
              <dt class="text-xs font-medium text-slate-500">
                {{ tr("Last login") }}
              </dt>
              <dd
                class="mt-1 text-slate-600"
                :class="lastLogin(u) === 'Never' ? 'text-slate-400' : ''"
              >
                {{ lastLogin(u) === "Never" ? tr("Never") : lastLogin(u) }}
              </dd>
            </div>
          </dl>
          <div class="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              :class="[
                actionBase,
                'min-h-11 w-full bg-[#294e9e]/10 text-[#294e9e] hover:bg-[#294e9e]/15 active:bg-[#294e9e]/20',
              ]"
              :aria-label="tr('Edit') + ' ' + u.name"
              @click="startEdit(u, $event)"
            >
              <Pencil :size="15" aria-hidden="true" />{{ tr("Edit") }}</button
            ><template v-if="u._id !== auth.user?._id"
              ><button
                v-if="u.isActive"
                type="button"
                :class="[
                  actionBase,
                  'min-h-11 w-full bg-red-500/10 text-red-700 hover:bg-red-500/15 active:bg-red-500/20',
                ]"
                :aria-label="tr('Deactivate') + ' ' + u.name"
                @click="confirmStatus(u, $event)"
              >
                <UserX :size="15" aria-hidden="true" />{{
                  tr("Deactivate")
                }}</button
              ><button
                v-else
                type="button"
                :class="[
                  actionBase,
                  'min-h-11 w-full bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/15 active:bg-emerald-500/20',
                ]"
                :aria-label="tr('Activate') + ' ' + u.name"
                @click="activate(u)"
              >
                <UserCheck :size="15" aria-hidden="true" />{{
                  tr("Activate")
                }}</button
              ><button
                type="button"
                :class="[
                  actionBase,
                  'min-h-11 w-full bg-amber-500/10 text-amber-800 hover:bg-amber-500/15 active:bg-amber-500/20',
                ]"
                :aria-label="tr('Reset password') + ' ' + u.name"
                @click="confirmReset(u, $event)"
              >
                <KeyRound :size="15" aria-hidden="true" />{{
                  tr("Reset password")
                }}
              </button></template
            >
          </div>
        </li>
      </ul>
      <div
        class="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm"
      >
        <span class="text-slate-500">{{ summaryText }}</span>
        <nav :aria-label="tr('User pages')" class="flex items-center gap-2">
          <button
            type="button"
            :disabled="page <= 1"
            class="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#294e9e] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:bg-white motion-reduce:transition-none"
            @click="goPage(page - 1)"
          >
            {{ tr("Previous") }}</button
          ><span class="px-1 text-slate-600"
            >{{ tr("Page") }} {{ tr(page) }} / {{ tr(pages) }}</span
          ><button
            type="button"
            :disabled="page >= pages"
            class="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#294e9e] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:bg-white motion-reduce:transition-none"
            @click="goPage(page + 1)"
          >
            {{ tr("Next") }}
          </button>
        </nav>
      </div>
    </template>
    <UserFormDialog
      :open="dialog === 'create' || dialog === 'edit'"
      :mode="dialog === 'edit' ? 'edit' : 'create'"
      :user="selected"
      :current-user-id="auth.user?._id"
      @saved="onSaved"
      @cancel="closeDialog"
    />
    <ConfirmDialog
      :open="dialog === 'deactivate' || dialog === 'reset'"
      :title="dialog === 'reset' ? 'Reset password' : 'Deactivate user'"
      :message="
        dialog === 'reset'
          ? 'Reset this user’s password? A new temporary password will be shown once.'
          : 'Deactivate this user? They will no longer be able to sign in.'
      "
      :confirm-label="dialog === 'reset' ? 'Reset password' : 'Deactivate'"
      :danger="dialog === 'deactivate'"
      :loading="actionLoading"
      :error="dialogError"
      @confirm="confirmAction"
      @cancel="closeDialog"
    />
    <TempPasswordDialog
      :open="dialog === 'password'"
      :name="passwordUser?.name || ''"
      :role="passwordUser?.role || ''"
      :identifier="passwordUser ? identifierFor(passwordUser) : ''"
      :temporary-password="password"
      :reset="passwordReset"
      @done="passwordDone"
    />
  </section>
</template>
