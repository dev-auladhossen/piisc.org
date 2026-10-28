<script setup>
import { computed, nextTick, reactive, ref } from "vue";
import { CheckCircle2, ChevronRight, Loader2, Send } from "lucide-vue-next";
import { classes, relationships, DIVISION_CLASSES, admissionSessions, isAdmissionTestSession } from "../data/admissionOptions.js";
import AdmissionField from "../components/admission/AdmissionField.vue";
import ToastNotification from "../components/ToastNotification.vue";
import { useI18n } from "../composables/useI18n.js";
import { admissionSubmissionErrorMessage, submitAdmissionApplication } from "../services/admissionsApi.js";
import { isValidBangladeshPhone } from "../utils/admissionForm.js";

const { language } = useI18n();
const isBangla = computed(() => language.value === "bn");
const tr = (en, bn) => isBangla.value ? bn : en;
const availableClasses = classes.filter((item) => item.value === "class-5");
const testSession = computed(() => admissionSessions.find(isAdmissionTestSession) || "");
const usesDivision = computed(() => DIVISION_CLASSES.includes(form.applyingClass));
const form = reactive({
  studentFullName: "", dateOfBirth: "", applyingClass: "", division: "", academicSession: "",
  guardianFullName: "", guardianRelationship: "", guardianPhone: "",
  guardianEmail: "", address: "", previousSchool: "", message: "", consentConfirmed: false,
});
const errors = reactive({});
const submitting = ref(false);
const failure = ref("");
const success = ref(null);
const toast = ref(null);
const formElement = ref(null);
const errorSummary = ref(null);

function focusFirstError() {
  const control = formElement.value?.querySelector('[aria-invalid="true"]');
  (control || errorSummary.value)?.focus?.({ preventScroll: false });
}

function validate() {
  Object.keys(errors).forEach((key) => delete errors[key]);
  if (form.studentFullName.trim().length < 2) errors.studentFullName = "Enter the student's full name.";
  if (form.dateOfBirth) {
    const [year, month, day] = form.dateOfBirth.split("-").map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.dateOfBirth) || Number.isNaN(birthDate.getTime()) || birthDate.getFullYear() !== year || birthDate.getMonth() !== month - 1 || birthDate.getDate() !== day || birthDate >= todayStart) {
      errors.dateOfBirth = "Enter a valid date in the past.";
    }
  }
  if (!availableClasses.some((item) => item.value === form.applyingClass)) errors.applyingClass = "Select an available class.";
  if (usesDivision.value && !form.division) errors.division = "Select an academic division.";
  if (!admissionSessions.includes(form.academicSession)) errors.academicSession = "Select an available academic session.";
  if (form.guardianFullName.trim().length < 2) errors.guardianFullName = "Enter a parent or guardian name.";
  if (!form.guardianRelationship) errors.guardianRelationship = "Select the relationship.";
  if (!isValidBangladeshPhone(form.guardianPhone)) errors.guardianPhone = "Enter a valid Bangladesh mobile number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.guardianEmail.trim())) errors.guardianEmail = "Enter a valid email address.";
  if (!form.consentConfirmed) errors.consentConfirmed = "Consent is required to submit this application.";
  return Object.keys(errors).length === 0;
}

