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

                <!-- Aksi Detail & Hapus Button -->
                <td class="py-5 px-6 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      @click="openDetail(item)"
                      type="button"
                      class="px-3.5 py-1.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-95 font-bold text-xs sm:text-sm transition-all cursor-pointer"
                    >
                      Detail
                    </button>
                    <button
                      @click="confirmDeleteSubmission(item)"
                      type="button"
                      class="px-3 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 active:scale-95 font-bold text-xs sm:text-sm transition-all cursor-pointer"
                      title="Hapus Pengajuan"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredSubmissions.length === 0">
                <td colspan="5" class="py-12 text-center text-slate-400 font-medium">
                  Tidak ada data pengajuan sekolah.
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
          <div v-if="selectedItem.email" class="flex justify-between py-1 border-b border-slate-200/60">
            <span class="text-slate-500 font-medium">Email PIC:</span>
            <span class="font-semibold text-slate-800">{{ selectedItem.email }}</span>
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

          <!-- Token Kelas Sekolah jika Disetujui -->
          <div
            v-if="selectedItem.status === 'Disetujui'"
            class="mt-2 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex flex-col gap-1.5"
          >
            <div class="flex items-center justify-between">
              <span class="font-bold flex items-center gap-1.5">
                <span>🔑</span> Token Kelas Sekolah:
              </span>
              <span class="font-mono font-extrabold tracking-widest text-emerald-950 bg-white px-3 py-0.5 rounded-lg border border-emerald-300 text-sm shadow-2xs">
                {{ currentModalClassCode }}
              </span>
            </div>
            <p class="text-xs text-emerald-700 leading-relaxed">
              Token kelas 6 digit ini telah dibuat otomatis untuk sekolah ini. Guru BK dapat membagikannya ke murid-muridnya untuk bergabung ke kelas.
            </p>
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

        <!-- Tombol Hapus Pengajuan di Modal Detail -->
        <div class="pt-3 border-t border-slate-100 flex justify-end">
          <button
            @click="confirmDeleteSubmission(selectedItem)"
            type="button"
            class="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs sm:text-sm transition-all border border-red-200 cursor-pointer flex items-center gap-1.5"
          >
            <span>🗑️ Hapus Pengajuan Ini</span>
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

    <!-- Modal Konfirmasi Hapus Pengajuan -->
    <AdminModal
      :is-open="isDeleteModalOpen"
      title="Konfirmasi Hapus Pengajuan"
      @close="isDeleteModalOpen = false"
    >
      <div v-if="itemToDelete" class="space-y-4 py-2 text-center sm:text-left">
        <div class="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-2xl mb-2">
          ⚠️
        </div>
        <h4 class="text-lg font-bold text-slate-800 text-center">
          Hapus Pengajuan Sekolah Ini?
        </h4>
        <p class="text-slate-600 text-sm text-center leading-relaxed">
          Apakah Anda yakin ingin menghapus data pengajuan kerjasama dari sekolah <strong>{{ itemToDelete.schoolName }}</strong> (PIC: {{ itemToDelete.pic }})? Data ini akan dihapus secara permanen dari sistem dan database MySQL.
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
            @click="executeDeleteSubmission"
            type="button"
            :disabled="isDeleting"
            class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm cursor-pointer transition-all shadow-md active:scale-95 flex items-center gap-1.5"
          >
            <span v-if="isDeleting">Menghapus...</span>
            <span v-else>Ya, Hapus Pengajuan</span>
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

interface SubmissionItem {
  id: string | number
  schoolName: string
  pic: string
  whatsapp: string
  date: string
  status: 'Menunggu ditinjau' | 'Disetujui' | 'Ditolak'
  email?: string
}

