<template>
  <AdminLayout>
    <div class="space-y-6 sm:space-y-8 select-none">
      <!-- Title & Subtitle Section -->
      <header class="space-y-2">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Manajemen Pengguna
        </h1>
        <p class="text-slate-600 text-sm sm:text-base md:text-lg">
          Kelola akun pengguna di tanggap.org.
        </p>
      </header>

      <!-- Action & Filter Bar (Matching Manajemen Pengguna.png) -->
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
              placeholder="Cari Pengguna"
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

        <!-- Tambah Pengguna Primary Button -->
        <button
          @click="isAddModalOpen = true"
          type="button"
          class="px-6 py-3 bg-[#1E40AF] hover:bg-blue-800 active:scale-95 text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer shrink-0"
        >
          <span class="text-xl leading-none font-normal">+</span>
          <span>Tambah Pengguna</span>
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
                <th class="py-5 px-6 sm:px-8">Nama</th>
                <th class="py-5 px-6">Email</th>
                <th class="py-5 px-6">Role</th>
                <th class="py-5 px-6">Tanggal Daftar</th>
                <th class="py-5 px-6">Status</th>
                <th class="py-5 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm sm:text-base">
              <tr
                v-for="user in filteredUsers"
                :key="user.id"
                class="hover:bg-slate-50/70 transition-colors"
              >
                <!-- Nama -->
                <td class="py-5 px-6 sm:px-8 font-bold text-slate-900">
                  {{ user.name }}
                </td>

                <!-- Email -->
                <td class="py-5 px-6 text-slate-600 font-medium">
                  {{ user.email }}
                </td>

                <!-- Role -->
                <td class="py-5 px-6 font-semibold text-slate-700">
                  {{ user.role }}
                </td>

                <!-- Tanggal Daftar -->
                <td class="py-5 px-6 text-slate-600 font-medium">
                  {{ user.date }}
                </td>

                <!-- Status Badge -->
                <td class="py-5 px-6">
                  <span
                    class="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold inline-block whitespace-nowrap"
                    :class="user.status === 'Aktif' ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEE2E2] text-[#EF4444]'"
                  >
                    {{ user.status }}
                  </span>
                </td>

                <!-- Aksi Detail Button -->
                <td class="py-5 px-6 text-center">
                  <button
                    @click="openDetail(user)"
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

    <!-- Modal Tambah Pengguna -->
    <AdminModal
      :is-open="isAddModalOpen"
      title="Tambah Pengguna Baru"
      @close="isAddModalOpen = false"
    >
      <form @submit.prevent="submitAddUser" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Nama Lengkap
          </label>
          <input
            v-model="newUser.name"
            required
            type="text"
            placeholder="Contoh: Riqo Rahma Hidayat"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF]"
          />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Alamat Email
          </label>
          <input
            v-model="newUser.email"
            required
            type="email"
            placeholder="contoh@gmail.com"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF]"
          />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Peran (Role)
            </label>
            <select
              v-model="newUser.role"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF]"
            >
              <option value="Siswa">Siswa</option>
              <option value="Guru/Sekolah">Guru/Sekolah</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Status Akun
            </label>
            <select
              v-model="newUser.status"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF]"
            >
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
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
          @click="submitAddUser"
          type="button"
          class="px-5 py-2.5 rounded-xl bg-[#1E40AF] hover:bg-blue-800 text-white font-bold text-sm cursor-pointer transition-colors shadow-sm"
        >
          Simpan Pengguna
        </button>
      </template>
    </AdminModal>

    <!-- Detail Modal -->
    <AdminModal
      :is-open="isDetailModalOpen"
      :title="selectedUser ? `Detail Pengguna - ${selectedUser.name}` : 'Detail Pengguna'"
      @close="isDetailModalOpen = false"
    >
      <div v-if="selectedUser" class="space-y-4 text-sm sm:text-base">
        <div class="bg-slate-50 p-4 rounded-2xl space-y-2.5 border border-slate-100">
          <div class="flex justify-between py-1 border-b border-slate-200/60">
            <span class="text-slate-500 font-medium">Nama:</span>
            <span class="font-bold text-slate-900">{{ selectedUser.name }}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-slate-200/60">
            <span class="text-slate-500 font-medium">Email:</span>
            <span class="font-medium text-blue-600">{{ selectedUser.email }}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-slate-200/60">
            <span class="text-slate-500 font-medium">Peran / Role:</span>
            <span class="font-bold text-slate-800">{{ selectedUser.role }}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-slate-200/60">
            <span class="text-slate-500 font-medium">Tanggal Pendaftaran:</span>
            <span class="font-medium text-slate-700">{{ selectedUser.date }}</span>
          </div>
          <div class="flex justify-between py-1">
            <span class="text-slate-500 font-medium">Status Akun:</span>
            <span
              class="px-3 py-1 rounded-lg text-xs font-bold"
              :class="selectedUser.status === 'Aktif' ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEE2E2] text-[#EF4444]'"
            >
              {{ selectedUser.status }}
            </span>
          </div>
        </div>

        <!-- Role Management (Hanya Admin) -->
        <div>
          <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Ubah Role Pengguna (Akses Admin)
          </label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="r in (['Siswa', 'Guru/Sekolah', 'Admin'] as const)"
              :key="r"
              @click="changeUserRole(r)"
              type="button"
              class="py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer"
              :class="selectedUser.role === r ? 'bg-[#1E40AF] text-white border-[#1E40AF]' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'"
            >
              {{ r }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Ubah Status Akun
          </label>
          <div class="flex gap-2">
            <button
              @click="toggleUserStatus"
              type="button"
              class="py-2 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer"
              :class="selectedUser.status === 'Aktif' ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'"
            >
              {{ selectedUser.status === 'Aktif' ? 'Nonaktifkan Akun' : 'Aktifkan Akun' }}
            </button>
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

interface UserItem {
  id: number | string
  name: string
  email: string
  role: 'Siswa' | 'Guru/Sekolah' | 'Admin'
  date: string
  status: 'Aktif' | 'Nonaktif'
}

const searchQuery = ref('')
const sortOrder = ref<'asc' | 'desc'>('asc')

const users = ref<UserItem[]>([
  {
    id: 1,
    name: 'Riqo rahma',
    email: 'Riqorahma@gmail.com',
    role: 'Siswa',
    date: '13 Juni 2026',
    status: 'Aktif'
  },
  {
    id: 2,
    name: 'Rahma riqo',
    email: 'Riqorahma@gmail.com',
    role: 'Siswa',
    date: '13 Juni 2026',
    status: 'Aktif'
  },
  {
    id: 3,
    name: 'Riqo Hidayat',
    email: 'Riqorahma@gmail.com',
    role: 'Guru/Sekolah',
    date: '12 Juni 2026',
    status: 'Nonaktif'
  },
  {
    id: 4,
    name: 'Rahma hidayat',
    email: 'Riqorahma@gmail.com',
    role: 'Guru/Sekolah',
    date: '8 Mei 2026',
    status: 'Aktif'
  },
  {
    id: 5,
    name: 'Dayat upamecano',
    email: 'Riqorahma@gmail.com',
    role: 'Siswa',
    date: '8 Mei 2026',
    status: 'Aktif'
  },
  {
    id: 6,
    name: 'Virgil Van Dijk',
    email: 'Riqorahma@gmail.com',
    role: 'Siswa',
    date: '8 Mei 2026',
    status: 'Aktif'
  }
])

onMounted(() => {
  // 1. Masukkan akun guru yang emailnya sudah di-ACC oleh Admin ke daftar pengguna
  try {
    const rawApproved = localStorage.getItem('tanggap_approved_teacher_emails')
    if (rawApproved) {
      const approved = JSON.parse(rawApproved)
      for (const t of approved) {
        if (!users.value.some(u => u.email.toLowerCase() === t.email.toLowerCase())) {
          users.value.unshift({
            id: t.id || 'guru-' + Date.now(),
            name: t.picName || 'Guru BK',
            email: t.email,
            role: 'Guru/Sekolah',
            date: 'Hari Ini',
            status: 'Aktif'
          })
        }
      }
    }
  } catch (e) {
    console.warn('Error reading approved teachers:', e)
  }

  // 2. Masukkan akun pendaftar lokal lainnya
  try {
    const rawAccounts = localStorage.getItem('tanggap_user_accounts')
    if (rawAccounts) {
      const accs = JSON.parse(rawAccounts)
      for (const a of accs) {
        if (!users.value.some(u => u.email.toLowerCase() === a.email.toLowerCase())) {
          users.value.unshift({
            id: 'user-' + Date.now(),
            name: a.name || 'Pengguna Baru',
            email: a.email,
            role: a.role === 'Guru BK' ? 'Guru/Sekolah' : 'Siswa',
            date: 'Hari Ini',
            status: 'Aktif'
          })
        }
      }
    }
  } catch {}
})

const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const filteredUsers = computed(() => {
  let list = [...users.value]
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
  }
  list.sort((a, b) => {
    return sortOrder.value === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  })
  return list
})

