<template>
  <AdminLayout>
    <div class="space-y-6 sm:space-y-8 select-none">
      <!-- Title & Subtitle Section -->
      <header class="space-y-2">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Pengjuan Kerja Sama
        </h1>
        <p class="text-slate-600 text-sm sm:text-base md:text-lg">
          Kelola permohonan sekolah atau guru yang masuk melalui formulir kerja sama.
        </p>
      </header>

      <!-- Main Data Table Card (Matching Pengjuan Kerja Sama.png) -->
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
                <th class="py-5 px-6">PIC</th>
                <th class="py-5 px-6">Nomor WhatsApp</th>
                <th class="py-5 px-6">Tanggal Pengajuan</th>
                <th class="py-5 px-6">Status</th>
                <th class="py-5 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm sm:text-base">
              <tr
                v-for="item in submissions"
                :key="item.id"
                class="hover:bg-slate-50/70 transition-colors"
              >
                <!-- Nama Sekolah -->
                <td class="py-5 px-6 sm:px-8 font-bold text-slate-900">
                  {{ item.schoolName }}
                </td>

                <!-- PIC -->
                <td class="py-5 px-6 text-slate-600 font-medium">
                  {{ item.pic }}
                </td>

                <!-- WhatsApp -->
                <td class="py-5 px-6 text-slate-600 font-medium">
                  {{ item.whatsapp }}
                </td>

                <!-- Tanggal Pengajuan -->
                <td class="py-5 px-6 text-slate-600 font-medium">
                  {{ item.date }}
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

        <!-- Pagination Section (Matching design) -->
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

    <!-- Detail Modal -->
    <AdminModal
      :is-open="isDetailModalOpen"
      :title="selectedItem ? `Detail Pengajuan - ${selectedItem.schoolName}` : 'Detail Pengajuan'"
      @close="isDetailModalOpen = false"
    >
      <div v-if="selectedItem" class="space-y-4 text-sm sm:text-base">
        <div class="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100">
          <div class="flex justify-between py-1 border-b border-slate-200/60">
            <span class="text-slate-500 font-medium">Instansi / Sekolah:</span>
            <span class="font-bold text-slate-900">{{ selectedItem.schoolName }}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-slate-200/60">
            <span class="text-slate-500 font-medium">Person In Charge (PIC):</span>
            <span class="font-bold text-slate-900">{{ selectedItem.pic }}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-slate-200/60">
            <span class="text-slate-500 font-medium">Nomor WhatsApp:</span>
            <span class="font-bold text-blue-600">{{ selectedItem.whatsapp }}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-slate-200/60">
            <span class="text-slate-500 font-medium">Tanggal Masuk:</span>
            <span class="font-semibold text-slate-700">{{ selectedItem.date }}</span>
          </div>
          <div class="flex justify-between py-1">
            <span class="text-slate-500 font-medium">Status Saat Ini:</span>
            <span class="px-3 py-1 rounded-lg text-xs font-bold" :class="statusBadgeClass(selectedItem.status)">
              {{ selectedItem.status }}
            </span>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Ubah Status Pengajuan
          </label>
          <div class="grid grid-cols-3 gap-2">
            <button
              @click="updateStatus('Menunggu ditinjau')"
              type="button"
              :disabled="isUpdatingStatus"
              class="py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer disabled:opacity-60"
              :class="selectedItem.status === 'Menunggu ditinjau' ? 'bg-amber-500 text-white border-amber-600' : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'"
            >
              Menunggu Ditinjau
            </button>
            <button
              @click="updateStatus('Disetujui')"
              type="button"
              :disabled="isUpdatingStatus"
              class="py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer disabled:opacity-60"
              :class="selectedItem.status === 'Disetujui' ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'"
            >
              Setujui
            </button>
            <button
              @click="updateStatus('Ditolak')"
              type="button"
              :disabled="isUpdatingStatus"
              class="py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer disabled:opacity-60"
              :class="selectedItem.status === 'Ditolak' ? 'bg-red-600 text-white border-red-700' : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'"
            >
              Tolak
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
import { ref, onMounted } from 'vue'
import AdminLayout from '../../components/layouts/AdminLayout.vue'
import AdminModal from '../../components/admin/AdminModal.vue'
import { api, isMockMode } from '../../services/api'

interface SubmissionItem {
  id: string | number
  schoolName: string
  pic: string
  whatsapp: string
  date: string
  status: 'Menunggu ditinjau' | 'Disetujui' | 'Ditolak'
}

