export const noticeCategories = [
  { value: 'general', en: 'General', bn: 'সাধারণ' },
  { value: 'admission', en: 'Admission', bn: 'ভর্তি' },
  { value: 'event', en: 'Event', bn: 'অনুষ্ঠান' },
  { value: 'holiday', en: 'Holiday', bn: 'ছুটি' },
  { value: 'exam', en: 'Exam', bn: 'পরীক্ষা' },
  { value: 'meeting', en: 'Meeting', bn: 'সভা' },
]

export function categoryLabel(value, language = 'en') {
  const category = noticeCategories.find(item => item.value === value)
  return category ? category[language === 'bn' ? 'bn' : 'en'] : (language === 'bn' ? 'নোটিশ' : 'Notice')
}
