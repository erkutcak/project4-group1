import React, {useEffect, useState} from "react";


function MyListing({user, item}) { 
    const myListings = item.filter(el => el.user_id === user.id)
    console.log(myListings)
    return (
        <div>
            <h1>My Listing</h1>
        </div>
    )
}

export default MyListing;