import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  // Load data from API
  const loadData = async () => {
    let response = await fetch("https://eatfit-ecwm.onrender.com/api/foodData", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' }
    });
    response = await response.json();
    setFoodItem(response[0]); // food items
    setFoodCat(response[1]); // categories
  };

  useEffect(() => {
    loadData();
  }, []);

  // Carousel images
  const carouselImages = [
    "https://images.unsplash.com/photo-1613564834361-9436948817d1?q=80&w=1943&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1615557960916-5f4791effe9d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3"
  ];

  return (
    <div>
      {/* Carousel */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          {carouselImages.map((img, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img
                src={img}
                className="d-block w-100"
                style={{ objectFit: "cover", height: "85vh" }}
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Carousel controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

        {/* Search input overlay */}
        <div className="carousel-caption d-flex justify-content-center" style={{ zIndex: "10", top: "10%" }}>
          <input
            className="form-control w-50"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Food Categories & Cards */}
      <div className='container mt-4'>
        {foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div key={category._id} className="mb-5">
              <h3 className="m-3">{category.CategoryName}</h3>
              <hr />
              <div className="row">
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      item =>
                        item.CategoryName === category.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map(item => (
                      <div key={item._id} className="col-md-4 mb-4">
                        <Card foodItem={item} options={item.options[0]} />
                      </div>
                    ))
                ) : (
                  <div className="col">No items found</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
