export const blogPosts = [
  {
    id: 1,
    slug: "masa-depan-web-development-2025",
    title:
      "Masa Depan Web Development di Tahun 2025: Tren yang Harus Anda Pantau",
    excerpt:
      "Dunia web development berubah dengan sangat cepat. Dari AI hingga framework baru, inilah yang perlu Anda siapkan untuk tetap kompetitif.",
    date: "9 Januari 2026",
    author: "KangJessy",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    fileName: "masa-depan-web-development-2025.md",
    readTime: "5 min read",
    tags: ["Web Dev", "AI", "2025 Trends"],
    content: "# Masa Depan Web Development 2025\n\nAI, Web Assembly, dan Framework yang semakin canggih..." // Placeholder content for now as markdown files are missing
  },
  {
    id: 2,
    slug: "mengapa-bisnis-kecil-butuh-landing-page",
    title:
      "Mengapa Bisnis Kecil Butuh Landing Page untuk Meningkatkan Penjualan",
    excerpt:
      "Mempunyai website saja tidak cukup. Pelajari bagaimana landing page yang tepat bisa mengubah pengunjung menjadi pembeli setia.",
    date: "8 Januari 2026",
    author: "KangJessy",
    category: "Marketing",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    fileName: "mengapa-bisnis-kecil-butuh-landing-page.md",
    readTime: "4 min read",
    tags: ["Marketing", "Landing Page", "Small Business"],
    content: "# Mengapa Bisnis Kecil Butuh Landing Page\n\nKonversi yang lebih tinggi..."
  },
];

export const getBlogPost = (slug: string) => {
  return blogPosts.find((post: any) => post.slug === slug);
};
