<template>
  <AuthLayout :reverse="true">
    <div class="mb-10 text-center md:text-left">
      <h1 class="text-3xl md:text-4xl font-bold text-[#1C368D] mb-4">Lupa Password</h1>
      <p class="text-gray-500 text-sm md:text-base leading-relaxed">
        Masukan email anda yang terdaftar untuk menerima link atur ulang password.
      </p>
    </div>

    <form @submit.prevent="handleForgot" class="space-y-6">
      <div v-if="statusMsg" :class="[
        'p-4 rounded-xl text-sm font-medium mb-6',
        isError ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
      ]">
        {{ statusMsg }}
      </div>
      <div>
        <input 
          type="email" 
          placeholder="Email" 
          v-model="email"
          class="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D] transition-colors"
          required
        >
      </div>

      <button 
        type="submit" 
        class="w-full bg-[#20409A] text-white font-semibold py-3.5 rounded-xl shadow-lg hover:bg-[#1C368D] hover:shadow-xl transition-all active:scale-[0.98]"
      >
        Kirim email reset
      </button>
    </form>

    <div class="mt-8 text-center text-sm">
      <router-link to="/login" class="text-gray-500 hover:text-[#20409A] transition-colors flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Login
      </router-link>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '../../components/layouts/AuthLayout.vue'

const router = useRouter()
const email = ref('')
const statusMsg = ref('')
const isError = ref(false)

const handleForgot = () => {
  if (!email.value) return
  
  // Simulate sending email
  console.log('Sending reset email to', email.value)
  statusMsg.value = 'Email reset password telah dikirim (Simulasi)'
  isError.value = false
  
  setTimeout(() => {
    router.push('/reset-password')
  }, 2000)
}
</script>
