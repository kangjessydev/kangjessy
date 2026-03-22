export const dummyProjects: any[] = [
  {
    _id: 'proj-1',
    slug: { current: 'banking-app-migration' },
    title: 'Legacy Banking Core Migration',
    category: 'Full Stack',
    tags: ['Migration', 'Modernization', 'Security'],
    icon: 'ShieldCheck',
    color: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    description: 'Modernizing a monolithic banking core into a scalable microservices architecture.',
    content: 'Client menghadapi tantangan skalabilitas pada sistem lama yang menghambat peluncuran fitur baru.',
    challenge: {
      description: 'Sistem lama menggunakan teknologi EOL yang rentan terhadap security breach dan sulit di-maintain.'
    },
    steps: [
      { title: 'Audit Arsitektur', description: 'Melakukan pemetaan menyeluruh terhadap data schema lama.' },
      { title: 'Infrastruktur Cloud', description: 'Setup environment AWS dengan standar keamanan perbankan.' },
      { title: 'Migrasi Gradual', description: 'Memindahkan layanan satu per satu dengan strategi zero downtime.' }
    ],
    metrics: [
      { value: '40%', label: 'Performance Improvement', icon: 'Zap' },
      { value: '99.9%', label: 'System Uptime', icon: 'Clock' }
    ],
    impact: 'Berhasil meningkatkan efisiensi operasional IT sebesar 40% dan mengurangi technical debt secara signifikan.',
    technologies: ['Vue 3', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    date: '2025-01-15',
    client: 'Global Bank Corp',
    mainImage: null,
    gallery: []
  },
  {
    _id: 'proj-2',
    slug: { current: 'ecommerce-seo-optimization' },
    title: 'Enterprise E-Commerce Growth',
    category: 'Analytics',
    tags: ['SEO', 'Growth', 'Performance'],
    icon: 'TrendingUp',
    color: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
    description: 'Meningkatkan organik traffic dan konversi sales melalui optimasi teknis SEO.',
    content: 'Toko online client mengalami stagnasi traffic di tengah persaingan marketplace yang ketat.',
    challenge: {
      description: 'Struktur URL yang buruk dan loading speed yang lambat menyebabkan tingginya bounce rate.'
    },
    steps: [
      { title: 'Technical SEO Audit', description: 'Identifikasi isu crawlability dan core web vitals.' },
      { title: 'Content Strategy', description: 'Optimasi kata kunci strategis untuk kategori produk utama.' }
    ],
    metrics: [
      { value: '150%', label: 'Organic Traffic Lift', icon: 'Users' },
      { value: '25%', label: 'Conversion Rate', icon: 'ShoppingBag' }
    ],
    impact: 'Traffic organik tumbuh 150% dalam 6 bulan pertama, memberikan ROI positif terhadap biaya optimasi.',
    technologies: ['Next.js', 'Google Analytics', 'Search Console', 'Ahrefs'],
    date: '2024-11-20',
    client: 'FashionHub Indo',
    mainImage: null,
    gallery: []
  }
];
