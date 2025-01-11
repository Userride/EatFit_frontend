import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyCart() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderId, setOrderId] = useState(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false); // New state for tracking order placement

  useEffect(() => {
    // Fetch cart items from localStorage
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cartData);
  }, []);

  const handleDelete = (id) => {
    // Filter out the item to be deleted
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the order data
    const orderData = {
      userId: 'userIdHere',  // Replace with actual user ID or fetch dynamically
      cartItems,
      address,
      paymentMethod,
    };
  
    try {
      // Send the POST request with the correct data
      const response = await axios.post('https://eatfit-ecwm.onrender.com/api/orders/createOrder', orderData);
  
      // If the order is successfully created
      setOrderId(response.data.orderId); // Save the order ID to show in the popup
      setIsOrderPlaced(true); // Update the state to show the popup

      // Optionally, you can display an alert or a modal here
      // alert(`Order placed successfully: ${response.data.message}`);
    } catch (error) {
      // Log detailed error info for debugging
      console.error('Error placing order:', error);
      alert('Error placing order: ' + error.message);
  
      // If available, also log the response data
      if (error.response) {
        console.error('Response data:', error.response.data);
        alert(`Server error: ${error.response.data.message}`);
      }
    }
  };

  const handleClosePopup = () => {
    setIsOrderPlaced(false); // Close the popup
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Size</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{item.size}</td>
                  <td>Rs {item.price}/-</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="address-payment-section mt-4">
        <h3>Enter Your Address</h3>
        <textarea
          className="form-control"
          rows="4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your delivery address"
        />

        <h3 className="mt-3">Payment Method</h3>
        <select
          className="form-select"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select Payment Method</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>

        <button className="btn btn-success mt-3" onClick={handleSubmit}>
          Place Order
        </button>
      </div>

      {/* Order Confirmation Popup */}
      {isOrderPlaced && (
        <div className="order-confirmation-popup">
          <div className="popup-content">
            <h4 style={{ color: 'red' }}>Your Order ID: {orderId}</h4>
            <p style={{ color: 'red' }}>Your order is being prepared.</p>
            <button className="btn btn-primary" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

      {/* Popup Styles */}
      <style jsx>{`
        .order-confirmation-popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popup-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .popup-content h4 {
          margin-bottom: 10px;
        }

        .popup-content button {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}
