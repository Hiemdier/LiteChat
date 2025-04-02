import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';

// Requests that go through our socket must pass through THIS middleware function  

export const socketMiddleware = (socket: Socket, next: (err?: Error) => void) => {
    const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(" ")[1];

    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }
    
    const secretKey = process.env.JWT_SECRET_KEY || '';

    try {
      const decoded = jwt.verify(token, secretKey);
      socket.data.user = decoded; // Attach userId to socket data
      next(); // Proceed to the actual socket event handlers
    } catch (err) {
      next(new Error("Authentication error: Invalid token"));
    }
};