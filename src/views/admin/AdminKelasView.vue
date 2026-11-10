<template>
  <AdminLayout>
    <div class="space-y-6 sm:space-y-8 select-none">
      <!-- Title & Subtitle Section -->
      <header class="space-y-2">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Manajemen Kelas
        </h1>
        <p class="text-slate-600 text-sm sm:text-base md:text-lg">
          Kelola kelas di tanggap.org.
        </p>
      </header>

      <!-- Action & Filter Bar (Matching Manajemen kelas.png) -->
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
              placeholder="Cari Kelas"
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

        <!-- Tambah Kelas Primary Button -->
        <button
          @click="isAddModalOpen = true"
          type="button"
          class="px-6 py-3 bg-[#1E40AF] hover:bg-blue-800 active:scale-95 text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer shrink-0"
        >
          <span class="text-xl leading-none font-normal">+</span>
          <span>Tambah Kelas</span>
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
                <th class="py-5 px-6 sm:px-8">Kelas</th>
                <th class="py-5 px-6">Sekolah</th>
                <th class="py-5 px-6">Kode Kelas</th>
                <th class="py-5 px-6">Jumlah Siswa</th>
                <th class="py-5 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm sm:text-base">
              <tr
                v-for="item in filteredClasses"
                :key="item.id"
                class="hover:bg-slate-50/70 transition-colors"
              >
                <!-- Kelas -->
                <td class="py-5 px-6 sm:px-8 font-bold text-slate-900">
                  {{ item.name }}
                </td>

                <!-- Sekolah -->
                <td class="py-5 px-6 text-slate-600 font-medium">
                  {{ item.school }}
                </td>

                <!-- Kode Kelas -->
                <td class="py-5 px-6">
                  <span class="px-3 py-1 rounded-lg bg-blue-50 text-[#1E40AF] font-bold text-xs tracking-wider border border-blue-100">
                    {{ item.code }}
                  </span>
                </td>

                <!-- Jumlah Siswa -->
                <td class="py-5 px-6 font-semibold text-slate-700">
                  {{ item.studentsCount }}
                </td>

                <!-- Aksi Detail Button -->
                <td class="py-5 px-6 text-center">
                  <button
                    @click="openDetail(item)"
                    type="button"
                    class="px-4 py-1.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-95 font-bold text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    Detail
                  </button>
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

    <!-- Modal Tambah Kelas -->
    <AdminModal
      :is-open="isAddModalOpen"
      title="Tambah Kelas Baru"
      @close="isAddModalOpen = false"
    >
      <form @submit.prevent="submitAddClass" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Nama Kelas
          </label>
          <input
            v-model="newClass.name"
            required
            type="text"
            placeholder="Contoh: Kelas 10 C"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF]"
          />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Sekolah
          </label>
          <input
            v-model="newClass.school"
            required
            type="text"
            placeholder="Contoh: SMA Cendekia"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF]"
          />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Kode Kelas
            </label>
            <input
              v-model="newClass.code"
              required
              type="text"
              placeholder="Contoh: KLS007"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF]"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Jumlah Siswa
            </label>
            <input
              v-model.number="newClass.studentsCount"
              required
              type="number"
              placeholder="30"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF]"
            />
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
          @click="submitAddClass"
          type="button"
          class="px-5 py-2.5 rounded-xl bg-[#1E40AF] hover:bg-blue-800 text-white font-bold text-sm cursor-pointer transition-colors shadow-sm"
        >
          Simpan Kelas
        </button>
      </template>
    </AdminModal>

    <!-- Detail Modal -->
    <AdminModal
      :is-open="isDetailModalOpen"
      :title="selectedClass ? `Detail Kelas - ${selectedClass.name}` : 'Detail Kelas'"
      @close="isDetailModalOpen = false"
    >
      <div v-if="selectedClass" class="space-y-4 text-sm sm:text-base">
        <div class="bg-slate-50 p-4 rounded-2xl space-y-2.5 border border-slate-100">
          <div class="flex justify-between py-1 border-b border-slate-200/60">
            <span class="text-slate-500 font-medium">Nama Kelas:</span>
            <span class="font-bold text-slate-900">{{ selectedClass.name }}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-slate-200/60">
            <span class="text-slate-500 font-medium">Sekolah Asal:</span>
            <span class="font-bold text-[#1E40AF]">{{ selectedClass.school }}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-slate-200/60">
            <span class="text-slate-500 font-medium">Kode Akses Kelas:</span>
            <span class="font-mono font-bold text-blue-700">{{ selectedClass.code }}</span>
          </div>
          <div class="flex justify-between py-1">
            <span class="text-slate-500 font-medium">Total Siswa Terdaftar:</span>
            <span class="font-bold text-slate-900">{{ selectedClass.studentsCount }} Siswa</span>
          </div>
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
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '../../components/layouts/AdminLayout.vue'
import AdminModal from '../../components/admin/AdminModal.vue'
import { api, isMockMode } from '../../services/api'

