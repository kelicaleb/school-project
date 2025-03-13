import React, {useState, useEffect } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { BsCart4 } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";



function Product()
{
    const [data, setData ] = useState([])
    const [search, setSearch ] = useState([])
    const [searched, setSearched ] = useState([])
    const [control, setControl ] = useState(true)
    const [cart, setCart ] = useState([])
    const [amount, setAmount]  = useState(0)
    const [notification, setNotification] = useState(false)
    const[loading, setLoading] = useState(true)
    const [mode, setMode]= useState("light")
    
    useEffect(() => 
    {
        console.log(mode)
      const fetchData = async ()=> 
      {
        try{
            setLoading(false)
            await axios.get("https://fakestoreapi.com/products")
            .then((res) => setData(res.data))
            const results = data.filter((data) => {
                return data && data.title && data.title.toLowerCase().includes(search)
            })
            setSearched(results)
           }
           catch{
            console.log("Error fetching data")
            setLoading(true)
           }
         
      }
      fetchData()
    }, [search], [cart])
    const handleCart = async(users) => 
    {
       await  axios.post("http://localhost:8000/cart", 
            {
                title:users.title, 
                price:users.price,
                formed:users.description, 
                category:users.category, 
                image:users.image, 
            }
        )
        .then((res) => {
            toast.success("Added to Cart");
        })
        .catch((error) => {
            toast.error("Failed to add to Cart");
            return console.log("Error has occured",error)
        })      

        
    }
    const handleSearch = (e) => 
    {
        setSearch(e)
        setControl(false)
    }
  
  
   
    return(
        <>
           <div className={mode}>
           <h1 className=" dark:text-violet-600 box-decoration-slice  underline text-center text-cyan-600  text-5xl pt-12 pr-40 font-serif font-bold"><a href="sijs">Clime </a> </h1>
            <Navbar/> 
            <ToastContainer />
            <div className="flex items-center justify-center pl-96 pt-12 pb-12 ">
                <div className="pr-32">
                <input className=" w-60 rounded-lg text-center border border-cyan-600  font-serif font-bold"type="text" placeholder="Search...." value={search} onChange={e => handleSearch(e.target.value)}/>
                </div>
                 <a href="schoolCart"> <BsCart4 className="pl-80 w-96 h-10 text-cyan-600 hover:text-cyan-400" /></a>
                 <a href="schoolCart" className='font-serif font-semibold text-cyan-600 hover:text-cyan-400 '> Cart</a>

            </div>
            {
                                 loading && 
                                <div className="sweet-loading relative flex items-center justify-center pt-32 text-cyan-600">
                                    <ClipLoader/>
                                </div>  
                                }
            <div className="grid grid-cols-3 max-h-screen">
                {
                    
                        control && data.map(users => 
                             <>
                             
                               <div className="grid grid-cols-2 shadow-xl shadow-cyan-600 pl-24 pb-4 w-80  hover:shadow-cyan-400 hover:-translate-y-1 ">
                               <div className="pt-12 pl-2" key={users.id}>
                                <img  className="h-24 w-24 " src={users.image}/>
                                      <p className="font-serif text-sm">{users.title}</p>
                                      <p className="font-bold font-serif">Price: ${users.price}</p>
                                      <div key={users.id}>
                                      </div>
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
                        
                          <div className="grid grid-cols-2 shadow-xl shadow-cyan-600 pl-24 pb-4 w-80  hover:shadow-cyan-400 hover:-translate-y-1">
                          <div className="pt-12 pl-2" key={users.id}>
                           <img  className="h-24 w-24 " src={users.image} key={users.id}/>
                                 <p className="font-serif text-sm">{users.title}</p>
                                 <p className="font-bold font-serif">Price: ${users.price}</p>
                                <div className="pt-2 left-0 right-0">
                                    <button onClick={() => handleCart(users)} className="font-serif border border-cyan-600 hover:bg-cyan-600 hover:text-white w-24 h-10 rounded-lg">Add Cart</button>
                                </div>
                            </div>
                          </div>
                        
                        </>
                    )
                }
            </div>
           </div>
          
        </>
    )
}

export default Product 