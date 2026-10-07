<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-white font-sans">
    <!-- Banner Side -->
    <div 
      :class="[
        'w-full md:w-5/12 bg-[#1C368D] flex flex-col items-center justify-center py-12 px-6 min-h-[250px] md:min-h-screen relative overflow-hidden transition-all duration-500',
        'order-2',
        reverse ? 'md:order-1 md:rounded-r-[40px]' : 'md:order-2 md:rounded-l-[40px]',
        'rounded-t-[40px] md:rounded-t-none'
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
      :class="[
        'w-full md:w-7/12 flex items-center justify-center p-6 md:p-12 lg:p-24 transition-all duration-500 bg-white',
        'order-1',
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
defineProps({
  reverse: {
    type: Boolean,
    default: false
  }
})
</script>
