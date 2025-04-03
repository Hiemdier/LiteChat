import { io } from "socket.io-client";
import Auth from '../utils/auth';

const socket = io( import.meta.env.VITE_SOCKET_URL , { 
  withCredentials: true, // Ensure credentials are passed correctly
  transports: ["websocket", "polling"],
  auth: {
        token: Auth.getToken() // Forces WebSocket (avoids polling issues)
    }
});

export default socket;