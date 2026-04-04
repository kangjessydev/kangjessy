export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  icon: string;
  color: string;
  description: string;
  content: string;
  client: string;
  date: string;
  liveUrl: string;
  demoUrl?: string;
  demoType?: 'legacy' | 'nda';
  githubUrl: string;
  image?: string;
  gallery?: string[];
  steps?: { title: string; desc: string }[];
  status?: string;
  challenge?: { title?: string; description: string; painPoints?: string[] };
  pivot?: { title: string; subtitle: string; items: { icon: string; title: string; desc: string }[] };
  metrics?: { value: string; label: string; icon: string }[];
  faqs?: { q: string; a: string }[];
  impact?: string;
  technologies?: string[];
  relatedServices?: string[]; // IDs of services where this project should appear as a case study
  goals?: { title: string; desc: string }[];
}

// @ts-ignore - import raw markdown
import hijiruContent from "./case-studies/hijiru-company-profile.md?raw";
import herbalInsaniContent from "./case-studies/redesign-wisata-herbal-insani.md?raw";
import villaPurnamaContent from "./case-studies/villa-purnama-ubud.md?raw";

export const projectsData: Project[] = [
  // --- NEW VISUAL SHOWCASE (HOME FOCUS) ---
  {
    id: 101,
    slug: "arkana-consultant",
    title: "Arkana Consultant",
    category: "Corporate Style",
    tags: ["Professional", "Corporate", "Clean"],
    icon: "Building2",
    color: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    description: "Desain profesional dan otoritatif untuk perusahaan konsultan skala besar.",
    content: "## Desain Corporate yang Terpercaya\n\nMenonjolkan sisi profesionalisme dengan tipografi yang kuat dan tata letak yang terstruktur rapi. Cocok untuk industri yang mengedepankan kepercayaan dan integritas.",
    client: "Arkana Group",
    date: "Agt 2025",
    liveUrl: "https://kangjessydev.github.io/arkana-consultant",
    githubUrl: "",
    status: "SHOWCASE"
  },
  {
    id: 102,
    slug: "warung-dapur-nusantara",
    title: "Warung Dapur Nusantara",
    category: "Vibrant Style",
    tags: ["Cheerful", "Culinary", "Vibrant"],
    icon: "UtensilsCrossed",
    color: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
    description: "Nuansa ceria dan menggugah selera untuk marketplace kuliner lokal.",
    content: "## Energi Kuliner Nusantara\n\nPenggunaan warna-warna hangat dan elemen visual yang playful untuk menciptakan pengalaman yang bersahabat bagi pelanggan.",
    client: "Dapur Nusantara",
    date: "Sep 2025",
    liveUrl: "https://kangjessydev.github.io/warung-dapur-nusantara",
    githubUrl: "",
    status: "SHOWCASE"
  },
  {
    id: 103,
    slug: "villa-purnama-ubud",
    title: "Villa Purnama Ubud",
    category: "Minimalist Style",
    tags: ["Minimalist", "Luxury", "Clean"],
    icon: "Palmtree",
    color: "linear-gradient(135deg, #059669 0%, #064e3b 100%)",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
    description: "Estetika minimalis dan mewah yang tenang, terinspirasi dari alam Ubud.",
    content: villaPurnamaContent,
    client: "Purnama Hospitality",
    date: "Okt 2025",
    liveUrl: "https://kangjessydev.github.io/villa-purnama-ubud",
    githubUrl: "",
    status: "SHOWCASE"
  },
  {
    id: 104,
    slug: "nexara",
    title: "Nexara",
    category: "Modern Tech Style",
    tags: ["Modern", "Tech", "SaaS"],
    icon: "Cpu",
    color: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    description: "Dark mode dengan elemen futuristik untuk platform teknologi dan SaaS.",
    content: "## Masa Depan Digital\n\nImplementasi glassmorphism dan efek gradasi neon yang memberikan kesan tech-heavy dan mutakhir.",
    client: "Nexara Corp",
    date: "Nov 2025",
    liveUrl: "https://kangjessydev.github.io/nexara",
    githubUrl: "",
    status: "SHOWCASE"
  },
  {
    id: 105,
    slug: "rupa",
    title: "Rupa",
    category: "Creative Style",
    tags: ["Artistic", "Creative", "Bold"],
    icon: "Palette",
    color: "linear-gradient(135deg, #d946ef 0%, #a855f7 100%)",
    image: "/projects/rupa-cover.png",
    description: "Desain berani dan artistik untuk agensi kreatif yang ingin tampil beda.",
    content: "## Ekspresi Tanpa Batas\n\nLayout yang unik dan berani, memadukan seni visual dengan fungsionalitas web modern.",
    client: "Rupa Agency",
    date: "Des 2025",
    liveUrl: "https://kangjessydev.github.io/rupa",
    githubUrl: "",
    status: "SHOWCASE"
  },
  {
    id: 106,
    slug: "ruang-studio",
    title: "Ruang Studio",
    category: "Clean Studio Style",
    tags: ["Minimal", "Studio", "Gallery"],
    icon: "Camera",
    color: "linear-gradient(135deg, #000000 0%, #171717 100%)",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop",
    description: "Aesthetic minimalis hitam-putih untuk showcase studio fotografi.",
    content: "## Fokus pada Karya\n\nMenghilangkan distraksi untuk memastikan setiap karya foto mendapatkan atensi penuh melalui desain yang bersih.",
    client: "Ruang Studio",
    date: "Jan 2026",
    liveUrl: "https://kangjessydev.github.io/ruang-studio/",
    githubUrl: "",
    status: "SHOWCASE"
  },

  // --- WORDPRESS & CMS ---
  {
    id: 18,
    slug: "redesign-wisata-herbal-insani",
    title: "Redesign Wisata Herbal Insani",
    category: "WordPress",
    tags: ["WordPress", "Custom Plugin Development", "Native PHP", "UI/UX Redesign", "Custom Post Type"],
    icon: "Trees",
    color: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
    image: "/projects/cover_herbal_insani_4_optimized.webp",
    description: "Transformasi website jadul menjadi Modern Clean Web. Rebuild sistem dari Elementor ke Custom Plugin menggunakan kode Native (Pure PHP/HTML/CSS/JS) untuk performa instan.",
    content: herbalInsaniContent,
    client: "Wisata Herbal Insani",
    date: "Mar 2025",
    liveUrl: "https://wisataherbal.com/",
    githubUrl: "",
    challenge: {
      title: "Legacy UI & Information Overload",
      description: "Website lama memiliki tampilan jadul, berat, dan membosankan dengan puluhan halaman paket yang redundan serta informasi yang tersegmentasi, menyulitkan admin dalam pengelolaan data.",
      painPoints: ["Inefficient UI", "Heavy Elementor Bloat", "Fragmented UX"]
    },
    steps: [
      { title: "UI & UX Consolidation", desc: "Merampingkan puluhan halaman paket menjadi sistem Tab tunggal interaktif dan menyatukan informasi kontak yang sebelumnya terpisah." },
      { title: "Modern Clean Redesign", desc: "Implementasi desain Modern Nature-centric (Putih/Hijau) dengan tatanan grid galeri baru yang jauh lebih rapi dan profesional." },
      { title: "Native Engine Rebuild", desc: "Membangun Custom Plugin dari nol menggunakan kode Native (PHP, HTML, CSS, JS) menggantikan page builder untuk performa muat halaman instan." }
    ],
    metrics: [
      { label: "Page Weight", value: "-75%", icon: "Zap" },
      { label: "Admin Velocity", value: "3x Faster", icon: "Clock" },
      { label: "UX Clarity", value: "Optimal", icon: "Monitor" }
    ],
    technologies: ["WordPress", "Custom Plugin Development", "Native PHP", "HTML5", "Vanilla CSS", "JavaScript", "Custom Post Type", "MySQL"],
    gallery: [
      "/projects/galeri_herbal_insani_1_optimized.webp",
      "/projects/galeri_herbal_insani_1.png",
      "/projects/galeri_herbal_insani_3_optimized.webp",
      "/projects/galeri_herbal_insani_4_optimized.webp"
    ],
    relatedServices: ["website-high-conversion", "maintenance-custom"]
  },
  {
    id: 1,
    slug: "hijiru-company-profile",
    title: "Hijiru Company Profile",
    category: "WordPress",
    tags: ["WordPress", "Elementor", "MySQL", "PHP"],
    icon: "Globe",
    color: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    // Placeholder High-Quality Image (Business/Tech)
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    description: "Website profil perusahaan dengan plugin custom untuk toko & preview ebook.",
    content: hijiruContent,
    
    client: "Hijiru",
    date: "Mar 2025",
    
    liveUrl: "",
    demoUrl: "https://demo.kangjessy.com/hijiru",
    demoType: "legacy",
    githubUrl: "#",
    pivot: {
      title: "Technical Pivot",
      subtitle: "Fase 01.5 / Hybrid Engineering",
      items: [
        { icon: "Layers", title: "Hybrid Architecture Execution", desc: "Menjalankan dual-stack system dimana core database tetap menggunakan struktur legacy namun frontend dirender ulang menggunakan engine modern untuk fleksibilitas maksimal." },
        { icon: "Zap", title: "Plugin-First Development", desc: "Mengekstrak 100% bisnis logic komunitas (Lomba Dzikir) dari theme functions ke dalam custom plugin independen, menjamin keamanan data saat ganti tema." },
        { icon: "Database", title: "Database Synchronization Bridge", desc: "Membangun middleware internal yang men-sinkronisasi tabel user WooCommerce dengan tabel member lama secara real-time tanpa konflik ID." },
        { icon: "Activity", title: "Extreme Performance Engineering", desc: "Implementasi 'Asset Unloading' agresif yang mematikan script CSS/JS pihak ketiga pada halaman yang tidak membutuhkannya, mengejar skor hijau Core Web Vitals." }
      ]
    },
    technologies: ["WordPress", "Elementor Pro", "WooCommerce", "Advanced Custom Fields", "PHP 8.2", "MySQL", "Redis Object Cache"],
    faqs: [
      {
        q: "Apakah plugin custom akan hilang jika WordPress diupdate?",
        a: "Tidak. Plugin dikembangkan dengan standar WordPress Codex terbaru dan terpisah dari theme, sehingga aman terhadap update core WordPress."
      },
      {
        q: "Bagaimana dengan kecepatan website mengingat banyaknya fitur?",
        a: "Kami menggunakan Redis Object Cache dan teknik 'Asset Unloading' untuk mematikan skrip yang tidak dipakai di halaman tertentu, menjaga PageSpeed skor tetap hijau (90+)."
      },
      {
        q: "Apakah data member lama bisa diselamatkan?",
        a: "Ya, 100% data member dan riwayat transaksi berhasil dimigrasikan ke database baru dengan integritas yang terjaga."
      }
    ],
    goals: [
      { title: "Transformasi Visual", desc: "Redesign total dari tampilan konvensional ke estetika 'Neo-Minimalist' setara butik fashion global." },
      { title: "Mobile Conversion", desc: "Memangkas checkout flow di smartphone dari 5 langkah menjadi 2 langkah seamless." },
      { title: "Unified Ecosystem", desc: "Integrasi database user toko & komunitas dalam satu sistem Single Sign-On (SSO)." },
      { title: "Speed Performance", desc: "Mengejar skor Core Web Vitals hijau stabil (>90) dengan teknik Asset Unloading." },
      { title: "Scalable Infrastructure", desc: "Persiapan arsitektur serverless untuk menangani lonjakan trafik 1000% saat musim Ramadhan." },
      { title: "Marketing Automation", desc: "Sistem loyalty point otomatis yang terhubung langsung ke email receipt & WhatsApp." }
    ],
    metrics: [
      { label: "PageSpeed Score", value: "96/100", icon: "Zap" },
      { label: "User Retention", value: "+40%", icon: "TrendingUp" },
      { label: "Server Uptime", value: "99.99%", icon: "Activity" }
    ],
    challenge: {
      title: "Latar Belakang & Tantangan",
      description: `
        <p class="mb-6">Hijiru, sebagai pelopor brand perlengkapan ibadah premium di Indonesia, menghadapi titik stagnasi digital yang kritis pada akhir kuartal 2024. Meskipun dikenal sebagai market leader dengan basis komunitas ribuan anggota aktif dalam program "Dzikir Harian", platform digital mereka masih terjebak dalam arsitektur generasi lama.</p>
        
        
      `,
      painPoints: ["Technical Debt Akut", "Database Fragmented", "Checkout Lambat"] 
    },
    steps: [
      { title: "Custom Plugin Core", desc: "Ekstraksi logika bisnis komunitas (Lomba Dzikir) menjadi plugin mandiri terpisah dari tema." },
      { title: "Unified SSO Ecosystem", desc: "Penyatuan database user WooCommerce & Komunitas dengan bridging authentication system." },
      { title: "Headless-Feel Frontend", desc: "Optimasi Elementor dengan Asset Unloading & Critical CSS agar terasa seringan aplikasi headless." },
      { title: "Interactive Ebook Reader", desc: "Integrasi PDF viewer HTML5 dengan efek page-flip responsif untuk preview buku digital." },
      { title: "Smart Inventory Lock", desc: "Sistem penguncian stok real-time via Redis untuk mencegah overselling saat flash sale." },
      { title: "Mobile-First Checkout", desc: "Redesign total flow pembayaran menjadi 2-step process yang dioptimalkan untuk jempol." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    slug: "nur-alam-security-hardening",
    title: "Nur Alam Security Hardening",
    category: "Security",
    tags: ["Security", "Firewall", "2FA", "Malware Removal"],
    icon: "ShieldCheck",
    color: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
    image: "/projects/nur-alam-security.png",
    description: "Proses pembersihan malware tingkat lanjut dan penguatan sistem keamanan server hotel bintang 4.",
    content: `
      <h2>The Breach Analysis</h2>
      <p>Serangan yang dialami Nur Alam Hotel dikategorikan sebagai <em>Japanese Keyword Hack</em> (SEO Spam) yang sangat persisten. Hacker menanamkan ribuan file HTML statis berisi link judi di dalam direktori <code>/wp-content/uploads</code> yang disamarkan seolah-olah file gambar.</p>
      
      <blockquote>
        "Sistem keamanan terbaik bukanlah yang paling mahal, tapi yang paling membosankan bagi peretas. Kami membuat server mereka 'mahal' untuk diretas."
      </blockquote>

      <h2>Defense Strategy</h2>
      <p>Kami menerapkan strategi <strong>Defense in Depth</strong> (berlapis). Tidak hanya mengandalkan plugin keamanan, kami melakukan hardening di level server (Nginx Config) dan level DNS (Cloudflare WAF).</p>
    `,
    client: "Nur Alam Hotel",
    date: "Jan 2025",
    liveUrl: "https://nuralamhotel.com",
    demoUrl: "",
    githubUrl: "",
    challenge: {
      title: "Serangan SEO Spam & Ransomware Note",
      description: `
        <p class="mb-6">Nur Alam Hotel, sebuah properti bintang 4 yang prestisius, mengalami "mimpi buruk digital" ketika portal reservasi utama mereka dibajak oleh sindikat peretas internasional. Pengunjung yang mencari kamar melalui Google dialihkan secara paksa ke situs judi online ilegal, menyebabkan penurunan direct booking hingga 90% dalam waktu kurang dari 24 jam.</p>
        
        <p class="mb-6">Situasi memburuk ketika tim IT internal mencoba membersihkan malware tersebut. Setiap kali file berbahaya dihapus, malware tersebut meregenerasi dirinya sendiri dalam hitungan menit. Ini adalah serangan <em>Polymorphic Backdoor</em> yang canggih, tertanam jauh di dalam file inti sistem dan menyamar sebagai file lisensi plugin resmi.</p>
        
        <p class="mb-6">Reputasi hotel dipertaruhkan. Google Search Console memberikan penalti merah, melabeli situs sebagai "Berbahaya". Tamu korporat mulai membatalkan kontrak karena ketakutan data kartu kredit mereka bocor. Manajemen merasakan tekanan finansial yang luar biasa di tengah musim liburan yang sedang memuncak.</p>
        
        <p class="mb-6">Kami dipanggil untuk melakukan Audit Forensik Darurat. Investigasi kami menemukan "Patient Zero": sebuah celah keamanan di plugin slider yang tidak di-patch selama 3 bulan. Celah ini menjadi pintu masuk bagi peretas untuk menanamkan <em>Web Shell</em> yang memberikan mereka akses root penuh ke server.</p>
        
        <p class="mb-6">Backup sistem ternyata tidak berguna karena infeksi sudah terjadi sebelum siklus backup terakhir (Dormant Virus). Pilihan restore data mustahil dilakukan tanpa mengembalikan virusnya juga. Kami harus melakukan "operasi bedah digital" manual untuk memisahkan jaringan sel sehat dari sel kanker.</p>
        
        <p>Tujuannya bukan sekadar membersihkan, tapi membangun benteng digital baru. Kami mentransformasi arsitektur keamanan mereka dari reaktif menjadi proaktif, memastikan serangan serupa tidak akan pernah bisa menembus pertahanan hotel lagi di masa depan.</p>
      `,
      painPoints: ["Reputasi Brand Hancur", "Google Blacklist", "Traffic Loss 90%"]
    },
    pivot: {
      title: "Forensik & Investigasi",
      subtitle: "Fase 01.5 / Threat Hunting",
      items: [
        { icon: "Search", title: "Pattern Recognition Forensics", desc: "Menganalisis 1.2GB log server untuk melacak pola User-Agent aneh yang digunakan botnet saat menyuntikkan script." },
        { icon: "Code", title: "Malware De-obfuscation", desc: "Melakukan reverse engineering terhadap kode base64 yang disamarkan peretas untuk memahami cara kerja backdoor mereka." },
        { icon: "GitGraph", title: "Core Integrity Check", desc: "Membandingkan checksum file WordPress yang terpasang dengan repositori resmi WordPress.org untuk mendeteksi modifikasi sekecil 1 byte pun." },
        { icon: "Eye", title: "Honeypot Deployment", desc: "Memasang file jebakan (trap files) yang jika diakses akan otomatis memblokir IP penyerang secara permanen di level firewall." }
      ]
    },
    technologies: ["Cloudflare Enterprise", "Wordfence Premium", "WP-CLI", "Linux Hardening", "2FA Hardware Key"],
    faqs: [
      {
        q: "Apakah website benar-benar aman setelah dibersihkan?",
        a: "Ya. Kami memberikan garansi 12 bulan bebas infeksi ulang. Jika ada insiden, kami bersihkan ulang gratis."
      },
      {
        q: "Berapa lama waktu yang dibutuhkan untuk recovery?",
        a: "Pembersihan malware memakan waktu 4-6 jam, namun pemulihan reputasi SEO Google membutuhkan waktu 2-4 minggu."
      }
    ],
    goals: [
      { title: "Zero Reinfection Guarantee", desc: "Memastikan server 100% steril dari malware dan menutup semua celah backdoor yang mungkin tertinggal." },
      { title: "SEO Authority Restore", desc: "Mengembalikan ranking Google dan menghapus label peringatan 'Deceptive Site Ahead' di browser." },
      { title: "Bruteforce Immunity", desc: "Mencegah serangan tebak password dengan membatasi login attempt dan mewajibkan 2FA." },
      { title: "99.99% Server Uptime", desc: "Memastikan stabilitas server tetap terjaga meskipun sedang diserang DDoS Layer 7." },
      { title: "Data Integrity & Privacy", desc: "Melindungi database pelanggan dari ekstrusi data sesuai standar kepatuhan GDPR." },
      { title: "Security Awareness Culture", desc: "Melatih staf internal hotel untuk mengenali teknik Phishing dan Social Engineering." }
    ],
    metrics: [
      { label: "THREATS BLOCKED", value: "15k+", icon: "ShieldAlert" },
      { label: "SECURITY SCORE", value: "A+", icon: "Lock" },
      { label: "RECOVERY TIME", value: "4 Hours", icon: "Clock" }
    ],
    steps: [
      { title: "Deep Forensic Audit", desc: "Scanning menyeluruh menggunakan tools heuristik untuk menemukan letak malware yang tersembunyi (Obfuscated Code)." },
      { title: "Surgical Malware Removal", desc: "Pembersihan manual file-file terinfeksi tanpa merusak fungsionalitas website utama." },
      { title: "Core System Hardening", desc: "Mematikan eksekusi PHP di folder /uploads dan /cache untuk mencegah upload script jahat." },
      { title: "WAF Implementation", desc: "Pemasangan Web Application Firewall (Cloudflare) dengan aturan ketat untuk memblokir botnet." },
      { title: "Strict 2FA Enforcement", desc: "Mewajibkan Two-Factor Authentication untuk semua akun administrator tanpa terkecuali." },
      { title: "Immutable Backup Strategy", desc: "Setup backup off-site otomatis yang tidak bisa dienkripsi oleh ransomware (WORM Storage)." }
    ],
    gallery: [
      "https://plus.unsplash.com/premium_photo-1767600118415-3ae902ccb5f1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1760199789455-49098afd02f0?q=80&w=1200&auto=format&fit=crop",
      "https://plus.unsplash.com/premium_photo-1682145181120-73cfdfc8a36d?q=80&w=1200&auto=format&fit=crop",
      "https://plus.unsplash.com/premium_photo-1733306489269-449d1e8ae119?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: 3,
    slug: "bogaraya-cloud-kitchen",
    title: "Bogaraya Cloud Kitchen",
    category: "Web App",
    tags: ["WordPress", "WCFM", "WooCommerce", "Mobile Optimized"],
    icon: "ShoppingBag",
    color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    image: "/projects/bogaraya-kitchen.png",
    description: "Platform Cloud Kitchen & Marketplace dengan arsitektur mobile-first untuk ekosistem mikro-kuliner.",
    content: "Transformasi layanan kuliner perhotelan melalui platform multi-vendor yang agresif secara UI. Menggabungkan fleksibilitas WordPress dengan kustomisasi logic marketplace untuk menciptakan pengalaman 'App-Like' yang seamless bagi tamu dan vendor.",
    client: "Bogaraya Group",
    date: "Nov 2024",
    liveUrl: "",
    demoUrl: "https://bogaraka.vercel.app",
    demoType: "legacy",
    githubUrl: "#",
    challenge: {
      description: "Membangun platform cloud kitchen di area wisata Lembang yang awalnya direncanakan sebagai aplikasi native. Masalah utama muncul pada keterbatasan standard plugin multi-vendor dalam menangani alur kerja spesifik hotel-to-kitchen dan user interface yang dituntut setara dengan aplikasi food delivery papan atas tanpa biaya pengembangan aplikasi native yang masif."
    },
    steps: [
      { title: "Engine Re-Engineering", desc: "Melakukan migrasi strategis dari Dokan ke WCFM untuk membuka akses API dan Filter Hooks yang lebih fleksibel, memungkinkan kustomisasi alur transaksi yang tidak didukung oleh out-of-the-box solution." },
      { title: "Mobile UI Simulation", desc: "Menerapkan metodologi 'Pseudo-Native' menggunakan Elementor Pro dan ribuan baris custom CSS untuk mereplikasi perilaku aplikasi native seperti bottom-sheet navigation dan instant checkout." },
      { title: "Scalability Pivot", desc: "Mengarahkan arsitektur dari pengiriman jarak jauh yang berisiko tinggi menjadi 'Hyper-Local Marketplace' terkurasi guna menjamin kualitas layanan dan stabilitas operasional jangka panjang." }
    ],
    metrics: [
      { label: "PARTNER HOTELS", value: "10+", icon: "MapPinned" },
      { label: "VENDOR ECOSYSTEM", value: "45+", icon: "Boxes" },
      { label: "MOBILE CONVERSION", value: "92%", icon: "TrendingUp" }
    ],
    faqs: [
      { q: "Mengapa memilih WCFM daripada Dokan?", a: "WCFM memberikan kontrol granular atas skema database vendor dan integrasi custom hooks yang jauh lebih stabil untuk kebutuhan kustomisasi UI tingkat lanjut." }
    ],
    impact: "Digitalisasi ekosistem kuliner Lembang ini tidak hanya meningkatkan pendapatan vendor lokal, tetapi juga memberikan solusi layanan tamu yang modern bagi mitra hotel. Proyek ini membuktikan bahwa dengan arsitektur yang tepat, platform web bisa memberikan pengalaman pengguna sekelas aplikasi native dengan efisiensi biaya yang signifikan.",
    technologies: ["WordPress", "WCFM Marketplace", "WooCommerce", "Custom PHP Logic", "Mobile UI Patterns"],
    gallery: [
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
    ],
    relatedServices: ["website-high-conversion", "maintenance-custom"]
  },
  {
    id: 4,
    slug: "nur-alam-hotel-upgrades",
    title: "Nur Alam Hotel Upgrades",
    category: "WordPress",
    tags: ["Booking Engine", "Accounting Sync", "API Integration", "Fintech"],
    icon: "Hotel", 
    color: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    image: "/projects/hotel-booking.png",
    description: "Restrukturisasi booking engine dan integrasi ekosistem keuangan untuk skalabilitas operasional hotel.",
    content: "Modernisasi total sistem reservasi hotel dengan melakukan eliminasi pada infrastruktur yang tidak fleksibel. Fokus pada sinkronisasi otomatis data transaksi ke sistem Payment Gateway, manajemen afiliasi, dan modul akuntansi transaksional.",
    client: "Nur Alam Hotel",
    date: "Nov 2024",
    liveUrl: "#",
    githubUrl: "#",
    challenge: {
      description: "Legacy booking engine mengalami kegagalan teknis dalam menangani skalabilitas integrasi. Terjadi silo data yang parah antara pesanan tamu, gerbang pembayaran (Payment Gateway), dan pelaporan keuangan, yang mengakibatkan tingginya beban kerja administratif manual dan potensi kebocoran data transaksi."
    },
    steps: [
      { title: "Core Engine Migration", desc: "Mengganti total mesin reservasi dengan teknologi yang mendukung arsitektur berbasis hooks/API, memastikan setiap data pesanan dapat didistribusikan secara real-time ke modul pihak ketiga." },
      { title: "Financial Ecosystem Sync", desc: "Membangun jembatan otomatis (bridge) antara data reservasi dengan sistem akuntansi dasar dan dashboard afiliasi, mengeliminasi kebutuhan rekonsiliasi data manual." },
      { title: "Conversion Optimization", desc: "Pengembangan template Flash Sale dinamis dan optimasi katalog kamar untuk meminimalkan 'Bounce Rate' dan memaksimalkan 'Yield Management' pada periode low-season." }
    ],
    metrics: [
      { label: "ADMIN EFFICIENCY", value: "85%+", icon: "Zap" },
      { label: "TRANSACTION STABILITY", value: "100%", icon: "ShieldCheck" },
      { label: "INTEGRATED CHANNELS", value: "4+", icon: "BarChart" }
    ],
    faqs: [
      { q: "Apa urgensi mengganti plugin inti?", a: "Struktur data lama bersifat monolithic dan tertutup. Migrasi diperlukan untuk mendukung interoperabilitas data dengan sistem eksternal seperti akuntansi dan payment gateway." }
    ],
    impact: "Upgrade ini berhasil mengubah infrastruktur IT hotel dari sekadar 'brosur online' menjadi ekosistem digital yang terintegrasi penuh. Efisiensi operasional meningkat drastis seiring hilangnya proses administrasi manual, sementara pemilik memiliki visibilitas data yang jauh lebih akurat dan real-time.",
    technologies: ["WordPress", "Custom Hooks", "Midtrans Integration", "Affiliate WP", "Accounting Automation Logic"],
    relatedServices: ["maintenance-custom"]
  },
  {
    id: 5,
    slug: "hotel-sales-dashboard",
    title: "Hotel Sales Dashboard",
    category: "Analytics",
    tags: ["Google Apps Script", "Cloud Analytics", "Business Intelligence", "Automation"],
    icon: "BarChart3",
    color: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    image: "/projects/financial-dashboard.png",
    description: "Sistem Business Intelligence semi-otomatis untuk transparansi performa hotel secara real-time.",
    content: "Transformasi proses akuntansi dari spreadsheet manual yang rawan kesalahan menjadi dashboard cloud terpusat. Menggunakan arsitektur input tunggal untuk menghasilkan laporan keuangan komprehensif secara otomatis dan instan.",
    client: "Nur Alam Hotel",
    date: "Agu 2024",
    liveUrl: "#",
    githubUrl: "#",
    challenge: {
      description: "Operasional hotel terjebak dalam metodologi pelaporan Excel konvensional yang terfragmentasi. Akuntan menghabiskan waktu berjam-jam untuk entry data berulang, sementara manajemen tidak memiliki akses data real-time untuk pengambilan keputusan strategis yang cepat."
    },
    steps: [
      { title: "Logic Scripting (GAS)", desc: "Membangun 'Backbone' otomatisasi menggunakan Google Apps Script untuk menghubungkan berbagai sheet data mentah menjadi laporan terakumulasi (Jurnal & Cashflow) tanpa intervensi manual." },
      { title: "Single-Source Input", desc: "Merancang protokol input data tunggal (unified entry) untuk menjaga integritas data dan meminimalkan duplikasi informasi di seluruh laporan keuangan." },
      { title: "Cloud Accessibility", desc: "Menyediakan lapisan akses data (Data Access Layer) berbasis cloud yang memungkinkan stakeholders memantau arus kas dan okupansi secara remote dan real-time." }
    ],
    metrics: [
      { label: "REPORTING SPEED", value: "3x Faster", icon: "Zap" },
      { label: "DATA INTEGRITY", value: "Verified", icon: "ShieldCheck" },
      { label: "COST EFFICIENCY", value: "High", icon: "Target" }
    ],
    relatedServices: ["maintenance-custom"],
    faqs: [
      { q: "Mengapa tidak menggunakan aplikasi web khusus?", a: "Google Sheets dipilih sebagai 'Trade-off' antara biaya pengembangan yang rendah dengan fungsionalitas kolaborasi cloud yang sangat familiar di sisi staf operasional." }
    ],
    impact: "Proyek ini membuktikan bahwa efisiensi tinggi bisa dicapai melalui optimalisasi perangkat yang sedia ada. Dampaknya terasa langsung pada kecepatan pengambilan keputusan manajemen, di mana owner kini memiliki kendali penuh atas data keuangan dari mana saja tanpa hambatan teknokratis.",
    technologies: ["Google Apps Script", "Cloud Sheets Analytics", "Custom Financial Logic", "Data Visualization"]
  },
  {
    id: 6,
    slug: "bank-usaha-rakyat-profile",
    title: "Bank Usaha Rakyat Profile",
    category: "WordPress",
    tags: ["Digital Transformation", "Legacy System Migration", "Information Architecture"],
    icon: "Building2",
    color: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=800&auto=format&fit=crop",
    description: "Restrukturisasi total infrastruktur digital perbankan untuk mengeliminasi technical debt dan memulihkan kredibilitas institusi.",
    content: "Membangun ulang ekosistem web korporat Bank Usaha Rakyat dengan pendekatan 'Clean-Slate'. Fokus utama adalah pembersihan fitur redundan (Ghost Features) dan implementasi WooCommerce sebagai mesin data untuk manajemen katalog layanan perbankan yang terstruktur.",
    client: "Bank Usaha Rakyat",
    date: "Feb 2024",
    liveUrl: "",
    demoUrl: "https://bank-usaha-yayat.vercel.app",
    demoType: "legacy",
    githubUrl: "#",
    challenge: {
      description: "Infrastruktur digital bank sebelumnya berada dalam kondisi kritis akibat akumulasi 'Technical Debt' bertahun-tahun. Website dipenuhi oleh tumpukan kode kustomisasi yang tidak terdokumentasi dan fitur-fitur redundan (Ghost Features) yang tidak berfungsi, sehingga merusak performa sistem dan menurunkan kepercayaan nasabah terhadap profesionalitas digital bank."
    },
    steps: [
      { title: "Legacy System Audit & Purge", desc: "Melakukan identifikasi dan pembersihan total (purge) terhadap kode legacy dan fitur sisa yang tidak relevan untuk mengembalikan stabilitas fundamental platform." },
      { title: "Architectural Re-Templating", desc: "Implementasi desain korporat modern dengan optimasi Elementor tingkat lanjut, memastikan setiap komponen visual mencerminkan standar kepercayaan dan keamanan perbankan." },
      { title: "WooCommerce Data Orchestration", desc: "Pemanfaatan WooCommerce secara strategis sebagai 'Data Middleware' untuk mengelola struktur produk keuangan (Kredit, Deposito) agar memiliki alur data yang rapi dan mudah di-maintenance oleh tim operasional." }
    ],
    metrics: [
      { label: "CLEAN ARCHITECTURE", value: "100%", icon: "ShieldCheck" },
      { label: "ADMIN MAINTAINABILITY", value: "High", icon: "Zap" },
      { label: "UX STABILITY", value: "Enterprise", icon: "Monitor" }
    ],
    faqs: [
      { q: "Mengapa menggunakan WooCommerce untuk bank profile?", a: "WooCommerce menyediakan skema input data yang sangat stabil dan teruji untuk manajemen profil produk keuangan, memudahkan administrasi data tanpa harus membangun modul kustom dari nol." },
      { q: "Apa dampak dari eliminasi Ghost Features?", a: "Menurunkan beban kerja server secara signifikan dan menghilangkan kebingungan pengguna (User Confusion) akibat adanya navigasi ke fitur yang sudah tidak aktif." }
    ],
    impact: "Transformasi ini berhasil memulihkan standar digital Bank Usaha Rakyat. Dengan menghapus beban sistem masa lalu dan menerapkan arsitektur data yang modern, bank kini memiliki platform yang tidak hanya estetik secara visual, tetapi juga efisien secara operasional dan kredibel di mata nasabah.",
    technologies: ["WordPress", "Elementor Pro Architecture", "WooCommerce Data Engine", "Legacy Cleanup Protocols", "Corporate Identity Standards"],
    gallery: [
      "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop"

    ],
    relatedServices: ["website-high-conversion"]
  },
  {
    id: 7,
    slug: "nur-alam-hotel-main-web",
    title: "Nur Alam Hotel Main Web",
    category: "WordPress",
    tags: ["Digital Restoration", "Infrastructure Stability", "Legacy Migration"],
    icon: "Monitor",
    color: "linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)",
    image: "https://plus.unsplash.com/premium_photo-1661962360741-255d65cedcd1?q=80&w=800&auto=format&fit=crop",
    description: "Restorasi platform digital hotel melalui re-engineering total dari infrastruktur legacy yang sudah tidak didukung vendor.",
    content: "Mengatasi kebuntuan teknis akibat penggunaan tema lama yang ditinggalkan pengembangnya (Abandoned Theme). Proyek ini berfokus pada pemulihan stabilitas ekosistem web hotel melalui audit plugin dan implementasi framework baru yang bersih.",
    client: "Nur Alam Hotel",
    date: "Feb 2024",
    liveUrl: "https://nuralamhotel.com",
    githubUrl: "#",
    challenge: {
      description: "Website lama berada dalam kondisi 'Technically Dying' karena tema inti di ThemeForest tidak lagi menerima update dari penjual. Hal ini memicu rentetan konflik plugin yang melumpuhkan fitur-fitur kritis, merusak layout, dan mengancam keamanan data reservasi tamu."
    },
    steps: [
      { title: "Legacy System Audit & Purge", desc: "Melakukan audit mendalam untuk membedah sumber konflik plugin dan membersihkan kode-kode kustom lama yang tidak terdokumentasi." },
      { title: "Clean-Slate Re-Engineering", desc: "Konstruksi ulang website menggunakan arsitektur modern yang stabil, memastikan interoperabilitas sempurna antara tema baru dengan mesin reservasi (Booking Engine)." },
      { title: "Full Content Migration", desc: "Migrasi data dan re-konfigurasi modul konten untuk memastikan transisi sistem berjalan 'Zero-Downtime' bagi tamu hotel." }
    ],
    metrics: [
      { label: "STABILITY RATE", value: "100%", icon: "ShieldCheck" },
      { label: "PLUGIN CONFLICT", value: "Zero", icon: "Zap" },
      { label: "UX INTEGRITY", value: "Verified", icon: "Monitor" }
    ],
    faqs: [
      { q: "Mengapa harus dibuat dari nol?", a: "Memperbaiki tema yang sudah tidak di-update oleh vendor aslinya sama dengan membangun di atas pondasi yang retak. Re-build adalah satu-satunya jalan menuju stabilitas jangka panjang." }
    ],
    impact: "Web utama ini kini beroperasi tanpa hambatan teknis. Pembersihan 'Technical Debt' masa lalu berhasil menghilangkan seluruh keluhan bug dari tamu dan memberikan tim manajemen platform promosi yang stabil, aman, dan profesional.",
    technologies: ["WordPress Ecosystem", "Premium Theme Architecture", "Booking Engine Sync", "Conflict Resolution Protocols"],
    relatedServices: ["website-high-conversion"]
  },
  {
    id: 8,
    slug: "whatsapp-banking-system",
    title: "WhatsApp Banking System",
    category: "Automation",
    tags: ["FinTech Innovation", "Low-Code Architecture", "Serverless Middleware"],
    icon: "MessageCircle",
    color: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
    image: "/projects/whatsapp-banking.png",
    description: "Inovasi layanan perbankan tanpa aplikasi (App-less) untuk memitigasi hambatan regulasi dan teknis adopsi nasabah.",
    content: "Menciptakan saluran perbankan alternatif yang memanfaatkan infrastruktur WhatsApp sebagai antarmuka utama. Projek ini lahir sebagai solusi strategis atas batasan regulasi operasional perbankan (BPR) dan kebutuhan akan akses informasi finansial yang instan tanpa hambatan instalasi aplikasi.",
    client: "Bank Usaha Rakyat",
    date: "Feb 2024",
    liveUrl: "",
    demoUrl: "https://bawa-banking.vercel.app",
    demoType: "legacy",
    githubUrl: "#",
    challenge: {
      description: "Adanya restriksi regulasi yang membatasi pengembangan aplikasi native mandiri bagi institusi perbankan lokal, sekaligus tingginya 'Digital Barrier' pada nasabah rural untuk mempelajari aplikasi baru. Bank membutuhkan modul layanan yang aman, legal, namun sangat ringan untuk diakses secara masal."
    },
    pivot: {
      title: "Architecture & Tooling Pivot",
      subtitle: "Fase 01.5 / Decision Logic",
      items: [
        { icon: "Database", title: "Scale-up: Access to Cloud Sheets", desc: "Awalnya direncanakan menggunakan MS Access, namun diputuskan migrasi ke Google Sheets untuk mendukung sinkronisasi data real-time via Cloud tanpa infrastruktur server fisik yang mahal." },
        { icon: "Share2", title: "Automation Engine (GAS)", desc: "Memanfaatkan Google Apps Script sebagai jembatan otomatisasi antara input WhatsApp dengan ekosistem pelaporan bank, memastikan alur data yang 'Zero-latency'." }
      ]
    },
    steps: [
      { title: "Strategic Architecture Pivot", desc: "Memutuskan penggunaan Google Sheets & Apps Script sebagai 'Cloud Middleware' yang jauh lebih maintainable dan efisien secara biaya dibandingkan database on-premise konvensional." },
      { title: "Command-Based Interaction Logic", desc: "Membangun parser pesan berbasis kode (e.g., TAB #norek#pin) yang diproses secara real-time oleh serverless logic untuk validasi keamanan dan penarikan data saldo/kredit nasabah." },
      { title: "Operational Scaling", desc: "Implementasi fitur manajemen mandiri nasabah seperti fitur ganti PIN dan sistem feedback (Review) yang terintegrasi langsung ke dashboard monitoring internal." }
    ],
    metrics: [
      { label: "USER BARRIER", value: "0%", icon: "Zap" },
      { label: "DEV EFFICIENCY", value: "High", icon: "TrendingUp" },
      { label: "ACCESSIBILITY", value: "24/7", icon: "Clock" }
    ],
    faqs: [
      { q: "Mengapa menggunakan WhatsApp?", a: "WhatsApp memiliki tingkat penetrasi hampir 100% pada nasabah. Menghilangkan kebutuhan 'Download & Install' secara drastis meningkatkan volume penggunaan layanan digital bank." },
      { q: "Bagaimana dengan keamanan data?", a: "Sistem menerapkan validasi ganda (No Rekening & PIN) yang diverifikasi secara enkripsi sederhana melalui logic Apps Script sebelum data sensitif dikirimkan kembali ke chat." }
    ],
    impact: "Sistem ini berhasil memposisikan Bank Usaha Rakyat sebagai pionir layanan digital di kategorinya. Digitalisasi saldo dan informasi kredit ini tidak hanya meningkatkan transparansi, tetapi juga menurunkan beban kerja customer service fisik secara signifikan melalui otomasi informasi rutin nasabah.",
    technologies: ["Google Apps Script", "Google Sheets Database", "WhatsApp Integration Logic", "Serverless API Hooks", "FinTech Compliance Patterns"],
    relatedServices: ["maintenance-custom"]
  },
  {
    id: 9,
    slug: "syarief-hasan-profile",
    title: "Syarief Hasan Profile",
    category: "WordPress",
    tags: ["Public Branding", "SEO Strategy", "Ticketing System", "Multimedia Management"],
    icon: "UserCheck",
    color: "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)",
    image: "https://images.unsplash.com/photo-1555421689-3f034debb7a6?q=80&w=800&auto=format&fit=crop",
    description: "Digital Hub komprehensif untuk personal branding dan manajemen interaksi publik tokoh nasional.",
    content: "Membangun portal informasi terpusat yang menggabungkan manajemen arsip multimedia volume tinggi dengan sistem aktivasi pendukung melalui manajemen tiket acara yang terintegrasi.",
    client: "Syarief Hasan",
    date: "Sep 2023",
    liveUrl: "https://syariefhasan.com",
    githubUrl: "#",
    challenge: {
      description: "Manajemen narasi publik untuk tokoh nasional membutuhkan infrastruktur yang mampu menangani lonjakan trafik secara mendadak dan manajemen aset multimedia yang mencapai ribuan file tanpa mengorbankan kecepatan akses dan kejelasan informasi bagi publik."
    },
    steps: [
      { title: "Multimedia Asset Pipeline", desc: "Merancang sistem manajemen gambar dan video yang teroptimasi secara cerdas untuk memastikan dokumentasi aktivitas tetap berkualitas namun tetap ringan untuk diakses dari berbagai koneksi." },
      { title: "Public Interaction Engine", desc: "Mengembangkan modul pendaftaran dan tiket acara kampanye yang tersinkronisasi, memungkinkan tim pengelola mendapatkan data audiens secara terstruktur." },
      { title: "Search Identity Engineering", desc: "Melakukan optimasi SEO teknis pada seluruh lapisan konten untuk menjamin sumber informasi resmi selalu mendominasi hasil pencarian publik." }
    ],
    metrics: [
      { label: "ASSET VOLUME", value: "Thousands", icon: "Boxes" },
      { label: "SEO AUTHORITY", value: "High", icon: "Target" },
      { label: "COMM. STABILITY", value: "Excellent", icon: "ShieldCheck" }
    ],
    impact: "Portal ini kini berdiri sebagai 'Single Source of Truth' bagi media dan pendukung. Keberhasilan dalam mengintegrasikan sistem event ke dalam web profil meningkatkan efektivitas tim lapangan dalam mengelola mobilisasi massa secara lebih data-driven.",
    technologies: ["WordPress", "Premium Multimedia Caching", "Event Ticketing Logic", "Advanced SEO Profiling"],
    relatedServices: ["website-high-conversion"]
  },
  {
    id: 10,
    slug: "bwa-store",
    title: "BWA Store",
    category: "Full Stack",
    tags: ["Laravel", "Vue.js", "State Management", "E-commerce Architecture"],
    icon: "ShoppingCart",
    color: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    image: "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?q=80&w=800&auto=format&fit=crop",
    description: "Ekosistem E-commerce modern dengan implementasi arsitektur multi-role yang robust.",
    content: "Konstruksi platform perdagangan digital menggunakan Laravel dan Vue.js yang berfokus pada flow transaksi yang reaktif. Mengimplementasikan manajemen siklus operasional dari sisi penjual hingga pengalaman belanja pembeli.",
    client: "Course Project",
    date: "Apr 2023",
    liveUrl: "#",
    githubUrl: "#",
    challenge: {
      description: "Sinkronisasi status transaksi di lingkungan multi-role seringkali menjadi titik lemah performa. Tantangannya adalah membangun arsitektur data yang konsisten antara backend Laravel dengan frontend reaktif Vue untuk menjamin akurasi data pesanan dan pembayaran."
    },
    steps: [
      { title: "Multi-Role Logic Mapping", desc: "Merancang isolasi logic yang ketat antara dashboard seller dan buyer, memastikan integritas fungsi manajemen produk dan keranjang belanja tetap aman dan terpisah." },
      { title: "State-Driven Transaction", desc: "Membangun alur pembayaran menggunakan Midtrans dengan integrasi webhook untuk memastikan UI secara otomatis merefleksikan status pembayaran paling mutakhir secara instan." }
    ],
    metrics: [
      { label: "REACTIVITY", value: "High", icon: "Zap" },
      { label: "DATABASE INTEGRITY", value: "Verified", icon: "ShieldCheck" }
    ],
    impact: "Berhasil mendemonstrasikan kapabilitas teknis dalam menangani seluruh end-to-end lifecycle e-commerce, mulai dari arsitektur database hingga implementasi fungsionalitas reaktif di sisi pengguna.",
    technologies: ["Laravel", "Vue.js", "Tailwind CSS", "MySQL", "Fintech Payment Hooks"],
    relatedServices: ["maintenance-custom"]
  },
  {
    id: 11,
    slug: "laracamp-learning",
    title: "Laracamp Learning",
    category: "Full Stack",
    tags: ["Laravel", "Educational Platform", "UX Flow", "Backend Management"],
    icon: "BookOpen",
    color: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop",
    description: "Platform manajemen kurikulum bootcamp yang mendepankan efisiensi alur registrasi.",
    content: "Membangun Learning Management System (LMS) minimalis yang berfokus pada kejelasan jalur pembelajaran dan otomasi proses pendaftaran peserta dengan struktur backend yang rapi.",
    client: "Course Project",
    date: "Feb 2023",
    liveUrl: "#",
    githubUrl: "#",
    challenge: {
      description: "Masalah utama pada platform edukasi seringkali terletak pada rumitnya alur pendaftaran yang mengakibatkan penurunan konversi peserta. Dibutuhkan sistem checkout materi yang simpel namun tetap memiliki sistem validasi admin yang kuat di sisi backend."
    },
    steps: [
      { title: "Curriculum Schema Design", desc: "Menyusun skema database modular untuk mendukung penataan kurikulum yang dapat berkembang seiring bertambahnya materi bootcamp di masa depan." },
      { title: "Simplified Checkout Flow", desc: "Melakukan optimasi UX pada proses pendaftaran peserta untuk mengurangi 'Step Count', memastikan pesanan materi tercatat secara instan di sisi manajemen." }
    ],
    metrics: [
      { label: "USER FLOW", value: "Optimized", icon: "Zap" },
      { label: "ARCH. CLEANLINESS", value: "Solid", icon: "ShieldCheck" }
    ],
    impact: "Platform ini menjadi bukti penerapan standar pengerjaan aplikasi yang memprioritaskan fungsi inti dan kemudahan penggunaan, menghasilkan fondasi teknis yang kuat untuk pengembangan fitur pembelajaran lebih lanjut.",
    technologies: ["Laravel Framework", "Blade Engine", "Database Relationships", "Admin Controls"],
    relatedServices: ["maintenance-custom"]
  },
  // --- 2025-2026 IDEAS ---
  {
    id: 12,
    slug: "sentinel-security-portal",
    title: "Sentinel Security Portal",
    category: "Security",
    tags: ["SaaS", "Security", "Real-time"],
    icon: "ShieldAlert",
    status: "IDEA",
    color: "linear-gradient(135deg, #4b5563 0%, #1f2937 100%)",
    image: "/projects/nur-alam-security.png",
    description: "Portal monitoring keamanan terpusat untuk mengelola 20+ website sekaligus.",
    content: "Konsep portal keamanan enterprise yang memberikan visibilitas penuh atas status keamanan portofolio website. Menampilkan grafik percobaan serangan real-time, status integritas file, dan sistem hardening satu klik.",
    client: "R&D Project",
    date: "2025 Idea",
    liveUrl: "#",
    githubUrl: "#",
    relatedServices: ["maintenance-custom"]
  },
  {
    id: 13,
    slug: "eco-flow-dashboard",
    title: "Eco-Flow Dashboard",
    category: "Analytics",
    tags: ["SaaS", "Data Viz", "Sustainability"],
    icon: "Leaf",
    status: "IDEA",
    color: "linear-gradient(135deg, #059669 0%, #064e3b 100%)",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop",
    description: "Dashboard pelacakan jejak karbon dan efisiensi energi berbasis interaksi data premium.",
    content: "Visualisasi data kompleks untuk keberlanjutan lingkungan. Menggunakan bento-grid layout untuk menampilkan konsumsi energi, prediksi penghematan, dan sertifikasi karbon secara intuitif.",
    client: "R&D Project",
    date: "2025 Idea",
    liveUrl: "#",
    githubUrl: "#",
    relatedServices: ["maintenance-custom"]
  },
  {
    id: 14,
    slug: "the-artisan-3d-experience",
    title: "The Artisan 3D Experience",
    category: "Creative",
    tags: ["Three.js", "WebGPU", "Storytelling"],
    icon: "Boxes",
    status: "IDEA",
    color: "linear-gradient(135deg, #d97706 0%, #78350f 100%)",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    description: "Landing page e-commerce imersif dengan interaksi 3D explode-view untuk produk mewah.",
    content: "Eksperimen visual menggunakan Three.js untuk menciptakan pengalaman belanja yang imersif. Produk dapat diputar, dibongkar (exploded view), dan materialnya dapat diubah secara real-time di browser.",
    client: "R&D Project",
    date: "2026 Idea",
    liveUrl: "#",
    githubUrl: "#",
    relatedServices: ["website-high-conversion"]
  },
  {
    id: 15,
    slug: "leadaudit-ai-agent",
    title: "LeadAudit AI Agent",
    category: "AI",
    tags: ["AI Agent", "Automation", "B2B"],
    icon: "Cpu",
    status: "IDEA",
    color: "linear-gradient(135deg, #6366f1 0%, #312e81 100%)",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    description: "Agen AI otonom yang melakukan audit website otomatis untuk lead generation agensi.",
    content: "Sistem cerdas yang secara otonom men-scan website calon klien, menganalisis kelemahan, dan menyusun laporan audit profesional yang dipersonalisasi untuk memenangkan deal agensi secara otomatis.",
    client: "R&D Project",
    date: "2025 Idea",
    liveUrl: "#",
    githubUrl: "#",
    relatedServices: ["maintenance-custom"]
  },
  {
    id: 16,
    slug: "urbanconnect-geo-hub",
    title: "UrbanConnect Geo-Hub",
    category: "Community",
    tags: ["Real-time", "Geolocation", "Community"],
    icon: "MapPinned",
    status: "IDEA",
    color: "linear-gradient(135deg, #f43f5e 0%, #881337 100%)",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop",
    description: "Platform sumber daya komunitas real-time dengan pemetaan partisipatif untuk respon cepat.",
    content: "Aplikasi komunitas yang memungkinkan warga saling berbagi sumber daya secara real-time pada peta interaktif. Fokus pada kecepatan akses dan kemudahan pelaporan insiden lokal secara kolaboratif.",
    client: "R&D Project",
    date: "2026 Idea",
    liveUrl: "#",
    githubUrl: "#",
    relatedServices: ["website-high-conversion"]
  },
  {
    id: 17,
    slug: "bank-usaha-rakyat-test",
    title: "Bank Usaha Rakyat - Mobile Banking Hub",
    category: "Financial System",
    tags: ["Mobile First", "Security", "Nuxt.js", "TailwindCSS"],
    icon: "ShieldCheck",
    color: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
    image: "/projects/financial-dashboard.png",
    description: "Transformasi layanan perbankan konvensional menuju ekosistem digital yang modern dan inklusif.",
    content: `
      <h2>Visi Digitalisasi Ruang Finansial</h2>
      <p>Proyek ini merupakan langkah strategis Bank Usaha Rakyat untuk menjangkau nasabah milenial dan pelaku UMKM dengan antarmuka yang lebih segar dan fungsional. Kami membangun ulang sistem interaksi nasabah agar lebih intuitif namun tetap menjaga standar keamanan perbankan tingkat tinggi.</p>
      
      <blockquote>
        "Masa depan perbankan bukan lagi soal gedung fisik, tapi soal seberapa mudah akses keuangan ada di genggaman tangan nasabah."
      </blockquote>

      <h2>Fitur Unggulan</h2>
      <ul>
        <li><strong>Real-time Ledger:</strong> Pantau arus kas secara instan dengan grafik performa saldo.</li>
        <li><strong>Secure Vault:</strong> Enkripsi end-to-end untuk setiap transaksi dan data sensitif nasabah.</li>
        <li><strong>UMKM Growth Tools:</strong> Dashboard khusus untuk memantau kredit usaha secara transparan.</li>
      </ul>
    `,
    client: "Bank Usaha Rakyat",
    date: "Feb 2024",
    liveUrl: "#",
    githubUrl: "#",
    steps: [
      { title: "User Persona Research", desc: "Melakukan riset terhadap 500+ nasabah rural dan urban untuk menentukan pola penggunaan aplikasi." },
      { title: "Security Prototyping", desc: "Membangun sistem autentikasi berlapis termasuk Biometric dan OTP Sync." },
      { title: "Deployment & Scaling", desc: "Peluncuran tahap pertama dengan infrastruktur serverless untuk menangani lonjakan trafik." }
    ],
    metrics: [
      { label: "DOWNLOADS", value: "50K+", icon: "TrendingUp" },
      { label: "SECURITY RATING", value: "A+", icon: "ShieldCheck" },
      { label: "USER RATING", value: "4.8/5", icon: "Check" }
    ],
    technologies: ["Nuxt 3", "Tailwind CSS", "Supabase Auth", "Directus CMS", "Framer Motion"],
    gallery: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
    ],
    relatedServices: ["website-high-conversion", "maintenance-custom"]
  }
];

