# 🌐 KANGJESSY ECOSYSTEM - MASTER BRAIN

Dokumen ini adalah **Single Source of Truth** utama untuk seluruh ekosistem digital KangJessy. Seluruh panduan teknis, strategi bisnis, dan roadmap dipusatkan di sini.

---

## 🏗️ 1. ARCHITECTURE & TECH STACKS

Ekosistem ini menggunakan strategi **Modular Hub** dengan pembagian repository sebagai berikut:

| Project              | Domain               | Tech Stack                       | Role                      |
| :------------------- | :------------------- | :------------------------------- | :------------------------ |
| **kangjessy-agency** | `kangjessy.com`      | Vue 3, Vite, Tailwind v4, Sanity | Landing Page & Conversion |
| **kangjessy-admin**  | `admin.kangjessy.co` | Vue 3, Supabase, Bento UI        | Internal CRM & CMS Ops    |
| **kangjessy-tools**  | `tools.kangjessy.co` | Vue 3 / Nuxt                     | Marketing Utilities       |
| **kangjessy-store**  | `store.kangjessy.co` | Vue 3 / Nuxt, Supabase           | Digital Products Sale     |

### � Strict Third-Party Library Policy (MANDATORY)

- **Native First**: Dilarang menggunakan library pihak ketiga (NPM packages) kecuali **SANGAT KRUSIAL** dan sudah disetujui.
- **Why?**: Mencegah "Dependency Hell", bloatware bundle, dan konflik versi.
- **Allowed**: `lucide-vue-next`, `@vueuse`, `supabase`, `sanity`.
- **Forbidden**: `axios` (Gunakan `fetch`), `moment/dayjs` (Gunakan `Intl.DateTimeFormat`), `html2pdf`/`jspdf` (Gunakan `window.print`), UI Frameworks selain Tailwind.

---

## 🎨 2. UI/UX STANDARDS (DISTINCT)

### Distinct Design Systems

- **Agency (`kangjessy.com`)**: Vercel-Inspired (Black/White high contrast). Gunakan file `agency/src/components/ui` lokal jika desain spesifik.
- **Admin (`admin.kangjessy.co`)**: Bento UI / Google Stitch (Border-based, rounded-32px). Gunakan `@kangjessy/ui` (Admin Components).
- **Styling**: Tailwind CSS v4 adalah standar mutlak untuk keduanya.
- **Rule**: Jangan memaksakan komponen Admin ke Agency, atau sebaliknya. Biarkan mereka memiliki identitas visual masing-masing.

### Modular "LEGO" Approach

Kita menggunakan sistem **Core + Upgraders** untuk fleksibilitas budget klien.

1. **The Core**: Pondasi digital (Basic Dashboard, 1 Landing Page, SOP).
2. **Project Types**: Paket bundling yang sudah didiskon ~15% (Starter, E-commerce, POS, dll).
3. **Feature Upgraders**: Fitur tambahan a-la-carte (Payment Gateway, Advanced SEO, etc).

### Silent Multiplier Rule

- Harga paket (Bundle) adalah harga promo.
- Kustomisasi manual menggunakan _Silent Multiplier_ (+10% dari base price) untuk menutupi biaya kustomisasi tanpa terlihat seperti "denda" di mata klien.

---

## 🎨 3. DESIGN SYSTEM & UI STANDARDS

### Public (Agency Style)

- **Vercel-Inspired**: High contrast, clean, border-heavy.
- **Fluidity**: Menggunakan `clamp()` untuk tipografi dan spacing.
- **Responsiveness**: Mobile-first dengan `BottomSheet.vue` untuk modal di smartphone.

### Internal (Bento Premium / Google Stitch)

- **Visual DNA**: Border-based, rounded-[32px], no shadow excess.
- **Core Component: `BentoTable.vue`**: Tabel premium yang auto-switch ke card-view di mobile.
- **Micro-interactions**: Hover effects (scale, border highlight) alih-alih shadow.
- **No Native Alerts**: Dilarang menggunakan `alert()`, `confirm()`, atau `prompt()`. Gunakan komponen UI kustom (`ConfirmModal`, `Toast`, dll) untuk pengalaman pengguna yang lebih premium.

