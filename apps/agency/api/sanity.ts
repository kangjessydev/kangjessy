import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@sanity/client';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Simple auth check - only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { action, doc, id, patch, dataset = 'production' } = req.body;
  const token = process.env.SANITY_WRITE_TOKEN;
  const projectId = process.env.VITE_SANITY_PROJECT_ID;

  if (!token || !projectId) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // NOTE: In a production environment, you should verify the user's Supabase session here
  // to ensure only authorized admins can perform write operations.
  // For now, we'll implement the basic proxy logic.

  const client = createClient({
    projectId,
    dataset,
    useCdn: false,
    apiVersion: '2024-01-14',
    token,
  });

  try {
    let result;

    switch (action) {
      case 'create':
        result = await client.create(doc);
        break;
      case 'patch':
        result = await client.patch(id).set(patch).commit();
        break;
      case 'delete':
        result = await client.delete(id);
        break;
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Sanity Proxy Error:', error);
    return res.status(500).json({ 
      error: 'Sanity operation failed',
      details: error.message 
    });
  }
}
