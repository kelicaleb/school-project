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
import { FaRegCircleQuestion } from "react-icons/fa6";
import { MdOutlineTimer } from "react-icons/md";
import { FaRegIdCard } from "react-icons/fa6";
import Contact from './Contact'

function Home() {
    const[login, setLogin ] = useState([])
    const[gender, setGender ] = useState('')
    const[checkGender, setCheckGender] = useState(false)
    const[trigger, setTrigger ]= useState(0)
    const [count, setCount] = useState(true)
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [mode, setMode] = useState("light bg-slate-200 bg-no-repeat bg-center bg-cover inset-0 mt-16 h-screen w-screen absolute flex h-[37.7rem]")
    const [femaleStartIndex, setFemaleStartIndex] = useState(0)
  
    useEffect(() => {
        const data = localStorage.getItem("Mode")
        if(data === 'light') {
            setMode('light')
        } else {
            setMode('dark')
        }
    })

    useEffect(() => {
        const fecthData = async () => {
            await axios.get("http://localhost:8000/Logins")
            .then((res) => setLogin(res.data))

            login.map(async (data) => {
                if(data.gender == "Male") {
                    setCheckGender(true)
                } else {
                    setCheckGender(false)
                }
                setUsername(data.username)
            })
        }
        fecthData()
    }, [login.length])  
    
    const female = [
        {
            url:'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
            title: 'Women\'s Jacket'
        },
        {
            url: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
            title: 'Women\'s T-Shirt'
        },
        {
            url: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
            title: 'Women\'s Dress'
        },
        {
            url:'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
            title: 'Women\'s Top'
        },
        {
            url:"https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
            title: 'Women\'s Dress'
        },
        {
            url:"https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
            title: 'Women\'s Shirt'
        },
        {
            url:"https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
            title: 'Women\'s Blouse'
        },
        {
            url:"https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
            title: 'Women\'s Jacket'
        }
    ]
    
    const slides = [
        {
            url: 'https://i.pinimg.com/736x/ae/ea/bb/aeeabb31ab793a3d2ab28d2b59561b3d.jpg',
        },
        {
            url:"https://i.pinimg.com/736x/e1/e9/f2/e1e9f25c5aa0095d521630c88f50b566.jpg"
        },
        {
            url:"https://i.pinimg.com/736x/89/e9/ab/89e9ab71dd0fd7cc1f35fe604cb8bf02.jpg"
        },
        {
            url: 'https://i.pinimg.com/736x/11/ea/13/11ea136449dba81b8968b36111f99d62.jpg',
        },
        {
            url: 'https://i.pinimg.com/736x/b1/29/3c/b1293c4270c0edc460e7b37a79563073.jpg',
        },
        {
            url: 'https://i.pinimg.com/736x/d5/14/5d/d5145dbba2f8465d83a9326a5595007d.jpg',
        },
        {
            url: 'https://i.pinimg.com/736x/c9/5c/70/c95c70bb83ea64dc259a1d76d22becec.jpg',
        }
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        if(checkGender) {
            const isFirstSlide = currentIndex === 0;
            const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
            setCurrentIndex(newIndex);
        } else {
            const isFirstSlide = currentIndex === 0;
            const newIndex = isFirstSlide ? female.length - 1 : currentIndex - 1;
            setCurrentIndex(newIndex);
        }
    };

    const nextSlide = () => {
        if(checkGender) {
            const isLastSlide = currentIndex === slides.length - 1;
            const newIndex = isLastSlide ? 0 : currentIndex + 1;
            setCurrentIndex(newIndex);
        } else {
            const isLastSlide = currentIndex === female.length - 1;
            const newIndex = isLastSlide ? 0 : currentIndex + 1;
            setCurrentIndex(newIndex);
        }
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };
    
    const nextFemaleItems = () => {
        if (femaleStartIndex + 5 < female.length) {
            setFemaleStartIndex(femaleStartIndex + 1);
        }
    };
    
    const prevFemaleItems = () => {
        if (femaleStartIndex > 0) {
            setFemaleStartIndex(femaleStartIndex - 1);
        }
    };
    
    useEffect(() => {
        const transition = setInterval(nextSlide, 3000)
        axios.get("https://fakestoreapi.com/products")
        return(() => {
            clearInterval(transition)
        })
    }, [currentIndex])
    
    const visibleFemaleItems = female.slice(femaleStartIndex, femaleStartIndex + 5);
   
    return(
        <>
            <div className={mode + "pt-16"}>
             <Navbar/>
                <div className="pl-2">
                    <h1 className="pb-4 text-center pt-8 font-serif underline text-5xl text-cyan-600 font-semibold dark:text-violet-600">Home Page</h1>
                    <div className="w-[78rem] bg-cyan-600 h-12 pt-2 rounded-md dark:bg-violet-600">
                        <h1 className="text-white text-1xl font-serif font-semibold pr-[66rem] pt-1"> Welcome {username}</h1>
                    </div>
                    {loading && 
                        <div className="sweet-loading relative flex items-center justify-center pt-32 text-cyan-600">
                            <ClipLoader/>
                        </div>
                    }
         
                    <div className="grid grid-cols-3 pr-[20rem] pt-8">
                        <div className="bg-slate-800 h-[20rem] w-[14rem] rounded-md pl-1 pt-2">
                            <div className="flex hover:text-cyan-500 w-[13rem] h-10 pt-1 text-white pl-2">
                                <GiClothesline className="w-8 h-8" />
                                <a className="pr-12 font-serif text-sm pl-2 pt-2 font-semibold">Mens Clothes</a> 
                            </div>
                            <div className="flex hover:text-cyan-500 w-[12rem] h-10 pt-3 text-white pl-2">
                                <GrTechnology className="w-6 h-6" />
                                <a className="pr-12 font-serif text-sm pl-2 pt-1 font-semibold">Technology</a> 
                            </div> 
                            <div className="flex hover:text-cyan-500 w-[13rem] h-10 pt-4 text-white">
                                <GiDress className="w-[2rem] h-8" />
                                <a className="pr-12 font-serif font-semibold text-sm pt-2">Female Clothes</a> 
                            </div> 
                            <div className="flex pl-2 hover:text-cyan-500 w-[12rem] h-10 pt-5 text-white">
                                <GiJewelCrown className="w-6 h-6 pr-1" />
                                <a className="pr-12 font-serif text-sm pl-1 pt-2 font-semibold">Jewellery</a> 
                            </div> 
                            <div className="flex hover:text-cyan-500 w-[14rem] h-10 pt-6 text-white">
                                <MdOutlineCategory className="w-[2rem] h-8" />
                                <a className="pr-12 font-serif text-sm pl-2 pt-2 font-semibold">Other Categories</a> 
                            </div>
                        </div>
     
                        <div className="group w-[28rem] pr-2">
                            <div className='h-[40rem] py-2 px-4'>
                                <div className="flex items-center justify-center w-[28rem] h-[12rem] pt-12">
                                    <img className="h-[19rem] w-[44rem] bg-slate-900" src={slides[currentIndex].url} alt="slide" />
                                </div>
                                <div className='hidden group-hover:block absolute top-[20rem] translate-x-0 translate-y-[-50%] right-[25rem] text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                                    <BsChevronCompactLeft onClick={prevSlide} size={30} />
                                </div>
                                <div className='hidden group-hover:block absolute top-[20rem] translate-x-0 translate-y-[-50%] left-[22rem] text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                                    <BsChevronCompactRight onClick={nextSlide} size={30} />
                                </div>
                                <div className='flex top-12 justify-center py-4 pt-28'>
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
                                <div className="pl-12">
                                    <FaOpencart className="w-[20rem] h-[2rem] text-cyan-600 dark:text-violet-600"/>
                                </div>
                            </div>
                        </div>
                        
                        <div className="pl-[20rem]"> 
                            <div className="bg-slate-800 h-[12rem] w-[15rem] pt-4 text-center rounded-md">
                                <div className="flex">
                                    <p className="text-white font-serif hover:text-cyan-500 font-semibold flex pl-2">
                                        <FaRegCircleQuestion className="w-6 h-6 pr-2"/>Help Center</p>
                                </div>
                                <div className="flex pt-4">
                                    <p className="text-white font-serif hover:text-cyan-500 font-semibold flex pl-2">
                                        <MdOutlineTimer className="w-7 h-7 pr-2"/>Top deals</p>
                                </div> 
                                <div className="flex pt-4">
                                    <p className="text-white font-serif hover:text-cyan-500 font-semibold flex pl-2">
                                        <FaRegIdCard className="w-7 h-7 pr-2"/>Exclusive</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="absolute top-[40rem] w-[78rem]">
                        <div className="bg-cyan-600 h-12 w-full rounded-md relative">
                            <h2 className="text-white pt-3 font-semibold font-serif">{username} Top picks</h2>
                        </div>
                        
                        <div className="relative w-full mt-8 h-[12rem] flex ">
                            {femaleStartIndex > 0 && (
                                <button 
                                    onClick={prevFemaleItems}
                                    className="absolute left-0 top-20 transform -translate-y-1/2 z-10 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"
                                >
                                    <BsChevronCompactLeft size={24} />
                                </button>
                            )}
                            
                            <div className="flex space-x-12 overflow-hidden h-[15rem] pt-2">
                                {visibleFemaleItems.map((item, index) => (
                                    <div key={index} className="flex-shrink-0 w-48 bg-white rounded-lg shadow-xl pl-2 dark:bg-gray-700
                                    hover:shadow-cyan-500 h-[12rem] hover:-translate-y-1">
                                        <img 
                                            className="h-40 w-full object-contain mb-2" 
                                            src={item.url} 
                                            alt={item.title} 
                                        />
                                        <p className="text-sm font-medium text-center text-gray-800 dark:text-gray-200 pb-2">
                                            {item.title}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            
                            {femaleStartIndex + 5 < female.length && (
                                <button 
                                    onClick={nextFemaleItems}
                                    className="absolute right-0 top-20 transform -translate-y-1/2 z-10 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"
                                >
                                    <BsChevronCompactRight size={24} />
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="h-screen w-screen place-items-start">
                        <Contact/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home