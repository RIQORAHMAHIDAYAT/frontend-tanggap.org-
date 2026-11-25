<template>
  <DashboardLayout>
    <div class="space-y-8 select-none">

      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Gamifikasi & Kuis Interaktif
          </h1>
          <p class="text-slate-600 text-sm sm:text-base mt-1">
            Uji kemampuan empati, regulasi emosi, dan resolusi konflik lewat kuis interaktif ala Kahoot!
          </p>
        </div>

        <button
          @click="openConflictQuiz"
          type="button"
          class="px-5 py-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs sm:text-sm border border-indigo-200/80 transition-all cursor-pointer flex items-center gap-2 self-start md:self-auto shadow-2xs"
        >
          <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
          <span>{{ userConflictStyle ? `Gaya Konflik: ${userConflictStyle.styleName}` : 'Cek Gaya Resolusi Konflikmu' }}</span>
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E40AF] flex items-center justify-center shrink-0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
            </svg>
          </div>
          <div>
            <span class="block text-xs font-bold text-slate-400 uppercase tracking-wider">Streak Belajar</span>
            <span class="text-2xl font-extrabold text-slate-900">{{ summary.streakDays }} Hari</span>
            <span class="block text-[11px] text-emerald-600 font-semibold mt-0.5">Konsisten berlatih!</span>
          </div>
        </div>

        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
            </svg>
          </div>
          <div>
            <span class="block text-xs font-bold text-slate-400 uppercase tracking-wider">Total Skor Kuis</span>
            <span class="text-2xl font-extrabold text-slate-900">{{ summary.totalScore.toLocaleString('id-ID') }} Poin</span>
            <span class="block text-[11px] text-slate-500 font-medium mt-0.5">{{ summary.completedCount }} / {{ summary.totalModules }} Modul Tuntas</span>
          </div>
        </div>

        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-center">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Progres Keseluruhan</span>
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
            Daftar Paket Kuis Modul
          </h2>
          <span class="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
            {{ modules.length }} Modul Tersedia
          </span>
        </div>

        <div v-if="isLoading" class="py-12 text-center bg-white rounded-3xl border border-slate-200/80">
          <div class="w-8 h-8 border-3 border-blue-200 border-t-[#1E40AF] rounded-full animate-spin mx-auto mb-3"></div>
          <p class="text-slate-500 text-sm font-medium">Memuat modul kuis interaktif...</p>
        </div>

        <div v-else class="grid grid-cols-1 gap-4">
          <div
            v-for="mod in modules"
            :key="mod.id"
            class="bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-200 shadow-2xs hover:shadow-md"
            :class="[
              mod.isCompleted
                ? 'border-emerald-200/80 bg-emerald-50/10'
                : 'border-slate-200/80'
            ]"
          >
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">

              <div class="flex items-start gap-4 sm:gap-5 flex-1">
                <div
                  class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 font-extrabold text-lg sm:text-xl shadow-xs"
                  :class="[
                    mod.isCompleted
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-50 text-[#1E40AF] border border-blue-200/60'
                  ]"
                >
                  <svg v-if="mod.isCompleted" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span v-else>{{ mod.level }}</span>
                </div>

                <div class="space-y-1.5 flex-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {{ mod.category }}
                    </span>
                    <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1E40AF] border border-blue-200/60">
                      {{ mod.scenarios?.length || 0 }} Soal
                    </span>
                    <span
                      v-if="mod.isCompleted"
                      class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700"
                    >
                      Skor Terbaik: {{ mod.progress?.score || 0 }} ({{ mod.progress?.correctCount || 0 }}/{{ mod.progress?.totalQuestions || mod.scenarios?.length || 0 }} Benar)
                    </span>
                  </div>

                  <h3 class="text-lg sm:text-xl font-bold text-slate-900">
                    {{ mod.title }}
                  </h3>
                  <p class="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
                    {{ mod.description }}
                  </p>
                </div>
              </div>

              <div class="shrink-0 flex items-center justify-end">
                <button
                  @click="startSimulation(mod)"
                  type="button"
                  :disabled="!mod.scenarios || mod.scenarios.length === 0"
                  class="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-sm shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  :class="[
                    mod.isCompleted
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      : 'bg-[#1E40AF] hover:bg-blue-800 text-white shadow-md'
                  ]"
                >
                  <span>{{ mod.isCompleted ? 'Main Lagi' : 'Mulai Kuis' }}</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Papan Peringkat Kelas (Leaderboard)
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
              Top skor siswa di lingkungan sekolah: <strong class="text-slate-700">{{ leaderboardSchool }}</strong>
            </p>
          </div>
          <span
            v-if="myRank"
            class="text-xs font-bold px-3.5 py-1.5 bg-amber-50 text-amber-700 rounded-full border border-amber-200/80 self-start sm:self-auto"
          >
            Peringkat Kamu: #{{ myRank }}
          </span>
        </div>

        <div class="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div v-if="leaderboard.length === 0" class="py-10 px-6 text-center text-slate-400 text-sm">
            Belum ada skor kuis yang tercatat di kelas ini. Jadilah yang pertama memuncaki papan peringkat!
          </div>
          <div v-else class="divide-y divide-slate-100">
            <div
              v-for="entry in leaderboard"
              :key="entry.userId"
              class="px-5 sm:px-7 py-4 flex items-center justify-between gap-4 transition-colors"
              :class="entry.isCurrentUser ? 'bg-blue-50/70' : 'hover:bg-slate-50/70'"
            >
              <div class="flex items-center gap-4 min-w-0">
                <div
                  class="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0"
                  :class="[
                    entry.rank === 1 ? 'bg-amber-400 text-amber-950 shadow-xs' :
                    entry.rank === 2 ? 'bg-slate-300 text-slate-800 shadow-xs' :
                    entry.rank === 3 ? 'bg-orange-300 text-orange-950 shadow-xs' :
                    'bg-slate-100 text-slate-600'
                  ]"
                >
                  {{ entry.rank }}
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-slate-900 text-sm sm:text-base truncate">{{ entry.name }}</span>
                    <span
                      v-if="entry.isCurrentUser"
                      class="px-2 py-0.5 rounded-md bg-[#1E40AF] text-white text-[10px] font-bold uppercase"
                    >
                      Kamu
                    </span>
                  </div>
                  <p class="text-xs text-slate-500 truncate">
                    {{ entry.modulesCompleted }} Modul Selesai • {{ entry.totalCorrect }}/{{ entry.totalQuestions }} Jawaban Tepat
                  </p>
                </div>
              </div>

              <div class="text-right shrink-0">
                <span class="block font-extrabold text-base sm:text-lg text-[#1E40AF]">
                  {{ entry.totalScore.toLocaleString('id-ID') }}
                </span>
                <span class="block text-[10px] font-bold uppercase text-slate-400">Poin</span>
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
              Apresiasi atas konsistensi belajar, akurasi kuis, dan penerapan empati
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
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>

                <span
                  class="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                  :class="badge.isUnlocked ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200/70 text-slate-500'"
                >
                  {{ badge.isUnlocked ? 'Didapatkan' : 'Terkunci' }}
                </span>
              </div>

              <div>
                <h3 class="font-bold text-slate-900 text-base sm:text-lg">{{ badge.name }}</h3>
                <p class="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
                  {{ badge.description }}
                </p>
              </div>
            </div>

            <div class="pt-4 mt-4 border-t border-slate-100">
              <span class="block text-[11px] font-semibold text-slate-400">
                Syarat: {{ badge.criteria }}
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="activeSimulation"
          class="fixed inset-0 z-50 flex flex-col justify-between select-none overflow-y-auto"
          :class="[
            showScoreScreen
              ? 'bg-[#1C368D] text-white'
              : 'bg-[#F0F5FF] text-slate-900'
          ]"
        >
          <div class="px-4 sm:px-8 pt-4 sm:pt-6 flex items-center justify-between gap-4 shrink-0">
            <div class="flex flex-wrap items-center gap-2.5">
              <span
                class="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold tracking-tight shadow-sm"
                :class="showScoreScreen ? 'bg-white text-[#1C368D]' : 'bg-[#1C368D] text-white'"
              >
                tanggap.org
              </span>
              <span
                class="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold"
                :class="showScoreScreen ? 'bg-white/15 text-white border border-white/20' : 'bg-white text-[#1C368D] border border-blue-200 shadow-2xs'"
              >
                {{ activeSimulation.title }}
              </span>
              <span
                v-if="!showScoreScreen && currentStreak >= 2"
                class="px-3 py-1.5 rounded-full bg-amber-400 text-amber-950 text-xs font-extrabold shadow-md animate-bounce"
              >
                Streak x{{ currentStreak }}
              </span>
            </div>

            <button
              @click="closeSimulation"
              type="button"
              class="w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
              :class="showScoreScreen ? 'bg-white/15 hover:bg-white/25 text-white border border-white/20' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs'"
              title="Keluar dari Kuis"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div
            v-if="showScoreScreen"
            @click="finishAndSaveQuiz"
            class="flex-1 flex flex-col items-center justify-center px-4 py-8 cursor-pointer"
          >
            <h2 class="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 drop-shadow-md">
              Skor
            </h2>

            <div class="w-full max-w-md bg-slate-900/85 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4">
              <div class="flex items-center justify-between text-sm sm:text-base">
                <div class="flex items-center gap-3">
                  <div class="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-amber-300">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <span class="font-semibold text-slate-200">Skor kuis</span>
                </div>
                <span class="font-extrabold text-white">+ {{ quizScore.toLocaleString('id-ID') }}</span>
              </div>

              <div class="flex items-center justify-between text-sm sm:text-base">
                <div class="flex items-center gap-3">
                  <div class="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="font-semibold text-slate-200">Jawaban tepat</span>
                </div>
                <span class="font-extrabold text-emerald-400">{{ quizCorrectCount }} / {{ quizTotalQuestions }}</span>
              </div>

              <div class="border-t border-white/15 pt-4 flex items-center justify-between text-base sm:text-lg">
                <span class="font-bold text-white">Total</span>
                <span class="font-extrabold text-amber-300">+ {{ quizScore.toLocaleString('id-ID') }}</span>
              </div>
            </div>

            <div class="mt-10 text-center">
              <button
                type="button"
                :disabled="isSubmitting"
                class="text-lg sm:text-xl font-extrabold text-white/95 hover:text-white tracking-wide drop-shadow-sm cursor-pointer transition-transform active:scale-95"
              >
                {{ isSubmitting ? 'Menyimpan skor...' : 'Ketuk untuk melanjutkan' }}
              </button>
            </div>
          </div>

          <div
            v-else-if="currentQuestion"
            class="flex-1 flex flex-col justify-center max-w-5xl w-full mx-auto px-4 sm:px-8 py-4 sm:py-6 gap-5 sm:gap-6"
          >
            <div class="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-white/60 text-center space-y-3">
              <div class="flex items-center justify-center gap-2">
                <span class="px-3 py-1 rounded-full bg-blue-50 text-[#1E40AF] text-xs font-extrabold uppercase tracking-wider">
                  {{ currentQuestion.characterName || `Soal ${currentQuestionIndex + 1}` }}
                </span>
                <span
                  v-if="currentQuestion.title"
                  class="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold"
                >
                  {{ currentQuestion.title }}
                </span>
              </div>

              <p class="text-lg sm:text-2xl md:text-[26px] font-extrabold text-slate-900 leading-snug max-w-3xl mx-auto">
                {{ currentQuestion.situationText }}
              </p>
            </div>

            <div
              v-if="selectedOptionForCurrent"
              class="rounded-2xl p-4 sm:p-5 shadow-xl border backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
              :class="[
                isOptionCorrect(selectedOptionForCurrent)
                  ? 'bg-emerald-600/95 border-emerald-400 text-white'
                  : 'bg-rose-600/95 border-rose-400 text-white'
              ]"
            >
              <div class="space-y-1 flex-1">
                <div class="flex items-center gap-2 font-extrabold text-sm sm:text-base">
                  <svg v-if="isOptionCorrect(selectedOptionForCurrent)" class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <svg v-else class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>
                    {{ isOptionCorrect(selectedOptionForCurrent) ? `Tepat! (+${lastEarnedPoints} Poin)` : 'Kurang Tepat!' }}
                  </span>
                </div>
                <p class="text-xs sm:text-sm text-white/95 leading-relaxed">
                  {{ selectedOptionForCurrent.feedbackText }}
                </p>
              </div>

              <button
                @click="goToNextQuestion"
                type="button"
                class="px-6 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-sm shadow-md transition-all active:scale-95 cursor-pointer shrink-0 flex items-center justify-center gap-2"
              >
                <span>{{ currentQuestionIndex + 1 >= quizTotalQuestions ? 'Lihat Skor Akhir' : 'Lanjut Soal Berikutnya' }}</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div
              class="grid gap-3.5 sm:gap-4"
              :class="[
                (currentQuestion.options?.length || 0) <= 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : 'grid-cols-1 sm:grid-cols-2'
              ]"
            >
              <button
                v-for="(opt, idx) in currentQuestion.options"
                :key="opt.id"
                @click="chooseOption(opt)"
                type="button"
                :disabled="Boolean(selectedOptionForCurrent)"
                class="relative rounded-2xl p-5 sm:p-6 text-left text-white font-bold shadow-lg transition-all flex items-center gap-4 min-h-[88px] sm:min-h-[108px]"
                :class="[
                  getKahootCardClass(idx, currentQuestion.options.length),
                  selectedOptionForCurrent
                    ? (selectedOptionForCurrent.id === opt.id
                        ? 'ring-4 ring-white scale-[1.01]'
                        : isOptionCorrect(opt)
                          ? 'ring-3 ring-emerald-300 opacity-95'
                          : 'opacity-40 cursor-not-allowed')
                    : 'cursor-pointer active:translate-y-1'
                ]"
              >
                <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/20 flex items-center justify-center shrink-0">
                  <svg v-if="getKahootShape(idx, currentQuestion.options.length) === 'diamond'" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2L22 12L12 22L2 12Z" />
                  </svg>
                  <svg v-else-if="getKahootShape(idx, currentQuestion.options.length) === 'triangle'" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 3L22 20H2Z" />
                  </svg>
                  <svg v-else-if="getKahootShape(idx, currentQuestion.options.length) === 'circle'" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                  <svg v-else class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                  </svg>
                </div>

                <span
                  class="flex-1 leading-snug"
                  :class="(currentQuestion.options?.length || 0) <= 2 ? 'text-base sm:text-xl text-center pr-8' : 'text-sm sm:text-base'"
                >
                  {{ opt.optionText }}
                </span>

                <div v-if="selectedOptionForCurrent && (selectedOptionForCurrent.id === opt.id || isOptionCorrect(opt))" class="shrink-0">
                  <svg v-if="isOptionCorrect(opt)" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <svg v-else class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <div class="px-4 sm:px-8 pb-4 sm:pb-5 pt-2 flex items-center justify-between gap-4 shrink-0">
            <div
              class="flex-1 max-w-xs h-2.5 rounded-full overflow-hidden"
              :class="showScoreScreen ? 'bg-white/20' : 'bg-[#1C368D]/15'"
            >
              <div
                class="h-full rounded-full transition-all duration-300"
                :class="showScoreScreen ? 'bg-white' : 'bg-[#1C368D]'"
                :style="{ width: `${quizProgressBarPercent}%` }"
              ></div>
            </div>

            <div class="flex items-center gap-2.5">
              <div class="px-3.5 py-1.5 rounded-xl bg-[#1C368D] border border-white/20 text-white text-xs sm:text-sm font-extrabold flex items-center gap-1.5 shadow-sm">
                <span class="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">✓</span>
                <span>{{ answeredCount }} / {{ quizTotalQuestions }}</span>
              </div>
              <div class="px-4 py-1.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs sm:text-sm font-extrabold tracking-wide shadow-sm">
                {{ quizScore.toLocaleString('id-ID') }}
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <Teleport to="body">
      <div
        v-if="isConflictQuizOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none"
      >
        <div class="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 class="text-lg sm:text-xl font-bold text-slate-900">Kuis Profil Gaya Resolusi Konflik</h3>
            <button @click="isConflictQuizOpen = false" type="button" class="text-slate-400 hover:text-slate-700 font-bold text-xl cursor-pointer">
              ✕
            </button>
          </div>

          <div class="space-y-5 max-h-[60vh] overflow-y-auto pr-1">
            <div v-for="(q, qIdx) in conflictQuizQuestions" :key="qIdx" class="space-y-2.5">
              <p class="font-bold text-sm text-slate-800">{{ qIdx + 1 }}. {{ q.question }}</p>
              <div class="space-y-2">
                <button
                  v-for="ans in q.answers"
                  :key="ans.style"
                  type="button"
                  @click="quizAnswers[qIdx] = ans.style"
                  class="w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer"
                  :class="quizAnswers[qIdx] === ans.style ? 'border-[#1E40AF] bg-blue-50 font-bold text-[#1E40AF]' : 'border-slate-200 hover:bg-slate-50 text-slate-700'"
                >
                  {{ ans.text }}
                </button>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button @click="isConflictQuizOpen = false" type="button" class="px-5 py-2.5 rounded-xl bg-slate-100 font-bold text-sm text-slate-600 cursor-pointer">
              Tutup
            </button>
            <button
              @click="calculateAndSaveConflictStyle"
              :disabled="Object.keys(quizAnswers).length < 3 || isSavingStyle"
              type="button"
              class="px-5 py-2.5 rounded-xl bg-[#1E40AF] hover:bg-blue-800 disabled:opacity-50 text-white font-bold text-sm cursor-pointer"
            >
              {{ isSavingStyle ? 'Menyimpan...' : 'Lihat Hasil Profilku' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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

interface ScenarioItem {
  id: number
  title: string
  situationText: string
  characterName: string
  order: number
  options: ScenarioOption[]
}

interface ModuleProgress {
  isCompleted: boolean
  selectedOptionId?: number
  reflectionAnswer?: string
  score: number
  correctCount?: number
  totalQuestions?: number
}

interface GamificationModuleItem {
  id: number
  title: string
  category: string
  level: number
  description: string
  reflectionQuestion: string
  scenarios: ScenarioItem[]
  progress: ModuleProgress | null
  isCompleted: boolean
}

interface BadgeItem {
  id: number
  name: string
  description: string
  criteria: string
  isUnlocked: boolean
}

interface LeaderboardEntry {
  rank: number
  userId: number
  name: string
  school: string
  totalScore: number
  totalCorrect: number
  totalQuestions: number
  modulesCompleted: number
  isCurrentUser: boolean
}

const isLoading = ref(true)
const modules = ref<GamificationModuleItem[]>([])
const defaultBadges: BadgeItem[] = [
  {
    id: 1,
    name: 'Calm Player',
    description: 'Diberikan kepada siswa yang berhasil menuntaskan kuis resolusi konflik.',
    criteria: 'Selesaikan 1 kali Kuis Modul Gamifikasi',
    isUnlocked: false,
  },
  {
    id: 2,
    name: 'Communicator',
    description: 'Diberikan kepada siswa yang memahami gaya resolusi konflik pribadinya.',
    criteria: 'Selesaikan Kuis Profil Gaya Resolusi Konflik',
    isUnlocked: false,
  },
  {
    id: 3,
    name: 'Conflict Solver',
    description: 'Lencana kehormatan bagi siswa yang menuntaskan seluruh paket kuis resolusi konflik.',
    criteria: 'Tuntaskan seluruh modul belajar',
    isUnlocked: false,
  },
]
const badges = ref<BadgeItem[]>(defaultBadges)
const summary = ref({
  totalModules: 3,
  completedCount: 0,
  progressPercent: 0,
  streakDays: 1,
  totalScore: 0,
})
const userConflictStyle = ref<{ styleName: string; styleDescription?: string } | null>(null)
const unlockedBadgesCount = computed(() => badges.value.filter(b => b.isUnlocked).length)

const leaderboard = ref<LeaderboardEntry[]>([])
const leaderboardSchool = ref('Semua Sekolah')
const myRank = ref<number | null>(null)

const activeSimulation = ref<GamificationModuleItem | null>(null)
const currentQuestionIndex = ref(0)
const selectedOptionForCurrent = ref<ScenarioOption | null>(null)
const quizAnswersList = ref<{ scenarioId: number; optionId: number }[]>([])
const quizScore = ref(0)
const quizCorrectCount = ref(0)
const currentStreak = ref(0)
const lastEarnedPoints = ref(0)
const showScoreScreen = ref(false)
const isSubmitting = ref(false)

const quizTotalQuestions = computed(() => activeSimulation.value?.scenarios?.length || 0)

const currentQuestion = computed(() => {
  if (!activeSimulation.value?.scenarios || activeSimulation.value.scenarios.length === 0) return null
  return activeSimulation.value.scenarios[currentQuestionIndex.value] || null
})

const answeredCount = computed(() => {
  if (showScoreScreen.value) return quizTotalQuestions.value
  return quizAnswersList.value.length
})

const quizProgressBarPercent = computed(() => {
  if (quizTotalQuestions.value === 0) return 0
  if (showScoreScreen.value) return 100
  return Math.round((answeredCount.value / quizTotalQuestions.value) * 100)
})

const isOptionCorrect = (opt: ScenarioOption) => {
  return opt.isRecommended || opt.impactType === 'de_escalation'
}

const getKahootCardClass = (idx: number, total: number) => {
  if (total <= 2) {
    return idx === 0
      ? 'bg-[#1E40AF] hover:bg-[#1C368D] border-b-4 border-[#15296B]'
      : 'bg-[#E21B3C] hover:bg-[#C61532] border-b-4 border-[#9C0F26]'
  }
  const classes = [
    'bg-[#E21B3C] hover:bg-[#C61532] border-b-4 border-[#9C0F26]',
    'bg-[#1E40AF] hover:bg-[#1C368D] border-b-4 border-[#15296B]',
    'bg-[#D89E00] hover:bg-[#BC8900] border-b-4 border-[#946B00]',
    'bg-[#26890C] hover:bg-[#1F7209] border-b-4 border-[#165306]',
  ]
  return classes[idx % 4]
}

const getKahootShape = (idx: number, total: number) => {
  if (total <= 2) {
    return idx === 0 ? 'diamond' : 'triangle'
  }
  const shapes = ['triangle', 'diamond', 'circle', 'square']
  return shapes[idx % 4]
}

const loadGamificationData = async () => {
  isLoading.value = true
  try {
    const rawUser = localStorage.getItem('tanggap_user')
    const userId = rawUser ? JSON.parse(rawUser).id : null

    const [modRes, lbRes] = await Promise.all([
      api.get<{
        success?: boolean
        modules?: GamificationModuleItem[]
        badges?: BadgeItem[]
        summary?: any
      }>('gamification/modules', {
        params: userId ? { userId } : undefined
      }),
      api.get<{
        success?: boolean
        schoolName?: string
        leaderboard?: LeaderboardEntry[]
        myRank?: number | null
      }>('gamification/leaderboard', {
        params: userId ? { userId } : undefined
      }).catch(() => null),
    ])

    if (modRes?.modules && Array.isArray(modRes.modules)) {
      modules.value = modRes.modules
      if (modRes.summary) {
        summary.value = {
          totalModules: modRes.summary.totalModules || modRes.modules.length,
          completedCount: modRes.summary.completedCount || 0,
          progressPercent: modRes.summary.progressPercent || 0,
          streakDays: modRes.summary.streakDays || 1,
          totalScore: modRes.summary.totalScore || 0,
        }
        if (modRes.summary.conflictStyle) {
          userConflictStyle.value = modRes.summary.conflictStyle
        }
      }
    }

    if (modRes?.badges && Array.isArray(modRes.badges)) {
      badges.value = modRes.badges
    } else {
      badges.value = defaultBadges.map(b => {
        let isUnlocked = false
        if (b.id === 1 && summary.value.completedCount > 0) isUnlocked = true
        if (b.id === 2 && Boolean(userConflictStyle.value)) isUnlocked = true
        if (b.id === 3 && summary.value.completedCount >= summary.value.totalModules && summary.value.totalModules > 0) isUnlocked = true
        return { ...b, isUnlocked }
      })
    }

    if (lbRes?.leaderboard) {
      leaderboard.value = lbRes.leaderboard
      leaderboardSchool.value = lbRes.schoolName || 'Semua Sekolah'
      myRank.value = lbRes.myRank ?? null
    }
  } catch (err) {
    console.warn('Gagal memuat modul gamifikasi dari API:', err)
  } finally {
    isLoading.value = false
  }
}

const startSimulation = (mod: GamificationModuleItem) => {
  if (!mod.scenarios || mod.scenarios.length === 0) return
  activeSimulation.value = mod
  currentQuestionIndex.value = 0
  selectedOptionForCurrent.value = null
  quizAnswersList.value = []
  quizScore.value = 0
  quizCorrectCount.value = 0
  currentStreak.value = 0
  lastEarnedPoints.value = 0
  showScoreScreen.value = false
}

const chooseOption = (opt: ScenarioOption) => {
  if (selectedOptionForCurrent.value || !currentQuestion.value) return
  selectedOptionForCurrent.value = opt

  quizAnswersList.value.push({
    scenarioId: currentQuestion.value.id,
    optionId: opt.id,
  })

  if (isOptionCorrect(opt)) {
    quizCorrectCount.value++
    currentStreak.value++
    const pts = 100 + ((currentStreak.value - 1) * 25)
    lastEarnedPoints.value = pts
    quizScore.value += pts
  } else {
    currentStreak.value = 0
    lastEarnedPoints.value = 0
  }
}

const goToNextQuestion = () => {
  if (currentQuestionIndex.value + 1 >= quizTotalQuestions.value) {
    showScoreScreen.value = true
  } else {
    currentQuestionIndex.value++
    selectedOptionForCurrent.value = null
    lastEarnedPoints.value = 0
  }
}

const closeSimulation = () => {
  activeSimulation.value = null
  showScoreScreen.value = false
}

const finishAndSaveQuiz = async () => {
  if (!activeSimulation.value || isSubmitting.value) return
  isSubmitting.value = true

  try {
    const rawUser = localStorage.getItem('tanggap_user')
    const userId = rawUser ? JSON.parse(rawUser).id : null

    if (!isMockMode()) {
      await api.post(`gamification/modules/${activeSimulation.value.id}/submit`, {
        answers: quizAnswersList.value,
        userId,
      })
    }

    await loadGamificationData()
    closeSimulation()
  } catch (err) {
    console.error('Gagal menyimpan hasil kuis:', err)
    closeSimulation()
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

    const rawUser = localStorage.getItem('tanggap_user')
    const userId = rawUser ? JSON.parse(rawUser).id : null

    if (!isMockMode()) {
      await api.post('gamification/conflict-style', {
        styleName: dominantStyle,
        answersSummary: quizAnswers.value,
        userId,
      })
    }

    userConflictStyle.value = { styleName: dominantStyle }
    isConflictQuizOpen.value = false
    await loadGamificationData()
  } catch (err) {
    console.error('Error saving conflict style:', err)
  } finally {
    isSavingStyle.value = false
  }
}

onMounted(() => {
  loadGamificationData()
})
</script>
