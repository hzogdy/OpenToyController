// configs/config.js

const config = {
  openai: {
    apiKey: "your-openai-api-key", // 替换为您的 OpenAI API 密钥
    apiUrl: "https://api.openai.com/v1", // OpenAI API 的基础 URL
  },
  network: {
    timeout: 5000, // 网络请求超时时间（毫秒）
  },
  debug: true, // 是否启用调试模式
};

module.exports = config;