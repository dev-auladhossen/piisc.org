import api from "../api.js";
import { userErrorKind } from "./userApi.js";

export async function listGallery(params = {}, signal) {
  const filtered = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== "" && value !== undefined && value !== null,
    ),
  );
  const { data } = await api.get("/gallery", { params: filtered, signal });
  return data;
}

export async function createGalleryItem(formData, onUploadProgress) {
  const { data } = await api.post("/gallery", formData, { onUploadProgress });
  return data;
}

export async function updateGalleryItem(id, body) {
  const { data } = await api.patch(
    `/gallery/${encodeURIComponent(id)}`,
    body,
  );
  return data;
}

export async function replaceGalleryImage(id, formData, onUploadProgress) {
  const { data } = await api.patch(
    `/gallery/${encodeURIComponent(id)}/image`,
    formData,
    { onUploadProgress },
  );
  return data;
}

export async function deleteGalleryItem(id) {
  const { data } = await api.delete(`/gallery/${encodeURIComponent(id)}`);
  return data;
}

export function galleryErrorMessage(error) {
  const code = error?.response?.data?.code;
  const status = error?.response?.status;
  if (code === "UPLOAD_CLEANUP_FAILED") {
    return "The gallery item was not saved, and its uploaded image needs manual cleanup.";
  }
  if (code === "REPLACEMENT_CLEANUP_FAILED") {
    return "The replacement was not saved; the current image remains active, but the new upload needs manual cleanup.";
  }
  if (code === "OLD_IMAGE_CLEANUP_FAILED") {
    return "The new image was saved, but the previous image needs manual cleanup.";
  }
  if (code === "IMAGE_CLEANUP_FAILED") {
    return "The gallery item was deleted, but its image needs manual cleanup.";
  }
  if (status === 413) return "The image is too large. The maximum file size is 5 MB.";
  if (status === 429 || code === "RATE_LIMITED") return "Too many attempts. Please wait a few minutes and try again.";
  if (status === 401) return "Your session expired. Please sign in again.";
  if (status === 403 && code === "PASSWORD_CHANGE_REQUIRED") return "Change your temporary password before managing gallery items.";
  if (status === 502) return "Cloudinary could not complete the image operation. Please try again.";
  if (status === 503) return "Gallery image storage is temporarily unavailable.";
  const kind = userErrorKind(error);
  if (kind === "aborted") return "The request was cancelled.";
  if (kind === "forbidden") return "You do not have permission to do this.";
  if (kind === "notfound") return "This gallery item no longer exists.";
  if (kind === "validation") return "Please check the gallery details and try again.";
  if (kind === "network") return "Cannot reach the server. Check your connection and try again.";
  return "Something went wrong. Please try again.";
}
