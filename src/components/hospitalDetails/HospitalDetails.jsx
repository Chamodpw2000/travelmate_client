import React from 'react';
import { FaLaptop, FaPhone, FaMapMarkerAlt, FaCity, FaRoad } from 'react-icons/fa';

const HospitalDetails = (props) => {
  // Destructure props safely with defaults to prevent undefined errors
  const {
    name = '',
    address = '',
    contactNumber = '',
    email = '',
    website = '',
    image = '',
    category = '',
    nearestCity = '',
    distanceFromNearestCity = '',
    description = ''
  } = props;

  console.log('Rendering HospitalDetails with props:', props);

  return (
    <div className="hospital-main-sectio" 
    
   
   
   >
    
      {/* Hero Section with Hospital Name and Category */}
      <div className="hospital-hero py-4" style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-4 fw-bold" style={{ color: '#00AA6C' }}>{name}</h1>
              {category && (
                <div className="mt-2">
                  <span className="badge bg-primary px-3 py-2 rounded-pill">{category}</span>
                </div>
              )}
            </div>
            <div className="col-md-4 text-md-end">
              {website && (
                <a 
                  href={website} 
                  className="btn btn-outline-success me-2" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <FaLaptop className="me-2" />
                  Visit Website
                </a>
              )}
              {contactNumber && (
                <a 
                  href={`tel:${contactNumber}`} 
                  className="btn btn-outline-primary"
                >
                  <FaPhone className="me-2" />
                  Call
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-4">
        {/* Image Section */}
        {image && (
          <div className="row mb-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm overflow-hidden">
                {typeof image === 'string' ? (
                  <img 
                    src={image} 
                    alt={name} 
                    className="img-fluid w-100" 
                    style={{ maxHeight: '500px', objectFit: 'cover' }} 
                  />
                ) : (
                  <div className="bg-light p-5 text-center">
                    <p className="text-muted">Image data available but not in string format</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <div className="row">
          {/* Left Column - Description */}
          <div className="col-lg-8 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h3 className="card-title border-bottom pb-3 mb-3" style={{ color: '#00AA6C' }}>About This Hospital</h3>
                <p className="card-text">{description}</p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Contact & Location Info */}
          <div className="col-lg-4 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h3 className="card-title border-bottom pb-3 mb-3" style={{ color: '#00AA6C' }}>Contact & Location</h3>
                
                {address && (
                  <div className="d-flex mb-3">
                    <div className="flex-shrink-0">
                      <FaMapMarkerAlt className="text-danger mt-1" size={18} />
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-1">Address:</h6>
                      <a 
                        href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} 
                        className="text-decoration-none"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {address}
                      </a>
                    </div>
                  </div>
                )}
                
                {contactNumber && (
                  <div className="d-flex mb-3">
                    <div className="flex-shrink-0">
                      <FaPhone className="text-primary mt-1" size={18} />
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-1">Phone:</h6>
                      <a href={`tel:${contactNumber}`} className="text-decoration-none">
                        {contactNumber}
                      </a>
                    </div>
                  </div>
                )}
                
                {nearestCity && (
                  <div className="d-flex mb-3">
                    <div className="flex-shrink-0">
                      <FaCity className="text-secondary mt-1" size={18} />
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-1">Nearest City:</h6>
                      <p className="mb-0">{nearestCity}</p>
                    </div>
                  </div>
                )}
                
                {distanceFromNearestCity && (
                  <div className="d-flex mb-3">
                    <div className="flex-shrink-0">
                      <FaRoad className="text-secondary mt-1" size={18} />
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-1">Distance from nearest city:</h6>
                      <p className="mb-0">{distanceFromNearestCity}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Section (Optional) */}
        {address && (
          <div className="row mb-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm overflow-hidden">
                <div className="card-body p-0">
                  <iframe 
                    title="Hospital Location"
                    width="100%" 
                    height="300" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight="0" 
                    marginWidth="0" 
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    style={{ border: 0 }}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <hr style={{ border: '2px solid #00AA6C', marginTop: '1rem', marginBottom: '1rem' }} />
        
        {/* Footer Section */}
        <div className="row">
          <div className="col-12 text-center mb-4">
            <p className="text-muted">
              For more information about {name}, please contact us directly or visit our website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;