---

## 🛠️ 4. DEVELOPMENT SOP (MANDATORY)

### Build Safety & TypeScript

1. **Strict Mode**: Hindari `any`. Gunakan interface yang jelas.
2. **Pre-push Check**: Selalu jalankan `npm run build` secara lokal sebelum commit.
3. **Optional Chaining**: Gunakan `?.` untuk akses data dari API/Sanity.

### AI Core Commands

- **Strict TS**: No unused variables.
- **Mobile-First Check**: Resolusi target 390px - 430px.
- **Shadow-Free Dashboard**: Prioritaskan border 1px solid.

---

## 🔑 5. DATABASE & CMS CONFIG (REFERENCE)

### Supabase

- **URL**: `https://vmhjbtxbscibqruesrhj.supabase.co`
- **Key**: (Tersimpan di `.env`)
- **Tables**: `clients`, `projects`, `transactions`, `tasks`, `coupons`.

### Sanity

- **Project ID**: `q2kcq0p5`
- **Dataset**: `production`
- **Schemas**: `post` (Blog), `project` (Portfolio), `product` (Store).

### Email & AI Infrastructure (New)

- **Resend API**: Digunakan untuk kirim invoice. Setup ENV: `RESEND_API_KEY`.
- **Gemini AI API**: Digunakan untuk AI Lead Scoring (Admin) & AI Chat (Agency). Setup ENV: `GEMINI_API_KEY`.

---

## 🚀 6. CONSOLIDATED ROADMAP

### High Priority (ACTIVE)

1. **Email/WA Templates (Lean Strategy)**:
   - **Email**: Gunakan Resend (Free Tier) untuk invoice profesional.
   - **WhatsApp**: Gunakan _Smart Click-to-Chat_ (User melakukan send manual) untuk 0 biaya.

### Innovation Lab (FUTURE)

- **Enterprise Notification Infrastructure**:
  - Migrasi ke **WhatsApp Business API** (Official/Paid) untuk notifikasi background otomatis & centang hijau.
  - Upgrade **Resend Pro** / Amazon SES jika volume email tembus >3000/bulan.
- **pnpm Workspaces (Monorepo)**: Migrasi seluruh repo ke apps/ dan packages/ untuk berbagi logic Supabase.
- **Shared UI Library**: Membuat package UI internal agar styling Agency dan Admin konsisten tanpa copy-paste code.
- **AI Lead Scoring**: LLM-based scoring untuk menilai kualitas brief klien (Hot/Cold).
- **Automated WhatsApp Follow-up**: Integrasi API WhatsApp untuk auto-reminder invoice/follow-up via Whacenter/Fonnte (Paid Gateway).
- **One-Click Repurposer**: Tombol "Viralize" untuk mengubah Blog Sanity menjadi Threads (X), Script TikTok, atau Newsletter.
- **Internal Snippet Manager**: Katalog kode internal di `kangjessy-docs` untuk mempercepat development project baru.
- **Affiliate & Subscription**: Sistem komisi partner dan paket maintenance (MaaS) bulanan otomatis.
- **Smart Service-Level Discount System**: Diskon general (Flat/%) per Service Category. Sistem otomatis memilih diskon TERBESAR antara Service vs Project Type (Best Deal Logic).
- **Contextual Import/Backup**: Tombol Import/Export langsung di Blog, Portfolio, & Blueprint (tanpa harus ke Settings). Backup spesifik per modul.

---

## 🔍 7. SYNC STATUS & INTEGRATION GAPS (Audit 2026-02-11)

Berdasarkan audit terbaru, berikut adalah area yang telah tersinkronisasi dan distandarisasi:

