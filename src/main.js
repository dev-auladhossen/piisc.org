import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth.js'
import App from './App.vue'
import router from './router/index.js'
import { translate } from './composables/useI18n.js'
import './style.css'
import './animations.css'
import './assets/fonts/fonts.css'
import './large-screen.css'
const app = createApp(App)
app.config.globalProperties.$tr = translate
const pinia = createPinia()
app.use(pinia)
// TEMPORARY - DELETE BEFORE COMMIT
if (import.meta.env.DEV) {
  window.__auth = useAuthStore(pinia)
}
app.use(router)

// Wait for the initial route before rendering the layout and footer.
router.isReady().then(() => {
  app.mount('#app')
})
