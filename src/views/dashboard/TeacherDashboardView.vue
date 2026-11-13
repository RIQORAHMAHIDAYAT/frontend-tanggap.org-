<template>
  <DashboardLayout
    :user-name="teacherName"
    :user-initials="teacherInitials"
    :menu-items="teacherMenuItems"
  >
    <div class="space-y-6 md:space-y-8 select-none">
      <!-- 1. Header Section (Matching guru.png & guru.1.png) -->
      <header class="space-y-2">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E40AF] tracking-tight">
          Halo, {{ teacherName }}
        </h1>
        <p class="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl">
          Selamat datang diportal Guru BK Tanggap.org<span v-if="teacherSchool"> &bull; <strong>{{ teacherSchool }}</strong></span>. Pantau perkembangan keterampilan resolusi konflik siswa di sekolah Anda.
        </p>
      </header>

      <!-- 2. Hero Card: Program Resolusi Konflik di Sekolah Anda -->
      <div class="bg-[#F0F5FF] rounded-3xl p-6 sm:p-8 md:p-10 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div class="shrink-0 flex items-center justify-center">
          <img
            :src="schoolBuildingImg"
            alt="Ilustrasi Sekolah"
            class="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] h-auto object-contain select-none pointer-events-none"
          />
        </div>

        <div class="flex-1 max-w-xl text-left">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E40AF] mb-3 leading-snug tracking-tight">
            Program Resolusi Konflik<br class="hidden sm:inline"> di {{ teacherSchool || 'Sekolah Anda' }}
          </h2>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
            Bersama Tanggap.org, wujudkan lingkungan sekolah yang aman dan suportif.
          </p>
        </div>
      </div>

      <!-- 2.1 Token / Kode Kelas Sekolah (Bagikan ke Siswa) -->
      <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-700/50">
        <div class="flex items-center gap-4 sm:gap-5 flex-1">
          <div class="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 text-2xl shadow-inner">
            🔑
          </div>
          <div>
            <div class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-400/20 text-blue-200 text-xs font-bold mb-1.5 border border-blue-300/30">
              <span>✦</span> Token / Kode Kelas Sekolah Aktif
            </div>
            <h3 class="text-xl sm:text-2xl font-bold text-white mb-1">
              Kode Kelas: <span class="tracking-widest font-mono text-amber-300 font-extrabold bg-blue-950/60 px-3 py-1 rounded-xl border border-amber-300/30">{{ teacherClassCode || 'MEMUAT...' }}</span>
            </h3>
            <p class="text-blue-100 text-xs sm:text-sm leading-relaxed max-w-xl mt-1">
              Bagikan 6 digit token ini kepada siswa <strong>{{ teacherSchool || 'sekolah Anda' }}</strong> agar mereka dapat bergabung di aplikasi. Siswa yang bergabung akan otomatis muncul di halaman Monitoring.
            </p>
          </div>
        </div>

        <div class="shrink-0 flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            @click="copyClassCode"
            type="button"
            class="w-full sm:w-auto bg-white hover:bg-blue-50 text-[#1E40AF] font-bold px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 text-sm"
          >
            <span>{{ isCopied ? '✓ Kode Berhasil Disalin!' : '📋 Salin Kode Kelas' }}</span>
          </button>
        </div>
      </div>

      <!-- 3. Perkembangan Indikator (Bar Chart Card) -->
      <div class="bg-white rounded-3xl md:rounded-[32px] p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs">
        <!-- Chart Header & Legends -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 class="text-2xl font-bold text-[#1E40AF] tracking-tight">
              Perkembangan Indikator
            </h2>
            <p class="text-slate-500 text-sm mt-0.5">
              Perbandingan rata-rata skor indikator konflik.
            </p>
          </div>

          <!-- Legends -->
          <div class="flex items-center gap-6 text-sm font-semibold text-slate-700">
            <div class="flex items-center gap-2">
              <span class="w-3.5 h-3.5 rounded-full bg-[#60A5FA]"></span>
              <span>Pre-test</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3.5 h-3.5 rounded-full bg-[#1E40AF]"></span>
              <span>Post-test</span>
            </div>
          </div>
        </div>

        <!-- SVG/CSS Grouped Bar Chart -->
        <div class="relative pt-4 pb-2">
          <!-- Y-Axis Labels & Grid Lines -->
          <div class="space-y-8 relative">
            <div
              v-for="val in [100, 75, 50, 25, 0]"
              :key="val"
              class="flex items-center gap-4 text-xs text-slate-400 font-semibold"
            >
              <span class="w-7 text-right">{{ val }}</span>
              <div class="flex-1 h-px bg-slate-100"></div>
            </div>
          </div>

          <!-- Grouped Bars Overlay -->
          <div class="absolute inset-x-0 top-4 bottom-6 ml-11 flex justify-around items-end px-2 sm:px-6">
            <div
              v-for="item in indicatorStats"
              :key="item.name"
              class="flex flex-col items-center group relative"
            >
              <!-- Pair of Bars -->
              <div class="flex items-end gap-1.5 sm:gap-2.5 h-44 sm:h-52">
                <!-- Pre-test Bar (Light Blue #60A5FA) -->
                <div
                  class="w-6 sm:w-10 md:w-12 bg-[#60A5FA] rounded-t-lg transition-all duration-700 hover:brightness-105 relative cursor-pointer"
                  :style="{ height: `${item.pre}%` }"
                  :title="`Pre-test: ${item.pre}%`"
                >
                  <!-- Tooltip -->
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-10 font-bold">
                    {{ item.pre }}%
                  </div>
                </div>

                <!-- Post-test Bar (Deep Blue #1E40AF) -->
                <div
                  class="w-6 sm:w-10 md:w-12 bg-[#1E40AF] rounded-t-lg transition-all duration-700 hover:brightness-110 relative cursor-pointer"
                  :style="{ height: `${item.post}%` }"
                  :title="`Post-test: ${item.post}%`"
                >
                  <!-- Tooltip -->
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-10 font-bold">
                    {{ item.post }}%
                  </div>
                </div>
              </div>

              <!-- Category Label Below -->
              <span class="text-xs sm:text-sm font-semibold text-slate-700 mt-4 text-center whitespace-normal max-w-[90px] sm:max-w-[130px] leading-tight">
                {{ item.name }}
              </span>
            </div>
          </div>
        </div>

        <!-- Notification saat belum ada data asesmen siswa yang masuk -->
        <div
          v-if="!hasAssessmentData"
          class="mt-6 p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-[#1E40AF] text-xs sm:text-sm flex items-center justify-between"
        >
          <div class="flex items-center gap-2.5">
            <span class="text-base">ℹ️</span>
            <span>Grafik perkembangan indikator akan otomatis terisi dan terupdate secara real-time setelah siswa {{ teacherSchool ? 'dari ' + teacherSchool : '' }} menyelesaikan tes asesmen.</span>
          </div>
        </div>
      </div>

      <!-- 4. Bottom Row: Ringkasan Hasil Assessment & Akses Cepat (Grid 2 Kolom) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <!-- Card Kiri: Ringkasan Hasil Assessment -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 class="text-2xl font-bold text-[#1E40AF] mb-1 tracking-tight">
              Ringkasan Hasil Assessment
            </h3>
            <p class="text-slate-500 text-sm mb-6">
              Perbandingan hasil keseluruhan siswa di sekolah Anda.
            </p>

            <!-- 2 Metric Boxes -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Box 1: Pre-test -->
              <div class="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs">
                <div class="w-12 h-12 rounded-full bg-[#DCE9FE] flex items-center justify-center text-[#1E40AF] mb-3">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                </div>
                <div class="font-bold text-slate-800 text-base">
                  Pre-test
                </div>
                <div class="text-slate-500 text-xs mt-0.5">
                  Rata-rata Skor
                </div>
                <div class="text-2xl font-extrabold text-slate-900 mt-2">
                  {{ preAverageScore }}
                </div>
              </div>

              <!-- Box 2: Post-test -->
              <div class="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs">
                <div class="w-12 h-12 rounded-full bg-[#DCE9FE] flex items-center justify-center text-[#1E40AF] mb-3">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                </div>
                <div class="font-bold text-slate-800 text-base">
                  Post-test
                </div>
                <div class="text-slate-500 text-xs mt-0.5">
                  Rata-rata Skor
                </div>
                <div class="text-2xl font-extrabold text-slate-900 mt-2">
                  {{ postAverageScore }}
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Note -->
          <div class="flex items-center gap-2 text-xs text-slate-500 mt-6 pt-4 border-t border-slate-100">
            <div class="w-4 h-4 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold shrink-0">
              i
            </div>
            <span>Data akan ditampilkan setelah tersedia dari hasil assessment.</span>
          </div>
        </div>

        <!-- Card Kanan: Akses Cepat -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 class="text-2xl font-bold text-[#1E40AF] mb-1 tracking-tight">
              Akses Cepat
            </h3>
            <p class="text-slate-500 text-sm mb-6">
              Navigasi langsung ke fitur utama.
            </p>

            <div class="space-y-4">
              <!-- Tile 1: Monitoring Assessment -->
              <router-link
                to="/monitoring_guru"
                class="bg-[#F0F5FF] hover:bg-blue-100/70 rounded-2xl p-4 sm:p-5 flex items-center justify-between transition-all group cursor-pointer block border border-blue-50"
              >
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-2xl bg-[#DCE9FE] text-[#1E40AF] flex items-center justify-center shrink-0 shadow-2xs">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-[#1E40AF] text-base sm:text-lg group-hover:text-blue-800 transition-colors">
                      Monitoring Assessment
                    </h4>
                    <p class="text-slate-600 text-xs sm:text-sm mt-0.5">
                      Lihat detail hasil dan grafik perkembangan siswa/kelas.
                    </p>
                  </div>
                </div>

                <div class="w-8 h-8 rounded-full bg-[#DCE9FE] text-[#1E40AF] flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                  <span class="text-sm font-bold">›</span>
                </div>
              </router-link>

              <!-- Tile 2: Unduh Impact Report -->
              <button
                @click="downloadReport"
                type="button"
                class="w-full text-left bg-[#F0F5FF] hover:bg-blue-100/70 rounded-2xl p-4 sm:p-5 flex items-center justify-between transition-all group cursor-pointer border border-blue-50"
              >
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-2xl bg-[#DCE9FE] text-[#1E40AF] flex items-center justify-center shrink-0 shadow-2xs">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-[#1E40AF] text-base sm:text-lg group-hover:text-blue-800 transition-colors">
                      Unduh Impact Report
                    </h4>
                    <p class="text-slate-600 text-xs sm:text-sm mt-0.5">
                      Download laporan program (dalam format PDF).
                    </p>
                  </div>
                </div>

                <div class="w-8 h-8 rounded-full bg-[#DCE9FE] text-[#1E40AF] flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                  <span class="text-sm font-bold">›</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Support Button -->
    <FloatingSupport />
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DashboardLayout from '../../components/layouts/DashboardLayout.vue'
import FloatingSupport from '../../components/dashboard/FloatingSupport.vue'
import schoolBuildingImg from '../../assets/dashboard/school_building_hero.png'
import { api, isMockMode } from '../../services/api'

const getInitialTeacher = () => {
  try {
    const raw = localStorage.getItem('tanggap_user')
    if (raw) {
      const u = JSON.parse(raw)
      const name = u.name || 'Guru BK'
      const initials = name.trim().split(/\s+/).map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
      const classCode = u.classCode || u.classroom?.code || localStorage.getItem('tanggap_school_code') || ''
      return { name, initials, school: u.school || '', classCode }
    }
  } catch {}
  return { name: 'Guru BK', initials: 'GB', school: '', classCode: '' }
}

const initialTeacher = getInitialTeacher()
const teacherName = ref(initialTeacher.name)
const teacherInitials = ref(initialTeacher.initials)
const teacherSchool = ref(initialTeacher.school)
const teacherClassCode = ref(initialTeacher.classCode)
const isCopied = ref(false)

const copyClassCode = async () => {
  if (!teacherClassCode.value) return
  const code = teacherClassCode.value.trim()
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(code)
      isCopied.value = true
      setTimeout(() => {
        isCopied.value = false
      }, 2500)
      return
    }
  } catch {}

  // Fallback document.execCommand dengan dukungan iOS & Android Mobile
  try {
    const textArea = document.createElement('textarea')
    textArea.value = code
    textArea.style.position = 'fixed'
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    textArea.setSelectionRange(0, 99999)
    document.execCommand('copy')
    document.body.removeChild(textArea)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2500)
  } catch {
    prompt('Salin kode kelas ini:', code)
  }
}

// Menu Khusus Guru BK (Matching Group 497.png)
const teacherMenuItems = [
  { label: 'Dashboard', path: '/dashboard_guru' },
  { label: 'Monitoring', path: '/monitoring_guru' },
  { label: 'Amigo', path: '/amigo' },
  { label: 'Action Toolkit', path: '/action-toolkit' }
]

// 4 Indikator Resolusi Konflik (Real Data dari database MySQL)
const indicatorStats = ref([
  { name: 'Regulasi Emosi', pre: 0, post: 0 },
  { name: 'Empati', pre: 0, post: 0 },
  { name: 'Komunikasi Asertif', pre: 0, post: 0 },
  { name: 'De-eskalasi Konflik', pre: 0, post: 0 }
])
const hasAssessmentData = ref(false)
const preAverageScore = ref('—')
const postAverageScore = ref('—')

onMounted(async () => {
  try {
    const raw = localStorage.getItem('tanggap_user')
    if (raw) {
      const u = JSON.parse(raw)
      if (u.name) {
        teacherName.value = u.name
        teacherInitials.value = u.name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()
      }
      if (u.school) {
        teacherSchool.value = u.school
      }
      if (u.classCode || u.classroom?.code) {
        teacherClassCode.value = u.classCode || u.classroom?.code
      }
    }
  } catch {}

  if (isMockMode()) return

  try {
    const res = await api.get<{
      success?: boolean
      hasData?: boolean
      data?: any
      indicatorStats?: any[]
      classCode?: string
      summary?: { preAvg?: string | number; postAvg?: string | number }
    }>('teacher/dashboard-overview')

    hasAssessmentData.value = !!(res?.hasData || res?.data?.hasData)
    const list = res?.data?.indicatorStats || res?.indicatorStats
    if (Array.isArray(list) && list.length > 0) {
      indicatorStats.value = list
    }

    if (res?.summary?.preAvg) preAverageScore.value = String(res.summary.preAvg)
    if (res?.summary?.postAvg) postAverageScore.value = String(res.summary.postAvg)

    const apiCode = res?.classCode || res?.data?.classCode
    if (apiCode) {
      teacherClassCode.value = apiCode
      // Perbarui juga data user lokal
      try {
        const raw = localStorage.getItem('tanggap_user')
        if (raw) {
          const u = JSON.parse(raw)
          u.classCode = apiCode
          localStorage.setItem('tanggap_user', JSON.stringify(u))
        }
      } catch {}
    }
  } catch (err) {
    console.warn('Fallback: gagal mengambil teacher dashboard overview:', err)
  }
})

const downloadReport = () => {
  alert('Menyiapkan Impact Report Tanggap.org dalam format PDF...')
}
</script>
