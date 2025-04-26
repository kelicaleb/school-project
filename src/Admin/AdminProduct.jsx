import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar'
import axios from 'axios';
import { TiTick } from "react-icons/ti";
import { FaMixer } from "react-icons/fa6";

const AdminProduct = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [item, setItem] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const [height, setHeight ] = useState("33rem")
  const [notification, setNotification ] = useState()
  const [success, setSucess]= useState("")
  const [icon, setIcon ] = useState()

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData to send data including the image
    const formData = new FormData();
    formData.append('serialNumber', serialNumber);
    formData.append('item', item);
    formData.append('category', category);
    formData.append('stock', stock);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8000/Products/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setHeight("34rem")
        setSucess("Successfully sent")
        setNotification(true)
        setIcon(<TiTick className="text-green"/>)
      } else {
        setErrorMessage('Failed to add product');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setHeight("34rem")
      setNotification(false)
      setIcon(<FaMixer/>)
      setSucess("Failed to post")
    }
  };

  return (
    <>
    <AdminNavbar />
    <div className="items-center justify-center bg-gradient-to-br from-cyan-500 to-cyan-700 h-screen w-screen absolute bg-no-repeat inset-0 ">
      <div className="relative flex items-center justify-center top-[5rem] rounded-md">
        <div className="bg-white/30  w-[33rem] rounded-md" style={{height:height}}>
        <h1 className="font-serif font-bold text-white pt-2 text-xl">Add New Product</h1>
        <form onSubmit={handleSubmit} >
       <div className="pt-2">
          <p className="font-serif font-semibold text-white pt-2 pr-[22rem] ">Serial Number:</p>
          <div className="pt-2">
          <input
            className="w-[30rem] h-9  rounded-md bg-white/40 placeholder-white text-center"
            placeholder="Serial Number"
            type="text"
            id="serialNumber"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            required />
          </div>
        </div>
        <div className="pt-2">
          <p className="font-serif font-semibold pt-2 pr-[23rem] text-white">Item Name:</p>
          <div className="pt-2">
          <input
            className="rounded-md bg-white/40 font-serif text-center placeholder-white w-[30rem] h-9"
            placeholder="Item Name"
            type="text"
            id="item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required />
          </div>
        </div>
        <div className="pt-2">
          <p className="font-serif font-semibold pt-2 pr-[24rem] text-white ">Category:</p>
          <input
          className=" bg-white/40 w-[30rem] h-9 placeholder-white text-center rounded-md "
          placeholder="Category"
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required />
        </div>
        <div className="pt-2">
          <p className="font-serif font-semibold pt-2 pr-[22rem] text-white">Stock Quantity:</p>
          <input
            className="w-[30rem] h-9 text-center placeholder-white rounded-md bg-white/40"
            placeholder="Stock Quantity"
            type="text"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required />
        </div>
        <div>
          <p className="font-serif font-semibold pt-2 pr-[22rem] text-white">Product Image:</p>
          <div className="pt-2 pl-4">
          <input
            className="block w-[30rem] font-serif bg-white/20 h-9 pt-2 pl-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            required />
          </div>
        </div>
        <div className="pt-4">
        <button className="h-9 w-[30rem] text-white bg-cyan-600 rounded-md hover:bg-cyan-500" type="submit">Add Product</button>
        </div>
        <div className="relative flex items-center justify-center pt-2">
          {
            notification ?(
            <><div className="text-green-500 text-4xl pt-1">{icon}</div><p className="text-green-400 font-serif pt-2 font-semibold">{success}</p></>
          ):(
            <>
            <div className=" relative flex">
            <div className="text-red-500 pt-1  text-3xl ">{icon}</div><p className="pl-1 text-red-500 font-serif pt-2 font-semibold">{success}</p>
            </div>
            </>
          )
          }
        </div>
      </form>
      </div>
      </div>
    
    </div></>
  );
};

export default AdminProduct;
