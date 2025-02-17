import axios from 'axios'
import type { AxiosResponse } from 'axios'

const visaClient = axios.create({
  baseURL: 'https://rough-sun-2523.fly.dev/',
})

const weatherClient = axios.create({
  baseURL: 'https://api.open-meteo.com/v1/',
})

const backendClient = axios.create({
  baseURL: 'https://be-readysetpack-r6tz.onrender.com/api',
})

export function getVisaRequirements(
  passportCountry: string,
  destinationCountry: string,
): Promise<AxiosResponse<unknown>> {
  return visaClient.get(`visa/${passportCountry}/${destinationCountry}`)
}

export function getVisaStats(passportCountry: string): Promise<AxiosResponse<unknown>> {
  return visaClient.get(`country/${passportCountry}`)
}

export function getWeather(latitude: string, longitude: string): Promise<AxiosResponse<unknown>> {
  return weatherClient.get(
    `forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`,
  )
}

export function postTripInfo(tripData: object): Promise<AxiosResponse<unknown>> {
  return backendClient.post(`/trips/1`, tripData)
}

export function getTripInfo(): Promise<AxiosResponse<unknown>> {
  return backendClient.get('/trips/1')
}

export function getTripHistory(userId: number): Promise<AxiosResponse<unknown>> {
  return backendClient.get('/trips/1')
}

export function addChecklistItem({ task }: { task: string }): Promise<AxiosResponse<unknown>> {
  return backendClient.patch('/checklists/1/1', {
    task,
  })
}

export function deleteChecklistItem({ task }: { task: string }): Promise<AxiosResponse<unknown>> {
  return backendClient.patch('/checklists/1/1/delete-item', {
    task,
  })
}
