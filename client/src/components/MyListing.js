import React, {useEffect, useState} from "react";
import ListingItems from './ListingItems'


function MyListing({user, items, setItems}) { 
    const myListings = items.filter(el => el.user_id === user?.id)

    const handleDelete = (item) => {
        // console.log(item)
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
        
    }
    const displayItems = (myListings.map(el => {
        return <ListingItems item={el} handleDelete={ handleDelete} handleEdit={handleEdit}/> 
    }))
    return (
        <div>
            <h1>My Listing</h1>
            {displayItems}
        </div>
    )
}

export default MyListing;