const submissions = ref<SubmissionItem[]>([
  {
    id: 1,
    schoolName: 'SMA Harapan Bangsa',
    pic: 'Michi Baker',
    whatsapp: '088232258814',
    date: '12 Juni 2026',
    status: 'Menunggu ditinjau'
  },
  {
    id: 2,
    schoolName: 'SMP Nusantara',
    pic: 'Ole Romeny',
    whatsapp: '088232258814',
    date: '29 Mei 2026',
    status: 'Disetujui'
  },
  {
    id: 3,
    schoolName: 'SMK Teknologi Mandiri',
    pic: 'Kevin Diks',
    whatsapp: '088232258814',
    date: '3 Februari 2026',
    status: 'Ditolak'
  },
  {
    id: 4,
    schoolName: 'SMA Cendekia',
    pic: 'Jay Idzes',
    whatsapp: '088232258814',
    date: '1 Februari 2026',
    status: 'Disetujui'
  },
  {
    id: 5,
    schoolName: 'Akademi Fukurodani',
    pic: 'Emil Audero',
    whatsapp: '088232258814',
    date: '20 Januari 2026',
    status: 'Menunggu ditinjau'
  },
  {
    id: 6,
    schoolName: 'SMA Karasuno',
    pic: 'Marteen Paes',
    whatsapp: '088232258814',
    date: '12 Januari 2026',
    status: 'Disetujui'
  }
])

const isDetailModalOpen = ref(false)
const selectedItem = ref<SubmissionItem | null>(null)
const isUpdatingStatus = ref(false)

onMounted(async () => {
  // Baca status overrides dari penyimpanan lokal
  let overrides: Record<string, 'Menunggu ditinjau' | 'Disetujui' | 'Ditolak'> = {}
  try {
    overrides = JSON.parse(localStorage.getItem('tanggap_leads_status_overrides') || '{}')
  } catch {}

  if (isMockMode()) {
    // Terapkan override pada mock data
    submissions.value = submissions.value.map((s) => ({
      ...s,
      status: overrides[String(s.id)] || s.status
    }))
    return
  }

  try {
    const res = await api.get<{ success?: boolean; data?: any[] }>('leads')
    const apiLeads = Array.isArray(res?.data) ? res.data : []

    let localSubmissions: any[] = []
    try {
      localSubmissions = JSON.parse(localStorage.getItem('tanggap_school_submissions') || '[]')
    } catch {}

    const combined = [...localSubmissions, ...apiLeads]
    if (combined.length > 0) {
      submissions.value = combined.map((item, idx) => {
        const itemId = item.id || idx + 1
        const rawStatus = (item.status === 'Disetujui' || item.status === 'Ditolak') ? item.status : 'Menunggu ditinjau'
        const effectiveStatus = overrides[String(itemId)] || rawStatus

        return {
          id: itemId,
          schoolName: item.schoolName || item.name || 'Sekolah Mitra',
          pic: item.picName || item.contactName || item.pic || item.name || 'Penanggung Jawab',
          whatsapp: item.picWhatsapp || item.phoneNumber || item.phone || item.whatsapp || '088232258814',
          date: item.submittedAt || item.createdAt
            ? new Date(item.submittedAt || item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
            : (item.registrationDate || '12 Juni 2026'),
          status: effectiveStatus
        }
      })
    }
  } catch (err) {
    console.warn('Fallback: gagal mengambil daftar pengajuan:', err)
  }
})

const openDetail = (item: SubmissionItem) => {
  selectedItem.value = item
  isDetailModalOpen.value = true
}

const updateStatus = async (newStatus: 'Menunggu ditinjau' | 'Disetujui' | 'Ditolak') => {
  if (!selectedItem.value) return

  const targetId = selectedItem.value.id
  selectedItem.value.status = newStatus

  // Update di tabel list
  const idx = submissions.value.findIndex((s) => String(s.id) === String(targetId))
  if (idx !== -1) {
    submissions.value[idx].status = newStatus
  }

  // 1. Simpan ke Backend Partner via PATCH /api/leads/:id jika live mode
  if (!isMockMode()) {
    isUpdatingStatus.value = true
    try {
      await api.patch(`leads/${targetId}`, { status: newStatus })
    } catch (err) {
      console.warn('Gagal sinkronisasi status ke backend, disimpan lokal:', err)
    } finally {
      isUpdatingStatus.value = false
    }
  }

  // 2. Simpan permanen ke localStorage agar saat di-refresh (F5) status tidak kembali lagi
  try {
    const overrides = JSON.parse(localStorage.getItem('tanggap_leads_status_overrides') || '{}')
    overrides[String(targetId)] = newStatus
    localStorage.setItem('tanggap_leads_status_overrides', JSON.stringify(overrides))

    // Update juga di tanggap_school_submissions jika ada
    const rawLocal = localStorage.getItem('tanggap_school_submissions')
    if (rawLocal) {
      const list = JSON.parse(rawLocal)
      const updated = list.map((item: any) => {
        if (item.id === targetId || item.schoolName === selectedItem.value?.schoolName) {
          return { ...item, status: newStatus }
        }
        return item
      })
      localStorage.setItem('tanggap_school_submissions', JSON.stringify(updated))
    }
  } catch (e) {
    console.error('Failed saving status locally:', e)
  }
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

