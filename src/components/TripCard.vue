<script setup lang="ts">
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'

const {
  user_id,
  trip_id,
  destination,
  start_date,
  end_date,
  passport_issued_country,
  budget,
  people_count,
} = defineProps({
  user_id: Number,
  trip_id: Number,
  image: String,
  destination: Object,
  start_date: String,
  end_date: String,
  passport_issued_country: String,
  budget: Object,
  people_count: Number,
})

const router = useRouter()

function goToTripReport() {
  router.push({
    name: 'tripReport',
    params: { user_id, trip_id },
    state: {
      user_id,
      trip_id,
      destination,
      start_date,
      end_date,
      passport_issued_country,
      budget,
      people_count,
    },
  })
}

function goToChecklist() {
  router.push({ name: 'tripChecklist', params: { user_id, trip_id } })
}
</script>

<template>
  <div class="p-4 border rounded-md shadow-md bg-white dark:bg-gray-800">
    <!-- <img :src="image" alt="Trip image" class="w-full h-48 object-cover rounded-md mb-4" /> -->
    <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
      {{ destination.city }}
    </h3>
    <p class="text-gray-600 dark:text-gray-400">{{ start_date }}</p>
    <p class="text-gray-600 dark:text-gray-400">{{ end_date }}</p>
    <div class="mt-4 flex gap-4">
      <button
        @click="goToTripReport"
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        View Trip Report
      </button>
      <button
        @click="goToChecklist"
        class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        View Checklist
      </button>
    </div>
  </div>
</template>
