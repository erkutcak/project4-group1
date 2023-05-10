import React, { useEffect, useState } from "react";
import { Switch, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import UserPage from "./components/UserPage";
import ShoppingCart from "./components/ShoppingCart";
import Transactions from "./components/Transactions";
import SignUpForm from "./components/Signupform";
import Sell from "./components/Sell";


function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  
  const onLogin = (x) => {
    setUser(x)
    console.log(x)
  }
  
  return(
    <Routes>
      <Route path="/" element={<Homepage user={user} onLogin={onLogin}/>} />
      <Route path="/login" element={<Login onLogin={onLogin}/>} />
      <Route path="/userId" element={<UserPage />} />
      <Route path="/userId/cart" element={<ShoppingCart />} />
      <Route path="/userId/transactions" element={<Transactions />} />
      <Route path="/signup" element={<SignUpForm onLogin={onLogin} />} />
      <Route path='/sell' element={<Sell />} />
    </Routes>
  )

}

export default App;
