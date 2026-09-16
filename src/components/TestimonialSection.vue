<template>
  <section class="bg-white py-24 overflow-hidden min-h-screen flex flex-col justify-center">
    <div class="max-w-7xl mx-auto px-6 w-full">
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C368D] mb-12 md:mb-16 max-w-5xl mx-auto">
        Lihat Apa yang Mereka Katakan <br class="hidden md:block" /> Tentang Kami
      </h2>
    </div>

    <!-- Kontainer Carousel Full Lebar -->
    <div class="w-full relative flex overflow-hidden group py-4">
      
      <!-- List 1 -->
      <div class="flex animate-marquee group-hover:[animation-play-state:paused] gap-6 md:gap-8 pr-6 md:pr-8 min-w-max">
        <TestimonialCard 
          v-for="(item, index) in testimonials" 
          :key="'a-' + index" 
          :item="item" 
        />
      </div>
      
      <!-- List 2 (Kloningan penyambung tanpa batas) -->
      <div class="flex animate-marquee group-hover:[animation-play-state:paused] gap-6 md:gap-8 pr-6 md:pr-8 min-w-max" aria-hidden="true">
        <TestimonialCard 
          v-for="(item, index) in testimonials" 
          :key="'b-' + index" 
          :item="item" 
        />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import TestimonialCard from './TestimonialCard.vue'
import iconEndang from '../assets/icon_endang.png'
import iconFauzy from '../assets/icon_fauzy.png'
import iconRizky from '../assets/icon_rizky.png'
import iconSari from '../assets/icon_sari.png'
import iconBudi from '../assets/icon_budi.png'

const testimonials = [
  {
    name: 'Dra. Endang Rahayu, M.Pd.',
    role: 'Guru BK & Koordinator Konseling SMA Negeri',
    quote: 'Membahas topik sensitif seperti bullying dan konflik pertemanan biasanya membuat siswa defensif. Namun, lewat media cetak AMIGO dan kuis tes di tanggap.org, anak-anak justru aktif berdiskusi tanpa merasa digurui. Fitur pengukuran skill-nya sangat membantu kami memetakan grafik perkembangan karakter siswa secara objektif.',
    image: iconEndang
  },
  {
    name: 'Drs. H. Ahmad Fauzi, M.Si.',
    role: 'Kepala Sekolah SMA Swasta',
    quote: 'Integrasi blended learning antara board game AMIGO dan toolkit digital di tanggap.org menjadi jawaban nyata atas kebutuhan program edukasi karakter di sekolah kami. Terjadi penurunan insiden konflik antar-siswa secara signifikan karena mereka memiliki bahasa bersama untuk de-eskalasi masalah.',
    image: iconFauzy
  },
  {
    name: 'Rizky Pratama',
    role: 'Ketua OSIS & Siswa Kelas XII',
    quote: 'Gak nyangka belajar resolusi konflik bisa se-seru ini. Gamifikasi di tanggap.org bikin kuisnya nggak ngebosenin, dan toolkit PDF-nya beneran kepakai pas aku harus nyeselesain salah paham sama temen satu tim di OSIS.',
    image: iconRizky
  },
  {
    name: 'Ibu Sari Wahyuni',
    role: 'Wali Murid Siswa Kelas XI',
    quote: 'Dulu anak saya sering memendam emosi dan gampang meledak kalau ada masalah pertemanan. Sejak sekolahnya menerapkan metode AMIGO, saya perhatikan dia jadi lebih asertif dan bisa mengomunikasikan perasaannya dengan tenang di rumah. Solusi yang luar biasa!',
    image: iconSari
  },
  {
    name: 'Budi Santoso, S.Pd.',
    role: 'Guru Wali Kelas & Fasilitator P5',
    quote: 'Sebagai guru muda, kadang susah cari materi pembinaan karakter yang tidak membosankan buat anak Gen Z. Tapi dengan AMIGO dan studi kasus di tanggap.org, jam pelajaran P5 jadi sangat hidup. Anak-anak ketagihan bermain sambil belajar berempati!',
    image: iconBudi
  }
]
</script>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}

.animate-marquee {
  animation: marquee 45s linear infinite;
}
</style>
