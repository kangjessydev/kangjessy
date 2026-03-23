import { 
    type Component,
    markRaw
} from 'vue';
import { 
    Stethoscope, 
    Home, 
    BookOpen, 
    Clock, 
    Shield, 
    Zap, 
    Users, 
    Layout, 
    TrendingUp, 
    Star, 
    Activity, 
    Target, 
    Award, 
    List, 
    Heart, 
    Briefcase
} from 'lucide-vue-next';

export interface Feature {
    title: string;
    desc: string;
    icon: Component;
    image?: string;
}

export interface Benefit {
    title: string;
    desc: string;
    icon: Component;
    metric?: string;
}

export interface Industry {
    slug: string;
    name: string;
    description: string;
    longDescription: string;
    icon: Component;
    themeColor: string;
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    heroVideoUrl?: string;
    businessInsight: {
        problem: string;
        solution: string;
        highlight: string;
    };
    coreModules: Feature[];
    roiBenefits: Benefit[];
    waMessage: string;
}

export const industryData: Record<string, Industry> = {
    'dental': {
        slug: 'dental',
        name: 'Dental & Health',
        description: 'Sistem digital untuk klinik gigi yang meningkatkan efisiensi dan kepercayaan pasien.',
        longDescription: 'Klinik gigi modern membutuhkan lebih dari sekadar website. Anda membutuhkan ekosistem yang mengelola journey pasien dari booking online hingga rekam medis digital yang presisi.',
        icon: markRaw(Stethoscope),
        themeColor: '#3b82f6',
        badge: 'Medical Excellence',
        heroTitle: 'Ciptakan Pengalaman Pasien Kelas Dunia',
        heroSubtitle: 'Sistem elegas yang mengurangi beban administrasi dan membangun otoritas medis klinik Anda.',
        heroImage: '/images/industries/dental.png',
        heroVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        businessInsight: {
            problem: 'Banyak klinik kehilangan 30% calon pasien karena proses booking manual yang lambat dan rekam medis yang masih tercecer di kertas.',
            solution: 'Sebuah ekosistem digital terpadu yang menyatukan reservasi otomatis, rekam medis visual, dan sistem pengingat untuk memastikan flow pasien yang lancar.',
            highlight: 'Sistem ini mereduksi waktu manajemen jadwal hingga 40%, memberikan staff Anda lebih banyak waktu untuk melayani pasien.'
        },
        coreModules: [
            { 
                title: 'Smart Booking System', 
                desc: 'Otomasi jadwal yang sinkron dengan jam kerja dokter. Mengurangi no-show rat-rate pasien.', 
                icon: markRaw(Clock) 
            },
            { 
                title: 'Interactive Tooth Map', 
                desc: 'Alur diagnosa visual yang memudahkan pasien mengerti pentingnya tindakan medis yang disarankan.', 
                icon: markRaw(Activity) 
            },
            { 
                title: 'Digitalized Invoices', 
                desc: 'Manajemen kasir dan nota otomatis yang profesional dan transparan bagi pasien.', 
                icon: markRaw(Shield) 
            }
        ],
        roiBenefits: [
            { title: 'Pasien Reservasi', desc: 'Sistem online yang mudah menaikkan minat booking hingga 2x lipat.', icon: markRaw(TrendingUp), metric: '+40%' },
            { title: 'Operasional Staff', desc: 'Otomasi mengurangi beban front-office secara signifikan.', icon: markRaw(Clock), metric: '15 Jam/Minggu' },
            { title: 'Kesan Eksklusif', desc: 'Pasien merasa berada di klinik modern yang sangat terorganisir.', icon: markRaw(Heart), metric: 'Premium' }
        ],
        waMessage: 'Halo Kang Jessy, saya ingin konsultasi sistem digital untuk klinik dental saya.'
    },
    'architect': {
        slug: 'architect',
        name: 'Architecture & Design',
        description: 'Portfolio digital high-end yang merepresentasikan kualitas estetika firma arsitektur Anda.',
        longDescription: 'Bagi arsitek, visual adalah segalanya. Kami membangun platform yang tidak hanya memamerkan estetika desain, tapi juga menjelaskan proses teknis di balik setiap rancangan.',
        icon: markRaw(Home),
        themeColor: '#10b981',
        badge: 'Structural Aesthetics',
        heroTitle: 'Presentasikan Visi Anda, Bukan Sekadar Gambar',
        heroSubtitle: 'Platform pamer karya prestisius untuk menggaet klien korporat dan proyek bernilai tinggi.',
        heroImage: '/images/industries/architect.png',
        heroVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        businessInsight: {
            problem: 'Klien seringkali kesulitan memberikan kepercayaan pada proyek besar jika portfolio arsitek terlihat biasa dan tidak mencerminkan detail teknis.',
            solution: 'Showcase interaktif bento-style yang menyoroti filosofi desain, material, dan progress proyek dalam satu antarmuka mewah.',
            highlight: 'Tampilan ini menaikkan wibawa firma Anda di mata klien korporat hingga 300%.'
        },
        coreModules: [
            { 
                title: 'Immersive Portfolio', 
                desc: 'Tampilkan karya 4K dengan naratif desain yang mendalam dan tajam.', 
                icon: markRaw(Layout) 
            },
            { 
                title: 'Project Timeline', 
                desc: 'Update berkala perkembangan proyek yang bisa diakses klien secara khusus.', 
                icon: markRaw(Clock) 
            },
            { 
                title: 'Collaboration Area', 
                desc: 'Ruang digital untuk bertukar aset desain berukuran besar dengan klien.', 
                icon: markRaw(Briefcase) 
            }
        ],
        roiBenefits: [
            { title: 'Kualitas Calon Klien', desc: 'Website mewah secara alami menyaring klien yang menghargai kualitas.', icon: markRaw(Target), metric: 'High-Tier' },
            { title: 'Nilai Jual Jasa', desc: 'Menaikkan prestise firma Anda di atas kompetitor yang menggunakan template.', icon: markRaw(Star), metric: 'Top 10%' },
            { title: 'Otomasi Lead', desc: 'Website bekerja 24 jam meyakinkan klien sebelum mereka menghubungi Anda.', icon: markRaw(Zap), metric: 'Efektif' }
        ],
        waMessage: 'Halo Kang Jessy, saya ingin membangun portfolio arsitektur premium.'
    },
    'single-lms': {
        slug: 'single-lms',
        name: 'Single LMS / Education',
        description: 'Platform edukasi berbasis mentor tunggal untuk monetisasi keahlian tanpa tergantung platform pihak ketiga.',
        longDescription: 'Jika Anda adalah mentor atau edukator, memiliki platform sendiri memberikan kendali penuh atas data murid, sistem pembayaran, dan pengalaman belajar yang eksklusif.',
        icon: markRaw(BookOpen),
        themeColor: '#f59e0b',
        badge: 'Individual Mastery',
        heroTitle: 'Ubah Keahlian Anda Menjadi Aset Autopilot',
        heroSubtitle: 'Miliki kendali penuh atas murid, keuntungan, dan brand Anda sendiri tanpa biaya admin marketplace.',
        heroImage: '/images/industries/lms.png',
        heroVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        businessInsight: {
            problem: 'Menitipkan materi di marketplace membuat Anda kehilangan profit besar dan data murid Anda sendiri diambil pihak ketiga.',
            solution: 'Sistem LMS mandiri yang memungkinkan Anda jualan, mengajar, dan memanajemen murid dalam satu dashboard eksklusif berkendali penuh.',
            highlight: 'LMS pribadi memberikan profit 100% tanpa potongan admin dari platform publik.'
        },
        coreModules: [
            { 
                title: 'Course Ecosystem', 
                desc: 'Kurikulum terstruktur yang menjaga murid tetap engaged hingga materi selesai.', 
                icon: markRaw(List) 
            },
            { 
                title: 'Seamless Payments', desc: 'Integrasi gerbang pembayaran otomatis yang membuka akses kursus seketika.', 
                icon: markRaw(Zap) 
            },
            { 
                title: 'Student Analytics', desc: 'Pantau perkembangan murid dan buat kuis otomatis untuk sertifikasi.', 
                icon: markRaw(Users) 
            }
        ],
        roiBenefits: [
            { title: 'Profit Tanpa Potongan', desc: 'Tidak ada bagi hasil dengan platform. Semua profit masuk ke Anda.', icon: markRaw(TrendingUp), metric: '100% Net' },
            { title: 'Passive Income', desc: 'Sistem mengelola pendaftaran dan akses murid secara otomatis 24/7.', icon: markRaw(Zap), metric: 'Autopilot' },
            { title: 'Otoritas Mentor', desc: 'Brand Anda terlihat jauh lebih kuat dengan platform belajar mandiri.', icon: markRaw(Award), metric: 'Expert' }
        ],
        waMessage: 'Halo Kang Jessy, saya ingin punya platform kursus online mandiri.'
    }
}
