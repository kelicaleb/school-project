import React, {useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar'





function Product()
{
    const [products, setProducts] = useState([])
    const [fetchedData, setFetchData ] = useState(false)
    useEffect(() => 
    {
        const fetchData = async ()=>
        {
            try{
                await axios.get("http://localhost:8000/Products/api/products")
            .then((res) => setProducts(res.data))
            console.log(products)
            setFetchData(true)
            return console.log("Successfully fetched data")
            }
            catch(err){
                return console.log("error fetching data", err)
            }
        }
        fetchData()
    },[fetchedData])
    
return(
    <>
    <Navbar/>
    <div className="grid grid-cols-3 pt-12"> 
    {
        products.map(data =>
            <>
        <div className="pt-2 items-center justify-center relative flex ">
            <div className="pt-2">  
                <img className="pt-2 h-[12rem] w-[12rem]"src={`http://localhost:8000${data.image}`} alt={data.item} />
            </div>
         </div>
            </>
        )
    }
    </div>
    </>
)
}



export default Product