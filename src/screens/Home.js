import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
  // State variables to store food categories and food items
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  // Function to load data from the API
  const loadData = async () => {
    let response = await fetch("https://eatfit-ecwm.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json(); // Parse the JSON response
    setFoodItem(response[0]); // Set the food items in state
    setFoodCat(response[1]); // Set the food categories in state
  };

  // useEffect to call loadData once when the component mounts
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      {/* ✅ Navbar removed (already in App.js) */}
      
      {/* Carousel */}
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1613564834361-9436948817d1?q=80&w=1943&auto=format&fit=crop"
                className="d-block w-100"
                style={{ objectFit: "fill", height: "85vh" }}
                alt="Pizza"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1615557960916-5f4791effe9d?q=80&w=1974&auto=format&fit=crop"
                className="d-block w-100"
                style={{ objectFit: "fill", height: "85vh" }}
                alt="Chicken"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop"
                className="d-block w-100"
                style={{ objectFit: "fill", height: "85vh" }}
                alt="Burger"
              />
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Food Items Section */}
      <div className='container'>
        {
          foodCat.length > 0
            ? foodCat.map((data) => (
              <div key={data._id}>
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                <div className="row">
                  {
                    foodItem.length > 0
                      ? foodItem
                        .filter(
                          (item) =>
                            item.CategoryName === data.CategoryName &&
                            item.name.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((filterItem) => (
                          <div key={filterItem._id} className="col-md-4 mb-4">
                            <Card
                              foodItem={filterItem}
                              options={filterItem.options[0]}
                            />
                          </div>
                        ))
                      : <div>No such data found</div>
                  }
                </div>
              </div>
            ))
            : <div>Loading...</div>
        }
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
