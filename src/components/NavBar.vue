<script setup lang="ts">
import { ref, inject } from 'vue'
import type { DarkModeContext } from '@/types/index'

const darkMode = inject<DarkModeContext>('darkMode')
if (!darkMode) {
  throw new Error('Dark mode context not provided')
}
const { isDark, toggleDark } = darkMode

const isDropdownOpen = ref(false);
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}
</script>

<template>
  <header class="flex justify-between items-center px-6 py-4 bg-gray-100 shadow-md dark:bg-black">
    <div class="flex items-center gap-4">
      <h1 class="text-xl font-bold text-gray-800 dark:text-gray-200">
        <router-link to="/">ReadySetPack</router-link>
      </h1>
    </div>
    <div class="flex items-center gap-6">
      <button
        @click="toggleDark"
        class="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
        aria-label="Toggle Dark Mode"
      >
        <span v-if="isDark">☀️</span>
        <span v-else>🌙</span>
      </button>
      <div class ="relative">
        <button
        @click="toggleDropdown"
        class="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
        aria-label="Navigation Menu"
        >
        ☰
        </button>
        <nav>
          <ul 
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-md rounded-md w-40"
          >
            <li class="border-b border-gray-300 dark:border-gray-700">
              <router-link to="/" class="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Home</router-link>
            </li>
            <li class="border-b border-gray-300 dark:border-gray-700">
              <router-link to="/current-trips" class="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Current Trips</router-link>
            </li>
            <li class="border-b border-gray-300 dark:border-gray-700">
              <router-link to="/new-trip" class="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Create New Trip</router-link>
            </li>
            <li class="border-b border-gray-300 dark:border-gray-700">
              <router-link to="/history" class="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Trip History</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>



  