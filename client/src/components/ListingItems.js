
function ListingItems({ item, handleDelete, handleEdit}) {
    return(
        <div className="item-card">
                {item.image ? <img src={item.image} alt={item.name}/> : <img src="https://www.iconpacks.net/icons/2/free-sale-icon-1994-thumb.png" alt={item.name} placeholder="https://www.iconpacks.net/icons/2/free-sale-icon-1994-thumb.png"/>}
                <h2>{item.name}</h2>
                <h3>$ {item.price}</h3>
                <p>{item.category}</p>
                <button id="delete-button"  onClick={() => handleDelete(item)}>DELETE</button>
                <button id='edit-button' onClick={() => handleEdit(item)}>Edit</button>
        </div>
    )
}

export default ListingItems;