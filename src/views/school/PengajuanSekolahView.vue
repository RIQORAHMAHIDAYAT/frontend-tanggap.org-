<template>
  <div class="min-h-screen bg-[#FAF9FF] font-sans text-slate-800 antialiased py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 selection:bg-blue-100 selection:text-blue-900">
    <div class="max-w-3xl mx-auto">
      
      <!-- Top Navigation: Kembali -->
      <div class="mb-6 sm:mb-8">
        <button
          @click="goBack"
          type="button"
          class="inline-flex items-center gap-2 text-slate-700 hover:text-[#1C368D] font-medium text-base sm:text-lg transition-colors cursor-pointer group focus:outline-none"
        >
          <span class="transform transition-transform group-hover:-translate-x-1 duration-200">←</span>
          <span>Kembali</span>
        </button>
      </div>

      <!-- Page Heading -->
      <div class="mb-8 sm:mb-10">
        <h1 class="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#1C368D] tracking-tight leading-tight mb-3">
          Pengajuan Sekolah
        </h1>
        <p class="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
          Lengkapi isi formulir mengenai informasi sekolah dan kontak penanggung jawab untuk mengajukan proposal dan demo kit Tanggap.org.
        </p>
      </div>

      <!-- Main Form Card -->
      <div class="bg-white rounded-3xl sm:rounded-[32px] p-6 sm:p-10 md:p-12 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8">
        <form @submit.prevent="handleSubmit" id="schoolForm" ref="schoolFormRef" novalidate>

          <!-- Top Alert Banner for Validation Error -->
          <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform -translate-y-2 opacity-0"
            enter-to-class="transform translate-y-0 opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="transform translate-y-0 opacity-100"
            leave-to-class="transform -translate-y-2 opacity-0"
          >
            <div
              v-if="errorMessage"
              class="mb-8 p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium flex items-center justify-between shadow-xs"
            >
              <div class="flex-1 pr-3">
                <span>{{ errorMessage }}</span>
              </div>
              <button
                @click="errorMessage = ''"
                type="button"
                class="text-red-400 hover:text-red-700 font-bold p-1 leading-none transition-colors cursor-pointer"
                aria-label="Tutup pesan error"
              >
                ✕
              </button>
            </div>
          </transition>

          <!-- SECTION 1: Informasi Sekolah -->
          <section>
            <h2 class="text-lg sm:text-xl font-bold text-slate-900 mb-1">
              Informasi Sekolah
            </h2>
            <p class="text-slate-500 text-xs sm:text-sm mb-6">
              Ceritakan informasi dasar sekolah Anda.
            </p>

            <div class="space-y-6">
              <!-- Field: Nama Sekolah -->
              <div :class="{ 'animate-shake': isShaking && errors.schoolName }">
                <label for="schoolName" class="block text-sm font-semibold text-slate-800 mb-2">
                  Nama Sekolah <span class="text-red-500">*</span>
                </label>
                <input
                  id="schoolName"
                  ref="schoolNameInput"
                  v-model="form.schoolName"
                  @input="clearFieldError('schoolName')"
                  type="text"
                  placeholder="Masukkan nama lengkap sekolah"
                  class="w-full px-4 py-3 sm:py-3.5 bg-white border rounded-xl text-slate-800 placeholder-slate-400 text-sm sm:text-base transition-all duration-200 focus:outline-none"
                  :class="[
                    errors.schoolName
                      ? 'border-red-500 bg-red-50/20 ring-2 ring-red-200 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D]'
                  ]"
                />
                <p v-if="errors.schoolName" class="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  <span>{{ errors.schoolName }}</span>
                </p>
              </div>

              <!-- Field: Akreditasi -->
              <div :class="{ 'animate-shake': isShaking && errors.accreditation }">
                <label for="accreditation" class="block text-sm font-semibold text-slate-800 mb-2">
                  Akreditasi <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <select
                    id="accreditation"
                    ref="accreditationInput"
                    v-model="form.accreditation"
                    @change="clearFieldError('accreditation')"
                    class="w-full px-4 py-3 sm:py-3.5 bg-white border rounded-xl text-sm sm:text-base appearance-none transition-all duration-200 pr-10 cursor-pointer focus:outline-none"
                    :class="[
                      !form.accreditation ? 'text-slate-400' : 'text-slate-800',
                      errors.accreditation
                        ? 'border-red-500 bg-red-50/20 ring-2 ring-red-200 focus:border-red-500 focus:ring-red-200'
                        : 'border-slate-200 focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D]'
                    ]"
                  >
                    <option value="" disabled selected>Pilih akreditasi sekolah</option>
                    <option value="Unggul" class="text-slate-800">Unggul</option>
                    <option value="Akreditasi A" class="text-slate-800">Akreditasi A</option>
                    <option value="Akreditasi B" class="text-slate-800">Akreditasi B</option>
                    <option value="Akreditasi C" class="text-slate-800">Akreditasi C</option>
                    <option value="Belum Terakreditasi" class="text-slate-800">Belum Terakreditasi</option>
                  </select>
                  <!-- Custom Chevron Down -->
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4" :class="errors.accreditation ? 'text-red-500' : 'text-slate-400'">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <p v-if="errors.accreditation" class="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  <span>{{ errors.accreditation }}</span>
                </p>
              </div>

              <!-- Field: Alamat Sekolah -->
              <div :class="{ 'animate-shake': isShaking && errors.schoolAddress }">
                <label for="schoolAddress" class="block text-sm font-semibold text-slate-800 mb-2">
                  Alamat Sekolah <span class="text-red-500">*</span>
                </label>
                <input
                  id="schoolAddress"
                  ref="schoolAddressInput"
                  v-model="form.schoolAddress"
                  @input="clearFieldError('schoolAddress')"
                  type="text"
                  placeholder="Masukkan alamat lengkap sekolah"
                  class="w-full px-4 py-3 sm:py-3.5 bg-white border rounded-xl text-slate-800 placeholder-slate-400 text-sm sm:text-base transition-all duration-200 focus:outline-none"
                  :class="[
                    errors.schoolAddress
                      ? 'border-red-500 bg-red-50/20 ring-2 ring-red-200 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D]'
                  ]"
                />
                <p v-if="errors.schoolAddress" class="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  <span>{{ errors.schoolAddress }}</span>
                </p>
              </div>
            </div>
          </section>

          <!-- Divider Line -->
          <hr class="border-t border-slate-200 my-8 sm:my-10" />

          <!-- SECTION 2: Informasi Penanggung Jawab -->
          <section>
            <h2 class="text-lg sm:text-xl font-bold text-slate-900 mb-1">
              Informasi Penanggung Jawab
            </h2>
            <p class="text-slate-500 text-xs sm:text-sm mb-6">
              Masukkan kontak orang yang dapat dihubungi terkait pengajuan ini.
            </p>

            <div class="space-y-6">
              <!-- Field: Nama PIC -->
              <div :class="{ 'animate-shake': isShaking && errors.picName }">
                <label for="picName" class="block text-sm font-semibold text-slate-800 mb-2">
                  Nama PIC <span class="text-red-500">*</span>
                </label>
                <input
                  id="picName"
                  ref="picNameInput"
                  v-model="form.picName"
                  @input="clearFieldError('picName')"
                  type="text"
                  placeholder="Masukkan nama lengkap penanggung jawab"
                  class="w-full px-4 py-3 sm:py-3.5 bg-white border rounded-xl text-slate-800 placeholder-slate-400 text-sm sm:text-base transition-all duration-200 focus:outline-none"
                  :class="[
                    errors.picName
                      ? 'border-red-500 bg-red-50/20 ring-2 ring-red-200 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D]'
                  ]"
                />
                <p v-if="errors.picName" class="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  <span>{{ errors.picName }}</span>
                </p>
              </div>

              <!-- Field: Jabatan PIC -->
              <div :class="{ 'animate-shake': isShaking && errors.picPosition }">
                <label for="picPosition" class="block text-sm font-semibold text-slate-800 mb-2">
                  Jabatan PIC <span class="text-red-500">*</span>
                </label>
                <input
                  id="picPosition"
                  ref="picPositionInput"
                  v-model="form.picPosition"
                  @input="clearFieldError('picPosition')"
                  type="text"
                  placeholder="Contoh: Guru BK, Kepala Sekolah"
                  class="w-full px-4 py-3 sm:py-3.5 bg-white border rounded-xl text-slate-800 placeholder-slate-400 text-sm sm:text-base transition-all duration-200 focus:outline-none"
                  :class="[
                    errors.picPosition
                      ? 'border-red-500 bg-red-50/20 ring-2 ring-red-200 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D]'
                  ]"
                />
                <p v-if="errors.picPosition" class="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  <span>{{ errors.picPosition }}</span>
                </p>
              </div>

              <!-- Field: Email PIC -->
              <div :class="{ 'animate-shake': isShaking && errors.picEmail }">
                <label for="picEmail" class="block text-sm font-semibold text-slate-800 mb-2">
                  Email PIC <span class="text-red-500">*</span>
                </label>
                <input
                  id="picEmail"
                  ref="picEmailInput"
                  v-model="form.picEmail"
                  @input="clearFieldError('picEmail')"
                  type="email"
                  placeholder="Contoh: pic@sekolah.sch.id"
                  class="w-full px-4 py-3 sm:py-3.5 bg-white border rounded-xl text-slate-800 placeholder-slate-400 text-sm sm:text-base transition-all duration-200 focus:outline-none"
                  :class="[
                    errors.picEmail
                      ? 'border-red-500 bg-red-50/20 ring-2 ring-red-200 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D]'
                  ]"
                />
                <p v-if="errors.picEmail" class="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  <span>{{ errors.picEmail }}</span>
                </p>
              </div>

              <!-- Field: Nomor WhatsApp PIC -->
              <div :class="{ 'animate-shake': isShaking && errors.picWhatsapp }">
                <label for="picWhatsapp" class="block text-sm font-semibold text-slate-800 mb-2">
                  Nomor WhatsApp PIC <span class="text-red-500">*</span>
                </label>
                <input
                  id="picWhatsapp"
                  ref="picWhatsappInput"
                  v-model="form.picWhatsapp"
                  @input="clearFieldError('picWhatsapp')"
                  type="tel"
                  placeholder="Contoh: 08xxxxxxxxxx"
                  class="w-full px-4 py-3 sm:py-3.5 bg-white border rounded-xl text-slate-800 placeholder-slate-400 text-sm sm:text-base transition-all duration-200 focus:outline-none"
                  :class="[
                    errors.picWhatsapp
                      ? 'border-red-500 bg-red-50/20 ring-2 ring-red-200 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D]'
                  ]"
                />
                <p v-if="errors.picWhatsapp" class="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  <span>{{ errors.picWhatsapp }}</span>
                </p>
              </div>

              <!-- Field: Tanggal Pendaftaran -->
              <div :class="{ 'animate-shake': isShaking && errors.registrationDate }">
                <label for="registrationDate" class="block text-sm font-semibold text-slate-800 mb-2">
                  Tanggal Pendaftaran <span class="text-red-500">*</span>
                </label>
                <div class="relative max-w-xs">
                  <input
                    id="registrationDate"
                    ref="registrationDateInput"
                    v-model="form.registrationDate"
                    @change="clearFieldError('registrationDate')"
                    @input="clearFieldError('registrationDate')"
                    type="date"
                    class="w-full px-4 py-3 sm:py-3.5 bg-white border rounded-xl text-slate-800 text-sm sm:text-base transition-all duration-200 cursor-pointer focus:outline-none"
                    :class="[
                      errors.registrationDate
                        ? 'border-red-500 bg-red-50/20 ring-2 ring-red-200 focus:border-red-500 focus:ring-red-200'
                        : 'border-slate-200 focus:border-[#1C368D] focus:ring-1 focus:ring-[#1C368D]'
                    ]"
                  />
                </div>
                <p v-if="errors.registrationDate" class="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  <span>{{ errors.registrationDate }}</span>
                </p>
              </div>
            </div>
          </section>

        </form>
      </div>

      <!-- Bottom Action Controls (Outside Card as designed) -->
      <div class="flex items-center justify-between gap-4">
        <!-- Kosongkan formulir -->
        <button
          @click="handleReset"
          type="button"
          class="text-[#1C368D] hover:text-[#15296b] hover:underline font-semibold text-base sm:text-lg transition-colors cursor-pointer focus:outline-none py-2"
        >
          Kosongkan formulir
        </button>

        <!-- Kirim Button -->
        <button
          form="schoolForm"
          type="submit"
          :disabled="isSubmitting"
          class="bg-[#1C368D] hover:bg-[#15296b] text-white font-semibold py-3 px-8 sm:px-12 rounded-xl text-base shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 disabled:opacity-70 transition-all duration-200 cursor-pointer flex items-center justify-center min-w-[120px]"
        >
          <span v-if="isSubmitting" class="flex items-center gap-2">
            <svg class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <span>Mengirim...</span>
          </span>
          <span v-else>Kirim</span>
        </button>
      </div>

    </div>

    <!-- Success Modal (When Valid) -->
    <Transition name="fade">
      <div
        v-if="isSuccessModalOpen"
        @click="closeSuccessModal"
        class="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
      >
        <div
          class="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full flex flex-col items-center text-center shadow-2xl transform transition-all border border-slate-100"
          @click.stop
        >
          <!-- Green Circle Checkmark -->
          <div class="mb-5">
            <svg width="76" height="76" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="36" cy="36" r="33" fill="#F0FDF4" stroke="#22C55E" stroke-width="5" />
              <path d="M22 36 L32 46 L50 26" stroke="#22C55E" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

          <h3 class="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
            Pengajuan Berhasil Dikirim
          </h3>

          <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            Terima kasih! Pengajuan untuk <strong>{{ submittedSchoolName }}</strong> telah kami terima. Tim Tanggap.org akan segera menghubungi kontak PIC untuk pengiriman proposal dan demo kit gratis.
          </p>

          <button
            @click="closeSuccessModal"
            type="button"
            class="w-full bg-[#1C368D] hover:bg-[#15296b] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer text-base"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Element refs for form container & invalid fields
