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

    <!-- Admin Sidebar (White background, blue active pill) -->
    <AdminSidebar
      :is-open="isSidebarOpen"
      :is-mobile="isMobile"
      @toggle-sidebar="toggleSidebar"
      @navigate-mobile="isSidebarOpen = false"
    />

    <!-- Main Content Column (Takes remaining width side-by-side with sidebar, pushes content without overlay) -->
    <div class="flex-1 flex flex-col min-w-0 min-h-screen transition-all duration-300 ease-in-out">
      <!-- Admin Dynamic Header -->
      <AdminHeader
        :sidebar-open="isSidebarOpen"
        @toggle-sidebar="toggleSidebar"
      />

      <!-- Page View Slot -->
      <main class="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl w-full mx-auto">
        <slot />
      </main>

      <!-- Admin Clean Footer -->
      <footer class="bg-white border-t border-slate-200/80 text-slate-500 py-4 px-6 text-center text-xs md:text-sm font-normal select-none">
        © 2026 All Right Reserved, Powered by <span class="font-bold text-[#1E40AF]">Tanggap.org</span>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AdminSidebar from '../admin/AdminSidebar.vue'
import AdminHeader from '../admin/AdminHeader.vue'
import { useSidebar } from '../../composables/useSidebar'

const isMobile = ref(false)

// Shared persistent state across route navigation (stays open unless hamburger clicked)
const { isSidebarOpen, toggleSidebar } = useSidebar()

const handleResize = () => {
  isMobile.value = window.innerWidth < 1024
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isSidebarOpen.value && isMobile.value) {
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

