import sequelize from '../config/connection.js'
import { ChatroomFactory } from './chatroom.js';
import { UserFactory } from './user.js';
import { MemberFactory } from './member.js';
import { MessageFactory } from './message.js';

const User = UserFactory(sequelize);
const Chatroom = ChatroomFactory(sequelize);
const Member = MemberFactory(sequelize);
const Message = MessageFactory(sequelize);

// Associations for Chatroom
Chatroom.belongsTo(User, { foreignKey: 'owner', as: 'ownerDetails', onDelete: 'SET NULL' });
User.hasMany(Chatroom, { foreignKey: 'owner', as: 'chatrooms' });

// Associations for Member
User.hasMany(Member, { foreignKey: 'userId', onDelete: 'CASCADE' });
Member.belongsTo(User, { foreignKey: 'userId'});

Chatroom.hasMany(Member, { foreignKey: 'chatId', onDelete: 'CASCADE' });
Member.belongsTo(Chatroom, { foreignKey: 'chatId'});

// Associations for Message
User.hasMany(Message, { foreignKey: 'userId', as: 'messages', onDelete: 'SET NULL' });
Message.belongsTo(User, { foreignKey: 'userId', as: 'ownerDetails' });
Chatroom.hasMany(Message, { foreignKey: 'chatId', onDelete: 'CASCADE' });
Message.belongsTo(Chatroom, { foreignKey: 'chatId' });

export { User, Chatroom, Member, Message };