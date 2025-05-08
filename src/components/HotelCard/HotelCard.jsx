import React from 'react';
import { Card, Button, Row, Col, Image } from 'react-bootstrap';
import logo from '../../assets/TravalMateLogo2.png';
import { Link } from 'react-router-dom';

const HotelCard = ({ name, description, price, imageSrc, id, minidescription }) => {
  return (
    <Link to={`/accommodations/${id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <Card 
        className="h-100 shadow-sm hover-shadow" 
        style={{ 
          width: '22rem',
          height: '500px',
          transition: 'transform 0.3s, box-shadow 0.3s',
          margin: '0 auto'
        }}
      >
        <div style={{ height: '200px', overflow: 'hidden' }}>
          <Card.Img 
            variant="top" 
            src={imageSrc} 
            style={{ 
              objectFit: 'cover',
              width: '100%',
              height: '100%'
            }} 
          />
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{name}</Card.Title>
          <div style={{ height: '120px', overflow: 'hidden' }}>
            {minidescription && (
              <Card.Text className="mb-2" style={{ fontSize: '0.9rem', color: '#666' }}>
                {minidescription}
              </Card.Text>
            )}
            {description && (
              <Card.Text 
                className="description-text" 
                style={{ 
                  display: '-webkit-box', 
                  WebkitLineClamp: '3', 
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '0.85rem'
                }}
              >
                {description}
              </Card.Text>
            )}
          </div>
          <div className="mt-auto">
            <Row className="align-items-center mt-2">
              <Col xs={12} className="text-start" style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#007bff' }}>
                From ${price}  Upwards
              </Col>
            </Row>
            <Button
              variant="info"
              className="mt-3"
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
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#A5D9F0'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#C1EAF8'}
            >
              Discover More
              <Image
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

export default HotelCard;
