import React,{ useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Component/Home'
import Product from "./Component/Product"
import Cart from "./Component/Cart"
import Purchase from './Component/Purchase'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Component/Login';
import Register from './Component/Register'
function App() {
  const [logging, setLogging] = useState(false)
  return (
    <>
    <div className=" w-screen">
      <BrowserRouter>
        <Routes basename="/school-project">
          <Route index path="school-project/" element={<Home/>}/>
          <Route path="school-project/schoolHome" element={<Home/>}/>
          <Route path="school-project/schoolProducts" element={<Product/>}/>
          <Route path="school-project/schoolCart" element={<Cart/>}/>
          <Route path="school-project/Purchase" element={<Purchase/>}/>
          <Route path="school-project/Login" element={<Login/>}/>
          <Route path="school-project/Register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
