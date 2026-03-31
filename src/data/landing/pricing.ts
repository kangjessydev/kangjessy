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
  billingCycle?: string;
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
    originalPrice: '3.000.000',
    description: 'Kapasitas tepat untuk memulai visibilitas brand atau tahap awal bisnis.',
    badge: 'Best for Beginners',
    ctaText: 'Start Your Brand',
    features: [
      { text: 'Kapasitas Layanan Dasar', included: true, tooltip: 'Ruang lingkup optimal untuk memulai bisnis baru atau profil perusahaan standar.' },
      { text: 'Maksimal 5 Halaman General', included: true, tooltip: 'Termasuk halaman esensial seperti Beranda, Tentang Kami, Layanan, Kontak, dan sejenisnya.' },
      { text: 'Akses Admin & Administrator', included: true, tooltip: 'Hak akses untuk mengontrol isi konten website secara penuh dan mandiri.' },
      { text: 'Sistem Terpusat Sederhana', included: true, tooltip: 'Tipe arsitektur dasar yang mudah dikelola, tanpa kerumitan interaksi data silang.' },
      { text: 'Notifikasi Kontak Otomatis', included: true, tooltip: 'Pesan dari pengunjung langsung diteruskan ke Email atau ponsel Anda seketika.' },
      { text: 'Performa Infrastruktur Standar', included: true, tooltip: 'Menggunakan ruang server responsif yang memadai untuk kelancaran lalu lintas bisnis harian.' },
      { text: 'Sistem Keamanan SSL Dasar', included: true, tooltip: 'Situs web Anda sudah otomatis memiliki enkripsi gembok pengaman hijau di peramban.' },
      { text: 'Halaman Ekstra & Data Dinamis', included: false, tooltip: 'Belum termasuk halaman statis promo tambahan atau halaman data bersistem filter dinamis.' },
      { text: 'Bonus Artikel SEO Tematik', included: false, tooltip: 'Tidak mendapatkan paket artikel penunjang SEO gratis.' },
      { text: 'Integrasi Gerbang Pembayaran', included: false, tooltip: 'Belum terhubung secara instan ke sistem bank atau e-wallet otomatis untuk transaksi.' },
      { text: 'Integrasi Kecerdasan Buatan (AI)', included: false, tooltip: 'Tidak termasuk perancangan bot asisten AI pintar untuk website Anda.' },
    ]
  },
  {
    id: 'business-growth',
    name: 'Business Growth',
    price: '3.000.000',
    originalPrice: '6.000.000',
    description: 'Skalabilitas tinggi dan logic kustomisasi ekstensif untuk sistem konversi bisnis.',
    badge: 'Most Popular',
    isPopular: true,
    ctaText: 'Grow Your Business',
    features: [
      { text: '✨ Semua Fitur Starter Essential', included: true, isPopular: true, tooltip: 'Kapasitas dasar, SSL, dan kemudahan manajemen sudah otomatis Anda miliki.' },
      { text: 'Maksimal 5 Halaman General', included: true, tooltip: 'Termasuk halaman esensial perusahaan yang menjadi pilar identitas web.' },
      { text: 'Gratis 2 Halaman Statis & 1 Dinamis', included: true, tooltip: 'Extra halaman spesifik untuk promo, dan 1 halaman pintar (misal: katalog berfilter).' },
      { text: 'Gratis 10 Artikel SEO Tematik', included: true, tooltip: 'Penerbitan 10 artikel SEO profesional sesuai industri Anda untuk memancing kunjungan Google.' },
      { text: 'Akses Admin & Administrator', included: true, tooltip: 'Akses tingkat pengelola utama atas seluruh aset konten website dan arsitektur data.' },
      { text: 'Struktur Data Relasional Custom', included: true, tooltip: 'Data saling merajut dan terintegrasi akurat (Misal: Ulasan pelanggan tersambung ke halaman Produk terkait).' },
      { text: 'Integrasi Gerbang Pembayaran', included: true, tooltip: 'Terkoneksi resmi dengan platform transaksi pembayaran real-time secara legal.' },
      { text: 'Automasi Lembar Kerja Prospek', included: true, tooltip: 'Data prospek pelanggan yang masuk langsung terekam rapi ke layanan spreadsheet sentral.' },
      { text: 'Performa Skala Ekspansif', included: true, tooltip: 'Kapasitas infrastruktur dioptimalkan sanggup menahan lonjakan pengunjung dari iklan berbayar secara mulus.' },
      { text: 'Proteksi Pencadangan Lanjutan', included: true, tooltip: 'Media penyimpanan terstruktur untuk menjamin kestabilan dan pemulihan data.' },
      { text: 'Integrasi Kecerdasan Buatan (AI)', included: false, tooltip: 'Sistem belum menyertakan modul asisten AI terpadu untuk pelayanan otomatis pelanggan.' },
    ]
  },
  {
    id: 'elite-custom',
    name: 'Elite Enterprise',
    price: '8.000.000',
    originalPrice: '10.000.000',
    description: 'Platform khusus tanpa batas kapabilitas. Multi-Sistem, Cepat, dan Tersentralisasi.',
    badge: 'Unlimited Scale',
    ctaText: 'Start Custom Project',
    features: [
      { text: '✨ Semua Fitur Business Growth', included: true, tooltip: 'Sudah mutlak mencakup otomasi prospek data, struktur relasional, serta optimasi SEO harian.' },
      { text: 'Maksimal 5 Halaman General', included: true, tooltip: 'Pondasi utama perusahaan dengan jaminan kualitas pengembangan tertinggi.' },
      { text: 'Gratis 5 Halaman Statis & 3 Dinamis', included: true, tooltip: 'Leluasa mengeksekusi ide fitur spesifik secara bersamaan tanpa batasan konsep arsitektur.' },
      { text: 'Gratis 10 Artikel SEO Tematik', included: true, tooltip: 'Strategi rilis konten mumpuni untuk supremasi peringkat jangka panjang di pasaran Anda.' },
      { text: 'Akses Tingkat Akar (Root/Owner)', included: true, tooltip: 'Kendali murni tak ternilai di atas otoritas pengelola sistem manapun terhadap semua log.' },
      { text: 'Arsitektur Terpisah Kelas Industri', included: true, tooltip: 'Fondasi antarmuka dan panel pengolah data dipisah secara brutal agar anti-lambat dan terproteksi maksimal dari serangan retas.' },
      { text: 'Sinkronisasi Perangkat Lunak Lama', included: true, tooltip: 'Mendukung penyelarasan integrasi dengan software gudang/kasir/toko offline lama Anda melalui API penghubung.' },
      { text: 'Dashboard Otorisasi Multi-Level', included: true, tooltip: 'Otoritas berjenjang. Karyawan Gudang hanya bisa catat data, Manager baca rekap, Direksi pantau segalanya.' },
      { text: 'Skala Beban Trafik Tak Terbatas', included: true, tooltip: 'Ketahanan infrastruktur adaptif yang siap bergulir otomatis meredam gempuran berapapun besarnya jumlah pengunjung.' },
      { text: 'Sistem Keamanan Terisolasi Total', included: true, tooltip: 'Penyimpanan enkripsi kelas atas dengan sistem pelacakan (logging) transparan untuk memantau gerak-gerik setiap staf.' },
      { text: 'Fasilitas Kecerdasan Buatan (AI)', included: true, tooltip: 'Hadirkan Bot Asisten AI interaktif & cerdas untuk menjawab klien atau melakukan analisis terotomatisasi secara instan.' },
    ]
  }
];

