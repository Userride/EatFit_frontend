import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/loginuser");
  };

  // Check if there are items in the cart
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cartItems.length;

  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#90EE90", opacity: 0.9 }}>
        <div className="container-fluid">
          <Link className="navbar-brand fst-italic" to="/home" style={{ color: 'brown', fontSize: '2.2rem' }}>EatFit</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item" style={{ marginTop: '5px' }}>
                <Link className="nav-link active fs-5" to="/home" style={{ color: 'brown', fontSize: '1.25rem', textDecoration: 'none' }}>Home</Link>
              </li>
              
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="nav-link mx-1" to="/loginuser" style={{ color: 'brown', fontSize: '1.25rem', textDecoration: 'none' }}>Login</Link>
                <Link className="nav-link mx-1" to="/createuser" style={{ color: 'brown', fontSize: '1.25rem', textDecoration: 'none' }}>Signup</Link>
              </div>
            ) : (
              <div className="d-flex">
                <Link to="/mycart" className="btn bg-white text-success mx-2">
                  My Cart ({cartCount})
                </Link>
                <button className="btn bg-white text-success mx-2" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
