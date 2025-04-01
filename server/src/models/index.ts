import sequelize from '../config/connection.js'
import { ChatroomFactory } from './chatroom.js';
import { UserFactory } from './user.js';
import { MemberFactory } from './member.js';
import { MessageFactory } from './message.js';
import { FriendFactory } from './friends.js';

const User = UserFactory(sequelize);
const Chatroom = ChatroomFactory(sequelize);
const Member = MemberFactory(sequelize);
const Message = MessageFactory(sequelize);
const Friend = FriendFactory(sequelize);

// Associations for Chatroom
Chatroom.belongsTo(User, { foreignKey: 'owner', onDelete: 'SET NULL' });
User.hasMany(Chatroom, { foreignKey: 'owner' });

// Associations for Member
User.hasMany(Member, { foreignKey: 'userId', onDelete: 'CASCADE' });
Member.belongsTo(User, { foreignKey: 'userId'});

Chatroom.hasMany(Member, { foreignKey: 'chatId', onDelete: 'CASCADE' });
Member.belongsTo(Chatroom, { foreignKey: 'chatId'});

// Associations for Message
User.hasMany(Message, { foreignKey: 'userId', onDelete: 'SET NULL' });
Message.belongsTo(User, { foreignKey: 'userId' });
Chatroom.hasMany(Message, { foreignKey: 'chatId', onDelete: 'CASCADE' });
Message.belongsTo(Chatroom, { foreignKey: 'chatId' });

// Associations for Friend
User.hasMany(Friend, { foreignKey: 'userId', onDelete: 'CASCADE' });
Friend.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Friend, { foreignKey: 'friendId', onDelete: 'CASCADE' });
Friend.belongsTo(User, { foreignKey: 'friendId' });
Chatroom.hasMany(Friend, { foreignKey: 'chatroomId', onDelete: 'CASCADE' });
Friend.belongsTo(Chatroom, { foreignKey: 'chatroomId' });

export { User, Chatroom, Member, Message, Friend };
