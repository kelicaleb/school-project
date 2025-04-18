import React, {useState, useEffect  } from 'react'
import axios from 'axios'
import { TiTick } from "react-icons/ti";




function Purchase()
{
    const [data, setData] = useState([])
    const [purchase, setPurchase ] = useState([])
    const [amount, setAmount] = useState('')
    const [notification, setNotification] = useState(false)
    const [height, setHeight] = useState("25rem")
    const [phoneNumber, setPhoneNumber ] = useState('')
    const[login, setLogin ] = useState([])
    const [username, setUsername ] = useState('')




    useEffect(() => 
        {
          const fecthData = async () => 
          {
            await axios.get("http://localhost:8000/Logins")
            .then((res) => setLogin(res.data))
            console.log("this is the username ", username)
      
            login.map(async (data) => 
            {
              setUsername(data.username)
              localStorage.setItem("phoneNumber", data.phoneNumber )
              const pn = localStorage.getItem("phoneNumber") 
              setPhoneNumber(pn)             
            })
      
          }
          fecthData()
        },[login.length])


    useEffect(() => 
    {
        const fetchData = async () => 
        {
            await axios.get("http://localhost:8000/purchase")
            .then((res) => setData(res.data))

            await axios.get("http://localhost:8000/purchase")
            .then((res) => setPurchase(res.data))
        }
        fetchData()
    },[])
    //from the table Login
    
    const handleSubmit = async (e) => 
    {
        e.preventDefault()
    

    }
    const handlePurchase = async(data) => 
    {
    try{
        setNotification(true)
        console.log(data)
     
        setHeight("28rem")
        await axios.post("http://localhost:8000/transaction/post", 
            {
                customerId:localStorage.getItem("customerId"),
                amount:amount,
                price: data.price, 
            }
        )
        .then((res) => console.log(res.data))
        await axios.post("http://localhost:8000/Mpesa/post", 
            {
                Amount:parseInt(data.price) * amount, 
                PhoneNumber:phoneNumber,
                Product:"Mens"

            })
    }
    catch{
        console.log("Error Purchasing")

    }
       

    }
     return(
        <>
        <div className="bg-slate-800 rounded-md  w-[22rem] shadow-xl shadow-cyan-500   ml-[25rem] mt-[7rem]" style={{height:`${height}`}}>
           {
            data.map(data => 
                <>
                 <div>
                <h1 className="text-3xl font-serif font-bold text-white pt-2">Purchase</h1>
                <div>
                    <form onSubmit={handleSubmit}> 
                        <div className="relative flex pt-6 items-center justify-center "> 
                        <img className="h-[5em] w-16" src={data.images}/>
                        </div>
                        <p  className="text-white font-semibold"> $Price {data.price}</p>
                        <div>
                            <p className="font-serif font-semibold text-white pr-[16rem] pt-2">Amount:</p>
                            <div className="pr-2 pt-2">
                            <input type="number" className="w-[20rem]  h-[2rem] rounded-md bg-slate-950 text-white font-serif font-semibold text-center " 
                            placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)}/>
                            </div>
                        </div>
                        <div className="pt-2">
                            <p className="pt-2 font-serif pr-[15rem] text-white font-semibold">Payment:</p>
                            <select className="bg-slate-950 rounded-md h-[2rem] w-[20rem] text-white font-serif text-center"  onChange={e =>setPurchase(e.target.value)} >
                                <option value="Mpesa">Mpesa</option>
                            </select>
                        </div>
                        {
                            notification && 
                            <div className="pt-1">
                            <h1 className="font-serif text-sm text-green-500 font-semibold flex"><TiTick className="w-6 h-6"/>Check your phone</h1>
                        </div>
                        }
                        <div className="pt-4">
                            <button className="bg-cyan-600 rounded-md text-white font-serif h-[2rem] w-[20rem] hover:bg-cyan-500" type="submit" onClick={() => handlePurchase(data)}>Purchase</button>
                        </div>
                    </form>
                </div>
            </div>
                </>
            )
           }
        </div>
        </>
     )

}


export default Purchase