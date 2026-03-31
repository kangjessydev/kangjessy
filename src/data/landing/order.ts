export interface ProjectType {
    id: string;
    serviceId: string;
    name: string;
    icon?: any;
    basePrice?: number;
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
    badge?: string;
    originalPrice?: number;
}

export interface AvailableFeature {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    setupFee?: number; // Override DEFAULT_SETUP_FEE. 0 = no overhead. Berlaku hanya jika no Starter Pack
    desc: string;
    relevantTo: string[];
    category?: string;
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
  // WEBSITE HIGH-CONVERSION
  {
    id: "authority-personal-brand",
    serviceId: "website-high-conversion",
    name: "The Authority Personal Brand",
    badge: "Recommended",
    desc: "Bangun kredibilitas sebagai profesional atau coach dengan website personal yang powerful & terpercaya.",
    category: "Web & Landing",
    features: ["starter-pack", "blogging-article", "portfolio-case-study", "appointment-booking"],
    process: [
      { title: "Business & Brand Strategy", description: "Konsultasi mendalam hubungan web dengan model bisnis." },
      { title: "Copywriting & Storytelling", description: "Penyusunan narasi persuasif sesuai brand voice." },
      { title: "UI/UX High-Conversion Design", description: "Desain visual fokus pada user journey & konversi." },
      { title: "Tech Stack Architecture", description: "Setup environment (Vue, Sanity, Supabase, Laravel, dll)." },
      { title: "Core Development", description: "Proses pengkodean fitur utama & integrasi sistem." },
      { title: "Content Entry & CMS Setup", description: "Input data awal & konfigurasi akses dashboard klien." },
      { title: "Deployment & Handover", description: "Peluncuran website & sesi training penggunaan dashboard." },
    ],
    faq: [
      { question: "Apakah saya bisa update konten sendiri?", answer: "Tentu, kami sediakan CMS/Admin Dashboard yang user-friendly." },
      { question: "Bisa integrasi ke sistem booking luar?", answer: "Bisa, kami bisa hubungkan via API ke sistem eksternal pilihan Anda." },
      { question: "Bagaimana jika ada perubahan copywriting?", answer: "Kami berikan revisi copywriting sesuai paket untuk memastikan narasi tetap tajam." },
    ],
  },
  {
    id: "conversion-landing-page",
    serviceId: "website-high-conversion",
    name: "Conversion-Focused Landing Page",
    badge: "Best Seller",
    desc: "Landing page yang dirancang khusus untuk menarik leads dari iklan dan mengubah pengunjung jadi pembeli.",
    category: "Web & Landing",
    features: ["starter-pack", "high-speed-optimization", "copywriting-framework", "whatsapp-form-integration", "analytics-tracking"],
    process: [
      { title: "Business & Brand Strategy", description: "Konsultasi mendalam hubungan web dengan model bisnis." },
      { title: "Copywriting & Storytelling", description: "Penyusunan narasi persuasif sesuai brand voice." },
      { title: "UI/UX High-Conversion Design", description: "Desain visual fokus pada user journey & konversi." },
      { title: "Core Development", description: "Proses pengkodean fitur utama & integrasi sistem." },
      { title: "Speed & Performance Tuning", description: "Optimasi Core Web Vitals (Lighthouse Hijau)." },
      { title: "QA & Stress Testing", description: "Uji coba fungsionalitas di berbagai perangkat." },
      { title: "Deployment & Handover", description: "Peluncuran website & sesi training penggunaan dashboard." },
    ],
    faq: [
      { question: "Bagaimana jika ada perubahan copywriting?", answer: "Kami berikan revisi copywriting sesuai paket untuk memastikan narasi tetap tajam." },
      { question: "Apakah aman dari serangan hacker?", answer: "Kami menggunakan enkripsi SSL dan tech stack modern yang minim celah keamanan." },
      { question: "Apakah tracking Pixel sudah terpasang?", answer: "Ya, kami pasang Google Analytics & Meta Pixel untuk kebutuhan marketing." },
    ],
  },
  {
    id: "modern-corporate-profile",
    serviceId: "website-high-conversion",
    name: "Modern Corporate Profile",
    desc: "Tampilkan profesionalisme perusahaan Anda dengan company profile modern yang memukau klien baru.",
    category: "Web & Landing",
    features: ["starter-pack", "cms", "multi-language", "career-job-listing"],
    process: [
      { title: "Business & Brand Strategy", description: "Konsultasi mendalam hubungan web dengan model bisnis." },
      { title: "UI/UX High-Conversion Design", description: "Desain visual fokus pada user journey & konversi." },
      { title: "Tech Stack Architecture", description: "Setup environment (Vue, Sanity, Supabase, Laravel, dll)." },
      { title: "Core Development", description: "Proses pengkodean fitur utama & integrasi sistem." },
      { title: "Content Entry & CMS Setup", description: "Input data awal & konfigurasi akses dashboard klien." },
      { title: "Deployment & Handover", description: "Peluncuran website & sesi training penggunaan dashboard." },
    ],
    faq: [
      { question: "Apakah saya bisa update konten sendiri?", answer: "Tentu, kami sediakan CMS/Admin Dashboard yang user-friendly." },
      { question: "Bisa multi-bahasa?", answer: "Bisa, sistem kami mendukung skalabilitas bahasa tanpa merusak desain." },
      { question: "Bisa tambah fitur lowongan kerja?", answer: "Bisa, kami sediakan modul khusus untuk management pelamar." },
    ],
  },
  {
    id: "digital-catalog",
    serviceId: "website-high-conversion",
    name: "Digital Catalog",
    desc: "Pamerkan produk Anda secara visual dan arahkan pelanggan langsung order via WhatsApp.",
    category: "Web & Landing",
    features: ["starter-pack", "product-catalog", "product-filter-search", "video-integration"],
    process: [
      { title: "Business & Brand Strategy", description: "Konsultasi mendalam hubungan web dengan model bisnis." },
      { title: "Tech Stack Architecture", description: "Setup environment (Vue, Sanity, Supabase, Laravel, dll)." },
      { title: "Core Development", description: "Proses pengkodean fitur utama & integrasi sistem." },
      { title: "Content Entry & CMS Setup", description: "Input data awal & konfigurasi akses dashboard klien." },
      { title: "QA & Stress Testing", description: "Uji coba fungsionalitas di berbagai perangkat." },
      { title: "Deployment & Handover", description: "Peluncuran website & sesi training penggunaan dashboard." },
    ],
    faq: [
      { question: "Apakah saya bisa update konten sendiri?", answer: "Tentu, kami sediakan CMS/Admin Dashboard yang user-friendly." },
      { question: "Bisakah katalog diubah jadi e-commerce nanti?", answer: "Sangat bisa, struktur database kami scalable untuk upgrade ke fitur checkout." },
      { question: "Apakah aman dari serangan hacker?", answer: "Kami menggunakan enkripsi SSL dan tech stack modern yang minim celah keamanan." },
    ],
  },
  {
    id: "educational-course-hub",
    serviceId: "website-high-conversion",
    name: "Educational/Course Hub",
    desc: "Platform untuk menjual materi kursus, webinar, atau konten edukasi secara profesional.",
    category: "Web & Landing",
    features: ["starter-pack", "newsletter-email-signup", "downloadable-resource", "cms"],
    process: [
      { title: "Business & Brand Strategy", description: "Konsultasi mendalam hubungan web dengan model bisnis." },
      { title: "Copywriting & Storytelling", description: "Penyusunan narasi persuasif sesuai brand voice." },
      { title: "Tech Stack Architecture", description: "Setup environment (Vue, Sanity, Supabase, Laravel, dll)." },
      { title: "Core Development", description: "Proses pengkodean fitur utama & integrasi sistem." },
      { title: "Content Entry & CMS Setup", description: "Input data awal & konfigurasi akses dashboard klien." },
      { title: "Deployment & Handover", description: "Peluncuran website & sesi training penggunaan dashboard." },
    ],
    faq: [
      { question: "Apakah saya bisa update konten sendiri?", answer: "Tentu, kami sediakan CMS/Admin Dashboard yang user-friendly." },
      { question: "Bisa integrasi ke sistem booking luar?", answer: "Bisa, kami bisa hubungkan via API ke sistem eksternal pilihan Anda." },
      { question: "Apakah file download bisa diproteksi?", answer: "Ya, kami bisa setting hanya user yang mengisi data yang bisa mendownload." },
    ],
  },
  {
    id: "seo-powerhouse",
    serviceId: "website-high-conversion",
    name: "The SEO Powerhouse",
    desc: "Website yang dibangun dari nol untuk mendominasi halaman pertama Google secara organik.",
    category: "Web & Landing",
    features: ["starter-pack", "blogging-article", "advanced-seo", "automatic-internal-linking", "countdown-timer"],
    process: [
      { title: "Business & Brand Strategy", description: "Konsultasi mendalam hubungan web dengan model bisnis." },
      { title: "Copywriting & Storytelling", description: "Penyusunan narasi persuasif sesuai brand voice." },
      { title: "Core Development", description: "Proses pengkodean fitur utama & integrasi sistem." },
      { title: "Advanced SEO Implementation", description: "Setup technical SEO, schema, & metadata." },
      { title: "Speed & Performance Tuning", description: "Optimasi Core Web Vitals (Lighthouse Hijau)." },
      { title: "QA & Stress Testing", description: "Uji coba fungsionalitas di berbagai perangkat." },
      { title: "Deployment & Handover", description: "Peluncuran website & sesi training penggunaan dashboard." },
    ],
    faq: [
      { question: "Apakah website ini SEO friendly?", answer: "Ya, semua website dibangun dengan struktur HTML5 yang bersih dan terbaca Google." },
      { question: "Apa bedanya dengan WordPress biasa?", answer: "Website kami lebih ringan, aman dari malware, dan performa speed jauh lebih tinggi." },
      { question: "Berapa lama artikel SEO bisa masuk halaman satu?", answer: "Tergantung kompetisi, tapi secara teknis kami optimasi struktur agar secepat mungkin terindeks." },
    ],
  },
  {
    id: "event-webinar-landing",
    serviceId: "website-high-conversion",
    name: "Event & Webinar Landing",
    desc: "Halaman pendaftaran acara atau webinar yang cepat, ringkas, dan siap terima ratusan peserta.",
    category: "Web & Landing",
    features: ["starter-pack", "countdown-timer", "google-calendar-integration", "custom-lead-form"],
    process: [
      { title: "Business & Brand Strategy", description: "Konsultasi mendalam hubungan web dengan model bisnis." },
      { title: "UI/UX High-Conversion Design", description: "Desain visual fokus pada user journey & konversi." },
      { title: "Core Development", description: "Proses pengkodean fitur utama & integrasi sistem." },
      { title: "Speed & Performance Tuning", description: "Optimasi Core Web Vitals (Lighthouse Hijau)." },
      { title: "QA & Stress Testing", description: "Uji coba fungsionalitas di berbagai perangkat." },
      { title: "Deployment & Handover", description: "Peluncuran website & sesi training penggunaan dashboard." },
    ],
    faq: [
      { question: "Bisa integrasi ke sistem booking luar?", answer: "Bisa, kami bisa hubungkan via API ke sistem eksternal pilihan Anda." },
      { question: "Apakah aman dari serangan hacker?", answer: "Kami menggunakan enkripsi SSL dan tech stack modern yang minim celah keamanan." },
      { question: "Apakah tracking Pixel sudah terpasang?", answer: "Ya, kami pasang Google Analytics & Meta Pixel untuk kebutuhan marketing." },
    ],
  },
  {
    id: "portfolio-showcase",
    serviceId: "website-high-conversion",
    name: "Portfolio Showcase",
    desc: "Showcase visual berkelas tinggi untuk kreator, fotografer, atau desainer yang ingin tampil beda.",
    category: "Web & Landing",
    features: ["starter-pack", "portfolio-case-study", "interactive-elements", "testimonial-review", "google-maps-integration"],
    process: [
      { title: "Business & Brand Strategy", description: "Konsultasi mendalam hubungan web dengan model bisnis." },
      { title: "UI/UX High-Conversion Design", description: "Desain visual fokus pada user journey & konversi." },
      { title: "Tech Stack Architecture", description: "Setup environment (Vue, Sanity, Supabase, Laravel, dll)." },
      { title: "Core Development", description: "Proses pengkodean fitur utama & integrasi sistem." },
      { title: "Speed & Performance Tuning", description: "Optimasi Core Web Vitals (Lighthouse Hijau)." },
      { title: "Deployment & Handover", description: "Peluncuran website & sesi training penggunaan dashboard." },
    ],
    faq: [
      { question: "Apakah saya bisa update konten sendiri?", answer: "Tentu, kami sediakan CMS/Admin Dashboard yang user-friendly." },
      { question: "Apa bedanya dengan WordPress biasa?", answer: "Website kami lebih ringan, aman dari malware, dan performa speed jauh lebih tinggi." },
      { question: "Apakah aman dari serangan hacker?", answer: "Kami menggunakan enkripsi SSL dan tech stack modern yang minim celah keamanan." },
    ],
  },
  {
    id: "local-business-maps",
    serviceId: "website-high-conversion",
    name: "Local Business Maps",
    desc: "Website khusus bisnis lokal seperti resto, klinik, atau salon — lengkap dengan peta lokasi & jam operasional.",
    category: "Web & Landing",
    features: ["starter-pack", "google-maps-integration", "advanced-seo", "appointment-booking"],
    process: [
      { title: "Business & Brand Strategy", description: "Konsultasi mendalam hubungan web dengan model bisnis." },
      { title: "Tech Stack Architecture", description: "Setup environment (Vue, Sanity, Supabase, Laravel, dll)." },
      { title: "Core Development", description: "Proses pengkodean fitur utama & integrasi sistem." },
      { title: "Advanced SEO Implementation", description: "Setup technical SEO, schema, & metadata." },
      { title: "QA & Stress Testing", description: "Uji coba fungsionalitas di berbagai perangkat." },
      { title: "Deployment & Handover", description: "Peluncuran website & sesi training penggunaan dashboard." },
    ],
    faq: [
      { question: "Apakah website ini SEO friendly?", answer: "Ya, semua website dibangun dengan struktur HTML5 yang bersih dan terbaca Google." },
      { question: "Apakah ada biaya bulanan?", answer: "Hanya biaya hosting & domain tahunan. Tidak ada biaya berlangganan fitur kami." },
      { question: "Apakah tracking Pixel sudah terpasang?", answer: "Ya, kami pasang Google Analytics & Meta Pixel untuk kebutuhan marketing." },
    ],
  },
  {
    id: "link-in-bio-pro",
    serviceId: "website-high-conversion",
    name: "Link-in-Bio Pro",
    desc: "Ganti Linktree dengan halaman branding Anda sendiri — satu link untuk semua sosmed, data, dan portofolio.",
    category: "Web & Landing",
    features: ["starter-pack", "social-links-aggregator", "whatsapp-form-integration", "analytics-tracking"],
    process: [
      { title: "Business & Brand Strategy", description: "Konsultasi mendalam hubungan web dengan model bisnis." },
      { title: "UI/UX High-Conversion Design", description: "Desain visual fokus pada user journey & konversi." },
      { title: "Core Development", description: "Proses pengkodean fitur utama & integrasi sistem." },
      { title: "Speed & Performance Tuning", description: "Optimasi Core Web Vitals (Lighthouse Hijau)." },
      { title: "Deployment & Handover", description: "Peluncuran website & sesi training penggunaan dashboard." },
    ],
    faq: [
      { question: "Apakah link sosmed bisa di-update berkala?", answer: "Bisa, Anda punya dashboard khusus untuk kelola semua link aggregator." },
      { question: "Apakah ada biaya bulanan?", answer: "Hanya biaya hosting & domain tahunan. Tidak ada biaya berlangganan fitur kami." },
      { question: "Apakah tracking Pixel sudah terpasang?", answer: "Ya, kami pasang Google Analytics & Meta Pixel untuk kebutuhan marketing." },
    ],
  },
  // MAINTENANCE & CUSTOM FEATURES
  {
    id: "maintenance-starter",
    serviceId: "maintenance-custom",
    name: "Starter Pack",
    desc: "Paket lengkap untuk standarisasi website: Mobile responsive, security, speed, dan SEO dasar dalam satu paket.",
    category: "Maintenance",
    detailedFeatures: [
      { 
        title: "Mobile Responsive Design", 
        items: ["Optimasi tampilan di smartphone & tablet", "Touch-friendly interface"],
        icon: "Smartphone"
      },
      { 
        title: "Security & SSL Setup", 
        items: ["Integrasi sertifikat SSL otomatis", "Proteksi dasar dari serangan brute force"],
        icon: "ShieldCheck"
      },
      { 
        title: "Performance Baseline", 
        items: ["Optimasi loading speed awal", "Image compression & caching strategy"],
        icon: "Zap"
      },
      { 
        title: "Basic SEO Implementation", 
        items: ["Setup meta tags & structural data", "Submit sitemap ke Google Search Console"],
        icon: "Search"
      },
      { 
        title: "Analytics Basic Setup", 
        items: ["Integrasi Google Analytics 4", "Setup tracking pengiriman formulir"],
        icon: "BarChart"
      }
    ],
    features: ["starter-pack"],
    process: [
      { title: "Technical Review", description: "Audit kondisi website saat ini." },
      { title: "Standard Fixes", description: "Perbaikan bug minor & update sistem." },
      { title: "QA Testing", description: "Verifikasi kestabilan setelah update." },
    ],
    faq: [
      { question: "Apa saja yang dicover?", answer: "Update konten, perbaikan bug minor, dan optimasi speed dasar." },
    ]
  },
  {
    id: "fitur-rakitan",
    serviceId: "maintenance-custom",
    name: "Hanya tambahan fitur",
    deliveryTime: "3-10 Hari",
    revisions: "3x Minor",
    desc: "Khusus untuk penambahan fitur spesifik atau perbaikan sistem. Harga akhir ditentukan dari fitur yang Anda pilih.",
    category: "Maintenance",
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
    desc: "Fokus pada ruang putih and tipografi tajam",
  },
  {
    id: "modern",
    name: "Modern & Tech",
    desc: "Dark mode, gradasi, and elemen kaca",
  },
  {
    id: "cheerful",
    name: "Cheerful & Vibrant",
    desc: "Warna cerah and ilustrasi yang hidup",
  },
  {
    id: "corporate",
    name: "Professional Corporate",
    desc: "Terlihat terpercaya, kaku and rapi",
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
    title: "Digital Development",
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
    overview: "Layanan pembuatan website modern dengan performa tinggi and desain eksklusif.",
    included: ["Custom Design", "Mobile Optimization", "SEO Setup"],
    detailedFeatures: [],
    process: [],
    technologies: ["Vue.js", "Vite", "Tailwind CSS"],
    packageFeatures: ["1 Year Maintenance"],
    faq: [],
    workflow: []
  },
  {
    id: "maintenance-custom",
    title: "Maintenance Plans",
    tagline: "Rawat sistem Anda atau tambahkan fitur baru sesuai kebutuhan.",
    icon: "Settings",
    price: 0,
    status: "active",
    order: 2,
    badge: "For Existing Clients",
    isFeatured: false,
    originalPrice: 0,
    deliveryTime: "3-10 Hari",
    revisions: "3x Minor",
    overview: "Layanan khusus untuk optimasi, perbaikan bug, and penambahan fitur pada sistem yang sudah berjalan. Anda hanya membayar fitur yang Anda butuhkan.",
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
        iconName: "ShieldCheck",
        items: ["Review kualitas kode sebelum instalasi", "Pembersihan bug di modul terkait", "Optimasi keamanan basis data"] 
      },
      { 
        title: "Growth Support", 
        icon: "Zap", 
        iconName: "Zap",
        items: ["Pondasi untuk penambahan fitur skala besar", "Dokumentasi kode untuk pengembangan mandiri", "Konsultasi roadmap teknis gratis"] 
      }
    ],
    process: [
      { title: "Sistem Audit", description: "Pengecekan kondisi sistem yang ada untuk memastikan kompatibilitas fitur baru." },
      { title: "Fitur Assembly", description: "Perakitan fitur-fitur pilihan Anda ke dalam sistem." },
      { title: "Testing & Deploy", description: "Uji coba fungsionalitas and peluncuran update ke server." }
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

export const availableFeatures: AvailableFeature[] = [
  { 
    id: "starter-pack", 
    name: "Starter Pack", 
    price: 1000000, 
    originalPrice: 2000000,
    setupFee: 0, // Included in package or waived
    desc: "Pondasi standar website (Responsive, Security, Speed, SEO Dasar, & Analytics).", 
    relevantTo: ["website-high-conversion", "maintenance-custom"], 
    category: "Core Bundle" 
  },
  { 
    id: "blogging-article", 
    name: "Blogging/Article System", 
    price: 1000000, 
    originalPrice: 1500000,
    setupFee: 100000,
    desc: "Sistem blog lengkap untuk konten marketing & SEO.", 
    relevantTo: ["authority-personal-brand", "seo-powerhouse", "maintenance-custom"], 
    category: "Marketing & Growth" 
  },
  { 
    id: "portfolio-case-study", 
    name: "Portfolio/Case Study Layout", 
    price: 800000, 
    originalPrice: 1200000,
    setupFee: 75000,
    desc: "Tampilan portofolio & studi kasus yang profesional.", 
    relevantTo: ["authority-personal-brand", "portfolio-showcase", "maintenance-custom"], 
    category: "Experience & Visual" 
  },
  { 
    id: "appointment-booking", 
    name: "Appointment Booking", 
    price: 1500000, 
    originalPrice: 2000000,
    setupFee: 150000,
    desc: "Sistem booking janji temu online terintegrasi kalender.", 
    relevantTo: ["authority-personal-brand", "maintenance-custom"], 
    category: "Marketing & Growth" 
  },
  { 
    id: "high-speed-optimization", 
    name: "High-Speed Optimization", 
    price: 750000, 
    originalPrice: 1000000,
    setupFee: 75000,
    desc: "Optimasi performa website hingga skor Lighthouse 95+.", 
    relevantTo: ["conversion-landing-page", "event-webinar-landing", "maintenance-custom"], 
    category: "Optimization & SEO" 
  },
  { 
    id: "copywriting-framework", 
    name: "Copywriting Framework", 
    price: 1500000, 
    originalPrice: 2500000,
    setupFee: 50000,
    desc: "Struktur copywriting persuasif yang dirancang untuk konversi.", 
    relevantTo: ["conversion-landing-page", "maintenance-custom"], 
    category: "Marketing & Growth" 
  },
  { 
    id: "whatsapp-form-integration", 
    name: "WhatsApp/Form Integration", 
    price: 350000, 
    originalPrice: 500000,
    setupFee: 50000,
    desc: "Formulir kontak yang langsung terhubung ke WhatsApp Anda.", 
    relevantTo: ["conversion-landing-page", "digital-catalog", "link-in-bio-pro", "maintenance-custom"], 
    category: "Marketing & Growth" 
  },
  { 
    id: "analytics-tracking", 
    name: "Analytics & Tracking (Advanced)", 
    price: 500000, 
    originalPrice: 750000,
    setupFee: 50000,
    desc: "Setup Google Analytics, Meta Pixel, dan tracking konversi.", 
    relevantTo: ["conversion-landing-page", "link-in-bio-pro", "maintenance-custom"], 
    category: "Optimization & SEO" 
  },
  { 
    id: "cms", 
    name: "Content Management System (CMS)", 
    price: 1250000, 
    originalPrice: 2000000,
    setupFee: 100000,
    desc: "Admin panel untuk edit konten website tanpa coding.", 
    relevantTo: ["modern-corporate-profile", "maintenance-custom"], 
    category: "Admin & Security" 
  },
  { 
    id: "multi-language", 
    name: "Multi-language Support", 
    price: 1000000, 
    originalPrice: 1500000,
    setupFee: 100000,
    desc: "Website multi-bahasa (ID/EN) dengan switcher otomatis.", 
    relevantTo: ["modern-corporate-profile", "maintenance-custom"], 
    category: "Marketing & Growth" 
  },
  { 
    id: "career-job-listing", 
    name: "Career/Job Listing Page", 
    price: 800000, 
    originalPrice: 1200000,
    setupFee: 75000,
    desc: "Halaman lowongan kerja dengan form lamaran terintegrasi.", 
    relevantTo: ["modern-corporate-profile", "maintenance-custom"], 
    category: "Admin & Security" 
  },
  { 
    id: "product-catalog", 
    name: "Product Catalog System", 
    price: 1500000, 
    originalPrice: 2500000,
    setupFee: 150000,
    desc: "Katalog produk lengkap dengan filter, kategori, and detail.", 
    relevantTo: ["digital-catalog", "maintenance-custom"], 
    category: "Experience & Visual" 
  },
  { 
    id: "product-filter-search", 
    name: "Product Filter/Search", 
    price: 750000, 
    originalPrice: 1000000,
    setupFee: 50000,
    desc: "Fitur pencarian & filter produk yang cepat and akurat.", 
    relevantTo: ["digital-catalog", "maintenance-custom"], 
    category: "Experience & Visual" 
  },
  { 
    id: "video-integration", 
    name: "Video Integration", 
    price: 400000, 
    originalPrice: 600000,
    setupFee: 50000,
    desc: "Embed video YouTube/Vimeo dengan layout yang optimal.", 
    relevantTo: ["digital-catalog", "maintenance-custom"], 
    category: "Experience & Visual" 
  },
  { 
    id: "newsletter-email-signup", 
    name: "Newsletter/Email Signup", 
    price: 500000, 
    originalPrice: 800000,
    setupFee: 50000,
    desc: "Form subscribe newsletter terintegrasi email marketing.", 
    relevantTo: ["educational-course-hub", "maintenance-custom"], 
    category: "Marketing & Growth" 
  },
  { 
    id: "downloadable-resource", 
    name: "Downloadable Resource System", 
    price: 500000, 
    originalPrice: 800000,
    setupFee: 50000,
    desc: "Sistem download file (e-book, brosur, katalog) untuk leads.", 
    relevantTo: ["educational-course-hub", "maintenance-custom"], 
    category: "Marketing & Growth" 
  },
  { 
    id: "advanced-seo", 
    name: "Advanced SEO Setup", 
    price: 1000000, 
    originalPrice: 2000000,
    setupFee: 100000,
    desc: "Optimasi meta-tag, sitemap, schema markup, and Search Console.", 
    relevantTo: ["seo-powerhouse", "local-business-maps", "maintenance-custom"], 
    category: "Optimization & SEO" 
  },
  { 
    id: "automatic-internal-linking", 
    name: "Automatic Internal Linking", 
    price: 600000, 
    originalPrice: 900000,
    setupFee: 50000,
    desc: "Sistem internal link otomatis untuk memperkuat SEO.", 
    relevantTo: ["seo-powerhouse", "maintenance-custom"], 
    category: "Optimization & SEO" 
  },
  { 
    id: "countdown-timer", 
    name: "Countdown Timer", 
    price: 300000, 
    originalPrice: 500000,
    setupFee: 50000,
    desc: "Timer hitung mundur untuk promo, event, atau launching.", 
    relevantTo: ["seo-powerhouse", "event-webinar-landing", "maintenance-custom"], 
    category: "Marketing & Growth" 
  },
  { 
    id: "google-calendar-integration", 
    name: "Google Calendar Integration", 
    price: 750000, 
    originalPrice: 1000000,
    setupFee: 75000,
    desc: "Sinkronisasi jadwal booking langsung ke Google Calendar.", 
    relevantTo: ["event-webinar-landing", "maintenance-custom"], 
    category: "Marketing & Growth" 
  },
  { 
    id: "interactive-elements", 
    name: "Interactive Elements (GSAP)", 
    price: 1000000, 
    originalPrice: 2000000,
    setupFee: 150000,
    desc: "Animasi interaktif premium dengan GSAP untuk kesan WOW.", 
    relevantTo: ["portfolio-showcase", "maintenance-custom"], 
    category: "Experience & Visual" 
  },
  { 
    id: "google-maps-integration", 
    name: "Google Maps Integration", 
    price: 300000, 
    originalPrice: 500000,
    setupFee: 50000,
    desc: "Embed peta lokasi bisnis dengan pin & info kustom.", 
    relevantTo: ["portfolio-showcase", "maintenance-custom"], 
    category: "Optimization & SEO" 
  },
  { 
    id: "testimonial-review", 
    name: "Testimonial/Review Section", 
    price: 450000, 
    originalPrice: 750000,
    setupFee: 50000,
    desc: "Section testimoni/review pelanggan dengan layout dinamis.", 
    relevantTo: ["portfolio-showcase", "maintenance-custom"], 
    category: "Experience & Visual" 
  },
  { 
    id: "social-links-aggregator", 
    name: "Social Links Aggregator", 
    price: 400000, 
    originalPrice: 750000,
    setupFee: 50000,
    desc: "Kumpulkan semua link sosial media dalam satu tampilan elegan.", 
    relevantTo: ["link-in-bio-pro", "maintenance-custom"], 
    category: "Experience & Visual" 
  },
  { 
    id: "advanced-business-dashboard", 
    name: "Advanced Business Dashboard", 
    price: 2500000, 
    originalPrice: 5000000,
    setupFee: 250000,
    desc: "Dashboard admin bisnis lengkap dengan grafik & laporan.", 
    relevantTo: ["maintenance-custom"], 
    category: "Admin & Security" 
  },
  { 
    id: "custom-lead-form", 
    name: "Custom Lead Form (Advanced)", 
    price: 500000, 
    originalPrice: 1000000,
    setupFee: 75000,
    desc: "Form lead generation kustom dengan validasi & notifikasi.", 
    relevantTo: ["event-webinar-landing", "maintenance-custom"], 
    category: "Marketing & Growth" 
  }
];
