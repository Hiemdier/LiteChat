import { Server, Socket } from "socket.io";
import { handleChatroomEvents } from "./chatroomHandlers.js";
import { socketMiddleware } from "../middleware/socketAuth.js";

export const setupSocket = (io: Server) => {

    io.use(socketMiddleware);

    io.on("connection", (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);
    
        // Delegate chatroom-related events
        // handleChatEvents will define how our socket handles chat events
        handleChatroomEvents(io, socket);

        // TODO: I need a handler for chatlist-related events

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });  

    console.log('Socket is ready!');
};