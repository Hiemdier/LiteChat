// As a general comment, this component is responsible for the retrieval of messages from the given active chatroom.

import { useState, useEffect, useLayoutEffect, FormEvent, ChangeEvent } from "react";
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
        sendMessage(chatId, draftMessage);
        setDraftMessage("");
    };

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

    return (<>
    <div className="h-192 max-h-192 overflow-auto p-3">
    {messages && messages.map((msg) => (
        <div key={msg.id} className='shrink bg-gray-200 p-3 mb-3 bg-gray-400 rounded-lg outline outline-black'>
            <h4>{msg.ownerDetails.username}</h4>
            <p>{msg.content}</p>
        </div>
    ))}</div>

    {/* Allow the user to input messages to add to the chatroom */}
    {chatId > 0 && <div className='form-container'>
        <form className='form login-form grid grid-cols-3 flex items-center' onSubmit={handleSendMessage}>
        {/* Message input field */}
        <div className="form-group col-span-2">
          <input 
            className="form-input"
            type='text'
            name='msgContent'
            value={draftMessage || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button className="px-6 py-3 text-base bg-blue-500 text-white rounded-lg" type='submit'>Send Message</button>
        </div>
        </form>
    </div>}
    </>);

}

export default Chatroom;