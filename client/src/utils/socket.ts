import { io } from "socket.io-client";
import Auth from '../utils/auth';

const socket = io("http://localhost:3001", { 
  withCredentials: true, // Ensure credentials are passed correctly
  transports: ["websocket"],
  auth: {
        token: Auth.getToken() // Forces WebSocket (avoids polling issues)
    }
});

export default socket;