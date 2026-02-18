export interface ProjectType {
    id: string;
    serviceId: string;
    name: string;
    icon?: any;
    basePrice: number;
    desc: string;
    category: string;
    features?: string[];
    detailedFeatures?: { title: string; icon?: string; items: string[] }[];
    process?: { title: string; description: string }[];
    deliveryTime?: string;
    maxPages?: string;
    revisions?: string;
    faq?: { question: string; answer: string }[];
    technologies?: string[];
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
    serviceId: "website-high-conversion",
    name: "Landing Page Express",
    basePrice: 3000000,
    desc: "Single page premium untuk konversi maksimal & marketing.",
    category: "Web & Landing",
    deliveryTime: "1-2 Weeks",
    maxPages: "1 Page",
    revisions: "2x Minor, 1x Mayor",
    features: ["Conversion Focused", "Mobile Responsive", "Social Media Integration", "Fast Performance", "Basic SEO"],
    detailedFeatures: [
      { 
        title: "High Conversion Design", 
        icon: "Zap", 
        items: ["Psychology-based layout for better conversion", "Clear Call-to-Action (CTA) placement", "Mobile-first responsive approach"] 
      },
      { 
        title: "Performance Optimized", 
        icon: "Rocket", 
        items: ["Core Web Vitals ready (Green score)", "Automated lazy loading for assets", "Lightweight code for rapid loading"] 
      }
    ],
    process: [
      { title: "Discovery", description: "Sesi konsolidasi untuk menentukan tujuan utama landing page Anda." },
      { title: "Rapid Development", description: "Proses desain UI dan coding yang dilakukan secara paralel untuk kecepatan." },
      { title: "Launch & Optimize", description: "Deployment ke server production dan setup dasar analitik." }
    ],
    faq: [
      { question: "Berapa lama proses pembuatan landing page?", answer: "Untuk paket Express, pengerjaan memakan waktu 1-2 minggu setelah data aset kami terima lengkap." },
      { question: "Apakah saya perlu beli hosting & domain sendiri?", answer: "Harganya belum termasuk hosting/domain, tapi kami bisa membantu proses setup-nya secara gratis agar bapak terima jadi." },
      { question: "Bisa bayar bertahap (DP)?", answer: "Bisa pak! Standar pembayaran kami adalah 50% di awal dan pelunasan saat website siap launching." }
    ],
    technologies: ["Vue.js 3", "Tailwind CSS", "Vercel", "Google Sheets API"]
  },
  {
    id: "company-profile",
    serviceId: "website-high-conversion",
    name: "Company Profile Pro",
    basePrice: 5000000,
    desc: "Website company profile modern untuk branding instansi/bisnis.",
    category: "Web & Landing",
    deliveryTime: "2-4 Weeks",
    maxPages: "5-10 Pages",
    revisions: "2x Minor, 1x Mayor",
    features: ["CMS Management", "Dynamic Services Page", "Blog System", "Advanced UI Components", "SEO Optimized"],
    detailedFeatures: [
      { 
        title: "Brand Identity Hub", 
        icon: "Palette", 
        items: ["Custom theme sesuai brand guidelines", "Konsistensi visual di seluruh halaman", "Tipografi dan palet warna profesional"] 
      },
      { 
        title: "CMS Management", 
        icon: "Layers", 
        items: ["Update konten (teks/gambar) tanpa coding", "Manajemen data layanan & portofolio", "Sistem blog untuk konten marketing"] 
      },
      { 
        title: "Scalable Architecture", 
        icon: "Globe", 
        items: ["Multi-page support (About, Services, Contact)", "Pondasi SEO yang kuat di tiap halaman", "Teknologi modern yang mudah di-upscale"] 
      }
    ],
    process: [
      { title: "Strategy & Sitemap", description: "Pemetaan struktur halaman dan alur informasi yang efektif." },
      { title: "Design Phase", description: "Pembuatan mockup desain UI high-fidelity untuk review bapak." },
      { title: "CMS Integration", description: "Pembangunan sistem backend agar bapak bisa edit konten sendiri." },
      { title: "Training & Go-Live", description: "Panduan cara penggunaan admin panel sebelum website diluncurkan." }
    ],
    faq: [
      { question: "Apakah saya bisa edit isi website sendiri?", answer: "Tentu pak! Kami sertakan Admin Panel (CMS) yang user-friendly sehingga bapak bisa ganti gambar atau teks tanpa perlu coding." },
      { question: "Kalau ada bug setelah website jadi bagaimana?", answer: "Bapak dapat garansi pembersihan bug selamanya jika website tidak diotak-atik kodenya oleh pihak ketiga." },
      { question: "Apakah websitenya aman dari hacker?", answer: "Kami mengimplementasikan standar keamanan Supabase & sistem auth terbaru untuk menjaga data perusahaan tetap aman." }
    ],
    technologies: ["Nuxt 3", "Supabase", "Tailwind CSS", "TypeScript", "Sanity CMS"]
  },
  {
    id: "sales-funnel",
    serviceId: "website-high-conversion",
    name: "Sales Funnel Gold",
    icon: "BarChart3",
    basePrice: 4000000,
    desc: "Website fokus pada psikologi penjualan & lead generation.",
    category: "Web & Landing",
    deliveryTime: "2 Weeks",
    maxPages: "3-5 specialized sections",
    revisions: "2x Minor, 1x Mayor",
    features: ["Form Integration", "A/B Testing Ready", "Email Marketing Setup", "High-speed loading", "Copywriting focus"],
    detailedFeatures: [
      { title: "Lead Capture", icon: "Check", items: ["Custom forms with validation", "Direct email notifications", "Google Sheets leads sync"] }
    ],
    process: [
      { title: "Copy Review", description: "Bantu optimasi teks agar lebih persuasif." },
      { title: "Setup Automasi", description: "Integrasi leads ke email bapak otomatis." }
    ],
    faq: [{ question: "Aman dari spam?", answer: "Sudah include Google reCAPTCHA v3 pak." }]
  },
  {
    id: "personal-branding",
    serviceId: "website-high-conversion",
    name: "Personal Portfolio Pro",
    icon: "UserCheck",
    basePrice: 3500000,
    desc: "Tingkatkan kredibilitas profesional bapak dengan portofolio elegan.",
    category: "Web & Landing",
    deliveryTime: "1-2 Weeks",
    maxPages: "3 Pages",
    revisions: "2x Minor, 1x Mayor",
    features: ["Project Gallery", "Resume Download", "Testimonial Section", "Dark/Light Mode", "Social Links"],
    detailedFeatures: [
      { title: "Visual Story", icon: "Palette", items: ["Showcase project bapak dengan foto HD", "Interaksi animasi yang halus", "Tipografi personal yang kuat"] }
    ],
    process: [
      { title: "Asset Gathering", description: "Pengumpulan foto dan biodata profesional bapak." }
    ],
    faq: [{ question: "Bisa ganti foto sendiri?", answer: "Bisa pak, kami ajarkan cara updatenya." }]
  },
  {
    id: "ecommerce-lite",
    serviceId: "website-high-conversion",
    name: "E-Commerce Catalog",
    icon: "ShoppingBag",
    basePrice: 7500000,
    desc: "Toko online simpel untuk display produk (order via WA/Link).",
    category: "Web & Landing",
    deliveryTime: "3-5 Weeks",
    maxPages: "Unlimited Products",
    revisions: "2x Minor, 1x Mayor",
    features: ["Product Filter", "Search Function", "WhatsApp Order integration", "Dashboard Admin", "Inventory Management"],
    detailedFeatures: [
      { title: "Shop Dashboard", icon: "Monitor", items: ["Kelola produk, harga & stok", "Cetak laporan penjualan harian", "Otomasi link checkout WA"] }
    ],
    process: [
      { title: "Database Setup", description: "Inisialisasi kategori & variasi produk." }
    ],
    faq: [{ question: "Bisa bayar lewat BCA/Mandiri otomatis?", answer: "Bisa pak, tapi perlu integrasi Midtrans (biaya terpisah)." }]
  },
  {
    id: "news-blog-pro",
    serviceId: "website-high-conversion",
    name: "News Portal / Blog Pro",
    icon: "BookOpen",
    basePrice: 6000000,
    desc: "Website portal berita atau blog majalah dengan load super cepat.",
    category: "Web & Landing",
    deliveryTime: "3 Weeks",
    maxPages: "Unlimited Articles",
    revisions: "2x Minor, 1x Mayor",
    features: ["Advertisement Slots", "Category System", "Writer Dashboard", "SEO Silo Structure", "Instant Search"],
    detailedFeatures: [
      { title: "Editor Hub", icon: "Layers", items: ["Sistem penulis banyak user", "Editor teks seperti MS Word", "Manajemen tag & kategori"] }
    ],
    process: [
      { title: "Optimization", description: "Tuning server agar kuat menampung ribuan pembaca." }
    ],
    faq: [{ question: "Aman dari trafik tinggi?", answer: "Pasti pak! Kita pakai static rendering (SSG/ISR)." }]
  },
  {
    id: "listing-directory",
    serviceId: "website-high-conversion",
    name: "Property / Directory",
    icon: "Globe",
    basePrice: 8500000,
    desc: "Sistem listing properti, direktori bisnis, atau katalog sewa.",
    category: "Web & Landing",
    deliveryTime: "4-6 Weeks",
    maxPages: "Complex Data Schema",
    revisions: "2x Minor, 1x Mayor",
    features: ["Map Integration", "Advanced Advanced Filter", "User Submissions", "Saved Items", "Booking Interest"],
    detailedFeatures: [
      { title: "Directory Core", icon: "ShieldCheck", items: ["Pencarian lokasi berbasis map", "Validasi input data otomatis", "Dashboard monitoring listing"] }
    ],
    process: [
      { title: "Logic Design", description: "Penyusunan filter data yang paling efektif untuk klien bapak." }
    ],
    faq: [{ question: "Bisa tambah map?", answer: "Include integrasi Google Maps / Mapbox pak." }]
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

  // THE FOUNDATION (Starter Kit - Custom Build)
  {
    id: "foundation-web",
    serviceId: "website-high-conversion",
    name: "The Foundation (Web)",
    basePrice: 1000000,
    desc: "Starter kit website dengan fitur dasar (Auth, Blog, SEO). Cocok untuk klien yang ingin custom fitur sendiri.",
    category: "The Foundation",
    features: ["Clean Architecture", "Basic Auth System", "SEO Config Ready", "Responsive Layout", "Ultra-fast Loading"],
    detailedFeatures: [
      { 
        title: "Frontend Core", 
        icon: "Layers", 
        items: ["Next.js/Vue 3 starter template", "Tailwind CSS integration", "Mobile-first responsive design"] 
      },
      { 
        title: "Auth & SEO", 
        icon: "ShieldCheck", 
        items: ["Basic login/register logic", "Meta tag manager", "Sitemap & robots.txt generator"] 
      }
    ],
    process: [
      { title: "Boilerplate Setup", description: "Instalasi pondasi kode ke repositori bapak." },
      { title: "Basic Integration", description: "Penyambungan database dan sistem autentikasi dasar." }
    ],
    faq: [
      { question: "Apa bedanya Foundation dengan paket Express?", answer: "Foundation hanya berisi 'rangka' dan fitur dasar bapak. Bapak yang merakit fitur tambahannya sendiri atau dengan bantuan tim kami." }
    ]
  },
  {
    id: "foundation-system",
    serviceId: "business-system",
    name: "The Foundation (System)",
    basePrice: 3000000,
    desc: "Starter kit sistem bisnis dengan Admin Dashboard, CRUD, dan Role Management. Tambahkan modul sesuai kebutuhan.",
    category: "The Foundation",
    features: ["Admin Dashboard", "User Role Management", "CRUD Generator", "Dark Mode Ready", "Database Schema Initialized"],
    detailedFeatures: [
      { 
        title: "Admin Core", 
        icon: "Monitor", 
        items: ["Dashboard layout built-in", "Sidebar navigation with roles", "Profile & Settings page template"] 
      },
      { 
        title: "Data Engine", 
        icon: "Database", 
        items: ["Supabase/Prisma integration", "Generic CRUD hooks", "Real-time data support"] 
      }
    ],
    process: [
      { title: "Skeleton Setup", description: "Instalasi sistem admin ke infrastruktur bapak." },
      { title: "Database Migrations", description: "Inisialisasi skema tabel dasar (User, Profile, Audit Logs)." }
    ],
    faq: [
      { question: "Apakah ini include desain UI?", answer: "Sudah include UI dasar Dashboard pak, bapak tinggal fokus ke logika bisnis intinya saja." }
    ]
  },

  // MAINTENANCE & CUSTOM FEATURES
  {
    id: "fitur-rakitan",
    serviceId: "maintenance-custom",
    name: "Fitur Rakitan (Ad-hoc Dev)",
    basePrice: 0,
    deliveryTime: "3-10 Hari",
    revisions: "3x Minor",
    desc: "Khusus untuk penambahan fitur spesifik atau perbaikan sistem. Harga akhir ditentukan dari fitur yang Anda pilih.",
    category: "Maintenance",
  },
];

