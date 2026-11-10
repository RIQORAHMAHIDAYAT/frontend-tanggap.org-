<template>
  <AdminLayout>
    <div class="space-y-6 sm:space-y-8 select-none">
      <!-- Title & Subtitle Section -->
      <header class="space-y-2">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Manajemen Sekolah
        </h1>
        <p class="text-slate-600 text-sm sm:text-base md:text-lg">
          Kelola data sekolah yang bekerja sama dengan tanggap.org.
        </p>
      </header>

      <!-- Action & Filter Bar (Matching Manajemen Sekolah.png) -->
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
              placeholder="Cari Sekolah"
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

        <!-- Tambah Sekolah Primary Button -->
        <button
          @click="isAddModalOpen = true"
          type="button"
          class="px-6 py-3 bg-[#1E40AF] hover:bg-blue-800 active:scale-95 text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer shrink-0"
        >
          <span class="text-xl leading-none font-normal">+</span>
          <span>Tambah Sekolah</span>
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
                <th class="py-5 px-6 sm:px-8">Nama Sekolah / Instansi</th>
                <th class="py-5 px-6">Akreditasi</th>
                <th class="py-5 px-6">Alamat</th>
                <th class="py-5 px-6">PIC</th>
                <th class="py-5 px-6">Status</th>
                <th class="py-5 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm sm:text-base">
              <tr
                v-for="item in filteredSchools"
                :key="item.id"
                class="hover:bg-slate-50/70 transition-colors"
              >
                <!-- Nama Sekolah -->
                <td class="py-5 px-6 sm:px-8 font-bold text-slate-900">
                  {{ item.name }}
                </td>

                <!-- Akreditasi -->
                <td class="py-5 px-6 font-semibold text-slate-700">
                  {{ item.akreditasi }}
                </td>

                <!-- Alamat -->
                <td class="py-5 px-6 text-slate-600 font-medium">
                  {{ item.alamat }}
                </td>

                <!-- PIC -->
                <td class="py-5 px-6 text-slate-600 font-medium">
                  {{ item.pic }}
                </td>

                <!-- Status Badge -->
                <td class="py-5 px-6">
                  <span
                    class="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold inline-block whitespace-nowrap"
                    :class="statusBadgeClass(item.status)"
                  >
                    {{ item.status }}
                  </span>
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

    <!-- Modal Tambah Sekolah -->
    <AdminModal
      :is-open="isAddModalOpen"
      title="Tambah Sekolah Baru"
      @close="isAddModalOpen = false"
    >
      <form @submit.prevent="submitAddSchool" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Nama Sekolah / Instansi
          </label>
          <input
            v-model="newSchool.name"
            required
            type="text"
            placeholder="Contoh: SMA Negeri 1 Banjar"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF]"
          />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Akreditasi
            </label>
            <select
              v-model="newSchool.akreditasi"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF]"
            >
              <option value="Unggul">Unggul</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Status
            </label>
            <select
              v-model="newSchool.status"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF]"
            >
              <option value="Disetujui">Disetujui</option>
              <option value="Menunggu ditinjau">Menunggu ditinjau</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Alamat Sekolah
          </label>
          <input
            v-model="newSchool.alamat"
            required
            type="text"
            placeholder="Contoh: Jl. Mercubuana No. 12"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF]"
          />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Penanggung Jawab (PIC)
          </label>
          <input
            v-model="newSchool.pic"
            required
            type="text"
            placeholder="Contoh: Budi Santoso"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF]"
          />
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
          @click="submitAddSchool"
          type="button"
          class="px-5 py-2.5 rounded-xl bg-[#1E40AF] hover:bg-blue-800 text-white font-bold text-sm cursor-pointer transition-colors shadow-sm"
        >
          Simpan Sekolah
        </button>
      </template>
    </AdminModal>

    <!-- Detail Modal -->
    <AdminModal
      :is-open="isDetailModalOpen"
      :title="selectedSchool ? `Detail Sekolah - ${selectedSchool.name}` : 'Detail Sekolah'"
      @close="isDetailModalOpen = false"
    >
      <div v-if="selectedSchool" class="space-y-4 text-sm sm:text-base">
        <div class="bg-slate-50 p-4 rounded-2xl space-y-2.5 border border-slate-100">
          <div class="flex justify-between py-1 border-b border-slate-200/60">
            <span class="text-slate-500 font-medium">Nama Sekolah:</span>
            <span class="font-bold text-slate-900">{{ selectedSchool.name }}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-slate-200/60">
            <span class="text-slate-500 font-medium">Akreditasi:</span>
            <span class="font-bold text-[#1E40AF]">{{ selectedSchool.akreditasi }}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-slate-200/60">
            <span class="text-slate-500 font-medium">Alamat:</span>
            <span class="font-medium text-slate-700">{{ selectedSchool.alamat }}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-slate-200/60">
            <span class="text-slate-500 font-medium">PIC Sekolah:</span>
            <span class="font-bold text-slate-900">{{ selectedSchool.pic }}</span>
          </div>
          <div class="flex justify-between py-1">
            <span class="text-slate-500 font-medium">Status Kerjasama:</span>
            <span class="px-3 py-1 rounded-lg text-xs font-bold" :class="statusBadgeClass(selectedSchool.status)">
              {{ selectedSchool.status }}
            </span>
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

