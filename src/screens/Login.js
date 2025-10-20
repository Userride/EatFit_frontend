import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate to redirect

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();  

  // Email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://eatfit-ecwm.onrender.com/api/loginuser", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    } else {
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("user", JSON.stringify(json.user));
      navigate("/"); // redirect to home
    }
  };

  // Google login
  const handleGoogleLogin = () => {
    // Open backend Google OAuth endpoint
    window.open("https://eatfit-ecwm.onrender.com/auth/google", "_self");
  };

  const onChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const containerStyle = {
    backgroundImage: 'url("https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9
  };

  const formStyle = {
    background: '#353935',
    color: 'white',
    padding: '20px',
    opacity: 0.95,
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '450px',
    maxWidth: '90%'
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name='email'
            value={credentials.email}
            onChange={onChange}
            id="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name='password'
            value={credentials.password}
            onChange={onChange}
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-2">Login</button>
        <Link to="/createuser" className='btn btn-danger w-100 mb-2'>I'm a new user</Link>

        {/* ✅ Google login button */}
        <button type="button" className="btn btn-danger w-100" onClick={handleGoogleLogin}>
          Login with Google
        </button>
      </form>
    </div>
  );
}
