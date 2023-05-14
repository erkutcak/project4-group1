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
    const rotate = useTransform(time, [0, 10000], [360, 0], { clamp: false });

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
      <div className="login-page">
        <h1 className="neon" data-text="U">Welcome to <span className="flicker-slow">D</span><span className="title-i">I</span><span className="flicker-fast">B</span><span className="title-s">S</span></h1>
        <h3 className="welcome-motto">"Where first come, first DIBS"</h3>
        <div className="login-container">
          <div className="logo-container">
              <motion.div style={{ rotate }}>
                <img className="logo" src={logo}/>
              </motion.div>
          </div>
            <form className="form" onSubmit={handleSubmit}>
                <p className="login-heading">Login</p>
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
        </div>
    )
    }


export default Login;