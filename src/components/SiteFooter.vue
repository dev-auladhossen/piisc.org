<script setup>
import { Facebook, Instagram, Youtube } from "lucide-vue-next";
import { images } from "../data/content.js";
import { headerContacts } from "../data/navigation.js";
import { useI18n } from "../composables/useI18n.js";

const { language } = useI18n();
const copy = (en, bn) => (language.value === "bn" ? bn : en);
const socials = [
  { name: "Facebook", nameBn: "ফেসবুক", icon: Facebook, url: headerContacts.socials.facebook },
  { name: "Instagram", nameBn: "ইনস্টাগ্রাম", icon: Instagram, url: headerContacts.socials.instagram },
  { name: "YouTube", nameBn: "ইউটিউব", icon: Youtube, url: headerContacts.socials.youtube },
];
</script>

<template>
  <footer class="site-footer">
    <div class="footer-shell">
      <section
        class="footer-admission"
        aria-labelledby="footer-admission-title"
      >
        <div class="footer-admission-copy">
          <p class="footer-eyebrow">
            {{ copy("ADMISSION OFFICE", "ভর্তি অফিস") }}
          </p>
          <h2 id="footer-admission-title">
            {{
              copy(
                "Ready to discuss your child’s admission?",
                "আপনার সন্তানের ভর্তি নিয়ে আলোচনা করতে চান?",
              )
            }}
          </h2>
          <p>
            {{
              copy(
                "Call, WhatsApp, or send an inquiry to book a visit with the PIISC team.",
                "পিআইআইএসসি দলের সঙ্গে সাক্ষাতের জন্য ফোন, হোয়াটসঅ্যাপ বা অনুসন্ধান পাঠান।",
              )
            }}
          </p>
        </div>
        <div class="footer-admission-actions">
          <RouterLink to="/contact" class="footer-inquiry">{{
            copy("Send Inquiry", "জিজ্ঞাসা করুন")
          }}</RouterLink>
          <a :href="`tel:${headerContacts.phone.replace(/\s/g, '')}`">{{
            copy("Call Office", "অফিসে কল করুন")
          }}</a>
        </div>
      </section>
      <div class="footer-main">
        <div class="footer-identity">
          <RouterLink
            to="/"
            class="footer-brand"
            :aria-label="copy('PIISC home', 'পিআইআইএসসি হোম')"
          >
            <img
              :src="images.logo"
              :alt="copy('PIISC school logo', 'পিআইআইএসসি স্কুলের লোগো')"
              width="74"
              height="74"
              loading="lazy"
            />
            <span class="footer-brand-name">
              <strong>{{
                copy("PEACE INTERNATIONAL", "পিস ইন্টারন্যাশনাল")
              }}</strong>
              <small>{{
                copy(
                  "ISLAMIC SCHOOL & COLLEGE (PIISC)",
                  "ইসলামিক স্কুল অ্যান্ড কলেজ (পিআইআইএসসি)",
                )
              }}</small>
              <em>{{
                copy(
                  "Modern Education With Islamic Values",
                  "ইসলামী মূল্যবোধের সঙ্গে আধুনিক শিক্ষা",
                )
              }}</em>
            </span>
          </RouterLink>
          <div
            class="footer-socials"
            role="group"
            :aria-label="copy('Social media', 'সামাজিক যোগাযোগমাধ্যম')"
          >
            <template v-for="social in socials" :key="social.name">
              <a
                v-if="social.url"
                :href="social.url"
                :aria-label="`${copy('PIISC on', 'পিআইআইএসসি')} ${copy(social.name, social.nameBn)}`"
                target="_blank"
                rel="noopener noreferrer"
                :class="{ 'facebook-icon': social.name === 'Facebook' }"
              >
                <component :is="social.icon" :size="21" aria-hidden="true" />
              </a>
              <span
                v-else
                :class="{ 'facebook-icon': social.name === 'Facebook' }"
                :title="`${copy(social.name, social.nameBn)} — ${copy('profile link coming soon', 'প্রোফাইল লিংক শীঘ্রই আসছে')}`"
                role="img"
                :aria-label="`${copy(social.name, social.nameBn)} — ${copy('profile link coming soon', 'প্রোফাইল লিংক শীঘ্রই আসছে')}`"
              >
                <component :is="social.icon" :size="21" aria-hidden="true" />
              </span>
            </template>
          </div>
        </div>
        <div class="footer-details">
          <p>
            © {{ new Date().getFullYear() }}
            {{
              copy(
                "Peace International Islamic School & College (PIISC). All rights reserved.",
                "পিস ইন্টারন্যাশনাল ইসলামিক স্কুল অ্যান্ড কলেজ (পিআইআইএসসি)। সর্বস্বত্ব সংরক্ষিত।",
              )
            }}
          </p>
          <p>
            {{ copy("Developed by", "তৈরি করেছে") }}
            <strong class="developer-name">NeonTech</strong>
          </p>
          <nav
            class="footer-legal"
            :aria-label="copy('Legal links', 'আইনি লিংক')"
          >
            <RouterLink to="/privacy-policy">{{
              copy("Privacy Policy", "গোপনীয়তা নীতি")
            }}</RouterLink>
            <span aria-hidden="true">·</span>
            <RouterLink to="/terms-and-conditions">{{
              copy("Terms and Conditions", "শর্তাবলি")
            }}</RouterLink>
          </nav>
        </div>
      </div>
      <nav
        class="footer-quick-links"
        :aria-label="copy('Quick links', 'দ্রুত লিংক')"
      >
        <RouterLink to="/about">{{
          copy("About Us", "আমাদের সম্পর্কে")
        }}</RouterLink>
        <RouterLink to="/admission-requirement">{{
          copy("Admissions", "ভর্তি")
        }}</RouterLink>
        <RouterLink to="/contact">{{
          copy("Contact & school visits", "যোগাযোগ ও বিদ্যালয় পরিদর্শন")
        }}</RouterLink>
        <a :href="`tel:${headerContacts.phone.replace(/\s/g, '')}`">{{
          copy("Call the office", "অফিসে কল করুন")
        }}</a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 3px solid #d9b33d;
  background: #fff;
  color: #526480;
}
.footer-shell {
  width: calc(100% - clamp(32px, 6.5vw, 128px));
  max-width: 1800px;
  margin-inline: auto;
  padding: 36px 0 38px;
}
.footer-admission {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  min-height: 250px;
  padding: clamp(32px, 4vw, 70px);
  border-radius: 11px;
  background: #294e9e;
  color: #fff;
  box-shadow: 0 22px 46px #294e9e16;
}
.footer-admission-copy {
  min-width: 0;
}
.footer-eyebrow {
  color: #f3cc48;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.2em;
  margin-bottom: 17px;
}
.footer-admission h2 {
  color: #fff;
  font-size: clamp(31px, 3.2vw, 52px);
  line-height: 1.13;
  margin: 0 0 18px;
}
.footer-admission-copy > p:last-child {
  color: #e6edfb;
  font-size: clamp(15px, 1.2vw, 20px);
}
.footer-admission-actions {
  display: flex;
  gap: 14px;
  flex: none;
}
.footer-admission-actions a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  padding: 13px 24px;
  border: 1px solid #ffffff66;
  border-radius: 9px;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
  transition:
    transform 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
}
.footer-admission-actions .footer-inquiry {
  background: #d9b33d;
  border-color: #d9b33d;
  color: #11223b;
}
.footer-admission-actions a:hover {
  transform: translateY(-3px);
  background: #fff;
  color: #294e9e;
  box-shadow: 0 10px 24px #0a294830;
}
.footer-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  border-top: 1px solid #dce5f3;
  margin-top: 40px;
  padding-top: 38px;
}
.footer-identity {
  display: flex;
  align-items: center;
  gap: 28px;
  min-width: 0;
}
.footer-brand {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}
.footer-brand img {
  width: 74px;
  height: 74px;
  object-fit: contain;
  flex: none;
}
.footer-brand-name strong {
  display: block;
  color: #294e9e;
  font:
    700 clamp(17px, 1.45vw, 25px)/1.1 Newsreader,
    Georgia,
    serif;
  letter-spacing: 0.01em;
}
.footer-brand-name small {
  display: block;
  color: #a77d31;
  font-size: clamp(10px, 0.85vw, 14px);
  font-weight: 700;
  letter-spacing: 0.13em;
  line-height: 1.5;
  margin-top: 5px;
}
.footer-brand-name em {
  display: block;
  color: #667894;
  font-size: 10px;
  font-style: normal;
  margin-top: 4px;
}
.footer-socials {
  display: flex;
  gap: 9px;
  flex: none;
}
.footer-socials > * {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid #dce5f3;
  border-radius: 10px;
  color: #294e9e;
  background: #fff;
  transition:
    transform 0.25s ease,
    background 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease;
}
.footer-socials > .facebook-icon {
  color: #294e9e;
  background: #fff;
  border-color: #dce5f3;
}
.footer-socials > *:hover {
  transform: translateY(-3px);
  color: #fff;
  background: #173a80;
  border-color: #173a80;
  box-shadow: 0 8px 18px #294e9e24;
}
.footer-socials > span {
  cursor: pointer;
}
.footer-details {
  text-align: right;
  font-size: 14px;
  line-height: 1.65;
}
.footer-details p {
  color: #526480;
}
.developer-name {
  color: #294e9e;
  font-weight: 800;
}
.footer-legal {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 2px;
}
.footer-legal a,
.footer-quick-links a,
.footer-help a {
  position: relative;
  color: #526480;
  transition: color 0.25s ease;
}
.footer-legal a:hover,
.footer-quick-links a:hover,
.footer-help a:hover {
  color: #294e9e;
}
.footer-legal a::after,
.footer-quick-links a::after,
.footer-help a::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -3px;
  height: 1px;
  background: #d9b33d;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}
