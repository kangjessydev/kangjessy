import { siteConfig } from "./siteConfig";

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

export const defaultConfig = {
  selectedType: "landing-page",
  selectedFeatures: [],
  selectedTimeline: "relaxed",
  storageKey: "project_order_draft",
  featurePremiumMultiplier: 1.1, // 10% premium for a la carte/foundation orders
  foundationPrices: {
    web: 1500000,    // <--- Ganti harga Foundation Web di sini
    system: 4500000  // <--- Ganti harga Foundation System di sini
  }
};


