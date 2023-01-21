import { DataTypes, Model } from 'sequelize';
// import Board from './Board.js';

export const USER_TABLE = 'users'

export const UserSchema = {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING
    },
    confirmed: {
        type: DataTypes.BOOLEAN
    },
};

export class User extends Model {
    static associate() {
        // User.hasMany(Board);
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
        }
    }
}