import React from "react";

function SortBy({setItems, items}) {
    
    const sort = (e) => {
        const copyItems = [...items];
        switch(e.target.value) {
            case "a-z":
                copyItems.sort((a, b) => a.name < b.name ? -1 : 1);
                break;
            case "z-a":
                copyItems.sort((a, b) => a.name > b.name? -1 : 1);
                break;
            case "price asc":
                copyItems.sort((a, b) => a.price > b.price ? -1 : 1);
                break;
            case "price desc":
                copyItems.sort((a, b) => a.price < b.price ? -1 : 1);
                break;
            default:
                break;
        }
        setItems(copyItems);
    }

    return(
        <div className="sort-bar">
            <select onChange={sort}>
                <option value="a-z">Title: A - Z</option>
                <option value="z-a">Title: Z - A</option>
                <option value="price asc">Price: High to Low</option>
                <option value="price desc">Price: Low to High</option>
            </select>
        </div>
    )
}

export default SortBy;