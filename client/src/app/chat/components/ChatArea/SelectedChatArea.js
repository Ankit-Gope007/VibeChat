import React from 'react'
import ChatHeader from './componets/ChatHeader'
import TypingArea from './componets/TypingArea'
import { useAuthStore } from '@/store'


const SelectedChatArea = ({ setShowChat }) => {
    const {openedContact} =useAuthStore()
  return (
    <div className="w-full h-screen flex flex-col">
    {/* Fixed Chat Header at the Top */}
    <div className="w-full bg-white shadow-md z-10 fixed top-0">
      <ChatHeader setShowChat={ setShowChat } contact = {openedContact} />
    </div>
  
    {/* Chat Messages Area (Takes Remaining Space)
    <div className="flex-1 overflow-y-auto mt-[60px] mb-[60px]">
      <ChatMessages />
    </div> */}
  
    {/* Fixed Typing Area at the Bottom */}
    <div className="w-full bg-white shadow-md z-10 fixed bottom-0">
      <TypingArea />
    </div>
  </div>
  )
}

export default SelectedChatArea