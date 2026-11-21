import { api } from '@/boot/axios'

export const login = async (username, password) => {
  const response = await api.get('/users', {
    params: { username },
  })

  const matchedUser = response.data.find(
    (u) => u.username === username && String(u.password) === String(password),
  )

  if (!matchedUser) {
    const err = new Error('Invalid username or password')
    err.response = { data: { message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' } }
    throw err
  }

  return {
    data: {
      data: {
        accessToken: `token-${matchedUser.id}-${Date.now()}`,
        user: matchedUser,
      },
    },
  }
}

export const getProfile = async () => {
  return true
}
