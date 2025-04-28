import React, {useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import Female from '../Category/Female'
import Jewelry from '../Category/Jewelry'
import Male from '../Category/Male'
import Technology from '../Category/Technology'





function Product()
{
    const [products, setProducts] = useState([])
    const [fetchedData, setFetchData ] = useState(false)
    const [maleClothes, setMaleClothes ] = useState([])
    const [femaleClothes, setFemaleClothes ] = useState([])
    const [jewelry, setJewelry ] = useState([])
    const [technology, setTechnology ] = useState([])
    useEffect(() => 
    {
        const fetchData = async ()=>
        {
            try{
                await axios.get("http://localhost:8000/Products/api/products")
            .then((res) => setProducts(res.data))
            console.log("these is products", products)
            //for setting female products
            const womenClothes = products.filter((data) => 
            {
                return data && data.category &&  data.category.toLowerCase().includes("female")
            })
            setFemaleClothes(womenClothes)
            console.log("This is the female clothes", femaleClothes)
            //For Setting male clothes 
            const menClothes = products.filter((data) => {
                return data && data.category && data.category.toLowerCase().includes("maleclothes")
            })
            console.log("show me the menClothes", menClothes)
            setMaleClothes(menClothes)
            console.log("This is the male clothes from products", maleClothes)
            const jewel = products.filter((data) => {
                return data && data.category && data.category.toLowerCase().includes("jewelry")
            })
            setJewelry(jewel)
            const tech = products.filter((data) => 
            {
                return data && data.category && data.category.toLowerCase().includes("technology")

            })
            setTechnology(tech)
            setFetchData(true)
            return console.log("Successfully fetched data")
            }
            catch(err){
                return console.log("error fetching data", err)
            }
        }
        fetchData()
    },[products.length])
    useEffect(() => {
        if (location.hash) {
          const id = location.hash.replace("#", "");
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    
return(
    <>
    <Navbar/>
    <a href="#male" className="text-cyan-500 pt-[22rem] text-5xl">Press me</a>
    <Female id="female" female={femaleClothes}/>
    <Jewelry id="jewelry" jewelry={jewelry}/> 
    < Male id="male"  male={maleClothes}/>
    <Technology id="technology" technology={technology}/>
    </>
)
}



export default Product