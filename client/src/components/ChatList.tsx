// As a general comment, this component is not responsible for the retrieval of chat data

import React from 'react';
import type { ChatroomData } from "../interfaces/ChatroomData";
import { retrieveMessages } from "../api/msgAPI";

// Define the props for the component
interface ChatListProps {
    chatrooms: ChatroomData[] | null; // users can be an array of UserData objects or null
    updateMessages: any,
    updateActiveChatroom: any
}

const ChatList: React.FC<ChatListProps> = ({ chatrooms, updateMessages, updateActiveChatroom }) => {

    const fetchMessages = async (chatId: number) => {
        try {
            const data = await retrieveMessages(chatId);
            updateMessages(data);
            updateActiveChatroom(chatId);
        } catch(err) {
            console.error('Failed to retrieve chat messages:', err);
            updateMessages([]);
            updateActiveChatroom(-1);
        }
    }

    return (
        <>
            <div className="h-192 max-h-192 overflow-auto p-1">
                {chatrooms && chatrooms.map((chatroom) => (
                // TODO, we need to make this component populate the chat when we click on it.
                <div className="col align-center mb-5 bg-gray-400 p-6 rounded-lg outline outline-black" onClick={() => fetchMessages(chatroom.id as number)} key={chatroom.id}>
                    <div className="row-md-4">
                        <h4 className='font-bold'>{chatroom.name}</h4>
                    </div>
                    <div className="row-md-4">
                        <p><span className='font-bold'>Created by:</span> {chatroom.ownerDetails.username}</p>
                    </div>
                </div>
            ))}</div>
        </>
    );
};

export default ChatList;