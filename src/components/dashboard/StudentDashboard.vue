<template>
  <div class="space-y-6 lg:space-y-8 select-none">
    <!-- ROW 1: Hero Welcome Banner (Matching dashboard siswa.png) -->
    <div class="bg-white rounded-3xl md:rounded-[32px] p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden relative">
      <!-- Left Content: Greeting & Progress Bar -->
      <div class="flex-1 max-w-xl w-full">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Hai, {{ userName }}
        </h1>
        <p class="text-slate-600 text-sm sm:text-base mt-2 md:mt-3 mb-6 md:mb-8 font-normal">
          Yuk lanjut belajar dan naik level hari ini!
        </p>

        <!-- Progress Bar Box -->
        <div class="bg-[#EEF3F8] rounded-2xl p-4 sm:p-5 max-w-sm sm:max-w-md w-full">
          <div class="flex justify-between items-center text-xs sm:text-sm font-semibold text-slate-800 mb-2.5">
            <span>Progress Bar</span>
            <span class="font-bold text-slate-900">{{ progressPercent }}%</span>
          </div>

          <!-- Progress Track -->
          <div class="bg-white rounded-full h-4 sm:h-5 w-full overflow-hidden p-0.5">
            <div
              class="bg-[#0EA5E9] h-full rounded-full transition-all duration-500"
              :style="{ width: progressPercent + '%' }"
            />
          </div>
        </div>
      </div>

      <!-- Right Content: Discussion Illustration -->
      <div class="shrink-0 max-w-sm lg:max-w-md w-full flex items-center justify-center lg:justify-end">
        <img
          :src="heroStudentsImg"
          alt="Ilustrasi Siswa Berdiskusi"
          class="w-full max-w-[420px] h-auto object-contain select-none pointer-events-none"
        />
      </div>
    </div>

    <!-- ROW 2: Badges (Left) & Points (Right) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      <!-- Card 1: Badges Card -->
      <div class="lg:col-span-8 bg-white rounded-3xl md:rounded-[32px] p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">
          Badges
        </h2>

        <div class="flex items-center justify-between flex-wrap gap-4 sm:gap-6 my-auto">
          <!-- 4 Badges Medals -->
          <div class="flex items-center gap-3 sm:gap-6 overflow-x-auto py-1">
            <img
              :src="badgesStripImg"
              alt="Lencana Prestasi Siswa"
              class="h-16 sm:h-18 md:h-20 w-auto object-contain select-none"
            />
          </div>

          <!-- Action link: Lihat semua -->
          <button
            type="button"
            @click="showAllBadgesModal = true"
            class="text-[#1E40AF] hover:underline font-bold text-sm sm:text-base cursor-pointer shrink-0 transition-colors focus:outline-none"
          >
            Lihat semua
          </button>
        </div>
      </div>

      <!-- Card 2: Points Card -->
      <div class="lg:col-span-4 bg-white rounded-3xl md:rounded-[32px] p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center">
        <div class="text-6xl sm:text-7xl font-extrabold text-slate-900 leading-none tracking-tight">
          {{ points }}
        </div>
        <div class="text-slate-600 font-medium text-sm sm:text-base mt-2">
          Points
        </div>
      </div>
    </div>

    <!-- ROW 3: AMIGO & Action Toolkit Promotion Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      <!-- AMIGO Card -->
      <div class="bg-white rounded-3xl md:rounded-[32px] p-6 sm:p-8 md:p-9 border border-slate-200/80 shadow-xs flex flex-col justify-between group hover:shadow-md transition-shadow">
        <div>
          <!-- AMIGO Illustration Header -->
          <div class="mb-6 flex items-center justify-start">
            <img
              :src="amigoStudentsImg"
              alt="Ilustrasi AMIGO Boardgame"
              class="h-28 sm:h-32 w-auto object-contain rounded-2xl select-none"
            />
          </div>

          <h3 class="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
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

      <!-- Action Toolkit Card -->
      <div class="bg-white rounded-3xl md:rounded-[32px] p-6 sm:p-8 md:p-9 border border-slate-200/80 shadow-xs flex flex-col justify-between group hover:shadow-md transition-shadow">
        <div>
          <!-- Action Toolkit Document & Pencil Icon Header -->
          <div class="mb-6 flex items-center justify-start">
            <img
              :src="actionToolkitIconImg"
              alt="Ikon Action Toolkit"
              class="h-20 sm:h-24 w-auto object-contain select-none"
            />
          </div>

          <h3 class="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
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

    <!-- Modal Lihat Semua Badges -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showAllBadgesModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-xs"
        @click.self="showAllBadgesModal = false"
      >
        <div class="bg-white rounded-[32px] sm:rounded-[36px] max-w-[560px] w-full p-7 sm:p-9 md:p-10 shadow-2xl border border-slate-100 relative text-left">
          <h3 class="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
            Lencana Prestasi (Badges)
          </h3>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            Dapatkan berbagai lencana penghargaan dengan menyelesaikan tantangan pembelajaran dan assessment di Tanggap.org.
          </p>

          <div class="bg-[#EEF3F8] rounded-2xl p-5 mb-6 flex items-center justify-center">
            <img
              :src="badgesStripImg"
              alt="Koleksi Badges"
              class="h-20 w-auto object-contain"
            />
          </div>

          <div class="flex justify-end">
            <button
              @click="showAllBadgesModal = false"
              type="button"
              class="bg-[#1E40AF] hover:bg-blue-800 active:scale-95 text-white font-bold px-8 py-3 rounded-xl shadow-md transition-all cursor-pointer text-sm sm:text-base"
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

// Import cropped precision assets
import heroStudentsImg from '../../assets/dashboard/hero_students.png'
import badgesStripImg from '../../assets/dashboard/badges_strip.png'
import amigoStudentsImg from '../../assets/dashboard/amigo_students.png'
import actionToolkitIconImg from '../../assets/dashboard/action_toolkit_icon.png'

withDefaults(
  defineProps<{
    userName?: string
    progressPercent?: number
    points?: number
  }>(),
  {
    userName: 'Ahmat Fauzy',
    progressPercent: 0,
    points: 0
  }
)

const showAllBadgesModal = ref(false)
</script>
