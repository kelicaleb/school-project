import React, {useState } from 'react'



function ForgetPassword() 
{
    const[code, setCode ] = useState(0)

 return(
    <>
    <div className="relative flex items-center justify-center top-[12rem]"> 
        <div className="h-[12rem] w-[42rem] bg-slate-800 rounded-md"></div>
    </div>
    </>
 )
}


export default ForgetPassword