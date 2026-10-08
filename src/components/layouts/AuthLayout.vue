<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-white font-sans overflow-hidden">
    <!-- Banner Side -->
    <div 
      :key="route.path + '-banner'"
      :class="[
        'w-full md:w-5/12 bg-[#1C368D] flex flex-col items-center justify-center py-12 px-6 min-h-[250px] md:min-h-screen relative overflow-hidden transition-all duration-500',
        'order-2',
        reverse ? 'md:order-1 md:rounded-r-[40px] anim-fade-in-from-left' : 'md:order-2 md:rounded-l-[40px] anim-fade-in-from-right',
        'max-md:rounded-t-[40px]'
      ]"
    >
      <div class="z-10 flex flex-col items-center">
        <!-- Logo Image -->
        <img src="../../assets/logo_sementara.png" alt="Logo Resolusi Konflik" class="mb-6 w-32 h-auto object-contain">
        <h2 class="text-white text-xl md:text-2xl font-medium tracking-wide text-center">Resolusi Konflik Remaja</h2>
      </div>
    </div>

    <!-- Form Side -->
    <div 
      :key="route.path + '-form'"
      :class="[
        'w-full md:w-7/12 flex items-center justify-center p-6 md:p-12 lg:p-24 transition-all duration-500 bg-white',
        'order-1 anim-fade-up',
        reverse ? 'md:order-2' : 'md:order-1'
      ]"
    >
      <div class="w-full max-w-md">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

defineProps({
  reverse: {
    type: Boolean,
    default: false
  }
})
</script>

<style>
/* 
  Native CSS Animations 
  Defined globally for the Auth Layout to prevent any scoped CSS conflicts.
  Uses 'both' fill-mode to ensure opacity is 0 before the animation starts.
*/
@keyframes authFadeUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes authFadeInFromLeft {
  0% { opacity: 0; transform: translateX(-40px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes authFadeInFromRight {
  0% { opacity: 0; transform: translateX(40px); }
  100% { opacity: 1; transform: translateX(0); }
}

.anim-fade-up {
  will-change: transform, opacity;
  animation: authFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both !important;
}

.anim-fade-in-from-left {
  will-change: transform, opacity;
  animation: authFadeInFromLeft 0.7s cubic-bezier(0.22, 1, 0.36, 1) both !important;
}

.anim-fade-in-from-right {
  will-change: transform, opacity;
  animation: authFadeInFromRight 0.7s cubic-bezier(0.22, 1, 0.36, 1) both !important;
}
</style>
