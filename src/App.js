import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { CartProvider } from './components/ContextReducer';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyCart from './components/MyCart';
import OrderTracking from './components/OrderTracking';
import GoogleLoginSuccess from './screens/GoogleLoginSuccess';

// Wrapper to get orderId from params
function OrderTrackingWrapper() {
  const { orderId } = useParams();
  return <OrderTracking orderId={orderId} />;
}

function App() {
  return (
    <CartProvider>
      <Router>
        {/* Navbar will be rendered on all pages */}
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/loginuser" element={<Login />} />
          <Route exact path="/createuser" element={<Signup />} />
          <Route exact path="/mycart" element={<MyCart />} />
          <Route exact path="/track-order/:orderId" element={<OrderTrackingWrapper />} />
          <Route exact path="/google-login-success" element={<GoogleLoginSuccess />} />
        </Routes>

        {/* Footer rendered on all pages */}
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
