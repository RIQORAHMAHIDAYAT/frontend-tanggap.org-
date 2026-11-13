<template>
  <AdminLayout>
    <div class="space-y-8 select-none">
      <!-- Title & Subtitle Section -->
      <header class="space-y-2">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Dashboard Admin
        </h1>
        <p class="text-slate-600 text-sm sm:text-base md:text-lg">
          Ringkasan aktivitas dan informasi penting di platform tanggap.org.
        </p>
      </header>

      <!-- 4 Metric Stat Cards (Matching Figma Screenshot 2026-10-29 at 15.21.26.png) -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        <!-- 1. Pengajuan Kerja Sama -->
        <router-link
          to="/dashboard_admin/pengajuan-kerjasama"
          class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-200 transition-all group flex flex-col justify-between"
        >
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0 text-amber-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span class="font-bold text-slate-800 text-sm md:text-base group-hover:text-amber-600 transition-colors">
              Pengajuan Kerja Sama
            </span>
          </div>
          <div class="mt-6">
            <div class="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              {{ metrics.pengajuan }}
            </div>
            <div class="text-xs sm:text-sm font-semibold text-amber-500 mt-2">
              Perlu ditinjau
            </div>
          </div>
        </router-link>

        <!-- 2. Sekolah Aktif -->
        <router-link
          to="/dashboard_admin/manajemen-sekolah"
          class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all group flex flex-col justify-between"
        >
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span class="font-bold text-slate-800 text-sm md:text-base group-hover:text-emerald-600 transition-colors">
              Sekolah Aktif
            </span>
          </div>
          <div class="mt-6">
            <div class="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              {{ metrics.sekolahAktif }}
            </div>
            <div class="text-xs sm:text-sm font-semibold text-emerald-500 mt-2">
              Total sekolah
            </div>
          </div>
        </router-link>

        <!-- 3. Pengguna -->
        <router-link
          to="/dashboard_admin/manajemen-pengguna"
          class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-200 transition-all group flex flex-col justify-between"
        >
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/60 flex items-center justify-center shrink-0 text-blue-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span class="font-bold text-slate-800 text-sm md:text-base group-hover:text-blue-600 transition-colors">
              Pengguna
            </span>
          </div>
          <div class="mt-6">
            <div class="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              {{ metrics.pengguna }}
            </div>
            <div class="text-xs sm:text-sm font-semibold text-blue-500 mt-2">
              Total akun
            </div>
          </div>
        </router-link>

        <!-- 4. Kelas -->
        <router-link
          to="/dashboard_admin/manajemen-kelas"
          class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-purple-200 transition-all group flex flex-col justify-between"
        >
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200/60 flex items-center justify-center shrink-0 text-purple-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span class="font-bold text-slate-800 text-sm md:text-base group-hover:text-purple-600 transition-colors">
              Kelas
            </span>
          </div>
          <div class="mt-6">
            <div class="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              {{ metrics.kelas }}
            </div>
            <div class="text-xs sm:text-sm font-semibold text-purple-500 mt-2">
              Total kelas
            </div>
          </div>
        </router-link>
      </section>

      <!-- 2 Bottom Cards: Aktivitas Assessment & Pengajuan Terbaru -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
        <!-- Aktivitas Assessment (Bar Chart Card) -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          <div class="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Aktivitas Assessment
              </h2>
              <p class="text-slate-500 text-xs sm:text-sm mt-0.5">
                Grafik aktivitas (30 hari terakhir)
              </p>
            </div>
            <router-link
              to="/dashboard_admin/monitoring-assessment"
              class="text-blue-600 hover:text-blue-800 font-semibold text-xs sm:text-sm flex items-center gap-1 transition-colors"
            >
              <span>Lihat detail</span>
              <span>→</span>
            </router-link>
          </div>

          <!-- Bar Chart Visualization -->
          <div class="pt-4">
            <div class="relative h-56 sm:h-64 flex flex-col justify-between">
              <!-- Y-Axis Gridlines & Labels -->
              <div class="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div v-for="grid in [100, 75, 50, 25, 0]" :key="grid" class="flex items-center gap-3">
                  <span class="w-6 text-right text-xs font-medium text-slate-400 select-none">
                    {{ grid }}
                  </span>
                  <div class="flex-1 border-b border-slate-100"></div>
                </div>
              </div>

              <!-- Bars Column Container -->
              <div class="h-full ml-9 flex items-end justify-around relative z-10 pt-2 pb-1">
                <div
                  v-for="(cat, idx) in chartData"
                  :key="idx"
                  class="flex flex-col items-center h-full justify-end group cursor-pointer"
                >
                  <!-- Paired Bars -->
                  <div class="flex items-end gap-1.5 sm:gap-2 h-full pb-1">
                    <!-- Light Blue Bar -->
                    <div
                      class="w-4 sm:w-5 bg-[#60A5FA] rounded-t-md transition-all duration-500 group-hover:opacity-90"
                      :style="{ height: `${cat.val1}%` }"
                      :title="`${cat.label} (Pre): ${cat.val1}`"
                    ></div>
                    <!-- Darker Blue Bar -->
                    <div
                      class="w-4 sm:w-5 bg-[#1E40AF] rounded-t-md transition-all duration-500 group-hover:opacity-90"
                      :style="{ height: `${cat.val2}%` }"
                      :title="`${cat.label} (Post): ${cat.val2}`"
                    ></div>
                  </div>
                  <!-- Category Label -->
                  <span class="text-[10px] sm:text-xs text-slate-600 font-medium mt-2 text-center max-w-[70px] sm:max-w-[85px] leading-tight truncate">
                    {{ cat.label }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pengajuan Terbaru (List Card) -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          <div class="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Pengajuan Terbaru
              </h2>
            </div>
            <router-link
              to="/dashboard_admin/pengajuan-kerjasama"
              class="text-blue-600 hover:text-blue-800 font-semibold text-xs sm:text-sm flex items-center gap-1 transition-colors"
            >
              <span>Lihat detail</span>
              <span>→</span>
            </router-link>
          </div>

          <!-- Items Container -->
          <div class="bg-[#F8FAFC] rounded-2xl p-4 sm:p-5 divide-y divide-slate-100">
            <div
              v-for="(item, idx) in recentSubmissions"
              :key="idx"
              class="py-3.5 first:pt-1 last:pb-1 flex items-center justify-between gap-3"
            >
              <div class="flex items-center gap-3 min-w-0">
                <!-- School Blue Icon Circle -->
                <div class="w-11 h-11 rounded-2xl bg-blue-100/70 text-[#1E40AF] flex items-center justify-center shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div class="min-w-0">
                  <h4 class="font-bold text-slate-900 text-sm sm:text-base truncate">
                    {{ item.schoolName }}
                  </h4>
                  <p class="text-xs text-slate-500 mt-0.5">
                    {{ item.date }}
                  </p>
                </div>
              </div>

              <!-- Status Badge -->
              <span
                class="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold shrink-0"
                :class="statusBadgeClass(item.status)"
              >
                {{ item.status }}
              </span>
            </div>

            <!-- Empty state jika belum ada data -->
            <div
              v-if="recentSubmissions.length === 0"
              class="py-8 text-center text-slate-400 text-sm font-medium"
            >
              Belum ada data pengajuan sekolah.
            </div>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '../../components/layouts/AdminLayout.vue'
import { api, isMockMode } from '../../services/api'

interface AdminDashboardMetrics {
  pengajuan: number
  sekolahAktif: number
  pengguna: number
  kelas: number
}

// Gunakan cache persisten dari database nyata agar saat di-refresh tidak ada 'flash' data dummy
const getCachedMetrics = (): AdminDashboardMetrics => {
  try {
    const raw = localStorage.getItem('tanggap_admin_metrics_cache')
    if (raw) return JSON.parse(raw)
  } catch {}
  return {
    pengajuan: 0,
    sekolahAktif: 0,
    pengguna: 0,
    kelas: 0
  }
}

const metrics = ref<AdminDashboardMetrics>(getCachedMetrics())

const defaultChartData = [
  { label: 'Regulasi Emosi', val1: 0, val2: 0 },
  { label: 'Empati', val1: 0, val2: 0 },
  { label: 'Komunikasi Asertif', val1: 0, val2: 0 },
  { label: 'De-eskalasi', val1: 0, val2: 0 }
]

const getCachedChartData = () => {
  try {
    const raw = localStorage.getItem('tanggap_admin_chart_cache')
    if (raw) return JSON.parse(raw)
  } catch {}
  return defaultChartData
}

const chartData = ref(getCachedChartData())

const getInitialRecentSubmissions = () => {
  try {
    const rawCache = localStorage.getItem('tanggap_admin_recent_cache')
    if (rawCache) {
      const parsed = JSON.parse(rawCache)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {}
  return []
}

const recentSubmissions = ref(getInitialRecentSubmissions())

onMounted(async () => {
  if (isMockMode()) return

  try {
    const [statsRes, leadsRes] = await Promise.allSettled([
      api.get<{ success?: boolean; data?: any }>('admin/dashboard-stats'),
      api.get<{ success?: boolean; data?: any[] }>('leads')
    ])

    // 1. Update Metrics & Chart dari data riil MySQL
    if (statsRes.status === 'fulfilled' && statsRes.value?.data) {
      const d = statsRes.value.data
      const newMetrics: AdminDashboardMetrics = {
        pengajuan: d.metrics?.pengajuan ?? d.leadsSummary?.menungguDitinjau ?? d.leadsSummary?.total ?? 0,
        sekolahAktif: d.metrics?.sekolahAktif ?? d.totalSchools ?? 0,
        pengguna: d.metrics?.pengguna ?? d.totalUsers ?? 0,
        kelas: d.metrics?.kelas ?? d.totalSimulations ?? 0
      }
      metrics.value = newMetrics
      try {
        localStorage.setItem('tanggap_admin_metrics_cache', JSON.stringify(newMetrics))
      } catch {}

      if (Array.isArray(d.chartData) && d.chartData.length > 0) {
        chartData.value = d.chartData
        try {
          localStorage.setItem('tanggap_admin_chart_cache', JSON.stringify(d.chartData))
        } catch {}
      }
    }

    // 2. Update Recent Submissions dari data riil MySQL
    let realLeads: any[] = []
    if (leadsRes.status === 'fulfilled' && Array.isArray(leadsRes.value?.data)) {
      realLeads = leadsRes.value.data
    } else if (statsRes.status === 'fulfilled' && Array.isArray(statsRes.value?.data?.recentSubmissions)) {
      realLeads = statsRes.value.data.recentSubmissions
    }

    if (realLeads.length > 0) {
      const formatted = realLeads.slice(0, 5).map((item) => ({
        schoolName: item.schoolName || item.name || 'Sekolah Mitra',
        date: item.submittedAt || item.createdAt
          ? new Date(item.submittedAt || item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
          : (item.date || item.registrationDate || 'Baru saja'),
        status: item.status || 'Menunggu ditinjau'
      }))
      recentSubmissions.value = formatted
      try {
        localStorage.setItem('tanggap_admin_recent_cache', JSON.stringify(formatted))
      } catch {}
    }
  } catch (err) {
    console.warn('Fallback: gagal mengambil admin dashboard stats:', err)
  }
})

const statusBadgeClass = (status: string) => {
  switch (status) {
    case 'Disetujui':
      return 'bg-[#DCFCE7] text-[#16A34A]'
    case 'Menunggu ditinjau':
      return 'bg-[#FEF3C7] text-[#D97706]'
    case 'Ditolak':
      return 'bg-[#FEE2E2] text-[#EF4444]'
    default:
      return 'bg-slate-100 text-slate-600'
  }
}
</script>

