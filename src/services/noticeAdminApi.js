import api from "../api.js";
import { userErrorKind } from "./userApi.js";

export async function listManageNotices(params = {}, signal) {
  const filtered = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== "" && value !== undefined && value !== null,
    ),
  );
  const { data } = await api.get("/notices/manage", {
    params: filtered,
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
