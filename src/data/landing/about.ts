export interface IntroData {
  badge: string;
  title: string;
  description: string;
  journey: string[];
}

export interface QuickFact {
  icon: string;
  label: string;
  text: string;
}

export const introData: IntroData = {
  badge: "Professional Profile",
  title:
    "Bridging Business Logic with <br /><span class='gradient-text'>High-Performance Automation.</span>",
  description:
    "Berasal dari latar belakang Teknik Informatika dengan pengalaman nyata menangani sistem operasional di sektor perhotelan dan keuangan. Berfokus pada pengembangan solusi digital yang efisien, otomatis, dan memberikan dampak langsung pada pertumbuhan bisnis.",
  journey: [
    "Semuanya dimulai sekitar tahun 2012 saat tren blogging meledak. Saya mulai mengulik template XML Blogger, yang menjadi pintu masuk saya ke dunia pemrograman. Rasa penasaran itu berlanjut hingga ke bangku kuliah Teknik Informatika, di mana saya mendalami arsitektur sistem dan berbagai bahasa pemrograman mulai dari C++ hingga Java.",
    "Titik balik profesional saya terjadi saat bergabung dengan platform <strong>BuildWithAngga</strong>, yang membantu saya menyelaraskan skill dengan standar industri modern. Pengalaman ini membawa saya dipercaya mengelola infrastruktur IT di <strong>Nur Alam Hotel</strong> dan <strong>BPR Usaha Rakyat</strong>, di mana saya bertanggung jawab atas sistem manajemen hingga monitoring sales.",
    "Kini, saya berfokus menggabungkan kekuatan <strong>Laravel/Vue.js</strong> dengan <strong>Workflow Automation (n8n/Appscript)</strong> untuk membantu bisnis bertransformasi secara digital dengan lebih cerdas dan otomatis.",
  ],
};

export const quickFacts: QuickFact[] = [
  {
    icon: "Rocket",
    label: "Early Starter",
    text: "Ngulik kode dari era modifikasi XML Blogger (2012).",
  },
  {
    icon: "Building2",
    label: "Industry Proven",
    text: "Berpengalaman nanganin sistem IT di sektor perhotelan & perbankan (BPR).",
  },
  {
    icon: "Zap",
    label: "Automation Mindset",
    text: "Ahli dalam mengubah proses manual jadi workflow otomatis.",
  },
  {
    icon: "GraduationCap",
    label: "Growth Focused",
    text: "Terus mengasah standar industri melalui BuildWithAngga & pengalaman internship.",
  },
];
