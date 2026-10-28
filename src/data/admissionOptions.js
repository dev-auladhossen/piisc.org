// The backend will use the SAME slugs, so they must not change without changing the backend.
export const classes = Array.from({ length: 12 }, (_, index) => ({
  value: `class-${index + 1}`,
  en: `Class ${index + 1}`,
  bn: `শ্রেণি ${index + 1}`,
}));

export const divisions = [
  { value: "science", en: "Science", bn: "বিজ্ঞান" },
  { value: "business-studies", en: "Business Studies", bn: "ব্যবসায় শিক্ষা" },
  { value: "humanities", en: "Humanities", bn: "মানবিক" },
];

export const genders = [
  { value: "male", en: "Male", bn: "ছেলে" },
  { value: "female", en: "Female", bn: "মেয়ে" },
  { value: "other", en: "Other", bn: "অন্যান্য" },
];

export const bloodGroups = [
  { value: "a-positive", en: "A+", bn: "এ+" },
  { value: "a-negative", en: "A−", bn: "এ−" },
  { value: "b-positive", en: "B+", bn: "বি+" },
  { value: "b-negative", en: "B−", bn: "বি−" },
  { value: "ab-positive", en: "AB+", bn: "এবি+" },
  { value: "ab-negative", en: "AB−", bn: "এবি−" },
  { value: "o-positive", en: "O+", bn: "ও+" },
  { value: "o-negative", en: "O−", bn: "ও−" },
];

export const concessions = [
  { value: "none", en: "None", bn: "নেই" },
  { value: "sibling", en: "Sibling concession", bn: "ভাইবোনের ছাড়" },
  { value: "staff", en: "Staff concession", bn: "কর্মচারী ছাড়" },
  { value: "other", en: "Other", bn: "অন্যান্য" },
];

export const relationships = [
  { value: "father", en: "Father", bn: "বাবা" },
  { value: "mother", en: "Mother", bn: "মা" },
  { value: "guardian", en: "Guardian", bn: "অভিভাবক" },
  { value: "grandparent", en: "Grandparent", bn: "দাদা/দাদি/নানা/নানি" },
  { value: "other", en: "Other", bn: "অন্যান্য" },
];

// Assumption: classes 9–12 use academic divisions; no existing rule was found.
export const DIVISION_CLASSES = ["class-9", "class-10", "class-11", "class-12"];

// Copy the backend's configured sessions into VITE_ADMISSION_SESSIONS for deployment.
// A local test value is accepted only during Vite development and is not an official session.
const configuredSessions = String(import.meta.env.VITE_ADMISSION_SESSIONS || "")
  .split(",")
  .map((session) => session.trim())
  .filter(Boolean);
const localTestSession = import.meta.env.DEV
  ? String(import.meta.env.VITE_ADMISSION_TEST_SESSION || "").trim()
  : "";

export const admissionSessions = [...new Set([...configuredSessions, ...(localTestSession ? [localTestSession] : [])])];
export const isAdmissionTestSession = (session) => Boolean(localTestSession && session === localTestSession);
