import { DIVISION_CLASSES } from "../data/admissionOptions.js";

const BANGLA_DIGITS = "০১২৩৪৫৬৭৮৯";

export function normalizeBangladeshPhone(value) {
  let phone = String(value ?? "")
    .replace(/[০-৯]/g, (digit) => String(BANGLA_DIGITS.indexOf(digit)))
    .replace(/[\s\-()]/g, "");

  if (phone.startsWith("+880")) phone = phone.slice(4);
  else if (phone.startsWith("880")) phone = phone.slice(3);
  if (phone.length === 10 && phone.startsWith("1")) phone = `0${phone}`;
  return phone;
}

export function isValidBangladeshPhone(value) {
  return /^01[3-9]\d{8}$/.test(normalizeBangladeshPhone(value));
}

export function getAge(dateValue, today = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(dateValue ?? ""))) return null;
  const [year, month, day] = dateValue.split("-").map(Number);
  const birth = new Date(Date.UTC(year, month - 1, day));
  if (
    birth.getUTCFullYear() !== year ||
    birth.getUTCMonth() !== month - 1 ||
    birth.getUTCDate() !== day
  ) return null;

  const current = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const birthDate = new Date(year, month - 1, day);
  if (birthDate >= current) return null;

  let age = current.getFullYear() - year;
  if (
    current.getMonth() < month - 1 ||
    (current.getMonth() === month - 1 && current.getDate() < day)
  ) age -= 1;
  return age;
}

const trimmed = (value) => String(value ?? "").trim();
const hasValue = (value) => trimmed(value).length > 0;

export function validate(form, { divisionVisible = DIVISION_CLASSES.includes(form.applyingForClass) } = {}) {
  const errors = {};
  const required = (field, message) => {
    if (!hasValue(form[field])) errors[field] = message;
  };
  const optionalMax = (field, max, message) => {
    if (hasValue(form[field]) && trimmed(form[field]).length > max) errors[field] = message;
  };
  const name = (field, requiredName = false) => {
    if (requiredName || hasValue(form[field])) {
      const length = trimmed(form[field]).length;
      if (length < 2 || length > 100) errors[field] = "Enter a name between 2 and 100 characters.";
    }
  };

  name("studentName", true);
  required("applyingForClass", "Select a class.");
  if (divisionVisible) required("division", "Select an academic division.");
  required("gender", "Select a gender.");
  const age = getAge(form.dateOfBirth);
  if (age === null || age < 3 || age > 25) {
    errors.dateOfBirth = "Date of birth must be in the past and indicate an age between 3 and 25.";
  }
  name("fatherName");
  name("motherName");
  name("guardianName", true);
  required("relationship", "Select the guardian's relationship to the candidate.");

  required("phone", "Enter a guardian mobile number.");
  if (hasValue(form.phone) && !isValidBangladeshPhone(form.phone)) {
    errors.phone = "Enter a valid Bangladesh mobile number.";
  }
  if (hasValue(form.alternatePhone) && !isValidBangladeshPhone(form.alternatePhone)) {
    errors.alternatePhone = "Enter a valid Bangladesh mobile number.";
  }

  required("email", "Enter a guardian email address.");
  if (
    hasValue(form.email) &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed(form.email))
  ) errors.email = "Enter a valid email address.";

  const addressLength = trimmed(form.address).length;
  if (addressLength < 5 || addressLength > 300) {
    errors.address = "Address must be between 5 and 300 characters.";
  }
  optionalMax("previousSchool", 150, "Previous school must be 150 characters or fewer.");
  optionalMax("previousResult", 50, "Previous result must be 50 characters or fewer.");
  optionalMax("medicalConditions", 500, "Medical or health information must be 500 characters or fewer.");
  optionalMax("message", 1000, "Additional notes must be 1,000 characters or fewer.");
  if (!form.consent) errors.consent = "Consent is required to submit this application.";

  return errors;
}
