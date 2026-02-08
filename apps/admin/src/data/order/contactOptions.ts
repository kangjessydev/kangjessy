import { projectTypes } from './projects';
import { styleOptions } from './options';

/**
 * Contact Form Options - Sync dengan Order Form
 * Ambil 2 project type per kategori untuk contact form
 */

// Service Options untuk Contact Form (ambil 2 per kategori)
export const contactServices = [
  // The Core (2)
  {
    value: "The Foundation (Web)",
    label: "The Foundation (Web)",
    category: "The Core"
  },
  {
    value: "The Foundation (System)",
    label: "The Foundation (System)",
    category: "The Core"
  },
  
  // Web High-Conv (2)
  {
    value: "Starter Landing Page",
    label: "Starter Landing Page",
    category: "Web High-Conv"
  },
  {
    value: "Premium Company Profile",
    label: "Premium Company Profile",
    category: "Web High-Conv"
  },
  
  // Business System (2)
  {
    value: "Custom CRM System",
    label: "Custom CRM System",
    category: "Business System"
  },
  {
    value: "LMS Academy",
    label: "LMS Academy",
    category: "Business System"
  },
  
  // Robotic Automation (2)
  {
    value: "Intelligent Chatbot AI",
    label: "Intelligent Chatbot AI",
    category: "Robotic Automation"
  },
  {
    value: "Workflow Automation",
    label: "Workflow Automation",
    category: "Robotic Automation"
  },
  
  // Opsi generik
  {
    value: "Belum Tahu / Custom",
    label: "Belum Tahu / Custom Request",
    category: "Other"
  }
];

// Budget Options untuk Contact Form
export const contactBudgetOptions = [
  { label: "< Rp 5 Juta", value: "< 5jt", rangeStart: 0, rangeEnd: 5000000 },
  { label: "Rp 5 - 10 Juta", value: "5-10jt", rangeStart: 5000000, rangeEnd: 10000000 },
  { label: "Rp 10 - 20 Juta", value: "10-20jt", rangeStart: 10000000, rangeEnd: 20000000 },
  { label: "Rp 20 - 50 Juta", value: "20-50jt", rangeStart: 20000000, rangeEnd: 50000000 },
  { label: "> Rp 50 Juta", value: "> 50jt", rangeStart: 50000000, rangeEnd: 999000000 },
  { label: "Belum Tahu / Fleksibel", value: "flexible", rangeStart: 0, rangeEnd: 0 }
];

// Visual Style Options untuk Contact Form (dari styleOptions dipermak for contact)
export const contactStyleOptions = styleOptions.map(style => ({
  value: style.id,
  label: style.name,
  desc: style.desc
}));

// Helper function: Get project type basePrice by name
export function getProjectTypeByName(name: string) {
  return projectTypes.find(p => p.name === name);
}

// Helper function: Get style by id
export function getStyleById(id: string) {
  return styleOptions.find(s => s.id === id);
}

// Helper function: Convert budget range string to numeric value
export function getBudgetNumericValue(rangeStr: string): number {
  const ranges: Record<string, number> = {
    "< 5jt": 2500000,      // Midpoint of 0-5jt
    "5-10jt": 7500000,     // Midpoint of 5-10jt
    "10-20jt": 15000000,   // Midpoint of 10-20jt
    "20-50jt": 35000000,   // Midpoint of 20-50jt
    "> 50jt": 50000000,    // Minimum value of >50jt
    "flexible": 0          // Unknown/flexible
  };
  return ranges[rangeStr] || 0;
}
