import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser'
import authRoutes from './routers/auth.routes';
import roomsRoutes from './routers/room.routes';
import cors from 'cors';
import messageModel from './models/message.model';
import userModel from './models/user.model';

dotenv.config();

interface UsersConnected {
  email: string;
  id: string;
  username: string;
  socketId: string;
}

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

let connectedUsers: UsersConnected[] = [];

io.on("connection", (socket) => {
  console.log("new user connected");

  socket.on("joinRoom", async ({ room, user }) => {
    socket.join(room);
    console.log(`Usuario ${socket.id} se unió a la sala ${room}`);

    const hasUser = connectedUsers.some((connection) => connection.id === user.id);
    if (!hasUser) {
      connectedUsers = [...connectedUsers, { ...user, socketId: socket.id }];
    }

    let deleteDuplicatedConnections = new Set(connectedUsers);
    let addConnection = [...deleteDuplicatedConnections];

    const messages = await messageModel.find({ to: room })
      .populate('user', 'username');

    io.to(room).emit("previousMessages", { messages, addConnection });
  });

  socket.on("sendMessage", async ({ room, message, userId }) => {
    const user = await userModel.findById(userId);
    if (!user) return;

    const newMessage = new messageModel({
      message,
      to: room,
      user: userId
    });
    await newMessage.save();
    await newMessage.populate('user', 'username');

    io.to(room).emit("newMessage", newMessage);
  });

  socket.on('typing', ({ room, user }) => {
    io.to(room).emit("typing:user", user.username);
  })

  socket.on('disconnect', () => {
    console.log('client disconnected');

    const disconnectedSocketIndex = connectedUsers.findIndex((user) => user.socketId === socket.id);
    if (disconnectedSocketIndex !== -1) {
      connectedUsers.splice(disconnectedSocketIndex, 1);
    }
  });
});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', roomsRoutes);

export default server;
