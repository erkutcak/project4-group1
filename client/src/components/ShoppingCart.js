import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import OtherNavBar from "./OtherNavBar";

function ShoppingCart({user}) {
    
    const [items, setItems] = useState([])
    const [users, setUsers] = useState([])
    const [cart, setCart] = useState([])
    
    useEffect(() => {
        fetch(`http://127.0.0.1:5555/shoppingcarts/`)
          .then((response) => response.json())
          .then((data) => console.log(data));
      }, []);

      useEffect(() => {
        fetch(`http://127.0.0.1:5555/items/`)
          .then((response) => response.json())
          .then((data) => setItems(data));
      }, []);
      
    //get list of items that have the same shopping cart id. how to get the user ID im logged into??
    
    
    return (
        <div className="header">
          <div className="navbar">
          <OtherNavBar/>
            </div>
            <h1>Cart Page </h1>
            <div>
            </div>
        </div>
    )
    }


export default ShoppingCart;