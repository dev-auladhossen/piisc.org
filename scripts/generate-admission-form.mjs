import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const page = []
const esc = value => value.replaceAll('\\', '\\\\').replaceAll('(', '\\(').replaceAll(')', '\\)')
const text = (value, x, y, size = 10, bold = false, color = '0.10 0.22 0.44') => {
  page.push(`${color} rg BT /${bold ? 'F2' : 'F1'} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${esc(value)}) Tj ET`)
}
const line = (x1, y1, x2, y2, color = '0.80 0.84 0.91', width = 0.8) => {
  page.push(`${color} RG ${width} w ${x1} ${y1} m ${x2} ${y2} l S`)
}
const field = (label, x, y, width) => {
  text(label, x, y, 9, true)
  line(x, y - 18, x + width, y - 18)
}
const heading = (label, y) => {
  page.push(`0.16 0.31 0.62 rg 47 ${y - 6} 501 23 re f`)
  text(label, 58, y + 1, 11, true, '1 1 1')
}

page.push('0.98 0.98 1 rg 0 0 595 842 re f')
page.push('0.16 0.31 0.62 rg 0 787 595 55 re f')
page.push('0.84 0.70 0.24 rg 0 782 595 5 re f')
text('PEACE INTERNATIONAL ISLAMIC SCHOOL & COLLEGE', 48, 811, 15, true, '1 1 1')
text('Unique, DEPZ Road, Ashulia, Savar, Dhaka-1349, Bangladesh', 48, 796, 8, false, '0.93 0.95 1')
text('ADMISSION APPLICATION FORM', 47, 751, 19, true)
text('Please complete this form and return it to the admission office.', 47, 732, 10, false, '0.36 0.43 0.55')

heading('STUDENT INFORMATION', 698)
field('Student full name', 48, 666, 499)
field('Date of birth', 48, 624, 220)
field('Class applied for', 290, 624, 257)
field('Current / previous school', 48, 582, 499)

heading('PARENT / GUARDIAN INFORMATION', 547)
field('Parent / guardian full name', 48, 515, 499)
field('Phone number', 48, 473, 220)
field('Email address', 290, 473, 257)
field('Present address', 48, 431, 499)

heading('ADDITIONAL INFORMATION', 396)
field('Relevant health or learning information (optional)', 48, 364, 499)
field('Questions or notes for the admission office (optional)', 48, 322, 499)

heading('DECLARATION', 287)
text('I confirm that the information provided above is accurate to the best of my knowledge.', 48, 251, 9)
field('Parent / guardian signature', 48, 214, 300)
field('Date', 372, 214, 175)

line(48, 168, 547, 168, '0.84 0.70 0.24', 1.2)
text('This printable form is for preparing an admission application.', 48, 150, 9)
text('Please contact the school to confirm current requirements and submission steps.', 48, 136, 9)
text('Phone: +880 1747740774   Email: admissions@piisc.org', 48, 110, 9, true)
text('Completing or downloading this PDF does not submit an application online.', 48, 88, 8, false, '0.36 0.43 0.55')

const stream = page.join('\n') + '\n'
const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  `<< /Length ${Buffer.byteLength(stream, 'ascii')} >>\nstream\n${stream}endstream`,
]
let pdf = '%PDF-1.4\n'
const offsets = [0]
for (const [index, object] of objects.entries()) {
  offsets.push(Buffer.byteLength(pdf, 'ascii'))
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`
}
const xref = Buffer.byteLength(pdf, 'ascii')
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
for (const offset of offsets.slice(1)) pdf += `${String(offset).padStart(10, '0')} 00000 n \n`
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`
const output = join(process.cwd(), 'public', 'forms', 'admission-form.pdf')
mkdirSync(join(process.cwd(), 'public', 'forms'), { recursive: true })
writeFileSync(output, Buffer.from(pdf, 'ascii'))
console.log(output)
