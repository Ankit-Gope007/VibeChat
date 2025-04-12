import React, { useState ,useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import { IoMdContact } from "react-icons/io";
import { MdFeedback } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { logoutRoute } from "@/apiRoutes";
import axios from "axios";
import { toast } from "sonner";

const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    // Toggle Sidebar
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            await axios.post(logoutRoute, null, { withCredentials: true });
            toast.success("Logged out successfully");
            sessionStorage.setItem("isLoggedIn", false);
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditProfile = () => {
        router.push("/profile");
    }

    const handleFeedback = () => {
        router.push("/feedback");
    };

    const handleAboutMe = () => {
        router.push("/aboutme");
    }


    return (
        <div className="relative ">
            {/* Hamburger Button */}
            <button
                className="fixed top-3 left-4 z-50 p-2 bg-white "
                onClick={toggleSidebar}
            >
                <FaBars className="text-2xl text-gray-700" />
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-3/4 md:w-64 bg-white shadow-lg rounded-r-2xl transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Close Button */}
                <div className="flex justify-between  items-center p-4 border-b border-gray-300  ">
                    <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
                    <button onClick={toggleSidebar}>
                        <RxCross2 className="cursor-pointer text-2xl text-gray-600 hover:text-gray-900" />
                    </button>
                </div>

                {/* Sidebar Items */}
                <ul className="p-4 space-y-3 text-gray-700 w-full">
                    <li 
                    onClick={handleEditProfile}
                    className="p-3 flex items-center hover:bg-gray-200 rounded-lg gap-3  cursor-pointer transition"><MdEdit  className="text-xl"/> Edit Profile</li>
                    <li 
                    onClick={handleFeedback}
                    className="p-3 flex items-center hover:bg-gray-200 rounded-lg gap-3  cursor-pointer transition"><MdFeedback  className="text-xl"/> Feedback</li>
                    <li 
                    onClick={handleAboutMe}
                    className="p-3 flex items-center hover:bg-gray-200 rounded-lg gap-3  cursor-pointer transition"><IoMdContact className="text-xl"/> About Me</li>
                    <li 
                    onClick={handleLogout}
                    className="p-3 flex items-center gap-3 hover:bg-gray-200 rounded-lg cursor-pointer transition"><CiLogout className="text-xl" />Log Out</li>
                </ul>
            </div>

            {/* Overlay (closes sidebar when clicked outside) */}
            {isOpen && (
                <div
                    className="fixed inset-0  bg-opacity-25 backdrop-blur-sm z-40"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
};

export default Sidebar;