# FrontEnd Tanggap.org

> **Live Website:** [https://tanggap.org](https://tanggap.org)  
> **Preview Hosting (Vercel):** [https://frontend-tanggap-org-theta.vercel.app](https://frontend-tanggap-org-theta.vercel.app)

Repository ini berisi kode antarmuka (Front-End) untuk **tanggap.org**, platform resolusi konflik remaja berbasis metode *blended learning* (integrasi AMIGO Boardgame dan asesmen digital).

## Status Deployment
- **Production URL:** [https://tanggap.org](https://tanggap.org) (Hosted via Niagahoster cPanel FTP).
- **Auto-Deploy:** Terintegrasi dengan **GitHub Actions** (`.github/workflows/deploy.yml`). Setiap *push* ke branch `main` akan otomatis melakukan build, upload, dan smoke-check ke server produksi.

## Teknologi yang Digunakan
- **Framework:** Vue.js 3 (Composition API, `<script setup>`)
- **Build Tool:** Vite
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS (Mobile-First Responsive Design)
- **Tipografi:** Poppins (Google Fonts)

## Panduan Instalasi & Menjalankan (Development)

1. Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) atau [Bun](https://bun.sh/).
2. Clone repository ini dan masuk ke dalam folder proyek.
3. Jalankan perintah instalasi dependensi (direkomendasikan menggunakan Bun sesuai CI):
   ```bash
   bun install
   # atau npm install
   ```
4. Jalankan server pengembangan lokal:
   ```bash
   bun run dev
   # atau npm run dev
   ```

## Panduan Build (Production)
Untuk melakukan kompilasi tipe (*type-check*) dan mem-build aplikasi untuk *production*:
```bash
bun run build
# atau npm run build
```
File hasil *build* akan berada di dalam direktori `dist/`.
