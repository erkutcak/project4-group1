import { NavLink } from "react-router-dom";
import "./NavBar.css"

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
                HOME
            </NavLink>
            <NavLink
            to='/sell'
            >
                SELL
            </NavLink>
            <NavLink
                to="/userId/cart"
                exact
            >
                CART
            </NavLink>
            <NavLink
                to='/Mylisting'
                exact
            >
                MyListing
            </NavLink>
            <NavLink
            to='/userId/transactions'
            exact
            >
                TRANSACTIONS
            </NavLink>
            <h1 onClick={handleLogout}>Logout</h1>
        </div>
    )}
    return (
        <div className="navbar">
            <NavLink
                to="/"
                exact
            >
                HOME
            </NavLink>
            <NavLink
                to="/login"
                exact
            >
                LOGIN
            </NavLink>
            <NavLink
                to="/signup"
            >
                SIGN UP
            </NavLink>
        </div>
  );
}

export default NavBar