// server.js
import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

const OPENAI_API_KEY = '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'; // Replace with your actual OpenAI API key

app.post('/get-channel-recommendations', async (req, res) => {
    const prompt = req.body.prompt;
    
    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 150,
                temperature: 0.7,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0
            }),
        });
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while fetching recommendations.');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
