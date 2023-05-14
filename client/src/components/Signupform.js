import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login.css"
import { motion, useTime, useTransform } from "framer-motion";
import logo from "../images/logo.png";


function SignUpForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const time = useTime();
    const rotate = useTransform(time, [0, 7000], [360, 0], { clamp: false });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e) { 
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            email,
            password,
            password_confirmation: passwordConfirmation,
        })
    }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
            r.json().then((user) => onLogin(user));
    } else {
        r.json().then((err) => setErrors(err.errors));
    }
    navigate('/')
})};
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
                <p className="login-heading">Sign Up</p>
                <label for="username">Username:</label>
                <input 
                className="input"
                type='text'
                id='username'
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <label for="email">Email:</label>
                <input
                className="input"
                type="text"
                id='email'
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <label for="password">Password:</label>
                <input 
                className="input"
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <label for="passwordConfirmation">Password Confirmation:</label>
                <input 
                className="input"
                type='password'
                id='passwordConfirmation'
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                autoComplete="current-password"
                />
                <button className="btn" type='submit' >{isLoading ? 'Loading...': 'Submit'}</button>
            </form> 
        </div>
        </div>
    )
}

export default SignUpForm;