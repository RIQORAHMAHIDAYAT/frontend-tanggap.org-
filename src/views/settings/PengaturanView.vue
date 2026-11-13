<template>
  <div class="min-h-screen bg-[#FAF9FF] text-slate-900 py-8 sm:py-12 px-4 sm:px-6 md:px-10 lg:px-16 selection:bg-blue-100 selection:text-blue-900">
    <!-- Top Action Bar: Back Button Only (Sesuai Desain) -->
    <div class="max-w-5xl mx-auto mb-6 sm:mb-8">
      <button
        @click="handleBack"
        type="button"
        class="inline-flex items-center gap-2.5 text-[#5A6EB2] hover:text-[#3B4D8A] font-semibold text-2xl transition-colors cursor-pointer group"
      >
        <span class="transition-transform duration-200 group-hover:-translate-x-1 font-bold">←</span>
        <span>Kembali</span>
      </button>
    </div>

    <!-- Main Card Container -->
    <div class="max-w-5xl mx-auto bg-white rounded-[32px] sm:rounded-[36px] border border-slate-200/80 shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-8 sm:p-12 md:p-14">
      <!-- ============================================================== -->
      <!-- TAB 1: DATA DIRI (Profil / Pengaturan) -->
      <!-- ============================================================== -->
      <div v-if="activeTab === 'profil'">
        <!-- Card Header: Title & Action Button -->
        <div class="flex items-center justify-between gap-4">
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Data Diri
          </h2>

          <!-- Action Buttons: Selesai & Batal -->
          <div class="flex items-center gap-3">
            <!-- Selesai (Green) -->
            <button
              @click="saveProfile"
              type="button"
              class="bg-[#00C853] hover:bg-[#00B048] active:scale-95 text-white font-bold text-sm sm:text-base px-5 py-2.5 rounded-xl inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <!-- Floppy Disk Icon -->
              <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 20 20">
                <path d="M17.414 2.586a2 2 0 00-1.414-.586H4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-.586-1.414zM5 4h8v3H5V4zm10 12H5v-5h10v5z" />
              </svg>
              <span>Selesai</span>
            </button>

            <!-- Batal (Red) -->
            <button
              @click="cancelEdit"
              type="button"
              class="bg-[#FF334B] hover:bg-[#E52A40] active:scale-95 text-white font-bold text-sm sm:text-base px-5 py-2.5 rounded-xl inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <!-- Undo / Cancel Refresh Icon -->
              <svg class="w-4 h-4 fill-none stroke-current shrink-0" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <span>Batal</span>
            </button>
          </div>
        </div>

        <!-- 2-Column Content Grid: Left Form, Right Foto Profil -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8 sm:mt-12 items-start">
          <!-- Left Column: Form Input Data Diri -->
          <div class="lg:col-span-7 xl:col-span-7">
            <form @submit.prevent="saveProfile" class="space-y-5">
              <div>
                <label class="block font-bold text-lg text-slate-900 mb-2">Email</label>
                <input
                  v-model="editForm.email"
                  type="email"
                  required
                  class="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label class="block font-bold text-lg text-slate-900 mb-2">Nama</label>
                <input
                  v-model="editForm.name"
                  type="text"
                  required
                  class="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label class="block font-bold text-lg text-slate-900 mb-2">Sekolah</label>
                <input
                  v-model="editForm.school"
                  type="text"
                  required
                  class="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label class="block font-bold text-lg text-slate-900 mb-2">No Telp</label>
                <input
                  v-model="editForm.phone"
                  type="tel"
                  required
                  class="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label class="block font-bold text-lg text-slate-900 mb-2">Jenis Kelamin</label>
                <select
                  v-model="editForm.gender"
                  class="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-[#EAECEF] cursor-pointer"
                >
                  <option value="">-- Pilih Jenis Kelamin --</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </form>
          </div>

          <!-- Right Column: Foto Profil Card -->
          <div class="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
            <div class="border border-slate-200/90 rounded-[28px] p-6 sm:p-7 w-full max-w-[340px] bg-white shadow-xs">
              <h3 class="font-bold text-xl text-center text-slate-900 mb-6">Foto Profil</h3>

              <!-- Avatar Display Box -->
              <div class="w-full h-44 rounded-2xl bg-[#7D3C3C] text-white flex items-center justify-center font-bold text-6xl tracking-wider select-none overflow-hidden relative shadow-inner">
                <img
                  v-if="user.photo"
                  :src="user.photo"
                  alt="Foto Profil"
                  class="w-full h-full object-cover"
                />
                <span v-else>{{ user.initials || 'AF' }}</span>
              </div>

              <!-- Photo Action Buttons -->
              <div class="grid grid-cols-2 gap-3 mt-6">
                <!-- Hidden file input for photo upload -->
                <input
                  type="file"
                  ref="fileInputRef"
                  accept="image/*"
                  class="hidden"
                  @change="handlePhotoUpload"
                />

                <!-- Ganti Foto Button (Blue) -->
                <button
                  @click="triggerFileInput"
                  type="button"
                  class="bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <span>Ganti foto</span>
                </button>

                <!-- Hapus Foto Button (Red) -->
                <button
                  @click="handleRemovePhoto"
                  type="button"
                  class="bg-[#FF4D4D] hover:bg-red-600 text-white font-semibold text-sm py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Hapus Foto</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ============================================================== -->
      <!-- TAB 2: KEAMANAN (keamanan.png) -->
      <!-- ============================================================== -->
      <div v-else-if="activeTab === 'keamanan'">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Keamanan
        </h2>
        <p class="text-slate-600 text-base sm:text-lg leading-relaxed max-w-4xl mb-8 font-normal">
          Ganti password secara berkala, untuk meningkatkan keamanan akun Anda. Gunakan kombinasi password yang sulit ditebak, sehingga peretas tidak bisa membobol akun Anda dengan mudah.
        </p>

        <form @submit.prevent="handleChangePassword" class="space-y-6 max-w-3xl">
          <div>
            <label class="block font-bold text-lg sm:text-xl text-slate-900 mb-2">
              Password Lama
            </label>
            <input
              v-model="passwordForm.oldPassword"
              type="password"
              placeholder=""
              required
              class="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label class="block font-bold text-lg sm:text-xl text-slate-900 mb-2">
              Password Baru
            </label>
            <input
              v-model="passwordForm.newPassword"
              type="password"
              placeholder=""
              required
              class="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label class="block font-bold text-lg sm:text-xl text-slate-900 mb-2">
              Konformasi Password
            </label>
            <input
              v-model="passwordForm.confirmPassword"
              type="password"
              placeholder=""
              required
              class="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div class="pt-2">
            <button
              type="submit"
              class="bg-[#CBD5E1] hover:bg-slate-300 text-slate-900 font-bold px-8 py-3.5 rounded-xl transition-colors cursor-pointer text-base sm:text-lg inline-block"
            >
              Ubah Password
            </button>
          </div>
        </form>

        <!-- Secondary Setting: Reset Token Sekolah (Testing / Review Mode) -->
        <div v-if="hasSchoolToken" class="mt-14 pt-10 border-t border-slate-200">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 border border-slate-200/80 rounded-2xl p-6">
            <div>
              <h3 class="text-lg font-bold text-slate-900 mb-1">Status Token Sekolah Siswa</h3>
              <p class="text-slate-600 text-sm max-w-xl">
                Akun Anda saat ini terhubung dengan kode sekolah: <span class="font-bold text-slate-900 font-mono tracking-wider bg-slate-200 px-2 py-0.5 rounded">{{ currentSchoolToken }}</span> (SMK Dinamika Kota Banjar). Anda dapat menghapus token ini untuk kembali melihat antarmuka Dashboard Default.
              </p>
            </div>
            <button
              @click="showTokenModal = true"
              type="button"
              class="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-300 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-sm transition-colors cursor-pointer"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              <span>Hapus Token Sekolah</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Konfirmasi Hapus Token Sekolah -->
    <div
      v-if="showTokenModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
    >
      <div class="bg-white rounded-[28px] max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 transform transition-all">
        <div class="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4 mx-auto">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-center text-slate-900 mb-2">Hapus Tautan Token Sekolah?</h3>
        <p class="text-slate-600 text-sm text-center mb-6">
          Setelah dihapus, akun Anda akan kembali ke tampilan Dashboard Default (seperti sebelum memasukkan kode). Anda dapat memasukkan kode sekolah kembali kapan saja.
        </p>
        <div class="grid grid-cols-2 gap-3">
          <button
            @click="showTokenModal = false"
            type="button"
            class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            @click="handleRemoveSchoolToken"
            type="button"
            class="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors cursor-pointer shadow-xs"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- Floating Feedback Toast -->
    <transition
      enter-active-class="transform transition duration-300 ease-out"
      enter-from-class="translate-y-4 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transform transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100 scale-100"
      leave-to-class="translate-y-4 opacity-0 scale-95"
    >
      <div
        v-if="toast.visible"
        class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white font-medium text-sm"
        :class="toast.type === 'success' ? 'bg-slate-900 text-white border border-slate-700' : 'bg-red-600 text-white'"
      >
        <svg v-if="toast.type === 'success'" class="w-5 h-5 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span>{{ toast.message }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Tab state: 'profil' (Data Diri) is default for both /profil and /pengaturan
