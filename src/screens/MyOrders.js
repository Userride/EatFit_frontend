import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Get logged-in userId from localStorage (works for Google + normal login)
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        console.warn("⚠️ No userId found. Please login first.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `https://eatfit-ecwm.onrender.com/api/orders/myOrders/${userId}`,
          { withCredentials: true }
        );
        console.log("✅ Fetched My Orders:", res.data);
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("❌ Error fetching my orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const getTotalPrice = (cartItems = []) => {
    return cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "#3498db";
      case "Processing":
        return "#f1c40f";
      case "Out for Delivery":
        return "#e67e22";
      case "Delivered":
        return "#2ecc71";
      case "Cancelled":
        return "#e74c3c";
      default:
        return "#95a5a6";
    }
  };

  if (loading)
    return <h4 className="text-center mt-4 text-light">Loading your orders...</h4>;

  if (!userId)
    return (
      <div className="text-center mt-5 text-light">
        <h5>Please login to view your orders.</h5>
      </div>
    );

  return (
    <div className="container mt-5 text-light">
      <h2 className="mb-4 text-center">🛒 My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center">You have no past orders.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="card mb-4 shadow-sm"
            style={{
              backgroundColor: "#1f1f1f",
              border: "1px solid #333",
              borderRadius: "10px",
            }}
          >
            <div
              className="card-header"
              style={{
                backgroundColor: "#292929",
                color: "#fff",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Order ID:</strong> {order._id}
                </div>
                <div
                  style={{
                    backgroundColor: getStatusColor(order.status),
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontWeight: "500",
                    fontSize: "0.9rem",
                  }}
                >
                  {order.status}
                </div>
              </div>
            </div>

            <div className="card-body">
              <p><strong>Payment:</strong> {order.paymentMethod}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p>
                <strong>Ordered On:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>

              <h5 className="mt-3 mb-2">🍽️ Ordered Items</h5>
              <table
                className="table table-sm table-dark table-bordered mb-0"
                style={{ backgroundColor: "#2a2a2a" }}
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Qty</th>
                    <th>Size</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems.map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.qty}</td>
                      <td>{item.size}</td>
                      <td>₹{item.price * item.qty}</td>
                    </tr>
                  ))}
                  <tr style={{ fontWeight: "bold" }}>
                    <td colSpan="3" style={{ textAlign: "right" }}>
                      Total:
                    </td>
                    <td>₹{getTotalPrice(order.cartItems)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
