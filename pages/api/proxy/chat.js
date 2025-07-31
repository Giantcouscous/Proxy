// Native fetch is already available in Vercel's Node runtime

export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;
  const baseUrl = (process.env.OPENAI_API_BASE_URL || 'https://api.openai.com').replace(/\/$/, '');

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing OPENAI_API_KEY' });
  }

  try {
    const response = await fetch(`${baseUrl}/v1/chat/completions`, { ... });
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(response.status).send(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
