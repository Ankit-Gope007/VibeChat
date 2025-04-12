import React, { use } from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { getContactsRoute } from '@/apiRoutes'
import { useAuthStore } from '@/store'

const ContactCards = ({setShowChat ,contact}) => {
    const [selectedContact, setSelectedContact] = useState(false)
    const [image , setImage] = useState('')
    const {openedContact,setOpenedContact} = useAuthStore()

    useEffect(() => {
        pfpimage()
    }, [])

    const pfpimage = async () => { 
        const pfp = contact.image
        // console.log(pfp)
        // if (pfp === '1'){
        //     setImage('pfp1.svg')
        // }
        // else if (pfp === '2'){
        //     setImage('pfp2.svg')
        // }
        // else if (pfp === '3'){
        //     setImage('pfp3.svg')
        // }
        // else if (pfp === '4'){
        //     setImage('pfp4.svg')
        // }

    }


  return (
    <div 
    onClick={()=>{
        setShowChat(true);
        setOpenedContact(contact);
        console.log("Selected:",contact);
        console.log("Opened Contact:",openedContact);
    }}
    className={`w-full h-[70px] flex items-center border-b-1 cursor-pointer hover:scale-105 ${selectedContact? "bg-gray-200":""}
    
    `}>
        <div className='bg-gray-300 w-[60px] h-[60px] ml-3 rounded-full'>
            <img src={contact.image} alt="" />
        </div>
        <div className='ml-5'>
            <h1 className='font-bold text-xl'>{contact.firstName+ " " + contact.lastName}</h1>
            <p className='font-light text-gray-400'>{contact.email}</p>
        </div>
    </div>
  )
}

export default ContactCards