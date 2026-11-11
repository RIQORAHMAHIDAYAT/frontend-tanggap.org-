# Panduan Penggantian Endpoint & Rollback Mock Mode (FrontEnd Tanggap.org)

Dokumen ini merupakan panduan resmi dan catatan permanen untuk tim pengembang dan administrator Tanggap.org terkait pengelolaan URL API Backend, peralihan server (dari backend partner Vercel ke backend Hostinger), sistem proteksi hak akses (Route Guard), serta prosedur rollback instan ke mode mock.

---

## 1. Ringkasan Konfigurasi Saat Ini

| Parameter | Nilai Saat Ini | Keterangan |
| :--- | :--- | :--- |
| **Backend Aktif** | `https://backend-tanggap-org-8fj2.vercel.app/api` | Server backend sementara dari pihak partner |
| **File Konfigurasi** | `.env.production` | Terbaca otomatis saat proses build produksi |
| **Status Mock Toggle** | `VITE_USE_MOCK=false` | Terhubung langsung ke API Backend live |
| **Proteksi Route Guard** | **Aktif & Terkunci** | Halaman Admin, Guru, dan Siswa dilindungi otentikasi ketat |
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
VITE_API_BASE_URL=https://backend-tanggap-org-8fj2.vercel.app/api
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
- Dashboard Admin dan Guru kembali menampilkan data mock bawaan.
- Tidak ada panggilan network yang dilakukan ke API.
- Tampilan UI dan data demo tetap utuh persis seperti awal.

---

## 4. Sistem Proteksi Hak Akses (Route Guard)

Untuk mencegah pengguna sembarangan mengakses halaman internal tanpa login, sistem keamanan Route Guard aktif di `src/router/index.ts`:

### Aturan Hak Akses:
1. **Halaman Publik (Bebas Diakses):**
   * Beranda (`/`)
   * Login (`/login`)
   * Register (`/register`)
   * Lupa / Reset Password (`/forgot-password`, `/reset-password`)
   * Pengajuan Proposal Sekolah (`/pengajuan-sekolah`)
2. **Halaman Siswa (`/dashboard`, `/assessment`, `/amigo`, `/action-toolkit`, `/pengaturan`):**
   * **Wajib Login.** Jika belum login, otomatis dilempar ke `/login`.
3. **Halaman Guru BK (`/dashboard_guru`, `/monitoring_guru`):**
   * **Wajib Login.** Khusus akun dengan peran **Guru BK** (atau Admin).
   * Akun Siswa biasa yang mencoba membuka URL ini akan otomatis dialihkan ke `/dashboard` Siswa.
4. **Halaman Administrator (`/dashboard_admin/*`):**
   * **Wajib Login.** Khusus akun dengan peran **Admin**.
   * Pengguna tanpa hak akses Admin otomatis ditolak dan dialihkan ke dashboard masing-masing.
5. **Auto-Redirect Jika Sudah Login:**
   * Jika pengguna sudah memiliki sesi login aktif dan sengaja membuka `/login` atau `/register`, sistem akan langsung mengarahkan ke dashboard yang sesuai dengan perannya.

---

## 5. Cara Login Sesuai Peran (Role-Based Testing)

### A. Pengujian Pada Live Mode (`VITE_USE_MOCK=false`):
Backend partner telah menyimpan akun uji dan kode kelas berikut:
* **Admin:**
  * Login dengan akun role `Admin Sekolah` / `ADMIN` (misal: `admin.utama@tanggap.org` / `password123`) $\rightarrow$ otomatis masuk ke `/dashboard_admin`.
* **Guru BK:**
  * Login dengan akun role `Guru BK` / `TEACHER` (misal: `guru.bk@tanggap.org` / `password123`) $\rightarrow$ otomatis masuk ke `/dashboard_guru`.
* **Siswa & Kode Kelas Valid:**
  * Login dengan akun siswa $\rightarrow$ masuk ke Dashboard User Biasa.
  * Masukkan kode kelas yang valid di pop-up Gabung Kelas:
    * `SMAN1A` (Kelas XI IPA 1 - SMA Negeri 1)
    * `SMAN1B` (Kelas XI IPS 1 - SMA Negeri 1)
    * `DEMO01` (Kelas Demo - Tanggap.org Demo School)
  * *Catatan:* Jika memasukkan kode selain di atas (misal kode asal), server backend akan menolak dan menampilkan pesan peringatan merah: *"Kode kelas '...' tidak ditemukan. Pastikan kode sudah benar."*
  * Setelah berhasil memasukkan kode valid, dashboard langsung bertransformasi menjadi Dashboard Siswa.

### B. Pengujian Pada Mock Mode (`VITE_USE_MOCK=true`):
Sistem mock mendeteksi role secara cerdas dari email yang Anda ketikkan:
* Ketik email yang mengandung kata **"admin"** (contoh: `admin@tanggap.org`) $\rightarrow$ Masuk sebagai Admin.
* Ketik email yang mengandung kata **"guru"** (contoh: `guru@tanggap.org`) $\rightarrow$ Masuk sebagai Guru.
* Ketik email lainnya (contoh: `fauzy@tanggap.org` atau Google Login) $\rightarrow$ Masuk sebagai Siswa.

---

## 6. Arsitektur Layanan & Pemetaan Endpoint

Seluruh logika komunikasi backend dipusatkan di folder `src/services/`:

```
src/services/
├── api.ts                # Client Fetch utama, Base URL, Auth Header, dan Timeout Protection
├── authService.ts        # Register, Login, Me, Logout (dengan fallback mode)
├── assessmentService.ts  # Submit jawaban assessment & ambil hasil
└── leadsService.ts       # Form pengajuan sekolah & kontak mitra
```

### Tabel Pemetaan Endpoint

| Modul | Method | Endpoint Backend | Keterangan |
| :--- | :---: | :--- | :--- |
| **Auth** | `POST` | `/api/auth/register` | Pendaftaran akun baru (Siswa, Guru, Admin) |
| **Auth** | `POST` | `/api/auth/login` | Login akun & penerimaan token JWT |
| **Auth** | `GET` | `/api/auth/me` | Membaca profil user aktif |
| **Leads** | `POST` | `/api/leads` | Form pendaftaran sekolah / demo kit |
| **Leads** | `GET` | `/api/leads` | Menampilkan daftar pengajuan di Admin Dashboard |
| **Kelas** | `POST` | `/api/classes/join` | Siswa bergabung kelas menggunakan 6 digit kode |
| **Assessment** | `POST` | `/api/assessments/submit` | Pengiriman hasil assessment siswa ke backend |
| **Admin Stats** | `GET` | `/api/admin/dashboard-stats` | Statistik metrik pengguna, sekolah, dan sistem |
| **Admin Schools**| `GET` | `/api/schools` | Daftar sekolah mitra aktif di Admin |
| **Guru Stats** | `GET` | `/api/teacher/dashboard-overview`| Statistik 4 indikator resolusi konflik untuk Guru |

---

## 7. Jaminan Keamanan & "Graceful Degradation" (Zero Mistake)

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

## 8. Panduan Pengujian Lokal (Development)

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