const activeTab = ref<'profil' | 'keamanan'>('profil')

// Check if tab is explicitly specified in route query (e.g. ?tab=keamanan)
watch(
  () => route.query.tab,
  (tab) => {
    if (tab === 'keamanan') {
      activeTab.value = 'keamanan'
    } else {
      activeTab.value = 'profil'
    }
  },
  { immediate: true }
)

const switchTab = (tab: 'profil' | 'keamanan') => {
  activeTab.value = tab
  if (tab === 'keamanan') {
    router.replace({ path: route.path, query: { tab: 'keamanan' } })
  } else {
    router.replace({ path: route.path, query: {} })
  }
}

// User state
const getInitialProfileUser = () => {
  try {
    const raw = localStorage.getItem('tanggap_user')
    if (raw) {
      const parsed = JSON.parse(raw)
      const name = parsed.name || 'Pengguna'
      const parts = name.trim().split(/\s+/)
      const initials = parsed.initials || (parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : name.slice(0, 2).toUpperCase())
      return {
        name,
        email: parsed.email || 'pengguna@tanggap.org',
        school: parsed.school || 'Sekolah Mitra',
        phone: parsed.phone || '-',
        gender: parsed.gender && parsed.gender !== 'Laki-laki' && parsed.gender !== 'Perempuan' ? '' : (parsed.gender || ''),
        initials,
        photo: parsed.photo || ''
      }
    }
  } catch {}
  return {
    name: 'Pengguna',
    email: 'pengguna@tanggap.org',
    school: 'Sekolah Mitra',
    phone: '-',
    gender: '',
    initials: 'TG',
    photo: ''
  }
}

