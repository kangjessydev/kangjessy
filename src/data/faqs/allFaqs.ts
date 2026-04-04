export interface FAQItem {
    id: string;
    category: 'pricing' | 'process' | 'revision' | 'technical' | 'trust';
    question: string;
    answer: string;
    keywords: string[];
    placement: ('home' | 'smart')[];
    priority?: number; // Higher number = higher priority for Home page
}

export const allFaqs: FAQItem[] = [
    // --- Harga & Pembayaran ---
    {
        id: 'pricing-01',
        category: 'pricing',
        question: 'Berapa biaya membuat website?',
        answer: 'Tergantung kompleksitasnya. Paket kami mulai dari Rp 1.500.000 untuk website simpel, hingga Rp 7.500.000+ untuk sistem yang lebih kompleks. Semua harga sudah transparan di halaman layanan — tidak ada biaya tersembunyi.',
        keywords: ['biaya', 'harga', 'berapa', 'ongkos', 'budget', 'tarif', 'price'],
        placement: ['home', 'smart'],
        priority: 10
    },
    {
        id: 'pricing-02',
        category: 'pricing',
        question: 'Bagaimana sistem pembayarannya?',
        answer: 'DP 50% di awal sebelum pengerjaan dimulai, pelunasan 50% setelah website selesai dan siap didelivery. Pembayaran via transfer bank atau QRIS.',
        keywords: ['bayar', 'pembayaran', 'dp', 'pelunasan', 'transfer', 'rekening', 'qris', 'metode'],
        placement: ['home', 'smart'],
        priority: 9
    },
    {
        id: 'pricing-03',
        category: 'pricing',
        question: 'Apakah harga bisa dinegosiasi?',
        answer: 'Harga yang tertera sudah merupakan harga terbaik kami. Tapi kalau budget kamu terbatas, ceritakan kebutuhanmu — mungkin ada paket yang lebih sesuai atau fitur yang bisa disesuaikan tanpa mengorbankan kualitas.',
        keywords: ['nego', 'diskon', 'kurang', 'murah', 'potongan'],
        placement: ['smart'],
    },
    {
        id: 'pricing-04',
        category: 'pricing',
        question: 'Ada biaya tambahan setelah website jadi?',
        answer: 'Tidak ada biaya tersembunyi dari sisi kami. Tapi kamu perlu perpanjang domain dan hosting setiap tahun — biasanya Rp 150–400rb/tahun tergantung provider yang kamu pilih. Kami bantu rekomendasikan yang terbaik.',
        keywords: ['tambahan', 'biaya lain', 'bulanan', 'tahunan', 'perpanjang', 'maintenance'],
        placement: ['home', 'smart'],
    },
    {
        id: 'pricing-05',
        category: 'pricing',
        question: 'Apakah domain dan hosting sudah termasuk di paket?',
        answer: 'Gratis domain 1 tahun sudah termasuk di semua paket. Untuk hosting, kami rekomendasikan agar atas nama kamu sendiri supaya kamu punya kendali penuh — kami bantu setup-nya.',
        keywords: ['domain', 'hosting', 'server', 'gratis', 'include'],
        placement: ['home', 'smart'],
    },

    // --- Proses & Waktu Pengerjaan ---
    {
        id: 'process-01',
        category: 'process',
        question: 'Berapa lama website saya selesai?',
        answer: 'Paket Starter selesai 1–2 minggu, Business Growth 2–3 minggu, Pro Scale 3–5 minggu. Waktu ini bisa lebih cepat kalau semua materi dari kamu sudah siap di awal.',
        keywords: ['lama', 'waktu', 'durasi', 'deadline', 'kapan', 'selesai', 'cepat'],
        placement: ['home', 'smart'],
        priority: 8
    },
    {
        id: 'process-02',
        category: 'process',
        question: 'Apa yang perlu saya siapkan sebelum pengerjaan dimulai?',
        answer: 'Minimal: logo bisnis kamu, deskripsi singkat produk/layanan, dan foto (kalau ada). Kalau belum punya, kami bisa bantu dengan placeholder dulu dan diganti nanti. Semakin lengkap material yang kamu siapkan, semakin cepat website jadi.',
        keywords: ['siapkan', 'materi', 'logo', 'foto', 'data', 'syarat'],
        placement: ['home', 'smart'],
    },
    {
        id: 'process-03',
        category: 'process',
        question: 'Bagaimana proses konsultasinya?',
        answer: 'Mulai dari chat WhatsApp atau email — gratis, tanpa kewajiban. Kita diskusi kebutuhan, budget, dan timeline. Setelah sepakat, baru pengerjaan dimulai. Semua scope disepakati di awal secara tertulis.',
        keywords: ['konsultasi', 'tanya', 'diskusi', 'obrol', 'cerita'],
        placement: ['home', 'smart'],
    },
    {
        id: 'process-04',
        category: 'process',
        question: 'Apakah bisa minta update progress selama pengerjaan?',
        answer: 'Tentu. Kamu akan mendapat update berkala via WhatsApp. Untuk paket Business Growth dan Pro Scale, ada sesi review di tengah pengerjaan sebelum finalisasi.',
        keywords: ['update', 'progress', 'laporan', 'pantau', 'lihat'],
        placement: ['smart'],
    },
    {
        id: 'process-05',
        category: 'process',
        question: 'Apa yang terjadi kalau pengerjaan molor?',
        answer: 'Kami berkomitmen pada timeline yang sudah disepakati. Kalau ada kendala teknis, kamu akan diberitahu secepatnya beserta estimasi penyelesaian baru. Keterlambatan dari pihak kami tidak akan dikenakan biaya tambahan ke kamu.',
        keywords: ['molor', 'terlambat', 'telat', 'deadline lebi'],
        placement: ['smart'],
    },

    // --- Revisi & Hasil Akhir ---
    {
        id: 'revision-01',
        category: 'revision',
        question: 'Berapa kali saya bisa minta revisi?',
        answer: 'Tergantung paket: Starter 2x, Business Growth 3x, Pro Scale 5x. Revisi dihitung per putaran feedback — bukan per elemen. Revisi di luar kuota bisa ditambah dengan biaya yang disepakati.',
        keywords: ['revisi', 'ganti', 'ubah', 'feedback', 'kurang', 'cocok'],
        placement: ['home', 'smart'],
    },
    {
        id: 'revision-02',
        category: 'revision',
        question: 'Apakah desainnya bisa sesuai selera saya?',
        answer: 'Ya. Di awal pengerjaan kita diskusi preferensi desain kamu — warna, gaya, referensi website yang kamu suka. Hasilnya disesuaikan dengan brand bisnis kamu, bukan template generik.',
        keywords: ['desain', 'selera', 'warna', 'gaya', 'tampilan', 'template', 'bagus', 'keren'],
        placement: ['home', 'smart'],
    },
    {
        id: 'revision-03',
        category: 'revision',
        question: 'Apakah saya dapat file source code-nya?',
        answer: 'Untuk paket Pro Scale, kamu mendapat dokumen serah terima sistem termasuk akses ke repository. Untuk paket lain, kamu mendapat akses penuh ke website dan panel admin — source code bisa didiskusikan sesuai kebutuhan.',
        keywords: ['source code', 'file', 'koding', 'coding', 'script', 'github', 'repo'],
        placement: ['smart'],
    },
    {
        id: 'revision-04',
        category: 'revision',
        question: 'Bagaimana kalau hasil akhirnya tidak sesuai ekspektasi?',
        answer: 'Itulah kenapa kita diskusi detail di awal dan ada tahap review sebelum finalisasi. Tapi kalau ada yang tidak sesuai, kita selesaikan bersama — kepuasan kamu adalah prioritas utama kami.',
        keywords: ['kecewa', 'tidak sesuai', 'jelek', 'ekspektasi', 'prioritas'],
        placement: ['smart'],
    },

    // --- Teknis & Pengelolaan ---
    {
        id: 'technical-01',
        category: 'technical',
        question: 'Apakah saya bisa update konten website sendiri?',
        answer: 'Ya. Semua website yang kami bangun dilengkapi panel admin yang mudah digunakan — tidak perlu keahlian teknis. Kamu juga mendapat video panduan singkat cara mengelolanya.',
        keywords: ['update', 'edit', 'ganti foto', 'ubah teks', 'admin', 'panel', 'sendiri', 'cms'],
        placement: ['home', 'smart'],
        priority: 7
    },
    {
        id: 'technical-02',
        category: 'technical',
        question: 'Apakah website yang dibuat SEO friendly?',
        answer: 'Ya. Setiap website dibangun dengan struktur HTML semantik, kecepatan loading yang dioptimasi, dan meta tag yang tepat. Ini fondasi SEO yang kuat — untuk hasil lebih maksimal, tersedia paket Advanced SEO Engine sebagai add-on.',
        keywords: ['seo', 'google', 'cari', 'peringkat', 'loading', 'cepat', 'speed'],
        placement: ['home', 'smart'],
    },
    {
        id: 'technical-03',
        category: 'technical',
        question: 'Apakah website bisa diakses dari HP?',
        answer: 'Tentu. Semua website yang kami bangun responsif — tampilan otomatis menyesuaikan layar HP, tablet, maupun komputer.',
        keywords: ['hp', 'mobile', 'android', 'iphone', 'layar', 'responsif', 'tablet'],
        placement: ['home', 'smart'],
        priority: 6
    },
    {
        id: 'technical-04',
        category: 'technical',
        question: 'Teknologi apa yang digunakan?',
        answer: 'Kami menyesuaikan teknologi dengan kebutuhan — WordPress untuk website yang mudah dikelola mandiri, Laravel atau Vue untuk sistem yang lebih kompleks. Kamu tidak perlu pusing soal ini — kami yang rekomendasikan yang paling tepat.',
        keywords: ['teknologi', 'bahasa', 'coding', 'wordpress', 'laravel', 'vue', 'react', 'stack'],
        placement: ['smart'],
    },
    {
        id: 'technical-05',
        category: 'technical',
        question: 'Apakah website saya akan aman dari serangan hacker?',
        answer: 'Kami memasang proteksi dasar di semua paket — SSL, proteksi login, dan update keamanan rutin. Untuk proteksi lebih lanjut tersedia layanan Security Hardening dan Backup System Setup sebagai add-on.',
        keywords: ['aman', 'hacker', 'bobol', 'virus', 'ssl', 'proteksi', 'security', 'hack'],
        placement: ['home', 'smart'],
    },
    {
        id: 'technical-06',
        category: 'technical',
        question: 'Bagaimana kalau website saya bermasalah setelah jadi?',
        answer: 'Semua paket sudah include periode garansi — kalau ada bug dari pengerjaan kami, diperbaiki gratis. Untuk perawatan jangka panjang, tersedia paket Maintenance mulai Rp 300.000/bulan.',
        keywords: ['masalah', 'error', 'rusak', 'mati', 'bug', 'garansi', 'bantu'],
        placement: ['home', 'smart'],
    },

    // --- Kepercayaan & Keberatan ---
    {
        id: 'trust-01',
        category: 'trust',
        question: 'Apakah KangJessy bisa dipercaya? Bagaimana kalau kabur setelah DP?',
        answer: 'Pertanyaan yang wajar. Kami transparan soal identitas — nama, lokasi Bandung, dan kontak bisa dicek. Sistem kerja kami juga tertulis jelas: scope disepakati di awal, progress dibagikan berkala, dan pelunasan baru setelah website selesai. Kamu tidak keluar uang penuh di awal.',
        keywords: ['percaya', 'kabur', 'dp', 'aman', 'identitas', 'penipu', 'bohong', 'trusted'],
        placement: ['home', 'smart'],
        priority: 5
    },
    {
        id: 'trust-02',
        category: 'trust',
        question: 'Apakah KangJessy agensi atau freelancer?',
        answer: 'KangJessy adalah micro-agency — dikelola secara personal dengan standar kerja profesional. Artinya kamu ngobrol langsung dengan yang mengerjakan, bukan melewati layer CS atau account manager. Lebih cepat, lebih transparan.',
        keywords: ['agensi', 'freelancer', 'sendiri', 'tim', 'perusahan', 'kantor'],
        placement: ['home', 'smart'],
        priority: 4
    },
    {
        id: 'trust-03',
        category: 'trust',
        question: 'Apakah bisa lihat contoh hasil kerja dulu?',
        answer: 'Bisa. Kunjungi halaman Design Showreel di website kami untuk melihat contoh desain dan kemampuan teknis kami. Untuk project spesifik, bisa ditanyakan langsung via chat.',
        keywords: ['contoh', 'portfolio', 'kerjaan', 'hasil', 'showreel', 'liat', 'lihat'],
        placement: ['home', 'smart'],
    },
    {
        id: 'trust-04',
        category: 'trust',
        question: 'Saya tidak paham teknologi, apakah tetap bisa?',
        answer: 'Justru kami ada untuk itu. Kamu cukup ceritakan bisnis dan tujuanmu — soal teknis biar kami yang urus. Kami juga menyediakan panduan dan pendampingan supaya kamu bisa kelola website sendiri dengan mudah.',
        keywords: ['gaptek', 'tidak paham', 'awam', 'teknologi', 'pusing', 'bingung'],
        placement: ['home', 'smart'],
    },
    {
        id: 'trust-05',
        category: 'trust',
        question: 'Apakah website perlu maintenance rutin?',
        answer: 'Idealnya ya — seperti kendaraan, website perlu perawatan berkala supaya tetap aman, cepat, dan berjalan normal. Tapi kami tidak memaksa — paket maintenance tersedia kalau kamu butuh, mulai Rp 300.000/bulan.',
        keywords: ['maintenance', 'perlu', 'rutin', 'rawat', 'penting'],
        placement: ['smart'],
    },
    {
        id: 'trust-06',
        category: 'trust',
        question: 'Saya sudah punya website tapi tidak puas, bisa pindah ke KangJessy?',
        answer: 'Bisa. Kami melayani migrasi dan redesign website yang sudah ada. Ceritakan kondisi website kamu sekarang dan apa yang ingin diperbaiki — kami evaluasi dulu sebelum kasih rekomendasi.',
        keywords: ['pindah', 'migrasi', 'redesign', 'bosan', 'jelek', 'lama'],
        placement: ['smart'],
    },
];
