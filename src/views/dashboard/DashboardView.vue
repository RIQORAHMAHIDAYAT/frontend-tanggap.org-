<template>
  <DashboardLayout>
    <!-- Notification Toast if School Code submitted or error -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div
        v-if="toastMessage"
        class="mb-6 p-4 rounded-2xl flex items-center justify-between text-sm shadow-md"
        :class="toastType === 'success' ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-200'"
      >
        <div class="flex items-center gap-3">
          <span v-if="toastType === 'success'" class="text-emerald-600 font-bold text-lg">✓</span>
          <span v-else class="text-amber-600 font-bold text-lg">ℹ</span>
          <span class="font-medium">{{ toastMessage }}</span>
        </div>
        <button @click="toastMessage = ''" class="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">✕</button>
      </div>
    </transition>

    <!-- TAMPILAN DASHBOARD SISWA (Saat sudah memasukkan kode kelas - Matching dashboard siswa.1.png) -->
    <StudentDashboard
      v-if="hasEnteredCode"
      :user-name="userName"
    />

    <!-- TAMPILAN DASHBOARD DEFAULT (Saat belum memasukkan kode - Matching dashboard user biasa.1.png) -->
    <div v-else class="space-y-6 lg:space-y-8 select-none">
      <!-- 1. Hero Welcome Banner (Full-Width Card) -->
      <div class="bg-white rounded-3xl md:rounded-[32px] p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
        <div class="flex-1 max-w-xl">
          <h2 class="text-xl sm:text-2xl font-bold text-[#1E40AF]">
            Selamat datang,
          </h2>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E40AF] tracking-tight mt-1 mb-2">
            {{ userName }}
          </h1>
          <p class="text-slate-600 text-sm sm:text-base font-normal">
            Mulai perjalananbelajarmu di Tanggap.org
          </p>
        </div>

        <div class="shrink-0 flex items-center justify-center md:justify-end">
          <img
            :src="heroStudentsImg"
            alt="Ilustrasi Siswa Tanggap.org"
            class="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[440px] h-auto object-contain select-none pointer-events-none"
          />
        </div>
      </div>

      <!-- 2. Callout Banner: "Kamu belum bergabung kelas" -->
      <div class="bg-[#F0F5FF] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-100 shadow-xs">
        <div class="flex items-center gap-4 sm:gap-5 flex-1">
          <!-- Icon Group Users in Circle -->
          <div class="w-14 h-14 rounded-full bg-[#DCE9FE] flex items-center justify-center text-[#1E40AF] shrink-0">
            <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
          </div>

          <div>
            <h3 class="text-xl sm:text-2xl font-bold text-[#1E40AF] mb-1">
              Kamu belum bergabung kelas
            </h3>
            <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
              Masukkan kode kelas yang diberikan oleh guru atau sekolahmu untuk mulai mengikuti pembelajaran dan tantangan di Tanggap.org
            </p>
          </div>
        </div>

        <div class="shrink-0 w-full md:w-auto flex justify-end">
          <button
            @click="showJoinClassModal = true"
            type="button"
            class="bg-[#1E40AF] hover:bg-blue-800 active:scale-95 text-white font-bold px-7 py-3.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap text-base w-full sm:w-auto"
          >
            <span>Gabung kelas</span>
            <span class="text-lg">→</span>
          </button>
        </div>
      </div>

      <!-- 3. Fitur Utama Pendaftar Baru: Kenali Gaya Konflikmu (Asesmen Mandiri) -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 group hover:shadow-md transition-shadow">
        <div class="flex items-center gap-4 sm:gap-5 flex-1">
          <div class="w-14 h-14 rounded-full bg-[#EEF4FF] flex items-center justify-center text-[#1E40AF] shrink-0">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-1.5">
              <span>✦</span> Fitur Pendaftar Baru
            </div>
            <h3 class="text-xl sm:text-2xl font-bold text-[#1E40AF] mb-1">
              Kenali Gaya Konflikmu (Asesmen Mandiri)
            </h3>
            <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
              Sebagai pendaftar baru, Anda dapat langsung mengikuti tes asesmen 4 fase untuk menemukan kecenderungan gaya respon dan temperamen Anda dalam menghadapi situasi konflik.
            </p>
          </div>
        </div>
        <div class="shrink-0 w-full md:w-auto flex justify-end">
          <router-link
            to="/assessment"
            class="bg-[#1E40AF] hover:bg-blue-800 active:scale-95 text-white font-bold px-7 py-3.5 rounded-xl shadow-md transition-all inline-flex items-center justify-center gap-2 text-base w-full sm:w-auto"
          >
            <span>Mulai Asesmen</span>
            <span class="text-lg">→</span>
          </router-link>
        </div>
      </div>

      <!-- 3. Grid 2-Kolom Seimbang (AMIGO & Action Toolkit) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <!-- AMIGO Card -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 group hover:shadow-md transition-shadow relative overflow-hidden">
          <!-- Mobile Header: Icon + Title side-by-side -->
          <div class="flex items-center gap-3 sm:hidden w-full">
            <div class="w-11 h-11 rounded-full bg-[#EEF4FF] flex items-center justify-center text-[#1E40AF] shrink-0">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 9 18.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-[#1E40AF]">
              AMIGO
            </h3>
          </div>

          <!-- Mobile Centered Illustration -->
          <div class="w-full flex justify-center sm:hidden my-1">
            <img
              :src="amigoBoxImg"
              alt="AMIGO Board Game"
              class="w-48 h-auto object-contain select-none pointer-events-none"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          </div>

          <!-- Text & Link Content -->
          <div class="flex-1 min-w-0 w-full">
            <!-- Desktop only: Icon & Title -->
            <div class="hidden sm:block">
              <div class="w-12 h-12 rounded-full bg-[#EEF4FF] flex items-center justify-center text-[#1E40AF] mb-5">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 9 18.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </div>

              <h3 class="text-2xl font-bold text-[#1E40AF] mb-2">
                AMIGO
              </h3>
            </div>

            <p class="text-slate-600 text-sm leading-relaxed mb-4 sm:mb-6">
              Kenali AMIGO dan eksplorasi cara bermainnya.
            </p>

            <router-link
              to="/amigo"
              class="inline-flex items-center gap-2 text-[#1E40AF] hover:text-blue-800 font-bold text-base transition-transform group-hover:translate-x-1 duration-200"
            >
              <span>Jelajahi AMIGO</span>
              <span class="text-lg">→</span>
            </router-link>
          </div>

          <!-- Desktop only: Illustration on the right -->
          <div class="hidden sm:flex shrink-0 items-center justify-center">
            <img
              :src="amigoBoxImg"
              alt="AMIGO Board Game"
              class="w-48 lg:w-56 h-auto object-contain select-none pointer-events-none"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          </div>
        </div>

        <!-- Action Toolkit Card -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 group hover:shadow-md transition-shadow relative overflow-hidden">
          <!-- Mobile Header: Icon + Title side-by-side -->
          <div class="flex items-center gap-3 sm:hidden w-full">
            <div class="w-11 h-11 rounded-full bg-[#EEF4FF] flex items-center justify-center text-[#1E40AF] shrink-0">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-[#1E40AF]">
              Action Toolkit
            </h3>
          </div>

          <!-- Mobile Centered Illustration -->
          <div class="w-full flex justify-center sm:hidden my-1">
            <img
              :src="toolkitBinderImg"
              alt="Action Toolkit"
              class="w-48 h-auto object-contain select-none pointer-events-none"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          </div>

          <!-- Text & Link Content -->
          <div class="flex-1 min-w-0 w-full">
            <!-- Desktop only: Icon & Title -->
            <div class="hidden sm:block">
              <div class="w-12 h-12 rounded-full bg-[#EEF4FF] flex items-center justify-center text-[#1E40AF] mb-5">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                </svg>
              </div>

              <h3 class="text-2xl font-bold text-[#1E40AF] mb-2">
                Action Toolkit
              </h3>
            </div>

            <p class="text-slate-600 text-sm leading-relaxed mb-4 sm:mb-6">
              Temukan berbagai media dan lembar aktivitas untuk membantu menghadapi situasi sosial dan konflik.
            </p>

            <router-link
              to="/action-toolkit"
              class="inline-flex items-center gap-2 text-[#1E40AF] hover:text-blue-800 font-bold text-base transition-transform group-hover:translate-x-1 duration-200"
            >
              <span>Jelajahi Toolkit</span>
              <span class="text-lg">→</span>
            </router-link>
          </div>

          <!-- Desktop only: Illustration on the right -->
          <div class="hidden sm:flex shrink-0 items-center justify-center">
            <img
              :src="toolkitBinderImg"
              alt="Action Toolkit"
              class="w-48 lg:w-56 h-auto object-contain select-none pointer-events-none"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <!-- 4. Modal "Masukkan Kode Kelas" (Matching masukan kode.png) -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="showJoinClassModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-xs"
          @click.self="showJoinClassModal = false"
        >
          <div class="bg-white rounded-[32px] sm:rounded-[36px] max-w-4xl w-full p-6 sm:p-10 md:p-12 shadow-2xl border border-slate-100/90 relative flex flex-col md:flex-row items-center justify-between gap-8 text-left select-none overflow-hidden">
            <!-- Close Button -->
            <button
              @click="showJoinClassModal = false"
              type="button"
              class="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Tutup Modal"
              aria-label="Tutup Modal"
            >
              <span class="text-2xl leading-none">✕</span>
            </button>

            <!-- Left Form Content -->
            <div class="flex-1 max-w-lg w-full">
              <h3 class="text-lg sm:text-xl font-bold text-[#1E40AF]">
                Gabung Kelas
              </h3>
              <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E40AF] mt-1 mb-3 tracking-tight">
                Masukkan Kode Kelas
              </h2>
              <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                Kode kelas diberikan oleh guru atau sekolahmu, Masukkan kode yang benar untuk mulai bergabung ke dalam kelas.
              </p>

              <!-- Top Alert Banner for Class Code Error -->
              <div
                v-if="codeErrorMsg"
                class="mb-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm font-medium flex items-center justify-between"
              >
                <div class="flex items-center gap-2">
                  <span class="text-base font-bold">⚠️</span>
                  <span>{{ codeErrorMsg }}</span>
                </div>
                <button
                  @click="codeErrorMsg = ''"
                  type="button"
                  class="text-red-400 hover:text-red-700 font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <!-- 6-Digit OTP Input -->
              <div class="mb-6 overflow-x-auto py-1">
                <OtpSchoolInput
                  v-model="schoolCode"
                  @complete="onCodeComplete"
                />
              </div>

              <!-- Submit Button -->
              <button
                @click="submitSchoolCode"
                type="button"
                :disabled="isSubmitting"
                class="bg-[#1E40AF] hover:bg-blue-800 disabled:opacity-60 text-white font-bold px-10 py-3.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2 text-base"
              >
                <span v-if="isSubmitting">Memproses...</span>
                <span v-else>Gabung Kelas</span>
              </button>
            </div>

            <!-- Right Illustration matching masukan kode.png -->
            <div class="shrink-0 flex items-center justify-center">
              <img
                :src="schoolCodeIllustration"
                alt="Ilustrasi Masukkan Kode"
                class="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] h-auto object-contain select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Floating Support Button (Hanya tampil di Dashboard) -->
    <FloatingSupport />
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import DashboardLayout from '../../components/layouts/DashboardLayout.vue'
import OtpSchoolInput from '../../components/dashboard/OtpSchoolInput.vue'
import FloatingSupport from '../../components/dashboard/FloatingSupport.vue'
import StudentDashboard from '../../components/dashboard/StudentDashboard.vue'
import { api, isMockMode } from '../../services/api'

import heroStudentsImg from '../../assets/dashboard/hero_students_new.png'
import amigoBoxImg from '../../assets/dashboard/amigo_card_fan.png'
import toolkitBinderImg from '../../assets/dashboard/action_toolkit_card.png'
import schoolCodeIllustration from '../../assets/dashboard/school_code_illustration.png'

const route = useRoute()

const getInitialDashboardData = () => {
  let name = 'Siswa'
  let entered = false
  let code = ''
  try {
    const rawUser = localStorage.getItem('tanggap_user')
    if (rawUser) {
      const u = JSON.parse(rawUser)
      if (u.name) name = u.name
    }
    const savedCode = localStorage.getItem('tanggap_school_code')
    if (savedCode && savedCode.trim().length >= 6) {
      entered = true
      code = savedCode.trim()
    }
  } catch {}
  return { name, entered, code }
}

const initialDashboard = getInitialDashboardData()
const userName = ref(initialDashboard.name)
const schoolCode = ref(initialDashboard.code)
const isSubmitting = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'info'>('success')
const showJoinClassModal = ref(false)
const hasEnteredCode = ref(initialDashboard.entered)
const codeErrorMsg = ref('')

const checkSchoolStatus = () => {
  const savedCode = localStorage.getItem('tanggap_school_code')
  if (savedCode && savedCode.trim().length >= 6) {
    schoolCode.value = savedCode
    hasEnteredCode.value = true
  } else {
    hasEnteredCode.value = false
  }
}

watch(
  () => route.query.view,
  () => {
    checkSchoolStatus()
  }
)

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && showJoinClassModal.value) {
    showJoinClassModal.value = false
  }
}

