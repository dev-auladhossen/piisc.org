<script setup>
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import {
  ImagePlus,
  Loader2,
  RefreshCw,
  Save,
  TriangleAlert,
  Upload,
  UserRound,
  X,
} from "lucide-vue-next";
import {
  createGalleryItem,
  galleryErrorMessage,
  replaceGalleryImage,
  updateGalleryItem,
} from "../../services/galleryAdminApi.js";
import { useDialogLock } from "../../composables/useDialogLock.js";
import { useI18n } from "../../composables/useI18n.js";

const props = defineProps({
  open: Boolean,
  mode: { type: String, default: "create" },
  item: { type: Object, default: null },
});
const emit = defineEmits(["saved", "partial", "cancel"]);
const { tr } = useI18n();
// Matches backend GalleryItem.GALLERY_CATEGORIES; no category-list endpoint exists.
const galleryCategories = ["Academics", "Events", "Sports", "Campus"];
const dialog = ref(null);
const captionInput = ref(null);
const fileInput = ref(null);
const errorBanner = ref(null);
const submitting = ref(false);
const error = ref("");
const progress = ref(null);
const selectedFile = ref(null);
const previewUrl = ref("");
const invalid = reactive({ image: "", caption: "", category: "", altText: "", displayOrder: "" });
const form = reactive({ caption: "", category: "", altText: "", displayOrder: "0" });
const { lock, unlock } = useDialogLock();
let unmounting = false;
let initialValues = { caption: "", category: "", altText: "", displayOrder: 0 };
const allowedTypes = ["image/png", "image/jpeg", "image/gif", "image/webp"];