| Modul                  | Status    | Keterangan                                                                                                                      |
| :--------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------ |
| **Admin Localization** | 🟢 SYNCED | Seluruh view utama Admin (Orders, Leads, Projects, Finance, Dashboard, Proposals, Vouchers) telah dilokalisasi ke B. Indonesia. |
| **Tailwind v4 Sync**   | 🟢 SYNCED | Syntax utilitas `!class` telah diperbaiki menjadi `class!` sesuai standar Tailwind v4 di seluruh view Admin.                    |
| **Bento UI 2.0**       | 🟢 SYNCED | Konsistensi rounding `rounded-[32px]!` dan border-based design diimplementasikan di seluruh Admin Card & Table.                 |
| **Pricing Master**     | 🟢 SYNCED | Agency Calculator mengambil data live dari `pricing_master`. Admin memiliki UI `GenericPricingList.vue` untuk mengelola data.   |
| **Standardized UI**    | 🟢 SYNCED | Admin Form & Content Views kini seragam menggunakan komponen Bento terpusat (`@kangjessy/ui`).                                  |
| **CRM Intelligence**   | 🟢 SYNCED | Modul `ClientDetail.vue` & `interactionsService` sudah aktif untuk tracking LTV Klien dan Profil Interaksi.                     |
| **AI Lead Scoring**    | 🟢 SYNCED | Tombol 🧠 di Leads Admin untuk analisa kualitas prospek otomatis menggunakan Gemini 1.5 Flash.                                  |
| **Client Experience**  | 🟢 SYNCED | `/portal` (Agency) sebagai Dashboard mandiri klien untuk tracking progress, cetak invoice, & konfirmasi bayar.                  |
| **The Blueprint**      | 🟢 SYNCED | Agency UI (`RoadmapView`) kini mengambil data live dari `blueprint_stages` via `blueprintService`. Legacy config telah dihapus. |
| **Proposal System**    | 🟢 SYNCED | Sistem Generator & Viewer mendukung pemisahan Terms (Payment, Copyright, Revision) dan UI Premium yang tersinkronisasi.         |
| **Global Settings**    | 🟢 SYNCED | `useBranding`, `usePaymentSettings`, & `useProfile` kini tersinkronisasi otomatis dengan tabel `system_settings` di Supabase.   |
| **Media Library**      | 🟢 SYNCED | Pengelola media multi-format (Cloud Drive) dengan sistem folder, filter tipe file, dan integrasi Sanity CMS.                    |

---

## 🎨 11. TECHNICAL AUDIT & HOTFIX LOG (2026-02-11)

Berikut adalah catatan perbaikan teknis mendalam untuk menjaga stabilitas ekosistem:

### Admin UI & Layout Polish

- **Full Localization**: Lokalisasi Bahasa Indonesia pada `Orders.vue`, `Leads.vue`, `Projects.vue`, `Finance.vue`, `Dashboard.vue`, `Proposals.vue`, dan `Vouchers.vue`.
- **Tailwind v4 Sync**: Syntax utilitas `!class` telah diperbaiki menjadi `class!` sesuai standar Tailwind v4 di seluruh view Admin.
- **Premium Aesthetics**: Memastikan penggunaan `rounded-[32px]!` pada `AdminCard` dan `Table Headers` untuk tampilan Bento UI 2.0 yang "alive" dan premium.
- **Content Management**: Table/Grid Switcher pada `Portfolio.vue` dan `Blog.vue` kini mendukung lokalisasi dan seleksi bulk yang lebih bersih.
- **CRM Intelligence**: Penambahan tabel `client_interactions` dan halaman Detail Klien untuk mencatat Log Meeting, LTV, dan WA Automator.
- **Proposal Refinement**: Pemisahan "Terms & Agreement" menjadi 3 pilar (Pembayaran, Hak Cipta, Revisi). Optimasi font investasi (downsize 4-6px), pembaharuan icon deliverables (`CheckCircle`), dan penajaman tipografi sub-header terms agar lebih otoritatif.
- **Media Library 2.0**: Implementasi sistem folder rekursif, filter berdasarkan tipe file (Images, Videos, Docs), pencarian aset real-time, dan manajemen Alt Text untuk optimasi SEO gambar. Penambahan **Mobile Drawer Navigation** dan **Touch-Friendly Grid Actions** untuk pengalaman pengelolaan aset yang mulus di smartphone. Terintegrasi langsung dengan Sanity Write Client.

