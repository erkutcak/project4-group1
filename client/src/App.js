import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import UserPage from "./components/UserPage";
import ShoppingCart from "./components/ShoppingCart";
import Transactions from "./components/Transactions";
import SignUpForm from "./components/Signupform";
import Sell from "./components/Sell";
import MyListing from "./components/MyListing";


function App() {
  const [user, setUser] = useState(null)
  const [items, setItems] = useState([])
  const [cart, setCart] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    fetch('/items')
        .then((response) => response.json())
        .then((data) => setItems(data));

    fetch('/shoppingcarts')
        .then((response) => response.json())
        .then((data) => setCart(data));
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

  function handlepatch(new_cart_id, item){
    console.log(new_cart_id[0].id);
    console.log(item.id);
    fetch(`/items/${item.id}`, {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({cart_id : new_cart_id[0].id})
  })}

  function handleCartClick(item) {
    console.log(item)
    handlepatch(cart.filter(id => id.user_id === user.id), item)
    
    if (!cartItems.includes(item)){
    setCartItems(current => [...current, item])}
    setPopup(true)
    // alert("Item added to cart")
  }

  return(
    <div>
      <NavBar user={user} onLogin={onLogin}/>
      <Routes>
        <Route path="/" element={<Homepage items={items} user={user} setItems={setItems} handleCartClick={handleCartClick} onLogin={onLogin} popup={popup} setPopup={setPopup}/>} />
        <Route path="/login" element={<Login onLogin={onLogin}/>} />
        <Route path="/userId" element={<UserPage />} />
        <Route path="/userId/cart" element={<ShoppingCart user={user} items={items} cards={cartItems} setCards={setCartItems}/>} />     
        <Route path="/userId/transactions" element={<Transactions  user={user} item={items}/>} />
        <Route path="/signup" element={<SignUpForm onLogin={onLogin} />} />
        <Route path='/sell' element={<Sell user={user} items={items} addItem={addItem} setItems={setItems}/>} />
        <Route path='/MyListing' element={<MyListing user={user} items={items} setItems={setItems}/>} />
      </Routes>
    </div>
  )

}

export default App;
