import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import { User } from './User.js';
import { Classroom } from './Classroom.js';

export const ClassroomUsers = db.define('classroom_users',{
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
    userId: {
        type: DataTypes.UUID,
        field: 'user_id',
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }
});