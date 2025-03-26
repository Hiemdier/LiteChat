import express from 'express';
import type { Request, Response } from 'express';
import { Chatroom, Message } from '../../models/index.js';


const router = express.Router();

// Routes dedicated to messages

// GET /messages - Gets *all* chat messages
router.get('/', async(_req: Request, res: Response) => {
    
    try {
        const messages = await Message.findAll();
        res.json(messages);
    } catch (error: any) {
        res.status(500).json();
    }
     
});

// GET /messages - Get a chat message by id 
router.get('/', async(req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const message = await Message.findByPk(id);
        if (message) {
            return res.json(message);
        } else {
            return res.status(404).json({message: 'Message not found'})
        }
    } catch (error: any) {
        return res.status(500).json();
    }
     
});

// PUT /messages/:id - Modifies the content of a chat message 
router.put('/:id', async(req: Request, res: Response) => {

    if (!req.user) {
        return res.status(401);
    }

    const messageId = +req.params.id;
    const userId = +req.body.id;
    const { content } = req.body;

    try {
        const message = await Message.findByPk(messageId);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        if (!(userId === message.userId)) {
            return res.status(403).json({message: 'User lacks permissions'});
        }

        // At this point, we verified the message exists and the user who is trying to edit the message created it.
        await message.update({content: content});
        return res.json(message);

    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
    

});

// DELETE /messages/:id - Deletes a chat message
router.delete('/:id', async(req: Request, res: Response) => {
    // TODO: Right now, this method allows anyone to delete a message.
    // Ideally, it should only allow either the author of the message or
    // a moderator of the chatroom that the message was created in to delete it.
    
    const { id } = req.params;

    try {
        const message = await Message.findByPk(id);
        if (message) {
            // How do I update a message?
            await message.destroy();
            return res.json({ success: true, message: 'Message deleted.'});
        } else {
            return res.status(404).json({ message: 'Message not found' });
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
});

// Routes dedicated to messages within the context of chatrooms.

// GET /messages/chatroom/:id - Get all messages associated with a particular chatroom
router.get('/chatroom/:id', async (req: Request, res: Response) => {

    const { id } = req.params;
    const limit = Number(req.query.limit) || -1; // Determine the maximum number of messages to pull
    const since = req.query.since as string | undefined; // Only pull chat messages *after* the specified date
    
    try {
  
        // First, make sure the chatroom we're pulling from exists...
        const chatroom = await Chatroom.findByPk(id);
  
        if (chatroom) {
            const messages = await Message.findAll({where: {
                chatId: id,
            }});
            
            if (limit > 0) {
                messages.splice(0, Math.max(messages.length - limit,0));
            }

            // This is admittedly not the cleanest way to handle this...
            if (!since) {
                return res.json(messages);
            } else {
                return res.json(messages.filter(msg => 
                    new Date(msg.createdAt) > new Date(since)
                ))
            }
            
        } else {
            return res.status(404).json({ message: 'Chatroom not found' });
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
  });


// POST /messages/chatroom/:id - Post a message to a chatroom
router.post('chatroom/:id', async (req: Request, res: Response) => {

    if (!req.user) {
        return res.status(401).json({message: 'User not found'});
    }

    const chatId = Number(req.params.id);
    const userId = Number(req.user.id);
    const { content } = req.body;
    try {
        // First, make sure the chatroom we're pulling from exists...
        const chatroom = await Chatroom.findByPk(chatId);

        if (chatroom) {
            try {
                const newMessage = await Message.create({ content, chatId, userId });
                return res.status(201).json(newMessage);
            } catch (error: any) {
                return res.status(400).json({ message: error.message });
            }
        } else {
            // 404 if the chatroom doesn't exist
            return res.status(404).json({ message: 'Chatroom not found' });
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
});

export { router as messageRouter };