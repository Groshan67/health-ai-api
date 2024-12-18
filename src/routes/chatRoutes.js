import { Router } from 'express';
import { openAIHandler } from '../controllers/chatController.js';

const router = Router();

// مسیر داینامیک برای تمام متدها
router.post('/myrisk_ai', openAIHandler);

export default router;
