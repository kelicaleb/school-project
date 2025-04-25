import React, {useState, useEffect} from 'react'
import { TypeAnimation } from 'react-type-animation';
import { FaFaceSmileWink } from "react-icons/fa6";
import { FaOpencart } from "react-icons/fa";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';




function Register()
{
    const[email, setEmail ] = useState('')
    const[username, setUsername]  = useState('')
    const [password, setPassword] = useState('')
    const [dob, setDob ]  = useState('')
    const[gender, setGender ] = useState('')
    const[tick, setTick] = useState(0)
    const[count, setCount ] = useState(false)
    const [phoneNumber, setPhoneNumber ] = useState('')
    const clock = () => 
    {
        setTick(prevTick => prevTick + 1)
    }
    useEffect(() => 
    {
        if(count)
        {
            const ticking = setInterval(clock, 1000)
            if(tick == 6)
            {
                window.location.href = "Login"
            }
            return (() => 
            {
                clearInterval(ticking)
            })
        }
        
    },[tick, count])


    const handleGender = (e) => 
    {
        setGender(e)
    }
    const handleSubmit = async (e) => 
    {
        e.preventDefault()
        try{ 
            await axios.post("http://localhost:8000/customer/posts", 
                {
                    email:email, 
                    username:username, 
                    password:password, 
                    phoneNumber: phoneNumber, 
                    dob:dob, 
                    gender:gender, 
                    theme:"light"
                }
            )
            .then((res) => console.log(res))
            axios.post("http://localhost:8000/Logins/posts", 
                {
                    gender:gender
                }
            )
            .then((res) => console.log(res))
            setCount(true)
            toast.success("Redirectiing...")
        }
        catch{ 
            console.log("error posting")
        }
      
    }
    const handleEmail  = async ()=> 
        {
            await axios.post("http://localhost:8000/gmail/posts", 
                {
                    to:email, 
                    subject:"Welcome to Bloo", 
                    text:"We offer great prices", 
                    html:`<h1>Shop with us ${username} to win points</h1>`
                }
            )
            .then((res) => console.log(res.data))
        }
    return(
        <>
            <div className=" bg-no-repeat bg-cover inset-0 h-screen w-screen bg-center absolute bg-[url(https://images.unsplash.com/photo-1567958451986-2de427a4a0be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
            <ToastContainer/>
            <div className="flex text-cyan-600 pr-96  pl-8">
                    <h1 className="font-bold font-serif text-3xl text-cyan-600 ">Bloo</h1><FaOpencart  className="w-16 h-12"/>
            </div>
                <div className="absolute flex items-center justify-center  w-screen">
                    <div className="bg-gray-800 h-[38.6rem] w-1/2 rounded-md">
                        <h2 className="text-center font-semibold font-serif text-gray-300 text-4xl pt-2">Register</h2>
                        <TypeAnimation className="text-gray-200 font-serif "
                         sequence={[
                        'Welcome!',
                        ,
                        2100, 
                        'We sell Male clothes',
                        2100,
                        'We sell Female clothes',
                        2100,
                        'We sell jewellery',
                        2100]}
                         wrapper="span"
                         speed={50}
                         style={{  display: 'inline-block' }}
                        repeat={Infinity}
                        />
                        <div className="relative flex justify-center items-center ">
                        <FaFaceSmileWink  className="text-cyan-500 w-9 h-9"/>
                        </div>
                        <form onSubmit={handleSubmit}> 
                            <div className="pr-96 pl-2">
                            <p className="font-serif text-gray-200 font-semibold pr-44">Email:</p>
                            </div>
                            <div className="">
                            <input required  className="bg-slate-900 h-10 w-[38rem] rounded-md text-center text-white  font-serif" type="email" placeholder="Email"
                            value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="pt-1 pr-96">
                                <p className="font-serif font-semibold pr-32 text-gray-200">Username:</p>
                            </div>
                            <div className="pt-1">
                                <input required className="text-center font-serif rounded-md h-10 w-[38rem] text-white bg-slate-900 " type="text" placeholder="username"
                                value={username}  onChange={e => setUsername(e.target.value)}/>
                            </div>
                            <div className="pt-1 pr-96">
                                <p className="font-serif font-semibold pr-32 text-gray-200">Password:</p>
                            </div>
                            <div className="pt-1">
                                <input required  className="text-white text-center font-serif rounded-md h-10 bg-slate-900 w-[38rem]" type="password" placeholder="password"
                                value={password}    onChange={e => setPassword(e.target.value)}/>
                            </div>
                            <div className="pt-1 pr-96">
                                <p className="font-semibold font-serif text-gray-200 pr-28">Date of Birth:</p>
                            </div>
                            <div className="pt-1">
                                <input required className=" text-center font-serif  rounded-md h-10 w-[38rem] bg-slate-900 text-white" type="date" placeholder="DOB"
                                value={dob} onChange={e => setDob(e.target.value)}/>
                            </div>
                            <div className="flex pl-52 pt-1">
                            <label className="text-white">Male:</label>
                            <input required type="radio" value="Male" checked={gender === "Male"} onChange={(e) => handleGender(e.target.value)}/>
                            <div className="pl-40">
                            <label className="text-white">Female:</label>
                            <input required type="radio" value="Female" checked={gender === "Female"} onChange={(e) => handleGender(e.target.value)}/>
                            </div>
                            </div>
                            <div className="pt-1">
                                <p className="font-serif font-semibold pr-[30rem] text-gray-200">Phone Number:</p>
                                <input required className="text-center font-serif rounded-md h-10 w-[38rem] bg-slate-900 text-white" type="text" 
                                placeholder="2547XXXXXXXX"  value={phoneNumber}  onChange={e => setPhoneNumber(e.target.value)}/>
                            </div>
                            <div className="pt-4">
                                <button onClick={handleEmail} className="w-[38rem] h-10 text-white font-serif rounded-md bg-cyan-500 hover:bg-cyan-400"  type="submit">Submit</button>
                            </div>
                            <div className="pt-2">
                                <p className="text-gray-200 font-serif text-xs">By registering to Bloo you have agreed to <i className="text-blue-400 hover:underline">Terms and services</i> </p>
                            </div>
                            <div className="pt-4 pr-96">
                                <a  className="text-blue-500 pr-16 text-sm hover:underline" href="login">Already have an account?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Register