import React, { useState } from "react";
import ListingItems from './ListingItems'
import Edit from "./Edit";


function MyListing({user, items, setItems}) { 
    const myListings = items.filter(el => el.user_id === user?.id)
    const [edit, setEdit] = useState([])

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
        setEdit(<Edit item={item}/>)
    }
    const displayItems = (myListings.map(el => {
        return (
            <div>
            <ListingItems item={el} handleDelete={ handleDelete} handleEdit={handleEdit}/> 
            {edit}
            </div>)
    }))
    return (
        <div>
            <h1>My Listing</h1>
            {displayItems}
        </div>
    )
}

export default MyListing;