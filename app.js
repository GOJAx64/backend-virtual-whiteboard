import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io'

import connectDB from './src/config/connectDB.js';
import { connectMongoDB } from './src/config/connectMongoDB.js';

import authRoutes from './src/routes/authRoutes.js';
import classroomRoutes from './src/routes/classroomRoutes.js';
import activityRoutes from './src/routes/activityRoutes.js';
import messageRoutes from './src/routes/messageRoutes.js';
import imageRoutes from './src/routes/imageRoutes.js';

import { markUserAsOffline, markUserAsOnline, saveMessage } from './src/controllers/socketController.js';
import { checkJWT } from './src/helpers/jwt.js';

const app = express()

//Read body
// app.use(express.json());
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.text({ limit: '200mb' }));

//ENV variables
dotenv.config();

//Connection with Database
connectDB();
connectMongoDB();

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
app.use('/api/activities', activityRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/images', imageRoutes);

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

io.on('connection', async (socket) => {
  
  const [ valid, id ] = checkJWT( socket.handshake.query['x-token']  );
  if ( !valid ) {
      console.log('Socket no identificado');
      return socket.disconnect();
  }

  await markUserAsOnline( id );
  io.emit('status-user', { id, status: true });


  socket.on('join-to-classroom', (payload) => {
    // await markUserAsOnline(user);
    // socket.join(classroom);
    //socket.to(classroom).emit('Joined', { msg: `Evento desde room: ${classroom} se unio a la sala: ${user}`} );
  });
  
  socket.on('join-to-personal-chat', (payload) => {
    const idRoom = payload.classroomId + '-' + payload.userId;
    socket.join(idRoom);
  });
  
  socket.on('send-personal-message', async(payload) => {
    const message = await saveMessage(payload);
    const idRoom = payload.classroomId + '-' + payload.to;
    const idFrom = payload.classroomId + '-' + payload.from;
    io.to(idRoom).emit('get-personal-message', message);
    io.to(idFrom).emit('get-personal-message', message);
  });

  socket.on('leave-personal-chat', async(payload) => {
    const idRoom = payload.classroomId + '-' + payload.userId;
    socket.leave(idRoom);
  });

  socket.on('disconnect', async() => {
    await markUserAsOffline( id );
    io.emit('status-user', { id, status: false });
  })
})