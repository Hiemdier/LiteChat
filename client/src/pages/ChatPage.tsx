// Boiling down a react component to its basics, we have a function
// The function returns "HTML", and we do an export default on it

// Any react component we build in pages is placed there because it referred to by our
// router. (See main.tsx)

// Any react component we build in components is utilized in pages.
// To keep things simple, we can build things entirely within pages first, and then 
// subdivide and put things in components later for tidiness

import { useState, useEffect, useLayoutEffect } from "react";

// API functions
import { retrieveChatrooms } from "../api/chatAPI";

import auth from '../utils/auth';
import ChatList from "../components/ChatList";
import ErrorPage from "./ErrorPage";

const ChatPage = () => {
    // TODO: I would like this page to redirect back to the login screen
    // when our credentials are no longer valid
    
    const [chatrooms, setChatrooms] = useState([]); // I need to define an interface for this...
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);

    useEffect(() => {
        if (loginCheck) {
            fetchChatrooms();

            // TODO: Probably need something here for fetching the chat messages of an active chat?
        }
    }, [loginCheck]);

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
    }

    if (error) {
        return <ErrorPage />;
    }

    return (
        <div className="w-screen min-h-screen p-6 border border-red-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg outline outline-black md:col-span-1">
                    <h2 className="text-xl font-bold text-gray-800">Chatrooms</h2>
                    <p className="text-gray-600 mt-4">Click on a chatroom to join it!</p>
                    {/* TODO: Clicking on the below should populate the chat on the right */}
                    {/* We can make elements do certain things when we click on them, but we should review the exercises first to get a feel for how this works...*/}
                    <ChatList chatrooms={chatrooms} updateMessages={setMessages}/>
                </div>

                <div className="bg-white p-6 rounded-lg outline outline-black md:col-span-2">
                    <h2 className="text-xl font-bold text-gray-800">Chat Information</h2>
                    {messages && messages.map((msg) => (
                        <p key={msg.id}>{msg.content}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatPage;