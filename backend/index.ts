require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios');
const cors = require('cors');
const OpenAI = require("openai");

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Configure OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/generate-recipe', async (req, res) => {
    const prompt = req.body.prompt;
    console.log('prompt:', prompt);

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: 'user', content: prompt },
        ],        
        stream: true,
    });

    // for await (const chunk of response) {
    //     console.log(chunk.choices[0]?.delta?.content || "");
    // }
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content || "";
        res.write(`${content}`);
        console.log(content);
    }

    res.end();


});





// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
