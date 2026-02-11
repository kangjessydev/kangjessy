import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS handling
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

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set");
    return res.status(500).json({ error: 'Server configuration error: Gemini API Key missing' });
  }

  try {
    const { lead } = req.body;

    if (!lead) {
      return res.status(400).json({ error: 'Missing lead data' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const prompt = `
      You are a Sales Intelligence AI for KangJessy Agency. 
      Analyze the following lead data and provide a score and reasoning.
      
      LEAD DATA:
      - Name: ${lead.name}
      - Email: ${lead.email}
      - Company: ${lead.company || 'N/A'}
      - Project Type: ${lead.project_type || lead.type}
      - Budget: ${lead.budget || 'Negotiable'}
      - Brief: ${lead.brief || lead.notes || 'No brief provided'}

      SCORING CRITERIA:
      1. Clarity of Brief (0-40): How well-defined is the requirement?
      2. Budget Alignment (0-30): Does the budget match the project type? (Minimums: Web Rp 2.5jt, Sys Rp 5jt, Landing Page Rp 500k)
      3. Contact Credibility (0-20): Professional email? Company name?
      4. Conversion Probability (0-10): Likelihood of closing based on tone and urgency.

      OUTPUT FORMAT (JSON):
      {
        "score": number (0-100),
        "label": "HOT" | "WARM" | "COLD",
        "analysis": "Short summary of why this score was given",
        "action_item": "Suggested next step for the admin"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json(JSON.parse(text));
  } catch (error: any) {
    console.error("AI Lead Scoring Error:", error);
    return res.status(500).json({ error: 'AI Processing Failed', details: error.message });
  }
}