.footer-legal a:hover::after,
.footer-quick-links a:hover::after,
.footer-help a:hover::after {
  transform: scaleX(1);
}
.footer-help {
  padding-top: 23px;
  color: #526480;
  font-size: 13px;
}
.footer-help a {
  margin-left: 8px;
  font-weight: 700;
  color: #294e9e;
}
.footer-quick-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 24px;
  padding-top: 20px;
  margin-top: 18px;
  border-top: 1px solid #eef2f8;
  font-size: 13px;
}
@media (max-width: 1100px) {
  .footer-admission {
    align-items: flex-start;
    flex-direction: column;
    min-height: 0;
  }
}
@media (max-width: 1000px) {
  .footer-main {
    align-items: flex-start;
    flex-direction: column;
  }
  .footer-details {
    text-align: left;
  }
  .footer-legal {
    justify-content: flex-start;
  }
}
@media (max-width: 600px) {
  .footer-shell {
    padding-block: 24px 30px;
  }
  .footer-admission {
    padding: 30px 24px;
  }
  .footer-admission-actions {
    width: 100%;
    flex-wrap: wrap;
  }
  .footer-admission-actions a {
    flex: 1;
    min-height: 48px;
    padding: 10px 14px;
  }
  .footer-main {
    gap: 25px;
    padding-top: 28px;
  }
  .footer-identity {
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
  }
  .footer-brand img {
    width: 60px;
    height: 60px;
  }
  .footer-details {
    font-size: 12px;
  }
  .footer-quick-links {
    gap: 12px 18px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .footer-socials > *,
  .footer-legal a,
  .footer-quick-links a,
  .footer-legal a::after,
  .footer-quick-links a::after {
    transition: none;
  }
  .footer-socials > *:hover {
    transform: none;
  }
}
</style>
