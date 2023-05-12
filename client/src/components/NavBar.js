import { NavLink } from "react-router-dom";
import "../NavBar.css"

function NavBar({user, onLogin}) {

    function handleLogout() {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => onLogin());
        console.log("logged out");
    }

    if (user) { 
    return (
        <div className="navbar">
            <NavLink
            to="/"
            exact
            >
                <button className="logout-button">Home</button>
            </NavLink>
            <NavLink
            to='/sell'
            >
                <button className="logout-button">Sell</button>
            </NavLink>
            <NavLink
                to="/userId/cart"
                exact
            >
                <button className="logout-button">Cart</button>
            </NavLink>
            <NavLink
                to='/Mylisting'
                exact
            >
                <button className="logout-button">My Listings</button>
            </NavLink>
            <NavLink
            to='/userId/transactions'
            exact
            >
                <button className="logout-button">Purchase History</button>
            </NavLink>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    )}
    return (
        <div className="navbar">
            <NavLink
                to="/"
                exact
            >
                <button className="logout-button">Home</button>
            </NavLink>
            <NavLink
                to="/signup"
            >
                <button className="logout-button">Sign Up</button>
            </NavLink>
            <NavLink
                to="/login"
                exact
            >
                <button className="logout-button">Login</button>
            </NavLink>
        </div>
    );
}

export default NavBar