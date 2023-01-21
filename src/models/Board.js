import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import User from './User.js';

const Board = db.define('board', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
}, 
    Board.hasOne(models.User)
);

export default Board;