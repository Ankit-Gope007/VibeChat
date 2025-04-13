"use client"
import React from 'react'
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { signUpRoute, loginRoute } from '@/apiRoutes.js'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/index.js'


const Page = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()
  const { setUser } = useAuthStore()

  useEffect(() => {

    sessionStorage.setItem("isLoggedIn", false);

  }, [])


  const validateSignUp = () => {
    if (!email.length) {
      toast.error("Email is required")
      return false
    }
    if (!password.length) {
      toast.error("Password is required")
      return false
    }
    if (confirmPassword !== password) {
      toast.error("Password does not match")
      return false
    }
    return true
  }

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required")
      return false
    }
    if (!password.length) {
      toast.error("Password is required")
      return false
    }
    return true
  }

  const handleSignUp = async () => {
    if (validateSignUp()) {
      const response = await axios.post(signUpRoute, { email, password }, { withCredentials: true })
      if (response.status === 201) {
        // setUserInfo(response.data.data.createdProfile)
        // console.log(response.data.data.createdProfile)
        setUser(response.data.data)
        localStorage.setItem("accessToken",response.data.data.profile.accessToken);
        sessionStorage.setItem("isLoggedIn", true);
        toast.success("Sign Up successfully")
        router.push("/profile")

      }
    }

  }

  const handleLogin = async () => {
    if (validateLogin()) {
      const response = await axios.post(loginRoute, { email, password }, { withCredentials: true })
      if (response.status === 200) {
        // setUserInfo(response.data.data.profile)
        // console.log(response.data.data.profile.profileSetup)
        sessionStorage.setItem("isLoggedIn", true);
        setUser(response.data.data)
        localStorage.setItem("accessToken",response.data.data.profile.accessToken);
        toast.success("Logged In successfully")
        response.data.data.profile.profileSetup ?
          router.push("/chat") : router.push("/profile")
      }
    }
  }

  return (
    <>
      <div className='flex items-center  min-h-screen min-w-screen'>
        <div className='w-1/2 hidden lg:block'>
          <img src="AuthPage.svg" alt="Home Image" className="p-10 h-[600px] w-full " />
        </div>
        <div 
        className=' w-full lg:w-1/2  flex flex-col justify-center min-h-screen items-center '>
          <h1 className='text-center absolute text-6xl font-bold top-[100px] '>Welcome To VIBEChat</h1>
          <Tabs defaultValue="login" className="  flex justify-center items-center flex-col w-[90%] lg:w-[400px] rounded-2xl shadow-xl pt-5" >
            <TabsList className="">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signUp">SignUp</TabsTrigger>
            </TabsList>
            <TabsContent value="login" >
              <h1 className='mb-9 pt-4 font-light'>If You Already have an account , Just Login</h1>
              <Input type="email" placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full  border-none shadow-lg my-3 w-[300px] lg:w-[350px] " />
              <Input type="password" placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-full border-none shadow-lg mb-6" />
              <Button
                onClick={handleLogin}
                className="rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-900 text-white w-full py-2 mb-6">Login</Button>
            </TabsContent>
            <TabsContent value="signUp">
              <h1 className='mb-9 pt-4 font-light text-center'>Create an account to start chatting</h1>
              <Input type="email" placeholder="Email"
                className="rounded-full border-none shadow-lg my-3 w-[300px] lg:w-[350px]  "
                onChange={(e) => setEmail(e.target.value)} />
              <Input type="password" placeholder="Password"
                className="rounded-full border-none shadow-lg mb-3"
                onChange={(e) => setPassword(e.target.value)} />
              <Input type="password" placeholder="Confirm Password"
                className="rounded-full border-none shadow-lg mb-6"
                onChange={(e) => setConfirmPassword(e.target.value)} />
              <Button
                onClick={handleSignUp}
                className="rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-900 text-white w-full py-2 mb-6">Sign Up</Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>

    </>
  )
}

export default Page
