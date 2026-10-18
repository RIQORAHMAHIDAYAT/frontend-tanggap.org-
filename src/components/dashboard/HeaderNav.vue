<template>
  <header class="h-20 bg-[#1E40AF] px-6 md:px-8 flex items-center justify-between shadow-md relative z-20 shrink-0 select-none">
    <!-- Left Section: 2-Line Hamburger Toggle + Brand Logo -->
    <div class="flex items-center gap-3 sm:gap-4 min-w-0">
      <!-- 2-Line Morphing Hamburger Button -->
      <button
        @click="$emit('toggle-sidebar')"
        type="button"
        class="p-2 -ml-2 rounded-xl hover:bg-white/10 active:scale-90 text-white focus:outline-none transition-all duration-200 cursor-pointer flex items-center justify-center group shrink-0"
        :title="sidebarOpen ? 'Tutup Menu Sidebar' : 'Buka Menu Sidebar'"
        aria-label="Toggle Menu Sidebar"
      >
        <div class="w-8 h-5 flex flex-col justify-center gap-1.5">
          <!-- Top Bar: Solid white pill, full width -->
          <span class="block w-7 sm:w-8 h-1 bg-white rounded-full transition-all duration-300 ease-in-out"></span>
          <!-- Bottom Bar: Solid white pill, morphs width depending on sidebarOpen -->
          <span
            class="block h-1 bg-white rounded-full transition-all duration-300 ease-in-out origin-left"
            :class="sidebarOpen ? 'w-4 sm:w-5' : 'w-7 sm:w-8'"
          ></span>
        </div>
      </button>

      <!-- Logo tanggap.org with smooth fade transition between closed and open states on desktop -->
      <router-link
        to="/dashboard"
        class="text-2xl md:text-3xl font-bold tracking-tight text-white hover:opacity-95 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden"
        :class="[
          isMobile
            ? 'opacity-100'
            : (sidebarOpen ? 'opacity-0 pointer-events-none -translate-x-2 w-0' : 'opacity-100 translate-x-0')
        ]"
      >
        tanggap.org
      </router-link>
    </div>

    <!-- Right Section: User Profile Avatar & Dropdown -->
    <div class="relative shrink-0" ref="dropdownRef">
      <button
        @click="isDropdownOpen = !isDropdownOpen"
        type="button"
        class="flex items-center gap-2 p-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all focus:outline-none cursor-pointer"
        aria-haspopup="true"
        :aria-expanded="isDropdownOpen"
      >
        <!-- Circle Avatar Initials or Photo -->
        <div class="w-10 h-10 md:w-11 md:h-11 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center text-sm md:text-base shadow-sm overflow-hidden">
          <img v-if="userPhoto" :src="userPhoto" alt="Profile" class="w-full h-full object-cover" />
          <span v-else>{{ userInitials }}</span>
        </div>

        <!-- Chevron Down Arrow -->
        <svg
          class="w-4 h-4 text-white transition-transform duration-200"
          :class="{ 'rotate-180': isDropdownOpen }"
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
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

defineProps<{
  sidebarOpen: boolean
  isMobile: boolean
}>()

defineEmits<{
  (e: 'toggle-sidebar'): void
}>()

const router = useRouter()
const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const userName = ref('Ahmat Fauzy')
const userEmail = ref('ahmat.fauzy@tanggap.org')
const userInitials = ref('AF')
const userPhoto = ref('')
const hasSchoolCode = ref(false)

const loadUserData = () => {
  try {
    const raw = localStorage.getItem('tanggap_user')
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed.name) userName.value = parsed.name
      if (parsed.email) userEmail.value = parsed.email
      if (parsed.initials) userInitials.value = parsed.initials
      if (parsed.photo) userPhoto.value = parsed.photo
      else userPhoto.value = ''
    }
  } catch (err) {
    console.error('Failed reading user session', err)
  }

  const code = localStorage.getItem('tanggap_school_code')
  hasSchoolCode.value = Boolean(code && code.trim().length >= 6)
}

const closeDropdownOutside = (event: MouseEvent) => {
  if (!isDropdownOpen.value) return
  const target = event.target as Node | null
  if (dropdownRef.value && target && !dropdownRef.value.contains(target)) {
    isDropdownOpen.value = false
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isDropdownOpen.value) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  loadUserData()
  window.addEventListener('storage', loadUserData)
  window.addEventListener('click', closeDropdownOutside)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('storage', loadUserData)
  window.removeEventListener('click', closeDropdownOutside)
  window.removeEventListener('keydown', handleKeydown)
})

const handleLeaveSchool = () => {
  isDropdownOpen.value = false
  localStorage.removeItem('tanggap_school_code')
  hasSchoolCode.value = false
  window.dispatchEvent(new Event('storage'))
  if (router.currentRoute.value.path !== '/dashboard') {
    router.push('/dashboard')
  }
}

const handleLogout = () => {
  isDropdownOpen.value = false
  localStorage.removeItem('tanggap_user')
  router.push('/login')
}
</script>
