import { Chatroom } from '../models/index.js';

export const seedChatrooms = async () => {
  await Chatroom.bulkCreate([
    { name: 'General', owner: 2 },
    { name: 'Travel', owner: 3 },
  ]);
};