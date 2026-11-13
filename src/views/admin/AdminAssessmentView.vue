<template>
  <AdminLayout>
    <div class="space-y-6 sm:space-y-8 select-none">
      <!-- Title & Subtitle Section -->
      <header class="space-y-2">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Manajemen Assessment
        </h1>
        <p class="text-slate-600 text-sm sm:text-base md:text-lg">
          Kelola instrumen dan pertanyaan assessment.
        </p>
      </header>

      <!-- Action & Filter Bar (Matching Manajemen Assessment.png) -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 max-w-2xl">
          <!-- Search Input -->
          <div class="relative flex-1">
            <span class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari Assessment"
              class="w-full pl-11 pr-4 py-3 bg-white border border-slate-200/90 rounded-2xl text-sm focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
            />
          </div>

          <!-- Sort Button -->
          <div class="relative">
            <button
              @click="toggleSort"
              type="button"
              class="w-full sm:w-auto px-4 py-3 bg-white border border-slate-200/90 rounded-2xl flex items-center justify-between sm:justify-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer text-xs sm:text-sm text-slate-700 font-semibold"
            >
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                <div class="text-left">
                  <span class="block text-[10px] text-slate-400 font-medium uppercase leading-none">URUTKAN</span>
                  <span class="leading-none">{{ sortOrder === 'asc' ? 'Nama A-Z' : 'Nama Z-A' }}</span>
                </div>
              </div>
              <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Tambah Assessment Primary Button -->
        <button
          @click="isAddModalOpen = true"
          type="button"
          class="px-6 py-3 bg-[#1E40AF] hover:bg-blue-800 active:scale-95 text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer shrink-0"
        >
          <span class="text-xl leading-none font-normal">+</span>
          <span>Tambah Assessment</span>
        </button>
      </div>

      <!-- Main Data Table Card -->
      <div class="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <!-- Mobile Swipe Indicator Hint -->
        <div class="sm:hidden px-6 pt-4 text-xs font-semibold text-slate-400 flex items-center gap-1.5 select-none">
          <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <span>Geser tabel ke samping untuk melihat detail</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr class="border-b border-slate-100 text-slate-500 text-xs sm:text-sm font-bold uppercase tracking-wider">
                <th class="py-5 px-6 sm:px-8">Nama Assessment</th>
                <th class="py-5 px-6">Kategori</th>
                <th class="py-5 px-6">Jumlah Pertanyaan</th>
                <th class="py-5 px-6">Status</th>
                <th class="py-5 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm sm:text-base">
              <tr
                v-for="item in filteredAssessments"
                :key="item.id"
                class="hover:bg-slate-50/70 transition-colors"
              >
                <!-- Nama Assessment -->
                <td class="py-5 px-6 sm:px-8 font-bold text-slate-900">
                  {{ item.name }}
                </td>

                <!-- Kategori -->
                <td class="py-5 px-6 text-slate-600 font-medium">
                  {{ item.category }}
                </td>

                <!-- Jumlah Pertanyaan -->
                <td class="py-5 px-6 font-semibold text-slate-700">
                  {{ item.questionCount }}
                </td>

                <!-- Status Badge -->
                <td class="py-5 px-6">
                  <span
                    class="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold inline-block whitespace-nowrap"
                    :class="item.status === 'Aktif' ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEF3C7] text-[#D97706]'"
                  >
                    {{ item.status }}
                  </span>
                </td>

                <!-- Aksi Detail & Hapus Button -->
                <td class="py-5 px-6 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      @click="openDetail(item)"
                      type="button"
                      class="px-3 py-1.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-95 font-bold text-xs sm:text-sm transition-all cursor-pointer"
                    >
                      Detail
                    </button>
                    <button
                      @click="confirmDeleteAssessment(item)"
                      type="button"
                      class="px-3 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 active:scale-95 font-bold text-xs sm:text-sm transition-all cursor-pointer"
                      title="Hapus Assessment"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Section -->
        <div class="p-6 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            class="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            title="Halaman Sebelumnya"
          >
            ❮
          </button>
          <button
            type="button"
            class="w-9 h-9 rounded-xl bg-[#1E40AF] text-white font-bold text-sm shadow-xs flex items-center justify-center"
          >
            1
          </button>
          <button
            type="button"
            class="w-9 h-9 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-sm flex items-center justify-center transition-colors"
          >
            2
          </button>
          <button
            type="button"
            class="w-9 h-9 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-sm flex items-center justify-center transition-colors"
          >
            3
          </button>
          <span class="px-1 text-slate-400">...</span>
          <button
            type="button"
            class="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            title="Halaman Berikutnya"
          >
            ❯
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Tambah Assessment -->
    <AdminModal
      :is-open="isAddModalOpen"
      title="Tambah Instrumen Assessment"
      @close="isAddModalOpen = false"
    >
      <form @submit.prevent="submitAddAssessment" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Nama Assessment
          </label>
          <input
            v-model="newAssessment.name"
            required
            type="text"
            placeholder="Contoh: Manajemen Stres Siswa"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF]"
          />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Kategori
          </label>
          <input
            v-model="newAssessment.category"
            required
            type="text"
            placeholder="Contoh: Psikososial"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF]"
          />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Jumlah Pertanyaan
            </label>
            <input
              v-model.number="newAssessment.questionCount"
              required
              type="number"
              placeholder="30"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF]"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Status
            </label>
            <select
              v-model="newAssessment.status"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF]"
            >
              <option value="Aktif">Aktif</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>
      </form>

      <template #footer>
        <button
          @click="isAddModalOpen = false"
          type="button"
          class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer transition-colors"
        >
          Batal
        </button>
        <button
          @click="submitAddAssessment"
          type="button"
          class="px-5 py-2.5 rounded-xl bg-[#1E40AF] hover:bg-blue-800 text-white font-bold text-sm cursor-pointer transition-colors shadow-sm"
        >
          Simpan Assessment
        </button>
      </template>
    </AdminModal>

    <!-- Detail Modal -->
    <AdminModal
      :is-open="isDetailModalOpen"
      :title="selectedItem ? `Detail Assessment - ${selectedItem.name}` : 'Detail Assessment'"
      @close="isDetailModalOpen = false"
    >
      <div v-if="selectedItem" class="space-y-4 text-sm sm:text-base">
        <div class="bg-slate-50 p-4 rounded-2xl space-y-2.5 border border-slate-100">
          <div class="flex justify-between py-1 border-b border-slate-200/60">
            <span class="text-slate-500 font-medium">Nama Instrumen:</span>
            <span class="font-bold text-slate-900">{{ selectedItem.name }}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-slate-200/60">
            <span class="text-slate-500 font-medium">Kategori:</span>
            <span class="font-bold text-[#1E40AF]">{{ selectedItem.category }}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-slate-200/60">
            <span class="text-slate-500 font-medium">Jumlah Butir Soal:</span>
            <span class="font-bold text-slate-800">{{ selectedItem.questionCount }} Butir</span>
          </div>
          <div class="flex justify-between py-1">
            <span class="text-slate-500 font-medium">Status Publikasi:</span>
            <span
              class="px-3 py-1 rounded-lg text-xs font-bold"
              :class="selectedItem.status === 'Aktif' ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEF3C7] text-[#D97706]'"
            >
              {{ selectedItem.status }}
            </span>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Ubah Status Publikasi
          </label>
          <div class="flex gap-2">
            <button
              @click="toggleStatus"
              type="button"
              class="py-2 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer"
              :class="selectedItem.status === 'Aktif' ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'"
            >
              {{ selectedItem.status === 'Aktif' ? 'Ubah ke Draft' : 'Publikasikan (Aktif)' }}
            </button>
          </div>
        </div>

        <!-- Tombol Hapus Assessment di Modal Detail -->
        <div class="pt-3 border-t border-slate-100 flex justify-end">
          <button
            @click="confirmDeleteAssessment(selectedItem)"
            type="button"
            class="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs sm:text-sm transition-all border border-red-200 cursor-pointer flex items-center gap-1.5"
          >
            <span>🗑️ Hapus Assessment Ini</span>
          </button>
        </div>
      </div>

      <template #footer>
        <button
          @click="isDetailModalOpen = false"
          type="button"
          class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer transition-colors"
        >
          Tutup
        </button>
      </template>
    </AdminModal>

    <!-- Modal Konfirmasi Hapus Assessment -->
    <AdminModal
      :is-open="isDeleteModalOpen"
      title="Konfirmasi Hapus Assessment"
      @close="isDeleteModalOpen = false"
    >
      <div v-if="itemToDelete" class="space-y-4 py-2 text-center sm:text-left">
        <div class="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-2xl mb-2">
          ⚠️
        </div>
        <h4 class="text-lg font-bold text-slate-800 text-center">
          Hapus Assessment Ini?
        </h4>
        <p class="text-slate-600 text-sm text-center leading-relaxed">
          Apakah Anda yakin ingin menghapus assessment <strong>{{ itemToDelete.name }}</strong> (Kategori: {{ itemToDelete.category }})? Data assessment ini akan dihapus dari sistem.
        </p>
      </div>

      <template #footer>
        <div class="flex items-center justify-end gap-3 w-full">
          <button
            @click="isDeleteModalOpen = false"
            type="button"
            :disabled="isDeleting"
            class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm cursor-pointer transition-colors"
          >
            Batal
          </button>
          <button
            @click="executeDeleteAssessment"
            type="button"
            :disabled="isDeleting"
            class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm cursor-pointer transition-all shadow-md active:scale-95 flex items-center gap-1.5"
          >
            <span v-if="isDeleting">Menghapus...</span>
            <span v-else>Ya, Hapus Assessment</span>
          </button>
        </div>
      </template>
    </AdminModal>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AdminLayout from '../../components/layouts/AdminLayout.vue'