interface SchoolItem {
  id: number
  name: string
  akreditasi: string
  alamat: string
  pic: string
  status: 'Menunggu ditinjau' | 'Disetujui' | 'Ditolak'
}

const searchQuery = ref('')
const sortOrder = ref<'asc' | 'desc'>('asc')

const schools = ref<SchoolItem[]>([
  {
    id: 1,
    name: 'SMA Harapan Bangsa',
    akreditasi: 'A',
    alamat: 'Jl. Mercubuana',
    pic: 'Michi Baker',
    status: 'Menunggu ditinjau'
  },
  {
    id: 2,
    name: 'SMP Nusantara',
    akreditasi: 'B',
    alamat: 'Jl. Mercubuana',
    pic: 'Ole Romeny',
    status: 'Disetujui'
  },
  {
    id: 3,
    name: 'SMK Teknologi Mandiri',
    akreditasi: 'A',
    alamat: 'Jl. Mercubuana',
    pic: 'Kevin Diks',
    status: 'Ditolak'
  },
  {
    id: 4,
    name: 'SMA Cendekia',
    akreditasi: 'A',
    alamat: 'Jl. Mercubuana',
    pic: 'Jay Idzes',
    status: 'Disetujui'
  },
  {
    id: 5,
    name: 'Akademi Fukurodani',
    akreditasi: 'Unggul',
    alamat: 'Jl. Mercubuana',
    pic: 'Emil Audero',
    status: 'Menunggu ditinjau'
  },
  {
    id: 6,
    name: 'SMA Karasuno',
    akreditasi: 'B',
    alamat: 'Jl. Mercubuana',
    pic: 'Marteen Paes',
    status: 'Disetujui'
  }
])

const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const filteredSchools = computed(() => {
  let list = [...schools.value]
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(s => s.name.toLowerCase().includes(q) || s.pic.toLowerCase().includes(q))
  }
  list.sort((a, b) => {
    return sortOrder.value === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  })
  return list
})

const isAddModalOpen = ref(false)
const newSchool = ref<Partial<SchoolItem>>({
  name: '',
  akreditasi: 'A',
  alamat: '',
  pic: '',
  status: 'Disetujui'
})

const submitAddSchool = () => {
  if (!newSchool.value.name || !newSchool.value.alamat || !newSchool.value.pic) return
  schools.value.unshift({
    id: Date.now(),
    name: newSchool.value.name,
    akreditasi: newSchool.value.akreditasi || 'A',
    alamat: newSchool.value.alamat,
    pic: newSchool.value.pic,
    status: (newSchool.value.status as any) || 'Disetujui'
  })
  isAddModalOpen.value = false
  newSchool.value = {
    name: '',
    akreditasi: 'A',
    alamat: '',
    pic: '',
    status: 'Disetujui'
  }
}

onMounted(async () => {
  if (isMockMode()) return

  try {
    const res = await api.get<{ success?: boolean; data?: any[] }>('schools')
    const list = res?.data
    if (Array.isArray(list) && list.length > 0) {
      schools.value = list.map((item, idx) => ({
        id: item.id || idx + 1,
        name: item.name || 'Sekolah Mitra',
        akreditasi: item.akreditasi || item.type || 'A',
        alamat: item.city ? `${item.city}, ${item.province || 'Indonesia'}` : (item.address || 'Jl. Pendidikan'),
        pic: item.pic || item.contactName || 'Kepala Sekolah',
        status: item.status === 'Partner Aktif' || item.status === 'Terdaftar' ? 'Disetujui' : (item.status || 'Disetujui')
      }))
    }
  } catch (err) {
    console.warn('Fallback: gagal mengambil daftar sekolah:', err)
  }
})

const isDetailModalOpen = ref(false)
const selectedSchool = ref<SchoolItem | null>(null)

const openDetail = (item: SchoolItem) => {
  selectedSchool.value = item
  isDetailModalOpen.value = true
}

const statusBadgeClass = (status: string) => {
  switch (status) {
    case 'Disetujui':
      return 'bg-[#DCFCE7] text-[#16A34A]'
    case 'Menunggu ditinjau':
      return 'bg-[#FEF3C7] text-[#D97706]'
    case 'Ditolak':
      return 'bg-[#FEE2E2] text-[#EF4444]'
    default:
      return 'bg-slate-100 text-slate-600'
  }
}
</script>

