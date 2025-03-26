import sequelize from '../config/connection.js'
import { ChatroomFactory } from './chatroom.js';
import { UserFactory } from './user.js';
import {MembersFactory} from './members.js';
import {MessageFactory} from './message.js';

const User = UserFactory(sequelize);
const Chatroom = ChatroomFactory(sequelize);
const Member = MembersFactory(sequelize);
const Message = MessageFactory(sequelize);

Chatroom.belongsTo(User, { foreignKey: 'owner', onDelete: 'SET NULL' });
User.hasMany(Chatroom, { foreignKey: 'owner' });

User.hasMany(Member, { foreignKey: 'userId', onDelete: 'CASCADE' });
Member.belongsTo(User);

Chatroom.hasMany(Member, { foreignKey: 'chatroomId', onDelete: 'CASCADE' });
Member.belongsTo(Chatroom);

Chatroom.hasMany(Message, { foreignKey: 'chatId', onDelete: 'CASCADE' });
Message.belongsTo(Chatroom);

User.hasMany(Message, { foreignKey: 'userId', onDelete: "SET NULL" });
Message.belongsTo(User);

export { User, Chatroom, Member };
