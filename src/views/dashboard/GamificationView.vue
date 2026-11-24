<template>
  <DashboardLayout>
    <div class="space-y-6 md:space-y-8 select-none">
      
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="space-y-1.5">
          <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Gamifikasi
          </h1>
          <p class="text-slate-500 text-sm sm:text-base max-w-3xl leading-relaxed">
            Modul pembelajaran mandiri, simulasi resolusi konflik, dan latihan empati untuk mengasah kecerdasan emosional.
          </p>
        </div>

        <button
          @click="openConflictQuiz"
          type="button"
          class="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm shadow-2xs hover:shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>{{ userConflictStyle ? `Gaya: ${userConflictStyle.styleName}` : 'Cek Gaya Konflikmu' }}</span>
        </button>
      </header>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E40AF] flex items-center justify-center shrink-0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Aktivitas Belajar</span>
            <span class="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              {{ summary.streakDays }} Hari Beruntun
            </span>
          </div>
        </div>

        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Tuntas Diselesaikan</span>
            <span class="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              {{ summary.completedCount }} / {{ summary.totalModules }} Modul
            </span>
          </div>
        </div>

        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-center">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
            <span>PROGRES KELULUSAN</span>
            <span class="text-[#1E40AF] font-extrabold text-sm">{{ summary.progressPercent }}%</span>
          </div>
          <div class="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              class="bg-[#1E40AF] h-full rounded-full transition-all duration-500 ease-out"
              :style="{ width: `${summary.progressPercent}%` }"
            ></div>
          </div>
          <span class="text-[11px] text-slate-400 mt-2 font-medium">Selesaikan seluruh modul untuk lencana akhir.</span>
        </div>
      </div>

      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Daftar Modul Pembelajaran
          </h2>
          <span class="text-xs sm:text-sm font-semibold text-slate-500">
            Terbuka bertahap sesuai ritme belajarmu
          </span>
        </div>

        <div v-if="isLoading" class="p-12 text-center bg-white rounded-3xl border border-slate-200/80 text-slate-500">
          <div class="w-8 h-8 border-3 border-blue-200 border-t-[#1E40AF] rounded-full animate-spin mx-auto mb-3"></div>
          <p class="text-sm font-medium">Memuat modul pembelajaran...</p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="(mod, index) in modules"
            :key="mod.id"
            class="bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-200 hover:shadow-md"
            :class="[
              mod.isCompleted
                ? 'border-emerald-200/80 bg-gradient-to-r from-emerald-50/20 to-white'
                : 'border-slate-200/80 hover:border-blue-200'
            ]"
          >
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div class="flex items-start gap-4 sm:gap-5 flex-1">
                <div
                  class="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-lg shrink-0"
                  :class="[
                    mod.isCompleted
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-blue-50 text-[#1E40AF] border border-blue-200/60'
                  ]"
                >
                  <span v-if="mod.isCompleted">✓</span>
                  <span v-else>{{ index + 1 }}</span>
                </div>

                <div class="space-y-1.5 flex-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                      {{ mod.category || 'Resolusi Konflik' }}
                    </span>
                    <span
                      v-if="mod.isCompleted"
                      class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1"
                    >
                      <span>✓</span> Tuntas Dikerjakan
                    </span>
                    <span
                      v-else
                      class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800"
                    >
                      Level {{ mod.level }}
                    </span>
                  </div>

                  <h3 class="text-xl sm:text-2xl font-bold text-slate-900">
                    {{ mod.title }}
                  </h3>

                  <p class="text-slate-600 text-sm leading-relaxed max-w-3xl">
                    {{ mod.description || 'Pahami dinamika konflik dan latih respon empati melalui kasus ini.' }}
                  </p>

                  <div
                    v-if="mod.isCompleted && mod.progress?.reflectionAnswer"
                    class="mt-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700"
                  >
                    <span class="font-bold text-slate-900 block mb-0.5">Catatan Jurnal Refleksimu:</span>
                    <p class="italic text-slate-600 line-clamp-2">"{{ mod.progress.reflectionAnswer }}"</p>
                  </div>
                </div>
              </div>

              <div class="shrink-0 flex items-center justify-end">
                <button
                  @click="startSimulation(mod)"
                  type="button"
                  class="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-sm shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  :class="[
                    mod.isCompleted
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      : 'bg-[#1E40AF] hover:bg-blue-800 text-white shadow-md'
                  ]"
                >
                  <span>{{ mod.isCompleted ? 'Buka Kembali Simulasi' : 'Mulai Simulasi' }}</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Lencana Pencapaian
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
              Apresiasi atas konsistensi belajar, refleksi mandiri, dan penerapan empati
            </p>
          </div>
          <span class="text-xs font-bold px-3 py-1.5 bg-blue-50 text-[#1E40AF] rounded-full border border-blue-200/60">
            {{ unlockedBadgesCount }} / {{ badges.length }} Lencana Terbuka
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div
            v-for="badge in badges"
            :key="badge.id"
            class="bg-white rounded-3xl p-6 border transition-all duration-200 flex flex-col justify-between"
            :class="[
              badge.isUnlocked
                ? 'border-blue-200/80 shadow-xs hover:shadow-md'
                : 'border-slate-200/70 bg-slate-50/40 opacity-80'
            ]"
          >
            <div class="space-y-3.5">
              <div class="flex items-center justify-between">
                <div
                  class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors"
                  :class="[
                    badge.isUnlocked
                      ? 'bg-blue-50 text-[#1E40AF] border border-blue-200/70 shadow-2xs'
                      : 'bg-slate-100 text-slate-400 border border-slate-200/60'
                  ]"
                >
                  <svg v-if="badge.isUnlocked" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.003 0V4.5a2.25 2.25 0 00-2.25-2.25h-1.5a2.25 2.25 0 00-2.25 2.25v9.75" />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>

                <span
                  class="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                  :class="[
                    badge.isUnlocked
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/70 flex items-center gap-1'
                      : 'bg-slate-100 text-slate-500'
                  ]"
                >
                  <span v-if="badge.isUnlocked">✓</span>
                  <span>{{ badge.isUnlocked ? 'Terbuka' : 'Terkunci' }}</span>
                </span>
              </div>

              <div>
                <h3 class="font-bold text-slate-900 text-base">
                  {{ badge.name }}
                </h3>
                <p class="text-xs text-slate-600 leading-relaxed mt-1">
                  {{ badge.description }}
                </p>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span class="text-slate-400 font-medium">Syarat:</span>
              <span class="text-slate-600 font-semibold text-right max-w-[180px] truncate" :title="badge.criteria">
                {{ badge.criteria || 'Selesaikan tantangan terkait' }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="activeSimulation"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
        >
          <div class="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl border border-slate-100 my-8">
            
            <div class="bg-gradient-to-r from-blue-900 via-[#1E40AF] to-blue-800 px-6 sm:px-8 py-5 text-white flex items-center justify-between">
              <div>
                <span class="text-xs font-bold text-blue-200 uppercase tracking-wider block">
                  Simulasi Studi Kasus • Level {{ activeSimulation.level }}
                </span>
                <h3 class="text-xl sm:text-2xl font-bold text-white">
                  {{ activeSimulation.title }}
                </h3>
              </div>
              <button
                @click="closeSimulation"
                type="button"
                class="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div class="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              
              <div v-if="currentScenario" class="space-y-4">
                <div class="p-5 sm:p-6 rounded-2xl bg-blue-50/70 border border-blue-200/60">
                  <div class="flex items-center gap-2 text-xs font-bold text-[#1E40AF] uppercase tracking-wider mb-2">
                    <span class="w-2 h-2 rounded-full bg-[#1E40AF]"></span>
                    {{ currentScenario.title || 'Skenario Kasus' }}
                  </div>
                  <p class="text-slate-800 text-base sm:text-lg leading-relaxed font-medium">
                    "{{ currentScenario.situationText }}"
                  </p>
                </div>

                <p class="text-slate-500 text-xs sm:text-sm font-semibold">
                  Bagaimana tindakanmu untuk merespons situasi di atas?
                </p>

                <div class="space-y-3">
                  <button
                    v-for="opt in currentScenario.options"
                    :key="opt.id"
                    @click="chooseOption(opt)"
                    type="button"
                    class="w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-4 group"
                    :class="[
                      selectedOption?.id === opt.id
                        ? 'border-[#1E40AF] bg-blue-50/60 ring-2 ring-blue-100'
                        : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                    ]"
                  >
                    <span
                      class="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors"
                      :class="[
                        selectedOption?.id === opt.id
                          ? 'bg-[#1E40AF] text-white'
                          : 'bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-[#1E40AF]'
                      ]"
                    >
                      {{ opt.optionLabel }}
                    </span>
                    <span class="text-slate-800 text-sm sm:text-base leading-relaxed pt-0.5">
                      {{ opt.optionText }}
                    </span>
                  </button>
                </div>
              </div>

              <transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
              >
                <div
                  v-if="selectedOption"
                  class="p-5 sm:p-6 rounded-2xl border space-y-2"
                  :class="[
                    selectedOption.impactType === 'de_escalation'
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                      : selectedOption.impactType === 'escalation'
                        ? 'bg-rose-50/80 border-rose-300 text-rose-950'
                        : 'bg-amber-50/80 border-amber-300 text-amber-950'
                  ]"
                >
                  <div class="flex items-center gap-2 font-bold text-sm sm:text-base">
                    <span>{{ selectedOption.impactTitle }}</span>
                  </div>
                  <p class="text-sm leading-relaxed">
                    {{ selectedOption.feedbackText }}
                  </p>
                </div>
              </transition>

              <div v-if="selectedOption" class="pt-4 border-t border-slate-100 space-y-3">
                <label class="block text-sm font-bold text-slate-900">
                  Jurnal Refleksi Mandiri:
                </label>
                <p class="text-xs text-slate-500 leading-relaxed">
                  {{ activeSimulation.reflectionQuestion || 'Tuliskan refleksimu singkat mengenai situasi ini dan apa yang akan kamu lakukan jika mengalaminya langsung.' }}
                </p>
                <textarea
                  v-model="reflectionInput"
                  rows="3"
                  placeholder="Tuliskan pendapat atau perasaanmu di sini..."
                  class="w-full p-4 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
                ></textarea>
              </div>

              <p v-if="simulationError" class="text-xs text-rose-600 font-semibold">
                {{ simulationError }}
              </p>

            </div>

            <div class="bg-slate-50 px-6 sm:px-8 py-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <button
                @click="closeSimulation"
                type="button"
                class="px-5 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 font-bold text-sm cursor-pointer"
              >
                Tutup
              </button>

              <button
                @click="submitSimulation"
                :disabled="!selectedOption || isSubmitting"
                type="button"
                class="px-6 py-3 rounded-xl bg-[#1E40AF] hover:bg-blue-800 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span v-if="isSubmitting">Menyimpan...</span>
                <span v-else>Kumpulkan & Selesaikan Modul</span>
              </button>
            </div>

          </div>
        </div>
      </transition>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isConflictQuizOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
        >
          <div class="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-100 my-8">
            <div class="bg-[#1E40AF] px-6 py-5 text-white flex items-center justify-between">
              <div>
                <span class="text-xs font-bold text-blue-200 uppercase tracking-wider block">Self-Reflection Assessment</span>
                <h3 class="text-xl font-bold text-white">Kenali Gaya Konflik Pribadimu</h3>
              </div>
              <button @click="isConflictQuizOpen = false" class="text-white hover:opacity-80">✕</button>
            </div>

            <div class="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <p class="text-slate-600 text-sm">
                Jawab 3 pertanyaan situasi di bawah ini untuk melihat kecenderungan caramu menyelesaikan masalah:
              </p>

              <div v-for="(q, qIdx) in conflictQuizQuestions" :key="qIdx" class="space-y-3">
                <span class="font-bold text-sm text-slate-800 block">{{ qIdx + 1 }}. {{ q.question }}</span>
                <div class="space-y-2">
                  <button
                    v-for="(ans, aIdx) in q.answers"
                    :key="aIdx"
                    @click="quizAnswers[qIdx] = ans.style"
                    type="button"
                    class="w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all"
                    :class="quizAnswers[qIdx] === ans.style ? 'border-[#1E40AF] bg-blue-50 font-bold text-[#1E40AF]' : 'border-slate-200 hover:bg-slate-50 text-slate-700'"
                  >
                    {{ ans.text }}
                  </button>
                </div>
              </div>
            </div>

            <div class="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
              <button @click="isConflictQuizOpen = false" class="text-slate-600 font-bold text-sm">Batal</button>
              <button
                @click="calculateAndSaveConflictStyle"
                :disabled="Object.keys(quizAnswers).length < 3 || isSavingStyle"
                class="px-5 py-2.5 rounded-xl bg-[#1E40AF] hover:bg-blue-800 disabled:opacity-50 text-white font-bold text-sm"
              >
                {{ isSavingStyle ? 'Menghitung...' : 'Lihat Hasil Gaya Konflik' }}
              </button>
            </div>
          </div>
        </div>
      </transition>

    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import DashboardLayout from '../../components/layouts/DashboardLayout.vue'
