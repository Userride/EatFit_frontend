import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  
  const [cartCount, setCartCount] = useState(0);

  // Function to get cart count from localStorage
  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cartItems.length);
  };

  useEffect(() => {
    // Update cart count on mount
    updateCartCount();

    // Listen for storage changes (if cart updated in another tab)
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  // Optional: update cart count whenever localStorage changes (after adding)
  useEffect(() => {
    const interval = setInterval(updateCartCount, 500);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/loginuser");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#ebf5ebff", opacity: 0.95 }}
    >
      <div className="container-fluid d-flex flex-wrap align-items-center justify-content-between">
        <Link
          className="navbar-brand fst-italic"
          to="/"
          style={{ color: "brown", fontSize: "2.2rem" }}
        >
          EatFit
        </Link>

        <ul className="navbar-nav d-flex flex-row me-auto my-2 my-lg-0">
          <li className="nav-item">
            <Link
              className="nav-link active fs-5"
              to="/"
              style={{ color: "brown", fontSize: "1.25rem", textDecoration: "none" }}
            >
              Home
            </Link>
          </li>
        </ul>

        <div className="d-flex flex-wrap align-items-center my-2 my-lg-0">
          {!localStorage.getItem("authToken") ? (
            <>
              <Link
                className="nav-link mx-lg-2 mb-2 mb-lg-0"
                to="/loginuser"
                style={{ color: "brown", fontSize: "1.25rem", textDecoration: "none" }}
              >
                Login
              </Link>
              <Link
                className="nav-link mx-lg-2"
                to="/createuser"
                style={{ color: "brown", fontSize: "1.25rem", textDecoration: "none" }}
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/mycart"
                className="btn mx-lg-2 mb-2 mb-lg-0"
                style={{
                  backgroundColor: "brown",
                  color: "white",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontWeight: "500",
                }}
              >
                My Cart ({cartCount})
              </Link>
              <button
                className="btn mx-lg-2"
                onClick={handleLogout}
                style={{
                  backgroundColor: "brown",
                  color: "white",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontWeight: "500",
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
