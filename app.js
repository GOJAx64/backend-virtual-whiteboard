import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import authRoutes from './routes/authRoutes.js';

const app = express()

//Read body
app.use(express.json());

//ENV variables
dotenv.config();

//Connection with Database
connectDB();

//Routing
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(process.env.PORT,  () => {
  console.log(`Servidor en el puerto ${PORT}`);
});