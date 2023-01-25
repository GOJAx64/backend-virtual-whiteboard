import { DataTypes, Model } from 'sequelize';
import { USER_TABLE } from './User.js';

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
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userId: {
        type: DataTypes.STRING,
        field: 'user_id',
        allowNull: false,
        references: {
            model: USER_TABLE
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }
};

export class Whiteboard extends Model {
    static associate(models) {
        this.belongsTo(models.User, { as: 'user' })
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: WHITEBOARD_TABLE,
            modelName: 'Whiteboard',
        }
    }
}