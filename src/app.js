import express from 'express';
import chatRoutes from './routes/chatRoutes.js';
import { logger } from './middlewares/logger.js';

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use('/api', chatRoutes);

export default app;
