<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { costOfLiving, countriesCoordinates } from './data/data'
import type { TripReport } from '@/types/index'
import { getVisaRequirements, getWeather } from './service/apiService'

const route = useRoute() // Use `useRoute` to get the route params
// const tripReport = ref<TripReport | null>(null);
let countryName = ref('')
let countryCode = ref('')
let start = ref('')
let end = ref('')
let passport = ref('')
let maxBudget = ref('')
let newMaxBudget = ref('')
let currentCurr = ref('')
let destinationCurr = ref('')
let travelers = ref('')
let info = ref('')
let visaReq = ref({})
let typeOfVisa = ref('')
let visaDuration = ref('')
let timeOfData = ref('')
let monthlyCosts = ref(costOfLiving)
let dailyCost = ref('')
let sevenDayWeather = ref({})
let averageTemp = ref('')
onMounted(async () => {
  // Access route params
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
  } = route.query

  countryName.value = destinationFullName
  countryCode.value = destinationCode
  start.value = start_date
  end.value = end_date
  passport.value = passport_issued_country
  maxBudget.value = budget
  newMaxBudget.value = convertedBudget
  currentCurr.value = currCurrency
  destinationCurr.value = destCurrency
  travelers.value = people_count
  info.value = country_info

  dailyCost.value = (costOfLiving[countryName.value] / 28).toFixed(2)

  visaReq.value = await getVisaRequirements(passport.value, countryCode.value)

  const weatherResponse = await getWeather(
    String(countriesCoordinates[countryName.value][0]),
    String(countriesCoordinates[countryName.value][1]),
  )
  console.log('here is the weather', weatherResponse)
  const maxTemps = weatherResponse.data.daily.temperature_2m_max
  const minTemps = weatherResponse.data.daily.temperature_2m_min
  const days = weatherResponse.data.daily.time
  const dayTemp = {}
  const relativeToGMT = weatherResponse.data.timezone_abbreviation

  for (let i = 0; i < 7; i++) {
    const dailyAverageTemp = parseFloat(((maxTemps[i] + minTemps[i]) / 2).toFixed(2))
    dayTemp[days[i]] = dailyAverageTemp
  }
  console.log(dayTemp)

  sevenDayWeather.value = { temps: dayTemp, time: relativeToGMT }
  const arrOfTemp = Object.values(sevenDayWeather.value.temps)
  let total = 0
  for (const value of arrOfTemp) {
    total += Number(value)
  }
  averageTemp.value = String((total / 7).toFixed(2))

  typeOfVisa.value = visaReq.value.data.category.name
  visaDuration = visaReq.value.data.dur
  console.log(visaReq)
  timeOfData.value = visaReq.value.data.last_updated.split('T')[0]
  if (visaDuration === null) {
    visaDuration = 'Flexible'
  }
})
</script>

<template>
  <div>
    <p>The destination your are going to is {{ countryName }} ({{ countryCode }})</p>
    <br />
    <p>{{ info }}</p>
    <br />
    <p>Your maximum budget is: {{ maxBudget }} {{ currentCurr }}</p>
    <p>This translates to: {{ newMaxBudget }} {{ destinationCurr }}</p>
    <p>
      For {{ travelers }} people this will be {{ (newMaxBudget / travelers).toFixed(2) }}
      {{ countryCode }} each
    </p>
    <p>
      It is important to note that the average daily cost of living in (the) {{ countryName }} is:
      {{ dailyCost }} {{ destinationCurr }}
    </p>
    <p></p>
    <br />
    <p>You are going from: {{ start }} {{ end }} on a {{ passport }} passport</p>
    <p>For this journey you will require a(n) {{ typeOfVisa }}</p>
    <p>The visa duration is: {{ visaDuration }}</p>
    <p>All Information is relevant as of {{ timeOfData }}</p>
    <br />
    <p>Here is the seven day forecast for the {{ countryCode }}</p>
    <div v-for="(temp, day) in sevenDayWeather.temps" :key="day">
      <p>{{ day }}: {{ temp }}°C</p>
    </div>

    <p>
      Time relative to GMT:
      {{ sevenDayWeather.time }}
    </p>

    <p>You may expect the average temperature at the time of your visit to be: {{ averageTemp }} °C </p>
  </div>
</template>
