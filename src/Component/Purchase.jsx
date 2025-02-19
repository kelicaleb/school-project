import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';




function Purchase()
{
    const [items, setItems ] = useState([])
    const [amount, setAmount ] = useState('')
    const [control, setControl ] = useState(true)
    const [tick, setTick ] = useState(0)
    const [start, setStart ] = useState(false)




    const clock = () => 
    {
        setTick(prevTick => prevTick + 1 )
    }
    const handleSubmit = (e)=> 
        {
            e.preventDefault()
            console.log("hello")
            setStart(true)
            if(!control)
                {
                    axios.delete(`http://localhost:8000/purchase/delete/${id}`)
                }
          items.map((data) => 
        {
           console.log(data)   
            axios.post("http://localhost:8000/transaction/post", 
                {
                        amount: amount, 
                        price: data.total, 
                        customerId: 1, 
                 }
               )
        })
        } 
    const handleClick = (id) => 
    {
        setStart(true)
        console.log(id)
        let total;
        items.forEach((data) => 
        {
            total = amount * data.price
            axios.patch(`http://localhost:8000/purchase/patches/${id}`,
            {
                total
            }
        )
        })
        toast.success("Successfully Purchased")
        toast.success(`Total:$${total}`)    
        axios.delete(`http://localhost:8000/purchase/delete/${id}`)
      
    }
  
    useEffect(() => 
        {
            axios.get("http://localhost:8000/purchase")
            .then((res) => setItems(res.data))
            if(start)
            {
                const ticking = setInterval(clock, 1000)
                console.log(tick)
                if(tick == 3)
                {
                    setControl(false)
                    window.location.href = "schoolCart"
                    
                }
                return(() => 
                {
                    clearInterval(ticking)
                })
                
            }
            axios.get ("http://localhost:8000/transaction")
            .then((res) => console.log(res.data))
            
            
        }, [start, tick, control])
    const handleAmount = (values, id) => 
        {
            setAmount(values)
       
        }
       
 
  
    return(
        <>
        <h1 className="text-5xl text-cyan-600 font-bold underline"> Purchase</h1>
        <div className="font-bold font-serif ">
        <ToastContainer/>
        </div>
        {
           control &&  items.map(data => 
            <>
                <div className="relative flex items-center justify-center pt-20">
                    <form className="bg-gray-200 w-96 h-80 shadow-lg shadow-cyan-600 "   key={data.purchaseId} onSubmit={handleSubmit}>
                        <div className="flex relative items-center justify-center pt-16 bg-gray-200">
                        <img className="h-20" src={data.images}/>
                        </div>
                        <p className="font-serif">{data.title}</p>
                        <p className="font-bold font-serif">Price: ${data.price}</p>
                        <div className="pt-2">
                        <input className="rounded-full text-center font-serif w-32" type="number" placeholder="amount" value={amount} onChange={e => handleAmount(e.target.value, data.purchaseId)}/>
                        <div className="pt-6 ">
                        <button type="submit" onClick={() => handleClick(data.purchaseId)} className=" w-32 text-white  font-bold h-8 font-serif rounded-lg bg-green-500 hover:bg-green-400">Confirm</button>
                        </div>
                        </div>
                    </form>
                </div>
            </>
        )
        }
        </>
    )
}


export default Purchase 