import React,{ useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Component/Home'
import Navbar from "./Component/Navbar"
import Product from "./Component/Product"
import Cart from "./Component/Cart"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  let component; 

  return (
    <>
    <div className=" w-screen">
      <BrowserRouter>
        <Routes basename="/school-project">
          <Route index path="school-project/" element={<Home/>}/>
          <Route  path="school-project/schoolHome" element={<Home/>}/>
          <Route path="school-project/schoolProducts" element={<Product/>}/>
          <Route path="school-project/schoolHome/Cart" element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
      {component}
    </div>
    </>
  )
}

export default App
