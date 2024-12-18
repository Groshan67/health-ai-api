import { callOpenAIDynamic } from '../services/chatService.js';
import logger  from '../utils/logger.js';

export const openAIHandler = async (req, res) => {
  const apiKey = req.headers['x-api-key'];  // دریافت API Key از هدر
  const {
    baseUrl = 'https://api.openai.com', // آدرس پایه
    version = 'v1',                     // نسخه داینامیک مانند v1، o1 و غیره
    endpoint = 'chat/completions',      // مسیر پیش‌فرض برای چت
    model,                              // مدل داینامیک مانند gpt-4، davinci
    messages
  } = req.body;                         // داده‌های بدنه درخواست

  try {
    // اعتبارسنجی ورودی‌ها
    if (!apiKey) {
      return res.status(401).json({ error: 'API Key is required in header (x-api-key)' });
    }
    if (!model || !messages) {
      return res.status(400).json({ error: 'Model and messages are required in the body' });
    }

    // لاگ ورودی‌ها
    logger.info(`Request: Model=${model}, Messages=${JSON.stringify(messages)}`);(`Request: BaseURL=${baseUrl}, Version=${version}, Endpoint=${endpoint}, Model=${model}, Messages=${JSON.stringify(messages)}`);

    // فراخوانی سرویس OpenAI
    const response = await callOpenAIDynamic(apiKey, baseUrl, version, endpoint, model, messages);

    // لاگ خروجی
    logger.info(`Response: ${JSON.stringify(response)}`);

    res.json(response);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
