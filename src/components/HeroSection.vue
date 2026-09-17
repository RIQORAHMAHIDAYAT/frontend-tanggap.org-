<template>
  <section ref="heroContentRef" class="max-w-7xl mx-auto px-6 pt-16 pb-24">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
      <!-- Left Content -->
      <div :class="['space-y-8 lg:col-span-7 order-2 lg:order-1 transition-all duration-1000 ease-out transform', isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12']">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C368D] leading-tight">
          Hadirkan Edukasi Resolusi<br class="hidden lg:block" />
          Konflik yang Seru,<br class="hidden lg:block" />
          Interaktif, dan Terukur<br class="hidden lg:block" />
          di Sekolah Anda.
        </h1>
        
        <div class="border-l-4 border-sky-400 pl-6">
          <p class="text-gray-600 text-lg md:text-xl font-medium leading-relaxed">
            Solusi Blended Learning yang<br class="hidden lg:block" />
            menggabungkan media fisik AMIGO<br class="hidden lg:block" />
            Boardgame dengan sistem pengukuran skill<br class="hidden lg:block" />
            digital untuk membangun iklim sekolah yang<br class="hidden lg:block" />
            aman, komunikatif, dan bebas bullying.
          </p>
        </div>

        <button class="bg-gradient-to-b from-[#2A4CC7] to-[#15296b] shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.2)] hover:from-[#3256df] hover:to-[#1a3385] text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 active:scale-95 active:shadow-none">
          Dapatkan Proposal & Demo Kit Gratis
        </button>
      </div>

      <!-- Right Image/Badge Placeholder -->
      <div :class="['relative lg:col-span-5 order-1 lg:order-2 w-[80%] lg:w-full mx-auto mt-4 lg:mt-0 transition-all duration-1000 delay-300 ease-out transform', isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12']">
        <!-- Glow Effect Background -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[145%] h-[145%] bg-gradient-to-tr from-[#1C368D]/[37%] to-sky-300/[37%] rounded-full blur-3xl -z-10"></div>
        
        <!-- Hero Image -->
        <img src="../assets/placeholder_1.png" alt="Hero Image" class="w-full h-auto max-h-[500px] object-contain md:object-cover rounded-xl cursor-pointer transition-transform duration-200 ease-out hover:scale-[1.03] relative z-10" />
        
        <!-- Green Badge Wrapper -->
        <div class="absolute top-8 -right-14 lg:top-1/2 lg:-right-auto lg:left-0 lg:-translate-x-1/4 lg:-translate-y-1/2 z-20">
          <!-- Green Glassmorphism Animated Badge -->
          <div class="animate-float bg-gradient-to-br from-[#A3D22C]/75 to-[#8dbd1f]/75 backdrop-blur-md border border-white/40 text-[#0F172A] rounded-xl p-2 lg:p-4 pr-4 lg:pr-6 shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex items-center gap-2 lg:gap-4 w-max lg:w-80">
            <!-- Icon Asset -->
            <img src="../assets/icon_badge.png" alt="Icon Badge" class="w-8 h-8 lg:w-12 lg:h-12 object-contain flex-shrink-0" />
            <p class="text-[11px] lg:text-sm font-semibold leading-tight">
              <span class="whitespace-nowrap">Dikembangkan oleh Ahli</span><br>
              <span class="whitespace-nowrap">Pendidikan Sosiologi UPI dan UI</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div ref="statsRef" class="mt-40 md:mt-56 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x-2 divide-gray-300">
      <div class="py-6 md:py-0 px-4">
        <h3 class="text-5xl md:text-6xl font-bold text-[#1C368D] mb-4">{{ stat1 }}%</h3>
        <p class="text-gray-600 leading-relaxed text-sm">
          Pendidik menyatakan siswa lebih terbuka<br>
          berdiskusi tentang konflik setelah<br>
          menggunakan metode AMIGO
        </p>
      </div>
      <div class="py-6 md:py-0 px-4">
        <h3 class="text-5xl md:text-6xl font-bold text-[#1C368D] mb-4">{{ stat2 }}%</h3>
        <p class="text-gray-600 leading-relaxed text-sm">
          Siswa melaporkan peningkatan<br>
          pemahaman diri dalam mengendalikan<br>
          emosi lewat alat ukur skill assessment<br>
          tanggap.org
        </p>
      </div>
      <div class="py-6 md:py-0 px-4">
        <h3 class="text-5xl md:text-6xl font-bold text-[#1C368D] mb-4">{{ stat3 }}+</h3>
        <p class="text-gray-600 leading-relaxed text-sm">
          Skenario studi kasus teruji yang relevan<br>
          dengan dinamika sosial remaja era digital
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const stat1 = ref(0)
const stat2 = ref(0)
const stat3 = ref(0)

const statsRef = ref<HTMLElement | null>(null)
const heroContentRef = ref<HTMLElement | null>(null)
const isHeroVisible = ref(false)

const animateValue = (obj: any, start: number, end: number, duration: number) => {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    
    // easeOutQuad
    const easeProgress = progress * (2 - progress);
    
    obj.value = Math.floor(easeProgress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

onMounted(() => {
  // Observer for Stats Animation
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateValue(stat1, 0, 94, 2000)
      animateValue(stat2, 0, 88, 2000)
      animateValue(stat3, 0, 150, 2000)
      statsObserver.disconnect() 
    }
  }, { threshold: 0.5 })
  
  if (statsRef.value) {
    statsObserver.observe(statsRef.value)
  }

  // Observer for Hero Entrance Animation
  const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isHeroVisible.value = true
      heroObserver.disconnect()
    }
  }, { threshold: 0.1 })
  
  if (heroContentRef.value) {
    heroObserver.observe(heroContentRef.value)
  }
})
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}
</style>
