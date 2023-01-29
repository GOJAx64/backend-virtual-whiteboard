
import { Sequelize } from 'sequelize';
import setupModels from '../models/setUpModels.js';
import config from './config.js';

const db = new Sequelize(config.db, config.dbUser, config.dbPassword, {
    host: config.dbHost,
    dialect: config.dbDialect,
    logging: false,
});

setupModels(db);
db.sync();

export default db;