const isAddModalOpen = ref(false)
const newUser = ref<Partial<UserItem>>({
  name: '',
  email: '',
  role: 'Siswa',
  status: 'Aktif'
})

const submitAddUser = () => {
  if (!newUser.value.name || !newUser.value.email) return
  users.value.unshift({
    id: Date.now(),
    name: newUser.value.name,
    email: newUser.value.email,
    role: (newUser.value.role as any) || 'Siswa',
    date: 'Hari Ini',
    status: (newUser.value.status as any) || 'Aktif'
  })
  isAddModalOpen.value = false
  newUser.value = {
    name: '',
    email: '',
    role: 'Siswa',
    status: 'Aktif'
  }
}

const isDetailModalOpen = ref(false)
const selectedUser = ref<UserItem | null>(null)

const openDetail = (user: UserItem) => {
  selectedUser.value = user
  isDetailModalOpen.value = true
}

const toggleUserStatus = () => {
  if (selectedUser.value) {
    selectedUser.value.status = selectedUser.value.status === 'Aktif' ? 'Nonaktif' : 'Aktif'
  }
}

const changeUserRole = (newRole: 'Siswa' | 'Guru/Sekolah' | 'Admin') => {
  if (selectedUser.value) {
    selectedUser.value.role = newRole
  }
}
</script>

