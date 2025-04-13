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
        // <>

        //     {loading ? <Loading /> :
        //         <div className='overflow-auto min-h-screen min-w-screen flex items-center justify-center'>
        //             <div className='h-[800px] lg:h-[500px] w-[80%] lg:2/4  border rounded-2xl shadow-2xl ' >
        //                 <div>
        //                     <h1 className='p-10 text-4xl font-bold text-center'>Lets Set up Your Profile</h1>
        //                 </div>
        //                 <div className='flex w-full gap-5 h-[300px] flex-col  lg:flex-row '
        //                 >
        //                     <div className=' w-full lg:w-1/2  h-[250px] gap-5   flex flex-col items-center flex-wrap mb-[70px] '>
        //                         <div className={`pfp w-[80px]  h-[80px] mt-5 rounded-full bg-gray-200 flex justify-center items-center' ${pfp1 && 'k'}`}
        //                             onClick={handlePfp1}
        //                         >
        //                             <img src="pfp1.svg" alt="" />
        //                         </div>
        //                         <div className={`pfp w-[80px]  h-[80px] mt-5 rounded-full bg-gray-200 flex justify-center items-center' ${pfp2 && 'k'}`}
        //                             onClick={handlePfp2}>
        //                             <img src="pfp2.svg" alt="" />
        //                         </div>
        //                         <div className={`pfp w-[80px]  h-[80px] mt-5 rounded-full bg-gray-200 flex justify-center items-center' ${pfp3 && 'k'}`}
        //                             onClick={handlePfp3}>
        //                             <img src="pfp3.svg" alt="" />
        //                         </div>
        //                         <div className={`pfp w-[80px]  h-[80px] mt-5 rounded-full bg-gray-200 flex justify-center items-center' ${pfp4 && 'k'}`}
        //                             onClick={handlePfp4}>
        //                             <img src="pfp4.svg" alt="" />
        //                         </div>

        //                         <h1 className='absolute my-[250px] text-2xl text-center '>Choose Your Avatar</h1>
        //                     </div>
        //                     <div className='  mx-5 lg:w-1/2'>
        //                         <h1 className='ml-4 mt-7'>First Name</h1>
        //                         <Input
        //                             className={'rounded-full border-none shadow-lg my-3  bg-gray-50'}
        //                             onChange={(e) => setFirstName(e.target.value)}
        //                         // placeholder={'First Name'}
        //                         />
        //                         <h1 className='ml-4 mt-7'>Last Name</h1>
        //                         <Input
        //                             className={'rounded-full border-none shadow-lg my-3 mt-5 bg-gray-50'}
        //                             onChange={(e) => setLastName(e.target.value)}
        //                         // placeholder={'Last Name'}
        //                         />
        //                         <Button className="bg-blue-600 w-full h-[50px] hover:bg-blue-700 active:bg-blue-900 shadow-lg my-3"
        //                             onClick={handleSaveInfo}
        //                         >Save Info</Button>
        //                     </div>

        //                 </div>
        //             </div>
        //         </div>}
        // </>
        <>
        {loading ? <Loading /> :
            <div className='overflow-auto min-h-screen w-full flex items-center justify-center p-4'>
                <div className='w-full max-w-4xl border rounded-2xl shadow-2xl bg-white'>
                    <div className='text-center py-8 px-4'>
                        <h1 className='p-10 text-4xl font-bold text-center'>Let us set up your profile</h1>
                    </div>

                    <div className='flex flex-col lg:flex-row gap-8 px-6 pb-8'>
                        {/* Avatar Selection */}
                        <div className='w-full lg:w-1/2 flex flex-col items-center'>
                            <h2 className='text-lg mb-4 font-semibold'>Choose Your Avatar</h2>
                            <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                                <div className={`pfp w-20 h-20 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer ${pfp1 && 'k'}`}
                                    onClick={handlePfp1}>
                                    <img src="pfp1.svg" alt="pfp1" />
                                </div>
                                <div className={`pfp w-20 h-20 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer ${pfp2 && 'k'}`}
                                    onClick={handlePfp2}>
                                    <img src="pfp2.svg" alt="pfp2" />
                                </div>
                                <div className={`pfp w-20 h-20 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer ${pfp3 && 'k'}`}
                                    onClick={handlePfp3}>
                                    <img src="pfp3.svg" alt="pfp3" />
                                </div>
                                <div className={`pfp w-20 h-20 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer ${pfp4 && 'k'}`}
                                    onClick={handlePfp4}>
                                    <img src="pfp4.svg" alt="pfp4" />
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className='w-full lg:w-1/2'>
                            <label className='block mb-2 ml-1 text-sm font-medium'>First Name</label>
                            <Input
                                className='rounded-full border-none shadow-md mb-4 bg-gray-50'
                                onChange={(e) => setFirstName(e.target.value)}
                            />

                            <label className='block mb-2 ml-1 text-sm font-medium'>Last Name</label>
                            <Input
                                className='rounded-full border-none shadow-md mb-6 bg-gray-50'
                                onChange={(e) => setLastName(e.target.value)}
                            />

                            <Button className="bg-blue-600 w-full h-12 hover:bg-blue-700 active:bg-blue-900 shadow-md"
                                onClick={handleSaveInfo}>
                                Save Info
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>


    )
}

export default Page
