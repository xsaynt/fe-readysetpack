<template>
  <div>
    <h1 class="text-center">Report</h1>

    <h2><strong>Visa Requirements</strong></h2>

    <!-- If there is a failure to retrieve info -->
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>

    <!-- Display info if no error -->
    <div v-else>
      <!-- Check if visaReq is loaded before accessing properties -->
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
      <p v-if="numOfPeople">
        Number of travelers: {{ numOfPeople }}
      </p>
      <p v-if="maxBudget">
        Considering a budget of: <strong>{{ maxBudget}} {{ convertT }}(s) </strong> your daily expenditure per person will be roughly
      </p>

      <br />
      <br />
      <h2><strong>Weather/Temperature</strong></h2>
      <p v-if="maxBudget">
        Considering a budget of: <strong>{{ maxBudget}} {{ convertT }}(s) </strong> your daily expenditure per person will be roughly
      </p>

      <!-- Loading message while data is being fetched -->
      <p v-else>Loading information...</p>
    </div>

    <br />
    <br />
    <br />
  </div>
</template>

<script lang="ts">
import { getVisaRequirements } from "../../service/apiService";
import type { AxiosResponse } from "axios";
import { countries, currencies } from "../data/data";

interface VisaReq {
  passport: {
    name: string;
    code: string;
  },
  destination: {
    name: string;
    code: string;
  },
  category: {
    name: string;
    code: string;
  },
  dur: string,
  last_updated: string

}

const visaReq: VisaReq = {
  passport: {
    name: '',
    code: ''
  },
  destination: {
    name: '',
    code: ''
  },
  category: {
    name: '',
    code: ''
  },
  dur: '',
  last_updated: ''

};
export default {
  data() {
    return {
      countries: countries,
      currencies: currencies,
      visaReq: visaReq,
      departing: "",
      errorMessage: "",
      convertF: "",
      convertT: "",
      numOfPeople: "",
      maxBudget: "",
      
    };
  },

  created() {
    // Fetch the selected values from the query params
    const { departingFrom, currentPassport, arrivingAt, convertFrom, convertTo, numberOfTravelers, budget } = this.$route.query;
    console.log(departingFrom, currentPassport, arrivingAt);

    // Validate the form fields
    if (!departingFrom || !currentPassport || !arrivingAt || !convertFrom || !convertTo || !numberOfTravelers || !budget) {
      this.errorMessage = "Please fill out all fields before proceeding.";
    } else {
      // Call the fetchReq method using these values

      this.departing = String(departingFrom);
      this.convertF = String(convertFrom);
    this.convertT = String(convertTo);
    this.numOfPeople = String(numberOfTravelers);
    this.maxBudget = String(budget);
      this.fetchReq(
        this.countries[currentPassport as keyof typeof this.countries],
        this.countries[arrivingAt as keyof typeof this.countries]
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
        this.visaReq = response.data; // Access the data from the Axios response
        if (this.visaReq.dur === null) {
          this.visaReq.dur = "Flexible";
        }
      } catch (error) {
        console.error(error);
      }
    },
    // validateAndFetch() {
    //   const { departingFrom, currentPassport, arrivingAt, convertFrom, convertTo, numberOfTravelers, budget } = this.$route.query;
    //   if (!departingFrom || !currentPassport || !arrivingAt || !convertFrom || !convertTo || !numberOfTravelers || !budget) {
    //     this.errorMessage = "Please fill out all fields before proceeding.";
    //   } else {
    //     this.errorMessage = ""; // Clear any previous error message
    //     this.fetchReq(
    //       this.countries[String(currentPassport)],
    //       this.countries[String(arrivingAt)]
    //     );
    //   }
    // },
  },
};
</script>
