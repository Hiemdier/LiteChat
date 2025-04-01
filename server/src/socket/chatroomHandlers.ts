import { Server, Socket } from "socket.io";
import { Message, User } from "../models/index.js";

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
        const content = data.content;
        const chatId = data.chatId;

        console.log(`Creating message for room ${chatId} by user ${socket.data.user.id} with content: ${content}`);

        const message = await Message.create({ content: content, chatId: chatId, userId: socket.data.user.id });

        console.log('Socket created message!');

        // Broadcast message to all clients in the room
        const messageInfo = await Message.findByPk(message.id, {
            include: {
                model: User,
                as: 'ownerDetails',
                required: false
            },
            nest: true
        });
        io.to(chatId).emit("receiveMessage", messageInfo);

        console.log('Socket broadcasted message!');
    });
};

// export interface MessageData {
//     id: number | null;
//     content: string | null;
//     ownerDetails: {
//       username: string
//     };
//     chatId: number | null;
//   }