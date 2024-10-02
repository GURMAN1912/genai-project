import express from 'express';
import { saveUserMessage, saveBotMessage, getChatHistory, updateTitle, deleteChat } from '../controllers/chat.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

router.post('/user-message', verifyToken, saveUserMessage);
router.post('/bot-message', verifyToken, saveBotMessage);
router.get('/:userId', verifyToken, getChatHistory);
router.put('/:userId', verifyToken, updateTitle);
router.delete('/:userId', verifyToken, deleteChat);
export default router;