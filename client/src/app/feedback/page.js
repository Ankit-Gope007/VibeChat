"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import { feedbackRoute } from "@/apiRoutes";

const Page = () => {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setMessage("");
        }, 3000);
      }
    // console.log(message);
    const response = await axios.post(feedbackRoute,{message} , { withCredentials: true });
    if (response.status === 201) {
      console.log("Feedback sent");
    }


  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-3xl p-8 max-w-lg w-full text-center"
      >
        <h1 className="text-3xl font-bold text-blue-600 mb-4">I Value Your Feedback!</h1>
        <p className="text-gray-500 mb-6">Tell us about your experience.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            className="w-full h-32 p-4 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your feedback here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-lg font-semibold shadow-lg hover:bg-blue-600 transition-all"
            type="submit"
          >
            Send Feedback <FaPaperPlane />
          </motion.button>
        </form>
        {submitted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-green-600 font-semibold"
          >
            Thank you for your feedback! 💙
            <br />
            <a href="/chat" className="text-blue-600 text-md">Go Back to the Chat Page</a>
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default Page;
