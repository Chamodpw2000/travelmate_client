import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { FaPhone } from "react-icons/fa"; 
import "./PrePlannedTripsInfo.css"; 

const PrePlannedTripsInfo = ({
  name,
  mainDestinations,
  guides,
  price,
  duration,
  noOfTravelers,
  startTime,
  startLocation,
  endTime,
  endLocation,
  description,
  availableDates,
  contactNumber,
  rating,
  whatsIncluded,
  additionalInfo,
  cancellationPolicy,
  help,
}) => {
  return (
    <div className="px-3 ">
      <Accordion className="w-full max-w-6xl mx-auto shadow-md rounded-lg">
        {/* What's Included */}
        <Accordion.Item eventKey="0" className="mb-2">
          <Accordion.Header>What's included</Accordion.Header>
          <Accordion.Body style={{ color: '#000000', backgroundColor: '#ffffff', display: 'block', opacity: 1, padding: '1rem', fontSize: '16px', fontWeight: '400' }}>
            <div style={{ color: '#000000', visibility: 'visible' }}>
              {whatsIncluded || "Details about what's included will be displayed here."}
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Additional Info */}
        <Accordion.Item eventKey="1" className="mb-2">
          <Accordion.Header>Additional Info</Accordion.Header>
          <Accordion.Body style={{ color: '#000000', backgroundColor: '#ffffff', display: 'block', opacity: 1, padding: '1rem', fontSize: '16px', fontWeight: '400' }}>
            <div style={{ color: '#000000', visibility: 'visible' }}>
              {additionalInfo || "Additional information about the trip will be displayed here."}
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Cancellation Policy */}
        <Accordion.Item eventKey="2" className="mb-2">
          <Accordion.Header>Cancellation Policy</Accordion.Header>
          <Accordion.Body style={{ color: '#000000', backgroundColor: '#ffffff', display: 'block', opacity: 1, padding: '1rem', fontSize: '16px', fontWeight: '400' }}>
            <div style={{ color: '#000000', visibility: 'visible' }}>
              {cancellationPolicy || 
                "For a full refund, cancel at least 24 hours in advance of the start date of the experience."
              }
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Help Section */}
        <Accordion.Item eventKey="3" className="mb-2">
          <Accordion.Header>Help</Accordion.Header>
          <Accordion.Body style={{ color: '#000000', backgroundColor: '#ffffff', display: 'block', opacity: 1, padding: '1rem', fontSize: '16px', fontWeight: '400' }}>
            <div style={{ color: '#000000', visibility: 'visible' }}>
              {help || "If you have questions about this tour or need help making your booking, we'd be happy to help. Just call the number below:"}
              <br />
              <FaPhone className="phone-icon" /> <span style={{ color: '#000000' }}>{contactNumber || "Not available"}</span>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default PrePlannedTripsInfo;
