import axios, { AxiosRequestConfig } from 'axios'
import { getCookie } from 'cookies-next'

axios.interceptors.request.use(
  async (config) => {
    const accessToken = getCookie('token')

    if (accessToken) {
      if (config.headers) config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  async (response) => {
    return response
  },
  (error) => {
    console.error('Error', error)
    return Promise.reject(error)
  }
)

const axiosInstance = async <T = unknown>(config: AxiosRequestConfig<T>) => {
  try {
    const response = await axios(config)
    if (response?.data) {
      return response.data
    }
  } catch (error: any) {
    if (error.responseMessage) {
      throw Error('Try', error.responseMessage)
    }
  }
}

export default axiosInstance
