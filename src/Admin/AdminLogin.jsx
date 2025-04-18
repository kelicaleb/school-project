import React, {useState } from 'react'
import { FaOpencart } from "react-icons/fa";
import axios from 'axios'





function AdminLogin() 
{
  const [username, setUsername ] = useState('')
  const [password, setPassword ] = useState('')
  const [ error, setError] = useState(false)
  const [height, setHeight ] = useState("22rem")

//login in to Admin
  const handleSubmit = async (e) => 
  {
    e.preventDefault()
    try{
        await axios.post("http://localhost:8000/adminLogin/login", 
          {
            username:username, 
            password:password
          }
        )
        .then((res) => console.log(res.data))
        window.location = "AdminHome"
    }
    catch
    {
      console.log("Error Loggin")
      setHeight("25rem")
      return setError(true)
    }


  }



 return(
    <>
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-600 via-teal-500 to-blue-500 absolute h-screen w-screen bg-center bg-no-repeat inset-0 ">
    <div className="text-white absolute top-2 pr-[72rem] flex">
      <h1 className="font-serif font-bold pt-2 text-[1.5rem] pl-2 flex">Bloo
      <FaOpencart className="h-[3rem] w-[4rem]"/>
      </h1>
      </div>  
      <div className="absolute top-4 right-2"><a href="/" className="text-white font-serif pr-2 font-bold text-[1.5rem] hover:text-cyan-300">Customer</a></div>    
     <form onSubmit={handleSubmit}>
     <div className="text-center p-8 bg-white/20 rounded-xl backdrop-blur-md shadow-xl  w-[30rem]"  style={{height:height}}>
        <h1 className="text-4xl font-bold mb-4 text-white font-serif">Admin</h1>
        <p className="text-xl text-white/90 pr-[24rem] font-serif font-semibold">Username:</p>
        <div className="pt-2">
          <input required className="font-semibold rounded-full font-serif text-center text-black w-[27rem] h-9 bg-white/50" placeholder="Username" value={username} onChange={e => setUsername(e.target.value) }/>
        </div>
        {
          error && 
          <p className="text-pink-500 font-serif font-semibold">Check Username</p>
        }
        <div className="pt-2">
          <p className="pr-[20rem] font-semibold font-serif text-white text-xl">Password:</p>
          <div className="pt-2">
          <input  required className="font-semibold w-[27rem] h-9 bg-white/50 font-serif text-black text-center rounded-full" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          {
          error && 
          <p className="text-pink-500 font-serif font-semibold">Check Password</p>
        }
        </div>
        <div className="pt-7">
          <button className="font-semibold text-white font-serif bg-cyan-400 w-[27rem] h-9 rounded-full hover:bg-cyan-300 " type="submit">Login</button>
        </div>
      </div>
     </form>
    </div>
    </>
 )
}


export default AdminLogin