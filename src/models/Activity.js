import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import { Classroom } from './Classroom.js';

export const Activity = db.define('activities', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dueDate: {
        type: DataTypes.DATE,
        field: 'due_date',
        allowNull: true,
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