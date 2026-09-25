<template>
  <section class="bg-[#1C368D] py-24 text-white overflow-hidden">
    <div class="max-w-5xl mx-auto px-6">
      
      <!-- Headers -->
      <div ref="titleRef" :class="['text-center mb-20 flex flex-col items-center transition-all duration-1000 ease-out transform', isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12']">
        <div class="inline-block bg-white text-[#1C368D] font-medium italic rounded-full px-8 py-2 mb-6">
          Bagaimana Cara Kerjanya?
        </div>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
          Metode Blended Learning: Bermain, Mengukur, dan Mempraktikkan
        </h2>
      </div>

      <!-- Steps -->
      <div class="space-y-12">
        
        <!-- Step 1: PLAY -->
        <div ref="step1Ref" class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div :class="['w-full lg:w-1/2 transition-all duration-1000 ease-out transform', isStep1Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12']">
            <img src="../assets/image_play.webp" alt="Tahap Bermain AMIGO" width="545" height="383" loading="lazy" decoding="async" class="w-full h-auto drop-shadow-xl hover:scale-[1.02] transition-transform duration-500 rounded-2xl border border-white/20" />
          </div>
          <div :class="['w-full lg:w-1/2 space-y-4 transition-all duration-1000 delay-300 ease-out transform', isStep1Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12']">
            <h3 class="text-3xl font-bold uppercase tracking-wider">PLAY</h3>
            <p class="text-xl text-blue-100 font-light leading-relaxed max-w-lg">
              Siswa bermain AMIGO Boardgame untuk mensimulasikan berbagai skenario konflik secara aman dan menyenangkan.
            </p>
          </div>
        </div>

        <!-- Step 2: MEASURE -->
        <div ref="step2Ref" class="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
          <div :class="['w-full lg:w-1/2 transition-all duration-1000 ease-out transform', isStep2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12']">
            <img src="../assets/image_measure.webp" alt="Tahap Pengukuran Skill" width="545" height="383" loading="lazy" decoding="async" class="w-full h-auto drop-shadow-xl hover:scale-[1.02] transition-transform duration-500 rounded-2xl border border-white/20" />
          </div>
          <div :class="['w-full lg:w-1/2 space-y-4 lg:text-left transition-all duration-1000 delay-300 ease-out transform', isStep2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12']">
            <h3 class="text-3xl font-bold uppercase tracking-wider">MEASURE</h3>
            <p class="text-xl text-blue-100 font-light leading-relaxed max-w-lg">
              Guru dan siswa mengisi penilaian digital untuk mengukur pemahaman dan perkembangan soft-skill.
            </p>
          </div>
        </div>

        <!-- Step 3: APPLY -->
        <div ref="step3Ref" class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div :class="['w-full lg:w-1/2 transition-all duration-1000 ease-out transform', isStep3Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12']">
            <img src="../assets/image_apply.webp" alt="Tahap Praktik Resolusi Konflik" width="545" height="383" loading="lazy" decoding="async" class="w-full h-auto drop-shadow-xl hover:scale-[1.02] transition-transform duration-500 rounded-2xl border border-white/20" />
          </div>
          <div :class="['w-full lg:w-1/2 space-y-4 transition-all duration-1000 delay-300 ease-out transform', isStep3Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12']">
            <h3 class="text-3xl font-bold uppercase tracking-wider">APPLY</h3>
            <p class="text-xl text-blue-100 font-light leading-relaxed max-w-lg">
              Penerapan langsung strategi resolusi konflik dalam kehidupan nyata menggunakan panduan Tanggap Action Toolkit.
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const titleRef = ref<HTMLElement | null>(null)
const step1Ref = ref<HTMLElement | null>(null)
const step2Ref = ref<HTMLElement | null>(null)
const step3Ref = ref<HTMLElement | null>(null)

const isTitleVisible = ref(false)
const isStep1Visible = ref(false)
const isStep2Visible = ref(false)
const isStep3Visible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target === titleRef.value) isTitleVisible.value = true
        if (entry.target === step1Ref.value) isStep1Visible.value = true
        if (entry.target === step2Ref.value) isStep2Visible.value = true
        if (entry.target === step3Ref.value) isStep3Visible.value = true
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })

  if (titleRef.value) observer.observe(titleRef.value)
  if (step1Ref.value) observer.observe(step1Ref.value)
  if (step2Ref.value) observer.observe(step2Ref.value)
  if (step3Ref.value) observer.observe(step3Ref.value)
})
</script>
