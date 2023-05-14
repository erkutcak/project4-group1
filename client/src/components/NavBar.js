import { NavLink } from "react-router-dom";
import "../NavBar.css"
import { motion, useTime, useTransform } from "framer-motion";
import logo from "../images/logo.png";

function NavBar({user, onLogin}) {

    const time = useTime();
    const rotate = useTransform(time, [0, 9000], [360, 0], { clamp: false });

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
                to='/Mylisting'
                exact
            >
                <button className="logout-button">My Listings</button>
            </NavLink>
            <motion.div className="home-logo-container" style={{ rotate }}>
                <img className="home-logo" src={logo}/>
            </motion.div>
            <NavLink
                to="/userId/cart"
                exact
            >
                <button className="logout-button">Cart</button>
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