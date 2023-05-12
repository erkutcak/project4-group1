
function ListingItems({ item, handleDelete, handleEdit}) {
    return(
        <div className="item-card">
                <img src={item.image} alt={item.name}/>
                <h2>{item.name}</h2>
                <h3>$ {item.price}</h3>
                <p>{item.category}</p>
                <button id="delete-button"  onClick={() => handleDelete(item)}>DELETE</button>
                <button id='edit-button' onClick={() => handleEdit(item)}>Edit</button>
        </div>
    )
}

export default ListingItems;