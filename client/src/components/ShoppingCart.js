import React, { useEffect, useState } from "react";
import Item from "./Item";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import '../Cart.css'
import '../Popup4.css'
import Popup4 from './Popup4'

function ShoppingCart({user, items, cards, setCards, popup4, setPopup4}) {
    // const [cards, setCards] = useState([])
    const [cartId, setCartId] = useState('')
    const ref = useRef(null);
    const { scrollXProgress } = useScroll({ container: ref });
    
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
        return <Item item={item} key={item.id} returnItem={'cart'} handleCartClick={handleCartClick}/>
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
        setCards([])
        setPopup4(true)
    }

    return (
        <div className="shopping-cart">
            <div className="cart-left">
                <h1 className="cart-title">Your Cart</h1>
                <button className='buy-now' onClick={handleButtonClick}><span class="button_top">Buy Now!</span></button>
            </div>
            <hr className="vl" />
            <>
        <svg id="progress" width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
        <motion.circle
            cx="50"
            cy="50"
            r="30"
            pathLength="1"
            className="indicator"
            style={{ pathLength: scrollXProgress }}
        />
        </svg>
        <ul className='cart-list' ref={ref}>
            {displayItems}
            <Popup4 trigger={popup4} setTrigger={setPopup4}>
                    <h3>Thank you for wasting your money with us!</h3>
            </Popup4> 
        </ul>
        </>
        </div>
    )
    }


export default ShoppingCart;