# BaruLagi - Certified Refurbished Marketplace

<div align="center">

![BaruLagi Logo](/public/logo.svg)

**Platform E-Commerce Gawai & Gadget Rekondisi Bersertifikasi Resmi Indonesia**

*Menghadirkan standar baru belanja perangkat teknologi second-hand berkualitas dengan estetika Cinematic Dark Luxury, transparansi kondisi unit, dan garansi penuh 1 tahun.*

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.8-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-CSS_v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-5.22.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**Author & Project Owner:** [Nur Hidayat Surya Pamungkas](https://github.com)

</div>

---

## 🌟 Tentang BaruLagi

**BaruLagi** adalah platform pasar elektronik rekondisi (*certified refurbished marketplace*) modern di Indonesia yang mengusung konsep ekonomi sirkular ramah lingkungan (*sustainable tech*). Setiap perangkat gawai—mulai dari Apple MacBook, iPhone, iPad, konsol game, hingga perlengkapan audio—melewati standardisasi inspeksi teknis 25 titik untuk memastikan performa 100% optimal dengan harga hingga 70% lebih terjangkau dibanding produk baru.

Website ini dirancang secara eksklusif dengan bahasa desain **Cinematic Dark Luxury**: perpaduan palet *pure obsidian black* (`#000000`), kontras monokrom bersih (`#FFFFFF`), aksen *electric lime* (`#D6F479`), tipografi terkurasi, serta animasi *smooth inertial scroll* menggunakan **Lenis** dan **Framer Motion**.

---

## ✨ Fitur Utama

- **Estetika Cinematic Dark Luxury & Isle Thorne Collective Design System**:
  - Arsitektur grid 12-kolom responsif (`grid-site`) dengan penataan tipografi mono dan kontras tinggi.
  - Tirai pembuka sinematik (*Loading Curtain Interlude*) berbasis GSAP `clip-path` motion.
  - *Smooth momentum scrolling* ditenagai oleh Lenis Engine.
  - Komponen Logo Interaktif: monogram geometris huruf **B** dengan busur regenerasi sirkular yang memiliki interaksi *click-to-scroll-to-top*.
- **Kurasi Kapsul Hardware Bernomor (*Curated Capsules 01–04*)**:
  - 4 koleksi kurasi bertema hardware (*Apple Silicon Studio*, *Pro Mobility*, *Hybrid Gaming & Acoustic*, *Extreme Wearable*).
  - Baris kartu produk dengan geser momentum horizontal (*horizontal scroll-snap row*).
- **Riset & Jurnal Sirkular (*Circular Journal Stories*)**:
  - Artikel investigasi dan esai laboratorium (*Audit 25-Titik*, *Penghematan 91% Emisi Karbon*, *Metalurgi Titanium Aerospace*).
  - Modal reader interaktif dengan tipografi editorial, waktu baca, dan kutipan teknis.
- **Manifesto Kolektif & Kolaborasi Laboratorium (*Brand Manifesto*)**:
  - Deklarasi visi ekonomi sirkular oleh Nur Hidayat Surya Pamungkas.
  - Rekam jejak kemitraan laboratorium diagnostik independen dan sorotan liputan pers nasional.
- **Etalase Interaktif Terkurasi & Ringan**:
  - **Hover Grid Showcase**: Efek multi-image reveal terkurasi untuk ekosistem perangkat.
  - **Grid Layout Motion Showcase (Masterpiece Vault)**: Multi-plane tilt terkurasi dengan exploding detail preview.
- **Katalog Produk Dinamis & Multi-Tier Grading**:
  - Filter kategori instan (MacBooks, Smartphones, iPads, Audio, Consoles).
  - Pilihan kondisi fisik transparan (*Fair*, *Good*, *Excellent*) dengan penyesuaian harga *real-time*.
  - Modal detail produk dengan drawer 4-panel (*Diagnostik Lab 25-Titik*, *Spesifikasi Hardware*, *Proses Rekondisi*, *Garansi & Logistik*).
- **Kalkulator Tukar Tambah (*Trade-In Engine*)**:
  - Simulasi nilai taksir instan untuk menjual atau menukar gadget lama menjadi uang tunai/saldo belanja hanya dalam 4 langkah terpandu.
- **Sistem Keranjang & Checkout Lengkap**:
  - *Slide-over cart drawer* interaktif dengan estimasi pengiriman gratis berasuransi.
  - Modal checkout terpadu dengan berbagai opsi pembayaran Indonesia (Transfer Bank Otomatis, QRIS Instant, Cicilan 0%).
- **Garansi & Komitmen Terpercaya**:
  - Garansi komersial hardware resmi 12 bulan tanpa biaya tersembunyi.
  - Jaminan uji coba 30 hari bebas risiko (*100% money-back guarantee*).
  - Standar pembersihan data militer (*100% sanitized data*).

---

## 🛠️ Tech Stack & Arsitektur

| Lapisan | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.3.8 (App Router, Turbopack) | Server Components & Server Actions |
| **Library UI** | React 19.2.8 | Komponen reaktif modern |
| **Styling** | Tailwind CSS v4 & PostCSS | Desain responsif berbasis token tema modern |
| **Motion** | Framer Motion & Lenis Scroll | Animasi mikro dan *smooth inertial scrolling* |
| **Icons & UI** | Lucide React & Shadcn UI / Base UI | Ikonografi modern dan komponen aksesibel |
| **Database & ORM** | SQLite & Prisma ORM 5.22.0 | Skema relasional untuk produk, varian inventaris, dan review |
| **Bahasa** | TypeScript 5 | Tipisasi statis ketat di seluruh modul |

---

## 📁 Struktur Direktori

```text
hp-second-app/
├── prisma/
│   ├── schema.prisma       # Definisi skema relasional database Prisma
│   └── seed.js             # Data seed gawai rekondisi bersertifikasi
├── public/
│   ├── logo.svg            # Asset logo vektor original BaruLagi
│   ├── cinematic_macbook.jpg
│   ├── cinematic_iphone.jpg
│   └── ...                 # Asset visual perangkat
├── src/
│   ├── app/
│   │   ├── actions.ts      # Server Actions (Trade-In, Voucher, Newsletter)
│   │   ├── globals.css     # Styling global & token warna Tailwind v4
│   │   ├── layout.tsx      # Root layout, font Inter, context providers & meta
│   │   └── page.tsx        # Server Component utama (prefetch database)
│   ├── components/
│   │   ├── cart/           # Drawer keranjang belanja & modal checkout
│   │   ├── cinematic/      # Header, Hero section, Footer, dan kartu gawai
│   │   ├── home/           # Client wrapper interaktif dan section dinamis
│   │   ├── modals/         # Modal bantuan, FAQ, akun, dan lokasi pengiriman
│   │   ├── product/        # Modal detail spesifikasi dan varian gawai
│   │   ├── providers/      # Lenis SmoothScrollProvider
│   │   ├── tradein/        # Wizard interaktif kalkulator tukar tambah
│   │   └── ui/             # Komponen UI inti & BaruLagiLogo
│   ├── context/            # CartContext dan ModalContext
│   └── lib/                # Prisma client singleton & utility helper
├── .env.example            # Template variabel lingkungan
├── .gitignore              # Konfigurasi pengabaian file Git
├── LICENSE                 # Lisensi resmi MIT
├── package.json            # Dependensi dan script project
└── README.md               # Dokumentasi lengkap project
```

---

## 🚀 Panduan Memulai (*Getting Started*)

### 1. Prasyarat Sistem
- **Node.js**: Versi `18.18.0` atau yang lebih baru (disarankan Node.js 20+ LTS).
- **npm**: Versi `9.x` atau yang lebih baru.
- **Git** terpasang di sistem Anda.

### 2. Kloning Repositori
```bash
git clone https://github.com/USERNAME_ANDA/barulagi.git
cd barulagi/hp-second-app
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Konfigurasi Lingkungan (*Environment Variables*)
Salin berkas contoh `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
*(Secara default, SQLite menggunakan `DATABASE_URL="file:./dev.db"` tanpa konfigurasi tambahan).*

### 5. Inisialisasi Database & Seeding Data
Jalankan migrasi skema dan masukkan data awal (*seed*):
```bash
# Sinkronkan skema Prisma dengan database SQLite lokal
npm run db:push

# Generate client Prisma
npx prisma generate

# Masukkan data gawai awal (MacBook, iPhone, iPad, Audio, Konsol)
npm run db:seed
```

### 6. Menjalankan Server Pengembangan (*Development*)
```bash
npm run dev
```
Buka peramban (*browser*) Anda di [http://localhost:3000](http://localhost:3000).

---

## 📦 Build Produksi & Pengujian

Untuk memverifikasi keutuhan aplikasi sebelum deploy ke server produksi:

```bash
# Build aplikasi produksi menggunakan Next.js Turbopack
npm run build

# Menjalankan server dalam mode produksi
npm run start
```

---

## 🚢 Panduan Deploy ke GitHub

Ikuti langkah-langkah berikut untuk mengunggah project ini ke repositori GitHub pribadi Anda:

1. **Buat Repositori Baru di GitHub**:
   - Buka [github.com/new](https://github.com/new).
   - Beri nama repositori, misalnya `barulagi` atau `barulagi-marketplace`.
   - Pilih visibilitas (*Public* atau *Private*).
   - Jangan centang *"Initialize with README"* (karena project ini sudah memiliki README lengkap).

2. **Stage dan Commit Berkas di Komputer**:
   ```bash
   # Masuk ke direktori aplikasi
   cd D:\hp-second\hp-second-app

   # Tambahkan seluruh berkas ke staging area
   git add .

   # Buat commit perdana
   git commit -m "feat: Initial release of BaruLagi Certified Refurbished Marketplace by Nur Hidayat Surya Pamungkas"
   ```

3. **Hubungkan dan Dorong (*Push*) ke GitHub**:
   ```bash
   # Atur branch utama ke main
   git branch -M main

   # Tambahkan remote repository Anda (ganti URL dengan URL repo Anda)
   git remote add origin https://github.com/USERNAME_ANDA/barulagi.git

   # Push ke GitHub
   git push -u origin main
   ```

4. **Deploy ke Vercel (Opsional / Direkomendasikan)**:
   - Hubungkan akun GitHub Anda ke [Vercel](https://vercel.com).
   - Pilih repositori `barulagi`.
   - Vercel akan otomatis mendeteksi konfigurasi Next.js dan menjalankan `npm run build` dengan sempurna.

---

## 📄 Lisensi & Hak Cipta

Project ini dilisensikan di bawah lisensi resmi **MIT License**.  
Lihat berkas [LICENSE](LICENSE) untuk informasi lebih lanjut.

Copyright &copy; 2026 **Nur Hidayat Surya Pamungkas**. All rights reserved.
