export interface Service {
  id: string;
  status: 'active' | 'coming-soon';
  order: number;
  badge?: string;
  isFeatured?: boolean;
  icon: string;
  title: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  deliveryTime: string;
  revisions: string;
  overview: string;
  included: string[];
  detailedFeatures?: { title: string; icon?: string; items: string[] }[];
  process: { title: string; description: string }[];
  technologies: string[];
  packageFeatures: string[];
  faq: { question: string; answer: string }[];
}

export const servicesData: Record<string, Service> = {
  "business-system": {
    id: "business-system",
    status: "active",
    order: 2,
    badge: "Recommended for Scaling",
    isFeatured: true,
    icon: "Layers",
    title: "Sistem Manajemen Bisnis",
    tagline: "Hentikan kebocoran profit. Bangun sistem otonom untuk kendali penuh bisnis Anda.",
    price: 6500000,
    originalPrice: 8500000,
    deliveryTime: "14 - 30 Hari",
    revisions: "3x Revisi Mayor",
    overview: "Sistem manajemen bukan sekadar tempat mencatat data—ini adalah 'Otak Bisnis' Anda. Berhentilah mengandalkan ingatan atau spreadsheet yang rawan error. Saatnya memiliki ekosistem digital yang bekerja secara presisi, meminimalisir human-error, dan memberikan data akurat untuk keputusan strategis yang jauh lebih cepat.",
    included: [
      "Dashboard Arsitektur Data Real-time",
      "Sistem Smart-Inventory & Fulfillment",
      "Multi-level Access & Security Control",
      "Auto-Generated Financial Reports",
      "Dokumentasi & Guideline Eksklusif",
      "Priority Maintenance Support (30 Hari)",
    ],

    detailedFeatures: [
      {
        title: "Arsitektur Data & Logika (Core System)",
        icon: "Database",
        items: [
          "Custom Database Architecture: Struktur data yang dirancang khusus mengikuti alur unik bisnis Anda, bukan template kaku.",
          "High-Integrity Validation: Sistem pencegah input sampah/duplikat untuk menjamin keakuratan data 100%.",
          "Seamless API Integration: Terhubung dengan layanan pihak ketiga (Payment Gateway, Kurir, ERP lain) secara mulus."
        ]
      },
      {
        title: "Kendali & Keamanan (Security & Control)",
        icon: "ShieldCheck",
        items: [
          "Multi-Level Role Access: Pengaturan hak akses mendetail (Admin, Manager, Staff, Finance) untuk menjaga kerahasiaan data.",
          "Activity Audit Logs: Merekam jejak digital siapa melakukan apa dan kapan, meminimalisir potensi fraud internal.",
          "Automated Cloud Backup: Sistem pengamanan data otomatis ke cloud terpisah untuk mencegah kehilangan data fatal."
        ]
      },
      {
        title: "Pelaporan & Analisa (Business Intelligence)",
        icon: "BarChart3",
        items: [
          "Real-time Dashboard: Visualisasi performa bisnis (Omzet, Stok, Tim) dalam grafik yang mudah dipahami.",
          "One-Click Reporting: Cetak laporan Laba/Rugi, Arus Kas, atau Stok Opname dalam format PDF/Excel instan.",
          "Trend Prediction: (Opsional) Analisa data historis untuk memprediksi tren penjualan di masa depan."
        ]
      },
      {
        title: "Efisiensi Operasional (Workflow Automation)",
        icon: "Zap",
        items: [
          "Task Auto-Assignment: Pendelegasian tugas otomatis ke tim berdasarkan status pesanan atau proyek.",
          "Notification System: Notifikasi via WhatsApp/Email untuk status krusial (Stok Menipis, Invoice Jatuh Tempo).",
          "Mobile-First Interface: Akses sistem dari mana saja menggunakan smartphone tanpa mengurangi fungsionalitas."
        ]
      }
    ],
    process: [
      { title: "Deep Operational Audit", description: "Saya terjun membedah SOP dan alur kerja Anda saat ini untuk menemukan celah inefisiensi yang tak terlihat." },
      { title: "System Blueprinting", description: "Merancang arsitektur database dan flowchart logika sistem. Anda akan melihat 'peta' sistem sebelum satu baris kode ditulis." },
      { title: "Agile Development", description: "Pembangunan bertahap (per modul) dengan demo rutin. Anda bisa langsung mencoba fitur yang sudah jadi tanpa menunggu selesai total." },
      { title: "Integration & Migration", description: "Menghubungkan sistem baru dengan tools lama Anda dan membantu migrasi data historis dengan aman." },
      { title: "Training & Simulation", description: "Sesi pelatihan khusus untuk staff Anda dan simulasi 'Live Day' untuk memastikan tim siap 100%." },
      { title: "Go-Live & Support", description: "Pendampingan intensif di minggu-minggu awal peluncuran untuk menangani feedback lapangan dengan cepat." },
    ],
    technologies: ["Node.js & Express", "Laravel / PHP 8", "PostgreSQL / MySQL", "Vue.js / React Admin", "Redis Caching", "Docker Container"],
    packageFeatures: ["Role-Based Access Control", "Real-time Data Processing", "Automated Daily Backups"],
    faq: [
      { question: "Apa bedanya pakai jasa Akang dengan beli software jadi di luar sana?", answer: "Software jadi (SaaS) memaksa Anda mengubah cara kerja bisnis mengikuti fitur mereka. Jasa saya membangun sistem yang 100% mengikuti cara kerja unik bisnis Anda. Plus, Anda 'Beli Putus', tidak ada biaya langganan bulanan selamanya." },
      { question: "Apakah data bisnis saya aman dari kebocoran?", answer: "Sangat aman. Database dienkripsi, server menggunakan firewall berlapis, dan hosting sepenuhnya dipegang oleh Anda sendiri (di akun cloud Anda). Saya bahkan tidak bisa akses jika tidak Anda izinkan." },
      { question: "Bagaimana jika setahun lagi bisnis saya berubah total?", answer: "Sistem Custom dibuat dengan arsitektur Modular. Menambah fitur baru, mengubah alur, atau menambah divisi baru sangat mudah dilakukan tanpa harus meruntuhkan sistem yang sudah ada." },
      { question: "Apakah staff saya yang gaptek bisa menggunakannya?", answer: "Prioritas utama desain saya adalah 'User-Friendly'. Saya membuang tombol-tombol rumit yang tidak perlu. Tampilan dibuat bersih, fokus, dan mirip aplikasi populer yang sudah biasa mereka pakai." },
      { question: "Berapa lama garansi perbaikan error?", answer: "Saya memberikan garansi bug-fixing gratis selama 30-90 hari (tergantung paket). Setelah itu, sistem biasanya sudah sangat stabil. Jika butuh penambahan fitur, kita bisa buka kontrak baru." }
    ],
  },

  "automation": {
    id: "automation",
    status: "coming-soon",
    order: 3,
    badge: "Maximum Efficiency",
    icon: "Zap",
    title: "Robot Automasi Bisnis",
    tagline: "Lipatgandakan Output Anda. Biarkan sistem bekerja 24/7 selagi Anda fokus ekspansi.",
    price: 2500000,
    deliveryTime: "5 - 10 Hari",
    revisions: "2x Revisi",
    overview: "Tugas repetitif adalah pembunuh kreativitas dan waktu yang mahal. Dengan sistem otomatisasi yang tepat, bisnis Anda tetap berjalan di belakang layar tanpa henti. Hubungkan semua platform Anda—WhatsApp, CRM, hingga AI—menjadi satu mesin otonom yang bekerja lebih cepat dan akurat dibanding tenaga manusia mana pun.",
    included: [
      "Intelligence Workflow Automation",
      "AI Agent & Chatbot Integration",
      "Autonomous Data Scraping Systems",
      "Real-time Auto-Reporting (WA/Email)",
      "Technical Support & Optimization",
    ],

    detailedFeatures: [
      {
        title: "Kecerdasan Buatan (Digital Brain)",
        icon: "Brain",
        items: [
          "Custom Logic Scripting: Robot diprogram dengan logika 'If-This-Then-That' yang kompleks sesuai aturan bisnis Anda.",
          "AI-Powered Decision: Integrasi LLM (GPT/Gemini) untuk analisa sentimen chat, parsing data acak, atau pembuatan konten otomatis.",
          "24/7 Autopilot: Sistem bekerja non-stop di server, tidak bergantung pada laptop/HP Anda yang harus menyala."
        ]
      },
      {
        title: "Integrasi Ekosistem (Connectivity)",
        icon: "Workflow",
        items: [
          "Multi-Platform Bridge: Menghubungkan WhatsApp, Google Sheets, Email, Website, hingga Marketplace dalam satu orkestrasi.",
          "Webhook & API Handler: Menangkap data dari form/iklan secara real-time dan langsung memprosesnya detik itu juga.",
          "Legacy System Support: Mampu 'berbicara' dengan software jadul Anda (via database/OCR) jika belum ada API."
        ]
      },
      {
        title: "Monitoring & Notifikasi (Reliability)",
        icon: "Activity",
        items: [
          "Self-Healing Mechanism: Robot dilengkapi logika untuk me-restart diri sendiri jika terjadi error koneksi sesaat.",
          "Smart Notification: Mengirim laporan ringkas hanya pada hal penting, tidak mem-spam notifikasi yang tidak perlu.",
          "Execution Logs: Catatan detail setiap aksi robot yang transparan untuk memudahkan audit kinerja."
        ]
      }
    ],
    process: [
      { title: "Manual Process Breakdown", description: "Kita rekam cara Anda bekerja manual sekarang. Langkah demi langkah, 'klik' demi 'klik' yang Anda lakukan." },
      { title: "Logic Mapping & Optimization", description: "Saya ubah langkah manual tadi menjadi algoritma efisien. Membuang langkah sia-sia dan memperpendek jalur data." },
      { title: "Bot Development", description: "Penulisan skrip automasi (Python/Node.js) atau konfigurasi Workflow Engine (n8n) di server pribadi Anda." },
      { title: "Stress Testing", description: "Menguji ketahanan bot dengan ribuan data sekaligus untuk memastikan tidak ada logic error." },
      { title: "Deployment & Monitoring", description: "Bot dijalankan di server awan (Cloud VPS) yang stabil. Saya pantau kinerjanya di 7 hari pertama." },
    ],
    technologies: ["Python Scripts", "n8n Workflow Automation", "OpenAI API", "Puppeteer / Selenium", "WhatsApp API (Baileys/Wppconnect)"],
    packageFeatures: ["Run 24/7 on Server", "No Monthly Subscription", "Smart Error Handling"],
    faq: [
      { question: "Apakah komputer saya harus nyala terus?", answer: "Tidak perlu. Robot automasi yang saya buat berjalan di Cloud Server (VPS) yang aktif 24 jam sehari. Anda bisa matikan laptop dan tidur nyenyak, biarkan robot bekerja." },
      { question: "Apakah aman buat akun WA saya (Banned)?", answer: "Saya menggunakan metode yang 'memanusiakan' robot (human-behavior emulation) dan delay yang wajar. Namun risiko pihak ketiga selalu ada, saya akan edukasi best practice-nya." },
      { question: "Bedanya apa dengan langganan tools automasi bulanan?", answer: "Jauh lebih hemat. Tools langganan biasanya charge per 'task' atau 'action'. Solusi saya adalah 'Unlimited Action'. Server milik Anda, mau jalankan 1 juta task pun biayanya tetap (biaya sewa server flat)." },
      { question: "Bisakah robot mengambil data dari web kompetitor?", answer: "Bisa (Scraping). Asalkan data tersebut bersifat publik. Namun saya membatasi pada etika penggunaan data yang legal dan wajar." }
    ],
  },

  "web-app": {
    id: "web-app",
    status: "active",
    order: 1,
    badge: "Premium Quality",
    icon: "Monitor",
    title: "Website High-Conversion",
    tagline: "Bukan sekadar website cantik, tapi mesin penjual yang meyakinkan dalam 3 detik.",
    price: 1500000,
    deliveryTime: "7 - 14 Hari",
    revisions: "2x Revisi",
    overview: "Website adalah representatif brand Anda di digital. Saat penawaran di luar sana hanya memberikan desain, saya memberikan aset bisnis yang sepenuhnya menjadi milik Anda. Tanpa biaya langganan bulanan ke developer, dengan akses penuh ke server dan source code sejak hari pertama.",
    included: [
      "100% Kepemilikan & Akses Source Code",
      "Desain Premium & UX Copywriting",
      "Optimasi SEO & Extreme Speed",
      "Security Hardening & Priority Support",
      "Ecosystem Ready (Ads & Analytics)",
    ],
    detailedFeatures: [
      {
        title: "Kepemilikan & Akses Penuh (Full Ownership)",
        icon: "ShieldCheck",
        items: [
          "100% Hak Milik Klien: Seluruh aset digital menjadi milik Anda sepenuhnya tanpa biaya langganan jasa tersembunyi.",
          "Full Infrastructure Access: Akses penuh ke hosting/server atau dashboard cloud (BaaS) sesuai teknologi yang digunakan.",
          "Full Source Code: Salinan kode sumber asli diberikan sebagai jaminan keamanan jangka panjang bagi bisnis Anda."
        ]
      },
      {
        title: "Desain & Konten Berstandar Tinggi (Premium Quality)",
        icon: "Palette",
        items: [
          "Premium UI/UX Design: Desain eksklusif yang modern, bersih, dan disesuaikan dengan identitas brand Anda.",
          "UX Copywriting: Penulisan naskah website yang tidak hanya informatif, tapi persuasif untuk memicu konversi penjualan.",
          "Ultra-Responsive Layout: Tampilan sempurna dan nyaman diakses dari smartphone, tablet, maupun desktop."
        ]
      },
      {
        title: "Optimasi Performa & SEO (High Performance)",
        icon: "Zap",
        items: [
          "SEO On-Page Pro: Optimasi struktur website agar lebih mudah ditemukan oleh calon pelanggan di Google.",
          "Extreme Speed Optimization: Teknik kompresi dan caching tingkat lanjut untuk memastikan loading website < 2 detik.",
          "Image Auto-Optimization: Sistem otomatis yang mengecilkan ukuran gambar tanpa mengurangi ketajaman visual."
        ]
      },
      {
        title: "Keamanan & Ketenangan Pikiran (Security & Support)",
        icon: "Lock",
        items: [
          "Advanced Security Hardening: Proteksi berlapis terhadap serangan malware dan brute-force.",
          "Gratis Domain & Hosting (1 Tahun): Menggunakan infrastruktur high-performance untuk stabilitas maksimal.",
          "Gratis Revisi 2x: Jaminan kesesuaian hasil akhir dengan kebutuhan bisnis Anda.",
          "Video Panduan Operasional: Tutorial eksklusif cara mengelola website Anda sendiri tanpa harus bergantung pada developer."
        ]
      },
      {
        title: "Integrasi Bisnis Digital (Ecosystem Ready)",
        icon: "Globe",
        items: [
          "WhatsApp Chat Widget Pro: Integrasi chat yang memudahkan pelanggan langsung terhubung ke admin Anda.",
          "Ready for Ads Tracking: Sudah siap dipasangi Pixel (FB/IG) atau Google Tag untuk kebutuhan iklan berbayar.",
          "Google Analytics & Search Console Setup: Dashboard untuk memantau trafik dan perilaku pengunjung secara real-time."
        ]
      }
    ],
    process: [
      { title: "Deep Business Discovery", description: "Sebelum masuk ke desain, kami melakukan sesi konsultasi mendalam untuk memahami model bisnis, kompetitor, dan Unique Selling Point (USP) produk Anda agar website tepat sasaran." },
      { title: "Analisis Psikologi & Struktur", description: "Merancang User Journey dan Wireframe berdasarkan perilaku calon pembeli agar alur informasi menuntun mereka secara alami ke tombol beli." },
      { title: "Elite Interface & Copywriting", description: "Pembangunan visual mewah dengan micro-animations yang dipadukan dengan UX Copywriting (naskah persuasif) untuk membangun kredibilitas instan." },
      { title: "Technical Integration & Testing", description: "Penyatuan sistem (Payment Gateway, Kurir, CRM) dan pengujian ketat di berbagai perangkat untuk memastikan nol error saat transaksi." },
      { title: "Speed & SEO Hardening", description: "Optimasi performa server dan data tingkat lanjut untuk mencapai skor kecepatan 90+, serta penanaman struktur SEO agar website ramah mesin pencari." },
      { title: "Handover & Growth Support", description: "Serah terima seluruh aset (Source Code & Akses), pemberian video tutorial operasional, dan sesi konsultasi strategi untuk mulai mendatangkan trafik ke website baru Anda." },
    ],
    technologies: [
      "WordPress & Elementor Pro", 
      "Oxygen & LiteSpeed", 
      "Laravel & Filament", 
      "React, Vue & Nuxt.js", 
      "Next.js & Astro", 
      "Tailwind CSS", 
      "Supabase & Firebase", 
      "Sanity CMS",
      "Vercel, Netlify & Cloudflare"
    ],
    packageFeatures: ["Sales Funnel Optimization", "Intuitive CMS Panel", "Premium Branding Aesthetics"],
    faq: [
      { 
        question: "Apa yang membedakan website \"High-Conversion\" dengan website biasa?", 
        answer: "Website biasa hanya mementingkan tampilan. Website High-Conversion dibangun berdasarkan data psikologi audiens. Kami mengatur alur informasi (user journey) agar setiap detik waktu pengunjung di website Anda dikonversi menjadi tindakan (beli/hubungi)." 
      },
      { 
        question: "Saya punya tim IT/Admin sendiri, apakah saya akan ketergantungan pada jasa KangJessy selamanya?", 
        answer: "Sama sekali tidak. Sesuai prinsip Full Ownership, kami menyerahkan Full Source Code dan akses infrastruktur. Kami juga menyertakan dokumentasi video agar tim Anda bisa mengelola website secara mandiri. Kami adalah partner untuk membangun, bukan untuk membatasi ruang gerak bisnis Anda." 
      },
      { 
        question: "Antara WordPress dan Custom Coding, mana yang lebih menguntungkan untuk bisnis saya?", 
        answer: "Kami tidak fanatik pada satu teknologi. WordPress unggul dalam kecepatan update konten oleh tim Anda. Custom Coding unggul dalam kecepatan akses ekstrem dan keamanan tanpa celah. Kami akan menganalisis kebutuhan trafik dan budget Anda untuk menentukan stack yang paling memberikan ROI (Return on Investment) tertinggi." 
      },
      { 
        question: "Bagaimana cara Anda menjamin website tetap relevan dalam 2-3 tahun ke depan?", 
        answer: "Kami tidak menggunakan template pasaran yang cepat usang. Dengan menggunakan Modern Web Architecture (seperti yang ada di filter stack kami), website Anda memiliki struktur yang scalable—mudah ditambah fitur baru seiring berkembangnya bisnis Anda tanpa harus bongkar ulang dari nol." 
      },
      { 
        question: "Apakah website ini sudah siap digunakan untuk beriklan di FB Ads atau Google Ads?", 
        answer: "Tentu. Setiap website sudah dilengkapi dengan Tracking Ecosystem (Pixel, GA4, GTM). Kami memastikan website bukan hanya cantik, tapi siap menjadi instrumen iklan yang efektif dengan loading speed di bawah 2 detik agar biaya iklan Anda tidak terbuang sia-kali." 
      }
    ],
  },

  "saas-accelerator": {
    id: "saas-accelerator",
    status: "coming-soon",
    order: 4,
    badge: "Founder-Centric",
    icon: "Rocket",
    title: "SaaS Product Accelerator",
    tagline: "Wujudkan Ide Startup Anda jadi Produk Nyata di Pasar dalam 30 Hari.",
    price: 10000000,
    deliveryTime: "21 - 45 Hari",
    revisions: "5x Revisi",
    overview: "Untuk founder yang ingin merilis MVP (Minimum Viable Product) tanpa membuang waktu dalam fase development yang tak berujung. Saya membantu membangun pondasi startup Anda dari nol—mulai dari arsitektur landing page, dashboard multi-user, hingga sistem pembayaran langganan yang sudah otomatis.",
    included: [
      "Multi-Role User Authentication",
      "Automated Subscription (Midtrans/Stripe)",
      "Scalable Multi-Tenant Dashboard",
      "Investor-Ready Landing Page",
      "Structured Technical Documentation",
      "3-Month Scaling Support",
    ],

    detailedFeatures: [
      {
        title: "Pondasi Skala Besar (Scalable Foundation)",
        icon: "Layers",
        items: [
          "Microservice-Ready Architecture: Kode ditulis terstruktur (Clean Code) agar mudah dipecah saat tim engineering Anda membesar.",
          "Multi-Tenant Database: Arsitektur database canggih yang memisahkan data antar klien Anda dengan aman (Isolasi Data).",
          "Serverless / Containerized: Siap di-deploy di infrastruktur modern (AWS/GCP/Vercel) yang auto-scale sesuai jumlah user."
        ]
      },
      {
        title: "Fitur Monetisasi (Revenue Ready)",
        icon: "CreditCard",
        items: [
          "Subscription Management: Sistem manajemen paket langganan (Free, Pro, Enterprise) yang fleksibel.",
          "Auto-Recurring Billing: Integrasi Payment Gateway (Stripe/Midtrans/Xendit) untuk debet otomatis kartu kredit/ewallet.",
          "Invoicing System: Penerbitan invoice otomatis berstandar pajak untuk klien B2B Anda."
        ]
      },
      {
        title: "Ekosistem Founder (Launchpad)",
        icon: "Rocket",
        items: [
          "Admin Super-Dashboard: Panel kendali 'God-Mode' untuk melihat semua aktivitas user, revenue, dan manajemen lisensi.",
          "User Onboarding Flow: Desain UX khusus untuk memandu user baru memahami produk Anda dalam hitungan detik (Aha-Moment).",
          "API Documentation Generator: Otomatisasi dokumentasi teknis jika produk Anda menargetkan developer lain."
        ]
      }
    ],
    process: [
      { title: "Lean Canvas Workshop", description: "Memvalidasi ide bisnis Anda. Kita buang fitur 'halu' dan fokus pada fitur 'Pain-Killer' yang rela dibayar oleh user." },
      { title: "Rapid Prototyping", description: "Membuat desain interaktif (Clickable Prototype) untuk Anda tes ke calon investor atau early-user sebelum coding dimulai." },
      { title: "MVP Development", description: "Fase coding sprint 2-4 minggu. Fokus pada fungsionalitas inti dan kestabilan sistem pembayaran." },
      { title: "Security & Load Testing", description: "Memastikan aplikasi tidak down saat diserbu user dan data pembayaran aman berstandar industri." },
      { title: "Release & Analytics Setup", description: "Launch produk ke publik + pemasangan tracking (Mixpanel/PostHog) untuk memata-matai perilaku user pertama Anda." },
      { title: "Post-Launch Iteration", description: "Siap siaga untuk perbaikan cepat (Hotfix) berdasarkan feedback user di minggu-minggu kritis awal." },
    ],
    technologies: ["Next.js (App Router)", "Typescript Strict", "Supabase / PostgreSQL", "Prisma ORM", "TailwindCSS", "Stripe / Xendit API", "Docker"],
    packageFeatures: ["Multi-Tenant Support", "Subscription Billing Engine", "High-Scalability Ready"],
    faq: [
      { question: "Apakah source code jadi milik saya? Investor nanya ini.", answer: "100% Milik Anda (Intellectual Property Transfer). Saya hanya 'Sewa Jasa Bangun'. Kekayaan intelektual kode adalah aset vital startup Anda untuk valuasi investor." },
      { question: "Bisa handle berapa banyak user?", answer: "Arsitektur MVP yang saya bangun sudah disiapkan untuk menampung 10.000 - 50.000 user pertama (Horizontal Scaling). Lebih dari itu, kita tinggal upgrade server tanpa perlu tulis ulang kode." },
      { question: "Apakah Akang mau jadi CTO saya?", answer: "Untuk saat ini saya posisinya sebagai 'Technical Partner / Vendor'. Namun saya bekerja dengan mindset CTO—memikirkan strategi jangka panjang, bukan sekadar 'tukang coding' yang asal jadi." },
      { question: "Berapa lama waktu development SaaS MVP?", answer: "Rata-rata 30-45 hari kerja untuk versi 1.0 yang solid. Tergantung kompleksitas fitur. Kunci startup adalah 'Speed to Market', jadi saya tidak akan membiarkan proyek molor berbulan-bulan." }
    ],
  },
};
