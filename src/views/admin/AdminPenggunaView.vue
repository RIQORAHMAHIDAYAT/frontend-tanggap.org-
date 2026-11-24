<template>
  <AdminLayout>
    <div class="space-y-6 sm:space-y-8 select-none">
      <header class="space-y-2">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Manajemen Pengguna
        </h1>
        <p class="text-slate-600 text-sm sm:text-base md:text-lg">
          Kelola akun pengguna di tanggap.org.
        </p>
      </header>

      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 max-w-2xl">
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

        <div class="flex flex-wrap items-center gap-3 shrink-0">
          <button
            @click="openQuickTeacherModal"
            type="button"
            class="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            title="Daftarkan akun guru dan custom kode kelas kustom secara instan untuk seminar"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
            </svg>
            <span>+ Buat Akun Guru & Token</span>
          </button>

          <button
            @click="isAddModalOpen = true"
            type="button"
            class="px-5 py-3 bg-[#1E40AF] hover:bg-blue-800 active:scale-95 text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <span class="text-xl leading-none font-normal">+</span>
            <span>Tambah Pengguna</span>
          </button>
        </div>
      </div>

      <div class="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
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
                <td class="py-5 px-6 sm:px-8 font-bold text-slate-900">
                  {{ user.name }}
                </td>

                <td class="py-5 px-6 text-slate-600 font-medium">
                  {{ user.email }}
                </td>

                <td class="py-5 px-6 font-semibold text-slate-700">
                  {{ user.role }}
                </td>

                <td class="py-5 px-6 text-slate-600 font-medium">
                  {{ user.date }}
                </td>

                <td class="py-5 px-6">
                  <span
                    class="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold inline-block whitespace-nowrap"
                    :class="user.status === 'Aktif' ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEE2E2] text-[#EF4444]'"
                  >
                    {{ user.status }}
                  </span>
                </td>

                <td class="py-5 px-6 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      @click="openDetail(user)"
                      type="button"
                      class="px-3.5 py-1.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-95 font-bold text-xs sm:text-sm transition-all cursor-pointer"
                    >
                      Detail
                    </button>
                    <button
                      @click="confirmDeleteUser(user)"
                      type="button"
                      class="px-3 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 active:scale-95 font-bold text-xs sm:text-sm transition-all cursor-pointer"
                      title="Hapus Pengguna"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredUsers.length === 0">
                <td colspan="6" class="py-12 text-center text-slate-400 font-medium">
                  Tidak ada data pengguna.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

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

    <AdminModal
      :is-open="isQuickTeacherModalOpen"
      title="Registrasi Cepat Akun Guru & Token Kelas"
      @close="closeQuickTeacherModal"
    >
      <div class="space-y-4 text-slate-800">
        <div class="p-3.5 rounded-xl bg-blue-50 border border-blue-200/70 text-xs text-blue-900 leading-relaxed">
          <p class="font-bold mb-0.5">Jalur Cepat Seminar & Uji Coba Sekolah:</p>
          <p>
            Formulir ini otomatis mendaftarkan akun Guru, mengaitkan sekolah, dan menerbitkan kode kelas kustom. 
            Jika email guru sudah pernah terdaftar, sistem akan <strong>otomatis meng-upgrade akunnya</strong> tanpa error duplikasi.
          </p>
        </div>

        <div v-if="quickTeacherSuccessMsg" class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-800 space-y-2">
          <div class="font-bold flex items-center gap-1.5 text-emerald-900">
            <span>✓</span>
            <span>{{ quickTeacherSuccessMsg }}</span>
          </div>
          <div v-if="quickTeacherResult" class="bg-white p-3 rounded-lg border border-emerald-200 text-xs space-y-1 font-mono text-slate-700">
            <p><strong>Email:</strong> {{ quickTeacherResult.user.email }}</p>
            <p><strong>Role:</strong> {{ quickTeacherResult.user.role }}</p>
            <p><strong>Sekolah:</strong> {{ quickTeacherResult.school.name }}</p>
            <p><strong>Kode Kelas (Token Siswa):</strong> <span class="text-[#1E40AF] font-bold text-sm">{{ quickTeacherResult.classroom.classCode }}</span></p>
            <p><strong>Password:</strong> {{ quickTeacherResult.defaultPassword }}</p>
          </div>
          <button
            type="button"
            @click="copyQuickTeacherCredentials"
            class="mt-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer transition-colors"
          >
            {{ isCredentialsCopied ? 'Tersalin ke Clipboard!' : 'Salin Data Akun & Kode Kelas' }}
          </button>
        </div>

        <form v-else @submit.prevent="submitQuickTeacher" class="space-y-4">
          <div v-if="quickTeacherErrorMsg" class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold">
            {{ quickTeacherErrorMsg }}
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nama Lengkap Guru <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="quickTeacherForm.name"
              required
              type="text"
              placeholder="Contoh: Ibu Sri Wahyuni, S.Pd"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF] text-sm"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Alamat Email Guru <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="quickTeacherForm.email"
              required
              type="email"
              placeholder="sri.wahyuni@gmail.com"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF] text-sm"
            />
            <span class="text-[11px] text-slate-400 mt-1 block">
              Aman jika email ini sudah terdaftar sebelumnya; akun akan langsung di-upgrade menjadi Guru.
            </span>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nama Sekolah / Instansi <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="quickTeacherForm.schoolName"
              required
              type="text"
              placeholder="Contoh: SMAN 1 Yogyakarta"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF] text-sm"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Custom Kode Kelas (Token Siswa) <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="quickTeacherForm.classCode"
              required
              type="text"
              placeholder="Contoh: SMAN1-BK atau PILOT01"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF] text-sm font-mono uppercase"
            />
            <span class="text-[11px] text-slate-400 mt-1 block">
              Kode ini yang akan dibagikan ke siswa agar langsung terhubung dengan Guru BK sekolah ini.
            </span>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password Akun Guru (Opsional)
            </label>
            <input
              v-model="quickTeacherForm.password"
              type="text"
              placeholder="Default: Tanggap123!"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF] text-sm"
            />
            <span class="text-[11px] text-slate-400 mt-1 block">
              Biarkan kosong jika ingin menggunakan password default (Tanggap123!).
            </span>
          </div>

          <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              @click="closeQuickTeacherModal"
              type="button"
              class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="isQuickTeacherSubmitting"
              class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm cursor-pointer transition-colors shadow-sm disabled:opacity-60"
            >
              {{ isQuickTeacherSubmitting ? 'Memproses...' : 'Proses Akun Guru & Token' }}
            </button>
          </div>
        </form>
      </div>

      <template v-if="quickTeacherSuccessMsg" #footer>
        <button
          @click="closeQuickTeacherModal"
          type="button"
          class="px-5 py-2.5 rounded-xl bg-[#1E40AF] hover:bg-blue-800 text-white font-bold text-sm cursor-pointer transition-colors"
        >
          Selesai & Tutup
        </button>
      </template>
    </AdminModal>

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

        <div class="pt-3 border-t border-slate-100 flex justify-end">
          <button
            @click="confirmDeleteUser(selectedUser)"
            type="button"
            class="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs sm:text-sm transition-all border border-red-200 cursor-pointer"
          >
            Hapus Pengguna Ini
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

    <AdminModal
      :is-open="isDeleteModalOpen"
      title="Konfirmasi Hapus Pengguna"
      @close="isDeleteModalOpen = false"
    >
      <div v-if="userToDelete" class="space-y-4 py-2 text-center sm:text-left">
        <div class="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-2xl mb-2">
          ⚠️
        </div>
        <h4 class="text-lg font-bold text-slate-800 text-center">
          Hapus Pengguna Ini?
        </h4>
        <p class="text-slate-600 text-sm text-center leading-relaxed">
          Apakah Anda yakin ingin menghapus akun <strong>{{ userToDelete.name }}</strong> ({{ userToDelete.email }})? Data pengguna ini akan dihapus secara permanen dari sistem dan database MySQL.
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
            @click="executeDeleteUser"
            type="button"
            :disabled="isDeleting"
            class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm cursor-pointer transition-all shadow-md active:scale-95 flex items-center gap-1.5"
          >
            <span v-if="isDeleting">Menghapus...</span>
            <span v-else>Ya, Hapus Pengguna</span>
          </button>
        </div>
      </template>
    </AdminModal>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '../../components/layouts/AdminLayout.vue'
