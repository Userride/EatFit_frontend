import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId"); // Store userId in localStorage at login
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`https://eatfit-ecwm.onrender.com/api/orders/myOrders/${userId}`);
        setOrders(res.data.orders);
      } catch (err) {
        console.error(err);
        alert("Error fetching your orders");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchOrders();
  }, [userId]);

  if (!userId) return <p>Please log in to see your orders.</p>;
  if (loading) return <p>Loading your orders...</p>;
  if (orders.length === 0) return <p>You have no past orders.</p>;

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="card mb-3">
          <div className="card-header">
            <strong>Order ID:</strong> {order._id} &nbsp; | &nbsp; <strong>Status:</strong> {order.status}
          </div>
          <div className="card-body">
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <h5>Items:</h5>
            <ul>
              {order.cartItems.map((item, idx) => (
                <li key={idx}>
                  {item.name} - {item.qty} x {item.size} - ₹{item.price * item.qty}
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> ₹{order.cartItems.reduce((sum, i) => sum + i.price * i.qty, 0)}</p>
            <p><em>Ordered at: {new Date(order.createdAt).toLocaleString()}</em></p>
          </div>
        </div>
      ))}
    </div>
  );
}