const schoolFormRef = ref<HTMLFormElement | null>(null)
const schoolNameInput = ref<HTMLInputElement | null>(null)
const accreditationInput = ref<HTMLSelectElement | null>(null)
const schoolAddressInput = ref<HTMLInputElement | null>(null)
const picNameInput = ref<HTMLInputElement | null>(null)
const picPositionInput = ref<HTMLInputElement | null>(null)
const picEmailInput = ref<HTMLInputElement | null>(null)
const picWhatsappInput = ref<HTMLInputElement | null>(null)
const registrationDateInput = ref<HTMLInputElement | null>(null)

// Format default current date as YYYY-MM-DD for native date input
const getTodayDateString = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const form = ref({
  schoolName: '',
  accreditation: '',
  schoolAddress: '',
  picName: '',
  picPosition: '',
  picEmail: '',
  picWhatsapp: '',
  registrationDate: getTodayDateString()
})

// Validation error messages for each field (empty string means valid)
const errors = ref({
  schoolName: '',
  accreditation: '',
  schoolAddress: '',
  picName: '',
  picPosition: '',
  picEmail: '',
  picWhatsapp: '',
  registrationDate: ''
})

const isShaking = ref(false)
const errorMessage = ref('')
const isSubmitting = ref(false)
const isSuccessModalOpen = ref(false)
const submittedSchoolName = ref('')

