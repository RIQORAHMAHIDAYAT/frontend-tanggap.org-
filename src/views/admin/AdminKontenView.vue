<template>
  <AdminLayout>
    <div class="space-y-6 sm:space-y-8 select-none">
      <!-- Title & Subtitle Section -->
      <header class="space-y-2">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Manajemen Konten
        </h1>
        <p class="text-slate-600 text-sm sm:text-base md:text-lg">
          Kelola konten yang ditampilkan pada platformtanggap.org.
        </p>
      </header>

      <div class="inline-flex flex-wrap items-center rounded-t-2xl bg-slate-100/90 border border-slate-200/70 overflow-hidden">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          type="button"
          class="px-5 sm:px-7 py-3 font-bold text-sm sm:text-base transition-all cursor-pointer"
          :class="[
            activeTab === tab.id
              ? 'bg-[#1C368D] text-white rounded-t-xl shadow-xs'
              : 'text-slate-500 hover:bg-slate-200/70 hover:text-slate-800'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

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
              :placeholder="searchPlaceholder"
              class="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200/90 rounded-full text-sm focus:outline-none focus:border-[#1C368D] focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
            />
          </div>

          <div class="relative">
            <button
              @click="toggleSort"
              type="button"
              class="w-full sm:w-auto px-4 py-2 bg-white border border-slate-200/90 rounded-full flex items-center justify-between sm:justify-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer text-xs sm:text-sm text-slate-700 font-semibold"
            >
              <div class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                <div class="text-left">
                  <span class="block text-[9px] text-slate-400 font-semibold uppercase leading-tight">URUTKAN</span>
                  <span class="leading-tight text-xs text-slate-800">{{ sortOrder === 'asc' ? 'Nama A-Z' : 'Nama Z-A' }}</span>
                </div>
              </div>
              <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <button
          @click="isAddModalOpen = true"
          type="button"
          class="px-6 py-2.5 bg-[#1C368D] hover:bg-[#162B70] active:scale-95 text-white rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer shrink-0"
        >
          <span class="text-lg leading-none font-normal">+</span>
          <span>Tambah</span>
        </button>
      </div>

      <section v-if="activeTab === 'amigo'" class="space-y-6">
        <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr class="border-b border-slate-200/80 text-slate-500 text-xs sm:text-sm font-semibold">
                  <th class="py-4 px-6 sm:px-8">Deskripsi</th>
                  <th class="py-4 px-6">Mekanisme & Cara Main</th>
                  <th class="py-4 px-6">Link Video</th>
                  <th class="py-4 px-6">Tanggal Diperbarui</th>
                  <th class="py-4 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-xs sm:text-sm">
                <tr
                  v-for="item in filteredAmigo"
                  :key="item.id"
                  class="hover:bg-slate-50/70 transition-colors"
                >
                  <td class="py-4 px-6 sm:px-8 font-bold text-slate-800">
                    {{ item.description }}
                  </td>
                  <td class="py-4 px-6 text-slate-500 font-medium">
                    {{ item.mechanism }}
                  </td>
                  <td class="py-4 px-6 text-slate-500 font-medium">
                    <a :href="item.videoLink" target="_blank" class="hover:text-[#1C368D] hover:underline">
                      {{ item.videoLink }}
                    </a>
                  </td>
                  <td class="py-4 px-6 text-slate-500 font-medium">
                    {{ item.date }}
                  </td>
                  <td class="py-4 px-6 text-center">
                    <button
                      @click="openDetail(item)"
                      type="button"
                      class="px-4 py-1.5 rounded-lg border border-slate-300 text-[#1C368D] hover:bg-blue-50 active:scale-95 font-bold text-xs transition-all cursor-pointer"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex items-center justify-end gap-2">
          <button type="button" class="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer">❮</button>
          <button type="button" class="w-9 h-9 rounded-xl bg-[#1C368D] text-white font-bold text-sm shadow-xs flex items-center justify-center cursor-pointer">1</button>
          <button type="button" class="w-9 h-9 rounded-xl border border-slate-200 bg-white text-[#1C368D] hover:bg-slate-50 font-semibold text-sm flex items-center justify-center cursor-pointer">2</button>
          <button type="button" class="w-9 h-9 rounded-xl border border-slate-200 bg-white text-[#1C368D] hover:bg-slate-50 font-semibold text-sm flex items-center justify-center cursor-pointer">3</button>
          <span class="px-1 text-slate-400">...</span>
          <button type="button" class="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer">❯</button>
        </div>
      </section>

      <section v-if="activeTab === 'toolkit'" class="space-y-6">
        <div class="space-y-3">
          <h2 class="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Ringkasan
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-xl">
            <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
              <div class="w-14 h-14 rounded-full bg-blue-50 text-[#1C368D] flex items-center justify-center shrink-0">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <div class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1.246
                </div>
                <div class="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                  Total Dilihat
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
              <div class="w-14 h-14 rounded-full bg-blue-50 text-[#1C368D] flex items-center justify-center shrink-0">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div>
                <div class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  324
                </div>
                <div class="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                  Total Diunduh
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <h2 class="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Daftar Action Toolkit
          </h2>
          <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr class="border-b border-slate-200/80 text-slate-500 text-xs sm:text-sm font-semibold">
                    <th class="py-4 px-6 sm:px-8">Judul</th>
                    <th class="py-4 px-6">Kategori</th>
                    <th class="py-4 px-6">Dilihat</th>
                    <th class="py-4 px-6">Diunduh</th>
                    <th class="py-4 px-6 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-xs sm:text-sm">
                  <tr
                    v-for="item in filteredToolkits"
                    :key="item.id"
                    class="hover:bg-slate-50/70 transition-colors"
                  >
                    <td class="py-4 px-6 sm:px-8 font-bold text-slate-800">
                      {{ item.title }}
                    </td>
                    <td class="py-4 px-6 text-slate-500 font-medium">
                      {{ item.category }}
                    </td>
                    <td class="py-4 px-6 text-slate-500 font-medium">
                      {{ item.views }}
                    </td>
                    <td class="py-4 px-6 text-slate-500 font-medium">
                      {{ item.downloads }}
                    </td>
                    <td class="py-4 px-6 text-center">
                      <button
                        @click="openDetail(item)"
                        type="button"
                        class="px-4 py-1.5 rounded-lg border border-slate-300 text-[#1C368D] hover:bg-blue-50 active:scale-95 font-bold text-xs transition-all cursor-pointer"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="flex items-center justify-end gap-2 pt-2">
            <button type="button" class="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer">❮</button>
            <button type="button" class="w-9 h-9 rounded-xl bg-[#1C368D] text-white font-bold text-sm shadow-xs flex items-center justify-center cursor-pointer">1</button>
            <button type="button" class="w-9 h-9 rounded-xl border border-slate-200 bg-white text-[#1C368D] hover:bg-slate-50 font-semibold text-sm flex items-center justify-center cursor-pointer">2</button>
            <button type="button" class="w-9 h-9 rounded-xl border border-slate-200 bg-white text-[#1C368D] hover:bg-slate-50 font-semibold text-sm flex items-center justify-center cursor-pointer">3</button>
            <span class="px-1 text-slate-400">...</span>
            <button type="button" class="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer">❯</button>
          </div>
        </div>
      </section>

      <section v-if="activeTab === 'weekly'" class="space-y-6">
        <div class="space-y-3">
          <h2 class="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Daftar Weekly Challenge
          </h2>
          <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr class="border-b border-slate-200/80 text-slate-500 text-xs sm:text-sm font-semibold">
                    <th class="py-4 px-6 sm:px-8">Judul</th>
                    <th class="py-4 px-6">Deskripsi</th>
                    <th class="py-4 px-6">Terkait</th>
                    <th class="py-4 px-6">Periode</th>
                    <th class="py-4 px-6 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-xs sm:text-sm">
                  <tr
                    v-for="item in filteredWeekly"
                    :key="item.id"
                    class="hover:bg-slate-50/70 transition-colors"
                  >
                    <td class="py-4 px-6 sm:px-8 font-bold text-slate-800">
                      {{ item.title }}
                    </td>
                    <td class="py-4 px-6 text-slate-500 font-medium">
                      {{ item.description }}
                    </td>
                    <td class="py-4 px-6 text-slate-500 font-medium">
                      {{ item.related }}
                    </td>
                    <td class="py-4 px-6 text-slate-500 font-medium whitespace-nowrap">
                      {{ item.period }}
                    </td>
                    <td class="py-4 px-6 text-center">
                      <button
                        @click="openDetail(item)"
                        type="button"
                        class="px-4 py-1.5 rounded-lg border border-slate-300 text-[#1C368D] hover:bg-blue-50 active:scale-95 font-bold text-xs transition-all cursor-pointer"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="flex items-center justify-end gap-2 pt-2">
            <button type="button" class="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer">❮</button>
            <button type="button" class="w-9 h-9 rounded-xl bg-[#1C368D] text-white font-bold text-sm shadow-xs flex items-center justify-center cursor-pointer">1</button>
            <button type="button" class="w-9 h-9 rounded-xl border border-slate-200 bg-white text-[#1C368D] hover:bg-slate-50 font-semibold text-sm flex items-center justify-center cursor-pointer">2</button>
            <button type="button" class="w-9 h-9 rounded-xl border border-slate-200 bg-white text-[#1C368D] hover:bg-slate-50 font-semibold text-sm flex items-center justify-center cursor-pointer">3</button>
            <span class="px-1 text-slate-400">...</span>
            <button type="button" class="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer">❯</button>
          </div>
        </div>
      </section>

      <section v-if="activeTab === 'badge'" class="space-y-6">
        <div class="space-y-3">
          <h2 class="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Daftar Digital Badge
          </h2>
          <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr class="border-b border-slate-200/80 text-slate-500 text-xs sm:text-sm font-semibold">
                    <th class="py-4 px-6 sm:px-8">Nama Badge</th>
                    <th class="py-4 px-6">Gambar</th>
                    <th class="py-4 px-6">Deskripsi</th>
                    <th class="py-4 px-6 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-xs sm:text-sm">
                  <tr
                    v-for="item in filteredBadges"
                    :key="item.id"
                    class="hover:bg-slate-50/70 transition-colors"
                  >
                    <td class="py-4 px-6 sm:px-8 font-bold text-slate-800">
                      {{ item.name }}
                    </td>
                    <td class="py-4 px-6">
                      <div class="w-10 h-10 flex items-center justify-center">
                        <div v-if="item.name === 'Calm Player'" class="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center shadow-xs text-white">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15l-3.5 2 .9-3.9L6.5 10.5l4-.3L12 6.5l1.5 3.7 4 .3-2.9 2.6.9 3.9L12 15z" />
                          </svg>
                        </div>
                        <div v-else-if="item.name === 'Communikator'" class="w-9 h-9 rounded-full bg-sky-400 flex items-center justify-center shadow-xs text-white">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div v-else class="w-9 h-9 rounded-full bg-emerald-400 flex items-center justify-center shadow-xs text-white">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l3.5 5L12 4l3.5 4L19 3l-1 13H6L5 3z" />
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td class="py-4 px-6 text-slate-500 font-medium">
                      {{ item.description }}
                    </td>
                    <td class="py-4 px-6 text-center">
                      <button
                        @click="openDetail(item)"
                        type="button"
                        class="px-4 py-1.5 rounded-lg border border-slate-300 text-[#1C368D] hover:bg-blue-50 active:scale-95 font-bold text-xs transition-all cursor-pointer"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="flex items-center justify-end gap-2 pt-2">
            <button type="button" class="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer">❮</button>
            <button type="button" class="w-9 h-9 rounded-xl bg-[#1C368D] text-white font-bold text-sm shadow-xs flex items-center justify-center cursor-pointer">1</button>
            <button type="button" class="w-9 h-9 rounded-xl border border-slate-200 bg-white text-[#1C368D] hover:bg-slate-50 font-semibold text-sm flex items-center justify-center cursor-pointer">2</button>
            <button type="button" class="w-9 h-9 rounded-xl border border-slate-200 bg-white text-[#1C368D] hover:bg-slate-50 font-semibold text-sm flex items-center justify-center cursor-pointer">3</button>
            <span class="px-1 text-slate-400">...</span>
            <button type="button" class="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer">❯</button>
          </div>
        </div>
      </section>
    </div>

    <!-- Universal Add Modal for Current Tab -->
    <AdminModal
      :is-open="isAddModalOpen"
      :title="`Tambah Konten ${activeTabLabel}`"
      @close="isAddModalOpen = false"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Judul / Nama Konten
          </label>
          <input
            v-model="newItem.title"
            type="text"
            placeholder="Masukkan judul konten..."
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF]"
          />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Deskripsi Konten
          </label>
          <textarea
            v-model="newItem.description"
            rows="3"
            placeholder="Masukkan deskripsi detail..."
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E40AF]"
          ></textarea>
        </div>
      </div>

      <template #footer>
        <button
          @click="isAddModalOpen = false"
          type="button"
          class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer transition-colors"
        >
          Batal
        </button>
        <button
          @click="submitAddContent"
          type="button"
          class="px-5 py-2.5 rounded-xl bg-[#1E40AF] hover:bg-blue-800 text-white font-bold text-sm cursor-pointer transition-colors shadow-sm"
        >
          Simpan Konten
        </button>
      </template>
    </AdminModal>

    <!-- Detail Modal -->
    <AdminModal
      :is-open="isDetailModalOpen"
      :title="`Detail Konten - ${activeTabLabel}`"
      @close="isDetailModalOpen = false"
    >
      <div v-if="selectedItem" class="space-y-4 text-sm sm:text-base">
        <div class="bg-slate-50 p-4 rounded-2xl space-y-2.5 border border-slate-100">
          <div v-for="(val, key) in selectedItem" :key="key" class="flex justify-between py-1 border-b border-slate-200/60 last:border-0">
            <span class="text-slate-500 font-medium capitalize">{{ key }}:</span>
            <span class="font-bold text-slate-900 max-w-[280px] text-right truncate">{{ val }}</span>
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
import { ref, computed } from 'vue'
import AdminLayout from '../../components/layouts/AdminLayout.vue'
import AdminModal from '../../components/admin/AdminModal.vue'