---

## 🏗️ 12. DETAILED ORDER WORKFLOW (APPENDIX)

Isi di bawah ini adalah **Single Source of Truth** untuk alur pemesanan (Order Flow) di sistem KangJessy, yang harus disinkronkan antara Database dan Frontend Logic.

---

## 🗺️ TAHAP 1: SERVICE CATEGORY SELECTION

**Lokasi**: Halaman Depan / Menu Layanan (Agency)

1. **User Action**: Klien memilih Kategori Layanan Utama.
   - _Contoh_: "Web High-Conversion", "Business System", "Automation".
2. **Data yang Ditampilkan**:
   - Nama Layanan (e.g., "Web High-Conversion")
   - Deskripsi Singkat
   - **General Benefits**: Manfaat umum dari kategori layanan ini.

---

## 🔎 TAHAP 2: SERVICE DETAIL & PROJECT TYPE SELECTION

**Lokasi**: Halaman Detail Service (e.g., /services/web-app)

1. **User Action**: Klien mempelajari detil layanan dan memilih Tipe Proyek spesifik.
2. **Data yang Ditampilkan (Level Service)**:
   - Estimasi Harga (Range)
   - Kebijakan Umum (Revisi, Garansi)
   - **Service Workflow (Induk)**: Langkah kerja default untuk semua paket di kategori ini.
     - _Logika_: Ditampilkan jika Paket yang dipilih tidak punya workflow khusus.
3. **Data yang Ditampilkan (Level Project Type)**:
   - **Nama Paket**: (e.g., "Starter Landing Page", "Ecommerce Ecosystem")
   - **Base Price**: Harga dasar sebelum add-on.
   - **Spesifikasi**:
     - Max Pages (e.g., "1 Halaman Panjang")
     - Revisions (e.g., "2x Revisi Mayor")
     - Delivery Time (e.g., "3-7 Hari Kerja")
   - **Included Features**: Fitur yang SUDAH include valuenya (Gratis/Bundle).
     - _Logika_: Admin mencentang fitur mana saja yang masuk paket ini.
   - **Specific Workflow (Anak/Override)**: Langkah kerja KHUSUS paket ini.
     - _Logika_: Jika diisi, akan MENIMPA workflow dari Service Induk.
     - _Contoh_: Paket "Speed Optimization" punya langkah audit beda dengan "Landing Page".

---

## 🛍️ TAHAP 3: THE ORDER CONFIGURATOR

**Lokasi**: Halaman Order (e.g., /order?type=landing-page)

User melakukan kustomisasi "LEGO" berdasarkan Tipe Proyek yang dipilih.

### 3.1. Add-on Features (Fitur Tambahan)

- Klien memilih fitur tambahan yang **relevan** dengan Kategori Layanan.
- _Logika_:
  - **Included**: Fitur yang sudah masuk paket akan otomatis tercentang/disabled (Free).
  - **Relevant**: Fitur yang tag-nya cocok dengan Service Category (e.g., "SEO" relevant to "Web").
  - **Buyable**: Fitur yang belum include bisa dibeli terpisah (+Harga).
- _Data Source_: Tabel `pricing_master` (Category: `feature`).

### 3.2. Style Vibes (Nuansa Desain)

- Klien memilih "Rasa" visual dari proyek.
- _Pilihan_: "Modern Dark", "Minimalist Luxury", "Playful".
- _Data Source_: Tabel `pricing_master` (Category: `style_vibe`).

### 3.3. Project Deadline (Kecepatan)

