import React, {useState, useEffect}from 'react'
import Navbar from './Navbar'
import axios from 'axios'



function Cart()
{
    const [products, setProducts]  =  useState([])
    useEffect(() => 
    {
        axios.get("http://localhost:8000/products")
        .then((res) => setProducts(res.data))   
    })
    const handleRemove = (id) => 
    {
        console.log(id)
        axios.delete(`http://localhost:8000/delete/${id}`)
        .then((res) => console.log("deleted successfully"))
    }
   
    return(
        <>
            <Navbar/>
            <div>
                <div className="relative flex items-center justify-center">
                    <h1 className="font-bold pt-12 text-6xl font-serif pr-40 text-cyan-600">Cart</h1>
                </div>
            </div>
            <div className="grid grid-cols-3 ">
                {
                    
                        products.map(data => 
                             <>
                             
                               <div className="grid grid-cols-2 shadow-xl shadow-cyan-600 pl-24 h-96 w-80  hover:shadow-cyan-400">
                               <div className="pt-12 pl-2" key={data.carttId}>
                                <img  className="h-24 w-24 " src={data.image} key={data.cartId}/>
                                      <p className="font-serif text-sm">{data.title}</p>
                                     <div className="pt-2 left-0 right-0">
                                         <button onClick={() => handleRemove(data.cartId)} className="font-serif border border-red-600 hover:bg-red-600 hover:text-white w-24 h-10 rounded-lg">Remove</button>
                                     </div>
                                 </div>
                               </div>
                             
                             </>
                         )
                 
                }
            </div>
        </>
    )
}


export default Cart 