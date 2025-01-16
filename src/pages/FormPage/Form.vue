<template>
   <h1><strong>Form page</strong></h1>
  <div class="text-center align-items:center">
    <div class="flex-1">
              <label for="departDate" class="block text-gray-700 dark:text-gray-300 mb-1">Departure Date</label>
              <input
                id="departDate"
                v-model="departDate"
                type="date"
                class="w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
            </div>
            <div class="flex-1">
              <label for="returnDate" class="block text-gray-700 dark:text-gray-300 mb-1">Return Date</label>
              <input
                id="returnDate"
                v-model="returnDate"
                type="date"
                class="w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
            </div>
    <!--VISA INFO-->
    <p class="mt-[10px]">Departing from: {{ departingFrom }}</p>
    <select v-model="departingFrom" class="border border-gray-500">
      <option
        v-for="(code, country) in countries"
        :key="country"
        :value="country"
      >
        {{ country }}
      </option>
    </select>

    <p class="mt-[10px]">Destination: {{ arrivingAt }}</p>
    <select v-model="arrivingAt" class="border border-gray-500">
      <option
        v-for="[country, code] in filteredCountries"
        :key="code"
        :value="country"
      >
        {{ country }}
      </option>
    </select>

    <p class="mt-[10px]">Current Passport: {{ currentPassport }}</p>
    <select v-model="currentPassport" class="border border-gray-500 w-[260px]">
      <option v-for="(code, country) in countries" :key="code" :value="country">
        {{ country }} ({{ code }})
      </option>
    </select>
    <!--CURRENCY CONVERTER AND BUDGET INFO-->
    <p class="mt-[10px]">Number of Travelers:</p>
    <input v-model="numberOfTravelers"
      type="number"
      class="border border-gray-500 text-center w-[100px]"
      min="1"
      />
    <br />
    <p class="mt-[10px]">Budget</p>
    <input v-model="budget"
      type="number"
      class="border border-gray-500 text-center w-[100px]"
      min="1"
    />
    <div class="space-x-10 mt-[10px]">
      <span>Converting From</span>
      <span>Converting To</span>
    </div>

    <select v-model="convertFrom" class="border border-gray-500 w-[130px]">
      <option
        v-for="(code, country) in currencies"
        :key="code"
        :value="country"
      >
        {{ country }} ({{ code }})
      </option>
    </select>
    <select
      v-model="convertTo"
      class="border border-gray-500 w-[130px] ml-[10px]"
    >
      <option
        v-for="[country, code] in filteredCurrencies"
        :key="code"
        :value="country"
      >
        {{ country }} ({{ code }})
      </option>
    </select>
    <br />
    <button
      :disabled="!departingFrom || !currentPassport || !arrivingAt || !convertFrom || !convertTo || !budget || !numberOfTravelers"
      @click="submitForm"
      class="border border-gray-500 bg-gray-500 mt-[10px]"
    >
      Submit
    </button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { countries, currencies } from "../data/data";
export default {
  data() {
    return {
      departDate:null,
      returnDate: null,
      countries: countries,
      currencies: currencies,
      departingFrom: null,
      arrivingAt: null,
      currentPassport: null,
      convertFrom: null,
      convertTo: null,
      numberOfTravelers: null,
      budget: null
    };
  },
  computed: {
    filteredCountries() {
      // Filter countries for the arrivingAt selection
      return Object.entries(this.countries).filter(
        ([country]) => country !== this.departingFrom
      );
    },
    filteredCurrencies() {
      // Filter currencies for the converting to box
      return Object.entries(this.currencies).filter(
        ([currency]) => currency !== this.convertFrom // ensure to filter by currcode
      );
    },
  },
  created() {
    // Ensure the form values are reset when the component is created
    this.resetForm();
  },
  beforeRouteEnter(to, from, next) {
    // Reset form when navigating to this page
    next((vm) => vm.resetForm());
  },
  methods: {
    resetForm() {
      this.departingFrom = null;
      this.arrivingAt = null;
      this.currentPassport = null;
      this.convertFrom = null;
      this.convertTo = null;
      this.numberOfTravelers = null,
      this.budget = null
      this.departDate = null,
      this.departDate = null
    },

    submitForm() {
      this.$router.push({
        name: "report",
        query: {
          departingFrom: this.departingFrom,
          currentPassport: this.currentPassport,
          arrivingAt: this.arrivingAt,
          convertFrom: this.convertFrom,
          convertTo: this.convertTo,
          numberOfTravelers: this.numberOfTravelers,
          budget: this.budget
        },
      });
    },
  },
};
</script>