interface ClassItem {
  id: number | string
  name: string
  school: string
  code: string
  studentsCount: number
}

const searchQuery = ref('')
const sortOrder = ref<'asc' | 'desc'>('asc')

const classes = ref<ClassItem[]>([
  {
    id: 1,
    name: 'Kelas XI IPA 1',
    school: 'SMA Negeri 1',
    code: 'SMAN1A',
    studentsCount: 26
  },
  {
    id: 2,
    name: 'Kelas XI IPS 1',
    school: 'SMA Negeri 1',
    code: 'SMAN1B',
    studentsCount: 28
  },
  {
    id: 3,
    name: 'Kelas Demo',
    school: 'Tanggap.org Demo School',
    code: 'DEMO01',
    studentsCount: 30
  }
])

onMounted(async () => {
  // 1. Ambil custom classes dari localStorage (sekolah baru yang di-ACC Admin)
  let customList: ClassItem[] = []
  try {
    const raw = localStorage.getItem('tanggap_custom_classes')
    if (raw) {
      customList = JSON.parse(raw)
    }
  } catch (e) {
    console.warn('Error reading custom classes:', e)
  }

  // 2. Jika bukan mock, fetch dari API backend
  if (!isMockMode()) {
    try {
      const res = await api.get<{ success?: boolean; data?: any[] }>('classes')
      const apiData = Array.isArray(res?.data) ? res.data : []
      if (apiData.length > 0) {
        const mappedApi: ClassItem[] = apiData.map((c: any, idx: number) => ({
          id: c.id || c.code || idx + 1,
          name: c.name || c.className || `Kelas ${c.code}`,
          school: c.school || 'Sekolah Mitra',
          code: c.code || `KLS00${idx + 1}`,
          studentsCount: c.studentsCount || (25 + (idx % 10))
        }))

        // Gabungkan API data dengan custom classes
        const combined = [...customList]
        for (const item of mappedApi) {
          if (!combined.some(c => c.code === item.code)) {
            combined.push(item)
          }
        }
        classes.value = combined
        return
      }
    } catch (err) {
      console.warn('Gagal fetch classes dari API, menggunakan fallback:', err)
    }
  }

  // Fallback: gabungkan data default dengan custom classes
  if (customList.length > 0) {
    const combined = [...customList]
    for (const item of classes.value) {
      if (!combined.some(c => c.code === item.code)) {
        combined.push(item)
      }
    }
    classes.value = combined
  }
})

const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const filteredClasses = computed(() => {
  let list = [...classes.value]
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(c => c.name.toLowerCase().includes(q) || c.school.toLowerCase().includes(q) || c.code.toLowerCase().includes(q))
  }
  list.sort((a, b) => {
    return sortOrder.value === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  })
  return list
})

const isAddModalOpen = ref(false)
const newClass = ref<Partial<ClassItem>>({
  name: '',
  school: '',
  code: '',
  studentsCount: 30
})

const submitAddClass = () => {
  if (!newClass.value.name || !newClass.value.school || !newClass.value.code) return
  const created: ClassItem = {
    id: newClass.value.code.toUpperCase().trim(),
    name: newClass.value.name,
    school: newClass.value.school,
    code: newClass.value.code.toUpperCase().trim(),
    studentsCount: newClass.value.studentsCount || 30
  }
  classes.value.unshift(created)

  // Simpan ke localStorage agar bisa diakses oleh siswa saat gabung kelas
  try {
    const raw = localStorage.getItem('tanggap_custom_classes')
    const list = raw ? JSON.parse(raw) : []
    list.unshift(created)
    localStorage.setItem('tanggap_custom_classes', JSON.stringify(list))
    window.dispatchEvent(new Event('storage'))
  } catch {}

  isAddModalOpen.value = false
  newClass.value = {
    name: '',
    school: '',
    code: '',
    studentsCount: 30
  }
}

const isDetailModalOpen = ref(false)
const selectedClass = ref<ClassItem | null>(null)

const openDetail = (item: ClassItem) => {
  selectedClass.value = item
  isDetailModalOpen.value = true
}
</script>

