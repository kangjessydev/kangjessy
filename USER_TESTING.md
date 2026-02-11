# 🧪 USER MANUAL TESTING ROADMAP

Berikut adalah daftar pengecekan (checklist) yang harus dilakukan secara manual untuk memastikan seluruh perubahan UI, Lokalisasi, dan Fitur Baru berjalan sempurna.

## 📱 1. Verifikasi Lokalisasi (Bahasa Indonesia)

- [ ] **Dashboard**: Cek apakah judul "Pusat Intelijen", statistik KPI, dan label "Pipa Penjualan" sudah benar.
- [ ] **Pesanan (Orders)**: Pastikan tabel "Pesanan Klien" dan filter (Semua Status, dll) sudah dalam Bahasa Indonesia.
- [ ] **Leads**: Cek tab "Inbox" vs "Wawasan Pemasaran", serta tombol "Seleksi".
- [ ] **Finance**: Verifikasi "Selaraskan Buku Besar", "Buku Kas", dan "Hutang & Piutang".
- [ ] **Proposal & Voucher**: Pastikan judul halaman dan header tabel sudah diterjemahkan.

## 🎨 2. Uji Konsistensi UI (Bento 2.0)

- [ ] **Rounding**: Pastikan seluruh `AdminCard` dan `PageHeader` memiliki sudut membulat lebar (`rounded-[32px]!`).
- [ ] **Border Consistency**: Pastikan tidak ada bayangan (_shadow_) berlebih, fokus pada border 1px yang bersih.
- [ ] **Table Selection**: Masuk ke mode seleksi (Selection Mode) di Orders/Leads/Portfolio dan pastikan checkbox muncul dengan benar.

## ⚙️ 3. Cek Fungsionalitas (Regression Test)

- [ ] **Filter & Search**: Coba ketik di kolom pencarian pada setiap view dan pastikan data terfilter.
- [ ] **Status Update**: Coba ubah status salah satu Order atau Lead (e.g. dari "New" ke "Follow Up") dan pastikan toast berhasil muncul.
- [ ] **Table/Grid Switcher**: Pada view Portfolio dan Blog, coba pindah antara mode Tabel dan Grid.
- [ ] **New Feature (CRM Intel)**: Klik ikon 'User' di tabel Leads, pastikan masuk ke halaman Detail Klien. Coba tambahkan catatan manual dan lihat apakah LTV muncul.
- [ ] **AI Lead Scoring**: Klik ikon 🧠 pada Lead baru. Tunggu proses analisa Gemini. Cek apakah Badge (Hot/Warm/Cold) muncul dan tooltip menunjukkan analisa yang masuk akal.

## 📱 4. Responsiveness (Mobile Check)

- [ ] **Mobile Layout**: Buka dashboard di resolusi 390px - 430px.
- [ ] **Sticky Header**: Pastikan `PageHeader` tetap terlihat baik di mobile.
- [ ] **Filter Bar**: Cek apakah filter berubah menjadi ikon-only atau masuk ke dalam menu pencarian di layar kecil.

## 💰 5. Verifikasi Dynamic Pricing (Sync Test)

- [ ] **Admin Input (Edit Item)**:
  - _Action_: Buka menu **Services > Fitur Tambahan** di Admin. Edit salah satu fitur (misal: "SEO Audit"), ubah harganya.
  - _Expected Output_: Halaman Admin menampilkan notifikasi "Updated successfully!".
- [ ] **Agency Reflection (Sync Test)**:
  - _Action_: Buka halaman **Cost Calculator** di Agency (refresh page).
  - _Expected Output_: Harga di kalkulator harus sudah berubah sesuai input Admin tadi.
- [ ] **Feature Filtering (Mapping Test)**:
  - _Action_: Di Admin, buat fitur baru "Tes Filter". Centang "Relevan Untuk Layanan" hanya pada "Web High-Conversion".
  - _Expected Output_: Di Agency, jika pilih "System/App", fitur "Tes Filter" **TIDAK MUNCUL**. Jika pilih "Web High-Conversion", fitur "Tes Filter" **MUNCUL**.

## 📩 6. Verifikasi Lean Notification (WA & Email)

- [ ] **WA Smart Link (Format Check)**:
  - _Action_: Isi form order di Agency, pilih fitur dan tipe project, lalu klik "Lanjut ke WhatsApp".
  - _Expected Output_: Tab baru WhatsApp terbuka. Pesan otomatis di input box harus rapi, ada **BOLD** pada Tipe Project dan Total Harga.
- [ ] **Email Invoice (Resend API)**:
  - _Action_: Pastikan email pengujian masuk ke Inbox setelah submit (jika diaktifkan).
  - _Expected Output_: Email dengan branding KangJessy Agency muncul dengan detail order yang benar.

## 🚪 7. Verifikasi Client Portal

- [ ] **Access & Login**:
  - _Action_: Buka `/portal` di Agency. Masukkan Tracking ID.
  - _Expected Output_: Dashboard Client terbuka menampilkan nama project yang sesuai.
- [ ] **Invoice & Billing**:
  - _Action_: Klik tombol "Billing Info". Klik "Cetak".
  - _Expected Output_: Dialog Print browser terbuka. Tampilan harus bersih (A4 Invoice Template).
- [ ] **Payment Confirmation**:
  - _Action_: Klik "Confirm Paying" di dalam Billing Summary.
  - _Expected Output_: Modal WhatsApp terbuka dengan template pesan tagihan yang akurat.
