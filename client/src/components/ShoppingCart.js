import React, { useEffect, useState } from "react";
import Item from "./Item";

function ShoppingCart({cartItems, handleCartClick}) {
    
    const displayItems = cartItems.map((item) => {
        return <Item 
            item={item}
            key={item.id}
            handleCartClick={handleCartClick}/>
    })
    
    return (
        <div>
            <h1>Shopping Cart Page</h1>
            {displayItems}
        </div>
    )
    }


export default ShoppingCart;