import React, { useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useAuthStore } from '@/store'

const ChatHeader = ({ setShowChat, contact, setMessages}) => {
    const { openedContact } = useAuthStore()
    useEffect(() => {
        console.log("Selected:", contact);
        console.log("Opened Contact just now:", openedContact.firstName);
    }, [openedContact])

    return (
        <div className='bg-white w-full h-[61px] border-b-1 flex'>
            <div className='w-[50px] h-[50px] bg-gray-400 rounded-full ml-5 mt-1'>
                <img src={openedContact.image} alt="" />
            </div>
            <div className='ml-5 mt-3'>
                <h1 className='font-bold text-[20px]'>
                    {openedContact.firstName + " " + openedContact.lastName}
                </h1>
            </div>
            <div
                onClick={() => setShowChat(false)}
                className=' absolute text-[30px] right-[30px] top-[15px] cursor-pointer'>
                <RxCross2
                
                />
            </div>

        </div>
    )
}

export default ChatHeader