<template>
  <q-page class="bg-grey-1">
    <div class="q-px-md q-py-xl" style="max-width: 1200px; margin: 0 auto">
      <div class="row items-center justify-between q-mb-lg">
        <div class="col-12 col-sm-auto">
          <div class="text-overline text-negative text-weight-bold" style="letter-spacing: 2px">
            SUSHIRO REVIEW COMMUNITY
          </div>
          <div class="text-h4 text-weight-bold text-dark">Sushi Reviews</div>
        </div>

        <div class="col-auto q-mt-md q-mt-sm-none row items-center q-gutter-sm">
          <q-badge color="negative" class="q-pa-sm" style="font-size: 13px">
            {{ filteredReviews.length }} REVIEWS
          </q-badge>
          <q-btn
            v-if="authStore.isAuthenticated"
            color="negative"
            unelevated
            no-caps
            icon="add"
            label="Write a Review"
            @click="openCreateDialog"
          />
          <q-btn v-else outline color="negative" no-caps label="Login to Review" to="/login" />
        </div>
      </div>

      <div class="q-mb-md">
        <q-input
          v-model="searchText"
          outlined
          rounded
          dense
          clearable
          bg-color="white"
          placeholder="Search your favorite sushi..."
        >
          <template v-slot:prepend>
            <q-icon name="search" color="negative" />
          </template>
        </q-input>
      </div>

      <div class="row items-center q-gutter-sm q-mb-lg">
        <q-chip
          v-for="category in categories"
          :key="category.name"
          clickable
          :outline="selectedCategory !== category.name"
          :color="selectedCategory === category.name ? category.color : 'grey-7'"
          :text-color="selectedCategory === category.name ? 'white' : 'grey-8'"
          @click="selectedCategory = category.name"
        >
          {{ category.name }}
        </q-chip>
      </div>

      <div v-if="loading" class="flex flex-center q-pa-xl">
        <q-spinner-hearts color="negative" size="90px" />
      </div>

      <q-banner v-else-if="errorMessage" class="bg-red-1 text-negative q-mb-md" rounded>
        {{ errorMessage }}
        <template v-slot:action>
          <q-btn flat color="negative" label="Retry" @click="fetchReviews" />
        </template>
      </q-banner>

      <div v-else-if="filteredReviews.length > 0" class="row q-col-gutter-md">
        <div v-for="review in filteredReviews" :key="review.id" class="col-12 col-sm-6">
          <q-card flat bordered class="bg-white full-height">
            <q-card-section class="q-pa-md">
              <div class="row items-center justify-between q-mb-sm">
                <div class="row items-center q-gutter-xs">
                  <q-badge color="blue-6">ID: {{ review.id }}</q-badge>
                  <q-badge color="purple-6">User: {{ review.user }}</q-badge>
                </div>
                <div class="row items-center q-gutter-xs">
                  <q-btn
                    v-if="canEdit(review)"
                    flat
                    round
                    dense
                    color="negative"
                    icon="edit"
                    aria-label="Edit review"
                    @click="openEditDialog(review)"
                  >
                    <q-tooltip>Edit review</q-tooltip>
                  </q-btn>

                  <q-btn
                    v-if="isAdmin"
                    flat
                    round
                    dense
                    color="negative"
                    icon="delete"
                    aria-label="Delete review"
                    @click="confirmDeleteReview(review)"
                  >
                    <q-tooltip>Delete review (Admin)</q-tooltip>
                  </q-btn>
                </div>
              </div>

              <div class="row no-wrap items-start q-gutter-md">
                <q-img
                  :src="review.image || fallbackImage"
                  :alt="review.name"
                  fit="cover"
                  style="width: 110px; min-width: 110px; height: 110px; border-radius: 8px"
                />

                <div class="col">
                  <div class="text-subtitle1 text-weight-bold text-dark" style="line-height: 1.3">
                    {{ review.name }}
                  </div>
                  <div class="row items-center q-mt-xs q-mb-sm">
                    <q-icon name="star" color="amber-8" size="18px" />
                    <span class="text-weight-bold q-ml-xs">{{ review.rating }}</span>
                    <span class="text-grey-6 q-ml-xs text-caption">/ 5</span>
                  </div>
                  <div class="text-body2 text-grey-7">{{ review.description }}</div>
                  <div class="q-mt-sm">
                    <q-badge color="grey-2" text-color="grey-8">{{ review.category }}</q-badge>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div v-else>
        <q-card flat bordered class="bg-white text-center q-pa-xl">
          <q-icon name="rate_review" size="40px" color="grey-5" />
          <div class="text-h6 text-grey-6 q-mt-md">No reviews found.</div>
          <div class="text-grey-6 q-mt-sm">Try another search or category.</div>
        </q-card>
      </div>

      <div class="text-center q-mt-xl text-grey-6">
        <q-icon name="restaurant" size="20px" />
        <div class="text-caption q-mt-sm">SUSHIRO REVIEW - Share Your Favorite Sushi</div>
      </div>
    </div>

    <q-dialog v-model="dialogOpen" persistent>
      <q-card style="width: 100%; max-width: 520px">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ isEditing ? 'Edit Review' : 'Write a Review' }}</div>
          <q-space />
          <q-btn flat round dense icon="close" v-close-popup />
        </q-card-section>

        <q-form @submit="saveReview">
          <q-card-section class="q-gutter-md">
            <q-input
              v-model="form.name"
              label="Sushi name"
              outlined
              dense
              :rules="[(value) => !!value || 'Please enter sushi name']"
            />

            <q-select
              v-model="form.category"
              :options="categoryOptions"
              label="Plate color"
              outlined
              dense
              emit-value
              map-options
              :rules="[(value) => !!value || 'Please select plate color']"
            />

            <div>
              <div class="text-body2 q-mb-xs">Rating</div>
              <q-rating v-model="form.rating" size="28px" color="amber-8" />
              <span class="q-ml-sm text-caption">{{ form.rating }} / 5</span>
            </div>

            <q-input
              v-model="form.description"
              label="Your review"
              type="textarea"
              outlined
              autogrow
              :rules="[(value) => !!value || 'Please write a review']"
            />

            <q-input v-model="form.image" label="Image URL (optional)" outlined dense />
          </q-card-section>

          <q-card-actions align="right" class="q-pa-md">
            <q-btn flat label="Cancel" color="grey-7" v-close-popup />
            <q-btn
              color="negative"
              unelevated
              label="Save Review"
              type="submit"
              :loading="saving"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from '@/boot/axios'
