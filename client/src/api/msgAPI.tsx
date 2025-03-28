//import {Message Method} from "../interfaces/messageInterface";

const retrieveMessages = async (chatroomId: number) => {
    const response = await fetch(`/api/messages/chatroom/${chatroomId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch messages");
    }
    const data = await response.json();
    return data.messages;
}