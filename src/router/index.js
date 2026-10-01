import { createRouter, createWebHistory } from 'vue-router'
import { watch } from 'vue'
import { useI18n } from '../composables/useI18n.js'
import { informationPages } from '../data/navigation.js'
const pages = [
 {path:'/',name:'home',component:()=>import('../views/HomeView.vue')},
 {path:'/about',name:'about',component:()=>import('../views/AboutView.vue')},
 {path:'/vision-mission',name:'vision-mission',component:()=>import('../views/VisionMissionView.vue')},
 {path:'/chief-advisor-message',alias:'/message-from-hos',name:'chief-advisor-message',component:()=>import('../views/HeadOfSchoolView.vue')},
 {path:'/details',name:'details',component:()=>import('../views/DetailsView.vue')},
 {path:'/academics',name:'academics',component:()=>import('../views/AcademicsView.vue')},
 ...['primary-school','middle-school','secondary-school','college'].map(programme => ({path:`/${programme}`,name:programme,component:()=>import('../views/AcademicProgrammeView.vue'),props:{programme}})),
 {path:'/early-years',redirect:'/primary-school'},
 {path:'/junior-school',redirect:'/primary-school'},
 {path:'/curriculum',name:'curriculum',component:()=>import('../views/CurriculumView.vue')},
 {path:'/learning-areas',alias:'/our-learning-areas',name:'learning-areas',component:()=>import('../views/LearningAreasView.vue')},
 {path:'/admission-requirement',name:'admission-requirement',component:()=>import('../views/AdmissionRequirementsView.vue')},
 {path:'/application-process',alias:'/admission-procedures',name:'application-process',component:()=>import('../views/AdmissionProceduresView.vue')},
 {path:'/extra-curricular-activities',alias:['/activities','/athletics'],name:'athletics',component:()=>import('../views/ActivitiesView.vue')},
 {path:'/admissions',name:'admissions',component:()=>import('../views/AdmissionsView.vue')},
 {path:'/online-admission',name:'online-admission',component:()=>import('../views/ApplicationPortalView.vue'),props:{kind:'admission'}},
 {path:'/recruitment',name:'recruitment',component:()=>import('../views/ApplicationPortalView.vue'),props:{kind:'recruitment'}},
 {path:'/campus',alias:'/facilities',name:'campus',component:()=>import('../views/FacilitiesView.vue')},
 {path:'/news',name:'news',component:()=>import('../views/NewsView.vue')},
 {path:'/news/:slug',name:'news-detail',component:()=>import('../views/NewsDetailView.vue')},
 {path:'/contact',name:'contact',component:()=>import('../views/ContactView.vue')},
 {path:'/gallery',name:'gallery',component:()=>import('../views/GalleryView.vue')},
 {path:'/notices',name:'notices',component:()=>import('../views/NoticesView.vue')},
 {path:'/notices/:id',name:'notice-detail',component:()=>import('../views/NoticeDetailView.vue')},
 ...informationPages.filter(page => !['learning-areas','early-years','junior-school','chief-advisor-message','vision-mission','admission-requirement','application-process'].includes(page.name)).map(page => ({ path: page.path, name: page.name, component: () => import('../views/InformationView.vue'), props: { title: page.title, description: page.description } })),
 {path:'/:pathMatch(.*)*',redirect:'/'}
]
const router=createRouter({history:createWebHistory(),routes:pages,scrollBehavior(){return {top:0}}})
const { language, tr } = useI18n()
const pageTitles = {
  home: 'Home', about: 'About Us', details: 'Discover PIISC', academics: 'Academics', curriculum: 'Curriculum', 'admission-requirement': 'Admission Requirements',
  athletics: 'Athletics', admissions: 'Admission', 'online-admission': 'Online Admission',
  recruitment: 'Recruitment', campus: 'Campus', news: 'News & Events', 'news-detail': 'News & Events',
  contact: 'Contact', gallery: 'Gallery', notices: 'Notices', 'notice-detail': 'Notice',
  ...Object.fromEntries(informationPages.map(page => [page.name, page.title])),
  'chief-advisor-message': 'Message from the Head of School',
  'application-process': 'Admission Procedures',
  'primary-school':'Primary School (Grades 1–5)', 'middle-school':'Middle School (Grades 6–8)', 'secondary-school':'Secondary School (Grades 9–10)', college:'College (Grades 11–12)', athletics:'Co-Curricular Activities',
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
