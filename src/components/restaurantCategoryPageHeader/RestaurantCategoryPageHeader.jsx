import React from 'react'
import { Container, Row, Col, Button, Badge, Image } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import NavbarComponent from '../navbarComponent/NavbarComponent';
let categories = ["DateNight", "Fine Dining", "Casual Dining", "Vegan & Veg", "Outside"];

const RestaurantCategoryPageHeader = ({ category, headerText }) => {
  return (
    <>
    <div className="bg-light">
      <div
        className="d-flex align-items-center justify-content-center text-white"
        style={{
          backgroundImage: "url('https://picsum.photos/1920/1080')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '480px',
          color: '#fff',
        }}
      >
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="fw-bold">Travelers’ Choice Awards</h2>
              <h1 className="display-4 fw-bold">Best of the Best Restaurants</h1>
              
            </Col>
          </Row>
        </Container>
      </div>

      {/* Navigation Section */}
      <Container className="py-4">
        <Row className="d-flex justify-content-center text-center">

          {categories.map((categoryItem, index) => (
            <Col xs="auto" className="my-2" key={index}>
              <Link to={`/restaurants/${categoryItem}`} style={{ textDecoration: 'none' }}>
                {categoryItem === category ? <Button variant="outline-dark" active>{category}</Button> : <Button variant="outline-secondary">{categoryItem}</Button>}
              </Link>
            </Col>
          ))}

        </Row>

        { }
      </Container>

      {/* Content Section */}
      <Container className="py-5">
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <h2 className="fw-bold mb-3">{category}</h2>
            <p className="text-muted">
              {headerText}
            </p>
          </Col>
        </Row>
      </Container>
    </div>
    </>
    
  );
};

export default RestaurantCategoryPageHeader