import { projectTypes as pt, availableFeatures as af, serviceCategories as sc } from "../../../agency/src/data/landing/order";

// Map project types to include basePrice from their service categories
export const projectTypes = pt.map(p => {
  const category = sc.find(c => c.id === p.serviceId);
  return {
    ...p,
    basePrice: category ? category.price : 0
  };
});

export const availableFeatures = af;
export const serviceCategories = sc;

export const timelineOptions = [
  { id: "normal", label: "Santai (1-2 Bulan)", multiplier: 1, desc: "Timeline standar tanpa biaya tambahan" },
  { id: "standard", label: "Standar (3-4 Minggu)", multiplier: 1.1, desc: "Pengerjaan lebih cepat dengan prioritas normal" },
  { id: "express", label: "Express (1-2 Minggu)", multiplier: 1.35, desc: "Prioritas tinggi dengan tim dedicated" }
];

export const styleOptions = [
  { id: "minimalist", name: "Minimalist & Clean", desc: "Fokus pada ruang putih & tipografi tajam" },
  { id: "modern", name: "Modern & Tech", desc: "Dark mode, gradasi, & elemen kaca" },
  { id: "cheerful", name: "Cheerful & Vibrant", desc: "Warna cerah & ilustrasi yang hidup" },
  { id: "corporate", name: "Professional Corporate", desc: "Terlihat terpercaya, kaku & rapi" },
  { id: "custom", name: "Custom Style", desc: "Saya punya preferensi desain sendiri" }
];
