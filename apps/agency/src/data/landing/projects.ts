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
  githubUrl: string;
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
  goals?: string[];
}

// @ts-ignore - import raw markdown
import hijiruContent from "./case-studies/hijiru-company-profile.md?raw";

export const projectsData: Project[] = [
  // --- WORDPRESS & CMS ---
  {
    id: 1,
    slug: "hijiru-company-profile",
    title: "Hijiru Company Profile",
    category: "WordPress",
    tags: ["WordPress", "Elementor", "MySQL", "PHP"],
    icon: "Globe",
    color: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    description: "Website profil perusahaan dengan plugin custom untuk toko & preview ebook.",
    content: hijiruContent,
    client: "Hijiru",
    date: "Mar 2025",
    liveUrl: "",
    demoUrl: "https://demo.kangjessy.com/hijiru",
    githubUrl: "#",
    pivot: {
      title: "Technical Pivot",
      subtitle: "Fase 01.5 / Hybrid Engineering",
      items: [
        { icon: "Layers", title: "Hybrid Page Builder Strategy", desc: "Menangani infrastruktur legacy berbasis Beaver Builder sambil mengintegrasikan Elementor. Teknik 'Mix-and-Match' ini memungkinkan pembangunan ulang website tanpa mengganggu stabilitas data yang ada." },
        { icon: "Zap", title: "Standalone to Plugin Evolution", desc: "Melakukan migrasi fitur Tasbih Online (yang sebelumnya aplikasi web mandiri) menjadi sebuah Custom WordPress Plugin terintegrasi, menjaga fungsionalitas lomba dzikir harian tetap stabil." }
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
      "Modernisasi UI/UX agar setara brand fashion internasional",
      "Penyatuan database Toko Online dan Komunitas Aplikasi",
      "Optimasi Core Web Vitals untuk SEO Mobile"
    ],
  },
  {
    id: 2,
    slug: "nur-alam-security-hardening",
    title: "Nur Alam Security Hardening",
    category: "Security",
    tags: ["Security", "Firewall", "2FA"],
    icon: "ShieldCheck",
    color: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
    description: "Konfigurasi keamanan tingkat lanjut termasuk firewall, 2FA, dan proteksi anti-bruteforce.",
    content: `
      <h2>Analisis Ancaman & Metodologi</h2>
      <p>Proyek ini dimulai dengan audit forensik setelah klien melaporkan adanya aktivitas mencurigakan. Kami menemukan bahwa serangan dilakukan melalui celah <em>plugin</em> yang sudah usang, yang kemudian digunakan untuk menyuntikkan ribuan halaman SEO spam.</p>
      
      <blockquote>
        "Keamanan bukan sekadar memasang firewall, tapi memahami bagaimana peretas berfikir. Kami menutup pintu yang bahkan klien tidak sadar kalau itu ada."
      </blockquote>

      <h2>Langkah-Langkah Taktis</h2>
      <p>Langkah pertama yang kami ambil adalah melakukan isolasi sistem. Kami mematikan seluruh akses eksekusi file PHP di direktori <code>/uploads</code> untuk mencegah eksekusi script malware lebih lanjut.</p>
      
      <ul>
        <li><strong>Audit Forensik:</strong> Membedah 1.2GB log server untuk mencari IP asal serangan.</li>
        <li><strong>Hardening:</strong> Implementasi kustomisasi firewall yang membatasi akses ke <code>wp-admin</code> hanya untuk range IP tertentu.</li>
        <li><strong>Recovery:</strong> Membersihkan database dari 15.000+ entri post palsu yang dibuat oleh bot.</li>
      </ul>

      <p>Hasilnya, website kembali normal dalam 48 jam dengan tingkat keamanan yang jauh lebih tinggi dari standar WordPress biasa.</p>
    `,
    client: "Nur Alam Hotel",
    date: "Jan 2025",
    liveUrl: "#",
    githubUrl: "#",
    pivot: {
      title: "Deteksi Pola & Investigasi",
      subtitle: "Fase 01.5 / Investigation",
      items: [
        { icon: "Search", title: "Identifikasi Malware Samaran", desc: "Mengidentifikasi file berbahaya yang memiliki nama sangat mirip dengan file sistem WordPress (Obfuscated), yang digunakan peretas untuk SEO Poisoning." },
        { icon: "Bot", title: "AI-Assisted Code Audit", desc: "Membedah struktur kode backdoor menggunakan asisten AI untuk mengonfirmasi titik akses remote ilegal yang selama ini dieksploitasi." }
      ]
    },
    relatedServices: ["business-system", "web-app"]
  },
  {
    id: 3,
    slug: "bogaraya-cloud-kitchen",
    title: "Bogaraya Cloud Kitchen",
    category: "Web App",
    tags: ["WordPress", "WCFM", "WooCommerce", "Mobile Optimized"],
    icon: "ShoppingBag",
    color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    description: "Platform Cloud Kitchen & Marketplace dengan arsitektur mobile-first untuk ekosistem mikro-kuliner.",
    content: "Transformasi layanan kuliner perhotelan melalui platform multi-vendor yang agresif secara UI. Menggabungkan fleksibilitas WordPress dengan kustomisasi logic marketplace untuk menciptakan pengalaman 'App-Like' yang seamless bagi tamu dan vendor.",
    client: "Bogaraya Group",
    date: "Nov 2024",
    liveUrl: "#",
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
    relatedServices: ["web-app", "business-system"]
  },
  {
    id: 4,
    slug: "nur-alam-hotel-upgrades",
    title: "Nur Alam Hotel Upgrades",
    category: "WordPress",
    tags: ["Booking Engine", "Accounting Sync", "API Integration", "Fintech"],
    icon: "Hotel", 
    color: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
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
    relatedServices: ["business-system", "automation"]
  },
  {
    id: 5,
    slug: "hotel-sales-dashboard",
    title: "Hotel Sales Dashboard",
    category: "Analytics",
    tags: ["Google Apps Script", "Cloud Analytics", "Business Intelligence", "Automation"],
    icon: "BarChart3",
    color: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
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
    relatedServices: ["business-system"],
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
    description: "Restrukturisasi total infrastruktur digital perbankan untuk mengeliminasi technical debt dan memulihkan kredibilitas institusi.",
    content: "Membangun ulang ekosistem web korporat Bank Usaha Rakyat dengan pendekatan 'Clean-Slate'. Fokus utama adalah pembersihan fitur redundan (Ghost Features) dan implementasi WooCommerce sebagai mesin data untuk manajemen katalog layanan perbankan yang terstruktur.",
    client: "Bank Usaha Rakyat",
    date: "Feb 2024",
    liveUrl: "https://bur.co.id",
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
    relatedServices: ["web-app"]
  },
  {
    id: 7,
    slug: "nur-alam-hotel-main-web",
    title: "Nur Alam Hotel Main Web",
    category: "WordPress",
    tags: ["Digital Restoration", "Infrastructure Stability", "Legacy Migration"],
    icon: "Monitor",
    color: "linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)",
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
    relatedServices: ["web-app"]
  },
  {
    id: 8,
    slug: "whatsapp-banking-system",
    title: "WhatsApp Banking System",
    category: "Automation",
    tags: ["FinTech Innovation", "Low-Code Architecture", "Serverless Middleware"],
    icon: "MessageCircle",
    color: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
    description: "Inovasi layanan perbankan tanpa aplikasi (App-less) untuk memitigasi hambatan regulasi dan teknis adopsi nasabah.",
    content: "Menciptakan saluran perbankan alternatif yang memanfaatkan infrastruktur WhatsApp sebagai antarmuka utama. Projek ini lahir sebagai solusi strategis atas batasan regulasi operasional perbankan (BPR) dan kebutuhan akan akses informasi finansial yang instan tanpa hambatan instalasi aplikasi.",
    client: "Bank Usaha Rakyat",
    date: "Feb 2024",
    liveUrl: "#",
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
    relatedServices: ["automation", "business-system"]
  },
  {
    id: 9,
    slug: "syarief-hasan-profile",
    title: "Syarief Hasan Profile",
    category: "WordPress",
    tags: ["Public Branding", "SEO Strategy", "Ticketing System", "Multimedia Management"],
    icon: "UserCheck",
    color: "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)",
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
    relatedServices: ["web-app"]
  },
  {
    id: 10,
    slug: "bwa-store",
    title: "BWA Store",
    category: "Full Stack",
    tags: ["Laravel", "Vue.js", "State Management", "E-commerce Architecture"],
    icon: "ShoppingCart",
    color: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
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
    relatedServices: ["saas-accelerator"]
  },
  {
    id: 11,
    slug: "laracamp-learning",
    title: "Laracamp Learning",
    category: "Full Stack",
    tags: ["Laravel", "Educational Platform", "UX Flow", "Backend Management"],
    icon: "BookOpen",
    color: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
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
    relatedServices: ["saas-accelerator"]
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
    description: "Portal monitoring keamanan terpusat untuk mengelola 20+ website sekaligus.",
    content: "Konsep portal keamanan enterprise yang memberikan visibilitas penuh atas status keamanan portofolio website. Menampilkan grafik percobaan serangan real-time, status integritas file, dan sistem hardening satu klik.",
    client: "R&D Project",
    date: "2025 Idea",
    liveUrl: "#",
    githubUrl: "#",
    relatedServices: ["saas-accelerator", "business-system"]
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
    description: "Dashboard pelacakan jejak karbon dan efisiensi energi berbasis interaksi data premium.",
    content: "Visualisasi data kompleks untuk keberlanjutan lingkungan. Menggunakan bento-grid layout untuk menampilkan konsumsi energi, prediksi penghematan, dan sertifikasi karbon secara intuitif.",
    client: "R&D Project",
    date: "2025 Idea",
    liveUrl: "#",
    githubUrl: "#",
    relatedServices: ["business-system", "automation"]
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
    description: "Landing page e-commerce imersif dengan interaksi 3D explode-view untuk produk mewah.",
    content: "Eksperimen visual menggunakan Three.js untuk menciptakan pengalaman belanja yang imersif. Produk dapat diputar, dibongkar (exploded view), dan materialnya dapat diubah secara real-time di browser.",
    client: "R&D Project",
    date: "2026 Idea",
    liveUrl: "#",
    githubUrl: "#",
    relatedServices: ["web-app"]
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
    description: "Agen AI otonom yang melakukan audit website otomatis untuk lead generation agensi.",
    content: "Sistem cerdas yang secara otonom men-scan website calon klien, menganalisis kelemahan, dan menyusun laporan audit profesional yang dipersonalisasi untuk memenangkan deal agensi secara otomatis.",
    client: "R&D Project",
    date: "2025 Idea",
    liveUrl: "#",
    githubUrl: "#",
    relatedServices: ["saas-accelerator", "automation"]
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
    description: "Platform sumber daya komunitas real-time dengan pemetaan partisipatif untuk respon cepat.",
    content: "Aplikasi komunitas yang memungkinkan warga saling berbagi sumber daya secara real-time pada peta interaktif. Fokus pada kecepatan akses dan kemudahan pelaporan insiden lokal secara kolaboratif.",
    client: "R&D Project",
    date: "2026 Idea",
    liveUrl: "#",
    githubUrl: "#",
    relatedServices: ["web-app"]
  },
  {
    id: 17,
    slug: "bank-usaha-rakyat-test",
    title: "Bank Usaha Rakyat - Mobile Banking Hub",
    category: "Financial System",
    tags: ["Mobile First", "Security", "Nuxt.js", "TailwindCSS"],
    icon: "ShieldCheck",
    color: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
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
    relatedServices: ["web-app", "business-system"]
  }
];

