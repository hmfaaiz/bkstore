
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import { Component } from "react";

import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
// import Auth from "./Pages/Auth"


function App() {
  const isLogin = localStorage.getItem("login")


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />

          {/* <Route path="/" element={<Auth Component={Login} />} /> */}
          <Route path="/" element={< Login />} />
          {/* <Route path="/home" element={<Auth Component={Home} />} /> */}
          <Route path="/home" element={<Home/>} />

        </Routes>

      </BrowserRouter>
    </>

  )

}

export default App;
