import { projectTypes } from "../../../agency/src/data/landing/order";
import type { Client } from "../types";
import type { Proposal } from "../services/proposalService";

// Mock Orders (as Client[])
export const mockOrders: Client[] = [
  {
    id: "ord-1",
    name: "Hijiru Admin",
    email: "admin@hijiru.com",
    company: "Hijiru Indonesia",
    status: "Deal",
    project_type: projectTypes.find(t => t.id === 'conversion-landing-page')?.name || "Conversion Landing Page",
    project_name: "Web Re-Design & SEO Hijiru",
    total_amount: 3500000,
    paid_amount: 3500000,
    payment_status: "paid",
    project_status: "Done",
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    source: "web_order",
    type: "project_order"
  },
  {
    id: "ord-2",
    name: "BPR Seroja",
    email: "contact@bprseroja.id",
    company: "Bank Usaha Rakyat (BPR)",
    status: "Deal",
    project_type: projectTypes.find(t => t.id === 'modern-corporate-profile')?.name || "Modern Corporate Profile",
    project_name: "Mobile Banking Landing Page",
    total_amount: 15000000,
    paid_amount: 7500000,
    payment_status: "down_payment",
    project_status: "Developing",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    source: "manual",
    type: "project_order"
  },
  {
    id: "ord-3",
    name: "Nur Alam Team",
    email: "it@nuralamhotel.com",
    company: "Nur Alam Hotel Lembang",
    status: "Deal",
    project_type: projectTypes.find(t => t.id === 'maintenance-starter')?.name || "Starter Pack",
    project_name: "Security Hardening Q1",
    total_amount: 5000000,
    paid_amount: 0,
    payment_status: "unpaid",
    project_status: "Planning",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    source: "whatsapp",
    type: "project_order"
  }
];

// Mock Proposals (as Proposal[])
export const mockProposals: Proposal[] = [
  {
    id: "prop-1",
    client_name: "Syarief Hasan",
    company: "Public Figure",
    project_name: "The Authority Hub",
    project_type: projectTypes.find(t => t.id === 'authority-personal-brand')?.name || "Personal Brand",
    status: "approved",
    origin_type: "from_lead",
    final_total: 12500000,
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "prop-2",
    client_name: "Bogaraya Group",
    company: "Bogaraya Lembang",
    project_name: "Digital Catalog System",
    project_type: projectTypes.find(t => t.id === 'digital-catalog')?.name || "Digital Catalog",
    status: "negotiation",
    origin_type: "independent",
    final_total: 25000000,
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Mock Leads
export const mockLeads: Client[] = [
  {
    id: "lead-1",
    name: "Dr. Gunawan",
    email: "gunawan@clinic.id",
    company: "Klinik Utama Sehat",
    status: "New",
    project_type: "Local Business Maps",
    notes: "Ingin buat web untuk klinik yang SEO friendly.",
    created_at: new Date().toISOString(),
    source: "web_contact",
    type: "general_inquiry"
  }
];
