export interface AssessmentQuestion {
  id: number
  text: string
  phase: number
  dimension: 'koleris' | 'melankolis' | 'plegmatis' | 'sanguinis'
}

export interface TemperamentScore {
  koleris: number
  melankolis: number
  plegmatis: number
  sanguinis: number
}

export interface TraitCardInfo {
  type: 'koleris' | 'melankolis' | 'plegmatis' | 'sanguinis'
  title: string
  tagline: string
  description: string
  bgBadgeColor: string
  iconColor: string
  iconType: 'flame' | 'sun' | 'leaf' | 'scale'
}

export interface AssessmentResultData {
  scores: TemperamentScore
  dominantTraits: TraitCardInfo[]
  summaryTitle: string
  summaryParagraphs: string[]
}

export const assessmentQuestions: AssessmentQuestion[] = [
  // FASE 1: Soal 1 - 10
  {
    id: 1,
    text: "Saya memposisikan diri di kelas sebagai pembimbing yang mendampingi siswa.",
    phase: 1,
    dimension: "plegmatis"
  },
  {
    id: 2,
    text: "Saya lebih banyak mengambil peran untuk menghidupkan interaksi komunikasi di kelas.",
    phase: 1,
    dimension: "sanguinis"
  },
  {
    id: 3,
    text: "Saya memilih bersikap pasif tanpa terlalu banyak mencampuri aktivitas siswa.",
    phase: 1,
    dimension: "plegmatis"
  },
  {
    id: 4,
    text: "Saya fokus menguji kemampuan berpikir serta penalaran logika siswa.",
    phase: 1,
    dimension: "koleris"
  },
  {
    id: 5,
    text: "Saya mengutamakan pemberian bimbingan harian secara rutin kepada siswa.",
    phase: 1,
    dimension: "melankolis"
  },
  {
    id: 6,
    text: "Saya merasa sukses mengajar saat nilai akademik dan perkembangan emosi siswa seimbang.",
    phase: 1,
    dimension: "plegmatis"
  },
  {
    id: 7,
    text: "Saya mengukur keberhasilan mengajar dari perubahan perilaku sosial siswa ke arah positif.",
    phase: 1,
    dimension: "sanguinis"
  },
  {
    id: 8,
    text: "Saya menilai pengajaran sudah berhasil jika siswa menguasai materi nilai dasar.",
    phase: 1,
    dimension: "melankolis"
  },
  {
    id: 9,
    text: "Saya menargetkan pencapaian nilai akademik yang tinggi sebagai bukti sukses mengajar.",
    phase: 1,
    dimension: "koleris"
  },
  {
    id: 10,
    text: "Saya melihat kesuksesan dari ketepatan siswa menyelesaikan tugas pengumpulan nilai formal.",
    phase: 1,
    dimension: "koleris"
  },

  // FASE 2: Soal 11 - 20
  {
    id: 11,
    text: "Saya mengarahkan target belajar pada hasil praktik atau keterampilan fisik siswa.",
    phase: 2,
    dimension: "koleris"
  },
  {
    id: 12,
    text: "Saya merancang kegiatan belajar dengan target utama membangkitkan semangat siswa.",
    phase: 2,
    dimension: "sanguinis"
  },
  {
    id: 13,
    text: "Saya membatasi target belajar pada pemenuhan kebutuhan psikologis paling mendasar.",
    phase: 2,
    dimension: "plegmatis"
  },
  {
    id: 14,
    text: "Saya mengincar penguasaan teknologi digital visual yang menarik sebagai target kelas.",
    phase: 2,
    dimension: "sanguinis"
  },
  {
    id: 15,
    text: "Saya menjadikan penghematan biaya penggunaan aplikasi sebagai pertimbangan target utama.",
    phase: 2,
    dimension: "melankolis"
  },
  {
    id: 16,
    text: "Saya selalu menyesuaikan materi ajar dengan keadaan lingkungan sekitar siswa.",
    phase: 2,
    dimension: "plegmatis"
  },
  {
    id: 17,
    text: "Saya membahas materi secara mendalam demi memicu keaktifan siswa bergerak.",
    phase: 2,
    dimension: "koleris"
  },
  {
    id: 18,
    text: "Saya menyusun urutan materi mengajar secara sangat sederhana.",
    phase: 2,
    dimension: "plegmatis"
  },
  {
    id: 19,
    text: "Saya menyiapkan materi berbobot yang disesuaikan khusus bagi karakter anak.",
    phase: 2,
    dimension: "melankolis"
  },
  {
    id: 20,
    text: "Saya menyeragamkan semua materi pelajaran agar persis dengan aturan kurikulum lembaga.",
    phase: 2,
    dimension: "melankolis"
  },

  // FASE 3: Soal 21 - 30
  {
    id: 21,
    text: "Saya memanfaatkan media atau alat peraga pada awal pelajaran demi menyentuh perasaan siswa.",
    phase: 3,
    dimension: "sanguinis"
  },
  {
    id: 22,
    text: "Saya menggunakan media belajar secara padat pada menit-menit awal kelas dimulai.",
    phase: 3,
    dimension: "koleris"
  },
  {
    id: 23,
    text: "Saya hanya sesekali saja memakai aplikasi pembelajaran digital saat mengajar di kelas.",
    phase: 3,
    dimension: "plegmatis"
  },
  {
    id: 24,
    text: "Saya mengajar lewat urutan yang sangat rapi mulai pembukaan hingga ujian berbasis komputer.",
    phase: 3,
    dimension: "melankolis"
  },
  {
    id: 25,
    text: "Saya melaksanakan kegiatan belajar mengajar sesuai persiapan RPP yang matang.",
    phase: 3,
    dimension: "melankolis"
  },
  {
    id: 26,
    text: "Saya menyeimbangkan penggunaan antara buku teks dengan media digital interaktif.",
    phase: 3,
    dimension: "sanguinis"
  },
  {
    id: 27,
    text: "Saya lebih senang mengajar memakai alat peraga fisik yang bisa disentuh siswa.",
    phase: 3,
    dimension: "koleris"
  },
  {
    id: 28,
    text: "Saya sangat bergantung pada buku paket atau modul cetak saat mengajar.",
    phase: 3,
    dimension: "melankolis"
  },
  {
    id: 29,
    text: "Saya mengutamakan tayangan multimedia video hingga permainan (game) sebagai media utama.",
    phase: 3,
    dimension: "sanguinis"
  },
  {
    id: 30,
    text: "Saya mengandalkan media sosial atau buku wajib sekolah sebagai sumber referensi.",
    phase: 3,
    dimension: "sanguinis"
  },

  // FASE 4: Soal 31 - 35 (dan 36 - 40)
  {
    id: 31,
    text: "Saya mencari informasi umum dari rekan sesama guru untuk menyiapkan kelengkapan kelas.",
    phase: 4,
    dimension: "sanguinis"
  },
  {
    id: 32,
    text: "Saya mencari ide fasilitas ruang kelas dari komunitas guru di jejaring internet.",
    phase: 4,
    dimension: "sanguinis"
  },
  {
    id: 33,
    text: "Saya memaksimalkan sarana kelas apa adanya tanpa mengharapkan bantuan pihak luar.",
    phase: 4,
    dimension: "plegmatis"
  },
  {
    id: 34,
    text: "Saya mengandalkan data internal sekolah serta website mandiri sebagai tumpuan fasilitas.",
    phase: 4,
    dimension: "melankolis"
  },
  {
    id: 35,
    text: "Saya sangat bergantung pada penyediaan fasilitas resmi dari sekolah/Dinas Pendidikan.",
    phase: 4,
    dimension: "koleris"
  }
]

