// As a general comment, this component is not responsible for the retrieval of chat data

import React from 'react';
import type { ChatroomData } from "../interfaces/ChatroomData";
import { retrieveMessages } from "../api/msgAPI";

// Define the props for the component
interface ChatListProps {
    chatrooms: ChatroomData[] | null; // users can be an array of UserData objects or null
    updateMessages: any
}

const ChatList: React.FC<ChatListProps> = ({ chatrooms, updateMessages }) => {

    const fetchMessages = async (chatId: number) => {
        try {
            const data = await retrieveMessages(chatId);
            updateMessages(data);
        } catch(err) {
            console.error('Failed to retrieve chat messages:', err);
            updateMessages([]);
        }
    }

    return (
        <>
            {chatrooms && chatrooms.map((chatroom) => (
                // TODO, we need to make this component populate the chat when we click on it.
                <div className="row align-center mb-5 bg-gray-400 p-6 rounded-lg outline outline-black" onClick={() => fetchMessages(chatroom.id as number)} key={chatroom.id}>
                    <div className="col-md-6">
                        <h3>{chatroom.name}</h3>
                    </div>
                    <div className="col-md-6">
                        <h4>Owner: {chatroom.ownerDetails.username}</h4>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ChatList;