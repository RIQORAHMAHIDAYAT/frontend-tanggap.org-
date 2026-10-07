<template>
  <AuthLayout :reverse="true">
    <div class="mb-10 text-center md:text-left">
      <h1 class="text-3xl md:text-4xl font-bold text-[#1C368D] mb-4">Buat akun</h1>
      <p class="text-gray-500 text-sm md:text-base">Masukkan detail pribadi Anda dan mulailah perjalanan bersama kami.</p>
    </div>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <div v-if="errorMsg" class="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
        {{ errorMsg }}
      </div>
      <div>
        <input 
          type="text" 
          placeholder="Nama Lengkap" 
          v-model="fullName"
          class="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D] transition-colors"
          required
          aria-label="Nama Lengkap"
        >
      </div>

      <div>
        <input 
          type="email" 
          placeholder="Email" 
          v-model="email"
          class="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D] transition-colors"
          required
        >
      </div>

      <div>
        <input 
          type="tel" 
          placeholder="Nomor Telepon" 
          v-model="phone"
          class="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D] transition-colors"
          required
        >
      </div>

      <div>
        <input 
          type="password" 
          placeholder="Password" 
          v-model="password"
          class="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D] transition-colors"
          required
        >
      </div>

      <div>
        <input 
          type="password" 
          placeholder="Konfirmasi Password" 
          v-model="confirmPassword"
          class="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D] transition-colors"
          required
        >
      </div>

      <button 
        type="submit" 
        class="w-full bg-[#20409A] text-white font-semibold py-3.5 rounded-xl shadow-lg hover:bg-[#1C368D] hover:shadow-xl transition-all active:scale-[0.98] mt-2"
      >
        Daftar
      </button>
    </form>

    <div class="mt-8 text-center text-sm">
      <span class="text-gray-500">Sudah punya akun? </span>
      <router-link to="/login" class="text-[#20409A] font-semibold hover:underline">
        Masuk
      </router-link>
    </div>

    <!-- Success Modal -->
    <AuthModal :is-open="isModalOpen" @close="handleModalClose" />
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '../../components/layouts/AuthLayout.vue'
import AuthModal from '../../components/ui/AuthModal.vue'

const router = useRouter()

const fullName = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')

const isModalOpen = ref(false)

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Konfirmasi password tidak cocok!'
    return
  }
  errorMsg.value = ''
  // Simulate successful registration
  isModalOpen.value = true
}

const handleModalClose = () => {
  isModalOpen.value = false
  router.push('/login')
}
</script>
