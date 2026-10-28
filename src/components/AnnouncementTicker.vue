<script setup>
import { demoAnnouncements } from "../data/announcements.js";
</script>

<template>
  <aside class="announcement-ticker" aria-label="Demo announcements">
    <div class="announcement-label">Announcements</div>
    <div class="announcement-window">
      <div class="announcement-track">
        <div class="announcement-group">
          <RouterLink v-for="item in demoAnnouncements" :key="item.id" :to="item.to" class="announcement-link">
            <span class="announcement-dot" aria-hidden="true"></span>{{ item.text }}
          </RouterLink>
        </div>
        <div class="announcement-group announcement-duplicate" aria-hidden="true" inert>
          <RouterLink v-for="item in demoAnnouncements" :key="`duplicate-${item.id}`" :to="item.to" tabindex="-1" class="announcement-link">
            <span class="announcement-dot" aria-hidden="true"></span>{{ item.text }}
          </RouterLink>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.announcement-ticker {
  display: flex;
  width: 100%;
  min-height: 42px;
  overflow: hidden;
  background: #102b55;
  color: #fff;
}

.announcement-label {
  z-index: 1;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  padding: 0 16px;
  background: #f9c747;
  color: #102b55;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.announcement-window {
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
}

.announcement-track,
.announcement-group {
  display: flex;
  width: max-content;
  min-height: 42px;
  align-items: center;
}

.announcement-track {
  animation: announcement-scroll 26s linear infinite;
}

.announcement-group {
  flex: 0 0 auto;
}

.announcement-link {
  display: inline-flex;
  min-height: 42px;
  flex: 0 0 auto;
  align-items: center;
  gap: 10px;
  padding: 0 26px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
}

.announcement-link:hover {
  color: #f9c747;
}

.announcement-link:focus-visible {
  position: relative;
  z-index: 2;
  outline: 2px solid #f9c747;
  outline-offset: -4px;
}

.announcement-dot {
  width: 6px;
  height: 6px;
  flex: 0 0 auto;
  border-radius: 999px;
  background: #f9c747;
}

.announcement-ticker:hover .announcement-track,
.announcement-ticker:focus-within .announcement-track {
  animation-play-state: paused;
}

@keyframes announcement-scroll {
  to { transform: translateX(-50%); }
}

@media (max-width: 540px) {
  .announcement-ticker,
  .announcement-track,
  .announcement-group,
  .announcement-link { min-height: 40px; }

  .announcement-label {
    padding: 0 10px;
    font-size: 9px;
    letter-spacing: 0.07em;
  }

  .announcement-link {
    gap: 8px;
    padding: 0 18px;
    font-size: 11px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .announcement-track {
    width: 100%;
    animation: none;
    transform: none;
  }

  .announcement-group {
    width: 100%;
    flex-wrap: wrap;
  }

  .announcement-duplicate {
    display: none;
  }

  .announcement-link {
    min-height: 38px;
    white-space: normal;
  }
}
</style>
