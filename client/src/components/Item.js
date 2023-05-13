import { motion } from "framer-motion";
import logo from "../images/logo.png";
import '../MyListing.css'

function Item({ returnItem, item, handleCartClick }) {
    return(
    <motion.div className="item-card"
        whileHover={{ scale: 1.2, rotate: -4}}
        >
        {item.image ? <img src={item.image} alt={item.name}/> : <img src={logo} alt={item.name} placeholder="https://www.iconpacks.net/icons/2/free-sale-icon-1994-thumb.png"/>}
        <h2>{item.name}</h2>
        <h3>$ {item.price}</h3>
        <p>{item.category}</p>
        {returnItem === 'home' ? <button id="cart-button" onClick={() => handleCartClick(item)}><span className="button-text">Add Item</span><span className="button-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span></button> : <button id="remove" onClick={() => handleCartClick(item)}><span class="text">Remove</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>}
    </motion.div>
    )
}

export default Item;