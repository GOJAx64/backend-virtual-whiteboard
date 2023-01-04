import db from "./db.js";

const connectDB = async() => {
    try {
        await db.authenticate();
        console.log('Base de datos conectado en localhost')
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;