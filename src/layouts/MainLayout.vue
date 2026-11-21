<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header class="bg-white text-dark">
      <q-toolbar class="q-px-lg" style="min-height: 80px; border-bottom: 1px solid #eee">
        <q-avatar>
          <img
            src="https://food-and-life.co.jp/wp-content/uploads/2026/04/NEW-SUSHIRO_RGB-01.png"
          />
        </q-avatar>
        <div class="row items-center q-gutter-sm">
          <div>
            <div
              style="
                padding-left: 20px;
                color: #b5121b;
                font-size: 22px;
                font-weight: 900;
                letter-spacing: 1px;
              "
            >
              SUSHIRO
            </div>
            <div style="padding-left: 20px; color: #777; font-size: 9px">REVIEW COMMUNITY</div>
          </div>
        </div>

        <q-space />
        <div class="row items-center gt-sm">
          <q-btn flat no-caps label="REVIEWS" to="/reviews" />
          <q-btn flat no-caps label="SUSHI MENU" to="/menu" />
          <q-btn flat no-caps label="ABOUT US" to="/about" />
        </div>
        <q-btn flat round dense icon="menu" class="lt-md">
          <q-menu auto-close anchor="bottom right" self="top right">
            <q-list style="min-width: 180px">
              <q-item clickable to="/reviews">
                <q-item-section>REVIEWS</q-item-section>
              </q-item>
              <q-item clickable to="/menu">
                <q-item-section>SUSHI MENU</q-item-section>
              </q-item>
              <q-item clickable to="/about">
                <q-item-section>ABOUT US</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-space />

        <q-btn
          v-if="!authStore.isAuthenticated"
          unelevated
          rounded
          color="negative"
          label="LOGIN"
          no-caps
          to="/login"
        />
        <q-btn
          v-else
          unelevated
          rounded
          outline
          color="negative"
          label="LOGOUT"
          no-caps
          @click="confirmLogout = true"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <footer class="full-width bg-white q-py-xl q-px-lg" style="border-top: 1px solid #f0f0f0">
      <div class="q-mx-auto text-left" style="max-width: 1100px">
        <div class="row items-center q-gutter-md q-mb-lg">
          <div
            class="flex flex-center text-weight-bolder bg-white"
            style="
              width: 48px;
              height: 48px;
              border-radius: 50%;
              border: 5px solid #b71c1c;
              font-size: 1.05rem;
            "
          >
            スシロー
          </div>
          <span class="text-h5 text-weight-bolder" style="letter-spacing: 1px">SUSHIRO</span>
        </div>

        <h3 class="text-h6 text-weight-bold q-mt-none q-mb-sm">Sushiro GH (Thailand) Ltd.</h3>
        <p class="text-body1 text-grey-8 q-ma-none" style="line-height: 1.7">
          Sushiro Central Phuket (Floresta)<br />
          Vichitsongkram Road, Wichit,<br />
          Mueang Phuket, Phuket 83000
        </p>
      </div>
    </footer>
  </q-layout>

  <q-dialog v-model="confirmLogout" persistent>
    <q-card style="min-width: 300px">
      <q-card-section class="row items-center">
        <q-icon name="warning" color="orange" size="40px" class="q-mr-md" />
        <div>
          <div class="text-h6">Confirm</div>
          <div class="text-body2">Are you sure you want to logout?</div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cancel" color="grey" v-close-popup />
        <q-btn unelevated label="Logout" color="red" @click="onLogout" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'
import { ref } from 'vue'

const router = useRouter()
const authStore = useAuthStore()
const confirmLogout = ref(false)

const onLogout = () => {
  authStore.logout()
  router.push('/menu')
  confirmLogout.value = false
}
</script>
