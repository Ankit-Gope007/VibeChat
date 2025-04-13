import React, { use } from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { sendRequestRoute,validRequestRoute } from "@/apiRoutes";
import useAuthStore from '@/store/index.js';

const Page = ({contact}) => {
    const [vibe, setVibe] = useState(false);
    const accessToken = useAuthStore.getState().user?.accessToken;

    useEffect(() => {
        handleValidRequest();
    }, []);
    const handleVibe = async() => {
        const response = await axios.post(sendRequestRoute, {receiverId:contact._id}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
 
        if (response.status === 201) {
            console.log("Request Sent Vibe:",vibe);
            handleValidRequest();
          
        }
        console.log("Vibe:",vibe);
    };
    const handleValidRequest = async() => {
        console.log("start")
        const response = await axios.post(validRequestRoute, {recieverId :contact._id}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
        console.log("before")
        if (response.status === 200) {
            setVibe(true);
            console.log("after");
        }
        else{
            setVibe(false);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto p-4 flex items-center border-b cursor-pointer bg-white  ">
            {/* Profile Picture */}
            <div className="bg-gray-300 w-14 h-14 rounded-full flex-shrink-0">
                <img src={contact.image} alt="" />
            </div>

            {/* Name & Status */}
            <div className="ml-4 flex-1">
                <h1 className="font-bold text-lg sm:text-xl">{contact.firstName +" "+ contact.lastName}</h1>
                <p className="text-gray-500 text-sm sm:text-base">{contact.email}</p>
                <p className="text-gray-500 text-sm sm:text-base">Vibe to Chat</p>
            </div>

            {/* Button */}
            {
                !vibe?
            <button
                onClick={handleVibe}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm sm:text-base"
            >
                Vibe
            </button>:
            <button
                
                className="bg-blue-700 text-white px-4 py-2 rounded-md transition text-sm sm:text-base"
            >
                Vibed!!
            </button>}
        </div>
    );
};

export default Page;
