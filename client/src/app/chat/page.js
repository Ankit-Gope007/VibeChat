'use client'
import React from 'react'
import Contact from './components/Contact.js'
import Container from './components/Container.js'
import ProtectedRoute from '@/component/ProtectedRoute.js'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Loading from '@/component/loader.js'

const page = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [ShowChat, setShowChat] = useState(false)
    
    useEffect(() => {
        if (!sessionStorage.getItem("isLoggedIn")||sessionStorage.getItem("isLoggedIn") === "false") {
            console.log('not logged in')
            router.push('/')
        }
        else {
            setLoading(false)
        }
        
    
    }, [])
    return (
        <>
           {
           loading ? <Loading /> :
           <>
           <div className='flex min-h-screen min-w-screen'>
            <div className={`lg:w-1/4 w-full lg:block  border ${ShowChat? "hidden":"block"} `}>
            <Contact setShowChat={setShowChat} />
            </div>
            <div className={`lg:w-3/4 w-full  lg:block  border ${ShowChat? "block":"hidden"}`} >
            <Container setShowChat={setShowChat} />
            </div>
           </div>
            
           </>
           }
        </>


    )
}

export default page