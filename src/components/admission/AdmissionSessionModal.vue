<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  GraduationCap,
  LockKeyhole,
  Phone,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useI18n } from "../../composables/useI18n.js";
import schoolLogo from "../../assets/images/piisc-logo.png";

const props = defineProps({ session: { type: Object, required: true } });
const emit = defineEmits(["close"]);
const router = useRouter();
const { language } = useI18n();
const tr = (en, bn) => language.value === "bn" ? bn : en;
const phone = ref("");
const otp = ref("");
const childName = ref("");
const relationship = ref("father");
const mode = ref("new");
const selectedProfile = ref(false);
const step = ref(1);
const challenge = ref("phone");
const error = ref("");
const phoneInput = ref(null);
const otpInput = ref(null);
const modal = ref(null);
let openerElement;
const digits = (value) => String(value).replace(/[০-৯]/g, (digit) => "০১২৩৪৫৬৭৮৯".indexOf(digit));
const normalizedPhone = computed(() => digits(phone.value).replace(/[\s()-]/g, ""));
const validPhone = computed(() => /^(?:\+?8801|01)[3-9]\d{8}$/.test(normalizedPhone.value));
const demoOtp = "123456";

function close() {
  emit("close");
}

function handleKeydown(event) {
  if (event.key === "Escape") close();
  if (event.key !== "Tab" || !modal.value) return;
  const focusable = [...modal.value.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')];
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

onMounted(async () => {
  openerElement = document.activeElement;
  document.addEventListener("keydown", handleKeydown);
  document.body.classList.add("overflow-hidden");
  await nextTick();
  phoneInput.value?.focus();
});
onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.body.classList.remove("overflow-hidden");
  openerElement?.focus?.();
});

async function continueWithPhone() {
  error.value = "";
  if (!validPhone.value) {
    error.value = tr("Enter a valid Bangladesh mobile number.", "একটি সঠিক বাংলাদেশি মোবাইল নম্বর লিখুন।");
    return;
  }
  challenge.value = "otp";
  step.value = 2;
  await nextTick();
  otpInput.value?.focus();
}

function verifyDemoOtp() {
  error.value = "";
  if (digits(otp.value).replace(/\D/g, "") !== demoOtp) {
    error.value = tr("For this demo, enter 123456.", "এই ডেমোর জন্য ১২৩৪৫৬ লিখুন।");
    return;
  }
  challenge.value = "profile";
}

function continueToApplication() {
  error.value = "";
  if (mode.value === "new" && childName.value.trim().length < 2) {
    error.value = tr("Enter the student's name to continue.", "এগিয়ে যেতে শিক্ষার্থীর নাম লিখুন।");
    return;
  }
  if (mode.value === "existing" && !selectedProfile.value) {
    error.value = tr("Select the demo student profile to continue.", "এগিয়ে যেতে ডেমো শিক্ষার্থী প্রোফাইল নির্বাচন করুন।");
    return;
  }
  router.push({ path: "/online-admission", query: { session: props.session.slug } });
  close();
}