import { useAuthStore } from '@/stores/auth-store'

const $q = useQuasar()
const authStore = useAuthStore()
const reviews = ref([])
const loading = ref(false)
const saving = ref(false)
const errorMessage = ref('')
const searchText = ref('')
const selectedCategory = ref('ทั้งหมด')
const dialogOpen = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const fallbackImage =
  'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80'

const categories = [
  { name: 'ทั้งหมด', color: 'negative' },
  { name: 'จานสีแดง', color: 'red-7' },
  { name: 'จานสีเงิน', color: 'grey-6' },
  { name: 'จานสีทอง', color: 'amber-8' },
  { name: 'จานสีดำ', color: 'dark' },
]

const categoryOptions = categories.slice(1).map((category) => ({
  label: category.name,
  value: category.name,
}))

const emptyForm = () => ({
  name: '',
  rating: 5,
  category: 'จานสีแดง',
  description: '',
  image: '',
})
const form = ref(emptyForm())

const currentUsername = computed(() => authStore.user?.username || authStore.user?.user || '')

const isAdmin = computed(() => String(authStore.role || '').toLowerCase() === 'admin')

const canEdit = (review) => {
  if (!authStore.isAuthenticated) return false
  if (isAdmin.value) return true

  return (
    currentUsername.value &&
    String(review.user || '').toLowerCase() === String(currentUsername.value).toLowerCase()
  )
}

