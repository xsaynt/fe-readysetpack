import type { Ref } from 'vue'

export interface DarkModeContext {
  isDark: Ref<boolean>
  toggleDark: () => void
}

export interface TripReport {
  destination: string
  visaRequirements: string
  weather: string
  events: string[]
  landmarks: string[]
}

export interface TripState {
  newTrip: {
    id: string
    destination: string
    departDate: string
    returnDate: string
    passportOrigin: string
    budget: number
    destinationCurrency: string
    currentCurrency: string
    amountOfTravellers: number
  }
}