import AdminModal from '../../components/admin/AdminModal.vue'
import { api, isMockMode } from '../../services/api'

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

const getInitialUserList = (): UserItem[] => {
  try {
    const rawCache = localStorage.getItem('tanggap_admin_users_cache')
    if (rawCache) {
      const parsed = JSON.parse(rawCache)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch {}

  const baseList: UserItem[] = []

  try {
    const rawApproved = localStorage.getItem('tanggap_approved_teacher_emails')
    if (rawApproved) {
      const approvedList = JSON.parse(rawApproved)
      for (const t of approvedList) {
        if (t.email && !baseList.some(u => u.email.toLowerCase() === t.email.toLowerCase())) {
          baseList.unshift({
            id: 'approved-' + (t.id || Date.now()),
            name: t.picName || 'Guru BK',
            email: t.email,
            role: 'Guru/Sekolah',
            date: 'Hari Ini',
            status: 'Aktif'
          })
        }
      }
    }

    const rawAccs = localStorage.getItem('tanggap_user_accounts')
    if (rawAccs) {
      const accs = JSON.parse(rawAccs)
      for (const a of accs) {
        if (a.email && !baseList.some(u => u.email.toLowerCase() === a.email.toLowerCase())) {
          baseList.unshift({
            id: 'local-' + Date.now(),
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

  return baseList
}

const users = ref<UserItem[]>(getInitialUserList())

onMounted(async () => {
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

  if (!isMockMode()) {
    try {
      const res = await api.get<{ success?: boolean; data?: any[] }>('users')
      const apiUsers = res?.data || (Array.isArray(res) ? res : [])
      if (Array.isArray(apiUsers) && apiUsers.length > 0) {
        const mappedUsers: UserItem[] = apiUsers.map((u: any) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role === 'Admin' ? 'Admin' : u.role === 'Guru/Sekolah' ? 'Guru/Sekolah' : 'Siswa',
          date: u.date || 'Hari Ini',
          status: u.status || 'Aktif',
        }))

        try {
          const rawApproved = localStorage.getItem('tanggap_approved_teacher_emails')
          if (rawApproved) {
            const approvedList = JSON.parse(rawApproved)
            for (const t of approvedList) {
              if (t.email && !mappedUsers.some(m => m.email.toLowerCase() === t.email.toLowerCase())) {
                mappedUsers.unshift({
                  id: 'approved-' + (t.id || Date.now()),
                  name: t.picName || 'Guru BK',
                  email: t.email,
                  role: 'Guru/Sekolah',
                  date: 'Hari Ini',
                  status: 'Aktif'
                })
              }
            }
          }
        } catch {}

        try {
          const rawAccounts = localStorage.getItem('tanggap_user_accounts')
          if (rawAccounts) {
            const accs = JSON.parse(rawAccounts)
            for (const a of accs) {
              if (a.email && !mappedUsers.some(m => m.email.toLowerCase() === a.email.toLowerCase())) {
                mappedUsers.unshift({
                  id: 'local-' + Date.now(),
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

        users.value = mappedUsers
        try {
          localStorage.setItem('tanggap_admin_users_cache', JSON.stringify(mappedUsers))
        } catch {}
      }
    } catch (err) {
      console.warn('API users fetch fallback:', err)
    }
  }
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

const isDeleteModalOpen = ref(false)
const userToDelete = ref<UserItem | null>(null)
const isDeleting = ref(false)

const isQuickTeacherModalOpen = ref(false)
const isQuickTeacherSubmitting = ref(false)
const quickTeacherErrorMsg = ref('')
const quickTeacherSuccessMsg = ref('')
const isCredentialsCopied = ref(false)
const quickTeacherResult = ref<{
  user: { id?: number | string; name: string; email: string; role: string; school?: string; status?: string }
  school: { id?: number | string; name: string }
  classroom: { id?: number | string; name: string; classCode: string }
  isNewUser: boolean
  defaultPassword?: string
} | null>(null)

const quickTeacherForm = ref({
  name: '',
  email: '',
  schoolName: '',
  classCode: '',
  password: 'Tanggap123!'
})

const openQuickTeacherModal = () => {
  quickTeacherErrorMsg.value = ''
  quickTeacherSuccessMsg.value = ''
  quickTeacherResult.value = null
  isCredentialsCopied.value = false
  quickTeacherForm.value = {
    name: '',
    email: '',
    schoolName: '',
    classCode: '',
    password: 'Tanggap123!'
  }
  isQuickTeacherModalOpen.value = true
}

const closeQuickTeacherModal = () => {
  isQuickTeacherModalOpen.value = false
}

const copyQuickTeacherCredentials = async () => {
  if (!quickTeacherResult.value) return
  const data = quickTeacherResult.value
  const text = `📋 *DATA AKUN GURU & KODE KELAS TANGGAP.ORG*
Nama Guru: ${data.user.name}
Email: ${data.user.email}
Password: ${data.defaultPassword || 'Tanggap123!'}
Sekolah: ${data.school.name}
Role Akun: ${data.user.role}
Kode Kelas Siswa: *${data.classroom.classCode}*

Link Login Guru: https://tanggap.org/masuk
Siswa dapat memasukkan Kode Kelas di atas saat registrasi atau di fitur gamifikasi Tanggap.org.`

  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
    } else {
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
    isCredentialsCopied.value = true
    setTimeout(() => {
      isCredentialsCopied.value = false
    }, 3000)
  } catch (err) {
    console.error('Gagal menyalin kredensial:', err)
  }
}

const submitQuickTeacher = async () => {
  if (
    !quickTeacherForm.value.name.trim() ||
    !quickTeacherForm.value.email.trim() ||
    !quickTeacherForm.value.schoolName.trim() ||
    !quickTeacherForm.value.classCode.trim()
  ) {
    quickTeacherErrorMsg.value = 'Mohon lengkapi Nama Guru, Email, Nama Sekolah, dan Kode Kelas.'
    return
  }

  isQuickTeacherSubmitting.value = true
  quickTeacherErrorMsg.value = ''
  quickTeacherSuccessMsg.value = ''

  try {
    const payload = {
      name: quickTeacherForm.value.name.trim(),
      email: quickTeacherForm.value.email.trim(),
      schoolName: quickTeacherForm.value.schoolName.trim(),
      classCode: quickTeacherForm.value.classCode.trim().toUpperCase(),
      password: quickTeacherForm.value.password ? quickTeacherForm.value.password.trim() : 'Tanggap123!'
    }

    let responseData: any = null

    if (!isMockMode()) {
      const res = await api.post<{ success: boolean; message: string; data: any }>('admin/quick-provision-teacher', payload)
      if (res && res.data) {
        responseData = res.data
        quickTeacherSuccessMsg.value = res.message || 'Akun Guru dan Kode Kelas berhasil disiapkan!'
      }
    }

    if (!responseData) {
      responseData = {
        user: {
          id: 'quick-' + Date.now(),
          name: payload.name,
          email: payload.email,
          role: 'Guru/Sekolah',
          school: payload.schoolName,
          status: 'Aktif'
        },
        school: {
          id: 1,
          name: payload.schoolName
        },
        classroom: {
          id: 1,
          name: `Kelas BK - ${payload.schoolName}`,
          classCode: payload.classCode
        },
        isNewUser: true,
        defaultPassword: payload.password
      }
      quickTeacherSuccessMsg.value = `Akun Guru (${payload.email}) dan Kode Kelas (${payload.classCode}) berhasil disiapkan!`
    }

    quickTeacherResult.value = responseData

    const existingIndex = users.value.findIndex(u => u.email.toLowerCase() === payload.email.toLowerCase())
    if (existingIndex !== -1) {
      users.value[existingIndex] = {
        ...users.value[existingIndex],
        name: payload.name,
        role: 'Guru/Sekolah',
        status: 'Aktif'
      }
    } else {
      users.value.unshift({
        id: responseData.user.id || Date.now(),
        name: payload.name,
        email: payload.email,
        role: 'Guru/Sekolah',
        date: 'Hari Ini',
        status: 'Aktif'
      })
    }

    try {
      localStorage.setItem('tanggap_admin_users_cache', JSON.stringify(users.value))

      const rawApproved = localStorage.getItem('tanggap_approved_teacher_emails')
      const approvedList = rawApproved ? JSON.parse(rawApproved) : []
      if (!approvedList.some((t: any) => t.email.toLowerCase() === payload.email.toLowerCase())) {
        approvedList.push({
          id: responseData.user.id,
          picName: payload.name,
          email: payload.email,
          schoolName: payload.schoolName,
          classCode: payload.classCode
        })
        localStorage.setItem('tanggap_approved_teacher_emails', JSON.stringify(approvedList))
      }
    } catch {}
  } catch (err: any) {
    console.error('Error quickProvisionTeacher:', err)
    quickTeacherErrorMsg.value = err?.message || 'Terjadi kesalahan saat memproses akun guru dan kode kelas.'
  } finally {
    isQuickTeacherSubmitting.value = false
  }
}

const confirmDeleteUser = (user: UserItem) => {
  userToDelete.value = user
  isDeleteModalOpen.value = true
}

const executeDeleteUser = async () => {
  if (!userToDelete.value) return
  const targetId = userToDelete.value.id
  isDeleting.value = true

  try {
    if (!isMockMode()) {
      await api.delete(`users/${targetId}`)
    }
  } catch (err) {
    console.warn('API delete user failed, deleting locally:', err)
  }

  users.value = users.value.filter(u => String(u.id) !== String(targetId))
  try {
    localStorage.setItem('tanggap_admin_users_cache', JSON.stringify(users.value))
  } catch {}

  try {
    const raw = localStorage.getItem('tanggap_user_accounts')
    if (raw) {
      const list = JSON.parse(raw)
      const updated = list.filter((u: any) => u.email !== userToDelete.value?.email)
      localStorage.setItem('tanggap_user_accounts', JSON.stringify(updated))
    }
  } catch {}

  isDeleting.value = false
  isDeleteModalOpen.value = false
  if (selectedUser.value && String(selectedUser.value.id) === String(targetId)) {
    isDetailModalOpen.value = false
  }
}
</script>

