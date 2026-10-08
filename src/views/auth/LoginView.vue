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
        <div class="relative">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Password" 
            v-model="password"
            class="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D] transition-colors pr-12"
            required
          >
          <button 
            type="button" 
            @click="showPassword = !showPassword"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1C368D] transition-colors focus:outline-none"
          >
            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
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
const showPassword = ref(false)

const handleLogin = () => {
  console.log('Login attempt', email.value)
  // TODO: Implement login logic
}
</script>
