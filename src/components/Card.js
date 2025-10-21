import React, { useEffect, useState, useRef } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
import { useNavigate } from 'react-router-dom';

const ADD = "ADD";

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const navigate = useNavigate();

  const priceRef = useRef();
  const options = props.options;
  const priceOptions = Object.keys(options);

  const [qty, setQty] = useState("1");
  const [size, setSize] = useState("");

  const handleAddToCart = () => {
    if (!localStorage.getItem("authToken")) {
      alert("Please log in to add items to your cart.");
      navigate("/loginuser");
      return;
    }

    let finalPrice = qty * parseInt(options[size]);
    const newItem = {
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty,
      size,
      img: props.foodItem.img
    };

    dispatch({ type: ADD, item: newItem });
    alert("Item added to cart!");
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card mt-3" style={{ width: '19rem', maxHeight: '400px' }}>
        <img src={props.foodItem.img} className="card-img-top" style={{ height: '175px', objectFit: 'fill' }} alt="food" />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100">
            <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => (
                <option key={data} value={data}>{data}</option>
              ))}
            </select>
            <div className="d-inline h-100 fs-5">Rs {qty * parseInt(options[size])}/-</div>
          </div>
          <hr />
          <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
