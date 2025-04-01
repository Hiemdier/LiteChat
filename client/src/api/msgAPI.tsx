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
    return data;
}

const retrieveMessagesById = async (id: number) => {
    const response = await fetch(`/api/messages/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch message by ID");
    }
    const data = await response.json();
    return data;
}

const createMessage = async (content: string, chatId: number, userId: number) => {
    const response = await fetch("/api/messages/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, chatId, userId }),
    });
    if (!response.ok) {
        throw new Error("Failed to create message");
    }
    const data = await response.json();
    return data;
}

const deleteMessage = async (id: number) => {
    const response = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to delete message");
    }
    const data = await response.json();
    return data;
}