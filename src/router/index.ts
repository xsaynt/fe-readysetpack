import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import CurrentTripsPage from '@/pages/CurrentTripsPage.vue'
import NewTripPage from '@/pages/NewTripPage.vue'
import TripHistoryPage from '@/pages/TripHistoryPage.vue'
import TripReportPage from '@/pages/TripReportPage.vue'
import TripChecklistPage from '../pages/TripChecklistPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/current-trips',
      name: 'currentTrips',
      component: CurrentTripsPage,
    },
    {
      path: '/new-trip',
      name: 'newTrip',
      component: NewTripPage,
    },
    {
      path: '/trip-history',
      name: 'tripHistory',
      component: TripHistoryPage,
    },
    {
      path: '/trip-report/:trip_id',
      name: 'tripReport',
      props: true,
      component: TripReportPage,
    },
    {
      path: '/trip-checklist/:id',
      name: 'tripChecklist',
      component: TripChecklistPage,
    },
  ],
})

export default router
