<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { costOfLiving, countriesCoordinates } from './data/data';
// import type { TripReport } from '@/types/index';
import { getVisaRequirements, getWeather } from './service/apiService';

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
});
</script>

<template>
  <div class="p-8 space-y-6 bg-gray-100 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-gray-800">Trip Report</h1>

    <div class="space-y-2">
      <p class="text-lg font-medium">Destination: <span class="font-semibold">{{ countryName }} ({{ countryCode }})</span></p>
      <p class="text-gray-600">{{ info }}</p>
    </div>

    <div class="space-y-1">
      <p>Your maximum budget: <span class="font-semibold">{{ maxBudget }} {{ currentCurr }}</span></p>
      <p>Converted budget: <span class="font-semibold">{{ newMaxBudget }} {{ destinationCurr }}</span></p>
      <p>
        Budget per person: <span class="font-semibold">{{ (newMaxBudget / travelers).toFixed(2) }} {{ destinationCurr }}</span>
      </p>
      <p>
        Average daily cost of living in {{ countryName }}: <span class="font-semibold">{{ dailyCost }} {{ destinationCurr }}</span>
      </p>
    </div>

    <div class="space-y-1">
      <p>Travel dates: <span class="font-semibold">{{ start }} to {{ end }}</span></p>
      <p>Passport: <span class="font-semibold">{{ passport }}</span></p>
      <p>Visa type required: <span class="font-semibold">{{ typeOfVisa }}</span></p>
      <p>Visa duration: <span class="font-semibold">{{ visaDuration }}</span></p>
      <p>Data last updated: <span class="font-semibold">{{ timeOfData }}</span></p>
    </div>

    <div>
      <h2 class="text-xl font-semibold">7-Day Weather Forecast</h2>
      <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div v-for="(temp, day) in sevenDayWeather.temps" :key="day" class="p-4 bg-white rounded shadow">
          <p class="text-sm font-medium text-gray-700">{{ day }}:</p>
          <p class="text-lg font-semibold text-blue-600">{{ temp }}&deg;C</p>
        </div>
      </div>
      <p class="mt-2 text-sm text-gray-600">Time relative to GMT: <span class="font-semibold">{{ sevenDayWeather.time }}</span></p>
      <p class="text-sm">Average temperature during your visit: <span class="font-semibold">{{ averageTemp }}&deg;C</span></p>
    </div>
  </div>
</template>