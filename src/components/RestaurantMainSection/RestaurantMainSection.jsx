import React, { useEffect, useState } from 'react';
import './RestaurantMainSection.css';
import RestaurantDetails from '../restaurantDetails/RestaurantDetails';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { FaLaptop  } from 'react-icons/fa';


const RestaurantMainSection = ({ id, type, name, address, category, contactNumber, description, email, website, openingHours, priceRange, rating, mainCategory }) => {
  const images = [
    'https://picsum.photos/600/600?random=1',
    'https://picsum.photos/600/600?random=2',
    'https://picsum.photos/600/600?random=3',
    'https://picsum.photos/600/600?random=4',
    'https://picsum.photos/600/600?random=5',
    'https://picsum.photos/600/600?random=6',
    'https://picsum.photos/600/600?random=7',
  ];

  const [mainImage, setMainImage] = useState(images[0]);
  let index = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setMainImage(images[index]);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="restaurant-main-section">
      <div className="restaurant-details pt-5">
        <h1>{name}</h1>
      </div>
      <Container className="py-3 border-bottom">
        <Row className="align-items-center">
          <Col md="6" className="d-flex align-items-center">
            <h4 className="mb-0">{mainCategory}</h4>
          </Col>
          <Col md="6" className="text-md-end text-muted">

          </Col>
        </Row>

        <Row className="align-items-center mt-2">
          <Col md="6">
            {category[0]} | {category[1]} | {category[2]}<br />
            #21 of 10,275 Restaurants in Sri Lanka | $ - {priceRange}
          </Col>
          <Col md="6" className="text-md-end text-muted">
            <FaLaptop  className="me-2 text-dark" />
            <a href={website} className="text-decoration-none text-dark">Visit Out Website</a> <br />
            <a href={`tel:${contactNumber}`} className="text-decoration-none">{contactNumber}</a> | <a href="https://maps.google.com/?q=Carrer Nou de Sant Francesc, 7, 08002 Barcelona Spain" className="text-decoration-none">
              {address}
            </a>
          </Col>
        </Row>
        <hr style={{ border: '2px solid #00AA6C', marginTop: '1rem' }} />

      </Container>
      <div className="images-section">
        <div className="left-image">
          <img src={images[1]} alt="Thumbnail 1" />
        </div>
        <div className="main-image">
          <img src={mainImage} alt="Main display" />
        </div>
        <div className="right-image">
          <img src={images[3]} alt="Thumbnail 2" />
        </div>
        <div className="bottom-images">
          <img src={images[2]} alt="Thumbnail 3" />
          <img src={images[4]} alt="Thumbnail 4" />
          <img src={images[5]} alt="Thumbnail 5" />
          <img src={images[6]} alt="Thumbnail 5" />
        </div>
      </div>
      <RestaurantDetails 
      id={id}
      />
    </div>
  );
};

export default RestaurantMainSection;
