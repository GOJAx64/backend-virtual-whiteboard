import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

console.log(process.env.DB);
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_HOST)

const db = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: 3307,
    dialect: 'mysql',
    logging: false,
});

export default db;