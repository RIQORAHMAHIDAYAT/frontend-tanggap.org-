<template>
  <div class="min-h-screen bg-[#FAF9FF] font-sans text-slate-800 antialiased py-6 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 selection:bg-blue-100 selection:text-blue-900">
    <div class="max-w-4xl mx-auto">
      
      <!-- Top Navigation: Kembali -->
      <div class="mb-6 sm:mb-8">
        <button
          @click="handleBack"
          type="button"
          class="inline-flex items-center gap-2 text-slate-700 hover:text-[#1E40AF] font-medium text-base sm:text-lg transition-colors cursor-pointer group focus:outline-none"
        >
          <span class="transform transition-transform group-hover:-translate-x-1 duration-200">←</span>
          <span>Kembali</span>
        </button>
      </div>

      <!-- Main White Card Container (Matching isi_ases_00 & isi_ases_01) -->
      <div class="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-slate-200/80 shadow-xs mb-8">
        
        <!-- Category Tag -->
        <span class="text-[#1E40AF] font-bold text-base sm:text-lg tracking-wide block mb-2">
          Assessment
        </span>

        <!-- Main Title -->
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
          {{ currentTitle }}
        </h1>

        <!-- Subtitle Instruction -->
        <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
          Pilih angka yang paling menggambarkan praktik dan pandangan Anda dalam mengajar sehari-hari. (1 = Sangat Tidak Setuju, 7 = Sangat Setuju)
        </p>

        <!-- Progress Indicator Row -->
        <div class="flex items-center justify-between text-xs sm:text-sm text-slate-500 font-medium mb-2">
          <span>Fase {{ currentPhase }} dari {{ totalPhases }}</span>
          <span>{{ progressPercent }}% selesai</span>
        </div>

        <!-- Progress Bar Track -->
        <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-8 sm:mb-12">
          <div
            class="bg-[#1E40AF] h-full rounded-full transition-all duration-500 ease-out"
            :style="{ width: `${progressPercent}%` }"
          />
        </div>

        <!-- Questions List for Current Phase -->
        <div class="space-y-8 sm:space-y-10">
          <div
            v-for="q in currentQuestions"
            :key="q.id"
            class="space-y-3 pt-2"
          >
            <!-- Question Text -->
            <p class="font-medium text-slate-900 text-sm sm:text-base leading-relaxed">
              {{ q.id }}. {{ q.text }}
            </p>

            <!-- 7-Point Likert Radio Scale (Matching isi_ases_00 & isi_ases_01) -->
            <div class="overflow-x-auto pb-1 max-w-full">
              <div class="inline-flex flex-col">
                <!-- Row Lingkaran 1 s/d 7 -->
                <div class="flex items-center gap-2.5 sm:gap-3.5 md:gap-4 shrink-0">
                  <button
                    v-for="val in 7"
                    :key="val"
                    type="button"
                    @click="selectAnswer(q.id, val)"
                    class="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center font-medium text-sm sm:text-base transition-all duration-200 cursor-pointer shrink-0 focus:outline-none"
                    :class="[
                      answers[q.id] === val
                        ? 'bg-[#1E40AF] border-[#1E40AF] text-white shadow-sm'
                        : 'border-[#6B82D8] text-slate-800 bg-white hover:border-[#1E40AF] hover:bg-blue-50/40'
                    ]"
                  >
                    {{ val }}
                  </button>
                </div>

                <!-- Label Keterangan Skala: Rata Kiri Lingkaran 1 & Batas Sisi Kanan Lingkaran 7 -->
                <div class="flex items-center justify-between text-xs sm:text-sm text-slate-400 font-normal mt-2.5 w-full select-none shrink-0">
                  <span>Sangat Tidak Setuju</span>
                  <span class="-translate-x-1">Sangat Setuju</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Navigation Buttons (Matching isi_ases_00 & isi_ases_01) -->
      <div 
        class="flex items-center pb-12"
        :class="currentPhase === 1 ? 'justify-end' : 'justify-between'"
      >
        <!-- Tombol Sebelumnya (Hanya muncul jika fase > 1) -->
        <button
          v-if="currentPhase > 1"
          @click="prevPhase"
          type="button"
          class="px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl border border-[#1E40AF] text-[#1E40AF] font-bold text-sm sm:text-base hover:bg-blue-50/60 active:scale-95 transition-all cursor-pointer focus:outline-none bg-white"
        >
          Sebelumnya
        </button>

        <!-- Tombol Selanjutnya / Selesai -->
        <button
          v-if="currentPhase < totalPhases"
          @click="nextPhase"
          type="button"
          class="px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl bg-[#1E40AF] hover:bg-blue-800 active:scale-95 text-white font-bold text-sm sm:text-base transition-all shadow-sm cursor-pointer focus:outline-none"
        >
          Selanjutnya
        </button>
        <button
          v-else
          @click="submitQuiz"
          type="button"
          class="px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl bg-[#1E40AF] hover:bg-blue-800 active:scale-95 text-white font-bold text-sm sm:text-base transition-all shadow-sm cursor-pointer focus:outline-none"
        >
          Lihat Hasil
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  assessmentQuestions,
  phaseTitles,
  type AssessmentQuestion
} from '../../data/assessmentQuestions'

const emit = defineEmits<{
  (e: 'back'): void
  (e: 'complete', answers: Record<number, number>): void
}>()

const currentPhase = ref(1)
const totalPhases = 4
const answers = ref<Record<number, number>>({})

const currentTitle = computed(() => {
  return phaseTitles[currentPhase.value] || 'Assessment Soal'
})

const currentQuestions = computed<AssessmentQuestion[]>(() => {
  return assessmentQuestions.filter(q => q.phase === currentPhase.value)
})

const progressPercent = computed(() => {
  const answeredCount = Object.keys(answers.value).length
  const totalQuestions = assessmentQuestions.length
  return Math.round((answeredCount / totalQuestions) * 100)
})

const selectAnswer = (questionId: number, value: number) => {
  answers.value[questionId] = value
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const prevPhase = () => {
  if (currentPhase.value > 1) {
    currentPhase.value--
    scrollToTop()
  }
}

const nextPhase = () => {
  if (currentPhase.value < totalPhases) {
    currentPhase.value++
    scrollToTop()
  }
}

const handleBack = () => {
  if (currentPhase.value > 1) {
    prevPhase()
  } else {
    emit('back')
  }
}

const submitQuiz = () => {
  emit('complete', answers.value)
}
</script>
