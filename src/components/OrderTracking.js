import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Connect socket with credentials
const socket = io('https://eatfit-ecwm.onrender.com', {
  withCredentials: true
});

const hotelCoords = { lat: 22.9753, lon: 88.4345 };

export default function OrderTracking() {
  const { orderId } = useParams();
  const [status, setStatus] = useState('Fetching...');
  const [order, setOrder] = useState(null);
  const [distance, setDistance] = useState(null);

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `https://eatfit-ecwm.onrender.com/api/orders/${orderId}`,
          { withCredentials: true } // ✅ important
        );
        console.log('Fetched order:', res.data);
        setOrder(res.data.order);
        setStatus(res.data.order.status);

        // Track user location
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition((pos) => {
            const userCoords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
            const km = getDistanceFromLatLonInKm(
              userCoords.lat, userCoords.lon,
              hotelCoords.lat, hotelCoords.lon
            );
            setDistance(km.toFixed(2));
          });
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setStatus('Unable to fetch order details.');
      }
    };

    fetchOrder();
  }, [orderId]);

  // Listen for live status updates
  useEffect(() => {
    socket.emit('join_order', orderId);
    socket.on('orderStatusUpdate', (data) => {
      if (data.orderId === orderId) setStatus(data.status);
    });
    return () => socket.off('orderStatusUpdate');
  }, [orderId]);

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg) => deg * (Math.PI / 180);

  return (
    <div style={{ textAlign: 'center', marginTop: '40px', color: 'white', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
      <h2>🚚 Track Your Order</h2>
      <p><strong>Order ID:</strong> {orderId}</p>
      <p><strong>Status:</strong> <span style={{ color: '#00ff00' }}>{status}</span></p>
      {distance && <p><strong>Distance to Hotel:</strong> <span style={{ color: '#ffd700' }}>{distance} km</span></p>}

      {order && (
        <div style={{ textAlign: 'left', marginTop: '20px', backgroundColor: '#222', padding: '15px', borderRadius: '10px' }}>
          <h4>Items:</h4>
          <ul>
            {order.cartItems.map((item, i) => (
              <li key={i}>{item.name} ({item.qty}x, {item.size}) - ₹{item.price}</li>
            ))}
          </ul>
          <p><strong>Delivery Address:</strong> {order.address}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
        </div>
      )}
    </div>
  );
}
