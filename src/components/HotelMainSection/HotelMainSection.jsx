import React, { useState } from 'react';
import { Container, Row, Col, Button, Image, Badge } from 'react-bootstrap';
import { FaClock, FaMapMarkerAlt, FaStar, FaImages, FaBuilding, FaPhone, FaMoneyBill } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './HotelMainSection.css';

const HotelMainSection = ({ name, description, distance_from_city, id, rating = 4.5, address , image , contactNumber,perPerson_price,images }) => {
  const navigate = useNavigate();
  const [showAllImages, setShowAllImages] = useState(false);

  const hotelImages = [
    images[0] || image,
    images[1] || image,
    images[2] || image,
    image
  ];

  return (
    <Container className="hotel-main-section py-5">
      <Row>
        <Col xs={12} md={7}>
          <div className="hotel-info">
            <h1 className="hotel-title">{name}</h1>
            {/* <div className="rating-badge mb-3">
              <FaStar className="star-icon" />
              <span>{rating}</span>
              <Badge bg="success" className="ms-2">Excellent</Badge>
            </div> */}

            <div className="about-section">
              <h5 className="section-title">About</h5>
              <p className="description">{description}</p>
            </div>

            <div className="hotel-details">
              <div className="detail-item">
                <FaBuilding className="detail-icon" />
                <span>Address: {address}</span>
              </div>
              <div className="detail-item">
                <FaMapMarkerAlt className="detail-icon" />
                <span>Distance from Colombo: About {distance_from_city} km</span>
              </div>
              <div className="detail-item">
                <FaPhone className="detail-icon" />
                <span>Contact No: {contactNumber} </span>
              </div>
              <div className="detail-item">
                <FaMoneyBill className="detail-icon" />
                <span>Starting Price: ${perPerson_price} </span>
              </div>
            </div>

            {localStorage.getItem("auth-token") ? (
              <Button 
                variant="warning" 
                size="lg" 
                className="book-button my-3"
                onClick={() => navigate(`/bookHotel/${id}`)}
              >
                Book Now
              </Button>
            ) : (
              <div className="login-prompt">
                <p className="login-text">Login or Signup to Book the hotel</p>
                <Button 
                  variant="outline-primary" 
                  onClick={() => navigate('/login')}
                >
                  Login to Continue
                </Button>
              </div>
            )}
          </div>
        </Col>

        <Col xs={12} md={5}>
          <div className="hotel-gallery">
            <div className="main-image-container">
              <Image
                src={hotelImages[0]}
                alt={name}
                fluid
                className="main-image"
              />
            </div>

            <Row className="thumbnail-container">
              {hotelImages.slice(1, 4).map((img, index) => (
                <Col xs={4} key={index}>
                  <div className="thumbnail-wrapper">
                    <Image
                      src={img}
                      alt={`${name} View ${index + 1}`}
                      fluid
                      className="thumbnail-image"
                    />
                  </div>
                </Col>
              ))}
            </Row>

            {/* <Button 
              variant="light" 
              className="view-all-button"
              onClick={() => setShowAllImages(true)}
            >
              <FaImages className="me-2" />
              View All Photos
            </Button> */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HotelMainSection;
