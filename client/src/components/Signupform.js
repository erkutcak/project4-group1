import React, { useState } from "react";
import NavBar from "./NavBar";
import "./homepage.css"
import "./Login.css"
import "./NavBar.css"


function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [bio, setBio] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
})};
    return (
        <div className="header"> 
        <form className="space center" onSubmit={handleSubmit}>
            <div className="top">
          <NavBar/>
            </div>
        
            <label for="username"></label>
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
            <label for="email"></label>
            <input
            placeholder="Email"
            className="fc"
            type="text"
            id='email'
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <br></br>
            <label for="password"></label>
            <input 
            placeholder="Password"
            className="fc"
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <br></br>
            <label for="passwordConfirmation"></label>
            <input 
            placeholder="Confirm Password"
            className="fc"
            type='password'
            id='passwordConfirmation'
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            autoComplete="current-password"
            />
            <br></br>
            <button className="login-button" type='submit' >{isLoading ? 'Loading...': 'Sign Up'}</button>
        </form> 
        </div>
    )
}

export default SignUpForm;