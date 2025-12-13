import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { FaStar, FaBed, FaUsers, FaPhone } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { ClientContext } from '../../context/ClientContext';

const VillaCard = ({ id, name, propertyType, priceRange, rating, images, miniDescription,description, bedrooms, maxGuests, contactNumber, area }) => {
  const { allVillas } = useContext(ClientContext);
  
  const villa = allVillas?.find((e) => e.id === parseInt(id));
  
  const cardStyle = {
    width: '18rem',
    border: 'none',
    height: '480px',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden'
  };

  const imageContainerStyle = {
    height: '200px',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
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

  const propertyTypeStyle = {
    fontSize: '0.85rem',
    color: '#777',
    marginTop: 'auto'
  };

  const hoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)'
  };

  const detailsContainerStyle = {
    display: 'flex',
    gap: '12px',
    marginBottom: '10px',
    fontSize: '0.85rem',
    color: '#555'
  };

  const detailItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  const contactAreaContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '10px',
    paddingTop: '4px',
    borderTop: '1px solid #eee'
  };

  const infoRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.85rem',
    color: '#555'
  };

  return (
    <Link 
      to={`/villas/${id}`} 
      style={{ textDecoration: 'none', display: 'block', margin: '15px' }}
      className="villa-card-link"
    >
      <Card 
        style={cardStyle} 
        className="villa-card"
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
            alt={name}
            style={imageStyle}
          />
        </div>
        <div style={cardBodyStyle}>
          <h5 style={titleStyle}>{name}</h5>
          
          <p style={descriptionStyle}>{description}</p>
          
          <div style={detailsContainerStyle}>
            <div style={detailItemStyle}>
              <FaBed style={{ color: '#00AA6C' }} />
              <span>{bedrooms} Beds</span>
            </div>
            <div style={detailItemStyle}>
              <FaUsers style={{ color: '#00AA6C' }} />
              <span>{maxGuests} Guests</span>
            </div>
          </div>

          {/* Area and Contact Number Section */}
          {(area || contactNumber) && (
            <div style={contactAreaContainerStyle}>
              {area && (
                <div style={infoRowStyle}>
                  <MdLocationOn style={{ color: '#00AA6C', fontSize: '16px', flexShrink: 0 }} />
                  <span style={{ lineHeight: '3.8' }}>{area}</span>
                </div>
              )}
              {contactNumber && (
                <div style={infoRowStyle}>
                  <FaPhone style={{ color: '#00AA6C', fontSize: '13px', flexShrink: 0 }} />
                  <span style={{ lineHeight: '1.4' }}>{contactNumber}</span>
                </div>
              )}
            </div>
          )}
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                style={{
                  color: index < (rating || 0) ? '#00AA6C' : '#e0e0e0',
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
              {rating || 0}
            </Badge>
          </div>
          
          <p style={propertyTypeStyle}>{propertyType}</p>
        </div>
      </Card>
    </Link>
  );
};

export default VillaCard;