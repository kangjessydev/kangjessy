# Redesign Wisata Herbal Insani

Wisata Herbal Insani sebelumnya memiliki wajah digital yang sudah cukup tertinggal (jadul), berat saat diakses, dan kurang menarik secara visual. Tantangan utamanya bukan hanya estetika, tapi juga inefisiensi arsitektur konten: banyak section mubazir yang dipanggil berulang di setiap halaman, serta puluhan halaman paket wisata yang dibuat satu-per-satu padahal memiliki struktur yang identik. Galeri yang tidak rapi serta informasi lokasi dan kontak yang terpisah membuat pengalaman pengguna menjadi tersegmentasi dan sulit navigasi.

## Strategi Transformasi & Pengerjaan

Transformasi ini bukan sekadar polesan UI, melainkan perombakan fundamental (Rebuild from Scratch):

1.  **UX Consolidation (Simplicity focus)**: Kami merampingkan navigasi dengan menyatukan lokasi dan kontak. Inovasi terbesar adalah penggabungan puluhan halaman paket wisata menjadi **hanya 1 halaman utama** dengan sistem **Tab Interaktif**, memudahkan calon pengunjung membandingkan paket tanpa harus pindah halaman.
2.  **Native Development over Page Builder**: Saya memutuskan untuk membuang Elementor yang berat dan membangun website dari nol menggunakan **Custom Plugin**. Kode ditulis secara **Native (Pure PHP, HTML5, CSS3, dan JS)** untuk memastikan performa maksimal dan beban server yang seminimal mungkin.
3.  **Modern Clean Nature-Centric Design**: Desain web mengadopsi gaya _Modern Clean_ dengan dominasi warna Putih dan Hijau Herbal. Galeri dokumentasi ditata dalam sistem grid yang rapi, menciptakan impresi profesional dan teduh sesuai dengan tema wisata herbal.
4.  **Custom CMS Integration**: Saya membangun Custom Post Type (CPT) khusus untuk Galeri, Paket, dan Katalog Herbal. Admin kini bisa mengubah setiap gambar dan teks pada tiap section halaman dengan cepat melalui dashboard sederhana, tanpa perlu berurusan dengan builder yang kompleks.

## Hasil Akhir & Dampak

Klien memberikan apresiasi tinggi karena tampilan website kini selaras dengan identitas "Herbal" mereka. Secara teknis, transisi ke kode native berhasil:

- **Load Time Drastis**: Halaman menjadi sangat ringan karena tidak ada lagi script builder yang membengkak.
- **Efisiensi Admin**: Proses pembaruan data dan metadata jauh lebih cepat melalui dashboard CPT yang sudah dikustomisasi.
- **Conversion UX**: Sistem Tab paket dan grid galeri yang rapi meningkatkan kepercayaan dan kenyamanan pengunjung dalam memilih layanan wisata.
