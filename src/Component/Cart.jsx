import React, {useState, useEffect}from 'react'
import Navbar from './Navbar'
import axios from 'axios'



function Cart()
{
    const [products, setProducts]  =  useState([])
    const [customer, setCustomer] = useState([])
    const [phoneNumber, setPhoneNumber] = useState('')
    const [control, setControl ] = useState(false)
    useEffect(() => 
    {
      const fetchData = async ()=> 
        {
            axios.get("http://localhost:8000/products")
            .then((res) => setProducts(res.data))
            setControl(true)
            console.log("This is prodcuts", products)
        } 
        fetchData()  
    },[control])
   
    const handleRemove = async(id) => 
    {
        console.log(id)
        await axios.delete(`http://localhost:8000/delete/${id}`)
        .then((res) => console.log("deleted successfully"))
        const remove  = products.filter((data) => data.id !==  id)
        setProducts(remove)
        setControl(false)
    }
    const handlePurchase  = async (data) => 
    {
        
      
        await axios.post("http://localhost:8000/purchase/posts", 
            {
                images: data.image, 
                price: data.price, 
                amount: 1, 
                total: data.price,
                title: data.title, 
                phoneNumber:phoneNumber
            }
        )
        .then((res) => window.location.href="Purchase")
        
    }
   
    return(
        <>
            <Navbar/>
            <div>
                <div className="relative flex items-center justify-center">
                    <h1 className="font-bold pt-12 text-6xl font-serif pr-40 text-cyan-600 underline   w-screen">Cart</h1>
                </div>
            </div>
            <div className="grid grid-cols-3 ">
                {
                    
                        products.map(data => 
                             <>
                             
                               <div className="grid grid-cols-2 shadow-xl shadow-cyan-600 pl-24 h-96 w-80  hover:shadow-cyan-400">
                               <div className="pt-12 pl-2 " key={data.carttId}>
                                <img  className="h-24 w-24 " src={`http://localhost:8000${data.image}`} key={data.cartId}/>
                                      <p className="font-serif text-sm">{data.title}</p>
                                      <p className="font-bold font-serif flex">Price:    khs{data.price}</p>
                                      <div className=" pt-2  ">
                                        <div className="">
                                        <button className="bg-cyan-600 rounded-lg h-10 w-24 text-white text-center hover:bg-cyan-500" onClick={() => handlePurchase(data)}>Purchase </button>
                                        </div>
                                        <div className ="pt-2" >
                                        <button onClick={() => handleRemove(data.cartId)} className="font-serif  text-white bg-red-700 hover:bg-red-500 hover:text-white w-24 h-10 rounded-lg">Remove</button>
                                        </div>
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