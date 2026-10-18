<template>
  <DashboardLayout>
    <div class="space-y-8 max-w-7xl mx-auto pb-12">
      <!-- Header Section -->
      <header class="space-y-2">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Action Toolkit
        </h1>
        <p class="text-slate-500 text-sm sm:text-base max-w-3xl leading-relaxed">
          Temukan perangkat bantu praktis untuk bimbingan konseling, mediasi mandiri, dan penyelesaian konflik.
        </p>
      </header>

      <!-- Search & Sort Controls Toolbar -->
      <div class="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <!-- Search Input -->
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari Toolkit"
            class="w-full bg-white border border-slate-200 rounded-full pl-11 pr-10 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF] transition-all shadow-2xs"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            type="button"
            class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            title="Hapus pencarian"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Sort Dropdown (Matching Action_Toolkit.png) -->
        <div class="relative inline-flex items-center self-start md:self-auto shrink-0">
          <div class="flex items-center gap-2.5 bg-white border border-slate-200 rounded-full pl-4 pr-3.5 py-2 shadow-2xs hover:border-slate-300 relative">
            <img :src="iconUrutan" alt="Urutan" class="w-3.5 h-auto object-contain shrink-0" />
            <div class="text-left leading-tight pr-1">
              <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">URUTKAN</span>
              <span class="block text-xs sm:text-sm font-semibold text-slate-800">
                {{ sortOption === 'name_asc' ? 'Nama A-Z' : sortOption === 'name_desc' ? 'Nama Z-A' : 'Terbaru' }}
              </span>
            </div>
            <svg class="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <select
              v-model="sortOption"
              class="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            >
              <option value="name_asc">Nama A-Z</option>
              <option value="name_desc">Nama Z-A</option>
              <option value="newest">Terbaru</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Filter Tabs / Pills (Matching Action_Toolkit.png) -->
      <div class="flex flex-wrap items-center gap-3">
        <button
          v-for="cat in categoryList"
          :key="cat"
          @click="activeCategory = cat"
          type="button"
          class="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer select-none"
          :class="[
            activeCategory === cat
              ? 'bg-[#E5E7EB] text-slate-800 shadow-2xs font-semibold'
              : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Card Grid (Matching Action_Toolkit.png) -->
      <div v-if="filteredItems.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <article
          v-for="item in filteredItems"
          :key="item.id"
          class="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
        >
          <div>
            <!-- Thumbnail Image Container -->
            <div class="w-full h-72 sm:h-80 rounded-2xl overflow-hidden flex items-center justify-center mb-5">
              <img
                :src="item.image"
                :alt="item.title"
                class="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            <!-- Content Info -->
            <h2 class="text-2xl font-bold text-slate-900 mb-2 leading-snug">
              {{ item.title }}
            </h2>
            <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              {{ item.description }}
            </p>
          </div>

          <!-- Action Footer -->
          <div class="flex items-center justify-between pt-2">
            <button
              @click="openDetail(item)"
              type="button"
              class="text-base font-semibold text-[#1E40AF] hover:text-blue-800 transition-colors cursor-pointer hover:underline"
            >
              Lihat detail
            </button>

            <!-- Download Button (Matching Action_Toolkit.png) -->
            <button
              @click="downloadItem(item)"
              type="button"
              class="text-slate-900 hover:text-[#1E40AF] transition-colors p-1.5 cursor-pointer"
              :title="'Unduh ' + item.title"
              :aria-label="'Unduh ' + item.title"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
            </button>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-md mx-auto my-12">
        <div class="w-16 h-16 bg-blue-50 text-[#1E40AF] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-slate-900 mb-1">Toolkit Tidak Ditemukan</h3>
        <p class="text-slate-500 text-sm mb-6">
          Tidak ada dokumen toolkit yang sesuai dengan pencarian "{{ searchQuery }}". Silakan coba kata kunci lain.
        </p>
        <button
          @click="resetFilters"
          type="button"
          class="bg-[#1E40AF] hover:bg-blue-800 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm"
        >
          Reset Pencarian
        </button>
      </div>
    </div>

    <!-- Detail Modal Dialog -->
    <transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="selectedItem"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs"
        @click.self="closeDetail"
      >
        <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative">
          <!-- Close Button -->
          <button
            @click="closeDetail"
            type="button"
            class="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-xl transition-colors cursor-pointer"
            aria-label="Tutup Detail"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Modal Body -->
          <div class="flex flex-col sm:flex-row gap-6 mb-6">
            <div class="w-full sm:w-48 h-56 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center shrink-0 p-3">
              <img :src="selectedItem.image" :alt="selectedItem.title" class="w-full h-full object-contain" />
            </div>
            <div class="flex-1 space-y-3">
              <span class="inline-block bg-blue-50 text-[#1E40AF] text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">
                {{ selectedItem.category }}
              </span>
              <h2 class="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                {{ selectedItem.title }}
              </h2>
              <p class="text-slate-600 text-sm leading-relaxed">
                {{ selectedItem.longDescription || selectedItem.description }}
              </p>
            </div>
          </div>

          <!-- Specifications Matrix -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 mb-6 text-xs text-slate-700">
            <div>
              <span class="text-slate-400 block font-medium">Format:</span>
              <span class="font-bold text-slate-800">{{ selectedItem.format }}</span>
            </div>
            <div>
              <span class="text-slate-400 block font-medium">Halaman:</span>
              <span class="font-bold text-slate-800">{{ selectedItem.pages }}</span>
            </div>
            <div>
              <span class="text-slate-400 block font-medium">Ukuran Berkas:</span>
              <span class="font-bold text-slate-800">{{ selectedItem.fileSize }}</span>
            </div>
            <div>
              <span class="text-slate-400 block font-medium">Pengguna:</span>
              <span class="font-bold text-slate-800">{{ selectedItem.targetUser }}</span>
            </div>
            <div>
              <span class="text-slate-400 block font-medium">Kesiapan:</span>
              <span class="font-bold text-emerald-600 font-semibold">Siap Cetak / Digital</span>
            </div>
            <div>
              <span class="text-slate-400 block font-medium">Lisensi:</span>
              <span class="font-bold text-slate-800">Tanggap.org Creative Commons</span>
            </div>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-8">
            <span
              v-for="tag in selectedItem.tags"
              :key="tag"
              class="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-lg font-medium"
            >
              #{{ tag }}
            </span>
          </div>

          <!-- Modal Action CTA -->
          <div class="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-slate-100">
            <button
              @click="closeDetail"
              type="button"
              class="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-sm transition-all"
            >
              Tutup
            </button>
            <button
              @click="downloadItem(selectedItem)"
              type="button"
              class="bg-[#1E40AF] hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center justify-center gap-2 text-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Unduh Toolkit PDF</span>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Toast Notification Feedback -->
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-4 opacity-0 sm:translate-y-0 sm:translate-x-4"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="toastMessage"
        class="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 max-w-md text-sm"
      >
        <div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div class="flex-1">
          <p class="font-semibold text-white">Proses Unduhan Dimulai</p>
          <p class="text-xs text-slate-300">{{ toastMessage }}</p>
        </div>
        <button
          @click="toastMessage = null"
          type="button"
          class="text-slate-400 hover:text-white p-1 rounded-lg"
          aria-label="Tutup Notifikasi"
        >
          ✕
        </button>
      </div>
    </transition>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import DashboardLayout from '../../components/layouts/DashboardLayout.vue'

