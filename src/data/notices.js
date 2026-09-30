// Add confirmed school notices here. Dates use YYYY-MM-DD; bodies are plain-text paragraphs.
import { demoNotices } from './demoNotices.js'
export const notices = [
  ...demoNotices,
  {
    id: 'admission-information',
    title: 'Admissions information: updates to follow',
    audience: 'Everyone',
    pinned: true,
    published: null,
    expires: null,
    informational: true,
    body: [
      'Please contact PIISC directly for the latest admission information.',
      'Dates, eligibility, required documents and the official admission process will be published once confirmed by the school.',
      'This is an information update, not an official admission announcement.',
    ],
  },
]
export function filterNotices(items, query, audience, translate = value => value) {
  const search = query.trim().toLowerCase()
  return items.filter(item => (audience === 'All' || item.audience === audience) &&
    `${item.title} ${item.body.join(' ')} ${translate(item.title)} ${item.body.map(translate).join(' ')}`.toLowerCase().includes(search))
}
