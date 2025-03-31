import { ChatroomData } from "../interfaces/ChatroomData";
import Auth from '../utils/auth';

const retrieveChatrooms = async (): Promise<ChatroomData[]> => {
    const response = await fetch("/api/chatrooms", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.getToken()}`
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch chatrooms");
    }
    const data = await response.json();
    console.log(data);
    return data;
}

const retrieveChatroomsById = async (id: number) => {
    const response = await fetch(`/api/chatrooms/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.getToken()}`
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch chatroom by ID");
    }
    const data = await response.json();
    return data;
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
