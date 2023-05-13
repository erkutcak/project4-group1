import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Login.css"
import { motion, useTime, useTransform } from "framer-motion";
import logo from "../images/logo.png";

function Login({onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const time = useTime();
    const rotate = useTransform(time, [0, 4000], [360, 0], { clamp: false });

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
        navigate('/')
      }
    return (
        <div> 
          <form className="form" onSubmit={handleSubmit}>
            <motion.div className="logo-container" style={{ rotate }}>
              <img className="logo" src={logo}/>
            </motion.div>
              <p className="heading">Login</p>
              <label htmlFor="username">Username:</label>
              <input
              className="input"
              type='text'
              id='username'
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="password">Password:</label>
              <input
              className="input"
              type='password'
              id='password'
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn" type="submit">{isLoading ? "Loading..." : "Submit"}</button>
          </form>
        </div>
    )
    }


export default Login;