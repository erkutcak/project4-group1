import React, { useEffect, useState } from "react";
import Item from "./Item";

function Transactions({user, item}) {
    const [transactions, setTransactions] = useState([])
    const [users, setUsers] = useState([])
<<<<<<< HEAD
    
=======

>>>>>>> 192bfd5220d6cf5f4e8d14f50280b31fa6256069
    useEffect(() => { 
        fetch('/users')
        .then(res => res.json())
        .then(data => setUsers(data))

        fetch('/transactions')
        .then(res => res.json())
        .then(data => handleTransaction(data))
<<<<<<< HEAD

        fetch('/users')
        .then(res => res.json())
        .then(data => setUsers(data))
=======
>>>>>>> 192bfd5220d6cf5f4e8d14f50280b31fa6256069
    }, [user])

    const handleTransaction = (item) => {
        setTransactions(item.filter(el => el.buyer_id === user.id))
    }

    const displayItems = transactions.map(el => {
<<<<<<< HEAD
        const currentItem = item.filter(item => item.id === el.buyer_id)
        
        return (
        <div>
        <h3>seller: {users.filter(x => x.id == el.seller_id)[0].username}, item id:{el.item_id}</h3> 
        <h2>item: name:{currentItem[0].name}, price:{currentItem[0].price} {currentItem[0].image}</h2>
         
        </div>)
    })
    
=======
        const currentItem = item.filter(item => item.id === el.item_id)
        console.log(currentItem);
        return (
            <ul>
                <h3>seller: {users.filter(x => x.id == el.seller_id)[0].username}, item id:{el.item_id}</h3> 
                <h2>item: {currentItem[0].name}, price:{currentItem[0].price} {currentItem[0].image}</h2>
            </ul>)
    })

>>>>>>> 192bfd5220d6cf5f4e8d14f50280b31fa6256069

    // console.log(transactions.filter(el => el.buyer_id === user.id))
    return (
        <div>
            <h1>Transactions Page</h1>
            {displayItems}
        </div>
    )
    }


export default Transactions;
