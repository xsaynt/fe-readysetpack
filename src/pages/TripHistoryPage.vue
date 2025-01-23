<template>
  <div class="p-6 bg-gray-100 min-h-screen dark:bg-gray-900">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">History of Trips</h1>

    <div v-if="loading" class="text-center">
      <p class="text-gray-500 dark:text-gray-300">Loading trips...</p>
    </div>

    <div v-if="error" class="text-center text-red-500 dark:text-red-400">
      <p>{{ error }}</p>
    </div>

    <div v-if="!loading && pastTrips.length > 0">
      <table class="table-auto w-full border-collapse bg-white dark:bg-gray-800 shadow-lg rounded-md">
        <thead class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
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
            v-for="trip in pastTrips"
            :key="trip.trip_id"
            class="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <td class="px-4 py-2">
              <p class="font-medium text-gray-900 dark:text-gray-100">
                {{ trip.destination.city }}, {{ trip.destination.country }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ trip.destination.currency }}</p>
            </td>
            <td class="px-4 py-2 dark:text-gray-100">{{ formatDate(trip.start_date) }}</td>
            <td class="px-4 py-2 dark:text-gray-100">{{ formatDate(trip.end_date) }}</td>
            <td class="px-4 py-2 dark:text-gray-100">
              <p>{{ trip.budget.current_amount }} {{ trip.budget.current_currency }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Converted: {{ trip.budget.destination_amount }}
                {{ trip.budget.destination_currency }}
              </p>
            </td>
            <td class="px-4 py-2">
              <p v-if="trip.weather" class="text-gray-700 dark:text-gray-200 font-medium">
                {{ trip.weather.weather_type }}
              </p>
              <p v-if="trip.weather" class="text-sm text-gray-500 dark:text-gray-400">
                Temperature: {{ trip.weather.temp }}°C
              </p>
              <p v-else class="text-sm text-gray-400 dark:text-gray-500 italic">Weather data not available</p>
            </td>
            <td class="px-4 py-2">
              <div v-if="trip.landmarks">
                <ul style="list-style: none; padding-left: 0;">
                  <li v-for="(landmark, index) in trip.landmarks.best_places_to_visit" :key="index">
                    <div class="flex items-center space-x-2">
                      <img
                        v-if="trip.landmarks.img_url_of_landmarks && trip.landmarks.img_url_of_landmarks[index]"
                        :src="trip.landmarks.img_url_of_landmarks[index] || 'default-placeholder.jpg'"
                        :alt="landmark"
                        class="w-12 h-12 rounded-md shadow"
                      />
                      <span class="text-gray-800 dark:text-gray-200">{{ landmark }}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <p v-else class="text-sm text-gray-400 dark:text-gray-500 italic">No landmarks available</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!loading && pastTrips.length === 0" class="text-center text-gray-500 dark:text-gray-400">
      <p>No past trips found.</p>
    </div>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, computed } from 'vue';
  import { getTripHistory } from './service/apiService';
  import type { Trip } from '../types/index';
  
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

      const pastTrips = computed(() => {
      const currentDate = new Date();
      return trips.value.filter((trip) => new Date(trip.start_date) < currentDate);
    });

      const formatDate = (dateString: string): string => {
      const [year, month, day] = dateString.split('-'); 
      return `${day}/${month}/${year}`; 
    };
  
      onMounted(() => {
        fetchTrips(1);
      });
  
      return {
        trips,
        loading,
        error,
        fetchTrips,
        pastTrips,
        formatDate
      };
    },
  });
  </script>