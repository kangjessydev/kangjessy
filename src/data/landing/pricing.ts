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
  // technology: string;
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
    // technology: 'WordPress',
    suitableFor: ' UMKM, toko lokal, atau jasa perorangan yang butuh website pertama mereka — simpel, cepat, dan profesional.',
    badge: 'Best for Beginners',
    ctaText: 'Start Your Brand',
    features: [],
    featureGroups: [
      {
        name: 'Halaman & Konten',
        items: [
          { text: '5 halaman utama', included: true, tooltip: 'Beranda, Tentang Kami, Layanan, Kontak, + 1 halaman bebas sesuai kebutuhan kamu.' },
          { text: 'Desain responsif mobile & desktop', included: true, tooltip: 'Tampilan website akan menyesuaikan dengan ukuran layar perangkat yang digunakan (HP, tablet, laptop, desktop).' },
          { text: 'Copywriting dasar tiap halaman', included: true, tooltip: 'Penulisan konten website yang ringkas, jelas, dan sesuai dengan brand kamu.' },
          { text: 'Halaman statis', included: false, tooltip: 'Halaman yang kontennya tidak berubah-ubah dan dibuat sesuai kebutuhan awal. Contoh: halaman FAQ, halaman kebijakan privasi, halaman syarat & ketentuan.' },
          { text: 'Katalog / Halaman dinamis', included: false, tooltip: 'Halaman yang kontennya bisa diubah-ubah dengan mudah melalui admin panel.' },
          { text: 'Landing page campaign', included: false, tooltip: 'Halaman khusus untuk promosi atau iklan.' },
        ]
      },
      {
        name: 'Fitur Teknis',
        items: [
          { text: 'Akses panel kelola konten', included: true, tooltip: 'Kamu bisa update konten website tanpa perlu bantuan developer.' },
          { text: 'Form kontak + notifikasi email otomatis', included: true, tooltip: 'Setiap ada yang mengisi form, kamu akan mendapatkan notifikasi email.' },
          { text: 'SSL & proteksi login', included: true, tooltip: 'SSL untuk keamanan website dan proteksi login untuk keamanan akun.' },
          { text: 'Optimasi kecepatan loading', included: true, tooltip: 'Gambar dikompres, cache diaktifkan, dan kode dioptimalkan untuk kecepatan loading.' },
          { text: 'Setup Google Analytics & Search Console', included: true, tooltip: 'Setup Google Analytics & Search Console untuk melacak pengunjung website.' },
          { text: 'Sistem transaksi / pembayaran online', included: false, tooltip: 'Integrasi pembayaran menggunakan QRIS, transfer bank, atau payment gateway lainnya.' },
          { text: 'Member area / Pelanggan akun', included: false, tooltip: 'Pengunjung bisa membuat akun dan login untuk mengakses konten khusus.' },
        ]
      },
      {
        name: 'Bonus',
        items: [
          { text: 'Gratis domain 1 tahun', included: true, tooltip: 'Khusus domain my.id, .biz.id, .com, .id, .net, .org, .xyz, .info' },
          { text: 'Video panduan kelola website', included: true, tooltip: 'Video singkat yang menunjukkan cara update konten & penggunaan website' },
          { text: '1 bulan maintenance gratis', included: false, tooltip: 'Tersedia di paket Business Growth & Pro Scale' },
        ]
      }
    ]
  },
  {
    id: 'business-growth',
    name: 'Business Growth',
    price: '3.500.000',
    // originalPrice: '6.000.000',
    description: 'Untuk bisnis yang sudah berjalan dan butuh website yang bekerja aktif mendatangkan pelanggan & konversi.',
    estimate: '2-3 Minggu',
    revisions: '3x Revisi',
    // technology: 'WordPress / Laravel',
    suitableFor: 'Toko online, restoran, bisnis jasa yang butuh sistem pemesanan atau pembayaran online, dan UMKM yang ingin serius di digital.',
    badge: 'Most Popular',
    isPopular: true,
    ctaText: 'Grow Your Business',
    features: [],
    featureGroups: [
      {
        name: 'Halaman & Konten',
        items: [
          { text: 'Semua Fitur Starter Essential', included: true, isPopular: true },
          { text: 'Hingga 3 halaman statis tambahan ', included: true, tooltip: 'Halaman kontent tetap seperti FAQ, Kebijakan Privasi, Syarat & Ketentuan, dll.' },
          { text: 'Katalog / menu / portofolio dinamis', included: true, tooltip: 'Halmaan yang isinya bisa kamu update sendiri melalui admin panel. Cocok untuk toko online, restoran, atau portofolio.' },
          { text: 'Landing page campaign', included: true, tooltip: 'Halaman khusus untuk promosi atau iklan. Fokus ke satu pesan utama dengan call-to-action yang jelas. Cotok untuk event, promo, atau kampanye khusus.' },
          { text: '5 artikel konten awal', included: true, tooltip: '5 artikel yang dioptimasi untuk pencarian google berdasarkan keyword bisnis kamu. ' },
          { text: 'Desain UI Dashboard custom', included: false, tooltip: 'Desain UI Dashboard yang disesuaikan dengan kebutuhan bisnis kamu. ' },
        ]
      },
      {
        name: 'Fitur Teknis',
        items: [
          { text: 'Sistem transaksi / pembayaran online ', included: true, tooltip: 'Pelanggan bisa bayar langsung di website via QRIS, transfer bank, atau kartu kredit dan otomatis terkonfirmasi tanpa harus konfirmasi manual.' },
          { text: 'Otomasi notifikasi & follow-up ', included: true, tooltip: 'Sistem otomatis kirim email atau notifikasi ke pelanggan setelah transaksi, pendaftaran, atau pengisian form tanpa harus kirim manual satu per satu.' },
          { text: 'Optimasi kecepatan lanjutan', included: true, tooltip: 'Termasuk optimasi database, lazy load, dan pemisahan asset untuk performa yang lebih baik.' },
          { text: 'Pencadangan otomatis mingguan', included: true, tooltip: 'Data website dicadangkan setiap minggu membantu pemulihan ketika terjadi kesalahan.' },
          { text: 'Member area / akun pelanggan ', included: true, tooltip: 'Pengunjung bisa membuat akun dan login untuk mengakses konten khusus.' },
          { text: 'Arsitektur sistem terpisah', included: false, tooltip: 'Frontend dan backend terpisah untuk performa dan keamanan lebih baik.' },
          { text: 'Integrasi sistem / software lama ', included: false, tooltip: 'Integrasi dengan sistem yang sudah ada (CRM, ERP, dll).' },
        ]
      },
      {
        name: 'Bonus',
        items: [
          { text: 'Gratis domain 1 tahun', included: true, tooltip: 'Khusus domain my.id, .biz.id, .com, .id, .net, .org, .xyz, .info' },
          { text: '1 bulan Basic Care maintenance gratis', included: true, tooltip: 'Website kamu dipantau dan dirawat selama 1 bulan setelah launch. Termasuk update keamanan, backup, dan monitoring performa.' },
          // { text: '1x sesi kick-off via video call', included: true, tooltip: 'Sesi diskusi singkat untuk memastikan website sesuai dengan kebutuhan bisnis kamu.' },
        ]
      }
    ]
  },
  {
    id: 'pro-scale',
    name: 'Pro Scale',
    price: '7.500.000',
    // originalPrice: '12.000.000',
    description: 'Solusi digital menyeluruh untuk bisnis yang butuh sistem kompleks, integrasi lanjutan, dan skalabilitas jangka panjang.',
    estimate: '3-5 Minggu',
    revisions: '5x Revisi',
    // technology: 'Laravel + Vue/React (custom stack)',
    suitableFor: 'Startup, bisnis dengan sistem reservasi/inventori/CRM custom, atau perusahaan yang butuh platform digital sendiri yang bisa tumbuh.',
    badge: 'Unlimited Scale',
    ctaText: 'Start Custom Project',
    features: [],
    featureGroups: [
      {
        name: 'Halaman & Konten',
        items: [
          { text: 'Semua Fitur Business Growth', included: true, isPopular: true },
          { text: 'Hingga 5 halaman statis tambahan', included: true },
          { text: 'Hingga 3 jenis halaman dinamis', included: true, tooltip: 'Contoh: halaman produk, halaman event, halaman artikel, halaman portofolio, dll.' },
          { text: 'Desain UI dashboard custom', included: true, tooltip: 'Desain UI Dashboard yang disesuaikan dengan kebutuhan bisnis kamu. ' },
          { text: '5 artikel konten awal (lebih panjang & terstruktur)', included: true, tooltip: '5 artikel yang dioptimasi untuk pencarian google berdasarkan keyword bisnis kamu. ' },
        ]
      },
      {
        name: 'Fitur Teknis',
        items: [
          { text: 'Arsitektur sistem terpisah', included: true, tooltip: 'Frontend dan backend terpisah untuk performa dan keamanan lebih baik.' },
          { text: 'Integrasi sistem / software lama', included: true, tooltip: 'Integrasi dengan sistem yang sudah ada (CRM, ERP, dll).' },
          { text: 'Hak akses tim yang fleksibel', included: true, tooltip: 'Setiap anggota tim punya akses sesuai perannya (owner, admin, staff, dll).' },
          { text: 'Integrasi hingga 2 layanan pihak ketiga', included: true, tooltip: 'Contoh: payment gateway, layanan email, google sheets, dll.' },
          { text: 'Enkripsi & proteksi data sensitif', included: true, tooltip: 'Enkripsi data sensitif untuk melindungi data bisnis kamu.' },
          { text: 'Dibangun untuk trafik tinggi', included: true, tooltip: 'Membuat website mampu menangani banyak pengunjung secara bersamaan tanpa melambat.' },
          { text: 'Pencadangan harian + pantau uptime', included: true, tooltip: 'Backup data website setiap hari dan pantau performa website secara berkala.' },
        ]
      },
      {
        name: 'Bonus',
        items: [
          { text: 'Gratis domain 1 tahun', included: true, tooltip: 'Khusus domain my.id, .biz.id, .com, .id, .net, .org, .xyz, .info'},
          { text: '1 bulan Growth Care maintenance gratis', included: true, tooltip: 'Website kamu dipantau dan dirawat selama 1 bulan setelah launch. Termasuk update keamanan, backup, dan monitoring performa.' },
          { text: 'Video panduan + dokumen serah terima sistem', included: true, tooltip: 'Video tutorial dan dokumen untuk membantu kamu mengelola website.' },
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
      { name: 'Standard Static Page', price: '250.000', desc: 'Halaman informasi tambahan (Kontak, FAQ, Profil Tim, Kebijakan Privasi, dsb) dengan desain yang serasi dengan website utama.' },
      { name: 'Dynamic Interactive Page', price: '500.000', desc: 'Halaman dengan elemen interaktif seperti filter produk, pencarian real-time, atau konten yang bisa dikelola mandiri via CMS.' },
      { name: 'API Integration Page', price: '850.000', desc: 'Halaman terhubung ke layanan eksternal (peta, ongkir, cuaca, notifikasi, dsb) yang memiliki dokumentasi API publik. (Ketersediaan integrasi dikonfirmasi setelah evaluasi singkat — tanpa biaya tambahan)' },
      { name: 'High-Conversion Landing Page', price: '1.200.000', desc: 'Halaman campaign dengan riset copywriting persuasif, struktur konversi, dan desain yang fokus mendatangkan leads atau penjualan.' },
    ]
  },
  {
    category: 'Features & Optimization',
    items: [
      { name: 'Advanced Animation (GSAP)', price: '1.000.000', desc: 'Animasi interaktif premium (scroll-triggered, hover, transisi halaman) untuk kesan visual yang kuat dan engagement lebih tinggi.' },
      { name: 'Payment Gateway Setup', price: '1.000.000', desc: 'Integrasi pembayaran online (QRIS, transfer bank, kartu kredit) untuk website yang sudah ada tapi belum bisa terima pembayaran otomatis.' },
      { name: 'Speed & Performance Boost', price: '550.000', desc: 'Optimasi kecepatan sisi teknis — kompresi aset, caching, lazy load, dan minifikasi kode untuk loading yang lebih cepat.' },
      { name: 'Member Area / Login System', price: '1.200.000', desc: 'Sistem akun pelanggan — pengunjung bisa daftar, login, dan akses konten atau fitur khusus sesuai perannya.' },
      { name: 'WhatsApp Business Integration', price: '450.000', desc: 'Tombol WA teroptimasi dengan pesan pre-filled sesuai konteks, plus notifikasi otomatis ke WhatsApp bisnis kamu saat ada form masuk atau order baru. (Bukan chatbot — untuk chatbot kompleks masuk ke paket Custom)' },
      { name: 'Multi-language Support', price: '800.000', desc: 'Website bisa diakses dalam dua bahasa atau lebih — cocok untuk bisnis yang melayani klien lokal dan internasional sekaligus.' },
    ]
  },
  {
    category: 'Content & SEO',
    items: [
      { name: 'Advanced SEO Engine', price: '1.000.000', desc: 'Audit teknis mendalam, riset keyword kompetitor, on-page optimization per 5 halaman, dan panduan strategi konten untuk bisnis kamu.' },
      { name: 'Paket Artikel Konten', price: '600.000', desc: '5 artikel blog yang dioptimasi untuk pencarian Google berdasarkan keyword bisnis kamu — ditulis alami, bukan sekadar isian.' },
      { name: 'Copywriting Halaman (per halaman)', price: '350.000', desc: 'Penulisan ulang atau pembuatan teks konten untuk halaman tertentu — lebih persuasif, lebih jelas, dan lebih sesuai target audiens (dihitung per halaman)' },
      { name: 'Google Analytics & Search Console Setup', price: '200.000', desc: 'Instalasi dan konfigurasi lengkap — pantau jumlah pengunjung, sumber trafik, dan performa keyword website kamu di Google.' }
    ]
  },
  {
    category: 'Management & Technical',
    items: [
      { name: 'Migrasi & Deployment', price: '450.000', desc: 'Pindah hosting, domain, atau platform lama ke ekosistem baru — termasuk transfer data, konfigurasi DNS, dan verifikasi setelah migrasi.' },
      { name: 'Professional Email Setup', price: '200.000', desc: 'Konfigurasi email domain bisnis (halo@namabisnis.com) dengan proteksi spam dan sinkronisasi ke HP maupun laptop.' },
      { name: 'Backup System Setup', price: '300.000', desc: 'Konfigurasi sistem backup otomatis — data website dicadangkan secara berkala ke cloud sehingga bisa dipulihkan kapanpun dibutuhkan. (Pemulihan data hanya bisa dilakukan jika backup tersedia. Data yang hilang tanpa backup tidak dapat dijamin pemulihannya)' },
      { name: 'Security Hardening', price: '350.000', desc: 'Penguatan keamanan website yang sudah ada — proteksi login, blokir serangan umum, SSL, dan pembaruan komponen kritis.' }
    ]
  }
];
