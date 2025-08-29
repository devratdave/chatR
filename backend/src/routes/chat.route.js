import { Router } from 'express';
import { authorize } from '../middlewares/auth.middleware.js';
import { getStreamToken } from '../controllers/chat.controller.js';

const router = Router();

router.get('/token', authorize , getStreamToken);

export default router;