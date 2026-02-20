import { siteConfig } from "@/data/config/siteConfig";

// WhatsApp Configuration
export const whatsappConfig = {
  phoneNumber: siteConfig.whatsapp.number,
  messageTemplate: (data: any) => {
    return (
      `Halo Kang Jessy! Saya ingin konsultasi/order perihal proyek:\n\n` +
      `Tipe Proyek: ${data.projectType}\n` +
      `Fitur Tambahan: ${data.features || "Hanya Standar"}\n` +
      `Timeline: ${data.timeline}\n` +
      `Estimasi Budget: Rp ${data.price}\n\n` +
      `Nama: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Perusahaan: ${data.company || "-"}\n\n` +
      `Brief Singkat:\n${data.brief}`
    );
  },
};

// Form Validation Rules
export const formValidation = {
  name: {
    required: true,
    minLength: 3,
    message: "Nama minimal 3 karakter",
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Format email tidak valid",
  },
  phone: {
    required: true,
    pattern: /^(\+62|62|0)[0-9]{9,12}$/,
    message: "Format nomor WhatsApp tidak valid",
  },
  brief: {
    required: true,
    minLength: 20,
    message: "Brief minimal 20 karakter",
  },
};

export const pricingConfig = {
  tieredDiscounts: [
    { threshold: 10000000, discount: 0.10 }, // > 10jt = 10%
    { threshold: 6000000, discount: 0.12 },  // > 6jt = 12%
    { threshold: 3000000, discount: 0.15 },  // > 3jt = 15%
    { threshold: 0, discount: 0.20 }         // < 3jt = 20%
  ]
};

/** Bulatkan harga KE BAWAH ke kelipatan 5.000 terdekat.
 * Selisih (0–4.999) dianggap hemat untuk klien → masuk badge "Hemat".
 * Misal: 608.000 → 605.000 | 668.500 → 665.000 | 760.000 → 760.000 */
export const roundPrice = (price: number): number => {
  return Math.floor(price / 5000) * 5000;
};

/** Biaya overhead default per fitur (audit + integrasi + deploy).
 * Berlaku untuk maintenance/fitur-rakitan (tanpa Starter Pack).
 * Override per-fitur dengan field setupFee di availableFeatures.
 * Ubah ke 0 jika tidak ingin ada overhead sama sekali. */
export const DEFAULT_SETUP_FEE = 75000; // Rp 75.000 per fitur

export const defaultConfig = {
  selectedType: "landing-page",
  selectedFeatures: [],
  selectedTimeline: "relaxed",
  storageKey: "project_order_draft"
};
