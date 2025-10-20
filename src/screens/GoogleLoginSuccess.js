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

    if (email) {
      localStorage.setItem('user', JSON.stringify({ name, email, avatar }));
      localStorage.setItem('authToken', 'google-login'); // dummy token
      navigate("/");
    } else {
      alert("Google login failed");
      navigate("/loginuser");
    }
  }, [location, navigate]);

  return <h4>Logging you in...</h4>;
}
