import {
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  DataTypes,
  type Sequelize,
  type ForeignKey,
} from 'sequelize';
import { User } from './user.js';
import { Chatroom } from './chatroom.js';

// Define the Message model

export class Message extends Model<
  InferAttributes<Message>, 
  InferCreationAttributes<Message>> 
  {
  declare id: CreationOptional<number>;
  declare content: string;
  declare userId: ForeignKey<User['id']>;
  declare chatId: ForeignKey<Chatroom['id']>;
}
// Define the MessageFactory function to initialize the Message model
export function MessageFactory(sequelize: Sequelize) {
  Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
    },
    {
      tableName: 'messages',  // Name of the table in PostgreSQL
      sequelize,            // The Sequelize instance that connects to PostgreSQL
    }
  );
  
  return Message;  // Return the initialized User model
}