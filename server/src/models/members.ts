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

export class Member extends Model<
  InferAttributes<Member>,
  InferCreationAttributes<Member>
> {
  declare id: CreationOptional<number>;
  declare role: CreationOptional<string>;
  declare userId: ForeignKey<User['id']>;
  declare chatroomId: ForeignKey<Chatroom['id']>;
}

export function MembersFactory(sequelize: Sequelize) {
    Member.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            tableName: 'members',  // Name of the table in PostgreSQL
            sequelize,            // The Sequelize instance that connects to PostgreSQL
        }
    );

    return Member;  // Return the initialized Members model
}