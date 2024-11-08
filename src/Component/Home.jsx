import React from 'react'
import Navbar from './Navbar'


function Home()
{
    return(
        <>
            <Navbar/>
            <div className="w-screen h-screen">
                <h1 className="pt-24">
                    this Home Page 
                </h1>
            </div>
        </>
    )
}

export default Home