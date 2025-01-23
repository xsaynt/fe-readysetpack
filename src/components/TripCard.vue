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
  city_information
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
  city_information: String
})

const router = useRouter()

function goToTripReport() {
  console.log("user id is: ", user_id)
  console.log("trip_id:", trip_id)
  console.log("destination:", destination)
  console.log("start_date:", start_date)
  console.log("end_date:", end_date)
  console.log("passport:", passport_issued_country)
  console.log("budget:", budget.current_amount)
  console.log("keys: ", Object.keys(budget))
  console.log("current currency:", budget.current_currency)
  console.log("amount_in_foreign_currency:", budget.destination_amount) // after converted
  console.log("destination currency:", budget.destination_currency)
  console.log("people_count:", people_count)
  console.log("city info", city_information)


  router.push({
    name: 'tripReport',
    params: {trip_id, user_id},
    query: { 
      user_id, 
      trip_id,
      destinationFullName: destination.city,
      destinationCode: destination.country, // unpack this
      start_date,
      end_date,
      passport_issued_country,
      budget: budget.current_amount, 
      convertedBudget: budget.destination_amount,// the actual budget
      currCurrency: budget.current_currency,
      destCurrency: budget.destination_currency,
      people_count,
      country_info: city_information
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
    <p class="text-gray-600 dark:text-gray-100">{{ start_date }}</p>
    <p class="text-gray-600 dark:text-gray-100">{{ end_date }}</p>
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
