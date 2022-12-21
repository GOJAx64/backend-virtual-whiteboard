import express from "express";
import dotenv from "dotenv";
// import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';

const app = express()
app.use(express.json());
dotenv.config();
// connectDB();

//Routing
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(process.env.PORT,  () => {
  console.log(`Servidor en el puerto ${PORT}`);
});