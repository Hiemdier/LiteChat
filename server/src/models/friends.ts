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

export class Friend extends Model<
    InferAttributes<Friend>,
    InferCreationAttributes<Friend>
> {
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User['id']>;
    declare friendId: ForeignKey<User['id']>;
    declare chatroomId: ForeignKey<Chatroom['id']>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export function FriendFactory(sequelize: Sequelize): typeof Friend {
    Friend.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            friendId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            chatroomId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            tableName: 'friends',
            timestamps: true,
        }
            );
        return Friend;
    }
