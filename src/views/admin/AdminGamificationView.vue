<template>
  <AdminLayout>
    <div v-if="isEditingMode" class="space-y-5 select-none">
      <div class="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div class="flex items-center gap-3 min-w-0">
          <button
            @click="closeEditor"
            type="button"
            class="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm cursor-pointer transition-colors shrink-0 flex items-center gap-1.5"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Kembali</span>
          </button>

          <div class="min-w-0">
            <h1 class="text-lg sm:text-xl font-extrabold text-slate-900 truncate">
              {{ form.title || 'Paket Kuis Baru' }}
            </h1>
            <p class="text-xs text-slate-500">
              {{ form.scenarios.length }} / 20 Soal • {{ form.category }} • Level {{ form.level }}
            </p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            @click="showModuleInfoDrawer = !showModuleInfoDrawer"
            type="button"
            class="px-4 py-2.5 rounded-xl border font-bold text-xs sm:text-sm cursor-pointer transition-colors"
            :class="showModuleInfoDrawer ? 'bg-blue-50 border-[#1E40AF] text-[#1E40AF]' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'"
          >
            {{ showModuleInfoDrawer ? 'Tutup Info Modul' : 'Edit Judul & Info Modul' }}
          </button>

          <button
            @click="saveModule"
            :disabled="isSaving"
            type="button"
            class="px-6 py-2.5 rounded-xl bg-[#1E40AF] hover:bg-blue-800 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{{ isSaving ? 'Menyimpan...' : 'Simpan Semua Soal' }}</span>
          </button>
        </div>
      </div>

      <div v-if="saveError" class="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-700 font-bold">
        {{ saveError }}
      </div>

      <div v-if="saveSuccess" class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-700 font-bold">
        {{ saveSuccess }}
      </div>

      <div
        v-if="showModuleInfoDrawer"
        class="bg-white rounded-3xl p-5 sm:p-6 border border-blue-200 shadow-xs space-y-4"
      >
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="md:col-span-2">
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Judul Paket Kuis <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="form.title"
              type="text"
              placeholder="Contoh: Regulasi Emosi & Menyikapi Konflik"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:border-[#1E40AF] focus:outline-none bg-slate-50/40"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Kategori
            </label>
            <input
              v-model="form.category"
              type="text"
              placeholder="Komunikasi & Empati"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-[#1E40AF] focus:outline-none bg-slate-50/40"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Level
            </label>
            <input
              v-model.number="form.level"
              type="number"
              min="1"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-[#1E40AF] focus:outline-none bg-slate-50/40"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Deskripsi Singkat Modul
          </label>
          <input
            v-model="form.description"
            type="text"
            placeholder="Jelaskan singkat apa yang akan dipelajari siswa di paket kuis ini..."
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-[#1E40AF] focus:outline-none bg-slate-50/40"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

        <div class="lg:col-span-4 xl:col-span-3 bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-3">
          <div class="flex items-center justify-between px-1">
            <span class="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Daftar Soal ({{ form.scenarios.length }}/20)
            </span>
          </div>

          <div class="space-y-2 max-h-[420px] lg:max-h-[540px] overflow-y-auto pr-1">
            <div
              v-for="(sc, sIdx) in form.scenarios"
              :key="sIdx"
              @click="activeQuestionIdx = Number(sIdx)"
              class="p-3 rounded-2xl border transition-all cursor-pointer group flex items-start justify-between gap-2"
              :class="[
                activeQuestionIdx === Number(sIdx)
                  ? 'bg-[#F0F5FF] border-[#1E40AF] ring-2 ring-blue-100'
                  : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/70'
              ]"
            >
              <div class="min-w-0 flex-1 space-y-1">
                <div class="flex items-center gap-2">
                  <span
                    class="px-2 py-0.5 rounded-md text-[11px] font-extrabold"
                    :class="activeQuestionIdx === Number(sIdx) ? 'bg-[#1E40AF] text-white' : 'bg-slate-100 text-slate-700'"
                  >
                    Soal {{ Number(sIdx) + 1 }}
                  </span>
                  <span class="text-[10px] font-bold text-slate-500">
                    {{ sc.options.length <= 2 ? '2 Pilihan' : '4 Pilihan' }}
                  </span>
                </div>
                <p class="text-xs font-medium text-slate-700 line-clamp-2">
                  {{ sc.situationText.trim() || 'Belum ada teks pertanyaan...' }}
                </p>
              </div>

              <button
                v-if="form.scenarios.length > 1"
                @click.stop="removeQuestionAt(Number(sIdx))"
                type="button"
                class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                title="Hapus soal ini"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <div class="pt-2 border-t border-slate-100 grid grid-cols-1 gap-2">
            <button
              @click="addNewQuestion(4)"
              type="button"
              :disabled="form.scenarios.length >= 20"
              class="w-full py-2.5 px-3 rounded-xl bg-[#1E40AF] hover:bg-blue-800 disabled:opacity-40 text-white font-bold text-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5"
            >
              <span>+ Tambah Soal 4 Pilihan</span>
            </button>
            <button
              @click="addNewQuestion(2)"
              type="button"
              :disabled="form.scenarios.length >= 20"
              class="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5"
            >
              <span>+ Tambah Soal 2 Pilihan</span>
            </button>
          </div>
        </div>

        <div v-if="activeQuestion" class="lg:col-span-8 xl:col-span-9 bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-6">

          <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div class="flex items-center gap-2.5">
              <span class="px-3.5 py-1.5 rounded-xl bg-[#1E40AF] text-white font-extrabold text-sm">
                Soal {{ activeQuestionIdx + 1 }}
              </span>
              <span class="text-xs sm:text-sm text-slate-500 font-medium">
                dari {{ form.scenarios.length }} soal
              </span>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <div class="flex items-center gap-1.5 bg-slate-100 rounded-xl px-2.5 py-1">
                <svg class="w-4 h-4 text-[#1E40AF] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <select
                  v-model.number="activeQuestion.timeLimit"
                  class="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer py-0.5"
                >
                  <option :value="15">15 Detik</option>
                  <option :value="20">20 Detik</option>
                  <option :value="30">30 Detik</option>
                  <option :value="45">45 Detik</option>
                  <option :value="60">60 Detik</option>
                  <option :value="0">Tanpa Timer</option>
                </select>
              </div>

              <div class="inline-flex rounded-xl p-1 bg-slate-100 gap-1">
                <button
                  type="button"
                  @click="setOptionCount(2)"
                  class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  :class="activeQuestion.options.length <= 2 ? 'bg-[#1E40AF] text-white shadow-xs' : 'text-slate-600 hover:bg-white'"
                >
                  2 Pilihan (A–B)
                </button>
                <button
                  type="button"
                  @click="setOptionCount(4)"
                  class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  :class="activeQuestion.options.length > 2 ? 'bg-[#1E40AF] text-white shadow-xs' : 'text-slate-600 hover:bg-white'"
                >
                  4 Pilihan (A–D)
                </button>
              </div>

              <button
                v-if="activeQuestion.options.length <= 2"
                type="button"
                @click="applyTrueFalsePreset"
                class="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold cursor-pointer transition-colors"
                title="Otomatis isi pilihan A menjadi Benar dan pilihan B menjadi Salah"
              >
                Isi "Benar / Salah"
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              Pertanyaan / Situasi Kasus <span class="text-rose-500">*</span>
            </label>
            <textarea
              v-model="activeQuestion.situationText"
              rows="3"
              placeholder="Ketik pertanyaan atau cerita situasi di sini..."
              class="w-full p-4 rounded-2xl border border-slate-200 text-base sm:text-lg font-semibold leading-relaxed text-slate-900 bg-[#F0F5FF]/50 focus:bg-white focus:border-[#1E40AF] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
            ></textarea>
          </div>

          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <label class="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                Pilihan Jawaban (Klik "Tandai Benar" pada jawaban yang paling tepat)
              </label>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="(opt, oIdx) in activeQuestion.options"
                :key="oIdx"
                class="rounded-2xl border-2 p-4 space-y-3 transition-all"
                :class="opt.isRecommended ? 'border-emerald-500 bg-emerald-50/20 shadow-xs' : 'border-slate-200 bg-white'"
              >
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-2">
                    <span
                      class="w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-sm text-white shadow-xs"
                      :class="getOptionBadgeColor(Number(oIdx), activeQuestion.options.length)"
                    >
                      {{ opt.optionLabel }}
                    </span>
                    <span class="font-bold text-xs sm:text-sm text-slate-800">Pilihan {{ opt.optionLabel }}</span>
                  </div>

                  <button
                    type="button"
                    @click="markAsCorrectAnswer(Number(oIdx))"
                    class="px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1"
                    :class="opt.isRecommended ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'"
                  >
                    <span>{{ opt.isRecommended ? '✓ Jawaban Benar' : 'Tandai Benar' }}</span>
                  </button>
                </div>

                <textarea
                  v-model="opt.optionText"
                  rows="2"
                  :placeholder="activeQuestion.options.length <= 2 ? `Bebas ketik teks pilihan ${opt.optionLabel} (misal: Setuju / Tidak Setuju, atau Benar / Salah)...` : `Ketik teks jawaban ${opt.optionLabel}...`"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 bg-slate-50/50 focus:bg-white focus:border-[#1E40AF] focus:outline-none"
                ></textarea>

                <div class="space-y-2">
                  <input
                    v-model="opt.impactTitle"
                    type="text"
                    placeholder="Label status (misal: Jawaban Tepat / Respon Positif)"
                    class="w-full px-3.5 py-2 rounded-xl border border-slate-200/80 text-xs font-bold text-slate-700 bg-slate-50/40 focus:bg-white focus:border-[#1E40AF] focus:outline-none"
                    title="Judul status yang tampil saat siswa memilih opsi ini"
                  />
                  <input
                    v-model="opt.feedbackText"
                    type="text"
                    placeholder="Penjelasan feedback singkat (opsional)..."
                    class="w-full px-3.5 py-2 rounded-xl border border-slate-200/80 text-xs text-slate-600 bg-slate-50/30 focus:bg-white focus:border-[#1E40AF] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              @click="activeQuestionIdx > 0 && activeQuestionIdx--"
              :disabled="activeQuestionIdx === 0"
              type="button"
              class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs sm:text-sm cursor-pointer transition-colors"
            >
              ← Soal Sebelumnya
            </button>

            <div class="flex items-center gap-2">
              <button
                v-if="activeQuestionIdx + 1 < form.scenarios.length"
                @click="activeQuestionIdx++"
                type="button"
                class="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1E40AF] font-bold text-xs sm:text-sm cursor-pointer transition-colors"
              >
                Soal Berikutnya →
              </button>
              <button
                v-else-if="form.scenarios.length < 20"
                @click="addNewQuestion(activeQuestion.options.length <= 2 ? 2 : 4)"
                type="button"
                class="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs sm:text-sm cursor-pointer transition-colors border border-emerald-200"
              >
                + Tambah Soal Berikutnya
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div v-else class="space-y-6 sm:space-y-8 select-none">

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Manajemen Kuis & Gamifikasi
          </h1>
          <p class="text-slate-500 text-sm sm:text-base mt-1">
            Kelola paket kuis simulasi ala Kahoot (maksimal 20 soal per modul, mendukung 2 atau 4 pilihan jawaban)
          </p>
        </div>

        <button
          @click="openCreateEditor"
          type="button"
          class="px-6 py-3.5 bg-[#1E40AF] hover:bg-blue-800 active:scale-95 text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <span class="text-xl leading-none font-normal">+</span>
          <span>Buat Modul Kuis Baru</span>
        </button>
      </div>

      <div class="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="relative w-full sm:w-80">
          <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari judul modul atau kategori..."
            class="w-full pl-11 pr-4 py-3 bg-white border border-slate-200/90 rounded-2xl text-sm focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
          />
        </div>

        <div class="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-semibold">
          <span>Total Modul Aktif:</span>
          <span class="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-bold">{{ modules.length }} Modul</span>
        </div>
      </div>

      <div v-if="isLoading" class="py-16 text-center bg-white rounded-3xl border border-slate-200/80">
        <div class="w-8 h-8 border-3 border-blue-200 border-t-[#1E40AF] rounded-full animate-spin mx-auto mb-3"></div>
        <p class="text-slate-500 text-sm font-medium">Memuat data modul kuis...</p>
      </div>

      <div v-else class="grid grid-cols-1 gap-5">
        <div
          v-for="mod in filteredModules"
          :key="mod.id"
          class="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-5"
        >
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div class="space-y-1.5 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-100 text-[#1E40AF]">
                  Level {{ mod.level }}
                </span>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                  {{ mod.category }}
                </span>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
                  {{ mod.scenarios?.length || 0 }} / 20 Soal
                </span>
                <span
                  class="px-2.5 py-0.5 rounded-full text-xs font-bold"
                  :class="mod.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'"
                >
                  {{ mod.is_active ? 'Aktif' : 'Nonaktif' }}
                </span>
                <span class="text-xs text-slate-400 font-medium">
                  • {{ mod.completions_count || 0 }} Siswa Menyelesaikan
                </span>
              </div>

              <h3 class="text-xl font-extrabold text-slate-900">
                {{ mod.title }}
              </h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                {{ mod.description }}
              </p>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              <button
                @click="openEditEditor(mod)"
                type="button"
                class="px-5 py-2.5 rounded-xl bg-[#1E40AF] hover:bg-blue-800 text-white font-bold text-xs sm:text-sm cursor-pointer transition-colors flex items-center gap-2 shadow-xs"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                <span>Edit Soal Kuis</span>
              </button>
              <button
                @click="deleteModule(mod.id)"
                type="button"
                class="px-3.5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs sm:text-sm cursor-pointer transition-colors"
                title="Hapus Modul"
              >
                Hapus
              </button>
            </div>
          </div>

          <div v-if="mod.scenarios && mod.scenarios.length > 0" class="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/70 space-y-3">
            <span class="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">
              Ringkasan Pertanyaan ({{ mod.scenarios.length }} Soal)
            </span>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                v-for="(sc, sIdx) in mod.scenarios"
                :key="sc.id"
                @click="openEditEditor(mod, Number(sIdx))"
                class="bg-white p-3.5 rounded-xl border border-slate-200/80 hover:border-[#1E40AF] text-xs space-y-1.5 cursor-pointer transition-colors"
              >
                <div class="flex items-center justify-between gap-2">
                  <span class="font-extrabold text-[#1E40AF]">Soal {{ Number(sIdx) + 1 }}</span>
                  <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold text-[10px]">
                    {{ sc.options?.length || 0 }} Pilihan
                  </span>
                </div>
                <p class="text-slate-700 font-medium line-clamp-2">{{ sc.situation_text || sc.situationText }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '../../components/layouts/AdminLayout.vue'
import { api } from '../../services/api'

interface FormOptionItem {
  id?: number
  optionLabel: string
  optionText: string
  feedbackText: string
  impactType: 'de_escalation' | 'escalation' | 'neutral'
  impactTitle: string
  isRecommended: boolean
  scoreDelta: number
}

interface FormScenarioItem {
  id?: number
  title: string
  characterName: string
  situationText: string
  timeLimit: number
  options: FormOptionItem[]
}

interface FormState {
  id: number | null
  title: string
  category: string
  level: number
  description: string
  reflectionQuestion: string
  scenarios: FormScenarioItem[]
}

interface AdminModuleItem {
  id: number
  title: string
  category?: string
  level?: number
  description?: string
  reflection_question?: string
  reflectionQuestion?: string
  is_active?: boolean
  completions_count?: number
  scenarios?: Array<{
    id: number
    title?: string
    situation_text?: string
    situationText?: string
    options?: any[]
  }>
}

const isLoading = ref(true)
const modules = ref<AdminModuleItem[]>([])
const searchQuery = ref('')

const isEditingMode = ref(false)
const showModuleInfoDrawer = ref(false)
const isSaving = ref(false)
const saveError = ref('')
const saveSuccess = ref('')
const activeQuestionIdx = ref(0)

const createDefaultOption = (label: string, isCorrect = false): FormOptionItem => ({
  optionLabel: label,
  optionText: '',
  feedbackText: '',
  impactType: isCorrect ? 'de_escalation' : 'escalation',
  impactTitle: isCorrect ? 'Jawaban Tepat' : 'Kurang Tepat',
  isRecommended: isCorrect,
  scoreDelta: isCorrect ? 100 : 0,
})

const createDefaultQuestion = (num: number, optionCount: 2 | 4 = 4): FormScenarioItem => {
  const options: FormOptionItem[] = []
  for (let i = 0; i < optionCount; i++) {
    options.push(createDefaultOption(String.fromCharCode(65 + i), i === 0))
  }
  return {
    title: `Soal ${num}`,
    characterName: 'Situasi Sekolah',
    situationText: '',
    timeLimit: 30,
    options,
  }
}

const form = ref<FormState>({
  id: null,
  title: '',
  category: 'Komunikasi & Empati',
  level: 1,
  description: '',
  reflectionQuestion: '',
  scenarios: [createDefaultQuestion(1, 4)],
})

const activeQuestion = computed(() => form.value.scenarios[activeQuestionIdx.value] || null)

const filteredModules = computed(() => {
  if (!searchQuery.value.trim()) return modules.value
  const q = searchQuery.value.toLowerCase()
  return modules.value.filter(
    m => m.title.toLowerCase().includes(q) || (m.category && m.category.toLowerCase().includes(q))
  )
})

const getOptionBadgeColor = (idx: number, total: number) => {
  if (total <= 2) {
    return idx === 0 ? 'bg-[#1E40AF]' : 'bg-[#E21B3C]'
  }
  const colors = ['bg-[#E21B3C]', 'bg-[#1E40AF]', 'bg-[#D89E00]', 'bg-[#26890C]']
  return colors[idx % 4]
}

const loadModules = async () => {
  isLoading.value = true
  try {
    const res = await api.get<{ success?: boolean; data?: AdminModuleItem[] }>('gamification/admin/modules')
    if (res?.data && Array.isArray(res.data)) {
      modules.value = res.data
    }
  } catch (err) {
    console.error('Error loading admin gamification modules:', err)
  } finally {
    isLoading.value = false
  }
}

const openCreateEditor = () => {
  saveError.value = ''
  saveSuccess.value = ''
  activeQuestionIdx.value = 0
  showModuleInfoDrawer.value = true
  form.value = {
    id: null,
    title: '',
    category: 'Komunikasi & Empati',
    level: modules.value.length + 1,
    description: '',
    reflectionQuestion: '',
    scenarios: [createDefaultQuestion(1, 4)],
  }
  isEditingMode.value = true
}

const openEditEditor = (mod: any, startQuestionIdx = 0) => {
  saveError.value = ''
  saveSuccess.value = ''
  showModuleInfoDrawer.value = false
  activeQuestionIdx.value = startQuestionIdx

  const mappedScenarios: FormScenarioItem[] = (mod.scenarios || []).map((sc: any, sIdx: number) => {
    const mappedOpts: FormOptionItem[] = (sc.options || []).map((o: any, oIdx: number) => ({
      id: o.id,
      optionLabel: o.optionLabel || o.option_label || String.fromCharCode(65 + oIdx),
      optionText: o.optionText || o.option_text || '',
      feedbackText: o.feedbackText || o.feedback_text || '',
      impactType: (o.impactType || o.impact_type || 'neutral') as any,
      impactTitle: o.impactTitle || o.impact_title || 'Respon',
      isRecommended: Boolean(o.isRecommended ?? o.is_recommended),
      scoreDelta: o.scoreDelta ?? o.score_delta ?? 0,
    }))

    return {
      id: sc.id,
      title: sc.title || `Soal ${sIdx + 1}`,
      characterName: sc.characterName || sc.character_name || 'Situasi Sekolah',
      situationText: sc.situationText || sc.situation_text || '',
      timeLimit: sc.timeLimit ?? sc.time_limit ?? 30,
      options: mappedOpts.length > 0 ? mappedOpts : [createDefaultOption('A', true), createDefaultOption('B', false)],
    }
  })

  form.value = {
    id: mod.id,
    title: mod.title || '',
    category: mod.category || 'Komunikasi & Empati',
    level: mod.level || 1,
    description: mod.description || '',
    reflectionQuestion: mod.reflection_question || mod.reflectionQuestion || '',
    scenarios: mappedScenarios.length > 0 ? mappedScenarios : [createDefaultQuestion(1, 4)],
  }
  isEditingMode.value = true
}

const closeEditor = () => {
  isEditingMode.value = false
  saveError.value = ''
  saveSuccess.value = ''
}

const addNewQuestion = (optionCount: 2 | 4 = 4) => {
  if (form.value.scenarios.length >= 20) return
  const nextNum = form.value.scenarios.length + 1
  form.value.scenarios.push(createDefaultQuestion(nextNum, optionCount))
  activeQuestionIdx.value = form.value.scenarios.length - 1
}

const removeQuestionAt = (idx: number) => {
  if (form.value.scenarios.length <= 1) return
  form.value.scenarios.splice(idx, 1)
  if (activeQuestionIdx.value >= form.value.scenarios.length) {
    activeQuestionIdx.value = form.value.scenarios.length - 1
  }
}

const setOptionCount = (count: 2 | 4) => {
  const q = activeQuestion.value
  if (!q) return

  if (count === 2) {
    q.options = q.options.slice(0, 2)
    while (q.options.length < 2) {
      q.options.push(createDefaultOption(String.fromCharCode(65 + q.options.length), false))
    }
    if (!q.options.some(o => o.isRecommended)) {
      q.options[0].isRecommended = true
      q.options[0].impactType = 'de_escalation'
      q.options[0].impactTitle = 'Jawaban Tepat'
      q.options[0].scoreDelta = 100
    }
  } else {
    while (q.options.length < 4) {
      q.options.push(createDefaultOption(String.fromCharCode(65 + q.options.length), false))
    }
    q.options = q.options.slice(0, 4)
  }

  q.options.forEach((o, i) => {
    o.optionLabel = String.fromCharCode(65 + i)
  })
}

const applyTrueFalsePreset = () => {
  const q = activeQuestion.value
  if (!q || q.options.length < 2) return
  q.options[0].optionText = 'Benar'
  q.options[1].optionText = 'Salah'
}

const markAsCorrectAnswer = (targetIdx: number) => {
  const q = activeQuestion.value
  if (!q) return
  q.options.forEach((o, i) => {
    const isTarget = i === targetIdx
    o.isRecommended = isTarget
    o.impactType = isTarget ? 'de_escalation' : 'escalation'
    if (!o.impactTitle || o.impactTitle === 'Jawaban Tepat' || o.impactTitle === 'Kurang Tepat' || o.impactTitle === 'Respon') {
      o.impactTitle = isTarget ? 'Jawaban Tepat' : 'Kurang Tepat'
    }
    o.scoreDelta = isTarget ? 100 : 0
  })
}

const saveModule = async () => {
  saveError.value = ''
  saveSuccess.value = ''

  if (!form.value.title.trim()) {
    showModuleInfoDrawer.value = true
    saveError.value = 'Judul modul wajib diisi.'
    return
  }
  const emptyQuestionIdx = form.value.scenarios.findIndex(s => !s.situationText.trim())
  if (emptyQuestionIdx !== -1) {
    activeQuestionIdx.value = emptyQuestionIdx
    saveError.value = `Pertanyaan pada Soal #${emptyQuestionIdx + 1} belum diisi.`
    return
  }

  isSaving.value = true

  try {
    const payload = {
      id: form.value.id,
      title: form.value.title.trim(),
      category: form.value.category.trim(),
      level: form.value.level,
      description: form.value.description.trim(),
      reflectionQuestion: form.value.reflectionQuestion.trim(),
      order: form.value.level,
      scenarios: form.value.scenarios.map((sc, sIdx) => ({
        id: sc.id,
        title: sc.title.trim() || `Soal ${sIdx + 1}`,
        characterName: sc.characterName.trim() || 'Situasi Sekolah',
        situationText: sc.situationText.trim(),
        order: sIdx + 1,
        timeLimit: Number(sc.timeLimit ?? 30),
        options: sc.options.map((o, oIdx) => ({
          id: o.id,
          optionLabel: String.fromCharCode(65 + oIdx),
          optionText: o.optionText.trim() || `Pilihan ${String.fromCharCode(65 + oIdx)}`,
          feedbackText: o.feedbackText.trim() || (o.isRecommended ? 'Jawaban tepat!' : 'Kurang tepat, coba perhatikan respon yang lebih empatis.'),
          impactType: o.isRecommended ? 'de_escalation' : 'escalation',
          impactTitle: o.impactTitle.trim() || (o.isRecommended ? 'Jawaban Tepat' : 'Kurang Tepat'),
          isRecommended: Boolean(o.isRecommended),
          scoreDelta: o.isRecommended ? 100 : 0,
        })),
      })),
    }

    const res = await api.post<{ success?: boolean; data?: AdminModuleItem }>('gamification/admin/modules', payload)
    if (res?.data?.id) {
      form.value.id = res.data.id
    }
    saveSuccess.value = 'Semua soal berhasil disimpan ke database!'
    await loadModules()
  } catch (err: any) {
    saveError.value = err?.data?.message || err?.message || 'Gagal menyimpan modul.'
  } finally {
    isSaving.value = false
  }
}

const deleteModule = async (id: number) => {
  if (!confirm('Apakah Anda yakin ingin menghapus modul kuis ini beserta semua soalnya?')) return
  try {
    await api.delete(`gamification/admin/modules/${id}`)
    await loadModules()
  } catch (err) {
    console.error('Error deleting module:', err)
  }
}

onMounted(() => {
  loadModules()
})
</script>
