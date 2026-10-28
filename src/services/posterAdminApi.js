import api from "../api.js";

export async function getAdminPoster() {
  const { data } = await api.get("/poster/admin");
  return data;
}

export async function uploadAdminPoster(formData, onUploadProgress) {
  const { data } = await api.post("/poster/admin/upload", formData, { onUploadProgress });
  return data;
}

export async function setAdminPosterVisibility(enabled) {
  const { data } = await api.patch("/poster/admin/visibility", { enabled });
  return data;
}

export async function deleteAdminPoster() {
  const { data } = await api.delete("/poster/admin");
  return data;
}

export function posterAdminErrorMessage(error) {
  const code = error?.response?.data?.code;
  const status = error?.response?.status;
  if (status === 400) return "The poster request is invalid. Check the selected image and try again.";
  if (status === 401) return "Your session has expired. Please sign in again.";
  if (status === 403) return "You do not have permission to manage the poster.";
  if (status === 409) return "The poster configuration changed unexpectedly. Reload and try again.";
  if (status === 413) return "The poster image must be 5 MB or smaller.";
  if (status === 429) return "Too many poster requests. Please wait and try again.";
  if (status === 502 && code === "OLD_POSTER_CLEANUP_FAILED") return "The server could not finish replacing the previous poster. Reload the configuration before trying again.";
  if (status === 502 || status === 503) return "Poster image storage is temporarily unavailable. Please try again later.";
  if (status >= 500) return "The poster service could not complete this request. Please try again later.";
  if (!error?.response) return "Cannot connect to the poster service. Check your connection and try again.";
  return "The poster request could not be completed. Please try again.";
}
