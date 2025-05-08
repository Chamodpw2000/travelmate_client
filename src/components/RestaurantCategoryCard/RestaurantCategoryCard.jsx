import React from 'react'
import './RestaurantCategoryCard.css'
import { Link } from 'react-router-dom';

const RestaurantCategoryCard = ({category}) => {
    return (
      <Link to={`/restaurants/${category}`} style={{ textDecoration: 'none' }}>
      <div className="card-container">
        <div className="card border-0 shadow-sm">
          <img
            src={category.image} // Replace with your image URL
            className="card-img-top rounded"
            alt="Card example"
          />
          <div className="card-img-overlay d-flex flex-column justify-content-end">
            <div className="card-title-overlay">
              <h5 className="text-white fw-bold">{category.name}</h5>
            </div>
          </div>
        </div>
      </div>
      </Link>
    );
  };

export default RestaurantCategoryCard