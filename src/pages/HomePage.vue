<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { countries } from './data/data'

const router = useRouter()
const destination = ref('')
const departDate = ref('')
const returnDate = ref('')
const countriesList = countries

function handleFormSubmit() {
  router.push({
    path: '/new-trip',
    query: {
      destination: destination.value,
      departDate: departDate.value,
      returnDate: returnDate.value,
    },
  })
}
</script>

<template>
  <div class="min-h-screen bg-background dark:bg-gray-900 flex flex-col items-center">
    <div class="text-center mt-8 mb-12">
      <h1 class="text-4xl font-bold text-accent dark:text-gray-200">Welcome to Ready Set Pack</h1>
      <p class="mt-4 text-lg text-gray-900 dark:text-gray-400">
        Your <i>ultimate</i> travel planning companion!
      </p>
    </div>

    <div class="flex flex-col md:flex-row items-start justify-center gap-8 w-full px-4">
      <div class="md:w-1/2 p-8 bg-secondary dark:bg-gray-800 shadow-md rounded-md">
        <h2 class="text-3xl font-bold text-accent dark:text-gray-200 mb-4">Explore Everywhere</h2>
        <p class="text-gray-800 dark:text-gray-400">
          Plan your trips with ease, track your itineraries, manage your budget, and ensure you’re
          ready to pack for any destination. Let’s make travel stress-free!
        </p>
      </div>

      <div class="md:w-1/2 p-8 bg-secondary dark:bg-gray-800 shadow-md rounded-md">
        <h2 class="text-2xl font-semibold text-accent dark:text-gray-200 mb-4">
          Plan Your Next Adventure
        </h2>
        <form @submit.prevent="handleFormSubmit" class="space-y-4">
          <div>
            <label for="destination" class="block text-gray-900 dark:text-gray-300 mb-1"
              >Destination</label
            >
            <select
              v-model="destination"
              id="destination"
              class="w-full border border-gray-400 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            >
              <option v-for="(code, country) in countriesList" :key="country" :value="country">
                {{ country }}
              </option>
            </select>
          </div>
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <label for="departDate" class="block text-gray-900 dark:text-gray-300 mb-1"
                >Departure Date</label
              >
              <input
                id="departDate"
                v-model="departDate"
                type="date"
                class="w-full border border-gray-400 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
            </div>
            <div class="flex-1">
              <label for="returnDate" class="block text-gray-900 dark:text-gray-300 mb-1"
                >Return Date</label
              >
              <input
                id="returnDate"
                v-model="returnDate"
                type="date"
                class="w-full border border-gray-400 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
            </div>
          </div>
          <button
            type="submit"
            class="w-full bg-accent hover:bg-highlight text-white font-semibold py-2 px-4 rounded-md"
          >
            Let's Get Planning!
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
