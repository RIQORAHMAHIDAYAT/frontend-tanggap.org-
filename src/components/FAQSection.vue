<template>
  <section class="bg-white py-24 min-h-screen flex flex-col justify-center">
    <div class="max-w-7xl mx-auto px-6 w-full">
      <div class="flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        <!-- Left: Title -->
        <div class="w-full lg:w-1/3">
          <p class="text-gray-500 font-medium tracking-widest uppercase mb-4">FAQ</p>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C368D] leading-tight">
            Pertanyaan Umum dan Jawaban yang akan membantu Anda
          </h2>
        </div>

        <!-- Right: Accordions -->
        <div class="w-full lg:w-2/3 space-y-4">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="border border-gray-200 rounded-xl overflow-hidden bg-white transition-all duration-300"
            :class="{ 'border-blue-300 ring-2 ring-blue-50': activeIndex === index }"
          >
            <!-- Accordion Header -->
            <div 
              @click="toggleFaq(index)" 
              class="py-4 px-6 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <h3 class="font-semibold text-[#0F172A] text-base pr-4">{{ faq.q }}</h3>
              <svg 
                class="w-5 h-5 text-[#1C368D] transform transition-transform duration-300 flex-shrink-0" 
                :class="{ 'rotate-180': activeIndex === index }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
            
            <!-- Accordion Body -->
            <div 
              v-show="activeIndex === index" 
              class="px-6 pb-6 text-gray-600 leading-relaxed text-base"
            >
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref<number | null>(null)

const toggleFaq = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

const faqs = [
  {
    q: "Apa itu tanggap.org dan bagaimana hubungannya dengan AMIGO Board Game?",
    a: "tanggap.org adalah ekosistem platform digital yang mendukung penerapan printed board game AMIGO. Platform ini menyediakan alat ukur (skill assessment) awal dan akhir untuk siswa, modul gamifikasi pendukung, serta materi terapan (Tanggap Action Toolkit) yang dapat diunduh untuk kebutuhan bimbingan konseling dan mediasi mandiri."
  },
  {
    q: "Mengapa memilih metode blended learning (board game fisik + web digital) untuk resolusi konflik?",
    a: "Remaja usia 16+ membutuhkan interaksi tatap muka yang realistis untuk melatih empati dan de-eskalasi emosi (via AMIGO Board Game). Sementara itu, platform digital tanggap.org berfungsi untuk mengukur perkembangan soft-skill mereka secara objektif, privat, dan terukur tanpa membuat siswa merasa digurui."
  },
  {
    q: "Bagaimana cara mengintegrasikan AMIGO dan tanggap.org ke dalam kurikulum atau kegiatan sekolah?",
    a: "Metode ini sangat fleksibel. AMIGO dapat dimainkan dalam sesi Layanan Bimbingan Konseling (BK), jam Pembinaan Karakter/P5, kegiatan ekstrakurikuler (seperti OSIS/Pramuka), maupun workshop komunitas. Fasilitator dapat memulai dengan permainan AMIGO selama 30-45 menit, lalu mengarahkan siswa mengakses tanggap.org via ponsel untuk mengisi asesmen dan mengunduh toolkit."
  },
  {
    q: "Apakah Guru BK atau Pendidik mendapatkan panduan untuk memfasilitasi sesi ini?",
    a: "Ya. Setiap pengadaan paket AMIGO dilengkapi dengan Panduan Fasilitator cetak dan digital. Panduan ini berisi petunjuk alur fasilitasi jam pelajaran, matriks pembahasan studi kasus, serta cara membaca dan memanfaatkan hasil evaluasi skill assessment siswa dari platform digital."
  },
  {
    q: "Bagaimana cara sekolah atau komunitas kami mendapatkan paket AMIGO dan akses platform?",
    a: "Anda dapat mengajukan permohonan kemitraan atau pemesanan demo kit melalui formulir pendaftaran yang tersedia di landing page ini. Tim kami akan menghubungi Anda untuk memberikan proposal pengadaan, sampel toolkit gratis, dan opsi sesi sosialisasi bagi para staf pendidik di sekolah Anda."
  }
]
</script>
