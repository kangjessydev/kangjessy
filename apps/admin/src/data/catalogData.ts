import { projectTypes as pt, availableFeatures as af, serviceCategories as sc } from "../../../agency/src/data/landing/order";
import { pricingConfig } from "../../../agency/src/data/config/order/settings";

// Map project types to include basePrice calculated exactly like the Agency (using features market value & tiered discounts)
export const projectTypes = pt.map(p => {
  const includedIds = p.features || [];
  const marketValue = includedIds.reduce((acc, id) => {
    const cleanId = String(id).trim().toLowerCase();
    const feat = af.find(f => f.id.trim().toLowerCase() === cleanId);
    
    // Fallback for starter-pack if not found in list
    if (!feat && cleanId === 'starter-pack') {
      return acc + 1000000; 
    }
    return acc + (feat?.price || 0);
  }, 0);

  let basePrice = marketValue;
  if (p.id !== 'fitur-rakitan') {
    const tier = pricingConfig.tieredDiscounts.find(t => marketValue >= t.threshold);
    const discount = tier ? tier.discount : 0;
    basePrice = marketValue * (1 - discount);
  }

  // Fallback for empty packages (prevents Rp 0 for valid packages)
  if (basePrice === 0 && p.id !== 'fitur-rakitan') {
    basePrice = marketValue;
  }

  // Also maintain fallback to category price just in case
  const category = sc.find(c => c.id === p.serviceId);
  if (basePrice === 0 && category && p.id !== 'fitur-rakitan') {
    basePrice = category.price;
  }

  return {
    ...p,
    basePrice: Math.round(basePrice),
    originalPrice: Math.round(marketValue)
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
