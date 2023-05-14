import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import { Classroom } from './Classroom.js';

export const Whiteboard = db.define('whiteboards', {
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
    classroomId: {
        type: DataTypes.UUID,
        field: 'classroom_id',
        allowNull: false,
        references: {
            model: Classroom
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }
});