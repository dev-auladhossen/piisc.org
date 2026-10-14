import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Read the existing backend URL rather than hardcoding its host or port.
  const backend = new URL(env.VITE_API_URL)
  return {
    plugins: [vue()],
    server: {
      proxy: {
        '/api': {
          target: backend.origin,
          changeOrigin: true,
          // /api/notices on Vite becomes <configured API path>/notices upstream.
          rewrite: path => path.replace(/^\/api(?=\/|$)/, backend.pathname.replace(/\/$/, '')),
        },
      },
    },
  }
})
