<script setup lang="ts">
import { ref } from 'vue'
import { countries, currencies } from './data/data'
import { useRoute, useRouter } from 'vue-router'
import { postTripInfo } from './service/apiService'

const route = useRoute()
const countriesList = countries
const currenciesList = currencies
const destination = ref(route.query.destination || '')
const departDate = ref(route.query.departDate || '')
const returnDate = ref(route.query.returnDate || '')

const passportOrigin = ref('')
const budget = ref('')
const currentCurrency = ref('')
const destinationCurrency = ref('')
const amountOfTravellers = ref('')

const router = useRouter()
async function handleFormSubmit() {
  const selectedCountryName = destination.value

  const newTrip = {
    destination: {
      city: selectedCountryName,
      country: countriesList[destination.value],
      currency: currenciesList[destinationCurrency.value],
    },
    start_date: departDate.value,
    end_date: returnDate.value,
    passport_issued_country: countriesList[passportOrigin.value],
    budget: {
      current_amount: budget.value,
      current_currency: currenciesList[currentCurrency.value],
      destination_currency: currenciesList[destinationCurrency.value],
    },
    people_count: amountOfTravellers.value,
    daily_expected_cost: 300,
  }

  console.log('trip to push is ', newTrip)
  try {
    const response = await postTripInfo(newTrip)
    console.log('Trip successfully posted:', response.data)
    router.push({
      name: 'currentTrips',
      state: { newTrip },
    })
  } catch (error) {
    console.error('Error posting trip:', error)
  }
}
</script>

<template>
  <div class="min-h-screen bg-background dark:bg-gray-900 flex flex-col items-center py-8">
    <h1 class="text-3xl font-bold text-accent dark:text-gray-200 mb-6">Create A New Trip</h1>
    <form
      @submit.prevent="handleFormSubmit"
      class="w-full max-w-lg space-y-6 bg-secondary dark:bg-gray-800 p-6 rounded-md shadow-md"
    >
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
      <div class="flex gap-4">
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
      <div>
        <label for="passportOrigin" class="block text-gray-900 dark:text-gray-300 mb-1"
          >Passport Issuing Country</label
        >
        <select
          id="passportOrigin"
          v-model="passportOrigin"
          class="w-full border border-gray-400 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        >
          <option v-for="(code, country) in countriesList" :key="code" :value="country">
            {{ country }} ({{ code }})
          </option>
        </select>
      </div>
      <div>
        <label for="budget" class="block text-gray-900 dark:text-gray-300 mb-1">Budget</label>
        <input
          id="budget"
          v-model="budget"
          type="number"
          placeholder="Enter your budget"
          class="w-full border border-gray-400 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        />
      </div>
      <div>
        <label for="currentCurrency" class="block text-gray-900 dark:text-gray-300 mb-1"
          >Converting Currency From</label
        >
        <select
          id="currentCurrency"
          v-model="currentCurrency"
          class="w-full border border-gray-400 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        >
          <option v-for="(code, country) in currenciesList" :key="code" :value="country">
            {{ country }} ({{ code }})
          </option>
        </select>
      </div>
      <div>
        <label for="destinationCurrency" class="block text-gray-900 dark:text-gray-300 mb-1"
          >Currency of Destination</label
        >
        <select
          id="destinationCurrency"
          v-model="destinationCurrency"
          class="w-full border border-gray-400 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        >
          <option v-for="(code, country) in currenciesList" :key="code" :value="country">
            {{ country }} ({{ code }})
          </option>
        </select>
      </div>
      <div>
        <label for="amountOfTravellers" class="block text-gray-900 dark:text-gray-300 mb-1"
          >Amount of Travellers</label
        >
        <input
          id="amountOfTravellers"
          v-model="amountOfTravellers"
          type="number"
          placeholder="How many of you are travelling?"
          class="w-full border border-gray-400 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-accent hover:bg-highlight text-white font-semibold py-2 px-4 rounded-md"
      >
        Submit trip details
      </button>
    </form>
  </div>
</template>
