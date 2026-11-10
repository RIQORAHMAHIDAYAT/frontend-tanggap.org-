<template>
  <div>
    <!-- STATE 0: Belum Masuk Kode (Matching asesment belum masuk kode.png) -->
    <DashboardLayout v-if="!hasSchoolCode">
      <div class="bg-white rounded-3xl md:rounded-[32px] p-8 sm:p-12 md:p-16 border border-slate-200/80 shadow-xs min-h-[460px] md:min-h-[520px] flex items-center justify-center">
        <p class="text-slate-800 text-base sm:text-lg md:text-[19px] text-center leading-relaxed max-w-3xl font-normal">
          Masukkan kode yang diberikan oleh sekolah dan ikuti assessment skill resolusi konflik dengan cermat. Klik 
          <router-link to="/dashboard" class="text-[#1E40AF] font-bold hover:underline inline-block mx-1">
            disini
          </router-link> 
          untuk memasukkan kode.
        </p>
      </div>
    </DashboardLayout>

    <!-- STATE 1 to 3: Sudah Masuk Kode (Assessment Intro, Quiz, Result) -->
    <template v-else>
      <!-- STEP 1: Assessment Intro / Landing (Matching asesment-00.png) -->
      <DashboardLayout v-if="currentStep === 'intro'">
        <!-- HERO / TOP CARD: Assessment Skill Resolusi Konflik -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs">
          <!-- Header row with icon + title + subtitle -->
          <div class="flex items-start gap-4 sm:gap-5 mb-6">
            <!-- Clipboard Checklist Icon -->
            <div class="w-14 h-14 bg-[#1E40AF] rounded-2xl flex items-center justify-center text-white shadow-sm shrink-0">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>

            <div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Assessment Skill Resolusi Konflik
              </h1>
              <p class="text-slate-500 text-sm sm:text-base mt-1">
                Jawab pertanyaan untuk membantu mengukur keterampilan resolusi konflikmu.
              </p>
            </div>
          </div>

          <!-- Main Row: Description & CTA (Left) + Progress Tracker (Right) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
            <!-- Left Side: Explanatory text & CTA -->
            <div class="lg:col-span-7 flex flex-col justify-between">
              <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                Assessment ini membantu kamu mengenali keterampilan dalam menghadapi konflik, seperti memahami masalah, mengelola emosi, berkomunikasi, dan mencari solusi bersama.
              </p>

              <div>
                <button
                  @click="startAssessment"
                  type="button"
                  class="bg-[#1E40AF] hover:bg-blue-800 text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer focus:outline-none"
                >
                  <span>{{ progressPercent === 100 ? 'Ulangi Assessment' : 'Mulai Assessment' }}</span>
                </button>
              </div>
            </div>

            <!-- Right Side: Progres Pengerjaan Widget -->
            <div class="lg:col-span-5">
              <div class="bg-slate-100 rounded-2xl p-6 sm:p-7 border border-slate-200/70 shadow-xs">
                <h3 class="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  Progres Pengerjaan
                </h3>
                <p class="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                  {{ progressPercent === 100 ? 'Selamat! Kamu sudah menyelesaikan seluruh assessment.' : progressPercent > 0 ? `Kamu telah menyelesaikan ${progressPercent}% soal.` : 'Kamu belum mengisi assessment. Yuk mulai sekarang.' }}
                </p>

                <!-- Percent label -->
                <div class="text-sm font-bold text-slate-800 mb-2">
                  {{ progressPercent }}%
                </div>

                <!-- Outer Progress Bar Track -->
                <div class="w-full bg-white h-5 rounded-full border border-slate-300/80 p-0.5 overflow-hidden">
                  <div
                    class="bg-[#0EA5E9] h-full rounded-full transition-all duration-500"
                    :style="{ width: `${progressPercent}%` }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 2: Kenapa Assessment Ini Penting? -->
        <div class="mt-10 md:mt-12">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 md:mb-8">
            Kenapa Assessment Ini Penting?
          </h2>

          <!-- 4 Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <!-- Card 1: Meningkatkan kesadaran diri -->
            <div class="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col items-center text-center hover:shadow-md transition-all">
              <div class="w-14 h-14 bg-[#1E40AF] rounded-2xl flex items-center justify-center text-white mb-5 shadow-sm">
                <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <p class="font-medium text-slate-800 text-sm sm:text-base leading-snug">
                Meningkatkan kesadaran diri
              </p>
            </div>

            <!-- Card 2: Membangun keterampilan sosial -->
            <div class="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col items-center text-center hover:shadow-md transition-all">
              <div class="w-14 h-14 bg-[#1E40AF] rounded-2xl flex items-center justify-center text-white mb-5 shadow-sm">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <p class="font-medium text-slate-800 text-sm sm:text-base leading-snug">
                Membangun keterampilan sosial
              </p>
            </div>

            <!-- Card 3: Mendukung lingkungan sekolah yang lebih baik -->
            <div class="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col items-center text-center hover:shadow-md transition-all">
              <div class="w-14 h-14 bg-[#1E40AF] rounded-2xl flex items-center justify-center text-white mb-5 shadow-sm">
                <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <p class="font-medium text-slate-800 text-sm sm:text-base leading-snug">
                Mendukung lingkungan sekolah yang lebih baik
              </p>
            </div>

            <!-- Card 4: Membantu kamu menghadapi konflik dengan lebih bijak -->
            <div class="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col items-center text-center hover:shadow-md transition-all">
              <div class="w-14 h-14 bg-[#1E40AF] rounded-2xl flex items-center justify-center text-white mb-5 shadow-sm">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p class="font-medium text-slate-800 text-sm sm:text-base leading-snug">
                Membantu kamu menghadapi konflik dengan lebih bijak
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>

      <!-- STEP 2: Interactive Questionnaire (Matching isi_ases_00.png & isi_ases_01.png) -->
      <AssessmentQuiz
        v-else-if="currentStep === 'quiz'"
        @back="currentStep = 'intro'"
        @complete="onQuizComplete"
      />

      <!-- STEP 3: Assessment Result (Matching hasil_ases.png) -->
      <AssessmentResult
        v-else-if="currentStep === 'result' && calculatedResult"
        :result-data="calculatedResult"
        @back="currentStep = 'intro'"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import DashboardLayout from '../../components/layouts/DashboardLayout.vue'
