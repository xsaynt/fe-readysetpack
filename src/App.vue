<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import { provide } from 'vue'
import type { DarkModeContext } from '@/types/index'
import { useDark, useToggle } from '@vueuse/core'

const darkModeState = useDark({
  storageKey: 'theme',
})

function toggleDark() {
  darkModeState.value = !darkModeState.value
  useToggle(darkModeState)
}
provide<DarkModeContext>('darkMode', { isDark: darkModeState, toggleDark })
</script>

<template>
  <header>
      <NavBar />
  </header>

  <main>
    <router-view />
  </main>
</template>