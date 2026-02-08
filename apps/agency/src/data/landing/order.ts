export interface ProjectType {
    id: string;
    serviceId: string;
    name: string;
    icon?: any;
    basePrice: number;
    desc: string;
    category: string;
}

export interface AvailableFeature {
    id: string;
    name: string;
    price: number;
    desc: string;
    relevantTo: string[];
}

export interface TimelineOption {
    id: string;
    label: string;
    multiplier: number;
    desc: string;
}

export interface StyleOption {
    id: string;
    name: string;
    desc: string;
}

export const projectTypes: ProjectType[] = [
  // WEB & LANDING
  {
    id: "landing-express",
    serviceId: "web-app",
    name: "Landing Page Express",
    basePrice: 3000000,
    desc: "Single page premium untuk konversi maksimal & marketing.",
    category: "Web & Landing",
  },
  {
    id: "company-profile",
    serviceId: "web-app",
    name: "Company Profile Pro",
    basePrice: 5000000,
    desc: "Website company profile modern untuk branding instansi/bisnis.",
    category: "Web & Landing",
  },
  // AUTOMATION
  {
    id: "wa-sheets-auto",
    serviceId: "automation",
    name: "WA & Sheets Sync",
    basePrice: 2000000,
    desc: "Robot otomatis buat catat data dari WhatsApp ke Google Sheets.",
    category: "Automation",
  },
  {
    id: "omnichannel-bot",
    serviceId: "automation",
    name: "Omnichannel Bot",
    basePrice: 4000000,
    desc: "Otomatisasi notifikasi & broadcast di berbagai platform chat.",
    category: "Automation",
  },
  // BUSINESS SYSTEM
  {
    id: "crm-lite",
    serviceId: "business-system",
    name: "Custom CRM Lite",
    basePrice: 7000000,
    desc: "Sistem manajemen data pelanggan, status order, dan database.",
    category: "Business System",
  },
  {
    id: "inventory-app",
    serviceId: "business-system",
    name: "Stock & Inventory",
    basePrice: 10000000,
    desc: "Sistem kontrol stok barang, gudang, dan laporan masuk-keluar.",
    category: "Business System",
  },
  // AI AGENT
  {
    id: "ai-support",
    serviceId: "ai-agent",
    name: "AI Customer Support",
    basePrice: 5000000,
    desc: "AI yang dilatih khusus dengan data bisnis Anda untuk menjawab chat pelanggan.",
    category: "AI Agent",
  },
  {
    id: "ai-automation-agent",
    serviceId: "ai-agent",
    name: "AI Doc Processor",
    basePrice: 8000000,
    desc: "AI untuk analisis dokumen kustom dan otomatisasi tugas kompleks.",
    category: "AI Agent",
  },
];

export const availableFeatures: AvailableFeature[] = [
  {
    id: "seo",
    name: "Advanced SEO pro",
    price: 1000000,
    desc: "Optimasi meta-tag, sitemap, dan Google Search Console.",
    relevantTo: ["web-app"],
  },
  {
    id: "blog",
    name: "Blog System",
    price: 1500000,
    desc: "Fitur posting artikel untuk konten marketing.",
    relevantTo: ["web-app"],
  },
  {
    id: "pwa",
    name: "PWA (Mobile Install)",
    price: 2000000,
    desc: "Website bisa diinstall di HP seperti aplikasi asli.",
    relevantTo: ["web-app"],
  },
  {
    id: "speed-tuning",
    name: "Extreme Speed Tuning",
    price: 1000000,
    desc: "Optimasi score Lighthouse hingga 95+.",
    relevantTo: ["web-app"],
  },
  {
    id: "multi-platform",
    name: "Multi-Platform Sync",
    price: 2500000,
    desc: "Hubungkan bot ke WA, Telegram, dan Email sekaligus.",
    relevantTo: ["automation"],
  },
  {
    id: "scheduler",
    name: "Custom Scheduler",
    price: 1500000,
    desc: "Kirim pesan otomatis terjadwal (Broadcast/Reminder).",
    relevantTo: ["automation"],
  },
  {
    id: "crm-sync",
    name: "CRM Auto-Sync",
    price: 2000000,
    desc: "Otomatis input data leads ke CRM pilihan Anda.",
    relevantTo: ["automation"],
  },
  {
    id: "inventory",
    name: "Inventory Module",
    price: 3500000,
    desc: "Sistem Manajemen Stok & Gudang real-time.",
    relevantTo: ["business-system"],
  },
  {
    id: "reporting",
    name: "Financial Reporting",
    price: 2500000,
    desc: "Laporan neraca, laba rugi, dan arus kas otomatis.",
    relevantTo: ["business-system"],
  },
  {
    id: "rag-pro",
    name: "Advanced RAG Master",
    price: 4000000,
    desc: "AI dilatih dengan ribuan dokumen kustom tanpa limit.",
    relevantTo: ["ai-agent"],
  },
  {
    id: "human-handoff",
    name: "Human-to-AI Handoff",
    price: 2000000,
    desc: "Alihkan diskusi ke Admin jika AI tidak bisa jawab.",
    relevantTo: ["ai-agent"],
  },
  {
    id: "maintenance",
    name: "Priority Care (3 Month)",
    price: 2000000,
    desc: "Bebas biaya perbaikan & update minor selama 3 bulan.",
    relevantTo: ["web-app", "business-system", "automation", "ai-agent"],
  },
];

export const timelineOptions: TimelineOption[] = [
  {
    id: "normal",
    label: "Santai (1-2 Bulan)",
    multiplier: 1,
    desc: "Timeline standar tanpa biaya tambahan",
  },
  {
    id: "standard",
    label: "Standar (3-4 Minggu)",
    multiplier: 1.1,
    desc: "Pengerjaan lebih cepat dengan prioritas normal",
  },
  {
    id: "express",
    label: "Express (1-2 Minggu)",
    multiplier: 1.35,
    desc: "Prioritas tinggi dengan tim dedicated",
  },
];

export const styleOptions: StyleOption[] = [
  {
    id: "minimalist",
    name: "Minimalist & Clean",
    desc: "Fokus pada ruang putih dan tipografi tajam",
  },
  {
    id: "modern",
    name: "Modern & Tech",
    desc: "Dark mode, gradasi, dan elemen kaca",
  },
  {
    id: "cheerful",
    name: "Cheerful & Vibrant",
    desc: "Warna cerah dan ilustrasi yang hidup",
  },
  {
    id: "corporate",
    name: "Professional Corporate",
    desc: "Terlihat terpercaya, kaku dan rapi",
  },
  {
    id: "custom",
    name: "Custom Style",
    desc: "Saya punya preferensi desain sendiri",
  },
];