type TabType = 'amigo' | 'toolkit' | 'weekly' | 'badge'

const tabs = [
  { id: 'amigo' as TabType, label: 'AMIGO' },
  { id: 'toolkit' as TabType, label: 'Action Toolkit' },
  { id: 'weekly' as TabType, label: 'Weekly Challenge' },
  { id: 'badge' as TabType, label: 'Digital Badge' }
]

const activeTab = ref<TabType>('amigo')
const searchQuery = ref('')
const sortOrder = ref<'asc' | 'desc'>('asc')

const activeTabLabel = computed(() => {
  const found = tabs.find(t => t.id === activeTab.value)
  return found ? found.label : 'Konten'
})

const searchPlaceholder = computed(() => {
  switch (activeTab.value) {
    case 'amigo':
      return 'Cari Amigo'
    case 'toolkit':
      return 'Cari Toolkit'
    case 'weekly':
      return 'Cari Challenge'
    case 'badge':
      return 'Cari Badge'
    default:
      return 'Cari Konten'
  }
})

const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

// 1. Data Amigo (Matching Manajemen konten amigo.png)
const amigoList = ref([
  {
    id: 1,
    description: 'Amigo adalah media.....',
    mechanism: '1. Kenali kartu dan jenis permainan.....',
    videoLink: 'https://youtu.....',
    date: '26 Agustus 2026'
  },
  {
    id: 2,
    description: 'Amigo adalah media.....',
    mechanism: '1. Kenali kartu dan jenis permainan.....',
    videoLink: 'https://youtu.....',
    date: '26 Agustus 2026'
  },
  {
    id: 3,
    description: 'Amigo adalah media.....',
    mechanism: '1. Kenali kartu dan jenis permainan.....',
    videoLink: 'https://youtu.....',
    date: '26 Agustus 2026'
  },
  {
    id: 4,
    description: 'Amigo adalah media.....',
    mechanism: '1. Kenali kartu dan jenis permainan.....',
    videoLink: 'https://youtu.....',
    date: '26 Agustus 2026'
  },
  {
    id: 5,
    description: 'Amigo adalah media.....',
    mechanism: '1. Kenali kartu dan jenis permainan.....',
    videoLink: 'https://youtu.....',
    date: '26 Agustus 2026'
  }
])