import { api, isMockMode } from '../../services/api'

interface ScenarioOption {
  id: number
  optionLabel: string
  optionText: string
  feedbackText: string
  impactType: 'de_escalation' | 'escalation' | 'neutral'
  impactTitle: string
  isRecommended: boolean
  scoreDelta: number
}

interface Scenario {
  id: number
  title: string
  situationText: string
  characterName: string
  order: number
  options: ScenarioOption[]
}

interface GamificationModuleItem {
  id: number
  title: string
  category: string
  level: number
  description: string
  reflectionQuestion: string
  order: number
  scenarios: Scenario[]
  isCompleted: boolean
  progress?: {
    isCompleted: boolean
    selectedOptionId?: number
    reflectionAnswer?: string
    score: number
  }
}

interface BadgeItem {
  id: number
  name: string
  description: string
  criteria?: string
  isUnlocked: boolean
}

const defaultBadges: BadgeItem[] = [
  {
    id: 1,
    name: 'Calm Player',
    description: 'Diberikan kepada siswa yang berhasil menyelesaikan evaluasi dan simulasi respon tenang.',
    criteria: 'Selesaikan 1 kali simulasi studi kasus resolusi konflik',
    isUnlocked: false
  },
  {
    id: 2,
    name: 'Communicator',
    description: 'Diberikan kepada siswa yang aktif mengenali dan mempraktikkan komunikasi asertif.',
    criteria: 'Selesaikan kuis pengenalan gaya resolusi konflik',
    isUnlocked: false
  },
  {
    id: 3,
    name: 'Conflict Solver',
    description: 'Lencana kehormatan bagi siswa yang menuntaskan seluruh materi studi kasus mediasi.',
    criteria: 'Selesaikan seluruh modul studi kasus yang tersedia',
    isUnlocked: false
  }
]

