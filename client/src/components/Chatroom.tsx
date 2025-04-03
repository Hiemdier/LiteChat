// As a general comment, this component is responsible for the retrieval of messages from the given active chatroom.

import { useState, useEffect, useRef, ChangeEvent } from "react";
import type { MessageData } from "../interfaces/MessageData";

interface ChatroomProps {
    messages: MessageData[];
    chatId: number,
    sendMessage: any
}

const Chatroom: React.FC<ChatroomProps> = ({ messages, chatId, sendMessage }) => {

    const [draftMessage, setDraftMessage] = useState<string>('');

    // This method needs to get modified to align with our socket usage...
    const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (draftMessage) {
            sendMessage(draftMessage, chatId);
        }
        setDraftMessage("");
    };

    const chatEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]); // Runs every time messages update

    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();

    //     if (!draftMessage.trim()) return; 

    //     try {
    //         await sendMessage(chatId, draftMessage);
    //         setDraftMessage("");
    //     } catch (error) {
    //         console.error("Failed to send message: ", error);
    //     }
    // }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = e.target;
        setDraftMessage(value);
    };

    const formatDate = (isoString: string): string => {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, 
        }).replace(',', '');
    };

    return (<>
    <div className="h-192 max-h-192 overflow-auto p-3">
    {(messages && messages.length > 0) ? messages.map((msg) => (
        <><div key={msg.id} className='shrink bg-gray-200 p-3 mb-3 bg-gray-400 rounded-lg outline outline-black'>
            <h5 className='font-bold inline'>{msg.ownerDetails.username}</h5><p className='inline !text-xs'> {formatDate(msg.createdAt)}</p>
            <p>{msg.content}</p>
            <p></p>
        </div>
        <div ref={chatEndRef}/></>
    )) : <p>No messages here yet! Be the first one to chat.</p>}</div>

    {/* Allow the user to input messages to add to the chatroom */}
    {chatId > 0 && <div className='form-container'>
        <form className='form login-form grid grid-cols-1 md:grid-cols-3 gap-0 flex items-center' onSubmit={handleSendMessage}>
        {/* Message input field */}
        <div className="form-group md:col-span-2">
          <input 
            className="form-input"
            type='text'
            name='msgContent'
            value={draftMessage || ''}
            onChange={handleChange}
            placeholder="Type your message here"
          />
        </div>
        <div className="form-group md:col-span-1">
          <button className="px-6 py-3 text-base bg-gray-500 text-white rounded-lg" type='submit'>Send Message</button>
        </div>
        </form>
    </div>}
    </>);

}

export default Chatroom;