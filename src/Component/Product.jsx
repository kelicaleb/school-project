import React, {useState, useEffect } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { BsCart4 } from "react-icons/bs";


function Product()
{
    const [data, setData ] = useState([])
    const [search, setSearch ] = useState([])
    const [searched, setSearched ] = useState([])
    const [control, setControl ] = useState(true)
    const [cart, setCart ] = useState([])
   
    useEffect(() => 
    {
        axios.get("https://fakestoreapi.com/products")
        .then((res) => setData(res.data))
        const results = data.filter((data) => {
            return data && data.title && data.title.toLowerCase().includes(search)
        })
        setSearched(results)
    }, [search], [cart])
    const handleCart = (users) => 
    {
        setCart([...cart,{
            id:users.id, 
            title: users.title, 
            description: users.description, 
            category:users.category,
            image: users.image, 
            rating: users.rating
        }])
    }
    const handleSearch = (e) => 
    {
        setSearch(e)
        setControl(false)
    }
   
    return(
        <>
            <Navbar/> 
            <div className="flex items-center justify-center pl-56 pt-12 ">
                <div className="pr-32">
                <input className=" w-60 rounded-lg text-center border border-cyan-600  font-serif font-bold"type="text" placeholder="Search...." value={search} onChange={e => handleSearch(e.target.value)}/>
                </div>
                 <a href="#Cart"> <BsCart4 className="pl-8 w-20 h-10 text-cyan-600 hover:text-cyan-400" /></a>
                 <a href="#Cart" className='font-serif font-semibold text-cyan-600 hover:text-cyan-400'> Cart</a>

            </div>
            <div className="grid grid-cols-3 ">
                {
                    
                        control && data.map(users => 
                             <>
                             
                               <div className="grid grid-cols-2 shadow-xl shadow-cyan-600 pl-24 h-96 w-80  hover:shadow-cyan-400">
                               <div className="pt-12 pl-2" key={users.id}>
                                <img  className="h-24 w-24 " src={users.image} key={users.id}/>
                                      <p className="font-serif text-sm">{users.title}</p>
                                     <div className="pt-2 left-0 right-0">
                                         <button onClick={() => handleCart(users)} className="font-serif border border-cyan-600 hover:bg-cyan-600 hover:text-white w-24 h-10 rounded-lg">Add Cart</button>
                                     </div>
                                 </div>
                               </div>
                             
                             </>
                         )
                 
                }
            </div>
            <div className="grid grid-cols-3 pt-2 ">
                {
                     !control && searched.map(users => 
                        <>
                             <div className="grid grid-cols-2 shadow-xl shadow-cyan-600 pl-24 h-96 w-80  hover:shadow-cyan-400">
                               <div className="pt-12 pl-2" key={users.id}>
                                <img  className="h-24 w-24 " src={users.image} key={users.id}/>
                                      <p className="font-serif text-sm">{users.title}</p>
                                     <div className="pt-2 left-0 right-0">
                                         <button onClick={() => handleCart(users)} className="font-serif border border-cyan-600 hover:bg-cyan-600 hover:text-white w-24 h-10 rounded-lg">Add Cart</button>
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

export default Product 