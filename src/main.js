import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { translate } from './composables/useI18n.js'
import './style.css'
import './assets/fonts/fonts.css'
const app = createApp(App)
app.config.globalProperties.$tr = translate
app.use(router)

// Wait for the initial route before rendering the layout and footer.
router.isReady().then(() => {
  app.mount('#app')
})
