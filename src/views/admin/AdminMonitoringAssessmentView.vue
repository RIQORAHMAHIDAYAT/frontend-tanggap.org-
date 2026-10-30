<template>
  <AdminLayout>
    <div class="space-y-8 select-none">
      <!-- Title & Subtitle Section -->
      <header class="space-y-2">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Monitoring Assessment
        </h1>
        <p class="text-slate-600 text-sm sm:text-base md:text-lg">
          Pantau aktivitas dan hasil agregat assessment.
        </p>
      </header>

      <!-- 4 Stat Metric Cards (Matching Monitoring Assessment.png) -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        <!-- 1. Total Siswa Mengikuti -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span class="font-bold text-slate-800 text-sm md:text-base">
              Total Siswa Mengikuti
            </span>
          </div>
          <div class="mt-6">
            <div class="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              -
            </div>
          </div>
        </div>

        <!-- 2. Total Assessment -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0 text-amber-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <span class="font-bold text-slate-800 text-sm md:text-base">
              Total Assessment
            </span>
          </div>
          <div class="mt-6">
            <div class="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              -
            </div>
          </div>
        </div>

        <!-- 3. Rata-rata Skor -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200/60 flex items-center justify-center shrink-0 text-cyan-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span class="font-bold text-slate-800 text-sm md:text-base">
              Rata-rata Skor
            </span>
          </div>
          <div class="mt-6">
            <div class="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              -
            </div>
          </div>
        </div>

        <!-- 4. Kenaikan Skor -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200/60 flex items-center justify-center shrink-0 text-purple-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span class="font-bold text-slate-800 text-sm md:text-base">
              Kenaikan Skor
            </span>
          </div>
          <div class="mt-6">
            <div class="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              -
            </div>
          </div>
        </div>
      </section>

      <!-- 2 Bottom Cards: Perbandingan Pre-test & Post-test and Aktivitas Assessment -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
        <!-- Perbandingan Pre-test & Post-test -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          <div class="mb-6">
            <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Perbandingan Pre-test & Post-test
            </h2>
            <!-- Legends matching Figma design -->
            <div class="flex items-center gap-6 mt-3 text-xs sm:text-sm font-semibold text-slate-700">
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
                    <!-- Light Blue Bar (Pre-test) -->
                    <div
                      class="w-4 sm:w-5 bg-[#60A5FA] rounded-t-md transition-all duration-500 group-hover:opacity-90"
                      :style="{ height: `${cat.val1}%` }"
                      :title="`${cat.label} (Pre-test): ${cat.val1}`"
                    ></div>
                    <!-- Darker Blue Bar (Post-test) -->
                    <div
                      class="w-4 sm:w-5 bg-[#1E40AF] rounded-t-md transition-all duration-500 group-hover:opacity-90"
                      :style="{ height: `${cat.val2}%` }"
                      :title="`${cat.label} (Post-test): ${cat.val2}`"
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

        <!-- Aktivitas Assessment (List Card) -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          <div class="mb-6">
            <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Aktivitas Assessment
            </h2>
          </div>

          <!-- Items Container -->
          <div class="bg-[#F8FAFC] rounded-2xl p-4 sm:p-5 divide-y divide-slate-100">
            <div
              v-for="(item, idx) in recentActivities"
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
            </div>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '../../components/layouts/AdminLayout.vue'

const chartData = [
  { label: 'Regulasi Emosi', val1: 42, val2: 53 },
  { label: 'Empati', val1: 54, val2: 64 },
  { label: 'Komunikasi Asertif', val1: 51, val2: 65 },
  { label: 'De-eskalasi Konflik', val1: 56, val2: 67 }
]

const recentActivities = [
  {
    schoolName: 'SMA Harapan Bangsa',
    date: '12 Juni 2026'
  },
  {
    schoolName: 'SMP Nusantara',
    date: '29 Mei 2026'
  },
  {
    schoolName: 'SMK Teknologi Mandiri',
    date: '3 Februari 2026'
  }
]
</script>

