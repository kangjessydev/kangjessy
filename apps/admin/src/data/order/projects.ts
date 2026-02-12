import { Zap as ZapIcon, Globe, Cpu, Rocket, Layout, ShoppingCart, BookOpen, Clock, Users, PieChart, Activity, Workflow, Bot, FileSearch, TrendingUp } from "lucide-vue-next";
import { defaultConfig } from "./settings";

export interface ProjectType {
  id: string;
  serviceId: string;
  name: string;
  icon: any;
  basePrice: number;
  originalPrice?: number;
  desc: string;
  features?: string[];
  deliverables?: string[];
  includedFeatureIds?: string[];
  detailedFeatures?: { title: string; icon?: string; items: string[] }[];
  maxPages?: string;
  revisions?: string;
  deliveryTime?: string;
  category: string;
  isFeatured?: boolean;
  isMicro?: boolean; // Flag for standalone small services
  badge?: string;
}

export const projectTypes: ProjectType[] = [
  // --- THE FOUNDATION (The "Core" System) ---
  {
    id: "foundation-web",
    serviceId: "web-app",
    name: "The Foundation (Web)",
    icon: Layout,
    basePrice: defaultConfig.foundationPrices.web,
    maxPages: "1 Halaman Utama",
    revisions: "2x Revisi Mayor",
    deliveryTime: "3 - 5 Hari Kerja",
    desc: "Instalasi CMS & Pondasi Digital. Cocok bagi Anda yang ingin merakit fitur sendiri sesuai kebutuhan.",
    features: [
      "CMS Installation (WP/Vue)",
      "Basic Admin Dashboard",
      "Standard Mobile Responsive",
      "Documentation & SOP Foundation"
    ],
    deliverables: [
      "1x Domain (.com/.id) Free 1 Tahun",
      "Cloud Server High-Performance (Shared)",
      "Akses Admin Panel (Full Control)",
      "Video Tutorial Penggunaan Web",
      "Garansi Bug & Error 30 Hari",
      "Backup Mingguan Otomatis"
    ],
    detailedFeatures: [
      {
        title: "Pondasi Infrastruktur",
        icon: "Database",
        items: [
          "CMS Setup: Kami siapkan dapur pengelolaan konten yang siap isi.",
          "Clean Architecture: Struktur folder dan database standar industri.",
          "Access Control: 1 Akun Admin Utama untuk kendali penuh."
        ]
      },
      {
        title: "Kesiapan Publik",
        icon: "Globe",
        items: [
          "Landing Page Standar: 1 Halaman utama dengan struktur siap saji.",
          "Mobile Ready: Web sudah nyaman diakses dari HP sejak hari pertama.",
          "SSL Ready: Keamanan dasar browser (HTTPS) terjamin."
        ]
      }
    ],
    category: "The Core",
    isFeatured: false,
    badge: "Most Affordable"
  },
  {
    id: "foundation-system",
    serviceId: "business-system",
    name: "The Foundation (System)",
    icon: Layout,
    basePrice: defaultConfig.foundationPrices.system,
    maxPages: "System Infrastructure",
    revisions: "3x Revisi Mayor",
    deliveryTime: "7 - 10 Hari Kerja",
    desc: "Kerangka dasar sistem manajemen bisnis. Siap untuk ditambahkan modul operasional spesifik.",
    features: [
      "Custom Dashboard Starter",
      "DB Schema Initialization",
      "User Authentication System",
      "Standard UI/UX Guidelines"
    ],
    detailedFeatures: [
      {
        title: "Core System Engine",
        icon: "Cpu",
        items: [
          "Authentication Ready: Sistem login dan logout aman untuk tim.",
          "Dashboard Shell: Layout dashboard admin yang bersih dan modern.",
          "Schema Design: Desain database awal yang siap menampung data besar."
        ]
      }
    ],
    category: "The Core",
  },

  // --- WEBSITE HIGH-CONVERSION (web-app) ---
  {
    id: "landing-page",
    serviceId: "web-app",
    name: "Starter Landing Page",
    icon: ZapIcon,
    basePrice: 2000000,
    originalPrice: 3500000,
    maxPages: "1 Halaman Panjang",
    revisions: "2x Revisi Mayor",
    deliveryTime: "3 - 7 Hari Kerja",
    desc: "Optimasi halaman tunggal untuk konversi maksimal. Sangat cocok untuk jualan produk fisik atau jasa spesifik.",
    features: [
      "High Conversion Sales Funnel",
      "Extreme Speed (< 2 detik)",
      "Ready for Ads Tracker (Pixel/GTM)",
      "Custom UI/UX Design",
      "WhatsApp & CTA Integration"
    ],
    deliverables: [
      "Single Page High-Conversion Design",
      "Copywriting Penjualan (Sales Copy)",
      "Setup Facebook Pixel / Google Tag",
      "Integrasi Tombol WhatsApp Rotator",
      "Domain & Hosting High Speed 1 Tahun",
      "Garansi Kecepatan < 2 Detik"
    ],
    includedFeatureIds: ['speed-tuning-99', 'analytics-heatmap'],
    category: "Web High-Conv",
    isFeatured: true,
    badge: "Best Value"
  },
  {
    id: "company-profile",
    serviceId: "web-app",
    name: "Premium Company Profile",
    icon: Layout,
    basePrice: 3000000,
    originalPrice: 4500000,
    maxPages: "3 - 5 Halaman",
    revisions: "3x Revisi Mayor",
    deliveryTime: "7 - 14 Hari Kerja",
    desc: "Website representasi bisnis yang memancarkan kredibilitas tinggi dengan sistem manajemen konten yang mudah.",
    features: [
      "Modern Multipage Architecture",
      "Advanced Branding & UX",
      "Easy CMS Dashboard Engine",
      "Professional Copywriting Ready",
      "Dynamic Services & Portfolio List"
    ],
    deliverables: [
      "Desain Eksklusif (Figma Prototype)",
      "Halaman: Home, About, Service, Contact",
      "Setup Email Bisnis (nama@domain.com)",
      "Google Business Profile Setup",
      "Training Admin via Zoom (1 Jam)",
      "Maintenance Teknis 3 Bulan"
    ],
    detailedFeatures: [
      {
        title: "Branding & Credibility",
        icon: "ShieldCheck",
        items: [
          "Professional Look: Desain yang mencerminkan kewibawaan perusahaan Anda.",
          "Clear Messaging: Copywriting yang disusun untuk meyakinkan calon mitra.",
          "Identity Integration: Logo, Font, dan warna sesuai Brand Guidelines Anda."
        ]
      },
      {
        title: "Content Management",
        icon: "Database",
        items: [
          "Easy CMS: Update portfolio dan layanan semudah posting status sosmed.",
          "Dynamic Portfolio: Gallery hasil kerja yang responsif dan elegan.",
          "Blog/News System: Bagikan kabar terbaru perusahaan setiap saat."
        ]
      }
    ],
    category: "Web High-Conv",
  },
  {
    id: "ecommerce",
    serviceId: "web-app",
    name: "Ecommerce Ecosystem",
    icon: ShoppingCart,
    basePrice: 7500000,
    originalPrice: 9500000,
    maxPages: "Unlimited Products",
    revisions: "5x Revisi Mayor",
    deliveryTime: "14 - 21 Hari Kerja",
    desc: "Sistem toko online modern yang stabil untuk memproses transaksi 24/7 tanpa perlu input manual.",
    features: [
      "Dynamic Product Management",
      "Automatic Payment Gateway",
      "Real-time Shipping Calculator",
      "Customer Order Tracking",
      "Inventory Sync & Automation"
    ],
    includedFeatureIds: ['payment-gateway-integ', 'wa-notif-system', 'seo-pro', 'analytics-heatmap'],
    detailedFeatures: [
      {
        title: "Sales Automation",
        icon: "Zap",
        items: [
          "Automated Payment: Terima pembayaran via VA, E-Wallet, & CC otomatis.",
          "Shipping Calc: Hitung ongkir JNE/J&T/Sicepat real-time di checkout.",
          "Invoice Gen: Pengiriman invoice otomatis ke email/WA pembeli."
        ]
      },
      {
        title: "Inventory & Growth",
        icon: "BarChart3",
        items: [
          "Stock Sync: Stok berkurang otomatis saat ada pesanan masuk.",
          "Sales Analytics: Pantau omzet mingguan langsung dari dashboard.",
          "Carts Recovery: Follow-up otomatis keranjang belanja yang ditinggalkan."
        ]
      }
    ],
    category: "Web High-Conv",
  },
  {
    id: "biolink-pro",
    serviceId: "web-app",
    name: "Bio-Link Pro (Luxury)",
    icon: TrendingUp,
    basePrice: 750000,
    originalPrice: 1250000,
    maxPages: "1 High-Speed Page",
    revisions: "1x Revisi Mayor",
    deliveryTime: "2 - 3 Hari Kerja",
    desc: "Bukan sekadar Linktree. Profil digital eksklusif dengan desain berkelas untuk influencer atau profesional.",
    features: [
      "Animation Interaction",
      "Extreme Performance",
      "Custom Domain Ready",
      "Lead Capture Form",
      "Social Integration"
    ],
    includedFeatureIds: ['speed-tuning-99'],
    category: "Web High-Conv",
    badge: "For Personal Brand"
  },
  {
    id: "property-showcase",
    serviceId: "web-app",
    name: "Property & Project Gallery",
    icon: Globe,
    basePrice: 4500000,
    originalPrice: 6000000,
    maxPages: "Dynamic Project List",
    revisions: "3x Revisi Mayor",
    deliveryTime: "10 - 14 Hari Kerja",
    desc: "Website pameran unit properti atau hasil desain interior yang menonjolkan visual high-res.",
    features: [
      "Masonry Grid Mirror",
      "Tech-Specs Dynamic List",
      "Location Map Integration",
      "Booking Unit Popup",
      "HD Video Background"
    ],
    category: "Web High-Conv",
  },
  {
    id: "marketplace",
    serviceId: "web-app",
    name: "Multi-Vendor Marketplace",
    icon: Users,
    basePrice: 12500000,
    originalPrice: 15000000,
    maxPages: "Platform Infrastructure",
    revisions: "6x Revisi Mayor",
    deliveryTime: "30 - 45 Hari Kerja",
    desc: "Platform jual beli yang menampung banyak penjual (seperti Shopee).",
    category: "Web High-Conv",
  },
  {
    id: "personal-branding",
    serviceId: "web-app",
    name: "Personal Branding Web",
    icon: TrendingUp,
    basePrice: 3500000,
    originalPrice: 4500000,
    maxPages: "3 - 5 Halaman",
    revisions: "3x Revisi Mayor",
    deliveryTime: "7 - 10 Hari Kerja",
    desc: "Website eksklusif untuk Expert, Trainer, atau Publik Figur.",
    category: "Web High-Conv",
  },
  {
    id: "sales-funnel",
    serviceId: "web-app",
    name: "Sales Funnel System",
    icon: Bot,
    basePrice: 6000000,
    originalPrice: 8000000,
    maxPages: "Marketing Funnel Flow",
    revisions: "4x Revisi Mayor",
    deliveryTime: "10 - 14 Hari Kerja",
    desc: "Workflow halaman web yang didesain untuk menaikkan average order value.",
    category: "Web High-Conv",
  },

  // --- SISTEM MANAJEMEN BISNIS (business-system) ---
  {
    id: "pms",
    serviceId: "business-system",
    name: "PMS (Project/Property)",
    icon: Activity,
    basePrice: 8500000,
    originalPrice: 12000000,
    maxPages: "Ops Infrastructure",
    revisions: "4x Revisi Mayor",
    deliveryTime: "21 - 30 Hari Kerja",
    desc: "Sistem manajemen proyek atau properti untuk kontrol operasional.",
    features: [
      "Resources Planning", "Task Dependencies", "Gantt Chart View", "Cost Tracking", "Team Collaboration"
    ],
    category: "Business System",
  },
  {
    id: "lms",
    serviceId: "business-system",
    name: "LMS Academy",
    icon: BookOpen,
    basePrice: 9500000,
    originalPrice: 15000000,
    maxPages: "Platform Infrastructure",
    revisions: "5x Revisi Mayor",
    deliveryTime: "21 - 30 Hari Kerja",
    desc: "Platform pembelajaran online/kursus digital dengan sistem ujian.",
    features: [
      "Course Builder", "Student Progress Tracker", "Quiz & Exam System", "Certificate Generation", "Discussion Forum"
    ],
    includedFeatureIds: ['payment-gateway-integ', 'wa-notif-system', 'acl-roles'],
    detailedFeatures: [
      {
        title: "Learning Experience",
        icon: "BookOpen",
        items: [
          "Video Streaming: Integrasi video materi yang aman dan tidak bisa didownload.",
          "Mobile Learning: Siswa bisa belajar nyaman dari mana saja.",
          "Quiz System: Ujian otomatis dengan hasil skor real-time."
        ]
      },
      {
        title: "Academic Business",
        icon: "Zap",
        items: [
          "Enrolment Automation: Akses materi terbuka otomatis setelah bayar.",
          "Certificate Gen: Generate sertifikat PDF otomatis saat lulus kursus.",
          "Student Analytics: Pantau progres belajar setiap siswa Anda."
        ]
      }
    ],
    category: "Business System",
  },
  {
    id: "business-dashboard",
    serviceId: "business-system",
    name: "Business Intelligence DB",
    icon: PieChart,
    basePrice: 7500000,
    originalPrice: 10000000,
    desc: "Visualisasi data bisnis Anda untuk pengambilan keputusan cepat.",
    features: [
      "Live Data Connection", "Visual Metric Widgets", "Real-time Refresh", "Export to PDF/Excel", "Mobile Optimized"
    ],
    category: "Business System",
    isFeatured: true,
    badge: "Recommended"
  },
  {
    id: "inventory",
    serviceId: "business-system",
    name: "Inventory & Stock Cloud",
    icon: Globe,
    basePrice: 9500000,
    originalPrice: 12500000,
    maxPages: "Multi-Warehouse Supp.",
    revisions: "3x Revisi Mayor",
    deliveryTime: "14 - 21 Hari Kerja",
    desc: "Sistem kontrol stok barang dan gudang terintegrasi cloud.",
    features: [
      "Stock Level Alerts", "Barcode/QR Support", "Supplier Management", "Multi-Warehouse", "Stock Movement Logs"
    ],
    category: "Business System",
  },
  {
    id: "pos-lite",
    serviceId: "business-system",
    name: "POS (Kasir) Web Lite",
    icon: ShoppingCart,
    basePrice: 5500000,
    originalPrice: 8000000,
    maxPages: "Retail Infrastructure",
    revisions: "2x Revisi Mayor",
    deliveryTime: "10 - 14 Hari Kerja",
    desc: "Sistem kasir berbasis web yang simpel dan cepat untuk toko fisik atau F&B.",
    features: [
      "Sales Input (Manual/Bar)",
      "Receipt Printing (Thermal)",
      "Daily Sales Report",
      "Payment Method Sync",
      "Customer Database"
    ],
    category: "Business System",
    badge: "Efficiency First"
  },
  {
    id: "accounting",
    serviceId: "business-system",
    name: "Sistem Akuntansi Kustom",
    icon: PieChart,
    basePrice: 12000000,
    originalPrice: 16000000,
    maxPages: "Finance Core System",
    revisions: "5x Revisi Mayor",
    deliveryTime: "30 - 45 Hari Kerja",
    desc: "Pencatatan keuangan, invoice, dan laporan laba rugi otomatis.",
    features: [
      "Auto-Journaling", "Balance Sheet Gen", "Tax Calculation", "Cash Flow Statement", "Multi-Currency Ready"
    ],
    category: "Business System",
  },
  {
    id: "appointment",
    serviceId: "business-system",
    name: "Appointment & Booking",
    icon: Clock,
    basePrice: 6500000,
    originalPrice: 8500000,
    desc: "Sistem scheduling untuk klinik, salon, atau konsultasi jasa.",
    features: [
      "Calendar Sync", "WA Automated Reminders", "Capacity Management", "Online Payment", "Rescheduling System"
    ],
    category: "Business System",
  },
  {
    id: "crm",
    serviceId: "business-system",
    name: "Custom CRM System",
    icon: Users,
    basePrice: 7500000,
    originalPrice: 11000000,
    maxPages: "Lead Management Cent.",
    revisions: "4x Revisi Mayor",
    deliveryTime: "14 - 21 Hari Kerja",
    desc: "Manajemen relasi pelanggan dan tracking performa sales.",
    features: [
      "Lead Pipeline View", "Interaction History", "Sales Forecasting", "Target Tracking", "Email/WA Integration"
    ],
    detailedFeatures: [
      {
        title: "Sales Pipeline",
        icon: "Activity",
        items: [
          "Visual Board: Lihat status prospek (Hot/Cold) dalam bentuk Kanban.",
          "Task Reminder: Ingatkan tim sales untuk follow-up via WA otomatis.",
          "Lead Scoring: Identifikasi klien mana yang paling potensial."
        ]
      },
      {
        title: "Relationship Intelligence",
        icon: "Users",
        items: [
          "Log Interaksi: Simpan riwayat chat dan email per klien selamanya.",
          "Performance Data: Pantau siapa sales dengan closing rate tertinggi.",
          "Data Privacy: Batasi staff hanya bisa melihat data lead miliknya."
        ]
      }
    ],
    category: "Business System",
  },
  {
    id: "hris",
    serviceId: "business-system",
    name: "HRIS & Payroll System",
    icon: Users,
    basePrice: 15000000,
    originalPrice: 20000000,
    maxPages: "HR & Payroll Engine",
    revisions: "6x Revisi Mayor",
    deliveryTime: "45 - 60 Hari Kerja",
    desc: "Sistem absensi, database karyawan, dan penggajian otomatis.",
    features: [
      "Employee Database", "GPS Attendance", "Payroll Calculation", "Leave Management", "Performance Review"
    ],
    deliverables: [
      "Sistem Web-Based (Bisa Diakses dari HP Exec)",
      "Database Karyawan Terpusat (Secure)",
      "Mesin Hitung Gaji Otomatis (PPH21/BPJS)",
      "Mobile App Karyawan (PWA)",
      "Training HR Admin & Finance (2 Sesi)",
      "Support Prioritas 6 Bulan"
    ],
    category: "Business System",
  },

  // --- ROBOT OTOMASI BISNIS (automation) ---
  {
    id: "ai-integration",
    serviceId: "automation",
    name: "Integrasi AI Kustom",
    icon: Cpu,
    basePrice: 5000000,
    originalPrice: 7500000,
    desc: "Menanamkan kecerdasan buatan Gemini/GPT ke sistem yang ada.",
    features: [
      "Custom Prompt Engineering", "Context Awareness", "Data Analysis", "Multi-Model Support", "Secure Key Management"
    ],
    category: "Robotic Automation",
  },
  {
    id: "chatbot-ai",
    serviceId: "automation",
    name: "Intelligent Chatbot AI",
    icon: Bot,
    basePrice: 3500000,
    originalPrice: 5500000,
    desc: "Asisten 24/7 di WA/Web yang dilatih dengan data bisnis Anda.",
    features: [
      "Knowledge Base (PDF)", "Natural Language Proc", "Human Handover", "Sentiment Analysis", "24/7 Availability"
    ],
    category: "Robotic Automation",
    badge: "Special Deal"
  },
  {
    id: "web-scraper",
    serviceId: "automation",
    name: "Automated Web Scraper",
    icon: FileSearch,
    basePrice: 3500000,
    originalPrice: 5000000,
    desc: "Robot pengumpul data harga pasar atau kompetitor secara berkala.",
    features: [
      "Anti-Bot Bypass", "Scheduled Crawling", "Data Export (CSV/API)", "Proxy Rotation", "Headless Browser"
    ],
    category: "Robotic Automation",
  },
  {
    id: "workflow-auto",
    serviceId: "automation",
    name: "Workflow Automation",
    icon: Workflow,
    basePrice: 2500000,
    originalPrice: 4000000,
    desc: "Sinkronisasi antar aplikasi (WA, Sheets, Email) tanpa input manual.",
    features: [
      "Multi-App Triggers", "Conditional Logic", "Error Handling", "Data Transformation", "Webhook Listener"
    ],
    category: "Robotic Automation",
    isFeatured: true,
    badge: "Efficiency Hero"
  },
  {
    id: "auto-reporting",
    serviceId: "automation",
    name: "Auto-Content Reporting",
    icon: Activity,
    basePrice: 2500000,
    originalPrice: 3500000,
    desc: "Robot yang kirim laporan performa bisnis rutin ke WhatsApp owner.",
    features: [
      "Scheduled Delivery", "Visual Charts Embedded", "Summary & Insights", "Multi-Channel (WA/Email)", "Dynamic Data Source"
    ],
    category: "Robotic Automation",
  },

  // --- SAAS ACCELERATOR (saas-accelerator) ---
  {
    id: "saas-mvp",
    serviceId: "saas-accelerator",
    name: "SaaS MVP Development",
    icon: Rocket,
    basePrice: 15000000,
    originalPrice: 20000000,
    desc: "Pembangunan produk SaaS versi pertama untuk validasi pasar.",
    features: [
      "Auth System", "Basic Subscription Flow", "Core Feature Impl", "Admin Dashboard", "Scalable Database"
    ],
    category: "SaaS Launch",
  },
  {
    id: "multi-tenant",
    serviceId: "saas-accelerator",
    name: "Multi-Tenant Platform",
    icon: Globe,
    basePrice: 25000000,
    originalPrice: 35000000,
    desc: "Platform skala besar dengan sistem satu database banyak klien.",
    features: [
      "Tenant Isolation", "Custom Subdomains", "Shared/Isolated DB", "Onboarding Flow", "Global Admin Panel"
    ],
    category: "SaaS Launch",
  },
  {
    id: "sub-dashboard",
    serviceId: "saas-accelerator",
    name: "Subscription Dashboard",
    icon: Layout,
    basePrice: 10000000,
    originalPrice: 15000000,
    desc: "Panel manajemen langganan dan integrasi billing recurring.",
    features: [
      "Tiered Plans Mgmt", "Usage Metering", "Invoicing History", "Payment Method Save", "Upgrade/Downgrade Logic"
    ],
    category: "SaaS Launch",
  },

  // --- MICRO-SERVICES (Standalone Small Tasks) ---
  {
    id: "speed-optimization",
    serviceId: "web-app",
    name: "Speed Optimization Pro",
    icon: ZapIcon,
    basePrice: 1500000,
    desc: "Optimasi performa website hingga skor 90+. Cocok untuk web yang lambat.",
    category: "Micro-Service",
    isMicro: true,
    deliveryTime: "2 - 3 Hari Kerja",
    includedFeatureIds: ["speed-tuning-99"]
  },
  {
    id: "analytics-setup",
    serviceId: "web-app",
    name: "Master Analytics Setup",
    icon: PieChart,
    basePrice: 1000000,
    desc: "Setup GTM, GA4, FB Pixel, dan Heatmap tool untuk tracking perilaku pengunjung.",
    category: "Micro-Service",
    isMicro: true,
    deliveryTime: "1 - 2 Hari Kerja",
    includedFeatureIds: ["analytics-heatmap"]
  },
  {
    id: "vps-setup",
    serviceId: "business-system",
    name: "VPS & Cloud Deployment",
    icon: Cpu,
    basePrice: 1500000,
    desc: "Setup server VPS, panel (Cyberpanel/aaPanel), SSL, dan migrasi website.",
    category: "Micro-Service",
    isMicro: true,
    deliveryTime: "2 - 4 Hari Kerja",
  },
  {
    id: "bug-fixer",
    serviceId: "business-system",
    name: "Ad-hoc Bug Fixer",
    icon: Activity,
    basePrice: 750000,
    desc: "Perbaikan error spesifik, perbaikan CSS, atau kendala teknis mendadak.",
    category: "The Core",
    isMicro: true,
    deliveryTime: "1 - 2 Hari Kerja",
  },

  // --- SPECIAL: FEATURE ONLY / MAINTENANCE ---
  {
    id: "custom-maintenance",
    serviceId: "web-app",
    name: "Custom Feature / Maintenance",
    icon: Workflow,
    basePrice: 0, // No foundation fee for maintenance
    desc: "Hanya ingin menambah fitur ke website yang sudah ada? Pilih ini dan rakit fitur Anda sendiri.",
    category: "The Core", 
  },
];
