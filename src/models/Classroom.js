import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import { User } from './User.js';

export const Classroom = db.define('classrooms',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    summary: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    userId: {
        type: DataTypes.UUID,
        field: 'user_id',
        allowNull: false,
        references: {
            model: User
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }
});