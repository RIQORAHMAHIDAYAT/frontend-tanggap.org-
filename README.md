# FrontEnd Tanggap.org

Repository ini berisi kode antarmuka (Front-End) untuk **tanggap.org**, platform resolusi konflik remaja berbasis metode *blended learning* (integrasi AMIGO Boardgame dan asesmen digital).

## 🚀 Teknologi yang Digunakan
- **Framework:** Vue.js 3 (Composition API, `<script setup>`)
- **Build Tool:** Vite
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS (Mobile-First Responsive Design)
- **Tipografi:** Poppins (Google Fonts)

## 📦 Panduan Instalasi & Menjalankan (Development)

1. Pastikan Anda telah menginstal [Node.js](https://nodejs.org/).
2. Clone repository ini dan masuk ke dalam folder proyek.
3. Jalankan perintah instalasi dependensi:
   ```bash
   npm install
   ```
4. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```

## 🛠️ Panduan Build (Production)
Untuk melakukan kompilasi tipe (*type-check*) dan mem-build aplikasi untuk *production*:
```bash
npm run build
```
File hasil *build* akan berada di dalam direktori `dist/`.
