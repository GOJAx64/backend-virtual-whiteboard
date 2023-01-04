import dotenv from "dotenv";
dotenv.config();

const config = {
    db: process.env.DB,
    dbPassword: process.env.DB_PASSWORD,
    dbUser: process.env.DB_USER,
    dbHost: 'localhost',
    dbDialect: 'mysql',
}

export default config;