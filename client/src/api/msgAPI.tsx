//import {Message Method} from "../interfaces/messageInterface";
import Auth from '../utils/auth';

const retrieveMessages = async (chatroomId: number) => {
    const response = await fetch(`/api/messages/chatroom/${chatroomId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.getToken()}`
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch messages!");
    }
    const data = await response.json();
    console.log(data);
    return data
};

const postNewMessage = async(chatroomId: number, messageContent: string) => {
    const response = await fetch(`/api/messages/chatroom/${chatroomId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.getToken()}`
        },
        body: JSON.stringify({
            content: messageContent
        })
    });

    if (!response.ok) {
        throw new Error("Failed to post message!");
    }
    const data = await response.json();
    console.log(data);
    return data
};

export { retrieveMessages, postNewMessage };