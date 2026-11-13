<template>
  <header
    class="h-20 px-6 md:px-8 flex items-center justify-between relative z-20 shrink-0 select-none bg-white border-b border-slate-200/80 shadow-xs transition-all duration-300 ease-in-out"
  >
    <!-- Left Section: 2-Line Morphing Hamburger Button -->
    <div class="flex items-center gap-3 sm:gap-4 min-w-0">
      <button
        @click="$emit('toggle-sidebar')"
        type="button"
        class="p-2 -ml-2 rounded-xl active:scale-90 focus:outline-none transition-all duration-200 cursor-pointer flex items-center justify-center group shrink-0 hover:bg-slate-100 text-[#1E40AF]"
        :title="sidebarOpen ? 'Tutup Menu Navigasi' : 'Buka Menu Navigasi'"
        aria-label="Toggle Menu Navigasi"
      >
        <div class="w-8 h-5 flex flex-col justify-center gap-1.5">
          <!-- Top Bar -->
          <span
            class="block w-7 sm:w-8 h-1 rounded-full bg-[#1E40AF] transition-all duration-300 ease-in-out"
          ></span>
          <!-- Bottom Bar -->
          <span
            class="block h-1 rounded-full bg-[#1E40AF] transition-all duration-300 ease-in-out origin-left"
            :class="[
              sidebarOpen ? 'w-4 sm:w-5' : 'w-7 sm:w-8'
            ]"
          ></span>
        </div>
      </button>

      <!-- Logo tanggap.org: HANYA tampil di header kiri saat sidebar TERTUTUP (desktop / tablet) -->
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
          to="/dashboard_admin"
          class="text-2xl md:text-3xl font-extrabold tracking-tight text-[#1E40AF] hover:opacity-90 transition-opacity whitespace-nowrap hidden sm:inline-block"
        >
          tanggap.org
        </router-link>
      </transition>
    </div>

    <!-- Center Section: Logo tanggap.org HANYA di mobile saat sidebar tertutup -->
    <div
      v-if="!sidebarOpen"
      class="sm:hidden absolute left-1/2 -translate-x-1/2 pointer-events-auto select-none"
    >
      <router-link
        to="/dashboard_admin"
        class="text-2xl font-extrabold tracking-tight text-[#1E40AF] hover:opacity-90 transition-opacity whitespace-nowrap"
      >
        tanggap.org
      </router-link>
    </div>

    <!-- Right Section: Admin Profile Dropdown (Matching Figma Screenshot) -->
    <div class="flex items-center gap-4 shrink-0 relative" ref="dropdownRef">
      <button
        @click="isDropdownOpen = !isDropdownOpen"
        type="button"
        class="flex items-center gap-2.5 p-1 sm:px-3 sm:py-1.5 rounded-full hover:bg-slate-100 active:scale-95 transition-all focus:outline-none cursor-pointer"
        aria-haspopup="true"
        :aria-expanded="isDropdownOpen"
      >
        <!-- Circle Avatar Photo -->
        <div class="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border border-slate-300 shadow-xs shrink-0 bg-slate-100">
          <img :src="adminAvatar" alt="Admin Avatar" class="w-full h-full object-cover" />
        </div>

        <!-- Admin Name Label -->
        <span class="text-slate-900 font-bold text-sm sm:text-base tracking-tight hidden sm:inline-block">
          Admin
        </span>

        <!-- Chevron Down Arrow -->
        <svg
          class="w-4 h-4 text-slate-700 transition-transform duration-200"
          :class="{ 'rotate-180': isDropdownOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div
          v-if="isDropdownOpen"
          class="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2.5 z-50 text-slate-700 select-none"
        >
          <div class="px-4 py-2 border-b border-slate-100 mb-1">
            <p class="text-xs text-slate-400 font-medium uppercase tracking-wider">Peran Pengguna</p>
            <p class="text-sm font-bold text-[#1E40AF]">Administrator Sistem</p>
          </div>

          <button
            type="button"
            @click="handleLogout"
            class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors cursor-pointer"
          >
            <span>🚪</span>
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../../services/authService'
import adminAvatar from '../../assets/icon_fauzy.png'

const router = useRouter()

withDefaults(
  defineProps<{
    sidebarOpen?: boolean
  }>(),
  {
    sidebarOpen: true
  }
)

defineEmits<{
  (e: 'toggle-sidebar'): void
}>()

const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

const handleLogout = () => {
  isDropdownOpen.value = false
  authService.logout()
  router.replace('/login')
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

