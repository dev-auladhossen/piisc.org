// Fictional UI examples. Replace this module with the public routines API later.
export const examSessions = [
  { value: "2026-2027-demo", label: "2026–2027 (Demo)" },
  { value: "2025-2026-demo", label: "2025–2026 (Demo)" },
];

export const examClasses = ["Class 5", "Class 8", "Class 10", "Class 12"];

export const examRoutines = [
  {
    id: "routine-2026-class-5-midyear",
    examination: "Mid-Year Assessment (Demo)",
    className: "Class 5",
    session: "2026-2027-demo",
    publishedOn: "2026-05-12",
    documentAvailable: true,
    pdfUrl: null,
    schedule: [
      { date: "2026-06-02", day: "Tuesday", time: "9:00–11:00 AM", subject: "English" },
      { date: "2026-06-04", day: "Thursday", time: "9:00–11:00 AM", subject: "Mathematics" },
      { date: "2026-06-07", day: "Sunday", time: "9:00–11:00 AM", subject: "Science" },
    ],
  },
  {
    id: "routine-2026-class-8-term1",
    examination: "Term One Examination (Demo)",
    className: "Class 8",
    session: "2026-2027-demo",
    publishedOn: "2026-05-15",
    documentAvailable: true,
    pdfUrl: null,
    schedule: [
      { date: "2026-06-01", day: "Monday", time: "9:00–11:30 AM", subject: "Bangla" },
      { date: "2026-06-03", day: "Wednesday", time: "9:00–11:30 AM", subject: "English" },
      { date: "2026-06-08", day: "Monday", time: "9:00–11:30 AM", subject: "Mathematics" },
    ],
  },
  {
    id: "routine-2026-class-10-model",
    examination: "Model Examination (Demo)",
    className: "Class 10",
    session: "2025-2026-demo",
    publishedOn: "2025-11-18",
    documentAvailable: true,
    pdfUrl: null,
    schedule: [
      { date: "2025-12-02", day: "Tuesday", time: "10:00 AM–1:00 PM", subject: "English First Paper" },
      { date: "2025-12-04", day: "Thursday", time: "10:00 AM–1:00 PM", subject: "Bangla First Paper" },
      { date: "2025-12-07", day: "Sunday", time: "10:00 AM–1:00 PM", subject: "General Mathematics" },
    ],
  },
  {
    id: "routine-2025-class-5-final",
    examination: "Year-End Assessment (Demo)",
    className: "Class 5",
    session: "2025-2026-demo",
    publishedOn: "2025-10-20",
    documentAvailable: true,
    pdfUrl: null,
    schedule: [
      { date: "2025-11-10", day: "Monday", time: "9:00–11:00 AM", subject: "English" },
      { date: "2025-11-12", day: "Wednesday", time: "9:00–11:00 AM", subject: "Mathematics" },
      { date: "2025-11-16", day: "Sunday", time: "9:00–11:00 AM", subject: "Bangla" },
    ],
  },
];
