//import {Member method} from "../inferfaces/memberInterface";

const retrieveMembers = async () => {
    const response = await fetch("/api/members", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch members");
    }
    const data = await response.json();
    return data;
}

const retrieveMembersById = async (id: number) => {
    const response = await fetch(`/api/members/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch member by ID");
    }
    const data = await response.json();
    return data;
}

const createMember = async (name: string) => {
    const response = await fetch("/api/members/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) {
        throw new Error("Failed to create member");
    }
    const data = await response.json();
    return data;
}

const deleteMember = async (id: number) => {
    const response = await fetch(`/api/members/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to delete member");
    }
    const data = await response.json();
    return data;
}

const updateMember = async (id: number, name: string) => {
    const response = await fetch(`/api/members/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) {
        throw new Error("Failed to update member");
    }
    const data = await response.json();
    return data;
}

export { retrieveMembers, retrieveMembersById, createMember, deleteMember, updateMember };