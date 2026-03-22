export interface PricingFeature {
  text: string;
  included: boolean;
  isPopular?: boolean;
  tooltip?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: PricingFeature[];
  ctaText: string;
  badge?: string;
  isPopular?: boolean;
}

export interface MaintenancePlan {
  id: string;
  name: string;
  weeklyPrice: string;
  monthlyPrice: string;
  oneTimePrice: string;
  description: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}

export const developmentPlans: PricingPlan[] = [
  {
    id: 'starter-essential',
    name: 'Starter Essential',
    price: '1.500.000',
    originalPrice: '2.500.000',
    description: 'Solusi cepat & profesional untuk personal branding atau katalog produk sederhana.',
    badge: 'Best for Beginners',
    ctaText: 'Start Your Brand',
    features: [
      { text: 'Desain Standar Framework', included: true, tooltip: 'UI bersih & elegan yang dirakit dari komponen best-practice untuk menjaga stabilitas & fungsionalitas.' },
      { text: 'Tampilan Auto-Responsif', included: true, tooltip: 'Struktur grid rapi secara otomatis di PC, tablet, maupun perangkat mobile.' },
      { text: 'Setup SEO & Performa Dasar', included: true, tooltip: 'Fondasi teknis disiapkan agar web cepat dimuat dan terindeks Google dengan baik, tanpa riset keyword khusus.' },
      { text: 'Waktu Pengerjaan Cepat', included: true, tooltip: 'Karena menggunakan best-practice arsitektur tanpa kustomisasi logic rumit, website lebih cepat rilis.' },
      { text: 'Kapasitas Server Standar', included: true, tooltip: 'Lingkungan cloud hosting yang disetting siap pakai untuk lalu lintas (traffic) normal pengunjung harian.' },
      { text: 'Panel Edit Mandiri (CMS)', included: true, tooltip: 'Instalasi CMS standar (seperti WordPress) apabila Anda butuh akses mengubah konten dasar secara mandiri.' },
      { text: 'Strategi Konversi Sales Khusus', included: false, tooltip: 'Belum termasuk setup khusus analitik mendalam atau tracking user behavior untuk optimasi iklan.' },
      { text: 'Animasi Interaktif Mewah GSAP', included: false, tooltip: 'Belum mendapatkan animasi & micro-interactions kompleks standar branding mewah.' },
      { text: 'Otomatisasi Engine SEO', included: false, tooltip: 'Belum termasuk schema generator otomatis tingkat lanjut untuk memicu Rich Snippet eksklusif di Google.' },
      { text: 'Sistem Backend Multi-Fungsi', included: false, tooltip: 'Basis kode tidak disusun untuk sistem login ribuan aset atau kerangka logika e-commerce berat.' },
      { text: 'Integrasi API Pihak Ketiga', included: false, tooltip: 'Tidak dilingkupi setup penyambungan ke API luar seperti Payment Gateway Bank khusus, sistem Kasir, ERP.' },
      { text: 'Multi-Role Staff Dashboard', included: false, tooltip: 'Sistem belum menyediakan fitur multi-akun dengan berbagai izin hak akses yang berbeda (Admin/User).' },
    ]
  },
  {
    id: 'business-growth',
    name: 'Business Growth',
    price: '4.500.000',
    originalPrice: '11.250.000',
    description: 'Website berkinerja tinggi yang dirancang untuk konversi dan pertumbuhan bisnis.',
    badge: 'Most Popular',
    isPopular: true,
    ctaText: 'Grow Your Business',
    features: [
      { text: '✨ Semua fitur Starter Essential', included: true, isPopular: true, tooltip: 'Seluruh kapabilitas dasar yang ada pada paket sebelumnya otomatis Anda dapatkan.' },
      { text: 'Desain Custom UI/UX Premium', included: true, tooltip: 'Secara khusus UI digambar ulang berdasarkan target audiens dan psikologi pembeli produk Anda.' },
      { text: 'Strategi Konversi Sales Khusus', included: true, tooltip: 'Dilengkapi pelacakan event (klick, scroll, waktu tayang) agar Anda paham perilaku pengunjung untuk evaluasi iklan.' },
      { text: 'Panel Edit Mandiri (CMS)', included: true, tooltip: 'Dashboard admin kustom terenkripsi (bukan sekedar template WP biasa) untuk memanajemen data website dengan level keamanan & fleksibilitas ekstra.' },
      { text: 'Animasi Interaktif Mewah GSAP', included: true, tooltip: 'Smooth scrolling & micro-interactions eksklusif yang memikat pengunjung layaknya website brand ternama (Apple-like).' },
      { text: 'Otomatisasi Engine SEO', included: true, tooltip: 'Dibekali schema automation untuk memicu cuplikan interaktif di Google dan pengejaran skor rasio aksesibilitas mutlak 90+.' },
      { text: 'Sistem Backend Multi-Fungsi', included: true, tooltip: 'Arsitektur modular di backend yang memungkinkan filter data dinamis, search canggih, dan logic kompleks siap dieksekusi.' },
      { text: 'Aplikasi Web Kecepatan Tinggi', included: true, tooltip: 'Dibangun layaknya aplikasi mutakhir Single-Page, sehingga pindah halaman terasa instan tanpa loading siklus ulang.' },
      { text: 'Arsitektur Server Skala Ekstrem', included: false, tooltip: 'Belum dirancang khusus load balancer untuk menanggung beban super konstan dari traffic jutaan klik masif real-time.' },
      { text: 'Integrasi API Pihak Ketiga', included: false, tooltip: 'Tidak dilingkupi setup penyambungan ke API luar seperti Payment Gateway Bank khusus, sistem Kasir, ERP.' },
      { text: 'Multi-Role Staff Dashboard', included: false, tooltip: 'Sistem belum menyediakan fitur multi-akun dengan berbagai izin hak akses yang berbeda (Mis: Akuntan vs Admin).' },
      { text: 'Audit Keamanan Pentesting', included: false, tooltip: 'Lingkup web untuk public facing logic, belum diperiksa via simulasi peretasan ekstrem setingkat institusi perbankan.' },
    ]
  },
  {
    id: 'elite-custom',
    name: 'Elite Enterprise',
    price: '12.500.000',
    originalPrice: '20.000.000',
    description: 'Sistem digital kustom skala besar untuk kebutuhan bisnis yang kompleks & spesifik.',
    badge: 'Scale Up',
    ctaText: 'Start Custom Project',
    features: [
      { text: '✨ Semua fitur Business Growth', included: true, tooltip: 'Segala kenyamanan analitik & kapabilitas kecepatan di Business Growth 100% Anda miliki.' },
      { text: 'Arsitektur Server Skala Ekstrem', included: true, tooltip: 'Node server khusus dengan Kubernetes/Auto-scale siap menghalau interupsi lonjakan jutaan load tanpa downtime.' },
      { text: 'Integrasi API Pihak Ketiga', included: true, tooltip: 'Bisa disambungkan secara real-time dua-arah ke sistem perangkat Kasir (POS), ERP Internal, CRM, maupun integrasi Midtrans khusus.' },
      { text: 'Multi-Role Staff Dashboard', included: true, tooltip: 'Dashboard internal khusus karyawan. Bisa membuat peran kombinasi hak akses spesifik (Contoh: Admin Pemasaran tidak bisa ubah setting sistem).' },
      { text: 'Audit Keamanan Pentesting', included: true, tooltip: 'Infrastruktur database diisolasi multi-lapis. Termasuk stress-test DDOS untuk pertahanan data super rahasia (grade perbankan).' },
      { text: 'Skema Pemrosesan Data Real-time', included: true, tooltip: 'Komunikasi data sangat kencang menggunakan websocket/events untuk menunjang fitur pelacakan live, chat engine, sistem antrian atau bidding lelang.' },
      { text: 'Sistem Multi-bahasa & Mata Uang', included: true, tooltip: 'Mendeteksi dan menerjemahkan otomatis konten & hitungan kurs sesuai IP pengunjung untuk target dominasi mancanegara global.' },
      { text: 'Kepemilikan Akses Repository Code', included: true, tooltip: 'Hak penuh (100% Owner) atas root-directory dan private codebase system bilamana Anda ingin membawa developer in-house di masa depan.' },
      { text: 'Infrastruktur DB Regional Tersebar', included: true, tooltip: 'Data terpecah di berbagai belahan dunia (CDN & Replicas), pengunjung luar negeripun tetap merasakan load seakan dari server lokal negaranya.' },
      { text: 'Perlindungan Uptime Resolusi SLA', included: true, tooltip: 'Proteksi layanan ketersediaan prioritas satu di mana kendala minor apapun diselesaikan dengan jalur respon teknis nomor antrean terdepan.' },
      { text: 'Konsultasi Privat Level CTO', included: true, tooltip: 'Akses khusus ruang percakapan untuk Anda sebagai owner langsung ke saya (Lead Tech) dalam mendrive instrumen pengambilan keputusan teknologi perusahaan.' },
      { text: 'Garansi Ekspansi (Roadmapping)', included: true, tooltip: 'Bantuan merancang Blueprint jangka panjang (1-5 Tahun) untuk pengembangan modul fitur tambahan sejalan perkembangan korporasi, aplikasinya tak perlu dirombak ulang!' },
    ]
  }
];

