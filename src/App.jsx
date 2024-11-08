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
  return (
    <>
    <div className=" w-screen">
      <BrowserRouter>
        <Routes>
          <Route index path="school-project/" element={<Home/>}/>
          <Route  path="school-project/Home" element={<Home/>}/>
          <Route path="school-project/Product" element={<Product/>}/>
          <Route path="school-project/Cart" element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App