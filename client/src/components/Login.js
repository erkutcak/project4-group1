import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";
import "./homepage.css"
import "./Login.css"
import "./NavBar.css"

function Login({onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((user) => onLogin(user));
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }
    return (
        <div className="header">
          <div className="top">
          <NavBar/>
          <NavLink
            to="/"
            exact
            >
            </NavLink>
            </div>
        <form onSubmit={handleSubmit}>
            <div className="center">
            <label htmlFor="username"></label>
            <input
            placeholder="Username"
            className="fc"
            type='text'
            id='username'
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <br></br>
            <label htmlFor="password"></label>
            <input
            placeholder="Password"
            className="fc"
            type='password'
            id='password'
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <br></br>
            <button className="login-button" type="submit">{isLoading ? "Loading..." : "Login"}</button>
            </div>       
        </form>
        </div>
    )
    }


export default Login;