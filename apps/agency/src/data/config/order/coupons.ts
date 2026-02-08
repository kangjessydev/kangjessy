/**
 * KONFIGURASI VOUCHER / KUPON DISKON
 * File ini digunakan untuk mengatur semua promo yang aktif di halaman Order.
 */

// 1. Definisikan Tipe Voucher supaya tidak salah ketik (Percent: %, Fixed: Potongan Harga Tetap)
export const COUPON_TYPES = {
  PERCENT: "percent" as const,
  FIXED: "fixed" as const,
};

export interface Coupon {
  code: string;       // Kode voucher yang diketik user (misal: PROMO2026)
  label: string;      // Nama Voucher yang tampil di UI
  desc: string;       // Deskripsi singkat voucher
  type: "percent" | "fixed";
  value: number;      // Nominal potongan (misal: 10 untuk 10%, atau 500000 untuk Rp 500rb)
  isActive: boolean;  // Saklar utama (true = Aktif, false = Nonaktifkan permanen)
  expiryDate: string; // Batas waktu (YYYY-MM-DD). Lewat tanggal ini voucher otomatis hilang meskipun isActive: true.
  minOrder?: number;  // Syarat minimal belanja sebelum diskon (Optional)
  maxDiscount?: number; // Batas maksimal diskon (Hanya berlaku jika type: "percent") (Optional)
  
  /**
   * PANDUAN PEMBATASAN (RESTRICTIONS)
   * 
   * 1. isGlobal: true  
   *    -> Voucher paling sakti. Abaikan semua list di bawah, berlaku untuk apa saja.
   * 
   * 2. allowedProjectIds: [] (Kosong atau tidak diisi)
   *    -> Otomatis berlaku untuk SEMUA TIPE PROJEK.
   * 
   * 3. allowedFeatureIds: [] (Kosong atau tidak diisi)
   *    -> Otomatis berlaku untuk SEMUA FITUR TAMBAHAN (tidak wajib pilih fitur tertentu).
   * 
   * CONTOH KOMBINASI:
   * - Ingin "Semua Tipe Projek" tapi "Hanya Fitur SEO"? 
   *   -> allowedProjectIds: [], allowedFeatureIds: ['seo-pro']
   * 
   * - Ingin "Hanya Landing Page" tapi "Bebas Fitur Apa Saja"?
   *   -> allowedProjectIds: ['landing-page'], allowedFeatureIds: []
   */
  isGlobal?: boolean;
  allowedProjectIds?: string[];  
  allowedFeatureIds?: string[];  
  allowedTimelineIds?: string[]; 
  
  terms?: string; 
}

export const COUPONS: Coupon[] = [
  { 
    code: "FOUNDERCLUB", 
    label: "Founder Discount",
    desc: "Diskon 15% khusus untuk pengerjaan SaaS MVP.",
    type: COUPON_TYPES.PERCENT, 
    value: 15, 
    isActive: true,
    expiryDate: "2026-12-31",
    minOrder: 10000000,
    maxDiscount: 5000000,
    allowedProjectIds: ["saas-mvp", "multi-tenant"], 
    isGlobal: false,
    terms: "Khusus untuk kategori SaaS Product Accelerator."
  },
  { 
    code: "WEBOONLY", 
    label: "Web Enthusiast",
    desc: "Diskon 10% untuk semua tipe website (tanpa syarat fitur).",
    type: COUPON_TYPES.PERCENT, 
    value: 10, 
    isActive: true,
    expiryDate: "2026-06-30",
    // KOSONGKAN allowedProjectIds jika ingin berlaku untuk SEMUA tipe website
    allowedProjectIds: ["landing-page", "company-profile", "ecommerce"], // Contoh dibatasi
    allowedFeatureIds: [], // KOSONG = Berlaku untuk fitur tambahan apa saja
    isGlobal: false,
    terms: "Hanya berlaku untuk layanan Website High-Conversion."
  },
  { 
    code: "KANGJESSYPROMO", 
    label: "Promo Global",
    desc: "Diskon Rp 200rb untuk apa saja!",
    type: COUPON_TYPES.FIXED, 
    value: 200000, 
    isActive: true,
    expiryDate: "2026-12-31",
    isGlobal: true, // TRUE = Langsung semua, tidak perlu pusing isi list ID
    terms: "Berlaku untuk semua tipe proyek dan semua fitur."
  },
];
