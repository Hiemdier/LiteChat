import express from 'express';
import type { Request, Response } from 'express';
import { Friend } from '../../models/index.js';
const router = express.Router();

// GET /Friend - Get all Friend
router.get('/', async (_req: Request, res: Response) => {
    try {
        const friends = await Friend.findAll();
        res.json(friends);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
);

// GET /Friend/:id - Get a Friend by id
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const friend = await Friend.findByPk(id);
        if (friend) {
            res.json(friend);
        } else {
            res.status(404).json({ message: 'Friends not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
);

// POST /Friend/create - Create a new Friend
router.post('/create', async (req: Request, res: Response) => {
    const { friendId, chatroomId, userId } = req.body;
    try {
        const newFriend = await Friend.create({ friendId, chatroomId, userId });
        res.status(201).json(newFriend);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}
);

// PUT /Friend/:id - Update a Friend by id
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { friendId, chatroomId, userId } = req.body;
    try {
        const friend = await Friend.findByPk(id);
        if (friend) {
            await friend.update({ friendId, chatroomId, userId });
            res.json(friend);
        } else {
            res.status(404).json({ message: 'Friend not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /Friend/:id - Delete a Friend by id
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const friend = await Friend.findByPk(id);
        if (friend) {
            await friend.destroy();
            res.json({ message: 'Friend deleted' });
        } else {
            res.status(404).json({ message: 'Friend not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
);

export { router as friendRouter };