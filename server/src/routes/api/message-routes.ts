import express from 'express';
import type { Request, Response } from 'express';
import { User, Message } from '../../models/index.js';
// I need the User model so I can also retrieve the usernames of message authors

const router = express.Router();

// GET/messages - Gets *all* chat messages
router.get('/', async (_req: Request, res: Response) => {
    try {
        const messages = await Message.findAll();
        res.json(messages);
    } catch (error: any) {
        res.status(500).json();
    }
}
);
// GET /messages/:id - Get a chat message by id
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const message = await Message.findByPk(id, {
            include: {
                model: User,
                as: 'ownerDetails',
                required: false
            },
            nest: true
        });
        // const message = await Message.findAll();
        if (message) {
            return res.json(message);
        } else {
            return res.status(404).json({ message: 'Message not found' })
        }
    } catch (error: any) {
        return res.status(500).json();
    }

});
// POST /messages/create - Create a new message
router.post('/create', async (req: Request, res: Response) => {
    const { content, chatId, userId } = req.body;
    try {
        const newMessage = await Message.create({ content, chatId, userId });
        res.status(201).json(newMessage);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}
);
// PUT /messages/:id - Modifies the content of a chat message
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const message = await Message.findByPk(id);
        if (message) {
            message.content = content;
            await message.save();
            res.json(message);
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});
// DELETE /messages/:id - Deletes a chat message
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const message = await Message.findByPk(id);
        if (message) {
            // How do I update a message?
            await message.destroy();
            return res.json({ success: true, message: 'Message deleted.' });
        } else {
            return res.status(404).json({ message: 'Message not found' });
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}
);

// Routes dedicated to messages within the context of chatrooms.
// GET /messages/chatroom/:id - Get all messages associated with a particular chatroom
router.get('/chatroom/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const limit = Number(req.query.limit) || -1; // Determine the maximum number of messages to pull

    try {
        const messages = await Message.findAll({ 
            where: { chatId: id },
            include: {
                model: User,
                as: 'ownerDetails',
                required: false
            },
            nest: true
        });

        if (limit > 0) {
            messages.splice(0, Math.max(messages.length - limit, 0));
        }
        return res.json(messages);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}
);

// POST /messages/chatroom/:id - Post a message to a chatroom
router.post('/chatroom/:id', async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
    }

    const chatId = Number(req.params.id);
    const userId = Number(req.user.id);
    const { content } = req.body;
    try {
        const newMessage = await Message.create({ content, chatId, userId });
        return res.status(201).json(newMessage);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
}
);

export { router as messageRouter };