const modules = ref<GamificationModuleItem[]>([])
const badges = ref<BadgeItem[]>([...defaultBadges])
const isLoading = ref(true)

const summary = ref({
  totalModules: 0,
  completedCount: 0,
  progressPercent: 0,
  streakDays: 1,
})

const userConflictStyle = ref<{ styleName: string; styleDescription?: string } | null>(null)
const unlockedBadgesCount = computed(() => badges.value.filter(b => b.isUnlocked).length)

const activeSimulation = ref<GamificationModuleItem | null>(null)
const selectedOption = ref<ScenarioOption | null>(null)
const reflectionInput = ref('')
const isSubmitting = ref(false)
const simulationError = ref('')

const currentScenario = computed(() => {
  if (!activeSimulation.value?.scenarios || activeSimulation.value.scenarios.length === 0) return null
  return activeSimulation.value.scenarios[0]
})

const loadGamificationData = async () => {
  isLoading.value = true
  try {
    const rawUser = localStorage.getItem('tanggap_user')
    const userId = rawUser ? JSON.parse(rawUser).id : null

    const res = await api.get<{
      success?: boolean
      modules?: GamificationModuleItem[]
      badges?: BadgeItem[]
      summary?: any
    }>('gamification/modules', {
      params: userId ? { userId } : undefined
    })

    if (res?.modules && Array.isArray(res.modules)) {
      modules.value = res.modules
      if (res.summary) {
        summary.value = {
          totalModules: res.summary.totalModules || res.modules.length,
          completedCount: res.summary.completedCount || 0,
          progressPercent: res.summary.progressPercent || 0,
          streakDays: res.summary.streakDays || 1,
        }
        if (res.summary.conflictStyle) {
          userConflictStyle.value = res.summary.conflictStyle
        }
      }
    }

    if (res?.badges && Array.isArray(res.badges)) {
      badges.value = res.badges
    } else {
      badges.value = defaultBadges.map(b => {
        let isUnlocked = false
        if (b.id === 1 && summary.value.completedCount > 0) isUnlocked = true
        if (b.id === 2 && Boolean(userConflictStyle.value)) isUnlocked = true
        if (b.id === 3 && summary.value.completedCount >= summary.value.totalModules && summary.value.totalModules > 0) isUnlocked = true
        return { ...b, isUnlocked }
      })
    }
  } catch (err) {
    console.warn('Gagal memuat modul gamifikasi dari API:', err)
  } finally {
    isLoading.value = false
  }
}

