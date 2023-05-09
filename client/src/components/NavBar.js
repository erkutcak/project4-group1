import { NavLink } from "react-router-dom";
import "./NavBar.css"

function NavBar() {
    return (
        <div className="navbar">
            <NavLink
                to="/"
                exact
            >
                HOME
            </NavLink>
            <NavLink
                to="/userID"
                exact
            >
                SELL
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