// Assets (Action Toolkit uses toolkit_taking_action.png)
import toolkitTakingActionImg from '../../assets/toolkit_taking_action.png'
import iconUrutan from '../../assets/icon_urutan.png'

interface ToolkitItem {
  id: string
  title: string
  category: 'Bimbingan dan Konseling (BK)' | 'Mediasi Mandiri'
  description: string
  longDescription?: string
  image: string
  tags: string[]
  format: string
  pages: string
  fileSize: string
  targetUser: string
  downloadUrl?: string
}

// Search and Filter State
const searchQuery = ref('')
const activeCategory = ref('Semua Konten')
const sortOption = ref<'name_asc' | 'name_desc' | 'newest'>('name_asc')
const selectedItem = ref<ToolkitItem | null>(null)
const toastMessage = ref<string | null>(null)
let toastTimer: ReturnType<typeof setTimeout> | null = null

const categoryList = [
  'Semua Konten',
  'Bimbingan dan Konseling (BK)',
  'Mediasi Mandiri'
]

// Data Galeri Action Toolkit (Menggunakan Berkas Dokumen Toolkit Taking Action)
const items: ToolkitItem[] = [
  {
    id: 'toolkit-1',
    title: 'Mediasi Mandiri',
    category: 'Mediasi Mandiri',
    description: 'Perangkat bantu untuk mendukung proses mediasi dan penyelesaian konflik secara mandiri.',
    longDescription: 'Panduan praktis terstruktur yang memandu dua individu atau kelompok kecil yang berselisih untuk duduk bersama tanpa eskalasi emosi. Dilengkapi aturan bicara bergantian, teknik validasi perasaan, dan format kesepakatan damai tertulis.',
    image: toolkitTakingActionImg,
    tags: ['Mediasi Mandiri', 'Langkah Praktis', 'Resolusi Damai'],
    format: 'PDF Siap Cetak (A4)',
    pages: '12 Halaman',
    fileSize: '2.4 MB',
    targetUser: 'Siswa SMA & Konselor Sebaya'
  },
  {
    id: 'toolkit-2',
    title: 'Mediasi Mandiri',
    category: 'Bimbingan dan Konseling (BK)',
    description: 'Perangkat bantu untuk mendukung proses mediasi dan penyelesaian konflik secara mandiri.',
    longDescription: 'Instrumen reflektif terstruktur untuk mengenali pemicu amarah dan menstabilkan diri saat emosi memuncak dalam sesi bimbingan konseling.',
    image: toolkitTakingActionImg,
    tags: ['BK', 'Krisis Emosi', 'Refleksi Diri'],
    format: 'PDF Interaktif & Cetak',
    pages: '6 Halaman',
    fileSize: '1.7 MB',
    targetUser: 'Guru BK & Siswa'
  },
  {
    id: 'toolkit-3',
    title: 'Mediasi Mandiri',
    category: 'Mediasi Mandiri',
    description: 'Perangkat bantu untuk mendukung proses mediasi dan penyelesaian konflik secara mandiri.',
    longDescription: 'Template alur dialog mediasi 5 tahap bagi konselor sebaya atau pengurus OSIS.',
    image: toolkitTakingActionImg,
    tags: ['Konselor Sebaya', 'OSIS', 'Template Mediasi'],
    format: 'PDF Form Siap Isi',
    pages: '8 Halaman',
    fileSize: '2.1 MB',
    targetUser: 'Pengurus OSIS & MPK'
  }
]

