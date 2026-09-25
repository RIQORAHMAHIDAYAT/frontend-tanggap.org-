<template>
  <div class="w-[80vw] max-w-[320px] md:max-w-none md:w-[600px] bg-[#0B1228] text-white rounded-3xl md:rounded-[2.5rem] px-5 py-5 md:p-12 flex flex-col">
    <img src="../assets/icon_quote.png" alt="Quote" class="w-8 h-6 md:w-12 md:h-10 mb-2 md:mb-8 object-contain opacity-90" />
    <div class="flex-grow flex flex-col justify-center mb-3 md:mb-12">
      <p class="text-gray-300 text-sm md:text-xl font-light leading-snug md:leading-relaxed">
        {{ item.quote }}
      </p>
    </div>
    <div class="mt-auto flex items-center gap-3 md:gap-4 pt-3 md:pt-8 border-t border-white/10">
      <img :src="item.image" :alt="item.name" width="256" height="256" loading="lazy" decoding="async" class="w-10 h-10 md:w-16 md:h-16 rounded-full flex-shrink-0 object-cover border-2 border-white/20" />
      <div>
        <h4 class="font-bold text-sm md:text-lg leading-tight">{{ item.name }}</h4>
        <p class="text-gray-400 font-light text-[10px] md:text-sm mt-0.5 md:mt-1">{{ item.role }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  item: {
    quote: string
    name: string
    role: string
    image: string
  }
}>()
</script>
