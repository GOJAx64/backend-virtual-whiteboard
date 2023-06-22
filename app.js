import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/connectDB.js';
import authRoutes from './src/routes/authRoutes.js';
import classroomRoutes from './src/routes/classroomRoutes.js';
import whiteboardRoutes from './src/routes/whiteboardRoutes.js';
import { Server } from 'socket.io'
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
app.use('/api/classrooms', classroomRoutes);
app.use('/api/whiteboards', whiteboardRoutes);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT,  () => {
  console.log(`Servidor en el puerto ${PORT}`);
});


//Socket.io
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
  }
})

io.on('connection', (socket) => {
  // console.log('Conectado a Socket IO');
  
  socket.on('join to classroom', (classroom) => {
    console.log(classroom)
    socket.join(classroom.classroom);
    socket.to(classroom.classroom).emit('Joined', { msg: `Evento desde room: ${classroom.classroom} se unio a la sala: ${classroom.name}`} );
  });

})