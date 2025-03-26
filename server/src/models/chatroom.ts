import { DataTypes, Sequelize, Model, Optional, ForeignKey } from 'sequelize';
import { User } from './user.js';

// Define the attributes for the Chatroom model
interface ChatroomAttributes {
    id: number;
    name: string;
    owner: number | null;
}

// Define the optional attributes for creating a new User
interface ChatroomCreationAttributes extends Optional<ChatroomAttributes, 'id'> {}

// Define the Chatroom class extending Sequelize's Model
export class Chatroom extends Model<ChatroomAttributes, ChatroomCreationAttributes> implements ChatroomAttributes {
  public id!: number;
  public name!: string;
  declare owner: ForeignKey<User['id']>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Define the ChatroomFactory function to initialize the User model
export function ChatroomFactory(sequelize: Sequelize): typeof Chatroom {
  Chatroom.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      owner: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
      },

    },
    {
      tableName: 'chatrooms',  // Name of the table in PostgreSQL
      sequelize,            // The Sequelize instance that connects to PostgreSQL
    }
  );

  return Chatroom;  // Return the initialized Chatroom model
}

// Establishes relationship between Chatroom and User tables (important, but I'm not quite sure how...)