const startSimulation = (mod: GamificationModuleItem) => {
  activeSimulation.value = mod
  selectedOption.value = null
  reflectionInput.value = mod.progress?.reflectionAnswer || ''
  simulationError.value = ''

  if (mod.progress?.selectedOptionId && currentScenario.value) {
    const found = currentScenario.value.options.find(o => o.id === mod.progress?.selectedOptionId)
    if (found) selectedOption.value = found
  }
}

const chooseOption = (opt: ScenarioOption) => {
  selectedOption.value = opt
}

const closeSimulation = () => {
  activeSimulation.value = null
}

const submitSimulation = async () => {
  if (!activeSimulation.value || !selectedOption.value) return
  isSubmitting.value = true
  simulationError.value = ''

  try {
    const rawUser = localStorage.getItem('tanggap_user')
    const userId = rawUser ? JSON.parse(rawUser).id : null

    if (!isMockMode()) {
      await api.post(`gamification/modules/${activeSimulation.value.id}/submit`, {
        selectedOptionId: selectedOption.value.id,
        reflectionAnswer: reflectionInput.value.trim(),
        userId,
      })
    }

    activeSimulation.value.isCompleted = true
    activeSimulation.value.progress = {
      isCompleted: true,
      selectedOptionId: selectedOption.value.id,
      reflectionAnswer: reflectionInput.value.trim(),
      score: selectedOption.value.scoreDelta || 10,
    }

    await loadGamificationData()
    closeSimulation()
  } catch (err: any) {
    simulationError.value = err?.data?.message || err?.message || 'Gagal menyimpan progres modul.'
  } finally {
    isSubmitting.value = false
  }
}