const user = reactive(getInitialProfileUser())

// Edit mode state
const isEditing = ref(false)
const editForm = reactive({ ...user })

// Password form state
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// School token state
const hasSchoolToken = ref(false)
const currentSchoolToken = ref('')
const showTokenModal = ref(false)

// Toast feedback state
const toast = reactive({
  visible: false,
  message: '',
  type: 'success' as 'success' | 'error'
})

let toastTimer: ReturnType<typeof setTimeout> | null = null
const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  if (toastTimer) clearTimeout(toastTimer)
  toast.message = message
  toast.type = type
  toast.visible = true
  toastTimer = setTimeout(() => {
    toast.visible = false
  }, 3000)
}

// File input ref
const fileInputRef = ref<HTMLInputElement | null>(null)

// Initialize data from localStorage
const loadUserData = () => {
  try {
    const raw = localStorage.getItem('tanggap_user')
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed.name) user.name = parsed.name
      if (parsed.email) user.email = parsed.email
      if (parsed.school) user.school = parsed.school
      if (parsed.phone) user.phone = parsed.phone
      user.gender = parsed.gender || ''
      if (parsed.photo) user.photo = parsed.photo
      if (parsed.initials) {
        user.initials = parsed.initials
      } else {
        const parts = user.name.trim().split(' ')
        user.initials = parts.length > 1
          ? (parts[0][0] + parts[1][0]).toUpperCase()
          : user.name.slice(0, 2).toUpperCase()
      }
    }
  } catch (err) {
    console.error('Error loading user data:', err)
  }

  // Check school code
  const code = localStorage.getItem('tanggap_school_code')
  if (code && code.trim().length >= 6) {
    hasSchoolToken.value = true
    currentSchoolToken.value = code.trim()
  } else {
    hasSchoolToken.value = false
    currentSchoolToken.value = ''
  }
  // Sinkronkan ke editForm
  editForm.name = user.name
  editForm.email = user.email
  editForm.school = user.school
  editForm.phone = user.phone
  editForm.gender = user.gender
}

