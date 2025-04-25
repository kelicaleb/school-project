import React,{useState, useEffect  } from 'react'
import AdminNavbar from './AdminNavbar'
import ImageUploader from './ImageUploader'





function AdminProducts(){
    const [image, setImage ] = useState([])
    useEffect(() => 
    {
        console.log("This is the value of the image",image)
    },[])
return(
    <>
    <div>
        <AdminNavbar/>
        <div className="min-h-[50rem] top-[4rem] flex items-center justify-center bg-gradient-to-br from-cyan-600 via-teal-500 to-blue-500 absolute h-screen w-screen bg-center bg-no-repeat inset-0 ">
        <div className="  h-[48rem] w-[40em] rounded-md  bg-white/30 ">
            <form>
            <h2 className="font-serif font-bold text-white pt-4 text-2xl">Add product</h2>
            <div className="pt-2"> 
                <p className="flex font-serif font-semibold text-lg text-white pl-8 pt-2">Serial Number: </p>
                <div>
                <input className="w-[36rem] h-9 text-center font-serif bg-white/50 backdrop-blur-md text-xl text-white rounded-md font-semibold" type="text" placeholder="Serial Number"/>
                </div>
            </div>
            <div className="pt-2">
                <p className="font-serif font-semibold text-white pr-[32rem] text-lg">Item:</p>
                <div className="">
                    <input className="w-[36rem] h-9 rounded-md text-center font-serif font-semibold bg-white/50 backdrop-blur-md text-xl " type="text" placeholder="Item" />
                </div>
            </div>
            <div className="pt-2">
                <p className="text-white font-serif font-semibold pr-[30rem] text-lg">Category: </p>
                <input className="text-white font-serif font-semibold text-center w-[36rem] h-9 bg-white/50 rounded-md" type="text" placeholder="Category"/>
            </div>
            <div className="pt-2">
                <p className="text-white font-serif font-semibold pr-[32rem] text-lg">Stock: </p>
                <input className="text-white font-serif font-semibold text-center w-[36rem] h-9 bg-white/50 rounded-md" type="text" placeholder="Stock"/>
            </div>
            <div className="pt-4">
            <p className="font-serif text-white font-semibold text-xl">Upload Image</p>
            <ImageUploader image={image}/>
            </div>
            <div className="pt-12">
                <button className="bg-cyan-600 text-white hover:bg-cyan-400 w-[36rem] h-9 rounded-md ">Add Product</button>
            </div>
            </form>
            </div>
        </div>
    </div>
    </>
)

}



export default AdminProducts