<template>
  <header
    class="h-20 px-6 md:px-8 flex items-center justify-between relative z-20 shrink-0 select-none transition-all duration-300 ease-in-out"
    :class="[
      sidebarOpen
        ? 'bg-white border-b border-slate-200/80 shadow-xs'
        : 'bg-[#1E40AF] border-b border-blue-700/50 shadow-md'
    ]"
  >
    <!-- Left Section: 2-Line Morphing Hamburger Button -->
    <div class="flex items-center gap-3 sm:gap-4 min-w-0">
      <button
        @click="$emit('toggle-sidebar')"
        type="button"
        class="p-2 -ml-2 rounded-xl active:scale-90 focus:outline-none transition-all duration-200 cursor-pointer flex items-center justify-center group shrink-0"
        :class="sidebarOpen ? 'hover:bg-slate-100 text-[#1E40AF]' : 'hover:bg-white/10 text-white'"
        :title="sidebarOpen ? 'Tutup Menu Navigasi' : 'Buka Menu Navigasi'"
        aria-label="Toggle Menu Navigasi"
      >
        <div class="w-8 h-5 flex flex-col justify-center gap-1.5">
          <!-- Top Bar -->
          <span
            class="block w-7 sm:w-8 h-1 rounded-full transition-all duration-300 ease-in-out"
            :class="sidebarOpen ? 'bg-[#1E40AF]' : 'bg-white'"
          ></span>
          <!-- Bottom Bar -->
          <span
            class="block h-1 rounded-full transition-all duration-300 ease-in-out origin-left"
            :class="[
              sidebarOpen ? 'bg-[#1E40AF] w-4 sm:w-5' : 'bg-white w-7 sm:w-8'
            ]"
          ></span>
        </div>
      </button>
    </div>

    <!-- Center Section: Logo tanggap.org HANYA di layar mobile saat navbar biru (Matching Mekanisme & Aturan Main.hp.png & monitoring guru.hp.png) -->
    <div
      v-if="!sidebarOpen"
      class="lg:hidden absolute left-1/2 -translate-x-1/2 pointer-events-auto select-none"
    >
      <router-link
        to="/dashboard"
        class="text-2xl font-bold tracking-tight text-white hover:opacity-95 transition-opacity whitespace-nowrap"
      >
        tanggap.org
      </router-link>
    </div>

    <!-- Right Section: Branding (Saat navbar biru di desktop) & Profile (Avatar + Nama jika navbar putih) -->
    <div class="flex items-center gap-4 sm:gap-6 shrink-0">
      <!-- Logo tanggap.org: HANYA tampil di navbar kanan desktop saat sidebar tertutup (navbar biru), persis seperti di dashboard siswa.png -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-x-2"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-2"
      >
        <router-link
          v-if="!sidebarOpen"
          to="/dashboard"
          class="text-2xl md:text-3xl font-bold tracking-tight text-white hover:opacity-95 transition-opacity whitespace-nowrap hidden lg:inline-block"
        >
          tanggap.org
        </router-link>
      </transition>

      <!-- User Profile Dropdown Button -->
      <div class="relative shrink-0" ref="dropdownRef">
        <button
          @click="isDropdownOpen = !isDropdownOpen"
          type="button"
          class="flex items-center gap-2.5 p-1 sm:px-3 sm:py-1.5 rounded-full active:scale-95 transition-all focus:outline-none cursor-pointer"
          :class="sidebarOpen ? 'hover:bg-slate-100' : 'hover:bg-white/10'"
          aria-haspopup="true"
          :aria-expanded="isDropdownOpen"
        >
          <!-- Circle Avatar Initials or Photo -->
          <div
            class="w-10 h-10 md:w-11 md:h-11 rounded-full font-bold flex items-center justify-center text-sm md:text-base shadow-xs overflow-hidden border transition-colors"
            :class="sidebarOpen ? 'bg-slate-200 text-slate-900 border-slate-300' : 'bg-slate-200 text-slate-900 border-white/20'"
          >
            <img v-if="userPhoto" :src="userPhoto" alt="Profile" class="w-full h-full object-cover" />
            <span v-else>{{ userInitials }}</span>
          </div>

          <!-- User Name (Ahmat Fauzy): HANYA tampil saat sidebar TERBUKA (navbar putih), persis seperti di dashboard siswa.1.png! -->
          <span
            v-if="sidebarOpen"
            class="text-slate-900 font-bold text-sm sm:text-base hidden sm:inline-block tracking-tight transition-opacity duration-300"
          >
            {{ userName }}
          </span>

          <!-- Chevron Down Arrow -->
          <svg
            class="w-4 h-4 transition-transform duration-200"
            :class="[
              sidebarOpen ? 'text-slate-700' : 'text-white',
              { 'rotate-180': isDropdownOpen }
            ]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Dropdown Menu (Matching Group 322.png) -->
        <transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="transform scale-95 opacity-0 -translate-y-2"
          enter-to-class="transform scale-100 opacity-100 translate-y-0"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="transform scale-100 opacity-100 translate-y-0"
          leave-to-class="transform scale-95 opacity-0 -translate-y-2"
        >
          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-3 w-72 bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden z-50 text-slate-800 select-none"
          >
            <!-- Top Section: Background #E2E8F0, Square rounded avatar with border, name, and Lihat Profil -->
            <div class="bg-[#E2E8F0] p-5 flex items-center gap-4 border-b border-slate-200/60">
              <div class="w-14 h-14 rounded-2xl bg-[#D8DCE3] border-2 border-slate-900 flex items-center justify-center text-slate-900 text-xl font-bold shrink-0 shadow-xs overflow-hidden">
                <img v-if="userPhoto" :src="userPhoto" alt="Profile" class="w-full h-full object-cover" />
                <span v-else>{{ userInitials }}</span>
              </div>
              <div class="min-w-0 flex-1">
                <p class="font-extrabold text-slate-900 text-lg leading-tight truncate">
                  {{ userName }}
                </p>
                <router-link
                  to="/profil"
                  @click="isDropdownOpen = false"
                  class="inline-block mt-1 text-[#1E40AF] hover:underline font-bold text-sm tracking-tight cursor-pointer"
                >
                  Lihat Profil
                </router-link>
              </div>
            </div>

            <!-- Bottom Section: Pengaturan & Keluar -->
            <div class="py-3 px-6 space-y-1">
              <router-link
                to="/pengaturan"
                @click="isDropdownOpen = false"
                class="block py-2 text-slate-900 hover:text-[#1E40AF] font-medium text-base transition-colors"
              >
                Pengaturan
              </router-link>

              <!-- Tombol Keluar dari Sekolah (Hanya tampil jika sudah masuk kode sekolah) -->
              <button
                v-if="hasSchoolCode"
                @click="handleLeaveSchool"
                type="button"
                class="w-full text-left py-2 text-red-600 hover:text-red-700 font-medium text-base transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>Keluar dari Sekolah</span>
                <span class="text-[11px] font-bold bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-md">
                  Reset
                </span>
              </button>

              <button
                @click="handleLogout"
                type="button"
                class="w-full text-left py-2 text-slate-900 hover:text-red-600 font-medium text-base transition-colors cursor-pointer"
              >
                Keluar
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  sidebarOpen: boolean
  isMobile: boolean
  customUserName?: string
  customUserInitials?: string
}>()

