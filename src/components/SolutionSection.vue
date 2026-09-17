<template>
  <section ref="solutionRef" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <h2 :class="['text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C368D] mb-20 transition-all duration-1000 ease-out transform', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12']">
        Solusi Yang Kami Berikan
      </h2>
      
      <div class="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        <!-- Left Column (Bergeser dari kiri) -->
        <div :class="['w-full lg:w-1/3 flex flex-col gap-16 text-center transition-all duration-1000 delay-300 ease-out transform', isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8']">
          <!-- Item 1 -->
          <div>
            <h3 class="text-2xl font-bold text-[#0F172A] mb-3 italic">Board Game AMIGO</h3>
            <p class="text-gray-700 text-lg">
              Permainan kartu Role Play untuk simulasi resolusi konflik dan meningkatkan interaksi sosial
            </p>
          </div>
          <!-- Item 2 -->
          <div>
            <h3 class="text-2xl font-bold text-[#0F172A] mb-3 italic">Pengukuran Skill Resolusi Konflik</h3>
            <p class="text-gray-700 text-lg">
              Alat ukur evaluasi mandiri & kelompok untuk memantau efektivitas program
            </p>
          </div>
        </div>

        <!-- Center Image (Zoom in lembut) -->
        <div :class="['w-full lg:w-1/3 flex justify-center order-first lg:order-none mb-10 lg:mb-0 transition-all duration-1000 delay-100 ease-out transform', isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95']">
          <img src="../assets/image_student.png" alt="Students playing AMIGO boardgame" class="w-full max-w-lg h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500" />
        </div>

        <!-- Right Column (Bergeser dari kanan) -->
        <div :class="['w-full lg:w-1/3 flex flex-col gap-16 text-center transition-all duration-1000 delay-500 ease-out transform', isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8']">
          <!-- Item 3 -->
          <div>
            <h3 class="text-2xl font-bold text-[#0F172A] mb-3 italic">Tanggap Action Toolkit</h3>
            <p class="text-gray-700 text-lg">
              Galeri template PDF interaktif yang siap cetak untuk bimbingan konseling dan mediasi mandiri
            </p>
          </div>
          <!-- Item 4 -->
          <div>
            <h3 class="text-2xl font-bold text-[#0F172A] mb-3 italic">Gamifikasi Pembelajaran</h3>
            <p class="text-gray-700 text-lg">
              Tantangan mingguan dan digital badge untuk menjaga motivasi penerapan nilai-nilai positif
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
