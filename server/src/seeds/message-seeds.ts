import { Message } from '../models/index.js';

// Ideally, our website shouldn't actually be seeded with message data, but I need this for debugging purposes. 
export const seedMessages = async () => {
  await Message.bulkCreate([
    { content: 'Ponies are cool.', userId: 1, chatId: 1 },
    { content: 'At least, I think they are.', userId: 1, chatId: 1 },
    { content: 'I disagree with what you have to say.', userId: 2, chatId: 1 },
    { content: 'I want to go to Asia.', userId: 2, chatId: 2 },
  ]);
};