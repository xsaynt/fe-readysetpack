<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { costOfLiving, countriesCoordinates } from './data/data';
import { getVisaRequirements, getWeather } from './service/apiService';
import * as L from 'leaflet';

const route = useRoute();

let countryName = ref('');
let countryCode = ref('');
let start = ref('');
let end = ref('');
let passport = ref('');
let maxBudget = ref('');
let newMaxBudget = ref('');
let currentCurr = ref('');
let destinationCurr = ref('');
let travelers = ref('');
let info = ref('');
let visaReq = ref({});
let typeOfVisa = ref('');
let visaDuration = ref('');
let timeOfData = ref('');
let monthlyCosts = ref(costOfLiving);
let dailyCost = ref('');
let sevenDayWeather = ref({});
let averageTemp = ref('');

onMounted(async () => {
  const {
    user_id,
    trip_id,
    start_date,
    end_date,
    passport_issued_country,
    budget,
    convertedBudget,
    currCurrency,
    destCurrency,
    people_count,
    destinationFullName,
    destinationCode,
    country_info,
  } = route.query;

  countryName.value = destinationFullName;
  countryCode.value = destinationCode;
  start.value = start_date;
  end.value = end_date;
  passport.value = passport_issued_country;
  maxBudget.value = budget;
  newMaxBudget.value = convertedBudget;
  currentCurr.value = currCurrency;
  destinationCurr.value = destCurrency;
  travelers.value = people_count;
  info.value = country_info;

  dailyCost.value = (costOfLiving[countryName.value] / 28).toFixed(2);

  visaReq.value = await getVisaRequirements(passport.value, countryCode.value);

  const weatherResponse = await getWeather(
    String(countriesCoordinates[countryName.value][0]),
    String(countriesCoordinates[countryName.value][1]),
  );
  const maxTemps = weatherResponse.data.daily.temperature_2m_max;
  const minTemps = weatherResponse.data.daily.temperature_2m_min;
  const days = weatherResponse.data.daily.time;
  const dayTemp = {};
  const relativeToGMT = weatherResponse.data.timezone_abbreviation;

  for (let i = 0; i < 7; i++) {
    const dailyAverageTemp = parseFloat(((maxTemps[i] + minTemps[i]) / 2).toFixed(2));
    dayTemp[days[i]] = dailyAverageTemp;
  }

  sevenDayWeather.value = { temps: dayTemp, time: relativeToGMT };

  const arrOfTemp = Object.values(sevenDayWeather.value.temps);
  let total = 0;
  for (const value of arrOfTemp) {
    total += Number(value);
  }
  averageTemp.value = String((total / 7).toFixed(2));

  typeOfVisa.value = visaReq.value.data.category.name;
  visaDuration = visaReq.value.data.dur;
  timeOfData.value = visaReq.value.data.last_updated.split('T')[0];
  if (visaDuration === null) {
    visaDuration = 'Flexible';
  }

  const map = L.map('map').setView(
    countriesCoordinates[countryName.value] || [51.505, -0.09],
    5,
  );

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
  }).addTo(map);

  if (countriesCoordinates[countryName.value]) {
    L.marker(countriesCoordinates[countryName.value])
      .addTo(map)
      .bindPopup(`<b>${countryName.value}</b>`)
      .openPopup();
  }
});
</script>

<template>
  <div class="p-8 space-y-6 bg-background dark:bg-gray-900 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-accent dark:text-secondary">Trip Report</h1>

    <div class="p-4 bg-white dark:bg-gray-700 rounded shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
        <svg class="w-5 h-5 mr-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2C9.243 2 7 4.243 7 7c0 1.157.488 2.198 1.272 2.928L12 15l3.728-5.072A3.001 3.001 0 0017 7c0-2.757-2.243-5-5-5zM12 19v3" />
        </svg>
        Destination
      </h2>
      <p class="text-lg font-medium text-gray-800 dark:text-gray-300"> {{ countryName }} ({{ countryCode }})</p>
      <p class="text-gray-600 dark:text-gray-400 mt-1">{{ info }}</p>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Time relative to GMT: <span class="font-semibold">{{ sevenDayWeather.time }}</span>
      </p>
    </div>

    <div class="p-4 bg-white dark:bg-gray-700 rounded shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
        <svg class="w-5 h-5 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c3.866 0 7-1.343 7-3M5 8c0 1.657 3.134 3 7 3s7-1.343 7-3M5 8v4c0 1.657 3.134 3 7 3s7-1.343 7-3V8M5 12v4c0 1.657 3.134 3 7 3s7-1.343 7-3v-4" />
        </svg>
        Budget Info
      </h2>
      <p class="dark:text-gray-200">Your maximum budget: <span class="font-semibold dark:text-gray-200">{{ maxBudget }} {{ currentCurr }}</span></p>
      <p class="dark:text-gray-200">Converted budget: <span class="font-semibold dark:text-gray-200">{{ newMaxBudget }} {{ destinationCurr }}</span></p>
      <p class="dark:text-gray-200">
        Budget per person: <span class="font-semibold dark:text-gray-200">{{ (newMaxBudget / travelers).toFixed(2) }} {{ destinationCurr }}</span>
      </p>
      <p class="dark:text-gray-200">
        Average daily cost of living in {{ countryName }}: <span class="font-semibold dark:text-gray-200">{{ dailyCost }} {{ destinationCurr }}</span>
      </p>
    </div>

    <div class="p-4 bg-white dark:bg-gray-700 rounded shadow-md">
  <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
    <svg
      class="w-5 h-5 mr-2 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4h10a2 2 0 012 2v12a2 2 0 01-2 2H8m0-16a2 2 0 00-2 2v12a2 2 0 002 2m0-16v16m4-8h4"/>
    </svg>
    Visa Requirements
  </h2>
  <p class="text-lg text-gray-800 dark:text-gray-300" v-if="visaReq.data">
    Visa Type: <span class="font-medium">{{ typeOfVisa }}</span><br />
    Duration: <span class="font-medium">{{ visaDuration }}</span><br />
    Last Updated: <span class="font-medium">{{ timeOfData }}</span>
  </p>
  <p class="text-gray-600 dark:text-gray-400 mt-1" v-else>
    No visa information available for your passport.
  </p>
</div>

    <div class="p-4 bg-white dark:bg-gray-700 rounded shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">7-Day Weather Forecast</h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        <div v-for="(temp, day) in sevenDayWeather.temps" :key="day" class="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ day }}</p>
          <p class="text-lg font-semibold text-blue-600 dark:text-blue-400">{{ temp }}&deg;C</p>
        </div>
      </div>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Average temperature: <span class="font-semibold">{{ averageTemp }}&deg;C</span>
      </p>
    </div>

    <div class="p-4 bg-white dark:bg-gray-700 rounded shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Destination Map</h2>
      <div id="map" class="w-full h-64 bg-gray-300 dark:bg-gray-600"></div>
    </div>
  </div>
</template>