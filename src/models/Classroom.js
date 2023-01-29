import { DataTypes, Model } from 'sequelize';
import { USER_TABLE } from './User.js';

export const CLASSROOM_TABLE = 'classrooms'

export const ClassroomSchema = {
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

export class Classroom extends Model {
    static associate(models) {
        this.belongsTo(models.User, { as: 'user' })
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: CLASSROOM_TABLE,
            modelName: 'Classroom',
        }
    }
}