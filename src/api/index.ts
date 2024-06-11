import { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { apiAgent } from './axiosConfig'

export const getApi = async <T = any>(path: string, config?: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse<T>) => {
    return response.data
  }

  const onError = (error: any) => {
    console.error('Get Request Failed:', error)

    return Promise.reject(error.response || error.message)
  }

  try {
    const response = await apiAgent.get(path, config)
    return onSuccess(response)
  } catch (error) {
    return onError(error)
  }
}
