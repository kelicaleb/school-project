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
    let component; 
    switch(window.location.path){
        case"/school-project/cart":
        component = <Cart/>
        break
    }
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
            <div className="relative flex items-center justify-center pl-56 pt-12 ">
                 <input className=" w-60 rounded-lg text-center border border-cyan-600  font-serif font-bold"type="text" placeholder="Search...." value={search} onChange={e => handleSearch(e.target.value)}/>
                 <img  className="h-8 pl-56"src="data:image/jpeg;base64,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"/>
                 <a href="#Cart"  className='font-serif font-semibold hover:text-cyan-600'>Cart</a>

            </div>
            <div className="grid grid-cols-3 pt-16 ">
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
            <div className="grid grid-cols-3 pt-2">
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
                {component}
            </div>
        </>
    )
}

export default Product 