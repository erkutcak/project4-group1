import React, { useEffect, useState } from "react";
import { Switch, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import UserPage from "./components/UserPage";
import ShoppingCart from "./components/ShoppingCart";
import Transactions from "./components/Transactions";
import SignUpForm from "./components/Signupform";
import Sell from "./components/Sell";


function App() {
  const [user, setUser] = useState(null)
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:5555/items')
        .then((response) => response.json())
        .then((data) => setItems(data));
  }, []);

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

  const addItem = (item) => setItems(current => [...current,item])

  function handleCartClick(item) {
    if(!cartItems.includes(item)) {
        const updateCartItems = [...cartItems, item]
        setCartItems(updateCartItems)
    } else if (cartItems.includes(item)) {
        const updateCartItems = cartItems.filter((listItem) => item.id !== listItem.id)
        setCartItems(updateCartItems)
    }
}
  
  return(
    <div>
      <NavBar user={user} onLogin={onLogin}/>
      <Routes>
        <Route path="/" element={<Homepage items={items} user={user} handleCartClick={handleCartClick} onLogin={onLogin}/>} />
        <Route path="/login" element={<Login onLogin={onLogin}/>} />
        <Route path="/userId" element={<UserPage />} />
        <Route path="/userId/cart" element={<ShoppingCart handleCartClick={handleCartClick} cartItems={cartItems}/>} />
        <Route path="/userId/transactions" element={<Transactions />} />
        <Route path="/signup" element={<SignUpForm onLogin={onLogin} />} />
        <Route path='/sell' element={<Sell user={user} items={items} addItem={addItem}/>} />
      </Routes>
    </div>
  )

}

export default App;
