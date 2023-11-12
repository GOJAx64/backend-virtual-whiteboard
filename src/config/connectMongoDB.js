import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


export const connectMongoDB = async() => {
    try {
        await mongoose.connect( "mongodb+srv://chat_user:chat_user123@uptask-mern.sb1cxkm.mongodb.net/virtual-classrooms-images", {
            useNewUrlParser: true,
            useUnifiedTopology: true,         
        });
        console.log('Mongo DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - vea logs');
    }
};