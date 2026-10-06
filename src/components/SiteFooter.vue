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
  <footer class="site-footer [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[border-top-color:rgb(217,_179,_61)] [&&]:[border-top-style:solid] [&&]:[border-top-width:3px] [&&]:[color:rgb(82,_100,_128)]">
    <div class="footer-shell [&&]:w-[calc(100%_-_clamp(32px,_6.5vw,_128px))] [&&]:max-w-[1800px] [&&]:[margin-inline-end:auto] [&&]:[margin-inline-start:auto] [@media(max-width:600px)]:[&&]:[padding-block-end:30px] [@media(max-width:600px)]:[&&]:[padding-block-start:24px] [&&]:p-[36px_0px_38px_0px]">
      <section
        class="footer-admission [&&]:flex [@media(max-width:1100px)]:[&&]:min-h-[0px] [@media(width>1100px)]:[&&]:min-h-[250px] [@media(max-width:1100px)]:[&&]:items-start [@media(width>1100px)]:[&&]:items-center [&&]:justify-between [&&]:gap-x-[32px] [&&]:gap-y-[32px] [&&]:[border-bottom-left-radius:11px] [&&]:[border-bottom-right-radius:11px] [&&]:[border-top-left-radius:11px] [&&]:[border-top-right-radius:11px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(41,_78,_158)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[box-shadow:rgba(41,_78,_158,_0.086)_0px_22px_46px] [&&]:[color:rgb(255,_255,_255)] [@media(max-width:1100px)]:[&&]:flex-col [@media(max-width:600px)]:[&&]:p-[30px_24px] [@media(width>600px)]:[&&]:p-[clamp(32px,_4vw,_70px)]"
        aria-labelledby="footer-admission-title"
      >
        <div class="footer-admission-copy [&&]:min-w-[0px]">
          <p class="footer-eyebrow [&&]:[color:rgb(243,_204,_72)] [&&]:[font-size:12px] [&&]:mb-[17px] [&&]:font-[800] [&&]:tracking-[0.2em] [.footer-admission-copy_>_p&:last-child]:[color:rgb(230,_237,_251)] [.footer-admission-copy_>_p&:last-child]:[font-size:clamp(15px,_1.2vw,_20px)]">
            {{ copy("ADMISSION OFFICE", "ভর্তি অফিস") }}
          </p>
          <h2 class="[&&]:[color:rgb(255,_255,_255)] [&&]:[font-size:clamp(31px,_3.2vw,_52px)] [&&]:leading-[1.13] [&&]:m-[0px_0px_18px_0px]" id="footer-admission-title">
            {{
              copy(
                "Ready to discuss your child’s admission?",
                "আপনার সন্তানের ভর্তি নিয়ে আলোচনা করতে চান?",
              )
            }}
          </h2>
          <p class="[.footer-admission-copy_>_p&:last-child]:[color:rgb(230,_237,_251)] [.footer-admission-copy_>_p&:last-child]:[font-size:clamp(15px,_1.2vw,_20px)]">
            {{
              copy(
                "Call, WhatsApp, or send an inquiry to book a visit with the PIISC team.",
                "পিআইআইএসসি দলের সঙ্গে সাক্ষাতের জন্য ফোন, হোয়াটসঅ্যাপ বা অনুসন্ধান পাঠান।",
              )
            }}
          </p>
        </div>
        <div class="footer-admission-actions [&&]:flex [&&]:gap-x-[14px] [&&]:gap-y-[14px] [&&]:[flex-basis:auto] [&&]:[flex-grow:0] [&&]:[flex-shrink:0] [@media(max-width:600px)]:[&&]:w-[100%] [@media(max-width:600px)]:[&&]:flex-wrap">
          <RouterLink to="/contact" class="footer-inquiry [&&&]:inline-flex [@media(max-width:600px)]:[&&&]:min-h-[48px] [@media(width>600px)]:[&&&]:min-h-[56px] [&&&]:items-center [&&&]:justify-center [&&&]:[border-image-outset:0] [&&&]:[border-image-repeat:stretch] [&&&]:[border-image-slice:100%] [&&&]:[border-image-source:none] [&&&]:[border-image-width:1] [&&&]:[border-bottom-left-radius:9px] [&&&]:[border-bottom-right-radius:9px] [&&&]:[border-top-left-radius:9px] [&&&]:[border-top-right-radius:9px] [&&&]:[color:rgb(17,_34,_59)] [&&&]:[font-size:15px] [&&&]:[text-wrap-mode:nowrap] [&&&]:[white-space-collapse:collapse] [&&&]:font-[700] [&&&]:[transition-behavior:normal,_normal,_normal] [&&&]:[transition-delay:0s,_0s,_0s] [&&&]:[transition-duration:0.25s,_0.25s,_0.25s] [&&&]:[transition-property:transform,_background,_box-shadow] [&&&]:[transition-timing-function:ease,_ease,_ease] [@media(max-width:600px)]:[&&&]:[flex-basis:0%] [@media(max-width:600px)]:[&&&]:[flex-grow:1] [@media(max-width:600px)]:[&&&]:[flex-shrink:1] [&&&]:[background-attachment:initial] [&&&]:[background-clip:initial] [&&&]:[background-color:rgb(217,_179,_61)] [&&&]:[background-image:initial] [&&&]:[background-origin:initial] [&&&]:[background-position:initial] [&&&]:[background-repeat:initial] [&&&]:[background-size:initial] [@media(max-width:600px)]:[&&&]:p-[10px_14px] [@media(width>600px)]:[&&&]:p-[13px_24px] [&&&]:[border-width:1px] [&&&]:[border-style:solid] [&&&]:[border-color:rgb(217,_179,_61)] [.footer-admission-actions_a&:hover]:[color:rgb(41,_78,_158)] [.footer-admission-actions_a&:hover]:[background-color:rgb(255,_255,_255)] [.footer-admission-actions_a&:hover]:[box-shadow:rgba(10,_41,_72,_0.19)_0px_10px_24px] [.footer-admission-actions_a&:hover]:[transform:translateY(-3px)]">{{
            copy("Send Inquiry", "জিজ্ঞাসা করুন")
          }}</RouterLink>
          <a class="[&&]:inline-flex [@media(max-width:600px)]:[&&]:min-h-[48px] [@media(width>600px)]:[&&]:min-h-[56px] [&&]:items-center [&&]:justify-center [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:9px] [&&]:[border-bottom-right-radius:9px] [&&]:[border-top-left-radius:9px] [&&]:[border-top-right-radius:9px] [&&]:[color:rgb(255,_255,_255)] [&&]:[font-size:15px] [&&]:[text-wrap-mode:nowrap] [&&]:[white-space-collapse:collapse] [&&]:font-[700] [&&]:[transition-behavior:normal,_normal,_normal] [&&]:[transition-delay:0s,_0s,_0s] [&&]:[transition-duration:0.25s,_0.25s,_0.25s] [&&]:[transition-property:transform,_background,_box-shadow] [&&]:[transition-timing-function:ease,_ease,_ease] [@media(max-width:600px)]:[&&]:[flex-basis:0%] [@media(max-width:600px)]:[&&]:[flex-grow:1] [@media(max-width:600px)]:[&&]:[flex-shrink:1] [@media(max-width:600px)]:[&&]:p-[10px_14px] [@media(width>600px)]:[&&]:p-[13px_24px] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgba(255,_255,_255,_0.4)] [.footer-admission-actions_a&:hover]:[color:rgb(41,_78,_158)] [.footer-admission-actions_a&:hover]:[background-attachment:initial] [.footer-admission-actions_a&:hover]:[background-clip:initial] [.footer-admission-actions_a&:hover]:[background-color:rgb(255,_255,_255)] [.footer-admission-actions_a&:hover]:[background-image:initial] [.footer-admission-actions_a&:hover]:[background-origin:initial] [.footer-admission-actions_a&:hover]:[background-position:initial] [.footer-admission-actions_a&:hover]:[background-repeat:initial] [.footer-admission-actions_a&:hover]:[background-size:initial] [.footer-admission-actions_a&:hover]:[box-shadow:rgba(10,_41,_72,_0.19)_0px_10px_24px] [.footer-admission-actions_a&:hover]:[transform:translateY(-3px)]" :href="`tel:${headerContacts.phone.replace(/\s/g, '')}`">{{
            copy("Call Office", "অফিসে কল করুন")
          }}</a>
        </div>
      </section>
      <div class="footer-main [&&]:mt-[40px] [&&]:flex [@media(max-width:1000px)]:[&&]:items-start [@media(width>1000px)]:[&&]:items-center [&&]:justify-between [@media(max-width:600px)]:[&&]:gap-x-[25px] [@media(width>600px)]:[&&]:gap-x-[40px] [@media(max-width:600px)]:[&&]:gap-y-[25px] [@media(width>600px)]:[&&]:gap-y-[40px] [@media(max-width:600px)]:[&&]:pt-[28px] [@media(width>600px)]:[&&]:pt-[38px] [&&]:[border-top-color:rgb(220,_229,_243)] [&&]:[border-top-style:solid] [&&]:[border-top-width:1px] [@media(max-width:1000px)]:[&&]:flex-col">
        <div class="footer-identity [&&]:flex [&&]:min-w-[0px] [@media(max-width:600px)]:[&&]:items-start [@media(width>600px)]:[&&]:items-center [@media(max-width:600px)]:[&&]:gap-x-[20px] [@media(width>600px)]:[&&]:gap-x-[28px] [@media(max-width:600px)]:[&&]:gap-y-[20px] [@media(width>600px)]:[&&]:gap-y-[28px] [@media(max-width:600px)]:[&&]:flex-col">
          <RouterLink
            to="/"
            class="footer-brand [&&]:inline-flex [&&]:min-w-[0px] [&&]:items-center [&&]:gap-x-[14px] [&&]:gap-y-[14px]"
            :aria-label="copy('PIISC home', 'পিআইআইএসসি হোম')"
          >
            <img class="[@media(max-width:600px)]:[&&]:h-[60px] [@media(width>600px)]:[&&]:h-[74px] [@media(max-width:600px)]:[&&]:w-[60px] [@media(width>600px)]:[&&]:w-[74px] [&&]:object-contain [&&]:[flex-basis:auto] [&&]:[flex-grow:0] [&&]:[flex-shrink:0]"
              :src="images.logo"
              :alt="copy('PIISC school logo', 'পিআইআইএসসি স্কুলের লোগো')"
              width="74"
              height="74"
              loading="lazy"
            />
            <span class="footer-brand-name">
              <strong class="[&&]:block [&&]:tracking-[0.01em] [&&]:[color:rgb(41,_78,_158)] [&&]:[font-family:Newsreader,_Georgia,_serif] [&&]:[font-feature-settings:normal] [&&]:[font-kerning:auto] [&&]:[font-language-override:normal] [&&]:[font-optical-sizing:auto] [&&]:[font-size:clamp(17px,_1.45vw,_25px)] [&&]:[font-size-adjust:none] [&&]:[font-stretch:normal] [&&]:[font-style:normal] [&&]:[font-variant:normal] [&&]:[font-variant-alternates:normal] [&&]:[font-variant-caps:normal] [&&]:[font-variant-east-asian:normal] [&&]:[font-variant-emoji:normal] [&&]:[font-variant-ligatures:normal] [&&]:[font-variant-numeric:normal] [&&]:[font-variant-position:normal] [&&]:[font-variation-settings:normal] [&&]:font-[700] [&&]:leading-[1.1]">{{
                copy("PEACE INTERNATIONAL", "পিস ইন্টারন্যাশনাল")
              }}</strong>
              <small class="[&&]:block [&&]:[color:rgb(167,_125,_49)] [&&]:[font-size:clamp(10px,_0.85vw,_14px)] [&&]:font-[700] [&&]:tracking-[0.13em] [&&]:mt-[5px] [&&]:leading-[1.5]">{{
                copy(
                  "ISLAMIC SCHOOL & COLLEGE (PIISC)",
                  "ইসলামিক স্কুল অ্যান্ড কলেজ (পিআইআইএসসি)",
                )
              }}</small>
              <em class="[&&]:block [&&]:[color:rgb(102,_120,_148)] [&&]:[font-size:10px] [&&]:mt-[4px] [&&]:[font-style:normal]">{{
                copy(
                  "Modern Education With Islamic Values",
                  "ইসলামী মূল্যবোধের সঙ্গে আধুনিক শিক্ষা",
                )
              }}</em>
            </span>
          </RouterLink>
          <div
            class="footer-socials [&&]:flex [&&]:gap-x-[9px] [&&]:gap-y-[9px] [&&]:[flex-basis:auto] [&&]:[flex-grow:0] [&&]:[flex-shrink:0]"
            role="group"
            :aria-label="copy('Social media', 'সামাজিক যোগাযোগমাধ্যম')"
          >
            <template v-for="social in socials" :key="social.name">
              <a class="[&&]:grid [&&]:h-[42px] [&&]:w-[42px] [&&]:items-center [&&]:[justify-items:center] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:10px] [&&]:[border-bottom-right-radius:10px] [&&]:[border-top-left-radius:10px] [&&]:[border-top-right-radius:10px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(41,_78,_158)] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-behavior:normal,_normal,_normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-delay:0s,_0s,_0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.25s,_0.25s,_0.25s,_0.25s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:transform,_background,_color,_box-shadow] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-timing-function:ease,_ease,_ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-timing-function:ease] [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(220,_229,_243)] [.footer-socials_>_*&:hover]:[background-color:rgb(23,_58,_128)] [.footer-socials_>_*&:hover]:[color:rgb(255,_255,_255)] [.footer-socials_>_*&:hover]:[box-shadow:rgba(41,_78,_158,_0.14)_0px_8px_18px] [@media(prefers-reduced-motion:no-preference)]:[.footer-socials_>_*&:hover]:[transform:translateY(-3px)] [@media(prefers-reduced-motion:reduce)]:[.footer-socials_>_*&:hover]:[transform:none] [.footer-socials_>_*&:hover]:[border-color:rgb(23,_58,_128)]"
                v-if="social.url"
                :href="social.url"
                :aria-label="`${copy('PIISC on', 'পিআইআইএসসি')} ${copy(social.name, social.nameBn)}`"
                target="_blank"
                rel="noopener noreferrer"
                :class="{ 'facebook-icon': social.name === 'Facebook' }"
              >
                <component :is="social.icon" :size="21" aria-hidden="true" />
              </a>
              <span class="[&&]:grid [&&]:h-[42px] [&&]:w-[42px] [&&]:items-center [&&]:[justify-items:center] [&&]:[border-image-outset:0] [&&]:[border-image-repeat:stretch] [&&]:[border-image-slice:100%] [&&]:[border-image-source:none] [&&]:[border-image-width:1] [&&]:[border-bottom-left-radius:10px] [&&]:[border-bottom-right-radius:10px] [&&]:[border-top-left-radius:10px] [&&]:[border-top-right-radius:10px] [&&]:[background-attachment:initial] [&&]:[background-clip:initial] [&&]:[background-color:rgb(255,_255,_255)] [&&]:[background-image:initial] [&&]:[background-origin:initial] [&&]:[background-position:initial] [&&]:[background-repeat:initial] [&&]:[background-size:initial] [&&]:[color:rgb(41,_78,_158)] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-behavior:normal,_normal,_normal,_normal] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-behavior:normal] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-delay:0s,_0s,_0s,_0s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.25s,_0.25s,_0.25s,_0.25s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:transform,_background,_color,_box-shadow] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-timing-function:ease,_ease,_ease,_ease] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-timing-function:ease] [&&]:cursor-pointer [&&]:[border-width:1px] [&&]:[border-style:solid] [&&]:[border-color:rgb(220,_229,_243)] [.footer-socials_>_*&:hover]:[background-color:rgb(23,_58,_128)] [.footer-socials_>_*&:hover]:[color:rgb(255,_255,_255)] [.footer-socials_>_*&:hover]:[box-shadow:rgba(41,_78,_158,_0.14)_0px_8px_18px] [@media(prefers-reduced-motion:no-preference)]:[.footer-socials_>_*&:hover]:[transform:translateY(-3px)] [@media(prefers-reduced-motion:reduce)]:[.footer-socials_>_*&:hover]:[transform:none] [.footer-socials_>_*&:hover]:[border-color:rgb(23,_58,_128)]"
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
        <div class="footer-details [@media(max-width:1000px)]:[&&]:text-left [@media(width>1000px)]:[&&]:text-right [@media(max-width:600px)]:[&&]:[font-size:12px] [@media(width>600px)]:[&&]:[font-size:14px] [&&]:leading-[1.65]">
          <p class="[&&]:[color:rgb(82,_100,_128)]">
            © {{ new Date().getFullYear() }}
            {{
              copy(
                "Peace International Islamic School & College (PIISC). All rights reserved.",
                "পিস ইন্টারন্যাশনাল ইসলামিক স্কুল অ্যান্ড কলেজ (পিআইআইএসসি)। সর্বস্বত্ব সংরক্ষিত।",
              )
            }}
          </p>
          <p class="[&&]:[color:rgb(82,_100,_128)]">
            {{ copy("Developed by", "তৈরি করেছে") }}
            <strong class="developer-name [&&]:font-[800] [&&]:[color:rgb(41,_78,_158)]">NeonTech</strong>
          </p>
          <nav
            class="footer-legal [&&]:mt-[2px] [&&]:flex [&&]:items-center [@media(max-width:1000px)]:[&&]:justify-start [@media(width>1000px)]:[&&]:justify-end [&&]:gap-x-[16px] [&&]:gap-y-[16px]"
            :aria-label="copy('Legal links', 'আইনি লিংক')"
          >
            <RouterLink class="[&&]:relative [&&]:[color:rgb(82,_100,_128)] [&&]:[transition-behavior:normal] [&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.25s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:color] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [&&]:[transition-timing-function:ease] [.footer-legal_a&:hover]:[color:rgb(41,_78,_158)] [.footer-legal_a&::after]:absolute [.footer-legal_a&::after]:left-[0px] [.footer-legal_a&::after]:right-[0px] [.footer-legal_a&::after]:bottom-[-3px] [.footer-legal_a&::after]:h-[1px] [.footer-legal_a&::after]:[background-attachment:initial] [.footer-legal_a&::after]:[background-clip:initial] [.footer-legal_a&::after]:[background-color:rgb(217,_179,_61)] [.footer-legal_a&::after]:[background-image:initial] [.footer-legal_a&::after]:[background-origin:initial] [.footer-legal_a&::after]:[background-position:initial] [.footer-legal_a&::after]:[background-repeat:initial] [.footer-legal_a&::after]:[background-size:initial] [.footer-legal_a&::after]:[content:''] [.footer-legal_a&::after]:[transform:scaleX(0)] [.footer-legal_a&::after]:[transform-origin:left_center] [.footer-legal_a&::after]:[transition-behavior:normal] [.footer-legal_a&::after]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[.footer-legal_a&::after]:[transition-duration:0.25s] [@media(prefers-reduced-motion:reduce)]:[.footer-legal_a&::after]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[.footer-legal_a&::after]:[transition-property:transform] [@media(prefers-reduced-motion:reduce)]:[.footer-legal_a&::after]:[transition-property:none] [.footer-legal_a&::after]:[transition-timing-function:ease] [.footer-legal_a&:hover::after]:[transform:scaleX(1)]" to="/privacy-policy">{{
              copy("Privacy Policy", "গোপনীয়তা নীতি")
            }}</RouterLink>
            <span aria-hidden="true">·</span>
            <RouterLink class="[&&]:relative [&&]:[color:rgb(82,_100,_128)] [&&]:[transition-behavior:normal] [&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.25s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:color] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [&&]:[transition-timing-function:ease] [.footer-legal_a&:hover]:[color:rgb(41,_78,_158)] [.footer-legal_a&::after]:absolute [.footer-legal_a&::after]:left-[0px] [.footer-legal_a&::after]:right-[0px] [.footer-legal_a&::after]:bottom-[-3px] [.footer-legal_a&::after]:h-[1px] [.footer-legal_a&::after]:[background-attachment:initial] [.footer-legal_a&::after]:[background-clip:initial] [.footer-legal_a&::after]:[background-color:rgb(217,_179,_61)] [.footer-legal_a&::after]:[background-image:initial] [.footer-legal_a&::after]:[background-origin:initial] [.footer-legal_a&::after]:[background-position:initial] [.footer-legal_a&::after]:[background-repeat:initial] [.footer-legal_a&::after]:[background-size:initial] [.footer-legal_a&::after]:[content:''] [.footer-legal_a&::after]:[transform:scaleX(0)] [.footer-legal_a&::after]:[transform-origin:left_center] [.footer-legal_a&::after]:[transition-behavior:normal] [.footer-legal_a&::after]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[.footer-legal_a&::after]:[transition-duration:0.25s] [@media(prefers-reduced-motion:reduce)]:[.footer-legal_a&::after]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[.footer-legal_a&::after]:[transition-property:transform] [@media(prefers-reduced-motion:reduce)]:[.footer-legal_a&::after]:[transition-property:none] [.footer-legal_a&::after]:[transition-timing-function:ease] [.footer-legal_a&:hover::after]:[transform:scaleX(1)]" to="/terms-and-conditions">{{
              copy("Terms and Conditions", "শর্তাবলি")
            }}</RouterLink>
          </nav>
        </div>
      </div>
      <nav
        class="footer-quick-links [&&]:mt-[18px] [&&]:flex [&&]:flex-wrap [@media(max-width:600px)]:[&&]:gap-x-[18px] [@media(width>600px)]:[&&]:gap-x-[24px] [@media(max-width:600px)]:[&&]:gap-y-[12px] [@media(width>600px)]:[&&]:gap-y-[10px] [&&]:pt-[20px] [&&]:[border-top-color:rgb(238,_242,_248)] [&&]:[border-top-style:solid] [&&]:[border-top-width:1px] [&&]:[font-size:13px]"
        :aria-label="copy('Quick links', 'দ্রুত লিংক')"
      >
        <RouterLink class="[&&]:relative [&&]:[color:rgb(82,_100,_128)] [&&]:[transition-behavior:normal] [&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.25s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:color] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [&&]:[transition-timing-function:ease] [.footer-quick-links_a&:hover]:[color:rgb(41,_78,_158)] [.footer-quick-links_a&::after]:absolute [.footer-quick-links_a&::after]:left-[0px] [.footer-quick-links_a&::after]:right-[0px] [.footer-quick-links_a&::after]:bottom-[-3px] [.footer-quick-links_a&::after]:h-[1px] [.footer-quick-links_a&::after]:[background-attachment:initial] [.footer-quick-links_a&::after]:[background-clip:initial] [.footer-quick-links_a&::after]:[background-color:rgb(217,_179,_61)] [.footer-quick-links_a&::after]:[background-image:initial] [.footer-quick-links_a&::after]:[background-origin:initial] [.footer-quick-links_a&::after]:[background-position:initial] [.footer-quick-links_a&::after]:[background-repeat:initial] [.footer-quick-links_a&::after]:[background-size:initial] [.footer-quick-links_a&::after]:[content:''] [.footer-quick-links_a&::after]:[transform:scaleX(0)] [.footer-quick-links_a&::after]:[transform-origin:left_center] [.footer-quick-links_a&::after]:[transition-behavior:normal] [.footer-quick-links_a&::after]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[.footer-quick-links_a&::after]:[transition-duration:0.25s] [@media(prefers-reduced-motion:reduce)]:[.footer-quick-links_a&::after]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[.footer-quick-links_a&::after]:[transition-property:transform] [@media(prefers-reduced-motion:reduce)]:[.footer-quick-links_a&::after]:[transition-property:none] [.footer-quick-links_a&::after]:[transition-timing-function:ease] [.footer-quick-links_a&:hover::after]:[transform:scaleX(1)]" to="/about">{{
          copy("About Us", "আমাদের সম্পর্কে")
        }}</RouterLink>
        <RouterLink class="[&&]:relative [&&]:[color:rgb(82,_100,_128)] [&&]:[transition-behavior:normal] [&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.25s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:color] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [&&]:[transition-timing-function:ease] [.footer-quick-links_a&:hover]:[color:rgb(41,_78,_158)] [.footer-quick-links_a&::after]:absolute [.footer-quick-links_a&::after]:left-[0px] [.footer-quick-links_a&::after]:right-[0px] [.footer-quick-links_a&::after]:bottom-[-3px] [.footer-quick-links_a&::after]:h-[1px] [.footer-quick-links_a&::after]:[background-attachment:initial] [.footer-quick-links_a&::after]:[background-clip:initial] [.footer-quick-links_a&::after]:[background-color:rgb(217,_179,_61)] [.footer-quick-links_a&::after]:[background-image:initial] [.footer-quick-links_a&::after]:[background-origin:initial] [.footer-quick-links_a&::after]:[background-position:initial] [.footer-quick-links_a&::after]:[background-repeat:initial] [.footer-quick-links_a&::after]:[background-size:initial] [.footer-quick-links_a&::after]:[content:''] [.footer-quick-links_a&::after]:[transform:scaleX(0)] [.footer-quick-links_a&::after]:[transform-origin:left_center] [.footer-quick-links_a&::after]:[transition-behavior:normal] [.footer-quick-links_a&::after]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[.footer-quick-links_a&::after]:[transition-duration:0.25s] [@media(prefers-reduced-motion:reduce)]:[.footer-quick-links_a&::after]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[.footer-quick-links_a&::after]:[transition-property:transform] [@media(prefers-reduced-motion:reduce)]:[.footer-quick-links_a&::after]:[transition-property:none] [.footer-quick-links_a&::after]:[transition-timing-function:ease] [.footer-quick-links_a&:hover::after]:[transform:scaleX(1)]" to="/admission-requirement">{{
          copy("Admissions", "ভর্তি")
        }}</RouterLink>
        <RouterLink class="[&&]:relative [&&]:[color:rgb(82,_100,_128)] [&&]:[transition-behavior:normal] [&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.25s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:color] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [&&]:[transition-timing-function:ease] [.footer-quick-links_a&:hover]:[color:rgb(41,_78,_158)] [.footer-quick-links_a&::after]:absolute [.footer-quick-links_a&::after]:left-[0px] [.footer-quick-links_a&::after]:right-[0px] [.footer-quick-links_a&::after]:bottom-[-3px] [.footer-quick-links_a&::after]:h-[1px] [.footer-quick-links_a&::after]:[background-attachment:initial] [.footer-quick-links_a&::after]:[background-clip:initial] [.footer-quick-links_a&::after]:[background-color:rgb(217,_179,_61)] [.footer-quick-links_a&::after]:[background-image:initial] [.footer-quick-links_a&::after]:[background-origin:initial] [.footer-quick-links_a&::after]:[background-position:initial] [.footer-quick-links_a&::after]:[background-repeat:initial] [.footer-quick-links_a&::after]:[background-size:initial] [.footer-quick-links_a&::after]:[content:''] [.footer-quick-links_a&::after]:[transform:scaleX(0)] [.footer-quick-links_a&::after]:[transform-origin:left_center] [.footer-quick-links_a&::after]:[transition-behavior:normal] [.footer-quick-links_a&::after]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[.footer-quick-links_a&::after]:[transition-duration:0.25s] [@media(prefers-reduced-motion:reduce)]:[.footer-quick-links_a&::after]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[.footer-quick-links_a&::after]:[transition-property:transform] [@media(prefers-reduced-motion:reduce)]:[.footer-quick-links_a&::after]:[transition-property:none] [.footer-quick-links_a&::after]:[transition-timing-function:ease] [.footer-quick-links_a&:hover::after]:[transform:scaleX(1)]" to="/contact">{{
          copy("Contact & school visits", "যোগাযোগ ও বিদ্যালয় পরিদর্শন")
        }}</RouterLink>
        <a class="[&&]:relative [&&]:[color:rgb(82,_100,_128)] [&&]:[transition-behavior:normal] [&&]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-duration:0.25s] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[&&]:[transition-property:color] [@media(prefers-reduced-motion:reduce)]:[&&]:[transition-property:none] [&&]:[transition-timing-function:ease] [.footer-quick-links_a&:hover]:[color:rgb(41,_78,_158)] [.footer-quick-links_a&::after]:absolute [.footer-quick-links_a&::after]:left-[0px] [.footer-quick-links_a&::after]:right-[0px] [.footer-quick-links_a&::after]:bottom-[-3px] [.footer-quick-links_a&::after]:h-[1px] [.footer-quick-links_a&::after]:[background-attachment:initial] [.footer-quick-links_a&::after]:[background-clip:initial] [.footer-quick-links_a&::after]:[background-color:rgb(217,_179,_61)] [.footer-quick-links_a&::after]:[background-image:initial] [.footer-quick-links_a&::after]:[background-origin:initial] [.footer-quick-links_a&::after]:[background-position:initial] [.footer-quick-links_a&::after]:[background-repeat:initial] [.footer-quick-links_a&::after]:[background-size:initial] [.footer-quick-links_a&::after]:[content:''] [.footer-quick-links_a&::after]:[transform:scaleX(0)] [.footer-quick-links_a&::after]:[transform-origin:left_center] [.footer-quick-links_a&::after]:[transition-behavior:normal] [.footer-quick-links_a&::after]:[transition-delay:0s] [@media(prefers-reduced-motion:no-preference)]:[.footer-quick-links_a&::after]:[transition-duration:0.25s] [@media(prefers-reduced-motion:reduce)]:[.footer-quick-links_a&::after]:[transition-duration:0s] [@media(prefers-reduced-motion:no-preference)]:[.footer-quick-links_a&::after]:[transition-property:transform] [@media(prefers-reduced-motion:reduce)]:[.footer-quick-links_a&::after]:[transition-property:none] [.footer-quick-links_a&::after]:[transition-timing-function:ease] [.footer-quick-links_a&:hover::after]:[transform:scaleX(1)]" :href="`tel:${headerContacts.phone.replace(/\s/g, '')}`">{{
          copy("Call the office", "অফিসে কল করুন")
        }}</a>
      </nav>
    </div>
  </footer>
</template>
