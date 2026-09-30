import { createRouter, createWebHistory } from 'vue-router'
import { watch } from 'vue'
import { useI18n } from '../composables/useI18n.js'
import { informationPages } from '../data/navigation.js'
const pages = [
 {path:'/',name:'home',component:()=>import('../views/HomeView.vue')},
 {path:'/about',name:'about',component:()=>import('../views/AboutView.vue')},
 {path:'/details',name:'details',component:()=>import('../views/DetailsView.vue')},
 {path:'/academics',name:'academics',component:()=>import('../views/AcademicsView.vue')},
 {path:'/extra-curricular-activities',alias:'/athletics',name:'athletics',component:()=>import('../views/AthleticsView.vue')},
 {path:'/admissions',name:'admissions',component:()=>import('../views/AdmissionsView.vue')},
 {path:'/online-admission',name:'online-admission',component:()=>import('../views/ApplicationPortalView.vue'),props:{kind:'admission'}},
 {path:'/recruitment',name:'recruitment',component:()=>import('../views/ApplicationPortalView.vue'),props:{kind:'recruitment'}},
 {path:'/campus',name:'campus',component:()=>import('../views/CampusView.vue')},
 {path:'/news',name:'news',component:()=>import('../views/NewsView.vue')},
 {path:'/news/:slug',name:'news-detail',component:()=>import('../views/NewsDetailView.vue')},
 {path:'/contact',name:'contact',component:()=>import('../views/ContactView.vue')},
 {path:'/gallery',name:'gallery',component:()=>import('../views/GalleryView.vue')},
 {path:'/notices',name:'notices',component:()=>import('../views/NoticesView.vue')},
 {path:'/notices/:id',name:'notice-detail',component:()=>import('../views/NoticeDetailView.vue')},
 ...informationPages.map(page => ({ path: page.path, name: page.name, component: () => import('../views/InformationView.vue'), props: { title: page.title, description: page.description } })),
 {path:'/:pathMatch(.*)*',redirect:'/'}
]
const router=createRouter({history:createWebHistory(),routes:pages,scrollBehavior(){return {top:0}}})
const { language, tr } = useI18n()
const pageTitles = {
  home: 'Home', about: 'About Us', details: 'Discover PIISC', academics: 'Academics',
  athletics: 'Athletics', admissions: 'Admission', 'online-admission': 'Online Admission',
  recruitment: 'Recruitment', campus: 'Campus', news: 'News & Events', 'news-detail': 'News & Events',
  contact: 'Contact', gallery: 'Gallery', notices: 'Notices', 'notice-detail': 'Notice',
  ...Object.fromEntries(informationPages.map(page => [page.name, page.title])),
}
watch([() => router.currentRoute.value, language], ([to]) => {
  if (!to.name) return
  const title = tr(pageTitles[to.name] || String(to.name))
  document.title = `${title} | ${tr('Peace International Islamic School & College')}`
  const meta = document.querySelector('meta[name="description"]')
  if (meta) meta.content = language.value === 'bn'
    ? `পিস ইন্টারন্যাশনাল ইসলামিক স্কুল অ্যান্ড কলেজ, আশুলিয়া — ${title}। ইসলামিক মূল্যবোধের সঙ্গে প্রথম থেকে দ্বাদশ শ্রেণির ইংরেজি মাধ্যম শিক্ষা।`
    : `Peace International Islamic School & College, Ashulia — ${title}. English-medium education for Classes 1–12 with Islamic values.`
})
export default router
