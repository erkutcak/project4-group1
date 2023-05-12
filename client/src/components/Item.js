
function Item({ item, handleCartClick }) {
    return(
        <div className="item-card">
                <img src={item.image} alt={item.name}/>
                <h2>{item.name}</h2>
                <h3>$ {item.price}</h3>
                <p>{item.category}</p>
                <button id="cart-button" onClick={() => handleCartClick(item)}>🛒</button>
        </div>
    )
}

export default Item;