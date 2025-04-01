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

// Authenticate calls to api routes...
import auth from '../utils/auth';

// Necessary components
import ChatList from "../components/ChatList";
import Chatroom from "../components/Chatroom";
import ErrorPage from "./ErrorPage";

// Interfaces for type protection
import { ChatroomData } from "../interfaces/ChatroomData";
import { MessageData } from "../interfaces/MessageData";

// For implementation with the socket
import socket from '../utils/socket.js';

const ChatPage = () => {
    // TODO: I want the ability to post chat messages to a chatroom
    
    const [chatrooms, setChatrooms] = useState<ChatroomData[]>([]);
    const [activeChatroom, setActiveChatroom] = useState<number>(-1);
    const [activeChatName, setActiveChatName] = useState<string>('');
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        if (loginCheck) {
            fetchChatrooms();
            // TODO: Probably need something here for fetching the chat messages of an active chat?
        }
    }, [loginCheck]);

    useEffect(() => {
        // Debug: Log socket connection state
        console.log("🔄 Checking socket connection...");
        console.log("📡 Socket connected:", socket.connected);

        const handleConnect = () => {
            console.log("✅ Socket connected:", socket.id);
            setIsConnected(true);
        };

        const handleDisconnect = () => {
            console.log("❌ Socket disconnected");
            setIsConnected(false);
        };

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);

        socket.on("connect_error", (err) => {
            console.error("Socket connection error:", err);
        });

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
        };
    }, []);

    useEffect(() => {
        console.log(`Current chatroom: ${activeChatroom}`);
        console.log("Socket connected?", socket.connected);

        if (!activeChatroom || (activeChatroom < 1) ) {
            return;
        };

        socket.emit("joinRoom", activeChatroom);

        // Listen for incoming messages
        const handleReceiveMessage = (message: MessageData) => {
            setMessages((prev) => [...prev, message]);
        };
        socket.on("receiveMessage", handleReceiveMessage);

        return () => {
            socket.emit("leaveRoom", activeChatroom); // Leave previous room
            socket.off("receiveMessage", handleReceiveMessage); // Clean up event listener
        };
        
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

    const sendMessage = (content: string, chatId: number) => {
        console.log(`ChatPage is sending a message: ${content}, ${chatId}`);
        socket.emit("sendMessage", { content: content, chatId: chatId });
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
                    <Chatroom messages={messages} sendMessage={sendMessage} chatId={activeChatroom}/>
                    <p>Socket connected: {isConnected ? "✅ Yes" : "❌ No"}</p>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;