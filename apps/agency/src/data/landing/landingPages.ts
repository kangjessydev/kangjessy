export interface CTA {
  text: string;
  link: string;
  variant: 'primary' | 'secondary' | 'outline';
}

export interface SectionHero {
  headline: string;
  subheadline: string;
  badge: string;
  primaryCta: CTA;
  secondaryCta?: CTA;
  heroImage: string;
}

export interface SectionSocialProof {
  enabled: boolean;
  stats: { number: string; label: string }[];
  testimonials?: { name: string; role: string; text: string; rating: number }[];
}

export interface SectionComparison {
  enabled: boolean;
  title: string;
  subtitle: string;
  usName: string;
  usItems: string[];
  othersItems: string[];
}

export interface SectionFeatures {
  enabled: boolean;
  title: string;
  subtitle: string;
  items: { title: string; description: string }[];
}

export interface SectionCurriculum {
  enabled: boolean;
  title: string;
  subtitle: string;
  modules: { title: string; duration: string; lessons: number; topics: string[] }[];
}

export interface SectionPricing {
  enabled: boolean;
  title: string;
  subtitle: string;
  currency: string;
  plans: {
    name: string;
    price: number;
    originalPrice?: number;
    features: string[];
    cta: CTA;
    popular?: boolean;
    badge?: string;
  }[];
  moneyBack?: { enabled: boolean; text: string };
}

export interface SectionFAQ {
  enabled: boolean;
  title: string;
  items: { question: string; answer: string }[];
}

export interface SectionCTA {
  enabled: boolean;
  title: string;
  subtitle: string;
  primaryCta: CTA;
  urgency?: { enabled: boolean; text: string };
}

export interface LandingPage {
  template: number;
  slug: string;
  meta: {
    title: string;
    description: string;
    ogImage?: string;
    keywords?: string;
  };
  sections: {
    hero: SectionHero;
    socialProof?: SectionSocialProof;
    video?: { enabled: boolean; title: string; subtitle: string; thumbnail: string };
    comparison?: SectionComparison;
    features?: SectionFeatures;
    curriculum?: SectionCurriculum;
    pricing?: SectionPricing;
    faq?: SectionFAQ;
    cta?: SectionCTA;
  };
}

