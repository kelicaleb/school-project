import React, {useState, useEffect  } from 'react'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { MdError } from "react-icons/md";




function Login()
{
    const [username, setUsername ] = useState('')
    const [password, setPassword ] = useState('')
    const [alerts,  setAlerts ] = useState(false)
    const [height, setHeight ] = useState('420px')
    const [login, setLogin ] = useState([])
    const [sex, setSex ] = useState([])
    const [sendGender, setSendGender ] = useState(true)
    const [reset, setReset ] = useState(0)


  useEffect(() => 
{
    const fetchData = async () => 
    {
        await axios.get("http://localhost:8000/customer")
        .then((res) => setLogin(res.data))
        
    }
    fetchData()
},[])
    

 
  
   const handleClick = async () => 
    {
       
     try{    
        const gender = login.filter((data) => {
         return data && data.username && data.username.toLowerCase().includes(username)
        })
       
        gender.map( async (data ) => 
     {
       
         await axios.post("http://localhost:8000/Logins/posts", 
             {
                 gender:data.gender, 
                 username:data.username
             }
         )
     })

     }
     catch{
        return console.log("Error posting data")
     }
    }

   

    const handleSubmit = async (e) =>
    {
        e.preventDefault()
        setSendGender(true)
        try{
            const response  = await axios.post("http://localhost:8000/customer/login", 
            {
                username:username, 
                password:password            
            }
        )
        console.log(response)
       
        
        if(response.data)
        {
           return  window.location.href = 'schoolHome'
        }
        else{
            return alert('Wrong password or username')
        }
        
        }
        catch{
            
           return setAlerts(true), setHeight("450px")
        }
       
       
    }
    
    
    return(
        <>
            <div className="h-screen w-screen bg-cover bg-no-repeat bg-center absolute inset-0   bg-[url(https://images.unsplash.com/photo-1555529771-122e5d9f2341?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
            <div className="relative flex items-center justify-center pt-40 ">
            <div className=" bg-gray-800  w-96 pt-2 rounded-lg" style={{height:`${height}`}}>
                <form onSubmit={handleSubmit}>
                    <h1 className="text-2xl text-white font-serif font-bold">Welcome Back!</h1>
                    <p className="font-serif text-gray-100 font-light font-sm pt-2">We are exited to see you again!</p>
                   <div className="pr-32 pt-2">
                   <p className="text-gray-200 font-semibold pr-32 pt-2">UserName:</p>
                   <div className="pt-2 pl-5">
                   <input required className="w-80 h-9 text-white bg-slate-900  text-center rounded-md" type="text" placeholder="Username" value={username} onChange={e =>setUsername(e.target.value)}/>
                   </div>
                   {alerts && 
                    <div className="flex text-red-500 pt-2 pl-4">
                    <MdError className=" h-5 w-5" /> <p className=" font-bold font-serif text-red-500 text-sm">Check the username</p>
                    </div>
                   }
                   <div className="pt-2">
                   <p className="text-gray-200  font-semibold pr-32 pt-2">Password:</p>
                   <div className="pt-2 pl-5">
                   <input required className="w-80 h-9 text-white bg-slate-900 text-center rounded-md" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                   </div>
                   {alerts && 
                    <div className="flex text-red-500 pt-2 pl-4">
                    <MdError className=" h-5 w-5" /> <p className="text-sm font-bold font-serif text-red-500 ">Check the password</p>
                    </div>
                   }
                   <div className="pt-2 pr-10">
                    <a className="pr-12 text-blue-400 hover:underline">Forgot Password?</a>
                   </div>
                   <div className="pl-4 pt-4">
                    <button onClick={handleClick} type="submit" className="text-white bg-cyan-500 w-80 h-9 rounded-md hover:bg-cyan-400">Login</button>
                   </div>
                   <div className=" pt-2  pr-8 ">
                    <p className="text-gray-200 font-light font-serif">Need an account?<a className="text-blue-400 hover:underline"  href="Register">Register</a></p>
                   </div>
                   </div>
                   </div>
                </form>
            </div>
            </div>
            </div>
        </>
    )

}



export default Login