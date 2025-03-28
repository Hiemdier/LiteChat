import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { chatroomRouter } from './chatroom-routes.js';
import { memberRouter } from './member-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/chatrooms', chatroomRouter);
router.use('/members', memberRouter);

export default router;
