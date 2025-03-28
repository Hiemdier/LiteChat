// Boiling down a react component to its basics, we have a function
// The function returns "HTML", and we do an export default on it

// Any react component we build in pages is placed there because it referred to by our
// router. (See main.tsx)

// Any react component we build in components is utilized in pages.
// To keep things simple, we can build things entirely within pages first, and then 
// subdivide and put things in components later for tidiness

import { useState, useEffect, useLayoutEffect } from "react";
import { getChatrooms } from "../api/chatroomAPI";
import auth from '../utils/auth';
import ChatList from "../components/ChatList";

const ChatPage = () => {
    
    const [chatrooms, setChatrooms] = useState([]); // I need to define an interface for this...
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
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    const fetchChatrooms = async () => {
        try {
            const data = await getChatrooms();
            setChatrooms(data)
        } catch (err) {
            console.error('Failed to retrieve chatrooms:', err);
            setError(true);
        }
    }

    if (error) {
        return <ErrorPage />;
    }

    return (
        <>
        <ChatList chatrooms={chatrooms} />
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg outline outline-black">
                    <h2 className="text-xl font-bold text-gray-800">Left Column</h2>
                    <p className="text-gray-600 mt-4">This is the content for the left column. You can add more elements here.</p>
                </div>

                <div className="bg-white p-6 rounded-lg outline outline-black">
                    <h2 className="text-xl font-bold text-gray-800">Right Column</h2>
                    <p className="text-gray-600 mt-4">This is the content for the right column. You can also add more elements here.</p>
                </div>
            </div>
        </div>
        </>
    );
};

export default ChatPage;