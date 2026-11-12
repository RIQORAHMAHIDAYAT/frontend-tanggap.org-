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
      <!-- STEP 1: Assessment Intro / Landing (Matching New UI) -->
      <DashboardLayout v-if="currentStep === 'intro'">
        <!-- HERO / TOP CARD: Assessment Skill Resolusi Konflik -->
        <div class="bg-white rounded-3xl md:rounded-[36px] p-6 sm:p-8 md:p-12 border border-slate-200/80 shadow-xs">
          <div class="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <!-- Left Side: Title, Subtitle, CTA Button -->
            <div class="w-full lg:w-7/12 text-center lg:text-left flex flex-col items-center lg:items-start">
              <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E40AF] leading-tight mb-4">
                Assessment Skill Resolusi Konflik
              </h1>
              <p class="text-slate-600 text-sm sm:text-base md:text-[17px] leading-relaxed mb-8 max-w-xl">
                Melalui pengukuran keterampilan resolusi konflik , melalui evaluasi diri, dan kelompok untuk memantau efektivitas program.
              </p>
              <button
                @click="startAssessment('general')"
                type="button"
                class="bg-[#1E40AF] hover:bg-blue-800 text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer focus:outline-none text-sm sm:text-base"
              >
                <span>Mulai Assessment</span>
                <span class="text-lg">→</span>
              </button>
            </div>

            <!-- Right Side: Clipboard Checklist Illustration with Leaves and Sparkles -->
            <div class="w-full lg:w-5/12 flex justify-center items-center relative py-2">
              <svg class="w-64 sm:w-72 md:w-80 h-auto select-none" viewBox="0 0 360 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Background Glow / Circle -->
                <circle cx="180" cy="160" r="140" fill="#F0F7FF" />
                
                <!-- Leaves Left & Right -->
                <path d="M70 210C65 170 90 140 120 150C110 180 90 205 70 210Z" fill="#7DD3FC" opacity="0.6"/>
                <path d="M55 170C60 135 85 115 110 130C95 155 75 165 55 170Z" fill="#38BDF8" opacity="0.5"/>
                <path d="M290 210C295 170 270 140 240 150C250 180 270 205 290 210Z" fill="#7DD3FC" opacity="0.6"/>
                <path d="M305 170C300 135 275 115 250 130C265 155 285 165 305 170Z" fill="#38BDF8" opacity="0.5"/>

                <!-- Blue Backing Folder (Dark Blue Layer) -->
                <rect x="185" y="65" width="125" height="195" rx="14" transform="rotate(7 185 65)" fill="#1E40AF" opacity="0.95" />

                <!-- Main White Clipboard Sheet -->
                <rect x="110" y="60" width="145" height="205" rx="12" fill="#FFFFFF" stroke="#93C5FD" stroke-width="3" />

                <!-- Top Clipboard Clamp Header -->
                <rect x="145" y="46" width="75" height="28" rx="7" fill="#0284C7" />
                <path d="M172 40C172 36 175 33 182.5 33C190 33 193 36 193 40" stroke="#0284C7" stroke-width="4" stroke-linecap="round" fill="none" />
                <circle cx="182.5" cy="54" r="4" fill="#FFFFFF" />

                <!-- 4 Checklist Items -->
                <!-- Item 1 -->
                <rect x="126" y="96" width="16" height="16" rx="4" fill="#0284C7" />
                <path d="M129.5 104L133.5 108L139 101" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                <rect x="150" y="100" width="80" height="7" rx="3.5" fill="#93C5FD" />

                <!-- Item 2 -->
                <rect x="126" y="126" width="16" height="16" rx="4" fill="#0284C7" />
                <path d="M129.5 134L133.5 138L139 131" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                <rect x="150" y="130" width="85" height="7" rx="3.5" fill="#93C5FD" />

                <!-- Item 3 -->
                <rect x="126" y="156" width="16" height="16" rx="4" fill="#0284C7" />
                <path d="M129.5 164L133.5 168L139 161" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                <rect x="150" y="160" width="70" height="7" rx="3.5" fill="#93C5FD" />

                <!-- Item 4 -->
                <rect x="126" y="186" width="16" height="16" rx="4" fill="#0284C7" />
                <path d="M129.5 194L133.5 198L139 191" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                <rect x="150" y="190" width="82" height="7" rx="3.5" fill="#93C5FD" />

                <!-- Bottom Right Watermark Seal -->
                <circle cx="225" cy="235" r="13" fill="#BAE6FD" opacity="0.6" />

                <!-- Decorative floating particles -->
                <!-- Yellow Sparkle Top-Left -->
                <path d="M85 95Q85 103 77 103Q85 103 85 111Q85 103 93 103Q85 103 85 95Z" fill="#FBBF24" />
                <!-- Small Blue Sparkle / Circle -->
                <circle cx="95" cy="115" r="3" fill="#38BDF8" />
                <circle cx="120" cy="118" r="7" fill="#C7D2FE" opacity="0.7" />
                <circle cx="112" cy="132" r="4.5" fill="#1E40AF" />
                <circle cx="280" cy="85" r="4" fill="#38BDF8" opacity="0.8" />
              </svg>
            </div>
          </div>
        </div>

        <!-- SECTION 2: Pre-test & Post-test -->
        <div class="mt-10 md:mt-12">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6">
            Pre-test & Post-test
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Card 1: Pre-test -->
            <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div class="flex items-start gap-4 sm:gap-5 mb-6">
                <!-- Icon Pre-test: Clipboard with question mark -->
                <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0 text-[#1E40AF] shadow-xs">
                  <svg class="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="7" width="20" height="24" rx="4" fill="#FFFFFF" stroke="#1E40AF" stroke-width="2.2" />
                    <rect x="13" y="4" width="10" height="5" rx="2" fill="#1E40AF" />
                    <circle cx="18" cy="17" r="4.5" stroke="#1E40AF" stroke-width="1.8" fill="none" />
                    <text x="18" y="19.5" text-anchor="middle" font-size="6" font-weight="bold" fill="#1E40AF">?</text>
                    <rect x="11" y="24" width="3" height="3" rx="0.5" fill="#1E40AF" />
                    <rect x="16" y="25" width="9" height="1.5" rx="0.75" fill="#93C5FD" />
                  </svg>
                </div>

                <div>
                  <h3 class="text-xl sm:text-2xl font-bold text-[#1E40AF] mb-1.5">
                    Pre-test
                  </h3>
                  <p class="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Ukur sejauh mana pemahaman awalmu sebelum mulai mempelajari materi baru!
                  </p>
                </div>
              </div>

              <div>
  <a
    href="https://forms.gle/TPduLCyvPUUwCnGbA"
    target="_blank"
    rel="noopener noreferrer"
    class="bg-[#1E40AF] hover:bg-blue-800 text-white font-bold px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl shadow-xs transition-all active:scale-95 inline-flex items-center gap-2 text-sm sm:text-base cursor-pointer"
  >
    <span>Mulai Pre-test</span>
    <span>→</span>
  </a>
</div>
            </div>

            <!-- Card 2: Post-test -->
            <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div class="flex items-start gap-4 sm:gap-5 mb-6">
                <!-- Icon Post-test: Clipboard with star -->
                <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0 text-[#1E40AF] shadow-xs">
                  <svg class="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="7" width="20" height="24" rx="4" fill="#FFFFFF" stroke="#1E40AF" stroke-width="2.2" />
                    <rect x="13" y="4" width="10" height="5" rx="2" fill="#1E40AF" />
                    <path d="M18 13L19.2 15.8L22 16.1L19.8 18L20.5 21L18 19.4L15.5 21L16.2 18L14 16.1L16.8 15.8L18 13Z" fill="#1E40AF" />
                    <rect x="11" y="24" width="3" height="3" rx="0.5" fill="#1E40AF" />
                    <rect x="16" y="25" width="9" height="1.5" rx="0.75" fill="#93C5FD" />
                  </svg>
                </div>

                <div>
                  <h3 class="text-xl sm:text-2xl font-bold text-[#1E40AF] mb-1.5">
                    Post-test
                  </h3>
                  <p class="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Ukur sejauh mana pemahaman awalmu sebelum mulai mempelajari materi baru!
                  </p>
                </div>
              </div>

              <div>
                <button
                  @click="startAssessment('post')"
                  type="button"
                  class="bg-[#1E40AF] hover:bg-blue-800 text-white font-bold px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl shadow-xs transition-all active:scale-95 inline-flex items-center gap-2 text-sm sm:text-base cursor-pointer"
                >
                  <span>Mulai Post-test</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 3: Apa yang akan kamu dapatkan? -->
        <div class="mt-10 md:mt-12">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6">
            Apa yang akan kamu dapatkan?
          </h2>

          <!-- 4 Cards Grid (2x2 on mobile, 4 columns on desktop) -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <!-- Card 1: Meningkatkan kesadaran diri -->
            <div class="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col items-center text-center justify-center hover:shadow-md transition-all min-h-[190px]">
              <div class="w-14 h-14 bg-[#1E40AF] rounded-2xl flex items-center justify-center text-white mb-4 shadow-sm">
                <!-- User Avatars Icon -->
                <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <p class="font-bold text-[#1E40AF] text-xs sm:text-sm md:text-base leading-snug">
                Meningkatkan kesadaran diri
              </p>
            </div>

            <!-- Card 2: Membangun keterampilan sosial -->
            <div class="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col items-center text-center justify-center hover:shadow-md transition-all min-h-[190px]">
              <div class="w-14 h-14 bg-[#1E40AF] rounded-2xl flex items-center justify-center text-white mb-4 shadow-sm">
                <!-- Hammer & Wrench Icon -->
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <p class="font-bold text-[#1E40AF] text-xs sm:text-sm md:text-base leading-snug">
                Membangun keterampilan sosial
              </p>
            </div>

            <!-- Card 3: Mendukung lingkungan sekolah yang lebih baik -->
            <div class="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col items-center text-center justify-center hover:shadow-md transition-all min-h-[190px]">
              <div class="w-14 h-14 bg-[#1E40AF] rounded-2xl flex items-center justify-center text-white mb-4 shadow-sm">
                <!-- Group of people Icon -->
                <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <p class="font-bold text-[#1E40AF] text-xs sm:text-sm md:text-base leading-snug">
                Mendukung lingkungan sekolah yang lebih baik
              </p>
            </div>

            <!-- Card 4: Membantu kamu menghadapi konflik dengan lebih bijak -->
            <div class="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col items-center text-center justify-center hover:shadow-md transition-all min-h-[190px]">
              <div class="w-14 h-14 bg-[#1E40AF] rounded-2xl flex items-center justify-center text-white mb-4 shadow-sm">
                <!-- Lightbulb Icon -->
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p class="font-bold text-[#1E40AF] text-xs sm:text-sm md:text-base leading-snug">
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

const startAssessment = (_type: string = 'general') => {
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
