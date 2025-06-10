import express from 'express';
//import mailer from './config/mailConfig.js';
import { createServer } from 'http';
import { StatusCodes } from 'http-status-codes';
import { Server } from 'socket.io';
import messageHandlers from './controllers/messageSocketController.js';
import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/apiRoutes.js';

const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);
app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({ message: 'pong' });
});

io.on('connection', (socket) => {
  // console.log('a user connected', socket.id);

  // setTimeout(() => {
  //   socket.emit('message', 'this is a message from the server');
  // }, 3000);
  // socket.on('messageFromClient', (data) => {
  //   console.log('Message from client', data);

  //   io.emit('new message', data.toUpperCase());
  // });
  messageHandlers(io, socket);
});

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();

});