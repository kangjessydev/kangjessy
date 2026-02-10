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

### 💾 Hybrid Storage Strategy

- **Supabase (Transactional)**: User, Leads, Orders, Transactions, Finance.
- **Sanity.io (Content)**: Blog, Projects Portfolio, Digital Assets Metadata.

---

## 💰 2. BUSINESS MODEL & PRICING LOGIC

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

---

## 🚀 6. CONSOLIDATED ROADMAP

### High Priority (ACTIVE)

1. **The Blueprint CMS Sync**:
   - Mapping field `description` & `action_label` agar UI Agency tidak pecah.
   - Hapus ketergantungan Agency pada `roadmapConfig.ts`.
2. **Pricing & Feature Database**:
   - Migrasi konstanta harga di `orderConfig` ke tabel database agar bisa dikontrol via Admin.
3. **Email/WA Templates**: Implementasi sistem notifikasi otomatis.

### Innovation Lab (FUTURE)

- **pnpm Workspaces (Monorepo)**: Migrasi seluruh repo ke apps/ dan packages/ untuk berbagi logic Supabase.
- **Shared UI Library**: Membuat package UI internal agar styling Agency dan Admin konsisten tanpa copy-paste code.
- **AI Lead Scoring**: LLM-based scoring untuk menilai kualitas brief klien (Hot/Cold).
- **Automated WhatsApp Follow-up**: Integrasi API WhatsApp untuk auto-reminder invoice/follow-up via Whacenter/Fonnte.
- **One-Click Repurposer**: Tombol "Viralize" untuk mengubah Blog Sanity menjadi Threads (X), Script TikTok, atau Newsletter.
- **Internal Snippet Manager**: Katalog kode internal di `kangjessy-docs` untuk mempercepat development project baru.
- **Affiliate & Subscription**: Sistem komisi partner dan paket maintenance (MaaS) bulanan otomatis.
- **Centralized Media Manager**: Menggunakan Sanity sebagai "Cloud Drive" pusat untuk seluruh branding asset ekosistem.

---

## 🔍 7. SYNC STATUS & INTEGRATION GAPS (Audit 2026-02-08)

Berdasarkan audit terbaru, berikut adalah area yang belum tersinkronisasi ("Kabel Belum Tersambung") antara Agency dan Admin:

| Modul              | Status     | Isu Utama                                                                                                                     |
| :----------------- | :--------- | :---------------------------------------------------------------------------------------------------------------------------- |
| **The Blueprint**  | 🟢 SYNCED  | Database Centralized (Supabase). Admin can manage Stages & Steps dynamically.                                                 |
| **Pricing Master** | 🟢 SYNCED  | Agency Calculator mengambil data live dari `pricing_master`. Admin memiliki UI `GenericPricingList.vue` untuk mengelola data. |
| **Voucher System** | 🟢 SYNCED  | Agency sudah mengambil data live dari tabel `coupons` di Supabase.                                                            |
| **Portfolio**      | 🟡 PARTIAL | Data tersinkron via Sanity, namun field "Deep Dive Metrics" seringkali tidak selaras antara editor dan viewer.                |

---

## 📂 8. PORTFOLIO STRATEGY

- **Narrative**: Case study menggunakan 3 fase (Problem → Strategy → Impact).
- **Metrics**: Tampilkan hasil nyata dalam angka/persentase.
- **Quality**: No Lorem Ipsum, High-res images (<300KB WebP).

---

## 🏗️ 9. MONOREPO MIGRATION BLUEPRINT (pnpm Workspaces)

Rencana migrasi ini dirancang untuk menyatukan 5 projek tanpa merusak fitur yang sudah ada. Monorepo akan menggunakan **pnpm Workspaces** sebagai "mesin" utamanya.

### 🗺️ Target Folder Structure

/kangjessy-ecosystem (Root)
├── apps/
│ ├── agency/ (kangjessy.com)
│ ├── admin/ (admin.kangjessy.com)
│ ├── store/ (store.kangjessy.com)
│ ├── tools/ (tools.kangjessy.com)
│ └── docs/ (docs.kangjessy.com)
├── packages/
│ ├── config/ (Shared types, constants, pricing)
│ ├── ui/ (Shared Tailwind v4 components)
│ └── database/ (Shared Supabase & Sanity clients)
├── package.json (Root dependencies)
└── pnpm-workspace.yaml

### 🛡️ Jaminan Keamanan (Safety Protocols)

