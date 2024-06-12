import axios from 'axios'

export const baseURL = 'https://api.open-meteo.com/v1/'

export const apiAgent = axios.create({ baseURL })

apiAgent.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

apiAgent.interceptors.response.use(
  (config) => config,
  (error) => Promise.reject(error)
)
