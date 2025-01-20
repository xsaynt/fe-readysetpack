<script setup lang="ts">
import TripCard from '@/components/TripCard.vue'
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { TripState } from '@/types/index'

const router = useRouter();

const trips = ref([
  {
    id: '1',
    destination: 'Paris, France', // object
    departDate: '2025-02-15', // start date
    returnDate: '2025-02-22', // end date
    passportOrigin: 'GB',
    budget: 500,
    destinationCurrency: 'GBP',
    amountOfTravellers: 3
  },
  {
    id: '2',
    destination: 'Tokyo, Japan',
    departDate: '2025-03-01',
    returnDate: '2025-03-10',
    passportOrigin: 'FR',
    budget: 250,
    destinationCurrency: 'EUR',
    amountOfTravellers: 1
  },
])

onMounted(() => {
  const state = router.options.history.state as unknown as TripState
  if (state && state.newTrip) {
    const newTrip = state.newTrip
    trips.value.push({
        id: newTrip.id,
        destination: newTrip.destination,
        departDate: newTrip.departDate,
        returnDate: newTrip.returnDate,
        passportOrigin: newTrip.passportOrigin,
        budget: newTrip.budget,
        destinationCurrency: newTrip.destinationCurrency,
        amountOfTravellers: newTrip.amountOfTravellers
    })
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Current Trips</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TripCard
        v-for="trip in trips"
        :key="trip.id"
        :id="trip.id"
        :destination="trip.destination"
        :dates="`${trip.departDate} to ${trip.returnDate}`"
      />
    </div>
  </div>
</template>