import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  maxDuration: 30,
};

const TOKEN = process.env.NOTION_TOKEN;
const PROJECTS_DB_ID = process.env.NOTION_PROJECTS_DB_ID;
const MILESTONES_DB_ID = process.env.NOTION_MILESTONES_DB_ID;

const headers = {
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28',
};

async function notionReq(method: string, endpoint: string, body?: any) {
  const res = await fetch(`https://api.notion.com/v1${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`${data.code || 'error'}: ${data.message || 'Unknown error'}`);
  }
  return data;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Simple CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { action, payload } = req.body;

  if (!TOKEN || !PROJECTS_DB_ID) {
    return res.status(500).json({ error: 'Notion configuration missing on server' });
  }

  try {
    if (action === 'getProject') {
      const { trackingId } = payload;

      // Query Projects DB
      const projects = await notionReq('POST', `/databases/${PROJECTS_DB_ID}/query`, {
        filter: {
          or: [
            {
              property: 'Tracking ID',
              rich_text: { equals: trackingId }
            },
            {
              property: 'No. WA Klien',
              phone_number: { equals: trackingId }
            }
          ]
        },
        page_size: 1
      });

      if (!projects.results || projects.results.length === 0) {
        return res.status(404).json({ error: 'Proyek tidak ditemukan' });
      }

      const projectPage = projects.results[0];
      const props = projectPage.properties;

      // Map properties
      const projectData = {
        id: projectPage.id,
        trackingId: props['Tracking ID']?.rich_text?.[0]?.plain_text || '',
        projectName: props['Nama Proyek']?.title?.[0]?.plain_text || 'Project',
        clientName: props['Klien']?.rich_text?.[0]?.plain_text || 'Client',
        email: props['Email Klien']?.email || '',
        whatsapp: props['No. WA Klien']?.phone_number || '',
        status: props['Status']?.select?.name?.toLowerCase().replace(' ', '_') || 'pending',
        progress: 0, // Calculated later from milestones if needed, or static
        price: props['Budget (Rp)']?.number || 0,
        paidAmount: (props['DP (Rp)']?.number || 0) + (props['Lunas (Rp)']?.number || 0),
        paymentStatus: 'pending',
        startDate: props['Tanggal Mulai']?.date?.start || '-',
        deadline: props['Deadline']?.date?.start || '-',
        links: {
            preview: props['Live URL']?.url || '',
            figma: '', // Could be added to Notion later
            drive: '',
            github: ''
        },
        timeline: [] as any[]
      };

      // Determine simple payment status
      if (projectData.paidAmount >= projectData.price && projectData.price > 0) {
          projectData.paymentStatus = 'paid';
      } else if (projectData.paidAmount > 0) {
          projectData.paymentStatus = 'partial';
      }

      // Fetch Milestones
      if (MILESTONES_DB_ID) {
        const milestones = await notionReq('POST', `/databases/${MILESTONES_DB_ID}/query`, {
          filter: {
            property: 'Proyek',
            relation: { contains: projectPage.id }
          },
          sorts: [
            { property: 'Urutan', direction: 'ascending' }
          ]
        });

        const total = milestones.results.length;
        let completed = 0;

        projectData.timeline = milestones.results.map((m: any) => {
          const mProps = m.properties;
          const mStatus = mProps['Status']?.select?.name || 'Belum Mulai';
          const isDone = mStatus === 'Selesai';
          if (isDone) completed++;

          return {
            title: mProps['Nama Milestone']?.title?.[0]?.plain_text || 'Milestone',
            status: isDone ? 'done' : (mStatus === 'Sedang Dikerjakan' ? 'in_progress' : 'pending'),
            isParent: true, // For UI compatibility
            icon: isDone ? 'CheckCircle2' : 'Clock'
          };
        });

        // Auto-calculate progress
        if (total > 0) {
            projectData.progress = Math.round((completed / total) * 100);
        }
      }

      return res.status(200).json(projectData);
    }

    if (action === 'createProject') {
      const { name, clientName, email, whatsapp, budget, type, source } = payload;
      
      const trackingId = `KJ-${Math.floor(1000 + Math.random() * 9000)}`;

      const newProject = await notionReq('POST', '/pages', {
        parent: { database_id: PROJECTS_DB_ID },
        properties: {
          'Nama Proyek': { title: [{ text: { content: name } }] },
          'Klien': { rich_text: [{ text: { content: clientName } }] },
          'Email Klien': { email: email },
          'No. WA Klien': { phone_number: whatsapp },
          'Budget (Rp)': { number: budget },
          'Tipe Proyek': { select: { name: type || 'Lainnya' } },
          'Source': { select: { name: source || 'Order Form' } },
          'Status': { select: { name: 'New Lead' } },
          'Tracking ID': { rich_text: [{ text: { content: trackingId } }] },
          'Tanggal Mulai': { date: { start: new Date().toISOString().split('T')[0] } }
        }
      });

      return res.status(200).json({ 
        success: true, 
        projectId: newProject.id, 
        trackingId 
      });
    }

    return res.status(400).json({ error: 'Invalid action' });

  } catch (error: any) {
    console.error('Notion Handler Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
