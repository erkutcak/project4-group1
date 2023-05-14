import React, { useState } from "react";
import ListingItems from './ListingItems'
import Edit from "./Edit";
import "../MyListing.css";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import '../Popup3.css'
import Popup3 from './Popup3'


function MyListing({user, items, setItems, popup3, setPopup3}) { 
    const myListings = items.filter(el => el.user_id === user?.id)
    const [edit, setEdit] = useState(false)
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
    // const reset = () => {
        // console.log(items)}
    const handleEdit = (item) => {
        if (!edit) {
        setEdit(<Edit items={items} setItems={setItems} item={item} popup3={popup3} setPopup3={setPopup3}/>)
        }else {
            setEdit(false)
        }
        
        if(edit){
            console.log(edit.props.item)
        }
    }
    const editToDisplay = (el) => {
        if(edit){
            return (edit.props.item === el ? edit : null)
        }
    }
    const displayItems = (myListings.map(el => {
        console.log(el)
        return (
            <div>
            <ListingItems item={el} handleDelete={ handleDelete} handleEdit={handleEdit}/> 
            {editToDisplay(el)}
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
                <Popup3 trigger={popup3} setTrigger={setPopup3}>
                    <h3>Your listing has been updated!</h3>
                </Popup3> 
        </ul>
        </>
        </div>
    )
}

export default MyListing;