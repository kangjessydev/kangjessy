export interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
}

export const experienceData: Experience[] = [
  {
    year: "2023 - Present",
    role: "IT Support Specialist",
    company: "PT Nur Alam & BPR Usaha Rakyat",
    description: "Mengelola infrastruktur jaringan dan sistem perbankan. Memastikan ketersediaan layanan IT 99.9% dan memberikan solusi teknis cepat untuk operasional harian."
  },
  {
    year: "2022 - 2023",
    role: "Lead Web Developer",
    company: "Creative Digital Studio",
    description: "Memimpin pengembangan landing page dan web app untuk 10+ klien lokal. Mengoptimalkan kecepatan load sebesar 40% menggunakan teknologi Nuxt.js dan Tailwind CSS."
  },
  {
    year: "2020 - 2022",
    role: "Freelance Fullstack Developer",
    company: "Project-based Development",
    description: "Membangun berbagai solusi digital mulai dari sistem E-Commerce hingga integrasi pembayaran pihak ketiga (Stripe/Midtrans) untuk bisnis skala kecil dan menengah."
  },
  {
    year: "2019 - 2020",
    role: "Junior Mobile Developer",
    company: "Tech Start-up Jakarta",
    description: "Berkontribusi dalam pengembangan aplikasi mobile berbasis React Native. Fokus pada implementasi UI/UX yang responsif dan integrasi API Firebase."
  },
  {
    year: "2018 - 2019",
    role: "IT Intern",
    company: "Solution Media Corp",
    description: "Membantu dalam maintenance database perusahaan dan melakukan pengujian (manual testing) pada aplikasi web sebelum tahap deployment."
  }
];
