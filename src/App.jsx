import React, { useState, useEffect  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Component/Home'
import Product from "./Component/Product"
import Cart from "./Component/Cart"
import Purchase from './Component/Purchase'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Login from './Component/Login';
import Register from './Component/Register'
import Test from './Component/Test'
import ForgetPassword from './Component/ForgetPassword'
import axios from 'axios'
import Admin from './Admin/AdminLogin'
import AdminHome from './Admin/AdminHome'
import AdminProducts from './Admin/AdminProduct'
import Male from './Category/Male'

// Create a wrapper component that uses useLocation
function AppContent() {


  const [logging, setLogging] = useState(false)
  const [purchaseData, setPurchaseData] = useState([])
  const location = useLocation()
  
  console.log("this is the location", location.pathname)
  //deleting data on purchase of not purchasing 
  useEffect(() => 
  {
    const fetchData  = async () => 
    {
      await axios.get("http://localhost:8000/purchase")
      .then((res) => setPurchaseData(res.data))


      purchaseData.map(async (data) => 
      {
        console.log("this is dataId ", data.purchaseId)
        console.log("this is the location ", location.pathname)
        if(location.pathname === "/Purchase")
        {
          return console.log("Do not delete data")
        }
        else{
          return await axios.delete(`http://localhost:8000/purchase/delete/${data.purchaseId}`)
          .then((res) => console.log(res,data))
        }

      })
      setLogging(true)

    }
    fetchData()
  },[logging])
  
  return (
    <div className="w-screen">
      <Routes>
        <Route index path="/" element={<Login/>}/>
        <Route path="/schoolHome" element={<Home/>}/>
        <Route path="/schoolProducts" element={<Product/>}/>
        <Route path="/schoolCart" element={<Cart/>}/>
        <Route path="/Purchase" element={<Purchase/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Test" element={<Test/>}/>
        <Route path="/ForgetPassword" element={<ForgetPassword/>}/>
        <Route path="/Admin" element={<Admin/>}/>
        <Route path="/AdminHome" element={<AdminHome/>}/>
        <Route path="/AdminProducts"  element={<AdminProducts/>}/>
      </Routes>
    </div>
  )
}

// Main App component
function App() {
  let Component;
  switch(window.location.pathname)
  {
    case"school-project/schoolProducts":
    Component = <Product/>
    break
  }
  return (
    <BrowserRouter basename="/school-project">
      <AppContent />
      {Component}
    </BrowserRouter>
  )
}

export default App