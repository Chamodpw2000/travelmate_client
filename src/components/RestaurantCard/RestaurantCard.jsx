
import { Link } from 'react-router-dom';

import React, { useContext } from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { ClientContext } from '../../context/ClientContext';

const RestaurantCard = ({ id, type, name, restaurantName, mainCategory, priceRange, rating }) => {

  const { allRestaurants } = useContext(ClientContext);
  const { allRestaurantReviews } = useContext(ClientContext);
  const restaurant = allRestaurants.find((e) => e.id === parseInt(id));
  const restaurantReviews = allRestaurantReviews.filter((review) => review.restaurantId === restaurant.id);

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;

    const totalOverallRating = reviews.reduce((sum, review) => sum + review.overallRating, 0);
    return parseInt((totalOverallRating / reviews.length).toFixed(2));
  };

  const averageOverrallRatings = calculateAverageRating(restaurantReviews);
  console.log("Average Rating:", averageOverrallRatings);


  return (
    <Link to={`/restaurants/${id}`} style={{ textDecoration: 'none' }}>
      <Card style={{ width: '18rem', border: 'none' }} className="my-3">
        <div style={{ position: 'relative' }}>
          <Card.Img
            variant="top"
            src="https://picsum.photos/286/180"
            alt="Restaurant Image"
            style={{
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
              borderRadius: '5px',
            }}
          />
        </div>
        <Card.Body>
          <Card.Title>{name || restaurantName}</Card.Title>
          <div className="d-flex align-items-center mb-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                style={{
                  color: index < averageOverrallRatings ? 'green' : 'gray'
                }}
              />
            ))}
            <Badge bg="light" text="dark" className="ms-2">
              {averageOverrallRatings}
            </Badge>
          </div>

          <Card.Text>{mainCategory}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
