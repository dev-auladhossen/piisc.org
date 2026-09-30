// Replace the draft paragraphs with each leader's approved message, then set draft to false.
import chairmanPhoto from '../assets/images/chairman.png'
import principalPhoto from '../assets/images/principle.png'
export const leaders = [
  {
    id: 'chairman',
    name: 'Mufti Kazi Ibrahim',
    role: 'Chairman',
    photo: chairmanPhoto,
    initials: 'MKI',
    draft: true,
    paragraphs: [
      'Assalamu Alaikum wa Rahmatullahi wa Barakatuh.',
      'Welcome to Peace International Islamic School & College. Our vision is to bring knowledge, faith and character together in a learning environment where children can grow with confidence and a sense of responsibility.',
      'Education should help a young person think carefully, act honestly and care for others. Alongside academic learning, we value compassion, discipline and respect, guided by the teachings and values of Islam.',
      'A school community grows through the shared effort of families, teachers and students. By listening to one another and working together, we can encourage children to develop their abilities and use them for the benefit of others.',
      'We welcome families to learn more about PIISC and the educational journey we hope to build together. May Allah guide our efforts and grant our children beneficial knowledge, good character and a purposeful future.',
    ],
  },
  {
    id: 'principal',
    name: 'Sheikh Mohammad Shopon Pervesh',
    role: 'Principal',
    photo: principalPhoto,
    initials: 'SP',
    profile: 'https://web.facebook.com/shekmohammad.pervesh',
    draft: true,
    paragraphs: [
      'Assalamu Alaikum wa Rahmatullahi wa Barakatuh.',
      'Welcome to Peace International Islamic School & College. Our educational vision begins with a simple belief: children learn best when they feel encouraged to ask questions, practise new skills and take pride in their progress.',
      'We aim to connect academic understanding with curiosity, creativity and Islamic values. Reading, thoughtful discussion and learning alongside others can help students develop both confidence and a deeper understanding of the world.',
      'School life is also a place to learn kindness, cooperation and personal responsibility. Classroom learning, creative activities and opportunities for teamwork all contribute to a child’s growth.',
      'The partnership between home and school is essential. We invite parents to stay involved, share their questions and work with us to support each child’s learning journey. Together, we can nurture learners who approach the future with knowledge, integrity and hope.',
    ],
  },
]
