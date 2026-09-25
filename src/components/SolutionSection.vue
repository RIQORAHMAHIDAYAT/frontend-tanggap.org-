<template>
  <section ref="solutionRef" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <h2 :class="['text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C368D] mb-20 transition-all duration-1000 ease-out transform', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12']">
        Solusi Yang Kami Berikan
      </h2>
      
      <div class="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-8 lg:gap-8">
        
        <!-- Left Column (Bergeser dari kiri) -->
        <div :class="['w-full lg:w-1/3 flex flex-col gap-8 lg:gap-16 transition-all duration-1000 delay-300 ease-out transform', isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8']">
          <!-- Item 1 -->
          <div class="flex flex-row lg:flex-col items-start lg:items-center gap-4 lg:gap-0">
            <div class="mt-2 w-3 h-3 rounded-full bg-[#00A5FF] flex-shrink-0 block lg:hidden"></div>
            <div class="text-left lg:text-center">
              <h3 class="text-xl md:text-2xl font-bold text-[#0F172A] mb-2 lg:mb-3 italic">Board Game AMIGO</h3>
              <p class="text-gray-700 text-sm md:text-base lg:text-lg">
                Permainan kartu Role Play untuk simulasi resolusi konflik dan meningkatkan interaksi sosial
              </p>
            </div>
          </div>
          <!-- Item 2 -->
          <div class="flex flex-row lg:flex-col items-start lg:items-center gap-4 lg:gap-0">
            <div class="mt-2 w-3 h-3 rounded-full bg-[#00A5FF] flex-shrink-0 block lg:hidden"></div>
            <div class="text-left lg:text-center">
              <h3 class="text-xl md:text-2xl font-bold text-[#0F172A] mb-2 lg:mb-3 italic">Pengukuran Skill Resolusi Konflik</h3>
              <p class="text-gray-700 text-sm md:text-base lg:text-lg">
                Alat ukur evaluasi mandiri & kelompok untuk memantau efektivitas program
              </p>
            </div>
          </div>
        </div>

        <!-- Center Image (Zoom in lembut) -->
        <div :class="['w-full lg:w-1/3 flex justify-center order-first lg:order-none transition-all duration-1000 delay-100 ease-out transform', isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95']">
          <img src="../assets/image_student.webp" alt="Students playing AMIGO boardgame" width="375" height="236" loading="lazy" decoding="async" class="w-full max-w-lg h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500" />
        </div>

        <!-- Right Column (Bergeser dari kanan) -->
        <div :class="['w-full lg:w-1/3 flex flex-col gap-8 lg:gap-16 transition-all duration-1000 delay-500 ease-out transform', isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8']">
          <!-- Item 3 -->
          <div class="flex flex-row lg:flex-col items-start lg:items-center gap-4 lg:gap-0">
            <div class="mt-2 w-3 h-3 rounded-full bg-[#00A5FF] flex-shrink-0 block lg:hidden"></div>
            <div class="text-left lg:text-center">
              <h3 class="text-xl md:text-2xl font-bold text-[#0F172A] mb-2 lg:mb-3 italic">Tanggap Action Toolkit</h3>
              <p class="text-gray-700 text-sm md:text-base lg:text-lg">
                Galeri template PDF interaktif yang siap cetak untuk bimbingan konseling dan mediasi mandiri
              </p>
            </div>
          </div>
          <!-- Item 4 -->
          <div class="flex flex-row lg:flex-col items-start lg:items-center gap-4 lg:gap-0">
            <div class="mt-2 w-3 h-3 rounded-full bg-[#00A5FF] flex-shrink-0 block lg:hidden"></div>
            <div class="text-left lg:text-center">
              <h3 class="text-xl md:text-2xl font-bold text-[#0F172A] mb-2 lg:mb-3 italic">Gamifikasi Pembelajaran</h3>
              <p class="text-gray-700 text-sm md:text-base lg:text-lg">
                Tantangan mingguan dan digital badge untuk menjaga motivasi penerapan nilai-nilai positif
              </p>
            </div>
          </div>
        </div>

      </div>

      <!-- Item 5: Dikembangkan oleh Ahli Section -->
      <div :class="['mt-8 lg:mt-20 transition-all duration-1000 delay-700 ease-out transform', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
        <div class="flex flex-row lg:flex-col items-start lg:items-center gap-4 lg:gap-0">
          <div class="mt-2 w-3 h-3 rounded-full bg-[#00A5FF] flex-shrink-0 block lg:hidden"></div>
          <div class="text-left lg:text-center w-full">
            <h3 class="text-xl md:text-2xl lg:text-3xl font-bold text-[#0F172A] mb-2 lg:mb-4">
              Dikembangkan oleh Ahli Pendidikan Sosiologi UPI dan UI
            </h3>
            <p class="text-gray-700 text-sm md:text-base lg:text-lg lg:max-w-4xl mx-auto leading-relaxed">
              Metodologi media pembelajaran AMIGO dan alat ukur tanggap.org disusun mengacu pada riset yang dipimpin oleh Profesor di bidang pendidikan sosiologi serta pengujian langsung pada ratusan remaja usia 16+
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const solutionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isVisible.value = true
      observer.disconnect() 
    }
  }, { threshold: 0.15 })
  
  if (solutionRef.value) {
    observer.observe(solutionRef.value)
  }
})
</script>
