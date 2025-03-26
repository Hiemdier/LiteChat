import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { chatroomRouter } from './chatroom-routes.js';
import { messageRouter } from './message-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/chatrooms', chatroomRouter);
router.use('/messages', messageRouter);

export default router;