const filteredAmigo = computed(() => {
  let list = [...amigoList.value]
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(item => item.description.toLowerCase().includes(q) || item.mechanism.toLowerCase().includes(q))
  }
  return list.sort((a, b) =>
    sortOrder.value === 'asc'
      ? a.description.localeCompare(b.description)
      : b.description.localeCompare(a.description)
  )
})

// 2. Data Action Toolkit (Matching Manajemen konten toolkit.png)
const toolkitList = ref([
  {
    id: 1,
    title: 'Template Konseling Individu',
    category: 'Konseling',
    views: 234,
    downloads: 36
  },
  {
    id: 2,
    title: 'Lembar Kerja Meditasi',
    category: 'Meditasi',
    views: 321,
    downloads: 56
  },
  {
    id: 3,
    title: 'Panduan Komunikasi Efektif',
    category: 'Komunikasi',
    views: 43,
    downloads: 79
  },
  {
    id: 4,
    title: 'Checklist Resolusi Konflik',
    category: 'Konflik',
    views: 569,
    downloads: 52
  }
])

const filteredToolkits = computed(() => {
  let list = [...toolkitList.value]
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(item => item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q))
  }
  return list.sort((a, b) =>
    sortOrder.value === 'asc'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  )
})

// 3. Data Weekly Challenge (Matching Manajemen konten weekly.png)
const weeklyList = ref([
  {
    id: 1,
    title: 'Jaga Emosi, Jaga Hubungan',
    description: 'Latihan mengelola emosi dalam situasi konflik.',
    related: 'Konflik',
    period: '1-7 Mei 2026'
  },
  {
    id: 2,
    title: 'Dengarkan, Pahami',
    description: 'Meningkatkan keterampilan komunikasi aktif.',
    related: 'Komunikasi',
    period: '1-7 Mei 2026'
  },
  {
    id: 3,
    title: 'Bersama Lawan Bullying',
    description: 'Membangun sikap empati.',
    related: 'Meditasi',
    period: '1-7 Mei 2026'
  }
])

