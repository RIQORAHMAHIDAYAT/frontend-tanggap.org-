<template>
  <header class="sticky top-0 z-[100]">
    <div class="relative w-full max-w-7xl mx-auto py-4 px-6 xl:px-0">
      
      <!-- Backdrop Overlay -->
      <Transition name="fade">
        <div 
          v-if="isMenuOpen" 
          class="fixed inset-0 bg-slate-900/40 z-[95] backdrop-grayscale-[0.2]"
          @click="isMenuOpen = false"
        ></div>
      </Transition>

      <!-- Navbar Asli -->
      <nav 
        v-show="!isMenuOpen" 
        :class="[
          'bg-[#1C368D] px-6 py-4 flex justify-between items-center w-full rounded-[40px] transition-all duration-500',
          isOnBlue ? 'ring-1 ring-white/25 shadow-[0_6px_20px_rgba(2,6,23,0.4)]' : 'shadow-md'
        ]"
      >
        <!-- Logo for Mobile (Left) -->
        <div class="text-white font-bold text-2xl tracking-wide md:hidden">
          tanggap.org
        </div>

        <!-- Menu Icon (Right on mobile, Left on desktop) -->
        <div class="flex items-center md:flex-1">
          <div 
            class="space-y-1.5 cursor-pointer p-2 -m-2 group" 
            @click="isMenuOpen = true"
            role="button"
            aria-label="Buka menu"
            :aria-expanded="isMenuOpen"
          >
            <div class="w-8 h-1 bg-white rounded-full transition-transform group-hover:scale-x-110"></div>
            <div class="w-8 h-1 bg-white rounded-full transition-transform group-hover:scale-x-110"></div>
          </div>
        </div>
        
        <!-- Logo for Desktop (Center) -->
        <div class="text-white font-bold text-2xl tracking-wide text-center whitespace-nowrap hidden md:block">
          tanggap.org
        </div>
        
        <!-- CTA Button -->
        <div class="flex-1 justify-end hidden md:flex">
          <button class="bg-[#1C368D] bg-gradient-to-b from-white/20 to-transparent text-white font-semibold py-2 px-6 rounded-full text-sm shadow-[0_18px_32px_-16px_rgba(11,21,60,0.45)] hover:scale-[1.03] transition-all duration-300 active:scale-95 active:shadow-none whitespace-nowrap">
            Dapatkan Proposal & Demo Kit Gratis
          </button>
        </div>
      </nav>

      <!-- Menu Melayang (Dropdown) -->
      <Transition name="fade">
        <div v-if="isMenuOpen" class="absolute top-0 left-6 right-6 xl:left-0 xl:right-0 bg-[#1C368D] text-white flex flex-col rounded-[40px] shadow-2xl pb-8 z-[100]" role="dialog" aria-modal="true">
          
          <!-- Bar Atas Menu -->
          <div class="px-8 py-6 flex justify-between items-center">
            <button 
              @click="isMenuOpen = false" 
              class="text-white hover:scale-110 transition-transform focus:outline-none w-24 text-left"
              aria-label="Tutup menu"
            >
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
            <div class="w-full max-w-sm flex flex-col text-center text-xl font-medium" role="menu">
              <div role="menuitem" @click="scrollToSection('program')" class="py-4 border-b border-white/50 hover:bg-white/10 cursor-pointer transition-colors">Program</div>
              <div role="menuitem" @click="scrollToSection('testimoni')" class="py-4 border-b border-white/50 hover:bg-white/10 cursor-pointer transition-colors">Testimoni</div>
              <div role="menuitem" @click="scrollToSection('faq')" class="py-4 border-b border-white/50 hover:bg-white/10 cursor-pointer transition-colors">FAQ</div>
            </div>
          </div>

          <!-- Tombol Bawah -->
          <div class="mt-8 flex justify-center">
            <button class="bg-[#1C368D] bg-gradient-to-b from-white/20 to-transparent text-white font-bold py-2.5 px-8 rounded-full text-sm shadow-[0_18px_32px_-16px_rgba(11,21,60,0.45)] hover:scale-105 transition-all duration-300 active:scale-95 active:shadow-none whitespace-nowrap">
              Dapatkan Proposal & Demo Kit Gratis
            </button>
          </div>
          
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted, watch } from 'vue'

const isMenuOpen = ref(false)
const isOnBlue = ref(false)

// Handle scroll lock
watch(isMenuOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const scrollToSection = async (id: string) => {
  isMenuOpen.value = false
  await nextTick()
  
  setTimeout(() => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 350)
}

// Handle Escape key
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isMenuOpen.value) {
    isMenuOpen.value = false
  }
}

// Observe blue sections for shadow effect
let observer: IntersectionObserver | null = null

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown, true) // use capture to ensure it hits

  // Observer Logic
  observer = new IntersectionObserver((entries) => {
    // We check if any of the observed blue sections are intersecting the top "navbar zone"
    // Using rootMargin to create a thin band at the top of the viewport
    const anyIntersecting = entries.some(entry => entry.isIntersecting)
    isOnBlue.value = anyIntersecting
  }, { 
    // pita deteksi di puncak viewport (ukuran sebanding tinggi navbar)
    rootMargin: '-10px 0px -90% 0px',
    threshold: 0
  })

  // Observe blue background sections
  const blueSections = document.querySelectorAll('section.bg-\\[\\#1C368D\\], section.bg-\\[\\#1C3BAA\\]')
  blueSections.forEach(s => observer?.observe(s))
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
  observer?.disconnect()
})
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
