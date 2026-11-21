import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { login as loginService } from '@/services/auth.service'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref(null)
    const accessToken = ref(null)
    const loading = ref(false)
    const errorMessage = ref('')

    const isAuthenticated = computed(() => accessToken.value !== null)

    const role = computed(() => user.value?.role ?? null)

    const login = async (username, password) => {
      loading.value = true
      errorMessage.value = ''
      try {
        const response = await loginService(username, password)
        accessToken.value = response.data.data.accessToken
        user.value = response.data.data.user
        return response
      } catch (error) {
        errorMessage.value = error.response?.data?.message ?? 'Unable to login.'
        throw error
      } finally {
        loading.value = false
      }
    }

    const logout = () => {
      accessToken.value = null
      user.value = null
      errorMessage.value = ''
      loading.value = false
    }

    const checkAuth = async () => {
      if (!accessToken.value || !user.value) {
        logout()
        return false
      }
      return true
    }

    return {
      user,
      accessToken,
      loading,
      errorMessage,
      login,
      logout,
      isAuthenticated,
      role,
      checkAuth,
    }
  },
  { persist: true },
)
