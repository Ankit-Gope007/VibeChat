"use client"
import React from 'react'
import { Input } from '@/components/ui/input'
import { IoIosAdd } from "react-icons/io";
import { Button } from "@/components/ui/button"
import { useRef, useState, useEffect } from 'react';
import { updateProfileRoute } from '@/apiRoutes';
import './page.css'
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import ProtectedRoute from '@/component/ProtectedRoute.js';
import Loading from '@/component/loader.js';




const Page = () => {
    const fileInput = useRef(null)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [image, setImage] = useState('pfp1.svg')
    const [pfp1, setPfp1] = useState(true);
    const [pfp2, setPfp2] = useState(false);
    const [pfp3, setPfp3] = useState(false);
    const [pfp4, setPfp4] = useState(false);
    const router = useRouter();
    const { setUser } = useAuthStore()
    const [loading, setLoading] = useState(true)
    const accessToken = useAuthStore.getState().user?.accessToken;
      const [token, setToken] = useState(null);

  useEffect(() => {
    // Runs only in the browser
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
  }, []);


    useEffect(() => {

        if (!sessionStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn") === "false") {

            router.push('/')
        }
        else {
            setLoading(false)
        }
    }, [])

    const handleSaveInfo = async () => {
        const formData = new FormData()
        if (!firstName || !lastName || !image) {
            toast.error("All fields are required");
            return;
          }
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("image", image);
        console.log({formData})
        const response = await axios.post(updateProfileRoute, 
        {
            firstName: firstName,
            lastName: lastName,
            image: image
        }
        , {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
        if (response.status === 200) {
            setUser(response.data.data)
            console.log(response.data.data)
            toast.success('Profile updated successfully')
            router.push('/chat')
        }
    }
    const handlePfp1 = () => {
        setPfp1(true);
        setPfp2(false);
        setPfp3(false);
        setPfp4(false);
        setImage('pfp1.svg')
    }
    const handlePfp2 = () => {
        setPfp1(false);
        setPfp2(true);
        setPfp3(false);
        setPfp4(false);
        setImage('pfp2.svg')
    }
    const handlePfp3 = () => {
        setPfp1(false);
        setPfp2(false);
        setPfp3(true);
        setPfp4(false);
        setImage('pfp3.svg')
    }
    const handlePfp4 = () => {
        setPfp1(false);
        setPfp2(false);
        setPfp3(false);
        setPfp4(true);
        setImage('pfp4.svg')
    }

    return (
        <>
  {loading ? (
    <Loading />
  ) : (
    <div className="overflow-auto min-h-screen w-full flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-4xl bg-white border rounded-2xl shadow-2xl">
        <div className="text-center py-6 px-4">
          <h1 className="text-3xl sm:text-4xl font-bold">Let us set up your profile</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 px-6 pb-8">
          {/* Avatar Selection */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <h2 className="text-lg mb-4 font-semibold">Choose Your Avatar</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div
                className={`pfp w-20 h-20 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer ${
                  pfp1 && "ring-4 ring-blue-500"
                }`}
                onClick={handlePfp1}
              >
                <img src="pfp1.svg" alt="pfp1" className="w-16 h-16" />
              </div>
              <div
                className={`pfp w-20 h-20 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer ${
                  pfp2 && "ring-4 ring-blue-500"
                }`}
                onClick={handlePfp2}
              >
                <img src="pfp2.svg" alt="pfp2" className="w-16 h-16" />
              </div>
              <div
                className={`pfp w-20 h-20 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer ${
                  pfp3 && "ring-4 ring-blue-500"
                }`}
                onClick={handlePfp3}
              >
                <img src="pfp3.svg" alt="pfp3" className="w-16 h-16" />
              </div>
              <div
                className={`pfp w-20 h-20 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer ${
                  pfp4 && "ring-4 ring-blue-500"
                }`}
                onClick={handlePfp4}
              >
                <img src="pfp4.svg" alt="pfp4" className="w-16 h-16" />
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-1/2">
            <label className="block mb-2 ml-1 text-sm font-medium">First Name</label>
            <Input
              className="rounded-full border-none shadow-md mb-4 bg-gray-50"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="block mb-2 ml-1 text-sm font-medium">Last Name</label>
            <Input
              className="rounded-full border-none shadow-md mb-6 bg-gray-50"
              onChange={(e) => setLastName(e.target.value)}
            />

            <Button
              className="bg-blue-600 w-full h-12 hover:bg-blue-700 active:bg-blue-900 text-white font-semibold rounded-full shadow-md transition duration-200"
              onClick={handleSaveInfo}
            >
              Save Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  )}
</>

    )
}

export default Page
