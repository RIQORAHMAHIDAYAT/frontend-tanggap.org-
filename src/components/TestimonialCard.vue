<template>
  <div class="w-[85vw] md:w-[600px] bg-[#0B1228] text-white rounded-[2.5rem] p-8 md:p-12 flex flex-col shadow-xl shadow-slate-200/50">
    <img src="../assets/icon_quote.png" alt="Quote" class="w-12 h-10 mb-8 object-contain opacity-90" />
    <p class="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-12 flex-grow">
      {{ item.quote }}
    </p>
    <div class="flex items-center gap-4 pt-8 border-t border-white/10">
      <img :src="item.image" :alt="item.name" class="w-16 h-16 rounded-full flex-shrink-0 object-cover border-2 border-white/20" />
      <div>
        <h4 class="font-bold text-lg leading-tight">{{ item.name }}</h4>
        <p class="text-gray-400 font-light text-sm mt-1">{{ item.role }}</p>
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
