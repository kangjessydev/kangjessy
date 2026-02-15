export interface TimelineOption {
  id: string;
  label: string;
  multiplier: number;
  originalMultiplier?: number;
  desc: string;
}

export const timelineOptions: TimelineOption[] = [
  {
    id: "normal",
    label: "Normal Speed",
    multiplier: 1,
    desc: "Pengerjaan standar tanpa biaya tambahan.",
  },
  {
    id: "standard",
    label: "Priority Speed",
    multiplier: 1.1,
    desc: "Pengerjaan lebih cepat dengan prioritas antrean reguler.",
  },
  {
    id: "express",
    label: "Express Speed",
    multiplier: 1.35,
    desc: "Pengerjaan maraton. Tim didekasikan penuh untuk rilis cepat.",
  },
];

export const styleOptions = [
  { 
    id: "modern-dark", 
    name: "Modern Dark Tech", 
    desc: "Premium vibes dengan efek Glassmorphism, Deep Shadows, dan aksen neon tipis.",
    image: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=800&auto=format&fit=crop"
  },
  { 
    id: "minimalist-luxury", 
    name: "Minimalist Luxury", 
    desc: "Fokus pada tipografi high-end, banyak ruang putih, dan animasi elegan.",
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=800&auto=format&fit=crop"
  },
  { 
    id: "playful-vibrant", 
    name: "Playful & Vibrant", 
    desc: "Gaya hidup dengan warna cerah, ilustrasi kustom, dan elemen bersahabat.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop"
  },
  { 
    id: "professional-corporate", 
    name: "Professional Enterprise", 
    desc: "Rapi, stabil, dan mencerminkan rasa percaya untuk stabilitas bisnis.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
  },
];
