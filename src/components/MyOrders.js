import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Redirect to login if user not found
    if (!user?._id) {
      console.warn("User not logged in. Redirecting to login page.");
      navigate('/loginuser');
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(`https://eatfit-ecwm.onrender.com/api/orders/getUserOrders/${user._id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Error fetching user orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading) return <h4 className="text-center mt-4">Loading your orders...</h4>;
  if (!orders.length) return <h4 className="text-center mt-4">No past orders found.</h4>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="card mb-3 shadow-sm p-3">
          <div className="card-body">
            <h5 className="card-title">Order ID: {order._id}</h5>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Payment:</strong> {order.paymentMethod}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Placed:</strong> {new Date(order.createdAt).toLocaleString()}</p>

            <h6>Items:</h6>
            <ul>
              {order.cartItems.map((item, i) => (
                <li key={i}>
                  {item.name} (x{item.qty}) — ₹{item.price}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