async function submit() {
  failure.value = "";
  success.value = null;
  if (submitting.value) return;
  toast.value = null;
  if (!validate()) {
    await nextTick();
    focusFirstError();
    return;
  }
  submitting.value = true;
  const body = {
    studentFullName: form.studentFullName.trim(),
    applyingClass: classes.find((item) => item.value === form.applyingClass)?.en,
    academicSession: form.academicSession,
    guardianFullName: form.guardianFullName.trim(),
    guardianRelationship: relationships.find((item) => item.value === form.guardianRelationship)?.en,
    guardianPhone: form.guardianPhone.trim(),
    guardianEmail: form.guardianEmail.trim(),
    consentConfirmed: form.consentConfirmed,
  };
  for (const key of ["dateOfBirth", "address", "previousSchool", "message"]) {
    if (form[key].trim()) body[key] = form[key].trim();
  }
  try {
    const result = await submitAdmissionApplication(body);
    success.value = {
      applicationNumber: typeof result?.applicationNumber === "string" ? result.applicationNumber : "",
      adminNotification: result?.adminNotification,
    };
    toast.value = {
      type: "success",
      message: success.value.applicationNumber
        ? `Application submitted successfully! Your application number is ${success.value.applicationNumber}.`
        : "Application submitted successfully!",
    };
    Object.keys(form).forEach((key) => { form[key] = key === "consentConfirmed" ? false : ""; });
    Object.keys(errors).forEach((key) => delete errors[key]);
  } catch (error) {
    const serverErrors = error?.response?.data?.errors;
    if (error?.response?.status === 400 && serverErrors && typeof serverErrors === "object") {
      for (const key of Object.keys(form)) if (serverErrors[key]) errors[key] = "Please check this field.";
    }
    failure.value = admissionSubmissionErrorMessage(error);
    toast.value = { type: "error", message: failure.value };
    await nextTick();
    focusFirstError();
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <main class="min-h-[70vh] bg-[#f6f8fb] px-4 py-10 text-[#18283f] sm:px-6 sm:py-14">
    <ToastNotification v-if="toast" :type="toast.type" :message="toast.message" @close="toast = null" />
    <div class="mx-auto max-w-[960px]">
      <nav class="mb-6 flex items-center gap-2 text-sm text-[#64748b]" :aria-label="tr('Breadcrumb', 'পথনির্দেশ')">
        <RouterLink to="/" class="hover:text-[#294e9e]">{{ tr("Home", "হোম") }}</RouterLink>
        <ChevronRight :size="15" aria-hidden="true" />
        <span aria-current="page" class="font-semibold text-[#294e9e]">{{ tr("Online admission", "অনলাইন ভর্তি") }}</span>
      </nav>
      <header class="mb-7">
        <p class="mb-2 text-xs font-extrabold uppercase tracking-[.16em] text-[#ad8126]">{{ tr("Peace International Islamic School & College", "পিস ইন্টারন্যাশনাল ইসলামিক স্কুল অ্যান্ড কলেজ") }}</p>
        <h1 class="text-3xl font-bold text-[#173f8e] sm:text-4xl">{{ tr("Admission application", "ভর্তির আবেদন") }}</h1>
        <p class="mt-3 max-w-2xl leading-7 text-[#60718e]">{{ tr("Share your details with the admissions office. Submitting this form does not confirm admission; the school will contact you about next steps.", "ভর্তি বিভাগকে আপনার তথ্য জানান। এই ফর্ম জমা দিলে ভর্তি নিশ্চিত হয় না; পরবর্তী ধাপের জন্য স্কুল আপনার সঙ্গে যোগাযোগ করবে।") }}</p>
        <p class="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm font-semibold text-amber-900" role="note">{{ testSession ? tr(`TESTING: ${testSession} is a temporary session value for local API testing, not an officially announced school session.`, `পরীক্ষামূলক: ${testSession} শুধু স্থানীয় API পরীক্ষার অস্থায়ী শিক্ষাবর্ষ, স্কুলের আনুষ্ঠানিক ঘোষণা নয়।`) : tr("Applications are sent to the configured admissions API. Available sessions must also be configured by the backend.", "আবেদন কনফিগার করা ভর্তি API-তে পাঠানো হবে। উপলভ্য শিক্ষাবর্ষ ব্যাকএন্ডেও কনফিগার থাকতে হবে।") }}</p>
      </header>

      <form ref="formElement" class="space-y-6 rounded-2xl border border-[#dce5ef] bg-white p-5 shadow-[0_9px_30px_rgba(20,40,60,.045)] sm:p-8" novalidate @submit.prevent="submit">
        <div v-if="success" role="status" aria-live="polite" class="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
          <p class="flex items-center gap-2 font-semibold"><CheckCircle2 :size="19" aria-hidden="true" />{{ tr("Your application was received.", "আপনার আবেদনটি গ্রহণ করা হয়েছে।") }}</p>
          <p v-if="success.applicationNumber" class="mt-1 text-sm">{{ tr("Application number:", "আবেদন নম্বর:") }} <strong>{{ success.applicationNumber }}</strong></p>
          <p v-if="success.adminNotification === 'failed'" class="mt-1 text-sm">{{ tr("The application was received, but the admin email notification failed.", "আবেদনটি গ্রহণ করা হয়েছে, তবে প্রশাসনিক ইমেইল বিজ্ঞপ্তি পাঠানো যায়নি।") }}</p>
          <p v-else-if="success.adminNotification === 'unavailable'" class="mt-1 text-sm">{{ tr("The application was received; admin email notifications are not configured.", "আবেদনটি গ্রহণ করা হয়েছে; প্রশাসনিক ইমেইল বিজ্ঞপ্তি কনফিগার করা নেই।") }}</p>
        </div>
        <div v-if="failure" ref="errorSummary" tabindex="-1" role="alert" class="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 outline-none focus-visible:ring-2 focus-visible:ring-red-700">{{ tr(failure, failure) }}</div>

        <section aria-labelledby="applicant-heading" class="space-y-4">
          <h2 id="applicant-heading" class="border-b border-[#e8edf5] pb-2 text-lg font-bold text-[#173f8e]">{{ tr("Student details", "শিক্ষার্থীর তথ্য") }}</h2>
          <div class="grid gap-4 sm:grid-cols-2">
            <AdmissionField v-model="form.studentFullName" :label="tr('Student full name', 'শিক্ষার্থীর পূর্ণ নাম')" required :maxlength="120" :error="errors.studentFullName" autocomplete="name" />
            <AdmissionField v-model="form.dateOfBirth" :label="tr('Date of birth', 'জন্ম তারিখ')" type="date" :error="errors.dateOfBirth" />
            <div>
              <label for="applying-class" class="mb-1.5 block text-sm font-semibold text-[#344b70]">{{ tr("Applying class", "যে শ্রেণিতে আবেদন") }} <span class="text-red-600">*</span></label>
              <select id="applying-class" v-model="form.applyingClass" required class="form-control" :aria-invalid="errors.applyingClass ? 'true' : undefined" :aria-describedby="errors.applyingClass ? 'applying-class-error' : undefined">
                <option value="">{{ tr("Select a class", "শ্রেণি নির্বাচন করুন") }}</option>
                <option v-for="item in availableClasses" :key="item.value" :value="item.value">{{ tr(item.en, item.bn) }}</option>
              </select>
              <p v-if="errors.applyingClass" id="applying-class-error" role="alert" class="mt-1 text-sm text-red-700">{{ tr(errors.applyingClass, errors.applyingClass) }}</p>
            </div>
            <div v-if="usesDivision">
              <label for="applying-division" class="mb-1.5 block text-sm font-semibold text-[#344b70]">{{ tr("Academic division", "শিক্ষা বিভাগ") }} <span class="text-red-600">*</span></label>
              <select id="applying-division" v-model="form.division" required class="form-control" :aria-invalid="errors.division ? 'true' : undefined" :aria-describedby="errors.division ? 'applying-division-error' : undefined"><option value="">{{ tr("Select a division", "বিভাগ নির্বাচন করুন") }}</option><option v-for="item in divisions" :key="item.value" :value="item.value">{{ tr(item.en, item.bn) }}</option></select>
              <p v-if="errors.division" id="applying-division-error" role="alert" class="mt-1 text-sm text-red-700">{{ tr(errors.division, errors.division) }}</p>
            </div>
            <div>
              <label for="academic-session" class="mb-1.5 block text-sm font-semibold text-[#344b70]">{{ tr("Academic session", "শিক্ষাবর্ষ") }} <span class="text-red-600">*</span></label>
              <select id="academic-session" v-model="form.academicSession" required :disabled="!admissionSessions.length" class="form-control disabled:cursor-not-allowed disabled:bg-slate-100" :aria-invalid="errors.academicSession ? 'true' : undefined" :aria-describedby="errors.academicSession ? 'academic-session-error' : 'academic-session-help'"><option value="">{{ admissionSessions.length ? tr("Select a session", "শিক্ষাবর্ষ নির্বাচন করুন") : tr("Not yet announced", "এখনো ঘোষণা হয়নি") }}</option><option v-for="session in admissionSessions" :key="session" :value="session">{{ session === "2027" ? tr("2027 (Testing)", "২০২৭ (পরীক্ষামূলক)") : session }}</option></select>
              <p v-if="errors.academicSession" id="academic-session-error" role="alert" class="mt-1 text-sm text-red-700">{{ tr(errors.academicSession, errors.academicSession) }}</p>
              <p v-else id="academic-session-help" class="mt-1 text-sm text-[#60718e]">{{ admissionSessions.length ? (testSession ? tr("The testing session is available only in local development; the backend still validates its configured sessions.", "পরীক্ষামূলক শিক্ষাবর্ষটি শুধু স্থানীয় ডেভেলপমেন্টে উপলভ্য; ব্যাকএন্ড এর কনফিগার করা শিক্ষাবর্ষ যাচাই করবে।") : tr("Choose a session configured by the admissions backend.", "ভর্তি ব্যাকএন্ডে কনফিগার করা শিক্ষাবর্ষ নির্বাচন করুন.")) : tr("No academic session is configured. Submissions are unavailable until the backend configures one.", "কোনো শিক্ষাবর্ষ কনফিগার করা নেই। ব্যাকএন্ডে সেটি কনফিগার না হওয়া পর্যন্ত আবেদন জমা বন্ধ থাকবে।") }}</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="guardian-heading" class="space-y-4">
          <h2 id="guardian-heading" class="border-b border-[#e8edf5] pb-2 text-lg font-bold text-[#173f8e]">{{ tr("Parent or guardian", "অভিভাবক") }}</h2>
          <div class="grid gap-4 sm:grid-cols-2">
            <AdmissionField v-model="form.guardianFullName" :label="tr('Parent/guardian full name', 'অভিভাবকের পূর্ণ নাম')" required :maxlength="120" :error="errors.guardianFullName" autocomplete="name" />
            <div>
              <label for="guardian-relationship" class="mb-1.5 block text-sm font-semibold text-[#344b70]">{{ tr("Relationship", "সম্পর্ক") }} <span class="text-red-600">*</span></label>
              <select id="guardian-relationship" v-model="form.guardianRelationship" required class="form-control" :aria-invalid="errors.guardianRelationship ? 'true' : undefined" :aria-describedby="errors.guardianRelationship ? 'guardian-relationship-error' : undefined">
                <option value="">{{ tr("Select relationship", "সম্পর্ক নির্বাচন করুন") }}</option>
                <option v-for="item in relationships" :key="item.value" :value="item.value">{{ tr(item.en, item.bn) }}</option>
              </select>
              <p v-if="errors.guardianRelationship" id="guardian-relationship-error" role="alert" class="mt-1 text-sm text-red-700">{{ tr(errors.guardianRelationship, errors.guardianRelationship) }}</p>
            </div>
            <AdmissionField v-model="form.guardianPhone" :label="tr('Phone number', 'ফোন নম্বর')" type="tel" required :maxlength="30" :error="errors.guardianPhone" autocomplete="tel" />
            <AdmissionField v-model="form.guardianEmail" :label="tr('Email address', 'ইমেইল ঠিকানা')" type="email" required :maxlength="254" :error="errors.guardianEmail" autocomplete="email" />
          </div>
        </section>

        <section aria-labelledby="more-heading" class="space-y-4">
          <h2 id="more-heading" class="border-b border-[#e8edf5] pb-2 text-lg font-bold text-[#173f8e]">{{ tr("Additional information", "অতিরিক্ত তথ্য") }}</h2>
          <div class="grid gap-4 sm:grid-cols-2">
            <AdmissionField v-model="form.address" :label="tr('Address', 'ঠিকানা')" :maxlength="500" autocomplete="street-address" />
            <AdmissionField v-model="form.previousSchool" :label="tr('Previous school (optional)', 'পূর্ববর্তী স্কুল (ঐচ্ছিক)')" :maxlength="150" autocomplete="organization" />
            <label class="sm:col-span-2">
              <span class="mb-1.5 block text-sm font-semibold text-[#344b70]">{{ tr("Additional message (optional)", "অতিরিক্ত বার্তা (ঐচ্ছিক)") }}</span>
              <textarea v-model="form.message" rows="5" maxlength="2000" class="form-control min-h-[120px] resize-y" />
            </label>
          </div>
        </section>

        <div>
          <label class="flex items-start gap-3 text-sm leading-6 text-[#344b70]">
            <input v-model="form.consentConfirmed" type="checkbox" required class="mt-1 h-4 w-4 accent-[#294e9e]" :aria-invalid="errors.consentConfirmed ? 'true' : undefined" :aria-describedby="errors.consentConfirmed ? 'consent-error' : undefined" />
            <span>{{ tr("I consent to being contacted about this application and confirm that the information provided is accurate.", "এই আবেদন সম্পর্কে যোগাযোগে সম্মতি দিচ্ছি এবং প্রদত্ত তথ্য সঠিক বলে নিশ্চিত করছি।") }} <span class="text-red-600">*</span></span>
          </label>
          <p v-if="errors.consentConfirmed" id="consent-error" role="alert" class="mt-1 text-sm text-red-700">{{ tr(errors.consentConfirmed, errors.consentConfirmed) }}</p>
        </div>
        <button type="submit" :disabled="submitting || !admissionSessions.length" class="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#294e9e] px-5 font-bold text-white transition hover:bg-[#173f8e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9b33d] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto" :aria-busy="submitting">
          <Loader2 v-if="submitting" :size="18" class="animate-spin" aria-hidden="true" />
          <Send v-else :size="17" aria-hidden="true" />
          {{ submitting ? tr("Submitting…", "জমা হচ্ছে…") : tr("Submit application", "আবেদন জমা দিন") }}
        </button>
      </form>
    </div>
  </main>
</template>

<style scoped>
.form-control {
  @apply min-h-12 w-full rounded-[10px] border border-[#c7d4e8] bg-white px-3.5 py-3 text-base text-[#173f8e] outline-none transition-[border-color,box-shadow] focus:border-[#8ea9d8] focus:ring-2 focus:ring-[#294e9e]/10;
}
.form-control[aria-invalid="true"] {
  @apply border-red-400;
}
.form-control:disabled {
  @apply cursor-not-allowed bg-slate-100;
}
</style>

