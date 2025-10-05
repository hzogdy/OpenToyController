const config = require('../../configs/config');

// .env 文件中存储 API 密钥
require('dotenv').config(); // 如果在 Node.js 环境中

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // 从环境变量获取

if (!OPENAI_API_KEY) {
    throw new Error('Missing OpenAI API key');
}

async function sendMessageToGPT(userMessage) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: userMessage }
            ],
            temperature: 0.7,
            max_tokens: 150
        })
    });

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

module.exports = { sendMessageToGPT };