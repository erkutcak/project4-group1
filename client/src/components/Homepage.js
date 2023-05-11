import React, { useEffect, useState } from "react";
import NavBar from "./NavBar"
import homepage from './homepage.css'

function HomePage({user, onLogin}) {
    
        const [items, setItems] = useState([])
    
    useEffect(() => {
        fetch('http://127.0.0.1:5555/items')
            .then((response) => response.json())
            .then((data) => setItems(data));
    }, []);
    
    return (
        <div className="header">
            <NavBar user={user} onLogin={onLogin}/>
            <h1 className="center">Featured Items</h1>
            <h1 className="categories">Category</h1>
            <div className="grid-container">
                {items.map((item) => (
                    <div key={item.id} className="card">
                        <img>{item.image}</img>
                        <h3>{item.name}</h3>
                        <p>Price: {item.price}</p>
                        <button className="cardbutton" type="submit">Add To Cart</button>
                    </div>
                ))}
            </div>
        </div>
        )
    }


export default HomePage;