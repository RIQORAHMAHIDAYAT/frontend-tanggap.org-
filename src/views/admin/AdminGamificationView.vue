<template>
  <AdminLayout>
    <div class="space-y-6 sm:space-y-8 select-none">
      
      <header class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="space-y-1.5">
          <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Manajemen Gamifikasi
          </h1>
          <p class="text-slate-500 text-sm sm:text-base max-w-3xl leading-relaxed">
            Kelola materi topik, skenario kasus, pilihan respon, dan umpan balik emosional untuk pembelajaran siswa.
          </p>
        </div>

        <button
          @click="openAddModal"
          type="button"
          class="px-6 py-3.5 bg-[#1E40AF] hover:bg-blue-800 active:scale-95 text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <span class="text-lg leading-none">+</span>
          <span>Tambah Modul Baru</span>
        </button>
      </header>

      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div class="relative flex-1 max-w-md">
          <span class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari Judul atau Kategori Modul..."
            class="w-full pl-11 pr-4 py-3 bg-white border border-slate-200/90 rounded-2xl text-sm focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
          />
        </div>

        <span class="text-xs sm:text-sm font-semibold text-slate-500">
          Total: {{ filteredModules.length }} Modul Terdaftar
        </span>
      </div>

      <div v-if="isLoading" class="p-12 text-center bg-white rounded-3xl border border-slate-200/80 text-slate-500">
        <div class="w-8 h-8 border-3 border-blue-200 border-t-[#1E40AF] rounded-full animate-spin mx-auto mb-3"></div>
        <p class="text-sm font-medium">Memuat daftar modul...</p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="item in filteredModules"
          :key="item.id"
          class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 hover:border-blue-200 hover:shadow-md transition-all space-y-4"
        >
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="space-y-1 flex-1">
              <div class="flex flex-wrap items-center gap-2 mb-1.5">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-100 text-[#1E40AF]">
                  Level {{ item.level }}
                </span>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                  {{ item.category }}
                </span>
                <span
                  class="px-2.5 py-0.5 rounded-full text-xs font-bold"
                  :class="item.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'"
                >
                  {{ item.is_active ? 'Aktif' : 'Non-aktif' }}
                </span>
              </div>

              <h3 class="text-xl sm:text-2xl font-bold text-slate-900">
                {{ item.title }}
              </h3>
              <p class="text-slate-600 text-sm leading-relaxed max-w-3xl">
                {{ item.description }}
              </p>
            </div>

            <div class="flex items-center gap-2 self-start md:self-center shrink-0">
              <button
                @click="openEditModal(item)"
                type="button"
                class="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1E40AF] font-bold text-xs sm:text-sm cursor-pointer transition-colors flex items-center gap-2"
              >
                <svg class="w-4 h-4 text-[#1E40AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                <span>Edit Soal & Skenario</span>
              </button>
              <button
                @click="deleteModule(item)"
                type="button"
                class="px-3 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs sm:text-sm cursor-pointer transition-colors flex items-center justify-center"
                title="Hapus Modul"
              >
                <svg class="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          </div>

          <div v-if="item.scenarios && item.scenarios.length > 0" class="mt-4 pt-4 border-t border-slate-100">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Preview Skenario Cerita:
            </span>
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs sm:text-sm text-slate-700 space-y-2">
              <p class="font-medium text-slate-900">
                "{{ item.scenarios[0].situation_text }}"
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                <div
                  v-for="opt in item.scenarios[0].options"
                  :key="opt.id || opt.optionLabel || opt.option_label"
                  class="p-2.5 rounded-xl bg-white border border-slate-200"
                >
                  <span class="font-bold text-[#1E40AF] block mb-0.5">Opsi {{ opt.optionLabel || opt.option_label }}:</span>
                  <p class="text-slate-600 line-clamp-2">{{ opt.optionText || opt.option_text }}</p>
                  <span
                    class="mt-1 inline-block font-extrabold text-[10px] px-2 py-0.5 rounded-md"
                    :class="(opt.impactType || opt.impact_type) === 'de_escalation' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : (opt.impactType || opt.impact_type) === 'escalation' ? 'bg-rose-50 text-rose-700 border border-rose-200/60' : 'bg-slate-100 text-slate-700 border border-slate-200/60'"
                  >
                    {{ (opt.impactType || opt.impact_type) === 'de_escalation' ? 'De-eskalasi' : (opt.impactType || opt.impact_type) === 'escalation' ? 'Eskalasi' : 'Netral / Pasif' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <teleport to="body">
        <div
          v-if="isModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs select-none overflow-y-auto"
        >
          <div class="bg-white rounded-3xl shadow-2xl max-w-5xl w-full border border-slate-100 relative my-6 max-h-[92vh] flex flex-col overflow-hidden">
            
            <div class="px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
              <div class="space-y-0.5">
                <span class="text-xs font-bold text-[#1E40AF] uppercase tracking-wider block">
                  Panel Guru BK & Administrator
                </span>
                <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {{ editingId ? 'Edit Soal & Skenario Modul' : 'Tambah Modul Pembelajaran Baru' }}
                </h2>
                <p class="text-xs sm:text-sm text-slate-500">
                  Susun cerita studi kasus, pilihan respon siswa, dan umpan balik emosi dengan nyaman.
                </p>
              </div>
              <button
                @click="closeModal"
                class="w-9 h-9 rounded-full hover:bg-slate-200/70 flex items-center justify-center text-slate-400 hover:text-slate-700 text-lg transition-colors cursor-pointer shrink-0"
                title="Tutup Formulir"
              >
                ✕
              </button>
            </div>

            <div class="space-y-8 px-6 sm:px-8 py-6 overflow-y-auto flex-1">
              
              <section class="space-y-4 bg-slate-50/50 p-5 sm:p-6 rounded-2xl border border-slate-200/70">
                <div class="border-b border-slate-200/60 pb-3">
                  <h3 class="font-bold text-base text-slate-900">
                    1. Informasi Topik & Pembelajaran
                  </h3>
                  <p class="text-xs text-slate-500 mt-0.5">
                    Tentukan judul modul dan pengelompokan materi bimbingan konseling.
                  </p>
                </div>
                
                <div class="space-y-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Judul Modul Pembelajaran <span class="text-rose-500">*</span>
                    </label>
                    <input
                      v-model="form.title"
                      type="text"
                      placeholder="Contoh: Menyikapi Tuduhan di Depan Umum"
                      class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm sm:text-base font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#1E40AF] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all bg-white"
                    />
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Kategori Materi
                      </label>
                      <input
                        v-model="form.category"
                        type="text"
                        placeholder="Contoh: Regulasi Emosi & De-eskalasi"
                        class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#1E40AF] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all bg-white"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Urutan Level Pembelajaran
                      </label>
                      <input
                        v-model.number="form.level"
                        type="number"
                        min="1"
                        class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-[#1E40AF] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Deskripsi Ringkas Modul
                    </label>
                    <textarea
                      v-model="form.description"
                      rows="3"
                      placeholder="Jelaskan tujuan pembelajaran ini agar siswa memahami mengapa topik ini penting bagi mereka..."
                      class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#1E40AF] focus:ring-2 focus:ring-blue-100 focus:outline-none leading-relaxed transition-all bg-white"
                    ></textarea>
                  </div>
                </div>
              </section>

              <section class="space-y-4 bg-blue-50/30 p-5 sm:p-6 rounded-2xl border border-blue-200/70">
                <div class="border-b border-blue-200/60 pb-3">
                  <h3 class="font-bold text-base text-[#1E40AF]">
                    2. Cerita Skenario Studi Kasus di Sekolah
                  </h3>
                  <p class="text-xs text-slate-600 mt-0.5">
                    Tuliskan narasi kejadian yang realistis dan dekat dengan kehidupan siswa sehari-hari. Kolom ini dibuat lebih luas agar Anda leluasa menulis paragraf cerita.
                  </p>
                </div>
                
                <div>
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Teks Narasi Kasus <span class="text-rose-500">*</span>
                  </label>
                  <textarea
                    v-model="form.situationText"
                    rows="6"
                    placeholder="Contoh cerita: Bel istirahat baru berbunyi, tiba-tiba teman sebangkumu memukul meja dan menuduhmu mengambil barangnya di depan teman-teman kelas..."
                    class="w-full p-4 rounded-xl border border-slate-200 text-sm sm:text-base leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-[#1E40AF] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all bg-white font-medium"
                  ></textarea>
                  <span class="text-[11px] text-slate-400 mt-1 block">
                    Tip: Gunakan bahasa percakapan yang alami seperti yang sering diucapkan siswa di lingkungan sekolah.
                  </span>
                </div>
              </section>

              <section class="space-y-5">
                <div>
                  <h3 class="font-bold text-base text-slate-900">
                    3. Pilihan Respon Siswa & Konsekuensi Emosional
                  </h3>
                  <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Sediakan 3 opsi tindakan bercabang. Setiap tindakan harus memiliki dampak psikologis nyata bagi lawan bicara.
                  </p>
                </div>

                <div class="space-y-5">
                  <div
                    v-for="(opt, idx) in form.options"
                    :key="idx"
                    class="p-5 sm:p-6 rounded-2xl border bg-white transition-all space-y-4"
                    :class="[
                      opt.impactType === 'de_escalation'
                        ? 'border-emerald-200/90 shadow-2xs hover:border-emerald-300'
                        : opt.impactType === 'escalation'
                          ? 'border-rose-200/90 shadow-2xs hover:border-rose-300'
                          : 'border-slate-200 shadow-2xs hover:border-slate-300'
                    ]"
                  >
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div class="flex items-center gap-2">
                        <span
                          class="w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-sm text-white"
                          :class="[
                            opt.impactType === 'de_escalation'
                              ? 'bg-emerald-600'
                              : opt.impactType === 'escalation'
                                ? 'bg-rose-600'
                                : 'bg-slate-600'
                          ]"
                        >
                          {{ opt.optionLabel }}
                        </span>
                        <span class="font-bold text-sm text-slate-800">
                          Pilihan Tindakan {{ opt.optionLabel }}
                        </span>
                      </div>

                      <div class="inline-flex rounded-xl p-1 bg-slate-100 gap-1 shrink-0 self-start sm:self-auto">
                        <button
                          type="button"
                          @click="opt.impactType = 'de_escalation'"
                          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                          :class="[
                            opt.impactType === 'de_escalation'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                          ]"
                        >
                          De-eskalasi (Meredakan)
                        </button>
                        <button
                          type="button"
                          @click="opt.impactType = 'escalation'"
                          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                          :class="[
                            opt.impactType === 'escalation'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                          ]"
                        >
                          Eskalasi (Memperkeruh)
                        </button>
                        <button
                          type="button"
                          @click="opt.impactType = 'neutral'"
                          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                          :class="[
                            opt.impactType === 'neutral'
                              ? 'bg-slate-700 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                          ]"
                        >
                          Netral / Pasif
                        </button>
                      </div>
                    </div>

                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Teks Respon / Tindakan yang Diucapkan Siswa:
                      </label>
                      <textarea
                        v-model="opt.optionText"
                        rows="3"
                        placeholder="Ketik kalimat atau respon yang akan dipilih siswa..."
                        class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1E40AF] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all bg-slate-50/40"
                      ></textarea>
                    </div>

                    <div>
                      <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Umpan Balik Emosi & Konsekuensi (Feedback Seketika untuk Siswa):
                      </label>
                      <textarea
                        v-model="opt.feedbackText"
                        rows="3"
                        placeholder="Jelaskan apa yang dirasakan oleh teman/lawan bicara setelah respon ini, dan apa dampak jangka panjangnya..."
                        class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1E40AF] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all bg-slate-50/40"
                      ></textarea>
                      <span class="text-[11px] text-slate-400 mt-1 block">
                        Teks ini akan langsung muncul di layar siswa saat mereka mengeklik pilihan {{ opt.optionLabel }}.
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <section class="space-y-3 bg-slate-50/50 p-5 sm:p-6 rounded-2xl border border-slate-200/70">
                <div class="border-b border-slate-200/60 pb-3">
                  <h3 class="font-bold text-base text-slate-900">
                    4. Pertanyaan Jurnal Refleksi Mandiri
                  </h3>
                  <p class="text-xs text-slate-500 mt-0.5">
                    Pertanyaan reflektif di akhir modul agar siswa melatih kesadaran diri (*metakognisi*).
                  </p>
                </div>

                <div>
                  <textarea
                    v-model="form.reflectionQuestion"
                    rows="3"
                    placeholder="Contoh: Pernahkah kamu dituduh hal yang tidak kamu lakukan? Bagaimana caramu menenangkan diri agar tidak membalas dengan amarah?"
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:border-[#1E40AF] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all bg-white leading-relaxed"
                  ></textarea>
                </div>
              </section>

              <div v-if="saveError" class="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-700 font-semibold">
                {{ saveError }}
              </div>

            </div>

            <div class="px-6 sm:px-8 py-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-4 shrink-0">
              <span class="text-xs text-slate-400 hidden sm:inline">
                Pastikan seluruh kolom narasi dan pilihan aksi terisi dengan baik.
              </span>

              <div class="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  @click="closeModal"
                  type="button"
                  class="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm cursor-pointer transition-colors"
                >
                  Batal
                </button>
                <button
                  @click="saveModule"
                  :disabled="isSaving"
                  type="button"
                  class="px-6 py-2.5 rounded-xl bg-[#1E40AF] hover:bg-blue-800 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <span v-if="isSaving">Menyimpan...</span>
                  <span v-else>Simpan Perubahan Modul & Soal</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </teleport>

    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '../../components/layouts/AdminLayout.vue'
import { api, isMockMode } from '../../services/api'

interface OptionItem {
  id?: number
  optionLabel?: string
  option_label?: string
  optionText?: string
  option_text?: string
  feedbackText?: string
  feedback_text?: string
  impactType?: 'de_escalation' | 'escalation' | 'neutral'
  impact_type?: 'de_escalation' | 'escalation' | 'neutral'
  impactTitle?: string
  impact_title?: string
  isRecommended?: boolean
  is_recommended?: boolean
  scoreDelta?: number
  score_delta?: number
}

interface ScenarioItem {
  id?: number
  title?: string
  situation_text?: string
  situationText?: string
  character_name?: string
  characterName?: string
  order?: number
  options?: OptionItem[]
}

interface AdminModule {
  id: number
  title: string
  category: string
  level: number
  description: string
  reflection_question?: string
  order: number
  is_active: boolean
  completions_count?: number
  scenarios?: ScenarioItem[]
}

interface FormOptionItem {
  id?: number
  optionLabel: string
  optionText: string
  feedbackText: string
  impactType: 'de_escalation' | 'escalation' | 'neutral'
  impactTitle?: string
  isRecommended?: boolean
  scoreDelta?: number
}

interface FormState {
  title: string
  category: string
  level: number
  description: string
  reflectionQuestion: string
  situationText: string
  options: FormOptionItem[]
}

const modules = ref<AdminModule[]>([])
const isLoading = ref(true)
const searchQuery = ref('')

const isModalOpen = ref(false)
const editingId = ref<number | null>(null)
const isSaving = ref(false)
const saveError = ref('')

const form = ref<FormState>({
  title: '',
  category: 'Komunikasi & Empati',
  level: 1,
  description: '',
  reflectionQuestion: '',
  situationText: '',
  options: [
    {
      id: undefined,
      optionLabel: 'A',
      optionText: '',
      feedbackText: '',
      impactType: 'escalation',
      impactTitle: 'Eskalasi Konflik Memanas',
      isRecommended: false,
      scoreDelta: 5,
    },
    {
      id: undefined,
      optionLabel: 'B',
      optionText: '',
      feedbackText: '',
      impactType: 'neutral',
      impactTitle: 'Masalah Menggantung',
      isRecommended: false,
      scoreDelta: 8,
    },
    {
      id: undefined,
      optionLabel: 'C',
      optionText: '',
      feedbackText: '',
      impactType: 'de_escalation',
      impactTitle: 'De-eskalasi Berhasil',
      isRecommended: true,
      scoreDelta: 20,
    },
  ]
})

const filteredModules = computed(() => {
  if (!searchQuery.value.trim()) return modules.value
  const q = searchQuery.value.toLowerCase()
  return modules.value.filter(m =>
    m.title.toLowerCase().includes(q) ||
    m.category.toLowerCase().includes(q)
  )
})

const fetchAdminModules = async () => {
  isLoading.value = true
  try {
    const res = await api.get<{ success?: boolean; data?: AdminModule[] }>('gamification/admin/modules')
    if (res?.data && Array.isArray(res.data)) {
      modules.value = res.data
    }
  } catch (err) {
    console.warn('Gagal memuat admin modul gamifikasi:', err)
  } finally {
    isLoading.value = false
  }
}

const openAddModal = () => {
  editingId.value = null
  saveError.value = ''
  form.value = {
    title: '',
    category: 'Komunikasi & Empati',
    level: modules.value.length + 1,
    description: '',
    reflectionQuestion: '',
    situationText: '',
    options: [
      {
        optionLabel: 'A',
        optionText: '',
        feedbackText: '',
        impactType: 'escalation',
        impactTitle: 'Eskalasi Konflik Memanas',
        isRecommended: false,
        scoreDelta: 5,
      },
      {
        optionLabel: 'B',
        optionText: '',
        feedbackText: '',
        impactType: 'neutral',
        impactTitle: 'Masalah Menggantung',
        isRecommended: false,
        scoreDelta: 8,
      },
      {
        optionLabel: 'C',
        optionText: '',
        feedbackText: '',
        impactType: 'de_escalation',
        impactTitle: 'De-eskalasi Berhasil',
        isRecommended: true,
        scoreDelta: 20,
      },
    ]
  }
  isModalOpen.value = true
}

const openEditModal = (item: AdminModule) => {
  editingId.value = item.id
  saveError.value = ''

  const sc = item.scenarios && item.scenarios.length > 0 ? item.scenarios[0] : null
  const opts = sc?.options && sc.options.length >= 3 ? sc.options : []

  form.value = {
    title: item.title,
    category: item.category || 'Komunikasi & Empati',
    level: item.level || 1,
    description: item.description || '',
    reflectionQuestion: item.reflection_question || '',
    situationText: sc?.situation_text || (sc as any)?.situationText || '',
    options: opts.length >= 3 ? opts.map(o => ({
      id: o.id,
      optionLabel: (o as any).optionLabel || (o as any).option_label,
      optionText: (o as any).optionText || (o as any).option_text,
      feedbackText: (o as any).feedbackText || (o as any).feedback_text,
      impactType: ((o as any).impactType || (o as any).impact_type || 'neutral') as any,
      impactTitle: (o as any).impactTitle || (o as any).impact_title || 'Respon',
      isRecommended: (o as any).isRecommended || (o as any).is_recommended || false,
      scoreDelta: (o as any).scoreDelta || (o as any).score_delta || 10,
    })) : [
      {
        optionLabel: 'A',
        optionText: '',
        feedbackText: '',
        impactType: 'escalation',
        impactTitle: 'Eskalasi Konflik Memanas',
        isRecommended: false,
        scoreDelta: 5,
      },
      {
        optionLabel: 'B',
        optionText: '',
        feedbackText: '',
        impactType: 'neutral',
        impactTitle: 'Masalah Menggantung',
        isRecommended: false,
        scoreDelta: 8,
      },
      {
        optionLabel: 'C',
        optionText: '',
        feedbackText: '',
        impactType: 'de_escalation',
        impactTitle: 'De-eskalasi Berhasil',
        isRecommended: true,
        scoreDelta: 20,
      },
    ]
  }

  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveModule = async () => {
  if (!form.value.title.trim() || !form.value.situationText.trim()) {
    saveError.value = 'Judul modul dan teks situasi cerita wajib diisi.'
    return
  }

  isSaving.value = true
  saveError.value = ''

  try {
    const payload = {
      id: editingId.value,
      title: form.value.title.trim(),
      category: form.value.category.trim(),
      level: form.value.level,
      description: form.value.description.trim(),
      reflectionQuestion: form.value.reflectionQuestion.trim(),
      scenarios: [
        {
          title: 'Adegan Utama',
          situationText: form.value.situationText.trim(),
          characterName: 'Teman Sekelas',
          options: form.value.options.map(o => ({
            id: o.id,
            optionLabel: o.optionLabel,
            optionText: o.optionText.trim(),
            feedbackText: o.feedbackText.trim(),
            impactType: o.impactType,
            impactTitle: o.impactType === 'de_escalation'
              ? 'De-eskalasi Berhasil'
              : o.impactType === 'escalation'
                ? 'Eskalasi Konflik Memanas'
                : 'Masalah Menggantung',
            isRecommended: o.impactType === 'de_escalation',
            scoreDelta: o.impactType === 'de_escalation' ? 20 : 5,
          }))
        }
      ]
    }

    if (!isMockMode()) {
      await api.post('gamification/admin/modules', payload)
    }

    await fetchAdminModules()
    closeModal()
  } catch (err: any) {
    saveError.value = err?.data?.message || err?.message || 'Gagal menyimpan modul.'
  } finally {
    isSaving.value = false
  }
}

const deleteModule = async (item: AdminModule) => {
  if (!confirm(`Hapus modul "${item.title}"? Seluruh skenario di dalamnya akan ikut terhapus.`)) return
  try {
    if (!isMockMode()) {
      await api.delete(`gamification/admin/modules/${item.id}`)
    }
    await fetchAdminModules()
  } catch (err: any) {
    alert(err?.data?.message || 'Gagal menghapus modul.')
  }
}

onMounted(() => {
  fetchAdminModules()
})
</script>
