<script setup lang="ts">
import { ref, inject } from 'vue'
import type { DarkModeContext } from '@/types/index'

const darkMode = inject<DarkModeContext>('darkMode')
if (!darkMode) {
  throw new Error('Dark mode context not provided')
}
const { isDark, toggleDark } = darkMode

const isDropdownOpen = ref(false)
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}
</script>

<template>
  <header
    class="flex justify-between items-center px-6 py-4 bg-primary dark:bg-highlight shadow-md"
  >
    <div class="flex items-center gap-4">
      <h1 class="text-xl font-bold text-accent dark:text-secondary">
        <router-link to="/">ReadySetPack</router-link>
      </h1>
    </div>
    <div class="flex items-center gap-6">
      <button
        @click="toggleDark"
        class="p-2 rounded-md bg-secondary dark:bg-hover-dark text-accent dark:text-background"
        aria-label="Toggle Dark Mode"
      >
        <span v-if="isDark">☀️</span>
        <span v-else>🌙</span>
      </button>
      <div class="relative">
        <button
          @click="toggleDropdown"
          class="p-2 rounded-md bg-secondary dark:bg-hover-dark text-accent dark:text-background"
          aria-label="Navigation Menu"
        >
          ☰
        </button>
        <nav>
          <ul
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 bg-background dark:bg-hover-dark shadow-md rounded-md w-40"
          >
            <li class="border-b border-accent dark:border-secondary">
              <router-link
                to="/"
                class="block px-4 py-2 text-accent dark:text-accent hover:bg-hover-light dark:hover:bg-hover-dark"
                >Home</router-link
              >
            </li>
            <li class="border-b border-accent dark:border-secondary">
              <router-link
                to="/current-trips"
                class="block px-4 py-2 text-accent dark:text-accent hover:bg-hover-light dark:hover:bg-hover-dark"
                >Current Trips</router-link
              >
            </li>
            <li class="border-b border-accent dark:border-secondary">
              <router-link
                to="/new-trip"
                class="block px-4 py-2 text-accent dark:text-accent hover:bg-hover-light dark:hover:bg-hover-dark"
                >Create New Trip</router-link
              >
            </li>
            <li>
              <router-link
                to="/trip-history"
                class="block px-4 py-2 text-accent dark:text-accent hover:bg-hover-light dark:hover:bg-hover-dark"
                >Trip History</router-link
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
