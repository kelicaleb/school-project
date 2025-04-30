import React, { useState, useEffect } from 'react'
import { FaOpencart } from "react-icons/fa";
import { FaSmile } from "react-icons/fa";
import axios from 'axios'
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa"
import {useLocation  } from 'react-router-dom'


function Navbar({products, setProducts, Control, lists})
{
    const [menu, setMenu ] = useState(false)
    const [customer, setCustomer ] = useState([])
    const [login, setLogin] = useState([])
    const [username, setUsername ] = useState('')
    const [mode, setMode] = useState(false)
    const [darkMode, setDarkMode] = useState('light')
    const [input, setInput ] = useState('')
    const [search, setSearch ] = useState(false)
    const [data, setData ] = useState([])
    const [list, setList] = useState([])
    const [ control, setControl ]= useState(true)
    const [choose, setChoose ] = useState(false)
    const [prod, setProd ] = useState()

    const location = useLocation() 



    console.log("locatin from navbar", location.pathname)
    
    const handleMenuButton = () => 
    {
       
        setMenu(!menu)
    }
    useEffect(() => 
    {
      const fetchData = async () => 
      {
        await axios.get("http://localhost:8000/Products/api/products")
        .then((res) => setData(res.data) )
        
       
      }
      fetchData() 
    },[search])
   
   
  

    useEffect(() => 
    {
      const fetchData = async () => 
      {
        await axios.get("http://localhost:8000/Logins")
        .then((res) => setLogin(res.data))

        login.map((data) => 
        {
          setUsername(data.username)
        })

      }
      fetchData() 
    }, [login.length])

    useEffect(() => 
    {
    
      if(input === '')
      {
        return setSearch(false) 

      }
      else{
        return setSearch(true)
      }
      
    },[input])
    const handleInput = (value) => 
    {
      setInput(value)
      setChoose(true)

    
    }
    const handleClick = () => 
    {

      if(location.pathname !== "/schoolProducts")
        {
          return window.location.href = "schoolProducts"
        }
        else{
          setProd(list.length)
        }
    }
    // search algorithim 
   
      
    useEffect(() => 
    {
      if(location.pathname == "/schoolProducts")
        {
          setProd(products.length)
  
        }
     if(products)
     {
      const result = products.filter((data) => 
        {
          setChoose(true)
          return data && data.item && data.item.toLowerCase().includes(input)
        })
        setList(result)
        if(result){
          lists(result)
          Control(true)

        }
     }
 
    
      
    },[input, prod])

   return(
    <>
    <div className="absolute top-0">
    <nav className="bg-gray-800 top-0 left-0 right-0 place-items-start sticky z-20">
  <div className=" fixed bg-slate-900 top-0 left-0 right-0 ">
    <div className="relative flex h-16 items-center justify-between ">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span className="absolute -inset-0.5"></span>
          <span className="sr-only">Open main menu</span>
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex shrink-0 items-center">
          <image className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"/>
        </div>
        <div className="flex  sm:ml-6 sm:block top-0 left-0 right-0 relative ">
          <div className="flex relative  space-x-4">
            <a className="rounded-md px-3 py-1  font-bold text-white font-serif text-1xl bg-cyan-600 tracking-[.12em] relative flex w- h-10 dark:bg-violet-600" aria-current="page"><p className="font-serif font-semibold pt-1">BLOO</p><FaOpencart  className="w-8 h-12 pb-6 pl-1"/></a>
            <a href="schoolHome" className=" rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Home</a>
            <a href="schoolProducts" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Products</a>
            <a href="schoolCart" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Cart</a>
          </div>
        </div>
      </div>
      <div className=" max-h-[8rem]   top-0 z-10 pt-8 mr-[44rem] ">
          <div className="absolute top-0 z-10 mr-[22rem] pt-4" >
          <input onClick={handleClick} className=" sticky top-0 w-[42rem] text-center font-serif rounded-md h-[2rem] bg-white/20 text-white placeholder-white" type="text"  placeholder="Search Products..." 
          value={input} onChange={e => handleInput(e.target.value)} />
          </div>
        <div className="absolute max-h-[10rem] overflow-auto  top-[3.2rem] z-10 ">
        {
            search && control && list.map(data => 
            <div className="bg-white w-[42rem] bg-opacity-[.90]  hover:bg-slate-200">
                <p className="text-sm font-serif ">{data.title}</p>
            </div>
            )
           
        }
        {
           !search && !control && list.map(data => 
            <div className="bg-white w-[42rem] bg-opacity-[.90] rounded-md">
              <p className="text-sm font-serif">{data.title}</p>
          </div>
          )
        }
        </div>
        </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5"></span>
        </button>
        {/*fetching username*/}


        <div className="relative flex">
          <p className="text-white font-serif font-semibold relative flex items-center justify-center pt-2">
          {username} <FaSmile className="w-10  h-6 text-cyan-500 pr-4 pl-2 dark:text-violet-600" /> 
          
          
          
          {/*button dark mode*/}

          {
            mode && <button><MdSunny className="pr-4 text-violet-600 h-10 w-10 " />
          </button>
          }
         {/*button light mode*/}
          {
            !mode && <button><FaMoon className="pr-4 text-cyan-500 h-10 w-10 " />
            </button>
          }
          </p>
        </div>
        <div className="relative ml-3 pr-12">
          <div>
            <button onClick={handleMenuButton} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 " id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">Open user menu</span>
              <image className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
            </button>
          </div>
          {
            menu && 
            <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
          </div>
          }
        </div>
      </div>
    </div>
  </div>

  <div className="sm:hidden" id="mobile-menu">
    <div className="space-y-1 px-2 pb-3 pt-2">
      <a href="#" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Dashboard</a>
      <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</a>
      <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
      <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
    </div>
    <div>
  </div>
  </div>
</nav>
</div>

    </>
   )
}
export default Navbar 


