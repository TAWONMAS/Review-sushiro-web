<template>
  <q-page class="flex flex-center bg-grey-2 q-pa-md">
    <q-card class="q-pa-lg shadow-5" style="width: 100%; max-width: 400px; border-radius: 12px">
      <div v-if="authStore.loading" class="q-mt-md flex flex-center">
        <q-spinner-hearts color="negative" size="90px" />
      </div>
      <div v-else>
        <q-card-section class="text-center q-pb-none">
          <q-avatar size="64px" class="q-mb-md">
            <img
              src="https://food-and-life.co.jp/wp-content/uploads/2026/04/NEW-SUSHIRO_RGB-01.png"
            />
          </q-avatar>
          <div class="text-h5 text-weight-bold text-grey-9">Welcome Back</div>
          <div class="text-caption text-grey-6 q-mt-xs">Please sign in to continue</div>
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-input
            v-model="username"
            label="Username"
            outlined
            dense
            lazy-rules
            :rules="[(val) => !!val || 'Please enter your username']"
            @keyup.enter="onLogin"
          >
            <template v-slot:prepend>
              <q-icon name="person" color="negative" />
            </template>
          </q-input>

          <q-input
            v-model="password"
            type="password"
            label="Password"
            outlined
            dense
            lazy-rules
            :rules="[(val) => !!val || 'Please enter your password']"
            @keyup.enter="onLogin"
          >
            <template v-slot:prepend>
              <q-icon name="lock" color="negative" />
            </template>
          </q-input>

          <div class="q-mt-lg">
            <q-btn
              type="submit"
              color="negative"
              label="Login"
              class="full-width text-weight-bold"
              size="lg"
              unelevated
              @click="onLogin"
              :loading="authStore.loading"
              :disable="!username || !password"
            />
          </div>
        </q-card-section>

        <q-banner v-if="authStore.errorMessage" class="bg-red-1 text-negative q-mb-md"
          >{{ authStore.errorMessage }}
        </q-banner>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'
import { useQuasar } from 'quasar'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()
const username = ref('')
const password = ref('')
const authStore = useAuthStore()
const roleName = {
  user: 'User',
  admin: 'Administrator',
}

const onLogin = async () => {
  try {
    await authStore.login(username.value, password.value)
    $q.notify({
      type: 'positive',
      icon: 'check_circle',
      message: `Welcome back, ${authStore.user.username}!`,
      caption: `Role: ${roleName[authStore.user.role] || authStore.user.role}`,
    })
    username.value = ''
    password.value = ''
    const redirectPath = route.query.redirect || '/reviews'
    router.push(redirectPath)
  } catch (error) {
    console.error(error)
  }
}
</script>
