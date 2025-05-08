import React from 'react';
import { Card, Badge, Button, Carousel } from 'react-bootstrap';
import { FaHeart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DestinationCardComponent = ({ id, images, title, reviewCount, category, city, miniDescription }) => {
  return (
    <Link to={`/destinations/${id}`} style={{ textDecoration: 'none' }}>
      <Card 
        style={{ 
          width: '18rem', 
          height: '380px', // Fixed height for the entire card
          borderRadius: '10px', 
          overflow: 'hidden' 
        }} 
        className="shadow-sm mb-4 d-flex flex-column"
      >
        <div className="position-relative" style={{ height: '200px' }}>
          <Carousel indicators={true} controls={false}>
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <Card.Img
                  variant="top"
                  src={image}
                  alt={`${title} image ${index + 1}`}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <Card.Body className="d-flex flex-column" style={{ height: '180px' }}>
          <Card.Title 
            style={{ 
              height: '25px', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap' 
            }}
          >
            {title}
          </Card.Title>
          <Card.Text 
            className="text-muted" 
            style={{ 
              fontSize: '0.9em', 
              height: '60px', 
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {miniDescription}
          </Card.Text>
          <div className="d-flex align-items-center mb-1">
            {/* <FaStar color="green" /> */}
            {/* <span className="ms-1">{reviewCount}</span> */}
          </div>
          <Card.Text 
            className="text-muted mt-auto" 
            style={{ 
              fontSize: '0.9em',
              height: '40px',
              overflow: 'hidden'
            }}
          >
            {category}
            <br />
            {city}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default DestinationCardComponent
