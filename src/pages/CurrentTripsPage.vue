<script setup lang="ts">
import TripCard from '@/components/TripCard.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { TripState } from '@/types/index'
import { getTripInfo } from './service/apiService'

const router = useRouter()
let arrOfTrips = ref([])


onMounted(async () => {
  const trips = await getTripInfo()
  console.log("trips is here: ", trips)
  arrOfTrips.value = trips.data.trips
  console.log(arrOfTrips.value)
})
</script>

<template>
  <div class="min-h-screen bg-background dark:bg-gray-900 p-8">
    <h1 class="text-3xl font-bold text-accent dark:text-secondary mb-6">Current Trips</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TripCard
        v-for="trip in arrOfTrips"
        :key="trip.user_id"
        :city_information="trip.city_information"
        :user_id="trip.user_id"
        :trip_id="trip.trip_id"
        :destination="trip.destination"
        :start_date="`${trip.start_date} to`"
        :end_date="`${trip.end_date}`"
        :passport_issued_country="trip.passport_issued_country" 
        :budget="trip.budget"
        :people_count="trip.people_count"
        class="bg-secondary dark:bg-hover-dark text-accent dark:text-background rounded-md shadow-md hover:bg-hoverLight dark:hover:bg-hover-dark transition-colors"
      />
    </div>
  </div>
</template>
