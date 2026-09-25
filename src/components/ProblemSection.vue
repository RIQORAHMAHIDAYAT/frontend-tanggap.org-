<template>
  <section ref="sectionRef" class="bg-slate-50/50 py-24">
    <div class="max-w-7xl mx-auto px-6">
      <h2 :class="['text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C368D] mb-16 transition-all duration-1000 ease-out transform', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12']">
        Tantangan Pendidikan Karakter Remaja di Era Digital
      </h2>
      
      <div class="relative">
        <!-- EFEK BARU: Awan Pendaran Biru di Tengah (Menyebar ke Kiri & Kanan) -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-[#1C368D]/30 to-sky-400/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          
          <!-- Wrapper Card 1 dengan Entry Animation (Delay 100) -->
          <div :class="['transition-all duration-1000 delay-100 ease-out transform h-full', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12']">
            <!-- Card 1 Asli -->
            <div class="bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-900/5 flex flex-col h-full transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-1 cursor-default">
              <h3 class="text-2xl font-bold text-[#0F172A] mb-4">Konflik Remaja yang Makin Kompleks</h3>
              <p class="text-gray-600 text-lg mb-8 flex-grow">
                Dari cyberbullying, gesekan pertemanan, hingga komunikasi negatif di media sosial.
              </p>
              <img src="../assets/image_konflik.webp" alt="Konflik Remaja" width="346" height="185" loading="lazy" decoding="async" class="w-full h-auto object-cover rounded-2xl mt-auto" />
            </div>
          </div>

          <!-- Wrapper Card 2 dengan Entry Animation (Delay 300) -->
          <div :class="['transition-all duration-1000 delay-300 ease-out transform h-full', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12']">
            <!-- Card 2 Asli -->
            <div class="bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-900/5 flex flex-col h-full transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-1 cursor-default">
              <h3 class="text-2xl font-bold text-[#0F172A] mb-4">Sulitnya Mengukur Perkembangan Soft-Skill</h3>
              <p class="text-gray-600 text-lg mb-8 flex-grow">
                Sekolah seringkali kesulitan memetakan tingkat kemampuan resolusi konflik siswa secara kuantitatif.
              </p>
              <img src="../assets/image_sulitnya.webp" alt="Pengukuran Soft-Skill" width="372" height="181" loading="lazy" decoding="async" class="w-full h-auto object-cover rounded-2xl mt-auto" />
            </div>
          </div>

          <!-- Wrapper Card 3 dengan Entry Animation (Delay 500) -->
          <div :class="['transition-all duration-1000 delay-500 ease-out transform h-full', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12']">
            <!-- Card 3 Asli -->
            <div class="bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-900/5 flex flex-col h-full transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-1 cursor-default">
              <h3 class="text-2xl font-bold text-[#0F172A] mb-4">Metode Ceramah yang Kurang Efektif</h3>
              <p class="text-gray-600 text-lg mb-8 flex-grow">
                Remaja usia 16+ cenderung resisten jika dinasihati atau diajar secara sepihak (menggurui).
              </p>
              <img src="../assets/image_metode.webp" alt="Metode Edukasi" width="346" height="185" loading="lazy" decoding="async" class="w-full h-auto object-cover rounded-2xl mt-auto" />
            </div>
          </div>
          
        </div>
      </div>
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
  }, { threshold: 0.15 })
  
  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})
</script>
