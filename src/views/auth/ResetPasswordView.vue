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
        <input 
          type="password" 
          placeholder="Password Baru" 
          v-model="newPassword"
          class="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D] transition-colors"
          required
        >
      </div>

      <div>
        <input 
          type="password" 
          placeholder="Konfirmasi Password" 
          v-model="confirmPassword"
          class="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D] transition-colors"
          required
        >
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
