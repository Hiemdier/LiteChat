import express from 'express';
import type { Request, Response } from 'express';
import { User, Chatroom } from '../../models/index.js';


const router = express.Router();

// GET /chatrooms - Get all chatrooms
router.get('/', async (_req: Request, res: Response) => {
  try {
    const chatrooms = await Chatroom.findAll();
    res.json(chatrooms);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// /POST /chatrooms/create - Create a new chatroom
router.post('/create', async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401);
    }
    
    try {
        const name = req.body.name;
        const owner = req.user.id;
        const newChatroom = await Chatroom.create({ name, owner });
        return res.status(201).json(newChatroom);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
});

export { router as chatroomRouter };