// Manage dynamic browser title for SEO and polish
let previousTitle = ''
onMounted(() => {
  previousTitle = document.title
  document.title = 'Pengajuan Sekolah & Demo Kit Gratis - Tanggap.org'
})

onUnmounted(() => {
  if (previousTitle) {
    document.title = previousTitle
  }
})

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

// Clear individual error status when user interacts with that field
const clearFieldError = (fieldName: keyof typeof errors.value) => {
  if (errors.value[fieldName]) {
    errors.value[fieldName] = ''
  }
  // If all errors are cleared, remove the top error banner too
  const remainingErrors = Object.values(errors.value).some((msg) => Boolean(msg))
  if (!remainingErrors) {
    errorMessage.value = ''
  }
}

const handleReset = () => {
  form.value = {
    schoolName: '',
    accreditation: '',
    schoolAddress: '',
    picName: '',
    picPosition: '',
    picEmail: '',
    picWhatsapp: '',
    registrationDate: ''
  }
  // Clear all error indicators and banner
  Object.keys(errors.value).forEach((key) => {
    errors.value[key as keyof typeof errors.value] = ''
  })
  isShaking.value = false
  errorMessage.value = ''
}

const handleSubmit = () => {
  let hasErrors = false
  let firstKey: string | null = null

  // 1. Validasi Nama Sekolah
  if (!form.value.schoolName.trim()) {
    errors.value.schoolName = '* Kolom ini wajib diisi'
    hasErrors = true
    if (!firstKey) firstKey = 'schoolName'
  } else {
    errors.value.schoolName = ''
  }

  // 2. Validasi Akreditasi
  if (!form.value.accreditation) {
    errors.value.accreditation = '* Kolom ini wajib diisi'
    hasErrors = true
    if (!firstKey) firstKey = 'accreditation'
  } else {
    errors.value.accreditation = ''
  }

  // 3. Validasi Alamat Sekolah
  if (!form.value.schoolAddress.trim()) {
    errors.value.schoolAddress = '* Kolom ini wajib diisi'
    hasErrors = true
    if (!firstKey) firstKey = 'schoolAddress'
  } else {
    errors.value.schoolAddress = ''
  }

  // 4. Validasi Nama PIC
  if (!form.value.picName.trim()) {
    errors.value.picName = '* Kolom ini wajib diisi'
    hasErrors = true
    if (!firstKey) firstKey = 'picName'
  } else {
    errors.value.picName = ''
  }

  // 5. Validasi Jabatan PIC
  if (!form.value.picPosition.trim()) {
    errors.value.picPosition = '* Kolom ini wajib diisi'
    hasErrors = true
    if (!firstKey) firstKey = 'picPosition'
  } else {
    errors.value.picPosition = ''
  }

  // 6. Validasi Email PIC (Required + format email)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.picEmail.trim()) {
    errors.value.picEmail = '* Kolom ini wajib diisi'
    hasErrors = true
    if (!firstKey) firstKey = 'picEmail'
  } else if (!emailRegex.test(form.value.picEmail.trim())) {
    errors.value.picEmail = '* Format email tidak valid (contoh: pic@sekolah.sch.id)'
    hasErrors = true
    if (!firstKey) firstKey = 'picEmail'
  } else {
    errors.value.picEmail = ''
  }

  // 7. Validasi Nomor WhatsApp PIC (Required + minimal 9 digit nomor)
  const phoneRegex = /^[0-9+-\s]{9,16}$/
  if (!form.value.picWhatsapp.trim()) {
    errors.value.picWhatsapp = '* Kolom ini wajib diisi'
    hasErrors = true
    if (!firstKey) firstKey = 'picWhatsapp'
  } else if (!phoneRegex.test(form.value.picWhatsapp.trim())) {
    errors.value.picWhatsapp = '* Format nomor tidak valid (minimal 9 digit angka)'
    hasErrors = true
    if (!firstKey) firstKey = 'picWhatsapp'
  } else {
    errors.value.picWhatsapp = ''
  }

  // 8. Validasi Tanggal Pendaftaran
  if (!form.value.registrationDate) {
    errors.value.registrationDate = '* Kolom ini wajib diisi'
    hasErrors = true
    if (!firstKey) firstKey = 'registrationDate'
  } else {
    errors.value.registrationDate = ''
  }

  if (hasErrors) {
    errorMessage.value = 'Harap periksa kembali. Mohon lengkapi semua kolom bertanda bintang (*) yang ditandai warna merah.'

    // Trigger Google Form style shake animation
    isShaking.value = false
    nextTick(() => {
      isShaking.value = true
      setTimeout(() => {
        isShaking.value = false
      }, 500)

      // Smooth scroll to top of form card or first invalid input
      const fieldMap: Record<string, HTMLElement | null> = {
        schoolName: schoolNameInput.value,
        accreditation: accreditationInput.value,
        schoolAddress: schoolAddressInput.value,
        picName: picNameInput.value,
        picPosition: picPositionInput.value,
        picEmail: picEmailInput.value,
        picWhatsapp: picWhatsappInput.value,
        registrationDate: registrationDateInput.value
      }

      if (firstKey && fieldMap[firstKey]) {
        fieldMap[firstKey]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        fieldMap[firstKey]?.focus()
      } else {
        schoolFormRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })

    return
  }

  // If valid, submit form
  errorMessage.value = ''
  isSubmitting.value = true
  submittedSchoolName.value = form.value.schoolName

  // Simulate submission and store to localStorage
  setTimeout(() => {
    try {
      const existingSubmissions = JSON.parse(localStorage.getItem('tanggap_school_submissions') || '[]')
      existingSubmissions.push({
        ...form.value,
        submittedAt: new Date().toISOString()
      })
      localStorage.setItem('tanggap_school_submissions', JSON.stringify(existingSubmissions))
    } catch (e) {
      console.warn('LocalStorage save failed', e)
    }

    isSubmitting.value = false
    isSuccessModalOpen.value = true
  }, 600)
}

const closeSuccessModal = () => {
  isSuccessModalOpen.value = false
  router.push('/')
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

/* Google Form Style Shake Animation */
@keyframes inputShake {
  0%, 100% {
    transform: translateX(0);
  }
  20%, 60% {
    transform: translateX(-6px);
  }
  40%, 80% {
    transform: translateX(6px);
  }
}

.animate-shake {
  animation: inputShake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
</style>
