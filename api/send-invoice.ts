import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  runtime: 'edge', // Using Edge for faster cold starts if possible, but standard is safer for external requests. Let's stick to standard Node for now or verify if 'edge' supports fetch (it does).
  // Actually, let's stick to standard Node to match chat.ts pattern
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS handling for local dev or different domains
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return res.status(500).json({ error: 'Server configuration error: Missing Email API Key' });
  }

  try {
    const { order } = req.body;

    if (!order || !order.email) {
      return res.status(400).json({ error: 'Invalid order data' });
    }

    // Basic HTML Template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #7029FF; text-decoration: none; }
          .details { background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
          .total { font-size: 18px; font-weight: bold; text-align: right; padding-top: 10px; border-top: 2px solid #ddd; }
          .footer { font-size: 12px; color: #888; text-align: center; margin-top: 30px; }
          .btn { display: inline-block; padding: 10px 20px; background-color: #7029FF; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">KangJessy Ecosystem</div>
            <p>Invoice & Order Confirmation</p>
          </div>
          
          <p>Halo <strong>${order.name}</strong>,</p>
          <p>Terima kasih telah mempercayakan project digital Anda kepada kami. Berikut adalah detail pesanan Anda:</p>
          
          <div class="details">
            <p><strong>Order ID:</strong> #${order.id.slice(0, 8)}</p>
            <p><strong>Project Type:</strong> ${order.projectType}</p>
            <p><strong>Timeline:</strong> ${order.timeline}</p>
            <p><strong>Features:</strong></p>
            <ul>
              ${order.features.map((f: string) => `<li>${f}</li>`).join('') || '<li>Standard Package</li>'}
            </ul>
          </div>

          <div class="total">
            Total Estimasi: Rp ${new Intl.NumberFormat('id-ID').format(order.total)}
          </div>

          <p style="text-align: center;">
            <a href="https://wa.me/6289531105953" class="btn">Konfirmasi via WhatsApp</a>
          </p>

          <div class="footer">
            <p>Email ini dikirim otomatis oleh sistem KangJessy Ecosystem.</p>
            <p>&copy; ${new Date().getFullYear()} KangJessy Agency. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send via Resend URL
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'KangJessy <noreply@kangjessy.co>', // User needs to verify domain or use onboard
        to: [order.email], // For testing, Resend only allows sending to YOUR email unless domain verified
        subject: `[Invoice] Order #${order.id.slice(0, 8)} - ${order.projectType}`,
        html: htmlContent
      })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to send email via Resend');
    }

    return res.status(200).json({ success: true, id: data.id });

  } catch (error: any) {
    console.error('Email API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to send invoice',
      details: error.message 
    });
  }
}