function editPhone() {
  challenge.value = "phone";
  step.value = 1;
  error.value = "";
  nextTick(() => phoneInput.value?.focus());
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-[#0c1828]/75 px-3 py-5 backdrop-blur-[5px] sm:px-6" @click.self="close">
      <section
        ref="modal"
        role="dialog"
        aria-modal="true"
        :aria-label="tr('Admission application demo', 'ভর্তি আবেদন ডেমো')"
        class="my-auto flex max-h-[min(92vh,860px)] w-full max-w-[780px] flex-col overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-[0_28px_90px_rgba(4,15,30,.4)]"
      >
        <header class="relative flex items-center gap-4 bg-gradient-to-r from-[#092645] via-[#173f8e] to-[#294e9e] px-5 py-5 text-white sm:px-7">
          <span class="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-[15px] border border-white/25 bg-white p-1.5">
            <img :src="schoolLogo" alt="" class="h-full w-full object-contain" />
          </span>
          <div class="min-w-0 pr-10">
            <p class="text-sm font-extrabold leading-snug sm:text-base">{{ tr("Peace International Islamic School & College", "পিস ইন্টারন্যাশনাল ইসলামিক স্কুল অ্যান্ড কলেজ") }}</p>
            <span class="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#e3c88d]/50 bg-[#e3c88d]/10 px-2.5 py-1 text-[11px] font-bold text-[#f5dfaa]">
              <ShieldCheck :size="14" aria-hidden="true" />
              {{ tr("Frontend demo · no SMS or account verification", "ফ্রন্টএন্ড ডেমো · এসএমএস বা অ্যাকাউন্ট যাচাই হয় না") }}
            </span>
          </div>
          <button type="button" class="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" :aria-label="tr('Close application', 'আবেদন বন্ধ করুন')" @click="close">
            <X :size="20" aria-hidden="true" />
          </button>
        </header>

        <div class="shrink-0 border-b border-[#e2e8f0] bg-[#f1f5f9] px-5 py-4 sm:px-7">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <span class="inline-flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-100 px-3 py-1.5 text-xs font-extrabold text-sky-800">
              <GraduationCap :size="16" aria-hidden="true" />
              {{ tr("Online Student Admission", "অনলাইন শিক্ষার্থী ভর্তি") }}
            </span>
            <span class="inline-flex items-center gap-1.5 text-xs font-bold text-[#68788e]">
              <CalendarDays :size="15" aria-hidden="true" /> {{ tr("Dates to be announced", "তারিখ জানানো হবে") }}
            </span>
          </div>
          <h2 class="mt-2 text-lg font-extrabold leading-snug text-[#172238] sm:text-[21px]">{{ session.title }}</h2>
          <p class="mt-1 text-sm text-[#64748b]">{{ tr("Application walkthrough · demo mode", "আবেদন প্রক্রিয়া · ডেমো মোড") }}</p>
        </div>

        <div class="flex shrink-0 items-center justify-between border-b border-[#e5eaf0] bg-white px-5 py-3 text-xs font-extrabold sm:px-7 sm:text-sm" aria-label="Application progress">
          <div class="flex items-center gap-2" :class="step === 1 ? 'text-[#173f8e]' : 'text-[#8a6b2b]'">
            <span class="grid h-6 w-6 place-items-center rounded-full" :class="step === 1 ? 'bg-[#173f8e] text-white' : 'bg-[#d9b33d] text-[#092645]'"><Check v-if="step > 1" :size="14" /><span v-else>1</span></span>
            {{ tr("Mobile verification", "মোবাইল যাচাই") }}
          </div>
          <ArrowRight class="text-[#cbd5e1]" :size="18" aria-hidden="true" />
          <div class="flex items-center gap-2" :class="step === 2 ? 'text-violet-700' : 'text-[#94a3b8]'">
            <span class="grid h-6 w-6 place-items-center rounded-full" :class="step === 2 ? 'bg-violet-600 text-white' : 'bg-[#e2e8f0] text-[#64748b]'">2</span>
            {{ tr("Profile & apply", "প্রোফাইল ও আবেদন") }}
          </div>
        </div>

        <div class="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          <div class="mb-4 rounded-[16px] border border-[#c8d8ef] bg-[#edf3ff] px-4 py-3.5 text-sm text-[#173f8e]">
            <p class="flex items-start gap-2 font-extrabold"><LockKeyhole class="mt-0.5 shrink-0" :size="17" aria-hidden="true" />{{ tr("Demo only: no SMS, login, or account is created.", "শুধু ডেমো: কোনো এসএমএস, লগইন বা অ্যাকাউন্ট তৈরি হয় না।") }}</p>
            <p class="mt-1 pl-6 leading-relaxed">{{ tr("Use the sample OTP", "নমুনা ওটিপি ব্যবহার করুন") }} <strong class="font-mono">123456</strong> {{ tr("when prompted.", "চাওয়া হলে।") }}</p>
          </div>

          <template v-if="challenge === 'phone'">
            <div class="mb-5 rounded-[18px] bg-gradient-to-r from-[#092645] to-[#294e9e] p-5 text-white shadow-[0_12px_26px_rgba(23,63,142,.2)] sm:p-6">
              <div class="flex items-start gap-4">
                <span class="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] border border-white/30 bg-white/15"><GraduationCap :size="26" aria-hidden="true" /></span>
                <div>
                  <h3 class="text-lg font-extrabold">{{ tr("Guardian Mobile Verification", "অভিভাবকের মোবাইল যাচাই") }}</h3>
                  <p class="mt-1 text-sm leading-relaxed text-white/90">{{ tr("Enter a guardian's active mobile number to continue through this sample application flow.", "এই নমুনা আবেদন প্রক্রিয়ায় এগোতে অভিভাবকের সচল মোবাইল নম্বর লিখুন।") }}</p>
                </div>
              </div>
            </div>
            <label for="demo-guardian-phone" class="mb-2 block text-sm font-extrabold text-[#34445b]">{{ tr("Guardian Mobile Number", "অভিভাবকের মোবাইল নম্বর") }} <span class="text-red-600">*</span></label>
            <div class="flex min-h-[58px] items-center gap-3 rounded-[13px] border-2 border-[#294e9e] bg-white px-4 focus-within:ring-4 focus-within:ring-[#dce8fa]">
              <span class="flex shrink-0 items-center gap-2 border-r border-[#dce5ef] pr-3 font-extrabold text-emerald-700"><span class="text-xs">BD</span><Phone :size="17" aria-hidden="true" /></span>
              <input id="demo-guardian-phone" ref="phoneInput" v-model="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="017XXXXXXXX" class="min-w-0 flex-1 border-0 bg-transparent text-lg font-bold text-[#1d2d43] outline-none placeholder:text-[#a3afbf]" @keydown.enter.prevent="continueWithPhone" />
            </div>
            <p class="mt-2 text-xs text-[#728197]">{{ tr("This sample number is not saved or sent anywhere.", "এই নমুনা নম্বর সংরক্ষণ বা কোথাও পাঠানো হয় না।") }}</p>
          </template>

          <template v-else-if="challenge === 'otp'">
            <div class="mb-5 rounded-[18px] border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 text-[#2446a2] sm:p-6">
              <h3 class="flex items-center gap-2 text-lg font-extrabold"><ShieldCheck :size="22" aria-hidden="true" />{{ tr("Step 2A: Mobile OTP Verification (demo)", "ধাপ ২ক: মোবাইল ওটিপি যাচাই (ডেমো)") }}</h3>
              <p class="mt-2 text-sm leading-relaxed">{{ tr("A real code was not sent. Enter the sample code shown above to preview the next screen.", "কোনো আসল কোড পাঠানো হয়নি। পরের স্ক্রিন দেখতে উপরে দেখানো নমুনা কোড লিখুন।") }}</p>
              <p class="mt-2 text-sm font-bold">{{ tr("Number:", "নম্বর:") }} <span class="font-mono">{{ phone }}</span></p>
            </div>
            <label for="demo-admission-otp" class="mb-2 block text-sm font-extrabold text-[#34445b]">{{ tr("Sample OTP (6 digits)", "নমুনা ওটিপি (৬ সংখ্যা)") }} <span class="text-red-600">*</span></label>
            <input id="demo-admission-otp" ref="otpInput" v-model="otp" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="e.g. 123456" class="min-h-[58px] w-full rounded-[13px] border-2 border-blue-500 bg-[#f8fbff] px-4 font-mono text-xl font-extrabold tracking-[.25em] outline-none focus:ring-4 focus:ring-blue-100" @keydown.enter.prevent="verifyDemoOtp" />
            <p class="mt-2 text-xs text-[#728197]">{{ tr("For this frontend preview only; this does not verify a phone number.", "শুধু এই ফ্রন্টএন্ড প্রিভিউর জন্য; এটি ফোন নম্বর যাচাই করে না।") }}</p>
          </template>

          <template v-else>
            <div class="mb-5 rounded-[18px] border border-emerald-200 bg-emerald-50 p-4 sm:p-5">
              <div class="flex items-center gap-3">
                <span class="grid h-10 w-10 place-items-center rounded-xl bg-white text-emerald-700 shadow-sm"><UserRound :size="21" aria-hidden="true" /></span>
                <div>
                  <p class="font-extrabold text-emerald-900">{{ tr("Mobile step complete (demo)", "মোবাইল ধাপ সম্পন্ন (ডেমো)") }}</p>
                  <p class="text-sm text-emerald-800">{{ phone }}</p>
                </div>
              </div>
            </div>

            <h3 class="mb-3 text-lg font-extrabold text-[#27374e]">{{ tr("Choose how to continue", "কীভাবে এগোবেন বেছে নিন") }}</h3>
            <div class="mb-5 grid grid-cols-2 gap-2 rounded-xl bg-[#eef2f7] p-1">
              <button type="button" class="min-h-10 rounded-lg px-3 text-sm font-extrabold transition" :class="mode === 'new' ? 'bg-white text-[#173f8e] shadow-sm' : 'text-[#718096]'" :aria-pressed="mode === 'new'" @click="mode = 'new'; error = ''">{{ tr("New family", "নতুন পরিবার") }}</button>
              <button type="button" class="min-h-10 rounded-lg px-3 text-sm font-extrabold transition" :class="mode === 'existing' ? 'bg-white text-violet-800 shadow-sm' : 'text-[#718096]'" :aria-pressed="mode === 'existing'" @click="mode = 'existing'; error = ''">{{ tr("Existing profile (demo)", "আগের প্রোফাইল (ডেমো)") }}</button>
            </div>

            <template v-if="mode === 'new'">
              <label for="demo-child-name" class="mb-2 block text-sm font-extrabold text-[#34445b]">{{ tr("Child's Full Name", "শিক্ষার্থীর পূর্ণ নাম") }} <span class="text-red-600">*</span></label>
              <input id="demo-child-name" v-model="childName" type="text" autocomplete="name" maxlength="100" :placeholder="tr('e.g. Samia Rahman', 'যেমন: সামিয়া রহমান')" class="min-h-[50px] w-full rounded-xl border border-[#cbd5e1] px-4 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100" />
              <fieldset class="mt-4">
                <legend class="mb-2 text-sm font-extrabold text-[#34445b]">{{ tr("Your relationship with the child", "শিশুর সঙ্গে আপনার সম্পর্ক") }}</legend>
                <div class="grid grid-cols-3 gap-2">
                  <button v-for="item in [{value:'father',en:'Father',bn:'বাবা'},{value:'mother',en:'Mother',bn:'মা'},{value:'guardian',en:'Guardian',bn:'অভিভাবক'}]" :key="item.value" type="button" class="min-h-[42px] rounded-lg border px-2 text-xs font-bold transition sm:text-sm" :class="relationship === item.value ? 'border-violet-500 bg-violet-50 text-violet-800' : 'border-[#cbd5e1] bg-white text-[#596a80]'" :aria-pressed="relationship === item.value" @click="relationship = item.value">{{ tr(item.en, item.bn) }}</button>
                </div>
              </fieldset>
            </template>

            <template v-else>
              <button type="button" class="flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition" :class="selectedProfile ? 'border-emerald-500 bg-emerald-50' : 'border-[#dbe4ed] bg-white hover:border-violet-300'" :aria-pressed="selectedProfile" @click="selectedProfile = !selectedProfile">
                <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#edf2ff] text-violet-800"><UserRound :size="20" aria-hidden="true" /></span>
                <span class="min-w-0 flex-1"><strong class="block text-sm text-[#25364b]">{{ tr("Demo student profile", "ডেমো শিক্ষার্থী প্রোফাইল") }}</strong><span class="mt-1 block text-xs text-[#75859a]">{{ tr("DOB: not provided · Guardian: not provided", "জন্মতারিখ: দেওয়া হয়নি · অভিভাবক: দেওয়া হয়নি") }}</span></span>
                <Check v-if="selectedProfile" class="shrink-0 text-emerald-600" :size="19" aria-hidden="true" />
              </button>
              <p class="mt-2 text-xs leading-relaxed text-[#74849a]">{{ tr("This is a sample profile selection only. No account lookup or login takes place.", "এটি শুধু নমুনা প্রোফাইল নির্বাচন। কোনো অ্যাকাউন্ট খোঁজা বা লগইন হয় না।") }}</p>
            </template>
          </template>

          <p v-if="error" class="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-800" role="alert">{{ error }}</p>
        </div>

        <footer class="flex shrink-0 flex-wrap justify-between gap-2 border-t border-[#e5eaf0] bg-white px-5 py-4 sm:px-7">
          <button v-if="challenge !== 'phone'" type="button" class="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-[#cbd7e4] bg-[#f1f5f9] px-4 text-sm font-extrabold text-[#45566d] transition hover:bg-[#e7edf3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500" @click="challenge === 'profile' ? (challenge = 'otp', error = '') : editPhone()">
            <ArrowLeft :size="17" aria-hidden="true" />{{ tr("Back", "পেছনে") }}
          </button>
          <span v-else></span>

          <button v-if="challenge === 'phone'" type="button" class="admission-submit ml-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] px-5 text-sm font-extrabold shadow-[0_6px_16px_rgba(23,63,142,.22)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9b33d]" @click="continueWithPhone">
            {{ tr("Proceed to Admission", "ভর্তির জন্য এগিয়ে যান") }}<ArrowRight :size="18" aria-hidden="true" />
          </button>
          <button v-else-if="challenge === 'otp'" type="button" class="admission-submit ml-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] px-5 text-sm font-extrabold shadow-[0_6px_16px_rgba(23,63,142,.22)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9b33d]" @click="verifyDemoOtp">
            {{ tr("Verify demo OTP", "ডেমো ওটিপি যাচাই") }}<ArrowRight :size="18" aria-hidden="true" />
          </button>
          <button v-else type="button" class="admission-submit ml-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] px-5 text-sm font-extrabold shadow-[0_6px_16px_rgba(23,63,142,.22)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9b33d]" @click="continueToApplication">
            {{ tr("Continue to Application", "আবেদনে এগিয়ে যান") }}<ArrowRight :size="18" aria-hidden="true" />
          </button>
        </footer>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.admission-submit { background: #173f8e !important; color: #fff !important; }
.admission-submit:hover { background: #092645 !important; }
</style>
