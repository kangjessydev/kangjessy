// --- SERVICE CATEGORIES ---
export interface ServiceCategory {
  id: string;
  label: string;
  desc?: string;
}

export const serviceCategories: ServiceCategory[] = [
  { id: "web-app", label: "Website High-Conversion", desc: "Landing Page & Company Profile" },
  { id: "business-system", label: "Sistem Manajemen Bisnis", desc: "ERP, CRM, POS, & HRIS" },
  { id: "automation", label: "Robot Otomasi Bisnis", desc: "AI Chatbot, Scraper, & Workflow" },
  { id: "saas-accelerator", label: "SaaS Accelerator", desc: "MVP Development & Platform" },
  // Tambahkan kategori baru di sini, misal:
  // { id: "creative", label: "Creative & Branding", desc: "Logo, Video, Socmed" }
];
