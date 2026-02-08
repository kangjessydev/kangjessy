import { 
  Languages, 
  Zap, 
  BarChart3, 
  Wallet, 
  MessageSquare, 
  ShieldCheck, 
  Database, 
  Search, 
  Cpu, 
  Layout, 
  ScanLine, 
  History, 
  Repeat, 
  Server, 
  Settings2, 
  Headphones, 
  Users 
} from 'lucide-vue-next';

export interface Feature {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  desc: string;
  relevantTo: string[];
  icon?: any; // For carousel
  deliveryTime?: string; // For carousel transparency
  serviceName?: string; // For labeling
}

export const availableFeatures: Feature[] = [
  // --- WEBSITE HIGH-CONVERSION ---
  {
    id: "seo-pro",
    name: "Advanced SEO Infrastructure",
    price: 1500000,
    desc: "Optimasi teknis, sitemap otomatis, dan integrasi Search Console untuk ranking Google.",
    relevantTo: ["web-app"],
    icon: Search,
    deliveryTime: "3-5 Hari",
    serviceName: "Website"
  },
  {
    id: "multilang-i18n",
    name: "Multi-Language Support (i18n)",
    price: 2500000,
    desc: "Sistem alih bahasa dinamis (English/Indonesian) untuk jangkauan pasar internasional.",
    relevantTo: ["web-app", "saas-accelerator"],
    icon: Languages,
    deliveryTime: "4-7 Hari",
    serviceName: "Website"
  },
  {
    id: "speed-tuning-99",
    name: "Extreme Speed Performance",
    price: 1500000,
    desc: "Optimasi skor Lighthouse hingga 95-100% untuk user experience yang super kilat.",
    relevantTo: ["web-app"],
    icon: Zap,
    deliveryTime: "2-4 Hari",
    serviceName: "Website"
  },
  {
    id: "analytics-heatmap",
    name: "Marketing Analytics & Heatmap",
    price: 1000000,
    desc: "Integrasi FB Pixel, Google Analytics, & Hotjar untuk melihat perilaku scroll pengunjung.",
    relevantTo: ["web-app"],
    icon: BarChart3,
    deliveryTime: "1-2 Hari",
    serviceName: "Website"
  },

  // --- BUSINESS SYSTEM ---
  {
    id: "payment-gateway-integ",
    name: "Automated Payment Gateway",
    price: 3000000,
    desc: "Integrasi Midtrans/Xendit untuk terima pembayaran otomatis via VA, E-Wallet, & Credit Card.",
    relevantTo: ["business-system", "saas-accelerator", "web-app"],
    icon: Wallet,
    deliveryTime: "3-5 Hari",
    serviceName: "System"
  },
  {
    id: "wa-notif-system",
    name: "WhatsApp API Notification",
    price: 2000000,
    desc: "Kirim invoice, status order, atau pengingat hutang secara otomatis ke WA pelanggan.",
    relevantTo: ["business-system", "automation"],
    icon: MessageSquare,
    deliveryTime: "2-3 Hari",
    serviceName: "System"
  },
  {
    id: "acl-roles",
    name: "Advanced Role Management",
    price: 1500000,
    desc: "Pengaturan hak akses bertingkat (Owner, Manager, Staff, Finance) untuk keamanan data.",
    relevantTo: ["business-system", "saas-accelerator"],
    icon: ShieldCheck,
    deliveryTime: "3-5 Hari",
    serviceName: "System"
  },
  {
    id: "cloud-backup",
    name: "Automated Cloud Backup",
    price: 1200000,
    desc: "Backup database harian ke cloud storage (S3/Drive) untuk keamanan data jangka panjang.",
    relevantTo: ["business-system"],
    icon: Database,
    deliveryTime: "1-2 Hari",
    serviceName: "System"
  },

  // --- AUTOMATION & AI ---
  {
    id: "rag-knowledge",
    name: "Custom AI Knowledge Base",
    price: 4500000,
    desc: "Melatih AI Agent menggunakan data internal perusahaan (PDF, Docx, FAQ) agar cerdas & akurat.",
    relevantTo: ["automation"],
    icon: Cpu,
    deliveryTime: "7-14 Hari",
    serviceName: "AI & Auto"
  },
  {
    id: "multi-platform-bot",
    name: "Multi-Platform Bot Sync",
    price: 3500000,
    desc: "Satu engine bot yang terhubung ke WhatsApp, Telegram, dan Live Chat Website sekaligus.",
    relevantTo: ["automation"],
    icon: Layout,
    deliveryTime: "5-10 Hari",
    serviceName: "AI & Auto"
  },
  {
    id: "ocr-vision",
    name: "AI Vision (OCR) Reader",
    price: 3000000,
    desc: "Kemampuan AI untuk membaca foto KTP, struk belanja, atau dokumen fisik secara otomatis.",
    relevantTo: ["automation"],
    icon: ScanLine,
    deliveryTime: "5-7 Hari",
    serviceName: "AI & Auto"
  },
  {
    id: "persistence-memory",
    name: "AI Long-term Memory",
    price: 1500000,
    desc: "AI yang mampu mengingat riwayat percakapan user terdahulu agar interaksi lebih personal.",
    relevantTo: ["automation"],
    icon: History,
    deliveryTime: "3-5 Hari",
    serviceName: "AI & Auto"
  },

  // --- SAAS ACCELERATOR ---
  {
    id: "recurring-billing",
    name: "Subscription Management",
    price: 5000000,
    desc: "Sistem tagihan berulang harian/bulanan otomatis (Recurring Billing) untuk model bisnis SaaS.",
    relevantTo: ["saas-accelerator"],
    icon: Repeat,
    deliveryTime: "7-14 Hari",
    serviceName: "SaaS"
  },
  {
    id: "multi-tenant-db",
    name: "Isolated Multi-Tenant DB",
    price: 7000000,
    desc: "Arsitektur database terpisah antar klien untuk keamanan data level enterprise.",
    relevantTo: ["saas-accelerator"],
    icon: Server,
    deliveryTime: "10-21 Hari",
    serviceName: "SaaS"
  },
  {
    id: "white-label",
    name: "White-Labeling Engine",
    price: 8000000,
    desc: "Fitur agar klien Anda bisa menggunakan logo & domain mereka sendiri di platform Anda.",
    relevantTo: ["saas-accelerator"],
    icon: Settings2,
    deliveryTime: "7-14 Hari",
    serviceName: "SaaS"
  },

  // --- GLOBAL ---
  {
    id: "priority-launch",
    name: "Priority Support (12 Months)",
    price: 6000000,
    desc: "Dukungan teknis prioritas via WhatsApp Group & update keamanan rutin selama 1 tahun.",
    relevantTo: ["web-app", "business-system", "automation", "saas-accelerator"],
    icon: Headphones,
    deliveryTime: "1 Tahun",
    serviceName: "Support"
  },
  {
    id: "staff-training",
    name: "Exclusive Staff Training",
    price: 1500000,
    desc: "Sesi training intensif (On-site/Zoom) untuk memastikan tim Anda mahir menggunakan sistem.",
    relevantTo: ["business-system", "automation", "saas-accelerator"],
    icon: Users,
    deliveryTime: "1-2 Hari",
    serviceName: "Support"
  },
];
