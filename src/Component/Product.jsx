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
    const [control, setControl ] = useState(false)
    const [list, setList ] = useState([])



    console.log("this is control", control)
    console.log("this is products", list)
    console.log("this is female",  femaleClothes)
    useEffect(() => 
    {
        const fetchData = async ()=>
        {
            try{
              if(!control)
              {
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
              else{
                await axios.get("http://localhost:8000/Products/api/products")
                .then((res) => setProducts(res.data))
                console.log("these is products", products)
                //for setting female products
                const womenClothes = list.filter((data) => 
                {
                    return data && data.category &&  data.category.toLowerCase().includes("female")
                })
                setFemaleClothes(womenClothes)
                console.log("This is the female clothes", femaleClothes)
                //For Setting male clothes 
                const menClothes = list.filter((data) => {
                    return data && data.category && data.category.toLowerCase().includes("maleclothes")
                })
                console.log("show me the menClothes", menClothes)
                setMaleClothes(menClothes)
                console.log("This is the male clothes from products", maleClothes)
                const jewel = list.filter((data) => {
                    return data && data.category && data.category.toLowerCase().includes("jewelry")
                })
                setJewelry(jewel)
                const tech = list.filter((data) => 
                {
                    return data && data.category && data.category.toLowerCase().includes("technology")
    
                })
                setTechnology(tech)
                setFetchData(true)
                return console.log("Successfully fetched data")
              }
            }
            catch(err){
                return console.log("error fetching data", err)
            }
        }
        fetchData()
    
    },[list, products.length])
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
{
    !control && 
    <>
    <Navbar products={products} setProducts={setProducts} Control={setControl} lists={setList}/>
    <h1 className="font-serif font-bold pt-12 text-4xl text-cyan-600 underline">Products</h1>
    <Female id="female" female={femaleClothes} />
    <Jewelry id="jewelry" jewelry={jewelry} />
    <Male id="male" male={maleClothes} />
    <Technology id="technology" technology={technology} /></>
}
{
    control && 
    <>
    <Navbar  products={products} setProducts={setProducts} Control={setControl} lists={setList}/>
    <h1 className="font-serif font-bold pt-12 text-4xl text-cyan-600 underline">Products</h1>
    <Female id="female" female={femaleClothes}/>
    <Jewelry id="jewelry" jewelry={jewelry}/> 
    < Male id="male"  male={maleClothes}/>
    <Technology id="technology" technology={technology}/>
    </>
}
    </>
)
}



export default Product