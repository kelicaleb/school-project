import React, {useState, useEffect, CSSProperties } from 'react'
import Navbar from './Navbar'
import './index.module.css'
import 'react-slideshow-image/dist/styles.css'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";
import { FaOpencart } from "react-icons/fa";
import { GiClothesline } from "react-icons/gi";
import { GrTechnology } from "react-icons/gr";
import { GiDress } from "react-icons/gi";
import { GiJewelCrown } from "react-icons/gi";
import { MdOutlineCategory } from "react-icons/md";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { IoMdFlame } from "react-icons/io";
import { GiHidden } from "react-icons/gi";
import Display from './Slideshow'
import Contact from './Contact'
import Male from '../Category/Male'
import {Link} from 'react-router-dom'




function Home()
{
 




    const[login, setLogin ] = useState([])
    const[checkGender, setCheckGender] = useState(false)
    const[trigger, setTrigger ]= useState(0)
    const [count, setCount] = useState(true)
    const [loading, setLoading  ] = useState(false)
    const [username, setUsername] = useState('')
    const [mode, setMode ] = useState("light bg-slate-200 bg-no-repeat bg-center bg-cover inset-0 mt-16 h-screen w-screen absolute flex h-[37.7rem]")
  

   useEffect(() => 
  {
    const fecthData = async () => 
    {
      await axios.get("http://localhost:8000/Logins")
      .then((res) => setLogin(res.data))
      console.log("this is the username ", username)

      login.map(async (data) => 
      {
        if(data.gender == "Male")
        {
          setCheckGender(true)

        }
        else{
          setCheckGender(false)
        }
        localStorage.setItem("username", data.username)
        setUsername(localStorage.getItem("username"))
        localStorage.setItem("customerId", data.customerId)
        const customerId = localStorage.getItem("customerId")
        console.log("thiis in scusromerId", customerId)
        
      })

    }
    fecthData()
  }, [login.length])  
    
  
   
    const slides = [
        {
          url: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
        },
        {
          url:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
        },
        {
          url:"https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
        },
        {
          url: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
        },
        {
          url: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
        },
    
        {
          url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
        },
        {
          url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
        }
      ];
      const [currentIndex, setCurrentIndex] = useState(0);
    
      const prevSlide = () => {
       if(checkGender)
       {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
       }
       else
       {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? female.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
       }
      };
    
      const nextSlide = () => {
       if(checkGender)
       {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
       }
       else{
        const isLastSlide = currentIndex === female.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
       }
      };
    
      const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
      };
      useEffect(() => 
    {
        const transition = setInterval(nextSlide, 3000)
        axios.get("https://fakestoreapi.com/products")
        return(() => 
        {
            clearInterval(transition)
        })
    })
    
  
   
    return(
        <>
            <div className={mode + "relative"}>
            <Navbar products={undefined} setProducts={undefined} Control={undefined} lists={undefined}/>
            <div className="pl-2">
           <h1 className="pb-4 text-center pt-8 font-serif underline text-5xl text-cyan-600 font-semibold dark:text-violet-600">Home Page</h1>
            <div className="w-[78rem] bg-cyan-600 h-12 pt-2  rounded-md dark:bg-violet-600 ">
              <h1 className="text-white text-1xl font-serif font-semibold pr-[66rem] pt-1">{username} top picks</h1>
            </div>
        {
            loading && 
            
                <div className="sweet-loading relative flex items-center justify-center pt-32 text-cyan-600">
                <ClipLoader/>
              </div>
            
        }
         
       <div className="grid grid-cols-3 pr-[32rem] pt-8 group">
        <div className=" bg-slate-800  h-[20rem] w-[14rem] rounded-md pl-1 pt-2">
          <div className="flex hover:text-cyan-500 w-[13rem] h-10 pt-1 text-white pl-2">
          <GiClothesline className="w-8 h-8 " />
          <Link to="/schoolProducts#male" className="pr-12 font-serif text-sm pl-2 pt-2 font-semibold">
          Mens Clothes
          </Link>          </div>
          <div className="flex hover:text-cyan-500 w-[12rem] h-10 pt-3 text-white pl-2">
          <GrTechnology  className="w-6 h-6 " />
          <Link to="/schoolProducts#technology" className="pr-12 font-serif text-sm pl-2 pt-2 font-semibold">
          Technology
          </Link>             </div> 
          <div className="flex  hover:text-cyan-500 w-[13rem] h-10 pt-4 text-white ">
          <GiDress className="w-[2rem] h-8 " />
          <Link to="/schoolProducts#female" className="pr-12 font-serif text-sm pl-2 pt-2 font-semibold">
          Female Clothes
          </Link>             </div> 
          <div className="flex pl-2 hover:text-cyan-500 w-[12rem] h-10 pt-5 text-white">
          <GiJewelCrown className="w-6 h-6 pr-1" />
          <Link to="/schoolProducts#jewelry" className="pr-12 font-serif text-sm pl-2 pt-2 font-semibold">
          Jewelry
          </Link>             </div> 
          <div className="flex hover:text-cyan-500 w-[14rem] h-10 pt-6 text-white">
          <MdOutlineCategory className="w-[2rem] h-8 " />
          <a className=" pr-12 font-serif text-sm pl-2 pt-2 font-semibold">Other Categories</a> 
          </div>
        </div>
        <div>
            <div className='py-2 group  ml-[8rem]'>
            <div className="  w-screen">
                <img className="h-[19rem] w-[27rem] bg-slate-900" src={slides[currentIndex].url} alt="slide" />
            </div>
          <div className='hidden group-hover:block absolute top-[20rem] translate-x-0 translate-y-[-50%] left-[21rem] text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactLeft onClick={prevSlide} size={30} />
          </div>
          {/* Right Arrow */}
          <div className='hidden group-hover:block absolute top-[20rem] -translate-x-0 translate-y-[-50%] right-[27rem] text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactRight onClick={nextSlide} size={30} />
          </div>
          <div className=' pl-[14rem] flex top-4 justify-center py-2 pt-12'>
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className='text-2xl cursor-pointer'
              >
                <RxDotFilled className="dark:text-white"/>
              </div>
            ))}
          </div>
          <div className="">
          <FaOpencart  className="w-[20rem] h-[2rem] pl-28 text-cyan-600 dark:text-violet-600"/>
          </div>
        </div> 
        </div>
        <div className=" ml-[25rem] h-[15rem] w-[15rem] bg-slate-800 rounded-md">
            <ul className="text-white font-serif  pt-4 font-bold text-[1.2rem]">
                <l1 className="flex pl-2 hover:text-cyan-500 pt-2 "><HiQuestionMarkCircle className="h-7 w-8" /><a href="Help">Help Center</a></l1>
                <l1 className=" flex pl-2 hover:text-cyan-500 pt-4 "><IoMdFlame className="h-7 w-8" />Top Deals</l1>
                <l1 className=" flex pl-3 hover:text-cyan-500 pt-5 "><GiHidden className="h-7 w-8" />Exclusive</l1>
            </ul>
        </div>
       </div>
       <div className=""><Display username={username}/></div>
       <div><Contact/></div>
        </div>
            </div>
        </>
    )
}

export default Home