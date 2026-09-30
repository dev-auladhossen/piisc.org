# PIISC website — local starter

Vue 3 + Vite + JavaScript + Vue Router + Tailwind CSS + Lucide Vue. No backend or API keys.

## Run locally

```bash
npm install
npm run dev
```

Open the localhost URL printed by Vite (normally http://localhost:5173). For a production compilation, run `npm run build`.

## Before publishing

- Confirm school claims, curriculum, admission information and official contacts with PIISC.
- `src/assets/images/` contains the five supplied assets. The building and student visuals are presented as **school-supplied concepts**, not verified facility photographs. Obtain permission and confirm accuracy before publishing.
- `src/data/content.js` holds English and Bangla text and example news entries. The news items and values statements are editable proposed copy, not official announcements or endorsements.
- `src/components/ContactForm.vue` is a demonstration form. It will display a notice because `VERIFIED_SCHOOL_EMAIL` is empty. Set an officially verified email to enable the `mailto:` flow, or connect a production form service. Do not publish as a working submission form before configuring it.
- `src/views/ContactView.vue` contains an honest map placeholder until a verified map location is supplied.

## Routes

`/`, `/about`, `/academics`, `/admissions`, `/campus`, `/news`, `/news/:slug`, `/contact`.

## Assets

- `piisc-logo.png` — school emblem
- `campus-front.png`, `campus-view.png` — supplied campus building concepts
- `student-concept.png`, `english-medium-artwork.png` — supplied promotional concepts

All image imports are local. No third-party image URL is required.
