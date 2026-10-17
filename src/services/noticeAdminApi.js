import api from "../api.js";
import { userErrorKind } from "./userApi.js";

export async function listManageNotices(params = {}, signal) {
  const filtered = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== "" && value !== undefined && value !== null,
    ),
  );
  const { data } = await api.get("/notices/manage", {
    // A cached ETag revalidation can produce 304, which Axios treats as an
    // error and does not expose with the cached response body. Keep this
    // admin list request fresh so the page receives a normal 200 response.
    params: { ...filtered, _noticeRequest: Date.now() },
    signal,
  });
  return data;
}

export async function createNotice(body) {
  const { data } = await api.post("/notices", body);
  return data;
}

export async function updateNotice(id, body) {
  const { data } = await api.patch(`/notices/${encodeURIComponent(id)}`, body);
  return data;
}

export async function deleteNotice(id) {
  const { data } = await api.delete(`/notices/${encodeURIComponent(id)}`);
  return data;
}

export function noticeErrorKind(error) {
  if (error?.response?.status === 413) return "too_large";
  return userErrorKind(error);
}
