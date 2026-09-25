<template>
  <section ref="sectionRef" class="relative bg-[#1C3BAA] text-white pt-16 pb-24 mt-12 md:mt-24 overflow-hidden">
    
    <!-- Scalloped Wave forming a Macro-Hill (8 Dips) -->
    <svg class="absolute top-0 left-0 w-full h-16 md:h-24 text-[#1C3BAA] fill-current -translate-y-[99%]" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M 0,60 Q 75,65 150,40 Q 225,45 300,20 Q 375,30 450,5 Q 525,20 600,0 Q 675,20 750,5 Q 825,30 900,20 Q 975,45 1050,40 Q 1125,65 1200,60 L 1200,120 L 0,120 Z" />
    </svg>

    <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
        Bersama, Ciptakan Cara yang<br class="hidden md:block" />Lebih Baik Menghadapi Konflik
      </h2>
      <p class="text-lg md:text-xl text-blue-100 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
        Dukung remaja mengembangkan kemampuan komunikasi, pengelolaan emosi, dan penyelesaian konflik melalui pengalaman belajar yang seru, interaktif, dan terukur.
      </p>
      <button class="bg-[#1C368D] bg-gradient-to-b from-white/20 to-transparent text-white font-bold py-4 px-10 rounded-[10px] shadow-[0_18px_32px_-16px_rgba(11,21,60,0.45)] hover:shadow-[0_24px_40px_-18px_rgba(11,21,60,0.55)] hover:scale-[1.03] transition-all duration-300">
        Dapatkan Proposal & Demo Kit Gratis
      </button>
    </div>

    <!-- Decorative Icons -->
    <!-- Kiri Atas (Catur) -> Animasi dari Kanan -->
    <img src="../assets/icon_catur.png" alt="Icon Catur" :class="['absolute top-8 md:top-12 left-4 md:left-24 w-12 md:w-20', isVisible ? 'roll-from-right' : 'opacity-0']" />
    <!-- Kanan Atas (Kartu) -> Animasi dari Kiri -->
    <img src="../assets/icon_card.png" alt="Icon Kartu" :class="['absolute top-8 md:top-12 right-4 md:right-24 w-10 md:w-16', isVisible ? 'roll-from-left' : 'opacity-0']" />
    <!-- Kiri Bawah (Simpul / Bunga) -> Animasi dari Kanan -->
    <img src="../assets/icon_bunga.png" alt="Icon Simpul" :class="['absolute bottom-8 md:bottom-12 left-8 md:left-32 w-10 md:w-16', isVisible ? 'roll-from-right' : 'opacity-0']" />
    <!-- Kanan Bawah (TicTacToe / Kotak) -> Animasi dari Kiri -->
    <img src="../assets/icon_kotak.png" alt="Icon TicTacToe" :class="['absolute bottom-4 md:bottom-8 right-8 md:right-32 w-12 md:w-20', isVisible ? 'roll-from-left' : 'opacity-0']" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isVisible.value = true
      observer.disconnect()
    }
  }, { threshold: 0.2 })

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})
</script>

<style scoped>
@keyframes rollFromRight {
  0% { transform: translateX(100vw) rotate(720deg); opacity: 0; }
  100% { transform: translateX(0) rotate(0deg); opacity: 0.8; }
}

@keyframes rollFromLeft {
  0% { transform: translateX(-100vw) rotate(-720deg); opacity: 0; }
  100% { transform: translateX(0) rotate(0deg); opacity: 0.8; }
}

.roll-from-right {
  animation: rollFromRight 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.roll-from-left {
  animation: rollFromLeft 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}
</style>
