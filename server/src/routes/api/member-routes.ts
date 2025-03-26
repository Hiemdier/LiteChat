import express from 'express';
import type { Request, Response } from 'express';
import { Member } from '../../models/index.js';
const router = express.Router();

// GET /members - Get all members
router.get('/', async (_req: Request, res: Response) => {
    try {
        const members = await Member.findAll();
        res.json(members);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
);

// GET /members/:id - Get a member by id
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const member = await Member.findByPk(id);
        if (member) {
            res.json(member);
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
);

// POST /members/create - Create a new member
router.post('/create', async (req: Request, res: Response) => {
    const { role, ChatroomId, UserId } = req.body;
    try {
        const newMember = await Member.create({ role, ChatroomId, UserId });
        res.status(201).json(newMember);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}
);

// PUT /members/:id - Update a member by id
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role} = req.body;
    try {
        const member = await Member.findByPk(id);
        if (member) {
            member.role = role;
            await member.save();
            res.json(member);
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
);

// DELETE /members/:id - Delete a member by id
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const member = await Member.findByPk(id);
        if (member) {
            await member.destroy();
            res.json({ message: 'Member deleted' });
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
);

export { router as memberRouter };