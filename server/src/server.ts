const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import sequelize from './config/connection.js';
import routes from './routes/index.js';

// We need these imports for real-time chat listening
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { setupSocket } from './socket/index.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
const clientPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  

app.use(routes);

app.get("*", (_req, res) => {
  res.sendFile(path.resolve(clientPath, 'index.html'));
});

// io stuffs
setupSocket(io);

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
