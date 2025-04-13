import React, { useState, useEffect } from 'react'
import ChatHeader from './componets/ChatHeader'
import TypingArea from './componets/TypingArea'
import { useAuthStore } from '@/store'
import axios from 'axios'
import { getMessagesRoute } from '@/apiRoutes'


const SelectedChatArea = ({ setShowChat }) => {
    const { openedContact, user } = useAuthStore()
    const [messages, setMessages] = useState([])
    const [showMessage, setShowMessage] = useState('')
    const [showMessages, setShowMessages] = useState([])
    const [roomId, setRoomId2] = useState('')
    const [closed, setClosed] = useState(false)

    useEffect(() => {
        const newRoomId = [user.profile._id, openedContact._id].sort().join('_');
        setRoomId2(newRoomId);
    
        const fetchMessages = async (room) => {
            try {
                console.log("Fetching chat history for room ID:", room);
                const response = await axios.get(`${getMessagesRoute + room}`);
                console.log("Response:", response.data.data.messages);
                if (response.status === 200) {
                    setMessages(response.data.data.messages);
                    setShowMessages(response.data.data.messages);
                }
            } catch (error) {
                console.error("Failed to fetch chat history", error);
            }
        };
    
        if (user?.profile?._id && openedContact?._id) {
            setMessages([]);
            setShowMessages([]);
            fetchMessages(newRoomId); // ✅ use newRoomId here, not `roomId`
        }
    }, [user, openedContact]);

    return (
        <div className="w-full h-screen flex flex-col">
            {/* Fixed Chat Header at the Top */}
            <div className="w-full bg-white shadow-md z-10 fixed top-0">
                <ChatHeader setShowChat={setShowChat} contact={openedContact}  setMessages={setMessages} />
            </div>

            {/* Chat Messages Area (Takes Remaining Space) */}
            <div className="flex-1 overflow-y-auto mt-[60px] mb-[60px] px-4 py-2 space-y-2">
                { showMessages.map((msg, index) => {
                    const isSentByMe = msg.sender === user.profile._id;

                    return (
                        <div
                            key={index}
                            className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs sm:max-w-sm md:max-w-md px-4 py-2 rounded-2xl shadow ${isSentByMe
                                        ? 'bg-blue-500 text-white rounded-br-none'
                                        : 'bg-black text-white rounded-bl-none'
                                    }`}
                            >
                                <p className="text-sm">{msg.message}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Fixed Typing Area at the Bottom */}
            <div className="w-full bg-white shadow-md z-10 fixed bottom-0">
                <TypingArea setShowMessage={setShowMessage} setShowMessages={setShowMessages} setRoomId2={setRoomId2} />
            </div>
        </div>
    )
}

export default SelectedChatArea