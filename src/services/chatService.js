import axios from 'axios';

export const callOpenAIDynamic = async (apiKey, baseUrl, version, endpoint, model, messages) => {
  try {
    // مسیر و نسخه API به‌صورت کاملاً داینامیک
    const url = `${baseUrl}/${version}/${endpoint}`;

    const response = await axios.post(
      url,
      {
        model: model,       // مدل داینامیک مانند gpt-3.5-turbo, gpt-4, davinci
        messages: messages, // پیام‌ها با نقش‌های dynamic
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data; // بازگرداندن پاسخ API
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    throw new Error(error.response?.data?.error?.message || 'Failed to call OpenAI API');
  }
};
