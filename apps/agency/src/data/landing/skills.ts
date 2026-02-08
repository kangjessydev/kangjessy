export interface TechnicalSkill {
  category: string;
  icon: string;
  items: string;
}

export interface AdaptiveSkill {
  title: string;
  description: string;
}

export const technicalSkills: TechnicalSkill[] = [
  {
    category: "Frontend & UX Tech",
    icon: "Zap",
    items:
      "Vue.js, JavaScript (ES6+), Vite, Tailwind CSS, WordPress (Custom Theme), Elementor, Gutenberg",
  },
  {
    category: "Backend & System",
    icon: "Wrench",
    items:
      "Laravel (Breeze/Filament), PHP, MySQL, PostgreSQL (Learning), Go (Basic Fiber), Pest",
  },
  {
    category: "Automation & Infra",
    icon: "Database",
    items: "Google Apps Script, n8n, Docker (Basic), GitHub, CPanel, Vercel",
  },
];

export const adaptiveSkills: AdaptiveSkill[] = [
  {
    title: "AI-Powered Execution",
    description:
      "Mengoptimalkan AI tools untuk mempercepat proses coding dan debugging tanpa mengurangi kualitas sistem.",
  },
  {
    title: "Workflow Automation",
    description:
      "Terbiasa membangun sistem otomatis (n8n/Appscript) untuk memangkas proses bisnis yang repetitif.",
  },
  {
    title: "Fast Adaptation",
    description:
      "Cepat mengadopsi tech stack baru sesuai kebutuhan projek, seperti transisi dari MySQL ke PostgreSQL.",
  },
  {
    title: "Backend Integrity",
    description:
      "Berpengalaman membangun RESTful API (Laravel/Go) yang stabil dan terintegrasi dengan berbagai layanan.",
  },
  {
    title: "Efficient Deployment",
    description:
      "Mahir mengelola deployment melalui CPanel maupun platform modern seperti Vercel.",
  },
];
