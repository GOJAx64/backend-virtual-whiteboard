import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectMongoDB = async() => {
    console.log(process.env.MONGO_DB_CONNECTION_STRING);
    console.log(typeof(process.env.MONGO_DB_CONNECTION_STRING));
    try {
        await mongoose.connect( process.env.MONGO_DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,         
        });
        console.log('Mongo DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - vea logs');
    }
};