onMounted(() => {
  loadUserData()
})

// Navigation: Kembali
const handleBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/dashboard')
  }
}

// Profile edit actions
const cancelEdit = () => {
  editForm.name = user.name
  editForm.email = user.email
  editForm.school = user.school
  editForm.phone = user.phone
  editForm.gender = user.gender
  showToast('Perubahan dibatalkan', 'success')
}

const saveProfile = () => {
  user.name = editForm.name
  user.email = editForm.email
  user.school = editForm.school
  user.phone = editForm.phone
  user.gender = editForm.gender

  // Recalculate initials
  const parts = user.name.trim().split(' ')
  user.initials = parts.length > 1
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : user.name.slice(0, 2).toUpperCase()

  // Save to localStorage
  try {
    const payload = {
      name: user.name,
      email: user.email,
      school: user.school,
      phone: user.phone,
      gender: user.gender,
      initials: user.initials,
      photo: user.photo
    }
    localStorage.setItem('tanggap_user', JSON.stringify(payload))
    // Trigger storage event so HeaderNav immediately updates
    window.dispatchEvent(new Event('storage'))
  } catch (err) {
    console.error('Error saving user data:', err)
  }

  isEditing.value = false
  showToast('Data diri berhasil diperbarui!')
}

// Photo upload actions
const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const handlePhotoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const result = e.target?.result as string
    if (result) {
      user.photo = result
      // Save to localStorage
      try {
        const raw = localStorage.getItem('tanggap_user')
        const current = raw ? JSON.parse(raw) : {}
        localStorage.setItem('tanggap_user', JSON.stringify({ ...current, photo: result }))
        window.dispatchEvent(new Event('storage'))
      } catch (err) {
        console.error('Error saving photo:', err)
      }
      showToast('Foto profil berhasil diganti!')
    }
  }
  reader.readAsDataURL(file)
}

const handleRemovePhoto = () => {
  user.photo = ''
  try {
    const raw = localStorage.getItem('tanggap_user')
    const current = raw ? JSON.parse(raw) : {}
    delete current.photo
    localStorage.setItem('tanggap_user', JSON.stringify(current))
    window.dispatchEvent(new Event('storage'))
  } catch (err) {
    console.error('Error removing photo:', err)
  }
  showToast('Foto profil dihapus.')
}

// Password change handler
const handleChangePassword = () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    showToast('Konformasi password tidak cocok!', 'error')
    return
  }

  // Clear inputs
  passwordForm.oldPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''

  showToast('Password berhasil diubah!')
}

// School token remove handler
const handleRemoveSchoolToken = () => {
  showTokenModal.value = false
  localStorage.removeItem('tanggap_school_code')
  window.dispatchEvent(new Event('storage'))
  hasSchoolToken.value = false
  currentSchoolToken.value = ''
  showToast('Tautan token sekolah dihapus. Mengalihkan ke dashboard...')
  setTimeout(() => {
    router.push('/dashboard')
  }, 1200)
}
</script>
