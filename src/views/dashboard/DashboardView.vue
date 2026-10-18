<template>
  <DashboardLayout>
    <!-- Notification Toast if School Code submitted -->
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
        <button @click="toastMessage = ''" class="text-slate-400 hover:text-slate-600 p-1">✕</button>
      </div>
    </transition>

    <!-- TAMPILAN DASHBOARD SISWA (Saat sudah memasukkan kode - Matching dashboard siswa.png) -->
    <StudentDashboard
      v-if="hasEnteredCode"
      :user-name="userName"
    />

    <!-- TAMPILAN DASHBOARD DEFAULT (Saat belum memasukkan kode - Matching dashboard-00.png) -->
    <div v-else>
      <!-- Main 2-Column Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        <!-- LEFT COLUMN (Welcome Card + AMIGO Card) -->
        <div class="lg:col-span-7 flex flex-col gap-6 lg:gap-8">
          
          <!-- CARD 1: Welcome & School Join Card -->
          <div class="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div class="mb-5">
                <h2 class="text-xl sm:text-2xl text-slate-700 font-normal leading-tight">
                  Selamat datang,
                </h2>
                <h1 class="text-2xl sm:text-3xl md:text-4xl text-slate-900 font-extrabold mt-1 tracking-tight">
                  {{ userName }}
                </h1>
              </div>

              <!-- Divider Line -->
              <hr class="border-slate-200 my-6" />

              <div class="space-y-3">
                <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Gabung ke kelasmu untuk mulai mengikuti pembelajaran dan tantangan di Tanggap.org.
                </p>
                <p class="text-slate-500 text-xs sm:text-sm">
                  Masukkan 6 digit kode sekolah yang diberikan oleh sekolahmu.
                </p>
              </div>

              <!-- 6-Digit School Code Input -->
              <div class="mt-6 mb-2 overflow-x-auto py-1">
                <OtpSchoolInput
                  v-model="schoolCode"
                  @complete="onCodeComplete"
                />
              </div>
            </div>

            <!-- Bottom Action: Masuk Button -->
            <div class="flex justify-end mt-8">
              <button
                @click="submitSchoolCode"
                type="button"
                :disabled="isSubmitting"
                class="bg-[#1E40AF] hover:bg-blue-800 disabled:opacity-60 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span v-if="isSubmitting">Memproses...</span>
                <span v-else>Masuk</span>
              </button>
            </div>
          </div>

          <!-- CARD 4: AMIGO Promo Card -->
          <div class="bg-white rounded-3xl p-6 sm:p-8 md:p-9 border border-slate-200/80 shadow-xs flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div>
              <!-- Blue Square Icon: Playing Cards -->
              <div class="w-14 h-14 bg-[#1E40AF] rounded-2xl flex items-center justify-center text-white mb-5 shadow-sm">
                <svg class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <!-- AMIGO Card Deck Icon -->
                  <path d="M4 4c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v1h2c1.1 0 2 .9 2 2v13c0 1.1-.9 2-2 2H10c-1.1 0-2-.9-2-2v-1H6c-1.1 0-2-.9-2-2V4zm4 1v11h10V7H8V5zm-2 1v11h10v1c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1zm6 3h2v2h-2V9zm0 4h2v4h-2v-4z"/>
                </svg>
              </div>

              <h3 class="text-2xl font-bold text-slate-900 mb-2">
                AMIGO
              </h3>
              <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Kenali AMIGO dan eksplorasi cara bermainnya
              </p>
            </div>

            <div>
              <router-link
                to="/amigo"
                class="inline-flex items-center gap-2 text-[#1E40AF] hover:text-blue-800 font-bold text-base transition-colors group-hover:translate-x-1 duration-200"
              >
                <span>Jelajahi AMIGO</span>
                <span class="text-lg">→</span>
              </router-link>
            </div>
          </div>

        </div>

        <!-- RIGHT COLUMN (Speedometer Status Card + Action Toolkit Card) -->
        <div class="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
          
          <!-- CARD 2: User School Status Widget with Speedometer -->
          <div class="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <!-- Speedometer Graphic -->
            <SpeedometerWidget />

            <!-- Details -->
            <div class="flex-1">
              <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                Hai, {{ userName }}
              </h3>
              <p class="text-slate-600 text-sm leading-relaxed mt-1">
                Saat ini Anda belum berada sekolah manapun.
              </p>
              <button
                @click="showSchoolDetailModal = true"
                type="button"
                class="text-[#1E40AF] hover:underline font-semibold text-sm mt-3 inline-block cursor-pointer focus:outline-none"
              >
                Lihat detail
              </button>
            </div>
          </div>

          <!-- CARD 3: Action Toolkit Promo Card -->
          <div class="bg-white rounded-3xl p-6 sm:p-8 md:p-9 border border-slate-200/80 shadow-xs flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div>
              <!-- Blue Square Icon: Folder / Action Toolkit -->
              <div class="w-14 h-14 bg-[#1E40AF] rounded-2xl flex items-center justify-center text-white mb-5 shadow-sm">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>

              <h3 class="text-2xl font-bold text-slate-900 mb-2">
                Action Toolkit
              </h3>
              <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Temukan berbagai media dan lembar aktivitas untuk membantu menghadapi situasi sosial dan konflik
              </p>
            </div>

            <div>
              <router-link
                to="/action-toolkit"
                class="inline-flex items-center gap-2 text-[#1E40AF] hover:text-blue-800 font-bold text-base transition-colors group-hover:translate-x-1 duration-200"
              >
                <span>Jelajahi Toolkit</span>
                <span class="text-lg">→</span>
              </router-link>
            </div>
          </div>

        </div>

      </div>

      <!-- Modal Detail Sekolah (Matching lihat detail.png) -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="showSchoolDetailModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-xs"
          @click.self="showSchoolDetailModal = false"
        >
          <div class="bg-white rounded-[32px] sm:rounded-[36px] max-w-[620px] w-full p-7 sm:p-9 md:p-10 shadow-2xl border border-slate-100/80 relative text-left select-none">
            <h3 class="text-2xl sm:text-[28px] font-bold text-slate-900 mb-4 sm:mb-5 tracking-tight leading-tight">
              Status Sekolah Pengguna
            </h3>
            <p class="text-slate-600 text-base sm:text-[17px] leading-relaxed mb-6 sm:mb-8 font-normal">
              Akun Anda saat ini belum terhubung ke instansi sekolah mana pun. Silakan masukkan 6 digit kode sekolah yang diberikan oleh Sekolah atau koordinator sekolah Anda.
            </p>
            <div class="bg-[#EEF3F8] rounded-2xl p-5 sm:p-6 mb-7 sm:mb-8 text-[#1E40AF] text-sm sm:text-base leading-relaxed font-normal">
              Anda dapat mencoba memasukan kode yang didapat di kolom lalu klik Masuk.
            </div>
            <div class="flex justify-end">
              <button
                @click="showSchoolDetailModal = false"
                type="button"
                class="bg-[#1E40AF] hover:bg-blue-800 active:scale-95 text-white font-bold px-10 sm:px-12 py-3.5 rounded-2xl shadow-md transition-all cursor-pointer text-base sm:text-lg focus:outline-none"
              >
                Tutup
              </button>
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
import SpeedometerWidget from '../../components/dashboard/SpeedometerWidget.vue'
import FloatingSupport from '../../components/dashboard/FloatingSupport.vue'
import StudentDashboard from '../../components/dashboard/StudentDashboard.vue'

const route = useRoute()
const userName = ref('Ahmat Fauzy')
const schoolCode = ref('')
const isSubmitting = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'info'>('success')
const showSchoolDetailModal = ref(false)
const hasEnteredCode = ref(false)

const checkSchoolStatus = () => {
  if (route.query.view === 'siswa') {
    hasEnteredCode.value = true
    return
  }
  if (route.query.view === 'default') {
    hasEnteredCode.value = false
    return
  }

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
  if (event.key === 'Escape' && showSchoolDetailModal.value) {
    showSchoolDetailModal.value = false
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
}

const submitSchoolCode = () => {
  if (schoolCode.value.length < 6) {
    toastType.value = 'info'
    toastMessage.value = 'Silakan masukkan lengkap 6 digit kode sekolah terlebih dahulu.'
    return
  }

  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    try {
      localStorage.setItem('tanggap_school_code', schoolCode.value)
      hasEnteredCode.value = true
      window.dispatchEvent(new Event('storage'))
    } catch (e) {
      console.error('Failed saving school code', e)
    }
    toastType.value = 'success'
    toastMessage.value = `Selamat! Kode sekolah "${schoolCode.value}" terverifikasi. Selamat belajar di Tanggap.org!`
  }, 600)
}
</script>
