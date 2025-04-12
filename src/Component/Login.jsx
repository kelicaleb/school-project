import React, {useState, useEffect  } from 'react'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { MdError } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import Email from './Email'




function Login()
{
    const [username, setUsername ] = useState('')
    const [password, setPassword ] = useState('')
    const [alerts,  setAlerts ] = useState(false)
    const [height, setHeight ] = useState('420px')
    const [login, setLogin ] = useState([])
    const [sendGender, setSendGender ] = useState(true)
    const [reset, setReset ] = useState(0)
    const[search, setSearch ] = useState([])


  useEffect(() => 
{
    const fetchData = async () => 
    {
        await axios.get("http://localhost:8000/customer")
        .then((res) => setLogin(res.data))
        
    }
    fetchData()
},[])
    

 
  
   const handleLogin = async () => 
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
                 username:data.username, 
                 phoneNumber:data.phoneNumber
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
    const handleForgetPassword  = () => 
    {
        const  searchByUsername = login.filter((data) => 
        
        {
            return data && data.username && data.username.toLowerCase().includes(username)
        }) 

        const search = []
        search.push(searchByUsername)
        console.log(search)
        console.log(search)
        console.log(login)
        search.map((data) => 
        {
            data.map(async (data) => 
            {

                console.log("this is data" , data.email)
                toast.success(`An email has been sent to ${data.email}`)
                await axios.post("http://localhost:8000/gmail/posts",
                    {
                      to: data.email,
                      subject: "Password Change Confirmation",
                      text: "Your password has been successfully changed. If you didn't make this change, please contact support immediately.",
                      html: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                          <meta charset="utf-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>Password Change Confirmation</title>
                          <style>
                            body {
                              font-family: Arial, sans-serif;
                              line-height: 1.6;
                              color: #333333;
                              margin: 0;
                              padding: 0;
                            }
                            .container {
                              max-width: 600px;
                              margin: 0 auto;
                              padding: 20px;
                            }
                            .header {
                              background-color: #4285f4;
                              color: white;
                              padding: 20px;
                              text-align: center;
                            }
                            .content {
                              padding: 20px;
                              background-color: #ffffff;
                            }
                            .button {
                              display: inline-block;
                              background-color: #06b6d4;
                              color: white;
                              text-decoration: none;
                              padding: 10px 20px;
                              margin: 20px 0;
                              border-radius: 4px;
                            }
                            .footer {
                              font-size: 12px;
                              color: #777777;
                              text-align: center;
                              margin-top: 20px;
                            }
                          </style>
                        </head>
                        <body>
                          <div class="container">
                            <div class="header">
                              <h1>Password Change Confirmation</h1>
                            </div>
                            <div class="content">
                              <p>Hello ${username || 'there'},</p>
                              <p>We're confirming that your password was recently changed.</p>
                              <p>If you made this change, no further action is required.</p>
                              <p>If you did not request this password change, please secure your account immediately:</p>
                              <a href="" class="button">Secure My Account</a>
                              <p>If you have any questions or concerns, don't hesitate to contact our support team.</p>
                              <p>Thank you,<br>Your Company Name</p>
                            </div>
                            <div class="footer">
                              <p>This is an automated message, please do not reply directly to this email.</p>
                              <p>© 2025 Your Company Name. All rights reserved.</p>
                            </div>
                          </div>
                        </body>
                        </html>
                      `
                    }
                  )

            })
            
        })
        
    
    }
    const handleLink = () => 
    {
        window.location.href = "http://localhost:5173/school-project/ForgetPassword"
    }
       
    return(
        <>

            <div className="h-screen w-screen bg-cover bg-no-repeat bg-center absolute inset-0   bg-[url(https://images.unsplash.com/photo-1555529771-122e5d9f2341?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
            <ToastContainer/>
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
                   <input  className="w-80 h-9 text-white bg-slate-900 text-center rounded-md" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                   </div>
                   {alerts && 
                    <div className="flex text-red-500 pt-2 pl-4">
                    <MdError className=" h-5 w-5" /> <p className="text-sm font-bold font-serif text-red-500 ">Check the password</p>
                    </div>
                   }
                   <div className="pt-2 pr-10">
                    <button  onClick={handleForgetPassword} className="pr-12 text-blue-400 hover:underline">Forgot Password?</button>
                   </div>
                   <div className="pl-4 pt-4">
                    <button onClick={handleLogin} type="submit" className="text-white bg-cyan-500 w-80 h-9 rounded-md hover:bg-cyan-400">Login</button>
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