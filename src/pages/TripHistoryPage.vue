<template>
    <div class="p-6 bg-gray-100 min-h-screen">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">History of Trips</h1>
  
      <div v-if="loading" class="text-center">
        <p class="text-gray-500">Loading trips...</p>
      </div>
  
      <div v-if="error" class="text-center text-red-500">
        <p>{{ error }}</p>
      </div>
  
      <div v-if="!loading && trips.length > 0">
        <table class="table-auto w-full border-collapse bg-white shadow-lg rounded-md">
          <thead class="bg-gray-200 text-gray-700">
            <tr>
              <th class="px-4 py-2 text-left">Destination</th>
              <th class="px-4 py-2 text-left">Start Date</th>
              <th class="px-4 py-2 text-left">End Date</th>
              <th class="px-4 py-2 text-left">Budget</th>
              <th class="px-4 py-2 text-left">Weather</th>
              <th class="px-4 py-2 text-left">Landmarks</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="trip in trips"
              :key="trip.trip_id"
              class="border-b hover:bg-gray-50 transition"
            >
              <td class="px-4 py-2">
                <p class="font-medium text-gray-900">
                  {{ trip.destination.city }}, {{ trip.destination.country }}
                </p>
                <p class="text-sm text-gray-500">{{ trip.destination.currency }}</p>
              </td>
              <td class="px-4 py-2">{{ trip.start_date }}</td>
              <td class="px-4 py-2">{{ trip.end_date }}</td>
              <!-- <td class="px-4 py-2">
                <p class="text-gray-700">{{ trip.weather.weather_type }}</p>
                <p class="text-sm text-gray-500">{{ trip.weather.temp }}°C</p>
              </td> -->
              <td class="px-4 py-2">
                <p>{{ trip.budget.current_amount }} {{ trip.budget.current_currency }}</p>
                <p class="text-sm text-gray-500">
                  Converted: {{ trip.budget.destination_amount }}
                  {{ trip.budget.destination_currency }}
                </p>
              </td>
              <td class="px-4 py-2">
                <!-- <ul class="list-disc list-inside">
                  <li
                    v-for="(landmark, index) in trip.landmarks.best_places_to_visit"
                    :key="index"
                  >
                    {{ landmark }}
                  </li>
                </ul> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div v-if="!loading && trips.length === 0" class="text-center text-gray-500">
        <p>No trips found.</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { getTripHistory } from './service/apiService';
  

  interface Destination {
    city: string;
    country: string;
    currency: string;
  }
  
  interface Weather {
    weather_type: string;
    temp: number;
  }
  
  interface Budget {
    current_amount: number;
    current_currency: string;
    destination_amount: number;
    destination_currency: string;
  }
  
  interface Trip {
    trip_id: number;
    destination: Destination;
    start_date: string;
    end_date: string;
    weather: Weather;
    budget: Budget;
    landmarks: {
      best_places_to_visit: string[];
    };
  }
  
  export default defineComponent({
    name: 'HistoryOfTrips',
    setup() {
      const trips = ref<Trip[]>([]); 
      const loading = ref(false);
      const error = ref<string | null>(null);
  
      const fetchTrips = (userId: number) => {
  loading.value = true;
  error.value = null;

  getTripHistory(userId)
    .then((response) => {
      trips.value = response.data.trips || [];
    })
    .catch((err) => {
      if (err.response && err.response.status === 404) {
        error.value = 'No trips found for the specified user ID.';
      } else {
        error.value = 'Failed to load trips. Please try again later.';
      }
      console.error(err);
    })
    .finally(() => {
      loading.value = false;
    });
};
  
      onMounted(() => {
        fetchTrips(1);
      });
  
      return {
        trips,
        loading,
        error,
        fetchTrips,
      };
    },
  });
  </script>