<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n.js'

// The parent page supplies one notice from the API. This card only displays it;
// fetching with src/api.js will happen in the pages added in later phases.
const props = defineProps({ notice: { type: Object, required: true } })
const { language } = useI18n()
const copy = (en, bn) => language.value === 'bn' ? bn : en

const categories = {
  general: ['General', 'সাধারণ'],
  admission: ['Admission', 'ভর্তি'],
  event: ['Event', 'অনুষ্ঠান'],
  holiday: ['Holiday', 'ছুটি'],
  exam: ['Exam', 'পরীক্ষা'],
  meeting: ['Meeting', 'সভা'],
}
const categoryLabel = computed(() => {
  const labels = categories[props.notice.category]
  return labels ? copy(...labels) : copy('Notice', 'নোটিশ')
})

// Collapse line breaks for the preview and shorten long content to 160 characters.
// Vue's {{ }} interpolation displays content as plain text, never as HTML.
const preview = computed(() => {
  const content = typeof props.notice.content === 'string'
    ? props.notice.content.replace(/\s+/g, ' ').trim() : ''
  const characters = Array.from(content)
  return characters.length > 160 ? `${characters.slice(0, 160).join('').trimEnd()}…` : content
})

// Keep date-only values on their original calendar day. ISO timestamps use the
// viewer's local timezone. Missing or invalid dates get a readable fallback.
const publishedDate = computed(() => {
  const value = props.notice.publishDate
  if (typeof value !== 'string' || !value.trim()) return null
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00` : value)
  if (Number.isNaN(date.getTime())) return null
  return {
    value,
    label: new Intl.DateTimeFormat(language.value === 'bn' ? 'bn-BD' : 'en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
    }).format(date),
  }
})

// Use the backend's _id, rather than the old demo notices' id field.
const detailLink = computed(() => ({ name: 'notice-detail', params: { id: props.notice._id } }))

// The original design shows a blue calendar strip alongside each notice.
function datePart(part) {
  const value = publishedDate.value?.value
  if (!value) return '—'
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? value + 'T12:00:00' : value)
  return new Intl.DateTimeFormat(language.value === 'bn' ? 'bn-BD' : 'en-GB', {
    [part]: part === 'day' ? '2-digit' : part === 'year' ? 'numeric' : 'short',
  }).format(date)
}
</script>

<template>
<RouterLink :to="detailLink" :class="notice.isImportant === true ? '[&&]:border-[#d4a72b] [&&]:bg-[#fffaf0]' : ''" class="pdf-notice-card [overflow-wrap:anywhere] [&&]:flex [&&]:min-h-[145px] [&&]:overflow-x-hidden [&&]:overflow-y-hidden [&&]:[border-bottom-left-radius:9px] [&&]:[border-bottom-right-radius:9px] [&&]:[border-top-left-radius:9px] [&&]:[border-top-right-radius:9px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(23,_63,_142)] [&&]:[transition-behavior:normal,_normal] [&&]:[transition-delay:0s,_0s] [&&]:[transition-duration:0.3s,_0.3s] [&&]:[transition-property:transform,_box-shadow] [&&]:[transition-timing-function:ease-out,_ease] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[box-shadow:rgba(23,_58,_106,_0.043)_0px_10px_26px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(220,_229,_243)] [&.pdf-notice-card:hover]:[box-shadow:rgba(24,_49,_62,_0.094)_0px_12px_25px] [&.pdf-notice-card:hover]:[transform:translateY(-5px)]">
              <span :aria-label="publishedDate?.label || copy('Date unavailable', 'তারিখ পাওয়া যায়নি')" class="pdf-date [&&]:flex [&&]:min-w-[60px] [&&]:flex-col [&&]:items-center [&&]:justify-center [&&]:gap-x-[3px] [&&]:gap-y-[3px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(41,_78,_158)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:white] [&&]:[font-size:20px] [&&]:leading-[1.2] [&&]:p-[16px_12px]"><strong class="[&&]:[font-size:25px]">{{ datePart('day') }}</strong><span>{{ datePart('month') }}</span><span>{{ datePart('year') }}</span></span>
              <span class="pdf-card-content [&&]:flex-1 [&&]:flex [&&]:min-w-[0px] [&&]:flex-col [&&]:gap-x-[10px] [&&]:gap-y-[10px] [&&]:p-[15px_12px]"><small class="[&&]:[color:rgb(160,_120,_23)] [&&]:[font-size:10px] [&&]:font-[700]" >{{ categoryLabel }}</small><small v-if="notice.isImportant === true" class="font-bold text-[#a07817]">{{ copy('Important', 'গুরুত্বপূর্ণ') }}</small><strong class="[&&]:[font-size:18px] [&&]:leading-[1.5] [&&]:font-[700]" >{{ notice.title }}</strong><span class="text-[13px] leading-[1.6] text-[#60718e]">{{ preview }}</span><span class="[&&]:mt-[auto] [&&]:[font-size:13px] [&&]:font-[750] [&&]:[color:rgb(41,_78,_158)]">{{ copy('Read notice ↗', 'বিস্তারিত পড়ুন ↗') }}</span></span>
            </RouterLink>
</template>
