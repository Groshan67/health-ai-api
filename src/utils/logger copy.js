import fs from 'fs';
import path from 'path';
import winston from 'winston';
import { fileURLToPath } from 'url';

// گرفتن مسیر فایل
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // مسیر دایرکتوری فایل فعلی

// مسیر فایل لاگ
const logDirectory = path.join(__dirname, '../logs');

// بررسی و ایجاد پوشه در صورت عدم وجود
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const logFilePath = path.join(logDirectory, 'combined.log');

// تنظیمات winston
const logger = winston.createLogger({
  level: 'info', // سطح لاگ
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // نمایش لاگ‌ها در کنسول
    new winston.transports.File({ filename: logFilePath }) // ذخیره لاگ‌ها در فایل
  ],
});

// تابع برای ذخیره لاگ‌ها
export const logToFile = (message, level = 'info') => {
  logger.log({ level, message });
};
