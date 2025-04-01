//import {Friend Method} from "../interfaces/FrindInterface";

const retrieveFriendsById = async (id: number) => {
    const response = await fetch(`/api/friends/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch friend by ID");
    }
    const data = await response.json();
    return data;
}

const createFriend = async (name: string) => {
    const response = await fetch("/api/friends/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) {
        throw new Error("Failed to create friend");
    }
    const data = await response.json();
    return data;
}

const updateFriend = async (id: number, name: string) => {
    const response = await fetch(`/api/friends/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) {
        throw new Error("Failed to update friend");
    }
    const data = await response.json();
    return data;
}

const deleteFriend = async (id: number) => {
    const response = await fetch(`/api/friends/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to delete friend");
    }
    const data = await response.json();
    return data;
}