export const maintenancePlans: MaintenancePlan[] = [
  {
    id: 'basic-care',
    name: 'Basic Care',
    weeklyPrice: '150.000',
    monthlyPrice: '300.000',
    oneTimePrice: '250.000',
    description: 'Menjaga website Anda tetap "sehat" dan aman dengan pengecekan teknis berkala.',
    features: [
      'Pengecekan Kesehatan (Monthly)',
      'Cadangan Data Khusus Cloud (Monthly)',
      'Filter Anti-Spam & Kebersihan Form',
      'Pembaruan Keamanan Sesuai Patch',
      'Bantuan Teknis via WhatsApp'
    ],
    ctaText: 'Get Basic Care'
  },
  {
    id: 'power-support',
    name: 'Power Support',
    weeklyPrice: '350.000',
    monthlyPrice: '800.000',
    oneTimePrice: '600.000',
    description: 'Pendampingan aktif untuk performa bisnis yang lebih optimal dan stabil setiap saat.',
    isPopular: true,
    features: [
      'Pengecekan Kesehatan (Weekly)',
      'Keamanan & Optimasi Lanjutan',
      'Cadangan Data & Cloud Sync (Weekly)',
      'Bantuan Edit Konten & Tata Letak',
      'Support Teknis Jalur Prioritas'
    ],
    ctaText: 'Start Power Support'
  },
  {
    id: 'technical-partner',
    name: 'Technical Partner',
    weeklyPrice: '800.000',
    monthlyPrice: '2.000.000',
    oneTimePrice: '1.500.000',
    description: 'Saya menjadi CTO/Partner teknis Anda untuk mengawal pertumbuhan teknis ekosistem bisnis.',
    features: [
      'Pemantauan 24/7 & Alert Insiden',
      'Manajemen Infrastruktur & Database',
      'Perbaikan Bug & Perubahan Minor Tanpa Batas',
      'Konsultasi Strategi Teknologi (Monthly)',
      'Respon Darurat & Prioritas Utama'
    ],
    ctaText: 'Partner With Me'
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