import AdminModal from '../../components/admin/AdminModal.vue'

interface AssessmentItem {
  id: number
  name: string
  category: string
  questionCount: number
  status: 'Aktif' | 'Draft'
}

const searchQuery = ref('')
const sortOrder = ref<'asc' | 'desc'>('asc')

const assessments = ref<AssessmentItem[]>([
  {
    id: 1,
    name: 'Resolusi Konflik',
    category: 'Resolusi Konflik',
    questionCount: 26,
    status: 'Draft'
  },
  {
    id: 2,
    name: 'Empati dan Komunikasi',
    category: 'Empati dan Komunikasi',
    questionCount: 28,
    status: 'Aktif'
  },
  {
    id: 3,
    name: 'Pengelola Emosi',
    category: 'Pengelola Emosi',
    questionCount: 30,
    status: 'Aktif'
  },
  {
    id: 4,
    name: 'Kerja Sama',
    category: 'Kerja Sama',
    questionCount: 34,
    status: 'Draft'
  },
  {
    id: 5,
    name: 'Gaya Belajar',
    category: 'Gaya Belajar',
    questionCount: 30,
    status: 'Aktif'
  }
])

const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const filteredAssessments = computed(() => {
  let list = [...assessments.value]
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(a => a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q))
  }
  list.sort((a, b) => {
    return sortOrder.value === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  })
  return list
})

