import axios from "axios";
// In development, use Vite's same-origin proxy to avoid browser CORS blocking.
// Production requests use the backend URL configured in the environment.
export default axios.create({
  baseURL: import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_URL,
});
