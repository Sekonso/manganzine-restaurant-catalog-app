# Manganzine Restaurant Catalog App

Manganzine Restaurant Catalog App merupakan proyek website dengan integrasi PWA, mengenai website yang menyajikan daftar katalog restoran. Projek ini adalah bentuk tugas akhir "Front-end developer expert" yang merupakan salah satu course yang saya ikuti pada Studi Independen di Dicoding.

Proyek dikerjakan dengan tools:

- HTML
- SASS
- Javascript
- ESlint
- Jest / Codecept / Playwright
- Idb
- Workbox
- Webpack

Dengan kriteria:

- Menampilkan app bar(navbar), hero, daftar restoran, dan footer
- Website responsif di perangkat mobile-tablet-laptop, dan memiliki aksesibilitas yang baik
- Pada halaman utama/home, menampilkan daftar restoran  yang disediakan oleh API. Setiap restoran bisa diarahkan ke halaman detail.
- Pada halaman detail, menampilkan data lebih detail mengenai restoran yang dipilih. Terdapat juga tombol favorite yang akan menyimpan data restoran ke indexedDB
- Pada halaman favorite, menampilkan daftar restoran yang telah disukai, data diambil dari indexedDB
- Native capability, website dapat diakses secara offline, diinstal dan juga harus memiliki icon serta splash screen untuk aplikasinya.
- Menggunakan ESLint dan menerapkan salah satu popular-style-guide
- Melakukan integration, dan E2E test
- Optimisasi gambar pada website
- Memeasang bundler analyzer dan menerapkan teknik code splitting
- Tampilan menarik dengan tata letak, warna, dan font yang tepat  (opsional)
- Penggunaan elemen yang tepat  (opsional)
- Menggunakan SASS  (opsional)
- Menambahkan fitur review  (opsional)
- Menerapkan web component secara native (opsional)
- Implementasi indikator loading ketika HTTP request sedang berjalan (opsional)
- Menuliskan test secara lengkap (opsional)
- Optimisasi tambahan seperti skeleton UI atau minify CSS (opsional)
- Deploy web app dan memperhatikan memperhatikan metrik Web Vitals dengan nilai: FCP < 2.5 detik, FID/TBT < 100 ms, CLS < 0.1 (opsional)

## Live Page

[Manganzine Restaurant Catalog App](https://manganzine.netlify.app/)

## Installation

Untuk menggunakan repository ini secara lokal silahkan install semua dependencies yang dibutuhkan terlebih dahulu.

Menggunakan NPM

```bash
  npm install
```

## Script

Bundling project (production)

```bash
  npm run build
```

Bundling project (development) dan menjalankan proyek di localhost

```bash
  npm run start-dev
```

linting (ESLint)

```bash
  npm run lint
```

Melakukan unit dan integration test (jest)

```bash
  npm run test
  npm run test:watch
```

End-to-end testing (codecept)

```bash
  npm run e2e
```

Image compression (sharpJS)

```bash
  npm run build-image
```
