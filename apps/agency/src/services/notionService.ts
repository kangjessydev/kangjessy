export const notionService = {
  async getProjectByTrackingId(trackingId: string) {
    const response = await fetch('/api/notion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'getProject',
        payload: { trackingId }
      })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Gagal mengambil data proyek');
    }

    return await response.json();
  },

  async createProject(data: {
    name: string;
    clientName: string;
    email: string;
    whatsapp: string;
    budget: number;
    type?: string;
    source?: string;
  }) {
    const response = await fetch('/api/notion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'createProject',
        payload: data
      })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Gagal membuat proyek di Notion');
    }

    return await response.json();
  }
};