const fetchReviews = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const response = await api.get('/reviews')
    reviews.value = Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error('Failed to fetch reviews:', error)
    errorMessage.value = 'ไม่สามารถโหลดข้อมูลรีวิวจาก API ได้ กรุณาลองใหม่อีกครั้ง'
  } finally {
    loading.value = false
  }
}

const openCreateDialog = () => {
  isEditing.value = false
  editingId.value = null
  form.value = emptyForm()
  dialogOpen.value = true
}

const openEditDialog = (review) => {
  isEditing.value = true
  editingId.value = review.id
  form.value = {
    name: review.name || '',
    rating: Number(review.rating) || 5,
    category: review.category || 'จานสีแดง',
    description: review.description || '',
    image: review.image || '',
  }
  dialogOpen.value = true
}

const saveReview = async () => {
  if (!authStore.isAuthenticated || !currentUsername.value) {
    $q.notify({ type: 'warning', message: 'กรุณาเข้าสู่ระบบก่อนเขียนรีวิว' })
    return
  }

  const oldReview = isEditing.value
    ? reviews.value.find((review) => String(review.id) === String(editingId.value))
    : null

  if (isEditing.value && (!oldReview || !canEdit(oldReview))) {
    $q.notify({ type: 'warning', message: 'คุณไม่มีสิทธิ์แก้ไขรีวิวนี้' })
    return
  }

  saving.value = true
  const reviewData = {
    user: oldReview ? oldReview.user : currentUsername.value,
    name: form.value.name,
    rating: Number(form.value.rating),
    category: form.value.category,
    description: form.value.description,
    image: form.value.image || fallbackImage,
  }

  try {
    if (isEditing.value) {
      await api.put(`/reviews/${editingId.value}`, reviewData)
      $q.notify({ type: 'positive', message: 'แก้ไขรีวิวเรียบร้อยแล้ว' })
    } else {
      await api.post('/reviews', reviewData)
      $q.notify({ type: 'positive', message: 'เพิ่มรีวิวเรียบร้อยแล้ว' })
    }

    dialogOpen.value = false
    form.value = emptyForm()
    await fetchReviews()
  } catch (error) {
    console.error('Save review failed:', error)
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || error.message || 'ไม่สามารถบันทึกรีวิวได้',
    })
  } finally {
    saving.value = false
  }
}

const confirmDeleteReview = (review) => {
  if (!authStore.isAuthenticated || !isAdmin.value) {
    $q.notify({ type: 'warning', message: 'เฉพาะ Admin เท่านั้นที่ลบรีวิวได้' })
    return
  }

  $q.dialog({
    title: 'ยืนยันการลบรีวิว',
    message: `ต้องการลบรีวิว "${review.name}" ใช่หรือไม่?`,
    cancel: { label: 'ยกเลิก', flat: true },
    ok: { label: 'ลบรีวิว', color: 'negative' },
    persistent: true,
  }).onOk(async () => {
    try {
      await api.delete(`/reviews/${review.id}`)
      $q.notify({ type: 'positive', message: 'ลบรีวิวเรียบร้อยแล้ว' })
      await fetchReviews()
    } catch (error) {
      console.error('Delete review failed:', error)
      $q.notify({
        type: 'negative',
        message: error.response?.data?.message || 'ไม่สามารถลบรีวิวได้',
      })
    }
  })
}

onMounted(fetchReviews)

const filteredReviews = computed(() => {
  return reviews.value.filter((review) => {
    const search = (searchText.value || '').toLowerCase()
    const name = (review.name || '').toLowerCase()
    const description = (review.description || '').toLowerCase()
    const matchSearch = name.includes(search) || description.includes(search)
    const matchCategory =
      selectedCategory.value === 'ทั้งหมด' || review.category === selectedCategory.value
    return matchSearch && matchCategory
  })
})
</script>
