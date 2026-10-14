export const ROLES = ['admin', 'teacher', 'student', 'parent']

export function dashboardPathFor(role) {
  return ROLES.includes(role) ? `/dashboard/${role}` : null
}

// These are English source labels; translate them when rendering the UI.
export const roleLabels = {
  admin: 'Admin', teacher: 'Teacher', student: 'Student', parent: 'Parent',
}
