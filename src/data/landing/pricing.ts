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
          { text: 'Video panduan kelola website', included: true, tooltip: 'Video singkat yang menunjukkan cara update konten & penggunaan website' },
          { text: 'Gratis domain 1 tahun', included: true, tooltip: 'Khusus domain my.id, .biz.id, .com, .id' },
          { text: 'Panduan pilih hosting gratis', included: true, tooltip: 'Saya akan merekomendasikan hosting yang sesuai dengan kebutuhan bisnis kamu.' },
          { text: 'Setup hosting gratis', included: true, tooltip: 'Hosting di pihak kamu, estimasi Rp 15–30rb/bulan tergantung kebijakan provider hosting.' },
          { text: 'Hosting tidak disediakan', included: false, tooltip: 'Tersedia di paket Business Growth & Pro Scale' },
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
          { text: 'Video panduan + dokumen serah terima sistem', included: true, tooltip: 'Video tutorial & dokumen untuk membantu kamu mengelola website.' },
          { text: 'Gratis domain 1 tahun', included: true, tooltip: 'Khusus domain my.id, .biz.id, .com, .id, .net, .org, .xyz, .info' },
          { text: 'Hosting shared premium 1 tahun', included: true, tooltip: 'cukup untuk website bisnis aktif.' },
          // { text: 'Spek: 5GB SSD, unlimited bandwidth', included: true, tooltip: 'Spesifikasi minimum yang digunakan untuk website kamu. ' },
          { text: 'Setup & konfigurasi penuh', included: true, tooltip: 'Setup hosting, Setup SSL, setup email bisnis, dan konfigurasi awal website.' },
          { text: '1 bulan Basic Care maintenance gratis', included: true, tooltip: 'Website kamu dipantau dan dirawat selama 1 bulan setelah launch. Termasuk update keamanan, backup, dan monitoring performa.' },
          // { text: '1x sesi kick-off via video call', included: true, tooltip: 'Sesi diskusi singkat untuk memastikan website sesuai dengan kebutuhan bisnis kamu.' },
        ]
      },
      {
        name: 'Bonus Opsinal',
        items: [
          { text: '2 konten TikTok profesional untuk promosi launch website, bekerja sama dengan partner kami FCA.', included: true, tooltip: 'Klaim bonus ini via WhatsApp, maksimal 7 hari setelah website kamu resmi tayang.', isPopular: true },
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
          { text: 'Video panduan + dokumen serah terima sistem', included: true, tooltip: 'Video tutorial dan dokumen untuk membantu kamu mengelola website.' },
          { text: 'Gratis domain 1 tahun', included: true, tooltip: 'Khusus domain my.id, .biz.id, .com, .id, .net, .org, .xyz, .info'},
          { text: 'VPS entry level 1 tahun', included: true, tooltip: 'mampu menangani sistem dan trafik lebih tinggi' },
          // { text: 'Spek: 2 vCPU, 2GB RAM, 20GB SSD', included: true, tooltip: 'Spesifikasi minimum yang digunakan untuk website kamu. ' },
          { text: 'Setup, konfigurasi & optimasi server', included: true, tooltip: 'Setup VPS, konfigurasi server, dan optimasi performa website.' },
          { text: '1 bulan Growth Care maintenance gratis', included: true, tooltip: 'Website kamu dipantau dan dirawat selama 1 bulan setelah launch. Termasuk update keamanan, backup, dan monitoring performa.' },
        ]
      },
      {
        name: 'Bonus Opsinal',
        items: [
          { text: '4 konten TikTok profesional untuk promosi launch website, bekerja sama dengan partner kami FCA.', included: true, tooltip: 'Klaim bonus ini via WhatsApp, maksimal 7 hari setelah website kamu resmi tayang.', isPopular: true },
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
    category: 'Pages & Content',
    items: [
      { name: 'Standard Static Page', price: '250.000', desc: 'Halaman informasi tambahan (Kontak, FAQ, Profil Tim, Kebijakan Privasi, dsb) dengan desain yang serasi dengan website utama.' },
      { name: 'High-Conversion Landing Page', price: '1.200.000', desc: 'Halaman campaign khusus promosional. Fokus dengan copywriting persuasif dan struktur untuk mendatangkan konversi penjualan/leads.' },
      { name: 'Copywriting Halaman', price: '350.000', desc: 'Penulisan ulang teks untuk halaman tertentu agar lebih persuasif, jelas, dan "menjual" (harga dihitung per halaman).' },
      { name: 'Paket 5 Artikel SEO', price: '600.000', desc: 'Pembuatan artikel blog yang disesuaikan dengan kata kunci pencarian. (Bagus untuk paket Starter, karena Business Growth & Pro sudah include ini).' }
    ]
  },
  {
    category: 'Features & Experience',
    items: [
      { name: 'Premium Animation (GSAP)', price: '1.000.000', desc: 'Buat website terasa jauh lebih berkesan dan eksklusif dengan efek transisi interaktif dan animasi halus saat user melakukan scroll.' },
      { name: 'Speed & Performance Boost', price: '550.000', desc: 'Optimasi kecepatan loading tingkat lanjut. Sangat berguna jika kamu memiliki website lama yang terasa lambat saat diakses pelanggan.' },
      { name: 'WhatsApp Automations', price: '450.000', desc: 'Integrasi WA di mana format pesannya sudah tersusun menyesuaikan produk, plus notif otomatis saat ada order di form.' },
      { name: 'Advanced SEO Setup', price: '1.000.000', desc: 'Optimalisasi sisi dalam website agar lebih terdeteksi oleh mesin pencari seperti Google, membantu calon klien menemukan situsmu.' }
    ]
  },
  {
    category: 'Technical Management',
    items: [
      { name: 'Migrasi & Pemindahan Sistem', price: '450.000', desc: 'Terima beres untuk pindahan hosting, domain, atau pemindahan website dari platform lamamu ke sistem yang baru.' },
      { name: 'Setup Professional Email', price: '200.000', desc: 'Punya email resmi dengan nama bisnismu sendiri (contoh: cs@bisnis.com) lengkap dengan sinkronisasi ke HP klien.' }
    ]
  }
];
