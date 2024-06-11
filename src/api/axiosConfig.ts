import axios from 'axios'

export const baseURL = 'https://api.open-meteo.com/v1/'

export const apiAgent = axios.create({ baseURL })
apiAgent.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiAgent.interceptors.response.use(
  (config) => config,
  (error) => {
    return Promise.reject(error)
  }
)