export const maintenancePlans: MaintenancePlan[] = [
  {
    id: 'basic-care',
    name: 'Basic Care',
    weeklyPrice: '250.000',
    monthlyPrice: '800.000',
    oneTimePrice: '500.000',
    description: 'Pemeliharaan rutin untuk menjaga website Anda tetap aman dan berjalan lancar.',
    features: [
      'Pembaruan Keamanan Inti',
      'Pembaruan Performa Minor',
      'Pencadangan Data Bulanan',
      'Pemantauan Uptime Dasar',
      'Dukungan via WhatsApp'
    ],
    ctaText: 'Get Basic Care'
  },
  {
    id: 'power-support',
    name: 'Power Support',
    weeklyPrice: '500.000',
    monthlyPrice: '1.750.000',
    oneTimePrice: '1.200.000',
    description: 'Dukungan prioritas dengan optimasi berkala untuk hasil bisnis yang konstan.',
    isPopular: true,
    features: [
      'Audit Keamanan Mingguan',
      'Optimalisasi Performa Lanjutan',
      'Pembaruan Konten Prioritas',
      'Peringatan Uptime Real-time',
      'Pencadangan Data Mingguan',
      'Pelacakan Performa SEO'
    ],
    ctaText: 'Start Power Support'
  },
  {
    id: 'technical-partner',
    name: 'Technical Partner',
    weeklyPrice: '1.250.000',
    monthlyPrice: '4.500.000',
    oneTimePrice: '3.500.000',
    description: 'Saya menjadi CTO/Partner teknis Anda untuk mengawal pertumbuhan produk.',
    features: [
      'Konsultasi Teknis 24/7',
      'Pengembangan Fitur Berkelanjutan',
      'Manajemen Infrastruktur',
      'Dukungan Peningkatan Skala (Traffic/Data)',
      'Pengujian Keamanan (Pentesting)',
      'Tim Pendamping (Team Lead Collaboration)'
    ],
    ctaText: 'Partner With Me'
  }
];

export const addonServices = [
  {
    category: 'Pages & Layout',
    items: [
      { name: 'Standard Static Page', price: '350.000', desc: 'Halaman informasi tambahan (About, FAQ, etc)' },
      { name: 'Dynamic Feature Page', price: '750.000', desc: 'Halaman dengan data dinamis (Filter, API Integration)' },
      { name: 'High-Conversion Landing', price: '1.250.000', desc: 'Halaman promosi khusus dengan copywriting persuasif' }
    ]
  },
  {
    category: 'Features & Optimization',
    items: [
      { name: 'Advanced Animation (GSAP)', price: '1.000.000', desc: 'Animasi interaktif premium untuk kesan WOW' },
      { name: 'Payment Gateway Setup', price: '1.500.000', desc: 'Integrasi Midtrans/Xendit untuk pembayaran otomatis' },
      { name: 'Advanced SEO Engine', price: '2.000.000', desc: 'Setup SEO technical & Content Strategy mendalam' }
    ]
  }
];
