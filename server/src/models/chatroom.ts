import { DataTypes, Sequelize, Model, Optional, ForeignKey } from 'sequelize';
import { User } from './user.js';
import { Message } from './message.js';

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

  // Associations
  public static associate() {
    this.belongsTo(User, { foreignKey: 'owner', as: 'chatOwner' });
    this.hasMany(Message, { foreignKey: 'chatroomId', as: 'messages' });
  }

    // Helper method to create a chatroom
  public static async createChatroom(name: string, ownerId: number) {
    return await this.create({ name, owner: ownerId });
  }

  // Helper method to delete a chatroom
  public static async deleteChatroom(chatroomId: number) {
    return await this.destroy({ where: { id: chatroomId } });
  }
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
        validate: {
          notEmpty: true,
        },
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
      sequelize,
      tableName: 'chatrooms',
    }
  );

  return Chatroom;  // Return the initialized Chatroom model
}
