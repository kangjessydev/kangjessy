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

| Modul              | Status      | Isu Utama                                                                                                      |
| :----------------- | :---------- | :------------------------------------------------------------------------------------------------------------- |
| **The Blueprint**  | 🔴 UNSYNCED | Agency masih pakai data lokal (`roadmapConfig.ts`). Struktur field berbeda (camelCase vs snake_case).          |
| **Pricing Master** | 🔴 UNSYNCED | Harga fitur & paket masih hardcoded di kode masing-masing. Belum ada tabel `features` di database.             |
| **Voucher System** | 🟢 SYNCED   | Agency sudah mengambil data live dari tabel `coupons` di Supabase.                                             |
| **Portfolio**      | 🟡 PARTIAL  | Data tersinkron via Sanity, namun field "Deep Dive Metrics" seringkali tidak selaras antara editor dan viewer. |

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

**Last Updated**: 2026-02-08
**Status**: MASTER CENTRALIZED | ADMIN REFACTOR PENDING
