import React, { useEffect, useState } from 'react';
import './RestaurantMainSection.css';
import RestaurantDetails from '../restaurantDetails/RestaurantDetails';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { FaLaptop, FaStar, FaPhone, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
import { div } from 'framer-motion/client';

const RestaurantMainSection = ({
  id,
  type,
  name,
  address,
  category,
  contactNumber,
  description,
  email,
  website,
  openingHours,
  priceRange,
  rating,
  mainCategory,
  images,
  miniDescription
}) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [imageIndex, setImageIndex] = useState(0);

  // Ensure we have at least 5 images to display
  const displayImages = [...images];
  while (displayImages.length < 5) {
    displayImages.push(displayImages[displayImages.length % images.length]);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (imageIndex + 1) % images.length;
      setImageIndex(nextIndex);
      setMainImage(images[nextIndex]);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [imageIndex, images]);

  // Function to handle clicking on any image
  const handleImageClick = (img, index) => {
    setMainImage(img);
    setImageIndex(index);
  };

  // Generate price range display
  const renderPriceRange = () => {
    const priceSymbols = [];
    for (let i = 0; i < 4; i++) {
      priceSymbols.push(
        <FaDollarSign
          key={i}
          color={i < priceRange.length ? "#00AA6C" : "#d3d3d3"}
        />
      );
    }
    return priceSymbols;
  };

  return (
    <div className="restaurant-main-section">
      <div className="restaurant-details pt-4">
        <h1>{name}</h1>
      </div>

      <Container className="py-3 border-bottom">
        <Row className="align-items-center">
          <Col lg="6" className="d-flex align-items-center">
            <h4 className="mb-0">{mainCategory}</h4>
          </Col>
          <Col lg="6" className="text-lg-end mt-2 mt-lg-0">
            {/* <div className="category-badges">
              {category.map((cat, index) => (
                <span key={index} className="category-badge">{cat}</span>
              ))}
            </div> */}
          </Col>
        </Row>

        <Row className="align-items-center mt-2">
          <Col lg="6">
            <div className="price-rating">
              {/* <span>
                <strong>Rating:</strong> {rating} <FaStar color="#FFD700" />
              </span>
              <span>
                <strong>Price:</strong> {renderPriceRange()}
              </span> */}
            </div>
            <div>
              {/* <small className="text-muted">
                #21 of 10,275 Restaurants in Sri Lanka
              </small> */}

              <div className="category-badges">
                {category.map((cat, index) => (
                  <div>
                    <span key={index} className="category-badge">{cat}</span>
          
                  </div>

                ))}
              </div>
            </div>
          </Col>

          <Col lg="6" className="text-lg-end mt-3 mt-lg-0 contact-info">
            <div className="mb-2">
              <FaLaptop className="me-2" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                Visit Our Website
              </a>
            </div>
            <div className="mb-2">
              <FaPhone className="me-2" />
              <a href={`tel:${contactNumber}`}>{contactNumber}</a>
            </div>
            <div>
              <FaMapMarkerAlt className="me-2" />
              <a
                href={`https://maps.google.com/?q=${address}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {address}
              </a>
            </div>
          </Col>
        </Row>

        <hr className="divider" />
      </Container>

      <div className="images-section">
        <div className="image-container left-image" onClick={() => handleImageClick(displayImages[0], 0)}>
          <img src={displayImages[0]} alt={`${name} - view 1`} />
        </div>

        <div className="image-container main-image">
          <img src={mainImage} alt={`${name} - main view`} />
        </div>

        <div className="image-container right-image" onClick={() => handleImageClick(displayImages[1], 1)}>
          <img src={displayImages[1]} alt={`${name} - view 2`} />
        </div>

        <div className="bottom-images">
          {displayImages.slice(2, 6).map((img, index) => (
            <div
              key={index}
              className="image-container"
              onClick={() => handleImageClick(img, index + 2)}
            >
              <img src={img} alt={`${name} - view ${index + 3}`} />
            </div>
          ))}
        </div>
      </div>

      <RestaurantDetails id={id} />
    </div>
  );
};

export default RestaurantMainSection;
