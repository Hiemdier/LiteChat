import express from 'express';
import type { Request, Response } from 'express';
import { Chatroom,Message } from '../../models/index.js';


const router = express.Router();

// GET /messages/id- Get all messages associated with a particular chatroom
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {

        // First, make sure the chatroom we're pulling from exists...
        const chatroom = await Chatroom.findByPk(id);

        if (chatroom) {
            const messages = await Message.findAll({where: {
                id: id,
            }});
            res.json(messages);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});