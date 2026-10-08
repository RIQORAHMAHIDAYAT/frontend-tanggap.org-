<template>
  <AuthLayout :reverse="false">
    <div class="mb-10 text-center md:text-left">
      <h1 class="text-3xl md:text-4xl font-bold text-[#1C368D] mb-4">Atur Kata Sandi Baru</h1>
      <p class="text-gray-500 text-sm md:text-base">Masukan password baru anda.</p>
    </div>

    <form @submit.prevent="handleReset" class="space-y-5">
      <div v-if="statusMsg" :class="[
        'p-4 rounded-xl text-sm font-medium mb-4',
        isError ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
      ]">
        {{ statusMsg }}
      </div>
      <div>
        <div class="relative">
          <input 
            :type="showNewPassword ? 'text' : 'password'" 
            placeholder="Password Baru" 
            v-model="newPassword"
            class="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D] transition-colors pr-12"
            required
          >
          <button 
            type="button" 
            @click="showNewPassword = !showNewPassword"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1C368D] transition-colors focus:outline-none"
          >
            <svg v-if="!showNewPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div>
        <div class="relative">
          <input 
            :type="showConfirmPassword ? 'text' : 'password'" 
            placeholder="Konfirmasi Password" 
            v-model="confirmPassword"
            class="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D] transition-colors pr-12"
            required
          >
          <button 
            type="button" 
            @click="showConfirmPassword = !showConfirmPassword"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1C368D] transition-colors focus:outline-none"
          >
            <svg v-if="!showConfirmPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      <button 
        type="submit" 
        class="w-full bg-[#20409A] text-white font-semibold py-3.5 rounded-xl shadow-lg hover:bg-[#1C368D] hover:shadow-xl transition-all active:scale-[0.98] mt-2"
      >
        Konfirmasi Password
      </button>
    </form>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '../../components/layouts/AuthLayout.vue'

const router = useRouter()
const newPassword = ref('')
const confirmPassword = ref('')
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const statusMsg = ref('')
const isError = ref(false)

const handleReset = () => {
  if (newPassword.value !== confirmPassword.value) {
    statusMsg.value = 'Password tidak cocok!'
    isError.value = true
    return
  }
  
  // Simulate successful reset
  statusMsg.value = 'Password berhasil diubah!'
  isError.value = false
  
  setTimeout(() => {
    router.push('/login')
  }, 2000)
}
</script>
