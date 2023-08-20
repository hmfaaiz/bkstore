
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import { Component } from "react";

import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import Addbook from "./Pages/Addbook"
import InventoryPage from "./Pages/Inventory"
import Auth from "./Pages/Auth"


function App() {
  const isLogin = localStorage.getItem("login")


  return (
    <>
      <BrowserRouter>
        <Routes>
          

          <Route path="/" element={<Auth Component={Login} />} />
        
          <Route path="/home" element={<Auth Component={Home} />} />
          <Route path="/" element={< Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/addbook" element={<Addbook/>} />
          <Route path="/inventory" element={<InventoryPage/>} />

        </Routes>

      </BrowserRouter>
    </>

  )

}

export default App;
