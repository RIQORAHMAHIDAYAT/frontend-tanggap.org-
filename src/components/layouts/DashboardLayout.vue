<template>
  <div class="min-h-screen flex flex-col font-sans bg-[#FAF9FF] text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
    <!-- Top-level Wrapper -->
    <div class="flex flex-1 relative min-h-screen">
      <!-- Mobile Backdrop Overlay -->
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
          class="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-30 lg:hidden"
        />
      </transition>

      <!-- Sidebar Component (Handles smooth desktop margin transition & mobile drawer internally) -->
      <SidebarNav
        :is-open="isSidebarOpen"
        :is-mobile="isMobile"
        @toggle-sidebar="toggleSidebar"
        @navigate="onMobileNavigate"
      />

      <!-- Main Column (Header + Page Content + Footer) -->
      <div class="flex-1 flex flex-col min-w-0 min-h-screen transition-all duration-300 ease-in-out">
        <!-- Header Navbar -->
        <HeaderNav
          :sidebar-open="isSidebarOpen"
          :is-mobile="isMobile"
          @toggle-sidebar="toggleSidebar"
        />

        <!-- Page View Slot -->
        <main class="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          <slot />
        </main>

        <!-- Footer -->
        <footer class="bg-[#1E40AF] text-white py-4 px-6 text-center text-xs md:text-sm font-normal tracking-wide shadow-inner mt-auto">
          © 2026 All Right Reserved, Powered by <span class="font-bold">Tanggap.org</span>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SidebarNav from './../dashboard/SidebarNav.vue'
import HeaderNav from './../dashboard/HeaderNav.vue'

const isSidebarOpen = ref(true)
const isMobile = ref(false)

const handleResize = () => {
  isMobile.value = window.innerWidth < 1024
  if (isMobile.value) {
    isSidebarOpen.value = false
  } else {
    isSidebarOpen.value = true
  }
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const onMobileNavigate = () => {
  if (isMobile.value) {
    isSidebarOpen.value = false
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
