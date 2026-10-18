<template>
  <div class="fixed bottom-16 right-6 md:right-8 z-40">
    <!-- Tooltip / Bubble Popover -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0 translate-y-2"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 translate-y-2"
    >
      <div
        v-if="isOpen"
        class="absolute bottom-16 right-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 mb-2 text-slate-800"
      >
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <div class="flex items-center gap-2">
            <img :src="telponIcon" alt="Logo Bantuan" class="w-5 h-5 object-contain select-none" />
            <span class="font-bold text-sm text-slate-900">Bantuan Tanggap.org</span>
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5"></span>
          </div>
          <button
            @click="isOpen = false"
            class="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
            aria-label="Tutup Bantuan"
          >
            ✕
          </button>
        </div>
        <p class="text-xs text-slate-600 mb-4 leading-relaxed">
          Halo {{ userName }}! Ada yang perlu kami bantu seputar AMIGO, assessment, atau kelas sekolahmu?
        </p>
        <a
          href="https://wa.me/?text=Halo%20Tim%20Tanggap.org,%20saya%20butuh%20bantuan"
          target="_blank"
          rel="noopener noreferrer"
          class="block w-full py-2.5 text-center bg-[#1E40AF] hover:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow transition-colors"
        >
          Hubungi Layanan Konseling
        </a>
      </div>
    </transition>

    <!-- Floating Circular Button matching mockup -->
    <button
      @click="isOpen = !isOpen"
      type="button"
      class="w-13 h-13 md:w-14 md:h-14 rounded-full bg-slate-200 hover:bg-slate-300 active:scale-95 text-slate-800 shadow-md flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-slate-300/50"
      title="Bantuan & Dukungan"
      aria-label="Bantuan dan Dukungan"
    >
      <!-- Headset Agent Icon using official telpon.png asset -->
      <img
        :src="telponIcon"
        alt="Bantuan Tanggap.org"
        class="w-8 h-8 md:w-9 md:h-9 object-contain select-none pointer-events-none drop-shadow-xs"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import telponIcon from '../../assets/telpon.png'

const isOpen = ref(false)
const userName = ref('Ahmat Fauzy')

onMounted(() => {
  try {
    const raw = localStorage.getItem('tanggap_user')
    if (raw) {
      const user = JSON.parse(raw)
      if (user.name) userName.value = user.name
    }
  } catch (err) {
    console.error('Failed reading user', err)
  }
})
</script>
