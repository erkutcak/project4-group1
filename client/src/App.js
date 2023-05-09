import React, { useEffect, useState } from "react";
import { Switch, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import UserPage from "./components/UserPage";
import ShoppingCart from "./components/ShoppingCart";
import Transactions from "./components/Transactions";
import SignUpForm from "./components/Signupform";


function App() {
  
  return(
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/userId" element={<UserPage />} />
      <Route path="/userId/cart" element={<ShoppingCart />} />
      <Route path="/userId/transactions" element={<Transactions />} />
      <Route path="/signup" element={<SignUpForm />} />
    </Routes>
  )

}

export default App;
