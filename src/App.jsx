import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {  Route} from "react-router-dom"
import Home from './Component/Home'
import Navbar from "./Component/Navbar"
import Product from "./Component/Product"
import Cart from "./Component/Cart"
function App() {
 let Component
 switch(window.location.pathname){
  case"Home":
  Component = <Home/>
  break
  case"Product":
  Component = <Product/>
  break
  case"Cart":
  Component = <Cart/>
  break
 }
 console.log(window.location.pathname)
  return (
    <>
    <div className=" w-screen">
      <Navbar/>
      { Component }
    </div>
    </>
  )
}

export default App
