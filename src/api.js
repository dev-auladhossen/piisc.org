import axios from "axios";
// In development, use Vite's same-origin proxy to avoid browser CORS blocking.
// Production requests use the backend URL configured in the environment.
const api = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_URL,
});

// The store supplies these callbacks, so this module never imports the store.
let unauthorizedHandler;
let passwordChangeHandler;

export function setUnauthorizedHandler(fn) {
  unauthorizedHandler = fn;
}

export function setPasswordChangeHandler(fn) {
  passwordChangeHandler = fn;
}

api.interceptors.request.use((config) => {
  // Some browsers block storage access. Requests should still be allowed.
  try {
    const token = localStorage.getItem("piisc_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch {
    // Continue without a stored token when storage is unavailable.
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 && error.config?.url !== "/auth/login") {
      try {
        localStorage.removeItem("piisc_token");
      } catch {
        // The store callback still clears its in-memory session.
      }
      try {
        unauthorizedHandler?.();
      } catch {
        // Always pass the original request error back to its caller.
      }
    }
    if (status === 403 && error.response?.data?.code === "PASSWORD_CHANGE_REQUIRED") {
      try {
        passwordChangeHandler?.();
      } catch {
        // A callback must not replace the original request error.
      }
    }
    return Promise.reject(error);
  },
);

export default api;
