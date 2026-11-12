<template>
  <DashboardLayout>
    <div class="space-y-6 md:space-y-8 select-none">
      <!-- 1. Header Section (Matching amigo.png) -->
      <header class="space-y-2">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E40AF] tracking-tight">
          AMIGO Board Game
        </h1>
        <p class="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
          Media pembelajaran interaktif untuk melatih komunikasi, empati, dan keterampilan menyelesaikan konflik.
        </p>
      </header>

      <!-- 2. Main Card Container with Tabs -->
      <div class="bg-white rounded-3xl md:rounded-[36px] p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs">
        <!-- Navigation Tab Headers (Desktop & Mobile) -->
        <div class="flex items-center gap-4 sm:gap-8 md:gap-12 border-b border-slate-100 overflow-x-auto pb-1 scrollbar-none">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            type="button"
            class="pb-3 text-sm sm:text-base md:text-lg transition-all duration-200 cursor-pointer whitespace-nowrap relative focus:outline-none"
            :class="[
              activeTab === tab.id
                ? 'text-[#1E40AF] font-bold'
                : 'text-slate-600 hover:text-slate-900 font-semibold'
            ]"
          >
            <span>{{ tab.label }}</span>
            <!-- Active indicator underline bar -->
            <span
              v-if="activeTab === tab.id"
              class="absolute bottom-0 left-0 right-0 h-1 bg-[#1E40AF] rounded-full transition-all duration-300"
            />
          </button>
        </div>

        <!-- 3. Tab Contents Inside Light Blue Container -->
        <div class="mt-6 sm:mt-8">
          <!-- TAB 1: Tentang AMIGO (Matching amigo.png & tentang AMIGO.png) -->
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
            mode="out-in"
          >
            <div
              v-if="activeTab === 'tentang'"
              key="tentang"
              class="bg-[#F0F5FF] rounded-3xl p-6 sm:p-8 md:p-12 border border-blue-100/70"
            >
              <!-- Desktop View (Grid 2 Kolom Seimbang) -->
              <div class="hidden md:flex items-center justify-between gap-8 lg:gap-12">
                <div class="flex-1 max-w-xl">
                  <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1E40AF] mb-4 tracking-tight">
                    Tentang AMIGO
                  </h2>
                  <p class="text-slate-600 text-base lg:text-lg leading-relaxed">
                    Amigo adalah media permainan kartu berbasis role-play yang membantu kamu memahami konflik, melatih empati, dan menemukan solusi bersama melalui simulasi situasi solusi yang dekat dengan kehidupan sehari-hari.
                  </p>
                </div>
                <div class="shrink-0">
                  <img
                    :src="amigoBoxImg"
                    alt="Ilustrasi AMIGO Boardgame"
                    class="w-full max-w-[340px] lg:max-w-[420px] h-auto object-contain pointer-events-none select-none"
                  />
                </div>
              </div>

              <!-- Mobile View (Stacked matching tentang AMIGO.png) -->
              <div class="md:hidden flex flex-col items-start text-left">
                <h2 class="text-2xl font-extrabold text-[#1E40AF] mb-4">
                  Tentang AMIGO
                </h2>
                <div class="w-full flex justify-center my-4">
                  <img
                    :src="amigoBoxImg"
                    alt="Ilustrasi AMIGO Boardgame"
                    class="w-full max-w-[280px] h-auto object-contain pointer-events-none select-none"
                  />
                </div>
                <p class="text-slate-600 text-sm sm:text-base leading-relaxed mt-2">
                  Amigo adalah media permainan kartu berbasis role-play yang membantu kamu memahami konflik, melatih empati, dan menemukan solusi bersama melalui simulasi situasi solusi yang dekat dengan kehidupan sehari-hari.
                </p>
              </div>
            </div>

            <!-- TAB 2: Mekanisme & Aturan Main (Matching Mekanisme & Aturan Main.png) -->
            <div
              v-else-if="activeTab === 'mekanisme'"
              key="mekanisme"
              class="bg-[#F0F5FF] rounded-3xl p-6 sm:p-8 md:p-12 border border-blue-100/70"
            >
              <!-- Desktop View (Kiri: Ilustrasi AMIGO, Kanan: 4 Langkah Aturan) -->
              <div class="hidden md:flex items-center justify-between gap-8 lg:gap-12">
                <div class="shrink-0 flex items-center justify-center">
                  <img
                    :src="amigoBoxImg"
                    alt="Ilustrasi AMIGO Boardgame"
                    class="w-full max-w-[320px] lg:max-w-[380px] h-auto object-contain pointer-events-none select-none"
                  />
                </div>

                <div class="flex-1 max-w-xl">
                  <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1E40AF] mb-6 tracking-tight">
                    Mekanisme & Aturan Main
                  </h2>

                  <!-- 4 Numbered Steps -->
                  <div class="space-y-5">
                    <div
                      v-for="step in steps"
                      :key="step.number"
                      class="flex items-start gap-4"
                    >
                      <div class="w-10 h-10 rounded-full bg-[#1E40AF] text-white font-extrabold text-base flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                        {{ step.number }}
                      </div>
                      <div>
                        <h3 class="text-base sm:text-lg font-bold text-[#1E40AF] leading-snug">
                          {{ step.title }}
                        </h3>
                        <p class="text-slate-600 text-xs sm:text-sm mt-0.5 leading-relaxed">
                          {{ step.description }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Mobile View (Stacked matching Mekanisme & Aturan Main.hp.png) -->
              <div class="md:hidden flex flex-col items-start text-left">
                <h2 class="text-2xl font-extrabold text-[#1E40AF] mb-6">
                  Mekanisme & Aturan Main
                </h2>

                <div class="space-y-5 w-full">
                  <div
                    v-for="step in steps"
                    :key="step.number"
                    class="flex items-start gap-4"
                  >
                    <div class="w-10 h-10 rounded-full bg-[#1E40AF] text-white font-extrabold text-base flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      {{ step.number }}
                    </div>
                    <div>
                      <h3 class="text-base font-bold text-[#1E40AF] leading-snug">
                        {{ step.title }}
                      </h3>
                      <p class="text-slate-600 text-xs sm:text-sm mt-0.5 leading-relaxed">
                        {{ step.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- TAB 3: Video Tutorial (Matching Video Tutorial.png & .hp.png) -->
            <div
              v-else-if="activeTab === 'video'"
              key="video"
              class="bg-[#F0F5FF] rounded-3xl p-6 sm:p-8 md:p-12 border border-blue-100/70"
            >
              <!-- Desktop View (Kiri: Thumbnail Video dengan Tombol Play, Kanan: Judul & Subtitle) -->
              <div class="hidden md:flex items-center justify-between gap-8 lg:gap-12">
                <!-- Thumbnail Video with interactive play button -->
                <div
                  @click="openVideoModal"
                  class="shrink-0 relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group max-w-lg w-full"
                  title="Putar Video Tutorial"
                >
                  <img
                    :src="videoTutorialImg"
                    alt="Video Tutorial Bermain AMIGO"
                    class="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <!-- Hover subtle overlay effect -->
                  <div class="absolute inset-0 bg-[#1E40AF]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div class="flex-1 max-w-lg">
                  <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1E40AF] mb-3 tracking-tight">
                    Video Tutorial Bermain AMIGO
                  </h2>
                  <p class="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                    Tutorial panduan singkat cara bermain AMIGO
                  </p>
                  <button
                    @click="openVideoModal"
                    type="button"
                    class="bg-[#1E40AF] hover:bg-blue-800 active:scale-95 text-white font-bold px-7 py-3 rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2 text-sm sm:text-base"
                  >
                    <span>Tonton Video</span>
                    <span>▶</span>
                  </button>
                </div>
              </div>

              <!-- Mobile View (Stacked matching Video Tutorial.hp.png) -->
              <div class="md:hidden flex flex-col items-start text-left">
                <!-- Thumbnail Video on top -->
                <div
                  @click="openVideoModal"
                  class="w-full relative rounded-2xl overflow-hidden shadow-sm active:scale-98 transition-all cursor-pointer mb-5"
                >
                  <img
                    :src="videoTutorialImg"
                    alt="Video Tutorial Bermain AMIGO"
                    class="w-full h-auto object-cover"
                  />
                </div>

                <h2 class="text-2xl font-extrabold text-[#1E40AF] mb-2 leading-snug">
                  Video Tutorial Bermain AMIGO
                </h2>
                <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                  Tutorial panduan singkat cara bermain AMIGO
                </p>
                <button
                  @click="openVideoModal"
                  type="button"
                  class="bg-[#1E40AF] hover:bg-blue-800 active:scale-95 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2 text-sm"
                >
                  <span>Tonton Video</span>
                  <span>▶</span>
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- Video Modal Player (Interaktif saat video diklik) -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showVideoModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs"
        @click.self="showVideoModal = false"
      >
        <div class="bg-white rounded-3xl max-w-3xl w-full p-4 sm:p-6 shadow-2xl border border-slate-100 relative">
          <!-- Modal Header -->
          <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h3 class="text-lg sm:text-xl font-bold text-[#1E40AF]">
              🎬 Video Panduan AMIGO Board Game
            </h3>
            <button
              @click="showVideoModal = false"
              class="text-slate-400 hover:text-slate-700 p-1 text-2xl leading-none cursor-pointer"
              title="Tutup Video"
              aria-label="Tutup Video"
            >
              ✕
            </button>
          </div>

          <!-- Video Player Container (16:9 Aspect Ratio) -->
          <div class="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center shadow-inner relative">
            <iframe
              class="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/J3z3SimLeh8?autoplay=1"
              title="Video Tutorial AMIGO"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>

          <!-- Modal Footer -->
          <div class="mt-4 flex justify-between items-center text-xs sm:text-sm text-slate-500">
            <span>Panduan resmi dari tim Tanggap.org</span>
            <button
              @click="showVideoModal = false"
              type="button"
              class="text-[#1E40AF] hover:underline font-bold cursor-pointer"
            >
              Selesai Menonton
            </button>
          </div>
        </div>
      </div>
    </transition>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DashboardLayout from '../../components/layouts/DashboardLayout.vue'
import amigoBoxImg from '../../assets/dashboard/amigo_box_3d.png'
import videoTutorialImg from '../../assets/dashboard/amigo_video_tutorial.png'

type TabId = 'tentang' | 'mekanisme' | 'video'

const activeTab = ref<TabId>('tentang')
const showVideoModal = ref(false)

const tabs = [
  { id: 'tentang' as TabId, label: 'Tentang AMIGO' },
  { id: 'mekanisme' as TabId, label: 'Mekanisme & Aturan Main' },
  { id: 'video' as TabId, label: 'Video Tutorial' }
]

const steps = [
  {
    number: 1,
    title: 'Kenali kartu dan jenis permainan',
    description: 'Setiap kartu berisi situasi dan peraan yang berbeda.'
  },
  {
    number: 2,
    title: 'Ikuti langkah demi langkah',
    description: 'Pelajari alur permainan situasi panduan.'
  },
  {
    number: 3,
    title: 'Mainkan bersama',
    description: 'Lakukan role-play dan diskusi kelompok.'
  },
  {
    number: 4,
    title: 'Lakukan refleksi',
    description: 'Diskusikan apa yang kamu pelajari dari permainan.'
  }
]

const openVideoModal = () => {
  showVideoModal.value = true
}
</script>