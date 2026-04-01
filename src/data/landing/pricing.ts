export interface PricingFeature {
  text: string;
  included: boolean;
  isPopular?: boolean;
  tooltip?: string;
}

export interface PricingFeatureGroup {
  name: string;
  items: PricingFeature[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  estimate: string;
  revisions: string;
  technology: string;
  suitableFor: string;
  features: PricingFeature[];
  featureGroups?: PricingFeatureGroup[];
  ctaText: string;
  badge?: string;
  isPopular?: boolean;
  billingCycle?: string;
}

export interface MaintenancePlan {
  id: string;
  name: string;
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
    description: 'Cocok untuk bisnis yang baru membangun kehadiran online — simpel, cepat, dan langsung bisa dipakai.',
    estimate: '1-2 Minggu',
    revisions: '2x Revisi',
    technology: 'WordPress',
    suitableFor: ' UMKM, toko lokal, jasa perorangan yang butuh website pertama mereka. ',
    badge: 'Best for Beginners',
    ctaText: 'Start Your Brand',
    features: [],
    featureGroups: [
      {
        name: 'Halaman & Konten',
        items: [
          { text: 'Hingga 5 halaman', included: true, tooltip: 'Beranda, Tentang, Layanan, Kontak, + 1 bebas' },
          { text: 'Desain responsif mobile & desktop', included: true },
          { text: 'Copywriting dasar tiap halaman', included: true },
          { text: 'Halaman dinamis', included: false },
          { text: 'Halaman landing promo terpisah', included: false },
        ]
      },
      {
        name: 'Fitur Teknis',
        items: [
          { text: 'Akses admin WordPress lengkap', included: true },
          { text: 'Form kontak + notifikasi email otomatis', included: true },
          { text: 'SSL & keamanan dasar terpasang', included: true },
          { text: 'Optimasi performa standar (GTmetrix grade B+)', included: true },
          { text: 'Setup Google Analytics & Search Console', included: true },
          { text: 'Integrasi payment gateway', included: false },
          { text: 'Sistem login / member area', included: false },
          { text: 'Database / fitur kustom', included: false },
        ]
      },
      {
        name: 'Bonus',
        items: [
          { text: 'Gratis domain 1 tahun', included: true, tooltip: 'Khusus domain .com, .net, .org, .id' },
          { text: 'Gratis setup Google Business Profile', included: true },
          { text: 'Panduan kelola website', included: true, tooltip: 'Video tutorial singkat atau PDF tentang cara update konten & penggunaan website' },
        ]
      }
    ]
  },
  {
    id: 'business-growth',
    name: 'Business Growth',
    price: '2.750.000',
    // originalPrice: '6.000.000',
    description: 'Untuk bisnis yang sudah berjalan dan butuh website yang bekerja aktif mendatangkan pelanggan & konversi.',
    estimate: '2-3 Minggu',
    revisions: '3x Revisi',
    technology: 'WordPress / Laravel',
    suitableFor: 'Toko online, bisnis jasa yang butuh sistem booking/order, atau UMKM yang ingin serius di digital.',
    badge: 'Most Popular',
    isPopular: true,
    ctaText: 'Grow Your Business',
    features: [],
    featureGroups: [
      {
        name: 'Halaman & Konten',
        items: [
          { text: 'Semua Fitur Starter Essential', included: true, isPopular: true },
          { text: 'Hingga 5 halaman general + 2 halaman statis tambahan', included: true },
          { text: '1 halaman dinamis', included: true, tooltip: 'Katalog gambar / portofolio / halaman postingan lainnya.' },
          { text: '10 artikel SEO awal', included: true, tooltip: '500–700 kata/artikel' },
          { text: '1 landing page promosi terpisah', included: true },
        ]
      },
      {
        name: 'Fitur Teknis',
        items: [
          { text: 'Struktur data & database relasional custom', included: true },
          { text: 'Integrasi payment gateway', included: true, tooltip: 'Midtrans / Xendit / Tripay / Doku / Payment Gateway lainnya.' },
          { text: 'Automasi form & lembar kerja prospek', included: true, tooltip: 'Notifikasi langsung ke Email/WhatsApp/Spreadsheet.' },
          { text: 'Optimasi performa lanjutan', included: true, tooltip: 'GTmetrix grade A.' },
          { text: 'Proteksi pencadangan otomatis', included: true, tooltip: 'mingguan' },
          { text: 'Akses admin multi-level', included: true, tooltip: 'owner + operator' },
          { text: 'Arsitektur sistem terpisah', included: false, tooltip: 'Frontend dan backend terpisah untuk performa dan keamanan lebih baik.' },
          { text: 'Sinkronisasi software lama', included: false, tooltip: 'Integrasi dengan sistem yang sudah ada (CRM, ERP, dll).' },
        ]
      },
      {
        name: 'Bonus',
        items: [
          { text: 'Gratis domain 1 tahun', included: true, tooltip: 'Khusus domain .com, .net, .org, .id' },
          { text: 'Gratis 1 bulan Basic Care maintenance', included: true },
          { text: '1x sesi konsultasi strategi digital (60 menit)', included: true },
        ]
      }
    ]
  },
  {
    id: 'pro-scale',
    name: 'Pro Scale',
    price: '5.500.000',
    // originalPrice: '12.000.000',
    description: 'Solusi digital menyeluruh untuk bisnis yang butuh sistem kompleks, integrasi lanjutan, dan skalabilitas jangka panjang.',
    estimate: '3-5 Minggu',
    revisions: '5x Revisi',
    technology: 'Laravel + Vue/React (custom stack)',
    suitableFor: 'Startup, bisnis dengan sistem booking/CRM/inventori custom, atau perusahaan yang butuh platform digital sendiri. ',
    badge: 'Unlimited Scale',
    ctaText: 'Start Custom Project',
    features: [],
    featureGroups: [
      {
        name: 'Halaman & Konten',
        items: [
          { text: 'Semua Fitur Business Growth', included: true, isPopular: true },
          { text: 'Hingga 5 halaman general + 5 halaman statis + 3 halaman dinamis', included: true },
          { text: '10 artikel SEO awal', included: true, tooltip: '500–700 kata/artikel' },
          { text: 'Desain UI sistem dashboard custom', included: true },
        ]
      },
      {
        name: 'Fitur Teknis',
        items: [
          { text: 'Arsitektur sistem terpisah', included: true, tooltip: 'Frontend dan backend terpisah untuk performa dan keamanan lebih baik.' },
          { text: 'Sinkronisasi & migrasi data dari sistem lama', included: true, tooltip: 'Integrasi dengan sistem yang sudah ada (CRM, ERP, dll).' },
          { text: 'Dashboard otorisasi multi-level', included: true, tooltip: 'owner, admin, staff, klien' },
          { text: 'Integrasi API pihak ketiga tak terbatas', included: true },
          { text: 'Sistem keamanan terisolasi & enkripsi data', included: true },
          { text: 'Skala beban trafik tinggi', included: true, tooltip: 'load-ready' },
          { text: 'Pencadangan otomatis harian + monitoring uptime', included: true },
        ]
      },
      {
        name: 'Bonus',
        items: [
          { text: 'Gratis domain 1 tahun', included: true, tooltip: 'Khusus domain .com, .net, .org, .id' },
          { text: 'Gratis 1 bulan Growth Care maintenance', included: true },
          { text: '2x sesi konsultasi strategi & roadmap teknis', included: true },
          { text: 'Dokumentasi teknis sistem', included: true, tooltip: 'handover doc' },
        ]
      }
    ]
  }
];

