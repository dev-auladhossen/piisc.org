import api from "../api.js";

const pendingReadRequests = new Map();

export function notifyAdmissionsDataChanged() {
  window.dispatchEvent(new Event("admissions-data-changed"));
}

export async function submitAdmissionApplication(body) {
  const response = await api.post("/admissions", body);
  if (response.status !== 201) throw new Error("Unexpected admissions response");
  return response.data;
}

export async function listAdmissionApplications(params = {}, signal) {
  const query = Object.fromEntries(Object.entries(params).filter(([, value]) => value !== "" && value !== undefined && value !== null));
  const { data } = await api.get("/admissions", { params: query, signal });
  return data;
}

export async function getAdmissionApplication(id, signal) {
  const { data } = await api.get(`/admissions/${encodeURIComponent(id)}`, { signal });
  return data;
}

export function setAdmissionReadState(id) {
  const key = String(id);
  if (pendingReadRequests.has(key)) return pendingReadRequests.get(key);
  const request = api.patch(`/admissions/${encodeURIComponent(key)}/read`)
    .then(({ data }) => {
      notifyAdmissionsDataChanged();
      return data;
    })
    .finally(() => pendingReadRequests.delete(key));
  pendingReadRequests.set(key, request);
  return request;
}

export async function updateAdmissionStatus(id, status) {
  const { data } = await api.patch(`/admissions/${encodeURIComponent(id)}/status`, { status });
  return data;
}

export async function updateAdmissionNotes(id, internalNotes) {
  const { data } = await api.patch(`/admissions/${encodeURIComponent(id)}/notes`, { internalNotes });
  return data;
}

export async function getAdmissionNotificationSummary(signal) {
  const { data } = await api.get("/admissions/notifications/summary", { signal });
  return data;
}

export function admissionErrorMessage(error) {
  const status = error?.response?.status;
  if (status === 400) return "The request contains invalid information. Review your changes and try again.";
  if (status === 401) return "Your session has expired. Please sign in again.";
  if (status === 403) return "You do not have permission to manage admissions.";
  if (status === 404) return "This application could not be found. Refresh the list and try again.";
  if (status === 409) return "The application update conflicted with another change. Refresh and try again.";
  if (status === 429) return "Too many requests. Please wait and try again.";
  if (status >= 500) return "The admissions service could not complete this request. Please try again later.";
  if (!error?.response) return "Cannot connect to the admissions service. Check the connection and try again.";
  return "Something went wrong. Please try again.";
}

export function admissionSubmissionErrorMessage(error) {
  const status = error?.response?.status;
  if (status === 400) return "Please review the highlighted details and try again.";
  if (status === 409) return "The application could not be confirmed because of a conflict. Please try again.";
  if (status === 429) return "Too many applications have been submitted. Please wait and try again.";
  if (status === 503) return "Online admissions are not currently configured. Please contact the school.";
  if (status >= 500) return "The admissions service could not complete this request. Please try again later.";
  if (!error?.response) return "Cannot connect to the admissions service. Check the connection and try again.";
  return "The application could not be submitted. Please try again.";
}
