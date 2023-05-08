import React, { useEffect, useState } from "react";
import NavBar from "./NavBar"

function HomePage() {
    
        const [items, setItems] = useState([])
    
    useEffect(() => {
        fetch('http://127.0.0.1:5555/items')
            .then((response) => response.json())
            .then((data) => setItems(data));
    }, []);
    
    return (
        <div className="header">
            <NavBar />
            <h1>Featured Items</h1>
            <div className="card-container">
                {items.map((item) => (
                    <div key={item.id} className="card">
                        <h3>{item.name}</h3>
                        <p>Price: {item.price}</p>
                    </div>
                ))}
            </div>
        </div>
        )
    }


export default HomePage;