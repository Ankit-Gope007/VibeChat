import React from 'react'
import SideBar from './contactArea/SideBar.js'
import { useState, useEffect } from 'react'
import HeaderContact from './contactArea/HeaderContact.js'
import ContactCards from './contactArea/ContactCards.js'
import NewContactCard from './contactArea/NewContactCard.js'
import NewRequestCard from './contactArea/NewRequestCard.js'
import axios from 'axios'
import { getContactsRoute } from '@/apiRoutes'
import useAuthStore from '@/store/useAuthStore';

const Contact = ({ setShowChat }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchedContacts, setSearchedContacts] = useState([])
  const [searchRequests, setSearchRequests] = useState([])
  const [chatArea, setChatArea] = useState(false)
  const [contacts, setContacts] = useState([])
  const [viewMode, setViewMode] = useState('contacts') // 'contacts', 'search', 'requests', 'empty'
  const accessToken = useAuthStore.getState().user?.accessToken;

  useEffect(() => {
    handleGetContacts()
  }, [viewMode])

  const handleGetContacts = async () => {
    // const response = await axios.get(getContactsRoute, { withCredentials: true })
     const response = await axios.get(getContactsRoute, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      console.log(response.data.data.contactInfo)
      setContacts(response.data.data.contactInfo)
    }
  }



  const renderContent = () => {
    if (viewMode === 'empty') {
      return (
        <div className='w-full h-full'>
          <HeaderContact setMenuOpen={setMenuOpen} setSearchedContacts={setSearchedContacts} setViewMode={setViewMode} setSearchRequests={setSearchRequests} />
          <div className='text-md border h-full font-light w-full flex justify-center items-center text-gray-400 text-center'>
            <h1 className='text-xl w-2/3'>
              If you are seeing this, it means that the contact is empty, Please Search and add a contact to start chatting.
            </h1>
          </div>

        </div>

      )
    }

    if (viewMode === 'search') {
      return (
        <>
          <HeaderContact setMenuOpen={setMenuOpen} setSearchedContacts={setSearchedContacts} setViewMode={setViewMode} setSearchRequests={setSearchRequests} />
          <div className="mt-4">
            {searchedContacts.length > 0 ? (
              searchedContacts.map((contact) => (
                <NewContactCard key={contact.id} contact={contact} />
              ))
            ) : (
              <p className="text-gray-500">No contacts found.</p>
            )}
          </div>
        </>
      )
    }

    if (viewMode === 'requests') {
      return (
        <>
          <HeaderContact setMenuOpen={setMenuOpen} setSearchedContacts={setSearchedContacts} setViewMode={setViewMode} setSearchRequests={setSearchRequests} />
          <div className="mt-4">
            {searchRequests.length > 0 ? (
              searchRequests.map((request) => (
                console.log("it has passed", searchRequests),
                <NewRequestCard key={request.id} request={request} />
              ))
            ) : (
              <p className="text-gray-500">No contact requests found.</p>
            )}
          </div>
        </>
      )
    }

    if (viewMode === 'contacts') {
      return (
        <>
          <HeaderContact setMenuOpen={setMenuOpen} setSearchedContacts={setSearchedContacts} setViewMode={setViewMode} setSearchRequests={setSearchRequests} />

          <div className="mt-4">
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <ContactCards key={contact.id} contact={contact} setShowChat={setShowChat} />
              ))
            ) : (
              <p className="text-gray-500">No contacts found.</p>
            )}
          </div>

          {/* <ContactCards setShowChat={setShowChat} setContacts={setContacts} /> */}
        </>
      )
    }

    return null
  }

  return (

    <>
      {renderContent()}
    </>

    // <div className='w-full h-full  '>





  )
}

export default Contact
