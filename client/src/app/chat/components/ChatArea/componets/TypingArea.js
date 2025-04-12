"use client"
import React from 'react'
import { useState, useEffect, useRef } from "react"
import { Input } from '@/components/ui/input'
import { GrAttachment } from 'react-icons/gr'
import { RiEmojiStickerLine } from 'react-icons/ri'
import { IoSend } from 'react-icons/io5'
import EmojiPicker from 'emoji-picker-react'

const TypingArea = () => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [message, setMessage] = useState('')
    const [emoji, setEmoji] = useState('')

    const emojiRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setShowEmojiPicker(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    },
        [emojiRef])

    const handleAddEmoji = (emoji) => {
        setMessage((msg) => msg + emoji.emoji)
    }


    const onEmojiClick = (event, emojiObject) => {
        setEmoji(emojiObject.emoji)
    }


    const sendMessage = () => {
        setMessage('')
        console.log("Message sent")
        console.log(message)
    }






    return (
        <div className="w-full h-[55px] bg-white flex items-center px-4 border-t gap-2">
            {/*Input box */}
            <div className="flex-1 flex items-center bg-gray-100 px-4 rounded-full md:max-w-[65%] lg:max-w-[65%]">
                <input
                    placeholder="Type a message..."
                    className="flex-1 h-[40px] border-none outline-none bg-transparent text-sm font-light"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>

            {/* Emoji icon */}
            <button
                className="text-gray-400 hover:text-gray-600 transition-all p-2"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >

                <RiEmojiStickerLine className="text-xl" />
            </button>
            <div className="absolute text-sm bottom-16  lg:right-[370px]" ref={emojiRef}
            >
                <EmojiPicker theme='light'
                    open={showEmojiPicker}
                    onEmojiClick={handleAddEmoji}
                    autoFocusSearch={true}
                    width={300}
                    height={500}


                />
            </div>

            {/* Attachment Icon */}
            <button className="text-gray-400 hover:text-gray-600 transition-all p-2">
                <GrAttachment className="text-xl" />
            </button>


            {/* Send Button */}
            <button 
            onClick={sendMessage}
            className="text-white bg-blue-500 hover:bg-blue-600 transition-all p-2 rounded-full">
                <IoSend className="text-xl" />
            </button>
        </div>

    )
}

export default TypingArea