import sequelize from '../config/connection.js'
import { ChatroomFactory } from './chatroom.js';
import { UserFactory } from './user.js';
import { MessageFactory } from './message.js';

const User = UserFactory(sequelize);
const Chatroom = ChatroomFactory(sequelize);
const Message = MessageFactory(sequelize);

// Associations for Chatroom
Chatroom.belongsTo(User, { foreignKey: 'owner', onDelete: 'SET NULL' });
User.hasMany(Chatroom, { foreignKey: 'owner' });

// Assocations for Message
Message.belongsTo(Chatroom, { foreignKey: 'chatId', onDelete: 'CASCADE'});
Chatroom.hasMany(Message, {foreignKey: 'chatId'});

Message.belongsTo(User, { foreignKey: 'userId', onDelete: 'SET NULL'});
User.hasMany(Message, { foreignKey: 'userId'});

export { User, Chatroom, Message };
