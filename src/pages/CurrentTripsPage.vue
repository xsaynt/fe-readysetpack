<script setup lang="ts">
import TripCard from '@/components/TripCard.vue'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { TripState } from '@/types/index'
import { getTripInfo } from './service/apiService'

const router = useRouter();



onMounted(async () => {
  const trips = await getTripInfo()
  const arrOfTrips = trips.data.trips
  console.log(arrOfTrips) 

  // structure of each object in  trips.data.trips
//   budget
// : 
// {current_amount: 101, current_currency: 'KYD', destination_amount: 48425.46, destination_currency: 'AMD'}
// city_information
// : 
// "Paris (French pronunciation: [paʁi] ) is the capital and largest city of France. With an estimated population of 2,102,650 residents in January 2023 in an area of more than 105 km2 (41 sq mi), Paris is the fourth-most populous city in the European Union, the ninth-most populous city in Europe and the 30th most densely populated city in the world in 2022. Since the 17th century, Paris has been one of the world's major centres of finance, diplomacy, commerce, culture, fashion, and gastronomy."
// daily_expected_cost
// : 
// 300
// destination
// : 
// {city: 'Paris', country: 'BB', currency: 'AMD'}
// end_date
// : 
// "2025-02-28"
// events
// : 
// null
// is_booked_hotel
// : 
// null
// landmarks
// : 
// null
// passport_issued_country
// : 
// "AF"
// people_count
// : 
// 1
// start_date
// : 
// "2025-02-06"
// trip_id
// : 
// 21
// user_id
// : 
// 1
// visa_type
// : 
// null
// weather
// : 
// null
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
        :passportOrigin="trip.passportOrigin"
        :budget="trip.budget"
        :destinationCurrency="trip.destinationCurrency"
        :currentCurrency="trip.currentCurrency"
        :amountOfTravellers="trip.amountOfTravellers"
      />
    </div>
  </div>
</template>