import logo from "../images/logo.png";
import "../MyListing.css";

function ListingItems({ item, handleDelete, handleEdit}) {

    return(
            <li className='listing-items'>
                {item.image ? <img className='listing-image' src={item.image} alt={item.name}/> : <img className='placeholder-listing' src={logo} alt={item.name} placeholder="https://www.iconpacks.net/icons/2/free-sale-icon-1994-thumb.png"/>}
                <h2 className="listing-name">{item.name}</h2>
                <h3 className="listing-price">$ {item.price}</h3>
                <p className="listing-category">{item.category}</p>
                <div className="buttons">
                    <button id="delete-button"  onClick={() => handleDelete(item)}>  <svg className="svgIcon" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg></button> 
                    <button id='edit-button' onClick={() => handleEdit(item)}>✏️</button>
                </div>
            </li>
    )
}

export default ListingItems;