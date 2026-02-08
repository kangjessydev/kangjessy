# 🛠️ Panduan Lengkap Instalasi WordPress

Selamat datang di panduan teknis instalasi WordPress. Dokumentasi ini dirancang untuk membantu Anda melakukan setup website dari nol hingga siap digunakan untuk produksi.

> **Catatan:** Pastikan Anda memiliki akses penuh ke Control Panel (cPanel/DirectAdmin) atau akses SSH jika menggunakan VPS.

---

## 📋 Persyaratan Sistem (Prerequisites)

Sebelum melangkah lebih jauh, pastikan lingkungan server Anda memenuhi standar minimum berikut agar website berjalan optimal:

| Komponen | Rekomendasi |
| :--- | :--- |
| **PHP** | Versi 7.4, 8.1, atau 8.2 |
| **Database** | MySQL 5.7+ atau MariaDB 10.4+ |
| **Web Server** | Nginx (Disarankan) atau Apache |
| **Memory Limit** | Minimal 256MB |

---

## 🚀 Langkah 1: Persiapan Database

WordPress membutuhkan database untuk menyimpan semua konten Anda. Jalankan perintah SQL berikut jika Anda menggunakan terminal, atau buat melalui menu **MySQL Databases** di cPanel.

```sql
CREATE DATABASE db_project_genz;
CREATE USER 'user_genz'@'localhost' IDENTIFIED BY 'PasswordKuat123!';
GRANT ALL PRIVILEGES ON db_project_genz.* TO 'user_genz'@'localhost';
FLUSH PRIVILEGES;
```

## 📥 Langkah 2: Mengunduh Source Code

Anda bisa mengunduh file WordPress terbaru langsung dari server menggunakan perintah wget atau curl.

1. Masuk ke direktori root website Anda: cd /var/www/html
2. Unduh paket WordPress terbaru: wget https://wordpress.org/latest.tar.gz
3. Ekstrak file tersebut: tar -xzvf latest.tar.gz
4. Pindahkan isi folder wordpress ke folder utama: mv wordpress/* .

## ⚙️ Langkah 3: Konfigurasi wp-config.php

Ini adalah bagian paling krusial. Anda harus menghubungkan WordPress dengan database yang telah dibuat. Ubah file wp-config-sample.php menjadi wp-config.php dan sesuaikan isinya:

```
/** Nama database untuk WordPress */
define( 'DB_NAME', 'db_project_genz' );

/** Username database MySQL */
define( 'DB_USER', 'user_genz' );

/** Password database MySQL */
define( 'DB_PASSWORD', 'PasswordKuat123!' );

/** Hostname MySQL (biasanya localhost) */
define( 'DB_HOST', 'localhost' );
```
## 🎨 Langkah 4: Selesaikan via Browser

Setelah semua file siap, buka domain Anda di browser: https://domain-anda.com. Anda akan melihat layar instalasi grafis WordPress.

1. Site Title: Masukkan nama brand atau project Anda.
2. Username: Hindari menggunakan 'admin' untuk alasan keamanan.
3. Password: Gunakan password yang disarankan (Strong).
4. Email: Alamat email aktif untuk notifikasi sistem.

## 💡 Tips Optimasi Genz

1.  Gunakan WebP: Selalu konversi gambar ke format .webp agar loading secepat kilat.
2. Limit Plugin: Jangan asal instal plugin, cukup yang benar-benar dibutuhkan saja.
3. Caching: Pasang plugin caching seperti LiteSpeed Cache atau WP Rocket.
4. SSL: Pastikan icon gembok sudah muncul di URL bar (HTTPS).