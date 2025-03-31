const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import sequelize from './config/connection.js';
import routes from './routes/index.js';

// We need these imports for real-time chat listening
import { Server } from 'socket.io';
// import { Message } from './models/index.js';
// import http from 'http';
// import cors from 'cors';
import { createServer } from 'node:http';

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
app.use(express.json());
app.use(routes);

// io stuffs
io.on('connection', (_socket) => {
  console.log(`a user connected!`);
});

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
