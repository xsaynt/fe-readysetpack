<template>
  <div>
    <h1 class="text-center">Report</h1>

    <h2><strong>Visa Requirements</strong></h2>

    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>

    <div v-else>
      <p
        v-if="
          visaReq && visaReq.destination && visaReq.passport && visaReq.category
        "
      >
        <strong
          >To {{ visaReq.destination.name }} ({{ visaReq.destination.code }})
        </strong>
        from {{ departing }} on a(n)
        <strong
          >{{ visaReq.passport.name }} ({{ visaReq.passport.code }})
          passport</strong
        >
      </p>
      <p v-if="visaReq && visaReq.category">
        Visa type required: {{ visaReq.category.name }}
      </p>
      <p v-if="visaReq">
        Specified duration: {{ visaReq.dur || "Not specified" }}
      </p>
      <p v-if="visaReq && visaReq.last_updated">
        Information relevant as of: {{ visaReq.last_updated.split("T")[0] }}
      </p>

      <br />
      <br />
      <h2><strong>Currency Converter and Daily Cost Of Living</strong></h2>
      <p v-if="convertF && convertT">
        Converting from {{ convertF }} to {{ convertT }}
      </p>
      <p v-if="numOfPeople">Number of travelers: {{ numOfPeople }}</p>
      <p v-if="maxBudget">
        Considering a budget of:
        <strong>{{ maxBudget }} {{ convertT }}(s) </strong> your daily
        expenditure per person will be roughly
      </p>

      <br />
      <br />
      <h2><strong>Weather/Temperature</strong></h2>
      <p v-if="weatherInfo">
        Average forcast for the next 7 days
        <ul>
    <li v-for="([date, temp], index) in Object.entries(weatherInfo.temps)" :key="index">
      {{ date }}: {{ temp }}°C
    </li>
  </ul>
      </p>
      <p v-if="weatherInfo">
        Time relative to GMT:
        {{ weatherInfo.time }}
      </p>

      <p v-else>Loading information...</p>
    </div>

    <br />
    <br />
    <br />
  </div>
</template>

<script lang="ts">
import { getVisaRequirements, getWeather } from "../service/apiService";
import type { AxiosResponse } from "axios";
import { countries, currencies, countriesCoordinates } from "../data/data";

interface VisaReq {
  passport: {
    name: string;
    code: string;
  };
  destination: {
    name: string;
    code: string;
  };
  category: {
    name: string;
    code: string;
  };
  dur: string;
  last_updated: string;
}

const visaReq: VisaReq = {
  passport: {
    name: "",
    code: "",
  },
  destination: {
    name: "",
    code: "",
  },
  category: {
    name: "",
    code: "",
  },
  dur: "",
  last_updated: "",
};
export default {
  data() {
    return {
      countries: countries,
      coordinates: countriesCoordinates,
      currencies: currencies,
      visaReq: visaReq,
      departing: "",
      arriving: "",
      errorMessage: "",
      convertF: "",
      convertT: "",
      numOfPeople: "",
      maxBudget: "",
      weatherInfo: {temps:{}, time:""},
    };
  },

  created() {
    const {
      departingFrom,
      currentPassport,
      arrivingAt,
      convertFrom,
      convertTo,
      numberOfTravelers,
      budget,
    } = this.$route.query;
    console.log(departingFrom, currentPassport, arrivingAt);

    if (
      !departingFrom ||
      !currentPassport ||
      !arrivingAt ||
      !convertFrom ||
      !convertTo ||
      !numberOfTravelers ||
      !budget
    ) {
      this.errorMessage = "Please fill out all fields before proceeding.";
    } else {

      this.departing = String(departingFrom);
      this.convertF = String(convertFrom);
      this.convertT = String(convertTo);
      this.numOfPeople = String(numberOfTravelers);
      this.maxBudget = String(budget);
      this.arriving = String(arrivingAt);
      
      this.fetchReq(
        this.countries[currentPassport as keyof typeof this.countries],
        this.countries[arrivingAt as keyof typeof this.countries]
      );

      this.fetchWeather(
        String(this.coordinates[this.arriving][0]),
        String(this.coordinates[this.arriving][1])
      );
    }
  },

  methods: {
    async fetchReq(country1: string, country2: string) {
      try {
        const response: AxiosResponse = await getVisaRequirements(
          country1,
          country2
        );
        this.visaReq = response.data; 
        if (this.visaReq.dur === null) {
          this.visaReq.dur = "Flexible";
        }
      } catch (error) {
        console.error(error);
      }
    },

    async fetchWeather(lat: string, lon: string) {
      try {
        const response: AxiosResponse = await getWeather(lat, lon);
        const maxTemps: number[] = response.data.daily.temperature_2m_max;
        const minTemps: number[] = response.data.daily.temperature_2m_min;
        const days: string[] = response.data.daily.time;
        const dayTemp: { [key: string]: number } = {};
        const relativeToGMT: string = response.data.timezone_abbreviation


        for (let i = 0; i < 7; i++) {
          const dailyAverageTemp = parseFloat(
            ((maxTemps[i] + minTemps[i]) / 2).toFixed(2)
          );
          dayTemp[days[i]] = dailyAverageTemp;
        }
        console.log(dayTemp);

        this.weatherInfo = {temps: dayTemp, time: relativeToGMT};
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
