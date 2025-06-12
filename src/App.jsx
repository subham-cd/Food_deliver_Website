
import React from "react"
import Navbar from "./components/Navbar/Navbar"
import { Route, Routes } from "react-router-dom"
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Home from "./pages/Home/Home.jsx"
import Footer from "./components/Footer/Footer.jsx"


function App() {

  return (
    <>
   <div className="app">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/order" element={<PlaceOrder/>}/>
    

     
    </Routes>

   </div>
   <Footer/>
   </>
  )
}

export default App
