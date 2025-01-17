import React from 'react'
import Navbar from './Navbar'


function Home()
{
   
    return(
        <>
            <Navbar/>
            <div className="w-screen h-screen  items-center justify-center relative flex  ">
                <h1 className="pt-24  hover:text-pink-600 ">
                    this Home Page 
                </h1>
            </div>
        </>
    )
}

export default Home