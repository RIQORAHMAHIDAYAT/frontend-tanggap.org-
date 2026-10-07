<template>
  <AuthLayout :reverse="false">
    <div class="mb-10 text-center md:text-left">
      <h1 class="text-3xl md:text-4xl font-bold text-[#1C368D] mb-4">Selamat Datang Kembali</h1>
      <p class="text-gray-500 text-sm md:text-base">Silahkan masuk untuk melanjutkan perjalanan belajar anak.</p>
    </div>

    <form @submit.prevent="handleLogin" class="space-y-5">
      <div>
        <input 
          type="email" 
          placeholder="Email" 
          v-model="email"
          class="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D] transition-colors"
          required
        >
      </div>

      <div>
        <input 
          type="password" 
          placeholder="Password" 
          v-model="password"
          class="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D] transition-colors"
          required
        >
        <div class="mt-2 text-left">
          <router-link to="/forgot-password" class="text-gray-500 hover:text-[#1C368D] text-sm transition-colors">
            Lupa Password?
          </router-link>
        </div>
      </div>

      <button 
        type="submit" 
        class="w-full bg-[#20409A] text-white font-semibold py-3.5 rounded-xl shadow-lg hover:bg-[#1C368D] hover:shadow-xl transition-all active:scale-[0.98]"
      >
        Masuk
      </button>
    </form>

    <div class="text-center text-gray-400 my-6 text-sm">
      atau
    </div>

    <button 
      type="button"
      class="w-full flex items-center justify-center px-4 py-3.5 border border-gray-200 shadow-sm rounded-full hover:bg-gray-50 transition-colors"
    >
      <svg class="w-5 h-5 mr-3" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" fill="#FFC107"/>
        <path d="m6.3 12.9 7.1 5.3C15.2 15.1 19.3 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.5 2 9.9 6.4 6.3 12.9z" fill="#FF3D00"/>
        <path d="M24 46c5.4 0 10.2-2 14.1-5.4l-7-5.8c-2.1 1.4-4.5 2.2-7.1 2.2-4.9 0-9.1-3.1-10.8-7.4l-7.3 5.6C9.7 41.8 16.4 46 24 46z" fill="#4CAF50"/>
        <path d="M44.5 20H24v8.5h11.8c-.8 2.2-2.1 4-3.9 5.3l7 5.8c4.1-3.8 6.6-9.5 6.6-15.1 0-1.3-.2-2.7-.5-4z" fill="#1976D2"/>
      </svg>
      <span class="text-gray-600 font-medium">Continue With Google</span>
    </button>

    <div class="mt-8 text-center text-sm">
      <span class="text-gray-500">Belum punya akun? </span>
      <router-link to="/register" class="text-[#20409A] font-semibold hover:underline">
        Daftar Sekarang
      </router-link>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AuthLayout from '../../components/layouts/AuthLayout.vue'

const email = ref('')
const password = ref('')

const handleLogin = () => {
  console.log('Login attempt', email.value)
  // TODO: Implement login logic
}
</script>
