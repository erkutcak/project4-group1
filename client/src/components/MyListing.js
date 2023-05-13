import React, { useState } from "react";
import ListingItems from './ListingItems'
import Edit from "./Edit";
import "../MyListing.css";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";


function MyListing({user, items, setItems}) { 
    const myListings = items.filter(el => el.user_id === user?.id)
    const [edit, setEdit] = useState([])
    const ref = useRef(null);
    const { scrollXProgress } = useScroll({ container: ref });

    const handleDelete = (item) => {
        const filteredItems = items.filter(el => el !== item)
        setItems(filteredItems)

        fetch(`/items/${item.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })  
    }
    
    const handleEdit = (item) => {
        setEdit(<Edit items={items} setItems={setItems} item={item}/>)
    }
    const displayItems = (myListings.map(el => {
        return (
            <div>
            <ListingItems item={el} handleDelete={ handleDelete} handleEdit={handleEdit}/> 
            {edit}
            </div>)
    }))
    return (
        <div className="listing-container">
            <h1>My Listings</h1>
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
        <ul ref={ref}>
                {displayItems}
        </ul>
        </>
        </div>
    )
}

export default MyListing;