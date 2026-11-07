<template>
  <div class="min-h-screen flex font-sans bg-[#FAF9FF] text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
    <!-- Mobile Backdrop Overlay ONLY (Never on desktop) -->
    <transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobile && isSidebarOpen"
        @click="isSidebarOpen = false"
        class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-30 lg:hidden"
      />
    </transition>

    <!-- Sidebar Component (Sits side-by-side / menyamping on desktop, drawer on mobile) -->
    <SidebarNav
      :is-open="isSidebarOpen"
      :is-mobile="isMobile"
      :menu-items="menuItems"
      @toggle-sidebar="toggleSidebar"
      @navigate-mobile="isSidebarOpen = false"
    />

    <!-- Main Content Column (Takes remaining width side-by-side with sidebar, pushes content without overlay) -->
    <div class="flex-1 flex flex-col min-w-0 min-h-screen transition-all duration-300 ease-in-out">
      <!-- Dynamic Header Navbar:
           - BIRU SOLID saat sidebar tertutup (matching dashboard siswa.png / guru.png)
           - PUTIH BERSIH saat sidebar dimunculkan (matching dashboard siswa.1.png / guru.1.png)
      -->
      <HeaderNav
        :sidebar-open="isSidebarOpen"
        :is-mobile="isMobile"
        :custom-user-name="userName"
        :custom-user-initials="userInitials"
        @toggle-sidebar="toggleSidebar"
      />

      <!-- Page View Slot -->
      <main class="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl w-full mx-auto">
        <slot />
      </main>

      <!-- Footer at bottom of content area (Hanya di halaman Dashboard utama) -->
      <footer
        v-if="isDashboardPage"
        class="bg-[#1E40AF] text-white py-4 px-6 text-center text-xs md:text-sm font-normal tracking-wide shadow-inner mt-auto select-none"
      >
        © 2026 All Right Reserved, Powered by <span class="font-bold">Tanggap.org</span>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import SidebarNav from './../dashboard/SidebarNav.vue'
import HeaderNav from './../dashboard/HeaderNav.vue'
import { useSidebar } from '../../composables/useSidebar'

withDefaults(
  defineProps<{
    userName?: string
    userInitials?: string
    menuItems?: Array<{ label: string; path: string }>
  }>(),
  {}
)

const route = useRoute()
const isMobile = ref(false)

// Footer hanya muncul di halaman Dashboard utama (Siswa & Guru)
const isDashboardPage = computed(() => {
  return route.path === '/dashboard' || route.path === '/dashboard_guru'
})

// State sidebar tersimpan secara global / persisten saat berpindah halaman.
// Hanya tertutup jika user klik tombol hamburger 2-garis (burger 2) sesuai instruksi.
const { isSidebarOpen, toggleSidebar } = useSidebar()

const handleResize = () => {
  isMobile.value = window.innerWidth < 1024
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isSidebarOpen.value) {
    isSidebarOpen.value = false
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('keydown', handleKeyDown)
})
</script>