import { Server, Socket } from "socket.io";
import { Message } from "../models/index.js";

export const handleChatroomEvents = (io: Server, socket: Socket) => {
    socket.on("joinRoom", (roomId: string) => {
        socket.join(roomId);
        // TODO: It'd be nice if this also specified the user who joined as well...
        console.log(`User joined room: ${roomId}`);
    });

    // Note that this WILL replace code that we've written for ChatPage.tsx
    // We'll need to adjust accordingly...
    socket.on("sendMessage", async (data) => {

        console.log('Socket received sendMessage!');
        
        // Our socket middleware contains the userId we need, but the socket emission has the message content and chatId
        const { content, chatId } = data;

        const message = await Message.create({ content, chatId: chatId, userId: socket.data.user.id });

        // Broadcast message to all clients in the room
        io.to(chatId).emit("receiveMessage", message);
    });
};