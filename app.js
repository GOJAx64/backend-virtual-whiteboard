import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/connectDB.js';
import authRoutes from './src/routes/authRoutes.js';

const app = express()

//Read body
app.use(express.json());

//ENV variables
dotenv.config();

//Connection with Database
connectDB();

//CORS
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function(origin, callback) {
    if(whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback( new Error('Error de CORS') );
    }
  }
}

app.use(cors(corsOptions));

//Routing
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT,  () => {
  console.log(`Servidor en el puerto ${PORT}`);
});