export const phaseTitles: Record<number, string> = {
  1: "Peran Mengajar (Instructional Role)",
  2: "Target Belajar & Materi Ajar",
  3: "Pemanfaatan Media Pembelajaran",
  4: "Pengelolaan Sarana & Fasilitas Kelas"
}

export const traitDefinitions: Record<string, TraitCardInfo> = {
  koleris: {
    type: "koleris",
    title: "Koleris",
    tagline: "Tegas, berorientasi pada tujuan, dan suka mengambil inisiatif.",
    description: "Cenderung berani mengambil keputusan, percaya diri, menyukai tantangan, serta berusaha mencapai hasil yang diinginkan. Dalam situasi kelompok, biasanya terdorong untuk memimpin dan mengarahkan.",
    bgBadgeColor: "bg-red-50 text-red-500",
    iconColor: "text-red-500",
    iconType: "flame"
  },
  sanguinis: {
    type: "sanguinis",
    title: "Sanguinis",
    tagline: "Ekspresif, antusias, dan mudah berinteraksi.",
    description: "Cenderung ramah, komunikatif, optimistis, dan senang membangun hubungan dengan orang lain. Biasanya mudah menunjukkan perasaan dan membawa energi positif dalam lingkungan sosial.",
    bgBadgeColor: "bg-amber-50 text-amber-500",
    iconColor: "text-amber-500",
    iconType: "sun"
  },
  melankolis: {
    type: "melankolis",
    title: "Melankolis",
    tagline: "Teliti, analitis, dan terstruktur.",
    description: "Cenderung memperhatikan detail, mempertimbangkan keputusan dengan matang, menyukai keteraturan, dan berusaha menghasilkan sesuatu dengan baik.",
    bgBadgeColor: "bg-blue-50 text-blue-600",
    iconColor: "text-blue-600",
    iconType: "scale"
  },
  plegmatis: {
    type: "plegmatis",
    title: "Plegmatis",
    tagline: "Tenang, sabar, dan mengutamakan keharmonisan.",
    description: "Cenderung stabil dalam menghadapi situasi, suka membantu, mampu mendengarkan orang lain, dan berusaha menjaga hubungan tetap damai.",
    bgBadgeColor: "bg-emerald-50 text-emerald-600",
    iconColor: "text-emerald-600",
    iconType: "leaf"
  }
}

