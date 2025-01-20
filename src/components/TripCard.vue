<script setup lang="ts">
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'

// type FullInfo = {
//   id: string
//   destination: string
//   departDate: string
//   returnDate: string
//   passportOrigin: string
//   budget: number
//   currentCurrency: string
//   destinationCurrency: string
//   amountOfTravellers: number
// }

const {
  id,
  destination,
  dates,
  passportOrigin,
  budget,
  destinationCurrency,
  currentCurrency,
  amountOfTravellers,
} = defineProps({
  id: String,
  image: String,
  destination: String,
  dates: String,
  passportOrigin: String,
  budget: Number,
  destinationCurrency: String,
  currentCurrency: String,
  amountOfTravellers: Number,
})

const router = useRouter()

function goToTripReport() {
  router.push({ name: 'tripReport', params: { id } })
}

function goToChecklist() {
  router.push({ name: 'tripChecklist', params: { id } })
}
</script>

<template>
  <div class="p-4 border rounded-md shadow-md bg-white dark:bg-gray-800">
    <!-- <img :src="image" alt="Trip image" class="w-full h-48 object-cover rounded-md mb-4" /> -->
    <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">{{ destination }}</h3>
    <p class="text-gray-600 dark:text-gray-400">{{ dates }}</p>
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
