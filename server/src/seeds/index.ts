import { seedUsers } from './user-seeds.js';
import { seedChatrooms } from './chatroom-seeds.js';
import sequelize from '../config/connection.js';
import { seedMessages } from './message-seeds.js';

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    
    await seedChatrooms();
    console.log('\n----- CHATROOMS SEEDED -----\n');

    await seedMessages();
    console.log('\n----- MESSAGES SEEDED -----\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
