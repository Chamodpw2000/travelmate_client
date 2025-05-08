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
    <div className="accordion-container">
      <Accordion className="horizontal-accordion">
        {/* What's Included */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>What's included</Accordion.Header>
          <Accordion.Body>
            {whatsIncluded || "Details about what's included will be displayed here."}
          </Accordion.Body>
        </Accordion.Item>

        {/* Additional Info */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Additional Info</Accordion.Header>
          <Accordion.Body>
            {additionalInfo || "Additional information about the trip will be displayed here."}
          </Accordion.Body>
        </Accordion.Item>

        {/* Cancellation Policy */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Cancellation Policy</Accordion.Header>
          <Accordion.Body>
            {cancellationPolicy || 
              "For a full refund, cancel at least 24 hours in advance of the start date of the experience."
            }
          </Accordion.Body>
        </Accordion.Item>

        {/* Help Section */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>Help</Accordion.Header>
          <Accordion.Body>
            {help || "If you have questions about this tour or need help making your booking, we’d be happy to help. Just call the number below:"}
            <br />
            <FaPhone className="phone-icon" /> <span>{contactNumber || "Not available"}</span>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default PrePlannedTripsInfo;
