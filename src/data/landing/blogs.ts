export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  fileName: string;
  readTime: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "tren-desain-web-2026",
    title: "Tren Desain Web 2026: Kenapa Minimalis Justru Lebih Menghasilkan?",
    excerpt: "Di tahun 2026, tren desain web bukan lagi soal siapa yang paling ramai, tapi sesiapa yang paling jelas. Kenapa minimalis justru jadi senjata maut?",
    date: "7 April 2026",
    author: "KangJessy",
    category: "Design & Branding",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
    fileName: "tren-desain-web-2026.md",
    readTime: "4 min read",
    tags: ["Design", "Minimalism", "Trends 2026"],
  },
  {
    id: 2,
    slug: "website-lemot-bikin-pelanggan-kabur",
    title: "Website Lemot Bikin Pelanggan Kabur? Ini Fakta Pahit yang Harus Anda Tahu!",
    excerpt: "Di dunia digital yang instan, kecepatan bukan lagi pilihan. Google pun lebih suka merekomendasikan website yang ngebut.",
    date: "7 April 2026",
    author: "KangJessy",
    category: "Web Performance",
    image: "/blog/speed-infographic.png",
    fileName: "website-lemot-bikin-pelanggan-kabur.md",
    readTime: "4 min read",
    tags: ["Speed", "Optimization", "Google Rankings"],
  },
  {
    id: 3,
    slug: "bye-bye-excel-berantakan",
    title: "Bye-bye Excel Berantakan! Cara Admin Dashboard Mengubah Bisnis Anda",
    excerpt: "Mengandalkan Excel manual saat bisnis berkembang rasanya seperti menguras air laut dengan sendok. Inilah saatnya Admin Dashboard jadi pahlawan.",
    date: "7 April 2026",
    author: "KangJessy",
    category: "Efisiensi Operasional",
    image: "/blog/excel-vs-dashboard.png",
    fileName: "bye-bye-excel-berantakan.md",
    readTime: "4 min read",
    tags: ["Operations", "Admin Dashboard", "Efficiency"],
  },
  {
    id: 4,
    slug: "jualan-di-marketplace-saja-cukup",
    title: "Jualan di Marketplace Saja Cukup? Ini Alasan Bisnis Anda Perlu Rumah Digital Sendiri",
    excerpt: "Berjualan di marketplace memang praktis. Tapi, pernahkah Anda khawatir jika akun kena suspend? Inilah alasan kenapa website sendiri adalah kunci.",
    date: "7 April 2026",
    author: "KangJessy",
    category: "Digital Strategy",
    image: "/blog/rumah-digital-sendiri.png",
    fileName: "jualan-di-marketplace-saja-cukup.md",
    readTime: "4 min read",
    tags: ["Business", "Marketplace", "Digital Home"],
  },
  {
    id: 5,
    slug: "punya-website-tapi-sepi-pembeli",
    title: "Punya Website Tapi Sepi Pembeli? Mungkin Ini yang Salah!",
    excerpt: "Rasanya kayak punya toko di tengah hutan? Ada, tapi nggak ada yang datang. Banyak UMKM terjebak pemikiran: Yang penting punya website dulu.",
    date: "7 April 2026",
    author: "KangJessy",
    category: "Web Tips",
    image: "/blog/punya-website-tapi-sepi-pembeli.png",
    fileName: "punya-website-tapi-sepi-pembeli.md",
    readTime: "4 min read",
    tags: ["Business", "Sales Conversion", "UMKM"],
  },
];

export const getBlogPost = (slug: string) => {
  return blogPosts.find((post) => post.slug === slug);
};
