import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/TravalMateLogo2.png';

const TransportationCard = ({ service = {} }) => {
  const {
    id = "",
    images = [],
    name = "N/A",
    description = "No description available",
    pricePerHour = null,
    cardImage = "",
    miniDescription = "No description available",
  } = service;

  // Function to truncate description with ellipsis
  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <Link to={id ? `/transportation/${id}` : "#"} style={{ textDecoration: 'none' }}>
      <Card style={{ width: '22rem', height: '500px' }} className="shadow-sm border-primary">
        <div style={{ width: '100%', height: '180px', overflow: 'hidden' }}>
          {cardImage ? (
            <Card.Img 
              variant="top" 
              src={cardImage} 
              alt={name} 
              style={{ objectFit: 'cover', width: '100%', height: '180px' }} 
            />
          ) : (
            <div 
              className="bg-secondary text-white text-center" 
              style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              No Image Available
            </div>
          )}
        </div>
        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            <Card.Title className="text-primary">{name}</Card.Title>
            <Card.Text className="text-secondary">{miniDescription}</Card.Text>

            <Card.Text 
              className="text-muted" 
              style={{
                height: '80px',
                overflow: 'hidden',
                lineHeight: '1.5',
              }}
            >
              {truncateDescription(description, 120)}
            </Card.Text>
          </div>
          <div>
            <Row className="align-items-center mt-3">
              <Col xs={12} className="text-start" style={{ fontSize: '1rem', fontWeight: 'bold' , color: '#007bff'}}>
                {pricePerHour !== null ? `From $${pricePerHour} Upwards` : "Price not available"}
              </Col>
            </Row>
            <Button
              variant="info"
              className="mt-4 mb-3"
              style={{
                backgroundColor: '#C1EAF8',
                border: 'none',
                color: '#007bff',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '30px',
                padding: '10px 0',
                width: '230px',
                height: '46px',
                margin: '0 auto',
              }}
            >
              Discover More
              <img
                src={logo}
                alt="logo"
                style={{ marginLeft: '10px', width: '25px', height: '25px' }}
              />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default TransportationCard;
