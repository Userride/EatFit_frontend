import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { CartProvider } from './components/ContextReducer';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyCart from './components/MyCart';
import OrderTracking from './components/OrderTracking';

import GoogleLoginSuccess from './screens/GoogleLoginSuccess';

function OrderTrackingWrapper() {
  const { orderId } = useParams();
  return <OrderTracking orderId={orderId} />;
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/loginuser" element={<Login />} />
          <Route exact path="/createuser" element={<Signup />} />
          <Route exact path="/mycart" element={<MyCart />} />
       
          <Route exact path="/track-order/:orderId" element={<OrderTrackingWrapper />} />
          <Route exact path="/google-login-success" element={<GoogleLoginSuccess />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