// Filtered and Sorted Items
const filteredItems = computed(() => {
  let result = [...items]

  // Filter category
  if (activeCategory.value !== 'Semua Konten') {
    result = result.filter((item) => item.category === activeCategory.value)
  }

  // Filter search query
  if (searchQuery.value.trim() !== '') {
    const q = searchQuery.value.toLowerCase().trim()
    result = result.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q))
    )
  }

  // Sorting
  if (sortOption.value === 'name_asc') {
    result.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sortOption.value === 'name_desc') {
    result.sort((a, b) => b.title.localeCompare(a.title))
  } else if (sortOption.value === 'newest') {
    result.reverse()
  }

  return result
})

const resetFilters = () => {
  searchQuery.value = ''
  activeCategory.value = 'Semua Konten'
  sortOption.value = 'name_asc'
}

const openDetail = (item: ToolkitItem) => {
  selectedItem.value = item
}

const closeDetail = () => {
  selectedItem.value = null
}

const downloadItem = (item: ToolkitItem) => {
  if (toastTimer) clearTimeout(toastTimer)
  toastMessage.value = `Toolkit "${item.title}" (${item.fileSize}) sedang dipersiapkan untuk diunduh.`
  toastTimer = setTimeout(() => {
    toastMessage.value = null
  }, 4000)
}

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && selectedItem.value) {
    closeDetail()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
  if (toastTimer) clearTimeout(toastTimer)
})
</script>
