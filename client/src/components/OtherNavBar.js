import { NavLink } from "react-router-dom";
import "./NavBar.css"

function OtherNavBar(){

    return(
        <div className="othernavbar">
            <NavLink
                to="/"
                exact
            >
                HOME
            </NavLink>
        </div>

    
    
    
    
    );
}

export default OtherNavBar