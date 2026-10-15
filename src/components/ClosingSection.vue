<template>
  <section ref="sectionRef" class="relative bg-white overflow-hidden">
    <!-- Scalloped Wave Transition (White Background transitioning to Blue #1E40AF) -->
    <div class="w-full bg-white leading-none">
      <svg
        class="w-full h-16 sm:h-20 md:h-28 text-[#1E40AF] fill-current block"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M 0,60 Q 75,65 150,40 Q 225,45 300,20 Q 375,30 450,5 Q 525,20 600,0 Q 675,20 750,5 Q 825,30 900,20 Q 975,45 1050,40 Q 1125,65 1200,60 L 1200,120 L 0,120 Z" />
      </svg>
    </div>

    <!-- Main Blue CTA Container (#1E40AF matching Frame fix07.png) -->
    <div class="relative bg-[#1E40AF] text-white pt-6 pb-24 md:pb-32 overflow-hidden">
      <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold mb-6 sm:mb-8 leading-tight tracking-tight">
          Bersama, Ciptakan Cara yang<br class="hidden md:block" /> Lebih Baik Menghadapi Konflik
        </h2>
        <p class="text-base sm:text-lg md:text-xl text-blue-100 font-light mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
          Dukung remaja mengembangkan kemampuan komunikasi, pengelolaan emosi, dan penyelesaian konflik melalui pengalaman belajar yang seru, interaktif, dan terukur.
        </p>

        <!-- White Button with Blue Text (Matching Frame fix07.png) -->
        <router-link to="/pengajuan-sekolah" class="inline-block bg-white hover:bg-slate-50 text-[#1E40AF] font-bold py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 text-base md:text-lg cursor-pointer">
          Dapatkan Proposal & Demo Kit Gratis
        </router-link>
      </div>

      <!-- Decorative Icons matching Frame fix07.png -->
      <!-- Kiri Atas (Catur) -->
      <img
        src="../assets/icon_catur.png"
        alt="Icon Catur"
        loading="lazy"
        decoding="async"
        :class="['absolute top-4 md:top-8 left-4 md:left-20 w-12 md:w-20 pointer-events-none select-none', isVisible ? 'roll-from-right' : 'opacity-0']"
      />
      <!-- Kanan Atas (Kartu) -->
      <img
        src="../assets/icon_card.png"
        alt="Icon Kartu"
        loading="lazy"
        decoding="async"
        :class="['absolute top-4 md:top-8 right-4 md:right-20 w-10 md:w-16 pointer-events-none select-none', isVisible ? 'roll-from-left' : 'opacity-0']"
      />
      <!-- Kiri Bawah (Simpul / Bunga) -->
      <img
        src="../assets/icon_bunga.png"
        alt="Icon Simpul"
        loading="lazy"
        decoding="async"
        :class="['absolute bottom-6 md:bottom-12 left-6 md:left-28 w-10 md:w-16 pointer-events-none select-none', isVisible ? 'roll-from-right' : 'opacity-0']"
      />
      <!-- Kanan Bawah (TicTacToe / Kotak) -->
      <img
        src="../assets/icon_kotak.png"
        alt="Icon TicTacToe"
        loading="lazy"
        decoding="async"
        :class="['absolute bottom-4 md:bottom-8 right-6 md:right-28 w-12 md:w-20 pointer-events-none select-none', isVisible ? 'roll-from-left' : 'opacity-0']"
      />
    </div>
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
  100% { transform: translateX(0) rotate(0deg); opacity: 0.85; }
}

@keyframes rollFromLeft {
  0% { transform: translateX(-100vw) rotate(-720deg); opacity: 0; }
  100% { transform: translateX(0) rotate(0deg); opacity: 0.85; }
}

.roll-from-right {
  animation: rollFromRight 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.roll-from-left {
  animation: rollFromLeft 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}
</style>
