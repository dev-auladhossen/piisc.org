<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { ImagePlus, Loader2, Trash2, Upload } from "lucide-vue-next";
import ConfirmDialog from "../components/users/ConfirmDialog.vue";
import ToastNotification from "../components/ToastNotification.vue";
import { useI18n } from "../composables/useI18n.js";
import {
  deleteAdminPoster,
  getAdminPoster,
  posterAdminErrorMessage,
  setAdminPosterVisibility,
  uploadAdminPoster,
} from "../services/posterAdminApi.js";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const { tr } = useI18n();
const currentPosterUrl = ref(null);
const selectedFile = ref(null);
const selectedPreviewUrl = ref(null);
const popupEnabled = ref(false);
const loading = ref(true);
const loaded = ref(false);
const loadError = ref("");
const uploading = ref(false);
const uploadProgress = ref(0);
const savingVisibility = ref(false);
const confirmDeleteOpen = ref(false);
const deleting = ref(false);
const deleteError = ref("");
const toast = ref(null);
const hasPoster = computed(() => Boolean(currentPosterUrl.value));

function notify(type, message) {
  toast.value = { type, message };
}

function applyConfig(config) {
  if (!config || typeof config.enabled !== "boolean") throw new Error("Invalid poster configuration");
  currentPosterUrl.value = typeof config.imageUrl === "string" && config.imageUrl ? config.imageUrl : null;
  popupEnabled.value = config.enabled && Boolean(currentPosterUrl.value);
}

async function loadPoster() {
  loading.value = true;
  loadError.value = "";
  try {
    const response = await getAdminPoster();
    applyConfig(response?.config);
    loaded.value = true;
  } catch (error) {
    loadError.value = posterAdminErrorMessage(error);
  } finally {
    loading.value = false;
  }
}

function releaseSelectedPreview() {
  if (selectedPreviewUrl.value) URL.revokeObjectURL(selectedPreviewUrl.value);
  selectedPreviewUrl.value = null;
  selectedFile.value = null;
}

function chooseFile(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;
  if (!ACCEPTED_TYPES.includes(file.type)) {
    notify("error", "Choose a JPEG, PNG, or WebP image.");
    return;
  }
  if (file.size > MAX_FILE_SIZE) {
    notify("error", "The poster image must be 5 MB or smaller.");
    return;
  }
  releaseSelectedPreview();
  selectedFile.value = file;
  selectedPreviewUrl.value = URL.createObjectURL(file);
}

async function uploadPoster() {
  if (!selectedFile.value || uploading.value || !loaded.value) return;
  const formData = new FormData();
  formData.append("image", selectedFile.value);
  uploading.value = true;
  uploadProgress.value = 0;
  try {
    const response = await uploadAdminPoster(formData, (event) => {
      if (event.total) uploadProgress.value = Math.round((event.loaded / event.total) * 100);
    });
    applyConfig(response?.config);
    releaseSelectedPreview();
    notify("success", "Poster uploaded successfully.");
  } catch (error) {
    notify("error", posterAdminErrorMessage(error));
  } finally {
    uploading.value = false;
    uploadProgress.value = 0;
  }
}

function cancelSelection() {
  if (!uploading.value) releaseSelectedPreview();
}

async function togglePopup() {
  if (!loaded.value || savingVisibility.value) return;
  const enabled = !popupEnabled.value;
  if (enabled && !hasPoster.value) {
    notify("error", "Upload a poster before enabling the popup.");
    return;
  }
  savingVisibility.value = true;
  try {
    const response = await setAdminPosterVisibility(enabled);
    applyConfig(response?.config);
    notify("success", enabled ? "Poster popup enabled." : "Poster popup disabled.");
  } catch (error) {
    notify("error", posterAdminErrorMessage(error));
  } finally {
    savingVisibility.value = false;
  }
}

async function removePoster() {
  if (deleting.value || !hasPoster.value) return;
  deleting.value = true;
  deleteError.value = "";
  try {
    const response = await deleteAdminPoster();
    if (response?.config) applyConfig(response.config);
    else {
      currentPosterUrl.value = null;
      popupEnabled.value = false;
    }
    confirmDeleteOpen.value = false;
    notify("success", "Poster deleted successfully.");
  } catch (error) {
    deleteError.value = posterAdminErrorMessage(error);
    notify("error", deleteError.value);
  } finally {
    deleting.value = false;
  }
}

