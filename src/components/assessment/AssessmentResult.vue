<template>
  <div class="min-h-screen bg-[#FAF9FF] font-sans text-slate-800 antialiased py-6 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 selection:bg-blue-100 selection:text-blue-900">
    <div class="max-w-4xl mx-auto">
      
      <!-- Top Navigation: Kembali -->
      <div class="mb-6 sm:mb-8">
        <button
          @click="$emit('back')"
          type="button"
          class="inline-flex items-center gap-2 text-slate-700 hover:text-[#1E40AF] font-medium text-base sm:text-lg transition-colors cursor-pointer group focus:outline-none"
        >
          <span class="transform transition-transform group-hover:-translate-x-1 duration-200">←</span>
          <span>Kembali</span>
        </button>
      </div>

      <!-- CARD 1: Persona Karakter (Matching hasil_ases.png) -->
      <div class="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-slate-200/80 shadow-xs mb-8">
        
        <!-- Category Tag -->
        <span class="text-[#1E40AF] font-bold text-base sm:text-lg tracking-wide block mb-2">
          Hasil Assessment
        </span>

        <!-- Main Heading -->
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
          Persona Karakter
        </h1>

        <!-- Subtitle -->
        <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 md:mb-12">
          Berdasarkan jawaban assessment yang anda pilih.
        </p>

        <!-- Two-Column Grid: Radar Chart & Dominant Traits -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          <!-- LEFT COLUMN: Pure SVG Radar Chart (Spider Chart) -->
          <div class="lg:col-span-6 flex flex-col items-center justify-center select-none py-4">
            <svg
              viewBox="0 0 350 350"
              class="w-full max-w-[320px] sm:max-w-[340px] h-auto overflow-visible"
            >
              <!-- Center is (175, 175), Max Radius is 110 -->
              <!-- Concentric Diamond Grid Rings (25%, 50%, 75%, 100%) -->
              <polygon
                points="175,65 285,175 175,285 65,175"
                fill="none"
                stroke="#E2E8F0"
                stroke-width="1.2"
              />
              <polygon
                points="175,92.5 257.5,175 175,257.5 92.5,175"
                fill="none"
                stroke="#E2E8F0"
                stroke-width="1.2"
              />
              <polygon
                points="175,120 230,175 175,230 120,175"
                fill="none"
                stroke="#E2E8F0"
                stroke-width="1.2"
              />
              <polygon
                points="175,147.5 202.5,175 175,202.5 147.5,175"
                fill="none"
                stroke="#E2E8F0"
                stroke-width="1.2"
              />

              <!-- Axes Lines (Cross) -->
              <line x1="175" y1="65" x2="175" y2="285" stroke="#CBD5E1" stroke-width="1.2" stroke-dasharray="3 3" />
              <line x1="65" y1="175" x2="285" y2="175" stroke="#CBD5E1" stroke-width="1.2" stroke-dasharray="3 3" />

              <!-- Data Polygon (Filled Area) -->
              <polygon
                :points="radarPolygonPoints"
                fill="rgba(59, 130, 246, 0.28)"
                stroke="#1E40AF"
                stroke-width="2.5"
                stroke-linejoin="round"
                class="transition-all duration-700 ease-out"
              />

              <!-- Data Dots at Vertices -->
              <circle :cx="radarPoints.top.x" :cy="radarPoints.top.y" r="4.5" fill="#1E40AF" />
              <circle :cx="radarPoints.right.x" :cy="radarPoints.right.y" r="4.5" fill="#1E40AF" />
              <circle :cx="radarPoints.bottom.x" :cy="radarPoints.bottom.y" r="4.5" fill="#1E40AF" />
              <circle :cx="radarPoints.left.x" :cy="radarPoints.left.y" r="4.5" fill="#1E40AF" />

              <!-- Axis Labels -->
              <!-- Top: Koleris -->
              <text
                x="175"
                y="48"
                text-anchor="middle"
                class="font-semibold text-sm fill-slate-800"
              >
                Koleris
              </text>

              <!-- Right: Melankolis -->
              <text
                x="298"
                y="179"
                text-anchor="start"
                class="font-semibold text-sm fill-slate-800"
              >
                Melankolis
              </text>

              <!-- Bottom: Plegmatis -->
              <text
                x="175"
                y="308"
                text-anchor="middle"
                class="font-semibold text-sm fill-slate-800"
              >
                Plegmatis
              </text>

              <!-- Left: Sanguinis -->
              <text
                x="52"
                y="179"
                text-anchor="end"
                class="font-semibold text-sm fill-slate-800"
              >
                Sanguinis
              </text>
            </svg>
          </div>

          <!-- RIGHT COLUMN: 2 Dominant Traits Cards (Matching hasil_ases.png) -->
          <div class="lg:col-span-6 space-y-5">
            <div
              v-for="trait in resultData.dominantTraits"
              :key="trait.type"
              class="border border-[#1E40AF] rounded-2xl p-5 sm:p-6 bg-white shadow-xs hover:shadow-md transition-shadow"
            >
              <!-- Card Header Row: Icon + Title + Tagline -->
              <div class="flex items-start gap-4 mb-3">
                <!-- Icon Avatar -->
                <div 
                  class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs"
                  :class="trait.iconType === 'flame' ? 'bg-[#FEE2E2] text-[#EF4444]' : 'bg-[#FEF3C7] text-[#F59E0B]'"
                >
                  <!-- Flame Icon (Koleris) -->
                  <svg
                    v-if="trait.iconType === 'flame'"
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.556 11.714C17.063 9.429 15.586 7.571 14.11 6.571c-.246-.143-.493.143-.37.429.617 1.428.617 2.857.247 4.143-.493-1.429-1.356-2.857-2.712-3.857-.246-.143-.616.071-.493.357.74 2.143.123 4.429-1.233 6.143-.986-1.143-1.602-2.571-1.602-4.143 0-.286-.37-.429-.493-.143C6.463 11 6 12.857 6 14.857 6 18.286 8.711 21 12.039 21c3.574 0 6.408-2.714 6.408-6.143 0-1.143-.246-2.143-.891-3.143z"/>
                  </svg>

                  <!-- Sun Icon (Sanguinis) -->
                  <svg
                    v-else
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>

                <div>
                  <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    {{ trait.title }}
                  </h3>
                  <p class="text-xs text-slate-500 mt-1 leading-snug">
                    {{ trait.tagline }}
                  </p>
                </div>
              </div>

              <!-- Paragraph Description -->
              <p class="text-xs sm:text-[13px] text-slate-600 leading-relaxed pt-1">
                {{ trait.description }}
              </p>
            </div>
          </div>

        </div>

      </div>

      <!-- CARD 2: Ringkasan Hasil (Matching hasil_ases.png) -->
      <div class="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-slate-200/80 shadow-xs mb-12">
        <h2 class="text-xl sm:text-2xl font-bold text-[#1E40AF] mb-4 sm:mb-5">
          Ringkasan Hasil
        </h2>

        <h3 class="text-base sm:text-lg font-bold text-slate-900 mb-3">
          {{ resultData.summaryTitle }}
        </h3>

        <div class="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
          <p
            v-for="(para, idx) in resultData.summaryParagraphs"
            :key="idx"
          >
            {{ para }}
          </p>
        </div>
      </div>

      <!-- Bottom Action -->
      <div class="flex justify-center pb-12">
        <button
          @click="$emit('back')"
          type="button"
          class="px-10 py-3.5 rounded-xl bg-[#1E40AF] hover:bg-blue-800 active:scale-95 text-white font-bold text-sm sm:text-base transition-all shadow-sm cursor-pointer focus:outline-none"
        >
          Kembali ke Dashboard
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AssessmentResultData } from '../../data/assessmentQuestions'

const props = defineProps<{
  resultData: AssessmentResultData
}>()

defineEmits<{
  (e: 'back'): void
}>()

// Radar Chart calculations (Center: 175, 175. Max Radius: 110)
const cx = 175
const cy = 175
const maxR = 110

const radarPoints = computed(() => {
  const s = props.resultData.scores

  // Normalisasi skor (0-100) ke radius (min 20% -> max 100%)
  const rTop = ((s.koleris || 70) / 100) * maxR
  const rRight = ((s.melankolis || 45) / 100) * maxR
  const rBottom = ((s.plegmatis || 50) / 100) * maxR
  const rLeft = ((s.sanguinis || 85) / 100) * maxR

  return {
    top: { x: cx, y: cy - rTop },
    right: { x: cx + rRight, y: cy },
    bottom: { x: cx, y: cy + rBottom },
    left: { x: cx - rLeft, y: cy }
  }
})

const radarPolygonPoints = computed(() => {
  const p = radarPoints.value
  return `${p.top.x},${p.top.y} ${p.right.x},${p.right.y} ${p.bottom.x},${p.bottom.y} ${p.left.x},${p.left.y}`
})
</script>
