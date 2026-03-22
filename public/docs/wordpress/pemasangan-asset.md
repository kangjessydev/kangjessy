# 🎨 Manajemen & Pemasangan Assets

Panduan ini mencakup cara mengelola media dan aset visual agar website WordPress tetap ringan dan optimal.

## 🖼️ Standar Optimasi Gambar
Sebelum diunggah ke *Media Library*, pastikan aset mengikuti standar berikut:
* **Format**: `.webp` untuk foto, `.svg` untuk logo/ikon.
* **Ukuran Maksimal**: 200KB per gambar.
* **Dimensi**: Sesuai kebutuhan container (misal: 1200px untuk Hero Image).

## 📂 Struktur Folder Asset (via FTP)
Jika Anda mengunggah aset secara manual, gunakan struktur berikut di dalam folder tema:

```text
wp-content/themes/nama-tema/
├── assets/
│   ├── css/        # File stylesheet tambahan
│   ├── js/         # Script custom
│   ├── fonts/      # Font lokal (Self-hosted)
│   └── images/     # Gambar statis tema