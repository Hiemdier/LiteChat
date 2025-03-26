import { DataTypes, Sequelize, Model, Optional, ForeignKey } from 'sequelize';
import { User } from './user.js';
import { Chatroom } from './chatroom.js';

// Define the attributes for the User model
interface MessageAttributes {
  id: number;
  content: string;
  userId: number; // This is a foreign key
  chatId: number; // This is a foreign key
}

// Define the optional attributes for creating a new message
interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> {}

// Define the Message class extending Sequelize's Model
export class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  public id!: number;
  public content!: string;
  declare userId: ForeignKey<User['id']>;
  declare chatId: ForeignKey<Chatroom['id']>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Define the MessageFactory function to initialize the Message model
export function MessageFactory(sequelize: Sequelize): typeof Message {
  Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING(200), //Is this how I set string lengths?
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
      },
      chatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'chatrooms',
            key: 'id'
        }
      },
    },
    {
      tableName: 'messages',  // Name of the table in PostgreSQL
      sequelize,            // The Sequelize instance that connects to PostgreSQL
    }
  );

  return Message;  // Return the initialized User model
}