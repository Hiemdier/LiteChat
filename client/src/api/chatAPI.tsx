//import {Chat Interface Method} from "../interfaces/chatroomInterface";

const retrieveChatrooms = async () => {
    const response = await fetch("/api/chatrooms", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch chatrooms");
    }
    const data = await response.json();
    return data.chatrooms;
}

const retrieveChatroomsById = async (id: number) => {
    const response = await fetch(`/api/chatrooms/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch chatroom by ID");
    }
    const data = await response.json();
    return data.chatroom;
}

const createChatroom = async (name: string) => {
    const response = await fetch("/api/chatrooms/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) {
        throw new Error("Failed to create chatroom");
    }
    const data = await response.json();
    return data.chatroom;
}
const deleteChatroom = async (id: number) => {
    const response = await fetch(`/api/chatrooms/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to delete chatroom");
    }
    const data = await response.json();
    return data;
}
const updateChatroom = async (id: number, name: string) => {
    const response = await fetch(`/api/chatrooms/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) {
        throw new Error("Failed to update chatroom");
    }
    const data = await response.json();
    return data.chatroom;
}

export { retrieveChatrooms, retrieveChatroomsById, createChatroom, deleteChatroom, updateChatroom };
