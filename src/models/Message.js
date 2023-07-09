import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import { User } from './User.js';
import { Classroom } from './Classroom.js';

export const Message = db.define('messages',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    from: {
        type: DataTypes.UUID,
        field: 'from_user_id',
        allowNull: false,
        references: {
            model: User
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    to: {
        type: DataTypes.UUID,
        field: 'to_user_id',
        allowNull: false,
        references: {
            model: User
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    classroomId: {
        type: DataTypes.UUID,
        field: 'classroom_id',
        allowNull: false,
        references: {
            model: Classroom,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
});