function isCreate() {
  return props.mode === "create";
}
function isReplace() {
  return props.mode === "replace";
}
function title() {
  if (isCreate()) return "Add gallery image";
  if (isReplace()) return "Replace gallery image";
  return "Edit gallery details";
}
function subtitle() {
  if (isCreate()) return "Add an image and its caption to the school gallery.";
  if (isReplace()) return "Choose a new image for this gallery item.";
  return "Update the caption and image details.";
}
function revokePreview() {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  previewUrl.value = "";
}
function clear() {
  revokePreview();
  selectedFile.value = null;
  if (fileInput.value) fileInput.value.value = "";
  form.caption = props.item?.caption || "";
  form.category = galleryCategories.includes(props.item?.category)
    ? props.item.category
    : "";
  form.altText = props.item?.altText || "";
  form.displayOrder = String(props.item?.displayOrder ?? 0);
  initialValues = {
    caption: form.caption,
    category: form.category,
    altText: form.altText,
    displayOrder: Number(form.displayOrder),
  };
  error.value = "";
  progress.value = null;
  Object.keys(invalid).forEach((key) => (invalid[key] = ""));
}
async function openDialog() {
  if (!dialog.value || dialog.value.open) return;
  clear();
  dialog.value.showModal();
  lock();
  await nextTick();
  if (isCreate()) fileInput.value?.focus();
  else if (!isReplace()) captionInput.value?.focus();
  else fileInput.value?.focus();
}
watch(
  () => props.open,
  async (open) => {
    if (open) await openDialog();
    else if (dialog.value?.open) {
      dialog.value.close();
      unlock();
      revokePreview();
    }
  },
  { flush: "post" },
);
onMounted(() => {
  if (props.open) openDialog();
});
function cancel() {
  if (!submitting.value) emit("cancel");
}
function onCancel(event) {
  event.preventDefault();
  cancel();
}
function closed() {
  unlock();
  revokePreview();
  if (!unmounting && props.open && !submitting.value) emit("cancel");
}
function onFileChange(event) {
  invalid.image = "";
  error.value = "";
  const file = event.target.files?.[0] || null;
  revokePreview();
  selectedFile.value = file;
  if (!file) return;
  if (!allowedTypes.includes(file.type)) {
    invalid.image = "Choose a PNG, JPEG, GIF, or WebP image.";
    selectedFile.value = null;
    event.target.value = "";
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    invalid.image = "The image must be 5 MB or smaller.";
    selectedFile.value = null;
    event.target.value = "";
    return;
  }
  previewUrl.value = URL.createObjectURL(file);
}
function validate() {
  Object.keys(invalid).forEach((key) => (invalid[key] = ""));
  if ((isCreate() || isReplace()) && !selectedFile.value) {
    invalid.image = "Choose an image to continue.";
  }
  const caption = form.caption.trim();
  if (isCreate() || (!isReplace() && props.mode === "edit")) {
    if (!caption) invalid.caption = "Enter a caption.";
    else if (caption.length > 300) invalid.caption = "Caption must be 300 characters or fewer.";
    if ((isCreate() && !galleryCategories.includes(form.category)) ||
        (form.category && !galleryCategories.includes(form.category))) {
      invalid.category = "Choose a supported gallery category.";
    }
    if (form.altText.trim().length > 300) invalid.altText = "Alt text must be 300 characters or fewer.";
    const order = Number(form.displayOrder);
    if (!Number.isInteger(order) || order < 0 || order > 100000) {
      invalid.displayOrder = "Enter a whole number from 0 to 100000.";
    }
  }
  return !Object.values(invalid).some(Boolean);
}
function onUploadProgress(event) {
  if (event.total) progress.value = Math.min(100, Math.round((event.loaded / event.total) * 100));
}
function requestError(failure) {
  const message = galleryErrorMessage(failure);
  const cleanupId = failure?.response?.data?.cleanupPublicId;
  return cleanupId ? `${message} Cleanup reference: ${cleanupId}` : message;
}
async function submit() {
  if (submitting.value || !validate()) {
    if (!submitting.value) {
      await nextTick();
      if (invalid.image) fileInput.value?.focus();
      else captionInput.value?.focus();
    }
    return;
  }
  error.value = "";
  if (isCreate()) {
    const body = new FormData();
    body.append("image", selectedFile.value);
    body.append("caption", form.caption.trim());
    body.append("category", form.category);
    if (form.altText.trim()) body.append("altText", form.altText.trim());
    body.append("displayOrder", String(Number(form.displayOrder)));
    submitting.value = true;
    try {
      emit("saved", await createGalleryItem(body, onUploadProgress));
    } catch (failure) {
      error.value = requestError(failure);
      await nextTick();
      errorBanner.value?.focus();
    } finally {
      submitting.value = false;
      progress.value = null;
    }
    return;
  }
  if (isReplace()) {
    const body = new FormData();
    body.append("image", selectedFile.value);
    submitting.value = true;
    try {
      emit("saved", await replaceGalleryImage(props.item._id, body, onUploadProgress));
    } catch (failure) {
      const data = failure?.response?.data;
      if (data?.code === "OLD_IMAGE_CLEANUP_FAILED" && data.item) {
        emit("partial", data);
        return;
      }
      error.value = requestError(failure);
      await nextTick();
      errorBanner.value?.focus();
    } finally {
      submitting.value = false;
      progress.value = null;
    }
    return;
  }

  const values = {
    caption: form.caption.trim(),
    category: form.category,
    altText: form.altText.trim(),
    displayOrder: Number(form.displayOrder),
  };
  const body = Object.fromEntries(
    Object.entries(values).filter(([key, value]) => value !== initialValues[key]),
  );
  if (!Object.keys(body).length) {
    error.value = "Make at least one change before saving.";
    return;
  }
  submitting.value = true;
  try {
    emit("saved", await updateGalleryItem(props.item._id, body));
  } catch (failure) {
    error.value = requestError(failure);
    await nextTick();
    errorBanner.value?.focus();
  } finally {
    submitting.value = false;
  }
}
onBeforeUnmount(() => {
  unmounting = true;
  if (dialog.value?.open) dialog.value.close();
  revokePreview();
  unlock();
});
</script>

