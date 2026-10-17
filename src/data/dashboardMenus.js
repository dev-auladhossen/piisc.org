import { LayoutDashboard, UserRound, Users, Megaphone, GraduationCap, Newspaper, Images, BookOpen, CalendarDays, ClipboardList, CreditCard } from 'lucide-vue-next'
import { ROLES, dashboardPathFor } from './roles.js'

const features = {
  admin: [
    { key: 'users', label: 'Users', icon: Users, to: '/dashboard/users', soon: false },
    { key: 'notices', label: 'Notices', icon: Megaphone, to: '/dashboard/notices', soon: false },
    { key: 'admissions', label: 'Admissions', icon: GraduationCap },
    { key: 'news', label: 'News & Events', icon: Newspaper },
    { key: 'gallery', label: 'Gallery', icon: Images },
  ],
  teacher: [
    { key: 'classes', label: 'My Classes', icon: BookOpen },
    { key: 'attendance', label: 'Attendance', icon: CalendarDays },
    { key: 'results', label: 'Results', icon: ClipboardList },
    { key: 'notices', label: 'Notices', icon: Megaphone },
  ],
  student: [
    { key: 'results', label: 'Results', icon: ClipboardList },
    { key: 'attendance', label: 'Attendance', icon: CalendarDays },
    { key: 'fees', label: 'Fees', icon: CreditCard },
    { key: 'notices', label: 'Notices', icon: Megaphone },
  ],
  parent: [
    { key: 'children', label: 'My Children', icon: Users },
    { key: 'results', label: 'Results', icon: ClipboardList },
    { key: 'attendance', label: 'Attendance', icon: CalendarDays },
    { key: 'fees', label: 'Fees', icon: CreditCard },
    { key: 'notices', label: 'Notices', icon: Megaphone },
  ],
}

export const menusByRole = Object.fromEntries(ROLES.map(role => [role, [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard, to: dashboardPathFor(role), soon: false },
  { key: 'profile', label: 'My profile', icon: UserRound, to: '/dashboard/profile', soon: false },
  ...features[role].map(item => ({ ...item, to: item.to ?? null, soon: item.soon ?? true })),
]]))

export function menuFor(role) {
  return Object.hasOwn(menusByRole, role) ? menusByRole[role] : []
}

export function overviewTilesFor(role) {
  return menuFor(role).filter(item => item.soon)
}

// Both account views share the same safe date formatting and fallback messages.
export function formatLastLogin(value, language) {
  if (value == null || value === '' || (typeof value === 'string' && !value.trim())) return 'First login'
  if (!['string', 'number'].includes(typeof value) && !(value instanceof Date)) return 'Date unavailable'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Date unavailable'
  return new Intl.DateTimeFormat(language === 'bn' ? 'bn-BD' : 'en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(date)
}
