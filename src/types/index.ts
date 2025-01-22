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

export interface Destination {
  city: string;
  country: string;
  currency: string;
}

export interface Weather {
  weather_type: string;
  temp: number;
}

export interface Budget {
  current_amount: number;
  current_currency: string;
  destination_amount: number;
  destination_currency: string;
}

export interface Trip {
  trip_id: number;
  destination: Destination;
  start_date: string;
  end_date: string;
  weather: Weather;
  budget: Budget;
  landmarks: {
    best_places_to_visit: string[];
  };
}
