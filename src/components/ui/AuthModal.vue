<template>
  <Transition name="fade">
    <div v-if="isOpen" @click="closeModal" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div 
        class="bg-white rounded-3xl p-8 max-w-sm w-full flex flex-col items-center shadow-2xl transform transition-all"
        @click.stop
      >
        <!-- Success Icon -->
        <div class="mb-6">
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="36" cy="36" r="33" fill="white" stroke="#4ade80" stroke-width="6"/>
            <path d="M22 36 L32 46 L50 26" stroke="#4ade80" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <h3 class="text-xl font-bold text-gray-900 mb-6 text-center">Pendaftaran Berhasil</h3>
        
        <button 
          @click="closeModal" 
          class="w-full bg-[#20409A] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#1C368D] hover:shadow-xl transition-all active:scale-95"
        >
          Oke
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
