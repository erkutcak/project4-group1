import React, { useEffect, useState } from "react";
import NavBar from "./NavBar"
import homepage from './homepage.css'
import Item from "./Item";

function HomePage({items, user, onLogin, handleCartClick}) {

    const displayItems = items.map((item) => {
        return <Item item={item} handleCartClick={handleCartClick}/>
    })
    
    return (
        <div className="header">
            <div className="category-container">
                <h2>Categories</h2>
                <li>Beauty & Health</li>
                <li>Food & Beverage</li>
                <li>Furniture & Decor</li>
                <li>Household Items</li>
                <li>Pet Supplies</li>
                <li>Office Equipment</li>
                <li>Clothing</li>
                <li>Electronics</li>
                <li>Books</li>
                <li>Toys</li>
                <li>Sports & Outdoors</li>
                <li>Auto Parts</li>
            </div>
            <div>
                <h1>Featured Items</h1>
                <div className="item-container">
                    {displayItems}
                </div>
            </div>
        </div>
        )
    }


export default HomePage;