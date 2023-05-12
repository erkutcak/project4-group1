
function Item({ item, handleCartClick }) {
    return(
        <div className="item-card">
                {item.image ? <img src={item.image} alt={item.name}/> : <img src="https://www.iconpacks.net/icons/2/free-sale-icon-1994-thumb.png" alt={item.name} placeholder="https://www.iconpacks.net/icons/2/free-sale-icon-1994-thumb.png"/>}
                <h2>{item.name}</h2>
                <h3>$ {item.price}</h3>
                <p>{item.category}</p>
                <button id="cart-button" onClick={() => handleCartClick(item)}>Add to Cart</button>
        </div>
    )
}

export default Item;