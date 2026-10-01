<script setup>
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Headphones,
  Megaphone,
  Phone,
} from "lucide-vue-next";
import { headerContacts } from "../data/navigation.js";
</script>

<template>
  <section class="admission-gateway" aria-labelledby="gateway-title">
    <nav class="gateway-links" :aria-label="$tr('Admission information')">
      <RouterLink to="/admission-requirement">
        <span class="card-number" aria-hidden="true">01</span>
        <span class="card-icon"> <ClipboardCheck aria-hidden="true" /></span>

        <h3>{{ $tr("Admission procedure and requirements") }}</h3>
        <ArrowRight class="card-arrow" aria-hidden="true" />
      </RouterLink>
      <RouterLink to="/curriculum">
        <span class="card-number" aria-hidden="true">02</span>
        <span class="card-icon"><BookOpen aria-hidden="true" /></span>
        <h3>{{ $tr("Curriculum and class structure") }}</h3>
        <ArrowRight class="card-arrow" aria-hidden="true" />
      </RouterLink>
      <RouterLink to="/contact">
        <span class="card-number" aria-hidden="true">03</span>
        <span class="card-icon"><Headphones aria-hidden="true" /></span>
        <h3>{{ $tr("Contact school administration") }}</h3>
        <ArrowRight class="card-arrow" aria-hidden="true" />
      </RouterLink>
    </nav>
    <div class="gateway-main">
      <span class="gateway-icon"><Megaphone aria-hidden="true" /></span>
      <div class="gateway-copy">
        <p>{{ $tr("ADMISSION SUPPORT") }}</p>
        <h2 id="gateway-title">
          {{ $tr("Plan your child’s next step with PIISC.") }}
        </h2>
        <span>{{
          $tr(
            "Explore requirements, understand our learning pathway, or speak with the school about available classes and the admission process.",
          )
        }}</span>
      </div>
      <div class="gateway-actions">
        <RouterLink to="/online-admission" class="gateway-primary"
          >{{ $tr("Apply Now") }}<ArrowRight :size="19" aria-hidden="true"
        /></RouterLink>
        <a :href="`tel:${headerContacts.phone.replace(/\s/g, '')}`"
          ><Phone :size="18" aria-hidden="true" />{{
            $tr("Call Admission Desk")
          }}</a
        >
      </div>
    </div>
  </section>
</template>

<style scoped>
.admission-gateway {
  position: relative;
  z-index: 4;
  width: min(1590px, calc(100% - 48px));
  margin: -44px auto 0;
}
.gateway-main {
  min-height: 176px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 26px;
  padding: 32px;
  margin-top: 20px;
  margin-bottom: 32px;
  border: 1px solid #e6dfcc;
  border-left: 4px solid #d9b33d;
  border-radius: 6px;
  background: linear-gradient(115deg, #fffdf6, #fff 65%);
  box-shadow: 0 12px 36px #182d4b0c;
}
.gateway-icon {
  display: grid;
  place-items: center;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: #fff8cf;
  color: #294e9e;
}
.gateway-icon svg {
  width: 33px;
}
.gateway-copy p {
  margin: 0 0 9px;
  color: #bb8e19;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.22em;
}
.gateway-copy h2 {
  margin: 0;
  color: #294e9e;
  font-size: clamp(23px, 2vw, 32px);
  line-height: 1.28;
}
.gateway-copy > span {
  display: block;
  margin-top: 13px;
  color: #5e6d84;
  font-size: 16px;
  line-height: 1.65;
}
.gateway-actions {
  display: flex;
  gap: 12px;
}
.gateway-actions a {
  min-height: 58px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 21px;
  border: 1px solid #d5ddea;
  border-radius: 6px;
  color: #294e9e;
  font-weight: 800;
  white-space: nowrap;
  cursor: pointer;
  transition:
    transform 0.25s ease,
    background 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease;
}
.gateway-actions .gateway-primary {
  border-color: #294e9e;
  background: #294e9e;
  color: #fff;
}
.gateway-actions a:hover {
  transform: translateY(-3px);
  box-shadow: 0 9px 23px #1c33551c;
}
.gateway-actions .gateway-primary:hover {
  background: #1d3c82;
}
.gateway-actions a:not(.gateway-primary):hover {
  border-color: #d9b33d;
  background: #fff9e4;
}
.gateway-links {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}
.gateway-links a {
  min-width: 0;
  position: relative;
  display: flex;
  align-items: center;
  gap: 22px 16px;
  padding: 20px 24px;
  border: 1px solid #e0e6ed;
  border-top: 3px solid #d9b33d;
  border-radius: 6px;
  background: #fff;
  color: #0a2948;
  box-shadow: 0 10px 28px #243c6814;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}
.card-icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: #fbf4df;
  color: #a47b1d;
  transition:
    background 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease;
}
.card-icon svg {
  width: 28px;
  height: 28px;
  stroke-width: 1.7;
}
.card-number {
  align-self: start;
  color: #a3afbd;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
}
.gateway-links h3 {
  min-width: 0;
  margin: 0;
  font-size: clamp(18px, 1.4vw, 22px);
  line-height: 1.4;
  color: inherit;
}
.card-arrow {
  width: 22px;
  color: #294e9e;
  transition: transform 0.3s ease;
}
.gateway-links a:hover,
.gateway-links a:focus-visible {
  z-index: 1;
  color: #294e9e;
  border-color: #d9b33d;
  transform: translateY(-5px);
  box-shadow: 0 18px 38px #243c6822;
}
.gateway-links a:hover .card-icon,
.gateway-links a:focus-visible .card-icon {
  background: #0a2948;
  color: #e4c683;
  transform: translateY(-2px);
}
.gateway-links a:hover .card-arrow,
.gateway-links a:focus-visible .card-arrow {
  transform: translateX(4px);
}
@media (max-width: 1050px) {
  .gateway-main {
    grid-template-columns: auto 1fr;
  }
  .gateway-actions {
    grid-column: 1/-1;
  }
  .gateway-links a {
    padding: 22px 18px;
  }
}
@media (max-width: 900px) {
  .admission-gateway {
    width: calc(100% - 24px);
    margin-top: -25px;
  }
  .gateway-main {
    display: block;
    padding: 26px 22px;
  }
  .gateway-icon {
    width: 58px;
    height: 58px;
    margin-bottom: 18px;
  }
  .gateway-actions {
    margin-top: 22px;
    display: grid;
    grid-template-columns: 1fr;
  }
  .gateway-actions a {
    min-height: 50px;
  }
  .gateway-links {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .gateway-links a {
    display: grid;
    min-height: 112px;
    grid-template-columns: 56px minmax(0, 1fr) auto;
    gap: 16px;
    padding: 22px;
  }
  .card-number {
    display: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .gateway-actions a,
  .gateway-links a,
  .card-icon,
  .gateway-links svg {
    transition: none;
  }
  .gateway-actions a:hover,
  .gateway-links a:hover,
  .gateway-links a:focus-visible,
  .gateway-links a:hover .card-icon,
  .gateway-links a:focus-visible .card-icon,
  .gateway-links a:hover .card-arrow,
  .gateway-links a:focus-visible .card-arrow {
    transform: none;
  }
}
</style>
