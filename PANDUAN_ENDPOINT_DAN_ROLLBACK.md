# Panduan Penggantian Endpoint & Rollback Mock Mode (FrontEnd Tanggap.org)

Dokumen ini merupakan panduan resmi dan catatan permanen untuk tim pengembang dan administrator Tanggap.org terkait pengelolaan URL API Backend, peralihan server (dari backend partner Vercel ke backend Hostinger), serta prosedur rollback instan ke mode mock.

---

## 1. Ringkasan Konfigurasi Saat Ini

| Parameter | Nilai Saat Ini | Keterangan |
| :--- | :--- | :--- |
| **Backend Aktif** | `https://backend-tanggap-org.vercel.app/api` | Server backend sementara dari pihak partner |
| **File Konfigurasi** | `.env.production` | Terbaca otomatis saat proses build produksi |
| **Status Mock Toggle** | `VITE_USE_MOCK=false` | Terhubung langsung ke API Backend live |
| **Graceful Fallback** | **Aktif** | Jika server backend down/timeout, frontend otomatis memakai data lokal tanpa merusak UI |
| **Target Backend Akhir** | Hostinger (misal: `https://api.tanggap.org/api` atau IP VPS) | Akan dipasang setelah migrasi selesai |

---

## 2. Cara Mengganti Endpoint ke Backend Asli (Hostinger) Nanti

Ketika backend resmi di Hostinger sudah selesai di-deploy dan siap digunakan, **TIDAK PERLU MERUBAH KODE VUE/FRONTEND SAMA SEKALI**.

Cukup ikuti 3 langkah mudah berikut:

### Langkah 1: Buka file `.env.production`
Buka file `FrontEnd_Tanggap.org/.env.production`.

### Langkah 2: Ganti URL API
Ubah nilai `VITE_API_BASE_URL` ke domain backend Hostinger Anda:
```env
# Ganti URL ini dengan URL backend Hostinger Anda:
VITE_API_BASE_URL=https://api.tanggap.org/api
VITE_USE_MOCK=false
```

### Langkah 3: Simpan, Commit, dan Push ke GitHub
Jalankan perintah berikut di terminal:
```bash
cd "FrontEnd_Tanggap.org"
git add .env.production
git commit -m "chore(config): switch API base URL to Hostinger production"
git push origin main
```
Setelah di-push ke branch `main`, GitHub Actions akan otomatis menjalankan build (`bun run build`) dan meng-upload file baru ke hosting Anda via FTP.

---

## 3. Cara Rollback Instan ke Full Mock Mode (Hanya 10 Detik)

Jika sewaktu-waktu backend partner atau server mengalami gangguan fatal dan Anda ingin mengembalikan website 100% ke tampilan demo mock awal:

### Langkah 1: Buka file `.env.production`
Ubah baris `VITE_USE_MOCK` menjadi `true`:
```env
VITE_API_BASE_URL=https://backend-tanggap-org.vercel.app/api
VITE_USE_MOCK=true
```

### Langkah 2: Commit dan Push
```bash
cd "FrontEnd_Tanggap.org"
git add .env.production
git commit -m "chore: rollback to 100% mock mode"
git push origin main
```

**Hasil Rollback:**
- Seluruh form (Login, Register, Pengajuan Sekolah, Join Kelas, Assessment) langsung beralih ke simulasi lokal 100%.
- Tidak ada panggilan network yang dilakukan ke API.
- Tampilan UI dan data demo tetap utuh persis seperti awal.

---

## 4. Arsitektur Layanan (Services Layer)

Seluruh logika komunikasi backend dipusatkan di folder `src/services/`:

```
src/services/
├── api.ts                # Client Fetch utama, Base URL, Auth Header, dan Timeout Protection
├── authService.ts        # Register, Login, Me, Logout (dengan fallback mode)
├── assessmentService.ts  # Submit jawaban assessment & ambil hasil
└── leadsService.ts       # Form pengajuan sekolah & kontak mitra
```

### Tabel Pemetaan Endpoint

| Fitur | Method | Endpoint Backend | Fungsi Service |
| :--- | :---: | :--- | :--- |
| **Registrasi User** | `POST` | `/api/auth/register` | `authService.register(payload)` |
| **Login User** | `POST` | `/api/auth/login` | `authService.login(payload)` |
| **Profil User** | `GET` | `/api/auth/me` | `authService.getProfile()` |
| **Pengajuan Sekolah** | `POST` | `/api/leads` | `leadsService.createLead(payload)` |
| **Gabung Kelas** | `POST` | `/api/classes/join` | `api.post('classes/join', { code })` |
| **Submit Assessment** | `POST` | `/api/assessments/submit` | `assessmentService.submitAssessment(payload)` |
| **Hasil Assessment** | `GET` | `/api/assessments/results/:id` | `assessmentService.getResultById(id)` |

---

## 5. Jaminan Keamanan & "Graceful Degradation" (Zero Mistake)

1. **Apakah aman menaruh `.env.production` di git?**
   - **Sangat Aman**. Variabel `VITE_` yang dikirim ke browser (seperti URL backend) memang bersifat publik karena browser harus tahu kemana ia harus mengirim permintaan HTTP. Tidak ada secret key (seperti database password atau JWT secret) yang disimpan di file ini.
2. **Tidak Ada Layar Putih (Blank Screen):**
   - Setiap panggilan API dibungkus oleh blok penanganan error (`try ... catch`).
   - Terdapat **Timeout Controller (10 detik)** di `api.ts`, sehingga jika server partner sedang "cold-start" atau lambat, browser tidak akan macet/hang.
   - Pada halaman **Assessment**, hasil scoring dan grafik radar polygon dihitung secara instan oleh modul lokal (`calculateAssessmentResult`) sesaat setelah siswa menekan tombol selesai. Jawaban kemudian dikirim ke backend di latar belakang. Dengan begitu, grafik radar tidak akan pernah hilang atau rusak meskipun backend bermasalah.
3. **Penyimpanan Lokal (localStorage):**
   - Token JWT disimpan di `tanggap_token`.
   - Data user login disimpan di `tanggap_user`.
   - Kode kelas disimpan di `tanggap_school_code`.

---

## 6. Panduan Pengujian Lokal (Development)

Untuk menguji perubahan di komputer lokal:

```bash
# Masuk ke direktori frontend
cd "FrontEnd_Tanggap.org"

# Jalankan server lokal
bun run dev

# Jalankan uji kompilasi produksi
bun run build

# Menjalankan preview build produksi di browser
bun run preview
```
