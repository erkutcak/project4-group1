import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import "../Transactions.css"
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

function Transactions({user, item}) {
    const [transactions, setTransactions] = useState([])
    const [users, setUsers] = useState([])
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ container: ref });

    useEffect(() => { 
        fetch('/users')
        .then(res => res.json())
        .then(data => setUsers(data))

        fetch('/transactions')
        .then(res => res.json())
        .then(data => handleTransaction(data))
    }, [user])

    const handleTransaction = (item) => {
        setTransactions(item.filter(el => el.buyer_id === user.id))
    }

    const displayItems = transactions.map(el => {
        const currentItem = item.filter(item => item.id === el.item_id)
        // console.log(transactions);
        // console.log(transactions[0].item_id)
        // console.log(transactions.filter(el => el.item_id == currentItem[0].id)[0].created_at)
        // console.log(transactions.filter(el => el.item_id == currentItem.id));
        return (
            <li className="transactions-card">
                <img className="transaction-img" src={currentItem[0].image ? currentItem[0].image : logo}></img>
                <h3 className="transaction-name">Item: {currentItem[0].name}</h3>
                <h3 className="transaction-price">Price: ${currentItem[0].price}</h3>
                <h3 className="transaction-seller">Seller: {users?.filter(x => x.id === el.seller_id)[0].username}</h3>
                <h3 className="transaction-date">Date: {transactions.filter(el => el.item_id == currentItem[0].id)[0].created_at}</h3>
                {/* <h3 className="transaction-item-id">Item id: {el.item_id}</h3> */}
            </li>)
    }) 
// transactions[0].created_at
    return (
        <div className='transactions-container'>
            <div className="transactions-left">
                <h1 className="transactions-title">My Past Purchases</h1>
            </div>
            <hr className="vl" />
            <>
        <svg id="tr-progress" width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
        <motion.circle
            cx="50"
            cy="50"
            r="30"
            pathLength="1"
            className="indicator"
            style={{ pathLength: scrollYProgress }}
        />
        </svg>
        <ul className='transactions-list' ref={ref}>
            {displayItems}
        </ul>
        </>
        </div>
    )
    }


export default Transactions;