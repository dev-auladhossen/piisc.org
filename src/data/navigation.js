// Populate with PIISC's confirmed contact details and social profile URLs.
export const headerContacts = {
  phone: "+880 1979-702827 ",
  email: "admissions@piisc.org",
  eiin: "110608",
  socials: { whatsapp: "", facebook: "", instagram: "", youtube: "" },
};
export const navigation = [
  { id: "home", label: "Home", to: "/" },
  {
    id: "about",
    label: "About Us",
    children: [
      { label: "Chief Advisor’s Message", to: "/chief-advisor-message" },
      {
        label: "About Us-Peace International Islamic School & College",
        to: "/about",
      },
      { label: "Meet Our Team", to: "/our-team" },
      { label: "Contact us", to: "/contact" },
      { label: "Student-Parents Handbook", to: "/student-parents-handbook" },
    ],
  },
  { id: "academics", label: "Academics", children: [
    { label: "Academic Affairs", to: "/academics" },
    { label: "Academic Calendar", to: "/academic-calendar" },
  ] },
  { id: "admissions", label: "Admission", to: "/admissions" },
  { id: "notices", label: "Notices", to: "/notices" },
  { id: "gallery", label: "Gallery", to: "/gallery" },
  { id: "contact", label: "Contact", to: "/contact" },
  { id: "more", label: "More", children: [
  { label: "PIISC News & Events", to: "/news" },
  {
    id: "newsletter",
    label: "Newsletter",
    children: [
      { label: "1st Edition", to: "/newsletter/1" },
      { label: "2nd Edition", to: "/newsletter/2" },
      { label: "3rd Edition", to: "/newsletter/3" },
      { label: "4th Edition", to: "/newsletter/4" },
    ],
  },
  { label: "Student Support-PIISC", to: "/student-support" },
  { label: "Careers", to: "/careers" },
  ] },
];
export const informationPages = [
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
    path: `/${slug}`, name: slug, title,
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

