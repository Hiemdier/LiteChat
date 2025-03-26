import express from 'express';
import type { Request, Response } from 'express';
import { Chatroom, Message } from '../../models/index.js';


const router = express.Router();

// GET /chatrooms - Get all chatrooms
router.get('/', async (_req: Request, res: Response) => {
  try {
    const chatrooms = await Chatroom.findAll();
    return res.json(chatrooms);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// GET /chatrooms/:id - Get a chatroom by id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const chatroom = await Chatroom.findByPk(id);
    if (chatroom) {
      return res.json(chatroom);
    } else {
      return res.status(404).json({message: 'Chatroom not found'});
    }
    
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// POST /chatrooms/create - Create a new chatroom
router.post('/create', async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401);
    }
    
    try {
        const name = req.body.name;
        const { id } = req.user;
        const newChatroom = await Chatroom.create({ name, id });
        return res.status(201).json(newChatroom);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
});

// DELETE /chatrooms/:id - Delete a chatroom by its id
router.delete('/:id', async (req: Request, res: Response) => {
  // Current functionality: Only the owner of a chatroom can delete said room.

  const { id } = req.params;
  
  if (!req.user) {
    return res.status(401);
  }
  const userId = +req.user.id;

  try {
    const chatroom = await Chatroom.findByPk(id);
    if (chatroom) {
      if (chatroom.owner === userId) {
        chatroom.destroy();
        return res.json({ success: true, message: 'Message deleted.'});
      } else {
        return res.status(403).json({message: 'User does not have permissions.'});
      }
    } else {
      return res.status(404).json({message: 'Chatroom not found'});
    }
  } catch (error: any) {
    return res.status(500).json({message: error.message});
  }
});

export { router as chatroomRouter };