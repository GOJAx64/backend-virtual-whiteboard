
import { Sequelize } from 'sequelize';
import config from './config.js';

const db = new Sequelize(config.db, config.dbUser, config.dbPassword, {
    host: config.dbHost,
    dialect: config.dbDialect,
    logging: false,
});

export default db;