onMounted(loadPoster);
onBeforeUnmount(() => {
  if (selectedPreviewUrl.value) URL.revokeObjectURL(selectedPreviewUrl.value);
});
</script>

<template>
  <section class="space-y-6" aria-labelledby="poster-management-title">
    <header>
      <p class="text-xs font-bold uppercase tracking-[.14em] text-[#ad8126]">{{ tr("Admin dashboard") }}</p>
      <h1 id="poster-management-title" class="mt-1 text-2xl font-bold text-[#173f8e] sm:text-3xl">{{ tr("Poster Management") }}</h1>
      <p class="mt-2 max-w-3xl text-sm leading-6 text-[#60718e]">{{ tr("Preview and manage the promotional poster popup shown to public website visitors.") }}</p>
    </header>

    <div class="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,.8fr)]">
      <section class="min-w-0 space-y-3" aria-labelledby="poster-preview-title">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h2 id="poster-preview-title" class="text-lg font-bold text-[#173f8e]">{{ tr("Poster preview") }}</h2>
          <span class="rounded-full bg-[#edf3ff] px-3 py-1 text-xs font-semibold text-[#294e9e]">{{ tr("Original aspect ratio") }}</span>
        </div>
        <div class="flex aspect-[1678/937] min-h-[200px] items-center justify-center overflow-hidden rounded-xl border border-[#dce5ef] bg-slate-100 p-3 sm:p-5" aria-live="polite">
          <div v-if="loading" class="flex items-center gap-2 text-sm font-medium text-[#60718e]"><Loader2 :size="20" class="animate-spin" aria-hidden="true" />{{ tr("Loading poster configuration…") }}</div>
          <div v-else-if="loadError" class="flex flex-col items-center gap-3 text-center">
            <p class="text-sm text-red-700" role="alert">{{ loadError }}</p>
            <button type="button" class="rounded-lg border border-[#c7d4e8] bg-white px-4 py-2 text-sm font-semibold text-[#294e9e] hover:bg-[#edf3ff]" @click="loadPoster">{{ tr("Retry") }}</button>
          </div>
          <img v-else-if="currentPosterUrl" :src="currentPosterUrl" alt="Current PIISC promotional poster preview" class="h-full w-full object-contain" />
          <div v-else class="flex flex-col items-center gap-3 text-center text-[#718198]">
            <ImagePlus :size="42" :stroke-width="1.5" aria-hidden="true" />
            <p class="font-semibold">{{ tr("No poster uploaded") }}</p>
            <p class="text-sm">{{ tr("Choose an image to see a preview here.") }}</p>
          </div>
        </div>

        <div v-if="selectedPreviewUrl" class="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="min-w-0">
              <h3 class="font-semibold text-[#173f8e]">{{ tr("Selected image preview") }}</h3>
              <p class="mt-1 break-all text-sm text-[#60718e]">{{ selectedFile?.name }} · {{ (selectedFile.size / 1024 / 1024).toFixed(2) }} MB</p>
            </div>
            <button type="button" :disabled="uploading" class="min-h-10 rounded-lg px-3 text-sm font-semibold text-[#60718e] hover:bg-white disabled:opacity-50" @click="cancelSelection">{{ tr("Cancel selection") }}</button>
          </div>
          <div class="mt-3 flex aspect-[1678/937] max-h-[320px] items-center justify-center overflow-hidden rounded-lg bg-white p-3">
            <img :src="selectedPreviewUrl" alt="Selected poster image preview" class="h-full w-full object-contain" />
          </div>
        </div>
      </section>

      <aside class="min-w-0 space-y-5">
        <section class="space-y-4 rounded-xl border border-[#dce5ef] bg-white p-4 sm:p-5" aria-labelledby="poster-upload-title">
          <div>
            <h2 id="poster-upload-title" class="text-lg font-bold text-[#173f8e]">{{ tr("Upload or replace poster") }}</h2>
            <p class="mt-1 text-sm leading-6 text-[#60718e]">{{ tr("Select a JPEG, PNG, or WebP image up to 5 MB.") }}</p>
          </div>
          <label for="poster-file" class="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#c7d4e8] bg-white px-4 py-3 text-sm font-semibold text-[#294e9e] transition hover:bg-[#edf3ff] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#d9b33d]" :class="(!loaded || loadError) && 'pointer-events-none opacity-50'">
            <ImagePlus :size="18" aria-hidden="true" />{{ tr(selectedFile ? "Choose a different image" : "Choose poster image") }}
            <input id="poster-file" type="file" accept="image/jpeg,image/png,image/webp" class="sr-only" :disabled="!loaded || uploading" @change="chooseFile" />
          </label>
          <button type="button" :disabled="!selectedFile || uploading || !loaded" class="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#294e9e] px-4 text-sm font-bold text-white transition hover:bg-[#173f8e] disabled:cursor-not-allowed disabled:opacity-50" :aria-busy="uploading" @click="uploadPoster">
            <Loader2 v-if="uploading" :size="18" class="animate-spin" aria-hidden="true" /><Upload v-else :size="18" aria-hidden="true" />
            {{ tr(uploading ? `Uploading… ${uploadProgress}%` : hasPoster ? "Replace poster" : "Upload poster") }}
          </button>
          <div v-if="uploading" class="h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label="Poster upload progress" :aria-valuenow="uploadProgress" aria-valuemin="0" aria-valuemax="100"><div class="h-full rounded-full bg-[#294e9e] transition-[width]" :style="{ width: `${uploadProgress}%` }" /></div>
        </section>

        <section class="space-y-4 rounded-xl border border-[#dce5ef] bg-white p-4 sm:p-5" aria-labelledby="popup-visibility-title">
          <div>
            <h2 id="popup-visibility-title" class="text-lg font-bold text-[#173f8e]">{{ tr("Popup visibility") }}</h2>
            <p class="mt-1 text-sm leading-6 text-[#60718e]">{{ tr("When disabled, the popup is hidden from public visitors; the poster itself is kept.") }}</p>
          </div>
          <div class="flex items-center justify-between gap-4 rounded-lg bg-[#f7f9fc] p-3">
            <div>
              <p class="font-semibold text-[#344b70]">{{ tr("Show poster popup on public website") }}</p>
              <p class="mt-1 text-sm font-semibold" :class="popupEnabled ? 'text-emerald-700' : 'text-slate-600'" role="status">{{ tr(popupEnabled ? "Enabled" : "Disabled") }}</p>
            </div>
            <button type="button" role="switch" :aria-checked="popupEnabled" :aria-label="tr('Show poster popup on public website')" :disabled="!loaded || loading || savingVisibility || (!hasPoster && !popupEnabled)" class="relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9b33d] disabled:cursor-not-allowed disabled:opacity-50" :class="popupEnabled ? 'bg-emerald-600' : 'bg-slate-300'" @click="togglePopup">
              <Loader2 v-if="savingVisibility" :size="16" class="absolute left-1/2 -translate-x-1/2 animate-spin text-white" aria-hidden="true" />
              <span v-else class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform" :class="popupEnabled ? 'translate-x-6' : 'translate-x-1'" />
            </button>
          </div>
        </section>

        <section class="rounded-xl border border-red-200 bg-white p-4 sm:p-5" aria-labelledby="poster-delete-title">
          <div class="flex items-start gap-3">
            <span class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-700"><Trash2 :size="18" aria-hidden="true" /></span>
            <div class="min-w-0 flex-1">
              <h2 id="poster-delete-title" class="font-bold text-[#173f8e]">{{ tr("Delete poster") }}</h2>
              <p class="mt-1 text-sm leading-6 text-[#60718e]">{{ tr("Remove the saved poster. You will be asked to confirm first.") }}</p>
              <button type="button" :disabled="!hasPoster || deleting || !loaded" class="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-red-300 px-3 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50" @click="deleteError = ''; confirmDeleteOpen = true">
                <Trash2 :size="16" aria-hidden="true" />{{ tr("Delete poster") }}
              </button>
            </div>
          </div>
        </section>
      </aside>
    </div>

    <ConfirmDialog :open="confirmDeleteOpen" title="Delete poster" message="Delete the saved poster? This cannot be undone." confirm-label="Delete poster" danger :loading="deleting" @confirm="removePoster" @cancel="!deleting && (confirmDeleteOpen = false)" />
    <p v-if="deleteError && confirmDeleteOpen" class="text-sm text-red-700" role="alert">{{ deleteError }}</p>
    <ToastNotification v-if="toast" :type="toast.type" :message="toast.message" @close="toast = null" />
  </section>
</template>
