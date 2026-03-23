export interface FAQItem {
    keywords: string[];
    question: string;
    answer: string;
    category: 'service' | 'pricing' | 'process' | 'general' | 'features' | 'maintenance' | 'addons';
    nextSteps?: string[]; 
}

export const faqData: FAQItem[] = [
    {
        category: 'service',
        keywords: ['paket', 'layanan', 'bikin', 'buat', 'website', 'apa saja', 'pilihan'],
        question: 'Apa saja paket pembuatan website yang tersedia?',
        answer: 'Kami memiliki 3 kategori paket utama yang disesuaikan dengan skala bisnis Anda:\n\n1. [**Starter Essential**](/#pricing)\nCocok untuk personal branding atau katalog situs web dasar. Termasuk desain framework standar dan optimasi performa dasar.\n\n2. [**Business Growth (Most Popular)**](/#pricing)\nDirancang khusus untuk konversi penjualan dan pertumbuhan bisnis. Termasuk desain UI/UX Custom Premium, strategi sales, dan Panel CMS untuk mengedit sendiri.\n\n3. [**Elite Enterprise (Scale Up)**](/#pricing)\nSistem digital skala besar dengan arsitektur server khusus, integrasi API sistem lain, dan Dashboard Admin Multi-Role.\n\nAnda dapat melihat detail lengkap mengenai fitur di halaman [Layanan Kami](/services).',
        nextSteps: ['Detail Harga', 'Add-ons Tambahan']
    },
    {
        category: 'pricing',
        keywords: ['harga', 'biaya', 'berapa', 'price', 'budget', 'mahal', 'murah', 'diskon', 'promo'],
        question: 'Berapa biaya pembuatan website untuk masing-masing paket?',
        answer: 'Saat ini sedang ada penawaran khusus. Berikut adalah rincian biaya investasi awal:\n\n- [**Starter Essential:**](/#pricing) **Rp 1.500.000** (Diskon 40% dari harga normal ~~Rp 2.500.000~~)\n- [**Business Growth:**](/#pricing) **Rp 4.500.000** (Diskon 60% dari harga normal ~~Rp 11.250.000~~)\n- [**Elite Enterprise:**](/#pricing) **Rp 12.500.000** (Diskon 38% dari harga normal ~~Rp 20.000.000~~)\n\nAnda dapat menumpuk diskon tambahan dengan melakukan konsultasi sekarang, atau pelajari detail paketnya di [Halaman Layanan](/services).',
        nextSteps: ['Paket Maintenance', 'Konsultasi Sekarang']
    },
    {
        category: 'maintenance',
        keywords: ['maintenance', 'perawatan', 'update', 'berlangganan', 'rusak', 'error', 'bantu', 'bulanan'],
        question: 'Apakah menyediakan layanan maintenance atau perawatan?',
        answer: 'Tentu. Demi kelancaran jangka panjang, kami menyediakan layanan maintenance yang bisa Anda bayarkan secara mingguan, bulanan, atau sekali bayar (seumur hidup).\n\nBerikut daftar harga untuk skema berlangganan **bulanan**:\n- **Basic Care:** **Rp 800.000 / bulan** (Pembaruan keamanan inti, performa minor, pencadangan data bulanan)\n- **Power Support:** **Rp 1.750.000 / bulan** (Audit keamanan mingguan, optimasi lanjutan, pembaruan konten prioritas)\n- **Technical Partner:** **Rp 4.500.000 / bulan** (Konsultasi teknis 24/7, manajemen infrastruktur, dukungan skalabilitas data tinggi)\n\nAnda bisa mengecek paket mingguan dan satu kali bayar di halaman penawaran kami.',
        nextSteps: ['Konsultasi Perawatan']
    },
    {
        category: 'addons',
        keywords: ['tambah halaman', 'fitur aja', 'addon', 'custom', 'nambah', 'integrasi', 'payment'],
        question: 'Apakah bisa jika hanya ingin tambah halaman, fitur, atau payment gateway saja?',
        answer: 'Sangat bisa. Kami menyediakan **Individual Services & Add-ons** bagi Anda yang ingin menambah fungsionalitas tanpa mengambil paket utama.\n\n**Pages & Layout:**\n- Standard Static Page: **Rp 350.000**\n- Dynamic Feature Page: **Rp 750.000**\n- High-Conversion Landing: **Rp 1.250.000**\n\n**Features & Optimization:**\n- Advanced Animation (GSAP): **Rp 1.000.000**\n- Payment Gateway Setup: **Rp 1.500.000**\n- Advanced SEO Engine: **Rp 2.000.000**',
        nextSteps: ['Konsultasi Add-on']
    },
    {
        category: 'process',
        keywords: ['lama', 'waktu', 'durasi', 'berapa hari', 'berapa lama', 'kapan jadi'],
        question: 'Berapa estimasi waktu pengerjaan project?',
        answer: 'Waktu penyelesaian bervariasi berdasarkan paket yang Anda pilih:\n\n- **Starter Essential:** Sangat cepat, 3-7 hari kerja (tergantung kesiapan materi).\n- **Business Growth:** 2-4 minggu, karena memerlukan riset konversi dan pembuatan UI/UX khusus.\n- **Elite Enterprise:** Mulai dari 4 minggu hingga beberapa bulan, sangat bergantung pada cakupan arsitektur sistem dan detail teknis (Sprint planning).',
        nextSteps: ['Alur Pengerjaan']
    },
    {
        category: 'process',
        keywords: ['alur', 'cara kerja', 'workflow', 'bagaimana', 'mulai', 'tahapan'],
        question: 'Bagaimana proses kerjasama dan alur pengerjaannya?',
        answer: 'Proses kerja kami sistematis untuk memastikan hasil terbaik:\n\n1. Audit & Diskusi Kebutuhan Bisnis\n2. Penawaran Detail & Persetujuan Kontrak\n3. Perancangan Mockup Visual (Wireframing/Design Phase)\n4. Fase Development (Pemrograman Code)\n5. Internal Testing & Revisi\n6. Handover, Pelatihan Penggunaan (Bila ada CMS), & Go Live.',
        nextSteps: ['Konsultasi Sekarang']
    }
];

export const quickActions = [
    { label: 'Pilihan Paket Layanan', icon: 'Box', trigger: 'apa saja paket pembuatan website yang tersedia' },
    { label: 'Opsi Perawatan (Maintenance)', icon: 'Settings', trigger: 'apakah menyediakan layanan maintenance atau perawatan' },
    { label: 'Penambahan Fitur (Add-ons)', icon: 'PlusCircle', trigger: 'apakah bisa jika hanya ingin tambah halaman, fitur, atau payment gateway saja' },
    { label: 'Estimasi Waktu Pengerjaan', icon: 'Clock', trigger: 'berapa estimasi waktu pengerjaan project' },
    { label: 'Mulai Konsultasi (WhatsApp)', icon: 'MessageSquare', trigger: 'hubungi staf terkait via whatsapp untuk konsultasi langsung' }
];
