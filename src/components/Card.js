import React, { useEffect, useState, useRef } from 'react';
import { useDispatchCart, useCart } from './ContextReducer'; // If using context for global state

const ADD = "ADD";

export default function Card(props) {
  let dispatch = useDispatchCart(); // Dispatch function for context
  let data = useCart(); // Cart data from context
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState("1");
  const [size, setSize] = useState("");

  const handleAddToCart = () => {
    let finalPrice = qty * parseInt(options[size]);

    // Save cart data in localStorage or Context
    const cartItem = {
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    };

    // Save cart item in localStorage (or use dispatch for global state)
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // If using context
    dispatch({ type: ADD, id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });

    alert("Item added to cart!");
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card mt-3" style={{ width: '19rem', maxHeight: '400px' }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          style={{ height: '175px', objectFit: 'fill' }}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">Important text</p>
          <div className="container w-100">
            <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>;
              })}
            </select>
            <div className="d-inline h-100 fs-5">Rs {qty * parseInt(options[size])}/-</div>
          </div>
          <hr />
          <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
