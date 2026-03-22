# 🎨 Design System & Visual Assets

Dokumentasi ini berisi pedoman desain, palet warna, dan aset visual yang digunakan untuk membangun antarmuka pengguna (UI) yang konsisten dan aksesibel.

---

# Persiapan Aset

Mohon siapkan aset berikut sebelum kita mulai pengerjaan.

> **Penting:** Pastikan semua gambar memiliki resolusi tinggi agar hasil website tidak pecah (blur).

- Logo (Format SVG/PNG Transparan)
- Foto Produk/Tim
- Deskripsi singkat bisnis

---

## 🏗️ 1. Brand Identity
Identitas visual kami berfokus pada kesan **Modern**, **Trustworthy**, dan **Clean**.

| Asset | File Name | Description | Preview |
| :--- | :--- | :--- | :--- |
| **Primary Logo** | `logo-main.svg` | Digunakan untuk Navbar dan Header utama. | 🖼️ |
| **Monochrome** | `logo-dark.svg` | Digunakan untuk latar belakang terang. | 🖼️ |
| **Favicon** | `favicon.ico` | Ikon kecil untuk tab browser (32x32px). | 🖼️ |

---

## 🌈 2. Color System
Kami menggunakan palet warna yang dioptimalkan untuk aksesibilitas (WCAG 2.1 Compliance).

### 🔵 Primary Colors
Digunakan untuk aksi utama, link, dan branding.
* **Electric Blue (`#667eea`)**: Melambangkan teknologi dan inovasi.
* **Royal Indigo (`#764ba2`)**: Memberikan kontras kedalaman pada gradien.

### 🟢 Functional Colors
* **Success (`#43e97b`)**: Digunakan untuk konfirmasi transaksi sukses.
* **Danger (`#f5576c`)**: Digunakan untuk error handling dan pembatalan.
* **Warning (`#f6d365`)**: Digunakan untuk status pending atau peringatan.



---

## 🔡 3. Typography
Hierarki teks dirancang untuk memudahkan *readability* di berbagai ukuran layar.

* **Headings**: `Outfit` (Sans-serif) - Memberikan kesan geometris dan modern.
* **Body Text**: `Inter` (Sans-serif) - Standar industri untuk keterbacaan teks panjang yang tajam.

| Style | Weight | Size (Desktop) | Size (Mobile) |
| :--- | :--- | :--- | :--- |
| **H1 - Hero** | Bold (700) | 48px | 32px |
| **H2 - Section** | Semibold (600) | 36px | 28px |
| **Body Large** | Regular (400) | 18px | 16px |
| **Caption** | Medium (500) | 14px | 12px |

---

## 🧩 4. UI Components (Atomics)
Spesifikasi elemen dasar untuk menjaga konsistensi antar halaman.

### **Buttons**
* **Border Radius**: `12px` (Rounded-medium).
* **Elevation**: `Shadow-lg` pada state hover untuk efek kedalaman.
* **Padding**: `12px 24px` untuk tombol standar.

### **Cards**
* **Glassmorphism Effect**: Background `rgba(255, 255, 255, 0.05)` dengan blur `10px`.
* **Border**: `1px solid rgba(255, 255, 255, 0.1)`.



---

## 📁 5. Folder Structure
Organisasi file aset di dalam folder `/public/assets`:

```text
assets/
├── branding/
│   ├── logo.svg
│   └── symbol.png
├── icons/
│   ├── heroicons/        # Ikon navigasi
│   └── tech-stack/       # Ikon bahasa pemrograman (Vue, React, dll)
├── illustrations/
│   ├── 404-error.svg
│   └── empty-cart.svg
└── images/
    └── projects/         # Screenshot project dummy