export const landingPages: Record<string, LandingPage> = {
  "vue-mastery-2025": {
    template: 1,
    slug: "vue-mastery-2025",
    meta: {
      title: "Fullstack Vue 3 Mastery 2025 - Build Production Ready Apps",
      description: "Kuasai Vue 3, Pinia, dan Tailwind CSS dengan membangun proyek nyata.",
      ogImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
      keywords: "vue 3, pinia, vite, frontend course, indonesia",
    },
    sections: {
      hero: {
        headline: "Jadi Frontend Expert dengan Vue 3 Mastery",
        subheadline: "Bukan sekadar tutorial dasar. Kita akan membangun aplikasi skala besar dengan best practices terbaru di tahun 2025.",
        badge: "Batch Januari 2025 Baru Dibuka!",
        primaryCta: { text: "Daftar Sekarang", link: "#pricing", variant: "primary" },
        secondaryCta: { text: "Lihat Kurikulum", link: "#curriculum", variant: "secondary" },
        heroImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
      },
      socialProof: {
        enabled: true,
        stats: [
          { number: "2.5k+", label: "Murid Aktif" },
          { number: "4.9/5", label: "Rating Kepuasan" },
          { number: "20+", label: "Proyek Portofolio" },
          { number: "80hr", label: "Total Materi" },
        ],
        testimonials: [
          { name: "Ahmad Syarif", role: "Frontend Dev @ TechCorp", text: "Materi arsitekturnya luar biasa. Sangat membantu transisi saya ke senior level.", rating: 5 },
        ],
      },
      comparison: {
        enabled: true,
        title: "Kenapa KangJessy Berbeda?",
        subtitle: "Kami tidak hanya memberikan tutorial, tapi sebuah pengalaman belajar.",
        usName: "KangJessy Mastery",
        usItems: ["Materi Project Skala Enterprise", "Code Review dari Senior Dev", "Update Materi Selamanya", "Akses Job Board Eksklusif"],
        othersItems: ["Hanya Tutorial Dasar (Hello World)", "Tidak Ada Review Koding", "Harus Bayar Lagi Untuk Update", "Hanya Video Tanpa Support"],
      },
      features: {
        enabled: true,
        title: "Kenapa Harus Ikut Kelas Ini?",
        subtitle: "Materi yang disusun secara rapi untuk membantumu bekerja lebih cepat dan efisien.",
        items: [
          { title: "Clean Architecture", description: "Belajar bagaimana mengatur struktur folder untuk aplikasi super besar agar mudah di-maintenance." },
          { title: "Performance Mastery", description: "Teknik lazy loading, code splitting, dan optimization agar web load dalam sekejap." },
        ],
      },
      pricing: {
        enabled: true,
        title: "Investasi Masa Depanmu",
        subtitle: "Pilih paket yang sesuai dengan kebutuhan belajarmu.",
        currency: "IDR",
        plans: [
          {
            name: "Self-Paced",
            price: 499000,
            originalPrice: 999000,
            features: ["Akses Video Selamanya", "Source Code Proyek", "Grup Komunitas", "Certificate"],
            cta: { text: "Beli Paket", link: "/order?package=self-paced", variant: "secondary" },
          },
          {
            name: "Mentorship",
            price: 1299000,
            originalPrice: 2499000,
            features: ["Semua Fitur Self-Paced", "Live Review Koding", "Bantuan Tugas Akhir", "Akses Eksklusif Job Board"],
            cta: { text: "Daftar Mentorship", link: "/order?package=mentorship", variant: "primary" },
            popular: true,
            badge: "Paling Diminati",
          },
        ],
      },
      cta: {
        enabled: true,
        title: "Jangan Tunda Karir Impianmu!",
        subtitle: "Harga promo berakhir dalam 48 jam kedepan. Amankan slotmu sekarang.",
        primaryCta: { text: "Ambil Diskon Sekarang", link: "#pricing", variant: "primary" },
      },
    },
  },
  "premium-web-service": {
    template: 3,
    slug: "premium-web-service",
    meta: {
      title: "Jasa Pembuatan Website Premium & Cepat - Bisnis Go Digital",
      description: "Layanan pembuatan website profesional untuk perusahaan, landing page, dan e-commerce.",
      ogImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop",
    },
    sections: {
      hero: {
        headline: "Website Mewah, Performa Cepat, Bisnis Meningkat",
        subheadline: "Kami membantu brand Anda tampil profesional dengan website yang membawa konversi.",
        badge: "Trusted by 100+ Businesses",
        primaryCta: { text: "Konsultasi Gratis", link: "/order", variant: "primary" },
        secondaryCta: { text: "Lihat Portfolio", link: "/projects", variant: "secondary" },
        heroImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
      },
      socialProof: {
        enabled: true,
        stats: [
          { number: "100+", label: "Klien Puas" },
          { number: "500+", label: "Proyek Selesai" },
          { number: "24/7", label: "Support Teknis" },
        ],
      },
      features: {
        enabled: true,
        title: "Layanan Kami",
        subtitle: "Solusi digital lengkap untuk segala jenis kebutuhan bisnis Anda.",
        items: [
          { title: "High Performance", description: "Website dioptimasi menggunakan teknologi terbaru agar skor Google PageSpeed di atas 90." },
          { title: "SEO Optimized", description: "Struktur website yang ramah Google agar bisnis Anda mudah ditemukan pelanggan." },
        ],
      },
      pricing: {
        enabled: true,
        title: "Pilihan Paket Layanan",
        subtitle: "Harga transparan tanpa biaya tersembunyi.",
        currency: "IDR",
        plans: [
          {
            name: "Landing Page",
            price: 2500000,
            features: ["1 Halaman Strategis", "Copywriting Profesional", "Integrasi WhatsApp", "Gratis Domain 1 Thn"],
            cta: { text: "Pesan Sekarang", link: "/order?service=lp", variant: "secondary" },
          },
          {
            name: "Corporate Site",
            price: 7000000,
            features: ["Hingga 10 Halaman", "Sistem Manajemen Konten", "Blog / Artikel", "Pelatihan Admin"],
            cta: { text: "Pesan Sekarang", link: "/order?service=corp", variant: "primary" },
            popular: true,
          },
        ],
      },
      cta: {
        enabled: true,
        title: "Ingin Tanya-tanya Dulu?",
        subtitle: "Hubungi tim kami untuk konsultasi gratis mengenai kebutuhan digital Anda.",
        primaryCta: { text: "Hubungi WhatsApp", link: "#whatsapp-modal", variant: "primary" },
      },
    },
  },
};

export const getLandingPage = (slug: string) => landingPages[slug] || null;
export const getAllLandingPages = () => Object.values(landingPages);