<template>
  <dialog
    ref="dialog"
    aria-labelledby="gallery-form-title"
    aria-describedby="gallery-form-subtitle"
    class="gallery-form-dialog fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-24px)] max-w-2xl overflow-hidden rounded-2xl border border-[#e8edf5] bg-white p-0 text-[#173f8e] shadow-[0_20px_70px_rgba(23,58,106,0.22)] sm:w-[calc(100%-40px)]"
    @cancel="onCancel"
    @close="closed"
  >
    <form class="flex max-h-[90dvh] flex-col" @submit.prevent="submit">
      <header class="flex shrink-0 items-start gap-3 border-b border-[#e8edf5] bg-[#fbfcfe] px-4 py-4 sm:px-6">
        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf3ff] text-[#294e9e]" aria-hidden="true">
          <ImagePlus v-if="isCreate()" :size="20" />
          <RefreshCw v-else-if="isReplace()" :size="19" />
          <UserRound v-else :size="19" />
        </span>
        <div class="min-w-0 flex-1">
          <h2 id="gallery-form-title" class="text-lg font-bold text-[#173f8e]">{{ tr(title()) }}</h2>
          <p id="gallery-form-subtitle" class="mt-1 text-sm text-[#60718e]">{{ tr(subtitle()) }}</p>
        </div>
        <button type="button" :disabled="submitting" class="rounded-lg p-2 text-[#60718e] transition-colors hover:bg-[#edf3ff] hover:text-[#294e9e] disabled:opacity-50" :aria-label="tr('Close gallery form')" @click="cancel">
          <X :size="19" aria-hidden="true" />
        </button>
      </header>

      <div class="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6">
        <div v-if="props.mode !== 'create'" class="flex items-center gap-4 rounded-xl border border-[#dce6f5] bg-[#fbfcfe] p-3">
          <img :src="previewUrl || props.item?.imageUrl" :alt="props.item?.altText || props.item?.caption || ''" class="h-20 w-24 shrink-0 rounded-lg object-cover" />
          <p class="min-w-0 break-words text-sm font-medium text-[#344b70]">{{ props.item?.caption }}</p>
        </div>

        <div v-if="isCreate() || isReplace()">
          <label for="gallery-image-file" class="mb-1.5 block text-sm font-semibold text-[#344b70]">
            {{ tr(isReplace() ? 'Replacement image' : 'Image') }} <span class="text-red-600" aria-hidden="true">*</span>
          </label>
          <input
            id="gallery-image-file"
            ref="fileInput"
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp"
            :disabled="submitting"
            :aria-invalid="Boolean(invalid.image)"
            :aria-describedby="invalid.image ? 'gallery-image-error gallery-image-help' : 'gallery-image-help'"
            class="gallery-file w-full rounded-[14px] border border-[#c7d4e8] bg-white text-sm text-[#344b70] file:mr-3 file:min-h-12 file:border-0 file:bg-[#edf3ff] file:px-4 file:font-semibold file:text-[#294e9e] hover:file:bg-[#dce8fc]"
            @change="onFileChange"
          />
          <p id="gallery-image-help" class="mt-1.5 text-xs text-[#60718e]">{{ tr('PNG, JPEG, GIF, or WebP. Maximum 5 MB.') }}</p>
          <p v-if="invalid.image" id="gallery-image-error" class="mt-1 text-sm text-red-700">{{ tr(invalid.image) }}</p>
          <img v-if="previewUrl" :src="previewUrl" alt="" class="mt-3 max-h-56 w-full rounded-xl border border-[#dce6f5] bg-[#f4f7fc] object-contain" />
        </div>

        <template v-if="!isReplace()">
          <div>
            <label for="gallery-caption" class="mb-1.5 block text-sm font-semibold text-[#344b70]">
              {{ tr('Caption') }} <span class="text-red-600" aria-hidden="true">*</span>
            </label>
            <textarea id="gallery-caption" ref="captionInput" v-model="form.caption" rows="3" maxlength="300" :disabled="submitting" :aria-invalid="Boolean(invalid.caption)" :aria-describedby="invalid.caption ? 'gallery-caption-error' : undefined" class="gallery-field w-full resize-y rounded-[14px] border border-[#c7d4e8] bg-white p-3 text-base text-[#173f8e] outline-none" />
            <p v-if="invalid.caption" id="gallery-caption-error" class="mt-1 text-sm text-red-700">{{ tr(invalid.caption) }}</p>
            <p class="mt-1 text-right text-xs text-[#60718e]">{{ form.caption.length }} / 300</p>
          </div>
          <div>
            <label for="gallery-category" class="mb-1.5 block text-sm font-semibold text-[#344b70]">
              {{ tr('Category') }}<span v-if="isCreate()" class="ml-1 text-red-600" aria-hidden="true">*</span>
            </label>
            <select
              id="gallery-category"
              v-model="form.category"
              :aria-required="isCreate()"
              :aria-invalid="Boolean(invalid.category)"
              :aria-describedby="invalid.category ? 'gallery-category-error' : 'gallery-category-help'"
              class="gallery-field min-h-12 w-full rounded-[14px] border border-[#c7d4e8] bg-white px-4 text-base text-[#173f8e] outline-none"
            >
              <option v-if="!form.category" value="">{{ tr('Select a category') }}</option>
              <option v-for="item in galleryCategories" :key="item" :value="item">{{ tr(item) }}</option>
            </select>
            <p id="gallery-category-help" class="mt-1 text-xs text-[#60718e]">
              {{ tr(isCreate() ? 'Choose the public gallery section for this image.' : 'Choose the public gallery section for this image. Legacy images may remain uncategorized.') }}
            </p>
            <p v-if="invalid.category" id="gallery-category-error" class="mt-1 text-sm text-red-700">{{ tr(invalid.category) }}</p>
          </div>
          <div>
            <label for="gallery-alt-text" class="mb-1.5 block text-sm font-semibold text-[#344b70]">{{ tr('Alt text') }}</label>
            <input id="gallery-alt-text" v-model="form.altText" type="text" maxlength="300" :disabled="submitting" :aria-invalid="Boolean(invalid.altText)" :aria-describedby="invalid.altText ? 'gallery-alt-error' : 'gallery-alt-help'" class="gallery-field min-h-12 w-full rounded-[14px] border border-[#c7d4e8] bg-white px-4 text-base text-[#173f8e] outline-none" />
            <p id="gallery-alt-help" class="mt-1 text-xs text-[#60718e]">{{ tr('Describe the image for people using a screen reader.') }}</p>
            <p v-if="invalid.altText" id="gallery-alt-error" class="mt-1 text-sm text-red-700">{{ tr(invalid.altText) }}</p>
          </div>
          <div>
            <label for="gallery-display-order" class="mb-1.5 block text-sm font-semibold text-[#344b70]">{{ tr('Display order') }}</label>
            <input id="gallery-display-order" v-model="form.displayOrder" type="number" min="0" max="100000" step="1" inputmode="numeric" :disabled="submitting" :aria-invalid="Boolean(invalid.displayOrder)" :aria-describedby="invalid.displayOrder ? 'gallery-order-error' : 'gallery-order-help'" class="gallery-field min-h-12 w-full rounded-[14px] border border-[#c7d4e8] bg-white px-4 text-base text-[#173f8e] outline-none" />
            <p id="gallery-order-help" class="mt-1 text-xs text-[#60718e]">{{ tr('Lower numbers appear first. Equal values use newest first.') }}</p>
            <p v-if="invalid.displayOrder" id="gallery-order-error" class="mt-1 text-sm text-red-700">{{ tr(invalid.displayOrder) }}</p>
          </div>
        </template>

        <div v-if="error" ref="errorBanner" tabindex="-1" role="alert" class="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm leading-5 text-red-800 outline-none focus:ring-2 focus:ring-red-500/30">
          <TriangleAlert class="mt-0.5 shrink-0" :size="17" aria-hidden="true" />{{ tr(error) }}
        </div>
      </div>

      <footer class="flex shrink-0 flex-col-reverse gap-2 border-t border-[#e8edf5] bg-[#fbfcfe] px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
        <button type="button" :disabled="submitting" class="min-h-11 rounded-[10px] border border-[#c7d4e8] bg-white px-5 text-sm font-semibold text-[#173f8e] transition-colors hover:bg-[#edf3ff] disabled:opacity-50" @click="cancel">{{ tr('Cancel') }}</button>
        <button type="submit" :disabled="submitting" :aria-busy="submitting" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] bg-[#294e9e] px-5 text-sm font-semibold text-white shadow-[0_3px_10px_rgba(41,78,158,0.15)] transition-colors hover:bg-[#173f8e] disabled:cursor-not-allowed disabled:opacity-60">
          <Loader2 v-if="submitting" :size="16" class="animate-spin" aria-hidden="true" />
          <Upload v-else-if="isCreate()" :size="16" aria-hidden="true" />
          <RefreshCw v-else-if="isReplace()" :size="16" aria-hidden="true" />
          <Save v-else :size="16" aria-hidden="true" />
          <span v-if="submitting && progress !== null">{{ progress }}%</span>
          <span v-else>{{ tr(isCreate() ? 'Upload image' : isReplace() ? 'Replace image' : 'Save changes') }}</span>
        </button>
      </footer>
    </form>
  </dialog>
</template>

<style scoped>
.gallery-form-dialog:not([open]) { display: none; }
.gallery-form-dialog::backdrop { @apply bg-[rgba(21,27,38,0.60)] backdrop-blur-[4px]; }
.gallery-field { @apply transition-[border-color,box-shadow] duration-150; }
.gallery-field:focus-visible,
.gallery-file:focus-visible { @apply border-[#8ea9d8] outline-none ring-2 ring-[#294e9e]/10; }
.gallery-form-dialog button:focus-visible { @apply outline outline-[3px] outline-[#d9b33d] outline-offset-[3px]; }
@media (prefers-reduced-motion: reduce) {
  .gallery-form-dialog * { @apply transition-none; }
}
</style>