- Klien memilih seberapa cepat proyek harus selesai.
- _Logika_: Menggunakan **Multiplier** terhadap total harga.
  - Normal (1x)
  - Priority (1.25x)
  - Express (1.5x)
- _Data Source_: Tabel `pricing_master` (Category: `project_deadline`).

---

## 📝 TAHAP 4: CLIENT INFORMATION & SUBMIT

**Lokasi**: Bottom Sheet / Form Akhir

1. **User Action**: Mengisi Nama, WhatsApp, dan Brief Singkat.
2. **System Action**:
   - Hitung Total Estimasi.
   - Generate Pesan WhatsApp.
   - Simpan data ke Tabel `leads` (Supabase).
   - Redirect ke WhatsApp Admin.

---

## ⚠️ DATA STRUCTURE IMPLICATIONS (ADMIN)

Agar Admin bisa mengontrol flow di atas, struktur database harus mengakomodasi:

1. **Hierarchy**: `Service Category` -> `Project Type`.
2. **Relations**:
   - `Features` harus memiliki tag `relevant_to` (array of service_ids).
   - `Project Types` harus memiliki field `included_features` (array of feature_ids).
3. **Deep Content**:
   - `Project Type` butuh field JSON untuk menyimpan "Detailed Benefits" (Title + Icon + List Items) agar tampilan Agency yang kaya tetap terjaga.
4. **Inheritance Logic**:
   - Kolom `workflow` di Project Type bersifat OPTIONAL.
   - Frontend Logic: `const finalWorkflow = project.workflow || service.workflow`.

---

## 🏗️ 5. TECHNICAL IMPLEMENTATION (SOT)

**Status per 2026-02-11**: System is now **Dynamic**.

### Data Source

- **Primary**: Supabase Table `pricing_master`.
- **Legacy/Fallback**: `orderConfig.ts` (Hanya digunakan jika koneksi DB putus total).

### Architecture

1. **Database (`pricing_master`)**:
   - Menyimpan seluruh data: Services, Project Types, Features, Styles, Deadlines.
   - Menggunakan kolom `metadata` (JSONB) untuk menyimpan relasi kompleks seperti `relevant_to` dan `included_features`.
   - Menggunakan kolom `category` untuk memisahkan jenis data (`service_type`, `project_type`, `feature`, `style_vibe`, `project_deadline`).

2. **Frontend Service (`pricingService.ts`)**:
   - Bertugas mengambil data dari DB dan melakukan transformasi (mapping) ke format UI.
   - Menangani _Graceful Degradation_ (return `[]` jika error, agar UI tidak crash).

3. **State Management (`useOrderCalculator.ts`)**:
   - Composable Vue yang menghubungkan UI dengan Service.
   - Melakukan kalkulasi harga secara realtime berdasarkan data yang ditarik dari DB.

4. **Admin Management**:
   - Menggunakan `GenericPricingList.vue` untuk CRUD semua tipe data pricing tanpa duplikasi kode.

---

### Global State & Identity Architecture

Untuk menjaga identitas agensi yang konsisten di seluruh modul, sistem menggunakan composable khusus yang memisahkan logika data dari UI:

1. **`useBranding`**: Mengelola logo dan nama agensi untuk Proposal, Invoice, dan Portal.
2. **`usePaymentSettings`**: Mengelola daftar rekening bank aktif. Mendukung multiple bank accounts.
3. **`useProfile`**: Mengelola identitas personal Admin (Super Admin).

> **Current Status**: Data kini tersimpan di tabel `system_settings` Supabase secara persisten, memungkinkan akses multi-device dan sinkronisasi data real-time untuk Proposal/Invoice Klien.

---

## 🏁 KONKLUSI AUDIT

Seluruh infrastruktur dasar (Pricing, Client Detail, AI Leads, Client Portal, & Global Settings) telah **SYNCED**. Fokus selanjutnya adalah perbaikan UI/UX pada modul Portofolio dan Blueprint serta pengisian konten riil oleh USER melalui `USER_TESTING.md`.