export const maintenancePlans: MaintenancePlan[] = [
  {
    id: 'basic-care',
    name: 'Basic Care',
    monthlyPrice: '300.000',
    oneTimePrice: '540.000',
    description: 'Untuk UMKM yang mau website-nya tetap aman dan jalan, tanpa pusing soal teknis.',
    features: [
      'Cek kesehatan website bulanan',
      'Update plugin & keamanan WordPress',
      'Backup cloud bulanan',
      'Filter spam & form kebersihan',
      'Laporan singkat via WhatsApp',
      'Respon pertanyaan teknis (3x/bulan)'
    ],
    ctaText: 'Get Basic Care'
  },
  {
    id: 'growth-care',
    name: 'Growth Care',
    monthlyPrice: '600.000',
    oneTimePrice: '1.080.000',
    description: 'Untuk UMKM yang websitenya mulai serius dan butuh performa + tampilan yang lebih baik.',
    isPopular: true,
    features: [
      'Semua yang ada di Basic Care',
      'Cek & optimasi kecepatan halaman',
      'Minor edit konten & layout (maks 3x/bulan)',
      'Laporan performa + rekomendasi bulanan',
      'Respon WhatsApp prioritas (24 jam)',
      '1x konsultasi singkat per bulan (30 menit)'
    ],
    ctaText: 'Start Growth Care'
  }
];

export const addonServices = [
  {
    category: 'Pages & Layout',
    items: [
      { name: 'Standard Static Page', price: '100.000', originalPrice: '200.000', desc: 'Halaman informasi tambahan (About, FAQ, etc)' },
      { name: 'Dynamic Feature Page', price: '350.000', originalPrice: '500.000', desc: 'Halaman dengan data dinamis (Filter, API Integration)' },
      { name: 'High-Conversion Landing', price: '1.000.000', originalPrice: '1.500.000', desc: 'Halaman promosi khusus dengan copywriting persuasif' }
    ]
  },
  {
    category: 'Features & Optimization',
    items: [
      { name: 'Advanced Animation (GSAP)', price: '1.000.000', desc: 'Animasi interaktif premium untuk kesan WOW' },
      { name: 'Payment Gateway Setup', price: '1.000.000', originalPrice: '1.500.000', desc: 'Integrasi Midtrans/Xendit untuk pembayaran otomatis' },
      { name: 'Advanced SEO Engine', price: '1.000.000', originalPrice: '2.000.000', desc: 'Setup SEO technical & Content Strategy mendalam' }
    ]
  }
];
