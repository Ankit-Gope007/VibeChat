import React from 'react'
import EmptyChatArea from './ChatArea/EmptyChatArea.js'
import SelectedChatArea from './ChatArea/SelectedChatArea.js'
import Image from 'next/image'
import { useAuthStore } from '@/store/index.js'

const Container = ({setShowChat}) => {
  const { openedContact } = useAuthStore()
  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image */}
      <Image
        src="/background.jpg"
        alt="Background"
        fill
        className="object-cover opacity-60"
      />

      {/* Content Area (Ensuring it stays on top) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-6xl font-bold z-10">
       { openedContact?
        <SelectedChatArea setShowChat={setShowChat} />:
        <EmptyChatArea />}
      </div>
    </div>
  )
}

export default Container