# 🐛 BUG TRACKER & TESTING FEEDBACK

Gunakan file ini untuk mencatat temuan bug, glitch, atau ketidaksesuaian selama proses Manual Testing.

## 🔴 CRITICAL (Blokir Operasional)

_Bug yang membuat fitur utama tidak bisa digunakan._

| ID      | Temuan                                                                        | Dampak                                                                              | Status   |
| :------ | :---------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- | :------- |
| PRO-001 | Gagal Sinkronisasi Proposal (ID: ...aede6)                                    | Proposal tidak bisa dibuka                                                          | ✅ FIXED |
| PRO-004 | Data Terms tidak tersinkronisasi di halaman View                              | Terms muncul kosong saat di-view                                                    | ✅ FIXED |
| PRO-002 | UI Pilih Project Type sulit (Dropdown)                                        | UX buruk, ganti ke Bento Grid                                                       | ✅ FIXED |
| PRO-003 | Fitur Tambahan tidak reset saat ganti Tipe Proyek                             | Data fitur jadi tidak valid                                                         | ✅ FIXED |
| SET-001 | Info Bank/Payment masih LocalStorage                                          | Data hilang saat buka di device berbeda                                             | ✅ FIXED |
| MED-001 | Galeri Media: Upload Sukses tapi Gambar Tidak Muncul                          | Aset tidak tersimpan/terupdate                                                      | ✅ FIXED |
| MED-002 | Galeri Media: Overlay Aksi Mobile membuat gambar blur                         | UI/UX buruk di HP, gambar jadi tidak jelas                                          | ✅ FIXED |
| MED-003 | Tailwind v4: Unknown utility class `bg-white` @apply                          | Vite Build Error, CSS Directive missing                                             | ✅ FIXED |
| PTF-001 | Portfolio: Bidang & Tech Stack **TIDAK BISA DI-EDIT**                         | Data terkunci, tidak bisa update                                                    | ✅ FIXED |
| GLO-001 | Pengaturan Global (Branding/Payment) belum Sync DB                            | Data Admin hanya tersimpan di Localhost/LocalStorage                                | ✅ FIXED |
| AUD-001 | `GenericPricingList.vue`: Missing import `PageHeader` & `AdminCard`           | Halaman Master Data (fitur, project types, deadlines, services) broken/error render | ✅ FIXED |
| AUD-002 | `Orders.vue` & `Projects.vue`: `removeEventListener` pakai anonymous function | Memory leak — listener numpuk, tidak pernah ter-remove                              | ✅ FIXED |

## 🟡 MEDIUM (Glitch / UI Issue)

_Masalah visual atau fungsionalitas yang tidak menghalangi alur utama._

| ID      | Temuan                                                                       | Lokasi                                                         | Status   |
| :------ | :--------------------------------------------------------------------------- | :------------------------------------------------------------- | :------- |
| BP-001  | Tabel Blueprint hilang style (Flat/Tidak Standard)                           | Admin > The Blueprint                                          | ✅ FIXED |
| BP-002  | Modul Edit Stage: Layout Panjang & Tidak Close saat Click Outside            | Admin > Blueprint > Edit Stage                                 | ✅ FIXED |
| BP-003  | Manage Step: Tombol Delete & Reorder (Arrow) tidak berfungsi                 | Admin > Blueprint > Manage Step                                | ✅ FIXED |
| PTF-002 | Portfolio: Delete Bidang/Stack masih pakai native alert                      | Admin > Portfolio                                              | ✅ FIXED |
| PRO-005 | Judul Terms terlalu kecil & Icon missing di View                             | UX/Visual Otoritatif kurang                                    | ✅ FIXED |
| PRO-006 | Ukuran font Harga Investasi terlalu dominan (Downsize req)                   | Visual balance terganggu                                       | ✅ FIXED |
| PTF-003 | Portfolio: Modal Add Area/Stack belum standar (Blur sidebar)                 | Admin > Portfolio                                              | ✅ FIXED |
| AUD-003 | `GenericPricingList.vue`: Route `/services/style-vibes` salah match category | Style Vibes menampilkan data `service_type` bukan `style_vibe` | ✅ FIXED |
| AUD-004 | `Leads.vue`: Toast variant `"danger"` invalid (harus `"error"`)              | Toast AI scoring error tanpa styling yang benar                | ✅ FIXED |
| AUD-005 | `GenericPricingList.vue`: Masih pakai native `alert()` saat gagal delete     | UX inkonsisten vs seluruh projek yg pakai Toast                | ✅ FIXED |
| AUD-006 | `Media.vue`, `Leads.vue`, `ClientDetail.vue`: Masih pakai native `confirm()` | UX inkonsisten, seharusnya pakai `ConfirmModal`                | ✅ FIXED |
| AUD-007 | `Leads.vue`: `scoreLead()` fetch ke `/api/score-lead` yang tidak exist       | AI scoring selalu gagal, endpoint tidak pernah di-setup        | ✅ FIXED |

## 🔵 LOW / SUGGESTION (Peningkatan)

_Saran perbaikan untuk UX yang lebih baik._

| ID      | Deskripsi                                                                                  | Kategori      | Status   |
| :------ | :----------------------------------------------------------------------------------------- | :------------ | :------- |
| AUD-008 | `ordersService.ts` jadi dead code — tidak pernah dipakai, Orders pakai `clientsService`    | Dead Code     | 🆕 NEW   |
| AUD-009 | `GenericPricingList.vue`: Import `DollarSign` tidak dipakai di template                    | Unused Import | ✅ FIXED |
| AUD-010 | `useExport.ts` & `useImport.ts`: Global ref di luar function — state shared antar komponen | Code Smell    | 🆕 NEW   |
| AUD-011 | `PortfolioAreas.vue`: Toast tidak auto-close (missing `setTimeout`)                        | UX            | ✅ FIXED |
| AUD-012 | `Projects.vue`: Pakai `ref<any[]>` padahal sudah ada type `Project[]`                      | Type Safety   | 🆕 NEW   |

---

### Cara Melaporkan:

1. Masukkan ke tabel di atas.
2. Berikan deskripsi langkah reproduksi jika bug-nya kompleks.
3. Tandai status: `🆕 NEW`, `⏳ FIXING`, `✅ FIXED`.
