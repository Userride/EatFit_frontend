import React from 'react';
import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer'; // Import your CartProvider
import MyCart from './components/MyCart'; // Import MyCart component

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/loginuser" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/mycart" element={<MyCart />} /> {/* Add route for MyCart */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