defineEmits<{
  (e: 'toggle-sidebar'): void
}>()

const router = useRouter()
const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const getInitialNavUser = () => {
  if (props.customUserName) {
    return {
      name: props.customUserName,
      initials: props.customUserInitials || 'GB',
      photo: '',
      hasCode: false
    }
  }
  try {
    const raw = localStorage.getItem('tanggap_user')
    const parsed = raw ? JSON.parse(raw) : null
    let name = parsed?.name || 'Pengguna'
    let initials = 'TG'
    if (parsed?.name) {
      const parts = parsed.name.trim().split(/\s+/)
      if (parts.length >= 2) {
        initials = (parts[0][0] + parts[1][0]).toUpperCase()
      } else if (parts.length === 1 && parts[0].length > 0) {
        initials = parts[0].substring(0, 2).toUpperCase()
      }
    }
    const schoolCode = localStorage.getItem('tanggap_school_code')
    return {
      name,
      initials,
      photo: parsed?.photo || '',
      hasCode: !!(schoolCode && schoolCode.trim().length >= 6)
    }
  } catch {
    return { name: 'Pengguna', initials: 'TG', photo: '', hasCode: false }
  }
}

const initialNav = getInitialNavUser()
const userName = ref(initialNav.name)
const userInitials = ref(initialNav.initials)
const userPhoto = ref(initialNav.photo)
const hasSchoolCode = ref(initialNav.hasCode)

watch(() => props.customUserName, (newVal) => {
  if (newVal) {
    userName.value = newVal
    userInitials.value = props.customUserInitials || 'GB'
  }
})

const updateUserData = () => {
  if (props.customUserName) {
    userName.value = props.customUserName
    userInitials.value = props.customUserInitials || 'GB'
    return
  }

  try {
    const raw = localStorage.getItem('tanggap_user')
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed.name) {
        userName.value = parsed.name
        const parts = parsed.name.trim().split(/\s+/)
        if (parts.length >= 2) {
          userInitials.value = (parts[0][0] + parts[1][0]).toUpperCase()
        } else if (parts.length === 1 && parts[0].length > 0) {
          userInitials.value = parts[0].substring(0, 2).toUpperCase()
        }
      }
      if (parsed.photo) {
        userPhoto.value = parsed.photo
      }
    }

    const schoolCode = localStorage.getItem('tanggap_school_code')
    hasSchoolCode.value = !!(schoolCode && schoolCode.trim().length >= 6)
  } catch (err) {
    console.error('Failed to parse user from localStorage', err)
  }
}

const handleLeaveSchool = () => {
  if (confirm('Apakah Anda yakin ingin keluar dari kelas sekolah ini? Anda akan kembali ke tampilan awal (dashboard biasa).')) {
    try {
      localStorage.removeItem('tanggap_school_code')
      hasSchoolCode.value = false
      window.dispatchEvent(new Event('storage'))
      isDropdownOpen.value = false
      router.push('/dashboard?view=default')
    } catch (e) {
      console.error('Failed removing school code', e)
    }
  }
}

const handleLogout = () => {
  try {
    localStorage.removeItem('tanggap_token')
    localStorage.removeItem('tanggap_user')
    localStorage.removeItem('tanggap_school_code')
    window.dispatchEvent(new Event('storage'))
  } catch (err) {
    console.error('Failed to clear session', err)
  }
  isDropdownOpen.value = false
  router.push('/login')
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  updateUserData()
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('storage', updateUserData)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('storage', updateUserData)
})
</script>