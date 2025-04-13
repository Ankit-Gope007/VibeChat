import React from 'react'
import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { FaSearch } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import SideBar from './SideBar';
import axios from 'axios'
import {searchContactsRoute,getRequestsRoute} from '@/apiRoutes.js'
import { IoIosNotifications } from "react-icons/io";
import useAuthStore from '@/store/index.js';

const HeaderContact = ({setMenuOpen,setSearchedContacts, setViewMode ,setSearchRequests}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [back , setBack] = useState(false)
  const accessToken = useAuthStore.getState().user?.accessToken;
  const handleSearch = async (e) => {
    const query = e.target.value
    setSearchTerm(e.target.value)
    if (query.trim() !== '') {
      setViewMode('search')
      try {
        const response = await axios.post(searchContactsRoute,{searchTerm} , {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
        console.log(response.data.data.contacts)
        setSearchedContacts(response.data.data.contacts)
      } catch (error) {
        console.log(error)
      }
    }
    else {
      setViewMode('contacts')
    }

    
  }
  const handleRequestToggle = async () => {
    setViewMode('requests')
    setBack(true)
   

    const response = await axios.get(getRequestsRoute, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    // console.log("it has not passed",response.data.data.requests)
    // setSearchRequests(response.data.data.requests)
    const pendingRequests = response.data.data.requests.filter(
      (request) => request.status === "Pending"
    );
  
    console.log("Filtered Pending Requests:", pendingRequests);
    setSearchRequests(pendingRequests);

  }
  const handleBack = () => {
    setViewMode('contacts')
    setBack(false)
  }
  
  


  return (
    <div className="flex items-center gap-3 w-full border-b-1 p-2">
      
      {/* Menu Icon (Outside Search Bar) */}
      <IoMdMenu className="text-gray-600 ml-2  text-2xl cursor-pointer" />
      <SideBar/>

      {/* Search Bar Wrapper */}
      <div className="relative w-full">
        {/* Search Icon Inside Input */}
        <FaSearch className="absolute  left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />

        {/* Input Field */}
        <input
          value={searchTerm}
          onChange={handleSearch}

          className="w-[90%] pl-10 pr-3 py-2 rounded-4xl focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300 "
          placeholder="Search Contact"
        />
        {
          !back ?
          <IoIosNotifications
            onClick={handleRequestToggle}
            className="absolute right-0 ml-2  top-1/2 transform -translate-y-1/2 text-gray-700 text-3xl cursor-pointer"/>:
            <RxCross2 onClick={handleBack}
            className="absolute right-0 ml-2  top-1/2 transform -translate-y-1/2 text-gray-700 text-3xl cursor-pointer" />

        }
      </div>
    </div>
  )
}

export default HeaderContact
