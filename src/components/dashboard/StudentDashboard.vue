<template>
  <div class="space-y-6 lg:space-y-8 select-none">
    <!-- ROW 1: Unified Student Hero Card (Matching dashboard siswa.1.png) -->
    <div class="bg-white rounded-3xl md:rounded-[32px] p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs">
      <!-- Student Greeting & School Info -->
      <div class="mb-6 sm:mb-8">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E40AF] tracking-tight">
          Hai, {{ userName }}
        </h1>
        <p class="text-slate-600 font-medium text-base sm:text-lg mt-2">
          {{ studentClassInfo }}
        </p>
      </div>

      <!-- 3 Metrics Mini Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <!-- Metric 1: Progres Belajar -->
        <div class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-[#EEF4FF] flex items-center justify-center text-[#1E40AF] shrink-0">
            <!-- Star Icon -->
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-bold text-slate-800 text-sm sm:text-base">
              Progres Belajar
            </div>
            <div class="bg-[#DBEAFE] h-4 rounded-full w-full overflow-hidden mt-1.5 p-0.5">
              <div
                class="bg-[#1E40AF] h-full rounded-full transition-all duration-500"
                :style="{ width: progressPercent + '%' }"
              />
            </div>
          </div>
        </div>

        <!-- Metric 2: Streak -->
        <div class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-[#EEF4FF] flex items-center justify-center text-[#1E40AF] shrink-0">
            <!-- Flame Icon -->
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.61 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM12 20c-3.31 0-6-2.69-6-6 0-1.53.58-2.92 1.54-3.98.54 1.13 1.48 2 2.76 2.37-.19.5-.3 1.04-.3 1.61 0 2.21 1.79 4 4 4s4-1.79 4-4c0-.39-.06-.76-.17-1.11 1.34.87 2.17 2.39 2.17 4.11 0 3.31-2.69 6-6 6z"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-bold text-slate-800 text-sm sm:text-base">
              Streak
            </div>
            <div class="text-xl font-bold text-slate-900 mt-0.5">
              {{ streakDays > 0 ? streakDays + ' Hari' : '--' }}
            </div>
          </div>
        </div>

        <!-- Metric 3: Badge -->
        <div class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-[#EEF4FF] flex items-center justify-center text-[#1E40AF] shrink-0">
            <!-- Ribbon Badge Icon -->
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.69 2 6 4.69 6 8c0 2.25 1.25 4.2 3.09 5.22L7 22l5-3 5 3-2.09-8.78C16.75 12.2 18 10.25 18 8c0-3.31-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-bold text-slate-800 text-sm sm:text-base">
              Badge
            </div>
            <div class="text-xl font-bold text-slate-900 mt-0.5">
              {{ badgesCount > 0 ? badgesCount : '--' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ROW 2: Two Main Student Features Grid (Tantangan Minggu Ini & Kenali Gaya Konflikmu) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      <!-- Card Kiri: Tantangan Minggu Ini -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 md:p-9 border border-slate-200/80 shadow-xs flex flex-col justify-between group hover:shadow-md transition-shadow">
        <div>
          <!-- Bullseye Target Icon in circle -->
          <div class="w-14 h-14 rounded-full bg-[#EEF4FF] flex items-center justify-center text-[#1E40AF] mb-5">
            <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>

          <h3 class="text-2xl font-bold text-[#1E40AF] mb-2">
            Tantangan Minggu Ini
          </h3>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            Selesaikan tantangan untuk mendapatkan badge dan terus tingkatkan skill kamu!
          </p>
        </div>

        <div>
          <button
            @click="showChallengeModal = true"
            type="button"
            class="bg-[#1E40AF] hover:bg-blue-800 active:scale-95 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2 w-fit text-sm sm:text-base"
          >
            <span>Lihat Tantangan</span>
            <span class="text-lg">→</span>
          </button>
        </div>
      </div>

      <!-- Card Kanan: Kenali Gaya Konflikmu -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 md:p-9 border border-slate-200/80 shadow-xs flex flex-col justify-between group hover:shadow-md transition-shadow">
        <div>
          <!-- Brain / Conflict Style Icon in circle -->
          <div class="w-14 h-14 rounded-full bg-[#EEF4FF] flex items-center justify-center text-[#1E40AF] mb-5">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>

          <h3 class="text-2xl font-bold text-[#1E40AF] mb-2">
            Kenali Gaya Konflikmu
          </h3>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            Conflict Style Assessment, Kenali cara kamu merespons konflik
          </p>
        </div>

        <div>
          <router-link
            to="/assessment"
            class="bg-[#1E40AF] hover:bg-blue-800 active:scale-95 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2 w-fit text-sm sm:text-base"
          >
            <span>Mulai Refleksi</span>
            <span class="text-lg">→</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- ROW 3: Section Akses Cepat (AMIGO & Action Toolkit) -->
    <div>
      <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-6 tracking-tight">
        Akses Cepat
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <!-- AMIGO Card -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 group hover:shadow-md transition-shadow relative overflow-hidden">
          <div class="flex-1 min-w-0">
            <!-- Gamepad Icon in circle -->
            <div class="w-12 h-12 rounded-full bg-[#EEF4FF] flex items-center justify-center text-[#1E40AF] mb-5">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 9 18.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
            </div>

            <h3 class="text-2xl font-bold text-[#1E40AF] mb-2">
              AMIGO
            </h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-6">
              Kenali AMIGO dan eksplrorasi cara bermainnya.
            </p>

            <router-link
              to="/amigo"
              class="inline-flex items-center gap-2 text-[#1E40AF] hover:text-blue-800 font-bold text-base transition-transform group-hover:translate-x-1 duration-200"
            >
              <span>Jelajahi AMIGO</span>
              <span class="text-lg">→</span>
            </router-link>
          </div>

          <!-- AMIGO 3D Illustration -->
          <div class="shrink-0">
            <img
              :src="amigoBoxImg"
              alt="AMIGO Boardgame 3D"
              class="w-44 sm:w-52 h-auto object-contain select-none pointer-events-none"
            />
          </div>
        </div>

        <!-- Action Toolkit Card -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 group hover:shadow-md transition-shadow relative overflow-hidden">
          <div class="flex-1 min-w-0">
            <!-- Folder Icon in circle -->
            <div class="w-12 h-12 rounded-full bg-[#EEF4FF] flex items-center justify-center text-[#1E40AF] mb-5">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
              </svg>
            </div>

            <h3 class="text-2xl font-bold text-[#1E40AF] mb-2">
              Action Toolkit
            </h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-6">
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

          <!-- Action Toolkit Binder 3D Illustration -->
          <div class="shrink-0">
            <img
              :src="toolkitBinderImg"
              alt="Action Toolkit Binder 3D"
              class="w-44 sm:w-52 h-auto object-contain select-none pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Tantangan Minggu Ini -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showChallengeModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-xs"
        @click.self="showChallengeModal = false"
      >
        <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative text-left">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h3 class="text-xl font-bold text-[#1E40AF]">
              🎯 Tantangan Pekan Ini
            </h3>
            <button
              @click="showChallengeModal = false"
              class="text-slate-400 hover:text-slate-600 p-1 text-xl cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div class="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            <div class="p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
              <p class="font-bold text-[#1E40AF] mb-1">Tantangan 1: Mendengar Aktif</p>
              <p class="text-slate-600 text-sm">Praktikkan mendengarkan teman tanpa memotong pembicaraan minimal 5 menit saat sesi kelompok.</p>
            </div>
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <p class="font-bold text-slate-900 mb-1">Tantangan 2: Refleksi Konflik</p>
              <p class="text-slate-600 text-sm">Selesaikan evaluasi gaya konflik pertama kamu di menu Assessment.</p>
            </div>
          </div>

          <div class="mt-6 flex justify-end">
            <button
              @click="showChallengeModal = false"
              type="button"
              class="bg-[#1E40AF] hover:bg-blue-800 text-white font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer text-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import amigoBoxImg from '../../assets/dashboard/amigo_box_3d.png'
import toolkitBinderImg from '../../assets/dashboard/toolkit_binder_3d.png'

withDefaults(
  defineProps<{
    userName?: string
  }>(),
  {
    userName: 'Siswa'
  }
)

const getSchoolAndClassInfo = () => {
  try {
    const rawUser = localStorage.getItem('tanggap_user')
    const user = rawUser ? JSON.parse(rawUser) : null
    const schoolCode = (localStorage.getItem('tanggap_school_code') || '').toUpperCase()

    const demoMap: Record<string, { school: string; class: string }> = {
      'SMAN1A': { school: 'SMA Harapan Bangsa', class: 'Kelas X-A' },
      '849201': { school: 'SMK Dinamika Kota Banjar', class: 'Kelas XII D' },
      'DEMO01': { school: 'SMP Nusantara', class: 'Kelas VII-C' }
    }

    if (schoolCode && demoMap[schoolCode]) {
      const match = demoMap[schoolCode]
      return `${match.class} | ${match.school}`
    }

    const rawClasses = localStorage.getItem('tanggap_custom_classes')
    if (rawClasses) {
      const classes = JSON.parse(rawClasses)
      const matched = classes.find((c: any) => c.code.toUpperCase() === schoolCode)
      if (matched) {
        return `${matched.name || 'Kelas Mitra'} | ${matched.school || user?.school || 'Sekolah Mitra'}`
      }
    }

    if (user?.school) {
      return `Siswa | ${user.school}`
    }
  } catch {}
  return 'Kelas XII D | SMK Dinamika Kota Banjar'
}

const studentClassInfo = ref(getSchoolAndClassInfo())
const progressPercent = ref(45)
const streakDays = ref(0)
const badgesCount = ref(0)
const showChallengeModal = ref(false)
</script>