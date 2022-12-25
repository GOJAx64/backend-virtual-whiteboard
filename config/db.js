import { Sequelize } from 'sequelize';
import dotenv from "dotenv";

const db = new Sequelize('virtual_whiteboard', 'root', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});

export default db;