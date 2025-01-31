import express from 'express';
import DeepSeek from 'deepseek';
const router = express.Router();

const deepseek = new DeepSeek(process.env.DEEPSEEK_API_KEY);

router.post('/legal-ask', async (req, res) => {
  const { country, question } = req.body;
  
  if (!country || !question) {
    return res.status(400).json({ error: 'Country and question are required' });
  }

  const systemPrompt = `
    You are a senior legal expert with comprehensive knowledge of international law. 
    Your responses must:
    1. Focus specifically on ${country}'s legal system
    2. Cite relevant laws and precedents where applicable
    3. Explain procedures in ${country}'s judicial process
    4. Highlight any regional legal peculiarities
    5. Provide practical next steps within ${country}'s jurisdiction
    
    If you lack information about ${country}, state this clearly and recommend consulting 
    a licensed attorney in that jurisdiction. Never guess about legal matters.
  `;

  try {
    const response = await deepseek.chat.completions.create({
      model: "deepseek-r1",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question }
      ],
      temperature: 0.3,
      max_tokens: 1000
    });

    res.json({ answer: response.choices[0].message.content });
  } catch (error) {
    console.error('Legal API Error:', error);
    res.status(500).json({ error: 'Error processing legal request' });
  }
}); 