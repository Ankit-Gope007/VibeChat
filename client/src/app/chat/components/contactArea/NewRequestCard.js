import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { sendRequestRoute, validRequestRoute, updateRequestRoute } from "@/apiRoutes";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from '@/store/index.js';

const Page = ({ request }) => {
    const [vibe, setVibe] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [showTick, setShowTick] = useState(false);
    const [rejected, setRejected] = useState(false);
    const [showCross, setShowCross] = useState(false);
      const accessToken = useAuthStore.getState().user?.accessToken;

    useEffect(() => {
        if (showTick) {
            const timer = setTimeout(() => setShowTick(false), 2000);
            return () => clearTimeout(timer); // cleanup
        }
        if (showCross) {
            const timer = setTimeout(() => setShowCross(false), 4000);
            return () => clearTimeout(timer);
        }
        handleValidRequest();
    }, [showTick, showCross]);
    const handleVibe = async () => {
        const response = await axios.post(sendRequestRoute, { receiverId: contact._id }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

        if (response.status === 201) {
            console.log("Request Sent Vibe:", vibe);
            handleValidRequest();

        }
        console.log("Vibe:", vibe);
    };
    const handleValidRequest = async () => {
        console.log("start")
        const response = await axios.post(validRequestRoute, { recieverId: contact._id },{
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
        else {
            setVibe(false);
        }
    };

    const handleVibeBack = async () => {
        const response = await axios.post(updateRequestRoute, { requestId: request._id, status: "Approved" },{
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
        if (response.status === 200) {
            console.log("Vibe Back Sent");
            setAccepted(true);
            setShowTick(true);
        }

    }
    const handleNoVibe = async () => {
        const response = await axios.post(updateRequestRoute, { requestId: request._id, status: "Rejected" },{
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
        if (response.status === 200) {
            console.log("No Vibe Sent");
            setRejected(true);
            setShowCross(true);

        }
    }

    if (accepted && !showTick) return null;
    if (rejected && !showCross) return null;

    return (
        <>
            {accepted && showTick && (
                <div className="w-full max-w-2xl mx-auto p-4">
                    <AnimatePresence>
                        <motion.div
                            key="tick"
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="flex justify-center items-center h-40 bg-green-100 border border-green-300 rounded-xl shadow-md"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                className="bg-green-500 text-white p-6 rounded-full"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}

            {rejected && showCross && (
                <div className="w-full max-w-2xl mx-auto p-4">
                    <AnimatePresence>
                        <motion.div
                            key="cross"
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="flex justify-center items-center h-40 bg-red-100 border border-red-300 rounded-xl shadow-md"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                className="bg-red-500 text-white p-6 rounded-full"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}

            {!accepted && !rejected && (
                <div className="w-full max-w-2xl mx-auto p-4" >
                    <div className="flex items-center justify-between border rounded-xl bg-white shadow-sm hover:shadow-md transition p-4">
                        {/* Profile Section */}
                        <div className="flex items-center">
                            <div className="bg-gray-300 w-14 h-14 rounded-full flex-shrink-0"><img src={request.sender.image} alt="" /></div>
                            <div className="ml-4">
                                <h1 className="font-semibold text-lg sm:text-xl">
                                    {request.sender.firstName + " " + request.sender.lastName}
                                </h1>
                                <p className="text-gray-500 text-sm sm:text-base">{request.sender.email}</p>
                                <p className="text-gray-500 text-sm sm:text-base">
                                    {vibe ? "Ready to chat" : "Vibe to Chat"}
                                </p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col space-y-2 lg:flex-col lg:space-y-2 lg:space-x-0 sm:flex-row sm:space-y-0 sm:space-x-2">
                            <button
                                onClick={handleVibeBack}
                                disabled={vibe}
                                className="bg-green-500 hover:bg-green-600 text-white 
               px-4 py-2 text-sm sm:text-base rounded-md cursor-pointer 
               lg:px-2 lg:py-1 lg:text-xs"
                            >
                                Vibe Back
                            </button>
                            <button
                                onClick={handleNoVibe}
                                className="bg-red-500 hover:bg-red-600 text-white 
               px-4 py-2 text-sm sm:text-base rounded-md cursor-pointer 
               lg:px-2 lg:py-1 lg:text-xs"
                            >
                                No Vibe
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;
