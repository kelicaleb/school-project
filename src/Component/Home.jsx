import React from 'react'
import Navbar from './Navbar'
import Cart from './Cart'


function Home()
{
    let component;
    switch(window.location.path){
        case"/schoolHome#Cart":
        component = <Cart/>
        break
    }
    return(
        <>
            <Navbar/>
            <div className="w-screen h-screen">
                <h1 className="pt-24">
                    this Home Page 
                </h1>
            </div>
            {component}
        </>
    )
}

export default Home