const getInitialSubmissions = (): SubmissionItem[] => {
  // 1. Utamakan cache pengajuan nyata yang tersimpan agar tidak ada flash mock data
  try {
    const rawCache = localStorage.getItem('tanggap_admin_leads_cache')
    if (rawCache) {
      const parsed = JSON.parse(rawCache)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch {}

  const overrides = (() => {
    try {
      return JSON.parse(localStorage.getItem('tanggap_leads_status_overrides') || '{}')
    } catch {
      return {}
    }
  })()

  let baseList: SubmissionItem[] = []

  try {
    const rawLocal = localStorage.getItem('tanggap_school_submissions')
    if (rawLocal) {
      const local = JSON.parse(rawLocal)
      for (const item of local) {
        const id = item.id || 'lead-' + Date.now()
        baseList.unshift({
          id,
          schoolName: item.schoolName || 'Sekolah Mitra',
          pic: item.picName || item.contactName || 'Penanggung Jawab',
          whatsapp: item.picWhatsapp || item.phoneNumber || '088232258814',
          email: item.picEmail || item.email || '',
          date: item.submittedAt
            ? new Date(item.submittedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
            : (item.registrationDate || 'Baru saja'),
          status: overrides[String(id)] || (item.status === 'Disetujui' || item.status === 'Ditolak' ? item.status : 'Menunggu ditinjau')
        })
      }
    }
  } catch {}

  return baseList.map(s => ({
    ...s,
    status: overrides[String(s.id)] || s.status
  }))
}

const submissions = ref<SubmissionItem[]>(getInitialSubmissions())

const isDetailModalOpen = ref(false)
const selectedItem = ref<SubmissionItem | null>(null)
const isUpdatingStatus = ref(false)
const schoolClassCodes = ref<Record<string, string>>({})

const currentModalClassCode = computed(() => {
  if (!selectedItem.value) return ''
  const sName = (selectedItem.value.schoolName || '').toLowerCase().trim()
  return schoolClassCodes.value[sName] || 'KUCING'
})

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
    const [res, clsRes] = await Promise.allSettled([
      api.get<{ success?: boolean; data?: any[] }>('leads'),
      api.get<{ success?: boolean; data?: any[] }>('classes')
    ])

    if (clsRes.status === 'fulfilled' && Array.isArray(clsRes.value?.data)) {
      clsRes.value.data.forEach((c: any) => {
        if (c.school?.name && c.code) {
          schoolClassCodes.value[c.school.name.toLowerCase().trim()] = c.code
        }
      })
    }

    const apiLeads = res.status === 'fulfilled' && Array.isArray(res.value?.data) ? res.value.data : []

    let localSubmissions: any[] = []
    try {
      localSubmissions = JSON.parse(localStorage.getItem('tanggap_school_submissions') || '[]')
    } catch {}

    // Deduplikasi: Utamakan data asli dari database MySQL sebagai single source of truth
    const seenEmails = new Set<string>()
    const finalLeads: any[] = []

    for (const item of apiLeads) {
      const em = (item.email || item.picEmail || '').toLowerCase().trim()
      if (em) seenEmails.add(em)
      finalLeads.push(item)
    }

    for (const item of localSubmissions) {
      const em = (item.email || item.picEmail || '').toLowerCase().trim()
      if (!em || !seenEmails.has(em)) {
        if (em) seenEmails.add(em)
        finalLeads.push(item)
      }
    }

    if (finalLeads.length > 0) {
      submissions.value = finalLeads.map((item, idx) => {
        const itemId = item.id || idx + 1
        const rawStatus = (item.status === 'Disetujui' || item.status === 'Ditolak') ? item.status : 'Menunggu ditinjau'
        // Jika data dari apiLeads (database), utamakan status database asli
        const isFromApi = apiLeads.some(a => String(a.id) === String(item.id))
        const effectiveStatus = isFromApi ? rawStatus : (overrides[String(itemId)] || rawStatus)

        return {
          id: itemId,
          schoolName: item.schoolName || item.name || 'Sekolah Mitra',
          pic: item.picName || item.contactName || item.pic || item.name || 'Penanggung Jawab',
          whatsapp: item.picWhatsapp || item.phoneNumber || item.phone || item.whatsapp || '088232258814',
          email: item.email || item.picEmail || '',
          date: item.submittedAt || item.createdAt
            ? new Date(item.submittedAt || item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
            : (item.registrationDate || '12 Juni 2026'),
          status: effectiveStatus
        }
      })
      try {
        localStorage.setItem('tanggap_admin_leads_cache', JSON.stringify(submissions.value))
      } catch {}
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
      const patchRes = await api.patch<{ success?: boolean; classroom?: { id: number; name: string; code: string } }>(`leads/${targetId}`, {
        status: newStatus,
        email: selectedItem.value.email,
        schoolName: selectedItem.value.schoolName,
        picName: selectedItem.value.pic,
        phoneNumber: selectedItem.value.whatsapp
      })

      if (patchRes && patchRes.classroom?.code) {
        const sKey = (selectedItem.value.schoolName || '').toLowerCase().trim()
        schoolClassCodes.value[sKey] = patchRes.classroom.code

        try {
          const rawCls = localStorage.getItem('tanggap_custom_classes')
          const clsList = rawCls ? JSON.parse(rawCls) : []
          if (!clsList.some((c: any) => c.code === patchRes.classroom?.code)) {
            clsList.push({
              code: patchRes.classroom.code,
              name: patchRes.classroom.name,
              school: selectedItem.value.schoolName
            })
            localStorage.setItem('tanggap_custom_classes', JSON.stringify(clsList))
          }
        } catch {}
      }
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
    // 3. Jika status Disetujui, daftarkan email PIC ini ke daftar approved teacher whitelist & akun lokal
    if (newStatus === 'Disetujui') {
      try {
        let picEmail = selectedItem.value?.email || ''
        if (!picEmail) {
          const rawLocal = localStorage.getItem('tanggap_school_submissions')
          if (rawLocal) {
            const list = JSON.parse(rawLocal)
            const matched = list.find((item: any) => String(item.id) === String(targetId) || item.schoolName === selectedItem.value?.schoolName)
            if (matched?.picEmail || matched?.email) {
              picEmail = matched.picEmail || matched.email
            }
          }
        }
        if (!picEmail) {
          const slug = (selectedItem.value?.pic || 'guru').toLowerCase().replace(/\s+/g, '.')
          picEmail = `${slug}@sekolah.sch.id`
        }
        picEmail = picEmail.toLowerCase().trim()

        const approvedRaw = localStorage.getItem('tanggap_approved_teacher_emails')
        const approvedList = approvedRaw ? JSON.parse(approvedRaw) : []
        const entry = {
          id: targetId,
          email: picEmail,
          schoolName: selectedItem.value?.schoolName,
          picName: selectedItem.value?.pic,
          status: 'Disetujui',
          approvedAt: new Date().toISOString()
        }
        const existIdx = approvedList.findIndex((a: any) => a.email === picEmail)
        if (existIdx !== -1) {
          approvedList[existIdx] = entry
        } else {
          approvedList.push(entry)
        }
        localStorage.setItem('tanggap_approved_teacher_emails', JSON.stringify(approvedList))

        // Sinkronkan ke tanggap_user_accounts agar langsung muncul di Manajemen Pengguna & Login
        try {
          const rawAccs = localStorage.getItem('tanggap_user_accounts')
          const accs = rawAccs ? JSON.parse(rawAccs) : []
          const existingAccIdx = accs.findIndex((a: any) => a.email.toLowerCase() === picEmail)
          const teacherAccount = {
            name: selectedItem.value?.pic || 'Guru BK',
            email: picEmail,
            role: 'Guru BK',
            school: selectedItem.value?.schoolName || '',
            password: 'Password123!'
          }
          if (existingAccIdx !== -1) {
            accs[existingAccIdx] = { ...accs[existingAccIdx], ...teacherAccount }
          } else {
            accs.unshift(teacherAccount)
          }
          localStorage.setItem('tanggap_user_accounts', JSON.stringify(accs))
        } catch {}

        window.dispatchEvent(new Event('storage'))
      } catch (errApproved) {
        console.warn('Failed saving approved teacher email whitelist:', errApproved)
      }
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

// Fitur Hapus Pengajuan
const isDeleteModalOpen = ref(false)
const itemToDelete = ref<SubmissionItem | null>(null)
const isDeleting = ref(false)

const confirmDeleteSubmission = (item: SubmissionItem) => {
  itemToDelete.value = item
  isDeleteModalOpen.value = true
}

const executeDeleteSubmission = async () => {
  if (!itemToDelete.value) return
  const targetId = itemToDelete.value.id
  isDeleting.value = true

  try {
    if (!isMockMode()) {
      await api.delete(`leads/${targetId}`)
    }
  } catch (err) {
    console.warn('API delete lead failed, deleting locally:', err)
  }

  // Hapus dari list di frontend
  submissions.value = submissions.value.filter(s => String(s.id) !== String(targetId))
  try {
    localStorage.setItem('tanggap_admin_leads_cache', JSON.stringify(submissions.value))
  } catch {}

  // Hapus dari storage lokal jika ada
  try {
    const rawLocal = localStorage.getItem('tanggap_school_submissions')
    if (rawLocal) {
      const list = JSON.parse(rawLocal)
      const updated = list.filter((s: any) => String(s.id) !== String(targetId) && s.schoolName !== itemToDelete.value?.schoolName)
      localStorage.setItem('tanggap_school_submissions', JSON.stringify(updated))
    }

    const overrides = JSON.parse(localStorage.getItem('tanggap_leads_status_overrides') || '{}')
    delete overrides[String(targetId)]
    localStorage.setItem('tanggap_leads_status_overrides', JSON.stringify(overrides))
  } catch {}

  isDeleting.value = false
  isDeleteModalOpen.value = false
  if (selectedItem.value && String(selectedItem.value.id) === String(targetId)) {
    isDetailModalOpen.value = false
  }
}
</script>