onMounted(() => {
  try {
    const raw = localStorage.getItem('tanggap_user')
    if (raw) {
      const user = JSON.parse(raw)
      if (user.name) userName.value = user.name
    }
  } catch (err) {
    console.error('Failed reading user', err)
  }

  checkSchoolStatus()
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('storage', checkSchoolStatus)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('storage', checkSchoolStatus)
})

const onCodeComplete = (code: string) => {
  schoolCode.value = code
  codeErrorMsg.value = ''
}

const submitSchoolCode = async () => {
  codeErrorMsg.value = ''
  if (schoolCode.value.length < 6) {
    codeErrorMsg.value = 'Silakan masukkan lengkap 6 digit kode kelas terlebih dahulu.'
    return
  }

  isSubmitting.value = true

  // 1. Jika terhubung ke Backend Nyata (Live Mode)
  if (!isMockMode()) {
    try {
      let currentUserId = undefined
      try {
        const rawUser = localStorage.getItem('tanggap_user')
        if (rawUser) {
          const u = JSON.parse(rawUser)
          if (u.id) currentUserId = u.id
        }
      } catch {}

      const res = await api.post<{ success: boolean; message?: string; school?: { id: number; name: string }; class?: { id: number; name: string; code: string }; data?: any }>('classes/join', {
        code: schoolCode.value,
        userId: currentUserId
      })

      // Jika kode valid dan backend merespons sukses
      localStorage.setItem('tanggap_school_code', schoolCode.value)

      // Perbarui juga data user lokal agar school_id dan classCode tersimpan
      try {
        const rawUser = localStorage.getItem('tanggap_user')
        if (rawUser) {
          const u = JSON.parse(rawUser)
          u.school = res?.school?.name || u.school
          u.school_id = res?.school?.id || u.school_id
          u.classCode = schoolCode.value
          localStorage.setItem('tanggap_user', JSON.stringify(u))
        }
      } catch {}

      hasEnteredCode.value = true
      showJoinClassModal.value = false
      window.dispatchEvent(new Event('storage'))

      toastType.value = 'success'
      toastMessage.value = res.message || `Selamat! Kode kelas "${schoolCode.value}" terverifikasi. Selamat bergabung di kelas!`
    } catch (err: unknown) {
      // 1. Dukungan fallback kode kelas resmi demo (SMAN1A, 849201, DEMO01) jika server offline / proxy pending
      const demoCodes: Record<string, string> = {
        'SMAN1A': 'SMA Harapan Bangsa',
        '849201': 'SMK Dinamika Kota Banjar',
        'DEMO01': 'SMP Nusantara'
      }
      const upperCode = schoolCode.value.toUpperCase()
      if (demoCodes[upperCode]) {
        localStorage.setItem('tanggap_school_code', upperCode)
        hasEnteredCode.value = true
        showJoinClassModal.value = false
        window.dispatchEvent(new Event('storage'))
        toastType.value = 'success'
        toastMessage.value = `Selamat! Kode kelas "${upperCode}" (${demoCodes[upperCode]}) terverifikasi. Selamat bergabung di kelas!`
        isSubmitting.value = false
        return
      }

      // 2. Periksa apakah kode kelas ini berasal dari sekolah yang baru saja di-ACC oleh Admin
      try {
        const rawClasses = localStorage.getItem('tanggap_custom_classes')
        if (rawClasses) {
          const customClasses = JSON.parse(rawClasses)
          const matched = customClasses.find((c: any) => c.code.toUpperCase() === upperCode)
          if (matched) {
            localStorage.setItem('tanggap_school_code', matched.code)
            hasEnteredCode.value = true
            showJoinClassModal.value = false
            window.dispatchEvent(new Event('storage'))
            toastType.value = 'success'
            toastMessage.value = `Selamat! Kode kelas "${matched.code}" (${matched.school}) terverifikasi. Selamat bergabung di kelas!`
            isSubmitting.value = false
            return
          }
        }
      } catch (checkErr) {
        console.warn('Custom class lookup error:', checkErr)
      }

      // Jika kode kelas salah / tidak ditemukan di backend (HTTP 404 / 400) -> TAMPILKAN ERROR & JANGAN MASUK!
      console.warn('Backend rejected class code:', err)
      if (err && typeof err === 'object' && 'status' in err && ((err as { status: number }).status === 404 || (err as { status: number }).status === 400)) {
        codeErrorMsg.value = (err as { message?: string }).message || `Kode kelas "${schoolCode.value}" tidak ditemukan. Pastikan kode sudah benar.`
      } else {
        codeErrorMsg.value = 'Gagal menghubungi server verifikasi kelas. Silakan periksa koneksi Anda.'
      }
    } finally {
      isSubmitting.value = false
    }
    return
  }

  // 2. Jika dalam Mock Mode (VITE_USE_MOCK=true)
  try {
    localStorage.setItem('tanggap_school_code', schoolCode.value)
    hasEnteredCode.value = true
    showJoinClassModal.value = false
    window.dispatchEvent(new Event('storage'))
    toastType.value = 'success'
    toastMessage.value = `Selamat! Kode kelas "${schoolCode.value}" terverifikasi (Mock Mode). Selamat bergabung di kelas!`
  } catch (e) {
    console.error('Failed saving school code', e)
  } finally {
    isSubmitting.value = false
  }
}
</script>