import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function GoogleLoginSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Use useSearchParams to read URL

  useEffect(() => {
    // --- *** THIS IS THE FIX *** ---
    // 1. Get the REAL authToken and userId from the URL
    const authToken = searchParams.get('authToken');
    const userId = searchParams.get('userId');

    if (authToken && userId) {
      // 2. Save them to localStorage (this is what MyOrders needs)
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userId', userId);
      
      console.log("Google Login Success: Token and userId saved.");

      // 3. Redirect to the homepage (now logged in)
      navigate("/");
    } else {
      // Handle the case where login failed
      alert("Google login failed. Please try again.");
      navigate("/loginuser");
    }
  }, [searchParams, navigate]);

  return <h4>Logging you in...</h4>;
}
