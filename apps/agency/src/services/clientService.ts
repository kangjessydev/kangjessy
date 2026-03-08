export interface Client {
  id?: string
  name: string
  email: string
  phone?: string
  company?: string
  status: string
  type?: 'project_order' | 'general_inquiry' | 'proposal'
  project_type?: string
  project_name?: string
  budget?: number
  source?: string
  brief?: string
  notes?: string
  ref_link?: string
  visual_style?: string
  timeline?: string
  dream_domain?: string
  features?: string[] | any
  voucher?: string
  created_at?: string
}

// =====================================================
//  GANTI INI dengan URL Deploy GAS Web App Anda!
//  Cara: Apps Script → Deploy → Manage Deployments
//        → copy URL dari deployment aktif
// =====================================================
const GAS_WEBAPP_URL = import.meta.env.VITE_GAS_WEBHOOK_URL || '';

export const clientService = {
  async addLead(clientData: Partial<Client>): Promise<Client> {
    const payload: Client = {
      id: 'lead-' + Date.now(),
      name: clientData.name || 'Unknown',
      email: clientData.email
        || (clientData.phone
          ? `wa-${clientData.phone.replace(/[^0-9]/g, '')}@client.kangjessy.com`
          : `guest-${Date.now()}@client.kangjessy.com`),
      phone: clientData.phone || '-',
      company: clientData.company || '-',
      status: clientData.status || 'New',
      notes: clientData.timeline
        ? `[Timeline: ${clientData.timeline}]\n\n${clientData.notes || '-'}`
        : (clientData.notes || '-'),
      type: clientData.type || 'project_order',
      brief: clientData.brief || '-',
      project_type: clientData.project_type || '-',
      project_name: clientData.project_name || '-',
      budget: clientData.budget || 0,
      source: clientData.source || 'web_contact',
      ref_link: clientData.ref_link || '-',
      visual_style: clientData.visual_style || '-',
      timeline: clientData.timeline || '-',
      dream_domain: clientData.dream_domain || '-',
      features: clientData.features || [],
      voucher: clientData.voucher,
      created_at: new Date().toISOString()
    };

    // Kirim ke Google Sheet lewat GAS WebApp
    if (GAS_WEBAPP_URL) {
      try {
        await fetch(GAS_WEBAPP_URL, {
          method: 'POST',
          // GAS butuh mode no-cors karena tidak support CORS header
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        console.log('[clientService] ✅ Data sent to Google Sheet.');
      } catch (err) {
        // Jangan crash form jika GAS tidak bisa dijangkau
        console.warn('[clientService] ⚠ GAS webhook failed (non-critical):', err);
      }
    } else {
      console.warn('[clientService] ⚠ VITE_GAS_WEBHOOK_URL not set. Data NOT sent to Google Sheet. Add it to .env file.');
    }

    return payload;
  },

  async getById(id: string): Promise<Client> {
    // GAS one-way write only — kembalikan mock untuk kompatibilitas portal
    return {
      id,
      name: 'Client',
      email: '-',
      status: 'New',
    };
  },

  async getClientById(id: string): Promise<Client> {
    return this.getById(id);
  }
};
