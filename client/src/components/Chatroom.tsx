// As a general comment, this component is responsible for the retrieval of messages from the given active chatroom.

import { useState, useEffect, useLayoutEffect, FormEvent, ChangeEvent } from "react";
import type { MessageData } from "../interfaces/MessageData";
import { retrieveMessages, postNewMessage } from "../api/msgAPI";

interface ChatroomProps {
    messages: MessageData[];
    chatId: number,
    updateMessages: any
}

const Chatroom: React.FC<ChatroomProps> = ({ messages, chatId, updateMessages }) => {

    const [draftMessage, setDraftMessage] = useState<string>('');

    const sendMessage = async (chatId: number, content: string) => {
        console.log(`Sending message to chatroom ${chatId}: ${content}`);
        const data = await postNewMessage(chatId, content);

        if (data) {
            updateMessages(await retrieveMessages(chatId));
        }
        return data;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!draftMessage.trim()) return; 

        try {
            await sendMessage(chatId, draftMessage);
            setDraftMessage("");
        } catch (error) {
            console.error("Failed to send message: ", error);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDraftMessage(value);
    };

    return (<>
    {messages && messages.map((msg) => (
        <div key={msg.id} className='bg-white p-3 mb-5 bg-gray-400 rounded-lg outline outline-black'>
            <h4>{msg.ownerDetails.username}</h4>
            <p>{msg.content}</p>
        </div>
    ))}

    {/* Allow the user to input messages to add to the chatroom */}
    {chatId > 0 && <div className='form-container'>
        <form className='form login-form grid grid-cols-3 flex items-center' onSubmit={handleSubmit}>
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