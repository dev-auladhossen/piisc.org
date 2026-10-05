// Populate with PIISC's confirmed contact details and social profile URLs.
export const headerContacts = {
  phone: "+880 1747740774 ",
  email: "admissions@piisc.org",
  eiin: "110608",
  socials: { whatsapp: "", facebook: "https://www.facebook.com/piisc2026/", instagram: "", youtube: "" },
};
export const navigation = [
  { id: "home", label: "Home", to: "/" },
  {
    id: "about",
    label: "About",
    children: [
      { label: "About Us", to: "/about" },
      { label: "Vision & Mission", to: "/vision-mission" },
      { label: "Message from the HOS", to: "/chief-advisor-message" },
    ],
  },
  {
    id: "admissions",
    label: "Admission",
    children: [
      { label: "Admission Requirements", to: "/admission-requirement" },
      { label: "Admission Procedures", to: "/application-process" },
    ],
  },
  {
    id: "academics",
    label: "Academic",
    children: [
      { label: "Primary School (Grades 1–5)", to: "/primary-school" },
      { label: "Middle School (Grades 6–8)", to: "/middle-school" },
      { label: "Secondary School (Grades 9–10)", to: "/secondary-school" },
      { label: "College (Grades 11–12)", to: "/college" },
      { label: "Activities", to: "/extra-curricular-activities" },
    ],
  },
  {
    id: "explore",
    label: "Explore",
    children: [
      { label: "Facilities", to: "/campus" },
    { label: "Curriculum", to: "/curriculum" },
      { label: "Our Learning Areas", to: "/learning-areas" },
      { label: "News & Events", to: "/news" },
    ],
  },
  { id: "gallery", label: "Gallery", to: "/gallery" },
  { id: "notices", label: "Notice", to: "/notices" },
  { id: "contact", label: "Contact", to: "/contact" },
];
export const informationPages = [
  ...[
    ["vision-mission", "Vision & Mission"],
    ["early-years", "Early Years (Play, Nursery, KG)"],
    ["junior-school", "Junior School (Grade I–III)"],
    ["learning-areas", "Our Learning Areas"],
  ].map(([slug, title]) => ({
    path: `/${slug}`,
    name: slug,
    title,
    description: `${title} information for PIISC will be published here.`,
  })),
  ...[
    ["academic-calendar", "Academic Calendar"],
    ["admission-notice", "Admission Notice"],
    ["admission-requirement", "Admission Requirement"],
    ["application-process", "Application Process"],
    ["admission-test", "Admission Test"],
    ["admission-test-results", "Admission Test Results"],
    ["admission-form", "Admission Form"],
    ["admission-process", "Admission Process"],
  ].map(([slug, title]) => ({
    path: `/${slug}`,
    name: slug,
    title,
    description: `${title} information will be published here once confirmed by PIISC. Please contact the school for assistance.`,
  })),
  {
    path: "/chief-advisor-message",
    name: "chief-advisor-message",
    title: "Chief Advisor’s Message",
    description:
      "A message from the Chief Advisor of PIISC will be published here once available.",
  },
  {
    path: "/our-team",
    name: "our-team",
    title: "Meet Our Team",
    description:
      "Meet the people behind PIISC. Leadership and staff profiles will be shared here once confirmed.",
  },
  {
    path: "/student-parents-handbook",
    name: "student-parents-handbook",
    title: "Student-Parents Handbook",
    description:
      "The official PIISC handbook for students and parents will be available here once published.",
  },
  {
    path: "/student-support",
    name: "student-support",
    title: "Student Support-PIISC",
    description:
      "Information about student support at PIISC will be published here once confirmed.",
  },
  {
    path: "/careers",
    name: "careers",
    title: "Careers",
    description:
      "Confirmed opportunities to join PIISC will be announced here.",
  },
  ...["1st", "2nd", "3rd", "4th"].map((edition, index) => ({
    path: `/newsletter/${index + 1}`,
    name: `newsletter-${index + 1}`,
    title: `Newsletter — ${edition} Edition`,
    description:
      "This edition of the PIISC newsletter has not been published yet. Please check back for school news and updates.",
  })),
];