const isConflictQuizOpen = ref(false)
const quizAnswers = ref<Record<number, string>>({})
const isSavingStyle = ref(false)

const conflictQuizQuestions = [
  {
    question: 'Saat temanmu berbeda pendapat keras dalam diskusi kelompok, apa yang biasanya kamu lakukan?',
    answers: [
      { text: 'Ajak mendengarkan alasannya lalu cari jalan tengah bersama.', style: 'Kolaboratif' },
      { text: 'Lebih baik diam saja agar suasana tidak semakin ribut.', style: 'Menghindar' },
      { text: 'Bertahan dengan pendapatku karena yakin ideku yang paling benar.', style: 'Konfrontatif' },
    ]
  },
  {
    question: 'Jika ada teman yang membicarakanmu di belakang, respon pertamamu adalah:',
    answers: [
      { text: 'Mengajaknya ngobrol santai berdua untuk tabayyun/klarifikasi.', style: 'Kolaboratif' },
      { text: 'Pura-pura tidak tahu dan menjaga jarak darinya.', style: 'Menghindar' },
      { text: 'Langsung melabraknya dan meminta penjelasan tegas.', style: 'Konfrontatif' },
    ]
  },
  {
    question: 'Dalam menyelesaikan masalah pertemanan, prinsip utamamu adalah:',
    answers: [
      { text: 'Semua pihak harus merasa adil dan menang bersama (win-win).', style: 'Kolaboratif' },
      { text: 'Yang penting damai dan tidak ada pertengkaran fisik.', style: 'Akomodatif' },
      { text: 'Kebenaran harus ditegakkan siapapun yang bersalah.', style: 'Konfrontatif' },
    ]
  }
]

const openConflictQuiz = () => {
  quizAnswers.value = {}
  isConflictQuizOpen.value = true
}

const calculateAndSaveConflictStyle = async () => {
  isSavingStyle.value = true
  try {
    const counts: Record<string, number> = {}
    Object.values(quizAnswers.value).forEach(st => {
      counts[st] = (counts[st] || 0) + 1
    })

    let dominantStyle = 'Kolaboratif'
    let maxCount = 0
    for (const [st, cnt] of Object.entries(counts)) {
      if (cnt > maxCount) {
        maxCount = cnt
        dominantStyle = st
      }
    }

    const descriptions: Record<string, string> = {
      Kolaboratif: 'Kamu cenderung mencari solusi damai yang menguntungkan semua pihak dan menjunjung tinggi empati serta komunikasi terbuka.',
      Menghindar: 'Kamu cenderung menahan diri untuk menghindari konflik terbuka, namun perlu belajar menyuarakan pendapat secara asertif.',
      Konfrontatif: 'Kamu memiliki ketegasan tinggi dalam membela kebenaran, namun perlu diimbangi dengan kelembutan agar tidak melukai perasaan lawan bicara.',
      Akomodatif: 'Kamu sangat mengutamakan keharmonisan hubungan pertemanan, sering kali rela mengalah demi kenyamanan bersama.'
    }

    const rawUser = localStorage.getItem('tanggap_user')
    const userId = rawUser ? JSON.parse(rawUser).id : null

    if (!isMockMode()) {
      await api.post('gamification/conflict-style', {
        styleName: dominantStyle,
        styleDescription: descriptions[dominantStyle] || descriptions.Kolaboratif,
        answersSummary: quizAnswers.value,
        userId,
      })
    }

    userConflictStyle.value = {
      styleName: dominantStyle,
      styleDescription: descriptions[dominantStyle]
    }

    await loadGamificationData()
    isConflictQuizOpen.value = false
  } catch (e) {
    console.warn('Gagal menyimpan gaya konflik:', e)
  } finally {
    isSavingStyle.value = false
  }
}

onMounted(() => {
  loadGamificationData()
})
</script>
