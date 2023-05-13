import { motion } from "framer-motion";

function Item({ returnItem, item, handleCartClick }) {
    return(
    <motion.div className="item-card"
        whileHover={{ scale: 1.2, rotate: -10}}
        >
        {item.image ? <img src={item.image} alt={item.name}/> : <img src="https://www.iconpacks.net/icons/2/free-sale-icon-1994-thumb.png" alt={item.name} placeholder="https://www.iconpacks.net/icons/2/free-sale-icon-1994-thumb.png"/>}
        <h2>{item.name}</h2>
        <h3>$ {item.price}</h3>
        <p>{item.category}</p>
        {returnItem === 'home' ? <button id="cart-button" onClick={() => handleCartClick(item)}>Add to Cart</button> : <button id="cart-button" onClick={() => handleCartClick(item)}>Remove from Cart</button>}
    </motion.div>
    )
}

export default Item;