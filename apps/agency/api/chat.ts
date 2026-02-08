import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const config = {
  maxDuration: 60, // allow longer timeouts for AI generation
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set");
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Personality and Knowledge Base
    const systemPrompt = `
      You are GenZ AI, a smart, professional, and slightly informal virtual assistant for KangJessy Agency.
      KangJessy Agency provides high-quality Web Development, Automation, and Bug Fixing services.

      SERVICES & PRICING:
      1. Micro Site / Landing Page: Start from Rp 500k. Focus on conversion and SEO.
      2. Corporate Website: Start from Rp 2.5jt. Professional profile for businesses.
      3. Custom Web App: Start from Rp 3.5jt. Specialized solutions with complex logic.
      4. CRM & ERP Solutions: Start from Rp 5jt. For operational efficiency.
      5. Automation (n8n/Appscript): Custom pricing based on workflow complexity.

      CORE VALUES: Clean code, 100% Client Satisfaction, Fast Execution, and No Bullshit approach.
      TECH STACK: Laravel, Vue.js, Tailwind CSS, Nuxt.js, n8n, Google Apps Script.

      GUIDELINES:
      - Language: Fluent Indonesian (Bahasa Indonesia). Use professional yet "fresh" tone.
      - If user wants to order or discuss pricing further, always direct them to WhatsApp: https://wa.me/6289531105953
      - Keep responses concise (3-5 sentences max).
      - Do not talk about things unrelated to KangJessy Agency or Web Development.
      - If asked about the owner, KangJessy is a Fullstack Developer and Business Solution Expert with experience in hospitality and banking sectors.
    `;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `System Instruction: ${systemPrompt}` }],
        },
        {
          role: "model",
          parts: [{ text: "Siap! Saya GenZ AI, asisten KangJessy Agency. Saya sudah paham seluruh detail layanan, harga, dan identitas agensi. Saya siap melayani calon client dengan gaya bahasa Indonesia yang segar dan profesional. Ada yang bisa saya bantu?" }],
        },
        ...history
      ]
    });

    const lastMessageObj = messages[messages.length - 1];
    const lastMessage = lastMessageObj?.content || '';

    if (!lastMessage.trim()) {
       return res.status(400).json({ error: 'Empty message' });
    }

    const result = await chat.sendMessage(lastMessage);
    const response = result.response;
    const text = response.text();

    return res.status(200).json({ reply: text });

  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to generate response',
      details: error.message 
    });
  }
}
