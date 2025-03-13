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




function Home()
{
    const[login, setLogin ] = useState([])
    const[gender, setGender ] = useState('')
    const[checkGender, setCheckGender] = useState(false)
    const[trigger, setTrigger ]= useState(0)
    const [count, setCount] = useState(true)
    const [loading, setLoading  ] = useState(false)
    const [username, setUsername] = useState('')
    const [mode, setMode ] = useState("light bg-slate-200 bg-no-repeat bg-center bg-cover inset-0 mt-16 h-screen w-screen absolute flex h-[37.7rem]")
  
  useEffect(() => 
  {
    const data = localStorage.getItem("Mode")
    if(data === 'light')
    {
      setMode('light')
      
    }
    else{
      setMode('dark')
    }
  

  })



   useEffect(() => 
  {
    const fecthData = async () => 
    {
      await axios.get("http://localhost:8000/Logins")
      .then((res) => setLogin(res.data))

      login.map(async (data) => 
      {
        if(data.gender == "Male")
        {
          setCheckGender(true)

        }
        else{
          setCheckGender(false)
        }
        setUsername(data.username)
        
      })

    }
    fecthData()
  }, [login.length])  
    
  
    const female = [
        {
            url:'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg'
        },
        {
            url: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
          },
          {
            url: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
          },
          {
            url:'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg'
          },
          {
            url:"https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
          },
          {
            url:"https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
          }
    ]
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
    }, [currentIndex])
    
  
   
    return(
        <>
            <Navbar/>
            <div className={mode}>
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
         
       <div className="grid grid-cols-2 pr-[32rem] pt-8">
        <div className="bg-slate-800  h-[20rem] w-[14rem] rounded-md pl-1 pt-2">
          <div className="flex hover:text-cyan-500 w-[13rem] h-10 pt-1 text-white pl-2">
          <GiClothesline className="w-8 h-8 " />
          <a className=" pr-12 font-serif text-sm pl-2 pt-2 font-semibold">Mens Clothes</a> 
          </div>
          <div className="flex hover:text-cyan-500 w-[12rem] h-10 pt-3 text-white pl-2">
          <GrTechnology  className="w-6 h-6 " />
          <a className=" pr-12 font-serif text-sm pl-2 pt-1 font-semibold">Technology</a> 
          </div> 
          <div className="flex  hover:text-cyan-500 w-[13rem] h-10 pt-4 text-white ">
          <GiDress className="w-[2rem] h-8 " />
          <a className=" pr-12 font-serif font-semibold text-sm  pt-2">Female Clothes</a> 
          </div> 
          <div className="flex pl-2 hover:text-cyan-500 w-[12rem] h-10 pt-5 text-white">
          <GiJewelCrown className="w-6 h-6 pr-1" />
          <a className=" pr-12 font-serif text-sm pl-1 pt-2 font-semibold">Jewellery</a> 
          </div> 
          <div className="flex hover:text-cyan-500 w-[14rem] h-10 pt-6 text-white">
          <MdOutlineCategory className="w-[2rem] h-8 " />
          <a className=" pr-12 font-serif text-sm pl-2 pt-2 font-semibold">Other Categories</a> 
          </div>
        </div>
        <div>
        {
             checkGender ?( 
            <div className=' max-w-[38rem] h-[0rem] w-full m-auto py-2 px-4 relative group'>
            <div className="relative flex items-center justify-center">
                <img className="h-[17rem] bg-slate-900" src={slides[currentIndex].url} alt="slide" />
            </div>
          <div className='hidden group-hover:block absolute top-[9rem] translate-x-0 translate-y-[-50%] left-15 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactLeft onClick={prevSlide} size={30} />
          </div>
          {/* Right Arrow */}
          <div className='hidden group-hover:block absolute top-[9rem] -translate-x-0 translate-y-[-50%] right-12 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactRight onClick={nextSlide} size={30} />
          </div>
          <div className='flex top-4 justify-center py-2 pt-12'>
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
          <FaOpencart  className="w-[20rem] h-[2rem] pl-16 text-cyan-600 dark:text-violet-600"/>
          </div>
        </div>
        ):(
     
            <div className='max-w-[38rem] h-[30rem] w-full m-auto py-16 px-4 relative group'>
            <div className="relative flex items-center justify-center pt-2">
                <img className="h-[10rem] w-[10rem]" src={female[currentIndex].url} alt="slide" />
            </div>
          <div className='hidden group-hover:block absolute top-[35%] -translate-x-0 translate-y-[-50%] left-15 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactLeft onClick={prevSlide} size={30} />
          </div>
          {/* Right Arrow */}
          <div className='hidden group-hover:block absolute top-[35%] -translate-x-0 translate-y-[-50%] right-12 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactRight onClick={nextSlide} size={30} />
          </div>
          <div className='flex top-4 justify-center py-2 pt-12 '>
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className='text-2xl cursor-pointer dark:text-white'
              >
                <RxDotFilled className=" dark:text-white"/>
              </div>
            ))}
          </div>  
          <div className="pl-12">
          <FaOpencart  className="w-[20rem] h-[2rem]  dark:text-violet-600 text-cyan-600"/>
          </div>
        </div>
        )}
        </div>

       </div>
        </div>
            </div>
        </>
    )
}

export default Home