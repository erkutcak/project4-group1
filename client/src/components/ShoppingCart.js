import React, { useEffect, useState } from "react";
import Item from "./Item";

function ShoppingCart({user, items}) {
    const [cards, setCards] = useState([])
    
    useEffect(() => {
    console.log(user)
    fetch('/shoppingcarts')
    .then((response) => response.json())
    .then((data) => handleSet((data.filter(id => id.user_id === user.id))));
    }, [user])

    const handleSet = (carts) => { 
        setCards(items.filter(item => item.cart_id === carts[0].id))
    }

    const handleCartClick = (id) => {
        console.log(id)
    }

    const displayItems = cards.map((item) => {
        return <Item 
            item={item}
            key={item.id}
            handleCartClick={handleCartClick}
            />
    })
    return (
        <div>
            <h1>Shopping Cart Page</h1>
            {displayItems}
        </div>
    )
    }


export default ShoppingCart;