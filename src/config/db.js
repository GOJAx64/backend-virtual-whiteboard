import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import { Sequelize } from 'sequelize';


const db = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    // port: 3307,
    dialect: 'mysql',
    ssl: true,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export default db;