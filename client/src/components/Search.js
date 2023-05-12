import React, { useState } from "react";
import '../Search.css';

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
            <input className="textInput" placeholder="Search..." value={input} onChange={(e) => handleChange(e.target.value)}/>
        </div>
    )
}

export default Search;