export function calculateAssessmentResult(answers: Record<number, number>): AssessmentResultData {
  const rawScores: Record<string, { total: number; count: number }> = {
    koleris: { total: 0, count: 0 },
    melankolis: { total: 0, count: 0 },
    plegmatis: { total: 0, count: 0 },
    sanguinis: { total: 0, count: 0 }
  }

  // Akumulasikan jawaban
  for (const q of assessmentQuestions) {
    const val = answers[q.id] || 4 // default netral jika belum terisi
    rawScores[q.dimension].total += val
    rawScores[q.dimension].count += 1
  }

  // Min-Max linear normalization to 20% - 100%
  const calcNormalized = (dim: 'koleris' | 'melankolis' | 'plegmatis' | 'sanguinis') => {
    const { total, count } = rawScores[dim]
    if (count === 0) return 60
    const mean = total / count
    return Math.round(((mean - 1) / 6) * 80 + 20)
  }

  const normalized: TemperamentScore = {
    koleris: calcNormalized('koleris'),
    melankolis: calcNormalized('melankolis'),
    plegmatis: calcNormalized('plegmatis'),
    sanguinis: calcNormalized('sanguinis')
  }

  // Urutkan dimensi tertinggi (Rank 1 & Rank 2)
  const sortedDimensions = Object.entries(normalized)
    .sort(([, a], [, b]) => b - a)
    .map(([key]) => key as 'koleris' | 'melankolis' | 'plegmatis' | 'sanguinis')

  const top1 = sortedDimensions[0]
  const top2 = sortedDimensions[1]

  const dominantTraits: TraitCardInfo[] = [
    traitDefinitions[top1],
    traitDefinitions[top2]
  ]

  const title1 = traitDefinitions[top1].title
  const title2 = traitDefinitions[top2].title

  const summaryTitle = `Dominan ${title1}-${title2}`

  const summaryParagraphs = [
    `Seseorang dengan kecenderungan ${title1} dan ${title2} umumnya memiliki karakter yang ${traitDefinitions[top1].tagline.toLowerCase()} dan ${traitDefinitions[top2].tagline.toLowerCase()}`,
    `Perpaduan ini menggambarkan seseorang yang mampu membawa energi positif dalam interaksi sosial sekaligus berorientasi pada tindakan dan hasil nyata. Meski demikian, kecenderungan tersebut tetap perlu diimbangi dengan kesediaan mendengarkan, kesabaran, dan pertimbangan terhadap sudut pandang orang lain.`
  ]

  return {
    scores: normalized,
    dominantTraits,
    summaryTitle,
    summaryParagraphs
  }
}
