// The purpose of this component is to retrieve
// and display a list of chatrooms
import React from 'react';
import type { ChatroomData } from "../interfaces/ChatroomData";

// Define the props for the component
interface ChatListProps {
    chatrooms: ChatroomData[] | null; // users can be an array of UserData objects or null
}

const ChatList: React.FC<ChatListProps> = ({ chatrooms }) => {
    return (
        <>
            <h2 className="pb-5">
                Chatrooms:
            </h2>
            {chatrooms && chatrooms.map((chatroom) => (
                <div className="row align-center mb-5" key={chatroom.id}>
                    <div className="col-md-6">
                        <h3>{chatroom.id}. {chatroom.name}</h3>
                    </div>
                    <div className="col-md-6">
                        <h4>{chatroom.owner}</h4>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ChatList;