import { io } from "socket.io-client";
import Auth from '../utils/auth';
const socket = io( 'https://litechat-cebn.onrender.com/', { 
  withCredentials: true, // Ensure credentials are passed correctly
  transports: ["websocket"],
  auth: {
        token: Auth.getToken() // Forces WebSocket (avoids polling issues)
    }
});

export default socket;