export const availableFeatures: AvailableFeature[] = [
  {
    id: "seo",
    name: "Advanced SEO pro",
    price: 1000000,
    desc: "Optimasi meta-tag, sitemap, dan Google Search Console.",
    relevantTo: ["website-high-conversion", "maintenance-custom"],
  },
  {
    id: "blog",
    name: "Blog System",
    price: 1500000,
    desc: "Fitur posting artikel untuk konten marketing.",
    relevantTo: ["website-high-conversion", "maintenance-custom"],
  },
  {
    id: "pwa",
    name: "PWA (Mobile Install)",
    price: 2000000,
    desc: "Website bisa diinstall di HP seperti aplikasi asli.",
    relevantTo: ["website-high-conversion", "maintenance-custom"],
  },
  {
    id: "speed-tuning",
    name: "Extreme Speed Tuning",
    price: 1000000,
    desc: "Optimasi score Lighthouse hingga 95+.",
    relevantTo: ["website-high-conversion", "maintenance-custom"],
  },
  {
    id: "multi-platform",
    name: "Multi-Platform Sync",
    price: 2500000,
    desc: "Hubungkan bot ke WA, Telegram, dan Email sekaligus.",
    relevantTo: ["automation", "maintenance-custom"],
  },
  {
    id: "scheduler",
    name: "Custom Scheduler",
    price: 1500000,
    desc: "Kirim pesan otomatis terjadwal (Broadcast/Reminder).",
    relevantTo: ["automation", "maintenance-custom"],
  },
  {
    id: "crm-sync",
    name: "CRM Auto-Sync",
    price: 2000000,
    desc: "Otomatis input data leads ke CRM pilihan Anda.",
    relevantTo: ["automation", "maintenance-custom"],
  },
  {
    id: "inventory",
    name: "Inventory Module",
    price: 3500000,
    desc: "Sistem Manajemen Stok & Gudang real-time.",
    relevantTo: ["business-system", "maintenance-custom"],
  },
  {
    id: "reporting",
    name: "Financial Reporting",
    price: 2500000,
    desc: "Laporan neraca, laba rugi, dan arus kas otomatis.",
    relevantTo: ["business-system", "maintenance-custom"],
  },
  {
    id: "rag-pro",
    name: "Advanced RAG Master",
    price: 4000000,
    desc: "AI dilatih dengan ribuan dokumen kustom tanpa limit.",
    relevantTo: ["ai-agent", "maintenance-custom"],
  },
  {
    id: "human-handoff",
    name: "Human-to-AI Handoff",
    price: 2000000,
    desc: "Alihkan diskusi ke Admin jika AI tidak bisa jawab.",
    relevantTo: ["ai-agent", "maintenance-custom"],
  },
  {
    id: "maintenance",
    name: "Priority Care (3 Month)",
    price: 2000000,
    desc: "Bebas biaya perbaikan & update minor selama 3 bulan.",
    relevantTo: ["website-high-conversion", "business-system", "automation", "ai-agent", "maintenance-custom"],
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

export const serviceCategories = [
  {
    id: "website-high-conversion",
    title: "Website High-Conversion",
    tagline: "Website premium untuk konversi & branding.",
    icon: "Globe",
    price: 3000000,
    status: "active",
    order: 1,
    badge: "Most Popular",
    isFeatured: true,
    originalPrice: 5000000,
    deliveryTime: "2-4 Weeks",
    revisions: "2x Minor, 1x Mayor",
    overview: "Layanan pembuatan website modern dengan performa tinggi dan desain eksklusif.",
    included: ["Custom Design", "Mobile Optimization", "SEO Setup"],
    detailedFeatures: [],
    process: [],
    technologies: ["Vue.js", "Vite", "Tailwind CSS"],
    packageFeatures: ["1 Year Maintenance"],
    faq: [],
    workflow: []
  },
  {
    id: "automation",
    title: "Automation",
    tagline: "Otomatisasi tugas rutin & integrasi sistem.",
    icon: "Zap",
    price: 2000000,
    status: "active",
    order: 2,
    badge: "Time Saver",
    isFeatured: false,
    originalPrice: 4000000,
    deliveryTime: "1-2 Weeks",
    revisions: "3 Times",
    overview: "Solusi otomatisasi alur kerja menggunakan Robot WhatsApp dan integrasi Google Sheets.",
    included: ["WA API Integration", "Google Sheets Sync", "Daily Reports"],
    detailedFeatures: [],
    process: [],
    technologies: ["Node.js", "Google Apps Script"],
    packageFeatures: ["24/7 Monitoring"],
    faq: [],
    workflow: []
  },
  {
    id: "business-system",
    title: "Business System",
    tagline: "Sistem manajemen data & internal tools.",
    icon: "Database",
    price: 7000000,
    status: "active",
    order: 3,
    badge: "Enterprise",
    isFeatured: false,
    originalPrice: 12000000,
    deliveryTime: "4-8 Weeks",
    revisions: "5 Times",
    overview: "Pengembangan sistem internal kustom untuk kebutuhan bisnis yang spesifik dan kompleks.",
    included: ["Custom CRM", "Inventory Management", "Admin Dashboard"],
    detailedFeatures: [],
    process: [],
    technologies: ["Supabase", "Vue.js", "Tailwind CSS"],
    packageFeatures: ["Priority Support"],
    faq: [],
    workflow: []
  },
  {
    id: "ai-agent",
    title: "AI Agent",
    tagline: "Solusi AI cerdas untuk bisnis masa depan.",
    icon: "Cpu",
    price: 5000000,
    status: "active",
    order: 4,
    badge: "Next-Gen",
    isFeatured: false,
    originalPrice: 10000000,
    deliveryTime: "2-4 Weeks",
    revisions: "Unlimited",
    overview: "Integrasi kecerdasan buatan untuk otomatisasi layanan pelanggan dan pengolahan data.",
    included: ["GPT-4 Integration", "Custom Knowledge Base", "Human Handoff"],
    detailedFeatures: [],
    process: [],
    technologies: ["OpenAI", "LangChain", "Node.js"],
    packageFeatures: ["Free LLM consultation"],
    faq: [],
    workflow: []
  },
  {
    id: "maintenance-custom",
    title: "Maintenance & Fitur Rakitan",
    tagline: "Rawat sistem Anda atau tambahkan fitur baru sesuai kebutuhan.",
    icon: "Settings",
    price: 0,
    status: "active",
    order: 5,
    badge: "For Existing Clients",
    isFeatured: false,
    originalPrice: 0,
    deliveryTime: "3-10 Hari",
    revisions: "3x Minor",
    overview: "Layanan khusus untuk optimasi, perbaikan bug, dan penambahan fitur pada sistem yang sudah berjalan. Anda hanya membayar fitur yang Anda butuhkan.",
    included: ["Technical Audit", "Bug Fixing", "Feature Expansion"],
    detailedFeatures: [
      { 
        title: "Modular Scaling", 
        icon: "Layers", 
        items: ["Pilih fitur sesuai kebutuhan saat ini", "Bayar hanya untuk modul yang dipasang", "Integrasi seamless dengan sistem yang sudah ada"] 
      },
      { 
        title: "Code Audit & Health", 
        icon: "ShieldCheck", 
        items: ["Review kualitas kode sebelum instalasi", "Pembersihan bug di modul terkait", "Optimasi keamanan basis data"] 
      },
      { 
        title: "Growth Support", 
        icon: "Zap", 
        items: ["Pondasi untuk penambahan fitur skala besar", "Dokumentasi kode untuk pengembangan mandiri", "Konsultasi roadmap teknis gratis"] 
      }
    ],
    process: [
      { title: "Sistem Audit", description: "Pengecekan kondisi sistem yang ada untuk memastikan kompatibilitas fitur baru." },
      { title: "Fitur Assembly", description: "Perakitan fitur-fitur pilihan Anda ke dalam sistem." },
      { title: "Testing & Deploy", description: "Uji coba fungsionalitas dan peluncuran update ke server." }
    ],
    technologies: ["All Stacks Supported", "Node.js", "Vue/React", "Supabase", "PHP/Laravel"],
    packageFeatures: ["Priority Support", "Clean Code Implementation"],
    faq: [
      { question: "Bagaimana jika fitur yang saya mau tidak ada di list?", answer: "Bapak bisa langsung chat kami! List di atas adalah yang paling umum, kami bisa buatkan fitur kustom apapun sesuai kebutuhan sistem bapak." },
      { question: "Apakah bisa modifikasi fitur yang sudah ada?", answer: "Sangat bisa pak. Fitur rakitan ini juga mencakup optimasi atau perbaikan fitur lama yang mungkin performanya mulai menurun." },
      { question: "Berapa lama pengerjaan fitur tambahan?", answer: "Tergantung kompleksitasnya pak. Fitur ringan bisa selesai dalam 3-5 hari, sedangkan modul kompleks bisa 1-2 minggu." }
    ],
    workflow: []
  }
];
