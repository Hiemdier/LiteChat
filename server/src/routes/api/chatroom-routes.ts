import express from 'express';
import type { Request, Response } from 'express';



import { Chatroom } from '../../models/index.js';
import { User } from '../../models/user.js';

const router = express.Router();

// GET /chatrooms - Get all chatrooms
router.get('/', async (_req: Request, res: Response) => {
  try {
    const chatrooms = await Chatroom.findAll({
      include: {
          model: User,
          as: 'ownerDetails',
          required: false
        },
      nest: true
    });
    res.json(chatrooms);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
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
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    const { name } = req.body;
    const owner = Number(req.user.id);
    
    // Check if chatroom name already exists
    const existingRoom = await Chatroom.findOne({ where: { name } });
    if (existingRoom) {
      return res.status(400).json({ message: 'Chatroom name already exists' });
    }

    const newChatroom = await Chatroom.create({ name, owner });
    return res.status(201).json(newChatroom);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// POST /chatrooms/join - Join a chatroom
router.post('/join', async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    const { chatroomId } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const chatroom = await Chatroom.findByPk(chatroomId);
    if (!chatroom) {
      return res.status(404).json({ message: 'Chatroom not found' });

    }

    // Simulate adding user to chatroom (needs real implementation)
    return res.status(200).json({ message: `User ${user.id} joined chatroom ${chatroomId}` });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// DELETE /chatrooms/:id - Delete a chatroom
router.delete('/:id', async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    const chatroomId = req.params.id;
    const chatroom = await Chatroom.findByPk(chatroomId);
    if (!chatroom) {
      return res.status(404).json({ message: 'Chatroom not found' });
    }

    // Only the owner can delete the chatroom
    if (chatroom.owner !== Number(req.user.id)) {
      return res.status(403).json({ message: 'Forbidden: Only owner can delete chatroom' });
    }

    await chatroom.destroy();
    return res.status(200).json({ message: 'Chatroom deleted' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export { router as chatroomRouter };
