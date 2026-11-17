<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'
import { authService } from './services/authService'
import { isMockMode } from './services/api'

const router = useRouter()
const route = useRoute()

onMounted(async () => {
  const token = localStorage.getItem('tanggap_token')
  if (!token || isMockMode()) return

  try {
    const freshUser = await authService.me()
    if (freshUser && freshUser.role) {
      const raw = localStorage.getItem('tanggap_user')
      const current = raw ? JSON.parse(raw) : {}
      const oldRole = String(current.role || '').toLowerCase()
      const newRole = String(freshUser.role || '').toLowerCase()

      // Sinkronkan data user di localStorage dengan data valid paling segar dari server
      localStorage.setItem('tanggap_user', JSON.stringify({ ...current, ...freshUser }))
      window.dispatchEvent(new Event('storage'))

      // Jika role telah berubah menjadi Guru/Sekolah, dan user sedang di halaman dashboard siswa
      const isNowTeacher = newRole.includes('guru') || newRole.includes('teacher') || newRole.includes('sekolah')
      const wasStudent = !oldRole.includes('guru') && !oldRole.includes('admin')

      if (isNowTeacher && wasStudent && route.path === '/dashboard') {
        router.replace('/dashboard_guru')
      }
    }
  } catch {
    // Silent catch: jika offline / timeout, biarkan router navigation guard berjalan normal
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans overflow-x-clip">
    <RouterView />
  </div>
</template>
