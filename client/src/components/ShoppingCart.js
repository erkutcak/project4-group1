import React, { useEffect, useState } from "react";
import Item from "./Item";

function ShoppingCart({user, items, cards, setCards}) {
    // const [cards, setCards] = useState([])
    const [cartId, setCartId] = useState('')
    
    useEffect(() => {
    fetch('/shoppingcarts')
    .then((response) => response.json())
    .then((data) => handleSet((data.filter(id => id.user_id === user.id))));
    }, [user])

    const handleSet = (carts) => { 
        setCartId(carts[0].user_id)
        // setCards(cards.concat(items.filter(item => item.cart_id === carts[0].id)))
        if (cards.length === 0) { 
            setCards(cards.concat(items.filter(item => item.cart_id === carts[0].id)))
        }
    }
    
    const handleCartClick = (item) => {
        fetch(`/items/${item.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({cart_id: null})
        })
        setCards(cards.filter(el => el !== item))
    }

    const displayItems = cards.map((item) => {
        return <Item 
            item={item}
            key={item.id}
            returnItem={'cart'}
            handleCartClick={handleCartClick}
            />
    })


    const handleButtonClick = (e) => {
        const x = e.target.value
        cards.forEach(item => { 
            console.log(cartId)
            fetch('/transactions', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({item_id: item.id, seller_id: item.user_id, buyer_id: cartId }),
                    
            })

            console.log(item.id)
            fetch(`/items/${item.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({cart_id: null, for_sale: null}),
        })});
        alert("Thank you for wasting your money with us!")
        setCards([])
    }

    return (
        <div>
            <h1>Shopping Cart Page</h1>
            {displayItems}
            <button onClick={handleButtonClick}> buy now </button>
        </div>
    )
    }


export default ShoppingCart;