const isAddModalOpen = ref(false)
const newAssessment = ref<Partial<AssessmentItem>>({
  name: '',
  category: '',
  questionCount: 30,
  status: 'Draft'
})

const submitAddAssessment = () => {
  if (!newAssessment.value.name || !newAssessment.value.category) return
  assessments.value.unshift({
    id: Date.now(),
    name: newAssessment.value.name,
    category: newAssessment.value.category,
    questionCount: newAssessment.value.questionCount || 30,
    status: (newAssessment.value.status as any) || 'Draft'
  })
  isAddModalOpen.value = false
  newAssessment.value = {
    name: '',
    category: '',
    questionCount: 30,
    status: 'Draft'
  }
}

const isDetailModalOpen = ref(false)
const selectedItem = ref<AssessmentItem | null>(null)

const openDetail = (item: AssessmentItem) => {
  selectedItem.value = item
  isDetailModalOpen.value = true
}

const toggleStatus = () => {
  if (selectedItem.value) {
    selectedItem.value.status = selectedItem.value.status === 'Aktif' ? 'Draft' : 'Aktif'
  }
}

// Fitur Hapus Assessment
const isDeleteModalOpen = ref(false)
const itemToDelete = ref<AssessmentItem | null>(null)
const isDeleting = ref(false)

const confirmDeleteAssessment = (item: AssessmentItem) => {
  itemToDelete.value = item
  isDeleteModalOpen.value = true
}

const executeDeleteAssessment = () => {
  if (!itemToDelete.value) return
  const targetId = itemToDelete.value.id
  isDeleting.value = true

  assessments.value = assessments.value.filter(a => a.id !== targetId)

  isDeleting.value = false
  isDeleteModalOpen.value = false
  if (selectedItem.value && selectedItem.value.id === targetId) {
    isDetailModalOpen.value = false
  }
}
</script>

