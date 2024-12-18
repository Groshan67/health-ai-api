import { callOpenAIDynamic } from '../services/chatService.js';
import logger from '../utils/logger.js';



export const openAIHandler = async (req, res) => {
  const apiKey = req.headers['x-api-key'];  // دریافت API Key از هدر
  const { model, messages } = req.body;  // دریافت مدل و پیام‌ها از بدنه درخواست

  logger.info(`Request: Model=${model}, Messages=${JSON.stringify(messages)}`);

  try {
    // اعتبارسنجی ورودی‌ها
    if (!apiKey) {
      return res.status(401).json({ error: 'API Key is required in header (x-api-key)' });
    }

    if (!model || !messages) {
      return res.status(400).json({ error: 'Model and messages are required in the body' });
    }

    // فراخوانی سرویس برای ارسال درخواست داینامیک به OpenAI
    const response = await callOpenAIDynamic(apiKey, model, messages);
    logger.info(`Response sent: ${JSON.stringify(response)}`);
    
    res.json(response);  // ارسال پاسخ به کاربر
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
