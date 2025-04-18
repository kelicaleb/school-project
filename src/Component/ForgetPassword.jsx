import React, {useState, useEffect  } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';




function ForgetPassword() 
{
    const[changePassword, setChangePassword] = useState('')
    const [username, setUsername ] = useState('')
    const [timer, setTimer] = useState(false)
    const[clock, setClock]  = useState(0)
    const startTimer  = ()  => 
    {
        setClock(prevCount  => prevCount + 1)
    }
    useEffect(() =>
    {
        const getUsername = localStorage.getItem("username")
        console.log(getUsername)
        setUsername(getUsername)
    })
    useEffect(() => 
    {
        if(timer){
            const tick = setInterval(startTimer, 1000)
            console.log(clock)
            if(clock == 5)
            {
                window.location.href = "Login"
            }
            return(() => 
            {
                clearInterval(tick)
            })
            
        } 
    }, [timer, clock])

    const handleChangePassword = async (e)=> 
    {
        e.preventDefault()
        try{
            await axios.patch("http://localhost:8000/customer/updatepassword",
                {
                    username:username, 
                    password:changePassword
                }
            )
            .then((res) => console.log(res.data))
            setTimer(true)
            toast.success("Redirecting to Login...");
        }
        catch{
            setTimer(false)
            toast.error("Password not secure");
            return console.log("Error posting data")
        }
        
    }

 return(
    <>
    <ToastContainer/>
    <div className="absolute bg-center h-screen w-screen flex items-center justify-center top-[0] inset-0 bg-cover bg-no-repeat bg-[url(https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]"> 
        <div className="h-[13rem] w-[42rem] bg-slate-800 rounded-md bg-opacity-85">
            <h1 className="text-white font-serif font-bold text-[1.5rem] pt-2">Forgot Password</h1>
            <form onSubmit={handleChangePassword}>
            <div className="pt-2">
            <p className="font-serif pt-2 font-semibold pr-[30rem] text-white text-[1rem]">New Password:</p>
            <div className="pt-1">
            <input required className="text-white w-[38rem] h-11 bg-slate-900 rounded-md text-center font-serif" placeholder="Enter your Username" value={changePassword}  
            onChange={e => setChangePassword(e.target.value)} />
            </div>
            </div>
            <div className="pt-4">
              <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-serif w-[38rem] rounded-md h-9" type="submit">Change Password</button>
            </div>
            </form>
        </div>
    </div>
    </>
 )
}


export default ForgetPassword