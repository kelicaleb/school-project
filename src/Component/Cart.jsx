import React, {useEffect}from 'react'
import Navbar from './Navbar'



function Cart({data})
{
   
    return(
        <>
            <Navbar/>
            <div id="Cart" className="h-screen w-screen relative flex items-center justify-center">
                {
                    data.map(users => 
                        <ul key={users.id}>
                            <li>{users.title}</li>
                        </ul>
                    )
                }
            </div>
        </>
    )
}


export default Cart 