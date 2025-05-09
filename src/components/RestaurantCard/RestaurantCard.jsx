import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { ClientContext } from '../../context/ClientContext';

const RestaurantCard = ({ id, type, name, restaurantName, mainCategory, priceRange, rating, images, miniDescription }) => {
  const { allRestaurants, allRestaurantReviews } = useContext(ClientContext);
  
  const restaurant = allRestaurants.find((e) => e.id === parseInt(id));
  const restaurantReviews = allRestaurantReviews.filter((review) => review.restaurantId === restaurant.id);
  
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalOverallRating = reviews.reduce((sum, review) => sum + review.overallRating, 0);
    return parseInt((totalOverallRating / reviews.length).toFixed(2));
  };
  
  const averageOverrallRatings = calculateAverageRating(restaurantReviews);
  
  const cardStyle = {
    width: '18rem',
    border: 'none',
    height: '400px', // Fixed height for the entire card
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden'
  };

  const imageContainerStyle = {
    height: '200px', // Fixed height for image container
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // This ensures the image covers the area without distortion
    objectPosition: 'center'
  };

  const cardBodyStyle = {
    padding: '16px',
    flex: '1',
    display: 'flex',
    flexDirection: 'column'
  };

  const titleStyle = {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    lineHeight: '1.3'
  };

  const descriptionStyle = {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '10px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    lineHeight: '1.4'
  };

  const categoryStyle = {
    fontSize: '0.85rem',
    color: '#777',
    marginTop: 'auto'
  };

  const hoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)'
  };

  return (
    <Link 
      to={`/restaurants/${id}`} 
      style={{ textDecoration: 'none', display: 'block', margin: '15px' }}
      className="restaurant-card-link"
    >
      <Card 
        style={cardStyle} 
        className="restaurant-card"
        onMouseOver={(e) => {
          Object.assign(e.currentTarget.style, hoverStyle);
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        }}
      >
        <div style={imageContainerStyle}>
          <img
            src={images && images.length > 0 ? images[0] : "https://picsum.photos/286/180"}
            alt={name || restaurantName}
            style={imageStyle}
          />
        </div>
        <div style={cardBodyStyle}>
          <h5 style={titleStyle}>{name || restaurantName}</h5>
          
          <p style={descriptionStyle}>{miniDescription}</p>
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                style={{
                  color: index < averageOverrallRatings ? '#00AA6C' : '#e0e0e0',
                  marginRight: '2px',
                  fontSize: '16px'
                }}
              />
            ))}
            <Badge 
              bg="light" 
              text="dark" 
              style={{ 
                marginLeft: '8px', 
                fontWeight: 'normal',
                fontSize: '0.8rem',
                padding: '4px 8px',
                borderRadius: '4px'
              }}
            >
              {averageOverrallRatings}
            </Badge>
          </div>
          
          <p style={categoryStyle}>{mainCategory}</p>
        </div>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
