# 🐛 BUG TRACKER & TESTING FEEDBACK

Gunakan file ini untuk mencatat temuan bug, glitch, atau ketidaksesuaian selama proses Manual Testing.

## 🔴 CRITICAL (Blokir Operasional)

_Bug yang membuat fitur utama tidak bisa digunakan._

| ID      | Temuan                                                | Dampak                                               | Status   |
| :------ | :---------------------------------------------------- | :--------------------------------------------------- | :------- |
| PRO-001 | Gagal Sinkronisasi Proposal (ID: ...aede6)            | Proposal tidak bisa dibuka                           | ✅ FIXED |
| PRO-004 | Data Terms tidak tersinkronisasi di halaman View      | Terms muncul kosong saat di-view                     | ✅ FIXED |
| PRO-002 | UI Pilih Project Type sulit (Dropdown)                | UX buruk, ganti ke Bento Grid                        | ✅ FIXED |
| PRO-003 | Fitur Tambahan tidak reset saat ganti Tipe Proyek     | Data fitur jadi tidak valid                          | ✅ FIXED |
| SET-001 | Info Bank/Payment masih LocalStorage                  | Data hilang saat buka di device berbeda              | ✅ FIXED |
| MED-001 | Galeri Media: Upload Sukses tapi Gambar Tidak Muncul  | Aset tidak tersimpan/terupdate                       | 🆕 NEW   |
| PTF-001 | Portfolio: Bidang & Tech Stack **TIDAK BISA DI-EDIT** | Data terkunci, tidak bisa update                     | 🆕 NEW   |
| GLO-001 | Pengaturan Global (Branding/Payment) belum Sync DB    | Data Admin hanya tersimpan di Localhost/LocalStorage | ✅ FIXED |

## 🟡 MEDIUM (Glitch / UI Issue)

_Masalah visual atau fungsionalitas yang tidak menghalangi alur utama._

| ID      | Temuan                                                            | Lokasi                          | Status   |
| :------ | :---------------------------------------------------------------- | :------------------------------ | :------- |
| BP-001  | Tabel Blueprint hilang style (Flat/Tidak Standard)                | Admin > The Blueprint           | 🆕 NEW   |
| BP-002  | Modul Edit Stage: Layout Panjang & Tidak Close saat Click Outside | Admin > Blueprint > Edit Stage  | 🆕 NEW   |
| BP-003  | Manage Step: Tombol Delete & Reorder (Arrow) tidak berfungsi      | Admin > Blueprint > Manage Step | 🆕 NEW   |
| PTF-002 | Portfolio: Delete Bidang/Stack masih pakai native alert           | Admin > Portfolio               | 🆕 NEW   |
| PRO-005 | Judul Terms terlalu kecil & Icon missing di View                  | UX/Visual Otoritatif kurang     | ✅ FIXED |
| PRO-006 | Ukuran font Harga Investasi terlalu dominan (Downsize req)        | Visual balance terganggu        | ✅ FIXED |
| PTF-003 | Portfolio: Modal Add Area/Stack belum standar (Blur sidebar)      | Admin > Portfolio               | 🆕 NEW   |

## 🔵 LOW / SUGGESTION (Peningkatan)

_Saran perbaikan untuk UX yang lebih baik._

| ID  | Deskripsi | Kategori | Status |
| :-- | :-------- | :------- | :----- |

---

### Cara Melaporkan:

1. Masukkan ke tabel di atas.
2. Berikan deskripsi langkah reproduksi jika bug-nya kompleks.
3. Tandai status: `🆕 NEW`, `⏳ FIXING`, `✅ FIXED`.
