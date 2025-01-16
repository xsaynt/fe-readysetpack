import axios from 'axios';
import type { AxiosResponse } from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'https://rough-sun-2523.fly.dev/', // Replace with your API's base URL
});

export function getVisaRequirements(passportCountry: string, destinationCountry: string): Promise<AxiosResponse<unknown>> {
  return apiClient.get(`/visa/${passportCountry}/${destinationCountry}`);
}

export function getVisaStats(passportCountry: string): Promise<AxiosResponse<unknown>> {
  return apiClient.get(`/country/${passportCountry}`);
}



