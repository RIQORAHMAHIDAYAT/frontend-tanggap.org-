<template>
  <div class="relative w-full max-w-7xl mx-auto mt-4 px-6 xl:px-0 z-[100]">
    
    <!-- Navbar Asli -->
    <nav v-show="!isMenuOpen" class="bg-[#1C368D] px-6 py-4 flex justify-between items-center w-full rounded-[40px] shadow-md">
      <!-- Logo for Mobile (Left) -->
      <div class="text-white font-bold text-2xl tracking-wide md:hidden">
        tanggap.org
      </div>

      <!-- Menu Icon (Right on mobile, Left on desktop) -->
      <div class="flex items-center md:flex-1">
        <div class="space-y-1.5 cursor-pointer" @click="isMenuOpen = true">
          <div class="w-8 h-1 bg-white rounded-full"></div>
          <div class="w-8 h-1 bg-white rounded-full"></div>
        </div>
      </div>
      
      <!-- Logo for Desktop (Center) -->
      <div class="text-white font-bold text-2xl tracking-wide text-center whitespace-nowrap hidden md:block">
        tanggap.org
      </div>
      
      <!-- CTA Button -->
      <div class="flex-1 justify-end hidden md:flex">
        <button class="bg-gradient-to-b from-[#2A4CC7] to-[#15296b] shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.2)] hover:from-[#3256df] hover:to-[#1a3385] text-white font-semibold py-2 px-6 rounded-full text-sm transition-all duration-300 active:scale-95 active:shadow-none">
          Dapatkan Proposal & Demo Kit Gratis
        </button>
      </div>
    </nav>

    <!-- Menu Melayang (Dropdown) -->
    <Transition name="fade">
      <div v-if="isMenuOpen" class="absolute top-0 left-6 right-6 xl:left-0 xl:right-0 bg-[#1C368D] text-white flex flex-col rounded-[40px] shadow-2xl pb-8">
        
        <!-- Bar Atas Menu -->
        <div class="px-8 py-6 flex justify-between items-center">
          <button @click="isMenuOpen = false" class="text-white hover:scale-110 transition-transform focus:outline-none w-24 text-left">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div class="font-bold text-2xl tracking-wide flex-grow text-center">
            tanggap.org
          </div>
          
          <div class="w-24"></div> <!-- Spacer untuk menyeimbangkan logo di tengah -->
        </div>

        <!-- Menu Tengah -->
        <div class="flex flex-col items-center mt-2 px-8">
          <div class="w-full max-w-sm flex flex-col text-center text-xl font-medium">
            <div @click="scrollToSection('program')" class="py-4 border-b border-white/50 hover:bg-white/10 cursor-pointer transition-colors">Program</div>
            <div @click="scrollToSection('testimoni')" class="py-4 border-b border-white/50 hover:bg-white/10 cursor-pointer transition-colors">Testimoni</div>
            <div @click="scrollToSection('faq')" class="py-4 border-b border-white/50 hover:bg-white/10 cursor-pointer transition-colors">FAQ</div>
          </div>
        </div>

        <!-- Tombol Bawah -->
        <div class="mt-8 flex justify-center">
          <button class="bg-white text-[#1C368D] font-bold py-2.5 px-6 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-sm">
            Dapatkan Proposal & Demo Kit Gratis
          </button>
        </div>
        
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

const isMenuOpen = ref(false)

const scrollToSection = async (id: string) => {
  // 1. Close the menu first
  isMenuOpen.value = false
  
  // 2. Wait for Vue to update the DOM
  await nextTick()
  
  // 3. Wait 350ms to guarantee the 300ms CSS fade transition has completely finished 
  // and the menu is fully removed from the DOM before calculating scroll distance.
  setTimeout(() => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 350)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
