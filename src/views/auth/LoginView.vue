<template>
  <AuthLayout :reverse="false">
    <div class="mb-8 sm:mb-10 text-center">
      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C368D] mb-3 sm:mb-4 whitespace-nowrap tracking-tight">
        Selamat Datang Kembali
      </h1>
      <p class="text-gray-500 text-sm md:text-base text-center leading-relaxed">
        Silahkan masuk untuk melanjutkan perjalanan<br>
        belajar anak.
      </p>
    </div>

    <form @submit.prevent="handleLogin" class="space-y-5">
      <div v-if="errorMsg" class="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
        {{ errorMsg }}
      </div>
      <div>
        <input 
          type="email" 
          placeholder="Email" 
          v-model="email"
          class="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D] transition-colors"
          required
        >
      </div>

      <div>
        <div class="relative">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Password" 
            v-model="password"
            class="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D] transition-colors pr-12"
            required
          >
          <button 
            type="button" 
            @click="showPassword = !showPassword"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1C368D] transition-colors focus:outline-none"
          >
            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        <div class="mt-2 text-left">
          <router-link to="/forgot-password" class="text-gray-500 hover:text-[#1C368D] text-sm transition-colors">
            Lupa Password?
          </router-link>
        </div>
      </div>

      <button 
        type="submit" 
        :disabled="isSubmitting"
        class="w-full bg-[#20409A] hover:bg-[#1C368D] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] cursor-pointer"
      >
        <span v-if="isSubmitting">Memproses...</span>
        <span v-else>Masuk</span>
      </button>
    </form>

    <div class="text-center text-gray-400 my-6 text-sm">
      atau
    </div>

    <!-- Tombol Continue With Google (Dinonaktifkan Sementara dengan Popup Pemberitahuan) -->
    <button 
      type="button"
      @click="showGoogleFeatureNotice = true"
      class="w-full flex items-center justify-center px-4 py-3.5 border border-gray-200 shadow-xs rounded-full hover:bg-gray-50 transition-colors cursor-pointer active:scale-[0.99]"
      title="Masuk dengan Google (Segera Hadir)"
    >
      <svg class="w-5 h-5 mr-3" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" fill="#FFC107"/>
        <path d="m6.3 12.9 7.1 5.3C15.2 15.1 19.3 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.5 2 9.9 6.4 6.3 12.9z" fill="#FF3D00"/>
        <path d="M24 46c5.4 0 10.2-2 14.1-5.4l-7-5.8c-2.1 1.4-4.5 2.2-7.1 2.2-4.9 0-9.1-3.1-10.8-7.4l-7.3 5.6C9.7 41.8 16.4 46 24 46z" fill="#4CAF50"/>
        <path d="M44.5 20H24v8.5h11.8c-.8 2.2-2.1 4-3.9 5.3l7 5.8c4.1-3.8 6.6-9.5 6.6-15.1 0-1.3-.2-2.7-.5-4z" fill="#1976D2"/>
      </svg>
      <span class="text-gray-600 font-medium">Continue With Google</span>
    </button>

    <div class="mt-8 text-center text-sm">
      <span class="text-gray-500">Belum punya akun? </span>
      <router-link to="/register" class="text-[#20409A] font-semibold hover:underline">
        Daftar Sekarang
      </router-link>
    </div>

    <!-- Modal Popup: Fitur Google Belum Tersedia -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showGoogleFeatureNotice"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs select-none"
        @click.self="showGoogleFeatureNotice = false"
      >
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95">
          <div class="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4 text-3xl">
            ⚙️
          </div>
          <h3 class="text-xl font-extrabold text-[#1E40AF] mb-2 tracking-tight">
            Fitur Belum Tersedia
          </h3>
          <p class="text-slate-600 text-sm leading-relaxed mb-6">
            Masuk dengan Google saat ini sedang dalam tahap pengembangan dan belum dapat digunakan. Silakan gunakan <strong>Email & Password</strong> terdaftar Anda untuk masuk.
          </p>
          <button
            @click="showGoogleFeatureNotice = false"
            type="button"
            class="w-full bg-[#20409A] hover:bg-[#1C368D] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer text-sm"
          >
            Mengerti
          </button>
        </div>
      </div>
    </transition>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '../../components/layouts/AuthLayout.vue'
import { authService } from '../../services/authService'

const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMsg = ref('')
const isSubmitting = ref(false)
const showGoogleFeatureNotice = ref(false)

const getRedirectPathByRole = (role?: string): string => {
  const r = String(role || '').toLowerCase()
  if (r.includes('admin')) return '/dashboard_admin'
  if (r.includes('guru') || r.includes('teacher') || r.includes('sekolah')) return '/dashboard_guru'
  return '/dashboard'
}

