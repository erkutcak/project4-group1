import React, { useEffect, useState } from "react";
import Item from "./Item";
import Search from "./Search";
import SortBy from "./SortBy";
import '../Homepage.css';
import '../Item.css'
import Popup from "./Popup";
import '../Popup.css'

function HomePage({setPopup, popup, items, user, onLogin, setItems, handleCartClick}) {

    const [selected, setSelected] = useState(0);
    const [cards, setCards] = useState(items);
    

    const categories = ['All', 'Beauty & Health', 'Food & Beverage', 'Furniture & Decor', 'Household Items', 'Pet Supplies', 'Office Equipment', 'Clothing', 'Electronics', 'Books', 'Toys', 'Sports & Outdoors', 'Auto Parts']

    useEffect(() => {
        setCards(items)
        }, [items])
    
    const handleClick = (event) => {
        setSelected(event);
        if (categories[event] === 'All') {
            setCards(items)
        } else {
            setCards(items.filter(item => item.category === categories[event]))
        }}
        
    const filterButton = categories.map((category, index) => {
        return <button value={category} key={index} onClick={() => handleClick(index)} className="category-buttons">{category}</button>
    })

    const displayItems = (cards.filter(el => el.for_sale !== null)).map((item) => {
        return <Item item={item} handleCartClick={handleCartClick} returnItem={'home'}/>
    })

    
    return (
        <div className="header">
            <div className="category-container">
                <h2>Categories</h2>
                {filterButton}
            </div>
            <div className="featured-container">
                <div className="title-search-sort">
                    <h1>Featured Items</h1> 
                    <Search items={items} setCards={setCards} setItems={setItems}/>
                    <SortBy items={items} setCards={setCards} setItems={setItems}/>
                </div>
                <div className="item-container">
                {displayItems}
                <Popup trigger={popup} setTrigger={setPopup}>
                    <h3>Item added to Cart!</h3>
                </Popup> 
                </div>
            </div>
        </div>
        )
    }


export default HomePage;