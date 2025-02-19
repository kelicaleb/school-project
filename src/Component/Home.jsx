import React from 'react'
import Navbar from './Navbar'
import './index.module.css'


function Home()
{
   
    return(
        <>
            <Navbar/>
            <div className="w-screen bg-[url(https://images.unsplash.com/photo-1551201602-3f9456f0fbf8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
            <div className="h-screen w-screen   flex relative items-center justify-center  ">
                <h1 className="pt-24  hover:text-pink-600 ">
                    this Home Page 
                </h1>
            </div>
            </div>
        </>
    )
}

export default Home