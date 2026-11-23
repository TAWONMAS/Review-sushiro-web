import { defineBoot } from '#q-app'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth-store'

const api = axios.create({
  baseURL: import.meta.env.QCLI_API_URL || 'http://localhost:3000',
  timeout: 10000,
})

// const api = axios.create({
//   baseURL: import.meta.env.QCLI_API_URL || 'https://6b013dea1c637a569e52e76c.mockapi.io/api',
//   timeout: 10000,
// })

api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    config.headers['Content-type'] = 'application/json; charset=UTF-8'
    if (authStore.accessToken) {
      config.headers['Authorization'] = `Bearer ${authStore.accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { axios, api }
