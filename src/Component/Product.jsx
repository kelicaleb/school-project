import React, {useState, useEffect } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import Cart from "./Cart"
import { useNavigate } from 'react-router-dom'

function Product()
{
    const [data, setData ] = useState([])
    const [search, setSearch ] = useState([])
    const [searched, setSearched ] = useState([])
    const [control, setControl ] = useState(true)
    const [cart, setCart ] = useState([])
    const [notrender, setRender ]= useState(false)
    const navigate = useNavigate()
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
            <div className="relative flex items-center justify-center pr-2 pt-12">
                 <input className=" w-60 rounded-lg text-center border border-cyan-600  font-serif font-bold"type="text" placeholder="Search...." value={search} onChange={e => handleSearch(e.target.value)}/>
            </div>
            <div className="grid grid-cols-3 pt-16">
                {
                    
                        control && data.map(users => 
                             <>
                             
                               <div className="grid grid-cols-2">
                               <div className="pt-8"key={users.id}>
                                      <img  className="h-24 w-24" src={users.image} key={users.id}/>
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
            <div className="grid grid-cols-3 pt-2z">
                {
                     !control && searched.map(users => 
                        <>
                            <div className=" grid grid-cols-2">
                                <div className="pt-8" key={users.id}>
                                     <img  className="h-24 w-24" src={users.image} key={users.id}/>
                                   <div className="pt-2">
                                   <p className="font-serif text-sm">{users.title}</p>
                                   </div>
                                     <div className="pt-2 left-0 right-0">
                                        <button onClick={() => handleClick(users)} className="font-serif border border-cyan-600 hover:bg-cyan-600 hover:text-white w-24 h-10 rounded-lg">Add Cart</button>
                                     </div>
                                    </div>
                                </div>
                        </>
                    )
                }
            </div>
            <div>
                <Cart data={cart}/>
            </div>
        </>
    )
}

export default Product 