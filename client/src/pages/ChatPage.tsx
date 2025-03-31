// Boiling down a react component to its basics, we have a function
// The function returns "HTML", and we do an export default on it

// Any react component we build in pages is placed there because it referred to by our
// router. (See main.tsx)

// Any react component we build in components is utilized in pages.
// To keep things simple, we can build things entirely within pages first, and then 
// subdivide and put things in components later for tidiness

import { useState, useEffect, useLayoutEffect } from "react";

// API functions
import { retrieveChatrooms, retrieveChatroomsById } from "../api/chatAPI";
import { postMessage } from "../api/msgAPI";

import auth from '../utils/auth';

// Necessary components
import ChatList from "../components/ChatList";
import Chatroom from "../components/Chatroom";
import ErrorPage from "./ErrorPage";

// Interfaces for type protection
import { ChatroomData } from "../interfaces/ChatroomData";
import { MessageData } from "../interfaces/MessageData";

const ChatPage = () => {
    // TODO: I want the ability to post chat messages to a chatroom
    
    const [chatrooms, setChatrooms] = useState<ChatroomData[]>([]);
    const [activeChatroom, setActiveChatroom] = useState<number>(-1);
    const [activeChatName, setActiveChatName] = useState<string>('');
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);

    useEffect(() => {
        if (loginCheck) {
            fetchChatrooms();
            // TODO: Probably need something here for fetching the chat messages of an active chat?
        }
    }, [loginCheck]);

    useEffect(() => {
        console.log(`Current chatroom: ${activeChatroom}`);
        const chat = async () => {
            try {
                const data = await retrieveChatroomsById(activeChatroom);
                setActiveChatName(data.name);
            } catch(error) {
                console.error("Error fetching data:", error);
            };
        };
        chat();
    }, [activeChatroom]);

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if ( auth.loggedIn() && !auth.isTokenExpired(auth.getToken()) ) {
            setLoginCheck(true);
        } else {
            setLoginCheck(false);
            window.location.assign('/login')
        }
    };

    const fetchChatrooms = async () => {
        try {
            const data = await retrieveChatrooms();
            setChatrooms(data);
        } catch (err) {
            console.error('Failed to retrieve chatrooms:', err);
            setError(true);
        }
    };

    if (error) {
        return <ErrorPage />;
    };

    return (
        <div className="w-screen min-h-screen p-6 border border-red-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg outline outline-black md:col-span-1">
                    <h2 className="text-xl font-bold text-gray-800">Chatrooms</h2>
                    <p className="text-gray-600 mt-4">Click on a chatroom to join it!</p>
                    {/* TODO: Clicking on the below should populate the chat on the right */}
                    {/* We can make elements do certain things when we click on them, but we should review the exercises first to get a feel for how this works...*/}
                    <ChatList chatrooms={chatrooms} updateMessages={setMessages} updateActiveChatroom={setActiveChatroom}/>
                </div>

                <div className="bg-white p-6 rounded-lg outline outline-black md:col-span-2">
                    {/* Display messages from the active chatroom */}
                    <h2 className="text-xl font-bold text-gray-800">{activeChatName}</h2>
                    <Chatroom messages={messages} updateMessages={setMessages} chatId={activeChatroom}/>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;