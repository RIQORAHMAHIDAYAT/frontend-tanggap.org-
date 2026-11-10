<template>
  <DashboardLayout
    :user-name="teacherName"
    :user-initials="teacherInitials"
    :menu-items="teacherMenuItems"
  >
    <div class="space-y-6 md:space-y-8 select-none">
      <!-- 1. Header Section (Matching sekolah.png) -->
      <header class="space-y-2">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E40AF] tracking-tight">
          Monitoring Assessment
        </h1>
        <p class="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl">
          Pantau hasil assessment keterampilan resolusi konflik kelas atau siswa.
        </p>
      </header>

      <!-- 2. Filter Controls (Pilih Kelas & Periode Assessment) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <!-- Filter 1: Pilih Kelas -->
        <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex items-center justify-between relative cursor-pointer hover:border-blue-200 transition-colors">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-[#DCE9FE] flex items-center justify-center text-[#1E40AF] shrink-0">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.45 9L12 4.34 20.55 9 12 13.66 3.45 9zM5 12.2v5.3c0 2.21 3.13 4 7 4s7-1.79 7-4v-5.3l-7 3.82-7-3.82z"/>
              </svg>
            </div>
            <div>
              <span class="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Pilih Kelas</span>
              <span class="block text-base sm:text-lg font-bold text-[#1E40AF]">{{ selectedClass }}</span>
            </div>
          </div>
          <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
          <select v-model="selectedClass" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full">
            <option value="Semua Kelas">Semua Kelas</option>
            <option value="Kelas X A">Kelas X A</option>
            <option value="Kelas XI B">Kelas XI B</option>
            <option value="Kelas XII D">Kelas XII D</option>
          </select>
        </div>

        <!-- Filter 2: Periode Assessment -->
        <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex items-center justify-between relative cursor-pointer hover:border-blue-200 transition-colors">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-[#DCE9FE] flex items-center justify-center text-[#1E40AF] shrink-0">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
            </div>
            <div>
              <span class="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Periode Assessment</span>
              <span class="block text-base sm:text-lg font-bold text-[#1E40AF]">{{ selectedPeriod }}</span>
            </div>
          </div>
          <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
          <select v-model="selectedPeriod" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full">
            <option value="Pre-test & Post-test">Pre-test & Post-test</option>
            <option value="Pre-test Saja">Pre-test Saja</option>
            <option value="Post-test Saja">Post-test Saja</option>
          </select>
        </div>
      </div>

      <!-- 3. Section: Perbandingan Hasil Assessment (4 Indikator Cards) -->
      <div class="bg-white rounded-3xl md:rounded-[32px] p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 class="text-2xl font-bold text-[#1E40AF] tracking-tight">
              Perbandingan Hasil Assessment
            </h2>
            <p class="text-slate-500 text-sm mt-0.5">
              Rata-rata skor keseluruhan siswa di sekolah Anda.
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

        <!-- 4 Indicator Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div
            v-for="item in indicators"
            :key="item.name"
            class="bg-[#F0F5FF] rounded-2xl p-5 border border-blue-100 flex flex-col justify-between"
          >
            <div>
              <div class="w-12 h-12 rounded-full bg-[#DCE9FE] flex items-center justify-center text-[#1E40AF] mb-4">
                <!-- Icon mapping -->
                <span class="text-xl">{{ item.icon }}</span>
              </div>
              <h3 class="font-bold text-slate-800 text-base leading-snug">
                {{ item.name }}
              </h3>
            </div>

            <!-- Score progression: - -> - -->
            <div class="flex items-center gap-4 mt-6 text-slate-700 font-extrabold text-lg">
              <span>{{ item.pre || '-' }}</span>
              <span class="text-slate-400 font-normal">→</span>
              <span>{{ item.post || '-' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Section: Perkembangan Indikator Resolusi Konflik (Line Chart) -->
      <div class="bg-white rounded-3xl md:rounded-[32px] p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 class="text-2xl font-bold text-[#1E40AF] tracking-tight">
              Perkembangan Indikator Resolusi Konflik
            </h2>
            <p class="text-slate-500 text-sm mt-0.5">
              Perbandingan rata-rata skor indikator (Pre-test & Post-test).
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

        <!-- Line Chart SVG (Responsive Matching sekolah.png) -->
        <div class="relative pt-4 pb-4 overflow-x-auto">
          <div class="min-w-[600px]">
            <svg viewBox="0 0 800 240" class="w-full h-64 overflow-visible">
              <!-- Y-Axis Grid Lines & Labels -->
              <g class="text-slate-300 stroke-current" stroke-width="1">
                <line x1="60" y1="20" x2="780" y2="20" stroke-dasharray="0" />
                <line x1="60" y1="65" x2="780" y2="65" stroke-dasharray="0" />
                <line x1="60" y1="110" x2="780" y2="110" stroke-dasharray="0" />
                <line x1="60" y1="155" x2="780" y2="155" stroke-dasharray="0" />
                <line x1="60" y1="200" x2="780" y2="200" stroke-dasharray="0" />
              </g>

              <!-- Y Labels -->
              <g class="fill-slate-400 text-xs font-semibold" text-anchor="end">
                <text x="50" y="24">100</text>
                <text x="50" y="69">75</text>
                <text x="50" y="114">50</text>
                <text x="50" y="159">25</text>
                <text x="50" y="204">0</text>
              </g>

              <!-- Vertical Grid Lines -->
              <g class="text-slate-100 stroke-current" stroke-width="1">
                <line x1="150" y1="20" x2="150" y2="200" />
                <line x1="330" y1="20" x2="330" y2="200" />
                <line x1="510" y1="20" x2="510" y2="200" />
                <line x1="690" y1="20" x2="690" y2="200" />
              </g>

              <!-- Pre-test Line (Light Blue #60A5FA) -->
              <polyline
                fill="none"
                stroke="#60A5FA"
                stroke-width="3"
                points="150,170 330,150 510,135 690,115"
              />
              <!-- Pre-test Dots -->
              <circle cx="150" cy="170" r="5" fill="#60A5FA" />
              <circle cx="330" cy="150" r="5" fill="#60A5FA" />
              <circle cx="510" cy="135" r="5" fill="#60A5FA" />
              <circle cx="690" cy="115" r="5" fill="#60A5FA" />

              <!-- Post-test Line (Deep Blue #1E40AF) -->
              <polyline
                fill="none"
                stroke="#1E40AF"
                stroke-width="3.5"
                points="150,140 330,120 510,105 690,85"
              />
              <!-- Post-test Dots -->
              <circle cx="150" cy="140" r="5.5" fill="#1E40AF" />
              <circle cx="330" cy="120" r="5.5" fill="#1E40AF" />
              <circle cx="510" cy="105" r="5.5" fill="#1E40AF" />
              <circle cx="690" cy="85" r="5.5" fill="#1E40AF" />

              <!-- X-Axis Labels -->
              <g class="fill-slate-700 text-xs font-semibold" text-anchor="middle">
                <text x="150" y="225">Regulasi Emosi</text>
                <text x="330" y="225">Empati</text>
                <text x="510" y="225">Komunikasi Asertif</text>
                <text x="690" y="225">De-eskalasi Konflik</text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <!-- 5. Section: Daftar Siswa yang Dipantau -->
      <div class="bg-white rounded-3xl md:rounded-[32px] p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 class="text-2xl font-bold text-[#1E40AF] tracking-tight">
              Daftar Siswa Terdaftar
            </h2>
            <p class="text-slate-500 text-sm mt-0.5">
              Siswa yang tergabung dalam kode kelas Anda.
            </p>
          </div>
          <span class="text-xs font-bold px-3 py-1.5 rounded-xl bg-blue-50 text-[#1E40AF] border border-blue-200 w-fit">
            Total: {{ filteredStudents.length }} Siswa
          </span>
        </div>

        <div v-if="filteredStudents.length > 0" class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr class="border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th class="py-3.5 px-4">Nama Siswa</th>
                <th class="py-3.5 px-4">Kelas</th>
                <th class="py-3.5 px-4">Status Asesmen</th>
                <th class="py-3.5 px-4">Gaya Dominan</th>
                <th class="py-3.5 px-4">Risiko Konflik</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm">
              <tr v-for="s in filteredStudents" :key="s.id" class="hover:bg-slate-50/70 transition-colors">
                <td class="py-4 px-4 font-bold text-slate-900">{{ s.name }}</td>
                <td class="py-4 px-4 text-slate-600 font-medium">{{ s.class }}</td>
                <td class="py-4 px-4">
                  <span
                    class="px-2.5 py-1 rounded-lg text-xs font-bold"
                    :class="s.assessmentStatus === 'Selesai' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'"
                  >
                    {{ s.assessmentStatus }}
                  </span>
                </td>
                <td class="py-4 px-4 font-semibold text-slate-700">{{ s.dominantType || '-' }}</td>
                <td class="py-4 px-4">
                  <span
                    class="px-2.5 py-1 rounded-lg text-xs font-bold"
                    :class="s.conflictRisk === 'Rendah' ? 'bg-emerald-100 text-emerald-700' : s.conflictRisk === 'Sedang' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'"
                  >
                    {{ s.conflictRisk || 'Rendah' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty state jika belum ada siswa terdaftar pada kode kelas ini -->
        <div v-else class="text-center py-10 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <div class="w-12 h-12 rounded-full bg-blue-100 text-[#1E40AF] mx-auto flex items-center justify-center mb-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <p class="font-bold text-slate-800 text-base mb-1">Belum Ada Siswa Bergabung</p>
          <p class="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
            Bagikan kode kelas Anda ke siswa untuk mulai memantau hasil asesmen resolusi konflik mereka.
          </p>
        </div>
      </div>

      <!-- 6. Section: Laporan Dampak Program -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-4 sm:gap-5 flex-1">
          <div class="w-14 h-14 rounded-2xl bg-[#DCE9FE] text-[#1E40AF] flex items-center justify-center shrink-0 shadow-xs">
            <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-xl sm:text-2xl font-bold text-[#1E40AF] mb-1">
              Laporan Dampak Program
            </h3>
            <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Unduh laporan lengkap hasil program dalam format PDF untuk disampaikan kepada Kepala Sekolah atau Orang tua Siswa.
            </p>
          </div>
        </div>

        <button
          @click="downloadReport"
          type="button"
          class="bg-[#1E40AF] hover:bg-blue-800 active:scale-95 text-white font-bold px-7 py-3.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap text-sm sm:text-base shrink-0"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
          <span>Unduh Laporan PDF</span>
        </button>
      </div>
    </div>

    <!-- Floating Support -->
    <FloatingSupport />
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import DashboardLayout from '../../components/layouts/DashboardLayout.vue'
import FloatingSupport from '../../components/dashboard/FloatingSupport.vue'
import { api, isMockMode } from '../../services/api'

interface StudentMonitoringItem {
  id: string
  name: string
  class: string
  assessmentStatus: string
  dominantType?: string
  conflictRisk?: string
  points?: number
}

const teacherName = ref('Ahmat Mundakir')
const teacherInitials = ref('AM')
const teacherSchool = ref('')
const teacherClassCode = ref('')

const teacherMenuItems = [
  { label: 'Dashboard', path: '/dashboard_guru' },
  { label: 'Monitoring', path: '/monitoring_guru' },
  { label: 'Amigo', path: '/amigo' },
  { label: 'Action Toolkit', path: '/action-toolkit' }
]

const selectedClass = ref('Semua Kelas')
const selectedPeriod = ref('Pre-test & Post-test')

const indicators = ref([
  { name: 'Regulasi Emosi', icon: '😊', pre: 42, post: 54 },
  { name: 'Empati', icon: '👥', pre: 55, post: 65 },
  { name: 'Komunikasi Asertif', icon: '💬', pre: 52, post: 66 },
  { name: 'De-eskalasi Konflik', icon: '🛡️', pre: 57, post: 68 }
])

const allStudents = ref<StudentMonitoringItem[]>([])

onMounted(async () => {
  // 1. Ambil data profil guru dari sesi login
  try {
    const raw = localStorage.getItem('tanggap_user')
    if (raw) {
      const u = JSON.parse(raw)
      if (u.name) teacherName.value = u.name
      if (u.school) teacherSchool.value = u.school
      if (u.classCode) teacherClassCode.value = u.classCode
      teacherInitials.value = (u.name || 'Guru')
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    }
  } catch (err) {
    console.warn('Error reading teacher session:', err)
  }

  // 2. Fetch overview & monitoring data jika bukan mock
  if (!isMockMode()) {
    try {
      const [overviewRes, monitoringRes] = await Promise.allSettled([
        api.get<{ success?: boolean; indicatorStats?: any[] }>('teacher/dashboard-overview'),
        api.get<{ success?: boolean; data?: StudentMonitoringItem[] }>('teacher/monitoring')
      ])

      if (overviewRes.status === 'fulfilled' && overviewRes.value?.indicatorStats) {
        indicators.value = overviewRes.value.indicatorStats.map((item: any) => ({
          ...item,
          icon: item.name.includes('Emosi') ? '😊' : item.name.includes('Empati') ? '👥' : item.name.includes('Komunikasi') ? '💬' : '🛡️'
        }))
      }

      if (monitoringRes.status === 'fulfilled' && Array.isArray(monitoringRes.value?.data)) {
        allStudents.value = monitoringRes.value.data
      }
    } catch (err) {
      console.warn('Teacher data fetch fallback:', err)
    }
  }
})

// Filter isolasi: Jika guru memiliki sekolah/kode kelas spesifik, hanya tampilkan siswa sekolah tersebut
const filteredStudents = computed(() => {
  let list = [...allStudents.value]

  // Isolasi berdasarkan sekolah guru jika ada
  if (teacherSchool.value && teacherSchool.value.trim() !== '') {
    const sName = teacherSchool.value.toLowerCase()
    const isolated = list.filter((s) => s.class.toLowerCase().includes(sName))
    // Jika ada siswa yang cocok dengan sekolah guru ini, gunakan isolated list
    if (isolated.length > 0) {
      list = isolated
    }
  }

  // Filter dropdown kelas
  if (selectedClass.value !== 'Semua Kelas') {
    list = list.filter((s) => s.class === selectedClass.value)
  }

  return list
})

const downloadReport = () => {
  alert(`Mengunduh Laporan Dampak Program Tanggap.org untuk ${teacherSchool.value || 'Sekolah'} dalam format PDF...`)
}
</script>
