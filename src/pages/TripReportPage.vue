<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { TripReport } from '@/types/index'

const route = useRoute();
const tripId = route.params.id;
const tripReport = ref<TripReport | null>(null);
const router = useRouter()
const tripDetails = router.options.history.state

console.log(tripDetails)

onMounted(() => {
  tripReport.value = {
    destination: 'Paris, France',
    visaRequirements: 'No visa required for stays up to 90 days.',
    weather: '10°C to 15°C, mostly sunny',
    events: ['Paris Fashion Week', 'Louvre Exhibition'],
    landmarks: ['Eiffel Tower', 'Notre Dame Cathedral'],
  };
});
</script>

<template>
  <div>
    <h1>Trip Report: {{ tripReport?.destination }}</h1>
    <p><strong>Trip ID:</strong> {{ tripId }}</p>
    <p><strong>Visa Requirements:</strong> {{ tripReport?.visaRequirements }}</p>
  </div>
</template>