1. **Zero Logic Change**: Migrasi ini hanya memindahkan lokasi folder dan cara instalasi _node_modules_. Logika _internal_ Vue/JS tidak akan disentuh.
2. **Incremental Migration**: Kita tidak pindah semua sekaligus. Kita mulai dari satu projek (misal: Admin), pastikan build sukses di Vercel, baru pindah projek berikutnya.
3. **Ghosting Node Modules**: pnpm akan memastikan setiap projek tetap memiliki akses ke library-nya sendiri tanpa konflik.

### 🧩 Bagaimana jika ada Backend Baru (Laravel, Go, dll)?

Monorepo ini bersifat **Polyglot** (Bisa banyak bahasa).

- Jika suatu saat ada projek Laravel, kita cukup tambah folder `apps/api-laravel` atau `backends/laravel`.
- Laravel tetap berjalan dengan `composer`, sementara Vue tetap dengan `pnpm`.
- Keuntungannya: Anda tetap bisa melihat kode API dan Frontend dalam satu jendela kerja. Sinkronisasi jadi jauh lebih mudah.

### 📅 Tahapan Eksekusi & Estimasi Durasi

Total estimasi pengerjaan: **~5-6 Jam** (dilakukan secara bertahap agar aman).

1. **Fase 1: Rooting (DONE)**  
   Inisialisasi `pnpm-workspace.yaml` di root dan pembersihan node_modules lama.
2. **Fase 2: Moving & Apps Refactor (DONE)**  
   Memindahkan ke-5 folder ke `apps/`, hapus `lockfiles` lokal, dan setup pnpm workspaces. Verifikasi build satu per satu.
3. **Fase 3: Shared Logic Linking (DONE)**  
   Ekstraksi logika Supabase/Sanity ke `packages/database` agar semua aplikasi memakai "pipa" tunggal.
4. **Fase 4: Deployment Sync & UI Unified (DONE)**  
   Update setting "Root Directory" di Vercel Dashboard dan migrasi komponen core ke `@kangjessy/ui`. Seluruh aplikasi (`agency`, `admin`) kini menggunakan repositori komponen tunggal.
5. **Fase 5: Admin Refactoring & Standardization (PENDING)**
   - **Tailwind v4 Upgrade**: Menyamakan stack CSS Admin dengan Agency (tanpa config JS).
   - **Config Cleanup**: Menghapus `tailwind.config.js` dan `postcss.config.js` dari Admin.
   - **Unified Style**: Memastikan Admin menggunakan `@kangjessy/ui` secara native via `@source`.

---

## 👥 10. ADMIN EXPANSION BRAINSTORM (CRM & OPS)

Dokumen ini berisi ide-ide fitur strategis untuk pengembangan `kangjessy-admin` agar menjadi pusat operasi bisnis yang sangat efisien dan cerdas.

### 10.1 CRM (Customer Relationship Management) - "Otak Relasi"

- **Interaction Logs**: Riwayat komunikasi per klien (WA, Call, Meeting notes).
- **Client Segmentation**: Labeling otomatis (`VIP`, `Whale`, `Prospect`).
- **Lifetime Value (LTV)**: Tracking total pendapatan dari awal hingga kini per klien.
- **Follow-up Reminders**: Notifikasi otomatis untuk leads yang "dingin".
- **Client Vault**: Penyimpanan dokumen legal (KTP/NPWP/Kontrak) terpusat.

### 10.2 Digital Store Management

- **Product Library**: Manajemen aset digital (Source Code, E-Book).
- **License Generator**: Pembuatan kode lisensi unik otomatis setelah pembelian.
- **Sales Analytics**: Performa penjualan produk terbaik (Best Sellers).

### 10.3 Finance & Reporting Engine

- **One-Click Invoice**: Export data order ke PDF Invoice premium.
- **Profitability Audit**: Analisis untung-rugi per proyek secara real-time.
- **Tax & Export**: Rekap data untuk pajak dan export ke Excel.

### 10.4 Internal Agency Ops

- **RBAC (Role Access Control)**: Pembatasan akses tim (Admin, PM, Finance).
- **Workload Tracker**: Monitoring beban kerja tim internal.
- **Internal Knowledge Base**: Repository SOP dan snippet kode agensi.

---

**Last Updated**: 2026-02-10
**Status**: PRICE MASTER SYNCED | BLUEPRINT SYNCED

---

## 🏗️ 11. DETAILED ORDER WORKFLOW (APPENDIX)

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

**Status per 2026-02-10**: System is now **Dynamic**.

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