import AssessmentQuiz from '../../components/assessment/AssessmentQuiz.vue'
import AssessmentResult from '../../components/assessment/AssessmentResult.vue'
import {
  calculateAssessmentResult,
  type AssessmentResultData
} from '../../data/assessmentQuestions'
import { assessmentService } from '../../services/assessmentService'

const route = useRoute()
const currentStep = ref<'intro' | 'quiz' | 'result'>('intro')
const progressPercent = ref(0)
const calculatedResult = ref<AssessmentResultData | null>(null)
const hasSchoolCode = ref(false)

const checkSchoolStatus = () => {
  if (route.query.status === 'locked') {
    hasSchoolCode.value = false
    return
  }
  if (route.query.status === 'unlocked') {
    hasSchoolCode.value = true
    return
  }

  const saved = localStorage.getItem('tanggap_school_code')
  hasSchoolCode.value = Boolean(saved && saved.trim().length >= 6)
}

watch(
  () => route.query.status,
  () => {
    checkSchoolStatus()
  }
)

onMounted(() => {
  checkSchoolStatus()
  window.addEventListener('storage', checkSchoolStatus)
})

onUnmounted(() => {
  window.removeEventListener('storage', checkSchoolStatus)
})

const startAssessment = () => {
  currentStep.value = 'quiz'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const onQuizComplete = async (answers: Record<number, number>) => {
  // Hitung hasil lokal secara instan agar radar chart langsung tampil sempurna
  calculatedResult.value = calculateAssessmentResult(answers)
  progressPercent.value = 100
  currentStep.value = 'result'
  window.scrollTo({ top: 0, behavior: 'smooth' })

  // Kirimkan jawaban ke backend di background (dengan graceful fallback)
  try {
    const schoolCode = localStorage.getItem('tanggap_school_code') || undefined
    await assessmentService.submitAssessment({
      answers,
      schoolCode,
    })
  } catch (err) {
    console.warn('Backend assessment submission fallback:', err)
  }
}
</script>
