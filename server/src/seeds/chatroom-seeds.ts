import { Chatroom } from '../models/index.js';

export const seedChatrooms = async () => {
  await Chatroom.bulkCreate([
    { name: 'General', owner: null },
    { name: 'Travel', owner: null },
  ]);
};