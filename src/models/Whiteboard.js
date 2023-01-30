import { DataTypes, Model } from 'sequelize';
import { CLASSROOM_TABLE } from './Classroom.js';

export const WHITEBOARD_TABLE = 'whiteboards'

export const WhiteboardSchema = {
    id: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        field: 'classroom_id',
        allowNull: false,
        references: {
            model: CLASSROOM_TABLE
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }
};

export class Whiteboard extends Model {
    static associate(models) {
        this.belongsTo(models.Classroom, { as: 'classroom' })
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: WHITEBOARD_TABLE,
            modelName: 'Whiteboard',
        }
    }
}