import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function GoogleLoginSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get('name');
    const email = params.get('email');
    const avatar = params.get('avatar');
    const userId = params.get('userId'); // ✅ Added

    if (email && userId) {
      // ✅ Save Google user info
      localStorage.setItem('user', JSON.stringify({ name, email, avatar }));
      localStorage.setItem('authToken', 'google-login'); // Dummy auth token
      localStorage.setItem('userId', userId); // ✅ Store the MongoDB _id
      console.log("✅ Google user logged in:", { name, email, userId });

      navigate("/");
    } else {
      alert("Google login failed");
      navigate("/loginuser");
    }
  }, [location, navigate]);

  return <h4 style={{ textAlign: "center", marginTop: "50px" }}>Logging you in via Google...</h4>;
}

