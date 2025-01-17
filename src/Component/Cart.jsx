import React, {useEffect}from 'react'
import Navbar from './Navbar'



function Cart()
{
   
    return(
        <>
            <Navbar/>
            <div>
                <div className="relative flex items-center justify-center">
                    <h1 className="font-bold pt-12 text-6xl font-serif pr-40 text-cyan-600">Cart</h1>
                </div>
            </div>
        </>
    )
}


export default Cart 