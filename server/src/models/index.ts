import sequelize from '../config/connection.js'
import { ChatroomFactory } from './chatroom.js';
import { UserFactory } from './user.js';

const User = UserFactory(sequelize);
const Chatroom = ChatroomFactory(sequelize);

Chatroom.belongsTo(User, { foreignKey: 'owner', onDelete: 'SET NULL' });
User.hasMany(Chatroom, { foreignKey: 'owner' });

export { User, Chatroom };
