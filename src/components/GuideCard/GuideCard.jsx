import React from 'react';
import { Card, Button, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/TravalMateLogo2.png';
import { FaMapMarkerAlt, FaLanguage } from 'react-icons/fa';
import './GuideCard.css';

const GuideCard = ({ id, name, description, area, languages, chargesPerDay, cardImage, miniDescription = "Tour guide" }) => {
  // Function to truncate description with ellipsis
  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return "No description available";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <Link to={id ? `/guide/${id}` : "#"} style={{ textDecoration: 'none' }}>
      <Card style={{ width: '22rem', height: '600px' }} className="shadow-sm border-primary guide-card">
        <div className="card-image-container" style={{backgroundColor: '#C1EAF8'}}>
          <div className="profile-image-wrapper">
            <Image 
              src={cardImage || "https://picsum.photos/150"} 
              alt={name}
              className="centered-profile-image"
            />
          </div>
        </div>
        
        <Card.Body className="d-flex flex-column justify-content-between pt-4">
          <div>
            <Card.Title className="text-primary">{name}</Card.Title>
            <Card.Text className="text-secondary mini-description">
              {miniDescription}
            </Card.Text>
            
            <div className="guide-details mb-2 mt-3">
              <div className="detail-item">
                <FaMapMarkerAlt className="detail-icon" />
                <span className="text-secondary">{area || "Area not specified"}</span>
              </div>
              <div className="detail-item">
                <FaLanguage className="detail-icon" />
                <span className="text-secondary">{languages || "Languages not specified"}</span>
              </div>
            </div>
            
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
              <Col xs={12} className="text-start" style={{ fontSize: '1rem', fontWeight: 'bold', color: '#007bff' }}>
                {chargesPerDay ? `From $${chargesPerDay} Upwards ` : "Price not available"}
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
              Contact Guide
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

export default GuideCard;
