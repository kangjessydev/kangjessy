# 📂 PRODUCT NOTES: PRICING LOGIC

Dokumen ini menjelaskan bagaimana harga di KangJessy Ecosystem dihitung secara otomatis. Perubahan pada angka di bawah ini akan mempengaruhi seluruh harga di website.

---

## 1. Paket Bundling (Project Types)

Harga paket tidak lagi ditentukan secara manual, melainkan dihitung berdasarkan total nilai fitur yang ada di dalamnya.

### Tiered Discount Logic

Jika `X` adalah total harga satuan fitur yang disertakan dalam paket:

| Total Market Value (X)       | Persentase Diskon | Margin Keuntungan |
| :--------------------------- | :---------------- | :---------------- |
| < Rp 3.000.000               | **20%**           | 60%               |
| Rp 3.000.000 - Rp 6.000.000  | **15%**           | 75%               |
| Rp 6.000.001 - Rp 10.000.000 | **12%**           | 85%               |
| > Rp 10.000.000              | **10%**           | 90%               |

> **Rumus**: `Base Price = X * (1 - Diskon)`

---

## 2. Fitur Tambahan (Add-ons)

Fitur tambahan bisa memiliki harga promo (Original Price vs Current Price).

- **Original Price**: Harga pasar/pembanding (dicoret).
- **Price**: Harga yang dibebankan ke klien.

---

## 3. Fitur Rakitan (Custom/Foundation)

Jika klien memilih "Hanya Tambahan Fitur" atau pondasi dasar tanpa paket:

- Tidak mendapatkan diskon bundling.
- Dikenakan **Surcharge Premium 10%** dari total harga fitur (untuk biaya kustomisasi).

---

## 4. Lokasi Konfigurasi Kode

Jika ingin mengubah persentase di atas secara teknis, file yang harus diedit adalah:

- `/apps/agency/src/data/config/order/settings.ts` (Bagian `pricingLogics`)
