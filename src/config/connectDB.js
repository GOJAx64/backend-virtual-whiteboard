import db from "./db.js";

const connectDB = async() => {
    try {
        await db.authenticate();
        db.sync();
        console.log('Base de datos conectada')
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;