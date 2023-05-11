import React, { useState } from "react";
import {FaSearch} from "react-icons/fa";

function Search({ items, setCards }) {

    const [input, setInput] = useState("")

    const fetchData = (value) => {
        fetch('http://127.0.0.1:5555/items')
        .then((res) => res.json())
        .then((json) => {
            const results = json.filter((item) => {
                return value && item && item.name.toLowerCase().includes(value.toLowerCase())
            });
            if (value === "") {
                setCards(items)
            } else {
                setCards(results);
            }
        })
    }

    const handleChange = (e) => {
        setInput(e);
        fetchData(e);
    }

    return(
        <div className="search-bar">
            <FaSearch id="search-icon"/>
            <input placeholder="Search..." value={input} onChange={(e) => handleChange(e.target.value)}/>
        </div>
    )
}

export default Search;