const filteredWeekly = computed(() => {
  let list = [...weeklyList.value]
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(item => item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q))
  }
  return list.sort((a, b) =>
    sortOrder.value === 'asc'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  )
})

const badgeList = ref([
  {
    id: 1,
    name: 'Calm Player',
    description: 'Untuk yang bisa mengelola emosi dengan baik.'
  },
  {
    id: 2,
    name: 'Communikator',
    description: 'Untuk yang aktif berkomunikasi secara objektif.'
  },
  {
    id: 3,
    name: 'Burst Heart',
    description: 'Untuk yang berani melawan bullying.'
  }
])

const filteredBadges = computed(() => {
  let list = [...badgeList.value]
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(item => item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q))
  }
  return list.sort((a, b) =>
    sortOrder.value === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  )
})

const isAddModalOpen = ref(false)
const newItem = ref({
  title: '',
  description: ''
})

const submitAddContent = () => {
  if (!newItem.value.title) return
  if (activeTab.value === 'toolkit') {
    toolkitList.value.unshift({
      id: Date.now(),
      title: newItem.value.title,
      category: 'Umum',
      views: 0,
      downloads: 0
    })
  } else if (activeTab.value === 'weekly') {
    weeklyList.value.unshift({
      id: Date.now(),
      title: newItem.value.title,
      description: newItem.value.description || 'Deskripsi tantangan baru.',
      related: 'Umum',
      period: 'Bulan Ini'
    })
  } else if (activeTab.value === 'badge') {
    badgeList.value.unshift({
      id: Date.now(),
      name: newItem.value.title,
      description: newItem.value.description || 'Badge prestasi baru.'
    })
  } else {
    amigoList.value.unshift({
      id: Date.now(),
      description: newItem.value.title,
      mechanism: newItem.value.description || 'Mekanisme permainan...',
      videoLink: 'https://youtu.be/...',
      date: 'Hari ini'
    })
  }
  isAddModalOpen.value = false
  newItem.value = { title: '', description: '' }
}

const isDetailModalOpen = ref(false)
const selectedItem = ref<any>(null)

const openDetail = (item: any) => {
  selectedItem.value = item
  isDetailModalOpen.value = true
}
</script>