const handleLogin = async () => {
  errorMsg.value = ''
  isSubmitting.value = true

  const emailClean = email.value.toLowerCase().trim()

  // 1. Cek apakah email user ini ada di daftar proposal yang sudah di-ACC Admin
  let isApprovedTeacher = false
  let teacherSchool = ''
  let teacherName = ''

  try {
    const rawApproved = localStorage.getItem('tanggap_approved_teacher_emails')
    if (rawApproved) {
      const approvedList = JSON.parse(rawApproved)
      const matched = approvedList.find((a: any) => a.email && a.email.toLowerCase().trim() === emailClean && a.status === 'Disetujui')
      if (matched) {
        isApprovedTeacher = true
        teacherSchool = matched.schoolName || ''
        teacherName = matched.picName || ''
      }
    }
  } catch (e) {
    console.warn('Approved teacher lookup error:', e)
  }

  // Cek juga dari data pengajuan sekolah tanggap_school_submissions & status overrides
  if (!isApprovedTeacher) {
    try {
      const rawSubs = localStorage.getItem('tanggap_school_submissions')
      const overrides = JSON.parse(localStorage.getItem('tanggap_leads_status_overrides') || '{}')
      if (rawSubs) {
        const subs = JSON.parse(rawSubs)
        const matched = subs.find((s: any) => {
          const sEmail = (s.picEmail || s.email || '').toLowerCase().trim()
          const idStr = String(s.id || '')
          const effectiveStatus = overrides[idStr] || s.status
          return sEmail === emailClean && effectiveStatus === 'Disetujui'
        })
        if (matched) {
          isApprovedTeacher = true
          teacherSchool = matched.schoolName || ''
          teacherName = matched.picName || matched.contactName || ''
        }
      }
    } catch (e) {}
  }

  // Cek jika akun terdaftar di penyimpanan akun lokal dan verifikasi password
  try {
    const rawAccounts = localStorage.getItem('tanggap_user_accounts')
    if (rawAccounts) {
      const accounts = JSON.parse(rawAccounts)
      const localAcc = accounts.find((a: any) => a.email && a.email.toLowerCase().trim() === emailClean)
      if (localAcc) {
        if (localAcc.role === 'Guru BK' || localAcc.role === 'Guru/Sekolah') {
          isApprovedTeacher = true
          if (localAcc.school) teacherSchool = localAcc.school
          if (localAcc.name) teacherName = localAcc.name
        }
        // Jika akun guru yang sudah di-ACC: izinkan password baru dan jangan tolak!
        if (isApprovedTeacher) {
          localAcc.password = password.value
          localStorage.setItem('tanggap_user_accounts', JSON.stringify(accounts))
        } else if (localAcc.password && localAcc.password !== password.value) {
          errorMsg.value = 'Email atau password salah.'
          isSubmitting.value = false
          return
        }
        if (localAcc.name) {
          teacherName = localAcc.name
        }
      }
    }
  } catch {}

  // 2. Jalankan login ke API Backend
  try {
    const res = await authService.login({
      email: email.value,
      password: password.value,
    })

    // Jika email ini sudah di-ACC sebagai guru, pastikan role menjadi Guru BK dan sekolah terpasang
    let finalRole = res.user?.role || (isApprovedTeacher ? 'Guru BK' : 'Siswa')
    const lowerRole = (finalRole || '').toLowerCase()
    if (isApprovedTeacher || lowerRole.includes('guru') || lowerRole.includes('sekolah')) {
      finalRole = 'Guru BK'
      if (res.user) {
        res.user.role = 'Guru BK'
        res.user.school = teacherSchool || res.user.school || 'Sekolah Mitra'
        if (teacherName) res.user.name = teacherName
        localStorage.setItem('tanggap_user', JSON.stringify(res.user))
        window.dispatchEvent(new Event('storage'))
      }
    }
    router.push(getRedirectPathByRole(finalRole))
  } catch (err: unknown) {
    console.warn('Login API error, evaluating fallback:', err)
    if (isApprovedTeacher) {
      const teacherUser = {
        id: 'guru-' + Date.now(),
        name: teacherName || emailClean.split('@')[0],
        email: emailClean,
        role: 'Guru BK',
        school: teacherSchool || 'Sekolah Mitra'
      }
      localStorage.setItem('tanggap_token', 'token-guru-' + Date.now())
      localStorage.setItem('tanggap_user', JSON.stringify(teacherUser))
      window.dispatchEvent(new Event('storage'))
      router.push('/dashboard_guru')
      return
    }

    if (err && typeof err === 'object' && 'status' in err && ((err as { status: number }).status === 400 || (err as { status: number }).status === 401)) {
      errorMsg.value = (err as { message?: string }).message || 'Email atau password salah.'
    } else {
      // Fallback offline / server unreachable
      const emailLower = emailClean
      let fallbackRole = isApprovedTeacher ? 'Guru BK' : 'Siswa'
      if (emailLower.includes('admin')) {
        fallbackRole = 'Admin Sekolah'
      } else if (emailLower.includes('guru') || emailLower.includes('teacher')) {
        fallbackRole = 'Guru BK'
      }
      const mockUser = {
        id: 'user-demo-1',
        name: teacherName || email.value.split('@')[0] || 'Pengguna Tanggap',
        email: email.value,
        role: fallbackRole,
        school: teacherSchool
      }
      localStorage.setItem('tanggap_token', 'mock-token-demo')
      localStorage.setItem('tanggap_user', JSON.stringify(mockUser))
      window.dispatchEvent(new Event('storage'))
      router.push(getRedirectPathByRole(fallbackRole))
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
